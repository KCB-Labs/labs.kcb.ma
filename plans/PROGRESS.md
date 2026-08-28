# PROGRESS.md — KCB Labs Website (labs.kcb.ma)

> Ralph Loop execution log. One line per PBI transition with gate results and review outcome.

---

## 2026-08-27 — Onboarding (asdlc-onboard)

- **Plane binding:** `kcb / KCBLABS` (`4f8b6bc1-7a02-4822-943d-fb6ab541414f`) — verified via MCP `plane-kcb` `project.list`.
- **MCP server:** `plane-kcb` — ok.
- **Repo audit:** empty repo (no commits, no code). Single source file: `KCB Labs — Website Product & Technical Specification.md` (79 sections). No `.codegraph/` index — fallback to Read/Grep/Glob. Suggestion: run `codegraph init` at root once code lands (optional).
- **Git:** worktree confirmed (`git rev-parse --is-inside-work-tree` true), branch `master`, no commits yet. Micro-commit discipline starts now; legacy history untouched (none to rewrite).
- **Verification baseline:** `package.json` (node >=20, scripts: check/test/build/lint/test:e2e) + `tsconfig.json` + `tests/smoke.test.mjs` (`node --test`). Gates declared in `AGENTS.md` §4.
- **Plane backlog seed:** `workitem list` for KCBLABS → 0 Todo / 0 In Progress / 0 In Review. `plans/README.md` Plane Sync section records `0 Todo issues found`.
- **Artifacts created:** `AGENTS.md` (with Plane binding + §5 Context Map), `ARCHITECTURE.md` (as-built snapshot, not gospel), `plans/README.md`, `plans/PROGRESS.md` (this file), `docs/adrs/README.md`, `package.json`, `tsconfig.json`, `tests/smoke.test.mjs`, `.gitignore`.
- **Next:** human confirmation of this report, then `asdlc-plan` for Phase 1 Foundation (spec `specs/foundation/spec.md` human-reviewed before any code).

---

## 2026-08-27 — asdlc-plan

- **Decomposed:** upstream spec (79 sections) → 6 Specs (`specs/foundation`, `specs/content-model`, `specs/core-pages`, `specs/institutional-pages`, `specs/interactive-features`, `specs/production-hardening`) + 23 PBIs `tasks/PBI-001..023` with dependency graph. Candidate tooling discovered: `astrolicious/agent-skills@astro` 13.7K, `antfu/skills@vitest` 33.5K, `microsoft/playwright-cli` 133.5K via `skills find`. All approved and installed.
- **Plane push-create:** `asdlc-plane` → 23 Todo issues `KCBLABS-1..23` in `kcb/KCBLABS`; each PBI Context now `Plane: kcb/KCBLABS-N`; `plans/README.md` Plane Sync + Execution Order updated.
- **Adopted skills:** `astro`, `vitest`, `playwright-cli` (global copies) + npm devDeps `vitest@4.1.11`, `@playwright/test@1.62.1`.
- **In Review state added:** user added `In Review` state `538259fa-ac8b-4bfb-b3dc-b350f1a42cc8` to KCBLABS; gate plan notes updated for review-type sort.

---

## 2026-08-27 — PBI-001 Done (asdlc-execute)

- **Selected:** `PBI-001` (first Proposed with no dependencies). Plane `kcb/KCBLABS-1` → `In Progress` (e93969fd...). `plans/README.md` set to Active.
- **Pre-flight:** Codegraph fallback (no index) → Read/Grep. Targets: astro.config, keystatic.config, package.json, tsconfig, src/pages/index.astro. MCP Astro docs added to `~/.config/opencode/opencode.jsonc`.
- **Implementation:** Installed `astro@7.2.9`, `@astrojs/react@6.0.4`, `@astrojs/markdoc@2.0.8`, `@astrojs/node@11.1.4`, `react@19.2.8`, `react-dom@19.2.8`, `@keystatic/astro@6.0.0`, `@keystatic/core@0.6.9` (408 packages), verified via keystatic docs + Astro MCP. Created `astro.config.ts:1` (output server + node standalone + integrations react/markdoc/keystatic + site https://labs.kcb.ma), `keystatic.config.ts:1` skeleton local, `src/pages/index.astro:1` prerender true, updated `package.json:10` scripts to astro check/build, `tsconfig.json:2` extends astro/tsconfigs/strict with react-jsx.
- **Gates iteration 1:** `astro check` required `@astrojs/check` — installed via `--legacy-peer-deps` (TS 7 incompatibility) → check failed due to TS 7 API missing → downgraded `typescript` 7.0.2 → 6.x → check 0 errors, build ok (server+prerender), test 6 pass, lint baseline. Fixed in same iteration.
- **Gates iteration 2 (hygiene):** Adversarial review PASS with 3 fixes: rename `astro.config.mjs`→`.ts`, remove `src/lib/placeholder.ts`, tsconfig include fix → re-ran check 0 errors (3 files), build ok (2.15s), test 6 pass. Micro-committed `7ca18e0`.
- **Review:** Adversarial Task PASS (spec contracts ok, anti-patterns ok, architecture ok). Review-type sort: **agentic — Done** (deterministic gates + adversarial review, no human judgment). Resolution comment posted to Plane with PBI/Branch/Commits/Review evidence.
- **Close-out:** Plane `kcb/KCBLABS-1` → Done (d8ce3689...), `plans/README.md` → Done, commits `f863b5f, 7ca18e0` on `master` (merged, no PR needed as default branch). Next actionable: `PBI-002` and `PBI-004` (both depend only on PBI-001 Done).

---

## 2026-08-27 — PBI-002 Done (asdlc-execute)

- **Selected:** `PBI-002` (Design Tokens & Global Styles) — first Proposed with dependencies Done (PBI-001 Done). Plane `kcb/KCBLABS-2` → `In Progress` (301d...), `plans/README.md` → Active.
- **Pre-flight:** Targets: src/styles/tokens.css, globals.css, src/pages/index.astro proof. No literals outside tokens.
- **Implementation:** Created `src/styles/tokens.css:1` (156 lines, :root vars for colors/bg/surface/text/muted/accent/border, typography Display/H1/H2/H3/Body/Small/Metadata/Code, spacing 1-10, radius sm/md/lg/full, shadows sm/md/lg, motion ease/durations, containers, breakpoints, z-index + [data-theme=dark] + @media prefers-color-scheme fallback) and `src/styles/globals.css:1` (@import tokens, reset, typography hierarchy, focus-visible token-driven, prefers-reduced-motion, containers). Wired into `src/pages/index.astro:2` via `import "../styles/globals.css"`.
- **Gates:** check 0 errors (3 files), build ok (1.42s, server+prerender), test 6 pass. Token grep confirms required vars present and 0 hex literals outside src/styles; dark/light both via [data-theme] + media query (shadow fallback fixed).
- **Review:** Adversarial Task PASS with advisory (dark shadow duplication) fixed in `9bdd336`. Review-type sort: **agentic — Done** (deterministic, no UX judgment beyond restrained palette). Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-2` → Done, `plans/README.md` → Done, commits `85e75a3, 9bdd336` on `master`. Next actionable: `PBI-003` (needs PBI-002 Done) and `PBI-004` (needs PBI-001 Done, still Proposed) — both ready; execution order picks PBI-003 next.

---

## 2026-08-27 — PBI-003 Done (asdlc-execute)

- **Selected:** `PBI-003` (Core Layouts & Navigation) — dependencies PBI-001 Done + PBI-002 Done satisfied. Plane `kcb/KCBLABS-3` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: src/layouts/BaseLayout.astro, Lab/Project/Article shells, src/components/astro/* (SiteHeader, SiteFooter, Container, Section, Breadcrumbs, PageHeader, Prose). All Astro, no React islands, tokens only.
- **Implementation:** Created `src/layouts/BaseLayout.astro:1` (head SEO: title/description/canonical via Astro.site, OG/Twitter, schema slot with is:inline JSON-LD, <main> landmark, globals import), `LabLayout.astro:1`/`ProjectLayout.astro:1`/`ArticleLayout.astro:1` (forward canonical/ogImage/noindex/schema + crumbs), `SiteHeader.astro:1` (compact IA Explore/Journal/About/Participate/Search with correct hrefs, dropdowns, mobile <details> fallback), `SiteFooter.astro:1`, `Container.astro:1`, `Section.astro:1`, `Breadcrumbs.astro:1`, `PageHeader.astro:1`, `Prose.astro:1` (editorial), updated `src/pages/index.astro:1` to use BaseLayout+Header/Footer+Container/Section.
- **Gates:** check 0 errors, 0 hints (14 files, after is:inline fix), build ok (1.65s server+prerender), test 6 pass, view-source shows header/footer server-rendered without client:*, header IA correct per spec §3.
- **Review:** Adversarial PASS with 5 fixes addressed: (1) schema slot via is:inline JSON-LD, (2) layouts now forward canonical/ogImage/noindex/schema, (3) <main id="main-content"> added, (4) mobile nav via <details> (visible <768px), (5) literals 3.5rem/12rem/768px justified as layout-specific with comments. All token-driven.
- **Close-out:** Plane `kcb/KCBLABS-3` → Done, `plans/README.md` → Done, commits `b45e61f, 304295b` on `master`. Next actionable: `PBI-004` (Docker+health, depends PBI-001) — now ready.

---

## 2026-08-27 — PBI-004 Done (asdlc-execute)

- **Selected:** `PBI-004` (Docker + Health Endpoint + MCP Config) — dependency PBI-001 Done satisfied. Plane `kcb/KCBLABS-4` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: src/pages/api/health.ts, Dockerfile, .dockerignore, .opencode/opencode.jsonc, DEPLOYMENT.md, src/lib/env.ts.
- **Implementation:** Created `src/pages/api/health.ts:1` (prerender false, GET → 200 {"status":"ok"} JSON, no deps), `Dockerfile:1` (multi-stage node:20-alpine builder npm ci + build → runtime dist+node_modules, EXPOSE 4321, CMD node ./dist/server/entry.mjs), `.opencode/opencode.jsonc:1` (Astro docs + plane-kcb), `DEPLOYMENT.md:1` (Coolify table, env vars, health, workflow), `src/lib/env.ts:1` (import.meta.env only). Verified via `node dist/server/entry.mjs` + `curl localhost:4321/api/health` → {"status":"ok"}.
- **Gates:** check 0 errors (16 files), build ok (1.76s server+prerender, dist/server/entry.mjs 225k), test 6 pass, health reachable, no secrets in client bundle, no static adapter.
- **Review:** Adversarial PASS with nit (env.ts comment) fixed in `8f3d012`. Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-4` → Done, `plans/README.md` → Done, commits `8155d4a, 8f3d012` on `master`. Next actionable: `PBI-005` (collections, needs PBI-001+004 Done) — now ready. Foundation phase (PBI-001..004) complete.

---

## 2026-08-27 — PBI-005 Done (asdlc-execute)

- **Selected:** `PBI-005` (Keystatic Collections — Labs, Research, Experiments, Projects) — dependencies PBI-001 Done + PBI-004 Done satisfied. Plane `kcb/KCBLABS-5` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: keystatic.config.ts (4 collections), src/content/{labs,research,experiments,projects} with fixtures, CONTENT-MODEL.md partial.
- **Implementation:** Replaced `keystatic.config.ts:1` skeleton with 4 typed collections (labs: status Active/Exploring/Paused/Archived + research/experiments/projects/technologies relationships; research: lab+experiments+projects+question/hypothesis; experiments: lab+research+project+outcome VALIDATED/INCONCLUSIVE/FAILED/PARTIAL+objective; projects: originLab+research+experiments+type Internal/Client/Startup/Collaboration/Open Source/Research+stage Idea→Archived) all with identity 4 + publishing 3 + metadata 3 + SEO 4 groups per §49, storage local. Added 8 fixtures (ai-employees/draft-lab, local-ai-research/draft-research, local-llm-benchmark/draft-experiment, operant/draft-project) with closed graph, created `CONTENT-MODEL.md:1` documenting 4 collections + graph.
- **Gates:** check 0 errors (16 files), build ok (1.64s server+prerender), test 6 pass — all fixtures valid, no page imports astro:content.
- **Review:** Adversarial PASS with advisories (slug short-form allowed per §38, alt-required deferred to PBI-008). Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-5` → Done, `plans/README.md` → Done, commit `57e421b` on `master`. Next actionable: `PBI-006` (needs PBI-005 Done) — now ready.

---

## 2026-08-27 — PBI-006 Done (asdlc-execute)

- **Selected:** `PBI-006` (Collections Articles, People, Organizations, Open Source, Roadmap + Singletons) — dependency PBI-005 Done satisfied. Plane `kcb/KCBLABS-6` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: keystatic.config.ts (add 5 collections + 5 singletons), src/content/{articles,people,organizations,opensource,roadmap} fixtures, singletons src/content/site.yaml etc., CONTENT-MODEL.md full.
- **Implementation:** Extended `keystatic.config.ts:1` from 4 to 9 collections + 5 singletons (articles: category Article/Lab Note/Field Note/Perspective/Announcement + relationships to labs/research/experiments/projects/people/organizations; people: role/bio/avatar/socials/relatedLabs/Projects; organizations: type Partner/Client/Sponsor/Startup/University/Research Organization/Technology Partner/Community/Open Source Community + logo/relationship; opensource: repository/license/status/originLab/relatedProject/technologies; roadmap: period/theme/objective/areas) + singletons site/about/vision/sponsorship/settings. Added 10 fixtures (building-ai-employees/draft-article, john-doe/draft-person, partner-org/draft-org, httpa-agent-protocol/draft-opensource, 2026-ai-autonomous/draft-roadmap + 5 singleton yamls) with valid closed graph, updated `CONTENT-MODEL.md:1` to full 9+5 documentation.
- **Gates:** check 0 errors, build ok (1.83s server+prerender), test 6 pass, no page imports astro:content.
- **Review:** Adversarial PASS with advisory (labs/projects still missing articles/people relationships — deferred, not blocking). Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-6` → Done, `plans/README.md` → Done, commit `2786c81` on `master`. Next actionable: `PBI-007` (needs PBI-005+006 Done) — now ready.

---

## 2026-08-28 — PBI-007 Done (asdlc-execute)

- **Selected:** `PBI-007` (Data Access Layer src/lib/content) — dependencies PBI-005 Done + PBI-006 Done satisfied. Plane `kcb/KCBLABS-7` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: src/lib/content/{labs,research,experiments,projects,articles,people,organizations,opensource,roadmap,relationships}.ts + index.ts, barrel, readingTime, publishing filter.
- **Implementation:** Created `src/lib/content/utils.ts:1` (parseMdoc, readCollection, filterPublished, sortByPriority, calculateReadingTime 200wpm) + 9 collection helpers (labs: getLabs/getLabBySlug/getActiveLabs; research: getResearch/getResearchBySlug/getResearchByLab; experiments: getExperiments/getExperimentBySlug/getExperimentsByLab/getExperimentsByResearch; projects: getProjects/getProjectBySlug/getProjectsByLab; articles: getArticles/getArticleBySlug/getArticlesByLab/getArticlesByProject/getPreviousNextArticle/getReadingTime pure; people: getPeople/getPersonBySlug/getPeopleByLab/Project; organizations: getOrganizations etc.; opensource: getOpenSource etc.; roadmap: getRoadmaps) + `relationships.ts:1` (getRelated* + getKnowledgeGraphData) + `index.ts` barrel. Added `labs.test.ts:1` (17 vitest tests) + `@types/node` for fs/path, updated `package.json:13` test to `vitest run src/lib/content && node --test`.
- **Gates:** check 0 errors (29 files, after @types/node + implicit any fixes), build ok (1.77s server+prerender, 29 files), test 17 pass (vitest) + 6 pass (smoke) = 23 via `npm test`, lint baseline. Verified only published by default, includeDrafts, traversal, empty [] handling, readingTime.
- **Review:** Initial adversarial CONDITIONAL PASS — missing proofs for getProjects/getResearch etc. draft exclusion, getReadingTime signature, package.json test script. Fixed in `e8bfaee`: added 8 tests (now 17), fixed package.json, fixed getReadingTime pure, re-ran vitest 17 pass. Re-review PASS. Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-7` → Done, `plans/README.md` → Done, commits `a6b4e70, e8bfaee` on `master`. Next actionable: `PBI-008` (needs PBI-007 Done) — now ready.

---

## 2026-08-28 — PBI-008 Done (asdlc-execute)

- **Selected:** `PBI-008` (Validation + Publishing Filters + Slug Stability + Seed Fixtures) — dependency PBI-007 Done satisfied. Plane `kcb/KCBLABS-8` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: src/lib/content/validate.ts, slugs.ts, seed graph fixtures, tests for validation/slug/publishing, build-time validation wiring.
- **Implementation:** Created `src/lib/content/validate.ts:1` (walks 9 collections via get*({includeDrafts:true}), throws `Project "X" references nonexistent Lab "Y"` on missing target) + `slugs.ts:1` (slugify, assertSlugStable, generateSlug) + updated `labs/ai-employees.mdoc:8` and `research/local-ai-research.mdoc:8` to close graph (labs now references research/experiments/projects). Added `validate.test.ts:1` (3 tests: passes with valid fixtures, fails on broken relationship via temp invalid-test.mdoc, seed graph traversal + derived numbers) + `slugs.test.ts:1` (4 tests: slugify, stability, generateSlug, lowercase no IDs) — total 24 vitest tests. Wired `validate()` into `astro.config.ts:1` via `validateIntegration` hook `astro:build:start` so `npm run build` fails on broken refs (verified: invalid-test-build.mdoc → build ERROR `[validate-relationships] Project "invalid-test-build" references nonexistent Lab "nonexistent-lab-xyz"`).
- **Gates:** check 0 errors (33 files, after vitest + implicit any fixes), build ok (1.56s server+prerender) and correctly fails with invalid fixture, test 24 passed + 6 smoke = 30 via `npm test`, lint baseline.
- **Review:** Initial adversarial FAIL — validate not wired to build (build succeeded with broken fixture). Fixed by adding `validateIntegration` in `astro.config.ts:11`. Re-verified: invalid file → build fails with descriptive error, valid → build passes. Second adversarial PASS. Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-8` → Done, `plans/README.md` → Done, commits `3114686, 12fbc89` on `master`. Next actionable: `PBI-009` (needs PBI-003,008) — now ready. Content Model phase (PBI-005→008) complete.

---

## 2026-08-28 — PBI-009 Done (asdlc-execute)

- **Selected:** `PBI-009` (Homepage — Hero + Current Work + Featured Sections + Numbers) — dependencies PBI-003 Done + PBI-008 Done satisfied. Plane `kcb/KCBLABS-9` → `In Progress`, `plans/README.md` → Active.
- **Pre-flight:** Targets: src/pages/index.astro, src/components/sections/*, src/components/cards/*, src/components/ui/*, numbers derived via helpers.
- **Implementation:** Implemented `src/pages/index.astro:1` with 8 sections (hero headline "We explore ideas that could become technology, products and companies." + supporting sentence + CTAs /labs, /projects, /participate/sponsorship; Current Labs LabCards from getLabs; Current Work EXPLORING/BUILDING/SHARING; Projects ProjectCards; Research & Experiments highlight; Journal ArticleCards; Numbers 01/01/00/01 derived via getLabs/getExperiments/getProjects filtered Validated/getOpenSource; Ecosystem Built with an ecosystem; final CTA Research is stronger...). Created `src/components/cards/LabCard.astro:1`, `ProjectCard.astro:1`, `ArticleCard.astro:1` + `ui/StatusBadge,TypeBadge,StageBadge` token-driven + `sections/Hero.astro:1`. Numbers via helpers, no hard-coded.
- **Gates:** check 0 errors (40 files), build ok (1.79s server+prerender dist/client/index.html), test 24+6 pass, view-source confirms hero + 8 sections, numbers 01/01/00/01, no client:* islands, cards reuse.
- **Review:** Adversarial PASS with 3 low observations — L1 validated count strict (only Validated, not Implementation) with comment, L2 fallback literals fixed to "No research yet" etc., L3 ResearchCard stubs deferred to PBI-010/011. Fix commit `691bd09`. Review-type sort: **agentic — Done**. Comment posted to Plane.
- **Close-out:** Plane `kcb/KCBLABS-9` → Done, `plans/README.md` → Done, commits `41e0b48, 691bd09` on `master`. Next actionable: `PBI-010` (needs PBI-008,009) — now ready.

## PBI Log

| Date | PBI | Plane | Transition | Gates | Review | Commits | Notes |
|---|---|---|---|---|---|---|---|
| 2026-08-27 | PBI-001 | kcb/KCBLABS-1 | Proposed→Active | — | — | — | Scaffold started |
| 2026-08-27 | PBI-001 | kcb/KCBLABS-1 | Active→Done | check 0 err, build ok, test 6 pass | agentic | f863b5f, 7ca18e0 | Astro server scaffold + Keystatic + React + Node standalone |
| 2026-08-27 | PBI-002 | kcb/KCBLABS-2 | Proposed→Active | — | — | — | Tokens started |
| 2026-08-27 | PBI-002 | kcb/KCBLABS-2 | Active→Done | check 0 err, build ok, test 6 pass | agentic | 85e75a3, 9bdd336 | Tokens + globals + light/dark + motion |
| 2026-08-27 | PBI-003 | kcb/KCBLABS-3 | Proposed→Active | — | — | — | Layouts started |
| 2026-08-27 | PBI-003 | kcb/KCBLABS-3 | Active→Done | check 0 err/hint, build ok, test 6 pass | agentic | b45e61f, 304295b | BaseLayout + Header/Footer + layouts + mobile nav |
| 2026-08-27 | PBI-004 | kcb/KCBLABS-4 | Proposed→Active | — | — | — | Docker + health started |
| 2026-08-27 | PBI-004 | kcb/KCBLABS-4 | Active→Done | check 0 err, build ok, health ok | agentic | 8155d4a, 8f3d012 | Docker + health + MCP + DEPLOYMENT |
| 2026-08-27 | PBI-005 | kcb/KCBLABS-5 | Proposed→Active | — | — | — | Collections 1; started |
| 2026-08-27 | PBI-005 | kcb/KCBLABS-5 | Active→Done | check 0 err, build ok, test 6 pass | agentic | 57e421b | 4 collections + 8 fixtures + CONTENT-MODEL |
| 2026-08-27 | PBI-006 | kcb/KCBLABS-6 | Proposed→Active | — | — | — | Collections 2 + singletons; started |
| 2026-08-27 | PBI-006 | kcb/KCBLABS-6 | Active→Done | check 0 err, build ok, test 6 pass | agentic | 2786c81 | 9 collections + 5 singletons + 10 fixtures + CONTENT-MODEL full |
| 2026-08-27 | PBI-007 | kcb/KCBLABS-7 | Proposed→Active | — | — | — | DAL; started |
| 2026-08-28 | PBI-007 | kcb/KCBLABS-7 | Active→Done | check 0 err, build ok, test 17+6 pass | agentic | a6b4e70, e8bfaee | DAL + relationships + readingTime |
| 2026-08-28 | PBI-008 | kcb/KCBLABS-8 | Proposed→Active | — | — | — | Validation + seed; started |
| 2026-08-28 | PBI-008 | kcb/KCBLABS-8 | Active→Done | check 0 err, build ok/fail, test 24+6 pass | agentic | 3114686, 12fbc89 | Validation + slug + seed graph, build wiring |
| 2026-08-28 | PBI-009 | kcb/KCBLABS-9 | Proposed→Active | — | — | — | Homepage; started |
| 2026-08-28 | PBI-009 | kcb/KCBLABS-9 | Active→Done | check 0 err, build ok, test 24+6 pass | agentic | 41e0b48, 691bd09 | Homepage + cards + numbers derived |
