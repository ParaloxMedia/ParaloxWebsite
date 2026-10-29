// /ai-agency-sri-lanka: who Paralox Media is, for people (and AI answers) looking for an
// AI creative and technology agency in Sri Lanka. Facts only; every claim links to the work.
import reviewsData from './reviews.json';

export const AI_AGENCY = {
  title: 'AI creative and technology agency in Sri Lanka',
  lede: 'Paralox Media is an AI creative and technology agency in Colombo, Sri Lanka. We make AI films and creatives for brands, and we build AI agents, automation and software for businesses, as one team.',
  rating: { value: reviewsData.rating, count: reviewsData.count, url: reviewsData.url },
  proof: [
    { stat: '1 day', label: 'To make Renault’s AI film, from storyboard to 4K master', href: '/work/renault-ai-tvc' },
    { stat: '280K+', label: 'Instagram views for the WebXPay GovPay AI video', href: '/work/webxpay-govpay' },
    { stat: '50+', label: 'Brands we have produced work for, including Nissan, Keells and Commercial Bank', href: '/works' },
    { stat: '2', label: 'Global agency networks we produce for: WPP Media and MullenLowe', href: '/works/media' },
  ],
  sides: [
    {
      key: 'creative',
      kicker: 'AI creative agency',
      title: 'AI films, video and creatives',
      text: 'We produce AI-generated films and campaign content for brands and agencies: every frame, voice, music track and sound effect made with AI, then finished by our editors to a cinematic standard.',
      points: ['AI films and commercials', 'AI product and campaign visuals', 'AI voice, music and sound design', 'Social reels and content series', 'Brand identity and design'],
      work: [
        { name: 'Renault Sri Lanka AI film', href: '/work/renault-ai-tvc' },
        { name: 'Nissan Gravite launch films', href: '/work/nissan-gravite' },
        { name: 'WebXPay GovPay AI video', href: '/work/webxpay-govpay' },
      ],
      href: '/media',
    },
    {
      key: 'technology',
      kicker: 'AI technology agency',
      title: 'AI agents, automation and software',
      text: 'We build AI agents that answer customers on WhatsApp and the web, automations that remove manual work, and the websites, portals and apps they run on, with the access controls you set.',
      points: ['AI agents for WhatsApp, web chat and email', 'Business process automation', 'AI integrations with your data and tools', 'Websites, e-commerce and web apps', 'Custom portals and internal tools'],
      work: [
        { name: 'ExxonMobil × PNG Embroidery vendor portal', href: '/work/exxonmobil-png-embroidery-vendor-portal' },
        { name: 'Ace+ online electronics store', href: '/work/ace-plus-online-store' },
      ],
      href: '/ai',
    },
  ],
  why: [
    { glyph: 'ai', title: 'AI in production, not in theory', text: 'AI films and agents delivered for real brands, on real deadlines, like Renault’s film in one day.' },
    { glyph: 'flow', title: 'Creative and technology in one team', text: 'The people who make your campaign also build the site, agent or automation it runs on.' },
    { glyph: 'user', title: 'Trusted by agencies', text: 'Production partner to WPP Media and MullenLowe Sri Lanka on campaigns for national brands.' },
    { glyph: 'check', title: 'Clear scope and results', text: 'Scope, timing and cost in writing before work begins, and reports against the numbers you run on.' },
  ],
  faq: [
    { q: 'What is an AI creative agency?', a: 'An AI creative agency uses generative AI to produce films, visuals, voice, music and campaign content, then finishes the work with human editors and designers. Paralox Media is an AI creative agency in Colombo, Sri Lanka; our AI work includes Renault’s film in Sri Lanka, made in one day.' },
    { q: 'What does an AI technology agency do?', a: 'An AI technology agency builds AI into how a business runs: AI agents that answer and qualify customers, automations that move data between tools, and AI features in websites and apps. Paralox Media builds these for businesses in Sri Lanka and abroad.' },
    { q: 'Which AI agency in Sri Lanka does both creative and technology?', a: 'Paralox Media does both. It is a Colombo-based AI creative and technology agency, founded in 2025, with AI, engineering, media and growth under one roof, and it produces work for WPP Media and MullenLowe Sri Lanka.' },
    { q: 'How do I choose an AI agency in Sri Lanka?', a: 'Ask to see AI work delivered for real clients, who on the team does the work, how they handle your data, and how they will measure results. We share case studies, name the people on your project, and agree scope and cost in writing first.' },
    { q: 'How fast can an AI film be made?', a: 'It depends on length and complexity. For Renault Sri Lanka we went from approved storyboard to a finished 4K film in one day, with AI visuals, voice, music and sound.' },
    { q: 'Where is Paralox Media based?', a: 'At 14 Sir Baron Jayathilake Mawatha, Colombo 00100, Sri Lanka. We work with clients in Sri Lanka, the UAE, Saudi Arabia, Qatar, Singapore and the United Kingdom.' },
  ],
};
