// Generates 1200x630 social share images into public/og/:
//   default.png       site-wide card
//   {type}.png ×16    one per personality type (e.g. intj.png)
//   compatibility.png compatibility checker pages
// Usage: node scripts/generate-og.mjs  (re-run after changing type names or branding)
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { PERSONALITY_TYPES } from '../src/data/personalityTypes.js';

const OUT = 'public/og';
const WIDTH = 1200;
const HEIGHT = 630;

// Brand colours from src/styles/App.css
const PURPLE = '#5B2C6F';
const ORANGE = '#F39C12';
const LAVENDER = '#E8DAEF';
const NAVY = '#2C3E50';

const font = (pkg, file) => readFile(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = [
  { name: 'Chewy', data: await font('chewy', 'chewy-latin-400-normal.woff'), weight: 400 },
  { name: 'Nunito', data: await font('nunito', 'nunito-latin-400-normal.woff'), weight: 400 },
  { name: 'Nunito', data: await font('nunito', 'nunito-latin-800-normal.woff'), weight: 800 },
];

// Satori can't read WebP, so convert to a PNG data URL.
const toDataUrl = async (file, width) =>
  `data:image/png;base64,${(await sharp(file).resize({ width }).png().toBuffer()).toString('base64')}`;

// Satori takes a React-element-like tree; this keeps the layout readable without JSX.
const h = (type, style, ...children) => {
  const flat = children.flat();
  return { type, props: { style, children: flat.length === 1 ? flat[0] : flat } };
};
const img = (src, style) => ({ type: 'img', props: { src, style } });

const frame = (...children) =>
  h(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      alignItems: 'center',
      padding: '60px 70px',
      background: `linear-gradient(135deg, ${LAVENDER} 0%, #ffffff 100%)`,
      borderBottom: `16px solid ${ORANGE}`,
      fontFamily: 'Nunito',
      color: NAVY,
    },
    ...children
  );

const siteUrl = h('div', { fontSize: 30, fontWeight: 800, color: ORANGE, marginTop: 30 }, 'www.trueyouteller.com');

const render = async (tree, file) => {
  const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });
  await writeFile(`${OUT}/${file}`, new Resvg(svg).render().asPng());
  console.log(`${OUT}/${file}`);
};

await mkdir(OUT, { recursive: true });

const logo = await toDataUrl('src/images/trueyouteller-logo-removebg.webp', 420);
await render(
  frame(
    img(logo, { width: 420, height: 420, marginRight: 50 }),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', flex: 1 },
      h('div', { fontFamily: 'Chewy', fontSize: 84, color: PURPLE, lineHeight: 1.05 }, 'Free Personality Test'),
      h('div', { fontSize: 36, marginTop: 24 }, 'Discover your 16-type personality and meet your spirit animal.'),
      siteUrl
    )
  ),
  'default.png'
);

const circle = (src) =>
  h(
    'div',
    {
      display: 'flex',
      width: 260,
      height: 260,
      borderRadius: 130,
      background: '#ffffff',
      border: `8px solid ${PURPLE}`,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    img(src, { width: 220, height: 220, objectFit: 'contain' })
  );

await render(
  frame(
    h(
      'div',
      { display: 'flex', flexDirection: 'column', flex: 1, marginRight: 30 },
      h('div', { fontSize: 32, fontWeight: 800, color: ORANGE, letterSpacing: 2 }, '16 PERSONALITY TYPES'),
      h('div', { fontFamily: 'Chewy', fontSize: 88, color: PURPLE, lineHeight: 1.05 }, 'Compatibility Checker'),
      h('div', { fontSize: 34, marginTop: 18 }, 'How well do your types match? See your score, strengths and clashes.'),
      siteUrl
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center' },
      circle(await toDataUrl('src/images/animals/owl.webp', 260)),
      h('div', { fontSize: 72, margin: '0 -10px', zIndex: 2, color: ORANGE, fontWeight: 800 }, '+'),
      circle(await toDataUrl('src/images/animals/dolphin.webp', 260))
    )
  ),
  'compatibility.png'
);

for (const type of Object.values(PERSONALITY_TYPES)) {
  const animal = type.spiritAnimal.split(' ').pop().toLowerCase();
  const animalImg = await toDataUrl(`src/images/animals/${animal}.webp`, 400);
  await render(
    frame(
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flex: 1, marginRight: 40 },
        h('div', { fontSize: 32, fontWeight: 800, color: ORANGE, letterSpacing: 2 }, 'PERSONALITY TYPE'),
        h('div', { fontFamily: 'Chewy', fontSize: 150, color: PURPLE, lineHeight: 1 }, type.code),
        h('div', { fontFamily: 'Chewy', fontSize: 64, color: PURPLE }, type.name),
        h('div', { fontSize: 32, marginTop: 14 }, `Spirit animal: ${type.spiritAnimal}`),
        siteUrl
      ),
      h(
        'div',
        {
          display: 'flex',
          width: 430,
          height: 430,
          borderRadius: 215,
          background: '#ffffff',
          border: `10px solid ${PURPLE}`,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        img(animalImg, { width: 360, height: 360, objectFit: 'contain' })
      )
    ),
    `${type.code.toLowerCase()}.png`
  );
}
