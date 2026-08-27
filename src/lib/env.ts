/**
 * Env helper — reads Keystatic / site vars without committing secrets.
 * Uses Astro's import.meta.env (client/server) and process.env (Node) where available.
 * Never log or bundle secret values to client.
 */

export function getEnv(key: string, fallback?: string): string | undefined {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  return metaEnv?.[key] ?? fallback;
}

export const PUBLIC_SITE_URL = getEnv("PUBLIC_SITE_URL", "https://labs.kcb.ma");
export const KEYSTATIC_GITHUB_APP_SLUG = getEnv("PUBLIC_KEYSTATIC_GITHUB_APP_SLUG");
