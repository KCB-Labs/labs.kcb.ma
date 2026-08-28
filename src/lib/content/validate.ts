import { getLabs } from "./labs.js";
import { getResearch } from "./research.js";
import { getExperiments } from "./experiments.js";
import { getProjects } from "./projects.js";
import { getArticles } from "./articles.js";
import { getPeople } from "./people.js";
import { getOrganizations } from "./organizations.js";
import { getOpenSource } from "./opensource.js";

/**
 * Validate all relationship references.
 * Throws with descriptive message naming broken relation, e.g.:
 *   Project "operant" references nonexistent Lab "ai-employes"
 * Called at build time (validate.ts) and in tests. Never silently renders empty.
 */
export function validate(): void {
  const labs = new Set(getLabs({ includeDrafts: true }).map((l) => l.slug));
  const researchSet = new Set(getResearch({ includeDrafts: true }).map((r) => r.slug));
  const experimentsSet = new Set(getExperiments({ includeDrafts: true }).map((e) => e.slug));
  const projectsSet = new Set(getProjects({ includeDrafts: true }).map((p) => p.slug));
  const peopleSet = new Set(getPeople({ includeDrafts: true }).map((p) => p.slug));
  const orgsSet = new Set(getOrganizations({ includeDrafts: true }).map((o) => o.slug));

  const check = (kind: string, slug: string, field: string, target: string, set: Set<string>) => {
    if (!set.has(target)) {
      throw new Error(`${kind} "${slug}" references nonexistent ${field} "${target}"`);
    }
  };

  const maybeCheck = (kind: string, slug: string, field: string, target: string | undefined | null, set: Set<string>) => {
    if (target) check(kind, slug, field, target, set);
  };

  const checkArray = (kind: string, slug: string, field: string, arr: string[] | undefined, set: Set<string>) => {
    for (const t of arr ?? []) check(kind, slug, field, t, set);
  };

  // Labs
  for (const lab of getLabs({ includeDrafts: true })) {
    checkArray("Lab", lab.slug, "Research", lab.data.research as string[] | undefined, researchSet);
    checkArray("Lab", lab.slug, "Experiments", lab.data.experiments as string[] | undefined, experimentsSet);
    checkArray("Lab", lab.slug, "Projects", lab.data.projects as string[] | undefined, projectsSet);
  }

  // Research
  for (const r of getResearch({ includeDrafts: true })) {
    maybeCheck("Research", r.slug, "Lab", r.data.lab as string | undefined, labs);
    checkArray("Research", r.slug, "Experiments", r.data.experiments as string[] | undefined, experimentsSet);
    checkArray("Research", r.slug, "Projects", r.data.projects as string[] | undefined, projectsSet);
  }

  // Experiments
  for (const e of getExperiments({ includeDrafts: true })) {
    maybeCheck("Experiment", e.slug, "Lab", e.data.lab as string | undefined, labs);
    checkArray("Experiment", e.slug, "Research", e.data.research as string[] | undefined, researchSet);
    maybeCheck("Experiment", e.slug, "Project", e.data.project as string | undefined, projectsSet);
  }

  // Projects
  for (const p of getProjects({ includeDrafts: true })) {
    maybeCheck("Project", p.slug, "Lab", p.data.originLab as string | undefined, labs);
    checkArray("Project", p.slug, "Research", p.data.research as string[] | undefined, researchSet);
    checkArray("Project", p.slug, "Experiments", p.data.experiments as string[] | undefined, experimentsSet);
  }

  // Articles
  for (const a of getArticles({ includeDrafts: true })) {
    maybeCheck("Article", a.slug, "Author", a.data.author as string | undefined, peopleSet);
    checkArray("Article", a.slug, "Labs", a.data.labs as string[] | undefined, labs);
    checkArray("Article", a.slug, "Research", a.data.research as string[] | undefined, researchSet);
    checkArray("Article", a.slug, "Experiments", a.data.experiments as string[] | undefined, experimentsSet);
    checkArray("Article", a.slug, "Projects", a.data.projects as string[] | undefined, projectsSet);
    checkArray("Article", a.slug, "People", a.data.people as string[] | undefined, peopleSet);
    checkArray("Article", a.slug, "Organizations", a.data.organizations as string[] | undefined, orgsSet);
  }

  // People
  for (const person of getPeople({ includeDrafts: true })) {
    checkArray("Person", person.slug, "Labs", person.data.relatedLabs as string[] | undefined, labs);
    checkArray("Person", person.slug, "Projects", person.data.relatedProjects as string[] | undefined, projectsSet);
  }

  // Organizations
  for (const org of getOrganizations({ includeDrafts: true })) {
    checkArray("Organization", org.slug, "Labs", org.data.relatedLabs as string[] | undefined, labs);
    checkArray("Organization", org.slug, "Projects", org.data.relatedProjects as string[] | undefined, projectsSet);
  }

  // OpenSource
  for (const os of getOpenSource({ includeDrafts: true })) {
    maybeCheck("OpenSource", os.slug, "Lab", os.data.originLab as string | undefined, labs);
    maybeCheck("OpenSource", os.slug, "Project", os.data.relatedProject as string | undefined, projectsSet);
  }

  // Roadmap has no relationships — no checks
}
