// Export static content/*.ts data to JSON for the backend CMS seed command.
// Node 24 strips TypeScript types on import, so we can import the .ts modules
// directly (their only imports are type-only).
//
// Usage:  node scripts/export-content.mjs
// Output: ../backend/cms/seed_data/*.json

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, "..", "content");
const outDir = join(here, "..", "..", "backend", "cms", "seed_data");

const modules = {
  businesses: ["businesses.ts", "businesses"],
  products: ["products.ts", "products"],
  documents: ["documents.ts", "documents"],
  partners: ["partners.ts", "partners"],
  stats: ["stats.ts", "stats"],
  faq: ["faq.ts", "faqContent"],
  "page-metadata": ["page-metadata.ts", "pageMetadata"],
  about: ["about.ts", "aboutContent"],
};

await mkdir(outDir, { recursive: true });

for (const [name, [file, exportName]] of Object.entries(modules)) {
  const mod = await import(join(contentDir, file));
  const data = mod[exportName];
  if (data === undefined) throw new Error(`Missing export ${exportName} in ${file}`);
  const target = join(outDir, `${name}.json`);
  await writeFile(target, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`wrote ${target}`);
}

console.log("Done.");
