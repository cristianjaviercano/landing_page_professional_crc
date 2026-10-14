"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import CountUp from "../home/CountUp";
import { useLocale } from "../../i18n/LocaleProvider";
import SceneGuard from "./SceneGuard";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero() {
  const reduced = useReducedMotion();
  const { t, path } = useLocale();
  const h = t.hero;

  return (
    <section className="hero-paper relative isolate overflow-hidden text-[#1B1B1B]">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl grid-cols-1 items-center gap-4 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-0 lg:px-8 lg:pt-0">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#1B1B1B] bg-[#F7F3EA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            <span className="h-2 w-2 rounded-full bg-[#F4C21B] ring-2 ring-[#1B1B1B]" />
            {h.kicker}
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl xl:text-7xl"
          >
            {h.title.pre}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{h.title.mark}</span>
              <svg
                aria-hidden
                viewBox="0 0 300 40"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-[-4%] z-0 h-[0.55em] w-[108%]"
              >
                <motion.path
                  d="M4 26 C 60 8, 120 34, 180 18 S 270 10, 296 22"
                  fill="none"
                  stroke="#F4C21B"
                  strokeWidth="22"
                  strokeLinecap="round"
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7, duration: 0.9, ease: "easeInOut" }}
                />
              </svg>
            </span>
            {h.title.post}
          </motion.h1>

          <motion.p custom={2} variants={rise} initial="hidden" animate="show" className="mt-6 max-w-lg text-base leading-relaxed text-[#1B1B1B]/75 sm:text-lg">
            <strong className="text-[#1B1B1B]">Cristian Javier Cano Mogollón</strong> {h.intro}
          </motion.p>

          <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
            <a
              href={path("/#proyectos")}
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-5 py-3 font-semibold text-[#F4C21B] shadow-[4px_4px_0_#F4C21B] transition-transform hover:-translate-y-0.5"
            >
              {h.ctaProjects}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={path("/#conectar")}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#F7F3EA] px-5 py-3 font-semibold shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-0.5"
            >
              {h.ctaTalk}
            </a>
          </motion.div>

          <motion.dl custom={4} variants={rise} initial="hidden" animate="show" className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {h.metrics.map((m) => (
              <div key={m.label} className="border-l-4 border-[#F4C21B] pl-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-3xl font-black">
                  <CountUp value={m.value} />
                </dd>
                <dd className="text-xs leading-tight text-[#1B1B1B]/65">{m.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 h-[52svh] min-h-[340px] lg:order-2 lg:h-[80svh]"
        >
          <SceneGuard animate={!reduced} />
        </motion.div>
      </div>

      <a
        href={path("/#sobre-mi")}
        aria-label={h.scrollDown}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border-2 border-[#1B1B1B] bg-[#F4C21B] p-2 lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
      <div className="paper-grain pointer-events-none absolute inset-0 -z-10" aria-hidden />
    </section>
  );
}
