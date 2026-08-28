# DESIGN-SYSTEM.md — KCB Labs Avionics Design System

> Source: [ASDLC Avionics Design System](https://asdlc.io/resources/design-system/)
> Tokens: `src/styles/tokens.css` | Globals: `src/styles/globals.css`
> Spec: `specs/avionics-design-system/spec.md`

## Philosophy

Timeless Industrial aesthetic — inspired by Dieter Rams' Braun designs, classic Kodak packaging, and aerospace flight manuals. Brutalist, specification-sheet aesthetic that values structural clarity and utilitarian purpose. The site is a "Flight Manual" for KCB's R&D.

## Tokens

All design decisions live in `src/styles/tokens.css`. No literal values in components.

### Colors (International Safety Palette)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#f4f4f0` | Warm off-white page background |
| `--color-surface` | `#ebebe6` | Cards, headers, elevated surfaces |
| `--color-text` | `#111111` | Soft black — body text |
| `--color-text-strong` | `#111111` | Headings, emphasis |
| `--color-muted` | `#585855` | Secondary text |
| `--color-accent` | `#f04e30` | Safety Orange — links, CTAs |
| `--color-accent-hover` | `#d13a1e` | Darker orange — hover |
| `--color-border` | `#d1d1c7` | Structural borders |

### Typography

| Font | Family | Usage |
|---|---|---|
| Archivo | `--font-display`, `--font-body` | Headings (uppercase, expanded width) + body |
| B612 Mono | `--font-mono` | Code, metadata, badges, h3 |

| Element | Size | Weight | Transform |
|---|---|---|---|
| h1 | 2.5rem (40px) | 700 | uppercase, wdth 110 |
| h2 | 1.5rem (24px) | 700 | uppercase, wdth 110 |
| h3 | 1.125rem (18px) | 700 | monospace |
| Body | 1rem (16px) | 400 | — |

### Spacing

4px base scale: `--space-1` (4px) through `--space-10` (128px). Avionics grid: `--s-gap: 1.5rem`, `--s-content-max: 67ch`.

### Radius

`--radius-sm` (2px), `--radius-md` (2px), `--radius-lg` (4px), `--radius-full` (9999px). Industrial square corners.

## Layout System

6-column CSS Grid with named zones: `full`, `breakout`, `content` (67ch max). Applied via `.grid-layout` class.

## Components

### Badges
`StatusBadge`, `TypeBadge`, `StageBadge` — monospace, uppercase, 1px border, square corners.

### Cards
`LabCard`, `ProjectCard`, `ArticleCard`, `ResearchCard`, `ExperimentCard`, `PersonCard`, `OrganizationCard`, `OpenSourceCard` — border-box, warm palette, Safety Orange hover border.

### Navigation
`SiteHeader` — sticky, KCB logo image + "Labs" text, monospace nav links. `SiteFooter` — 4-column grid, warm surface background, monospace section labels.

### Content
`Breadcrumbs` — monospace, uppercase, muted color. `PageHeader` — h1 uppercase, expanded width.

## Accessibility

- WCAG 2.2 AA target
- All text colors meet contrast ratios (primary 14.5:1 AAA, secondary 6.8:1 AA, brand 4.7:1 AA large)
- Semantic HTML: `header`, `main`, `footer`, `nav`
- Skip-to-content link on every page
- Visible `:focus-visible` ring (2px solid accent)
- `prefers-reduced-motion` disables all animations

## Best Practices

- Use CSS custom properties for all colors and spacing
- Follow the grid layout system for consistent spacing
- Use semantic HTML elements
- Maintain heading hierarchy (one H1 per page)
- Use monospace font for technical/metadata content
- Never use arbitrary color values — all via tokens
- Never skip heading levels
- Never create layouts outside the grid system
