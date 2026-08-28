# CONTRIBUTING.md — KCB Labs Website

> Workflow for humans and AI agents. Branch strategy, commit conventions, PBI workflow, review gates.

## Branch Strategy

- **`master`** — production branch, auto-deploys via Coolify
- **`feature/*`** — feature branches, merged via PR after gates pass

No `develop` or `staging` branches. CI runs on PRs to `master`.

## Commit Conventions

```
PBI-NNN: short description of what changed
```

Examples:
- `PBI-017: Search index + Search island`
- `PBI-021: a11y perf pass landmarks skip-link tokens`

Commits are atomic: one logical change per commit. No half-done work committed.

## PBI Workflow

1. **Select** next PBI from `plans/README.md` (dependencies satisfied, Plane status Todo)
2. **Create branch** `feature/pbi-NNN-description` (or work directly on `master` if low-risk)
3. **Understand** → read task file + spec + related code
4. **Implement** → follow AGENTS.md rules, use MCP for Astro decisions
5. **Gates** → `npm run check` + `npm run build` + `npm test` all pass
6. **Commit** → descriptive message with PBI reference
7. **Update docs** → `plans/README.md` (Done) + `plans/PROGRESS.md` (close-out)
8. **Plane** → move to Done, post resolution comment

## Deterministic Gates

All PRs must pass before merge:

```bash
cmd /c "npm.cmd run check"    # astro check + tsc --noEmit
cmd /c "npm.cmd run build"    # astro build
cmd /c "npm.cmd test"         # vitest + smoke tests
```

## AI Agent Workflow

```
1. Understand → 2. Inspect → 3. MCP docs → 4. Design → 5. Implement → 6. Test → 7. Build → 8. Review → 9. Commit
```

- Never make broad architectural changes to simplify a local task
- Express tasks as outcomes with requirements, not vague todos
- Use Astro MCP for all Astro technical decisions
- Verify APIs against installed versions, never copy blindly

## Review Gates

| Review Type | When | Who |
|---|---|---|
| Agentic | Deterministic outputs (tokens, schemas, data layer) | AI agent self-review |
| Manual | UX judgment, design decisions, architectural changes | Human reviewer |

## Code Style

- TypeScript strict, no `any` without justification
- Astro components for server-rendered UI, React only for client interactivity
- `client:visible` preferred over `client:load` for hydration
- Design tokens from `src/styles/tokens.css`, no literal values in components
- Content queries via `src/lib/content/*` only

## Forbidden Patterns

- Hard-coding content that belongs in Keystatic
- Committing secrets, `.env`, `KEYSTATIC_*` values
- Indexing `/keystatic/*` or `/api/*`
- Adding dependencies without PBI/ADR justification
- Changing slugs without redirect strategy
