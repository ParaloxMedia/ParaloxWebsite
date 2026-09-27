// Pulse posts carried over from the previous paraloxmedia.com/pulse (text unchanged).
// kind: 'event' | 'news' | 'insight'. iso is the sort date; date is the label shown.
// kicker: small line above the title on the post page. hero: header image (defaults to the first uncropped-safe photo).
// logo: partner logo (used when there is no photo). whole: photo must not be cropped (e.g. a magazine page).
import rotaract1 from '../assets/pulse/rotaract-1.jpg';
import rotaract2 from '../assets/pulse/rotaract-2.jpg';
import rotaract3 from '../assets/pulse/rotaract-3.jpg';
import rotaract4 from '../assets/pulse/rotaract-4.jpg';
import anniversary1 from '../assets/pulse/anniversary-1.jpg';
import anniversary2 from '../assets/pulse/anniversary-2.jpg';
import anniversary3 from '../assets/pulse/anniversary-3.jpg';
import anniversary4 from '../assets/pulse/anniversary-4.jpg';
import anniversary5 from '../assets/pulse/anniversary-5.jpg';
import anniversary6 from '../assets/pulse/anniversary-6.jpg';
import anniversary7 from '../assets/pulse/anniversary-7.jpg';
import zahira1 from '../assets/pulse/zahira-1.jpg';
import zahira2 from '../assets/pulse/zahira-2.jpg';
import zahira3 from '../assets/pulse/zahira-3.jpg';
import mullenloweLogo from '../assets/clients/mullenlowe.png';
import wppLogo from '../assets/pulse/wpp-media-logo.jpg';
import sundayMorning1 from '../assets/pulse/sunday-morning-1.jpg';
import sundayMorningCover from '../assets/pulse/sunday-morning-cover.jpg';
import sundayMorningPage4 from '../assets/pulse/sunday-morning-page-4.jpg';
import sundayMorningPage5 from '../assets/pulse/sunday-morning-page-5.jpg';
import zahira2015a from '../assets/pulse/zahira-2015-1.jpg';

export const PULSE_POSTS = [
  {
    id: "news-zahira-batch-2015-recognition-2026", kind: "news", pillar: "Company News", glyph: "check", iso: "2026-09-27", date: "Sep 2026", mins: 1, featured: true,
    kicker: "ZOAL 6.0 · Zahira College Batch of 2015",
    title: "Paralox Media Recognised for Creative Partnership with Zahira College Batch of 2015",
    excerpt: "Paralox Media was honoured to receive a token of appreciation from the Zahira College Batch of 2015, recognising the creative partnership and collaborative work shared throughout the journey.",
    body: [
      "Paralox Media was honoured to receive a token of appreciation from the Zahira College Batch of 2015, recognising the creative partnership and collaborative work shared throughout the journey.",
      "This recognition represents more than the work delivered. It reflects a partnership built on trust, open communication, respect for creative boundaries, and appreciation for every contribution—regardless of its scale.",
      "At Paralox Media, we believe exceptional creative work emerges when teams collaborate with mutual respect and a shared vision. The Zahira College Batch of 2015 consistently demonstrated this spirit, making the entire experience both productive and rewarding.",
      "We sincerely thank the team for this thoughtful recognition and for choosing Paralox Media as a creative partner. We are grateful to have been part of the journey and look forward to future opportunities to create together.",
    ],
    highlights: [
      { glyph: "check", title: "Token of Appreciation", text: "Recognised by the Zahira College Batch of 2015 at the ZOAL 6.0 event launch." },
      { glyph: "spark", title: "Creative Partnership", text: "A thank-you for the creative partnership and collaborative work shared throughout the journey." },
      { glyph: "user", title: "Built on Trust", text: "Open communication, respect for creative boundaries, and appreciation for every contribution." },
      { glyph: "flow", title: "Shared Vision", text: "Exceptional creative work emerges when teams collaborate with mutual respect and a shared vision." },
      { glyph: "growth", title: "What's Next", text: "Grateful to have been part of the journey, and looking forward to creating together again." },
    ],
    photos: [
      { src: zahira2015a, caption: "Receiving the token of appreciation from the Zahira College Batch of 2015 at the ZOAL 6.0 event launch. Photo © Hashtag" },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
  {
    id: "news-sunday-morning-happinez-2026", kind: "news", pillar: "Company News", glyph: "doc", iso: "2026-07-26", date: "Jul 26, 2026", mins: 2, featured: true,
    kicker: "Happinez at The Sunday Morning", hero: sundayMorning1,
    title: "Our Founder & CEO on the Cover of Happinez at The Sunday Morning",
    excerpt: "Abubakker Bakthathi, Founder and CEO of Paralox Media, features on the cover of Happinez at The Sunday Morning, with an in-depth interview on the vision behind the company, his journey from software engineer to founder, and where AI is taking Sri Lanka.",
    body: [
      "Our Founder and CEO, Abubakker Bakthathi, is on the cover of Happinez, the weekend magazine of The Sunday Morning, in the 26 July 2026 edition. Inside, he sits down with journalist Nuskiya Nasar Aakhir for an in-depth interview titled \"Inside the vision behind Paralox Media\".",
      "The interview traces a story that began long before Paralox Media was registered: freelancing with a close friend to cover university expenses, then a career as a software engineer that ended when his company went through an AI-driven transformation and closed. Rather than fear the technology that cost him his job, Abubakker set out to understand it. In his words, \"AI wasn't the problem; the world was evolving and businesses needed to adapt.\"",
      "He describes Paralox Media as a problem-solving company rather than a service provider, bringing software development, AI automation, branding, digital marketing and content production together in one team, and being prepared to decline a project if it cannot create real value for the client.",
      "On AI and creativity, his view is clear: AI is a creative accelerator, not a replacement for human insight, emotion and strategy. The biggest misconception, he says, is that AI is just ChatGPT, and the better question to ask is not \"Will AI replace me?\" but \"How can AI help me become better at what I do?\"",
      "Looking ahead, Abubakker's goal is for Paralox Media to become one of Sri Lanka's leading AI innovation companies, investing in AI-powered SaaS products and helping to prove that a Sri Lankan company can compete on a global stage.",
      "Thank you to Happinez and The Sunday Morning for the feature. The full interview is on The Morning's website.",
    ],
    highlights: [
      { glyph: "doc", title: "On the Cover", text: "Abubakker features on the cover of Happinez at The Sunday Morning, in the 26 July 2026 edition." },
      { glyph: "code", title: "Freelancer to Founder", text: "From freelancing through university and a software engineering career to founding an AI-powered agency." },
      { glyph: "flow", title: "Setback to Catalyst", text: "Losing his job to an AI-driven transformation became the starting point for Paralox Media." },
      { glyph: "spark", title: "AI as an Accelerator", text: "AI speeds up the work, while human insight, emotion and strategy still make the final creative decisions." },
      { glyph: "growth", title: "Sri Lanka on the Global Stage", text: "The vision: make Paralox Media one of Sri Lanka's leading AI innovation companies." },
    ],
    photos: [
      { src: sundayMorningCover, caption: "The cover of Happinez at The Sunday Morning, Sunday 26 July 2026", whole: true },
      { src: sundayMorningPage4, caption: "Cover feature, page 4", whole: true },
      { src: sundayMorningPage5, caption: "Cover feature, page 5", whole: true },
      { src: sundayMorning1, caption: "Abubakker Bakthathi, Founder & CEO of Paralox Media. Photos © Abubakker Bakthathi, Che Studio" },
    ],
    cta: { label: "Read the full interview", href: "https://www.themorning.lk/articles/ZfDBpXFjPctroSm6LX1J" },
  },
  {
    id: "past-rotaract-ai-workshop-2026", kind: "event", pillar: "Past Event", glyph: "chat", iso: "2026-01-22", date: "January 2026", mins: 2, featured: true,
    kicker: "Rotaract Club of Colombo Mid Town",
    title: "AI & Automation: Career Impact Workshop, Rotaract Club of Colombo Mid Town",
    excerpt: "Paralox Media CEO Abubakker Bakthathi took the stage as a featured speaker at the Rotaract Club of Colombo Mid Town's AI & Automation: Career Impact Workshop — a session that sparked real conversations about the future of work, AI, and opportunity.",
    body: [
      "Paralox Media's CEO and Founder, Abubakker Bakthathi, was invited as a featured speaker for the AI and Automation: Career Impact Workshop, organised by the Rotaract Club of Colombo Mid Town. The session was co-hosted alongside Ammar Ahamed from Coocon Life, bringing together two industry voices to give attendees an in-depth, grounded perspective on where AI is taking the world.",
      "Abubakker opened the session with a deep dive into the evolution of Artificial Intelligence — from its early theoretical roots to the powerful, real-world systems driving businesses today. Drawing from his own journey building Paralox Media into a global AI agency, he spoke candidly about how AI is reshaping job roles, eliminating outdated skill sets, and simultaneously creating entirely new career paths that didn't exist five years ago.",
      "He highlighted prompt engineering as one of the most underrated yet essential skills in the modern workforce — and walked participants through what it actually means to \"work with AI\" rather than simply use it as a tool. His message was clear: the people who will thrive in the AI era are not those who fear the technology, but those who learn to direct it.",
      "Ammar Ahamed then took the session further, bringing real-world industry examples of AI agents and automation already deployed across businesses in Sri Lanka and beyond. His practical insights gave participants a ground-level understanding of how these technologies are being implemented — not in theory, but in live production environments.",
      "The workshop drew enthusiastic participation, with attendees asking questions ranging from AI career pathways to the ethics of automation and what businesses should be doing right now to prepare.",
      "It was an honour for Paralox Media to be part of this initiative, and a reminder of why knowledge-sharing and community building matter just as much as building great products. We look forward to more collaborations, more stages, and more conversations that move Sri Lanka forward in the AI era.",
    ],
    event: { status: "past", location: "Colombo, Sri Lanka", venue: "Online via Zoom", time: null, seats: null },
    highlights: [
      { glyph: "user", title: "Collaboration", text: "Co-hosted with Ammar Ahamed from Coocon Life and the Rotaract Club of Colombo Mid Town." },
      { glyph: "ai", title: "Evolution of AI", text: "Abubakker covered the history of AI, its impact on jobs, new roles being created, and why prompt engineering is critical." },
      { glyph: "agent", title: "Real-World AI Agents", text: "Ammar shared practical industry insights on AI agents and automation already being deployed by companies today." },
      { glyph: "growth", title: "Career Impact", text: "The session showed participants how the AI era creates opportunities for those who learn, adapt, and work with AI." },
      { glyph: "growth", title: "Key Takeaway", text: "AI is not a threat — it's an opportunity. Those who embrace it will lead the next generation of careers and businesses." },
    ],
    photos: [
      { src: rotaract1, caption: "Paralox team at Hatch Colombo" },
      { src: rotaract2, caption: "Abubakker presenting at the session" },
      { src: rotaract3, caption: "Speaker Session 01 — Evaluation of AI & Its Impact" },
      { src: rotaract4, caption: "AI & Automation: Career Impact Workshop on Zoom" },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
  {
    id: "news-paralox-1year-anniversary-2026", kind: "news", pillar: "Company News", glyph: "spark", iso: "2026-05-06", date: "May 6, 2026", mins: 2, featured: true,
    kicker: "Co-Spaces, Bambalapitiya",
    title: "One Year of Paralox Media - Small Team. Big Vision. Endless Ambition.",
    excerpt: "We celebrated 1 year of Paralox Media at Co-Spaces Bambalapitiya — a milestone built from sleepless nights, bold ambitions, real partnerships, and a team that showed up every single day. Year 1 done. Now it's time to build bigger.",
    body: [
      "One year ago, Paralox Media was a name on a slide deck, a domain name, and a very big ambition.",
      "Today, it is a team, a portfolio, a community of clients across seven countries, and the story of what happens when you decide not to wait for the right moment and just build.",
      "On 6th May 2026, we gathered at Co-Spaces Bambalapitiya to mark the official close of our first year. It was not a grand corporate event. It was ours — intimate, honest, and full of the kind of energy that only comes from a team that has been through something real together.",
      "Year One was not easy. There were late nights that stretched into early mornings. There were briefs we had to figure out from scratch, systems we had to build while using them, and moments where the only way through was through. There were lessons we paid for in time, not money and those are the ones that stuck.",
      "But there was also so much to be proud of.",
      "We built partnerships with WPP Media Sri Lanka and MullenLowe Sri Lanka. We served clients across Sri Lanka, the UAE, Singapore, the UK, Saudi Arabia, Australia, and Qatar. We stepped onto stages and workshop floors to share knowledge. We sponsored events, onboarded iconic Sri Lankan brands Keells, Maliban, Edinburgh, and more and we shipped campaigns, built AI agents, produced creatives, and grew.",
      "More than anything we showed up. Every single day.",
      "We are still a small team. But we are a team that knows exactly where we are going. The first year gave us the proof of concept. The second year is where we scale.",
      "To every client, partner, collaborator, and supporter who was part of this year: you are in this story too.",
      "Year 1: done.\nNow it is time to build bigger smarter, faster, and with the confidence that only comes from having already done the hard part.",
    ],
    event: { location: "Colombo, Sri Lanka", venue: "Co-Spaces, Bambalapitiya" },
    highlights: [
      { glyph: "check", title: "1 Year Milestone", text: "From a slide deck and a domain name to a globally recognised AI agency — Paralox Media completes its first full year of operation." },
      { glyph: "spark", title: "The Celebration", text: "The team gathered at Co-Spaces Bambalapitiya to mark the anniversary — an intimate, honest evening built on gratitude and momentum." },
      { glyph: "cloud", title: "Global Reach", text: "Year 1 saw Paralox serve clients across 7+ countries including Sri Lanka, UAE, Singapore, UK, Saudi Arabia, Australia, and Qatar." },
      { glyph: "user", title: "Major Partnerships", text: "WPP Media Sri Lanka, MullenLowe Sri Lanka (LoweDigital), Keells, Maliban, Edinburgh, and more — brands that chose Paralox in Year 1." },
      { glyph: "growth", title: "What's Next", text: "Year 1 was the proof of concept. Year 2 is where we scale — with bigger goals, better systems, and a team that has already done the hard part." },
    ],
    photos: [
      { src: anniversary1, caption: "From big dreams to real results — the Paralox story, Year 1" },
      { src: anniversary2, caption: "The Paralox Media team — Year 1 celebrations at Co-Spaces Bambalapitiya" },
      { src: anniversary3, caption: "A milestone moment — marking one year of Paralox Media" },
      { src: anniversary4, caption: "Reflecting on the journey — Year 1 anniversary evening" },
      { src: anniversary5, caption: "The team behind the work — celebrating together at Co-Spaces" },
      { src: anniversary6, caption: "One year of growth, partnerships, and building something real" },
      { src: anniversary7, caption: "Year 1 done. Now it's time to build bigger." },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
  {
    id: "news-zahira-silver-sponsor-2025", kind: "news", pillar: "Company News", glyph: "check", iso: "2025-09-20", date: "Sep 2025", mins: 1, featured: true,
    kicker: "Zahira College, Maradana",
    title: "Paralox Media: Silver Sponsor at Zahira College's 133rd Anniversary Cricket Tournament",
    excerpt: "Paralox Media proudly stepped in as Silver Sponsor for the Zahira College Group of 2010 Cricket Tournament, held as part of the institution's landmark 133rd Anniversary celebrations — a moment of giving back for our Founder and CEO Abubakker Bakthathi, a proud Zahira alumnus.",
    body: [
      "There are moments in business that go beyond revenue, strategy, and growth. The Zahira College Group of 2010 Cricket Tournament was one of them.",
      "Paralox Media was honoured to serve as Silver Sponsor for this prestigious event, held as part of Zahira College's 133rd Anniversary celebrations — one of Sri Lanka's most respected educational institutions with a legacy that spans over a century. For our Founder and CEO, Abubakker Bakthathi, this was deeply personal. He returned to his alma mater not just as a sponsor, but as a former student who credits Zahira College for shaping his values, discipline, and leadership foundation.",
      "The tournament brought together alumni from the Group of 2010 — a reunion of old faces, shared memories, and the kind of bond that only school years can forge. Walking through the same halls, sitting in the same grounds, and seeing the next generation of students carry forward a tradition of excellence was a reminder of why giving back matters.",
      "Beyond the cricket field, the visit opened meaningful conversations. Abubakker had the opportunity to sit with the school leadership and engage in forward-looking discussions about the role of technology in education — how AI-driven tools, digital media, and modern communication strategies can be harnessed to empower students and prepare them for a rapidly changing world.",
      "At Paralox Media, we believe that the most impactful thing a business can do is invest in the ecosystems that built it. Sponsoring this tournament was not a marketing decision. It was an act of gratitude — a way for us to honour the institution that shaped our founder, and a statement of our commitment to community, education, and the next generation of thinkers and leaders.",
      "Forever grateful. Forever Zahira.",
    ],
    event: { location: "Colombo, Sri Lanka", venue: "Zahira College, Maradana" },
    highlights: [
      { glyph: "user", title: "Back to Roots", text: "Abubakker returned to Zahira College — his alma mater — for the first time in 6 years, as Founder of Paralox Media." },
      { glyph: "check", title: "Silver Sponsor", text: "Paralox Media proudly served as Silver Sponsor for the Group of 2010 Cricket Tournament at Zahira's 133rd Anniversary." },
      { glyph: "user", title: "Giving Back", text: "More than a sponsorship — a statement of gratitude to the institution that shaped our founder's values and leadership." },
      { glyph: "ai", title: "Tech & Education", text: "Abubakker engaged with school leadership on AI, digital media, and how technology can empower the next generation of students." },
      { glyph: "check", title: "Forever Zahira", text: "A milestone moment that reminded us why community, roots, and giving back are just as important as business growth." },
    ],
    photos: [
      { src: zahira1, caption: "Abubakker representing Paralox Media at the 133rd Anniversary celebrations" },
      { src: zahira2, caption: "Paralox Media — Silver Sponsor, G10 Premier League 2025" },
      { src: zahira3, caption: "Proud moment — representing Paralox Media at the sponsorship handover" },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
  {
    id: "news-wpp-media-partnership-2025", kind: "news", pillar: "Company News", glyph: "play", iso: "2025-09-01", date: "Sep 2025", mins: 1, featured: true,
    kicker: "WPP Media Sri Lanka",
    logo: { src: wppLogo, alt: "WPP Media" },
    title: "Paralox Media Partners with WPP Media Sri Lanka",
    excerpt: "We are proud to announce our partnership with WPP Media Sri Lanka — one of the world's most powerful media groups. Paralox Media is now producing AI-generated creatives for WPP Media Sri Lanka, bringing a new dimension of speed and quality to their campaigns.",
    body: [
      "Some partnerships change everything. Our collaboration with WPP Media Sri Lanka is one of them.",
      "WPP is the world's largest advertising and communications group — a name synonymous with creative excellence, media intelligence, and global reach. WPP Media Sri Lanka brings that powerhouse presence to the local market, working with some of the country's most influential brands across television, digital, out-of-home, and performance channels.",
      "Paralox Media is now an active creative partner in that ecosystem. Our specific focus: AI-generated creatives. We produce campaign visuals, ad creatives, and brand-aligned design assets using cutting-edge AI creative tools — delivering outputs that meet the high standards WPP Media Sri Lanka demands, while significantly reducing turnaround time without compromising quality.",
      "This is where AI creative production genuinely shines. The ability to iterate rapidly, explore multiple creative directions in hours rather than days, and maintain brand consistency at scale makes AI-generated creatives a powerful addition to any major media group's workflow. WPP Media Sri Lanka recognised that — and chose Paralox Media as the partner to make it happen.",
      "For our team, it is both a privilege and a responsibility. Every brief demands precision, brand alignment, and a level of craft that stands up alongside WPP's global creative output. That is the standard we hold ourselves to.",
      "We are deeply grateful to the WPP Media Sri Lanka team for their trust, and we look forward to continuing to push the boundaries of what AI-generated creative can achieve at scale.",
    ],
    highlights: [
      { glyph: "cloud", title: "Global Powerhouse", text: "WPP is the world's largest advertising group — operating in 100+ countries with some of the most iconic brands on the planet." },
      { glyph: "user", title: "The Partnership", text: "Paralox Media produces AI-generated creatives for WPP Media Sri Lanka — campaign visuals and ad assets built with cutting-edge AI creative tools." },
      { glyph: "spark", title: "AI-Generated Creatives", text: "Using AI, we rapidly produce brand-aligned campaign visuals, ad creatives, and design assets at a speed and scale traditional production cannot match." },
      { glyph: "flow", title: "Speed Without Compromise", text: "AI lets us explore multiple creative directions in hours, iterate instantly, and deliver polished outputs that meet WPP's global quality standards." },
      { glyph: "check", title: "Validation", text: "Being trusted by a group of WPP's global stature — within months of founding — is a testament to the quality and craft Paralox brings to every project." },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
  {
    id: "news-mullenlowe-partnership-2026", kind: "news", pillar: "Company News", glyph: "camera", iso: "2026-02-01", date: "Feb 2026", mins: 1, featured: true,
    kicker: "MullenLowe Sri Lanka · LoweDigital",
    logo: { src: mullenloweLogo, alt: "MullenLowe Sri Lanka" },
    title: "Paralox Media Onboarded with MullenLowe Sri Lanka as Production Partner for LoweDigital",
    excerpt: "Paralox Media has officially partnered with MullenLowe Sri Lanka, one of the most respected creative networks in the country. We are now working directly with their digital arm, LoweDigital, primarily handling production.",
    body: [
      "February 2026 marks another milestone for Paralox Media — our official onboarding with MullenLowe Sri Lanka.",
      "MullenLowe is a globally celebrated creative agency network, built on a legacy of bold ideas, culture-defining campaigns, and an unwavering commitment to craft. MullenLowe Sri Lanka carries that tradition locally — partnering with leading Sri Lankan brands to produce work that resonates, converts, and endures.",
      "Within the MullenLowe Sri Lanka ecosystem, we are working specifically with LoweDigital — their dedicated digital division powering social media and content campaigns for some of the country's most recognised brands.",
      "Our primary role with LoweDigital is production. When LoweDigital has the strategy and direction locked in, Paralox Media steps in to bring it to life — producing the content, creatives, and assets that go out to market. It is a focused, disciplined role and one we take seriously. Clean execution, fast turnarounds, and output that meets the standard LoweDigital's clients expect.",
      "For a young agency like ours, being embedded in a production workflow at this level — alongside one of the most respected agency networks in the country — is exactly the kind of real-world proving ground that sharpens a team.",
      "We are proud to be part of the MullenLowe Sri Lanka family through our work with LoweDigital, and we look forward to growing this partnership as our capabilities continue to expand.",
    ],
    highlights: [
      { glyph: "spark", title: "MullenLowe Sri Lanka", text: "A globally celebrated creative network with a legacy of bold, culture-defining campaigns and a powerful local presence in Sri Lanka." },
      { glyph: "code", title: "LoweDigital", text: "Paralox works directly with LoweDigital — MullenLowe's dedicated digital division handling social, content, and performance campaigns." },
      { glyph: "camera", title: "Production Focus", text: "Our primary role with LoweDigital is production — bringing their strategies to life with fast, high-quality content and creative assets." },
      { glyph: "flow", title: "Fast Turnarounds", text: "Clean execution and speed are what LoweDigital needs. Paralox delivers production-ready output that meets their clients' standards every time." },
      { glyph: "check", title: "Why It Matters", text: "Being embedded in the production workflow of one of Sri Lanka's most respected agency networks is a real-world proving ground for the Paralox team." },
    ],
    cta: { label: "Work with us", href: "#contact" },
  },
];
