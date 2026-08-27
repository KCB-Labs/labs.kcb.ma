# CONTENT-MODEL.md — KCB Labs Content Model

> Keystatic schema & relationship reference. Generated from `keystatic.config.ts`. Updated via PBI-005 (labs, research, experiments, projects) — remaining collections arrive in PBI-006.

## Storage

`storage: local` dev, `kind: github` prod (switch via env in PBI-008). Content lives in `src/content/{collection}/*` as `*.mdoc` (Markdoc) with `content` field.

## Field Groups (per §49)

Every collection has:
- **Identity:** `title` (slug), `description`, `status`
- **Publishing:** `published` (boolean), `publishedAt`, `updatedAt`
- **Relationships:** collection-specific (see graph below)
- **Metadata:** `featured`, `priority`, `tags`
- **SEO:** `seoTitle`, `seoDescription`, `socialImage` + `socialImageAlt` (all images require alt)

Slug rules: lowercase, stable, human-readable, English, no IDs; generated from `title` but editable; never change without redirect.

## Collections (PBI-005 — 4 of 9)

### labs

`src/content/labs/*` — `slugField: title`, `path: src/content/labs/*`

| Field | Type | Notes |
|---|---|---|
| title | slug | name.label=Title, required |
| description | text | Short Description, required |
| status | select | active / exploring / paused / archived, default active |
| published | checkbox | default false |
| publishedAt | datetime | |
| updatedAt | datetime | |
| content | markdoc | Long-form overview |
| research | array:relationship→research | PBI-005 subset |
| experiments | array:relationship→experiments | PBI-005 subset |
| projects | array:relationship→projects | PBI-005 subset |
| technologies | array:text | |
| featured | checkbox | |
| priority | integer | |
| tags | array:text | |
| seoTitle | text | |
| seoDescription | text (multiline) | |
| socialImage | image | dir src/assets/labs |
| socialImageAlt | text | required if image present |

### research

`src/content/research/*`

| Field | Type |
|---|---|
| title | slug |
| description | text |
| status | select draft/active/published/archived |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| lab | relationship→labs |
| experiments | array:relationship→experiments |
| projects | array:relationship→projects |
| question | text multiline |
| hypothesis | text multiline |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### experiments

`src/content/experiments/*`

| Field | Type |
|---|---|
| title | slug |
| description | text |
| status | select draft/active/published/archived |
| outcome | select VALIDATED/INCONCLUSIVE/FAILED/PARTIAL default INCONCLUSIVE |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| lab | relationship→labs |
| research | array:relationship→research |
| project | relationship→projects |
| objective | text multiline |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### projects

`src/content/projects/*`

| Field | Type |
|---|---|
| title | slug |
| description | text |
| type | select Internal/Client/Startup/Collaboration/Open Source/Research default Internal |
| stage | select Idea/Validating/Validated/Implementation/Live/Completed/Spun Out/Archived default Idea |
| status | select draft/active/published/archived |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| originLab | relationship→labs |
| research | array:relationship→research |
| experiments | array:relationship→experiments |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

## Relationships (PBI-005 subset)

```
Lab ─┬─ Research (via labs.research → research[])
     ├─ Experiments (labs.experiments → experiments[])
     ├─ Projects (labs.projects → projects[])
     └─ Technologies (labs.technologies → text[])

Research ─┬─ Lab (research.lab → labs)
          ├─ Experiments (research.experiments → experiments[])
          └─ Projects (research.projects → projects[])

Experiment ─┬─ Lab (experiments.lab → labs)
            ├─ Research (experiments.research → research[])
            └─ Project (experiments.project → projects)

Project ─┬─ Origin Lab (projects.originLab → labs)
         ├─ Research (projects.research → research[])
         └─ Experiments (projects.experiments → experiments[])
```

Full graph (with articles, people, organizations, opensource, roadmap) lands in PBI-006 and `src/lib/content/relationships.ts` (PBI-007/008).

## Fixtures (PBI-005)

- `labs/ai-employees.mdoc` published true (active, featured) + `labs/draft-lab.mdoc` draft
- `research/local-ai-research.mdoc` published true (lab ai-employees) + `research/draft-research.mdoc` draft
- `experiments/local-llm-benchmark.mdoc` published true (lab ai-employees, research local-ai-research, project operant, outcome VALIDATED) + `experiments/draft-experiment.mdoc` draft
- `projects/operant.mdoc` published true (originLab ai-employees, research local-ai-research, experiments local-llm-benchmark, type Internal, stage Implementation) + `projects/draft-project.mdoc` draft

All `published:false` fixtures must be hidden from public queries (PBI-008 validation).

## Publishing Lifecycle

`draft` → `published` → `archived` via `published` boolean + `publishedAt/updatedAt`. Only `published === true` appears in public indexes; draft/archived hidden. See `specs/content-model/spec.md` §50.

*Partial doc — PBI-006 adds articles, people, organizations, opensource, roadmap + singletons, then PBI-007/008 add data-access layer and validation.*
