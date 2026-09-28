// Project case studies, shown at /work/<id>. Videos and posters live in public/work/<id>/
// (web-compressed H.264, fast-start) so they stream rather than being bundled.
import nissanHero from '../assets/projects/nissan-gravite-hero.jpg';
import ritzRangeStage from '../assets/projects/ritzbury/range-stage.jpg';
import ritzRangeSet from '../assets/projects/ritzbury/range-set.jpg';
import ritzContestants from '../assets/projects/ritzbury/contestants.jpg';
import ritzCooking from '../assets/projects/ritzbury/cooking.jpg';
import pngHero from '../assets/projects/png-embroidery/hero.jpg';

export const PROJECTS = [
  {
    id: 'nissan-gravite',
    client: 'Nissan',
    title: 'Nissan Gravite launch',
    kicker: 'Production partner to WPP Media',
    headline: 'Introducing the Nissan Gravite to Sri Lanka.',
    summary: 'Three AI-generated launch films, then the after-movie and reels from launch night. Produced by Paralox Media for Nissan, with WPP Media as lead agency.',
    hero: nissanHero,
    pillar: 'Media',
    year: '2026',
    iso: '2026-09-28',
    facts: [
      ['Client', 'Nissan'],
      ['Lead agency', 'WPP Media'],
      ['Our role', 'Production house'],
      ['Pillar', 'Media'],
      ['Year', '2026'],
    ],
    story: [
      'For the Sri Lankan launch of the Nissan Gravite, WPP Media led the campaign and brought in Paralox Media as its production house.',
      'We produced three launch films using AI video tools. Each one places the Gravite somewhere Sri Lankans know: the Colombo skyline and Lotus Tower, Port City, the coast and the hills. We worked from the agency’s script, generated and directed every shot, then finished the edit, colour and sound to Nissan’s brand standards.',
      'The films premiered on the stage screens at the launch at Hilton Colombo. Afterwards we edited the event footage into an after-movie, and cut vertical reels from the showroom activations at AMW, Nissan’s distributor in Sri Lanka.',
    ],
    // Order sets the layout: the feature film, then the vertical reel beside it,
    // then the remaining films in a row underneath.
    videos: [
      {
        src: '/work/nissan-gravite/launch-film.mp4',
        poster: '/work/nissan-gravite/launch-film.jpg',
        title: 'Launch film',
        text: 'One of the three AI-generated films, from script to final grade.',
        duration: 'PT1M42S',
      },
      {
        src: '/work/nissan-gravite/showroom-reel.mp4',
        poster: '/work/nissan-gravite/showroom-reel.jpg',
        title: 'Showroom reel',
        text: 'A vertical reel from the showroom activations, cut for social.',
        duration: 'PT38S',
        portrait: true,
      },
      {
        src: '/work/nissan-gravite/after-movie.mp4',
        poster: '/work/nissan-gravite/after-movie.jpg',
        title: 'After-movie',
        text: 'Launch night at Hilton Colombo, edited into one film.',
        duration: 'PT1M7S',
      },
      {
        src: '/work/nissan-gravite/launch-event.mp4',
        poster: '/work/nissan-gravite/launch-event.jpg',
        title: 'On the big screen',
        text: 'The launch films playing on the stage screens.',
        duration: 'PT57S',
      },
    ],
    deliverables: [
      { glyph: 'play', title: 'Three launch films', text: 'AI-generated films that place the Gravite in familiar Sri Lankan settings.' },
      { glyph: 'spark', title: 'AI production', text: 'Every shot generated and directed with AI video tools, then refined frame by frame.' },
      { glyph: 'camera', title: 'Event after-movie', text: 'Launch night edited into a single film for Nissan’s channels.' },
      { glyph: 'growth', title: 'Social reels', text: 'Vertical reels from the showroom activations, made for social feeds.' },
      { glyph: 'check', title: 'Post-production', text: 'Edit, colour and sound finished to Nissan’s brand standards.' },
    ],
    cta: { label: 'Start a project', href: '/contact' },
  },
  {
    id: 'ritzbury-masterchef-masterclass',
    client: 'Ritzbury',
    title: 'Ritzbury MasterChef Masterclass',
    kicker: 'Production partner to WPP Media',
    headline: 'Ritzbury Professional at the MasterChef Masterclass.',
    summary: 'Full video coverage, edited reels and a photoshoot for the Ritzbury MasterChef Masterclass. Produced by the Paralox Media video production team, with WPP Media as lead agency.',
    hero: ritzRangeStage,
    pillar: 'Media',
    year: '2026',
    iso: '2026-09-28',
    facts: [
      ['Client', 'Ritzbury'],
      ['Lead agency', 'WPP Media'],
      ['Our role', 'Production house'],
      ['Team', 'Video production · Media'],
      ['Year', '2026'],
    ],
    story: [
      'Ritzbury Professional, the cooking chocolate range from Ceylon Biscuits Limited, is the official chocolatier of MasterChef Sri Lanka. For its MasterChef Masterclass, WPP Media brought in Paralox Media to produce the content.',
      'Our video production team covered the masterclass from start to finish: the contestants at their stations, the chefs, and the Ritzbury Professional range on the MasterChef set. Alongside the video, we photographed the products and the people on set.',
      'We then edited the footage into fast-cut reels for social, with playful voice-over edits, and a behind-the-scenes cut of the shoot itself.',
    ],
    reels: ['DcyJqcynHnI', 'Ddin9BGimxv', 'Dc2zBIhFbIF', 'DckoKptm9Cj'],
    bts: {
      post: 'DcqTZEOs62t',
      text: 'A look at how the masterclass shoot came together, from our video production team on set.',
    },
    photos: [
      { src: ritzRangeStage, caption: 'The Ritzbury Professional range on the MasterChef stage.' },
      { src: ritzRangeSet, caption: 'Dark, milk and white cooking chocolate, with chips, buttons and sprinkles.' },
      { src: ritzContestants, caption: 'MasterChef contestants with the Ritzbury Professional range.', whole: true },
      { src: ritzCooking, caption: 'A contestant at work, with a chef looking on.', whole: true },
    ],
    deliverables: [
      { glyph: 'camera', title: 'Full event coverage', text: 'The masterclass filmed from start to finish, on the MasterChef set.' },
      { glyph: 'play', title: 'Social reels', text: 'Fast-cut reels with playful voice-over edits, made to be shared.' },
      { glyph: 'spark', title: 'Photoshoot', text: 'Product and people photography of the Ritzbury Professional range.' },
      { glyph: 'user', title: 'Behind the scenes', text: 'A cut of the shoot itself, from set-up to final takes.' },
      { glyph: 'check', title: 'Post-production', text: 'Edit, colour and sound handled in-house by our video team.' },
    ],
    cta: { label: 'Start a project', href: '/contact' },
  },
  {
    id: 'exxonmobil-png-embroidery-vendor-portal',
    client: 'PNG Embroidery',
    title: 'ExxonMobil × PNG Embroidery vendor portal',
    kicker: 'Mobile-responsive web portal · Design and development',
    headline: 'One portal for ExxonMobil’s uniform and embroidery orders.',
    summary: 'A mobile-responsive vendor portal where ExxonMobil staff order uniforms and embroidered workwear from PNG Embroidery, and the PNG Embroidery team runs quotations, invoices and customer records from one admin area. Designed and built by Paralox Media.',
    hero: pngHero,
    pillar: 'Engineering',
    year: '2026',
    iso: '2026-09-28',
    facts: [
      ['Client', 'PNG Embroidery'],
      ['Built for', 'ExxonMobil, Papua New Guinea'],
      ['Our role', 'Design and development'],
      ['Pillar', 'Engineering'],
      ['Live at', 'pngemportal.com', 'https://pngemportal.com/login'],
    ],
    story: [
      'PNG Embroidery supplies industrial uniforms and embroidered workwear to ExxonMobil in Papua New Guinea. We designed and built a vendor portal that brings the whole order process into one place, for ExxonMobil staff and for the PNG Embroidery team.',
      'It is fully mobile responsive. Staff can place and track orders from a phone on site as easily as from a desk, and the PNG Embroidery team can sign in to the admin portal and manage orders from any device.',
      'ExxonMobil staff create an account, browse the uniform catalogue, add items to a cart and place orders. Their dashboard shows active, completed and pending orders alongside total spend, notifications follow each order as it moves, and a reports view keeps their order history in one place.',
      'Behind it, the PNG Embroidery team works from a separate admin area. Requests become quotations, approved orders are processed and tracked, invoices are issued from the same record, and a built-in CRM keeps each customer’s details and order history together.',
      'Prices and totals are shown in Papua New Guinean kina, and the portal is live at pngemportal.com.',
    ],
    deliverables: [
      { glyph: 'browser', title: 'Online ordering', text: 'A uniform catalogue with cart and checkout, built for ExxonMobil staff.' },
      { glyph: 'user', title: 'Mobile responsive', text: 'Every screen, staff and admin, adapts to phones and tablets as well as desktops.' },
      { glyph: 'flow', title: 'Order tracking', text: 'Each order’s status from placed to completed, with notifications along the way.' },
      { glyph: 'doc', title: 'Quotations', text: 'Requests turned into quotations inside the portal, ready for approval.' },
      { glyph: 'check', title: 'Invoicing', text: 'Invoices issued from the same order record, with totals in kina.' },
      { glyph: 'data', title: 'CRM', text: 'Customer details and order history kept together for the PNG Embroidery team.' },
      { glyph: 'growth', title: 'Reports', text: 'Order history and spend in one view for staff and admins.' },
      { glyph: 'api', title: 'Admin portal', text: 'A separate, secured sign-in for the PNG Embroidery team, usable on any device.' },
    ],
    cta: { label: 'Start a project', href: '/contact' },
  },
];
