# Spec: Avionics Design System

## Goal
Apply the ASDLC Avionics "Timeless Industrial" design system to KCB Labs — replacing the current cool-slate palette with warm International Safety colors, Archivo/B612 Mono typography, uppercase headings, CSS Grid layout with named zones, and KCB branding (logo + favicon).

## Scope
- In scope: tokens.css, globals.css, all components (cards, badges, header, footer, breadcrumbs, page header), BaseLayout, favicon, logo
- Out of scope: content changes, new pages, new collections, search/filter logic, deployment config

## Contracts (success criteria)
- All colors use Avionics palette tokens (#f4f4f0 bg, #ebebe6 surface, #111111 text, #f04e30 brand)
- Fonts: Archivo (headings/body), B612 Mono (code/metadata/badges)
- Headings: uppercase, 700 weight, 0.02em tracking, font-variation-settings wdth 110
- h1: 2.5rem, h2: 1.5rem, h3: 1.125rem (monospace)
- Layout: 6-column CSS Grid with full/breakout/content named zones, 67ch content max
- SiteHeader: KCB logo (image) + "KCB Labs" text, sticky, border-bottom
- Favicon: icon.png served from public/
- StatusBadge: monospace, uppercase, border-box style
- Cards: border-box style with warm palette
- SiteFooter: 4-column grid, warm surface background
- Dark theme: preserved with Avionics dark tokens
- All gates pass: check, build, test

## Anti-patterns
- Do not use cool-slate colors (#0f172a, #64748b, #e2e8f0) — replaced by warm palette
- Do not use Inter/Instrument Sans/Geist Mono — replaced by Archivo/B612 Mono
- Do not skip heading uppercase transformation
- Do not use arbitrary color values — all via tokens
- Do not break existing page routing or content

## Decisions
- ADR-005: Avionics Design System adoption (to be created)
- Brand accent: Safety Orange (#f04e30) replaces dark slate accent
- Logo: image-based in SiteHeader, not text-only
- Favicon: icon.png from docs/branding/

## Tooling
- No new tools required — pure CSS token/component changes
