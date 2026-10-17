import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Locale } from "../i18n";

export const ogSize = { width: 1200, height: 630 };

const COPY = {
  es: { kicker: "INGENIERÍA INDUSTRIAL · OPERACIONES · IA", line: "MSc. Gestión de la Innovación · Estudios especializados en curso · +16 años en operaciones" },
  en: { kicker: "INDUSTRIAL ENGINEERING · OPERATIONS · AI", line: "MSc Innovation Management · Specialized studies in progress · 16+ years in operations" },
} as const;

const INK = "#1B1B1B";
const YELLOW = "#F4C21B";
const PAPER = "#F6F1E4";

export async function renderOgImage(locale: Locale) {
  const copy = COPY[locale];
  const photo = await readFile(join(process.cwd(), "public/amarillo.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: PAPER,
          backgroundImage: `linear-gradient(rgba(27,27,27,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,27,27,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          color: INK,
          borderBottom: `24px solid ${YELLOW}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: `3px solid ${INK}`,
              borderRadius: 999,
              padding: "6px 18px",
              fontSize: 22,
              letterSpacing: 3,
              background: "#F7F3EA",
            }}
          >
            {copy.kicker}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1, marginTop: 28 }}>
            <span>Cristian Javier</span>
            <span style={{ background: YELLOW, padding: "0 10px", marginTop: 8, alignSelf: "flex-start" }}>Cano Mogollón</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 30, lineHeight: 1.35, opacity: 0.8 }}>
            {copy.line}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 360, height: 360 }}>
          <div style={{ position: "absolute", left: 16, top: 16, width: 360, height: 360, borderRadius: 999, background: INK }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={360} height={360} alt="" style={{ borderRadius: 999, border: `4px solid ${INK}`, objectFit: "cover" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
