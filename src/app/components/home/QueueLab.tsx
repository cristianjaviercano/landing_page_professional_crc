"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useLocale } from "../../i18n/LocaleProvider";

const INK = "#1B1B1B";
const YELLOW = "#F4C21B";
const PAPER = "#F7F3EA";

/** Real seconds -> simulated minutes at 1x. */
const BASE_RATE = 0.1;
const SPARK_SAMPLES = 240;
const MAX_DRAWN = 40;

type Customer = { id: number; arrival: number; x: number; y: number; leaving: boolean };

type Stats = {
  t: number;
  served: number;
  areaL: number;
  areaLq: number;
  sumW: number;
  sumWq: number;
  busy: number;
};

type Snapshot = {
  inSystem: number;
  served: number;
  L: number;
  Lq: number;
  W: number;
  Wq: number;
  rho: number;
};

const expo = (rate: number) => -Math.log(1 - Math.random()) / rate;

function theory(lambda: number, mu: number) {
  const rho = lambda / mu;
  if (rho >= 1) return null;
  return { rho, L: rho / (1 - rho), Lq: (rho * rho) / (1 - rho), W: 1 / (mu - lambda), Wq: rho / (mu - lambda) };
}

const fmtN = (v: number | undefined, d = 2, loc = "es-CO") =>
  v === undefined || !Number.isFinite(v) ? "—" : v.toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d });

export default function QueueLab() {
  const { t, nf } = useLocale();
  const x = t.lab.mm1;
  const fmt = (v: number | undefined, d = 2) => fmtN(v, d, nf);
  // canvas text is drawn inside the animation loop; read the active strings through a ref so a language change never restarts it
  const labels = useRef({ server: x.server, inQueue: x.inQueue, nOfT: x.nOfT, lTheory: x.lTheory });
  labels.current = { server: x.server, inQueue: x.inQueue, nOfT: x.nOfT, lTheory: x.lTheory };
  const [lambda, setLambda] = useState(4);
  const [mu, setMu] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [running, setRunning] = useState(true);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useRef({ lambda, mu, speed, running });

  useEffect(() => {
    params.current = { lambda, mu, speed, running };
  }, [lambda, mu, speed, running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---- simulation state (sim time in minutes) ----
    let now = 0;
    let nextId = 0;
    let nextArrival = expo(params.current.lambda);
    let serviceEnd = Infinity;
    let inService: Customer | null = null;
    const queue: Customer[] = [];
    const leaving: Customer[] = [];
    const spark: number[] = [];
    let sparkClock = 0;
    let lastParams = { lambda: params.current.lambda, mu: params.current.mu };
    const stats: Stats = { t: 0, served: 0, areaL: 0, areaLq: 0, sumW: 0, sumWq: 0, busy: 0 };
    const resetStats = () => Object.assign(stats, { t: 0, served: 0, areaL: 0, areaLq: 0, sumW: 0, sumWq: 0, busy: 0 });

    const layout = () => {
      const laneY = Math.min(110, height * 0.36);
      const serverX = width - Math.max(90, width * 0.16);
      return { laneY, serverX, slot: Math.max(18, Math.min(26, width / 34)) };
    };

    const advanceTo = (target: number) => {
      // process events in order until `target`
      while (true) {
        const nextEvt = Math.min(nextArrival, serviceEnd);
        const until = Math.min(nextEvt, target);
        const dt = until - now;
        const n = queue.length + (inService ? 1 : 0);
        stats.areaL += n * dt;
        stats.areaLq += queue.length * dt;
        stats.busy += (inService ? 1 : 0) * dt;
        stats.t += dt;
        now = until;
        if (nextEvt > target) break;

        if (nextArrival <= serviceEnd) {
          const { laneY } = layout();
          const c: Customer = { id: nextId++, arrival: now, x: -20, y: laneY, leaving: false };
          if (!inService) {
            inService = c;
            serviceEnd = now + expo(params.current.mu);
          } else {
            queue.push(c);
          }
          nextArrival = now + expo(params.current.lambda);
        } else {
          const done = inService!;
          stats.served += 1;
          stats.sumW += now - done.arrival;
          done.leaving = true;
          leaving.push(done);
          inService = queue.shift() ?? null;
          if (inService) {
            stats.sumWq += now - inService.arrival;
            serviceEnd = now + expo(params.current.mu);
          } else {
            serviceEnd = Infinity;
          }
        }
      }
    };

    const ease = (from: number, to: number, k: number) => from + (to - from) * k;

    const drawBox = (x: number, y: number, s: number, fill: string) => {
      ctx.fillStyle = fill;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - s / 2, y - s / 2, s, s, 4);
      ctx.fill();
      ctx.stroke();
    };

    const draw = (dtReal: number) => {
      const { laneY, serverX, slot } = layout();
      const k = 1 - Math.exp(-dtReal * 10);
      ctx.clearRect(0, 0, width, height);

      // lane
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(0, laneY + slot * 0.75);
      ctx.lineTo(width, laneY + slot * 0.75);
      ctx.stroke();
      ctx.setLineDash([]);

      // server
      const sw = slot * 2.4;
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.roundRect(serverX - sw / 2, laneY - sw / 2 - 6, sw, sw + 12, 8);
      ctx.fill();
      ctx.fillStyle = YELLOW;
      ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText(labels.current.server, serverX, laneY - sw / 2 - 14);

      if (inService) {
        inService.x = ease(inService.x, serverX, k);
        inService.y = ease(inService.y, laneY, k);
        drawBox(inService.x, inService.y, slot * 0.9, YELLOW);
        const remaining = Number.isFinite(serviceEnd) ? Math.max(0, serviceEnd - now) : 0;
        const prog = 1 - Math.min(1, remaining * params.current.mu);
        ctx.strokeStyle = YELLOW;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(serverX, laneY, sw * 0.5 + 2, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
        ctx.stroke();
      }

      // queue (first in line is next to the server)
      queue.forEach((c, i) => {
        if (i >= MAX_DRAWN) return;
        const tx = serverX - sw / 2 - slot * 0.9 - i * slot;
        c.x = ease(c.x, Math.max(tx, slot * 0.6), k);
        c.y = ease(c.y, laneY, k);
        if (tx > 0) drawBox(c.x, c.y, slot * 0.78, PAPER);
      });
      if (queue.length > 0 && serverX - sw / 2 - slot * 0.9 - (queue.length - 1) * slot < 0) {
        ctx.fillStyle = INK;
        ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "left";
        ctx.fillText(`+${queue.length} ${labels.current.inQueue}`, 8, laneY - slot);
      }

      // departures
      for (let i = leaving.length - 1; i >= 0; i--) {
        const c = leaving[i];
        c.x += dtReal * 260;
        c.y = ease(c.y, laneY - slot * 0.2, k);
        drawBox(c.x, c.y, slot * 0.78, YELLOW);
        if (c.x > width + 30) leaving.splice(i, 1);
      }

      // sparkline of L(t)
      const top = laneY + slot * 2;
      const h = height - top - 18;
      if (h > 30) {
        const th = theory(params.current.lambda, params.current.mu);
        const maxV = Math.max(4, ...spark, th ? th.L * 1.6 : 0);
        let labelY: number | null = null;
        ctx.fillStyle = "rgba(27,27,27,0.55)";
        ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "left";
        ctx.fillText(labels.current.nOfT, 0, top - 4);
        if (th) {
          const y = top + h - (th.L / maxV) * h;
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = INK;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
          ctx.setLineDash([]);
          labelY = y;
        }
        if (spark.length > 1) {
          ctx.beginPath();
          spark.forEach((v, i) => {
            const x = (i / (SPARK_SAMPLES - 1)) * width;
            const y = top + h - (v / maxV) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.lineTo(((spark.length - 1) / (SPARK_SAMPLES - 1)) * width, top + h);
          ctx.lineTo(0, top + h);
          ctx.closePath();
          ctx.fillStyle = "rgba(244,194,27,0.55)";
          ctx.fill();
          ctx.strokeStyle = INK;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (th && labelY !== null) {
          // drawn last so the series never hides it
          const text = `${labels.current.lTheory} = ${th.L.toFixed(2)}`;
          const tw = ctx.measureText(text).width;
          ctx.fillStyle = PAPER;
          ctx.fillRect(width - tw - 8, labelY - 15, tw + 8, 15);
          ctx.fillStyle = INK;
          ctx.textAlign = "right";
          ctx.fillText(text, width - 3, labelY - 4);
        }
      }
    };

    let raf = 0;
    let last = performance.now();
    let lastSnap = 0;
    const loop = (ts: number) => {
      const dtReal = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      const p = params.current;

      if (p.lambda !== lastParams.lambda || p.mu !== lastParams.mu) {
        // new parameters: re-draw pending clocks and restart the estimators
        nextArrival = now + expo(p.lambda);
        if (inService) serviceEnd = now + expo(p.mu);
        resetStats();
        spark.length = 0;
        lastParams = { lambda: p.lambda, mu: p.mu };
      }

      if (p.running) {
        const target = now + dtReal * BASE_RATE * p.speed;
        advanceTo(target);
        sparkClock += dtReal * BASE_RATE * p.speed;
        while (sparkClock > 0.05) {
          sparkClock -= 0.05;
          spark.push(queue.length + (inService ? 1 : 0));
          if (spark.length > SPARK_SAMPLES) spark.shift();
        }
      }
      draw(dtReal);

      if (ts - lastSnap > 300) {
        lastSnap = ts;
        const t = stats.t || 1e-9;
        setSnap({
          inSystem: queue.length + (inService ? 1 : 0),
          served: stats.served,
          L: stats.areaL / t,
          Lq: stats.areaLq / t,
          W: stats.served ? stats.sumW / stats.served : NaN,
          Wq: stats.served ? stats.sumWq / stats.served : NaN,
          rho: stats.busy / t,
        });
      }
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    // Only simulate and paint while the lab is on screen.
    let visible = true;
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [resetKey]);

  const th = theory(lambda, mu);
  const rho = lambda / mu;
  const littleObs = snap && Number.isFinite(snap.W) ? lambda * snap.W : NaN;

  const rows: { label: string; sym: string; th?: number; obs?: number }[] = [
    { label: x.rows.rho, sym: "ρ", th: th?.rho, obs: snap?.rho },
    { label: x.rows.L, sym: "L", th: th?.L, obs: snap?.L },
    { label: x.rows.Lq, sym: "Lq", th: th?.Lq, obs: snap?.Lq },
    { label: x.rows.W, sym: "W", th: th?.W, obs: snap?.W },
    { label: x.rows.Wq, sym: "Wq", th: th?.Wq, obs: snap?.Wq },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-[#1B1B1B] bg-[#F7F3EA] shadow-[8px_8px_0_#1B1B1B]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1B1B1B] bg-[#1B1B1B] px-5 py-3 text-[#F7F3EA]">
        <p className="font-mono text-sm font-semibold">
          <span className="text-[#F4C21B]">M/M/1</span> · {x.header}
        </p>
        <div className="flex items-center gap-2">
          {[1, 5, 25].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold transition-colors ${
                speed === s ? "bg-[#F4C21B] text-[#1B1B1B]" : "text-[#F7F3EA]/70 hover:text-[#F7F3EA]"
              }`}
            >
              {s}×
            </button>
          ))}
          <button onClick={() => setRunning((r) => !r)} aria-label={running ? x.pause : x.resume} className="ml-2 rounded-md p-1 hover:bg-white/10">
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button onClick={() => setResetKey((k) => k + 1)} aria-label={x.reset} className="rounded-md p-1 hover:bg-white/10">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        <div className="border-b-2 border-[#1B1B1B] p-5 lg:border-b-0 lg:border-r-2">
          <canvas ref={canvasRef} className="h-[300px] w-full" aria-label={x.canvas} role="img" />

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="flex justify-between text-sm font-semibold">
                <span>{x.arrivals}</span>
                <span className="font-mono">{fmt(lambda, 1)} {x.perMin}</span>
              </span>
              <input type="range" min={0.5} max={10} step={0.1} value={lambda} onChange={(e) => setLambda(+e.target.value)} className="lab-range mt-2 w-full" />
            </label>
            <label className="block">
              <span className="flex justify-between text-sm font-semibold">
                <span>{x.service}</span>
                <span className="font-mono">{fmt(mu, 1)} {x.perMin}</span>
              </span>
              <input type="range" min={0.5} max={10} step={0.1} value={mu} onChange={(e) => setMu(+e.target.value)} className="lab-range mt-2 w-full" />
            </label>
          </div>
        </div>

        <div className="p-5">
          <div
            className={`mb-4 flex items-center justify-between rounded-xl border-2 border-[#1B1B1B] px-4 py-3 ${
              rho >= 1 ? "bg-[#1B1B1B] text-[#F4C21B]" : rho > 0.85 ? "bg-[#F4C21B]" : "bg-white/60"
            }`}
          >
            <span className="text-sm font-semibold">
              {rho >= 1 ? x.unstable : rho > 0.85 ? x.critical : x.stable}
            </span>
            <span className="font-mono text-lg font-black">ρ = {fmt(rho, 2)}</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#1B1B1B] text-left font-mono text-[11px] uppercase tracking-wide">
                <th className="py-2 font-semibold">{x.metric}</th>
                <th className="py-2 text-right font-semibold">{x.theory}</th>
                <th className="py-2 text-right font-semibold">{x.simulated}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.sym} className="border-b border-[#1B1B1B]/15">
                  <td className="py-2">
                    <span className="mr-2 inline-block w-6 font-mono font-bold">{r.sym}</span>
                    <span className="text-[#1B1B1B]/70">{r.label}</span>
                  </td>
                  <td className="py-2 text-right font-mono">{th ? fmt(r.th) : "∞"}</td>
                  <td className="py-2 text-right font-mono font-bold">{fmt(r.obs)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 rounded-xl border-2 border-dashed border-[#1B1B1B]/40 p-3 text-sm">
            <p className="font-hand text-xl leading-none">{x.little}</p>
            <p className="mt-1 font-mono text-xs text-[#1B1B1B]/75">
              L sim = {fmt(snap?.L)} · λ·W sim = {fmt(littleObs)} · {x.served} = {snap?.served ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
