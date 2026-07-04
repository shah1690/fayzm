"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type AnimatedStatValueProps = Readonly<{
  target: number;
  unit: string;
  showPlus: boolean;
  /** Delay after this item enters the viewport (stagger). */
  delayMs?: number;
}>;

export function AnimatedStatValue({
  target,
  unit,
  showPlus,
  delayMs = 0,
}: AnimatedStatValueProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    const durationMs = 1400;
    const startAt = performance.now() + delayMs;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min((now - startAt) / durationMs, 1);
      setDisplay(Math.round(target * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, delayMs]);

  const readable = `${target}${unit}${showPlus ? "+" : ""}`;

  return (
    <>
      <span className="sr-only">{readable}</span>
      <p
        ref={containerRef}
        className="text-3xl font-bold tabular-nums tracking-tight text-[#070A0F] md:text-4xl"
        aria-hidden
      >
        <span>{display}</span>
        {unit !== "" ? <span>{unit}</span> : null}
        {showPlus ? <span className="opacity-[0.35]">+</span> : null}
      </p>
    </>
  );
}
