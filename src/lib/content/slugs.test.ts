import { describe, it, expect } from "vitest";
import { slugify, assertSlugStable, generateSlug } from "./slugs.js";

describe("slugs", () => {
  it("slugify AI Employees -> ai-employees", () => {
    expect(slugify("AI Employees")).toBe("ai-employees");
    expect(slugify("  Hello World!  ")).toBe("hello-world");
    expect(slugify("Local AI on Constrained Hardware")).toBe("local-ai-on-constrained-hardware");
  });

  it("slug stability: editing title does not mutate published slug unless explicit", () => {
    const publishedSlug = "ai-employees";
    expect(() => assertSlugStable(publishedSlug, "ai-employees")).not.toThrow();
    expect(() => assertSlugStable(publishedSlug, "ai-employees-v2")).toThrow(/Slug stability violation/);
    expect(() => assertSlugStable(undefined, "new-slug")).not.toThrow();
  });

  it("generateSlug uses explicit override when provided", () => {
    expect(generateSlug("AI Employees", "custom-slug")).toBe("custom-slug");
    expect(generateSlug("AI Employees")).toBe("ai-employees");
    expect(generateSlug("AI Employees", "")).toBe("ai-employees");
  });

  it("slug is lowercase, stable, no IDs", () => {
    const slug = slugify("My Test Project 123");
    expect(slug).toBe("my-test-project-123");
    expect(slug).not.toMatch(/[A-Z]/);
    expect(slug).not.toMatch(/\d{4,}-/); // no unnecessary IDs
  });
});
