import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Experiment = { slug: string; data: Frontmatter; content: string };

export function getExperiments(opts?: { includeDrafts?: boolean }): Experiment[] {
  const all = readCollection("src/content/experiments") as Experiment[];
  return sortByPriority(filterPublished(all, opts));
}

export function getExperimentBySlug(slug: string, opts?: { includeDrafts?: boolean }): Experiment | undefined {
  return getExperiments(opts).find((e) => e.slug === slug);
}

export function getExperimentsByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Experiment[] {
  return getExperiments(opts).filter((e) => e.data.lab === labSlug);
}

export function getExperimentsByResearch(researchSlug: string, opts?: { includeDrafts?: boolean }): Experiment[] {
  return getExperiments(opts).filter((e) => {
    const arr = (e.data.research as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(researchSlug);
  });
}
