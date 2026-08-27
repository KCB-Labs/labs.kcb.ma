# Plans — KCB Labs Website (labs.kcb.ma)

> Sequencing & Plane sync index. PBIs arrive via `asdlc-plan` (Spec → PBIs). This file is the execution order. `plans/PROGRESS.md` is the Ralph Loop log.

**Bound to Plane:** `kcb / KCBLABS` (`4f8b6bc1-7a02-4822-943d-fb6ab541414f`, identifier `KCBLABS`) — verified via `plane-kcb` MCP on 2026-08-27. **MCP server:** `plane-kcb`. **Backlog ignored until moved to Todo.**

---

## Plane Sync

| Plane issue | PBI | Status | Notes |
|---|---|---|---|
| _(none — 0 Todo issues found on 2026-08-27)_ | — | — | Initial seed found 0 Todo / 0 In Progress / 0 In Review issues in KCBLABS. New work will be planned from the upstream spec (`KCB Labs — Website Product & Technical Specification.md`) via `asdlc-plan`. |

- Last sync: 2026-08-27 (onboarding) — `plane-kcb` `project.list` + `workitem list` (Todo) → 0 issues. Next sync on `asdlc-plan` pull.
- Resolution protocol: `asdlc-plane` only touches the declared project above. `Backlog` issues are never pulled until moved to `Todo`.

---

## Execution Order (sequencing)

> PBIs are ordered by dependencies. Status tracks the Ralph Loop. Add rows via `asdlc-plan`.

| # | PBI | Feature | Plane | Status | Depends on | Branch | Review |
|---|---|---|---|---|---|---|---|
| — | _No PBIs yet — onboarding bootstrap_ | — | — | — | — | — | — |

Status values: `Proposed` → `Active` → `In Review` → `Done` / `Blocked`.

---

## Next Up

1. **Phase 1 — Foundation** (spec §70): Astro + React + Keystatic + TypeScript + Node adapter + design tokens + BaseLayout + Navigation/Footer + MCP config + Dockerfile + Coolify config. Derive spec `specs/foundation/spec.md` (human review required), then `asdlc-plan` → PBIs `PBI-001`…`.
2. **Phase 2 — Content Model**: collections `labs/research/experiments/projects/articles/people/organizations/opensource/roadmap`, relationship helpers `src/lib/content/*`, validation.
3. **Phase 3 — Core Public Pages**: Home, Labs, Projects, Journal, Open Source (with Lab/Project detail, article detail).
4. **Phase 4 — Institutional Pages**: About, Vision, People, Ecosystem, Roadmap, Sponsorship, Collaboration, Contact.
5. **Phase 5 — Interactive Features**: Search index + island, filters, related discovery, timeline, optional knowledge graph.
6. **Phase 6 — Production Hardening**: SEO/sitemap/RSS, a11y, perf, security headers, analytics, error pages, health endpoint, CI, Docker optimization, Coolify deployment.

See upstream spec §70–§79 for full MVP and DoD.

---

## Plane Backlog Seed (inputs for asdlc-plan)

> Issues are inputs — the Spec is authoritative (asdlc-plane → Core rule). No Todo issues to seed. Future seeds appear here after `Todo` is populated.

```
No candidate issues — 0 Todo found in kcb/KCBLABS on 2026-08-27.
```

---

*Bootstrap created 2026-08-27 via asdlc-onboard. Do not edit sequencing manually — use asdlc-plan / asdlc-execute.*
