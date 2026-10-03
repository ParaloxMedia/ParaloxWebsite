import { POSTS, PILLARS, CONTACT, WORK, WORK_PILLARS, FAQ, CLIENTS, ABOUT } from '../data/content';
import { PROJECTS } from '../data/projects';
import { ROUTE_META, workIn, mainPillarOf } from './routeMeta';

/* ---------- Page text for crawlers that do not run JavaScript ----------
   Many AI crawlers (and link unfurlers) read only the HTML. The build writes
   this outline of each page into its <div id="root">; React replaces it on load.
   Same facts as the rendered page, so search engines and answer engines see
   what visitors see. Only the build reads this file (via ./ssr.js), so it stays
   out of the app bundle. */
const pillarName = (key) => WORK_PILLARS[key]?.name || key;
const workItems = (list) => list.map((w) => ({ name: w.title, href: w.href, text: `${w.meta}. ${w.text}` }));
const SERVICES_SECTION = {
  h2: 'Services',
  items: Object.entries(PILLARS).map(([key, p]) => ({ name: pillarName(key), href: `/${key}`, text: p.lede })),
};

export const ROUTE_BODY = {
  '/': {
    h1: 'Paralox Media: AI, engineering, media and growth in Colombo, Sri Lanka',
    intro: ROUTE_META['/'].description,
    sections: [
      SERVICES_SECTION,
      { h2: 'Selected work', items: workItems(WORK), more: { href: '/works', label: 'See all work' } },
      { h2: 'Clients and partners', paras: [`We have produced work for ${CLIENTS.map((c) => c.name).join(', ')}.`] },
      { h2: 'Questions, answered', items: FAQ.map((f) => ({ name: f.q, text: f.a })) },
      { h2: 'Latest from Pulse', items: POSTS.slice(0, 3).map((p) => ({ name: p.title, href: `/pulse/${p.id}`, text: p.excerpt })) },
    ],
  },
  '/about': {
    h1: 'About Paralox Media',
    intro: ROUTE_META['/about'].description,
    sections: [
      { h2: 'How we work', items: ABOUT.traits.map((t) => ({ name: t.t, text: t.p })) },
      { h2: 'Team', items: ABOUT.team.map((t) => ({ name: `${t.name}, ${t.role}`, text: t.text })) },
      { h2: 'Markets', paras: [`Based in Colombo, working with clients in ${ABOUT.markets.join(', ')}.`] },
      SERVICES_SECTION,
    ],
  },
  '/works': {
    h1: 'Our work',
    intro: ROUTE_META['/works'].description,
    sections: [
      { h2: 'Work by pillar', items: Object.entries(WORK_PILLARS).map(([key, c]) => ({ name: c.heading, href: `/works/${key}`, text: c.intro })) },
      { h2: 'Projects', items: workItems(WORK) },
    ],
  },
  '/pulse': {
    h1: 'Pulse: news, events and insights',
    intro: ROUTE_META['/pulse'].description,
    sections: [{ h2: 'Articles', items: POSTS.map((p) => ({ name: p.title, href: `/pulse/${p.id}`, text: p.excerpt })) }],
  },
  '/contact': {
    h1: 'Contact Paralox Media',
    intro: ROUTE_META['/contact'].description,
    sections: [{ h2: 'Get in touch', items: [
      { name: 'Phone and WhatsApp', text: CONTACT.phone },
      { name: 'Email', text: CONTACT.email },
      { name: 'Office', text: CONTACT.address },
    ] }],
  },
  ...Object.fromEntries(Object.entries(PILLARS).map(([key, p]) => [`/${key}`, {
    h1: p.title.join(' '),
    intro: p.lede,
    sections: [
      { h2: p.servicesTitle.join(' '), paras: [p.servicesLede], items: p.services.map((s) => ({ name: s.name, text: `${s.text} (${s.tags.join(', ')})` })) },
      ...(workIn(key).length ? [{ h2: WORK_PILLARS[key].heading, items: workItems(workIn(key)), more: { href: `/works/${key}`, label: `See all ${WORK_PILLARS[key].heading}` } }] : []),
    ],
  }])),
  ...Object.fromEntries(Object.entries(WORK_PILLARS).map(([key, c]) => [`/works/${key}`, {
    h1: c.heading,
    intro: c.intro,
    sections: [{ h2: 'Projects', items: workItems(workIn(key)) }, { h2: 'Services', items: [{ name: `${c.name} services`, href: `/${key}`, text: PILLARS[key].lede }] }],
  }])),
  ...Object.fromEntries(PROJECTS.map((p) => [`/work/${p.id}`, {
    h1: p.headline,
    intro: p.summary,
    sections: [
      { h2: 'Project', items: (p.facts || []).map(([k, v]) => ({ name: k, text: v })) },
      ...(p.story?.length ? [{ h2: 'The story', paras: p.story }] : []),
      ...(p.videos?.length ? [{ h2: 'Films', items: p.videos.map((v) => ({ name: v.title, text: v.text })) }] : []),
      { h2: 'More work', items: [{ name: `${WORK_PILLARS[mainPillarOf(p)]?.heading || 'Work'}`, href: `/works/${mainPillarOf(p)}` }, { name: 'All work', href: '/works' }] },
    ],
  }])),
  ...Object.fromEntries(POSTS.map((p) => [`/pulse/${p.id}`, {
    h1: p.title,
    intro: p.kicker || p.excerpt,
    sections: [
      { paras: p.body || [p.excerpt] },
      ...(p.highlights?.length ? [{ h2: 'Highlights', items: p.highlights.map((h) => ({ name: h.title, text: h.text })) }] : []),
    ],
  }])),
};
ROUTE_BODY['/services'] = ROUTE_BODY['/'];
