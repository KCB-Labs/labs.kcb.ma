import fs from "node:fs";
import path from "node:path";
import { getLabs } from "../content/labs.js";
import { getProjects } from "../content/projects.js";
import { getArticles } from "../content/articles.js";
import { getResearch } from "../content/research.js";
import { getExperiments } from "../content/experiments.js";
import { getPeople } from "../content/people.js";
import { getOpenSource } from "../content/opensource.js";

export type SearchIndexEntry = {
  type: "LAB" | "PROJECT" | "ARTICLE" | "RESEARCH" | "EXPERIMENT" | "PERSON" | "OPEN_SOURCE";
  title: string;
  slug: string;
  description: string;
  href: string;
  tags?: string[];
  lab?: string;
};

export function buildSearchIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  // Labs
  for (const lab of getLabs()) {
    entries.push({
      type: "LAB",
      title: lab.data.title as string,
      slug: lab.slug,
      description: lab.data.description as string,
      href: `/labs/${lab.slug}`,
      tags: lab.data.tags as string[] | undefined,
    });
  }

  // Projects
  for (const project of getProjects()) {
    entries.push({
      type: "PROJECT",
      title: project.data.title as string,
      slug: project.slug,
      description: project.data.description as string,
      href: `/projects/${project.slug}`,
      tags: project.data.tags as string[] | undefined,
      lab: project.data.originLab as string | undefined,
    });
  }

  // Articles
  for (const article of getArticles()) {
    entries.push({
      type: "ARTICLE",
      title: article.data.title as string,
      slug: article.slug,
      description: article.data.description as string,
      href: `/journal/${article.slug}`,
      tags: article.data.tags as string[] | undefined,
    });
  }

  // Research
  for (const research of getResearch()) {
    entries.push({
      type: "RESEARCH",
      title: research.data.title as string,
      slug: research.slug,
      description: research.data.description as string,
      href: `/research/${research.slug}`,
      tags: research.data.tags as string[] | undefined,
      lab: research.data.lab as string | undefined,
    });
  }

  // Experiments
  for (const experiment of getExperiments()) {
    entries.push({
      type: "EXPERIMENT",
      title: experiment.data.title as string,
      slug: experiment.slug,
      description: experiment.data.description as string,
      href: `/experiments/${experiment.slug}`,
      tags: experiment.data.tags as string[] | undefined,
      lab: experiment.data.lab as string | undefined,
    });
  }

  // People
  for (const person of getPeople()) {
    entries.push({
      type: "PERSON",
      title: person.data.title as string,
      slug: person.slug,
      description: person.data.description as string,
      href: `/about/people/${person.slug}`,
      tags: person.data.tags as string[] | undefined,
    });
  }

  // Open Source
  for (const os of getOpenSource()) {
    entries.push({
      type: "OPEN_SOURCE",
      title: os.data.title as string,
      slug: os.slug,
      description: os.data.description as string,
      href: `/open-source/${os.slug}`,
      tags: os.data.tags as string[] | undefined,
      lab: os.data.originLab as string | undefined,
    });
  }

  return entries;
}

export function writeSearchIndex(outputPath: string): void {
  const index = buildSearchIndex();
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
}