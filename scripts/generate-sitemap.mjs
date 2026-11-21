// Writes build/client/sitemap.xml from the prerendered route list. Runs after `react-router build`.
import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { SEO_ROUTES } from '../src/seoRoutes.js';

const SITE_URL = 'https://www.trueyouteller.com';

// Source files whose changes alter a page's content. Longest matching prefix wins.
const SOURCES = [
  ['/compatibility/', ['src/pages/CompatibilityPage.jsx', 'src/data/compatibility.js', 'src/data/personalityTypes.js']],
  ['/compatibility', ['src/pages/CompatibilityPage.jsx', 'src/components/PairLinks.jsx', 'src/data/compatibility.js']],
  ['/types/', ['src/pages/TypePage.jsx', 'src/data/personalityTypes.js', 'src/components/PairLinks.jsx']],
  ['/types', ['src/pages/TypesHubPage.jsx', 'src/data/personalityTypes.js']],
  ['/quizzes/', ['src/pages/QuizPage.jsx', 'src/data/quizzes']],
  ['/quizzes', ['src/pages/QuizzesHubPage.jsx', 'src/data/quizzes']],
  ['/test', ['src/pages/TestPage.jsx', 'src/data/questions.js']],
  ['/play', ['src/pages/PlayHubPage.jsx']],
  ['/about', ['src/pages/AboutUsPage.jsx']],
  ['/privacy', ['src/pages/PrivacyPage.jsx']],
  ['/', ['src/pages/LandingPage.jsx']],
];

// Last commit date (YYYY-MM-DD) touching the given files, or null if git can't tell
// (no .git, shallow clone without history). A missing lastmod is better than a wrong one.
const gitDate = (files) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { encoding: 'utf8' }).trim();
    return out || null;
  } catch {
    return null;
  }
};

const cache = new Map();
const lastmodFor = (path) => {
  const entry = SOURCES.find(([prefix]) => (prefix.endsWith('/') ? path.startsWith(prefix) : path === prefix));
  if (!entry) return null;
  const key = entry[0];
  if (!cache.has(key)) cache.set(key, gitDate(entry[1]));
  return cache.get(key);
};

const routes = SEO_ROUTES.filter((route) => route.sitemap !== false);

const urls = routes
  .map(({ path, priority, changefreq }) => {
    const lastmod = lastmodFor(path);
    return `  <url>
    <loc>${SITE_URL}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile('build/client/sitemap.xml', xml);
console.log(`sitemap.xml: ${routes.length} URLs`);
