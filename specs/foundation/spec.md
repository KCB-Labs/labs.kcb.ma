# Spec: Foundation — Astro + React + Keystatic + TypeScript + Deployment Shell

## Goal
Establish the production-ready empty shell for `labs.kcb.ma` so every subsequent feature builds on a validated rendering, content, styling, and deployment contract: Astro `output: server` with `@astrojs/node` standalone, React islands only where interactivity demands, strict TypeScript, Keystatic server integration, design tokens, core layouts, and a deployable Docker image with health endpoint — verifiable without any domain content.

## Scope
- In scope:
  - Astro project scaffold with `astro.config.ts` (`output: 'server'`, `adapter: node({mode:'standalone'})`, integrations `[react(), markdoc(), keystatic()]`, `site: 'https://labs.kcb.ma'`), `src/pages/`, `src/layouts/`, `src/components/` skeleton
  - React integration with island hydration policy (`client:visible` preferred, `client:idle` / `client:load` only with justification)
  - Keystatic install + `keystatic.config.ts` skeleton (`storage: local` dev, `github` prod switch via env), `/keystatic` route mount
  - TypeScript strict (`strict: true`, no `any` without justification), `tsconfig.json`, `astro check` wiring
  - Design tokens `src/styles/tokens.css` (colors, typography Display/H1/H2/H3/Body/Small/Metadata/Code, spacing, radius, borders, shadows, motion, containers, breakpoints, z-index) + `globals.css` + light/dark theme support via CSS custom properties
  - Core layouts `BaseLayout.astro` (html/head, canonical, OG/Twitter, Schema.org slots), placeholder `LabLayout`/`ProjectLayout`/`ArticleLayout` shells
  - Global Astro components `SiteHeader`, `SiteFooter`, `Container`, `Section`, `Breadcrumbs`, `PageHeader`, `Prose` (all Astro, no React)
  - Docker multi-stage `Dockerfile` (node:20 install → build → runtime copy `dist/` + prod `node_modules`, `CMD node ./dist/server/entry.mjs` on `4321`)
  - Health endpoint `src/pages/api/health.ts` → `GET /api/health` → `{"status":"ok"}` with no third-party deps
  - MCP config `.opencode/opencode.jsonc` with `Astro docs` MCP + `plane-kcb` already declared; verify against installed versions via MCP before any API use
  - Minimal verification baseline (check / lint / test / build gates passing on empty shell)
- Out of scope:
  - Any domain content collections (labs, projects, etc.) — belongs to `specs/content-model`
  - Any content rendering, cards, or discovery pages — belongs to `specs/core-pages` / `specs/institutional-pages`
  - Search, filtering, timeline, knowledge graph — belongs to `specs/interactive-features`
  - SEO sitemap/RSS, analytics, a11y/perf hardening — belongs to `specs/production-hardening`
  - Production secrets or Coolify dashboard provisioning (only env var contract documented)

## Contracts (success criteria)
- `cmd /c "npm.cmd run check"` (`astro check` + `tsc --noEmit`) passes with zero errors on the scaffold
- `cmd /c "npm.cmd run build"` produces `dist/server/entry.mjs` and prerenderable routes emit static HTML while `/keystatic` and `/api/health` remain server routes (verify `output: server` + per-route `prerender` flags)
- `GET /api/health` returns `{"status":"ok"}` with `200` and `content-type: application/json`, no DB or external call
- `src/styles/tokens.css` defines at minimum `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-accent`, `--border-subtle`, `--space-1`…`--space-8`, `--radius-sm/md/lg`, `--shadow-sm/md`, `--motion-ease/--motion-duration` and no component contains literal color/spacing/radius values (grep check)
- `SiteHeader` / `SiteFooter` render from `BaseLayout` on `/` without client JS (view-source contains rendered HTML, no `client:*` directive on those components)
- Docker image builds locally (`docker build -t labs`) and `docker run -p 4321:4321 labs` serves `GET /api/health` → `{"status":"ok"}` (gate for Coolify)
- Astro MCP was consulted for `astro.config.ts` and adapter APIs and versions in `package.json` match the MCP-verified APIs (reviewer checks config against MCP reference)

## Anti-patterns
- Do not copy `astro.config.ts` from old docs without MCP verification — spec §27 explicitly forbids blind copying
- Do not introduce React for Header/Footer/layouts — violates §41 React Policy; every React component must answer "Does this require client interactivity? → yes"
- Do not scatter styles — no literal `--color-`/`space`/`radius` values outside `src/styles/`; use tokens only
- Do not commit `.env`, `KEYSTATIC_*` secrets, tokens, or credentials
- Do not deploy as static adapter — `@astrojs/node` standalone is mandatory for Keystatic server APIs (spec §26)
- Do not hard-code homepage content — shell only; content belongs in Keystatic collections

## Decisions
- `docs/adrs/ADR-001.md` — `output: server` + `@astrojs/node` standalone accepted (spec §26); alternatives (static, vercel adapter) rejected due to Keystatic server requirement
- `docs/adrs/ADR-002.md` — Keystatic `local` dev / `github` prod storage accepted (spec §28); content remains git-tracked
- `docs/adrs/ADR-004.md` — React islands only where interactivity required; hydration preference `client:visible > idle > load` (spec §41)
- Design tokens as CSS custom properties (spec §33) — supports light/dark themes without component rewrites

## Tooling
- `Astro docs MCP` (`https://mcp.docs.astro.build/mcp`) — required for all Astro API decisions
- `plane-kcb MCP` — issue sync for `kcb/KCBLABS` (Backlog ignored until Todo)
- Adopted after capability discovery (record in `plans/README.md` Gate plan):
  - `astrolicious/agent-skills@astro` (13.7K installs) — Astro scaffolding patterns (candidate, needs approval before `skills add`)
  - No build tool beyond `astro`, `typescript`, `react`, `keystatic` — keep bundle minimal per spec §40
