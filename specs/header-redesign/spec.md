# Spec: Header Redesign

## Goal
Redesign the site header and navigation to match the asdlc.io reference style — clean, minimal, consistent across desktop and mobile — with the mobile menu respecting the full information hierarchy (parent sections first, then second-level children).

## Scope
- In scope:
  - Logo + brand text layout (left-aligned, same as asdlc.io)
  - Desktop nav: flat top-level links with dropdown submenus (hover/click)
  - Mobile nav: full hierarchical menu — parent sections (Explore, About, Participate) with expandable second-level children
  - Mobile menu uses `<details>/<summary>` or equivalent for collapsible sections
  - Active page indicator in nav (subtle underline or accent)
  - Search integration preserved
  - Sticky header behavior retained
  - Responsive breakpoint: 768px
- Out of scope:
  - Logo redesign (using existing `/logo.jpg`)
  - Search UI redesign (Search React island unchanged)
  - Footer changes
  - Mega-menu or multi-column dropdowns
  - Animated hamburger icon (keep `<details>` pattern for now)

## Contracts (success criteria)
- Desktop nav shows all 4 top-level links (Explore, Journal, About, Participate) with dropdown toggles for Explore/About/Participate
- Desktop dropdowns appear on hover and click, with Escape key closing them
- Mobile menu shows parent sections first: Explore, Journal, About, Participate, Contact
- Mobile "Explore" expands to show: Labs, Projects, Open Source
- Mobile "About" expands to show: Vision, People, Ecosystem, Roadmap
- Mobile "Participate" expands to show: Sponsorship, Collaboration
- Active page is visually indicated in both desktop and mobile nav
- Header remains sticky at top with `z-index: var(--z-header)`
- No JS framework required — vanilla JS for dropdown toggles (current pattern)
- `npm run check` passes with 0 errors
- `npm run build` succeeds

## Anti-patterns
- Do not flatten the mobile menu into a single list (current behavior — must be fixed)
- Do not add dropdown arrows or chevrons that don't work on mobile
- Do not change the logo image or brand text styling
- Do not remove the search functionality
- Do not add any JS framework for the nav (keep it Astro + vanilla JS)
- Do not use `position: fixed` for the mobile menu dropdown (use `position: absolute` relative to the header)

## Decisions
- Reference: asdlc.io header — logo left, nav center/right, clean flat links
- Mobile menu pattern: `<details>/<summary>` for collapsible parent sections (accessible, no JS required for open/close)
- Active state: `border-bottom: 2px solid var(--color-accent)` on the current page link (matches existing section sidebar pattern)
- Dropdown trigger: chevron `▾` next to parent links on desktop, `<summary>` arrow on mobile
- Breadcrumb spacing in header area: none — breadcrumb is inside content area (per PageLayout/SectionLayout)

## Tooling
- No new tools required — Astro components + vanilla JS + CSS custom properties
