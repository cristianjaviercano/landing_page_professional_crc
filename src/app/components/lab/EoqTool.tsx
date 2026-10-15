"use client";

import { useState } from "react";
import { useLocale } from "../../i18n/LocaleProvider";
import { AMBER, INK, Insight, LineChart, Rich, Segmented, Slider, Stat, fmt } from "./LabKit";

const Z = { 90: 1.2816, 95: 1.6449, 98: 2.0537, 99: 2.3263 } as const;
type Level = keyof typeof Z;

export default function EoqTool() {
  const { t, nf } = useLocale();
  const x = t.lab.eoq;
  const f = (v: number, d = 0) => fmt(v, d, nf);

  const [D, setD] = useState(12000); // units / year
  const [S, setS] = useState(80); // $ / order
  const [H, setH] = useState(4); // $ / unit / year
  const [L, setL] = useState(7); // lead time, days
  const [cv, setCv] = useState(0.3); // coefficient of variation of daily demand
  const [level, setLevel] = useState<Level>(95);
  const [qRatio, setQRatio] = useState(1.5);

  const eoq = Math.sqrt((2 * D * S) / H);
  const ordering = (q: number) => (D / q) * S;
  const holding = (q: number) => (q / 2) * H;
  const total = (q: number) => ordering(q) + holding(q);
  const tcStar = total(eoq);
  const q = eoq * qRatio;
  const penalty = (total(q) / tcStar - 1) * 100;

  const d = D / 365;
  const sigmaD = cv * d;
  const ss = Z[level] * sigmaD * Math.sqrt(L);
  const rop = d * L + ss;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="space-y-5">
        <Slider label={x.D} value={D} min={500} max={50000} step={500} unit={x.perYear} onChange={setD} />
        <Slider label={x.S} value={S} min={5} max={500} step={5} unit="$" onChange={setS} />
        <Slider label={x.H} value={H} min={0.5} max={50} step={0.5} digits={1} unit={x.perUnitYear} onChange={setH} />
        <Slider label={x.L} value={L} min={1} max={60} step={1} unit={x.days} onChange={setL} />
        <Slider label={x.cv} value={cv} min={0} max={1} step={0.05} digits={2} onChange={setCv} />
        <Segmented
          label={x.level}
          value={level}
          onChange={setLevel}
          options={[90, 95, 98, 99].map((v) => ({ value: v as Level, label: `${v}%` }))}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label={x.eoq} value={f(eoq)} unit="u" highlight />
          <Stat label={x.tc} value={`$${f(tcStar)}`} unit={`/${x.year}`} />
          <Stat label={x.orders} value={f(D / eoq, 1)} />
          <Stat label={x.cycle} value={f((eoq / D) * 365, 1)} unit={x.days} />
          <Stat label={x.ss} value={f(ss)} unit="u" />
          <Stat label={x.rop} value={f(rop)} unit="u" highlight />
        </div>

        <LineChart
          ariaLabel={x.chart}
          xDomain={[eoq * 0.2, eoq * 3]}
          yMax={total(eoq * 0.2) * 1.02}
          xLabel={x.xLabel}
          yLabel={x.yLabel}
          formatX={(v) => f(v)}
          formatY={(v) => `$${f(v)}`}
          markers={[
            { x: eoq, label: "Q*" },
            { x: q, label: x.yourQ },
          ]}
          series={[
            { id: "tc", label: x.total, color: INK, width: 3, y: total },
            { id: "s", label: x.ordering, color: AMBER, dash: "7 5", y: ordering },
            { id: "h", label: x.holding, color: AMBER, dash: "1 5", width: 3, y: holding },
          ]}
        />

        <Slider label={x.tryQ} value={qRatio} min={0.3} max={3} step={0.05} digits={2} onChange={setQRatio} />
        <Insight>
          <Rich text={x.insight(f(q), f(qRatio, 2), f(penalty, 1), f((total(eoq * 1.2) / tcStar - 1) * 100, 1))} />
        </Insight>
      </div>
    </div>
  );
}
