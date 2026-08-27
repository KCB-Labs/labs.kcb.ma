# CONTENT-MODEL.md — KCB Labs Content Model

> Keystatic schema & relationship reference. Generated from `keystatic.config.ts`. Updated via PBI-006 — complete 9 collections + 5 singletons.

## Storage

`storage: local` dev, `kind: github` prod (switch via env in PBI-008). Content lives in `src/content/{collection}/*` as `*.mdoc` (Markdoc) with `content` field. Singletons at `src/content/site`, `src/content/pages/*`, `src/content/settings` as YAML.

## Field Groups (per §49)

Every collection has:
- **Identity:** `title` (slug), `description`, `status`
- **Publishing:** `published` (boolean), `publishedAt`, `updatedAt`
- **Relationships:** collection-specific (see graph)
- **Metadata:** `featured`, `priority`, `tags`
- **SEO:** `seoTitle`, `seoDescription`, `socialImage` + `socialImageAlt` (all images require alt)

Slug rules: lowercase, stable, human-readable, English, no IDs; generated from `title` but editable; never change without redirect.

## Collections (9)

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
| research | array:relationship→research | |
| experiments | array:relationship→experiments | |
| projects | array:relationship→projects | |
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

### articles

`src/content/articles/*`

| Field | Type |
|---|---|
| title | slug |
| description | text |
| category | select Article/Lab Note/Field Note/Perspective/Announcement default Article |
| status | select draft/active/published/archived |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| author | relationship→people |
| labs | array:relationship→labs |
| research | array:relationship→research |
| experiments | array:relationship→experiments |
| projects | array:relationship→projects |
| people | array:relationship→people |
| organizations | array:relationship→organizations |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### people

`src/content/people/*`

| Field | Type |
|---|---|
| title | slug (Name) |
| description | text (Short Bio) |
| role | text |
| status | select active/inactive |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc (Bio) |
| avatar | image |
| avatarAlt | text |
| website | url |
| linkedin | url |
| github | url |
| x | url (X/Twitter) |
| featured | checkbox |
| order | integer |
| relatedLabs | array:relationship→labs |
| relatedProjects | array:relationship→projects |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### organizations

`src/content/organizations/*`

| Field | Type |
|---|---|
| title | slug (Name) |
| description | text |
| type | select Partner/Client/Sponsor/Startup/University/Research Organization/Technology Partner/Community/Open Source Community default Partner |
| status | select active/inactive |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| logo | image |
| logoAlt | text |
| website | url |
| relationship | text multiline |
| relatedLabs | array:relationship→labs |
| relatedProjects | array:relationship→projects |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### opensource

`src/content/opensource/*`

| Field | Type |
|---|---|
| title | slug (Name) |
| description | text |
| status | select active/maintained/archived |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc (Documentation) |
| repository | url |
| license | text |
| originLab | relationship→labs |
| relatedProject | relationship→projects |
| technologies | array:text |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

### roadmap

`src/content/roadmap/*`

| Field | Type |
|---|---|
| title | slug (Period) |
| description | text (Theme) |
| status | select planned/active/completed |
| published | checkbox |
| publishedAt | datetime |
| updatedAt | datetime |
| content | markdoc |
| period | text |
| theme | text |
| objective | text multiline |
| areas | array:text |
| featured | checkbox |
| priority | integer |
| tags | array:text |
| seoTitle | text |
| seoDescription | text |
| socialImage | image |
| socialImageAlt | text |

## Singletons (5)

| Singleton | Path | Format | Schema |
|---|---|---|---|
| site | `src/content/site` | yaml (data) | title, description, seoTitle, seoDescription |
| about | `src/content/pages/about` | yaml (data) | title, description, content (markdoc) |
| vision | `src/content/pages/vision` | yaml (data) | title, description, content |
| sponsorship | `src/content/pages/sponsorship` | yaml (data) | title, description, content |
| settings | `src/content/settings` | yaml (data) | siteUrl (url), analyticsProvider (select plausible/umami/none) |

## Relationships (full graph)

```
Lab ─┬─ Research (labs.research → research[])
     ├─ Experiments (labs.experiments → experiments[])
     ├─ Projects (labs.projects → projects[])
     ├─ Technologies (labs.technologies → text[])
     └─ (via reverse: People, Orgs link back)

Research ─┬─ Lab (research.lab → labs)
          ├─ Experiments (research.experiments → experiments[])
          └─ Projects (research.projects → projects[])

Experiment ─┬─ Lab (experiments.lab → labs)
            ├─ Research (experiments.research → research[])
            └─ Project (experiments.project → projects)

Project ─┬─ Origin Lab (projects.originLab → labs)
         ├─ Research (projects.research → research[])
         └─ Experiments (projects.experiments → experiments[])

Article ─┬─ Labs (articles.labs → labs[])
         ├─ Research (articles.research → research[])
         ├─ Experiments (articles.experiments → experiments[])
         ├─ Projects (articles.projects → projects[])
         ├─ People (articles.people → people[])
         └─ Organizations (articles.organizations → organizations[])

People ─┬─ Related Labs (people.relatedLabs → labs[])
        └─ Related Projects (people.relatedProjects → projects[])

Organizations ─┬─ Related Labs (organizations.relatedLabs → labs[])
               └─ Related Projects (organizations.relatedProjects → projects[])

OpenSource ─┬─ Origin Lab (opensource.originLab → labs)
            ├─ Related Project (opensource.relatedProject → projects)
            └─ Technologies (opensource.technologies → text[])

Roadmap — standalone directional entries (no relationships, ordered by period)
```

Traversal: `Lab ↔ Research ↔ Experiment ↔ Project ↔ Article ↔ People ↔ Organization` with `Technologies`/`OpenSource` as cross-cutting.

## Fixtures (PBI-005 + PBI-006)

- Labs: `ai-employees` (published active featured) + `draft-lab` (draft)
- Research: `local-ai-research` (lab ai-employees) + `draft-research`
- Experiments: `local-llm-benchmark` (lab ai-employees, research local-ai-research, project operant, VALIDATED) + `draft-experiment`
- Projects: `operant` (originLab ai-employees, research local-ai-research, experiments local-llm-benchmark) + `draft-project`
- Articles: `building-ai-employees` (published Article, labs ai-employees, research local-ai-research, experiments local-llm-benchmark, projects operant, people john-doe, organizations partner-org, author john-doe) + `draft-article`
- People: `john-doe` (published, relatedLabs ai-employees, relatedProjects operant) + `draft-person`
- Organizations: `partner-org` (published Partner, relatedLabs ai-employees, relatedProjects operant) + `draft-org`
- OpenSource: `httpa-agent-protocol` (published, originLab ai-employees, relatedProject operant) + `draft-opensource`
- Roadmap: `2026-ai-autonomous` (published, period 2026, theme AI & Autonomous Systems) + `draft-roadmap`
- Singletons: `site.yaml`, `pages/about.yaml`, `pages/vision.yaml`, `pages/sponsorship.yaml`, `settings.yaml` (all with minimal required fields)

All `published:false` fixtures hidden from public queries (PBI-008 validation).

## Publishing Lifecycle

`draft` → `published` → `archived` via `published` boolean + `publishedAt/updatedAt`. Only `published === true` appears in public indexes; draft/archived hidden. See `specs/content-model/spec.md` §50.

*Complete doc — next PBI-007/008 add data-access layer (`src/lib/content/*`) and relationship validation.*
