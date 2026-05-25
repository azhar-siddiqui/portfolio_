"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/data/blog";

interface Props {
  headings: Heading[];
}

/**
 * In-page navigation for a blog post. Renders twice:
 *
 *   1. A sticky right-rail panel on `xl+` viewports.
 *   2. A floating "Contents" button on smaller screens that opens a centered
 *      drawer. Tapping a link in either dismisses the drawer and smooth-scrolls
 *      to the heading.
 *
 * Active section tracking is implemented with a single IntersectionObserver
 * keyed on the heading ids that `rehype-slug` stamped onto the rendered HTML.
 */
export function BlogToc({ headings }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const visibleIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (headings.length === 0) return;
    const ids = headings.map((h) => h.slug);
    setActive((prev) => prev ?? ids[0] ?? null);

    const observer = new IntersectionObserver(
      (entries) => {
        const set = visibleIdsRef.current;
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) set.add(id);
          else set.delete(id);
        }
        // Of all currently visible headings, pick the one that appears earliest
        // in document order — feels right when sections are nested.
        const firstVisible = ids.find((id) => set.has(id));
        if (firstVisible) setActive(firstVisible);
      },
      // Top offset accounts for the fixed theme toggle (~64px) plus comfortable
      // breathing room; bottom margin shrinks the spy zone so the active item
      // updates a touch before the heading scrolls off-screen.
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );

    const elements: HTMLElement[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    return () => {
      observer.disconnect();
      visibleIdsRef.current.clear();
    };
  }, [headings]);

  const onLinkClick = useCallback((slug: string) => {
    setDrawerOpen(false);
    setActive(slug);
    // Close any open hash so subsequent click on the same item still scrolls.
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${slug}`);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop sticky rail (visible from xl up — large screens have the
          horizontal room without crowding the prose column). */}
      <aside
        aria-label="Table of contents"
        className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
      >
        <TocList
          headings={headings}
          active={active}
          onLinkClick={onLinkClick}
        />
      </aside>

      {/* Mobile floating trigger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open table of contents"
        aria-expanded={drawerOpen}
        className="xl:hidden fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 h-11 pl-4 pr-5 rounded-full border border-border/60 bg-card/85 backdrop-blur-xl text-foreground/85 hover:text-foreground hover:bg-card/95 shadow-[0_10px_28px_-12px_hsl(var(--primary)/0.3)] transition-colors"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <List className="h-4 w-4" />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
          Contents
        </span>
      </button>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents"
          className="xl:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="relative w-full sm:max-w-md max-h-[70vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-5 sm:m-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                On this page
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close table of contents"
                className="size-8 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <TocList
              headings={headings}
              active={active}
              onLinkClick={onLinkClick}
              showEyebrow={false}
            />
          </div>
        </div>
      )}
    </>
  );
}

function TocList({
  headings,
  active,
  onLinkClick,
  showEyebrow = true,
}: {
  headings: Heading[];
  active: string | null;
  onLinkClick: (slug: string) => void;
  showEyebrow?: boolean;
}) {
  return (
    <nav>
      {showEyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          On this page
        </p>
      )}
      <ul className="flex flex-col gap-0.5 text-sm border-l border-border/60">
        {headings.map((h) => {
          const isActive = h.slug === active;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onLinkClick(h.slug);
                }}
                className={cn(
                  "group relative flex items-start gap-2 -ml-px py-1.5 pl-3 pr-2 border-l-2 border-transparent leading-snug transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:border-foreground/30",
                  h.depth === 3 && "pl-6",
                  h.depth >= 4 && "pl-9",
                )}
              >
                <span className="truncate">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
