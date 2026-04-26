import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Shield, Award, Globe, TrendingUp, Zap } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';
import { TeamCarousel } from '../components/ui/TeamCarousel';
import { Testimonials } from '../components/ui/Testimonials';
import { WorldMap } from '../components/ui/WorldMap';

/* ── Country coordinates ── */
const SL  = { lat: -8.1,   lng: 86.5,   label: '🇱🇰 Sri Lanka'    };
const UAE = { lat: 23.42,  lng: 53.85,  label: '🇦🇪 UAE'           };
const SA  = { lat: 23.89,  lng: 45.08,  label: '🇸🇦 Saudi Arabia'  };
const SG  = { lat: 1.35,   lng: 103.82, label: '🇸🇬 Singapore'     };
const PNG = { lat: -8.1,   lng: 143.96, label: '🇵🇬 PNG'           };
const QA  = { lat: 25.35,  lng: 51.18,  label: '🇶🇦 Qatar'         };

// viewBox: trim top/left more, extend right + bottom further
const MAP_VIEWBOX = '315 45 530 265';

const MAP_DOTS = [
  // Sri Lanka as hub → all destinations
  { start: SL,  end: UAE },
  { start: SL,  end: SA  },
  { start: SL,  end: SG  },
  { start: SL,  end: PNG },
  // Gulf cluster cross-links
  { start: UAE, end: QA  },
  { start: SA,  end: QA  },
  { start: SA,  end: UAE },
  // East cross-link
  { start: SG,  end: PNG },
];

export function AboutPage({ dark }) {
  useSEO({
    title: 'About Us | AI Agency Team & Mission — Paralox Media',
    description: 'Learn about Paralox Media — a global AI agency founded in 2025. Meet our team of AI strategists, developers, designers, and marketers building AI-powered business solutions worldwide.',
  });
  const navigate = useNavigate();
  const bd  = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.09)';
  const cBg = dark ? 'rgba(20,8,44,.5)'     : '#fff';

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>

      {/* ── Purple hero band ── */}
      <div style={{ background: 'linear-gradient(135deg,#0C0524,#2A0868,#5B1DE8)', padding: 'clamp(44px,7vw,68px) clamp(16px,5%,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .11, backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '-40%', right: '5%', width: 'min(400px,50vw)', height: 'min(400px,50vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.38),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="ahg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px,4vw,3.5rem)', alignItems: 'center' }}>
            <div>
              <Chip text="Who We Are" light />
              <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,5vw,3.8rem)', color: 'white', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 14 }}>
                A Forward-Thinking<br />
                <span style={{ background: 'linear-gradient(135deg,#60EFFF,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Agency</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,.62)', fontSize: 'clamp(.86rem,1.8vw,.97rem)', lineHeight: 1.85, marginBottom: 24, fontFamily: "'Plus Jakarta Sans',sans-serif", maxWidth: 460 }}>
                Paralox Media powers modern businesses through cutting-edge AI technology and creative strategy. Established May 2025. Sri Lanka to the world.
              </p>
              <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
                <motion.button whileHover={{ y: -2 }} onClick={() => navigate('/contact')} style={{ padding: '11px 24px', borderRadius: 50, border: 'none', cursor: 'pointer', background: 'white', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(.85rem,1.8vw,.9rem)' }}>Work With Us</motion.button>
                <motion.button whileHover={{ y: -2 }} onClick={() => navigate('/services')} style={{ padding: '11px 20px', borderRadius: 50, cursor: 'pointer', border: '1.5px solid rgba(255,255,255,.35)', background: 'rgba(255,255,255,.08)', color: 'white', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(.85rem,1.8vw,.9rem)', backdropFilter: 'blur(8px)' }}>Our Services</motion.button>
              </div>
            </div>

            {/* Stats grid */}
            <div className="asg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: <Award size={20}/>,      n: '35+',  l: 'Global Brands' },
                { icon: <Globe size={20}/>,      n: '5+',   l: 'Countries' },
                { icon: <TrendingUp size={20}/>, n: '412%', l: 'Avg. ROI' },
                { icon: <Zap size={20}/>,        n: '360°', l: 'Digital Services' },
              ].map(({ icon, n, l }) => (
                <div key={l} style={{ background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: '16px 13px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.14)' }}>
                  <div style={{ color: 'rgba(255,255,255,.7)', marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 800, color: 'white', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.52)', fontFamily: "'Plus Jakarta Sans',sans-serif", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Vision / Mission ── */}
      <div style={{ background: dark ? '#0A0616' : '#F8F5FF', padding: '32px clamp(16px,5%,60px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="g1">
          {[
            { icon: <Target size={18}/>, t: 'Vision',  d: 'To lead the global digital space by merging creativity with AI, empowering every brand with intelligent solutions that unlock their full potential.' },
            { icon: <Shield size={18}/>, t: 'Mission', d: 'To empower businesses through AI-driven tools that boost efficiency, creativity, and growth — redefining digital marketing and development for the future.' },
          ].map(({ icon, t, d }) => (
            <div key={t} style={{ display: 'flex', gap: 13, alignItems: 'flex-start', background: cBg, border: `1px solid ${bd}`, borderRadius: 14, padding: '18px 16px' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(91,29,232,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.p1, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: T.p1, marginBottom: 5, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.9rem' }}>{t}</div>
                <div style={{ fontSize: '.83rem', lineHeight: 1.75, color: dark ? '#B8A0D8' : '#5B4080', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(44px,7vw,64px) clamp(16px,5%,60px) 0' }}>

        {/* ── Team heading ── */}
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Chip text="Our Team" center />
            <Heading dark={dark} size="clamp(1.8rem,3.5vw,3rem)" center>
              Meet the <GradText>People Behind Paralox</GradText>
            </Heading>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', marginTop: 9, maxWidth: 440, margin: '9px auto 0', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.75, fontSize: 'clamp(.84rem,1.8vw,.92rem)' }}>
              A small, powerful team united by AI, creativity, and results that matter.
            </p>
          </div>
        </FadeUp>

        {/* ── Feature Carousel (all 4 members) ── */}
        <FadeUp delay={0.08}>
          <TeamCarousel dark={dark} />
        </FadeUp>

        {/* ── Testimonials ── */}
        <div style={{ marginTop: 52 }}>
          <Testimonials dark={dark} />
        </div>

        {/* ── Countries / World Map ── */}
        <FadeUp style={{ marginTop: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Chip text="Global Reach" center />
            <Heading dark={dark} size="clamp(1.6rem,3vw,2.5rem)" center>
              Serving <GradText>5+ Countries</GradText>
            </Heading>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', marginTop: 10, maxWidth: 480, margin: '10px auto 0', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.75, fontSize: 'clamp(.84rem,1.8vw,.9rem)' }}>
              From Sri Lanka to the Gulf, South-East Asia and the Pacific — our reach spans continents.
            </p>
          </div>

          <WorldMap dots={MAP_DOTS} dark={dark} lineColor="#A855F7" animationDuration={2.2} loop region={MAP_VIEWBOX} />

          {/* Country flag badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 22 }}>
            {[
              { flag: '🇱🇰', name: 'Sri Lanka'    },
              { flag: '🇦🇪', name: 'UAE'           },
              { flag: '🇸🇦', name: 'Saudi Arabia'  },
              { flag: '🇸🇬', name: 'Singapore'     },
              { flag: '🇵🇬', name: 'PNG'            },
              { flag: '🇶🇦', name: 'Qatar'          },
            ].map(({ flag, name }, i) => (
              <FadeUp key={name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -3, borderColor: T.p1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '8px 16px', borderRadius: 50,
                    border: `1px solid ${dark ? 'rgba(139,82,247,.18)' : 'rgba(91,29,232,.12)'}`,
                    background: dark ? 'rgba(91,29,232,.07)' : 'rgba(91,29,232,.04)',
                    transition: 'border-color .25s',
                    cursor: 'default',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{flag}</span>
                  <span style={{ fontSize: '.75rem', fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", color: dark ? '#D4C0F8' : '#3D1F8A' }}>{name}</span>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
