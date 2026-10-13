"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { useLocale } from "../i18n/LocaleProvider";

type Msg = { role: "user" | "assistant"; content: string };

/** The API appends this marker when generation fails after streaming has started. */
const ERROR_SENTINEL = "\u0000ERR";
const MAX_TURNS = 8;

export default function AskCv() {
  const { t } = useLocale();
  const a = t.ask;
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const setLast = (content: string) => setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, content } : x)));

  async function ask(question: string) {
    const q = question.trim().slice(0, 500);
    if (!q || busy) return;
    const next: Msg = { role: "user", content: q };
    const history: Msg[] = [...messages.filter((m) => m.content), next].slice(-MAX_TURNS);
    // the API expects the conversation to start with the visitor
    while (history[0]?.role === "assistant") history.shift();

    setInput("");
    setBusy(true);
    setMessages([...history, { role: "assistant", content: "" }]);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        setLast(res.status === 429 ? a.rateLimited : a.error);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const failed = text.includes(ERROR_SENTINEL);
        setLast(failed ? text.replace(ERROR_SENTINEL, "").trim() || a.error : text);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setLast(a.error);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="no-print fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-[#1B1B1B] bg-[#F4C21B] px-4 py-2.5 text-sm font-bold shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-0.5"
      >
        <Sparkles className="h-4 w-4" /> {a.launcher}
      </button>
    );
  }

  return (
    <section
      role="dialog"
      aria-label={a.title}
      className="no-print fixed bottom-4 right-4 z-40 flex h-[min(72vh,560px)] w-[min(calc(100vw-2rem),400px)] flex-col overflow-hidden rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] shadow-[6px_6px_0_#1B1B1B]"
    >
      <header className="flex items-start justify-between gap-3 border-b-2 border-[#1B1B1B] bg-[#1B1B1B] px-4 py-3 text-[#F7F3EA]">
        <div>
          <h2 className="flex items-center gap-2 font-bold text-[#F4C21B]">
            <Sparkles className="h-4 w-4" /> {a.title}
          </h2>
          <p className="mt-0.5 text-xs leading-snug text-[#F7F3EA]/70">{a.subtitle}</p>
        </div>
        <button onClick={() => setOpen(false)} aria-label={a.close} className="rounded-md p-1 hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div ref={logRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {a.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="rounded-full border-2 border-[#1B1B1B] bg-white/70 px-3 py-1.5 text-left text-xs font-semibold transition-colors hover:bg-[#F4C21B]"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[88%] whitespace-pre-wrap rounded-xl border-2 border-[#1B1B1B] px-3 py-2 leading-relaxed ${
                m.role === "user" ? "bg-[#F4C21B] font-medium" : "bg-white/80"
              }`}
            >
              {m.content || (busy && i === messages.length - 1 ? <span className="animate-pulse text-[#1B1B1B]/60">{a.thinking}</span> : null)}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="border-t-2 border-[#1B1B1B] p-3"
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            placeholder={a.placeholder}
            aria-label={a.placeholder}
            className="min-w-0 flex-1 rounded-lg border-2 border-[#1B1B1B] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#F4C21B]"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label={a.send}
            className="grid w-11 place-items-center rounded-lg border-2 border-[#1B1B1B] bg-[#1B1B1B] text-[#F4C21B] transition-opacity disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-[#1B1B1B]/60">{a.disclaimer}</p>
      </form>
    </section>
  );
}
