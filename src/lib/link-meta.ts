import { getSimpleIconByKey } from "@/lib/simple-icon-registry";
import {
  ExternalLink,
  FileText,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type LinkKind =
  | "play-store"
  | "app-store"
  | "github"
  | "npm"
  | "youtube"
  | "linkedin"
  | "twitter"
  | "behance"
  | "docs"
  | "website";

/**
 * Two-shape icon descriptor: either a Lucide React component or a raw SVG path
 * (from simple-icons or our custom set) so the renderer can stamp it inside a
 * standard 24×24 viewBox. Mirrors the pattern used by tech-badge.tsx.
 */
export type LinkIcon =
  | { kind: "lucide"; Component: LucideIcon }
  | { kind: "path"; path: string; title: string };

export interface LinkMeta {
  kind: LinkKind;
  label: string;
  icon: LinkIcon;
}

const siPath = (slug: string, fallbackTitle: string): LinkIcon => {
  const entry = getSimpleIconByKey(slug);
  return entry
    ? { kind: "path", path: entry.path, title: entry.title ?? fallbackTitle }
    : {
        kind: "path",
        path: "M12 0a12 12 0 100 24 12 12 0 000-24z",
        title: fallbackTitle,
      };
};

// LinkedIn was removed from simple-icons; ship our own glyph (same as
// `Icons.linkedin` in components/icons.tsx) so the button still has a brand
// mark. The path expects a 24×24 viewBox.
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const ICONS: Record<LinkKind, LinkIcon> = {
  "play-store": siPath("siGoogleplay", "Google Play"),
  "app-store": siPath("siAppstore", "App Store"),
  github: siPath("siGithub", "GitHub"),
  npm: siPath("siNpm", "npm"),
  youtube: siPath("siYoutube", "YouTube"),
  linkedin: { kind: "path", path: LINKEDIN_PATH, title: "LinkedIn" },
  twitter: siPath("siX", "X"),
  behance: siPath("siBehance", "Behance"),
  docs: { kind: "lucide", Component: FileText },
  website: { kind: "lucide", Component: Globe },
};

type Matcher = {
  test: (host: string, url: string) => boolean;
  kind: LinkKind;
  label: string;
};

const matchers: Matcher[] = [
  { test: (h) => h.includes("play.google.com"), kind: "play-store", label: "Play Store" },
  { test: (h) => h.includes("apps.apple.com") || h.includes("itunes.apple.com"), kind: "app-store", label: "App Store" },
  { test: (h) => h.includes("github.com"), kind: "github", label: "GitHub" },
  { test: (h) => h.includes("npmjs.com"), kind: "npm", label: "npm" },
  { test: (h) => h.includes("youtube.com") || h.includes("youtu.be"), kind: "youtube", label: "Watch" },
  { test: (h) => h.includes("linkedin.com"), kind: "linkedin", label: "LinkedIn" },
  { test: (h) => h.includes("twitter.com") || h.includes("x.com"), kind: "twitter", label: "X" },
  { test: (h) => h.includes("behance.net"), kind: "behance", label: "Behance" },
  { test: (h, url) => /\.(pdf)(\?|$)/i.test(url), kind: "docs", label: "Read" },
];

/**
 * Derive a presentation kind, icon, and default label from a URL. Falls back
 * to a generic "Live" website link when nothing matches.
 */
export function getLinkMeta(url: string, overrideLabel?: string): LinkMeta {
  let host = "";
  try {
    host = new URL(url).host.toLowerCase();
  } catch {
    host = url.toLowerCase();
  }
  const match = matchers.find((m) => m.test(host, url));
  if (match) {
    return {
      kind: match.kind,
      label: overrideLabel ?? match.label,
      icon: ICONS[match.kind],
    };
  }
  return {
    kind: "website",
    label: overrideLabel ?? "Live",
    icon: { kind: "lucide", Component: ExternalLink },
  };
}

export const linkIconFor = (kind: LinkKind): LinkIcon => ICONS[kind];

/** Loose match for user-typed labels that don't have a URL we can sniff. */
export function metaForLabel(label: string): LinkMeta {
  const l = label.toLowerCase();
  if (l.includes("play store") || l.includes("google play"))
    return { kind: "play-store", label, icon: ICONS["play-store"] };
  if (l.includes("app store") || l.includes("apple"))
    return { kind: "app-store", label, icon: ICONS["app-store"] };
  if (l.includes("github") || l.includes("source"))
    return { kind: "github", label, icon: ICONS.github };
  if (l.includes("npm") || l.includes("package"))
    return { kind: "npm", label, icon: ICONS.npm };
  if (l.includes("youtube") || l.includes("video") || l.includes("watch"))
    return { kind: "youtube", label, icon: ICONS.youtube };
  if (l.includes("linkedin"))
    return { kind: "linkedin", label, icon: ICONS.linkedin };
  if (l.includes("behance"))
    return { kind: "behance", label, icon: ICONS.behance };
  if (l.includes("doc") || l.includes("read") || l.includes("paper"))
    return { kind: "docs", label, icon: ICONS.docs };
  return { kind: "website", label, icon: ICONS.website };
}
