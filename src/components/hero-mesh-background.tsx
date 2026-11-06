"use client";

import { alpha, palette } from "@/lib/theme";
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

// Muted charcoal hero wash — understated, corporate.
const DARK_GRADIENT = `radial-gradient(50% 50% at 18% 20%, ${alpha(palette.dark.primary, 0.16)}, transparent 70%)`;

const LIGHT_GRADIENT = `radial-gradient(50% 50% at 18% 20%, ${alpha(palette.light.primary, 0.1)}, transparent 70%)`;

const DARK_MESH_COLORS = [
  palette.dark.background,
  palette.dark.card,
  palette.dark.secondary,
  palette.dark.primary,
  palette.dark.background,
] as const;
const LIGHT_MESH_COLORS = [
  palette.light.background,
  palette.light.card,
  palette.light.secondary,
  palette.light.primary,
  palette.light.background,
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

  // Default to dark until mounted so SSR and the first client pass always match.
  const isDark = !mounted ? true : resolvedTheme === "dark";

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
          opacity: isDark ? 0.35 : 0.55,
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
            speed={0.12}
            distortion={0.45}
            swirl={0.15}
          />
        )}
      </div>
    </div>
  );
}
