"use client";

import { useState } from "react";
import { useLocale } from "../../i18n/LocaleProvider";
import { Insight, Rich, Slider, Stat, fmt } from "./LabKit";

const BENCH = { A: 90, P: 95, Q: 99.9, OEE: 85 };

export default function OeeTool() {
  const { t, nf } = useLocale();
  const x = t.lab.oee;
  const f = (v: number, d = 0) => fmt(v, d, nf);

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
    { label: x.steps[0], value: planned, loss: null },
    { label: x.steps[1], value: run, loss: { label: x.losses[0], value: planned - run } },
    { label: x.steps[2], value: netRun, loss: { label: x.losses[1], value: run - netRun } },
    { label: x.steps[3], value: fully, loss: { label: x.losses[2], value: netRun - fully } },
  ];
  const gaps = [
    { i: 0, v: A / (BENCH.A / 100) },
    { i: 1, v: P / (BENCH.P / 100) },
    { i: 2, v: Q / (BENCH.Q / 100) },
  ].sort((a, b) => a.v - b.v);
  const worst = x.gaps[gaps[0].i];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div className="space-y-5">
        <Slider label={x.planned} value={planned} min={60} max={720} step={10} unit="min" onChange={setPlanned} />
        <Slider label={x.down} value={down} min={0} max={Math.min(300, planned)} step={1} unit="min" onChange={setDown} />
        <Slider label={x.cycle} value={cycle} min={1} max={120} step={1} unit="s/u" onChange={setCycle} />
        <Slider label={x.units} value={total} min={0} max={3000} step={10} unit="u" onChange={setTotal} />
        <Slider label={x.defects} value={scrapPct} min={0} max={20} step={0.5} digits={1} unit="%" onChange={setScrapPct} />
        {total > maxUnits && (
          <p className="rounded-lg border-2 border-[#1B1B1B] bg-[#1B1B1B] px-3 py-2 text-xs font-semibold text-[#F4C21B]">{x.cap(f(maxUnits))}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat label={`${x.A} (${x.ref} ${BENCH.A}%)`} value={`${f(A * 100, 1)}%`} />
          <Stat label={`${x.P} (${x.ref} ${BENCH.P}%)`} value={`${f(P * 100, 1)}%`} />
          <Stat label={`${x.Q} (${x.ref} ${BENCH.Q}%)`} value={`${f(Q * 100, 1)}%`} />
          <Stat label={`OEE (${x.worldClass} ${BENCH.OEE}%)`} value={`${f(oee * 100, 1)}%`} highlight />
        </div>

        <figure aria-label={x.chart} className="space-y-2.5">
          {steps.map((s) => (
            <div key={s.label}>
              <div className="mb-1 flex justify-between text-xs font-semibold">
                <span>{s.label}</span>
                <span className="font-mono">
                  {f(s.value)} min
                  {s.loss && (
                    <span className="text-[#1B1B1B]/65">
                      {" "}
                      · −{f(s.loss.value)} {s.loss.label}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex h-7 overflow-hidden rounded-md border-2 border-[#1B1B1B] bg-white/60">
                <div className="h-full rounded-r-[3px] bg-[#1B1B1B] transition-[width] duration-300" style={{ width: `${(s.value / planned) * 100}%` }} />
                {s.loss && s.loss.value > 0 && (
                  <div
                    className="loss-hatch ml-[2px] h-full transition-[width] duration-300"
                    style={{ width: `${(s.loss.value / planned) * 100}%` }}
                    title={`${x.lossTitle} ${s.loss.label}`}
                  />
                )}
              </div>
            </div>
          ))}
          <figcaption className="flex items-center gap-4 pt-1 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3 w-5 rounded-sm bg-[#1B1B1B]" /> {x.valuable}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="loss-hatch h-3 w-5 rounded-sm border border-[#1B1B1B]" /> {x.loss}
            </span>
          </figcaption>
        </figure>

        <Insight>
          <Rich text={x.insight(f(planned), f(fully), worst)} />
        </Insight>
      </div>
    </div>
  );
}
