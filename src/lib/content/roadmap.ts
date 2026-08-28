import { readCollection, filterPublished, sortByPriority } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type RoadmapEntry = { slug: string; data: Frontmatter; content: string };

export function getRoadmaps(opts?: { includeDrafts?: boolean }): RoadmapEntry[] {
  const all = readCollection("src/content/roadmap") as RoadmapEntry[];
  const filtered = filterPublished(all, opts);
  // Sort by period ascending (2026, 2027...)
  const sorted = [...filtered].sort((a, b) => {
    const pa = (a.data.period as string) ?? a.slug;
    const pb = (b.data.period as string) ?? b.slug;
    return pa.localeCompare(pb);
  });
  return sortByPriority(sorted) as RoadmapEntry[];
}

export function getRoadmapBySlug(slug: string, opts?: { includeDrafts?: boolean }): RoadmapEntry | undefined {
  return getRoadmaps(opts).find((r) => r.slug === slug);
}
