import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Research = { slug: string; data: Frontmatter; content: string };

export function getResearch(opts?: { includeDrafts?: boolean }): Research[] {
  const all = readCollection("src/content/research") as Research[];
  return sortByPriority(filterPublished(all, opts));
}

export function getResearchBySlug(slug: string, opts?: { includeDrafts?: boolean }): Research | undefined {
  return getResearch(opts).find((r) => r.slug === slug);
}

export function getResearchByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Research[] {
  return getResearch(opts).filter((r) => r.data.lab === labSlug);
}
