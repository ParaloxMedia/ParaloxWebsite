const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT  = process.env.PORT || 8080;
const BUILD = path.join(__dirname, 'build');
const LOGO  = '/images/Logo/Paralox%20Logo%20Color.png';

/* ── Per-route meta config ─────────────────────────────────────────────── */
const ROUTES = {
  '/': {
    title: 'Paralox Media | AI Agency & Digital Marketing | AI Agent Development',
    description: 'Paralox Media is a leading AI agency offering AI agent development, AI-powered digital marketing, social media management, web development, and performance marketing worldwide.',
  },
  '/about': {
    title: 'About Us | AI Agency Team & Mission | Paralox Media',
    description: 'Learn about Paralox Media — a global AI agency founded in 2025. Meet our team of AI strategists, developers, designers, and marketers building AI-powered business solutions worldwide.',
  },
  '/services': {
    title: 'Our Services | AI Agent Development & Digital Marketing | Paralox Media',
    description: 'Explore Paralox Media\'s full range of services: AI agent development, AI-driven digital marketing, social media management, web & app development, SEO, video production, and performance marketing.',
  },
  '/packages': {
    title: 'Pricing & Packages | AI Marketing & SMM Plans | Paralox Media',
    description: 'Transparent pricing for AI-powered digital marketing, social media management, and performance marketing. Plans for startups to enterprises. Currency auto-detected by location.',
  },
  '/pulse': {
    title: 'Pulse | AI Marketing News, Events & Insights | Paralox Media',
    description: 'Paralox Pulse — your source for AI marketing insights, company news, past events, and upcoming workshops and launches from Paralox Media.',
  },
  '/contact': {
    title: 'Contact Us | Get a Free AI & Digital Marketing Quote | Paralox Media',
    description: 'Contact Paralox Media to discuss AI agent development, digital marketing, social media management, or web development. Get a free consultation for your business today.',
  },
  '/careers': {
    title: 'Careers | Join Our AI & Digital Marketing Team | Paralox Media',
    description: 'Join Paralox Media — a fast-growing AI agency. We\'re hiring AI developers, digital marketers, designers, and more. Apply now and help shape the future of AI-powered business.',
  },
  '/gallery': {
    title: 'Portfolio & Gallery | AI Marketing & Creative Work | Paralox Media',
    description: 'Browse Paralox Media\'s portfolio of AI-powered digital marketing campaigns, social media content, web development projects, video production, and brand design work.',
  },
};

/* ── Blog post meta (mirrors src/data/blog.js) ─────────────────────────── */
/* image paths are relative — base URL is prepended at request time         */
const PULSE_POSTS = {
  'upcoming-smm-tool-launch-2026':    { title: 'SMM Automation Tool — Official Launch | Paralox Pulse',                                               description: 'We\'re launching our in-house SMM Automation Tool — built to simplify the client-agency relationship and deliver consistently better social media output.',                                             image: null },
  'upcoming-genai-masterclass-2026':  { title: 'Generative AI Masterclass — For Our Team & You | Paralox Pulse',                                      description: 'A focused Gen AI masterclass open to the Paralox team and select external attendees. Covering prompt engineering, AI content creation, AI video, and real-world applications.',                          image: null },
  'past-rotaract-ai-workshop-2026':   { title: 'AI & Automation: Career Impact Workshop — Rotaract Colombo Mid Town | Paralox Pulse',                  description: 'Paralox Media CEO Abubakker Bakthathi took the stage as a featured speaker at the Rotaract Club of Colombo Mid Town\'s AI & Automation: Career Impact Workshop.',                                        image: '/images/events/rotaract-banner.jpg' },
  'news-zahira-silver-sponsor-2025':  { title: 'Paralox Media — Silver Sponsor at Zahira College\'s 133rd Anniversary Cricket Tournament | Paralox Pulse', description: 'Paralox Media proudly stepped in as Silver Sponsor for the Zahira College Group of 2010 Cricket Tournament at the 133rd Anniversary celebrations.',                                                   image: '/images/events/zahira-2.jpg' },
  'news-wpp-media-partnership-2025':  { title: 'Paralox Media Partners with WPP Media Sri Lanka | Paralox Pulse',                                     description: 'Paralox Media has partnered with WPP Media Sri Lanka — the world\'s largest advertising group. We are now producing AI-generated creatives for their campaigns.',                                       image: null },
  'news-mullenlowe-partnership-2026': { title: 'Paralox Media Onboarded with MullenLowe Sri Lanka — Production Partner for LoweDigital | Paralox Pulse', description: 'Paralox Media has officially partnered with MullenLowe Sri Lanka, working directly with LoweDigital on production.',                                                                                              image: null },
  'news-keells-maliban-onboard-2026': { title: 'Welcoming Keells, Maliban & More to the Paralox Family | Paralox Pulse',                              description: 'Paralox Media announces new partnerships with iconic Sri Lankan brands — Keells, Maliban, Edinburgh, Yevan, Ritsbury, Kreset, and Masterchef Sri Lanka.',                                              image: null },
  'insight-ai-marketing-2026':        { title: '5 Ways AI Is Transforming Digital Marketing in 2026 | Paralox Labs',                                  description: 'From hyper-personalised ad copy to real-time campaign optimisation — here\'s how AI is reshaping what\'s possible for brands of every size.',                                                          image: null },
  'insight-ai-agents-2026':           { title: 'How AI Agents Are Replacing Traditional Customer Support | Paralox Labs',                             description: 'One of our clients reduced response times by 60% and cut support costs by 40% after deploying a custom AI agent. Here\'s how it works.',                                                                image: null },
  'news-global-expansion-2026':       { title: 'Paralox Media Now Serving Clients in 7+ Countries | Paralox Pulse',                                   description: 'From Sri Lanka to Singapore, UAE to the UK — our global footprint continues to grow as demand for AI-powered digital solutions rises worldwide.',                                                       image: null },
};

/* ── MIME types ────────────────────────────────────────────────────────── */
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

function injectMeta(html, urlPath, base) {
  const route = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '').split('?')[0];

  const pulseMatch = route.match(/^\/pulse\/(.+)$/);
  const isPulsePost = !!pulseMatch;
  const meta = isPulsePost
    ? (PULSE_POSTS[pulseMatch[1]] || ROUTES['/pulse'])
    : (ROUTES[route] || ROUTES['/']);

  const canonical  = `${base}${route}`;
  const imagePath  = meta.image || LOGO;
  const imageUrl   = imagePath.startsWith('http') ? imagePath : `${base}${imagePath}`;
  const ogType     = isPulsePost ? 'article' : 'website';

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  /* 1. Fix <title> */
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);

  /* 2. Strip all existing OG / Twitter / description / canonical tags */
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*\/?>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');

  /* 3. Inject a fresh complete set — og:type article triggers large card */
  const tags = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="Paralox Media" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(imageUrl)}" />`,
    `<meta property="og:image:secure_url" content="${esc(imageUrl)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@paraloxmedia" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(imageUrl)}" />`,
  ].join('\n');

  return html.replace('</head>', `${tags}\n</head>`);
}

/* ── Server ────────────────────────────────────────────────────────────── */
const server = http.createServer((req, res) => {
  const urlPath  = req.url.split('?')[0];
  const filePath = path.join(BUILD, urlPath);
  const ext      = path.extname(filePath).toLowerCase();

  /* Serve static assets directly */
  if (ext && ext !== '.html' && fs.existsSync(filePath)) {
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000',
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  /* Detect actual base URL from request (works on any domain) */
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host'] || req.headers['host'] || 'paraloxmedia.com';
  const base  = `${proto}://${host}`;

  /* All HTML routes — serve index.html with injected meta */
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    res.writeHead(404);
    res.end('Build not found. Run npm run build first.');
    return;
  }

  const html     = fs.readFileSync(indexPath, 'utf8');
  const injected = injectMeta(html, urlPath, base);
  res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
  res.end(injected);
});

server.listen(PORT, () => console.log(`Paralox Media server running on port ${PORT}`));
