import { SEO_ROUTES } from './src/seoRoutes.js';

// Static site: every indexable route is prerendered to HTML at build time so
// search engines and link previews see real content. Other paths fall back to
// build/client/__spa-fallback.html and render client-side.
export default {
  appDirectory: 'src',
  ssr: false,
  prerender: SEO_ROUTES.map((route) => route.path),
};
