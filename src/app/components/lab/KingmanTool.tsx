"use client";

import { useState } from "react";
import { useLocale } from "../../i18n/LocaleProvider";
import { AMBER, INK, Insight, LineChart, Rich, Slider, Stat, fmt } from "./LabKit";

/** Kingman (VUT) approximation for a G/G/1 queue: Wq ≈ ((ca² + cs²)/2) · (ρ/(1−ρ)) · te */
const kingman = (rho: number, ca: number, cs: number, te: number) => ((ca * ca + cs * cs) / 2) * (rho / (1 - rho)) * te;

export default function KingmanTool() {
  const { t, nf } = useLocale();
  const x = t.lab.kingman;
  const f = (v: number, d = 0) => fmt(v, d, nf);

  const [te, setTe] = useState(5);
  const [rho, setRho] = useState(0.85);
  const [ca, setCa] = useState(1);
  const [cs, setCs] = useState(1.4);

  const wq = kingman(rho, ca, cs, te);
  const wqHalfCs = kingman(rho, ca, cs / 2, te);
  const wqLowRho = kingman(Math.max(0.3, rho - 0.1), ca, cs, te);
  const yMax = Math.max(kingman(0.95, ca, cs, te), kingman(0.95, 1, 1, te));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="space-y-5">
        <Slider label={x.te} value={te} min={1} max={20} step={0.5} digits={1} unit="min" onChange={setTe} />
        <Slider label={x.rho} value={rho} min={0.3} max={0.97} step={0.01} digits={2} onChange={setRho} />
        <Slider label={x.ca} value={ca} min={0} max={2} step={0.05} digits={2} onChange={setCa} />
        <Slider label={x.cs} value={cs} min={0} max={2} step={0.05} digits={2} onChange={setCs} />
        <p className="font-mono text-xs leading-relaxed text-[#1B1B1B]/70">
          Wq ≈ V · U · T = ((cₐ² + cₛ²) / 2) · (ρ / (1 − ρ)) · tₑ
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={x.wq} value={f(wq, 1)} unit="min" highlight />
          <Stat label={x.v} value={f((ca * ca + cs * cs) / 2, 2)} />
          <Stat label={x.u} value={f(rho / (1 - rho), 2)} />
          <Stat label={x.ct} value={f(wq + te, 1)} unit="min" />
        </div>
        <LineChart
          ariaLabel={x.chart}
          xDomain={[0.3, 0.95]}
          yMax={yMax}
          xLabel={x.xLabel}
          yLabel={x.yLabel}
          formatX={(v) => f(v, 2)}
          formatY={(v) => f(v, 1)}
          markers={[{ x: Math.min(rho, 0.95), label: x.yourRho }]}
          series={[
            { id: "you", label: x.you, color: INK, width: 3, y: (r) => kingman(r, ca, cs, te) },
            { id: "mm1", label: x.ref, color: AMBER, dash: "7 5", y: (r) => kingman(r, 1, 1, te) },
          ]}
        />
        <Insight>
          <Rich text={x.insight(f(rho, 2), f(wq, 1), f(wqHalfCs, 1), f(wqLowRho, 1))} />
        </Insight>
      </div>
    </div>
  );
}
