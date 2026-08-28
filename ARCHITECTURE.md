# ARCHITECTURE.md — KCB Labs Website (labs.kcb.ma)

> **As-built snapshot — not gospel.** This document describes what exists *today* (2026-08-28). It is changeable via ADR. Dead structure found later is corrected here, not silently in code. See `docs/adrs/` for decisions.

**Plane binding:** `kcb / KCBLABS` (`4f8b6bc1-7a02-4822-943d-fb6ab541414f`, identifier `KCBLABS`) — verified via `plane-kcb` MCP on 2026-08-27.

---

## 1. Current State (as of 2026-08-28)

**Fully built.** PBI-001 through PBI-022 complete. All content collections, data access layer, pages, components, styling, SEO, security, and analytics implemented.

| Area | Status | Evidence |
|---|---|---|
| Astro app | ✅ Built | `astro.config.ts` — `output: server`, `@astrojs/node` standalone, React + Markdoc + Keystatic + Sitemap integrations |
| Keystatic | ✅ Built | `keystatic.config.ts` — 9 collections + 5 singletons |
| Design system | ✅ Built | `src/styles/tokens.css` + `globals.css` — full token system with light/dark theme |
| Data access layer | ✅ Built | `src/lib/content/*` — 9 collection helpers + `relationships.ts` + `validate.ts` |
| Pages & layouts | ✅ Built | `src/pages/` — 21 routes, `src/layouts/BaseLayout.astro` with SEO/OG/Schema |
| Components | ✅ Built | `src/components/astro/*` (server), `src/components/react/*` (islands), `cards/*`, `ui/*`, `content/*` |
| Search | ✅ Built | `src/lib/search/buildIndex.ts` + `src/components/react/Search.tsx` (client:visible island) |
| Filters | ✅ Built | `src/components/react/Filters.tsx` — Labs status + Projects type/stage |
| Timeline | ✅ Built | `src/components/react/Timeline.tsx` — keyboard navigable, prefers-reduced-motion |
| SEO | ✅ Built | `@astrojs/sitemap`, `robots.txt.ts`, `rss.xml.ts`, BaseLayout canonical/OG/Schema |
| Security | ✅ Built | `src/middleware.ts` — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| Analytics | ✅ Built | `src/lib/analytics.ts` — Plausible/Umami abstraction via `PUBLIC_ANALYTICS_PROVIDER` |
| Error pages | ✅ Built | `src/pages/404.astro` + `src/pages/500.astro` — branded |
| A11y | ✅ Built | Skip link, landmarks, :focus-visible, keyboard nav, aria-describedby, prefers-reduced-motion |
| Dockerfile | ✅ Built | Multi-stage `node:20-alpine`, CMD `node ./dist/server/entry.mjs` on 4321 |
| CI | ✅ Built | `.github/workflows/ci.yml` — install → check → build → test |
| Health | ✅ Built | `src/pages/api/health.ts` — `GET /api/health` → `{"status":"ok"}` |
| Verification | ✅ Built | `npm run check` (astro check + tsc), `npm run build`, `npm test` (vitest + smoke) |

---

## 2. Modules & Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│  Astro (output: server, @astrojs/node standalone)               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │ Pages       │  │ Layouts      │  │ Components              │ │
│  │ /, /labs/*  │  │ BaseLayout   │  │ astro/* (server)        │ │
│  │ /projects/* │◄─┤              │◄─┤ react/* (islands)       │ │
│  │ /journal/*  │  └──────────────┘  │ cards/*                 │ │
│  │ /about/*    │                    │ content/* (RichContent) │ │
│  │ /participate│                    │ ui/* (Badges)           │ │
│  │ /contact    │                    │ navigation/*            │ │
│  │ /open-source│                    │ sections/*              │ │
│  │ /api/health │                    └───────────┬─────────────┘ │
│  └──────┬──────┘                              │               │
│  ┌──────▼──────┐  ┌──────────────┐  ┌─────────▼──────────────┐  │
│  │ Data Layer  │  │ Content      │  │ Styles                 │  │
│  │ src/lib/    │◄─┤ src/content/ │  │ src/styles/tokens.css  │  │
│  │ content/*   │  │ (Keystatic)  │  │ globals.css            │  │
│  │ search/*    │  └──────┬───────┘  └────────────────────────┘  │
│  └─────────────┘         │                                      │
│  ┌───────────────────────▼────────────────────────────────────┐ │
│  │ Keystatic (@keystatic/astro) — /keystatic admin            │ │
│  │ storage: local (dev) → github (prod)                       │ │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Middleware (src/middleware.ts) — security headers           │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         │                        │                      ▲
         ▼                        ▼                      │
   ┌──────────┐            ┌───────────┐          ┌─────┴─────┐
   │ Coolify  │──webhook──▶│  GitHub   │◄─────────┤  Editor   │
   │ Docker   │            │  (content │  commit  │ /keystatic│
   │ :4321    │            │   commits)│          └───────────┘
   └──────────┘            └───────────┘
```

### Boundaries

- **Pages never query content directly** — they import helpers from `src/lib/content/*`. Relationship validation lives in that layer; broken refs fail the build.
- **Astro vs React:** `src/components/astro/` is the default. `src/components/react/` islands only when `Does this require client interactivity? → yes`. Islands use `client:visible` by default.
- **Content vs Code:** `src/content/` is Keystatic-managed, git-tracked. No hard-coded content in components. Lifecycle: `draft → published → archived`; only `published` publicly indexed.
- **Styles:** Design tokens in `src/styles/` are the only source of colors, spacing, radius, borders, shadows, motion. No literal values in components.

---

## 3. Rendering & Deployment Topology

- **Framework:** `output: server` + `@astrojs/node` `mode: standalone`. Keystatic needs server-side Node APIs. Public pages prerendered (`export const prerender = true`); `/keystatic` and `/api/*` dynamic.
- **Container:** Multi-stage Docker (`node:20-alpine` → install → `astro build` → slim runtime). `CMD node ./dist/server/entry.mjs` on `4321`.
- **Coolify:** Build Pack `Dockerfile`, Domain `https://labs.kcb.ma`, Auto Deploy, HTTPS. Env secrets: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `PUBLIC_SITE_URL`.
- **Health:** `GET /api/health` → `{"status":"ok"}` (no third-party deps).
- **Security:** Middleware emits `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `X-XSS-Protection`, `Permissions-Policy`.
- **Workflow:** `Editor → /keystatic → GitHub commit → Coolify webhook → Docker build → labs.kcb.ma`.

---

## 4. Domain Model (Relationship-First)

Core entities and traversal:

```
Lab ─┬─ Research ─┬─ experiments[]
     │            └─ projects[]
     ├─ Experiments ──► outcomes: VALIDATED/INCONCLUSIVE/FAILED/PARTIAL
     ├─ Projects ─────► type: Internal/Client/Startup/Collaboration/Open Source/Research
     │                stage: Idea→…→Live→Completed/Spun Out; originLab?
     ├─ Articles      (Journal — Article/Lab Note/Field Note/Perspective/Announcement)
     ├─ People
     ├─ Organizations
     └─ Technologies

Cross-cutting: People ↔ Labs/Projects, Organizations ↔ Projects, Technologies ↔ Labs/Projects,
               Journal Articles ↔ Labs/Research/Experiments/Projects/People/Organizations
```

Keystatic: 9 collections + 5 singletons. See `CONTENT-MODEL.md` for full schema.

---

## 5. Data Flow

1. **Authoring:** Editor authenticates via GitHub App at `/keystatic`, edits structured fields, saves. Local dev writes to `src/content/`; prod GitHub mode commits to repo.
2. **Reading:** Pages call `getLabs()`, `getLabBySlug()`, `getProjectsByLab()`, `relationships.ts` etc. Astro renders HTML server-side; prerendered routes emit static HTML.
3. **Discovery:** Search builds static index at build time + React island (`client:visible`). Filters progressively enhance server-rendered lists. Homepage numbers computed from real content.
4. **SEO:** Each page emits `title`, `description`, `canonical`, OG/Twitter, Schema.org. `sitemap.xml`, `robots.txt`, Journal RSS generated; `/keystatic/*` and `/api/*` excluded.
5. **Security:** Middleware adds headers on every response. No secrets in client bundle.
6. **Analytics:** `track(event)` abstraction — Plausible/Umami/none via env. Provider swap requires no page changes.

---

## 6. Constraints & Known Gaps

- **No DB** — content is git-managed files. Search, filtering, relationships are file-based.
- **No images yet** — `src/assets/` has placeholder structure but no actual images. When added, use Astro `<Image />` with `loading="lazy"` and `alt` text.
- **Analytics not wired to pages** — `track()` function exists but pages don't call it yet. Wire in future PBI.
- **Font loading** — Font families declared in tokens but no `@font-face` or preload. Falls back to system fonts.
- **MCP:** Astro Docs MCP configured. Plane MCP for issue sync.

---

## 7. Decision Log (pointer)

| Decision | Status | ADR |
|---|---|---|
| Astro `output: server` + `@astrojs/node` standalone for Keystatic | Accepted | `ADR-001` |
| Keystatic `local` dev / `github` prod storage | Accepted | `ADR-002` |
| Relationship-first content model (Lab→Research→Experiment→Project→OS) | Accepted | `ADR-003` |
| React islands only where interactivity required | Accepted | `ADR-004` |

---

*Last updated: 2026-08-28 — PBI-022 complete. All core features implemented.*
