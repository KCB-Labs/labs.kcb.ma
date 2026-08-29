# KCB Labs Website — Product & Technical Specification

**Project:** `labs.kcb.ma`  
**Organization:** KCB Labs  
**Status:** Implementation Specification  
**Primary Stack:** Astro + Keystatic + React + TypeScript  
**AI Development:** MCP-enabled AI coding agents  
**Deployment:** Coolify  
**Content Strategy:** Structured, Git-based R&D knowledge system

---

## 1. Product Definition

### 1.1 Purpose

`labs.kcb.ma` is the public digital platform for **KCB Labs**, presenting KCB's research, exploration, experiments, validated ideas, projects, open-source work, people, ecosystem and future direction.

The website must not feel like a conventional agency or corporate website.

Its primary identity is:

> **A public R&D and innovation platform that documents how KCB turns ideas into experiments, validated projects and real-world outcomes.**

The website should communicate a continuous lifecycle:

```text
IDEA
  ↓
LAB
  ↓
RESEARCH
  ↓
EXPERIMENT
  ↓
VALIDATION
  ↓
PROJECT
  ↓
PRODUCT / STARTUP / CLIENT SOLUTION / OPEN SOURCE
```

The website therefore functions simultaneously as:

1. KCB Labs' public identity.
2. An R&D portfolio.
3. A knowledge base.
4. A project discovery platform.
5. An editorial publication.
6. A record of experimentation and learning.
7. A gateway for collaborators and sponsors.

---

# 2. Product Principles

### 2.1 Research before marketing

The site should prioritize:

- ideas
- questions
- discoveries
- experiments
- evidence
- technology
- outcomes

over generic marketing language.

### 2.2 Everything is connected

Labs, research, experiments, projects, articles, people and organizations must be linkable.

The website should behave like a structured knowledge system rather than a collection of isolated pages.

### 2.3 Progressive disclosure

The top-level navigation must remain compact.

Complexity should exist inside pages, filters and relationships rather than inside a large primary navigation.

### 2.4 Editorial quality

Long-form content must feel closer to a modern technology research publication than a traditional CMS blog.

### 2.5 Technical credibility

Project and research pages should comfortably support:

- technical writing
- diagrams
- code snippets
- architecture descriptions
- benchmarks
- datasets
- links to repositories
- external references
- timelines
- structured metadata

### 2.6 AI-native development

The repository must be designed so AI coding agents can understand the architecture, content model and design system with minimal implicit context.

Astro's official documentation provides an MCP server specifically to provide coding agents with up-to-date Astro knowledge, reducing the risk of agents using outdated APIs. The documented endpoint is `https://mcp.docs.astro.build/mcp`.

---

# 3. Information Architecture

## 3.1 Primary Navigation

The visible navigation must remain compact:

```text
KCB Labs

Explore
Journal
About
Participate

Search
```

## 3.2 Explore

```text
Explore
├── Labs
├── Projects
└── Open Source
```

## 3.3 Journal

```text
Journal
└── Articles
```

The content system may distinguish:

- Article
- Lab Note
- Field Note
- Perspective
- Announcement

without exposing all of them as navigation items.

## 3.4 About

```text
About
├── Vision
├── People
├── Ecosystem
└── Roadmap
```

## 3.5 Participate

```text
Participate
├── Sponsorship
├── Collaboration
└── Contact
```

---

# 4. URL Architecture

The canonical public URL structure should be:

```text
/
├── /labs/
│   └── /labs/[slug]
│
├── /projects/
│   └── /projects/[slug]
│
├── /open-source/
│   └── /open-source/[slug]
│
├── /journal/
│   └── /journal/[slug]
│
├── /about/
├── /about/vision/
├── /about/people/
│   └── /about/people/[slug]
├── /about/ecosystem/
│   └── /about/ecosystem/[slug]
├── /about/roadmap/
│
├── /participate/
├── /participate/sponsorship/
├── /participate/collaboration/
└── /contact/
```

Research and experiments are first-class content entities but should not initially require top-level public URLs.

Recommended detail routes:

```text
/labs/[lab]
/projects/[project]
/journal/[article]
```

Research and experiments should primarily be discovered through their parent Lab or Project.

A future evolution may expose:

```text
/research/[slug]
/experiments/[slug]
```

without requiring a change to the underlying content model.

---

# 5. Core Domain Model

The website must distinguish clearly between the following concepts.

## 5.1 Lab

A **Lab** is a persistent area of exploration.

A Lab asks:

> What area are we continuously investigating?

Examples:

- AI Employees
- Local AI
- Agent Systems
- Autonomous Software
- Developer Infrastructure
- Civic Technology
- Agritech

A Lab can exist for years and accumulate research, experiments and projects.

### Lab relationships

```text
Lab
├── Research
├── Experiments
├── Projects
├── Journal Articles
├── People
├── Organizations
└── Technologies
```

---

# 6. Research

Research represents a structured investigation.

Research asks:

> What are we trying to understand?

Research should contain:

- research question
- hypothesis
- context
- methodology
- references
- findings
- conclusions
- related experiments
- related projects

Research may exist without producing a project.

---

# 7. Experiment

An experiment is a bounded practical test.

An experiment asks:

> What happens if we actually try this?

Typical structure:

```text
Experiment
├── Hypothesis
├── Objective
├── Setup
├── Method
├── Inputs
├── Results
├── Observations
├── Conclusion
└── Artifacts
```

Experiments may be:

- successful
- unsuccessful
- inconclusive
- validated

Failed experiments are valid content and should not be hidden when publishing them provides useful knowledge.

---

# 8. Project

A Project represents something KCB has decided is worth implementing beyond pure exploration.

Project types:

```text
Internal
Client
Startup
Collaboration
Open Source
Research
```

Project lifecycle:

```text
Idea
Validating
Validated
Implementation
Live
Completed
Spun Out
Archived
```

Each project should clearly communicate its origin.

Example:

```text
OPERANT

AI Employee Framework

Origin:
AI Employees Lab

Type:
Internal

Stage:
Implementation
```

The website should visually support the idea:

> **Born in KCB Labs**

---

# 9. Open Source

Open Source represents public technical output.

An Open Source entry may originate from:

- a Lab
- Research
- an Experiment
- a Project

Each entry should support:

```text
Name
Description
Repository
License
Status
Origin Lab
Related Project
Technologies
Documentation
```

Open Source is therefore a **distribution layer**, not a separate R&D stage.

---

# 10. Journal

The Journal is the editorial layer.

It is where KCB communicates:

- what it thinks
- what it discovers
- what it builds
- what it learns
- what it observes

Article types:

```text
Article
Lab Note
Field Note
Perspective
Announcement
```

Every article may reference:

```text
Labs
Research
Experiments
Projects
People
Organizations
Technologies
```

---

# 11. People

People represent contributors to the Labs ecosystem.

A person may be:

- founder
- researcher
- engineer
- contributor
- advisor
- collaborator

Fields:

```text
name
slug
role
shortBio
bio
avatar
website
linkedin
github
x
featured
order
relatedLabs[]
relatedProjects[]
```

Do not expose personal data that is not intentionally published.

---

# 12. Ecosystem

Organizations represent entities interacting with KCB Labs.

Types:

```text
Partner
Client
Sponsor
Startup
University
Research Organization
Technology Partner
Community
Open Source Community
```

Fields:

```text
name
slug
type
description
logo
website
relationship
relatedLabs[]
relatedProjects[]
featured
```

---

# 13. Roadmap

The roadmap represents KCB Labs' future direction rather than individual project task management.

Roadmap entries should describe:

```text
Period
Theme
Objective
Areas of exploration
Expected direction
Status
```

Example:

```text
2026
AI & Autonomous Systems

2027
Open Research Partnerships

2027
New Technology Ventures
```

The roadmap is directional and intentionally less precise than an internal project roadmap.

---

# 14. Core Content Collections

Keystatic should manage the following collections.

```text
src/content/
├── labs/
├── research/
├── experiments/
├── projects/
├── articles/
├── people/
├── organizations/
├── opensource/
└── roadmap/
```

Singleton content:

```text
src/content/
├── site/
├── pages/
│   ├── about
│   ├── vision
│   └── sponsorship
└── settings/
```

Keystatic supports both collections and singletons for this model. Its Astro integration can expose content through Astro's content collections while Keystatic manages the underlying structured files.

---

# 15. Content Relationships

The content model should be relationship-first.

## Lab

```text
Lab
├── research[]
├── experiments[]
├── projects[]
├── articles[]
├── people[]
├── organizations[]
└── technologies[]
```

## Research

```text
Research
├── lab
├── experiments[]
├── projects[]
└── articles[]
```

## Experiment

```text
Experiment
├── lab
├── research[]
├── project?
└── articles[]
```

## Project

```text
Project
├── originLab?
├── research[]
├── experiments[]
├── articles[]
├── people[]
├── organizations[]
└── openSource[]
```

## Article

```text
Article
├── labs[]
├── research[]
├── experiments[]
├── projects[]
├── people[]
└── organizations[]
```

---

# 16. Content Lifecycle

The system should allow the following lifecycle:

```text
Idea
  ↓
Lab
  ↓
Research
  ↓
Experiment
  ↓
Validation
  ↓
Project
  ↓
Implementation
  ↓
Outcome
```

Possible outcomes:

```text
Internal Tool
Client Solution
Startup
Product
Open Source
Research Output
Archived
```

This lifecycle should be visible on relevant pages.

---

# 17. Homepage Specification

The homepage is the most important page.

It should immediately communicate what KCB Labs is.

## Hero

Recommended conceptual message:

> **We explore ideas that could become technology, products and companies.**

Supporting text should explain KCB Labs in one or two concise sentences.

Primary actions:

```text
Explore Labs
Explore Projects
```

Secondary action:

```text
Support the Labs
```

---

## 17.1 Current Labs

Display a curated selection of active Labs.

Example cards:

```text
AI Employees
Persistent research program exploring autonomous software workers.

LOCAL AI
Research into capable AI systems operating under constrained hardware.

AGENT SYSTEMS
Protocols and architectures for autonomous software agents.
```

---

## 17.2 Current Work

Create a "What we're working on" section.

Three states:

```text
EXPLORING
BUILDING
SHARING
```

Example:

```text
EXPLORING
Local AI on constrained hardware

BUILDING
OPERANT — AI Employee Framework

SHARING
HTTPA Agent Protocol
```

---

## 17.3 Projects

Show selected projects.

Each card should show:

```text
Project Name
One-line description
Type
Stage
Origin Lab
```

---

## 17.4 Research / Experiments

Highlight a small number of recent investigations.

Example:

```text
Research
Can useful document intelligence run within a 4GB memory budget?

Experiment
Benchmarking local language models under constrained hardware.
```

---

## 17.5 Journal

Show the latest articles.

Cards:

```text
Category
Title
Excerpt
Date
Reading time
Related Lab / Project
```

---

## 17.6 Numbers

Optional but recommended if meaningful:

```text
07
Labs

18
Experiments

06
Validated Projects

03
Open Source Projects
```

These numbers must be generated from actual content, never hard-coded.

---

## 17.7 Ecosystem

Show selected partners, collaborators and organizations.

Avoid making this resemble a traditional client logo wall.

Instead title it:

> **Built with an ecosystem**

---

## 17.8 Participate

Final homepage CTA:

> **Research is stronger when more people participate.**

Actions:

```text
Collaborate
Support the Labs
```

---

# 18. Lab Detail Page

URL:

```text
/labs/[slug]
```

Structure:

```text
Breadcrumb

Lab label
Title
Short description
Status

Overview

Why we're exploring this

Research

Experiments

Projects born from this Lab

People

Collaborators

Technologies

Related Journal

Timeline
```

A Lab page should feel like a dedicated research portal.

---

# 19. Project Detail Page

URL:

```text
/projects/[slug]
```

Header:

```text
Project
Project Name

Description

Type: Internal / Client / Startup / Collaboration
Stage: Implementation
Origin: AI Employees Lab
```

Sections:

```text
Overview
Problem
Context
What we discovered
Solution
Architecture
Current State
Roadmap
Outcomes
Research behind it
Experiments
Related Journal
People
Organizations
Open Source
Links
```

---

# 20. Research Detail Component

Research should have a highly readable editorial layout.

Recommended structure:

```text
Research Question

Context

Hypothesis

Approach

Evidence

Findings

Conclusion

Related Experiments

Related Projects
```

Large technical blocks should support Markdown / Markdoc components.

---

# 21. Experiment Detail

Recommended structure:

```text
Experiment

Objective

Hypothesis

Environment

Method

Results

Observations

What worked

What failed

Conclusion

Next step

Related Research

Related Project
```

Experiments should display their outcome clearly:

```text
VALIDATED
INCONCLUSIVE
FAILED
PARTIAL
```

Avoid treating "failed" as negative marketing; experimentation implies uncertainty.

---

# 22. Journal Article

Article layout:

```text
Category
Title
Excerpt
Author
Published date
Updated date
Reading time

Hero image

Article body

Related Lab
Related Research
Related Experiments
Related Projects

Previous / Next article
```

The article body must support:

- headings
- paragraphs
- lists
- blockquotes
- images
- captions
- code
- tables
- callouts
- links
- embedded media where justified

---

# 23. Search

The initial implementation may use a lightweight client-side search index generated from content.

Search should cover:

```text
Labs
Projects
Articles
Research
Experiments
People
Open Source
```

Results should show content type:

```text
LAB
AI Employees

PROJECT
OPERANT

ARTICLE
Building Autonomous Software Workers
```

Search should be implemented as a React island only where interactivity is required.

Do not turn the entire site into a React application.

---

# 24. Filtering

Explore pages should support filtering.

Projects:

```text
All
Internal
Client
Startup
Collaboration
Open Source
Research
```

Project stage:

```text
Idea
Validating
Validated
Implementation
Live
Completed
Spun Out
```

Labs:

```text
Active
Exploring
Paused
Archived
```

Filtering should progressively enhance a server-rendered page.

---

# 25. Astro Architecture

Use Astro as the primary application framework.

Recommended responsibilities:

```text
Astro
├── Routing
├── Layouts
├── Page rendering
├── SEO
├── Content rendering
├── Image optimization
├── Static generation / prerendering
└── Server integration for Keystatic
```

React should be used selectively.

Recommended React islands:

```text
Search
Filters
Interactive timelines
Interactive knowledge graph
Complex navigation interactions
Future data visualization
```

Do not build:

```text
Header
Footer
Article pages
Lab pages
Project pages
Static sections
```

as React applications unless there is a genuine interaction requirement.

---

# 26. Rendering Architecture

Keystatic requires server-side Node functionality when deployed. The official Astro + Keystatic integration documentation states that a server adapter is required for deployment because Keystatic needs server-side code and Node.js APIs.

Therefore the project should use:

```text
Astro
output: server

@astrojs/node
mode: standalone
```

Public content pages should be prerendered wherever practical.

Conceptually:

```text
Production Server
│
├── Static / prerendered public pages
│   ├── Home
│   ├── Labs
│   ├── Projects
│   ├── Journal
│   ├── About
│   └── Participate
│
└── Dynamic Node runtime
    └── Keystatic
```

Astro supports server output with per-route prerendering, allowing static content pages to remain pre-generated while server functionality remains available.

---

# 27. Suggested Astro Configuration

Conceptually:

```ts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),

  integrations: [
    react(),
    markdoc(),
    keystatic(),
  ],

  site: 'https://labs.kcb.ma',
});
```

The exact configuration must follow the versions of Astro and Keystatic actually installed by the implementation agent.

Do not blindly copy configuration from older documentation.

The Astro documentation explicitly warns that AI coding tools may use outdated Astro APIs and recommends MCP access to current documentation.

---

# 28. Keystatic Strategy

Keystatic should be treated as the structured content system, not merely as a blog editor.

The project should expose:

```text
/keystatic
```

for authorized editors.

Local development should use:

```text
storage:
  kind: local
```

Production should use GitHub-backed storage, preferably:

```text
storage:
  kind: github
```

This allows content edits to be committed to the repository.

Keystatic's GitHub mode authenticates users through GitHub and requires write access to the relevant repository. It uses generated environment variables and a GitHub App for authentication.

The production content workflow becomes:

```text
Editor
  ↓
Keystatic
  ↓
GitHub
  ↓
Content commit
  ↓
Coolify deployment
  ↓
Updated website
```

This is especially attractive for KCB Labs because the content remains version-controlled alongside the website code.

---

# 29. Keystatic Deployment Requirements

Production environment variables should include the variables required by the selected Keystatic storage/authentication mode.

For GitHub mode this includes the Keystatic GitHub authentication variables documented by Keystatic, including:

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

Actual values must be stored as Coolify secrets and never committed.

Keystatic's current GitHub documentation states that the deployed environment must be capable of running Node.js because Keystatic exposes API routes.

---

# 30. Content Storage

Recommended directory structure:

```text
src/
├── content/
│   ├── labs/
│   ├── research/
│   ├── experiments/
│   ├── projects/
│   ├── articles/
│   ├── people/
│   ├── organizations/
│   ├── opensource/
│   └── roadmap/
│
├── components/
│   ├── astro/
│   ├── react/
│   ├── cards/
│   ├── content/
│   ├── navigation/
│   ├── sections/
│   └── ui/
│
├── layouts/
├── pages/
├── lib/
├── styles/
└── assets/
```

---

# 31. Component Architecture

Create a reusable design system.

## Global

```text
SiteHeader
SiteFooter
Container
Section
Breadcrumbs
PageHeader
Prose
```

## Cards

```text
LabCard
ProjectCard
ArticleCard
ResearchCard
ExperimentCard
PersonCard
OrganizationCard
OpenSourceCard
```

## Metadata

```text
StatusBadge
TypeBadge
StageBadge
DateLabel
ReadingTime
RelationLabel
```

## Content

```text
RichContent
CodeBlock
Callout
Quote
ImageFigure
Timeline
Metric
ArchitectureDiagram
```

## Relationships

```text
RelatedLabs
RelatedProjects
RelatedResearch
RelatedExperiments
RelatedArticles
PeopleList
OrganizationList
```

---

# 32. Design Direction

The visual language should combine:

```text
Research Lab
+
Technology Company
+
Editorial Publication
```

Avoid:

```text
Agency
Generic SaaS
Corporate consulting company
Startup landing-page template
```

Desired characteristics:

- strong typography
- restrained visual palette
- editorial whitespace
- technical metadata
- subtle borders
- structured grids
- documentation-style information density
- carefully used animations
- diagrams and system visuals
- excellent mobile typography
- high visual consistency

The website should feel like:

> **A serious technical organization documenting real work.**

---

# 33. Design System

The implementation should establish design tokens for:

```text
Colors
Typography
Spacing
Radius
Borders
Shadows
Motion
Container widths
Breakpoints
Z-index
```

Avoid scattering literal values throughout components.

Prefer:

```css
--color-bg
--color-surface
--color-text
--color-muted
--color-accent
--border-subtle

--space-1
--space-2
--space-3
...

--radius-sm
--radius-md
--radius-lg
```

The design system must support dark and light themes if the final visual direction calls for both.

---

# 34. Typography

Typography is a primary brand element.

Recommended hierarchy:

```text
Display
H1
H2
H3
Body
Small
Metadata
Code
```

Technical metadata should use a complementary mono or technical typeface where appropriate.

Do not overuse monospace typography.

---

# 35. Motion

Motion must be subtle.

Suitable interactions:

```text
hover elevation
card reveal
navigation transitions
timeline progression
filter transitions
view transitions
```

Avoid:

```text
excessive parallax
large animated backgrounds
continuous motion
slow page transitions
decorative animation with no purpose
```

Respect:

```text
prefers-reduced-motion
```

---

# 36. Images and Media

Use Astro's image pipeline for local content images where possible.

Keystatic supports image fields and Astro's `<Image />` component can be used with appropriately configured Keystatic image storage.

Recommended asset groups:

```text
lab images
project covers
article hero images
people avatars
organization logos
diagrams
architecture visuals
```

All images must include:

```text
alt text
```

Decorative images must use an empty alt value where appropriate.

---

# 37. SEO

Every public page must have:

```text
title
description
canonical URL
Open Graph metadata
Twitter/X metadata
structured metadata where appropriate
```

Generate:

```text
sitemap.xml
robots.txt
RSS feed for Journal
```

Content types should use appropriate Schema.org data where useful:

```text
Organization
Article
Person
SoftwareSourceCode
Project
```

Do not generate structured data that does not accurately describe the content.

---

# 38. SEO URL Rules

Slugs must be:

- lowercase
- stable
- human readable
- English unless a future multilingual strategy changes this
- free of unnecessary IDs

Example:

```text
/labs/ai-employees
/projects/operant
/journal/building-ai-employees
```

Once published, slugs should not change without a redirect strategy.

---

# 39. Accessibility

Target WCAG 2.2 AA principles.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus state
- accessible menus
- sufficient contrast
- correct heading hierarchy
- descriptive links
- accessible forms
- image alt text
- screen-reader-friendly status indicators
- reduced-motion support

React islands must not make navigation or core content inaccessible when JavaScript fails.

---

# 40. Performance

Target:

```text
Excellent Core Web Vitals
Minimal JavaScript
Fast first render
Optimized images
Minimal client hydration
```

Rules:

1. Prefer Astro-rendered HTML.
2. Use React only for interactive islands.
3. Avoid large UI libraries unless justified.
4. Lazy-load below-the-fold images.
5. Avoid loading analytics before necessary.
6. Optimize fonts.
7. Avoid unnecessary external dependencies.
8. Keep JavaScript bundles measurable and small.

The site should remain usable on mid-range mobile devices and slower networks.

---

# 41. React Policy

Every proposed React component must answer:

> Does this component require client-side interactivity?

If no:

```text
Build it in Astro.
```

If yes:

```text
Build it as a React island.
```

Preferred hydration:

```text
client:load
client:idle
client:visible
```

Use the least aggressive hydration strategy that satisfies the feature.

---

# 42. MCP / AI Development Architecture

The repository must be optimized for AI coding agents.

Astro's official MCP server should be configured:

```json
{
  "mcpServers": {
    "Astro docs": {
      "type": "http",
      "url": "https://mcp.docs.astro.build/mcp"
    }
  }
}
```

Astro documents this MCP endpoint and provides setup instructions for multiple AI coding environments, including OpenCode, Zed, Claude Code, Codex and others.

---

# 43. AI Agent Repository Instructions

The repository must contain explicit AI instructions.

Recommended:

```text
AGENTS.md
ARCHITECTURE.md
DESIGN-SYSTEM.md
CONTENT-MODEL.md
DEPLOYMENT.md
CONTRIBUTING.md
```

## AGENTS.md

Must explain:

```text
Project purpose
Technology stack
Repository structure
Architecture rules
Astro rules
React rules
Keystatic rules
Content model
Design system rules
Testing requirements
Deployment requirements
MCP requirement
Forbidden patterns
```

---

# 44. AI Coding Rules

AI agents must:

1. Use Astro MCP for Astro-related technical decisions.
2. Inspect existing code before creating new abstractions.
3. Reuse existing components.
4. Follow the domain model.
5. Avoid introducing dependencies without justification.
6. Keep React scoped to interactive components.
7. Maintain accessibility.
8. Run tests and build before completing a task.
9. Never modify production secrets.
10. Never hard-code content that belongs in Keystatic.
11. Never invent relationship IDs.
12. Preserve URL stability.
13. Keep generated code consistent with the design system.

---

# 45. AI Development Workflow

Every feature should follow:

```text
1. Understand
2. Inspect repository
3. Consult MCP documentation
4. Design
5. Implement
6. Test
7. Build
8. Review
9. Commit
```

For larger work:

```text
Requirement
    ↓
Architecture decision
    ↓
Implementation plan
    ↓
Small changes
    ↓
Tests
    ↓
Visual verification
    ↓
Build verification
```

AI agents should not make broad architectural changes merely to simplify a local task.

---

# 46. MCP Sources

Recommended MCP ecosystem:

```text
Astro Docs MCP
GitHub MCP
Project-specific tools as required
```

Potential future MCPs:

```text
Figma
GitHub
Coolify
Analytics
Issue tracker
Documentation
```

Only add MCP servers that materially improve development workflows.

---

# 47. Repository Structure for AI Agents

Recommended:

```text
.
├── AGENTS.md
├── ARCHITECTURE.md
├── CONTENT-MODEL.md
├── DESIGN-SYSTEM.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
│
├── astro.config.ts
├── keystatic.config.ts
├── package.json
├── tsconfig.json
│
├── Dockerfile
├── .dockerignore
├── .gitignore
│
├── public/
│
└── src/
    ├── assets/
    ├── components/
    ├── content/
    ├── layouts/
    ├── lib/
    ├── pages/
    └── styles/
```

---

# 48. Data Access Layer

Do not scatter content querying logic throughout page files.

Create helpers:

```text
src/lib/content/
├── labs.ts
├── projects.ts
├── research.ts
├── experiments.ts
├── articles.ts
├── people.ts
├── organizations.ts
└── relationships.ts
```

Example responsibilities:

```text
getLabs()
getActiveLabs()
getLabBySlug()
getProjects()
getProjectsByLab()
getArticlesByLab()
getResearchByLab()
getExperimentsByResearch()
getRelatedProjects()
getRelatedArticles()
```

This makes the relationship system easier for AI agents to understand and maintain.

---

# 49. Keystatic Schema Principles

Schemas should distinguish:

### Required identity fields

```text
title
slug
description
status
```

### Publishing

```text
published
publishedAt
updatedAt
```

### Relationships

```text
labs
projects
research
experiments
people
organizations
```

### Metadata

```text
featured
priority
tags
```

### SEO

```text
seoTitle
seoDescription
socialImage
```

Do not duplicate values unnecessarily.

For example, project slugs should be generated from the project title but remain editable and stable.

---

# 50. Publishing State

Content must support draft/published behavior.

Recommended:

```text
draft
published
archived
```

Only `published` content should appear in public indexes.

The implementation must ensure that draft content cannot accidentally appear on public pages.

---

# 51. Relationship Validation

The build process should validate relationships.

Examples:

```text
Project references nonexistent Lab
Article references nonexistent Project
Experiment references nonexistent Research
```

must produce build errors or explicit validation warnings.

Broken relationships should never silently render as empty content.

---

# 52. Content Quality Rules

Every public entity should have:

```text
Title
Short description
Status
Date or year
Relevant relationships
SEO metadata
```

Content should avoid placeholder text in production.

---

# 53. Coolify Deployment Architecture

The application will be deployed to Coolify.

Coolify supports applications deployed as containers and provides build options including Nixpacks, static build packs, Dockerfile and Docker Compose.

Because this project includes Keystatic server functionality, the recommended deployment is:

```text
GitHub
   ↓
Coolify
   ↓
Dockerfile
   ↓
Node.js / Astro
   ↓
labs.kcb.ma
```

Do **not** deploy this project as a purely static Coolify site because the production Keystatic administration requires server-side functionality. Keystatic's Astro integration explicitly requires an Astro adapter for deployment.

---

# 54. Docker Deployment

Recommended multi-stage Docker build:

```text
Stage 1
Node image
↓
Install dependencies
↓
Build Astro

Stage 2
Node runtime image
↓
Copy production build
↓
Run Astro Node server
```

The final image should contain only what is necessary to serve the application.

Preferred production command:

```text
node ./dist/server/entry.mjs
```

The exact generated entry point must be verified against the installed Astro Node adapter version.

---

# 55. Coolify Configuration

Create a Coolify Application connected to the Git repository.

Recommended:

```text
Build Pack:
Dockerfile

Domain:
https://labs.kcb.ma

Port:
4321

Auto Deploy:
Enabled

HTTPS:
Enabled
```

The application should expose its Node server on the configured port.

Coolify creates and manages the application container and can route an assigned domain to the application.

---

# 56. Coolify Environment Variables

Production secrets should be configured through Coolify.

Expected variables depend on the selected Keystatic strategy.

For GitHub-backed Keystatic:

```text
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```

Additional application variables may include:

```text
PUBLIC_SITE_URL=https://labs.kcb.ma
```

Never commit:

```text
.env
.env.production
credentials
GitHub secrets
API keys
private tokens
```

---

# 57. GitHub + Coolify Content Workflow

Recommended publishing flow:

```text
Editor
  │
  ▼
Keystatic /keystatic
  │
  ▼
GitHub repository
  │
  ▼
Content commit
  │
  ▼
Coolify webhook
  │
  ▼
Docker build
  │
  ▼
Deployment
  │
  ▼
labs.kcb.ma
```

This provides version control for every content change.

Keystatic's GitHub mode is specifically designed to read/write the connected repository and authenticate collaborators through GitHub.

---

# 58. Deployment Health Check

Coolify should use a simple health endpoint:

```text
/api/health
```

Response:

```json
{
  "status": "ok"
}
```

The endpoint should not depend on third-party services.

---

# 59. Error Handling

Implement:

```text
404 page
500 page
content-not-found handling
broken relation handling
```

404 page should remain on-brand.

Example:

> **This path hasn't become a project yet.**

This is preferable to a generic technical error.

---

# 60. Analytics

Analytics should be privacy-conscious.

The initial implementation can support:

```text
Plausible
Umami
Cloudflare Web Analytics
```

The analytics provider should be abstracted so changing providers does not require modifying the content architecture.

Track only useful events such as:

```text
project viewed
lab viewed
article viewed
GitHub clicked
sponsorship clicked
collaboration submitted
```

---

# 61. Contact / Collaboration

The collaboration page should communicate the types of participation KCB welcomes:

```text
Research collaboration
Technology collaboration
Project collaboration
Startup collaboration
Open-source contribution
Sponsorship
```

The form should collect only necessary information:

```text
Name
Organization
Email
Interest
Message
```

Form submission must have spam protection and server-side validation.

---

# 62. Sponsorship

Sponsorship page should focus on supporting research and innovation.

Positioning:

> **Support independent technology research and experimentation.**

Potential sponsorship models:

```text
Research Supporter
Lab Sponsor
Project Sponsor
Technology Partner
Strategic Partner
```

Content should explain what support enables:

```text
Research
Experiments
Infrastructure
Open Source
Prototyping
Research collaborations
Technology transfer
```

Avoid turning the page into a generic donation page.

---

# 63. Security

Security requirements:

- HTTPS only
- secure cookies
- environment variables for secrets
- server-side validation
- no sensitive data in client bundles
- restricted Keystatic access
- no indexing of `/keystatic`
- appropriate HTTP security headers
- dependency auditing
- regular package updates

Keystatic's own documentation describes approaches for preventing its admin routes from being deployed/indexed when those routes are not intended for production access.

For this project, however, production Keystatic is required, so the route must remain deployed and be protected through its authentication mechanism rather than simply disabled.

---

# 64. Robots / Indexing

Public:

```text
/
 /labs/*
 /projects/*
 /journal/*
 /about/*
 /participate/*
```

Do not index:

```text
/keystatic/*
/api/*
```

The implementation should verify that private/admin routes are excluded from sitemap generation and use appropriate robots directives.

---

# 65. Testing Strategy

## Unit

Test:

```text
content relationships
status filtering
sorting
URL generation
utility functions
```

## Integration

Test:

```text
content collection loading
Keystatic schemas
relationship resolution
RSS generation
sitemap generation
```

## End-to-end

Test:

```text
homepage
lab navigation
project navigation
journal navigation
search
filters
contact
Keystatic login flow where practical
```

## Visual

Perform responsive verification for:

```text
mobile
tablet
desktop
large desktop
```

---

# 66. Build Verification

Every completed AI coding task must run:

```bash
npm run check
npm run build
```

If configured:

```bash
npm run test
npm run test:e2e
```

No task should be considered complete while the production build fails.

---

# 67. CI/CD

Recommended GitHub workflow:

```text
Pull Request
    ↓
Install dependencies
    ↓
Type check
    ↓
Lint
    ↓
Tests
    ↓
Astro build
    ↓
Merge
    ↓
Coolify deployment
```

Coolify should automatically deploy the production branch after successful repository updates.

---

# 68. Branch Strategy

Recommended:

```text
main
develop
feature/*
fix/*
content/*
```

For simple development, `main + feature branches` is sufficient.

Do not unnecessarily complicate Git workflows.

---

# 69. AI Agent Task Model

AI coding tasks should be expressed in terms of outcomes.

Example:

```text
TASK

Create the Lab detail page.

Requirements:
- Use the existing Lab content schema.
- Display status and metadata.
- Display related Research.
- Display related Experiments.
- Display related Projects.
- Display related Journal articles.
- Reuse existing cards.
- Maintain responsive layout.
- Do not create React components unless interaction requires them.
- Validate against current Astro documentation through MCP.
- Run type checking and production build.
```

This format should be included in the repository's development documentation.

---

# 70. Implementation Phases

## Phase 1 — Foundation

Implement:

```text
Astro
React
Keystatic
TypeScript
Node adapter
Design tokens
Base layouts
Navigation
Footer
MCP configuration
Dockerfile
Coolify configuration
```

Deliverable:

> Empty but production-ready website shell.

---

## Phase 2 — Content Model

Implement:

```text
Labs
Research
Experiments
Projects
Articles
People
Organizations
Open Source
Roadmap
```

Create schemas and relationship helpers.

Deliverable:

> Complete structured CMS.

---

## Phase 3 — Core Public Pages

Build:

```text
Home
Labs index
Lab detail
Projects index
Project detail
Journal index
Article detail
Open Source
```

Deliverable:

> Fully navigable core website.

---

## Phase 4 — Institutional Pages

Build:

```text
About
Vision
People
Ecosystem
Roadmap
Sponsorship
Collaboration
Contact
```

---

## Phase 5 — Interactive Features

Build:

```text
Search
Filtering
Related content discovery
Timeline
Optional knowledge graph
```

Only introduce React where necessary.

---

## Phase 6 — Production Hardening

Implement:

```text
SEO
Sitemap
RSS
Accessibility
Performance optimization
Security headers
Analytics
Error pages
Health endpoint
CI
Docker optimization
Coolify deployment
```

---

# 71. MVP Definition

The MVP is complete when the following exists.

### Public

```text
Homepage
Labs
Projects
Journal
About
Vision
Sponsorship
Collaboration
Contact
```

### Content

```text
Labs
Research
Experiments
Projects
Articles
People
Organizations
Open Source
```

### Relationships

```text
Lab ↔ Research
Lab ↔ Experiment
Lab ↔ Project
Project ↔ Research
Project ↔ Experiment
Article ↔ Lab
Article ↔ Project
People ↔ Labs
People ↔ Projects
Organizations ↔ Projects
```

### Technical

```text
Astro
React
Keystatic
Node adapter
Docker
Coolify
MCP
TypeScript
Responsive design
SEO
Accessibility
```

---

# 72. Definition of Done

The website is production-ready when:

- all primary routes work
- all content collections validate
- relationships resolve correctly
- no broken links exist
- responsive layouts work
- keyboard navigation works
- SEO metadata is present
- sitemap works
- RSS works
- production build succeeds
- Docker image builds
- Coolify deployment succeeds
- Keystatic is accessible to authorized editors
- GitHub content workflow works
- public pages do not expose secrets
- `/keystatic` is not publicly indexed
- search works
- filters work
- 404 and 500 experiences are implemented
- Lighthouse/Core Web Vitals are acceptable
- AI agents can understand the repository architecture from `AGENTS.md` and associated specifications

---

# 73. Future Extensions

The architecture should allow future additions without restructuring the core model.

Potential future features:

```text
Programs
Research papers
Datasets
Technology taxonomy
Events
Labs newsletter
Community
Funding opportunities
Research challenges
Public roadmap milestones
Interactive knowledge graph
Project metrics
Open experiments
Contributors
Research partners
```

Potential future top-level areas should not be added until they have enough content to justify navigation.

---

# 74. Future Knowledge Graph

The content architecture should eventually support a visual graph:

```text
                    PEOPLE
                      │
                      │
ORGANIZATIONS ────── LAB ────── TECHNOLOGIES
                      │
              ┌───────┼────────┐
              │       │        │
           RESEARCH EXPERIMENT PROJECT
              │       │        │
              └───────┼────────┘
                      │
                  OPEN SOURCE
                      │
                   JOURNAL
```

This should be treated as a future visualization layer, not as the primary navigation model.

---

# 75. Final Product Model

The essential KCB Labs model is:

```text
                    KCB LABS
                       │
                       ▼
                      LAB
                       │
            ┌──────────┴──────────┐
            │                     │
         RESEARCH             EXPERIMENT
            │                     │
            └──────────┬──────────┘
                       ▼
                   VALIDATION
                       │
                       ▼
                    PROJECT
                       │
         ┌─────────────┼─────────────┐
         │             │             │
      INTERNAL       CLIENT        STARTUP
         │             │             │
         └─────────────┼─────────────┘
                       ▼
             PRODUCT / SOLUTION / IMPACT
                       │
                       ▼
                  OPEN SOURCE
```

Across the entire system:

```text
PEOPLE
ORGANIZATIONS
TECHNOLOGIES
JOURNAL
```

provide the human, ecosystem, technical and editorial context.

---

# 76. Architectural Principle

The most important implementation decision is:

> **Do not build a website that merely displays KCB's work. Build a structured system capable of explaining how KCB's work evolves.**

The site should allow a visitor to move naturally from:

```text
Article
   ↓
Lab
   ↓
Research
   ↓
Experiment
   ↓
Project
   ↓
Startup / Product / Solution / Open Source
```

and also in reverse:

```text
Project
   ↓
Why it exists
   ↓
Research
   ↓
Experiments
   ↓
Lab
```

This relationship model is the core intellectual architecture of `labs.kcb.ma`.

---

# 77. Primary Technology Decisions

| Area | Decision |
|---|---|
| Framework | Astro |
| UI framework | React |
| Language | TypeScript |
| CMS | Keystatic |
| Content format | Markdoc / Markdown-based structured content |
| Rendering | Astro server output with prerendering for public pages |
| Server adapter | `@astrojs/node` |
| Admin | Keystatic |
| Production storage | GitHub-backed Keystatic |
| Source control | GitHub |
| Deployment | Coolify |
| Container | Docker |
| AI development | MCP-enabled coding agents |
| Astro knowledge | Official Astro Docs MCP |
| SEO | Astro-native metadata/sitemap/RSS architecture |
| Search | Generated content index + React island |
| Analytics | Privacy-conscious provider |
| Database | None required initially |
| Authentication | Keystatic/GitHub for CMS |
| Primary domain | `https://labs.kcb.ma` |

Keystatic is explicitly designed around codebase-managed content and supports local, GitHub and cloud storage modes; its Astro integration is designed to work with Astro content collections and requires a server adapter for deployed server-side functionality.

Coolify's Docker-based application model is suitable for this Node-powered deployment, while its static build pack should be reserved for genuinely static Astro deployments.

---

# 78. First AI Coding Agent Instruction

The first implementation agent should not immediately build the homepage.

It should first produce:

```text
1. Astro project foundation
2. Keystatic configuration
3. Content schemas
4. Relationship utilities
5. Design tokens
6. Core layout
7. AGENTS.md
8. Architecture documentation
9. Docker deployment
10. MCP configuration
```

Only after these foundations are validated should the agent implement the visual pages.

This prevents the common failure mode where an AI agent produces a beautiful homepage but creates an inconsistent content architecture that becomes difficult to maintain.

---

# 79. Initial Success Criterion

The first production version should make a visitor understand, within approximately 30 seconds:

> **KCB Labs explores technology through Labs, turns questions into research and experiments, and turns validated discoveries into projects, products, startups and open-source work.**

Everything in the site's architecture, content model and visual language should reinforce that idea.