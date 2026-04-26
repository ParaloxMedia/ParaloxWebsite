import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Video, Code2, Bot, Sparkles, BarChart2, Search, Briefcase } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const FILTERS = ['All', 'Social Media', 'Video', 'Web Design', 'Branding'];

const ITEMS = [
  { t: 'Social Media Campaigns', cat: 'Social Media', span: 2, bg: 'linear-gradient(135deg,#5B1DE8,#9333EA,#60EFFF)', icon: <Megaphone size={36} color="rgba(255,255,255,.8)"/>, d: 'AI-powered content for 35+ brands' },
  { t: 'Video Production',       cat: 'Video',        span: 1, bg: 'linear-gradient(135deg,#1A0A2E,#5B1DE8)',         icon: <Video    size={36} color="rgba(255,255,255,.8)"/>, d: 'Cinematic reels and promos' },
  { t: 'Web Development',        cat: 'Web Design',   span: 1, row: 2, bg: 'linear-gradient(180deg,#FF6BFF,#8B52F7)',icon: <Code2    size={36} color="rgba(255,255,255,.8)"/>, d: 'Corporate and eCommerce platforms' },
  { t: 'AI Agents',              cat: 'Branding',     span: 1, bg: 'linear-gradient(135deg,#60EFFF,#5B1DE8)',         icon: <Bot      size={36} color="rgba(255,255,255,.8)"/>, d: 'Custom agent development' },
  { t: 'Brand Identity',         cat: 'Branding',     span: 1, bg: 'linear-gradient(135deg,#F59E0B,#8B52F7)',         icon: <Sparkles size={36} color="rgba(255,255,255,.8)"/>, d: 'Visual identity systems' },
  { t: 'Performance Ads',        cat: 'Social Media', span: 1, bg: 'linear-gradient(135deg,#5B1DE8,#FF6BFF,#60EFFF)',icon: <BarChart2 size={36} color="rgba(255,255,255,.8)"/>,d: 'Google and Meta campaigns' },
  { t: 'SEO & Content',          cat: 'Web Design',   span: 1, bg: 'linear-gradient(135deg,#059669,#5B1DE8)',         icon: <Search  size={36} color="rgba(255,255,255,.8)"/>, d: 'Content and geo targeting' },
];

const BRANDS = ['WebXPay','RNB Special Tours','ZEN','ALFA Global','Sri Lanka Rugby','IDM','La Maison','PNG Embroidery','Big Plate',"Abid's Restaurant",'Third Space Global','Ceylon Shisha Lounge'];

export function GalleryPage({ dark }) {
  useSEO({
    title: 'Portfolio & Gallery | AI Marketing & Creative Work — Paralox Media',
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
          <p style={{ color: dark ? '#B8A0D8' : '#5B4080', maxWidth: 420, marginTop: 10, marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.84rem,1.8vw,.95rem)' }}>
            AI-powered campaigns to cinematic brand videos.
          </p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 26 }}>
            {FILTERS.map(f => (
              <motion.button key={f} whileTap={{ scale: .95 }} onClick={() => setAct(f)}
                style={{ padding: '7px 16px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: '.82rem', transition: 'all .25s', ...(act === f ? { background: 'linear-gradient(135deg,#5B1DE8,#8B52F7)', color: '#fff', border: 'none' } : { background: 'transparent', border: '1px solid rgba(91,29,232,.2)', color: dark ? '#B8A0D8' : '#5B4080' }) }}>
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
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 'clamp(.86rem,1.8vw,.93rem)', textAlign: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t}</div>
                  <div style={{ color: 'rgba(255,255,255,.62)', fontSize: '.74rem', fontFamily: "'Plus Jakarta Sans',sans-serif", textAlign: 'center' }}>{d}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Brand list */}
        <FadeUp delay={0.1}>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '1.1rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 16 }}>Brands We've Worked With</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
              {BRANDS.map(b => (
                <motion.div key={b} whileHover={{ scale: 1.04 }}
                  style={{ padding: '6px 13px', borderRadius: 50, fontSize: '.77rem', fontWeight: 600, border: dark ? '1px solid rgba(139,82,247,.17)' : '1px solid rgba(91,29,232,.11)', color: dark ? '#C4B0E8' : '#4B3275', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Briefcase size={10} /> {b}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
