import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Person = { slug: string; data: Frontmatter; content: string };

export function getPeople(opts?: { includeDrafts?: boolean }): Person[] {
  const all = readCollection("src/content/people") as Person[];
  return sortByPriority(filterPublished(all, opts));
}

export function getPersonBySlug(slug: string, opts?: { includeDrafts?: boolean }): Person | undefined {
  return getPeople(opts).find((p) => p.slug === slug);
}

export function getPeopleByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Person[] {
  return getPeople(opts).filter((p) => {
    const arr = (p.data.relatedLabs as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(labSlug);
  });
}

export function getPeopleByProject(projectSlug: string, opts?: { includeDrafts?: boolean }): Person[] {
  return getPeople(opts).filter((p) => {
    const arr = (p.data.relatedProjects as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(projectSlug);
  });
}
