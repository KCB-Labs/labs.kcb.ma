# Spec: Content Model — Keystatic Collections, Publishing Lifecycle & Relationship System

## Goal
Implement the structured, relationship-first content system that makes `labs.kcb.ma` a traversable knowledge platform rather than a set of isolated pages: nine Keystatic collections plus singletons, with normalized identity/publishing/metadata/SEO fields, stable slug rules, draft/published/archived lifecycle, and a validated relationship graph (Lab ↔ Research ↔ Experiment ↔ Project ↔ Article ↔ People ↔ Organizations) exposed only through a centralized `src/lib/content` data access layer.

## Scope
- In scope:
  - Keystatic collections `labs`, `research`, `experiments`, `projects`, `articles`, `people`, `organizations`, `opensource`, `roadmap` under `src/content/` with git-tracked files (spec §14, §30)
  - Singletons `site`, `pages/about`, `pages/vision`, `pages/sponsorship`, `settings` (spec §14)
  - Field contracts per collection: identity (`title`, `slug`, `description`, `status`), publishing (`published`, `publishedAt`, `updatedAt`), relationships, metadata (`featured`, `priority`, `tags`), SEO (`seoTitle`, `seoDescription`, `socialImage`) (spec §49)
  - Collection-specific fields: Lab (status Active/Exploring/Paused/Archived), Research (question/hypothesis/methodology/findings/conclusion), Experiment (objective/environment/method/results/outcome VALIDATED/INCONCLUSIVE/FAILED/PARTIAL), Project (type Internal/Client/Startup/Collaboration/Open Source/Research, stage Idea→…→Live→Completed/Spun Out/Archived, `originLab?`), Article (category Article/Lab Note/Field Note/Perspective/Announcement, body as Markdoc/Markdown with callouts/code/images), People (role/bio/avatar/socials/relatedLabs/relatedProjects), Organizations (type Partner/Client/Sponsor/Startup/University/etc., logo/website/relatedLabs/relatedProjects), OpenSource (name/repo/license/status/originLab/relatedProject/technologies), Roadmap (period/theme/objective/status) (spec §5–§13)
  - Relationship-first graph: Lab→research/experiments/projects/articles/people/organizations/technologies; Research→lab/experiments/projects/articles; Experiment→lab/research/project?/articles; Project→originLab?/research/experiments/articles/people/organizations/openSource; Article→labs/research/experiments/projects/people/organizations (spec §15)
  - Centralized data access layer `src/lib/content/{labs,projects,research,experiments,articles,people,organizations,opensource,roadmap,relationships}.ts` exposing `getLabs()`, `getActiveLabs()`, `getLabBySlug()`, `getProjects()`, `getProjectsByLab()`, `getResearchByLab()`, `getExperimentsByResearch()`, `getRelated*()` — pages never query content directly (spec §48)
  - Publishing lifecycle enforcement: only `published === true` appears in public queries/indexes; `draft`/`archived` hidden by default; validation utility to filter at query layer (spec §50)
  - Relationship validation at build: missing refs (e.g., Project→nonexistent Lab) must fail build or emit explicit validation warnings, never silently render empty (spec §51)
  - Slug generation from title (lowercase, stable, human-readable, English, no IDs) with explicit editable override and stability guarantee (spec §38)
  - Seed/fixtures for local dev: minimal published + draft sample per collection for testing relationships
  - `CONTENT-MODEL.md` reference doc generated from schema
- Out of scope:
  - Visual pages/layouts rendering the content — belongs to `specs/core-pages` / `specs/institutional-pages`
  - Search index, filtering islands — belongs to `specs/interactive-features`
  - SEO sitemap/RSS generation wiring (uses this model but lives in `specs/production-hardening`)
  - Content authoring UX beyond Keystatic default fields
  - Migrations of legacy content (none exists)

## Contracts (success criteria)
- `keystatic.config.ts` defines exactly 9 collections + declared singletons and `npm run check` + `npm run build` pass with empty-but-valid collections (no schema error)
- `getLabs()`, `getLabBySlug('x')`, `getProjectsByLab(labId)`, `getResearchByLab()`, `getExperimentsByResearch()`, `getArticlesByLab()` etc. each have a unit test proving: (a) only `published` items returned by default, (b) draft/archived excluded, (c) relationship traversal resolves correct linked slugs
- Build validation: a fixture with `projects/test.md` referencing `originLab: nonexistent-lab` causes `npm run build` to fail with a message naming the broken relation (or at minimum a `relationships.validate()` test fails); empty silent render is rejected
- Slug test: creating an entry titled `AI Employees` yields slug `ai-employees` (lowercase, no IDs); editing title does not mutate existing published slug unless explicitly overridden; stability test passes
- No page file imports `astro:content` or Keystatic directly — grep for `from 'astro:content'` or `keystatic` outside `src/lib/content/` must be clean; reviewer can run `grep -R "getCollection\|keystatic" src/pages` and expect zero hits
- `src/content/` files are Markdoc/Markdown with required `alt` text on image fields (image field without alt fails validation test where applicable)
- Each collection field set includes at least identity (4) + publishing (3) + SEO (3) groups as defined in §49 — schema snapshot test locks the field list

## Anti-patterns
- Do not hard-code content arrays in components — all content must come from Keystatic collections via `src/lib/content`
- Do not scatter content queries in pages — all querying goes through `src/lib/content/*` helpers (spec §6 Architecture Rule)
- Do not invent relationship IDs — validate against existing slugs via helpers; broken refs must fail build, not silently empty
- Do not change a published slug without redirect strategy — slugs are stable (spec §38)
- Do not expose `draft`/`archived` in public indexes or homepage numbers — publishing filter is mandatory
- Do not add new top-level collections without ADR — model change requires `docs/adrs/` entry

## Decisions
- `docs/adrs/ADR-003.md` — relationship-first content model Lab→Research→Experiment→Project→Open Source accepted (spec §15); alternatives (hierarchical CMS, taxonomy-only) rejected because lifecycle traversal is product core
- `ADR-002` (storage) — `storage: local` dev, `kind: github` prod; content files git-tracked alongside code
- `ADR-005` (planned) — Markdoc/Markdown as content format; supports code/diagrams/tables/callouts required by §2.5 Technical credibility
- Schema field grouping follows spec §49 principles (identity/publishing/relationships/metadata/SEO) to keep content quality consistent across collections

## Tooling
- `@keystatic/astro` + `@keystatic/core` — content schema contract (verified via Astro MCP after install)
- `Astro docs MCP` — ensures `keystatic()` integration usage matches installed Astro version
- Test tooling: `vitest` (candidate `antfu/skills@vitest` 33.5K installs) for relationship/publishing/slug unit tests; not auto-installed — awaiting approval per capability discovery
