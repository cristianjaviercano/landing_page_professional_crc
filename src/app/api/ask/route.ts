import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../../lib/cvContext";

/** Marker appended to the stream when generation fails after it has started. */
const ERROR_SENTINEL = "\u0000ERR";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5-5";
// Haiku 5.5 has no server-side refusal fallback; sending the parameter would not help and a list would 400.
const FALLBACKS = !/haiku/i.test(MODEL);
const MAX_BODY_BYTES = 8_000;
const MAX_MESSAGES = 8;
const MAX_CHARS = 500;

/* Best-effort limits. Serverless instances do not share memory, so pair these with a
   spend limit on the API key and a rate-limit rule in the Vercel firewall. */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 10;
const MAX_PER_DAY = 400;
const hits = new Map<string, number[]>();
const day = { key: "", count: 0 };

function limited(ip: string, now: number) {
  const today = new Date(now).toISOString().slice(0, 10);
  if (day.key !== today) Object.assign(day, { key: today, count: 0 });
  if (day.count >= MAX_PER_DAY) return true;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  day.count += 1;

  if (hits.size > 2_000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

const json = (status: number, error: string) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null;
  const out: Anthropic.Beta.BetaMessageParam[] = [];
  for (const m of raw) {
    const { role, content } = (m ?? {}) as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    out.push({ role, content: text });
  }
  // The conversation must start and end with the visitor, alternating turns.
  const alternating = out.every((m, i) => m.role === (i % 2 === 0 ? "user" : "assistant"));
  return alternating && out[out.length - 1].role === "user" ? out : null;
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return json(503, "disabled");

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return json(403, "forbidden");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (limited(ip, Date.now())) return json(429, "rate_limited");

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json(413, "too_large");
  let messages: Anthropic.Beta.BetaMessageParam[] | null;
  try {
    messages = parseMessages(JSON.parse(text));
  } catch {
    messages = null;
  }
  if (!messages) return json(400, "invalid_request");

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = client.beta.messages.stream(
          {
            model: MODEL,
            max_tokens: 2000, // thinking tokens count toward this, answers are ~150 tokens
            system: buildSystemPrompt(),
            messages,
            output_config: { effort: "low" },
            ...(FALLBACKS && { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }),
          },
          { signal: request.signal },
        );
        stream.on("text", (delta) => {
          try {
            controller.enqueue(encoder.encode(delta));
          } catch {
            stream.abort();
          }
        });
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" || final.stop_reason === "max_tokens") controller.enqueue(encoder.encode(ERROR_SENTINEL));
      } catch (error) {
        if (!(error instanceof Anthropic.APIUserAbortError)) {
          console.error("ask: generation failed", error instanceof Anthropic.APIError ? error.status : error);
          controller.enqueue(encoder.encode(ERROR_SENTINEL));
        }
      } finally {
        try {
          controller.close();
        } catch {
          // the visitor already closed the connection
        }
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
