import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Video, Code2, Bot, Sparkles, BarChart2, Search } from 'lucide-react';
import { CLIENTS } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const FILTERS = ['All', 'Social Media', 'Video', 'Web Design', 'Branding'];

const ITEMS = [
  { t: 'Social Media Campaigns', cat: 'Social Media', span: 2, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)', icon: <Megaphone size={36} color="rgba(255,255,255,.8)"/>, d: 'AI-powered content for 35+ brands' },
  { t: 'Video Production',       cat: 'Video',        span: 1, bg: 'linear-gradient(120deg,#191720,#3E2087)',         icon: <Video    size={36} color="rgba(255,255,255,.8)"/>, d: 'Cinematic reels and promos' },
  { t: 'Web Development',        cat: 'Web Design',   span: 1, row: 2, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)',icon: <Code2    size={36} color="rgba(255,255,255,.8)"/>, d: 'Corporate and eCommerce platforms' },
  { t: 'AI Agents',              cat: 'Branding',     span: 1, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)',         icon: <Bot      size={36} color="rgba(255,255,255,.8)"/>, d: 'Custom agent development' },
  { t: 'Brand Identity',         cat: 'Branding',     span: 1, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)',         icon: <Sparkles size={36} color="rgba(255,255,255,.8)"/>, d: 'Visual identity systems' },
  { t: 'Performance Ads',        cat: 'Social Media', span: 1, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)',icon: <BarChart2 size={36} color="rgba(255,255,255,.8)"/>,d: 'Google and Meta campaigns' },
  { t: 'SEO & Content',          cat: 'Web Design',   span: 1, bg: 'linear-gradient(120deg,#3E2087,#7C3AED)',         icon: <Search  size={36} color="rgba(255,255,255,.8)"/>, d: 'Content and geo targeting' },
];

export function GalleryPage({ dark }) {
  useSEO({
    title: 'Portfolio & Gallery | AI Marketing & Creative Work | Paralox Media',
    description: 'Browse Paralox Media\'s portfolio of AI-powered digital marketing campaigns, social media content, web development projects, video production, and brand design work.',
  });
  const [act, setAct] = useState('All');
  const shown = act === 'All' ? ITEMS : ITEMS.filter(x => x.cat === act);

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,5%,60px)' }}>

        <FadeUp>
          <Chip text="Our Work" />
          <Heading dark={dark} size="clamp(1.9rem,3.8vw,3.2rem)">Creative <GradText>Portfolio</GradText></Heading>
          <p style={{ color: dark ? '#C9C4D6' : '#4A4658', maxWidth: 420, marginTop: 10, marginBottom: 22, fontFamily: "'Satoshi',sans-serif", fontSize: 'clamp(.84rem,1.8vw,.95rem)' }}>
            AI-powered campaigns to cinematic brand videos.
          </p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 26 }}>
            {FILTERS.map(f => (
              <motion.button key={f} whileTap={{ scale: .95 }} onClick={() => setAct(f)}
                style={{ padding: '7px 16px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Satoshi',sans-serif", fontWeight: 600, fontSize: '.82rem', transition: 'all .25s', ...(act === f ? { background: 'linear-gradient(120deg,#3E2087,#7C3AED)', color: '#fff', border: 'none' } : { background: 'transparent', border: '1px solid rgba(124,58,237,.2)', color: dark ? '#C9C4D6' : '#4A4658' }) }}>
                {f}
              </motion.button>
            ))}
          </div>
        </FadeUp>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 15 }} className="g3">
          <AnimatePresence>
            {shown.map(({ t, bg, icon, span, row, d }) => (
              <motion.div key={t} layout initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }} whileHover={{ scale: 1.02 }}
                style={{ gridColumn: `span ${span || 1}`, gridRow: row ? `span ${row}` : 'auto', borderRadius: 17, overflow: 'hidden', minHeight: row === 2 ? 370 : 175, background: bg, cursor: 'pointer' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1.5rem', gap: 8, minHeight: row === 2 ? 370 : 175 }}>
                  {icon}
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 'clamp(.86rem,1.8vw,.93rem)', textAlign: 'center', fontFamily: "'Satoshi',sans-serif" }}>{t}</div>
                  <div style={{ color: 'rgba(255,255,255,.62)', fontSize: '.74rem', fontFamily: "'Satoshi',sans-serif", textAlign: 'center' }}>{d}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Brand list */}
        <FadeUp delay={0.1}>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: dark ? '#F7F6FA' : '#191720', marginBottom: 16 }}>Brands We've Worked With</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))', gap: 12, maxWidth: 820, margin: '0 auto' }}>
              {CLIENTS.map(c => (
                <motion.div key={c.n} whileHover={{ y: -3 }} title={c.n}
                  style={{ aspectRatio: '1 / 1', borderRadius: 18, overflow: 'hidden', background: '#FFFFFF', border: dark ? '1px solid rgba(255,255,255,.08)' : '1px solid #E6E4EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={c.logo} alt={c.n} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: c.pad ? 14 : 0, boxSizing: 'border-box' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
