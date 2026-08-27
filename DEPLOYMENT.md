# DEPLOYMENT.md — KCB Labs Website (labs.kcb.ma)

> Deployment contract for Coolify + Docker. Source of truth for env, health, and GitHub→Coolify workflow. See `ARCHITECTURE.md` §3 for topology.

## Coolify Configuration

| Field | Value |
|---|---|
| Build Pack | `Dockerfile` |
| Domain | `https://labs.kcb.ma` |
| Port | `4321` |
| Auto Deploy | Enabled (GitHub webhook on `master`) |
| HTTPS | Enabled (Coolify managed) |
| Health Check | `GET /api/health` → `{"status":"ok"}` |

## Environment Variables (Coolify secrets — never committed)

| Variable | Required | Description |
|---|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | prod | Keystatic GitHub OAuth app client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | prod | Keystatic GitHub OAuth secret |
| `KEYSTATIC_SECRET` | prod | Keystatic session secret (random 32+ chars) |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | prod | GitHub App slug for Keystatic |
| `PUBLIC_SITE_URL` | prod | `https://labs.kcb.ma` |

All `KEYSTATIC_*` values come from the GitHub App created for Keystatic (see Keystatic docs / GitHub mode). Store as Coolify **secrets**, not in `.env`.

## Docker

Multi-stage `Dockerfile` (`node:20-alpine`):

- **Stage builder:** `npm ci` → `npm run build` → produces `dist/server/entry.mjs` + `dist/client/` (prerendered routes per `astro.config.ts:11` `output: server` + `per-route prerender`)
- **Stage runtime:** copies `dist/` + `node_modules` + `package.json`, exposes `4321`, `CMD ["node", "./dist/server/entry.mjs"]`

Local verify:

```bash
docker build -t labs .
docker run -p 4321:4321 labs
curl http://localhost:4321/api/health # → {"status":"ok"}
```

## Health Endpoint

`src/pages/api/health.ts` — `GET /api/health` → `200` `{"status":"ok"}` with no third-party deps. Coolify uses it as health check. Must return `Content-Type: application/json`.

## Workflow

```
Editor → /keystatic (GitHub auth) → GitHub commit → Coolify webhook → Docker build → labs.kcb.ma
```

Content is git-tracked in `src/content/` (Keystatic `storage: local` dev, `kind: github` prod). Every edit commits to repo and triggers Coolify deploy.

## Rollback

Coolify keeps previous image; rollback via Coolify dashboard → Deployments → Redeploy previous.

## Checklist

- [ ] Dockerfile builds locally and `node ./dist/server/entry.mjs` serves `/api/health`
- [ ] Coolify secrets set
- [ ] Domain `labs.kcb.ma` points to Coolify, HTTPS enabled
- [ ] `GET /api/health` reachable from outside
- [ ] `/keystatic` requires GitHub auth, not indexed (robots/sitemap exclude)

*Stub created in PBI-004; full Docker optimization and CI wiring in PBI-023.*
