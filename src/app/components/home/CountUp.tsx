"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts the leading number of `value` up from 0 the first time it scrolls into view ("87%" -> 0…87%). */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !inView || reduced) return;
    const [, pre, num, post] = match;
    const controls = animate(0, Number(num), {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${pre}${Math.round(v)}${post}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
