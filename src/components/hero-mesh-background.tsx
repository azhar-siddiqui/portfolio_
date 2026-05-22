"use client";

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
  { ssr: false, loading: () => null }
);

export function HeroMeshBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setEnabled(!reduceMotion && isDesktop);
  }, []);

  const maskStyle = {
    maskImage:
      "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[145%] -z-10 overflow-hidden"
      style={maskStyle}
    >
      <div
        className="absolute -top-[15%] bottom-[-10%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1200px] opacity-60 dark:opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 55% at 38% 28%, hsl(217 91% 60% / 0.38), transparent 65%), radial-gradient(45% 60% at 68% 60%, hsl(263 70% 65% / 0.32), transparent 60%), radial-gradient(60% 50% at 50% 90%, hsl(199 89% 60% / 0.22), transparent 70%)",
        }}
      >
        {enabled && (
          <MeshGradient
            style={{ width: "100%", height: "100%", mixBlendMode: "screen" }}
            colors={[
              "#0a0f1e",
              "#2563eb",
              "#7c3aed",
              "#06b6d4",
              "#0a0f1e",
            ]}
            speed={0.25}
            distortion={0.85}
            swirl={0.35}
          />
        )}
      </div>
    </div>
  );
}
