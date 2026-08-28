import { describe, it, expect } from "vitest";
import { getLabs, getLabBySlug, getActiveLabs } from "./labs.js";
import { getResearchByLab } from "./research.js";
import { getExperimentsByResearch } from "./experiments.js";
import { getProjectsByLab } from "./projects.js";
import { getArticlesByLab } from "./articles.js";

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
  });
});
