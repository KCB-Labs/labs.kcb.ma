# DESIGN.md — KCB Labs Avionics Design System

> Source: [ASDLC Avionics Design System](https://asdlc.io/resources/design-system/)
> Applied to: labs.kcb.ma

## Philosophy

Timeless Industrial aesthetic — inspired by Dieter Rams' Braun designs, classic Kodak packaging, and aerospace flight manuals. Brutalist, specification-sheet aesthetic that values structural clarity and utilitarian purpose. The site is a "Flight Manual" for KCB's R&D, not a blog.

## Color Palette

### International Safety Colors

| Token | Value | Usage |
|---|---|---|
| `--c-bg-page` | `#f4f4f0` | Warm off-white page background |
| `--c-bg-surface` | `#ebebe6` | Cards, headers, elevated surfaces |
| `--c-border` | `#d1d1c7` | Structural borders and dividers |
| `--c-text-primary` | `#111111` | Soft black — body text, headings |
| `--c-text-secondary` | `#585855` | Muted grey — secondary info |
| `--c-brand` | `#f04e30` | Safety Orange — links, accents, CTAs |
| `--c-brand-hover` | `#d13a1e` | Darker orange — hover states |
| `--c-success` | `#00703c` | DIN Standard Green |
| `--c-warning` | `#ffb400` | Signal Yellow |
| `--c-error` | `#cc0000` | Switch Red |

### Status Badge Colors

| Status | Background | Text |
|---|---|---|
| Live | `#e6f5ec` | `#00703c` |
| Draft | `#fef3cd` | `#856404` |
| Deprecated | `#f8d7da` | `#cc0000` |
| Proposed | `#d1ecf1` | `#0c5460` |
| Experimental | `#e8daef` | `#6c3483` |

## Typography

### Font Families

```css
--f-sans: "Archivo", sans-serif;       /* Variable, industrial character */
--f-mono: "B612 Mono", monospace;      /* Aviation-grade, Airbus cockpit */
```

Archivo — variable font for industrial/technical applications.
B612 Mono — designed by Airbus for cockpit displays.

### Font Imports

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=B612+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### Heading Styles

All headings: uppercase, expanded width, industrial weight.

```css
h1, h2, h3 {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-variation-settings: "wdth" 110;
}
```

| Element | Size | Usage |
|---|---|---|
| `h1` | 2.5rem (40px) | Page titles — one per page |
| `h2` | 1.5rem (24px) | Major sections, chapter headings |
| `h3` | 1.125rem (18px) | Subsections, technical labels (monospace) |

### Body Text

```css
body {
  font-family: var(--f-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--c-text-primary);
}
```

## Layout System

### Content Grid (6-column symmetric)

```css
.grid-layout {
  display: grid;
  grid-template-columns:
    [full-start]     minmax(var(--s-gutter-min), 1fr)
    [breakout-start] minmax(var(--s-gutter-min), var(--s-gutter-max))
    [content-start]  min(100% - 4 * var(--s-grid-unit), var(--s-content-max))
    [content-end]
                     minmax(var(--s-gutter-min), var(--s-gutter-max)) [breakout-end]
                     minmax(var(--s-gutter-min), 1fr)                 [full-end];
}
```

| Zone | Named Lines | Width | Use Case |
|---|---|---|---|
| `content` | `content-start` / `content-end` | max 67ch | Body text, headings, lists |
| `breakout` | `breakout-start` / `breakout-end` | content + gutters | Tables, figures, code blocks |
| `full` | `full-start` / `full-end` | 100% viewport | Hero sections, full-bleed |

### Spacing Tokens

```css
--s-grid-unit: 0.5em;
--s-gutter-min: var(--s-grid-unit);
--s-gutter-max: 9.7ch;
--s-content-max: 67ch;
--s-grid: 24px;
--s-gap: 1.5rem;
```

### Spec Grid (Card Collections)

```css
.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--s-gap);
}
```

## Components

### Border Box

```css
.border-box {
  border: 1px solid var(--c-border);
  padding: var(--s-gap);
}
```

### Status Badge

Monospace, uppercase, bordered.

```css
.badge {
  font-family: var(--f-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2em 0.6em;
  border: 1px solid var(--c-border);
  border-radius: 2px;
}
```

### Spec Card

```css
.spec-card {
  border: 1px solid var(--c-border);
  padding: var(--s-gap);
  text-decoration: none;
  color: inherit;
  transition: border-color 150ms ease;
}
.spec-card:hover {
  border-color: var(--c-brand);
}
```

### Spec List Item

Dense row, full-width clickable `<a>`.

```css
.spec-list li a {
  display: block;
  padding: var(--s-gap) 0;
  border-bottom: 1px solid var(--c-border);
  text-decoration: none;
  color: inherit;
}
```

### Warning Banner

```css
.banner-warning {
  background: var(--c-brand);
  color: #fff;
  padding: var(--s-gap);
  font-family: var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}
```

## Site Header

- Sticky, top: 0
- Background: `var(--c-bg-surface)`
- Border-bottom: 1px solid `var(--c-border)`
- Logo: KCB image + "KCB Labs" text
- Nav links: monospace, uppercase, small
- Height: ~56px

## Site Footer

- Background: `var(--c-bg-surface)`
- Border-top: 1px solid `var(--c-border)`
- 4-column grid (brand, explore, journal, participate)
- Monospace section labels
- Copyright line

## Diagrams (Mermaid)

```json
{
  "primaryColor": "#f04e30",
  "clusterBkg": "#ebebe6",
  "clusterBorder": "#d1d1c7",
  "textColor": "#111111",
  "fontFamily": "B612 Mono"
}
```

## Accessibility

- All text colors meet WCAG AA (primary 14.5:1 AAA, secondary 6.8:1 AA, brand 4.7:1 AA large)
- Proper heading hierarchy (H1 → H2 → H3)
- Semantic elements (`<article>`, `<nav>`, `<main>`)
- ARIA labels where appropriate
- Skip-to-content link
- `prefers-reduced-motion` support

## Best Practices

- Use CSS custom properties for all colors and spacing
- Follow the grid layout system
- Use semantic HTML elements
- Maintain heading hierarchy (one H1 per page)
- Use monospace for technical/metadata content
- Never use arbitrary color values
- Never skip heading levels
- Never create layouts outside the grid system
