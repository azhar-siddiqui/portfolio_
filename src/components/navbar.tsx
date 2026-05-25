"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

/**
 * Primary site navigation: a labeled bottom tab bar.
 *
 * Design goals:
 *  - Single click / single touch to navigate to any primary surface.
 *  - Labels are always visible — no tooltip-discovery on mobile, no guessing
 *    what an icon means.
 *  - Touch targets are ≥ 44pt on mobile (Apple HIG minimum).
 *  - Mobile: edge-to-edge bar with safe-area inset for notched devices.
 *  - Desktop: centered glass-effect pill that floats above content.
 *  - Theme toggle is a separate fixed control (top-right) so the nav itself
 *    stays focused on routes. Social links live in the Contact section.
 */
export default function Navbar() {
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
          className="size-10 flex items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur-md text-foreground/80 hover:text-foreground hover:bg-card/90 hover:border-foreground/30 transition-colors shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.35)]"
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
            // Mobile: edge-to-edge with a thin top border + glass.
            "sm:mb-4 sm:rounded-full sm:border sm:px-1.5",
            "bg-card/85 backdrop-blur-xl border-t sm:border border-border/60",
            "shadow-[0_-8px_32px_-16px_rgba(0,0,0,0.12)] sm:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] dark:shadow-[0_-8px_32px_-16px_rgba(0,0,0,0.5)] dark:sm:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.5)]",
            "transition-colors"
          )}
        >
          {DATA.navbar.map((item) => {
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
                      active ? "bg-primary/12 opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:bg-foreground/[0.05]"
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
                  <item.icon className="relative size-5 sm:size-4 shrink-0" />
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
