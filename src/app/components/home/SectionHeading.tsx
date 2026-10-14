import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  kicker,
  title,
  children,
  invert = false,
  as: Heading = "h2",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  invert?: boolean;
  /** Heading level: the home page uses h2 under its hero h1; standalone pages pass "h1". */
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="mb-10 max-w-3xl">
      <p className={`mb-3 flex items-baseline gap-3 ${invert ? "text-[#F4C21B]" : "text-[#1B1B1B]"}`}>
        <span className="font-mono text-sm font-bold">{index}</span>
        <span className={`h-px w-10 ${invert ? "bg-[#F4C21B]" : "bg-[#1B1B1B]"}`} />
        <span className="font-hand text-2xl">{kicker}</span>
      </p>
      <Heading className={`text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl ${invert ? "text-[#F7F3EA]" : "text-[#1B1B1B]"}`}>
        {title}
      </Heading>
      {children && <p className={`mt-4 text-lg leading-relaxed ${invert ? "text-[#F7F3EA]/70" : "text-[#1B1B1B]/70"}`}>{children}</p>}
    </Reveal>
  );
}

/** Yellow brush highlight behind a word. */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="brush-mark absolute inset-x-[-4%] bottom-[0.05em] z-0 h-[0.42em]" />
    </span>
  );
}

/** Renders a `{ pre, mark, post }` title from the UI dictionary. */
export function titleWithMark(t: { pre: string; mark: string; post: string }) {
  return (
    <>
      {t.pre} <Mark>{t.mark}</Mark>
      {t.post}
    </>
  );
}
