import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const appDir = path.join(process.cwd(), "app");

function collectPageFiles(dir: string, baseDir = dir): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const entryPath = path.join(dir, entry);
    const relativePath = path.relative(baseDir, entryPath);

    if (statSync(entryPath).isDirectory()) {
      return collectPageFiles(entryPath, baseDir);
    }

    return entry === "page.tsx" ? [relativePath] : [];
  });
}

describe("app route architecture", () => {
  it("keeps every page route under app/[locale]", () => {
    const pageFiles = collectPageFiles(appDir);

    expect(pageFiles.length).toBeGreaterThan(0);
    expect(pageFiles.every((file) => file.startsWith("[locale]/"))).toBe(true);
  });

  it("does not keep the locale placeholder catch-all page", () => {
    const pageFiles = collectPageFiles(appDir);

    expect(pageFiles).not.toContain("[locale]/[...slug]/page.tsx");
  });
});
