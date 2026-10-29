import { POSTS, PILLARS, CONTACT, WORK, WORK_PILLARS, FAQ, CLIENTS, ABOUT } from '../data/content';
import { PROJECTS } from '../data/projects';
import { LANDING_PAGES } from '../data/aiAgency';
import { FOUNDER } from '../data/founder';
import { VACANCIES, WHY_JOIN, CAREER_FAQ } from '../data/careers';
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
    h1: 'Paralox Media: AI creative and technology agency in Sri Lanka',
    intro: ROUTE_META['/'].description,
    sections: [
      SERVICES_SECTION,
      { h2: 'Selected work', items: workItems(WORK.filter((w) => w.home !== false)), more: { href: '/works', label: 'See all work' } },
      { h2: 'Clients and partners', paras: [`We have produced work for ${CLIENTS.map((c) => c.name).join(', ')}.`] },
      { h2: 'Questions, answered', items: FAQ.map((f) => ({ name: f.q, text: f.a })) },
      { h2: 'Latest from Pulse', items: POSTS.slice(0, 3).map((p) => ({ name: p.title, href: `/pulse/${p.id}`, text: p.excerpt })) },
    ],
  },
  '/about': {
    h1: 'About Paralox Media',
    image: { src: '/team/abubakker-bakthathi.jpg', alt: 'Abubakker Bakthathi, Founder & CEO of Paralox Media', width: 800, height: 800 },
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
  '/careers': {
    h1: 'Careers at Paralox Media',
    intro: ROUTE_META['/careers'].description,
    sections: [
      { h2: 'Open roles', items: VACANCIES.map((v) => ({ name: v.title, href: `/careers/${v.id}`, text: `${v.type}, ${v.location}. ${v.summary}` })) },
      { h2: 'Why Paralox', items: WHY_JOIN.map((w) => ({ name: w.title, text: w.text })) },
      { h2: 'Hiring, answered', items: CAREER_FAQ.map((f) => ({ name: f.q, text: f.a })) },
    ],
  },
  ...Object.fromEntries(VACANCIES.map((v) => [`/careers/${v.id}`, {
    h1: v.title,
    intro: `${v.summary} ${v.type}, ${v.location}.`,
    sections: [
      ...(v.duties ? [{ h2: 'What you’ll do', items: v.duties.map((d) => ({ name: d })) }] : []),
      { h2: 'What you bring', items: v.requirements.map((r) => ({ name: r })) },
      { h2: 'How to apply', paras: ['Apply on this page with your CV and portfolio. We shortlist within 5 working days, then run an interview or a short task.'], more: { href: '/careers', label: 'See all open roles' } },
    ],
  }])),
  ...Object.fromEntries(LANDING_PAGES.map((l) => [l.path, {
    h1: l.h1,
    intro: `${l.lede} Rated ${l.rating.value.toFixed(1)} on Google from ${l.rating.count} reviews.`,
    sections: [
      { h2: 'Proof', items: l.proof.map((p) => ({ name: p.stat, href: p.href, text: p.label })) },
      ...(l.film ? [{ h2: l.film.title, paras: [l.film.caption], more: { href: l.film.href, label: 'How we made it' } }] : []),
      ...l.sides.map((s) => ({ h2: `${s.kicker}: ${s.title}`, paras: [s.text], items: [...s.points.map((p) => ({ name: p })), ...s.work.map((w) => ({ name: w.name, href: w.href }))] })),
      ...(l.steps ? [{ h2: 'How we work', items: l.steps.map((s) => ({ name: s.title, text: s.text })) }] : []),
      { h2: l.whyTitle, items: l.why.map((w) => ({ name: w.title, text: w.text })) },
      { h2: `${l.faqTitle.join(' ')}`, items: l.faq.map((f) => ({ name: f.q, text: f.a })) },
      { h2: 'More from Paralox Media', items: LANDING_PAGES.filter((o) => o.path !== l.path).map((o) => ({ name: o.h1, href: o.path })) },
    ],
  }])),
  [FOUNDER.path]: {
    h1: `${FOUNDER.name}: AI leader, trainer and consultant in Sri Lanka`,
    intro: FOUNDER.lede,
    image: { src: FOUNDER.headshot, alt: `${FOUNDER.name}, ${FOUNDER.role}`, width: 800, height: 800 },
    sections: [
      { h2: 'Highlights', items: FOUNDER.highlights.map((h) => ({ name: h.stat, href: h.href, text: h.label })) },
      { h2: `As featured in ${FOUNDER.feature.outlet}`, paras: [`“${FOUNDER.feature.headline}”, by ${FOUNDER.feature.author}, ${FOUNDER.feature.date}.`, ...FOUNDER.feature.quotes.map((q) => `“${q}”`)], more: { href: FOUNDER.feature.url, label: 'Read the full interview at The Morning' } },
      { h2: 'From engineer to founder', paras: FOUNDER.story },
      { h2: 'What he advises on', items: FOUNDER.expertise.map((x) => ({ name: x.title, text: x.text })) },
      { h2: 'Where he teaches AI', items: FOUNDER.teaching.map((t) => ({ name: `${t.role}, ${t.org}`, href: t.href, text: `${t.when}. ${t.text}` })) },
      { h2: FOUNDER.workshop.title, paras: [`${FOUNDER.workshop.meta}.`, FOUNDER.workshop.text], more: { href: `https://www.youtube.com/shorts/${FOUNDER.workshop.youtube}`, label: 'Watch on YouTube' } },
      { h2: 'Skills', items: FOUNDER.skills.map((g) => ({ name: g.group, text: g.items.join(', ') })) },
      { h2: 'In his words', items: FOUNDER.quotes.map((q) => ({ name: q.source, href: q.href, text: `“${q.text}”` })) },
      { h2: `${FOUNDER.consult.title}: USD ${FOUNDER.rate.amount} per hour`, paras: [FOUNDER.consult.text], items: FOUNDER.consult.includes.map((x) => ({ name: x })) },
      { h2: 'Press and talks', items: FOUNDER.press.map((x) => ({ name: x.name, href: x.href })) },
      { h2: 'About Abubakker', items: FOUNDER.faq.map((f) => ({ name: f.q, text: f.a })) },
    ],
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
      ...(p.process?.length ? [{ h2: 'How we made it', items: p.process.map((s) => ({ name: s.title, text: s.text })) }] : []),
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
