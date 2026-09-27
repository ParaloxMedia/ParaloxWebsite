import Hero from '../sections/Hero';
import { Capabilities, Clients, Faq, PulsePreview, Reviews, Ticker, Why, Work } from '../sections/HomeSections';
import StatsBand from '../components/StatsBand';
import { HumanMachine } from '../sections/AboutSections';
import { MissionHero } from './About';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Home() {
  // Phones get the About page's mission hero; tablets and desktop keep the full hero.
  // Only one is mounted, so the desktop hero's animations don't run hidden on phones.
  const isPhone = useMediaQuery('(max-width: 767px)');
  return (
    <>
      {isPhone ? <MissionHero kicker="Paralox Media" /> : <Hero />}
      <Ticker />
      <Clients />
      <Capabilities />
      <Reviews />
      <HumanMachine />
      <Work />
      <StatsBand />
      <Why />
      <PulsePreview />
      <Faq />
    </>
  );
}
