import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type OpenSource = { slug: string; data: Frontmatter; content: string };

export function getOpenSource(opts?: { includeDrafts?: boolean }): OpenSource[] {
  const all = readCollection("src/content/opensource") as OpenSource[];
  return sortByPriority(filterPublished(all, opts));
}

export function getOpenSourceBySlug(slug: string, opts?: { includeDrafts?: boolean }): OpenSource | undefined {
  return getOpenSource(opts).find((o) => o.slug === slug);
}

export function getOpenSourceByLab(labSlug: string, opts?: { includeDrafts?: boolean }): OpenSource[] {
  return getOpenSource(opts).filter((o) => o.data.originLab === labSlug);
}

export function getOpenSourceByProject(projectSlug: string, opts?: { includeDrafts?: boolean }): OpenSource[] {
  return getOpenSource(opts).filter((o) => o.data.relatedProject === projectSlug);
}
