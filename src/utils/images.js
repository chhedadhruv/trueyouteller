const animalImages = import.meta.glob('../images/animals/*.webp', { eager: true, import: 'default' });
const celebrityImages = import.meta.glob('../images/famousMatches/*/*.webp', { eager: true, import: 'default' });

// Must match slugify() in scripts/optimize-images.mjs, which names the files.
export const slugify = (name) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s*\(.*\)\s*/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

// "Busy Beaver" -> animals/beaver.webp
export const getAnimalImage = (spiritAnimal) => {
  const animal = slugify(spiritAnimal.split(' ').pop());
  return animalImages[`../images/animals/${animal}.webp`];
};

// ("INTJ", "Walter White") -> famousMatches/INTJ/walter-white.webp
export const getCelebrityImage = (typeCode, name) =>
  celebrityImages[`../images/famousMatches/${typeCode}/${slugify(name)}.webp`];
