// All site copy and data in one place. Edit here; components read from it.
import reviewsData from './reviews.json';
import { PULSE_POSTS } from './pulse';
import wppLogo from '../assets/clients/wpp-media.jpeg';
import mullenloweLogo from '../assets/clients/mullenlowe.png';
import ritzburyCard from '../assets/projects/ritzbury/range-set.jpg';
import pngCard from '../assets/projects/png-embroidery/cover.jpg';
import aceCard from '../assets/projects/ace-plus/cover.jpg';
import eliteCard from '../assets/projects/elite/cover.jpg';
import fixitCard from '../assets/projects/drfixit/homeowner.jpg';
import keellsCard from '../assets/projects/keells/cover.jpg';
import krestCard from '../assets/projects/keells-krest/cover.jpg';
import combankCard from '../assets/projects/combank/morning-rush.jpg';
import hnbCard from '../assets/projects/hnb/banner.jpg';
import webxpayCard from '../assets/projects/webxpay/card.jpg';
import malibanCard from '../assets/projects/maliban/poster-card.jpg';
import nissanLogo from '../assets/clients/nissan.png';
import combankLogo from '../assets/clients/combank.jpg';
import keellsLogo from '../assets/clients/keells.png';
import krestLogo from '../assets/clients/keells-krest.png';
import malibanLogo from '../assets/clients/maliban.png';
import drfixitLogo from '../assets/clients/dr-fixit.jpeg';
import ritzburyLogo from '../assets/clients/ritzbury.jpeg';
import ratthiLogo from '../assets/clients/ratthi.jpeg';
import atlasLogo from '../assets/clients/atlas.jpeg';
import edinboroughLogo from '../assets/clients/edinborough.jpeg';
import yevanLogo from '../assets/clients/yevan-david.webp';
import webxpayLogo from '../assets/clients/webxpay.jpg';
import rugbyLogo from '../assets/clients/sri-lanka-rugby.png';
import rnbLogo from '../assets/clients/rnb-special-tours.png';
import abidsLogo from '../assets/clients/abids.png';
import eliteLogo from '../assets/clients/elite-indian.jpeg';
import pngLogo from '../assets/clients/png-embroidery.jpeg';

export const CONTACT = {
  email: 'info@paraloxmedia.com',
  // Contact form delivery: Formspree forwards each message by email to the account's inbox
  // (info@paraloxmedia.com), with the sender as reply-to. Change this to use another form.
  formEndpoint: 'https://formspree.io/f/xlgojvpr',
  phone: '+94 75 032 8833',
  phoneRaw: '+94750328833',
  whatsapp: 'https://wa.me/94750328833',
  address: '14 Sir Baron Jayathilake Mawatha, Colombo 00100',
  addressLines: ['14 Sir Baron Jayathilake Mawatha,', 'Colombo 00100, Sri Lanka'],
  company: 'Paralox Media (Pvt) Ltd',
  mapUrl: 'https://share.google/OLWGlhYJcXxfnxpm2',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7921.236963852193!2d79.83456194400787!3d6.9361187344054125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b427f63d9%3A0x63fc4d439b617856!2sParalox%20Media%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1790530082228!5m2!1sen!2slk',
  reviewsUrl: 'https://www.google.com/search?q=paralox+media#lrd=0x3ae2593b427f63d9:0x63fc4d439b617856,1,,,,',
};

export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/paralox.media' },
  { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/paralox-media' },
  { key: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/paralox.media' },
  { key: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@paralox.media' },
];

// Client logos for the "Trusted by leading brands" strip (files in src/assets/clients).
// fit: 'cover' for logos that come on their own full-colour background (fills the tile),
//      'contain' for logos on white/transparent (shown whole with padding). dark: white-only logo.
export const CLIENTS = [
  { name: 'WPP Media', logo: wppLogo, fit: 'cover' },
  { name: 'Keells Krest', logo: krestLogo, fit: 'cover' },
  { name: 'MullenLowe Sri Lanka', logo: mullenloweLogo, fit: 'contain' },
  { name: 'Nissan', logo: nissanLogo, fit: 'contain' },
  { name: 'Commercial Bank', logo: combankLogo, fit: 'cover' },
  { name: 'Dr. Fixit', logo: drfixitLogo, fit: 'cover' },
  { name: 'Keells', logo: keellsLogo, fit: 'cover' },
  { name: 'Ritzbury', logo: ritzburyLogo, fit: 'cover' },
  { name: 'Maliban', logo: malibanLogo, fit: 'cover' },
  { name: 'Ratthi', logo: ratthiLogo, fit: 'cover' },
  { name: 'Atlas', logo: atlasLogo, fit: 'contain' },
  { name: 'Edinborough', logo: edinboroughLogo, fit: 'cover' },
  { name: 'Yevan David', logo: yevanLogo, fit: 'contain', dark: true },
  { name: 'WebXPay', logo: webxpayLogo, fit: 'cover' },
  { name: 'Sri Lanka Rugby', logo: rugbyLogo, fit: 'contain' },
  { name: 'RNB Special Tours', logo: rnbLogo, fit: 'contain' },
  { name: "Abid's Restaurant", logo: abidsLogo, fit: 'cover' },
  { name: 'Elite Indian Restaurant', logo: eliteLogo, fit: 'cover' },
  { name: 'PNG Embroidery', logo: pngLogo, fit: 'cover' },
];

export const TICKER = [
  { t: 'AI agents' }, { t: 'Automation', o: true }, { t: 'Web apps' }, { t: 'Brand films', o: true },
  { t: 'AI creatives' }, { t: 'Performance', o: true }, { t: 'Branding' }, { t: 'Custom software', o: true },
];

// Capabilities showcase on the home page (key matches a scene)
export const CAPABILITIES = [
  { key: 'ai', title: 'AI', href: '/ai', desc: 'Agents, automation and integrations that take routine work off your team and plug into the tools you already use.', chips: ['AI agents', 'Business automation', 'AI integrations'] },
  { key: 'eng', title: 'Engineering', href: '/engineering', desc: 'Websites, web applications and custom software, engineered for speed, security and the next five years of your business.', chips: ['Website development', 'Web applications', 'Custom software'] },
  { key: 'media', title: 'Media', href: '/media', desc: 'Brand films, AI creatives, campaign assets and identities, produced by one team from script to final grade.', chips: ['AI creatives', 'Video production', 'Campaign creatives', 'Branding'] },
  { key: 'growth', title: 'Growth', href: '/growth', desc: 'Performance marketing, campaign strategy and optimisation, reported against the numbers your business runs on.', chips: ['Growth marketing', 'Performance marketing', 'Campaign strategy', 'Optimisation'] },
];

export const DROPDOWN = [
  { href: '/ai', glyph: 'ai', title: 'AI', text: 'Agents, automation and integrations.' },
  { href: '/engineering', glyph: 'code', title: 'Engineering', text: 'Websites, web apps and custom software.' },
  { href: '/media', glyph: 'play', title: 'Media', text: 'Brand films, AI creatives and branding.' },
  { href: '/growth', glyph: 'growth', title: 'Growth', text: 'Performance marketing and strategy.' },
];

// Pillar pages
export const PILLARS = {
  ai: {
    title: ['Make', 'intelligence', 'useful'],
    lede: 'AI agents, automation and integrations that take routine work off your team and plug into the tools you already use.',
    cta: 'Start an AI project',
    scene: 'robots',
    floats: [
      { glyph: 'agent', s: 92, pos: { left: '6%', top: '9%' }, d: 16, dur: 10, rot: -6 },
      { glyph: 'flow', s: 72, pos: { left: '48%', top: '2%' }, d: 22, dur: 12, delay: -4, rot: 7 },
      { glyph: 'chat', s: 80, pos: { right: '4%', top: '24%' }, d: 14, dur: 9, delay: -2, rot: 5 },
      { glyph: 'data', s: 64, pos: { left: '2%', top: '54%' }, d: 10, dur: 11, delay: -7, rot: -4 },
    ],
    servicesTitle: ['Agents and automations', 'that do real work'],
    servicesLede: 'We start with one task your team repeats every day, and build from there.',
    code: 'AI',
    services: [
      { name: 'AI agents', text: 'Customer and sales agents that answer enquiries on WhatsApp, Instagram, web chat and email, qualify leads, and hand over to a person with the conversation attached.', tags: ['WhatsApp', 'Web chat', 'Lead qualification', 'Human handover'] },
      { name: 'Business automation', text: 'Workflows that move data between forms, CRMs, sheets and inboxes, and produce quotations, invoices and reports without manual copy and paste.', tags: ['Quotations', 'Invoicing', 'CRM sync', 'Reporting'] },
      { name: 'AI integrations', text: 'Language models connected to your documents, product data and systems, with the access controls you set and a clear record of what the AI can and cannot see.', tags: ['Knowledge assistants', 'Product data', 'Access control'] },
    ],
    next: { href: '/engineering', label: 'Next pillar', title: 'Engineering' },
  },
  engineering: {
    title: ['Build', 'it right'],
    lede: 'Websites, web applications and custom software, engineered for speed, security and the next five years of your business.',
    cta: 'Start a build',
    scene: 'eng', tilt: { y: -12, x: 6 }, floorWidth: '70%',
    floats: [
      { glyph: 'code', s: 84, pos: { left: 0, top: '6%' }, d: 18, dur: 10, rot: -7 },
      { glyph: 'cloud', s: 70, pos: { right: '6%', top: '62%' }, d: 14, dur: 12, delay: -5, rot: 6 },
      { glyph: 'api', s: 64, pos: { left: '4%', top: '70%' }, d: 10, dur: 9, delay: -2, rot: 4 },
    ],
    servicesTitle: ['Software that', 'holds up'],
    servicesLede: 'Clean code, documented handover, and hosting you own.',
    code: 'ENG',
    services: [
      { name: 'Website development', text: 'Corporate sites, e-commerce stores and campaign microsites, designed and built to load fast, rank well and stay easy for your team to update.', tags: ['Next.js', 'WordPress', 'Shopify', 'WooCommerce'] },
      { name: 'Web applications', text: 'Portals, dashboards and internal tools: order tracking, booking, rental and staff systems that replace spreadsheets with one reliable source of truth.', tags: ['React', 'Node', 'Supabase', 'Postgres'] },
      { name: 'Custom software', text: 'Systems built around how your business actually runs, with APIs to connect them to payments, messaging and the AI tools you add next.', tags: ['APIs', 'Payments', 'Integrations', 'Cloud'] },
    ],
    next: { href: '/media', label: 'Next pillar', title: 'Media' },
  },
  media: {
    title: ['Make', 'people', 'notice'],
    lede: 'Brand films, AI creatives, campaign assets and identities, produced by one team from script to final grade.',
    cta: 'Brief a production',
    scene: 'media', tilt: { y: 12, x: 5 }, floorWidth: '70%',
    floats: [
      { glyph: 'spark', s: 82, pos: { right: '2%', top: '4%' }, d: 18, dur: 10, rot: 8 },
      { glyph: 'audio', s: 68, pos: { left: '2%', top: '64%' }, d: 12, dur: 12, delay: -4, rot: -6 },
    ],
    servicesTitle: ['Work people', 'stop for'],
    servicesLede: 'Live action, green screen or fully AI. We recommend the route before a single frame is shot.',
    code: 'MED',
    services: [
      { name: 'AI creatives', text: 'Generated imagery, AI video and virtual sets that let campaigns move faster and test more versions, directed by people with a production background.', tags: ['AI video', 'Virtual sets', 'Key visuals'] },
      { name: 'Video production', text: 'Brand films, TV commercials, event coverage and social cut-downs, with multi-camera crews, green screen and full post-production.', tags: ['Brand films', 'TVC', 'Event coverage', 'Reels'] },
      { name: 'Campaign creatives', text: 'Static, motion and social assets built as one system, so every format in a campaign looks and sounds like the same brand.', tags: ['Social', 'Motion', 'OOH', 'Digital ads'] },
      { name: 'Branding', text: 'Identities, guidelines and brand systems for businesses that are launching, repositioning or growing into new markets.', tags: ['Identity', 'Guidelines', 'Packaging'] },
    ],
    next: { href: '/growth', label: 'Next pillar', title: 'Growth' },
  },
  growth: {
    title: ['Make', 'growth', 'measurable'],
    lede: 'Performance marketing, campaign strategy and optimisation, reported against the numbers your business runs on.',
    cta: 'Plan a campaign',
    scene: 'growth', tilt: { y: -10, x: 8 }, floorWidth: '76%',
    floats: [
      { glyph: 'search', s: 80, pos: { left: '2%', top: '4%' }, d: 18, dur: 11, rot: -7 },
      { glyph: 'funnel', s: 66, pos: { right: 0, top: '66%' }, d: 12, dur: 9, delay: -3, rot: 6 },
    ],
    servicesTitle: ['Spend you can', 'account for'],
    servicesLede: 'Enquiries, bookings, orders and cost per result come first. Reach comes second.',
    code: 'GRW',
    services: [
      { name: 'Growth marketing', text: 'Monthly social and content programmes planned around business goals, with a content calendar your team can review before anything goes live.', tags: ['Content calendars', 'Social management', 'Community'] },
      { name: 'Performance marketing', text: 'Paid campaigns on Meta, Google, TikTok and LinkedIn, built around conversion tracking that is set up and tested before the first budget is spent.', tags: ['Meta', 'Google', 'TikTok', 'LinkedIn'] },
      { name: 'Campaign strategy', text: 'Launch and seasonal campaigns planned end to end: audience, message, channel mix, creative and the budget split between them.', tags: ['Launches', 'Seasonal', 'Media planning'] },
      { name: 'Optimisation', text: 'SEO, landing page and conversion improvements, tested one change at a time so you know which ones moved the number.', tags: ['SEO', 'Landing pages', 'A/B testing'] },
    ],
    band: true,
    next: { href: '/ai', label: 'Back to the start', title: 'AI' },
  },
};

export const PROCESS = [
  { n: '01 →', t: 'Ideas', p: 'Discovery session and a written brief with scope, method and timing.' },
  { n: '02 →', t: 'Intelligence', p: 'Research, data and the right tools for the job.' },
  { n: '03 →', t: 'Systems', p: 'Design and build, reviewed with you at each milestone.' },
  { n: '04 →', t: 'Execution', p: 'Launch, produce and deliver, with documented handover.' },
  { n: '05', t: 'Growth', p: 'Measure against the agreed numbers and improve.' },
];

export const FLOWS = [
  { tag: 'Flow / 01 · Sales + Support', title: 'Enquiry to booking', nodes: [
    { g: 'chat', k: 'Trigger', b: 'WhatsApp enquiry', s: 'A customer asks about price and availability.' },
    { g: 'agent', k: 'AI step', b: 'Agent replies', s: 'Answers from your price list and live calendar.' },
    { g: 'calendar', k: 'Action', b: 'Booking confirmed', s: 'The slot is added to your calendar.' },
    { g: 'user', k: 'Handover', b: 'Team takes over', s: 'A person gets the conversation with context attached.' },
  ] },
  { tag: 'Flow / 02 · Operations + Finance', title: 'Request to quotation', nodes: [
    { g: 'mail', k: 'Trigger', b: 'Quote request', s: 'A form or email arrives with the brief.' },
    { g: 'ai', k: 'AI step', b: 'Draft quotation', s: 'Priced line by line from your rate card.' },
    { g: 'check', k: 'Review', b: 'Manager approves', s: 'One check before anything leaves the building.' },
    { g: 'doc', k: 'Result', b: 'Branded PDF sent', s: 'The client receives it in minutes, not days.' },
  ] },
  { tag: 'Flow / 03 · Growth', title: 'Campaign to report', nodes: [
    { g: 'growth', k: 'Trigger', b: 'Campaign data', s: 'Meta and Google results, pulled each week.' },
    { g: 'ai', k: 'AI step', b: 'Plain-language summary', s: 'What happened, why, and what to change.' },
    { g: 'check', k: 'Review', b: 'Strategist checks', s: 'Every line is read by a person.' },
    { g: 'mail', k: 'Result', b: 'Report delivered', s: 'In your inbox on a fixed day each week.' },
  ] },
];

// `pillars` files each project under /works/<pillar>; the first is its main pillar.
// `home: false` keeps a project on the Works pages only, out of the home page's Selected work.
// `year` defaults to 2026.
export const WORK = [
  { size: 'lg', code: 'Launch films', glyph: 'play', meta: 'Media · With WPP Media', title: 'Nissan Gravite launch', pillars: ['media'], text: 'Three AI-generated launch films for the Nissan Gravite, then the after-movie and reels from launch night. Produced for Nissan as WPP Media\u2019s production house.', chips: ['AI launch films', 'Event after-movie', 'Social reels'], href: '/work/nissan-gravite', image: '/work/nissan-gravite/launch-film.jpg' },
  { size: 'sm', code: 'Vendor portal', glyph: 'browser', meta: 'Engineering · Design and development', title: 'ExxonMobil × PNG Embroidery vendor portal', pillars: ['engineering'], text: 'A mobile-responsive vendor portal for ExxonMobil’s uniform orders: ordering and tracking for staff, with quotations, invoicing and a CRM for PNG Embroidery.', chips: ['Mobile responsive', 'Ordering', 'Quotations', 'Invoicing', 'CRM'], href: '/work/exxonmobil-png-embroidery-vendor-portal', image: pngCard },
  { size: 'sm', code: 'Event shoot', glyph: 'play', meta: 'Media · With WPP Media', title: 'Ritzbury MasterChef Masterclass', pillars: ['media'], text: 'Full video coverage, fast-cut reels with playful voice-over edits, and a product and people photoshoot on the MasterChef set.', chips: ['Event coverage', 'Reels', 'Photoshoot', 'AI video'], href: '/work/ritzbury-masterchef-masterclass', image: ritzburyCard },
  { code: 'E-commerce', glyph: 'browser', meta: 'Engineering · Revamp and development', title: 'Ace+ online electronics store', pillars: ['engineering'], text: 'A revamped, mobile-responsive WooCommerce store for a Sri Lankan electronics retailer, with search and filters, product comparison, wishlists, order tracking and a store locator.', chips: ['WooCommerce', 'Mobile responsive', 'Revamp'], href: '/work/ace-plus-online-store', image: aceCard },
  { code: 'Campaign', glyph: 'growth', meta: 'Growth · Elite Indian Restaurant', title: 'Elite Koththu Rush', pillars: ['growth', 'media'], text: 'A brand awareness campaign and koththu-eating challenge that put a slow-moving dish in the spotlight. After the event, koththu sales reached their peak.', chips: ['Campaign', 'Event', 'Reels', 'Posters'], href: '/work/elite-koththu-rush', image: eliteCard },
  { code: 'Testimonials', glyph: 'play', meta: 'Media · Video production', title: 'Dr. Fixit customer testimonials', pillars: ['media'], home: false, text: 'Two customer testimonial films for Dr. Fixit, the waterproofing brand: a dealer and a homeowner from Hanwella talk about the products on camera.', chips: ['Testimonials', 'Interviews', 'Post-production'], href: '/work/dr-fixit-customer-testimonials', image: fixitCard },
  { code: 'Content shoot', glyph: 'play', meta: 'Media · With MullenLowe Sri Lanka', title: 'Keells × MasterChef Sri Lanka content shoot', pillars: ['media'], home: false, text: 'Reels for Keells, the official retail partner of MasterChef Sri Lanka, with the contestants in store and in the MasterChef kitchen. Produced as MullenLowe Sri Lanka’s production house.', chips: ['Content shoot', 'Social reels', 'Post-production'], href: '/work/keells-masterchef-sri-lanka', image: keellsCard },
  { code: 'Event coverage', glyph: 'play', meta: 'Media · With WPP Media', title: 'Keells Krest × E FM Mother’s Day Cook Off', pillars: ['media'], home: false, text: 'Event coverage of the E FM Mother’s Day Cook Off for Keells Krest, plus short films with five mothers and their children. Produced as WPP Media’s production house.', chips: ['Event coverage', 'Family stories', 'Social content'], href: '/work/keells-krest-mothers-day-cook-off', image: krestCard },
  { code: 'Campaign content', glyph: 'play', meta: 'Media · With WPP Media', title: 'ComBank Google Pay and self-onboarding campaigns', pillars: ['media'], home: false, text: 'Short films and social posts for Commercial Bank’s Google Pay Tap & Pay and self-onboarding campaigns, in English and Sinhala.', chips: ['Campaign films', 'Social posts', 'English and Sinhala'], href: '/work/combank-google-pay-self-onboarding', image: combankCard },
  { code: 'Motion animation', glyph: 'play', meta: 'Media · With WPP Media', title: 'HNB self onboarding explainer', pillars: ['media'], home: false, text: 'A motion-animated explainer for Hatton National Bank: opening a savings account with self onboarding, step by step.', chips: ['Motion animation', 'Explainer', 'Vertical video'], href: '/work/hnb-self-onboarding', image: hnbCard },
  { code: 'AI video', glyph: 'growth', meta: 'Growth · WebXPay', title: 'WebXPay GovPay campaign', year: '2025', pillars: ['growth', 'media'], home: false, text: 'An AI video campaign for WebXPay GovPay, made in the early days of AI video: pay a traffic fine online in minutes. The reel passed 280K views on Instagram.', chips: ['AI video', '280K+ views', 'Direct client'], href: '/work/webxpay-govpay', image: webxpayCard },
  { code: 'Long-form reels', glyph: 'play', meta: 'Media · With MullenLowe Sri Lanka', title: 'Yevan David with Maliban', pillars: ['media'], home: false, text: 'Long-form vertical content with racing driver Yevan David, rating unexpected Maliban biscuit combos: pole position or DNF. Produced as MullenLowe Sri Lanka’s production house.', chips: ['Talent shoot', 'Long-form reels', 'Post-production'], href: '/work/maliban-yevan-david', image: malibanCard },
];

// Category pages under /works, one per pillar.
export const WORK_PILLARS = {
  ai: { name: 'AI', heading: 'AI work', intro: 'AI-generated films, agents and automation we have built and produced for brands in Sri Lanka and beyond.', seoTitle: 'AI Projects: AI Video & Automation Work | Paralox Media' },
  engineering: { name: 'Engineering', heading: 'Engineering work', intro: 'Websites, e-commerce stores, portals and web applications we have designed and developed, built mobile-first.', seoTitle: 'Web Development Portfolio: Websites & Portals | Paralox Media' },
  media: { name: 'Media', heading: 'Media work', intro: 'Launch films, event coverage, reels and photoshoots we have produced for brands and agencies in Sri Lanka.', seoTitle: 'Video Production Portfolio: Films, Events & Reels | Paralox Media' },
  growth: { name: 'Growth', heading: 'Growth work', intro: 'Campaigns and performance marketing that moved real numbers for the businesses we work with.', seoTitle: 'Marketing Campaign Portfolio: Growth Work | Paralox Media' },
};

export const STATS = [
  { n: 4, l: 'Pillars under one roof' },
  { n: 6, l: 'Markets served from Colombo' },
  { n: 50, plus: true, l: 'Brands we have produced work for' },
  { n: 2, l: 'Global agency networks we produce for' },
];

export const WHY = [
  { k: 'Principle / One team', t: 'Connected', p: 'AI, engineering, media and growth under one roof. The people who plan your campaign also build the site it lands on.' },
  { k: 'Principle / Precision', t: 'Precise', p: 'Exact scope, method and timing agreed in writing before work begins. Clear advice, and no results we cannot measure.' },
  { k: 'Principle / Human + AI', t: 'Together', p: 'Technology amplifies your people. It never replaces the judgement and taste that make your business yours.' },
];

export const FAQ = [
  { q: 'How does a project start?', a: 'With a discovery call and a written brief. You receive the scope, method, timing and cost in writing before any work begins.' },
  { q: 'Do you work with clients outside Sri Lanka?', a: 'Yes. We are based in Colombo and work with clients in the UAE, Saudi Arabia, Singapore, Qatar and the United Kingdom. Most collaboration happens over video calls and shared workspaces, with on-ground production arranged per project.' },
  { q: 'Can you work alongside our agency or in-house team?', a: 'Yes. We produce work for agency networks including WPP Media and MullenLowe, and we slot into in-house teams as a production or technology partner.' },
  { q: 'Which AI tools do you use?', a: 'We choose tools per project: language models for agents and assistants, automation platforms for workflows, and generative video and audio tools for production. We recommend what fits your data, budget and security needs, and we explain what the AI can and cannot see.' },
  { q: 'How do you report results?', a: 'Monthly reports open with three lines: what happened against the target, why we believe it happened, and what changes next month. You see the numbers your business runs on, such as enquiries, bookings, orders and cost per result.' },
  { q: 'Do you offer monthly retainers?', a: 'Yes. Social, content and performance marketing usually run on a monthly retainer. Websites, software and productions are usually priced as projects.' },
];

// Google reviews, refreshed from the Places API on every build by scripts/fetch-reviews.mjs.
// Each review is { name, rating (1-5), text, date, photo (optional URL), url (optional) }.
export const REVIEWS = reviewsData.reviews;

// Events are labelled Upcoming or Past from their date, so the label never goes stale.
// A past event swaps its sign-up button for a general one.
const today = new Date().toISOString().slice(0, 10);
const LABELS = { 'Company News': 'Company news' };
const withLabels = (p) => {
  if (p.kind !== 'event') return { ...p, pillar: LABELS[p.pillar] || p.pillar };
  const past = p.iso < today;
  return {
    ...p,
    pillar: past ? 'Past event' : 'Upcoming event',
    upcoming: !past,
    cta: past && p.event?.status !== 'past' ? { label: 'Work with us', href: '/contact' } : p.cta,
  };
};

// Every Pulse post, newest first. The home page shows the first three.
export const POSTS = [...PULSE_POSTS].map(withLabels).sort((a, b) => (a.iso < b.iso ? 1 : -1));

export const PULSE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'news', label: 'News' },
  { key: 'event', label: 'Events' },
  { key: 'insight', label: 'Insights' },
];

export const ABOUT = {
  strike: ['a social-media agency', 'a software company', 'an AI agency', 'a production company', 'a marketing consultancy'],
  pairs: [['Human', 'AI'], ['Strategy', 'Execution'], ['Creative', 'Engineering'], ['Paralox', 'Client'], ['Technology', 'Business'], ['Ideas', 'Growth']],
  traits: [
    { g: 'ai', t: 'Intelligent', p: 'Complex technology, explained plainly.' },
    { g: 'check', t: 'Precise', p: 'Exact scope, method and timing.' },
    { g: 'growth', t: 'Confident', p: 'Clear advice, no overstated results.' },
    { g: 'spark', t: 'Contemporary', p: 'Current tools, uncluttered design.' },
  ],
  team: [
    { lead: true, initials: 'AB', role: 'Founder & CEO', name: 'Abubakker Bakthathi', text: 'Leads strategy and every client partnership across AI, engineering, media and growth.' },
    { g: 'play', role: 'Media', name: 'Creative Director', text: 'Brand films, AI creatives, campaigns and identity.' },
    { g: 'growth', role: 'Growth', name: 'Marketing Lead', text: 'Campaign strategy, performance marketing and reporting.' },
    { g: 'code', role: 'AI + Engineering', name: 'Tech Lead', text: 'AI agents, automation, web apps and custom software.' },
  ],
  markets: ['Sri Lanka', 'UAE', 'Saudi Arabia', 'Singapore', 'Qatar', 'United Kingdom'],
};
