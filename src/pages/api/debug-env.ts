export const prerender = false;

export function GET() {
  const envCheck = {
    KEYSTATIC_GITHUB_CLIENT_ID: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    KEYSTATIC_GITHUB_CLIENT_ID_len: (process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? '').length,
    KEYSTATIC_GITHUB_CLIENT_SECRET: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    KEYSTATIC_SECRET: !!process.env.KEYSTATIC_SECRET,
    KEYSTATIC_SECRET_len: (process.env.KEYSTATIC_SECRET ?? '').length,
    PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ?? 'MISSING',
    KEYSTATIC_GITHUB_REPO: process.env.KEYSTATIC_GITHUB_REPO ?? 'MISSING',
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL ?? 'MISSING',
    NODE_ENV: process.env.NODE_ENV ?? 'MISSING',
  };
  return new Response(JSON.stringify(envCheck, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
