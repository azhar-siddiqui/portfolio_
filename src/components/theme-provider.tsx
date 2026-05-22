"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

// next-themes injects an inline <script> to set the theme before hydration.
// React 19 dev mode warns about <script> tags inside component trees, even
// though next-themes uses dangerouslySetInnerHTML correctly. Suppress only
// that specific warning at module load — useEffect would run too late, after
// the warning has already fired during NextThemesProvider's first render.
const SUPPRESSED_PATTERNS = [
  "Encountered a script tag while rendering React component",
];

declare global {
  interface Window {
    __themeProviderConsoleFiltered?: boolean;
  }
}

if (typeof window !== "undefined" && !window.__themeProviderConsoleFiltered) {
  window.__themeProviderConsoleFiltered = true;
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string") {
      for (const pattern of SUPPRESSED_PATTERNS) {
        if (first.includes(pattern)) return;
      }
    }
    originalError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
