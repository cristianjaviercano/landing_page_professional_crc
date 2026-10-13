"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "../../i18n/LocaleProvider";
import CountUp from "./CountUp";
import TiltCard from "./TiltCard";

type Filter = "all" | "cases" | "apps";

export default function Projects() {
  const { t, profile } = useLocale();
  const { apps, caseStudies } = profile;
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.filters.all },
    { id: "cases", label: t.projects.filters.cases },
    { id: "apps", label: t.projects.filters.apps },
  ];
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div>
      <div role="tablist" aria-label={t.projects.filterLabel} className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`relative rounded-full border-2 border-[#1B1B1B] px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === f.id ? "text-[#F4C21B]" : "bg-[#F7F3EA] hover:bg-[#F4C21B]"
            }`}
          >
            {filter === f.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-[#1B1B1B]" />}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filter !== "apps" &&
            caseStudies.map((p, i) => (
              <motion.a
                layout
                key={p.url}
                href={p.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group block"
              >
                <TiltCard className="overflow-hidden rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] shadow-[6px_6px_0_#1B1B1B]">
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#1B1B1B] bg-[#1B1B1B]">
                    <Image
                      src={p.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full border-2 border-[#1B1B1B] bg-[#F4C21B] px-2.5 py-0.5 text-xs font-bold">
                      {t.projects.caseBadge}
                    </span>
                  </div>
                  <div className="p-5">
                    {p.metric && (
                      <p className="mb-3 flex items-baseline gap-2 border-b-2 border-dashed border-[#1B1B1B]/20 pb-3">
                        <CountUp value={p.metric.value} className="whitespace-nowrap text-3xl font-black tracking-tight" />
                        <span className="text-xs font-semibold leading-tight text-[#1B1B1B]/65">{p.metric.label}</span>
                      </p>
                    )}
                    <h3 className="mb-2 flex items-start justify-between gap-2 text-lg font-bold leading-tight">
                      {p.title}
                      <ArrowUpRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[#1B1B1B]/70">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-md bg-[#1B1B1B]/[0.07] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.a>
            ))}

          {filter !== "cases" &&
            apps.map((a, i) => (
              <motion.a
                layout
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group block"
              >
                <TiltCard className="flex min-h-[170px] flex-col justify-between rounded-2xl border-2 border-[#1B1B1B] bg-[#1B1B1B] p-5 text-[#F7F3EA] shadow-[6px_6px_0_#F4C21B]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-[#F4C21B]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#F4C21B]" />
                      {t.projects.live} · {a.tag}
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{a.title}</h3>
                    <p className="text-sm text-[#F7F3EA]/65">{a.description}</p>
                  </div>
                </TiltCard>
              </motion.a>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
