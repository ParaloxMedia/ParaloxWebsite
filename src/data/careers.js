// Careers page (/careers). Applications go to a Google Apps Script web app
// (google-apps-script/Code.gs), which saves each one to a candidate folder in
// Google Drive with the CV and a summary, and emails info@paraloxmedia.com.

export const APPLY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz5Uuf7WXD2RBG4tMV2IX3ITo4rWvy5-iRbbe51zr4tS11SJxD3Sd1Om4sCKjbnz_CT/exec';

// Open roles. Remove a role when it is filled; `posted` feeds Google's job listings.
// `portfolio: false` makes the portfolio link optional for that role.
export const VACANCIES = [
  {
    id: 'sales-executive',
    title: 'Sales Executive',
    team: 'Sales',
    type: 'Full-time',
    employmentType: ['FULL_TIME'],
    location: 'Colombo · Remote · Hybrid',
    urgent: true,
    portfolio: false,
    posted: '2026-10-22',
    summary: 'A confident, results-driven Sales Executive to grow Paralox Media’s client base across AI, engineering, media and growth.',
    requirements: [
      'Strong communication and negotiation skills',
      'A passion for sales and business growth',
      'Able to generate leads and close deals',
      'Self-driven and target-oriented',
      'A basic understanding of digital marketing or AI solutions is a plus',
    ],
  },
  {
    id: 'video-editor',
    title: 'Full Stack Video Editor',
    team: 'Media',
    type: 'Full-time or part-time',
    employmentType: ['FULL_TIME', 'PART_TIME'],
    location: 'Colombo · Remote · Hybrid',
    posted: '2026-10-22',
    summary: 'Own the whole video pipeline, from concept and script through edit, motion graphics, colour and final delivery on every platform, including AI films like our TVCs for Renault and Nissan.',
    requirements: [
      'Expert in DaVinci Resolve, Premiere Pro and After Effects',
      'Strong 2D/3D animation, motion graphics and visual effects skills',
      'Comfortable across the pipeline: scripting, shooting guidance, editing and delivery',
      'Professional colour grading, audio mixing and sound design',
      'Thumbnails and platform formats for YouTube, Instagram and TikTok',
      'Hands-on with AI video tools in a production workflow',
      'A strong sense of story, pacing and composition',
    ],
  },
  {
    id: 'graphic-designer',
    title: 'Full Stack Graphic Designer',
    team: 'Media',
    type: 'Full-time or part-time',
    employmentType: ['FULL_TIME', 'PART_TIME'],
    location: 'Colombo · Remote · Hybrid',
    posted: '2026-10-22',
    summary: 'Cover the full design range, from brand identity and UI/UX to social creatives, ad campaigns and AI-assisted visuals.',
    requirements: [
      'Expert in Photoshop, Illustrator, InDesign and Canva',
      'UI/UX design in Figma',
      'Brand identity systems: logos, type, colour and guidelines',
      'High-converting social creatives, ad visuals and marketing collateral',
      'Print design, layout and pre-press',
      'Basic HTML/CSS for web handoff',
      'Hands-on with AI design tools in a production workflow',
    ],
  },
  {
    id: 'videographer-photographer',
    title: 'Junior Videographer & Photographer',
    team: 'Media',
    type: 'Full-time or part-time',
    employmentType: ['FULL_TIME', 'PART_TIME'],
    location: 'Colombo · On-site and field shoots',
    onsite: true,
    posted: '2026-10-22',
    summary: 'Be behind the camera on real productions from day one, at shoots, events and brand campaigns, learning studio and location technique from our senior team.',
    requirements: [
      'Hands-on with DSLR or mirrorless cameras, for photo and video',
      'Shooting in manual: aperture, shutter speed and ISO',
      'Basic lighting for studio and location, including natural light',
      'Product, food, portrait and event content for social media',
      'Framing for vertical (Reels, TikTok, Shorts) and landscape',
      'First-pass editing in Lightroom, Photoshop or Premiere Pro',
      'Willing to travel to client locations and work flexible shoot schedules',
    ],
  },
  {
    id: 'motion-video-intern',
    title: 'Motion Graphics & Video Editing Intern',
    team: 'Media',
    type: 'Internship',
    employmentType: ['INTERN'],
    location: 'Colombo · Remote · Hybrid',
    posted: '2026-10-22',
    summary: 'Edit real client content, build motion graphics and learn the full production pipeline alongside our editors and designers.',
    requirements: [
      'Working knowledge of Premiere Pro or DaVinci Resolve',
      'Basic to intermediate After Effects for motion graphics',
      'An eye for pacing, composition and visual storytelling',
      'Keen to learn colour, sound design and platform formats',
      'Studying or recently graduated in film, design or multimedia, or self-taught with a strong portfolio',
      'A reel of past edits or motion work (student, personal or freelance)',
    ],
  },
];

export const WHY_JOIN = [
  { glyph: 'ai', title: 'Real AI work', text: 'AI films, agents and automations for paying clients like Renault and Nissan, not internal demos.' },
  { glyph: 'spark', title: 'Early-stage team', text: 'Founded in 2025, so your work shapes how the company runs, not just what it ships.' },
  { glyph: 'growth', title: 'Learn and grow', text: 'Client work from your first month, with mentoring from senior team members and time to learn new tools.' },
  { glyph: 'user', title: 'One team', text: 'Engineers, designers, editors and marketers on the same projects, so you see how every part fits together.' },
];

export const CAREER_FAQ = [
  { q: 'What is the hiring process?', a: 'You apply here, we shortlist within 3 to 5 working days, then run an interview or a short task before making an offer.' },
  { q: 'Are remote and hybrid roles available?', a: 'Most roles support remote or hybrid work. Roles that need you on site, such as camera work, say so on the vacancy.' },
  { q: 'Do I need AI tool experience?', a: 'It helps, but it is not required. We train new team members on the AI tools we use.' },
  { q: 'Can I apply for more than one role?', a: 'Yes. Send a separate application for each role, with answers written for that role.' },
  { q: 'How should I share my portfolio?', a: 'One clean link works best: Behance, your own site or a Drive folder. Editors should include a showreel; designers, recent brand or social work.' },
  { q: 'I do not see a role that fits.', a: 'Apply with “Open application” as the role and tell us what you would bring. We keep strong profiles on file.' },
];
