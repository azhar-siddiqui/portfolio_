"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/data/blog";

interface Props {
  headings: Heading[];
}

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
        const firstVisible = ids.find((id) => set.has(id));
        if (firstVisible) setActive(firstVisible);
      },
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

  const sectionCount = headings.filter((h) => h.depth === 2).length;

  return (
    <>
      {/* Desktop left-rail panel — sticky, scrollable if list is long. */}
      <aside
        aria-label="Table of contents"
        className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
      >
        <div className="p-5">
          <div className="mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              On this page
            </p>
            {sectionCount > 0 && (
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.14em]">
                {sectionCount} section{sectionCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div className="h-px bg-border/60 mb-4" />
          <TocList
            headings={headings}
            active={active}
            onLinkClick={onLinkClick}
          />
        </div>
      </aside>

      {/* Mobile floating trigger */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open table of contents"
        aria-expanded={drawerOpen}
        className="glass-surface xl:hidden fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 h-11 pl-4 pr-5 rounded-full text-foreground/85 hover:text-foreground shadow-card transition-colors"
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
          <div className="glass-surface relative w-full sm:max-w-md max-h-[70vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-5 sm:m-4 shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  On this page
                </span>
                {sectionCount > 0 && (
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.14em]">
                    · {sectionCount} section{sectionCount !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close table of contents"
                className="size-8 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-px bg-border/60 mb-3" />
            <TocList
              headings={headings}
              active={active}
              onLinkClick={onLinkClick}
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
}: {
  headings: Heading[];
  active: string | null;
  onLinkClick: (slug: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
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
                "group flex items-start gap-2.5 py-1.5 px-3 rounded-lg leading-snug transition-all duration-150",
                h.depth === 2 && "text-sm",
                h.depth === 3 && "pl-6 text-[0.8rem]",
                h.depth >= 4 && "pl-9 text-[0.75rem]",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]",
              )}
            >
              {/* Dot marker — filled circle for h2, small dot for h3+ */}
              <span
                className={cn(
                  "shrink-0 rounded-full transition-colors mt-[5px]",
                  h.depth === 2
                    ? cn(
                        "h-1.5 w-1.5 border",
                        isActive
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/40 group-hover:border-foreground/60",
                      )
                    : cn(
                        "h-1 w-1",
                        isActive
                          ? "bg-primary"
                          : "bg-muted-foreground/30 group-hover:bg-foreground/50",
                      ),
                )}
              />
              <span className="truncate">{h.text}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
