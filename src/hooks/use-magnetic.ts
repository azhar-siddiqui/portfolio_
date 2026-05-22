"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

// Preserve color transitions that Tailwind's transition-colors provides,
// since our inline transform style overrides the Tailwind transition shorthand.
const COLOR_TRANSITIONS =
  "background-color 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease, box-shadow 150ms ease";
const SPRING_TRANSITION = `transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), ${COLOR_TRANSITIONS}`;
const TRACKING_TRANSITION = `transform 0.1s linear, ${COLOR_TRANSITIONS}`;

export function useMagnetic<T extends HTMLElement>({
  strength = 0.25,
  radius = 80,
}: UseMagneticOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    ) {
      return;
    }

    let rafId = 0;
    let isNear = false;

    const springBack = () => {
      el.style.transition = SPRING_TRANSITION;
      rafId = requestAnimationFrame(() => {
        el.style.transform = "translate3d(0, 0, 0)";
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const effectiveRadius = radius + Math.max(rect.width, rect.height) / 2;

      if (dist > effectiveRadius) {
        if (isNear) {
          isNear = false;
          cancelAnimationFrame(rafId);
          springBack();
        }
        return;
      }

      isNear = true;
      cancelAnimationFrame(rafId);
      el.style.transition = TRACKING_TRANSITION;
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });
    };

    const onLeave = () => {
      if (isNear) {
        isNear = false;
        cancelAnimationFrame(rafId);
        springBack();
      }
    };

    el.style.transition = SPRING_TRANSITION;
    el.style.willChange = "transform";

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
      el.style.transition = "";
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [strength, radius]);

  return ref;
}
