"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useLocale } from "../../i18n/LocaleProvider";

export const INK = "#1B1B1B";
export const AMBER = "#B8860B";
export const YELLOW = "#F4C21B";

/* ---------- formatting ---------- */

export const fmt = (v: number, d = 0, loc = "es-CO") =>
  Number.isFinite(v) ? v.toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d }) : "—";

/** Renders `**bold**` spans from dictionary strings. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))}
    </>
  );
}

/* ---------- inputs ---------- */

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  digits = 0,
  onChange,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  digits?: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const { nf } = useLocale();
  return (
    <div>
      <label htmlFor={id} className="flex justify-between gap-3 text-sm font-semibold">
        <span>{label}</span>
        <span className="font-mono">
          {fmt(value, digits, nf)}
          {unit && <span className="text-[#1B1B1B]/55"> {unit}</span>}
        </span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="lab-range mt-2 w-full" />
    </div>
  );
}

export function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <div role="radiogroup" aria-label={label} className="mt-2 inline-flex rounded-lg border-2 border-[#1B1B1B] p-0.5">
        {options.map((o) => (
          <button
            key={String(o.value)}
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold ${value === o.value ? "bg-[#1B1B1B] text-[#F4C21B]" : "hover:bg-[#F4C21B]"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- result tiles ---------- */

export function Stat({ label, value, unit, highlight = false }: { label: string; value: string; unit?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border-2 border-[#1B1B1B] px-3 py-2.5 ${highlight ? "bg-[#F4C21B]" : "bg-white/60"}`}>
      <p className="text-xs font-semibold text-[#1B1B1B]/70">{label}</p>
      <p className="font-mono text-xl font-black leading-tight">
        {value}
        {unit && <span className="ml-1 text-xs font-semibold">{unit}</span>}
      </p>
    </div>
  );
}

export function Insight({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-[#1B1B1B]/40 p-3 text-sm leading-relaxed">
      <span className="font-hand mr-1 text-xl leading-none">→</span>
      {children}
    </div>
  );
}

/* ---------- line chart with crosshair tooltip ---------- */

export type Series = { id: string; label: string; color: string; dash?: string; width?: number; y: (x: number) => number };

const PAD = { l: 52, r: 12, t: 16, b: 40 };

export function LineChart({
  series,
  xDomain,
  yMax,
  xLabel,
  yLabel,
  formatX,
  formatY,
  markers = [],
  ariaLabel,
}: {
  series: Series[];
  xDomain: [number, number];
  yMax: number;
  xLabel: string;
  yLabel: string;
  formatX: (v: number) => string;
  formatY: (v: number) => string;
  markers?: { x: number; label: string }[];
  ariaLabel: string;
}) {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // Size the viewBox to the real width so labels stay at 11px on phones.
  const [W, setW] = useState(640);
  const H = W < 480 ? 240 : 300;
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const [x0, x1] = xDomain;
  const sx = (x: number) => PAD.l + ((x - x0) / (x1 - x0)) * (W - PAD.l - PAD.r);
  const sy = (y: number) => PAD.t + (1 - Math.min(y, yMax * 1.05) / yMax) * (H - PAD.t - PAD.b);
  const N = 120;
  const xs = Array.from({ length: N + 1 }, (_, i) => x0 + ((x1 - x0) * i) / N);
  const ticks = Array.from({ length: 5 }, (_, i) => (yMax * i) / 4);
  const xticks = Array.from({ length: 5 }, (_, i) => x0 + ((x1 - x0) * i) / 4);

  const onMove = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const x = x0 + ((px - PAD.l) / (W - PAD.l - PAD.r)) * (x1 - x0);
    setHoverX(x >= x0 && x <= x1 ? x : null);
  };

  // direct label at the right end of each line, nudged apart vertically
  const ends = series
    .map((s) => ({ s, y: sy(s.y(x1)) }))
    .sort((a, b) => a.y - b.y)
    .reduce<{ s: Series; y: number }[]>((acc, e) => {
      const prev = acc[acc.length - 1];
      acc.push({ ...e, y: prev && e.y - prev.y < 14 ? prev.y + 14 : e.y });
      return acc;
    }, []);

  return (
    <div ref={boxRef} className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none"
        role="img"
        aria-label={ariaLabel}
        onPointerMove={onMove}
        onPointerLeave={() => setHoverX(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} stroke={INK} strokeOpacity={0.08} />
            <text x={PAD.l - 8} y={sy(t) + 4} textAnchor="end" fontSize={11} fill={INK} fillOpacity={0.6} fontFamily="ui-monospace, monospace">
              {formatY(t)}
            </text>
          </g>
        ))}
        {xticks.map((t) => (
          <text key={t} x={sx(t)} y={H - PAD.b + 18} textAnchor="middle" fontSize={11} fill={INK} fillOpacity={0.6} fontFamily="ui-monospace, monospace">
            {formatX(t)}
          </text>
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke={INK} strokeWidth={1.5} />
        <text x={(PAD.l + W - PAD.r) / 2} y={H - 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>
          {xLabel}
        </text>
        <text x={12} y={(PAD.t + H - PAD.b) / 2} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK} transform={`rotate(-90 12 ${(PAD.t + H - PAD.b) / 2})`}>
          {yLabel}
        </text>

        {markers.map((m) => (
          <g key={m.label}>
            <line x1={sx(m.x)} x2={sx(m.x)} y1={PAD.t} y2={H - PAD.b} stroke={INK} strokeDasharray="3 4" strokeOpacity={0.5} />
            <text x={sx(m.x) + 5} y={H - PAD.b - 6} fontSize={11} fontWeight={700} fill={INK} paintOrder="stroke" stroke="#F7F3EA" strokeWidth={4}>
              {m.label}
            </text>
          </g>
        ))}

        {series.map((s) => (
          <path
            key={s.id}
            d={xs.map((x, i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(s.y(x)).toFixed(1)}`).join("")}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width ?? 2}
            strokeDasharray={s.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {ends.map(({ s, y }) => (
          <text key={s.id} x={W - PAD.r - 4} y={y - 7} textAnchor="end" fontSize={11} fontWeight={700} fill={INK} paintOrder="stroke" stroke="#F7F3EA" strokeWidth={4}>
            {s.label}
          </text>
        ))}

        {hoverX !== null && (
          <g pointerEvents="none">
            <line x1={sx(hoverX)} x2={sx(hoverX)} y1={PAD.t} y2={H - PAD.b} stroke={INK} strokeOpacity={0.35} />
            {series.map((s) => (
              <circle key={s.id} cx={sx(hoverX)} cy={sy(s.y(hoverX))} r={4.5} fill={s.color} stroke="#F7F3EA" strokeWidth={2} />
            ))}
          </g>
        )}
      </svg>

      {/* legend (also identifies series by line style, not color alone) */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
        {ends.map(({ s }) => (
          <span key={s.id} className="inline-flex items-center gap-1.5">
            <svg width="22" height="8" aria-hidden>
              <line x1="1" x2="21" y1="4" y2="4" stroke={s.color} strokeWidth={s.width ?? 2} strokeDasharray={s.dash} strokeLinecap="round" />
            </svg>
            {s.label}
          </span>
        ))}
      </div>

      {hoverX !== null && (
        <div
          className="pointer-events-none absolute top-2 rounded-lg border-2 border-[#1B1B1B] bg-[#F7F3EA] px-3 py-2 text-xs shadow-[3px_3px_0_#1B1B1B]"
          style={sx(hoverX) > W / 2 ? { left: `${(PAD.l / W) * 100 + 2}%` } : { right: `${(PAD.r / W) * 100 + 2}%` }}
        >
          <p className="mb-1 font-mono font-bold">
            {xLabel}: {formatX(hoverX)}
          </p>
          {series.map((s) => (
            <p key={s.id} className="flex justify-between gap-4">
              <span>{s.label}</span>
              <span className="font-mono font-bold">{formatY(s.y(hoverX))}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
