import { getLabs } from "./labs.js";
import { getResearch, getResearchByLab } from "./research.js";
import { getExperiments, getExperimentsByLab, getExperimentsByResearch } from "./experiments.js";
import { getProjects, getProjectsByLab } from "./projects.js";
import { getArticles, getArticlesByLab, getArticlesByProject } from "./articles.js";
import { getPeople } from "./people.js";
import { getOrganizations } from "./organizations.js";
import { getOpenSource } from "./opensource.js";

// Re-export helpers for convenience
export { getLabs, getResearchByLab, getExperimentsByLab, getExperimentsByResearch, getProjectsByLab, getArticlesByLab, getArticlesByProject };

export function getRelatedLabs(slug: string, opts?: { includeDrafts?: boolean }) {
  // For lab slug, return related labs? Here just example: return all labs except self
  return getLabs(opts).filter((l) => l.slug !== slug);
}

export function getRelatedResearch(slug: string, opts?: { includeDrafts?: boolean }) {
  return getResearchByLab(slug, opts);
}

export function getRelatedExperiments(slug: string, opts?: { includeDrafts?: boolean }) {
  return getExperimentsByLab(slug, opts);
}

export function getRelatedProjects(slug: string, opts?: { includeDrafts?: boolean }) {
  // slug could be lab slug
  return getProjectsByLab(slug, opts);
}

export function getRelatedArticlesForLab(labSlug: string, opts?: { includeDrafts?: boolean }) {
  return getArticlesByLab(labSlug, opts);
}

export function getRelatedArticlesForProject(projectSlug: string, opts?: { includeDrafts?: boolean }) {
  return getArticlesByProject(projectSlug, opts);
}

export function getKnowledgeGraphData(opts?: { includeDrafts?: boolean }) {
  const labs = getLabs(opts);
  const research = getResearch(opts);
  const experiments = getExperiments(opts);
  const projects = getProjects(opts);
  const articles = getArticles(opts);
  const people = getPeople(opts);
  const organizations = getOrganizations(opts);
  const opensource = getOpenSource(opts);

  const nodes = {
    labs: labs.map((l) => l.slug),
    research: research.map((r) => r.slug),
    experiments: experiments.map((e) => e.slug),
    projects: projects.map((p) => p.slug),
    articles: articles.map((a) => a.slug),
    people: people.map((p) => p.slug),
    organizations: organizations.map((o) => o.slug),
    opensource: opensource.map((o) => o.slug),
  };

  const edges: Array<{ from: string; to: string; type: string }> = [];

  for (const r of research) {
    if (r.data.lab) edges.push({ from: r.slug, to: r.data.lab as string, type: "research→lab" });
  }
  for (const e of experiments) {
    if (e.data.lab) edges.push({ from: e.slug, to: e.data.lab as string, type: "experiment→lab" });
    for (const rs of (e.data.research as string[] | undefined) ?? []) edges.push({ from: e.slug, to: rs, type: "experiment→research" });
    if (e.data.project) edges.push({ from: e.slug, to: e.data.project as string, type: "experiment→project" });
  }
  for (const p of projects) {
    if (p.data.originLab) edges.push({ from: p.slug, to: p.data.originLab as string, type: "project→lab" });
  }

  return { nodes, edges };
}
