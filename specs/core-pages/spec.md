# Spec: Core Public Pages — Home, Labs, Projects, Journal, Open Source

## Goal
Turn the structured content model into a navigable public product that lets a visitor understand within 30 seconds that *KCB Labs explores via Labs, tests via Research/Experiments, and ships via Projects/Open Source/Journal* (spec §79): an editorial-quality homepage plus index/detail routes for Labs, Projects, Journal, and Open Source, all prerendered where practical, using Astro components and cards, with relationship traversal visible on every detail page.

## Scope
- In scope:
  - URL architecture (spec §4): `/`, `/labs`, `/labs/[slug]`, `/projects`, `/projects/[slug]`, `/open-source`, `/open-source/[slug]`, `/journal`, `/journal/[slug]` — slugs lowercase, stable, human-readable; prerendered via `export const prerender = true` where content is static (spec §6)
  - Homepage composition (spec §17): Hero (headline "We explore ideas that could become technology, products and companies." + supporting sentence, CTAs Explore Labs / Explore Projects / Support the Labs), Current Labs (curated LabCards), Current Work strip (EXPLORING/BUILDING/SHARING), selected Projects (ProjectCard with Type/Stage/Origin Lab), Research/Experiments highlight, latest Journal (ArticleCard with category/title/excerpt/date/readingTime/related Lab/Project), Numbers (Labs/Experiments/Validated Projects/OS derived from real content, never hard-coded), Ecosystem ("Built with an ecosystem" without generic logo wall), final Participate CTA (spec §17.1–§17.8)
  - Lab index + Lab detail (spec §18): breadcrumb, label/title/description/status, Overview/Why explore/Research/Experiments/Projects-born/People/Collaborators/Technologies/Related Journal/Timeline — feels like a research portal
  - Project index + Project detail (spec §19): header (Project name/description/type stage origin), sections Overview/Problem/Context/What we discovered/Solution/Architecture/Current State/Roadmap/Outcomes/Research/Experiments/Related Journal/People/Organizations/Open Source/Links — visually "Born in KCB Labs" where `originLab` exists
  - Journal index + Article detail (spec §22): Article layout with category/title/excerpt/author/published/updated/readingTime/hero/body (headings/paragraphs/lists/blockquotes/images/captions/code/tables/callouts/links) + Related Lab/Research/Experiment/Project + Previous/Next navigation (body via `RichContent`/`Prose`, `CodeBlock`, `Callout`, `Quote`, `ImageFigure`)
  - Open Source index + detail (spec §9): name/description/repo/license/status/originLab/relatedProject/technologies/docs link; distribution layer, not separate R&D stage
  - Card system `src/components/cards/*`: `LabCard`, `ProjectCard`, `ArticleCard`, `ResearchCard`, `ExperimentCard`, `OpenSourceCard`, `PersonCard`, `OrganizationCard` reused across homepage, indexes, and detail "related" sections
  - Metadata primitives `src/components/ui/*`: `StatusBadge`, `TypeBadge`, `StageBadge`, `DateLabel`, `ReadingTime`, `RelationLabel` (mono/technical typography, status colors)
  - Content rendering `src/components/content/*`: `RichContent`, `CodeBlock`, `Callout`, `Quote`, `ImageFigure`, `Timeline`, `Metric`, `ArchitectureDiagram` (spec §31)
  - SEO per page (title/description/canonical/OG/Twitter/Schema.org) via `BaseLayout` props; images via Astro image pipeline with required `alt`
  - Relationship rendering uses only `src/lib/content` helpers — no direct collection queries in pages
  - Prerender + server coexistence: public pages prerendered, `/keystatic`/`/api/*` remain dynamic
- Out of scope:
  - Institutional pages (About/Vision/People/Ecosystem/Roadmap/Participate clusters) — `specs/institutional-pages`
  - Search index/island, filtering islands, knowledge graph — `specs/interactive-features`
  - Sitemap/robots/RSS, a11y/perf hardening, analytics, security headers — `specs/production-hardening`
  - Content model/schema changes — `specs/content-model`

## Contracts (success criteria)
- All routes listed resolve and `npm run build` prerenders `/`, `/labs`, `/labs/[slug]`, `/projects`, `/projects/[slug]`, `/journal`, `/journal/[slug]`, `/open-source`, `/open-source/[slug]` (verify `dist/` contains prerendered HTML for each; server bundle still contains `keystatic` + `api/health`)
- Homepage renders all §17 sections from real content helpers (no hard-coded counts/cards); Numbers section values equal `getLabs().length` etc. — unit test asserts homepage data loader calls relationship helpers, integration test visits `/` and asserts sections present
- Lab detail for a fixture lab `ai-employees` shows its linked research, experiments, projects, people, organizations, and related journal articles — each as the correct card — and an empty lab renders the section headings without throwing
- Project detail shows `Type`, `Stage`, `Origin Lab` in header; when `originLab` is set shows "Born in KCB Labs" treatment; related Research/Experiments/Journal/People/Orgs/OS lists resolve via helpers, not hard-coded arrays
- Article detail computes and displays reading time, formats `publishedAt`/`updatedAt`, renders markdown body with code block + callout + image figure, and Previous/Next links point to chronologically adjacent published articles (or hide at boundaries)
- Filtering placeholder: indexes are server-rendered lists (client JS not required to view) — passes with JS disabled (progressive enhancement baseline for upcoming filters)
- Accessibility baseline: each detail page has exactly one `h1`, correct `h2`/`h3` hierarchy, landmarks (`main`, `nav`, `header`, `footer`), and all images have `alt` or empty `alt` for decorative (caught by `astro check` / lint if configured)
- No page recreates content queries — `grep -R "getCollection|getEntry" src/pages` returns zero; all data comes from `src/lib/content` (enforced by review gate)
- Cards are shared: `LabCard` used on homepage, Lab index, and Project detail's origin block (proof via import graph), and `StatusBadge`/`TypeBadge`/`StageBadge` render status colors consistently

## Anti-patterns
- Do not turn Lab/Project/Article detail into React — build in Astro unless an interaction requirement is documented (spec §41)
- Do not hard-code homepage numbers or card lists — they must be derived from content queries
- Do not query content directly in pages — use `src/lib/content/*` helpers; broken relationship handling belongs in that layer
- Do not invent slug routes outside §4 contract (e.g., `/research/[slug]` without spec/future evolution note and ADR) — research/experiments remain discoverable via parent Lab/Project in this phase
- Do not scatter layout or typographic literals — reuse `Container`, `Section`, `Prose`, tokens, and typography hierarchy (Display/H1/H2/H3/Body/Small/Metadata/Code)
- Do not duplicate card markup — reuse `src/components/cards/*` and `src/components/ui/*`

## Decisions
- `ADR-006` (planned) — Prerender public content pages with `output: server` coexistence (spec §26) — keeps content pages static while Keystatic needs server
- `ADR-007` (planned) — Astro as primary renderer, React reserved for islands (spec §25/§41); this spec uses zero React except where a future island will later enhance filters/search
- `ADR-008` (planned) — Editorial + Research Lab + Technology Company design direction (spec §32): strong typography, restrained palette, editorial whitespace, subtle borders, structured grids; avoids Agency/SaaS template
- Reuse decisions traceable to `ARCHITECTURE.md` Context Map `src/pages/` / `src/layouts/` / `src/components/cards|content|ui`

## Tooling
- Astro MCP for prerender + layout APIs
- Vitest (candidate `antfu/skills@vitest` 33.5K installs) for data-loader and readingTime/slug helpers; Playwright candidate `microsoft/playwright-cli` 133.5K installs for E2E smoke of homepage/lab/project/journal navigation (install on approval)
- No new CMS tooling — consumes `specs/content-model` exclusively
