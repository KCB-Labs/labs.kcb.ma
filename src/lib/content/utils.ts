import fs from "node:fs";
import path from "node:path";

export type Frontmatter = Record<string, unknown> & {
  title?: string;
  description?: string;
  status?: string;
  published?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  content?: string;
  ratingKnowledge?: number;
  ratingCreativity?: number;
  ratingBusiness?: number;
};

/**
 * Very small frontmatter parser for our fixtures.
 * Handles: strings, booleans, datetime, arrays (inline [] and list - ), and nested? Not needed.
 * For PBI-007/008 validation, not a full YAML spec.
 */
export function parseMdoc(filePath: string): { data: Frontmatter; content: string; slug: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const slug = path.basename(filePath).replace(/\.mdoc$/, "");
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw, slug };
  }
  const fmRaw = match[1];
  const content = match[2] ?? "";
  const data: Frontmatter = {};
  let currentArrayKey: string | null = null;

  const lines = fmRaw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;

    // List item: "  - value"
    const listMatch = line.match(/^\s*-\s*(.*)$/);
    if (listMatch && currentArrayKey) {
      const arr = (data[currentArrayKey] as unknown[]) ?? [];
      let val: string = listMatch[1].trim();
      // strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      (arr as unknown[]).push(val);
      data[currentArrayKey] = arr as unknown as never;
      continue;
    }

    // Key: value
    const colon = line.indexOf(":");
    if (colon === -1) {
      currentArrayKey = null;
      continue;
    }
    const key = line.slice(0, colon).trim();
    let valRaw = line.slice(colon + 1).trim();

    if (valRaw === "" || valRaw === "[]") {
      // Could be start of array list on next lines, or empty array
      if (valRaw === "[]") {
        data[key] = [] as unknown as never;
        currentArrayKey = null;
      } else {
        // Peek next line to see if list
        const next = lines[i + 1] ?? "";
        if (/^\s*-\s/.test(next)) {
          data[key] = [] as unknown as never;
          currentArrayKey = key;
        } else {
          data[key] = "" as unknown as never;
          currentArrayKey = null;
        }
      }
      continue;
    }

    currentArrayKey = null;

    // Inline array: "[a, b]" or "[]"
    if (valRaw.startsWith("[") && valRaw.endsWith("]")) {
      const inner = valRaw.slice(1, -1).trim();
      if (!inner) data[key] = [] as unknown as never;
      else {
        data[key] = inner
          .split(",")
          .map((s: string) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean) as unknown as never;
      }
      continue;
    }

    // Booleans
    if (valRaw === "true") {
      data[key] = true as unknown as never;
      continue;
    }
    if (valRaw === "false") {
      data[key] = false as unknown as never;
      continue;
    }

    // Numbers (priority, order)
    if (/^-?\d+$/.test(valRaw)) {
      data[key] = Number(valRaw) as unknown as never;
      continue;
    }

    // Strip quotes
    if ((valRaw.startsWith('"') && valRaw.endsWith('"')) || (valRaw.startsWith("'") && valRaw.endsWith("'"))) {
      valRaw = valRaw.slice(1, -1);
    }

    data[key] = valRaw as unknown as never;
  }

  // Ensure title fallback to slug if missing
  if (!data.title) data.title = slug;

  return { data: data as Frontmatter, content, slug };
}

export function readCollection(dir: string): Array<{ data: Frontmatter; content: string; slug: string }> {
  const abs = path.join(process.cwd(), dir);
  if (!fs.existsSync(abs)) return [];
  const files = fs.readdirSync(abs).filter((f: string) => f.endsWith(".mdoc"));
  return files.map((f: string) => parseMdoc(path.join(abs, f)));
}

export function filterPublished<T extends { data: Frontmatter }>(
  items: T[],
  opts?: { includeDrafts?: boolean }
): T[] {
  if (opts?.includeDrafts) return items;
  return items.filter((it) => it.data.published === true);
}

export function sortByPriority<T extends { slug: string; data: Frontmatter & { priority?: number; order?: number; featured?: boolean } }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    const aFeat = a.data.featured ? 0 : 1;
    const bFeat = b.data.featured ? 0 : 1;
    if (aFeat !== bFeat) return aFeat - bFeat;
    const aPri = (a.data.priority ?? a.data.order ?? 99) as number;
    const bPri = (b.data.priority ?? b.data.order ?? 99) as number;
    if (aPri !== bPri) return aPri - bPri;
    return (a.slug ?? "").localeCompare(b.slug ?? "");
  });
}

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
