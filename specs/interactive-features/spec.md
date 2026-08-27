# Spec: Interactive Features — Search, Filtering, Related Discovery, Timeline

## Goal
Make the knowledge system explorable without turning the site into a React application: a build-time content index powering a client-side Search island, progressively enhanced filter islands on Explore pages, relationship-driven related content, and an interactive timeline — all as minimal, measurable React islands with the least aggressive hydration that satisfies the feature, while the site remains usable with JavaScript disabled.

## Scope
- In scope:
  - Search (spec §23): generated content index at build time (JSON emitted to `dist/` / `public/`) covering `Labs`, `Projects`, `Articles`, `Research`, `Experiments`, `People`, `Open Source` (each entry: `type`, `title`, `slug`, `description`, `href`, plus optional `tags`/`lab`); React island `Search` (`client:visible` ideally) with input, type badge in results (LAB/PROJECT/ARTICLE…), keyboard nav, accessible combobox, debounced query, URL param sync optional
  - Filtering (spec §24): Explore Labs filter by status `Active/Exploring/Paused/Archived`; Projects filter by type `All/Internal/Client/Startup/Collaboration/Open Source/Research` and stage `Idea/Validating/Validated/Implementation/Live/Completed/Spun Out`; URL query param ↔ state sync so filtered views are shareable; server-rendered list is baseline — island progressively enhances (no JS → full unfiltered list still rendered, filters not required to see content)
  - Related content discovery: on Lab/Project/Experiment/Research/Article detail, render related entities via `relationships.ts` helpers (e.g., `getRelatedProjects(labSlug)`, `getRelatedArticles(labSlug)`) using the relationship graph; cards reused, not duplicated markup
  - Timeline (spec §17.4/§18/§19): interactive timeline island for Lab/Project detail (chronological research→experiment→project events) + Roadmap timeline on `/about/roadmap`; supports keyboard + `prefers-reduced-motion` (no excessive parallax/continuous motion — spec §35)
  - Future hook: Knowledge graph placeholder (data shape exposed via relationships layer, visualization deferred unless trivial with decided library — spec §74 marks this as future layer, not primary navigation)
  - Component placement: `src/components/react/Search.tsx`, `Filters.tsx`, `Timeline.tsx` (islands), shared index builder `src/lib/search/buildIndex.ts` + `src/pages/api/search.json.ts` or static `public/search-index.json` generation at build
  - Analytics abstraction respected: search/filter interactions emit through abstracted provider hook, not hard-coded Plausible/Umami calls
  - Accessibility & perf: Search/Filter islands are `client:visible` (or `client:idle` if needed), no large UI libs without justification, bundles measured (`npm run build` reports sizes), keyboard nav + focus visible, fallback content without JS
- Out of scope:
  - Server-side search engine (Algolia/Meilisearch) — lightweight client index only for initial implementation (spec §23 explicitly allows this)
  - Full knowledge graph rendering — deferred to future extension, only data contract prepared here
  - Content model changes — search index consumes `specs/content-model` helpers
  - Page scaffolding itself — pages exist via `specs/core-pages` / `specs/institutional-pages`; this spec enhances them
  - SEO/RSS/sitemap/analytics provider wiring beyond the abstraction hook — `specs/production-hardening`

## Contracts (success criteria)
- `npm run build` emits a search index artifact (e.g., `dist/search-index.json` or `dist/_astro/search-index.*.json`) containing at least Labs + Projects + Articles + Research + Experiments + People + OpenSource entries derived from `published` content only; count matches `getLabs().length + getProjects().length + …` (unit test for index builder)
- `<Search client:visible />` island: typing a query that matches a lab title (e.g., `ai`) returns that LAB result with correct `href` `/labs/[slug]` and `type` badge; pressing Enter navigates; keyboard ArrowUp/Down moves focus; Escape closes; screen-reader announces result count via `aria-live` — verified by unit test + Playwright E2E smoke if Playwright is adopted
- Filters: visiting `/projects` shows all projects server-rendered; interacting with type filter `Internal` narrows visible ProjectCards to only `type === 'Internal'` and updates URL to `?type=Internal`; refreshing the URL restores the filtered state; with JS disabled the full list is still visible (E2E with JS disabled check or unit test of filter helper + manual verification note)
- Lab filter `Active/Exploring/Paused/Archived` and Project stage filter behave identically — param sync + progressive enhancement — unit test asserts filter predicates match spec §24 values exactly
- Related sections on Lab/Project detail render only related, published entities via `relationships.ts` (no invented IDs); a lab with 0 related research renders an empty state without crash — unit test for relationship helpers covers this
- Timeline island renders events sorted chronologically, respects `prefers-reduced-motion` (no auto-play/continuous motion), and is keyboard navigable — axe/ARIA check in component test or E2E
- No page becomes a React app — islands are the only React on Lab/Project/Journal pages; `grep -R "client:" src/pages` shows only `Search`, `Filters`, `Timeline` islands; Header/Footer/Article remain Astro
- Bundle budget: interactive islands add a measured, small JS payload — `npm run build` output reviewed in PR; no large UI library added without ADR justification

## Anti-patterns
- Do not fetch content directly in islands — islands receive prebuilt index / filtered arrays or call the same `src/lib/content` helpers serialized at build; no client-side CMS queries
- Do not make search/filter require JS to view content — server-rendered list is the baseline; islands only enhance (WCAG 2.2 AA + §39: "Islands must not make core content inaccessible when JS fails")
- Do not introduce a heavy UI framework or search engine without justification and ADR — spec §40/§23 prefers lightweight client index
- Do not use `client:load` when `client:visible` suffices — hydration policy is `visible > idle > load` (spec §41)
- Do not hard-code filter options — derive Labs statuses / Project types/stages from content model enums, not literals in component
- Do not ship continuous motion, large animated backgrounds, or slow page transitions — §35 forbids; respect `prefers-reduced-motion`

## Decisions
- `ADR-011` (planned) — Client-side generated index vs server search (spec §23): lightweight JSON index for MVP, swappable later to provider without content model change; index artifact is build output, not runtime DB
- `ADR-012` (planned) — Progressive enhancement for filters (spec §24): server-rendered list + React filter island syncing URL params; avoids turning Explore into a React application
- `ADR-013` (planned) — Timeline as React island only (spec §31/§35): knowledge graph treated as future visualization layer (spec §74), only data shape stabilized now
- Hydration decisions documented per island in PR description with justification per React Policy gate (§41)

## Tooling
- React island patterns verified via Astro MCP
- Vitest candidate (`antfu/skills@vitest` 33.5K) for index builder + filter predicate + relationship helper tests
- Playwright candidates (`microsoft/playwright-cli` 133.5K, `currents-dev/playwright-best-practices-skill` 76.3K) for Search/Filter/Timeline E2E — install on approval
- Bundle measurement via `astro build` output; no additional tooling without ADR
