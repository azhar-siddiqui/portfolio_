"use client";

import { palette } from "@/lib/theme";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

/**
 * Hydrates every `<div class="mermaid-diagram" data-mermaid-source="…">` that
 * the rehype plugin emits, replacing it with an interactive viewer:
 *
 *  - Pan via click/touch drag (single-finger touches still scroll the page —
 *    `touch-action: pan-y` lets vertical reading flow through diagrams).
 *  - Pinch-to-zoom on touch, Ctrl/Cmd + wheel on desktop.
 *  - On-canvas controls (− / + / ⊙ reset / ⛶ fullscreen) — single click.
 *
 * Both `mermaid` and `@panzoom/panzoom` are dynamically imported so pages
 * without diagrams don't pay the bundle cost.
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
    // Wait until next-themes has resolved the actual theme on the client.
    // `resolvedTheme` is `undefined` for the very first render — initialising
    // Mermaid then would lock every diagram into the light palette and the
    // subsequent re-run would be a no-op because of `.mermaid-rendered`.
    if (!resolvedTheme) return;
    const host = rootRef.current;
    let cancelled = false;
    let renderId = 0;
    const cleanupFns: Array<() => void> = [];

    // On re-runs (theme toggle, MDX hot-reload), un-mark previously rendered
    // placeholders so the new theme actually propagates into their SVGs.
    host
      .querySelectorAll<HTMLElement>(".mermaid-diagram.mermaid-rendered")
      .forEach((node) => node.classList.remove("mermaid-rendered"));

    (async () => {
      const placeholders = host.querySelectorAll<HTMLElement>(
        ".mermaid-diagram:not(.mermaid-rendered)",
      );
      if (placeholders.length === 0) return;

      const [{ default: mermaid }, { default: Panzoom }] = await Promise.all([
        import("mermaid"),
        import("@panzoom/panzoom"),
      ]);
      if (cancelled) return;

      // Mermaid measures text widths in an offscreen DOM pass during layout.
      // If Outfit hasn't loaded yet, it measures with the fallback font,
      // freezes the layout, then the real font swaps in and the boxes end up
      // too small. `document.fonts.ready` only waits for loads already in
      // flight, so we probe the real family first.
      if (typeof document !== "undefined" && "fonts" in document) {
        // next/font registers Outfit under a hashed family name, not the
        // literal "Outfit", so document.fonts.load('"Outfit"') resolves empty.
        // A hidden probe that uses var(--font-sans) starts the real load, and
        // document.fonts.ready then waits for it to finish.
        const probe = document.createElement("span");
        probe.setAttribute("aria-hidden", "true");
        probe.style.cssText =
          "position:absolute;left:-9999px;visibility:hidden;font-size:14px;font-family:var(--font-sans)";
        probe.textContent = "Ag";
        document.body.appendChild(probe);
        try {
          await document.fonts.ready;
        } catch {
          /* non-fatal */
        } finally {
          probe.parentNode?.removeChild(probe);
        }
      }
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      if (cancelled) return;

      // Mermaid embeds this string directly into the SVG `font-family`
      // attribute. CSS variables like `var(--font-sans)` are NOT resolved in
      // that context, so the SVG text would silently fall back to the browser
      // default. Inter is the face loaded by next/font in layout.tsx.
      const mermaidFontFamily =
        '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

      mermaid.initialize({
        startOnLoad: false,
        // We control the diagram source (it comes from our own MDX), so the
        // stricter sandbox isn't needed. `loose` keeps Mermaid v11's internals
        // on the well-tested path and avoids subtle layout differences seen
        // with `strict` in production builds.
        securityLevel: "loose",
        theme: resolvedTheme === "dark" ? "dark" : "default",
        themeVariables: {
          background: "transparent",
          primaryColor:
            resolvedTheme === "dark" ? palette.dark.card : palette.light.card,
          primaryTextColor:
            resolvedTheme === "dark"
              ? palette.dark.foreground
              : palette.light.foreground,
          primaryBorderColor:
            resolvedTheme === "dark"
              ? palette.dark.primary
              : palette.light.primary,
          lineColor:
            resolvedTheme === "dark"
              ? palette.dark.mutedForeground
              : palette.light.mutedForeground,
          fontFamily: mermaidFontFamily,
        },
        fontFamily: mermaidFontFamily,
      });

      for (const node of Array.from(placeholders)) {
        const source = node.getAttribute("data-mermaid-source");
        if (!source) continue;
        const id = `mermaid-${Date.now()}-${++renderId}`;
        try {
          const { svg } = await mermaid.render(id, source);
          if (cancelled) return;

          // Build the viewer DOM: a clipped canvas (the diagram extends beyond
          // visible area when zoomed) plus an overlay control bar.
          node.innerHTML = `
            <div class="mermaid-canvas">
              <div class="mermaid-stage">${svg}</div>
              <div class="mermaid-controls" role="toolbar" aria-label="Diagram controls">
                <button type="button" class="mermaid-btn" data-action="zoom-out" aria-label="Zoom out">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </button>
                <button type="button" class="mermaid-btn" data-action="zoom-in" aria-label="Zoom in">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </button>
                <button type="button" class="mermaid-btn" data-action="reset" aria-label="Reset view">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>
                </button>
                <button type="button" class="mermaid-btn" data-action="fullscreen" aria-label="Fullscreen">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>
                </button>
              </div>
              <div class="mermaid-hint" aria-hidden="true">Drag to pan · Ctrl + scroll or pinch to zoom</div>
            </div>
          `;
          node.classList.add("mermaid-rendered");

          const stage = node.querySelector<HTMLElement>(".mermaid-stage");
          const canvas = node.querySelector<HTMLElement>(".mermaid-canvas");
          if (!stage || !canvas) continue;

          // Ensure the inner SVG can scale freely — Mermaid sets width/height
          // attributes that would otherwise pin it.
          const svgEl = stage.querySelector<SVGElement>("svg");
          if (svgEl) {
            svgEl.removeAttribute("width");
            svgEl.removeAttribute("height");
            svgEl.style.width = "100%";
            svgEl.style.height = "100%";
            svgEl.style.maxWidth = "100%";
          }

          const pz = Panzoom(stage, {
            maxScale: 6,
            minScale: 0.4,
            step: 0.25,
            animate: true,
            duration: 180,
            canvas: true,
            cursor: "grab",
            // Let vertical scroll pass through single-finger touches. Two-finger
            // pinch is still handled by panzoom.
            touchAction: "pan-y",
          });

          // Ctrl/Cmd + wheel = zoom; bare wheel = page scroll.
          const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            pz.zoomWithWheel(e);
          };
          canvas.addEventListener("wheel", onWheel, { passive: false });

          const onAction = (e: Event) => {
            const btn = (e.target as HTMLElement).closest<HTMLElement>(
              "[data-action]",
            );
            if (!btn) return;
            switch (btn.dataset.action) {
              case "zoom-in":
                pz.zoomIn();
                break;
              case "zoom-out":
                pz.zoomOut();
                break;
              case "reset":
                pz.reset();
                break;
              case "fullscreen":
                toggleFullscreen(canvas);
                break;
            }
          };
          canvas.addEventListener("click", onAction);

          cleanupFns.push(() => {
            pz.destroy();
            canvas.removeEventListener("wheel", onWheel);
            canvas.removeEventListener("click", onAction);
          });
        } catch (err) {
          if (cancelled) return;
          // Surface the underlying failure in the browser console — the
          // placeholder text alone is easy to miss in production, and silent
          // failures are exactly what masked this issue originally.
          // eslint-disable-next-line no-console
          console.warn("[MermaidRenderer] render failed", err, {
            id,
            source,
          });
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
      cleanupFns.forEach((fn) => fn());
    };
  }, [resolvedTheme, children]);

  return (
    <div ref={rootRef} className="mermaid-host">
      {children}
    </div>
  );
}

function toggleFullscreen(el: HTMLElement) {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void el.requestFullscreen?.();
  }
}
