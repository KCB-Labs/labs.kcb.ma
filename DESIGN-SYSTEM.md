# DESIGN-SYSTEM.md — KCB Labs Design System

> Tokens, typography, color, spacing, motion, components. Source: `src/styles/tokens.css`.

## Principles

Combine Research Lab + Technology Company + Editorial Publication. Avoid Agency/SaaS/Corporate template aesthetic.

Strong typography, restrained palette, editorial whitespace, subtle borders, structured grids, documentation-style density.

## Tokens

All design decisions live in `src/styles/tokens.css`. No literal values in components.

### Colors (Light Theme)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#fcfcf9` | Page background |
| `--color-surface` | `#ffffff` | Cards, elevated surfaces |
| `--color-text` | `#0f172a` | Body text |
| `--color-text-strong` | `#020617` | Headings, emphasis |
| `--color-muted` | `#64748b` | Secondary text |
| `--color-accent` | `#0f172a` | Links, buttons, focus |
| `--color-accent-contrast` | `#ffffff` | Text on accent |
| `--color-border` | `#e2e8f0` | Subtle borders |
| `--color-success` | `#14532d` | Success states |
| `--color-error` | `#991b1b` | Error states |

Dark theme via `[data-theme="dark"]` and `prefers-color-scheme: dark`.

### Typography

| Token | Size | Weight | Use |
|---|---|---|---|
| `--text-display` | 3.5rem | 700 | Hero text |
| `--text-h1` | 2.5rem | 700 | Page titles |
| `--text-h2` | 1.875rem | 600 | Section headings |
| `--text-h3` | 1.25rem | 600 | Card titles |
| `--text-body` | 1rem | 400 | Body copy |
| `--text-small` | 0.875rem | 400 | Secondary text |
| `--text-metadata` | 0.75rem | 400 | Labels, badges |

Fonts: Inter (body), Instrument Sans (display), Geist Mono (code). System fallbacks.

### Spacing

4px base scale: `--space-1` (4px) through `--space-10` (128px).

### Radius

`--radius-sm` (6px), `--radius-md` (10px), `--radius-lg` (16px), `--radius-full` (9999px).

### Motion

`--motion-duration-fast` (150ms), `--motion-duration` (220ms), `--motion-duration-slow` (380ms).

Respects `prefers-reduced-motion: reduce` globally.

## Components

### Badges

`StatusBadge`, `TypeBadge`, `StageBadge` — mono typography, status colors, `--radius-full`.

### Cards

`LabCard`, `ProjectCard`, `ArticleCard`, `ResearchCard`, `ExperimentCard`, `PersonCard`, `OrganizationCard`, `OpenSourceCard` — full-card link, title + description + metadata badges.

### Navigation

`SiteHeader` — sticky, dropdown menus with toggle buttons, mobile `<details>/<summary>`. `SiteFooter` — 4-column grid, brand + links + copyright.

### Content

`RichContent` — prose rendering for Markdoc bodies. `CodeBlock`, `Callout`, `Quote`, `ImageFigure` — editorial content primitives.

## Accessibility

- WCAG 2.2 AA target
- Semantic HTML: `header`, `main`, `footer`, `nav`
- Skip-to-content link on every page
- Visible `:focus-visible` ring (2px solid accent)
- Keyboard navigable dropdowns, search, filters, timeline
- `prefers-reduced-motion` disables all animations
- Sufficient contrast ratios (4.5:1 text, 3:1 large text)
