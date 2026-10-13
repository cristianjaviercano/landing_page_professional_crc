"use client";

import { useState } from "react";
import { Insight, Slider, Stat, fmt } from "./LabKit";

const BENCH = { A: 90, P: 95, Q: 99.9, OEE: 85 };

export default function OeeTool() {
  const [planned, setPlanned] = useState(480); // min
  const [down, setDown] = useState(47); // min
  const [cycle, setCycle] = useState(30); // ideal s / unit
  const [total, setTotal] = useState(780);
  const [scrapPct, setScrapPct] = useState(2.5);

  const run = Math.max(0, planned - down);
  const maxUnits = Math.floor((run * 60) / cycle);
  const units = Math.min(total, maxUnits);
  const good = Math.round(units * (1 - scrapPct / 100));

  const A = run / planned;
  const P = run > 0 ? (units * cycle) / 60 / run : 0;
  const Q = units > 0 ? good / units : 0;
  const oee = A * P * Q;

  // time buckets (minutes) from planned time down to fully productive time
  const netRun = (units * cycle) / 60;
  const fully = (good * cycle) / 60;
  const steps = [
    { label: "Tiempo planificado", value: planned, loss: null },
    { label: "Tiempo operativo", value: run, loss: { label: "paradas", value: planned - run } },
    { label: "Tiempo neto", value: netRun, loss: { label: "velocidad", value: run - netRun } },
    { label: "Tiempo productivo", value: fully, loss: { label: "calidad", value: netRun - fully } },
  ];
  const worst = [
    { k: "disponibilidad", v: A / (BENCH.A / 100) },
    { k: "rendimiento", v: P / (BENCH.P / 100) },
    { k: "calidad", v: Q / (BENCH.Q / 100) },
  ].sort((a, b) => a.v - b.v)[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="space-y-5">
        <Slider label="Tiempo planificado" value={planned} min={60} max={720} step={10} unit="min" onChange={setPlanned} />
        <Slider label="Paradas no planificadas" value={down} min={0} max={Math.min(300, planned)} step={1} unit="min" onChange={setDown} />
        <Slider label="Ciclo ideal" value={cycle} min={1} max={120} step={1} unit="s/u" onChange={setCycle} />
        <Slider label="Unidades producidas" value={total} min={0} max={3000} step={10} unit="u" onChange={setTotal} />
        <Slider label="Defectos" value={scrapPct} min={0} max={20} step={0.5} digits={1} unit="%" onChange={setScrapPct} />
        {total > maxUnits && (
          <p className="rounded-lg border-2 border-[#1B1B1B] bg-[#1B1B1B] px-3 py-2 text-xs font-semibold text-[#F4C21B]">
            ⚠ Con ese ciclo ideal solo caben {fmt(maxUnits)} u en el tiempo operativo; se limita el conteo a ese máximo.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={`Disponibilidad (ref. ${BENCH.A}%)`} value={`${fmt(A * 100, 1)}%`} />
          <Stat label={`Rendimiento (ref. ${BENCH.P}%)`} value={`${fmt(P * 100, 1)}%`} />
          <Stat label={`Calidad (ref. ${BENCH.Q}%)`} value={`${fmt(Q * 100, 1)}%`} />
          <Stat label={`OEE (clase mundial ${BENCH.OEE}%)`} value={`${fmt(oee * 100, 1)}%`} highlight />
        </div>

        <figure aria-label="Cascada de pérdidas de tiempo del OEE" className="space-y-2.5">
          {steps.map((s) => (
            <div key={s.label}>
              <div className="mb-1 flex justify-between text-xs font-semibold">
                <span>{s.label}</span>
                <span className="font-mono">
                  {fmt(s.value)} min
                  {s.loss && <span className="text-[#1B1B1B]/55"> · −{fmt(s.loss.value)} {s.loss.label}</span>}
                </span>
              </div>
              <div className="flex h-7 overflow-hidden rounded-md border-2 border-[#1B1B1B] bg-white/60">
                <div
                  className="h-full rounded-r-[3px] bg-[#1B1B1B] transition-[width] duration-300"
                  style={{ width: `${(s.value / planned) * 100}%` }}
                />
                {s.loss && s.loss.value > 0 && (
                  <div
                    className="loss-hatch ml-[2px] h-full transition-[width] duration-300"
                    style={{ width: `${(s.loss.value / planned) * 100}%` }}
                    title={`Pérdida por ${s.loss.label}`}
                  />
                )}
              </div>
            </div>
          ))}
          <figcaption className="flex items-center gap-4 pt-1 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-5 rounded-sm bg-[#1B1B1B]" /> tiempo que agrega valor
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="loss-hatch h-3 w-5 rounded-sm border border-[#1B1B1B]" /> pérdida de la etapa
            </span>
          </figcaption>
        </figure>

        <Insight>
          De {fmt(planned)} min planificados, solo <strong>{fmt(fully)} min</strong> producen unidades buenas a velocidad ideal. Frente a la
          referencia de clase mundial, la mayor brecha está en <strong>{worst.k}</strong>: empieza el Kaizen por ahí.
        </Insight>
      </div>
    </div>
  );
}
