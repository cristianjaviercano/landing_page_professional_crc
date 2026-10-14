"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, FileText, GraduationCap, School } from "lucide-react";
import Link from "next/link";
import CountUp from "./CountUp";
import type { CvItem } from "../../data/profile";
import { useLocale } from "../../i18n/LocaleProvider";

const tabIcons = { industry: Briefcase, academia: School, education: GraduationCap } as const;
type TabId = keyof typeof tabIcons;

function Timeline({ items }: { items: CvItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative ml-3 space-y-8 border-l-2 border-[#1B1B1B]/15 pl-8">
      <motion.span aria-hidden style={{ scaleY }} className="absolute -left-[2px] top-0 h-full w-[2px] origin-top bg-[#1B1B1B]" />
      {items.map((it, i) => (
        <motion.li
          key={it.role + it.period}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span className="absolute -left-[42px] top-1 h-5 w-5 rounded-full border-2 border-[#1B1B1B] bg-[#F4C21B]" />
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B1B1B]/65">{it.period}</p>
          <h3 className="mt-1 text-xl font-bold leading-snug">{it.role}</h3>
          <p className="text-sm font-semibold text-[#1B1B1B]/75">
            {it.org}
            {it.place && <span className="font-normal text-[#1B1B1B]/65"> · {it.place}</span>}
          </p>
          {it.impact && (
            <div className="mt-3 flex flex-wrap gap-2">
              {it.impact.map((m) => (
                <span key={m.label} className="inline-flex items-baseline gap-1.5 rounded-lg border-2 border-[#1B1B1B] bg-[#F4C21B] px-2.5 py-1">
                  <CountUp value={m.value} className="text-lg font-black" />
                  <span className="text-xs font-semibold">{m.label}</span>
                </span>
              ))}
            </div>
          )}
          {it.points.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-[#1B1B1B]/70">
              {it.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-[#1B1B1B]" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export default function Career() {
  const { t: ui, profile, path } = useLocale();
  const { academia, education, industry, languages, skills } = profile;
  const tabs = [
    { id: "industry", label: ui.career.tabs.industry, items: industry },
    { id: "academia", label: ui.career.tabs.academia, items: academia },
    { id: "education", label: ui.career.tabs.education, items: education },
  ] as const;
  const [tab, setTab] = useState<TabId>("industry");
  const active = tabs.find((x) => x.id === tab)!;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
      <div>
        <div role="tablist" aria-label={ui.career.kicker} className="mb-8 inline-flex rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] p-1">
          {tabs.map((x) => {
            const Icon = tabIcons[x.id];
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => setTab(x.id)}
                className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold sm:px-4 ${tab === x.id ? "text-[#F4C21B]" : ""}`}
              >
                {tab === x.id && <motion.span layoutId="career-tab" className="absolute inset-0 rounded-xl bg-[#1B1B1B]" />}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{x.label}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Timeline items={active.items} />
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] p-5 shadow-[4px_4px_0_#1B1B1B]">
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider">{ui.career.skills}</h3>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.group}>
                <p className="mb-2 text-sm font-bold">{s.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-[#1B1B1B]/25 bg-white/60 px-2 py-0.5 text-xs transition-colors hover:border-[#1B1B1B] hover:bg-[#F4C21B]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t-2 border-dashed border-[#1B1B1B]/25 pt-4">
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">{ui.career.languages}</h3>
            {languages.map((l) => (
              <p key={l.name} className="text-sm">
                <span className="font-bold">{l.name}</span> <span className="text-[#1B1B1B]/65">— {l.level}</span>
              </p>
            ))}
          </div>
        </div>

        <Link
          href={path("/cv")}
          className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#1B1B1B] bg-[#F4C21B] p-5 shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-1"
        >
          <span>
            <span className="block text-lg font-black">{ui.career.cvCard}</span>
            <span className="text-sm text-[#1B1B1B]/75">{ui.career.cvCardSub}</span>
          </span>
          <FileText className="h-8 w-8 flex-shrink-0 transition-transform group-hover:rotate-6" />
        </Link>
      </aside>
    </div>
  );
}
