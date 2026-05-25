"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export type NavItem = {
  href: string;
  label: string;
  /** Pre-rendered icon element. The server renders the lucide icon and
   *  hands the React element down so we don't have to serialise a
   *  component reference across the server/client boundary. */
  icon: ReactNode;
};

interface NavbarClientProps {
  items: ReadonlyArray<NavItem>;
}

/**
 * Client half of the navbar. Owns the active-state highlight (driven by
 * `usePathname`) and renders the labelled bottom tab bar. The list of items
 * is passed in from the server component, which is responsible for any
 * feature-flag filtering.
 */
export function NavbarClient({ items }: NavbarClientProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Floating theme toggle — top-right, single click, separate from
          primary nav so it never crowds the tab bar. */}
      <div
        className="fixed top-4 right-4 z-40 no-print"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <AnimatedThemeToggler
          className="glass-surface size-10 flex items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-colors shadow-card"
          aria-label="Toggle theme"
        />
      </div>

      {/* Bottom nav. Container is positioned but non-interactive so the page
          beneath remains scrollable through the gutter on mobile. */}
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 no-print flex justify-center"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul
          className={cn(
            "pointer-events-auto flex items-stretch w-full sm:w-auto",
            // Mobile: edge-to-edge glass. Desktop: floating rounded pill.
            "sm:mb-4 sm:rounded-full sm:px-1.5",
            "glass-surface border-t sm:border",
            "shadow-card",
            "transition-colors"
          )}
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1 sm:flex-initial">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  prefetch
                  className={cn(
                    "group relative flex flex-col items-center justify-center gap-1",
                    // 44pt min touch target.
                    "min-h-[56px] sm:min-h-0 sm:h-14 sm:px-5 sm:my-1 sm:rounded-full",
                    "transition-colors duration-200",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {/* Active pill background (desktop) */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-1 rounded-full transition-opacity duration-200 hidden sm:block",
                      active
                        ? "bg-primary/15 opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-hover:bg-foreground/[0.05]"
                    )}
                  />
                  {/* Active indicator bar (mobile, top edge) */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-6 top-0 h-0.5 rounded-full transition-opacity sm:hidden",
                      active ? "bg-primary opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="relative inline-flex shrink-0">{item.icon}</span>
                  <span className="relative font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] leading-none">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
