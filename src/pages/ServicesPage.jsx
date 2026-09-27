import { motion } from 'framer-motion';
import { Code2, Brain, Sparkles, Search, BarChart2, Video, Smartphone, Megaphone } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

// Every service sits under one brand pillar, in this order: AI, Engineering, Media, Growth.
const SERVICES = [
  { icon: <Brain size={20}/>,      t: 'AI Agents & Automation',       d: 'Conversational agents for customer support and lead qualification, plus automations that remove repetitive admin work.', tag: 'AI',          c: '#7C3AED' },
  { icon: <Code2 size={20}/>,      t: 'Websites & eCommerce',         d: 'Corporate websites and online stores, designed and built in-house, with the content management you need to update them.', tag: 'Engineering', c: '#7C3AED' },
  { icon: <Smartphone size={20}/>, t: 'Web & Mobile Apps',            d: 'Custom web applications and mobile apps, scoped with you before we write a line of code.',                               tag: 'Engineering', c: '#7C3AED' },
  { icon: <Sparkles size={20}/>,   t: 'AI Creatives',                 d: 'AI-assisted images, video and audio for campaigns, directed by our designers and checked against your brand.',          tag: 'Media',       c: '#7C3AED' },
  { icon: <Video size={20}/>,      t: 'Video Production',             d: 'Reels, promotional videos and ad creatives, shot and edited for each platform’s format.',                               tag: 'Media',       c: '#7C3AED' },
  { icon: <Megaphone size={20}/>,  t: 'Social Media Management',      d: 'Monthly content calendars, posting and community management across Instagram, Facebook, TikTok and LinkedIn.',          tag: 'Media',       c: '#7C3AED' },
  { icon: <BarChart2 size={20}/>,  t: 'Performance Marketing',        d: 'Google and Meta ad campaigns with agreed targets, weekly optimisation and a monthly report in plain language.',        tag: 'Growth',      c: '#7C3AED' },
  { icon: <Search size={20}/>,     t: 'SEO & Content',                d: 'Technical SEO, local search and written content that help the right customers find you.',                              tag: 'Growth',      c: '#7C3AED' },
];

const PROCESS = [
  { n: '01', t: 'Discovery', d: 'We learn your business, goals, audience and budget.',        c: '#7C3AED' },
  { n: '02', t: 'Strategy',  d: 'A written plan with scope, timeline and success measures.',   c: '#7C3AED' },
  { n: '03', t: 'Execution', d: 'Production, build and launch, with a review at each stage.',  c: '#7C3AED' },
  { n: '04', t: 'Optimise',  d: 'We measure results against the plan and adjust.',            c: '#7C3AED' },
];

export function ServicesPage({ dark }) {
  useSEO({
    title: 'Our Services | AI Agent Development & Digital Marketing | Paralox Media',
    description: 'Paralox Media services across four pillars: AI agents and automation, websites and apps, video and AI creatives, social media, performance marketing and SEO.',
  });
  const bd = dark ? 'rgba(124,58,237,.13)' : 'rgba(124,58,237,.08)';

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,5%,60px)' }}>

        <FadeUp>
          <Chip text="What We Offer" />
          <Heading dark={dark} size="clamp(1.9rem,3.8vw,3.2rem)">
            Four pillars. <GradText>One partner.</GradText>
          </Heading>
          <p style={{ color: dark ? '#C9C4D6' : '#4A4658', maxWidth: 520, marginTop: 11, marginBottom: 40, fontSize: 'clamp(.86rem,1.8vw,.97rem)', lineHeight: 1.8, fontFamily: "'Satoshi',sans-serif" }}>
            Every Paralox service sits under AI, Engineering, Media or Growth. Use one, or combine them in a single engagement.
          </p>
        </FadeUp>

        {/* Service cards */}
        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 60 }}>
          {SERVICES.map(({ icon, t, d, tag, c }, i) => (
            <FadeUp key={t} delay={i * 0.05}>
              <motion.div whileHover={{ y: -5, boxShadow: `0 15px 38px ${c}1e` }}
                style={{ padding: '20px 18px', border: `1px solid ${bd}`, borderRadius: 14, background: dark ? 'rgba(34,31,44,.5)' : '#fff', display: 'flex', gap: 14, alignItems: 'flex-start', height: '100%' }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `linear-gradient(135deg,${c},${c}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: `0 5px 15px ${c}44` }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 'clamp(.86rem,1.5vw,.92rem)', lineHeight: 1.4, fontFamily: "'Satoshi',sans-serif", color: dark ? '#F7F6FA' : '#191720' }}>{t}</div>
                  <div style={{ fontSize: 'clamp(.77rem,1.4vw,.81rem)', color: dark ? '#A9A4B8' : '#6B6778', lineHeight: 1.72, marginBottom: 8, fontFamily: "'Satoshi',sans-serif" }}>{d}</div>
                  <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 20, background: `${c}14`, color: c, fontWeight: 700, fontSize: '.66rem', fontFamily: "'Satoshi',sans-serif" }}>{tag}</span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Process */}
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Chip text="How We Work" center />
            <Heading dark={dark} size="clamp(1.7rem,3.5vw,2.8rem)" center>Our Process</Heading>
          </div>
        </FadeUp>
        <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 15 }}>
          {PROCESS.map(({ n, t, d, c }, i) => (
            <FadeUp key={n} delay={i * 0.09}>
              <div style={{ textAlign: 'center', padding: '20px 13px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${c},${c}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 13px', fontFamily: "'Satoshi',sans-serif", fontWeight: 800, color: '#fff', fontSize: '1.1rem', boxShadow: `0 6px 18px ${c}44` }}>{n}</div>
                <div style={{ fontWeight: 700, marginBottom: 5, fontFamily: "'Satoshi',sans-serif", color: dark ? '#F7F6FA' : '#191720', fontSize: 'clamp(.86rem,1.5vw,.9rem)' }}>{t}</div>
                <div style={{ fontSize: 'clamp(.78rem,1.4vw,.82rem)', color: dark ? '#A9A4B8' : '#6B6778', lineHeight: 1.65, fontFamily: "'Satoshi',sans-serif" }}>{d}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
