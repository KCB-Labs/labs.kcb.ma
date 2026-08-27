# Spec: Institutional Pages — About, Vision, People, Ecosystem, Roadmap, Participate

## Goal
Complete the public IA so KCB Labs can explain who it is, who contributes, who it works with, where it is headed, and how to participate: server-rendered, prerendered institutional pages under `/about/*` and `/participate/*` plus `/contact`, sourced from Keystatic singletons/collections, sharing the same layouts, tokens, and relationship system as core pages, with a validated contact/collaboration form that is spam-protected and server-validated.

## Scope
- In scope:
  - URL architecture (spec §4 + §3.4–§3.5): `/about`, `/about/vision`, `/about/people`, `/about/people/[slug]`, `/about/ecosystem`, `/about/ecosystem/[slug]`, `/about/roadmap`, `/participate`, `/participate/sponsorship`, `/participate/collaboration`, `/contact` — all prerenderable except form POST handling
  - About overview (`/about`) — aggregates Vision/people/ecosystem/roadmap entry points, editorial layout via `Prose`
  - Vision (`/about/vision`) — singleton `pages/vision` content (long-form, headings/prose/timeline/metric components)
  - People (`/about/people` + `/about/people/[slug]`): index of People cards (name/avatar/role/featured/order) with links to detail; detail shows `bio`, `shortBio`, `website/linkedin/github/x`, `relatedLabs[]`, `relatedProjects[]` via `PeopleList`/`RelatedLabs` (spec §11)
  - Ecosystem (`/about/ecosystem` + `/about/ecosystem/[slug]`): index grouped by organization type (Partner/Client/Sponsor/Startup/University/Research Organization/Technology Partner/Community/Open Source Community); detail shows `logo`, `description`, `relationship`, `website`, `relatedLabs[]`, `relatedProjects[]`; avoids generic logo-wall treatment — title "Built with an ecosystem" pattern reused
  - Roadmap (`/about/roadmap`): directional timeline from `roadmap` collection (period/theme/objective/areas/status) — not task-level project management; ordered chronologically, rendered via `Timeline` component (spec §13)
  - Sponsorship (`/participate/sponsorship`): singleton `pages/sponsorship` — positioning "Support independent technology research and experimentation." with tiers Research Supporter/Lab Sponsor/Project Sponsor/Technology Partner/Strategic Partner and what support enables (Research/Experiments/Infrastructure/Open Source/Prototyping/Collaborations/Transfer) — editorial, not generic donation page (spec §62)
  - Collaboration (`/participate/collaboration`): types Research/Technology/Project/Startup/Open-source contribution/Sponsorship, form fields Name/Organization/Email/Interest/Message with server-side validation + spam protection (honeypot + optional provider-agnostic hook) (spec §61)
  - Contact (`/contact`): lean contact entry + reuses same form handling as collaboration (shared validation endpoint); success/error states, preserves input on error, accessible form markup
  - Participate overview (`/participate`): hub linking to sponsorship/collaboration/contact with consistent CTA styling
  - Shared patterns: `Breadcrumbs`, `PageHeader`, `Section`, `Container` from foundation; `PersonCard`, `OrganizationCard`, `Metric`, `Timeline` reuse from `src/components/*`; data only via `src/lib/content/{people,organizations,roadmap}.ts`
  - Form contract: Astro `APIRoute` POST (e.g., `/api/contact`) with Zod-style validation, no secrets in client bundle, rate-limit/spam hook abstraction, graceful JS-disabled fallback (full page POST)
  - `CONTENT-MODEL.md` / `ARCHITECTURE.md` updated to document the new routes if they extend IA
- Out of scope:
  - Actual email delivery provider wiring (abstracted; initial implementation may log/echo in dev and require env var in prod — provider swap must not change content architecture)
  - Search, filtering, knowledge graph — belongs to `specs/interactive-features`
  - SEO sitemap/RSS/analytics hardening beyond per-page metadata — belongs to `specs/production-hardening`
  - Content schema changes beyond consuming existing singletons/collections — `specs/content-model` owns schemas

## Contracts (success criteria)
- All institutional routes return 200 with prerendered HTML (`npm run build` includes `/about*` and `/participate*` in `dist/`); slugs for people/ecosystem resolve via `getPeopleBySlug` / `getOrganizationBySlug` helpers; unknown slug renders branded `404` ("This path hasn't become a project yet." variant) not a stack trace
- People index lists only `published` people ordered by `order` then `featured`; detail page renders `relatedLabs` and `relatedProjects` as linked cards; a person with no relations renders sections without error
- Ecosystem index groups by `type` (Partner/Client/etc.) and detail renders `relatedLabs`/`relatedProjects` — both verified against helpers in unit test
- Roadmap page renders entries sorted by `period` ascending and timeline visualization shows theme/objective/status per entry (matches `src/lib/content/roadmap` ordering helper)
- Sponsorship page contains the positioning line and tier list from spec §62 — content comes from singleton, not hard-coded markup (verified by checking `getSponsorship()` / singleton helper is used)
- Collaboration + Contact forms: POST with missing/invalid email fails server validation with field-level error; valid POST succeeds and shows confirmation; honeypot field blocks bot-style fills; no API keys in client bundle (grep for `KEYSTATIC`/`SECRET` in `dist/client` must be clean)
- All pages share `BaseLayout` SEO props (`title`, `description`, `canonical`, OG/Twitter) and pass `astro check` + heading hierarchy check (one `h1` per page)
- No institutional page queries collections directly — `grep` gate same as core pages; relationships validated via central layer

## Anti-patterns
- Do not hard-code people/organization/roadmap lists in page markup — must come from collections/singletons
- Do not build these pages as React apps — Astro only; React only if an island is justified and is the weakest hydration possible
- Do not duplicate Person/Organization card markup — reuse `PersonCard`/`OrganizationCard`
- Do not commit provider secrets or send mail from client side — form POST must be server route with env-gated provider
- Do not add new top-level nav items to accommodate these pages — IA is compact (Explore/Journal/About/Participate) with progressive disclosure inside pages/filters (spec §2.3)
- Do not make the ecosystem page a generic client logo wall — follow §17.7 guidance

## Decisions
- `ADR-009` (planned) — Institutional IA under `/about/*` and `/participate/*` per spec §4; future extensions (Programs/Events/Community) gated until enough content justifies nav (spec §73)
- `ADR-010` (planned) — Form handling as Astro `APIRoute` with provider abstraction so analytics/email sponsor provider can change without content layer edits (mirrors analytics abstraction principle §60)
- Reuses `specs/foundation` layouts/tokens and `specs/content-model` people/organizations/roadmap collections — no schema duplication

## Tooling
- Astro MCP for `APIRoute` + prerender patterns
- Vitest candidate (`antfu/skills@vitest`) for people/org/roadmap helper tests and form validation unit tests
- Playwright candidate for form submission + navigation smoke (People/Ecosystem/Roadmap/Sponsorship/Collaboration) — install on approval
