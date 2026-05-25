import { init, type LDClient } from "@launchdarkly/node-server-sdk";

/**
 * LaunchDarkly server-side client — singleton, lazy-initialised.
 *
 * Why a singleton: on Vercel Fluid Compute / Node Lambda, modules are reused
 * across invocations within the same warm instance. Initialising once and
 * caching the client (and the in-flight init promise) avoids repeatedly
 * paying the connection / streaming bootstrap on every render.
 *
 * Failure policy: if the SDK key is missing or the client fails to
 * initialise within the timeout, we resolve to `null` and callers fall back
 * to the supplied default value. The portfolio gates features cautiously
 * (default OFF for the blog flag) so a misconfigured environment never
 * accidentally exposes half-built surfaces.
 */

const INIT_TIMEOUT_SECONDS = 5;

// Module-level singletons — survive across requests on the same warm worker.
let cachedClient: LDClient | null = null;
let pendingClient: Promise<LDClient | null> | null = null;
let warnedMissingKey = false;

async function buildClient(): Promise<LDClient | null> {
  const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY;

  if (!sdkKey) {
    if (!warnedMissingKey) {
      warnedMissingKey = true;
      // eslint-disable-next-line no-console
      console.warn(
        "[launchdarkly] LAUNCHDARKLY_SDK_KEY is not set — all flags will fall back to their default values.",
      );
    }
    return null;
  }

  const client = init(sdkKey);
  try {
    await client.waitForInitialization({ timeout: INIT_TIMEOUT_SECONDS });
    return client;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      "[launchdarkly] Client failed to initialise within timeout — falling back to defaults.",
      err,
    );
    // The SDK may still be operating in offline mode internally; closing it
    // releases the streaming connection / background work we won't use.
    try {
      await client.close();
    } catch {
      // ignore
    }
    return null;
  }
}

async function getClient(): Promise<LDClient | null> {
  if (cachedClient) return cachedClient;
  if (!pendingClient) {
    pendingClient = buildClient().then((client) => {
      cachedClient = client;
      return client;
    });
  }
  return pendingClient;
}

/**
 * Evaluate a boolean feature flag for the anonymous portfolio visitor.
 *
 * Always resolves — on any error (missing key, init failure, evaluation
 * failure), returns `defaultValue`.
 */
export async function getFlag(
  flagKey: string,
  defaultValue: boolean,
): Promise<boolean> {
  try {
    const client = await getClient();
    if (!client) return defaultValue;
    return await client.boolVariation(
      flagKey,
      { kind: "user", key: "anonymous", anonymous: true },
      defaultValue,
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `[launchdarkly] Evaluation of "${flagKey}" failed — using default ${defaultValue}.`,
      err,
    );
    return defaultValue;
  }
}
