"use client";

import { useState } from "react";
import { AMBER, INK, Insight, LineChart, Segmented, Slider, Stat, fmt } from "./LabKit";

const Z = { 90: 1.2816, 95: 1.6449, 98: 2.0537, 99: 2.3263 } as const;
type Level = keyof typeof Z;

export default function EoqTool() {
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
        <Slider label="Demanda anual D" value={D} min={500} max={50000} step={500} unit="u/año" onChange={setD} />
        <Slider label="Costo por pedido S" value={S} min={5} max={500} step={5} unit="$" onChange={setS} />
        <Slider label="Costo de mantener H" value={H} min={0.5} max={50} step={0.5} digits={1} unit="$/u·año" onChange={setH} />
        <Slider label="Tiempo de entrega L" value={L} min={1} max={60} step={1} unit="días" onChange={setL} />
        <Slider label="Variabilidad de la demanda (CV)" value={cv} min={0} max={1} step={0.05} digits={2} onChange={setCv} />
        <Segmented
          label="Nivel de servicio"
          value={level}
          onChange={setLevel}
          options={[90, 95, 98, 99].map((v) => ({ value: v as Level, label: `${v}%` }))}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Stat label="Lote económico Q*" value={fmt(eoq)} unit="u" highlight />
          <Stat label="Costo total TC*" value={`$${fmt(tcStar)}`} unit="/año" />
          <Stat label="Pedidos por año" value={fmt(D / eoq, 1)} />
          <Stat label="Ciclo" value={fmt((eoq / D) * 365, 1)} unit="días" />
          <Stat label="Stock de seguridad" value={fmt(ss)} unit="u" />
          <Stat label="Punto de reorden" value={fmt(rop)} unit="u" highlight />
        </div>

        <LineChart
          ariaLabel="Costo anual en función del tamaño de lote"
          xDomain={[eoq * 0.2, eoq * 3]}
          yMax={total(eoq * 0.2) * 1.02}
          xLabel="Tamaño de lote Q (u)"
          yLabel="Costo anual ($)"
          formatX={(v) => fmt(v)}
          formatY={(v) => `$${fmt(v)}`}
          markers={[
            { x: eoq, label: "Q*" },
            { x: q, label: "tu Q" },
          ]}
          series={[
            { id: "tc", label: "Costo total", color: INK, width: 3, y: total },
            { id: "s", label: "Pedir", color: AMBER, dash: "7 5", y: ordering },
            { id: "h", label: "Mantener", color: AMBER, dash: "1 5", width: 3, y: holding },
          ]}
        />

        <Slider label="Prueba otro lote (× Q*)" value={qRatio} min={0.3} max={3} step={0.05} digits={2} onChange={setQRatio} />
        <Insight>
          Pedir <strong>{fmt(q)} u</strong> ({fmt(qRatio, 2)}× Q*) cuesta <strong>{fmt(penalty, 1)} %</strong> más que el óptimo. La curva es
          plana cerca de Q*: equivocarse un 20 % en el lote apenas sube el costo un {fmt((total(eoq * 1.2) / tcStar - 1) * 100, 1)} %, por eso
          el EOQ es robusto ante datos imprecisos.
        </Insight>
      </div>
    </div>
  );
}
