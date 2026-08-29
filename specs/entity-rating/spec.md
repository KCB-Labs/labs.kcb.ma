# Spec: Entity Rating System

## Goal
Add a 3-criteria rating system (Knowledge, Creativity, Business) to every item across the 5 core entity types (Labs, Research, Experiments, Projects, Open Source). Each criterion is rated 1–3, displayed as filled/empty dots (●●○) in the same row as the entity title, providing an at-a-glance quality signal.

## Scope
- In scope:
  - Rating fields in Keystatic schemas for: labs, research, experiments, projects, opensource
  - Rating display component (`RatingDots.astro`) — 3 criteria, each 1–3 dots
  - Rating placement in card components: same row as `<h3>{title}</h3>`
  - Rating placement in detail page headers: same row as `<h1>{title}</h1>` (inside SectionLayout/PageLayout header)
  - Rating placement in list pages (index pages): same row as title in card grid
  - Rating data access: included in `src/lib/content/*` query results
- Out of scope:
  - Articles, People, Organizations, Roadmap (no ratings — core entities only)
  - User-submitted ratings or voting
  - Rating aggregation or averaging
  - Rating-based sorting/filtering (future feature)
  - Rating history or changes over time
  - Visual design changes to the dot component beyond what's specified

## Contracts (success criteria)
- `RatingDots.astro` renders 3 criteria in a horizontal row: `Knowledge ●●○  Creativity ●●●  Business ●○○`
- Each criterion shows filled dots (●) for the score and empty dots (○) for the remaining (up to 3)
- Rating appears in the same baseline row as the entity title (flex row, items centered)
- Rating is responsive: wraps gracefully on narrow screens
- Keystatic schemas for labs, research, experiments, projects, opensource each include 3 integer fields: `ratingKnowledge`, `ratingCreativity`, `ratingBusiness` with min 1, max 3, default 1
- Data access layer returns rating fields in entity objects
- Cards (LabCard, ResearchCard, ExperimentCard, ProjectCard, OpenSourceCard) display ratings
- Detail page headers display ratings
- `npm run check` passes with 0 errors
- `npm run build` succeeds
- Existing content files without ratings default to 1/1/1 (no breaking changes)

## Anti-patterns
- Do not add ratings to articles, people, organizations, or roadmap collections
- Do not use star ratings, progress bars, or numeric fractions — only filled/empty dots
- Do not allow scores outside 1–3 range
- Do not change existing card layouts beyond adding the rating row
- Do not add interactivity (no clickable ratings, no JS)
- Do not break existing seed content — default values must be backward-compatible

## Decisions
- Display: filled ● = scored, empty ○ = unscored — avionics/cockpit instrument style
- Layout: rating row uses `display: flex; align-items: baseline; gap` — title left, rating right on same line
- Rating colors: filled dots use `var(--color-text)`, empty dots use `var(--color-border)` — no accent color for ratings
- Field names: `ratingKnowledge`, `ratingCreativity`, `ratingBusiness` (integer, 1–3)
- Default value: 1 for all three (backward-compatible with existing content)
- Component: `src/components/ui/RatingDots.astro` — pure Astro, no JS, no React
- Typography: mono font (`var(--font-mono)`), small size (`var(--text-metadata)`)

## Tooling
- No new tools required — Astro components + Keystatic field definitions
