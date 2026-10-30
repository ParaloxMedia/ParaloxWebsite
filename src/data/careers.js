// Careers page (/careers). Applications go to a Google Apps Script web app
// (google-apps-script/Code.gs), which saves each one to a candidate folder in
// Google Drive with the CV and a summary, and emails info@paraloxmedia.com.

import growthLeadPoster from '../assets/careers/growth-client-strategy-lead.jpg';
import contentCreatorPoster from '../assets/careers/female-content-creator-presenter.jpg';
import videoEditorPoster from '../assets/careers/junior-video-editor.jpg';

export const APPLY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz5Uuf7WXD2RBG4tMV2IX3ITo4rWvy5-iRbbe51zr4tS11SJxD3Sd1Om4sCKjbnz_CT/exec';

// Open roles. Remove a role when it is filled; `poster` shows the hiring post beside the details; `posted` feeds Google's job listings.
// `portfolio: false` makes the portfolio link optional for that role.
// Every role ever listed; `filled: true` hides one everywhere (list, form, job pages,
// Google listings, sitemap) and sends its old link to /careers. Delete the flag to reopen.
export const ROLES = [
  {
    id: 'growth-client-strategy-lead',
    filled: true, // hired, October 2026
    title: 'Growth & Client Strategy Lead',
    team: 'Growth',
    type: 'Full-time',
    employmentType: ['FULL_TIME'],
    location: 'Colombo · Hybrid',
    urgent: true,
    portfolio: false,
    poster: growthLeadPoster,
    posted: '2026-10-22',
    summary: 'Lead growth and client strategy across digital marketing, creative strategy and client management: plan how our clients grow, shape the campaigns that get them there, and own the relationships behind them.',
    duties: [
      'Plan marketing and growth strategies for clients',
      'Develop creative campaign ideas with the media team',
      'Manage client relationships from brief to results',
      'Support sales and discovery calls with new clients',
    ],
    requirements: [
      'Experience in digital marketing, creative strategy or client management',
      'Clear, confident communication with clients and the team',
      'Able to turn a business goal into a campaign plan and measure the result',
      'Comfortable presenting ideas and leading discovery calls',
      'An interest in AI and what it can do for marketing is a plus',
    ],
  },
  {
    id: 'female-content-creator-presenter',
    title: 'Female Content Creator & Presenter',
    team: 'Media',
    urgent: true,
    type: 'Full-time or part-time',
    employmentType: ['FULL_TIME', 'PART_TIME'],
    location: 'Colombo · On-site shoots · Hybrid',
    onsite: true,
    poster: contentCreatorPoster,
    posted: '2026-10-30',
    summary: 'Be the face and voice of content for Paralox Media and our clients: present brand videos, reels, product launches and event coverage, and help shape the ideas behind them.',
    duties: [
      'Present on camera for brand videos, reels and social content',
      'Host interviews, event coverage and product launches',
      'Help write scripts, hooks and captions with the creative team',
      'Create short-form content and follow trends on Instagram, TikTok and YouTube',
    ],
    requirements: [
      'Confident and natural on camera, with clear delivery',
      'Fluent English; Sinhala or Tamil is a strong plus',
      'A feel for short-form content, trends and storytelling',
      'Comfortable at shoots, events and client locations around Colombo',
      'Basic phone video or editing skills (e.g. CapCut) is a plus',
      'Show us your work: a reel, social profile or past presenting clips',
    ],
  },
  {
    id: 'junior-video-editor',
    title: 'Junior Video Editor',
    team: 'Media',
    type: 'Full-time',
    employmentType: ['FULL_TIME'],
    location: 'Colombo · Hybrid',
    poster: videoEditorPoster,
    posted: '2026-10-22',
    summary: 'Edit and help shoot content for real client campaigns, from social reels to brand films, learning alongside our senior editors and AI video team.',
    requirements: [
      'Video editing and storytelling',
      'Videography and camera handling',
      'Basic lighting and audio recording',
      'Premiere Pro or DaVinci Resolve',
      'Creativity and a willingness to learn',
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

/** Open roles only. */
export const VACANCIES = ROLES.filter((r) => !r.filled);

export const WHY_JOIN = [
  { glyph: 'ai', title: 'Real AI work', text: 'AI films, agents and automations for paying clients like Renault and Nissan, not internal demos.' },
  { glyph: 'spark', title: 'Early-stage team', text: 'Founded in 2025, so your work shapes how the company runs, not just what it ships.' },
  { glyph: 'growth', title: 'Learn and grow', text: 'Client work from your first month, with mentoring from senior team members and time to learn new tools.' },
  { glyph: 'user', title: 'One team', text: 'Engineers, designers, editors and marketers on the same projects, so you see how every part fits together.' },
];

export const CAREER_FAQ = [
  { q: 'What is the hiring process?', a: 'You apply here, we shortlist within 5 working days, then run an interview or a short task before making an offer.' },
  { q: 'Are remote and hybrid roles available?', a: 'Most roles support remote or hybrid work. Roles that need you on site, such as camera work, say so on the vacancy.' },
  { q: 'Do I need AI tool experience?', a: 'It helps, but it is not required. We train new team members on the AI tools we use.' },
  { q: 'Can I apply for more than one role?', a: 'Yes. Send a separate application for each role, with answers written for that role.' },
  { q: 'How should I share my portfolio?', a: 'One clean link works best: Behance, your own site or a Drive folder. Editors should include a showreel; designers, recent brand or social work.' },
  { q: 'I do not see a role that fits.', a: 'Apply with “Open application” as the role and tell us what you would bring. We keep strong profiles on file.' },
];
