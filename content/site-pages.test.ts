import { describe, expect, it } from "vitest";
import { routing } from "@/i18n/routing";
import { getAllSitePageParams, resolveSitePage, sitePages } from "./site-pages";

const unsupportedSlugs = [
  ["unknown"],
  ["collections", "kids"],
  ["businesses", "unknown"],
] as const;

describe("site pages routing contract", () => {
  it("resolves every declared slug", () => {
    for (const page of sitePages) {
      expect(resolveSitePage(page.slug)?.id).toBe(page.id);
    }
  });

  it("builds static params from declared routes only", () => {
    const params = getAllSitePageParams();

    expect(params).toHaveLength(sitePages.length * routing.locales.length);

    for (const locale of routing.locales) {
      for (const page of sitePages) {
        expect(params).toContainEqual({
          locale,
          slug: page.slug,
        });
      }
    }
  });

  it("does not resolve unsupported slugs", () => {
    for (const slug of unsupportedSlugs) {
      expect(resolveSitePage([...slug])).toBeUndefined();
    }
  });
});
