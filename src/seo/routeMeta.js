// Link-preview metadata for every page, keyed by URL path.
// Built at build time (vite build --ssr) so image imports resolve to the same
// hashed /assets/... URLs as the site, then written to dist/route-meta.json for
// server.cjs to inject. WhatsApp, LinkedIn and Facebook don't run JavaScript,
// so this is the only way shared links show the right title, text and photo.
import { POSTS, PILLARS } from '../data/content';

const DEFAULT_IMAGE = '/apple-touch-icon.png';
const SITE_TITLE = 'Paralox Media — Building the future of AI-powered business solutions';
const SITE_DESC = 'AI, engineering, media and growth working together to move ambitious businesses forward.';

// Same order the article page uses for its header: explicit hero, then the
// first croppable photo; for link previews also any photo, then the partner logo.
const imageOf = (p) =>
  p.hero || p.photos?.find((ph) => !ph.whole)?.src || p.photos?.[0]?.src || p.logo?.src || DEFAULT_IMAGE;

const pillarTitle = (key) => ({ ai: 'AI', engineering: 'Engineering', media: 'Media', growth: 'Growth' }[key]);

export const ROUTE_META = {
  '/': { title: SITE_TITLE, description: SITE_DESC, image: DEFAULT_IMAGE, type: 'website' },
  '/about': {
    title: 'About · Paralox Media',
    description: 'A creative technology company building intelligent systems, experiences and media. AI, engineering, media and growth in one team.',
    image: DEFAULT_IMAGE, type: 'website',
  },
  '/pulse': {
    title: 'Pulse · Paralox Media',
    description: 'Notes from the work: what we are building, testing and learning across AI, engineering, media and growth.',
    image: DEFAULT_IMAGE, type: 'website',
  },
  '/contact': {
    title: 'Contact · Paralox Media',
    description: 'Tell us what your business needs next, and we will show you how AI, engineering, media and growth can get it there.',
    image: DEFAULT_IMAGE, type: 'website',
  },
  ...Object.fromEntries(Object.entries(PILLARS).map(([key, p]) => [
    `/${key}`,
    { title: `${pillarTitle(key) || key} · Paralox Media`, description: p.lede, image: DEFAULT_IMAGE, type: 'website' },
  ])),
  ...Object.fromEntries(POSTS.map((p) => [
    `/pulse/${p.id}`,
    { title: p.title, description: p.excerpt, image: imageOf(p), type: 'article', published: p.iso },
  ])),
};
