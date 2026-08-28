import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Organization = { slug: string; data: Frontmatter; content: string };

export function getOrganizations(opts?: { includeDrafts?: boolean }): Organization[] {
  const all = readCollection("src/content/organizations") as Organization[];
  return sortByPriority(filterPublished(all, opts));
}

export function getOrganizationBySlug(slug: string, opts?: { includeDrafts?: boolean }): Organization | undefined {
  return getOrganizations(opts).find((o) => o.slug === slug);
}

export function getOrganizationsByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Organization[] {
  return getOrganizations(opts).filter((o) => {
    const arr = (o.data.relatedLabs as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(labSlug);
  });
}

export function getOrganizationsByProject(projectSlug: string, opts?: { includeDrafts?: boolean }): Organization[] {
  return getOrganizations(opts).filter((o) => {
    const arr = (o.data.relatedProjects as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(projectSlug);
  });
}
