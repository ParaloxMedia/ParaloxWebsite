// SEO and link-preview metadata for every page, keyed by URL path.
//
// Used in two places:
//  - The build writes it into each route’s HTML; server.cjs also uses it.
//    dist/route-meta.json is built with
//    `vite build --ssr` so image imports resolve to the site’s hashed /assets URLs.
//    Link previews (WhatsApp, LinkedIn, Facebook) and non-JS crawlers need this.
//  - App.jsx sets document.title and the description from it, so the titles
//    Google sees after rendering JavaScript match the server's.
import { POSTS, PILLARS, CAPABILITIES, CONTACT, SOCIALS, WORK, WORK_PILLARS, FAQ } from '../data/content';
import { PROJECTS } from '../data/projects';
import { VACANCIES } from '../data/careers';
import teamPhoto from '../assets/careers/team.jpg';
import { LANDING_PAGES } from '../data/aiAgency';
import { FOUNDER } from '../data/founder';

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
  alternateName: ['Paralox', 'Paralox Media Sri Lanka'],
  description: 'AI creative and technology agency in Colombo, Sri Lanka: AI films and creatives, AI agents and automation, websites and apps, and performance marketing.',
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
  // The founder's headshot lives at a fixed URL (public/team/abubakker/) so search and AI answers can show it.
  founder: {
    '@type': 'Person', '@id': `${SITE}/abubakker-bakthathi#person`, name: 'Abubakker Bakthathi', jobTitle: 'Founder & CEO',
    description: 'Leading AI trainer and AI consultant in Sri Lanka: founder and CEO of Paralox Media, lecturer in AI for Leadership & Business Productivity at Inspire College, and AI trainer with Cocoon and BuildrLabs.',
    worksFor: { '@id': ORG_ID }, url: `${SITE}/abubakker-bakthathi`, email: 'abubakker@paraloxmedia.com',
    sameAs: ['https://www.linkedin.com/in/bakthathi/', 'https://abubakker98.github.io/Connect/', 'https://mycocoon.life/trainers', 'https://buildrlabs.ai/trainers/', 'https://www.youtube.com/@AbubakkerBakthathi'],
    // Independent press about him: a strong signal for search and AI answers.
    subjectOf: {
      '@type': 'NewsArticle',
      headline: 'Inside the vision behind Paralox Media with Abubakker Bakthathi',
      url: 'https://www.themorning.lk/articles/ZfDBpXFjPctroSm6LX1J',
      datePublished: '2026-07-26',
      author: { '@type': 'Person', name: 'Nuskiya Nasar Aakhir' },
      publisher: { '@type': 'NewsMediaOrganization', name: 'The Morning', url: 'https://www.themorning.lk' },
    },
    hasOccupation: [
      { '@type': 'Occupation', name: 'AI consultant', occupationLocation: { '@type': 'City', name: 'Colombo' } },
      { '@type': 'Occupation', name: 'AI trainer', occupationLocation: { '@type': 'City', name: 'Colombo' } },
    ],
    affiliation: [
      { '@type': 'EducationalOrganization', name: 'Inspire College' },
      { '@type': 'Organization', name: 'Cocoon', url: 'https://mycocoon.life' },
      { '@type': 'Organization', name: 'BuildrLabs', url: 'https://buildrlabs.ai' },
    ],
    knowsAbout: ['AI training', 'AI for leadership', 'AI strategy', 'AI consulting', 'Generative AI', 'AI video generation', 'Agentic AI', 'AI agents', 'LLM integration', 'RAG systems', 'Prompt engineering', 'Business automation', 'Software engineering', 'React', 'Node.js', 'Brand strategy', 'Performance marketing', 'Digital marketing'],
    homeLocation: { '@type': 'Place', name: 'Colombo, Sri Lanka' },
    image: {
      '@type': 'ImageObject', url: `${SITE}/team/abubakker/abubakker-bakthathi.jpg`, width: 800, height: 800,
      caption: 'Abubakker Bakthathi, Founder & CEO of Paralox Media',
    },
  },
  areaServed: ['Sri Lanka', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Singapore', 'Papua New Guinea'],
  knowsAbout: ['Generative AI', 'AI video generation', 'AI video production', 'AI creative', 'Agentic AI', 'AI agents', 'AI engineering', 'Business automation', ...CAPABILITIES.flatMap((c) => c.chips)],
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
  ai: { name: 'AI', title: 'AI Agency in Sri Lanka: AI Agents & Automation | Paralox Media' },
  engineering: { name: 'Engineering', title: 'Website & Web App Development in Sri Lanka | Paralox Media' },
  media: { name: 'Media', title: 'AI Creative Agency in Sri Lanka: AI Films, Video & Branding | Paralox Media' },
  growth: { name: 'Growth', title: 'Performance & Digital Marketing in Sri Lanka | Paralox Media' },
};
const capabilityFor = (key) => CAPABILITIES.find((c) => c.href === `/${key}`);
export const workIn = (key) => WORK.filter((w) => w.href && w.pillars?.includes(key));
const projectFor = (w) => w && PROJECTS.find((p) => `/work/${p.id}` === w.href);
export const mainPillarOf = (p) => WORK.find((w) => w.href === `/work/${p.id}`)?.pillars?.[0] || p.pillar.toLowerCase();

export const ROUTE_META = {
  '/': page('/', {
    title: 'Paralox Media | AI Creative & Technology Agency in Sri Lanka',
    ogTitle: 'Paralox Media — AI creative & technology agency in Sri Lanka',
    description: 'Paralox Media is an AI creative and technology agency in Colombo, Sri Lanka. We make AI films and creatives, build AI agents and automation, develop websites and apps, and run performance marketing.',
    ...card('home'), type: 'website',
  }, {
    // The home page FAQ, so search and AI answers can quote it directly.
    extra: [{
      '@type': 'FAQPage', '@id': `${SITE}/#faq`,
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }],
  }),
  '/about': page('/about', {
    title: 'About Paralox Media | AI Creative & Technology Agency, Colombo',
    ogTitle: 'About · Paralox Media',
    description: 'An AI creative and technology agency founded in Colombo, Sri Lanka in 2025, bringing AI, engineering, media and growth together in one team.',
    ...card('about'), type: 'website',
  }, { type: 'AboutPage', trail: [{ name: 'About', path: '/about' }] }),
  // The founder's own page: a ProfilePage about him, with the consultation as an hourly offer.
  [FOUNDER.path]: page(FOUNDER.path, {
    title: FOUNDER.seoTitle,
    ogTitle: `${FOUNDER.name} · Leading AI trainer & AI consultant in Sri Lanka`,
    description: FOUNDER.lede,
    image: FOUNDER.portrait, width: 975, height: 1300, type: 'profile',
  }, {
    type: 'ProfilePage',
    trail: [{ name: FOUNDER.name, path: FOUNDER.path }],
    extra: [
      { '@id': `${SITE}${FOUNDER.path}#webpage`, mainEntity: { '@id': `${SITE}${FOUNDER.path}#person` } },
      {
        '@type': 'Service', '@id': `${SITE}${FOUNDER.path}#consultation`,
        name: `AI strategy consultation with ${FOUNDER.name}`,
        serviceType: 'AI consulting', description: FOUNDER.consult.text,
        provider: { '@id': `${SITE}${FOUNDER.path}#person` },
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer', price: FOUNDER.rate.amount, priceCurrency: FOUNDER.rate.currency, url: `${SITE}${FOUNDER.path}#consult`,
          priceSpecification: { '@type': 'UnitPriceSpecification', price: FOUNDER.rate.amount, priceCurrency: FOUNDER.rate.currency, unitCode: 'HUR', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' } },
        },
      },
      {
        '@type': 'VideoObject', '@id': `${SITE}${FOUNDER.path}#workshop`,
        name: FOUNDER.workshop.title, description: FOUNDER.workshop.text,
        thumbnailUrl: `${SITE}${FOUNDER.workshop.poster}`, embedUrl: `https://www.youtube.com/embed/${FOUNDER.workshop.youtube}`,
        url: `https://www.youtube.com/shorts/${FOUNDER.workshop.youtube}`, uploadDate: '2026-10-29', duration: 'PT21S',
        creator: { '@id': `${SITE}${FOUNDER.path}#person` },
      },
      { '@type': 'FAQPage', '@id': `${SITE}${FOUNDER.path}#faq`, mainEntity: FOUNDER.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }),
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
  '/works': page('/works', {
    title: 'Our Work: Films, Websites & Campaigns | Paralox Media',
    ogTitle: 'Our work · Paralox Media',
    description: 'Projects by Paralox Media: AI launch films for Nissan, a vendor portal for ExxonMobil, event coverage for Ritzbury, e-commerce and campaigns in Sri Lanka.',
    image: PROJECTS[0].hero, type: 'website',
  }, {
    type: 'CollectionPage', trail: [{ name: 'Work', path: '/works' }],
    extra: [{
      '@type': 'ItemList', '@id': `${SITE}/works#projects`,
      itemListElement: WORK.filter((w) => w.href).map((w, i) => ({
        '@type': 'ListItem', position: i + 1, url: `${SITE}${w.href}`, name: w.title, description: w.text,
      })),
    }],
  }),
  ...Object.fromEntries(Object.entries(WORK_PILLARS).map(([key, c]) => {
    const path = `/works/${key}`;
    const items = workIn(key);
    return [path, page(path, {
      title: c.seoTitle, ogTitle: `${c.heading} · Paralox Media`, description: c.intro,
      // Preview image: the first project's still, else the pillar's branded card.
      ...(projectFor(items[0]) ? { image: projectFor(items[0]).hero } : card(key)), type: 'website',
    }, {
      type: 'CollectionPage', trail: [{ name: 'Work', path: '/works' }, { name: c.name, path }],
      extra: [{
        '@type': 'ItemList', '@id': `${SITE}${path}#projects`,
        itemListElement: items.map((w, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}${w.href}`, name: w.title, description: w.text })),
      }],
    })];
  })),
  '/careers': page('/careers', {
    title: 'Careers at Paralox Media | Jobs in Colombo, Sri Lanka',
    ogTitle: 'Careers · Paralox Media',
    description: `Join Paralox Media in Colombo. Open roles: ${VACANCIES.map((v) => v.title).join(', ')}. Remote and hybrid options.`,
    image: teamPhoto, width: 1122, height: 1402, type: 'website',
  }, {
    type: 'CollectionPage', trail: [{ name: 'Careers', path: '/careers' }],
    extra: [{
      '@type': 'ItemList', '@id': `${SITE}/careers#roles`,
      itemListElement: VACANCIES.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/careers/${v.id}`, name: v.title })),
    }],
  }),
  // One page per open role, each with its JobPosting so it can appear in Google's job listings.
  ...Object.fromEntries(VACANCIES.map((v) => {
    const path = `/careers/${v.id}`;
    return [path, page(path, {
      title: `${v.title} | Careers at Paralox Media, Colombo`,
      ogTitle: `We are hiring: ${v.title} · Paralox Media`,
      description: v.summary,
      ...(v.poster ? { image: v.poster } : card('about')), type: 'website',
    }, {
      trail: [{ name: 'Careers', path: '/careers' }, { name: v.title, path }],
      extra: [{
        '@type': 'JobPosting',
        '@id': `${SITE}${path}#job`,
        title: v.title,
        description: `<p>${v.summary}</p>${v.duties ? `<p>What you’ll do:</p><ul>${v.duties.map((d) => `<li>${d}</li>`).join('')}</ul>` : ''}<p>What you bring:</p><ul>${v.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>`,
        datePosted: v.posted,
        validThrough: `${Number(v.posted.slice(0, 4)) + 1}${v.posted.slice(4)}`,
        employmentType: v.employmentType,
        hiringOrganization: { '@id': ORG_ID },
        directApply: true,
        url: `${SITE}${path}`,
        ...(v.poster && { image: abs(v.poster) }),
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', streetAddress: '14 Sir Baron Jayathilake Mawatha', addressLocality: 'Colombo', postalCode: '00100', addressCountry: 'LK' },
        },
        ...(!v.onsite && { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'Sri Lanka' } }),
      }],
    })];
  })),
  // Landing pages (AI agency, AI video, agentic AI in Sri Lanka): Service + FAQPage, and the film as a VideoObject.
  ...Object.fromEntries(LANDING_PAGES.map((l) => [l.path, page(l.path, {
    title: l.seoTitle,
    ogTitle: `${l.h1} · Paralox Media`,
    description: l.lede,
    ...card(l.path === '/ai-video-sri-lanka' ? 'media' : l.path === '/ai-engineering-sri-lanka' ? 'engineering' : 'ai'), type: 'website',
  }, {
    trail: [{ name: l.h1, path: l.path }],
    extra: [
      {
        '@type': 'Service', '@id': `${SITE}${l.path}#service`,
        name: l.title, serviceType: l.title, description: l.lede,
        provider: { '@id': ORG_ID },
        areaServed: ORGANIZATION.areaServed.map((name) => ({ '@type': 'Country', name })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: l.title,
          itemListElement: l.sides.flatMap((s) => s.points).map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p } })),
        },
      },
      {
        '@type': 'FAQPage', '@id': `${SITE}${l.path}#faq`,
        mainEntity: l.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      ...(l.film ? [{
        '@type': 'VideoObject', '@id': `${SITE}${l.path}#film`,
        name: l.film.title, description: l.film.caption,
        thumbnailUrl: abs(l.film.poster), contentUrl: abs(l.film.src), uploadDate: '2026-10-22', duration: l.film.duration,
        creator: { '@id': ORG_ID },
      }] : []),
    ],
  })])),
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
    trail: [{ name: 'Work', path: '/works' }, { name: WORK_PILLARS[mainPillarOf(p)]?.name || p.pillar, path: `/works/${mainPillarOf(p)}` }, { name: p.title, path }],
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
      ...(p.videos?.length > 0 && { video: p.videos.map((v) => ({
        '@type': 'VideoObject',
        name: `${p.title}: ${v.title}`,
        description: v.text,
        thumbnailUrl: abs(v.poster),
        ...(v.youtube
          ? { embedUrl: `https://www.youtube.com/embed/${v.youtube}`, url: `https://www.youtube.com/watch?v=${v.youtube}` }
          : { contentUrl: abs(v.src) }),
        uploadDate: p.iso,
        duration: v.duration,
      })) }),
      // Instagram-hosted reels are referenced by URL.
      ...((p.reels?.length || p.bts || p.instagram?.length) && {
        associatedMedia: [...(p.reels || []), ...(p.bts ? [p.bts.post] : []), ...(p.instagram || []).flatMap((g) => g.posts)]
          .map((code) => ({ '@type': 'MediaObject', url: `https://www.instagram.com/p/${code}/` })),
      }),
      mainEntityOfPage: { '@id': `${url}#webpage` },
    }],
  });
}

// /services is the home page scrolled to the pillars; Google should index it as /.
ROUTE_META['/services'] = { ...ROUTE_META['/'], canonical: '/' };

