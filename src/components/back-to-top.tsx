"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" button. Hidden until the user has scrolled past the
 * first viewport so it never competes with the hero. Anchored to the bottom-
 * left corner so it doesn't crowd the bottom nav (centered) or the contents
 * trigger / theme toggle on the right edge.
 */
export function BackToTop({ threshold = 600 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Back to top"
      className={cn(
        "glass-surface fixed bottom-24 left-4 z-40 size-11 inline-flex items-center justify-center rounded-full text-foreground/80 hover:text-foreground shadow-card transition-all duration-200",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
