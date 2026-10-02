// Writes build/client/sitemap.xml from the prerendered route list. Runs after `react-router build`.
import { writeFile } from 'node:fs/promises';
import { SEO_ROUTES } from '../src/seoRoutes.js';

const SITE_URL = 'https://www.trueyouteller.com';
const today = new Date().toISOString().slice(0, 10);

const urls = SEO_ROUTES.map(
  ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile('build/client/sitemap.xml', xml);
console.log(`sitemap.xml: ${SEO_ROUTES.length} URLs`);
