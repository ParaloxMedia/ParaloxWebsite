import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MapPin, Clock, Search, Briefcase, Users, Zap, Star,
  ChevronDown, ArrowRight, CheckCircle2, Share2,
  Brain, Rocket, Heart, TrendingUp,
} from 'lucide-react';
import { T } from '../data';
import { FadeUp } from '../components/ui/FadeUp';
import { ApplicationModal } from '../components/careers/ApplicationModal';
import { ShareModal } from '../components/careers/ShareModal';

// ─── Data ─────────────────────────────────────────────────────────────────────

const VACANCIES = [
  {
    id: 'video-editor',
    title: 'Full Stack Video Editor',
    type: 'Full-Time / Part-Time',
    location: 'Colombo / Remote / Hybrid',
    category: 'Creative',
    badge: 'Open',
    summary: 'Paralox Media is looking for a Full Stack Video Editor who can own the entire video pipeline — from concept and scripting all the way through editing, motion graphics, color grading, and final delivery across platforms.',
    requirements: [
      'Expert-level proficiency in DaVinci Resolve, Adobe Premiere Pro, and After Effects',
      'Strong skills in 2D/3D animation, motion graphics, and visual effects',
      'Ability to handle the full production pipeline: scripting, shooting guidance, editing, and delivery',
      'Professional color grading and audio mixing/sound design experience',
      'Proficiency in thumbnail design and platform-specific format optimisation (YouTube, Instagram, TikTok)',
      'Experience with AI video tools (Runway, Sora, ElevenLabs, etc.) integrated into workflow',
      'Strong storytelling instinct with a sharp eye for pacing, composition, and audience engagement',
    ],
    color: '#8B52F7',
    gradient: 'linear-gradient(135deg,#5B1DE8,#8B52F7)',
  },
  {
    id: 'sales-executive',
    title: 'Sales Executive',
    type: 'Full-Time',
    location: 'Colombo / Remote / Hybrid',
    category: 'Sales',
    badge: 'Urgent',
    summary: 'We are looking for a confident and results-driven Sales Executive to help grow Paralox Media\'s client base.',
    requirements: [
      'Strong communication and negotiation skills',
      'Passion for sales and business growth',
      'Ability to generate leads and close deals',
      'Self-driven and target-oriented mindset',
      'Basic understanding of digital marketing / AI solutions is a plus',
    ],
    color: '#FF6BFF',
    gradient: 'linear-gradient(135deg,#A855F7,#FF6BFF)',
  },
  {
    id: 'graphic-designer',
    title: 'Full Stack Graphic Designer',
    type: 'Full-Time / Part-Time',
    location: 'Colombo / Remote / Hybrid',
    category: 'Creative',
    badge: 'Open',
    summary: 'Paralox Media is looking for a Full Stack Graphic Designer who can cover the complete design spectrum — from brand identity and UI/UX to social media creatives, ad campaigns, and AI-assisted visual production.',
    requirements: [
      'Expert command of Adobe Photoshop, Illustrator, InDesign, and Canva',
      'Strong UI/UX design skills with proficiency in Figma or Adobe XD',
      'Ability to build and maintain full brand identity systems (logos, typography, colour palettes, guidelines)',
      'Experience creating high-converting social media creatives, paid ad visuals, and marketing collateral',
      'Solid understanding of print design, layout, and pre-press production',
      'Working knowledge of basic HTML/CSS for web handoff and design implementation',
      'Hands-on experience with AI design tools (Midjourney, Adobe Firefly, Stable Diffusion) in a production workflow',
    ],
    color: '#60EFFF',
    gradient: 'linear-gradient(135deg,#0891B2,#60EFFF)',
  },
];

const WHY_JOIN = [
  {
    icon: <Brain size={22} />,
    title: 'AI-Driven Projects',
    desc: 'Work on cutting-edge AI-powered creative and digital campaigns that push industry boundaries.',
    color: '#5B1DE8',
    glow: 'rgba(91,29,232,.35)',
  },
  {
    icon: <Rocket size={22} />,
    title: 'Fast-Growing Team',
    desc: 'Be part of a high-velocity startup with the energy, culture, and ambition to go global.',
    color: '#8B52F7',
    glow: 'rgba(139,82,247,.35)',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Learn & Grow',
    desc: 'Continuous learning environment with real client exposure, mentorship, and skill development.',
    color: '#A855F7',
    glow: 'rgba(168,85,247,.35)',
  },
  {
    icon: <Heart size={22} />,
    title: 'Collaborative Culture',
    desc: 'Work alongside talented people across tech, media, and marketing in a creative, supportive space.',
    color: '#FF6BFF',
    glow: 'rgba(255,107,255,.3)',
  },
];

const FAQS = [
  {
    q: 'What is the hiring process like at Paralox Media?',
    a: 'Our process is fast and transparent: submit your application → shortlisting (3–5 days) → interview/task round → offer. We keep every candidate informed throughout.',
  },
  {
    q: 'Are remote and hybrid roles available?',
    a: 'Yes! Most of our roles support remote and hybrid arrangements. Specific flexibility is mentioned on each vacancy card.',
  },
  {
    q: 'Do I need to have AI tool experience?',
    a: 'It\'s a strong plus but not mandatory. We value willingness to learn and adopt AI-assisted workflows. We\'ll train the right candidate.',
  },
  {
    q: 'Can I apply for multiple roles?',
    a: 'Absolutely. If you feel qualified for more than one position, submit a separate application for each. Tailor your answers to each role.',
  },
  {
    q: 'How should I prepare my portfolio?',
    a: 'A clean, focused portfolio link (Behance, personal site, Drive folder, etc.) works best. For video editors, include your showreel. For designers, include recent brand or social work.',
  },
  {
    q: 'Will I receive feedback on my application?',
    a: 'We notify all shortlisted candidates. While we aim to respond to everyone, high volumes may delay replies for non-shortlisted applicants.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function BadgePill({ text, color }) {
  const isUrgent = text === 'Urgent';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 11px', borderRadius: 20,
      background: isUrgent ? 'rgba(239,68,68,.12)' : 'rgba(34,197,94,.1)',
      border: `1px solid ${isUrgent ? 'rgba(239,68,68,.28)' : 'rgba(34,197,94,.28)'}`,
      fontSize: '.66rem', fontWeight: 700, letterSpacing: 0.5,
      color: isUrgent ? '#EF4444' : '#16A34A',
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      textTransform: 'uppercase',
    }}>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: isUrgent ? '#EF4444' : '#16A34A',
        animation: 'blink 2s infinite',
      }} />
      {text}
    </div>
  );
}

function VacancyCard({ vacancy, dark, onApply, onShare }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      id={vacancy.id}
      style={{
        borderRadius: 20,
        border: `1px solid ${dark ? 'rgba(139,82,247,.16)' : 'rgba(91,29,232,.1)'}`,
        background: dark ? 'rgba(12,4,26,.9)' : '#fff',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow .3s, border-color .3s, transform .3s',
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{
        boxShadow: dark
          ? `0 20px 60px rgba(0,0,0,.5), 0 0 0 1px ${vacancy.color}33`
          : `0 20px 50px rgba(91,29,232,.12), 0 0 0 1px ${vacancy.color}22`,
      }}
    >
      {/* Gradient top accent */}
      <div style={{
        height: 3,
        background: vacancy.gradient,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
          background: vacancy.gradient,
          filter: 'blur(6px)', opacity: 0.6,
        }} />
      </div>

      {/* Card body */}
      <div style={{ padding: 'clamp(20px,4vw,28px)' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <BadgePill text={vacancy.badge} />
              <span style={{
                fontSize: '.66rem', fontWeight: 700, letterSpacing: 0.5,
                color: dark ? '#8870B8' : '#9B8BC0', textTransform: 'uppercase',
                fontFamily: "'Plus Jakarta Sans',sans-serif",
              }}>
                {vacancy.category}
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Outfit',sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.1rem,2.5vw,1.3rem)',
              color: dark ? '#F0E8FF' : '#1A0A2E',
              marginBottom: 6, lineHeight: 1.25,
            }}>
              {vacancy.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.78rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                <Clock size={13} style={{ color: vacancy.color }} /> {vacancy.type}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.78rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                <MapPin size={13} style={{ color: vacancy.color }} /> {vacancy.location}
              </span>
            </div>
          </div>
          {/* Role icon */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg,${vacancy.color}22,${vacancy.color}44)`,
            border: `1px solid ${vacancy.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={22} style={{ color: vacancy.color }} />
          </div>
        </div>

        {/* Summary */}
        <p style={{
          fontSize: '.85rem', lineHeight: 1.75,
          color: dark ? '#B8A0D8' : '#5B4080',
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          marginBottom: 16,
        }}>
          {vacancy.summary}
        </p>

        {/* Requirements accordion */}
        <div style={{
          borderRadius: 12,
          border: `1px solid ${dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.08)'}`,
          background: dark ? 'rgba(139,82,247,.04)' : 'rgba(91,29,232,.025)',
          overflow: 'hidden',
          marginBottom: 20,
        }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              width: '100%', padding: '11px 15px', background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.8rem',
              color: dark ? '#C8A8F8' : T.p1,
            }}
          >
            Key Requirements
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={15} />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '0 15px 14px' }}>
                  {vacancy.requirements.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 7 }}>
                      <CheckCircle2 size={14} style={{ color: vacancy.color, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: '.81rem', lineHeight: 1.65, color: dark ? '#C8B8E8' : '#4B3275', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{r}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ y: -2, boxShadow: `0 10px 28px ${vacancy.color}55` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onApply(vacancy)}
            style={{
              flex: 1, minWidth: 140, padding: '12px 20px', borderRadius: 50, border: 'none',
              cursor: 'pointer', background: vacancy.gradient, color: '#fff',
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.88rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              boxShadow: `0 5px 16px ${vacancy.color}44`,
            }}
          >
            Apply Now <ArrowRight size={14} />
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onShare(vacancy)}
            style={{
              padding: '12px 18px', borderRadius: 50,
              border: `1.5px solid ${dark ? 'rgba(139,82,247,.25)' : 'rgba(91,29,232,.18)'}`,
              background: 'transparent', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.88rem',
              color: dark ? '#B8A0D8' : T.p1,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background .2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.05)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <Share2 size={14} /> Share
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function FaqItem({ q, a, dark, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 14,
        border: `1px solid ${open ? (dark ? 'rgba(139,82,247,.28)' : 'rgba(91,29,232,.18)') : (dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)')}`,
        background: open ? (dark ? 'rgba(139,82,247,.06)' : 'rgba(91,29,232,.03)') : (dark ? 'rgba(12,4,26,.7)' : '#fff'),
        overflow: 'hidden',
        transition: 'border-color .25s, background .25s',
        marginBottom: 10,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '17px 20px', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          textAlign: 'left',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '.9rem', color: dark ? '#E8D8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.4 }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ color: T.p2, flexShrink: 0 }}
        >
          <ChevronDown size={17} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 20px 18px',
              fontSize: '.86rem', lineHeight: 1.8,
              color: dark ? '#B8A0D8' : '#5B4080',
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CareersPage({ dark }) {
  const [activeVacancy, setActiveVacancy] = useState(null);
  const [shareVacancy,  setShareVacancy]  = useState(null);
  const [search,        setSearch]        = useState('');
  const [filter,        setFilter]        = useState('All');
  const vacanciesRef = useRef(null);

  const CATEGORIES = ['All', 'Creative', 'Sales'];

  const filteredVacancies = VACANCIES.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.summary.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || v.category === filter;
    return matchSearch && matchFilter;
  });

  const scrollToVacancies = () => {
    vacanciesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.09)';

  return (
    <div style={{ paddingTop: 64, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg,#0C0524,#2A0868,#1A0A48)',
        padding: 'clamp(60px,9vw,100px) clamp(16px,5%,60px) clamp(50px,7vw,80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: .09,
          backgroundImage: 'linear-gradient(rgba(139,82,247,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.4) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          pointerEvents: 'none',
        }} />
        {/* Orbs */}
        <div className="og" style={{ position: 'absolute', top: '-30%', right: '8%', width: 'min(420px,50vw)', height: 'min(420px,50vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,29,232,.45),transparent 68%)', pointerEvents: 'none' }} />
        <div className="og" style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 'min(300px,40vw)', height: 'min(300px,40vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.28),transparent 68%)', pointerEvents: 'none', animationDelay: '1.8s' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 30, padding: '7px 18px' }}
          >
            <div className="bk" style={{ width: 6, height: 6, borderRadius: '50%', background: '#60EFFF' }} />
            <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.85)', letterSpacing: 2.5, textTransform: 'uppercase' }}>
              We're Hiring
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}
            className="hh"
            style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,6vw,4.8rem)', color: 'white', letterSpacing: '-3px', lineHeight: 1.08, marginBottom: 18 }}
          >
            Join Paralox Media
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .26 }}
            style={{ fontSize: 'clamp(.9rem,2vw,1.1rem)', lineHeight: 1.75, color: 'rgba(255,255,255,.6)', maxWidth: 520, margin: '0 auto 36px' }}
          >
            Build the future with creativity, strategy, and AI-driven innovation.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }}
            className="hb"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13 }}
          >
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(91,29,232,.55)' }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToVacancies}
              style={{
                padding: '14px 30px', borderRadius: 50, border: 'none',
                cursor: 'pointer', background: T.grad, color: '#fff',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.95rem',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 7px 22px rgba(91,29,232,.4)',
              }}
            >
              <Briefcase size={16} /> View Open Roles
            </motion.button>
            {/* <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { scrollToVacancies(); setTimeout(() => setActiveVacancy(VACANCIES[0]), 400); }}
              style={{
                padding: '14px 30px', borderRadius: 50,
                border: '1.5px solid rgba(255,255,255,.25)',
                background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(10px)',
                cursor: 'pointer', color: '#fff',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.95rem',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <ArrowRight size={16} /> Apply Now
            </motion.button> */}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px,5vw,56px)', marginTop: 52, flexWrap: 'wrap' }}
          >
            {[
              { icon: <Briefcase size={16}/>, val: '3', label: 'Open Roles' },
              { icon: <Users size={16}/>, val: '10+', label: 'Team Members' },
              { icon: <Zap size={16}/>, val: 'AI-First', label: 'Culture' },
              { icon: <Star size={16}/>, val: 'Global', label: 'Client Base' },
            ].map(({ icon, val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#60EFFF', marginBottom: 4 }}>{icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: '#fff', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── COMPANY INTRO ─────────────────────────────────────────────────── */}
      <div style={{ background: dark ? '#080510' : '#F8F5FF', padding: 'clamp(52px,7vw,80px) clamp(16px,5%,60px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 16, background: dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)', border: `1px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.14)'}`, borderRadius: 30, padding: '6px 16px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.p2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, color: T.p2, letterSpacing: 2, textTransform: 'uppercase' }}>About Paralox</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.2, marginBottom: 18 }}>
              Where AI Meets{' '}
              <span style={{ background: T.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Creative Excellence
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p style={{ fontSize: 'clamp(.88rem,1.8vw,1rem)', lineHeight: 1.9, color: dark ? '#B8A0D8' : '#5B4080', maxWidth: 680, margin: '0 auto' }}>
              Paralox Media is an AI-driven digital agency helping brands across the globe grow through strategic social media, performance marketing, web development, and AI-powered solutions. Our team is small but mighty and we're growing fast. If you're ambitious, creative, and excited by the future of digital, this is your place.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── WHY JOIN ──────────────────────────────────────────────────────── */}
      <div style={{ background: dark ? 'rgba(12,4,26,.9)' : '#fff', padding: 'clamp(52px,7vw,80px) clamp(16px,5%,60px)', borderTop: `1px solid ${dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.06)'}`, borderBottom: `1px solid ${dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.06)'}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 14, background: dark ? 'rgba(96,239,255,.08)' : 'rgba(96,239,255,.12)', border: `1px solid ${dark ? 'rgba(96,239,255,.15)' : 'rgba(96,239,255,.25)'}`, borderRadius: 30, padding: '6px 16px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60EFFF' }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, color: dark ? '#60EFFF' : '#0891B2', letterSpacing: 2, textTransform: 'uppercase' }}>Why Join Us</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
              Build Something That Matters
            </h2>
          </FadeUp>

          <div className="wj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(14px,2.5vw,22px)' }}>
            {WHY_JOIN.map(({ icon, title, desc, color, glow }, i) => (
              <FadeUp key={title} delay={i * 0.09}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: `0 20px 50px ${glow}` }}
                  style={{
                    padding: 'clamp(20px,3vw,28px)', borderRadius: 18,
                    border: `1px solid ${dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.08)'}`,
                    background: dark ? 'rgba(12,4,26,.85)' : '#F8F5FF',
                    height: '100%',
                    transition: 'box-shadow .3s',
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: 18,
                    background: `linear-gradient(135deg,${color}22,${color}44)`,
                    border: `1px solid ${color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color,
                    boxShadow: `0 6px 18px ${color}22`,
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 10 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '.83rem', lineHeight: 1.75, color: dark ? '#9B8BC0' : '#7B6A9A' }}>
                    {desc}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── VACANCIES ─────────────────────────────────────────────────────── */}
      <div
        ref={vacanciesRef}
        style={{ background: dark ? '#080510' : '#F8F5FF', padding: 'clamp(52px,7vw,88px) clamp(16px,5%,60px)' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 14, background: dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)', border: `1px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.14)'}`, borderRadius: 30, padding: '6px 16px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.p2 }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, color: T.p2, letterSpacing: 2, textTransform: 'uppercase' }}>Open Positions</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.2, marginBottom: 14 }}>
              Current Vacancies
            </h2>
            <p style={{ fontSize: '.9rem', color: dark ? '#9B8BC0' : '#7B6A9A', maxWidth: 480, margin: '0 auto' }}>
              {VACANCIES.length} open roles across creative and sales teams.
            </p>
          </FadeUp>

          {/* Search + filter */}
          <FadeUp delay={0.08}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: dark ? '#8870B8' : '#9B8BC0' }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search roles..."
                  style={{
                    width: '100%', padding: '11px 13px 11px 38px', borderRadius: 50,
                    border: `1.5px solid ${bd}`,
                    background: dark ? 'rgba(12,4,26,.9)' : '#fff',
                    color: dark ? '#F0E8FF' : '#1A0A2E',
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.87rem',
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 7 }}>
                {CATEGORIES.map(cat => (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(cat)}
                    style={{
                      padding: '9px 18px', borderRadius: 50, border: 'none',
                      cursor: 'pointer',
                      background: filter === cat ? T.grad : (dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)'),
                      color: filter === cat ? '#fff' : (dark ? '#B8A0D8' : T.p1),
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.82rem',
                      boxShadow: filter === cat ? '0 4px 14px rgba(91,29,232,.3)' : 'none',
                      transition: 'all .22s',
                    }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Cards grid */}
          <AnimatePresence mode="popLayout">
            {filteredVacancies.length > 0 ? (
              <div className="vc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(16px,2.5vw,24px)' }}>
                {filteredVacancies.map((v, i) => (
                  <VacancyCard
                    key={v.id}
                    vacancy={v}
                    dark={dark}
                    onApply={setActiveVacancy}
                    onShare={setShareVacancy}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '52px 0', color: dark ? '#6B5A88' : '#B8A0C8', fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                <Search size={36} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontWeight: 600, fontSize: '.95rem' }}>No roles match your search.</p>
                <button onClick={() => { setSearch(''); setFilter('All'); }} style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', color: T.p2, fontWeight: 700, fontSize: '.85rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── APPLICATION CTA BANNER ────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg,#0C0524,#1A0868,#2A0658)', padding: 'clamp(48px,7vw,72px) clamp(16px,5%,60px)', borderTop: '1px solid rgba(139,82,247,.12)', borderBottom: '1px solid rgba(139,82,247,.12)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .07, backgroundImage: 'linear-gradient(rgba(139,82,247,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.5) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: 'min(280px,35vw)', height: 'min(280px,35vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.3),transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeUp>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.2, marginBottom: 14 }}>
              Don't See Your Role?
            </h2>
            <p style={{ fontSize: 'clamp(.88rem,1.8vw,.98rem)', lineHeight: 1.8, color: 'rgba(255,255,255,.55)', maxWidth: 480, margin: '0 auto 30px' }}>
              We're always open to talented people. Send us an open application and tell us how you can contribute to Paralox Media.
            </p>
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(91,29,232,.55)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveVacancy({ id: 'open-application', title: 'Open Application', location: 'Remote / Colombo', type: 'Open' })}
              style={{
                padding: '14px 32px', borderRadius: 50, border: 'none',
                cursor: 'pointer', background: T.grad, color: '#fff',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.95rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 7px 22px rgba(91,29,232,.4)',
              }}
            >
              Send Open Application <ArrowRight size={15} />
            </motion.button>
          </FadeUp>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <div style={{ background: dark ? '#080510' : '#F8F5FF', padding: 'clamp(52px,7vw,88px) clamp(16px,5%,60px)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 14, background: dark ? 'rgba(96,239,255,.08)' : 'rgba(96,239,255,.12)', border: `1px solid ${dark ? 'rgba(96,239,255,.15)' : 'rgba(96,239,255,.25)'}`, borderRadius: 30, padding: '6px 16px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60EFFF' }} />
              <span style={{ fontSize: '.68rem', fontWeight: 700, color: dark ? '#60EFFF' : '#0891B2', letterSpacing: 2, textTransform: 'uppercase' }}>FAQs</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.2 }}>
              Candidate Questions
            </h2>
          </FadeUp>

          <div>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} dark={dark} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <div style={{ background: dark ? 'rgba(12,4,26,.95)' : '#fff', padding: 'clamp(52px,7vw,80px) clamp(16px,5%,60px)', borderTop: `1px solid ${dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.08)'}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeUp>
            <div style={{
              background: 'linear-gradient(135deg,#0C0524,#2A0868,#1A0A48)',
              borderRadius: 24, padding: 'clamp(36px,5vw,56px) clamp(24px,5vw,52px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(139,82,247,.18)',
            }}>
              <div style={{ position: 'absolute', inset: 0, opacity: .08, backgroundImage: 'linear-gradient(rgba(139,82,247,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.4) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
              <div className="og" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70%', height: '200%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(91,29,232,.3),transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.2, marginBottom: 14 }}>
                  Ready to Build the Future?
                </h2>
                <p style={{ fontSize: 'clamp(.88rem,1.8vw,.98rem)', lineHeight: 1.8, color: 'rgba(255,255,255,.55)', maxWidth: 460, margin: '0 auto 30px' }}>
                  Join a team that's redefining what's possible with AI, creativity, and ambition. Your next chapter starts here.
                </p>
                <div className="hb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13 }}>
                  <motion.button
                    whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(91,29,232,.6)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={scrollToVacancies}
                    style={{
                      padding: '13px 28px', borderRadius: 50, border: 'none',
                      cursor: 'pointer', background: T.grad, color: '#fff',
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.92rem',
                      display: 'flex', alignItems: 'center', gap: 7,
                      boxShadow: '0 6px 20px rgba(91,29,232,.4)',
                    }}
                  >
                    <Briefcase size={15} /> Explore Roles
                  </motion.button>
                  <motion.a
                    href="mailto:info@paraloxmedia.com"
                    whileHover={{ y: -3 }}
                    style={{
                      padding: '13px 28px', borderRadius: 50,
                      border: '1.5px solid rgba(255,255,255,.22)',
                      background: 'rgba(255,255,255,.07)',
                      cursor: 'pointer', color: '#fff',
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.92rem',
                      display: 'flex', alignItems: 'center', gap: 7,
                      textDecoration: 'none',
                    }}
                  >
                    <ArrowRight size={15} /> Contact HR
                  </motion.a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      {activeVacancy && (
        <ApplicationModal dark={dark} vacancy={activeVacancy} onClose={() => setActiveVacancy(null)} />
      )}
      {shareVacancy && (
        <ShareModal dark={dark} vacancy={shareVacancy} onClose={() => setShareVacancy(null)} />
      )}
    </div>
  );
}
