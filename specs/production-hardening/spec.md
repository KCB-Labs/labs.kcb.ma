# Spec: Production Hardening — SEO, Perf, A11y, Security, Analytics, Error Pages, CI/CD

## Goal
Make `labs.kcb.ma` shippable to Coolify on `https://labs.kcb.ma` with production-grade discoverability, resilience, and operability: complete SEO/sitemap/RSS/robots, WCAG 2.2 AA, Core Web Vitals-friendly performance, security headers, privacy-conscious analytics abstraction, on-brand error handling, CI gates, and verified Docker/Coolify deployment — all measurable before merge.

## Scope
- In scope:
  - SEO per page (spec §37): `title`, `description`, `canonical` (via `site: https://labs.kcb.ma` from `astro.config.ts`), Open Graph, Twitter/X, Schema.org (`Organization`, `Article`, `Person`, `SoftwareSourceCode`, `Project` where accurate — no fabricated structured data)
  - Sitemap `sitemap.xml` + `robots.txt` (spec §37/§64): includes `/`, `/labs/*`, `/projects/*`, `/journal/*`, `/about/*`, `/participate/*`; excludes `/keystatic/*`, `/api/*`; Honors canonical slugs (lowercase, stable)
  - RSS feed for Journal (`/journal/rss.xml` or `/rss.xml`) covering `published` articles with correct `publishedAt`, readingTime, categories
  - Performance (spec §40): Astro HTML first, minimal JS, lazy-load below-the-fold images (Astro `<Image />` pipeline), optimized fonts, no large UI libs, analytics deferred, bundles measurable and small; remains usable on mid-range mobile + slow network
  - Accessibility (spec §39): WCAG 2.2 AA — semantic HTML, keyboard nav, visible focus, accessible menus, sufficient contrast, correct heading hierarchy, descriptive links, accessible forms, alt text, screen-reader-friendly status, `prefers-reduced-motion` support; islands degrade gracefully without JS for core content
  - Security (spec §63): HTTPS only, secure cookies, env secrets never committed, server-side validation, no sensitive data in client bundles, Keystatic `/keystatic` protected by auth (not merely disabled), appropriate HTTP security headers (CSP-ready baseline, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` via Astro middleware/adapter config), dependency auditing
  - Analytics (spec §60): abstracted provider (Plausible/Umami/Cloudflare Web Analytics swappable), events `project_viewed`, `lab_viewed`, `article_viewed`, `github_clicked`, `sponsorship_clicked`, `collaboration_submitted` behind abstraction; provider change requires no content architecture edit
  - Error handling (spec §59): on-brand `404.astro` ("This path hasn't become a project yet." variant) and `500.astro`, plus content-not-found and broken-relation handling that surfaces a helpful branded state, not a stack trace
  - Health + deploy (spec §53–§58): `GET /api/health` → `{"status":"ok"}` (no third-party deps), multi-stage Docker optimized for Coolify (`Dockerfile` already from foundation, hardened here: `.dockerignore`, layer caching, minimal final image), Coolify config documented in `DEPLOYMENT.md` (Build Pack Dockerfile, Domain `https://labs.kcb.ma`, Port `4321`, Auto Deploy, HTTPS), env var contract `KEYSTATIC_GITHUB_CLIENT_ID/SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `PUBLIC_SITE_URL` as Coolify secrets
  - CI/CD (spec §67): GitHub Actions workflow `PR → install → type check (`astro check`/`tsc`) → lint → test (Vitest) → `astro build` → merge`, Coolify auto-deploy on production branch, branch strategy documented in `CONTRIBUTING.md` (`main + feature/*` minimal)
  - Documentation: `DEPLOYMENT.md`, `CONTENT-MODEL.md`, `DESIGN-SYSTEM.md`, `CONTRIBUTING.md` completed/updated from planned placeholders; `docs/adrs/` records ADRs for decisions above
  - Lighthouse/Core Web Vitals self-check in PR (manual run recorded, target "Excellent" per §40)
- Out of scope:
  - New content collections or page types — `specs/content-model` / `specs/core-pages` / `specs/institutional-pages` own those
  - New interactive behavior beyond analytics hook for existing Search/Filters — `specs/interactive-features`
  - Third-party uptime monitoring beyond `/api/health` (future extension)
  - Multi-locale SEO — out of scope per §38 (English only until multilingual strategy)

## Contracts (success criteria)
- `npm run build` succeeds and every public page emits `title` + `description` + `canonical` (absolute via `https://labs.kcb.ma`) + OG (`og:title`, `og:description`, `og:image` when `socialImage` exists) + Twitter; spot-check `/`, `/labs/[slug]`, `/projects/[slug]`, `/journal/[slug]` view-source for these tags — E2E or integration test asserts presence
- `sitemap.xml` at build output lists all published Labs/Projects/Articles/People/Organizations/OpenSource/Roadmap pages with correct `loc` and `lastmod` from `updatedAt`/`publishedAt`; `robots.txt` references sitemap and disallows `/keystatic/` and `/api/` (integration test fetches both after `npm run build` or checks generated files in `dist/`)
- Journal RSS is valid XML, includes `channel` + N most recent `published` articles (sorted descending `publishedAt`), and passes an RSS validator or parser test
- Accessibility: `npm run check` + manual axe run (or Playwright axe if adopted) reports 0 critical violations on `/`, `/labs/[slug]`, `/projects/[slug]`, `/journal/[slug]`, `/about/roadmap`, `/contact`; keyboard Tab reaches header nav, search, filters, form controls; focus visible; `prefers-reduced-motion` disables timeline/filter transitions (verified by computed style or component test)
- Performance baseline: `npm run build` JS bundle for non-island pages is near-zero client JS (only islands hydrate); below-the-fold images use `loading="lazy"`; analytics script is deferred/not blocking first render (view-source / build artifact inspection)
- Security: `grep -R "KEYSTATIC\|SECRET\|API_KEY" dist/client` returns 0; HTTP headers (via local `node ./dist/server/entry.mjs` or Coolify preview) include `X-Content-Type-Options: nosniff` and sensible `Referrer-Policy` (or midddleware adds them — test via `fetch` to `/api/health` and check headers); no client bundle contains secrets
- Analytics: calling the abstracted `track(event)` helper emits via configured provider abstraction; swapping provider requires changing only the adapter file, not pages/islands — reviewer can swap mock and test still passes
- `404.astro` and `500.astro` render on-brand (contain the "hasn't become a project yet" copy or approved variant) and return correct status codes (Playwright or integration fetch checks)
- `GET /api/health` returns `{"status":"ok"}` with 200 both locally (`node ./dist/server/entry.mjs`) and in Docker (`docker build` → `docker run -p 4321:4321` → `curl localhost:4321/api/health`)
- CI: `.github/workflows/ci.yml` exists and sequentially runs `install` → `check` → `lint` → `test` → `build`; Coolify `DEPLOYMENT.md` documents domain/port/env/health workflow; PR cannot merge with failing checks (branch protection or reviewer checklist)

## Anti-patterns
- Do not generate Schema.org that does not accurately describe the content — §37 forbids fabricated structured data
- Do not index `/keystatic/*` or `/api/*` — exclude from sitemap/robots and meta robots (spec §64)
- Do not load analytics before necessary or leak secrets into client bundles
- Do not scatter security header logic across pages — centralize in middleware/adapter config
- Do not hard-code SEO strings in pages — derive from collection SEO fields + `BaseLayout` props with sensible fallbacks
- Do not ship a generic technical 404/500 — on-brand handling is required (§59)
- Do not add dependencies without justification — keep bundles measurable and small (§40)

## Decisions
- `ADR-014` (planned) — SEO via Astro-native metadata/sitemap/RSS (spec §37) vs headless CMS approach; Astro's `@astrojs/sitemap` + custom RSS chosen for git-managed content
- `ADR-015` (planned) — Analytics abstraction (spec §60) — Plausible/Umami behind `src/lib/analytics` adapter so provider swap is config-only
- `ADR-016` (planned) — Security headers via Astro middleware / Node adapter config (spec §63); Keystatic admin remains deployed but protected via GitHub auth rather than route disabling (spec §63 note)
- `ADR-001`/`ADR-002` reaffirmed (output mode, Keystatic storage) for deployment topology `Editor → /keystatic → GitHub commit → Coolify webhook → Docker → labs.kcb.ma` (spec §57)

## Tooling
- Astro MCP for `sitemap`, `rss`, middleware, `BaseLayout` SEO patterns
- Vitest candidate (`antfu/skills@vitest` 33.5K) for sitemap/RSS/analytics abstraction tests
- Playwright candidates (`microsoft/playwright-cli` 133.5K, `currents-dev/playwright-best-practices-skill` 76.3K) for E2E smoke (homepage, labs/projects/journal nav, sitemap/RSS fetch, 404, health) — install on approval
- Lighthouse / axe as manual verification steps recorded in PR (no new heavy dep without ADR)
