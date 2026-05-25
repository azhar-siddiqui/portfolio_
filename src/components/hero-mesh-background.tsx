"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const MeshGradient = dynamic(
  async () => {
    try {
      const mod = await import("@paper-design/shaders-react");
      return mod.MeshGradient;
    } catch {
      return () => null;
    }
  },
  { ssr: false, loading: () => null }
);

const maskStyle = {
  maskImage:
    "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
};

// Aurora-borealis mood for the dark hero — electric lavender, magenta, teal.
const DARK_GRADIENT =
  "radial-gradient(55% 55% at 38% 28%, hsl(248 92% 64% / 0.42), transparent 65%), radial-gradient(45% 60% at 68% 60%, hsl(286 80% 60% / 0.32), transparent 60%), radial-gradient(60% 50% at 50% 90%, hsl(188 86% 55% / 0.24), transparent 70%)";

// Warm sunrise for the light hero — clay, honey, indigo-mist.
const LIGHT_GRADIENT =
  "radial-gradient(55% 55% at 38% 28%, hsl(28 92% 72% / 0.20), transparent 65%), radial-gradient(45% 60% at 68% 60%, hsl(232 86% 76% / 0.16), transparent 60%), radial-gradient(60% 50% at 50% 90%, hsl(38 90% 74% / 0.14), transparent 70%)";

const DARK_MESH_COLORS = ["#0b0c1a", "#5b4bff", "#a855f7", "#0ea5b7", "#0b0c1a"] as const;
const LIGHT_MESH_COLORS = ["#fff3e2", "#f5c79e", "#c9bfff", "#e0eef0", "#fff7eb"] as const;

export function HeroMeshBackground() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          opacity: isDark ? 0.55 : 0.95,
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
