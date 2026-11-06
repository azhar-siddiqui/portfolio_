/**
 * Single source for the site palette.
 * Change a color here. CSS variables, the resume, social images, and
 * diagrams all read this file. Do not put hex colors in components.
 */
export type Palette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  border: string;
  input: string;
  ring: string;
  /** Diagrams stay on a light surface in both modes so strokes stay readable. */
  diagramSurface: string;
  diagramBorder: string;
};

export const palette: { light: Palette; dark: Palette } = {
  light: {
    background: "#F8FAFC",
    foreground: "#0F172A",
    card: "#FFFFFF",
    cardForeground: "#0F172A",
    popover: "#FFFFFF",
    popoverForeground: "#0F172A",
    primary: "#1D4ED8",
    primaryForeground: "#FFFFFF",
    secondary: "#F1F5F9",
    secondaryForeground: "#0F172A",
    muted: "#F1F5F9",
    mutedForeground: "#475569",
    accent: "#1D4ED8",
    accentForeground: "#FFFFFF",
    destructive: "#B91C1C",
    destructiveForeground: "#FFFFFF",
    success: "#15803D",
    successForeground: "#FFFFFF",
    warning: "#B45309",
    warningForeground: "#FFFFFF",
    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#1D4ED8",
    diagramSurface: "#FFFFFF",
    diagramBorder: "#E2E8F0",
  },
  dark: {
    background: "#0B1120",
    foreground: "#E5E7EB",
    card: "#111827",
    cardForeground: "#E5E7EB",
    popover: "#111827",
    popoverForeground: "#E5E7EB",
    primary: "#93C5FD",
    primaryForeground: "#0B1120",
    secondary: "#1F2937",
    secondaryForeground: "#E5E7EB",
    muted: "#1F2937",
    mutedForeground: "#9CA3AF",
    accent: "#93C5FD",
    accentForeground: "#0B1120",
    destructive: "#FCA5A5",
    destructiveForeground: "#0B1120",
    success: "#86EFAC",
    successForeground: "#0B1120",
    warning: "#FCD34D",
    warningForeground: "#0B1120",
    border: "#1F2937",
    input: "#1F2937",
    ring: "#93C5FD",
    diagramSurface: "#FFFFFF",
    diagramBorder: "#E2E8F0",
  },
};

export const fontSans = "Inter";

export function alpha(hex: string, opacity: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function hexToChannels(hex: string): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function variableBlock(colors: Palette): string {
  const entries: Record<string, string> = {
    background: colors.background,
    foreground: colors.foreground,
    card: colors.card,
    "card-foreground": colors.cardForeground,
    popover: colors.popover,
    "popover-foreground": colors.popoverForeground,
    primary: colors.primary,
    "primary-foreground": colors.primaryForeground,
    secondary: colors.secondary,
    "secondary-foreground": colors.secondaryForeground,
    muted: colors.muted,
    "muted-foreground": colors.mutedForeground,
    accent: colors.accent,
    "accent-foreground": colors.accentForeground,
    destructive: colors.destructive,
    "destructive-foreground": colors.destructiveForeground,
    success: colors.success,
    "success-foreground": colors.successForeground,
    warning: colors.warning,
    "warning-foreground": colors.warningForeground,
    border: colors.border,
    input: colors.input,
    ring: colors.ring,
    warm: colors.primary,
    cool: colors.primary,
    clay: colors.foreground,
    sand: colors.secondary,
    soil: colors.foreground,
    "grid-line": colors.border,
    "chart-1": colors.primary,
    "chart-2": colors.mutedForeground,
    "chart-3": colors.success,
    "chart-4": colors.warning,
    "chart-5": colors.mutedForeground,
    "aura-1": colors.background,
    "aura-2": colors.background,
    "aura-3": colors.background,
    "aura-4": colors.background,
    "diagram-surface": colors.diagramSurface,
    "diagram-border": colors.diagramBorder,
  };

  return Object.entries(entries)
    .map(([name, hex]) => `--${name}: ${hexToChannels(hex)};`)
    .join("");
}

/** Injected in the document head. Tailwind reads these as hsl(var(--token)). */
export const themeCss = `:root{${variableBlock(palette.light)}--radius: 0.5rem;}.dark{${variableBlock(palette.dark)}--radius: 0.5rem;}`;
