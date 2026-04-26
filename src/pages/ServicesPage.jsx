import { motion } from 'framer-motion';
import { Bot, Code2, Brain, Sparkles, Search, BarChart2, Video, Smartphone } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const SERVICES = [
  { icon: <Bot size={20}/>,       t: 'AI-Driven Digital Marketing', d: 'Intelligent automation to optimise campaign strategies, content creation, audience targeting, and analytics for maximum ROI.', tag: 'AI',        c: '#5B1DE8' },
  { icon: <Code2 size={20}/>,     t: 'Website & Mobile App Dev',    d: 'Customised platforms for performance, scalability, and UX — corporate sites, eCommerce platforms, or mobile apps.',          tag: 'Tech',       c: '#7C3AED' },
  { icon: <Brain size={20}/>,     t: 'AI Agent Development',        d: 'Conversational AI agents for customer support, lead generation, and task automation across various industries.',             tag: 'AI',        c: '#5B1DE8' },
  { icon: <Sparkles size={20}/>,  t: 'Prompt Engineering',          d: 'Crafting precise AI prompts to create stunning videos, music, and diverse creative content.',                                tag: 'Creative AI', c: '#A855F7' },
  { icon: <Search size={20}/>,    t: 'Content, SEO & GEO',          d: 'Strategic, SEO-optimised content with geographic targeting to boost local visibility and engagement.',                       tag: 'Growth',     c: '#6D28D9' },
  { icon: <BarChart2 size={20}/>, t: 'Performance Marketing',       d: 'Targeted ad campaigns, Google & Meta Ads management, and data-backed strategy for maximum growth.',                         tag: 'Ads',        c: '#7C3AED' },
  { icon: <Video size={20}/>,     t: 'Video Editing & Production',  d: 'Cinematic reels, promo videos, and ad creatives to capture attention and drive action across all platforms.',               tag: 'Creative',   c: '#8B52F7' },
  { icon: <Smartphone size={20}/>,t: 'Social Media Management',     d: 'From daily posts to creative storytelling and viral content — Instagram, Facebook, TikTok, and LinkedIn.',                 tag: 'Social',     c: '#A855F7' },
];

const PROCESS = [
  { n: '01', t: 'Discovery', d: 'Deep-dive into your brand, goals and audience.',   c: '#5B1DE8' },
  { n: '02', t: 'Strategy',  d: 'AI-powered planning and content roadmaps.',         c: '#7C3AED' },
  { n: '03', t: 'Execution', d: 'Creative production and campaign deployment.',      c: '#A855F7' },
  { n: '04', t: 'Optimise',  d: 'Continuous analysis to maximise ROI.',             c: '#8B52F7' },
];

export function ServicesPage({ dark }) {
  useSEO({
    title: 'Our Services | AI Agent Development & Digital Marketing — Paralox Media',
    description: 'Explore Paralox Media\'s full range of services: AI agent development, AI-driven digital marketing, social media management, web & app development, SEO, video production, and performance marketing.',
  });
  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.08)';

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,5%,60px)' }}>

        <FadeUp>
          <Chip text="What We Offer" />
          <Heading dark={dark} size="clamp(1.9rem,3.8vw,3.2rem)">
            360° Digital Services, <GradText>Tailored for Growth</GradText>
          </Heading>
          <p style={{ color: dark ? '#B8A0D8' : '#5B4080', maxWidth: 520, marginTop: 11, marginBottom: 40, fontSize: 'clamp(.86rem,1.8vw,.97rem)', lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Comprehensive digital services to elevate brand presence, improve performance, and boost engagement.
          </p>
        </FadeUp>

        {/* Service cards */}
        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 60 }}>
          {SERVICES.map(({ icon, t, d, tag, c }, i) => (
            <FadeUp key={t} delay={i * 0.05}>
              <motion.div whileHover={{ y: -5, boxShadow: `0 15px 38px ${c}1e` }}
                style={{ padding: '20px 18px', border: `1px solid ${bd}`, borderRadius: 14, background: dark ? 'rgba(20,8,44,.5)' : '#fff', display: 'flex', gap: 14, alignItems: 'flex-start', height: '100%' }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `linear-gradient(135deg,${c},${c}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: `0 5px 15px ${c}44` }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 'clamp(.86rem,1.5vw,.92rem)', lineHeight: 1.4, fontFamily: "'Plus Jakarta Sans',sans-serif", color: dark ? '#F0E8FF' : '#1A0A2E' }}>{t}</div>
                  <div style={{ fontSize: 'clamp(.77rem,1.4vw,.81rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.72, marginBottom: 8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d}</div>
                  <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 20, background: `${c}14`, color: c, fontWeight: 700, fontSize: '.66rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tag}</span>
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
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${c},${c}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 13px', fontFamily: "'Outfit',sans-serif", fontWeight: 800, color: '#fff', fontSize: '1.1rem', boxShadow: `0 6px 18px ${c}44` }}>{n}</div>
                <div style={{ fontWeight: 700, marginBottom: 5, fontFamily: "'Plus Jakarta Sans',sans-serif", color: dark ? '#F0E8FF' : '#1A0A2E', fontSize: 'clamp(.86rem,1.5vw,.9rem)' }}>{t}</div>
                <div style={{ fontSize: 'clamp(.78rem,1.4vw,.82rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
