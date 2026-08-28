import { describe, it, expect } from "vitest";
import { getLabs, getLabBySlug, getActiveLabs } from "./labs.js";
import { getResearch, getResearchByLab } from "./research.js";
import { getExperiments, getExperimentsByResearch } from "./experiments.js";
import { getProjects, getProjectsByLab } from "./projects.js";
import { getArticles, getArticlesByLab } from "./articles.js";
import { getPeople } from "./people.js";
import { getOrganizations } from "./organizations.js";
import { getOpenSource } from "./opensource.js";
import { calculateReadingTime } from "./utils.js";

describe("content helpers", () => {
  it("getLabs returns only published by default", () => {
    const labs = getLabs();
    expect(labs.length).toBe(1);
    expect(labs[0].slug).toBe("ai-employees");
    expect(labs.every((l) => l.data.published === true)).toBe(true);
  });

  it("getLabs with includeDrafts includes drafts", () => {
    const labs = getLabs({ includeDrafts: true });
    expect(labs.length).toBe(2);
  });

  it("getLabBySlug resolves", () => {
    const lab = getLabBySlug("ai-employees");
    expect(lab?.data.title).toBe("AI Employees");
    expect(getLabBySlug("nonexistent")).toBeUndefined();
  });

  it("getActiveLabs filters active", () => {
    const active = getActiveLabs();
    expect(active.length).toBe(1);
    expect(active[0].data.status).toBe("active");
  });

  it("getResearchByLab traverses", () => {
    const research = getResearchByLab("ai-employees");
    expect(research.length).toBe(1);
    expect(research[0].slug).toBe("local-ai-research");
  });

  it("getExperimentsByResearch traverses", () => {
    const exps = getExperimentsByResearch("local-ai-research");
    expect(exps.length).toBe(1);
    expect(exps[0].slug).toBe("local-llm-benchmark");
  });

  it("getProjectsByLab", () => {
    const projs = getProjectsByLab("ai-employees");
    expect(projs.length).toBe(1);
    expect(projs[0].slug).toBe("operant");
  });

  it("getArticlesByLab", () => {
    const arts = getArticlesByLab("ai-employees");
    expect(arts.length).toBe(1);
    expect(arts[0].slug).toBe("building-ai-employees");
  });

  it("empty relations return [] not throw", () => {
    const empty = getResearchByLab("empty-lab");
    expect(empty).toEqual([]);
    expect(getProjectsByLab("empty-lab")).toEqual([]);
    expect(getArticlesByLab("empty-lab")).toEqual([]);
  });

  it("getProjects excludes drafts by default", () => {
    expect(getProjects().length).toBe(1);
    expect(getProjects({ includeDrafts: true }).length).toBe(2);
  });

  it("getResearch excludes drafts", () => {
    expect(getResearch().length).toBe(1);
    expect(getResearch({ includeDrafts: true }).length).toBe(2);
  });

  it("getExperiments excludes drafts", () => {
    expect(getExperiments().length).toBe(1);
    expect(getExperiments({ includeDrafts: true }).length).toBe(2);
  });

  it("getArticles excludes drafts", () => {
    expect(getArticles().length).toBe(1);
    expect(getArticles({ includeDrafts: true }).length).toBe(2);
  });

  it("getPeople excludes drafts", () => {
    expect(getPeople().length).toBe(1);
    expect(getPeople({ includeDrafts: true }).length).toBe(2);
  });

  it("getOrganizations excludes drafts", () => {
    expect(getOrganizations().length).toBe(1);
    expect(getOrganizations({ includeDrafts: true }).length).toBe(2);
  });

  it("getOpenSource excludes drafts", () => {
    expect(getOpenSource().length).toBe(1);
    expect(getOpenSource({ includeDrafts: true }).length).toBe(2);
  });

  it("calculateReadingTime word-count", () => {
    expect(calculateReadingTime("a ".repeat(400))).toBe(2);
    expect(calculateReadingTime("hello world")).toBe(1);
    expect(calculateReadingTime("")).toBe(1);
  });
});
