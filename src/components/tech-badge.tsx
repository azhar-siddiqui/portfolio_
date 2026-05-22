"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { getTechIcon } from "@/lib/tech-icons";

interface Props {
  name: string;
  size?: "sm" | "md";
}

export function TechBadge({ name, size = "sm" }: Props) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted && (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  const icon = getTechIcon(name);
  const color = icon
    ? icon.colorOverride && isDark
      ? icon.colorOverride
      : `#${icon.hex}`
    : undefined;

  const isMd = size === "md";

  return (
    <span
      className={
        "group/badge inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.04] " +
        (isMd ? "px-2.5 py-1.5" : "px-2 py-1")
      }
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className={
            "shrink-0 transition-transform duration-200 group-hover/badge:scale-110 " +
            (isMd ? "w-3.5 h-3.5" : "w-3 h-3")
          }
          fill={color}
          suppressHydrationWarning
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className={"shrink-0 rounded-sm bg-muted " + (isMd ? "w-3.5 h-3.5" : "w-3 h-3")}
        />
      )}
      <span
        className={
          "font-medium text-foreground/80 leading-none " +
          (isMd ? "text-xs" : "text-[10.5px]")
        }
      >
        {name}
      </span>
    </span>
  );
}
