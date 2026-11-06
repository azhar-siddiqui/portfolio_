"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

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
  name: string;
}

/**
 * Desktop is a top studio bar. Mobile keeps a bottom tab bar for thumbs,
 * with the theme control parked at the top-right.
 */
export function NavbarClient({ items, name }: NavbarClientProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-40 hidden sm:block">
        <div className="border-b border-border/80 bg-background/88 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
            <Link href="/" className="group flex min-w-0 items-baseline gap-3">
              <span className="truncate text-[15px] font-medium text-foreground">
                {name}
              </span>
            </Link>

            <nav aria-label="Primary">
              <ul className="flex items-center gap-1">
                {items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        prefetch
                        className={cn(
                          "relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                          active
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-3 -bottom-px h-px bg-primary transition-opacity",
                            active ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <AnimatedThemeToggler
              className="inline-flex size-9 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Toggle theme"
            />
          </div>
        </div>
      </header>

      <div
        className="fixed top-4 right-4 z-40 no-print sm:hidden"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <AnimatedThemeToggler
          className="glass-surface flex size-10 items-center justify-center text-foreground/80 shadow-card transition-colors hover:text-foreground"
          aria-label="Toggle theme"
        />
      </div>

      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex no-print sm:hidden"
      >
        <ul
          className="glass-surface pointer-events-auto flex w-full items-stretch border-t"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  prefetch
                  className={cn(
                    "relative flex min-h-[56px] flex-col items-center justify-center gap-1 transition-colors duration-200",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-6 top-0 h-0.5 transition-opacity",
                      active ? "bg-primary opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="relative inline-flex shrink-0">{item.icon}</span>
                  <span className="relative font-mono text-[10px] uppercase tracking-[0.14em] leading-none">
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
