// /abubakker-bakthathi: personal page for the founder (not linked in the nav; in the sitemap
// and llms.txt so search and AI answers can find him). Facts come from published interviews
// and Pulse posts; the consultation request posts to the contact form endpoint.

export const FOUNDER = {
  path: '/abubakker-bakthathi',
  name: 'Abubakker Bakthathi',
  role: 'Founder & CEO, Paralox Media',
  email: 'abubakker@paraloxmedia.com',
  linkedin: 'https://www.linkedin.com/in/bakthathi/',
  connect: 'https://abubakker98.github.io/Connect/',
  kicker: 'AI strategist & AI consultant · Colombo, Sri Lanka',
  seoTitle: 'Abubakker Bakthathi | AI Strategist & AI Consultant in Sri Lanka',
  lede: 'Abubakker Bakthathi is an AI strategist and AI consultant in Sri Lanka, and the founder and CEO of Paralox Media, with 6+ years across software engineering, AI and growth. He helps business leaders turn AI from a buzzword into results: AI films and creatives, AI agents and automation, and a clear plan for where AI fits in their business.',
  portrait: '/team/abubakker-bakthathi-portrait.jpg',
  headshot: '/team/abubakker-bakthathi.jpg',
  rate: { amount: 150, currency: 'USD', unit: 'hour' },
  highlights: [
    { stat: 'Founder', label: 'Paralox Media, an AI creative and technology agency, founded in Colombo in 2025', href: '/about' },
    { stat: 'Cover', label: 'Happinez at The Sunday Morning, with an in-depth interview, July 2026', href: '/pulse/news-sunday-morning-happinez-2026' },
    { stat: '1 day', label: 'To lead Renault Sri Lanka’s AI film from storyboard to 4K master', href: '/work/renault-ai-tvc' },
    { stat: '20+', label: 'AI sessions delivered to 500+ people, including the Rotaract Club of Colombo Mid Town workshop', href: '/pulse/past-rotaract-ai-workshop-2026' },
  ],
  story: [
    'Abubakker started freelancing with a close friend to pay for university, building websites and digital work for clients while he studied. That habit of solving real problems for real businesses never left.',
    'He went on to spend more than three years as a software engineer for Third Space Global, a UK company, working remotely from Sri Lanka, alongside part-time web development for La Maison in the UAE. In 2025 his job ended in an AI-driven transformation. Rather than fear the technology, he set out to understand it. In his words: “AI wasn’t the problem; the world was evolving and businesses needed to adapt.”',
    'In 2025 he founded Paralox Media in Colombo to help businesses make that shift: one team for AI, engineering, media and growth. Within its first year the company became a production partner to WPP Media and MullenLowe Sri Lanka, working on campaigns for brands such as Nissan, Renault, Keells and Commercial Bank.',
    'Today he leads Paralox Media’s strategy and every client partnership, speaks about AI and careers at events in Colombo, and advises founders and leadership teams on how to use AI well. His goal is for Paralox Media to become one of Sri Lanka’s leading AI innovation companies and to prove that a Sri Lankan company can compete on the global stage.',
  ],
  expertise: [
    { glyph: 'ai', title: 'AI strategy', text: 'Where AI fits in your business, what to do first, and what to leave alone, as a clear, costed plan.' },
    { glyph: 'play', title: 'AI video and creative', text: 'How to use AI films, visuals and content in your marketing without losing quality or your brand.' },
    { glyph: 'agent', title: 'AI agents and automation', text: 'Which tasks an AI agent can take on, on WhatsApp, web and email, and how to roll it out safely.' },
    { glyph: 'growth', title: 'AI for marketing and growth', text: 'Using AI to plan, produce and measure campaigns against the numbers your business runs on.' },
    { glyph: 'code', title: 'AI products and SaaS', text: 'Shaping an AI product idea, choosing the build approach and planning the first release.' },
    { glyph: 'user', title: 'AI for your team', text: 'Helping your people work with AI, from prompt skills to new roles, so adoption sticks.' },
  ],
  // The Sunday Morning cover interview, featured near the top of the page.
  feature: {
    outlet: 'Happinez · The Sunday Morning',
    headline: 'Inside the vision behind Paralox Media with Abubakker Bakthathi',
    author: 'Nuskiya Nasar Aakhir',
    date: '26 July 2026',
    iso: '2026-07-26',
    url: 'https://www.themorning.lk/articles/ZfDBpXFjPctroSm6LX1J',
    story: '/pulse/news-sunday-morning-happinez-2026',
    quotes: [
      'We’re not in the business of selling services, we’re in the business of creating meaningful, measurable impact.',
      'AI is only as valuable as the way in which it is used.',
    ],
  },
  quotes: [
    { text: 'I help businesses see AI not as a threat, but as their most powerful competitive advantage.', source: 'Abubakker Bakthathi', href: 'https://abubakker98.github.io/Connect/' },
    { text: 'AI wasn’t the problem; the world was evolving and businesses needed to adapt.', source: 'Happinez, The Sunday Morning', href: '/pulse/news-sunday-morning-happinez-2026' },
    { text: 'The better question is not ‘Will AI replace me?’ but ‘How can AI help me become better at what I do?’', source: 'Happinez, The Sunday Morning', href: '/pulse/news-sunday-morning-happinez-2026' },
    { text: 'Each and everyone can learn from each other and build new things. The Sri Lankan ecosystem will come to that level, like what Europe and other countries do.', source: 'BuiltList, Grok Bot Meetup Colombo', href: '/pulse/past-grok-bot-meetup-colombo-2026' },
  ],
  // Skills, grouped (from his own profile).
  skills: [
    { group: 'AI and strategy', items: ['AI strategy and consulting', 'Generative AI', 'AI agents and chatbots', 'AI automation', 'LLM integration', 'RAG systems', 'Prompt engineering'] },
    { group: 'Engineering', items: ['React and Next.js', 'Node.js and Express', 'Laravel and PHP', 'MySQL and MongoDB', 'REST and GraphQL APIs', 'Figma'] },
    { group: 'Marketing and growth', items: ['Brand strategy', 'Performance marketing', 'Google Ads and Meta Ads', 'SEO', 'Content strategy', 'GA4'] },
    { group: 'Leadership', items: ['Team leadership', 'Product strategy', 'Agile and Scrum', 'Business development', 'Startup scaling'] },
  ],
  consult: {
    title: 'Book a consultation',
    text: 'One hour, one-to-one, on your business and AI. Bring a question, an idea or a problem; leave with clear next steps.',
    includes: [
      'A one-to-one video call (or in person in Colombo, by arrangement)',
      'Honest advice on where AI fits in your business and where it does not',
      'Ideas for AI video, AI agents, automation or AI products, specific to you',
      'A short written summary of the recommendations after the call',
    ],
    topics: ['AI strategy for my business', 'AI video and creative', 'AI agents and automation', 'AI for marketing and growth', 'An AI product or startup idea', 'Something else'],
    durations: [1, 2],
  },
  press: [
    { name: 'Connect with Abubakker: profile, experience and skills', href: 'https://abubakker98.github.io/Connect/', source: 'Personal profile' },
    { name: 'Follow Abubakker on LinkedIn', href: 'https://www.linkedin.com/in/bakthathi/', source: 'LinkedIn' },
    { name: 'On the cover of Happinez at The Sunday Morning', href: '/pulse/news-sunday-morning-happinez-2026' },
    { name: 'Read the full interview at The Morning', href: 'https://www.themorning.lk/articles/ZfDBpXFjPctroSm6LX1J' },
    { name: 'Meet the founder: BuiltList at the Grok Bot Meetup Colombo', href: '/pulse/past-grok-bot-meetup-colombo-2026' },
    { name: 'Speaker: AI & Automation Career Impact Workshop', href: '/pulse/past-rotaract-ai-workshop-2026' },
  ],
  faq: [
    { q: 'Who is Abubakker Bakthathi?', a: 'Abubakker Bakthathi is the founder and CEO of Paralox Media, an AI creative and technology agency in Colombo, Sri Lanka, founded in 2025. A former software and AI engineer, he is an AI strategist and AI consultant who advises businesses on AI strategy, AI video, AI agents and automation.' },
    { q: 'Who is an AI consultant in Sri Lanka?', a: 'Abubakker Bakthathi is an AI consultant and AI strategist based in Colombo, Sri Lanka. He offers one-to-one AI consultations for business owners and leadership teams, drawing on the AI films, agents and automation his company Paralox Media builds for brands.' },
    { q: 'How much does an AI consultation with Abubakker cost?', a: 'A consultation is USD 150 per hour. You can request a one- or two-hour session on this page; the time and payment details are confirmed by email.' },
    { q: 'What happens in a consultation?', a: 'You share your business, goals and questions before the call. In the session, Abubakker gives honest advice on where AI can help, what to do first and what to avoid, with ideas specific to your business. You receive a short written summary afterwards.' },
    { q: 'Is the consultation online or in person?', a: 'Online by video call by default, so it works from anywhere. In-person sessions in Colombo can be arranged.' },
  ],
};
