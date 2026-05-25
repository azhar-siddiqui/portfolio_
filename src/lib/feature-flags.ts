import { getFlag } from "@/lib/launchdarkly";

/**
 * Central registry of feature flag keys. The string values MUST match the
 * flag keys configured in the LaunchDarkly dashboard exactly.
 */
export const FLAG_KEYS = {
  BLOG: "blog-enabled",
} as const;

export type FlagKey = (typeof FLAG_KEYS)[keyof typeof FLAG_KEYS];

/**
 * Is the blog (Writing) surface enabled?
 *
 * Default: OFF. When LaunchDarkly is unreachable or misconfigured we hide
 * the feature rather than risk exposing it half-built.
 */
export async function isBlogEnabled(): Promise<boolean> {
  return getFlag(FLAG_KEYS.BLOG, false);
}
