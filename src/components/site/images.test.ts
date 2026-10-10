import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { IMG, WORK } from "./images";

describe("Site images", () => {
  it.each(Object.values(IMG))("serves %s from a bundled PNG asset", (source) => {
    expect(source).toMatch(/^\/images\/interior-\d+\.png$/);

    const image = readFileSync(resolve("public", source.slice(1)));

    expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(image.length).toBeGreaterThan(8);
  });

  it("uses bundled images for every portfolio item", () => {
    for (const item of WORK) {
      expect(Object.values(IMG)).toContain(item.src);
    }
  });
});
