import { readCollection, filterPublished, sortByPriority, calculateReadingTime } from "./utils.js";
import type { Frontmatter } from "./utils.js";

export type Article = { slug: string; data: Frontmatter; content: string; readingTime?: number };

function withReadingTime(items: Article[]): Article[] {
  return items.map((a) => ({ ...a, readingTime: calculateReadingTime(a.content + " " + (a.data.title ?? "")) }));
}

export function getArticles(opts?: { includeDrafts?: boolean }): Article[] {
  const all = readCollection("src/content/articles") as Article[];
  const filtered = filterPublished(all, opts);
  const sorted = [...filtered].sort((a, b) => {
    const da = (a.data.publishedAt as string) ?? "";
    const db = (b.data.publishedAt as string) ?? "";
    return db.localeCompare(da);
  });
  return withReadingTime(sortByPriority(sorted) as Article[]);
}

export function getArticleBySlug(slug: string, opts?: { includeDrafts?: boolean }): Article | undefined {
  return getArticles(opts).find((a) => a.slug === slug);
}

export function getArticlesByLab(labSlug: string, opts?: { includeDrafts?: boolean }): Article[] {
  return getArticles(opts).filter((a) => {
    const arr = (a.data.labs as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(labSlug);
  });
}

export function getArticlesByProject(projectSlug: string, opts?: { includeDrafts?: boolean }): Article[] {
  return getArticles(opts).filter((a) => {
    const arr = (a.data.projects as string[] | undefined) ?? [];
    return Array.isArray(arr) && arr.includes(projectSlug);
  });
}

export function getPreviousNextArticle(slug: string, opts?: { includeDrafts?: boolean }): { previous?: Article; next?: Article } {
  const all = getArticles(opts);
  // getArticles is sorted descending publishedAt, but for prev/next we need chronological
  const sortedAsc = [...all].sort((a, b) => {
    const da = (a.data.publishedAt as string) ?? "";
    const db = (b.data.publishedAt as string) ?? "";
    return da.localeCompare(db);
  });
  const idx = sortedAsc.findIndex((a) => a.slug === slug);
  if (idx === -1) return {};
  return { previous: sortedAsc[idx - 1], next: sortedAsc[idx + 1] };
}

export function getReadingTime(markdown: string): number {
  return calculateReadingTime(markdown);
}

export function getReadingTimeForArticle(slug: string): number | undefined {
  const a = getArticleBySlug(slug, { includeDrafts: true });
  return a ? calculateReadingTime(a.content) : undefined;
}
