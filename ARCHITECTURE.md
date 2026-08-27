# ARCHITECTURE.md — KCB Labs Website (labs.kcb.ma)

> **As-built snapshot — not gospel.** This document describes what exists *today* (2026-08-27). It is changeable via ADR. Dead structure found later is corrected here, not silently in code. See `docs/adrs/` for decisions.

**Plane binding:** `kcb / KCBLABS` (`4f8b6bc1-7a02-4822-943d-fb6ab541414f`, identifier `KCBLABS`) — verified via `plane-kcb` MCP on 2026-08-27.

---

## 1. Current State (as of 2026-08-27)

**Empty repository — scaffolding pending.** No source code has been committed yet. The only tracked file is the upstream product & technical specification (79 sections) at `KCB Labs — Website Product & Technical Specification.md`.

| Area | Status | Evidence |
|---|---|---|
| Astro app | ⬜ Not scaffolded | No `astro.config.ts`, no `package.json`, no `src/` |
| Keystatic | ⬜ Not scaffolded | No `keystatic.config.ts`, no `src/content/` |
| Design system | ⬜ Not scaffolded | No `src/styles/` tokens |
| Data access layer | ⬜ Not scaffolded | No `src/lib/content/` |
| Pages & layouts | ⬜ Not scaffolded | No `src/pages/`, `src/layouts/` |
| Dockerfile / Coolify | ⬜ Not scaffolded | No `Dockerfile`, no deployment |
| Verification baseline | ⏳ Bootstrapped in this onboarding | `package.json` + `tests/smoke.test.mjs` (node:test) |
| ASDLC structure | ✅ Established 2026-08-27 | `AGENTS.md`, `ARCHITECTURE.md`, `plans/`, `specs/`, `docs/adrs/` |

The as-built description below is therefore **forward-looking** — it records the *intended* architecture from the upstream spec (the contract the codebase must grow into). After Phase 1 (Foundation) lands, this document will be updated to reflect the actual installed versions, file layout, and measured build output.

---

## 2. Intended Modules & Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│  Astro (output: server, @astrojs/node standalone)               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │ Pages       │  │ Layouts      │  │ Components              │ │
│  │ /, /labs/*  │  │ BaseLayout   │  │ astro/* (static)        │ │
│  │ /projects/* │◄─┤ LabLayout    │◄─┤ react/* (islands)       │ │
│  │ /journal/*  │  │ ProjectLayout│  │ cards/*                 │ │
│  │ /about/*    │  │ ArticleLayout│  │ content/* (RichContent) │ │
│  │ /api/health │  └──────────────┘  │ ui/* (Status/TypeBadge) │ │
│  └──────┬──────┘                     └───────────┬─────────────┘ │
│         │                                      │               │
│  ┌──────▼──────┐  ┌──────────────┐  ┌──────────▼─────────────┐  │
│  │ Data Layer  │  │ Content      │  │ Styles                 │  │
│  │ src/lib/    │◄─┤ src/content/ │  │ src/styles/tokens.css  │  │
│  │ content/*   │  │ (Keystatic)  │  │ globals, theme         │  │
│  └─────────────┘  └──────┬───────┘  └────────────────────────┘  │
│                          │                                      │
│  ┌───────────────────────▼────────────────────────────────────┐ │
│  │ Keystatic (@keystatic/astro) — /keystatic admin, API routes│ │
│  │ storage: local (dev) → github (prod)                       │ │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │                        │                      ▲
         ▼                        ▼                      │
   ┌──────────┐            ┌───────────┐          ┌─────┴─────┐
   │ Coolify  │──webhook──▶│  GitHub   │◄─────────┤  Editor   │
   │ Docker   │            │  (content │  commit  │ /keystatic│
   │ :4321    │            │   commits│          └───────────┘
   └──────────┘            └───────────┘
```

### Boundaries

- **Pages never query content directly** — they import helpers from `src/lib/content/*`. Relationship validation lives in that layer; broken refs must fail the build, not render empty.
- **Astro vs React:** `src/components/astro/` is the default. `src/components/react/` islands are only added when `Does this require client interactivity? → yes`. Each island declares the weakest viable hydration (`client:visible` > `idle` > `load`).
- **Content vs Code:** `src/content/` is Keystatic-managed, git-tracked. No hard-coded content in components; no invented relationship IDs. Content lifecycle is `draft → published → archived`; only `published` is publicly indexed.
- **Styles:** Design tokens in `src/styles/` are the only source of colors, spacing, radius, borders, shadows, motion. No literal values scattered in components.

---

## 3. Rendering & Deployment Topology

- **Framework contract:** `output: server` with `@astrojs/node` `mode: standalone`. Required because Keystatic needs server-side Node APIs. Public pages are per-route prerendered (`export const prerender = true`) where practical; `/keystatic` and `/api/*` remain dynamic.
- **Container:** Multi-stage Docker (`node:20` → install → `astro build` → slim runtime). `CMD node ./dist/server/entry.mjs` on `4321`. Final image contains only `dist/` + `node_modules` prod.
- **Coolify:** Build Pack `Dockerfile`, Domain `https://labs.kcb.ma`, Auto Deploy (GitHub webhook), HTTPS. Env secrets: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `PUBLIC_SITE_URL`.
- **Health:** `GET /api/health` → `{"status":"ok"}` (no third-party deps).
- **Workflow:** `Editor → /keystatic → GitHub commit → Coolify webhook → Docker build → labs.kcb.ma`.

---

## 4. Domain Model (Relationship-First)

Core entities (spec §5–§16) and intended traversal:

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
Lifecycle: IDEA → LAB → RESEARCH → EXPERIMENT → VALIDATION → PROJECT → PRODUCT/STARTUP/SOLUTION/OS
Future: knowledge graph visualization (Lab↔Research↔Experiment↔Project↔OpenSource↔Journal with People/Orgs/Tech).
```

Keystatic stores this as 9 collections (`labs`, `research`, `experiments`, `projects`, `articles`, `people`, `organizations`, `opensource`, `roadmap`) plus singletons (`site`, `pages/about`, `vision`, `sponsorship`, `settings`). Every collection has identity (title/slug/description/status), publishing (published/publishedAt/updatedAt), relationships, metadata (featured/priority/tags), and SEO (seoTitle/seoDescription/socialImage). Slug rules: lowercase, stable, human-readable, English; redirect required on change.

---

## 5. Data Flow

1. **Authoring:** Editor authenticates via GitHub App at `/keystatic`, edits structured fields, saves. Local dev writes to `src/content/`; prod GitHub mode commits to repo.
2. **Reading:** Pages call `getLabs()`, `getLabBySlug()`, `getProjectsByLab()`, `relationships.ts` etc. Astro renders HTML server-side; prerendered routes emit static HTML; `src/assets/` images go through Astro image pipeline with required `alt` text.
3. **Discovery:** Search builds a static index at build time (generated JSON) + React island (`client:visible`). Explore filters (`Internal/Client/Startup/...`, stages `Idea…Live…Spun Out`) progressively enhance server-rendered lists. Numbers on homepage (Labs, Experiments, Projects, OS) are computed from real content, never hard-coded.
4. **SEO:** Each page emits `title`, `description`, `canonical`, OG/Twitter, and Schema.org (`Organization`, `Article`, `Person`, `SoftwareSourceCode`). `sitemap.xml`, `robots.txt`, Journal RSS generated native to Astro; `/keystatic/*` and `/api/*` excluded from indexing.

---

## 6. Constraints & Known Gaps

- **No DB** initially — content is git-managed files. Search, filtering, and relationships are file-based.
- **No code yet** — the stack has not been installed. Next step is Phase 1 (Astro + React + Keystatic + TypeScript + tokens + layouts + MCP + Dockerfile) per upstream spec §78 and `plans/README.md`. Dependencies must not be added without PBI/ADR justification.
- **Verification baseline is minimal:** `node --test` smoke suite (`tests/smoke.test.mjs`). Full gates (`astro check`, `tsc --noEmit`, Vitest, Playwright) arrive with scaffolding.
- **MCP:** Astro Docs MCP (`https://mcp.docs.astro.build/mcp`) configured in `.opencode/opencode.jsonc` alongside `plane-kcb`. GitHub MCP not yet added — add only if it materially helps code review/content PRs.
- **Accessibility target:** WCAG 2.2 AA (semantic HTML, keyboard nav, visible focus, heading hierarchy, contrast, `prefers-reduced-motion`). Islands must degrade gracefully without JS for core content.
- **Git:** `master` branch, no commits yet. Micro-commit discipline starts with this onboarding; legacy history is not rewritten.

---

## 7. Decision Log (pointer)

All structural decisions live as ADRs in `docs/adrs/`. Onboarding creates placeholder ADR index.

| Decision | Status | ADR |
|---|---|---|
| Astro `output: server` + `@astrojs/node` standalone for Keystatic | Accepted (spec §26) | `ADR-001` (planned) |
| Keystatic `local` dev / `github` prod storage | Accepted (spec §28) | `ADR-002` (planned) |
| Relationship-first content model (Lab→Research→Experiment→Project→OS) | Accepted (spec §15) | `ADR-003` (planned) |
| React islands only where interactivity required | Accepted (spec §41) | `ADR-004` (planned) |

When structure changes, update this doc and add/supersede an ADR — do not silently drift.

---

*Last updated: 2026-08-27 — asdlc-onboard bootstrap. Next update: Phase 1 foundation lands.*
