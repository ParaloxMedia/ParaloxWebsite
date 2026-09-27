import Hero from '../sections/Hero';
import { Capabilities, Clients, Faq, PulsePreview, Reviews, Ticker, Why, Work } from '../sections/HomeSections';
import StatsBand from '../components/StatsBand';
import { HumanMachine } from '../sections/AboutSections';

export default function Home() {
  return (
    <>
      <Hero />
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
