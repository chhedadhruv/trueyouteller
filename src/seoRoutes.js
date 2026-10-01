import { PERSONALITY_TYPES } from './data/personalityTypes.js';
import { ALL_PAIR_SLUGS } from './data/compatibility.js';
import { QUIZZES } from './data/quizzes/index.js';

// Indexable routes: prerendered to static HTML and listed in sitemap.xml.
// Plain JS (no JSX/assets) so react-router.config.js and scripts/ can import it.
const typeSlugs = Object.keys(PERSONALITY_TYPES).map((code) => code.toLowerCase());

export const SEO_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/test', priority: 0.9, changefreq: 'monthly' },
  { path: '/types', priority: 0.9, changefreq: 'monthly' },
  ...typeSlugs.map((slug) => ({ path: `/types/${slug}`, priority: 0.8, changefreq: 'monthly' })),
  { path: '/quizzes', priority: 0.8, changefreq: 'monthly' },
  ...QUIZZES.map((quiz) => ({ path: `/quizzes/${quiz.slug}`, priority: 0.8, changefreq: 'monthly' })),
  { path: '/compatibility', priority: 0.8, changefreq: 'monthly' },
  ...ALL_PAIR_SLUGS.map((slug) => ({ path: `/compatibility/${slug}`, priority: 0.6, changefreq: 'monthly' })),
  { path: '/about', priority: 0.5, changefreq: 'yearly' },
  { path: '/contact', priority: 0.3, changefreq: 'yearly' },
  { path: '/feedback', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.2, changefreq: 'yearly' },
];

// Prerendered so shared links get type-specific previews, but noindex and not in the sitemap.
export const SHARE_ROUTES = typeSlugs.map((slug) => `/result/${slug}`);
