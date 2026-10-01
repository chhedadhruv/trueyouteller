export const SITE_URL = 'https://www.trueyouteller.com';
export const SITE_NAME = 'TrueYouTeller';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

// Builds the array returned from a route's `meta` export: title, description,
// canonical, Open Graph, Twitter card and optional JSON-LD / noindex.
export const buildMeta = ({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) => {
  const url = `${SITE_URL}${path}`;
  const tags = [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];
  if (noindex) tags.push({ name: 'robots', content: 'noindex, follow' });
  jsonLd.forEach((data) => tags.push({ 'script:ld+json': data }));
  return tags;
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'True You Teller',
  url: SITE_URL,
};

export const faqJsonLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});
