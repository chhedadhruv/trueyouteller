// Converts raster images in src/assets to resized WebP with lowercase-kebab filenames,
// written to src/images (same folder structure). Originals are left untouched.
// Usage: node scripts/optimize-images.mjs
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS = path.resolve('src/assets');
const OUT = path.resolve('src/images');

// Max width per folder; anything else falls back to DEFAULT_WIDTH.
const WIDTHS = {
  famousMatches: 360,
  animals: 640,
  creators: 400,
  miniGames: 800,
};
const DEFAULT_WIDTH = 480;
const RASTER = /\.(png|jpe?g)$/i;

export const slugify = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s*\(.*\)\s*/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

const FIXES = { dophin: 'dolphin' };

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (RASTER.test(entry.name)) out.push(full);
  }
  return out;
}

let before = 0;
let after = 0;
for (const file of await walk(ASSETS)) {
  const rel = path.relative(ASSETS, file);
  const topFolder = rel.split(path.sep)[0];
  const width = WIDTHS[topFolder] ?? DEFAULT_WIDTH;
  const base = slugify(path.basename(file, path.extname(file)));
  const outDir = path.join(OUT, path.dirname(rel));
  const outFile = path.join(outDir, `${FIXES[base] ?? base}.webp`);
  await mkdir(outDir, { recursive: true });

  before += (await stat(file)).size;
  await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outFile);
  after += (await stat(outFile)).size;
  console.log(`${rel} -> ${path.relative(OUT, outFile)}`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\nTotal: ${mb(before)} MB -> ${mb(after)} MB`);
