import * as SimpleIcons from "simple-icons";
import { DATA } from "@/data/resume";

export interface TechIcon {
  path: string;
  hex: string;
  slug: string;
  colorOverride?: string | null;
}

// Build a flat lookup from skill name → slug + dark-mode color override, so
// the projects section stays in lockstep with the toolkit section.
const SKILL_LOOKUP: Record<string, { slug: string | null; color: string | null }> =
  Object.values(DATA.skills)
    .flat()
    .reduce<Record<string, { slug: string | null; color: string | null }>>(
      (acc, skill) => {
        acc[normalize(skill.name)] = {
          slug: skill.icon ?? null,
          color: skill.color ?? null,
        };
        return acc;
      },
      {}
    );

// Project-only techs (or aliases) not present in DATA.skills. Slug = simple-icons key
// after the "si" prefix and capitalised (e.g. "googlemaps" → siGooglemaps).
const TECH_ALIASES: Record<string, { slug: string | null; color?: string | null }> = {
  "tanstack stack": { slug: "tanstack", color: "#ffffff" },
  "tanstack query": { slug: "tanstack", color: "#ffffff" },
  clerk: { slug: "clerk" },
  recharts: { slug: null },
  convex: { slug: null },
  stripe: { slug: "stripe" },
  razorpay: { slug: "razorpay" },
  "google maps": { slug: "googlemaps" },
  wordpress: { slug: "wordpress", color: "#ffffff" },
  jquery: { slug: "jquery" },
  flask: { slug: "flask", color: "#ffffff" },
  "html/css/js": { slug: "html5" },
  rxjs: { slug: "reactivex" },
  "sonarqube api": { slug: "sonarqube" },
  sonarqube: { slug: "sonarqube" },
  cli: { slug: "gnubash" },
  "fetch api": { slug: null },
  "custom ui library": { slug: null },
  commander: { slug: "gnubash" },
  winston: { slug: "gnubash" },
  // Mobile / Flutter
  flutter: { slug: "flutter" },
  dart: { slug: "dart" },
  // Firebase services (no dedicated icons — all map to firebase brand)
  firestore: { slug: "firebase" },
  "firebase cloud functions": { slug: "firebase" },
  "firebase storage": { slug: "firebase" },
  "firebase auth": { slug: "firebase" },
  // Google AI & services
  "gemini genkit": { slug: "googlegemini" },
  "google gemini api": { slug: "googlegemini" },
  "google ml kit": { slug: "google" },
  "google calendar api": { slug: "googlecalendar" },
};

function normalize(name: string): string {
  return name.trim().toLowerCase();
}

function lookupSlug(name: string): { slug: string | null; color: string | null } | null {
  const key = normalize(name);
  if (SKILL_LOOKUP[key]) return SKILL_LOOKUP[key];
  if (TECH_ALIASES[key]) {
    return { slug: TECH_ALIASES[key].slug, color: TECH_ALIASES[key].color ?? null };
  }
  return null;
}

export function getTechIcon(name: string): TechIcon | null {
  const entry = lookupSlug(name);
  if (!entry || !entry.slug) return null;
  const iconKey = `si${entry.slug.charAt(0).toUpperCase()}${entry.slug.slice(1)}` as keyof typeof SimpleIcons;
  const icon = SimpleIcons[iconKey] as { path: string; hex: string } | undefined;
  if (!icon) return null;
  return {
    path: icon.path,
    hex: icon.hex,
    slug: entry.slug,
    colorOverride: entry.color,
  };
}
