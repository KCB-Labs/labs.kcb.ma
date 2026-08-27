# AGENTS.md — KCB Labs Website (labs.kcb.ma)

Plane workspace: kcb
Plane project: 4f8b6bc1-7a02-4822-943d-fb6ab541414f (KCBLABS)
# MCP server: plane-kcb — verified via MCP (project.list) on 2026-08-27

> Constitution for agentic development. All AI agents and humans must follow this file.
> Stack, commands, conventions, and Context Map (§5). Methodology: https://asdlc.io

---

## 1. Project Purpose

`labs.kcb.ma` is the public digital platform for **KCB Labs** — a public R&D and innovation platform that documents how KCB turns ideas into experiments, validated projects and real-world outcomes.

Identity lifecycle:

```
IDEA → LAB → RESEARCH → EXPERIMENT → VALIDATION → PROJECT → PRODUCT / STARTUP / CLIENT SOLUTION / OPEN SOURCE
```

Simultaneously:
1. Public identity of KCB Labs
2. R&D portfolio
3. Knowledge base
4. Project discovery platform
5. Editorial publication (Journal)
6. Record of experimentation
7. Gateway for collaborators and sponsors

Core principle: **Do not build a website that merely displays KCB's work. Build a structured system capable of explaining how KCB's work evolves.** Every page must allow traversal Lab ↔ Research ↔ Experiment ↔ Project ↔ Article ↔ People ↔ Organization.

Source of truth for product/technical spec: `KCB Labs — Website Product & Technical Specification.md` (79 sections, implementation spec). Future specs live in `specs/{feature}/spec.md` (state).

---

## 2. Technology Stack

| Area | Decision | Notes |
|---|---|---|
| Framework | **Astro** | `output: server` with per-route prerendering; `@astrojs/node` adapter `mode: standalone` |
| UI islands | **React** | Only where client interactivity required; `client:load`/`idle`/`visible` minimal hydration |
| Language | **TypeScript** | Strict; no `any` without justification |
| CMS | **Keystatic** | Structured content; `storage: local` dev, `kind: github` prod; exposed at `/keystatic` |
| Content format | **Markdoc / Markdown** | Keystatic ↔ Astro content collections |
| Styling | **Design tokens + CSS** | Tokens for colors, typography, spacing, radius, borders, shadows, motion |
| Deployment | **Coolify + Dockerfile** | Multi-stage Node build; `node ./dist/server/entry.mjs` on port 4321; domain `https://labs.kcb.ma` |
| Source control | **GitHub** | Content commits versioned alongside code |
| Search | Generated content index + React island | Covers Labs, Projects, Articles, Research, Experiments, People, Open Source |
| Analytics | Privacy-conscious (Plausible/Umami) | Abstracted provider |
| SEO | Astro-native metadata / sitemap / RSS | `sitemap.xml`, `robots.txt`, RSS for Journal |
| AI dev | **MCP-enabled agents** | Astro Docs MCP `https://mcp.docs.astro.build/mcp` required |
| Node | >= 20 | Keystatic needs server-side Node APIs |

**Primary decisions locked via `ARCHITECTURE.md` and `docs/adrs/`. Change via ADR only.**

---

## 3. Repository Structure (as-built → intended)

```
.
├── AGENTS.md                          # This file — constitution + Context Map
├── ARCHITECTURE.md                    # As-built snapshot (not gospel, ADR-changeable)
├── KCB Labs — Website Product & Technical Specification.md  # Upstream implementation spec (79 sections)
├── CONTENT-MODEL.md                   # (planned) Keystatic schema & relationship reference
├── DESIGN-SYSTEM.md                   # (planned) Tokens & component catalogue
├── DEPLOYMENT.md                      # (planned) Coolify + env + health check
├── CONTRIBUTING.md                    # (planned) Workflow for humans & agents
│
├── astro.config.ts                    # Astro config (output: server, node adapter, integrations)
├── keystatic.config.ts                # Keystatic collections & singletons
├── package.json                       # Scripts: check / build / test / lint
├── tsconfig.json
├── Dockerfile                         # Multi-stage build (install → build → runtime)
├── .dockerignore
├── .gitignore
│
├── public/                            # Static assets (favicon, fonts, etc.)
│
├── src/
│   ├── assets/                        # Managed images (lab covers, avatars, diagrams)
│   ├── components/
│   │   ├── astro/                     # Server-rendered Astro components
│   │   ├── react/                     # Interactive islands (Search, Filters, Timeline)
│   │   ├── cards/                     # LabCard, ProjectCard, ArticleCard, etc.
│   │   ├── content/                   # RichContent, CodeBlock, Callout, ImageFigure, etc.
│   │   ├── navigation/                # SiteHeader, SiteFooter, Breadcrumbs
│   │   ├── sections/                  # Homepage sections, hero, CTA
│   │   └── ui/                        # StatusBadge, TypeBadge, StageBadge, etc.
│   ├── content/                       # Keystatic-managed structured files (git-tracked)
│   │   ├── labs/
│   │   ├── research/
│   │   ├── experiments/
│   │   ├── projects/
│   │   ├── articles/
│   │   ├── people/
│   │   ├── organizations/
│   │   ├── opensource/
│   │   └── roadmap/
│   ├── layouts/                       # BaseLayout, ArticleLayout, LabLayout, etc.
│   ├── pages/                         # File-based routing (labs/[slug], projects/[slug], journal/[slug], etc.)
│   │   └── api/
│   │       └── health.ts              # GET /api/health → {status:"ok"} (Coolify health check)
│   ├── lib/
│   │   └── content/                   # Data access layer (labs.ts, projects.ts, relationships.ts)
│   └── styles/                        # Tokens, globals, theme
│
├── specs/{feature}/spec.md            # Spec (state) — one per feature, human-reviewed before code
├── tasks/PBI-{NNN}.md                 # PBI (delta) — atomic executable slices
├── plans/
│   ├── README.md                      # Sequencing & Plane sync index
│   └── PROGRESS.md                    # Execution progress log
└── docs/adrs/                         # Architecture Decision Records
```

**When structure changes, update §5 Context Map. Stale maps are worse than none.**

---

## 4. Commands — Deterministic Gates

All PBIs must pass these gates before adversarial/constitutional review. Windows PowerShell 5.1: `.ps1` wrappers blocked — use `cmd /c "npm.cmd ..."` / `npx.cmd`.

| Gate | Command | Purpose |
|---|---|---|
| Install | `cmd /c "npm.cmd install"` | Install deps (Node >=20) |
| Type check | `cmd /c "npm.cmd run check"` | `astro check` + `tsc --noEmit` |
| Lint | `cmd /c "npm.cmd run lint"` | ESLint / Astro check (if configured) |
| Test | `cmd /c "npm.cmd test"` | Unit + integration (Vitest / node:test) |
| Build | `cmd /c "npm.cmd run build"` | `astro build` — must succeed with `output: server` + `@astrojs/node` |
| E2E (optional) | `cmd /c "npm.cmd run test:e2e"` | Playwright smoke (homepage, labs, projects, journal) |
| Health | `GET /api/health` → `{"status":"ok"}` | No third-party deps; Coolify health check |

**No PBI may start before a runnable gate exists. The Ralph Loop has nothing to verify against otherwise.**

Current baseline (empty repo, scaffolding pending): `npm test` runs `node --test` smoke suite in `tests/smoke.test.mjs`. After Astro scaffolding (Phase 1), gates above replace/augment it.

MCP config (`.config/opencode/opencode.jsonc` or `.opencode/opencode.jsonc`):

```json
{
  "mcp": {
    "Astro docs": { "type": "http", "url": "https://mcp.docs.astro.build/mcp" },
    "plane-kcb": {
      "type": "remote",
      "url": "https://plane-mcp.kcb.ma/http/api-key/mcp",
      "headers": { "Authorization": "Bearer {env:PLANE_API_KEY}", "X-Workspace-slug": "kcb" }
    }
  }
}
```

### Forbidden Patterns

- Hard-coding content that belongs in Keystatic collections
- Inventing relationship IDs (validate via `src/lib/content` helpers)
- Changing published slugs without redirect strategy
- Turning static pages (Header, Footer, Article, Lab, Project) into React apps without interactivity justification
- Adding dependencies without justification in PBI/ADR
- Committing `.env`, secrets, `KEYSTATIC_*`, tokens, credentials
- Indexing `/keystatic/*` or `/api/*` (exclude from sitemap/robots)
- Touching code without a human-reviewed `specs/{feature}/spec.md` (including one-line fixes — use compact behavior contract)
- Rewriting legacy git history

---

## 5. Context Map

Annotated YAML — responsibilities per area (not file lists) + documentation index.

```yaml
project_structure:
  "/":                        # Repo root — constitution, architecture, spec source, deployment contract
    responsibility: "Declares stack, commands, and product lifecycle (IDEA→LAB→RESEARCH→EXPERIMENT→PROJECT). Hosts AGENTS.md (truth for agents), ARCHITECTURE.md (as-built), and upstream spec doc."
    contains: "AGENTS.md, ARCHITECTURE.md, KCB Labs — Website Product & Technical Specification.md, Dockerfile, astro.config.ts, keystatic.config.ts, package.json"

  "src/pages/":               # File-based routing — URL architecture is product contract
    responsibility: "Implements URL structure from §4 of spec (/labs/[slug], /projects/[slug], /journal/[slug], /about/*, /participate/*). Per-route prerendering where possible; server output for Keystatic."
    owns: "Routing, SEO metadata per page, canonical URLs, prerender flags"

  "src/layouts/":             # Page chrome & document shell
    responsibility: "Provides BaseLayout (html, head, SEO, OG/Twitter, Schema.org) and specialized layouts (LabLayout, ProjectLayout, ArticleLayout). Consistent typography, whitespace, and accessibility shell."
    contains: "BaseLayout.astro, LabLayout.astro, ProjectLayout.astro, ArticleLayout.astro"

  "src/components/astro/":    # Server-rendered building blocks (no JS)
    responsibility: "Static UI: SiteHeader, SiteFooter, Container, Section, Breadcrumbs, PageHeader, Prose. Must be Astro; React forbidden unless interactivity required."
    rule: "If no client interactivity → build in Astro (see §7)"

  "src/components/react/":    # Interactive islands only
    responsibility: "Client islands: Search, Filters, Interactive timelines, Knowledge graph, complex nav. Minimal hydration (client:visible > idle > load)."
    rule: "Every React component must answer 'Does this require client interactivity?' (§41 of spec)"

  "src/components/cards/":    # Discovery surfaces
    responsibility: "Entity cards: LabCard, ProjectCard, ArticleCard, ResearchCard, ExperimentCard, PersonCard, OrganizationCard, OpenSourceCard. Used on Explore, Journal, Lab/Project detail, homepage."
    depends_on: "Design tokens, StatusBadge/TypeBadge/StageBadge"

  "src/components/ui/":       # Metadata primitives
    responsibility: "StatusBadge, TypeBadge, StageBadge, DateLabel, ReadingTime, RelationLabel — mono/technical typography, status colors."

  "src/components/content/":  # Rich content rendering
    responsibility: "RichContent, CodeBlock, Callout, Quote, ImageFigure, Timeline, Metric, ArchitectureDiagram — editorial-quality rendering for research/experiment/article bodies."

  "src/content/":             # Structured content — Keystatic managed, git-tracked
    responsibility: "Source of truth for Labs, Research, Experiments, Projects, Articles, People, Organizations, OpenSource, Roadmap. Draft/published/archived lifecycle; only published appears publicly."
    collections: "labs, research, experiments, projects, articles, people, organizations, opensource, roadmap"
    managed_by: "Keystatic (local storage dev, github storage prod)"
    validation: "Relationship validation at build — broken refs must fail build, not silently empty"

  "src/lib/content/":         # Data access layer — single place for content queries
    responsibility: "Centralizes all content querying: getLabs(), getLabBySlug(), getProjectsByLab(), relationships.ts, etc. No scattered queries in pages."
    files: "labs.ts, projects.ts, research.ts, experiments.ts, articles.ts, people.ts, organizations.ts, relationships.ts, opensource.ts, roadmap.ts"

  "src/styles/":              # Design system tokens
    responsibility: "Tokens for colors, typography, spacing, radius, borders, shadows, motion, containers, breakpoints, z-index. Light/dark theme support. No literal values scattered in components."
    tokens: "--color-bg, --color-surface, --space-1..n, --radius-sm/md/lg, --border-subtle"

  "src/assets/":              # Optimized media
    responsibility: "Lab images, project covers, hero images, avatars, org logos, diagrams via Astro image pipeline + Keystatic image fields. Every image requires alt text."

  "public/":                  # Static public assets
    responsibility: "Favicon, robots.txt source, fonts, etc. Copied as-is."

  "keystatic.config.ts":      # Content schema contract
    responsibility: "Defines collections, singletons (site, pages/about, vision, sponsorship, settings), field types, relationships, slug generation, and publishing states. Changes require spec/ADR."
    principles: "Required identity (title/slug/description/status), publishing (published/publishedAt/updatedAt), relationships, metadata (featured/priority/tags), SEO (seoTitle/seoDescription/socialImage)"

  "astro.config.ts":          # Framework contract
    responsibility: "output: server, @astrojs/node standalone, integrations [react(), markdoc(), keystatic()], site: https://labs.kcb.ma. Must follow installed Astro/Keystatic versions — verify via Astro MCP, never copy blindly."

  "Dockerfile":               # Deployment contract
    responsibility: "Multi-stage: Node install → build Astro → slim runtime copy of dist + node_modules. CMD node ./dist/server/entry.mjs on 4321. Only prod essentials in final image."

  "specs/":                   # Spec (state) — human-reviewed truth before code
    responsibility: "One spec per feature: specs/{feature}/spec.md — high-level behavior (retry limit is 5), not code narration. Reversed from code for brownfield (Spec Reversing gate) and reviewed by human before PBI creation."
    governance: "Living Specs practice; no code change without spec"

  "tasks/":                   # PBI (delta) — atomic executable units
    responsibility: "PBI-NNN.md cards derived from specs via asdlc-plan. Each has Directive, Verification, and optional Plane: kcb/KCBLABS-N link. Sequenced in plans/README.md."

  "plans/":                   # Sequencing & progress
    responsibility: "plans/README.md = execution order + Plane sync index; plans/PROGRESS.md = Ralph Loop progress log. Bound to Plane: kcb/KCBLABS — Backlog ignored until moved to Todo."
    plane_binding: "kcb / KCBLABS (4f8b6bc1-7a02-4822-943d-fb6ab541414f)"

  "docs/adrs/":               # Architecture Decision Records
    responsibility: "Records structural decisions (e.g., Astro output mode, Keystatic storage, filtering strategy, search index). Immutable once accepted; superseded via new ADR."

documentation_index:
  "AGENTS.md":                # Answers: How do I work in this repo? (you are here)
    answers: "Project purpose, stack, commands, architecture rules, content model, design system, testing, deployment, MCP, forbidden patterns, Plane binding, Context Map"
  "ARCHITECTURE.md":          # Answers: What does the system look like today?
    answers: "As-built modules, boundaries, data flow, constraints, rendering architecture (server + prerender), Keystatic strategy, deployment topology — marked as-built not gospel"
    freshness: "Updated via ADR; dead structure corrected there, not silently in code"
  "KCB Labs — Website Product & Technical Specification.md":  # Answers: What should the product be? (upstream spec)
    answers: "Full 79-section product & technical spec: principles, IA, URL architecture, domain model (Lab/Research/Experiment/Project/Journal/People/Ecosystem/Roadmap), collections, relationships, page specs, design direction, Astro/Keystatic/Coolify contracts, MVP, DoD"
    role: "Source for deriving specs/{feature}/spec.md via asdlc-plan"
  "CONTENT-MODEL.md":         # (planned) Answers: How is content modeled?
    answers: "Keystatic schemas, field tables, relationship graph, publishing states, validation rules, slug stability, SEO fields"
  "DESIGN-SYSTEM.md":         # (planned) Answers: How should it look?
    answers: "Tokens, typography hierarchy, color palette, spacing, motion, card system, metadata badges, layout grids, accessibility requirements"
  "DEPLOYMENT.md":            # (planned) Answers: How does it deploy?
    answers: "Dockerfile stages, Coolify config (Dockerfile pack, port 4321, domain labs.kcb.ma), env vars (KEYSTATIC_*), health endpoint, GitHub→Coolify workflow, rollback"
  "CONTRIBUTING.md":          # (planned) Answers: How do I contribute?
    answers: "Branch strategy (main + feature/*), commit conventions, PBI workflow, review gates, AI agent workflow (Understand→Inspect→MCP→Design→Implement→Test→Build→Review→Commit)"
  "specs/{feature}/spec.md":  # Answers: What should this feature do? (behavioral contract)
    answers: "Feature-scoped behavior, intent, edge cases, relationships, acceptance criteria — human-reviewed before code"
  "tasks/PBI-{NNN}.md":       # Answers: What exactly do I build next?
    answers: "Atomic slice: Directive (what), Verification (how to prove), Context (links to spec & Plane issue)"
  "plans/README.md":          # Answers: In what order do I build & what is Plane status?
    answers: "PBI sequencing, dependency order, Plane sync mapping (issue → PBI), execution status"
  "plans/PROGRESS.md":        # Answers: What has been executed and what remains?
    answers: "Ralph Loop log: PBI status transitions, gate results, review outcomes"
  "docs/adrs/ADR-*.md":       # Answers: Why was this structural decision made?
    answers: "Context, decision, alternatives, consequences, status (proposed/accepted/superseded)"
```

---

## 6. Architecture Rules

- Astro is primary; React only for islands requiring interactivity.
- `output: server` + `@astrojs/node` standalone required for Keystatic server functionality. Do not deploy as purely static.
- Prerender public content pages where practical (`export const prerender = true` per route) while retaining server runtime for `/keystatic` and `/api/*`.
- No DB initially; content is git-managed files via Keystatic. Relationships validated at build.
- URL stability: slugs lowercase, stable, human-readable, English; never change without redirect.
- Content querying via `src/lib/content/*` only; no scattered queries in pages.
- Relationship system is core intellectual architecture: Lab → Research → Experiment → Project → Open Source, with People/Organizations/Technologies/Journal as cross-cutting context.

## 7. Astro Rules

- Use Astro MCP for all Astro technical decisions; verify APIs against installed versions.
- Prefer Astro-rendered HTML; minimal JS; lazy-load below-fold images; optimize fonts.
- Reuse existing components; inspect before creating new abstractions.
- Every page must have `title`, `description`, `canonical`, OG, Twitter, and Schema.org where appropriate.
- Generate `sitemap.xml`, `robots.txt`, RSS for Journal; exclude `/keystatic/*` and `/api/*`.

## 8. React Rules

- Gate question: "Does this component require client-side interactivity?" If no → Astro. If yes → React island.
- Least aggressive hydration: `client:visible` > `client:idle` > `client:load`.
- No large UI libraries without justification. Keep bundles small and measurable.

## 9. Keystatic Rules

- Collections: `labs`, `research`, `experiments`, `projects`, `articles`, `people`, `organizations`, `opensource`, `roadmap`. Singletons: `site`, `pages/about`, `pages/vision`, etc.
- Fields: identity (title/slug/description/status) + publishing (published/publishedAt/updatedAt) + relationships + metadata (featured/priority/tags) + SEO.
- Slugs generated from title but remain editable and stable.
- Storage: `local` dev, `github` prod (commits to repo → Coolify deploy). Never commit secrets.
- Must support `draft`/`published`/`archived`; only `published` appears in public indexes.

## 10. Content Model (summary)

Relationship-first:

- **Lab** → research[], experiments[], projects[], articles[], people[], organizations[], technologies[]
- **Research** → lab, experiments[], projects[], articles[]
- **Experiment** → lab, research[], project?, articles[] (outcomes: VALIDATED/INCONCLUSIVE/FAILED/PARTIAL)
- **Project** → originLab?, research[], experiments[], articles[], people[], organizations[], openSource[] (types: Internal/Client/Startup/Collaboration/Open Source/Research; stages: Idea→…→Live→Completed/Spun Out)
- **Article** → labs[], research[], experiments[], projects[], people[], organizations[]
- **People / Organizations** → labs[], projects[]
- See full model in upstream spec §5–§16 and (planned) `CONTENT-MODEL.md`.

## 11. Design System Rules

- Tokens: colors, typography (Display/H1/H2/H3/Body/Small/Metadata/Code), spacing, radius, borders, shadows, motion, containers, breakpoints, z-index.
- Combine Research Lab + Technology Company + Editorial Publication; avoid Agency/SaaS/Corporate template.
- Strong typography, restrained palette, editorial whitespace, subtle borders, structured grids, documentation-style density.
- WCAG 2.2 AA: semantic HTML, keyboard nav, visible focus, correct heading hierarchy, sufficient contrast, alt text, reduced-motion support. Islands must not break core content without JS.

## 12. Testing Requirements

Every PBI must include verification. Build verification before merge:

```bash
cmd /c "npm.cmd run check"
cmd /c "npm.cmd run build"
# if configured:
cmd /c "npm.cmd test"
cmd /c "npm.cmd run test:e2e"
```

- Unit: relationships, filtering, sorting, URL generation.
- Integration: collection loading, schema validation, RSS/sitemap.
- E2E: homepage, lab/project/journal navigation, search, filters.
- Visual: mobile/tablet/desktop/large.

## 13. Deployment Requirements

- Dockerfile multi-stage (node:20 → install → build → runtime copy). CMD `node ./dist/server/entry.mjs`.
- Coolify: Build Pack `Dockerfile`, Domain `https://labs.kcb.ma`, Port `4321`, Auto Deploy enabled, HTTPS enabled.
- Env (Coolify secrets, never committed): `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `PUBLIC_SITE_URL=https://labs.kcb.ma`.
- Health: `GET /api/health` → `{"status":"ok"}` (no third-party deps).
- Workflow: `Editor → Keystatic /keystatic → GitHub commit → Coolify webhook → Docker build → labs.kcb.ma`.
- `404`/`500` on-brand; `404` e.g., "This path hasn't become a project yet."

## 14. MCP Requirement

- Astro Docs MCP (`https://mcp.docs.astro.build/mcp`) mandatory for Astro decisions.
- Plane MCP `plane-kcb` for issue sync (see Plane binding top of file).

## 15. AI Agent Workflow

```
1. Understand → 2. Inspect repository → 3. Consult MCP docs → 4. Design → 5. Implement → 6. Test → 7. Build → 8. Review → 9. Commit
```

- Never make broad architectural changes to simplify a local task.
- Express tasks as outcomes with requirements, not vague todos.

---

*Last onboarded: 2026-08-27 — via asdlc-onboard. Plane binding verified: kcb/KCBLABS (4f8b6bc1-7a02-4822-943d-fb6ab541414f) via MCP plane-kcb.*
