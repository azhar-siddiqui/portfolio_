"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hydrates every `<figure class="zoomable-image" data-src="…" data-alt="…" data-caption="…">`
 * element emitted by the markdown pipeline, attaching a click-to-fullscreen
 * lightbox with pan/zoom support (mouse scroll, pinch, +/- buttons, drag).
 *
 * The mechanism mirrors MermaidRenderer: the server renders a static placeholder;
 * this client component enhances it on mount.
 */
export function ZoomableImageRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const openModal = useCallback((src: string, alt: string) => {
    // Prevent duplicate modals
    if (document.getElementById("zi-modal-overlay")) return;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartTX = 0;
    let dragStartTY = 0;

    const MIN_SCALE = 0.5;
    const MAX_SCALE = 6;
    const SCALE_STEP = 0.25;

    // Build overlay DOM
    const overlay = document.createElement("div");
    overlay.id = "zi-modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", alt || "Diagram fullscreen view");
    overlay.className = "zi-overlay";

    const canvas = document.createElement("div");
    canvas.className = "zi-canvas";

    const stage = document.createElement("div");
    stage.className = "zi-stage";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.className = "zi-img";
    img.draggable = false;

    stage.appendChild(img);

    const controls = document.createElement("div");
    controls.className = "zi-controls";
    controls.setAttribute("role", "toolbar");
    controls.setAttribute("aria-label", "Image controls");
    controls.innerHTML = `
      <button type="button" class="zi-btn" data-action="zoom-out" aria-label="Zoom out" title="Zoom out">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button type="button" class="zi-btn" data-action="zoom-in" aria-label="Zoom in" title="Zoom in">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button type="button" class="zi-btn" data-action="reset" aria-label="Reset zoom" title="Reset zoom">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>
      </button>
      <button type="button" class="zi-btn zi-btn-close" data-action="close" aria-label="Close" title="Close (Esc)">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    const hint = document.createElement("div");
    hint.className = "zi-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "Drag to pan · scroll or pinch to zoom";

    canvas.appendChild(stage);
    canvas.appendChild(controls);
    canvas.appendChild(hint);
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // Force reflow then add visible class for CSS transition
    requestAnimationFrame(() => {
      overlay.classList.add("zi-overlay-visible");
    });

    function applyTransform() {
      stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function zoomBy(delta: number, cx?: number, cy?: number) {
      const prevScale = scale;
      scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
      if (cx !== undefined && cy !== undefined) {
        const rect = canvas.getBoundingClientRect();
        const ox = cx - rect.left - rect.width / 2;
        const oy = cy - rect.top - rect.height / 2;
        const factor = scale / prevScale;
        translateX = ox - (ox - translateX) * factor;
        translateY = oy - (oy - translateY) * factor;
      }
      applyTransform();
    }

    function resetView() {
      scale = 1;
      translateX = 0;
      translateY = 0;
      applyTransform();
    }

    function close() {
      // Remove all window-level listeners first
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("keydown", onKeyDown);

      overlay.classList.remove("zi-overlay-visible");
      document.body.style.overflow = "";
      const onEnd = () => {
        overlay.removeEventListener("transitionend", onEnd);
        overlay.parentNode?.removeChild(overlay);
      };
      overlay.addEventListener("transitionend", onEnd);
      // Fallback if transition doesn't fire
      setTimeout(() => overlay.parentNode?.removeChild(overlay), 400);
    }

    // Controls
    controls.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action]");
      if (!btn) return;
      e.stopPropagation();
      switch (btn.dataset.action) {
        case "zoom-in":  zoomBy(SCALE_STEP); break;
        case "zoom-out": zoomBy(-SCALE_STEP); break;
        case "reset":    resetView(); break;
        case "close":    close(); break;
      }
    });

    // Click outside image to close
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    // Keyboard
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "+" || e.key === "=") zoomBy(SCALE_STEP);
      if (e.key === "-") zoomBy(-SCALE_STEP);
      if (e.key === "0") resetView();
    }
    document.addEventListener("keydown", onKeyDown);

    // Mouse wheel zoom
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
      zoomBy(delta, e.clientX, e.clientY);
    }, { passive: false });

    // Mouse drag — handlers on window to capture movement outside canvas
    stage.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartTX = translateX;
      dragStartTY = translateY;
      stage.style.cursor = "grabbing";
      e.preventDefault();
    });

    function onMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      translateX = dragStartTX + (e.clientX - dragStartX);
      translateY = dragStartTY + (e.clientY - dragStartY);
      applyTransform();
    }
    function onMouseUp() {
      if (!isDragging) return;
      isDragging = false;
      stage.style.cursor = "grab";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch pinch / pan
    let lastTouchDist = 0;
    let lastTouchMidX = 0;
    let lastTouchMidY = 0;
    let touchStartTX = 0;
    let touchStartTY = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTX = translateX;
        touchStartTY = translateY;
        lastTouchDist = 0;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist = Math.hypot(dx, dy);
        lastTouchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        lastTouchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      }
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && lastTouchDist === 0) {
        translateX = touchStartTX + (e.touches[0].clientX - touchStartX);
        translateY = touchStartTY + (e.touches[0].clientY - touchStartY);
        applyTransform();
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        if (lastTouchDist > 0) {
          const delta = ((dist - lastTouchDist) / lastTouchDist) * scale * 0.5;
          zoomBy(delta, midX, midY);
          translateX += midX - lastTouchMidX;
          translateY += midY - lastTouchMidY;
          applyTransform();
        }
        lastTouchDist = dist;
        lastTouchMidX = midX;
        lastTouchMidY = midY;
      }
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener("touchend", () => {
      lastTouchDist = 0;
    });
  }, []);

  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;

    const figures = host.querySelectorAll<HTMLElement>("figure.zoomable-image");
    if (figures.length === 0) return;

    figures.forEach((fig) => {
      if (fig.dataset.ziEnhanced) return;
      fig.dataset.ziEnhanced = "true";

      const src = fig.dataset.src ?? "";
      const alt = fig.dataset.alt ?? "";
      const caption = fig.dataset.caption ?? alt;

      // Replace static placeholder with interactive thumbnail + caption
      fig.innerHTML = `
        <div class="zi-wrapper">
          <img
            src="${src}"
            alt="${alt}"
            class="zi-thumbnail"
            loading="lazy"
            decoding="async"
          />
          <button type="button" class="zi-expand-btn" aria-label="View full size: ${alt}">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>
            <span>Click to zoom</span>
          </button>
        </div>
        ${caption ? `<figcaption class="zi-caption">${caption}</figcaption>` : ""}
      `;

      const wrapper = fig.querySelector<HTMLElement>(".zi-wrapper");
      if (wrapper) {
        wrapper.addEventListener("click", () => openModal(src, alt));
      }
    });
  }, [openModal, children]);

  return (
    <div ref={rootRef}>
      {children}
    </div>
  );
}
