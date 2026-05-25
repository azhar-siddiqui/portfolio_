"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * Hydrates every <div class="mermaid-diagram" data-mermaid-source="..."> that
 * sits inside the wrapped subtree. The rehype plugin emits these placeholders
 * for fenced ```mermaid blocks in markdown; we render them to SVG on mount.
 *
 * Implementation notes:
 *  - We dynamically import the mermaid library so the ~700KB bundle is only
 *    paid for on pages that actually contain diagrams.
 *  - Theme follows next-themes and re-renders when it flips.
 *  - We use mermaid.render() directly (not mermaid.run()) to avoid touching
 *    foreign markup and to recover gracefully on syntax errors.
 */
export function MermaidRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!rootRef.current) return;
    const host = rootRef.current;
    let cancelled = false;
    let renderId = 0;

    (async () => {
      const diagrams = host.querySelectorAll<HTMLElement>(".mermaid-diagram");
      if (diagrams.length === 0) return;

      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: resolvedTheme === "dark" ? "dark" : "default",
        themeVariables:
          resolvedTheme === "dark"
            ? {
                background: "transparent",
                primaryColor: "#1d2645",
                primaryTextColor: "#eef2ff",
                primaryBorderColor: "#3b82f6",
                lineColor: "#94a3b8",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
              }
            : {
                background: "transparent",
                primaryColor: "#eef2ff",
                primaryTextColor: "#1e1b4b",
                primaryBorderColor: "#6366f1",
                lineColor: "#475569",
                fontFamily: "var(--font-sans), system-ui, sans-serif",
              },
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      });

      for (const node of Array.from(diagrams)) {
        const source = node.getAttribute("data-mermaid-source");
        if (!source) continue;
        const id = `mermaid-${Date.now()}-${++renderId}`;
        try {
          const { svg } = await mermaid.render(id, source);
          if (cancelled) return;
          node.innerHTML = svg;
          node.classList.add("mermaid-rendered");
        } catch (err) {
          if (cancelled) return;
          node.innerHTML = `<div class="text-sm text-destructive font-mono">Mermaid render error: ${
            err instanceof Error ? err.message : "unknown"
          }</div><pre class="text-xs opacity-80">${source.replace(
            /</g,
            "&lt;",
          )}</pre>`;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedTheme, children]);

  return (
    <div ref={rootRef} className="mermaid-host">
      {children}
    </div>
  );
}
