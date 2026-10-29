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
  kicker: 'Founder & CEO, Paralox Media · AI trainer & lecturer',
  seoTitle: 'Abubakker Bakthathi | Founder & CEO, Paralox Media · AI Trainer & Lecturer',
  lede: 'Abubakker Bakthathi is the founder and CEO of Paralox Media, an AI creative and technology agency in Colombo, Sri Lanka. He is also a leading AI trainer and lecturer: he lectures on AI for Leadership & Business Productivity at Inspire College, trains corporate teams with Cocoon and BuildrLabs, and has delivered 20+ AI sessions to more than 500 people.',
  portrait: '/team/abubakker/abubakker-bakthathi-portrait.jpg',
  hero: '/team/abubakker/abubakker-bakthathi-hero.jpg',
  // Hero: one line per row, then the two side labels.
  heroLines: ['Training teams', 'on AI that works', 'in real life'],
  heroSide: [['Founder & CEO', 'Paralox Media'], ['AI trainer', '& lecturer']],
  headshot: '/team/abubakker/abubakker-bakthathi.jpg',
  rate: { amount: 150, currency: 'USD', unit: 'hour' },
  highlights: [
    { stat: 'Founder', label: 'Founder & CEO of Paralox Media, an AI creative and technology agency in Colombo', href: '/about' },
    { stat: '20+', label: 'AI sessions delivered to 500+ people, for corporate teams, colleges and communities', href: '#teaching' },
    { stat: 'Lecturer', label: 'AI for Leadership & Business Productivity, Inspire College', href: '#teaching' },
    { stat: 'Trainer', label: 'AI Trainer & Consultant with Cocoon, and applied AI trainer with BuildrLabs', href: '#teaching' },
  ],
  story: [
    'Abubakker started freelancing with a close friend to pay for university, building websites and digital work for clients while he studied. That habit of solving real problems for real people never left.',
    'He went on to spend more than three years as a software engineer for Third Space Global, a UK company, working remotely from Sri Lanka, alongside part-time web development for La Maison in the UAE. In 2025 his job ended in an AI-driven transformation. Rather than fear the technology, he set out to understand it. In his words: “AI wasn’t the problem; the world was evolving and businesses needed to adapt.”',
    'That became his mission: helping people and businesses adapt. He founded Paralox Media in Colombo in 2025, and he started training others in what he learned.',
    'Today he lectures on AI for Leadership & Business Productivity at Inspire College, trains corporate teams as an AI Trainer & Consultant with Cocoon and as an applied AI trainer with BuildrLabs, speaks at events across Colombo, and advises founders and leadership teams one-to-one on how to use AI well.',
  ],
  expertise: [
    { glyph: 'ai', title: 'AI strategy', text: 'Where AI fits in your business, what to do first, and what to leave alone, as a clear, costed plan.', points: ['AI readiness review', 'Priorities and roadmap', 'Build, buy or skip', 'Costs and returns'] },
    { glyph: 'play', title: 'AI video and creative', text: 'How to use AI films, visuals and content in your marketing without losing quality or your brand.', points: ['AI films and ads', 'Realism and consistency', 'AI voice and music', 'Brand-safe workflows'] },
    { glyph: 'agent', title: 'AI agents and automation', text: 'Which tasks an AI agent can take on, on WhatsApp, web and email, and how to roll it out safely.', points: ['WhatsApp and web agents', 'Workflow automation', 'Data and access rules', 'Human handover'] },
    { glyph: 'growth', title: 'AI for marketing and growth', text: 'Using AI to plan, produce and measure campaigns against the numbers your business runs on.', points: ['Campaign planning', 'Content at scale', 'Performance marketing', 'Measurement'] },
    { glyph: 'code', title: 'AI products and SaaS', text: 'Shaping an AI product idea, choosing the build approach and planning the first release.', points: ['Product shaping', 'LLM and RAG design', 'MVP scope', 'Launch plan'] },
    { glyph: 'user', title: 'AI training for your team', text: 'Hands-on workshops where your people learn prompt engineering, AI video and automation, and leave with real work done.', points: ['Corporate workshops', 'Leadership sessions', 'Prompt and GenAI skills', 'Adoption that sticks'] },
  ],
  // Why work with him: three columns.
  why: [
    { glyph: 'user', title: 'A trainer first', text: 'He lectures at Inspire College and trains corporate teams with Cocoon and BuildrLabs, so he knows how to make AI click for people, not just for engineers.' },
    { glyph: 'code', title: 'An engineer underneath', text: 'Years as a software engineer mean his advice comes from how AI systems really work, not from headlines.' },
    { glyph: 'spark', title: 'Hands-on, every time', text: 'People leave his sessions having made something real with AI: a prompt workflow, a video, an automation.' },
    { glyph: 'check', title: 'Straight answers', text: 'He will tell you where AI will not help, too. No buzzwords, no lock-in, just a plan your team can act on.' },
  ],
  // Where he trains and lectures (from his LinkedIn and the trainer pages).
  teaching: [
    { org: 'Inspire College', role: 'Lecturer, AI for Leadership & Business Productivity', when: 'Oct 2026 – present', text: 'Lecturing on the AI for Leadership and Business Productivity programme in the Department of Continuing Professional Development, helping professionals and business leaders use AI to improve productivity, support decisions and run better operations.' },
    { org: 'Cocoon', role: 'AI Trainer & Consultant', when: 'Jan 2026 – present', text: 'Corporate training and consulting on generative AI, automation and business integration. Designed and delivered hands-on workshops for corporate teams including WIA Systems Inc., with participants producing real output by the end of each session.', href: 'https://mycocoon.life/trainers' },
    { org: 'BuildrLabs', role: 'Applied AI trainer', when: 'Hatch Works, Colombo', text: 'In-person applied AI training for working professionals: AI solutions, consulting and training for brands.', href: 'https://buildrlabs.ai/trainers/' },
  ],
  // A Short from his workshop, shown in the training section.
  workshop: {
    youtube: 'T0ha4SJjOhk',
    poster: '/team/abubakker/applied-ai-workshop.jpg',
    title: 'AI for Creativity at the Applied AI Workshop',
    meta: 'BuildrLabs · Hatch Works, Colombo · delivered by Cocoon',
    text: 'Abubakker and Lishan Peiris showed real AI work made for brands and broke down the workflows behind it: brand strategy and design, image creation, character-led AI video, and how to choose the right model. Everyone got hands-on and made their own videos by the end of the session.',
    channel: 'https://www.youtube.com/@AbubakkerBakthathi',
  },
  // Events, talks and workshops he has run or attended.
  events: [
    { kind: 'Workshop · Trainer', title: 'Applied AI Workshop: AI for Creativity', meta: 'BuildrLabs · Hatch Works, Colombo · delivered by Cocoon', text: 'Co-led with Lishan Peiris: brand strategy and design, image creation, character-led AI video and choosing the right model, with everyone making their own videos.', image: '/team/abubakker/web/bl1-main.jpg', pos: '50% 40%', thumbs: ['/team/abubakker/web/bl1-room.jpg', '/team/abubakker/web/bl1-talk.jpg', '/team/abubakker/web/bl1-team.jpg'], href: 'https://www.youtube.com/shorts/T0ha4SJjOhk' },
    { kind: 'Workshop · Trainer', title: 'Applied AI Workshop: how generative AI works', meta: 'BuildrLabs · Hatch Works, Colombo', text: 'From how language models turn context into the next word to using them well at work, with a full room of professionals building along.', image: '/team/abubakker/web/bl2-main.jpg', thumbs: ['/team/abubakker/web/bl2-talk.jpg', '/team/abubakker/web/bl2-screen.jpg', '/team/abubakker/web/bl2-room.jpg'], href: 'https://buildrlabs.ai/trainers/' },
    { kind: 'Corporate training · Cocoon', title: 'AI training for WIA Systems', meta: 'Cocoon · corporate team training', text: 'Hands-on workshops for WIA Systems, a leading ERP and enterprise technology provider, on AI for marketing, creative production, workflow automation and development.', image: '/team/abubakker/web/wia-main.jpg', thumbs: ['/team/abubakker/web/wia-room.jpg', '/team/abubakker/web/wia-desk.jpg', '/team/abubakker/web/wia-wide.jpg'], href: 'https://mycocoon.life/trainers' },
    { kind: 'Corporate training · Cocoon', title: 'Ideation & Research with AI at Derana', meta: 'Cocoon · Derana', text: 'A full-house session for the Derana team on using AI for ideation and research, from first idea to structured creative direction.', image: '/team/abubakker/web/derana-main.jpg', pos: '50% 35%', thumbs: ['/team/abubakker/web/derana-stage.jpg', '/team/abubakker/web/derana-talk.jpg'], href: 'https://mycocoon.life/trainers' },
    { kind: 'Event · Attended', title: 'Grok Bot Meetup Colombo', meta: 'DHPL Auditorium, Colombo · October 2026', text: 'Joined builders and founders at the first Grok Bot meetup in Colombo, and spoke to BuiltList about his journey and what Sri Lanka’s founders need next.', image: '/team/abubakker/web/grok-main.jpg', thumbs: ['/team/abubakker/web/grok-talk.jpg'], href: '/pulse/past-grok-bot-meetup-colombo-2026' },
    { kind: 'Talk · Featured speaker', title: 'AI & Automation: Career Impact Workshop', meta: 'Rotaract Club of Colombo Mid Town · Speaker Session 01 · January 2026', text: 'Speaker Session 01, “Evaluation of AI & its impact”: how AI is influencing industries, businesses and everyday life, the new roles it creates and why prompt engineering matters.', image: '/team/abubakker/web/rotaract-main.jpg', thumbs: ['/team/abubakker/web/rotaract-talk.jpg', '/team/abubakker/web/rotaract-zoom.jpg'], href: '/pulse/past-rotaract-ai-workshop-2026' },
  ],
  // Recognition and talks, as hairline rows.
  recognition: [
    { title: 'Lecturer, AI for Leadership & Business Productivity', meta: '2026 · Inspire College', href: '#teaching' },
    { title: 'AI Trainer & Consultant', meta: '2026 · Cocoon', href: 'https://mycocoon.life/trainers' },
    { title: 'Applied AI trainer', meta: '2026 · BuildrLabs', href: 'https://buildrlabs.ai/trainers/' },
    { title: 'Cover feature, Happinez', meta: '2026 · The Sunday Morning', href: '/pulse/news-sunday-morning-happinez-2026' },
    { title: 'Attended, Grok Bot Meetup Colombo', meta: '2026 · Interviewed by BuiltList', href: '/pulse/past-grok-bot-meetup-colombo-2026' },
    { title: 'Featured speaker, AI & Automation workshop', meta: '2026 · Rotaract Club of Colombo Mid Town', href: '/pulse/past-rotaract-ai-workshop-2026' },
  ],
  trust: ['Helping Sri Lanka’s leaders,', 'teams and builders', 'work with AI.'],
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
    { name: 'Grok Bot Meetup Colombo, and the BuiltList interview', href: '/pulse/past-grok-bot-meetup-colombo-2026' },
    { name: 'Speaker: AI & Automation Career Impact Workshop', href: '/pulse/past-rotaract-ai-workshop-2026' },
  ],
  faq: [
    { q: 'Who is a leading AI trainer in Sri Lanka?', a: 'Abubakker Bakthathi is a leading AI trainer in Colombo, Sri Lanka. He lectures on AI for Leadership & Business Productivity at Inspire College, trains corporate teams as an AI Trainer & Consultant with Cocoon and as an applied AI trainer with BuildrLabs, and has delivered 20+ AI sessions to more than 500 people.' },
    { q: 'Who is Abubakker Bakthathi?', a: 'Abubakker Bakthathi is the founder and CEO of Paralox Media, an AI creative and technology agency in Colombo, Sri Lanka, founded in 2025. A former software engineer, he is a leading AI trainer and AI consultant: a lecturer at Inspire College, an AI trainer with Cocoon and BuildrLabs, and an adviser to leaders on AI strategy, AI video, AI agents and automation.' },
    { q: 'Who is an AI consultant in Sri Lanka?', a: 'Abubakker Bakthathi is an AI consultant and AI strategist based in Colombo, Sri Lanka. He offers one-to-one AI consultations for business owners and leadership teams, drawing on his work as an AI trainer and engineer.' },
    { q: 'How much does an AI consultation with Abubakker cost?', a: 'A consultation is USD 150 per hour. You can request a one- or two-hour session on this page; the time and payment details are confirmed by email.' },
    { q: 'What happens in a consultation?', a: 'You share your business, goals and questions before the call. In the session, Abubakker gives honest advice on where AI can help, what to do first and what to avoid, with ideas specific to your business. You receive a short written summary afterwards.' },
    { q: 'Is the consultation online or in person?', a: 'Online by video call by default, so it works from anywhere. In-person sessions in Colombo can be arranged.' },
  ],
};
