// SEO and link-preview metadata for every page, keyed by URL path.
//
// Used in two places:
//  - The build writes it into each route’s HTML; server.cjs also uses it.
//    dist/route-meta.json is built with
//    `vite build --ssr` so image imports resolve to the site’s hashed /assets URLs.
//    Link previews (WhatsApp, LinkedIn, Facebook) and non-JS crawlers need this.
//  - App.jsx sets document.title and the description from it, so the titles
//    Google sees after rendering JavaScript match the server's.
import { POSTS, PILLARS, CAPABILITIES, CONTACT, SOCIALS } from '../data/content';
import { PROJECTS } from '../data/projects';

export const SITE = 'https://paraloxmedia.com';
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;
const DEFAULT_IMAGE = '/apple-touch-icon.png';

// 1200×630 branded cards from scripts/make-og-cards.mjs (committed in public/og).
const card = (key) => ({ image: `/og/${key}.jpg`, width: 1200, height: 630 });
const abs = (p) => (/^https?:/.test(p) ? p : `${SITE}${encodeURI(decodeURI(p))}`);

// Same order the article page uses for its header: explicit hero, then the
// first croppable photo; for previews also any photo, then the partner logo.
const imageOf = (p) =>
  p.hero || p.photos?.find((ph) => !ph.whole)?.src || p.photos?.[0]?.src || p.logo?.src || DEFAULT_IMAGE;

/* ---------- Structured data (schema.org JSON-LD) ---------- */

// The business, referenced by @id from every page.
const ORGANIZATION = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'Paralox Media',
  legalName: CONTACT.company,
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/icon-192.png`, width: 192, height: 192 },
  image: `${SITE}/og/home.jpg`,
  description: 'Creative technology company in Colombo, Sri Lanka, working across AI, engineering, media and growth.',
  slogan: 'Let’s build the future together.',
  email: CONTACT.email,
  telephone: CONTACT.phoneRaw,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '14 Sir Baron Jayathilake Mawatha',
    addressLocality: 'Colombo',
    postalCode: '00100',
    addressCountry: 'LK',
  },
  hasMap: 'https://www.google.com/maps?cid=7204718456650954838',
  foundingDate: '2025-05',
  founder: { '@type': 'Person', name: 'Abubakker Bakthathi', jobTitle: 'Founder & CEO' },
  areaServed: ['Sri Lanka', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Singapore', 'Papua New Guinea'],
  knowsAbout: CAPABILITIES.flatMap((c) => c.chips),
  sameAs: SOCIALS.map((s) => s.url),
  contactPoint: {
    '@type': 'ContactPoint', contactType: 'sales', telephone: CONTACT.phoneRaw, email: CONTACT.email,
    areaServed: 'Worldwide', availableLanguage: ['English'],
  },
};

const WEBSITE = {
  '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE}/`, name: 'Paralox Media',
  inLanguage: 'en', publisher: { '@id': ORG_ID },
};

const breadcrumb = (url, trail) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE}${t.path}`,
  })),
});

/** A page's JSON-LD graph: the business, the site, the page, plus any extras. */
function graph(path, meta, { type = 'WebPage', trail = [], extra = [] } = {}) {
  const url = `${SITE}${path}`;
  const webPage = {
    '@type': type, '@id': `${url}#webpage`, url, name: meta.title, description: meta.description,
    isPartOf: { '@id': WEBSITE_ID }, about: { '@id': ORG_ID }, inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(meta.image) },
    ...(trail.length && { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [ORGANIZATION, WEBSITE, webPage, ...(trail.length ? [breadcrumb(url, trail)] : []), ...extra],
  };
}

const page = (path, meta, opts) => ({ ...meta, jsonld: graph(path, meta, opts) });

/* ---------- Pages ---------- */

const PILLAR_SEO = {
  ai: { name: 'AI', title: 'AI Agents & Business Automation in Sri Lanka | Paralox Media' },
  engineering: { name: 'Engineering', title: 'Website & Web App Development in Sri Lanka | Paralox Media' },
  media: { name: 'Media', title: 'Video Production, AI Creatives & Branding | Paralox Media' },
  growth: { name: 'Growth', title: 'Performance & Digital Marketing in Sri Lanka | Paralox Media' },
};
const capabilityFor = (key) => CAPABILITIES.find((c) => c.href === `/${key}`);

export const ROUTE_META = {
  '/': page('/', {
    title: 'Paralox Media | AI, Web Development & Digital Marketing in Sri Lanka',
    ogTitle: 'Paralox Media — Building the future of AI-powered business solutions',
    description: 'Paralox Media is a creative technology company in Colombo. We build AI agents, websites and apps, produce video and AI creatives, and run performance marketing.',
    ...card('home'), type: 'website',
  }),
  '/about': page('/about', {
    title: 'About Paralox Media | Creative Technology Company in Colombo',
    ogTitle: 'About · Paralox Media',
    description: 'A creative technology company founded in Colombo in 2025, bringing AI, engineering, media and growth together in one team.',
    ...card('about'), type: 'website',
  }, { type: 'AboutPage', trail: [{ name: 'About', path: '/about' }] }),
  '/pulse': page('/pulse', {
    title: 'Pulse: News, Events & Insights | Paralox Media',
    ogTitle: 'Pulse · Paralox Media',
    description: 'Notes from the work: what we are building, testing and learning across AI, engineering, media and growth.',
    ...card('pulse'), type: 'website',
  }, {
    type: 'CollectionPage', trail: [{ name: 'Pulse', path: '/pulse' }],
    extra: [{
      '@type': 'ItemList', '@id': `${SITE}/pulse#articles`,
      itemListElement: POSTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/pulse/${p.id}`, name: p.title })),
    }],
  }),
  '/contact': page('/contact', {
    title: 'Contact Paralox Media | Start a Project in Colombo, Sri Lanka',
    ogTitle: 'Contact · Paralox Media',
    description: `Tell us what your business needs next. Call ${CONTACT.phone}, email ${CONTACT.email} or visit us in Colombo.`,
    ...card('contact'), type: 'website',
  }, { type: 'ContactPage', trail: [{ name: 'Contact', path: '/contact' }] }),

  ...Object.fromEntries(Object.entries(PILLARS).map(([key, p]) => {
    const seo = PILLAR_SEO[key] || { name: key, title: `${key} | Paralox Media` };
    const path = `/${key}`;
    const chips = capabilityFor(key)?.chips || [];
    return [path, page(path, {
      title: seo.title, ogTitle: `${seo.name} · Paralox Media`, description: p.lede, ...card(key), type: 'website',
    }, {
      trail: [{ name: seo.name, path }],
      extra: [{
        '@type': 'Service', '@id': `${SITE}${path}#service`, name: seo.name,
        serviceType: chips.join(', ') || seo.name, description: p.lede, url: `${SITE}${path}`,
        provider: { '@id': ORG_ID }, areaServed: ORGANIZATION.areaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: `${seo.name} services`,
          itemListElement: chips.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c } })),
        },
      }],
    })];
  })),

  ...Object.fromEntries(POSTS.map((p) => {
    const path = `/pulse/${p.id}`;
    const image = imageOf(p);
    const meta = {
      title: p.title.length > 50 ? p.title : `${p.title} | Paralox Media`,
      ogTitle: p.title, description: p.excerpt, image, type: 'article', published: p.iso,
    };
    return [path, page(path, meta, {
      trail: [{ name: 'Pulse', path: '/pulse' }, { name: p.title, path }],
      extra: [{
        '@type': p.kind === 'insight' ? 'BlogPosting' : 'NewsArticle',
        '@id': `${SITE}${path}#article`,
        headline: p.title.slice(0, 110), description: p.excerpt, image: [abs(image)],
        datePublished: p.iso, dateModified: p.iso,
        author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID },
        mainEntityOfPage: { '@id': `${SITE}${path}#webpage` }, inLanguage: 'en',
      }],
    })];
  })),
};

// Project case studies: a CreativeWork with its videos, so they can appear in video results.
for (const p of PROJECTS) {
  const path = `/work/${p.id}`;
  const url = `${SITE}${path}`;
  const meta = {
    title: `${p.title} | ${p.pillar} project | Paralox Media`,
    ogTitle: `${p.title} · Paralox Media`,
    description: p.summary,
    image: p.hero,
    type: 'article',
    published: p.iso,
  };
  ROUTE_META[path] = page(path, meta, {
    trail: [{ name: p.title, path }],
    extra: [{
      '@type': 'CreativeWork',
      '@id': `${url}#project`,
      name: p.title,
      headline: p.headline,
      description: p.summary,
      image: [abs(p.hero)],
      dateCreated: p.iso,
      creator: { '@id': ORG_ID },
      contributor: { '@type': 'Organization', name: 'WPP Media' },
      sourceOrganization: { '@type': 'Organization', name: p.client },
      genre: p.pillar,
      video: p.videos.map((v) => ({
        '@type': 'VideoObject',
        name: `${p.title}: ${v.title}`,
        description: v.text,
        thumbnailUrl: abs(v.poster),
        contentUrl: abs(v.src),
        uploadDate: p.iso,
        duration: v.duration,
      })),
      mainEntityOfPage: { '@id': `${url}#webpage` },
    }],
  });
}

// /services is the home page scrolled to the pillars; Google should index it as /.
ROUTE_META['/services'] = { ...ROUTE_META['/'], canonical: '/' };
