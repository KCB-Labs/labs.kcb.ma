import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { validate } from "./validate.js";
import { getLabs } from "./labs.js";

describe("validate", () => {
  it("passes with current valid fixtures", () => {
    expect(() => validate()).not.toThrow();
  });

  it("fails on broken relationship", () => {
    // Create a temporary invalid project referencing nonexistent lab
    const invalidPath = "src/content/projects/invalid-test.mdoc";
    const content = `---
title: Invalid Test
description: Invalid
type: Internal
stage: Idea
status: active
published: true
originLab: nonexistent-lab
research: []
experiments: []
featured: false
priority: 99
tags: []
seoTitle: ""
seoDescription: ""
---

Invalid.
`;
    const abs = path.join(process.cwd(), invalidPath);
    fs.writeFileSync(abs, content);
    try {
      expect(() => validate()).toThrow(/references nonexistent Lab "nonexistent-lab"/);
    } finally {
      fs.unlinkSync(abs);
    }
  });

  it("seed graph traversal", async () => {
    const { getResearchByLab } = await import("./research.js");
    const { getExperimentsByResearch } = await import("./experiments.js");
    const { getProjectsByLab } = await import("./projects.js");
    const { getArticlesByLab } = await import("./articles.js");
    const { getPeopleByLab } = await import("./people.js");

    expect(getResearchByLab("ai-employees").length).toBeGreaterThanOrEqual(1);
    expect(getExperimentsByResearch("local-ai-research").length).toBeGreaterThanOrEqual(1);
    expect(getProjectsByLab("ai-employees").some((p) => p.slug === "operant")).toBe(true);
    expect(getArticlesByLab("ai-employees").some((a) => a.slug === "building-ai-employees")).toBe(true);
    expect(getPeopleByLab("ai-employees").some((p) => p.slug === "john-doe")).toBe(true);

    // Numbers derived from helpers, not hard-coded
    expect(getLabs().length).toBe(1);
  });
});
