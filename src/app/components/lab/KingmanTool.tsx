"use client";

import { useState } from "react";
import { AMBER, INK, Insight, LineChart, Slider, Stat, fmt } from "./LabKit";

/** Kingman (VUT) approximation for a G/G/1 queue: Wq ≈ ((ca² + cs²)/2) · (ρ/(1−ρ)) · te */
const kingman = (rho: number, ca: number, cs: number, te: number) => ((ca * ca + cs * cs) / 2) * (rho / (1 - rho)) * te;

export default function KingmanTool() {
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
        <Slider label="Tiempo de proceso tₑ" value={te} min={1} max={20} step={0.5} digits={1} unit="min" onChange={setTe} />
        <Slider label="Utilización ρ" value={rho} min={0.3} max={0.97} step={0.01} digits={2} onChange={setRho} />
        <Slider label="Variabilidad de llegadas cₐ" value={ca} min={0} max={2} step={0.05} digits={2} onChange={setCa} />
        <Slider label="Variabilidad del proceso cₛ" value={cs} min={0} max={2} step={0.05} digits={2} onChange={setCs} />
        <p className="font-mono text-xs leading-relaxed text-[#1B1B1B]/70">
          Wq ≈ V · U · T = ((cₐ² + cₛ²) / 2) · (ρ / (1 − ρ)) · tₑ
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label="Espera en cola Wq" value={fmt(wq, 1)} unit="min" highlight />
          <Stat label="Factor V" value={fmt((ca * ca + cs * cs) / 2, 2)} />
          <Stat label="Factor U" value={fmt(rho / (1 - rho), 2)} />
          <Stat label="Tiempo de ciclo" value={fmt(wq + te, 1)} unit="min" />
        </div>
        <LineChart
          ariaLabel="Espera en cola en función de la utilización"
          xDomain={[0.3, 0.95]}
          yMax={yMax}
          xLabel="Utilización ρ"
          yLabel="Espera en cola (min)"
          formatX={(v) => fmt(v, 2)}
          formatY={(v) => fmt(v, 1)}
          markers={[{ x: Math.min(rho, 0.95), label: "tu ρ" }]}
          series={[
            { id: "you", label: "Tu sistema", color: INK, width: 3, y: (r) => kingman(r, ca, cs, te) },
            { id: "mm1", label: "Referencia M/M/1 (c = 1)", color: AMBER, dash: "7 5", y: (r) => kingman(r, 1, 1, te) },
          ]}
        />
        <Insight>
          Con ρ = {fmt(rho, 2)} cada pieza espera <strong>{fmt(wq, 1)} min</strong>. Reducir a la mitad la variabilidad del proceso la deja en{" "}
          <strong>{fmt(wqHalfCs, 1)} min</strong>; bajar la utilización 10 puntos, en <strong>{fmt(wqLowRho, 1)} min</strong>. La espera crece
          sin límite cuando ρ → 1: la capacidad ociosa es un amortiguador, no un desperdicio.
        </Insight>
      </div>
    </div>
  );
}
