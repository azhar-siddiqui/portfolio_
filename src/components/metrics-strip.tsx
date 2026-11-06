"use client";

import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (to >= 10) return Math.round(latest).toString();
    return latest.toFixed(1);
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function MetricsStrip({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <section aria-label="Career metrics" className="border-y border-border/80 bg-card/40">
      <div className="mx-auto w-full max-w-6xl">
        <ul className="grid grid-cols-2 divide-x divide-y divide-border/70 md:grid-cols-4 md:divide-y-0">
          {metrics.map((m, i) => (
            <li
              key={m.label}
              className="flex flex-col gap-2.5 px-4 py-7 sm:gap-3 sm:px-8 sm:py-10"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-serif text-[2.4rem] font-medium leading-none tracking-[-0.04em] text-foreground sm:text-6xl">
                <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-[11px] leading-tight text-muted-foreground sm:text-sm">
                {m.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
