import { getAnimalImage } from './images';
import logoUrl from '../images/trueyouteller.webp';

// Draws the 1080×1350 (Instagram portrait) share card with the Canvas 2D API and
// returns a PNG blob. Drawing directly keeps the output identical on every device.
const WIDTH = 1080;
const HEIGHT = 1350;
const PURPLE = '#5B2C6F';
const ORANGE = '#F39C12';
const LAVENDER = '#E8DAEF';
const NAVY = '#2C3E50';

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// Shrinks the font until the text fits the given width.
const fitText = (ctx, text, family, size, maxWidth) => {
  let current = size;
  do {
    ctx.font = `${family.weight ?? ''} ${current}px ${family.name}`;
    current -= 4;
  } while (ctx.measureText(text).width > maxWidth && current > 20);
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
};

const CHEWY = { name: "'Chewy', cursive" };
const NUNITO_BOLD = { name: "'Nunito', sans-serif", weight: 800 };

export const drawShareCard = async ({ type, name, breakdown }) => {
  await Promise.all([
    document.fonts?.load(`190px ${CHEWY.name}`),
    document.fonts?.load(`800 40px ${NUNITO_BOLD.name}`),
  ]);
  const [logo, animal] = await Promise.all([loadImage(logoUrl), loadImage(getAnimalImage(type.spiritAnimal))]);

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  const centerX = WIDTH / 2;
  const maxText = WIDTH - 140;

  const bg = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  bg.addColorStop(0, LAVENDER);
  bg.addColorStop(0.6, '#ffffff');
  bg.addColorStop(1, '#fdf2e0');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(0, HEIGHT - 24, WIDTH, 24);

  const logoWidth = 230;
  ctx.drawImage(logo, centerX - logoWidth / 2, 50, logoWidth, (logo.height / logo.width) * logoWidth);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = NAVY;
  fitText(ctx, name ? `${name} is` : 'Personality type', NUNITO_BOLD, 46, maxText);
  ctx.fillText(name ? `${name} is` : 'Personality type', centerX, 330);

  ctx.fillStyle = PURPLE;
  ctx.font = `200px ${CHEWY.name}`;
  ctx.fillText(type.code, centerX, 520);
  fitText(ctx, type.name, CHEWY, 80, maxText);
  ctx.fillText(type.name, centerX, 610);

  // Spirit animal in a circle
  const radius = 175;
  const circleY = 820;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, circleY, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.clip();
  const scale = Math.max((radius * 2) / animal.width, (radius * 2) / animal.height);
  const w = animal.width * scale;
  const h = animal.height * scale;
  ctx.drawImage(animal, centerX - w / 2, circleY - h / 2, w, h);
  ctx.restore();
  ctx.lineWidth = 10;
  ctx.strokeStyle = PURPLE;
  ctx.beginPath();
  ctx.arc(centerX, circleY, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = NAVY;
  fitText(ctx, `Spirit animal: ${type.spiritAnimal}`, NUNITO_BOLD, 42, maxText);
  ctx.fillText(`Spirit animal: ${type.spiritAnimal}`, centerX, 1060);

  if (breakdown) {
    const pillWidth = 210;
    const gap = 24;
    const startX = centerX - (pillWidth * 4 + gap * 3) / 2;
    breakdown.forEach((row, i) => {
      const x = startX + i * (pillWidth + gap);
      ctx.fillStyle = PURPLE;
      roundRect(ctx, x, 1100, pillWidth, 76, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = `800 38px ${NUNITO_BOLD.name}`;
      ctx.fillText(`${row.letter} ${row.strength}%`, x + pillWidth / 2, 1151);
    });
  }

  ctx.fillStyle = ORANGE;
  fitText(ctx, "What's your type? → www.trueyouteller.com", NUNITO_BOLD, 40, maxText);
  ctx.fillText("What's your type? → www.trueyouteller.com", centerX, 1280);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
};
