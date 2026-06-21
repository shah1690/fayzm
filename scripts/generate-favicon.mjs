// Generates favicon assets from the navbar logo mark (the diamond symbol in
// public/logo-light.svg). Run: node scripts/generate-favicon.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// sharp is a hoisted transitive dep (via Next), not a direct dependency —
// resolve it from the pnpm store rather than a bare import.
const require = createRequire(import.meta.url);
const sharp = require(
  join(root, "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"),
);
const BRAND = "#002454";
const BG = "#ffffff";

// Extract the mark (7th path, index 6) from the wordmark logo.
const logo = readFileSync(join(root, "public/logo-light.svg"), "utf8");
const paths = logo.match(/<path[^>]*>/g) ?? [];
const markPath = paths[6];
if (!markPath) throw new Error("Logo mark path not found in logo-light.svg");
const markD = markPath.match(/d="([^"]*)"/)?.[1];
if (!markD) throw new Error("Mark path data not found");

// Mark occupies a ~153x153 box; pad ~12% so it breathes inside the tile.
const MARK = 153.2;
const PAD = MARK * 0.16;
const VB = MARK + PAD * 2;

function svg({ bg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-PAD} ${-PAD} ${VB} ${VB}">${
    bg
      ? `<rect x="${-PAD}" y="${-PAD}" width="${VB}" height="${VB}" fill="${bg}"/>`
      : ""
  }<path fill="${BRAND}" d="${markD}"/></svg>`;
}

// Crisp vector icon for modern browsers (white bg → visible on dark tabs too).
const iconSvg = svg({ bg: BG });
writeFileSync(join(root, "app/icon.svg"), iconSvg);

const render = (size, bg) =>
  sharp(Buffer.from(svg({ bg })))
    .resize(size, size)
    .png()
    .toBuffer();

// Build a PNG-embedded .ico (16/32/48) — supported by all modern browsers.
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngs.forEach((p, i) => {
    const e = 16 * i;
    entries.writeUInt8(p.size >= 256 ? 0 : p.size, e);
    entries.writeUInt8(p.size >= 256 ? 0 : p.size, e + 1);
    entries.writeUInt8(0, e + 2);
    entries.writeUInt8(0, e + 3);
    entries.writeUInt16LE(1, e + 4);
    entries.writeUInt16LE(32, e + 6);
    entries.writeUInt32LE(p.data.length, e + 8);
    entries.writeUInt32LE(offset, e + 12);
    offset += p.data.length;
  });
  return Buffer.concat([header, entries, ...pngs.map((p) => p.data)]);
}

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await render(size, BG) })),
);
writeFileSync(join(root, "app/favicon.ico"), buildIco(icoPngs));

// Apple touch icon must be opaque; Android/manifest icons.
writeFileSync(join(root, "app/apple-icon.png"), await render(180, BG));
writeFileSync(join(root, "public/icon-192.png"), await render(192, BG));
writeFileSync(join(root, "public/icon-512.png"), await render(512, BG));

console.log("Favicon assets generated from logo mark.");
