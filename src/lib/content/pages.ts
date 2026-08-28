import fs from "node:fs";
import path from "node:path";
import type { Frontmatter } from "./utils.js";

export type PageSingleton = {
  slug: string;
  data: Frontmatter;
  content: string;
};

function readSingleton(dir: string, slug: string): PageSingleton | undefined {
  const abs = path.join(process.cwd(), dir, slug + ".yaml");
  if (!fs.existsSync(abs)) return undefined;
  const raw = fs.readFileSync(abs, "utf-8");
  const data: Frontmatter = {};
  const lines = raw.split("\n");
  for (const line of lines) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let valRaw = line.slice(colon + 1).trim();
    if (valRaw === "") continue;
    if ((valRaw.startsWith('"') && valRaw.endsWith('"')) || (valRaw.startsWith("'") && valRaw.endsWith("'"))) {
      valRaw = valRaw.slice(1, -1);
    }
    data[key] = valRaw as unknown as never;
  }
  return { slug, data, content: data.content as string ?? "" };
}

export function getAboutPage(): PageSingleton | undefined {
  return readSingleton("src/content/pages", "about");
}

export function getVisionPage(): PageSingleton | undefined {
  return readSingleton("src/content/pages", "vision");
}

export function getSponsorshipPage(): PageSingleton | undefined {
  return readSingleton("src/content/pages", "sponsorship");
}

export function getParticipatePage(): PageSingleton | undefined {
  return readSingleton("src/content/pages", "participate");
}

export function getSiteSingleton(): { data: Frontmatter } | undefined {
  const abs = path.join(process.cwd(), "src/content/site.yaml");
  if (!fs.existsSync(abs)) return undefined;
  const raw = fs.readFileSync(abs, "utf-8");
  const data: Frontmatter = {};
  const lines = raw.split("\n");
  for (const line of lines) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let valRaw = line.slice(colon + 1).trim();
    if (valRaw === "") continue;
    if ((valRaw.startsWith('"') && valRaw.endsWith('"')) || (valRaw.startsWith("'") && valRaw.endsWith("'"))) {
      valRaw = valRaw.slice(1, -1);
    }
    data[key] = valRaw as unknown as never;
  }
  return { data };
}