// Project case studies, shown at /work/<id>. Videos and posters live in public/work/<id>/
// (web-compressed H.264, fast-start) so they stream rather than being bundled.
import nissanHero from '../assets/projects/nissan-gravite-hero.jpg';

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
      'The films premiered on the stage screens at the launch event. Afterwards we edited the event footage into an after-movie and a set of short reels for Nissan’s social channels.',
    ],
    videos: [
      {
        src: '/work/nissan-gravite/launch-film.mp4',
        poster: '/work/nissan-gravite/launch-film.jpg',
        title: 'Launch film',
        text: 'One of the three AI-generated films, from script to final grade.',
        duration: 'PT1M42S',
      },
      {
        src: '/work/nissan-gravite/launch-event.mp4',
        poster: '/work/nissan-gravite/launch-event.jpg',
        title: 'Launch night',
        text: 'The films on the stage screens, edited from the event footage.',
        duration: 'PT57S',
      },
    ],
    deliverables: [
      { glyph: 'play', title: 'Three launch films', text: 'AI-generated films that place the Gravite in familiar Sri Lankan settings.' },
      { glyph: 'spark', title: 'AI production', text: 'Every shot generated and directed with AI video tools, then refined frame by frame.' },
      { glyph: 'camera', title: 'Event after-movie', text: 'Launch night edited into a single film for Nissan’s channels.' },
      { glyph: 'growth', title: 'Social reels', text: 'Short cuts from the event, sized for social feeds.' },
      { glyph: 'check', title: 'Post-production', text: 'Edit, colour and sound finished to Nissan’s brand standards.' },
    ],
    cta: { label: 'Start a project', href: '/contact' },
  },
];
