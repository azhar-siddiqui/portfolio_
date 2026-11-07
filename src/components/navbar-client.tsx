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

export function NavbarClient({ items, name }: NavbarClientProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="no-print fixed inset-x-0 top-0 z-40">
        <div className="border-b border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex h-14 w-full min-w-0 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <Link href="/" className="group flex min-w-0 items-baseline gap-3">
              <span className="truncate text-[15px] font-medium text-foreground">
                {name}
              </span>
            </Link>

            <nav aria-label="Primary" className="min-w-0">
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
                          "relative px-2 py-2 text-sm transition-colors sm:px-3",
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
              className="inline-flex size-9 shrink-0 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
              aria-label="Toggle theme"
            />
          </div>
        </div>
      </header>
    </>
  );
}
