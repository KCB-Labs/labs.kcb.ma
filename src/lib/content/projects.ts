import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Project = { slug: string; data: Frontmatter; content: string };

export function getProjects(opts?: { includeDrafts?: boolean }): Project[] {
  const all = readCollection("src/content/projects") as Project[];
  return sortByPriority(filterPublished(all, opts));
}

export function getProjectBySlug(slug: string, opts?: { includeDrafts?: boolean }): Project | undefined {
  return getProjects(opts).find((p) => p.slug === slug);
}

export function getProjectsByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Project[] {
  return getProjects(opts).filter((p) => {
    if (p.data.originLab === labSlug) return true;
    return false;
  });
}

export function getProjectByExperiment(expSlug: string, opts?: { includeDrafts?: boolean }): Project | undefined {
  return getProjects(opts).find((p) => {
    const arr = (p.data.experiments as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(expSlug);
  });
}
