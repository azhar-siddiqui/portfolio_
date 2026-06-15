"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MeshGradient = dynamic(
  async () => {
    try {
      const mod = await import("@paper-design/shaders-react");
      return mod.MeshGradient;
    } catch {
      return () => null;
    }
  },
  { ssr: false, loading: () => null },
);

const maskStyle = {
  maskImage:
    "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
};

// Refined slate-blue hero wash — professional, not decorative.
const DARK_GRADIENT =
  "radial-gradient(55% 55% at 38% 28%, hsl(217 91% 55% / 0.22), transparent 65%), radial-gradient(45% 60% at 68% 60%, hsl(199 89% 48% / 0.14), transparent 60%), radial-gradient(60% 50% at 50% 90%, hsl(222 47% 28% / 0.35), transparent 70%)";

const LIGHT_GRADIENT =
  "radial-gradient(55% 55% at 38% 28%, hsl(217 91% 72% / 0.12), transparent 65%), radial-gradient(45% 60% at 68% 60%, hsl(199 89% 68% / 0.1), transparent 60%), radial-gradient(60% 50% at 50% 90%, hsl(214 32% 82% / 0.18), transparent 70%)";

const DARK_MESH_COLORS = [
  "#0a0f1e",
  "#1d4ed8",
  "#0ea5e9",
  "#111827",
  "#0a0f1e",
] as const;
const LIGHT_MESH_COLORS = [
  "#f8fafc",
  "#bfdbfe",
  "#e0f2fe",
  "#f1f5f9",
  "#f8fafc",
] as const;

export function HeroMeshBackground() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduceMotion && isDesktop);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[145%] -z-10 overflow-hidden"
      style={maskStyle}
    >
      <div
        className="absolute -top-[15%] bottom-[-10%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1200px] blur-3xl"
        style={{
          background: isDark ? DARK_GRADIENT : LIGHT_GRADIENT,
          opacity: isDark ? 0.45 : 0.75,
        }}
      >
        {enabled && (
          <MeshGradient
            style={{
              width: "100%",
              height: "100%",
              mixBlendMode: isDark ? "screen" : "multiply",
              opacity: isDark ? 1 : 0.45,
            }}
            colors={isDark ? [...DARK_MESH_COLORS] : [...LIGHT_MESH_COLORS]}
            speed={0.25}
            distortion={0.85}
            swirl={0.35}
          />
        )}
      </div>
    </div>
  );
}
