// Creates src/images/trueyouteller-dark.webp: the navbar logo with its dark navy
// lettering recolored for dark mode (the crystal ball on the left is untouched).
// Usage: node scripts/make-dark-logo.mjs
import sharp from 'sharp';

const SOURCE = 'src/images/trueyouteller.webp';
const OUT = 'src/images/trueyouteller-dark.webp';
const TEXT_START_X = 200; // lettering starts right of the crystal ball
const LIGHT = [236, 230, 242]; // --text in dark mode

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < info.height; y++) {
  for (let x = TEXT_START_X; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    if (data[i + 3] > 0 && luminance < 120) [data[i], data[i + 1], data[i + 2]] = LIGHT;
  }
}
await sharp(data, { raw: info }).webp({ quality: 85 }).toFile(OUT);
console.log(OUT);
