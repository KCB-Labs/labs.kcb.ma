/**
 * Slug helpers — lowercase, stable, human-readable, English, no IDs.
 * Per spec §38: generated from title but remains editable and stable.
 */

export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Assert that a published entry's slug has not accidentally changed.
 * Throws if publishedSlug !== proposedSlug and publishedSlug is truthy.
 * Call before saving a published entry: assertSlugStable(existingSlug, newSlugFromTitle).
 */
export function assertSlugStable(publishedSlug: string | undefined, proposedSlug: string): void {
  if (publishedSlug && publishedSlug !== proposedSlug) {
    throw new Error(`Slug stability violation: published slug "${publishedSlug}" cannot be changed to "${proposedSlug}" without redirect strategy`);
  }
}

/**
 * Generate slug from title with explicit override support.
 * If explicitSlug is provided and non-empty, use it (editable); otherwise slugify title.
 */
export function generateSlug(title: string, explicitSlug?: string): string {
  if (explicitSlug && explicitSlug.trim()) return explicitSlug.trim().toLowerCase();
  return slugify(title);
}
