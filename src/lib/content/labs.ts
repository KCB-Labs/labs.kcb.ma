import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Lab = { slug: string; data: Frontmatter; content: string };

export function getLabs(opts?: { includeDrafts?: boolean }): Lab[] {
  const all = readCollection("src/content/labs") as Lab[];
  return sortByPriority(filterPublished(all, opts));
}

export function getLabBySlug(slug: string, opts?: { includeDrafts?: boolean }): Lab | undefined {
  return getLabs(opts).find((l) => l.slug === slug);
}

export function getActiveLabs(opts?: { includeDrafts?: boolean }): Lab[] {
  return getLabs(opts).filter((l) => l.data.status === "active");
}
