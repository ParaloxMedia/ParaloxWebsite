import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Calendar, MapPin, Clock, Users, ArrowRight,
  ChevronLeft, ChevronRight, Camera, Search, Sparkles,
  Globe, Handshake, Zap, BarChart2, Bot, Lightbulb,
  TrendingUp, Star, Award, Target, CheckCircle, Rocket,
  Brain, Shield, Heart, Coffee, Megaphone, Code2,
} from 'lucide-react';
import { T } from '../data';
import { BLOG_POSTS } from '../data/blog';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const TAG_COLOR = {
  'Upcoming Event': { bg: 'linear-gradient(135deg,#5B1DE8,#A855F7)', text: '#fff' },
  'Past Event':     { bg: 'rgba(22,163,74,.18)',                      text: '#16A34A' },
  'Company News':   { bg: 'rgba(225,29,72,.15)',                      text: '#E11D48' },
  'Insight':        { bg: 'rgba(91,29,232,.13)',                      text: '#5B1DE8' },
};

/* Maps position index → a premium Lucide icon for highlight cards */
const HIGHLIGHT_ICONS = [Sparkles, Globe, Handshake, Zap, TrendingUp, Star, Award, Target, CheckCircle, Rocket, Brain, Shield, Lightbulb, BarChart2, Bot, Code2, Megaphone, Heart, Coffee];

function PhotoSlideshow({ photos, color, dark }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIdx(i => (i + 1) % photos.length); }, 4500);
    return () => clearInterval(t);
  }, [photos.length]);

  const prev = () => { setDir(-1); setIdx(i => (i - 1 + photos.length) % photos.length); };
  const next = () => { setDir(1);  setIdx(i => (i + 1) % photos.length); };

  return (
    <div style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid ${color}44`, background: '#000', position: 'relative', boxShadow: `0 32px 80px ${color}22` }}>
      {/* Main image */}
      <div style={{ position: 'relative', height: 'clamp(280px,42vw,560px)', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={idx} custom={dir}
            variants={{ enter: d => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }), center: { x: 0, opacity: 1 }, exit: d => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }) }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}>
            <img
              src={photos[idx].src}
              alt={photos[idx].caption}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(20,8,44,.8)' : '#1a0a2e', flexDirection: 'column', gap: 12 }}>
              <Camera size={36} color='rgba(168,85,247,.5)' />
              <div style={{ color: 'rgba(255,255,255,.4)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.8rem' }}>Save to public/images/events/</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(transparent,rgba(0,0,0,.82))', pointerEvents: 'none' }} />

        {/* Caption */}
        {photos[idx].caption && (
          <div style={{ position: 'absolute', bottom: 18, left: 22, right: 80, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.78rem,1.4vw,.9rem)', fontWeight: 500, lineHeight: 1.5, letterSpacing: .2 }}>
            {photos[idx].caption}
          </div>
        )}

        {/* Counter pill */}
        <div style={{ position: 'absolute', bottom: 20, right: 18, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 20, padding: '3px 10px', color: 'rgba(255,255,255,.85)', fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.75rem' }}>
          {idx + 1} / {photos.length}
        </div>

        {/* Arrows */}
        <motion.button whileHover={{ scale: 1.08 }} onClick={prev}
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '50%', width: 42, height: 42, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={19} />
        </motion.button>
        <motion.button whileHover={{ scale: 1.08 }} onClick={next}
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '50%', width: 42, height: 42, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={19} />
        </motion.button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 14px', background: 'rgba(0,0,0,.9)', overflowX: 'auto' }}>
        {photos.map((photo, i) => (
          <motion.div key={i} whileHover={{ scale: 1.08 }} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            style={{ flexShrink: 0, width: 64, height: 46, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: i === idx ? `2px solid ${color}` : '2px solid rgba(255,255,255,.1)', transition: 'border .2s', opacity: i === idx ? 1 : 0.55 }}>
            <img src={photo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.background = '#2a1a4e'; }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LatestCard({ post, dark }) {
  const navigate = useNavigate();
  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.07)';
  const tc = TAG_COLOR[post.tag] || TAG_COLOR['Insight'];

  return (
    <motion.div whileHover={{ y: -5, boxShadow: `0 16px 40px ${post.color}18` }}
      onClick={() => { navigate(`/pulse/${post.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      style={{ cursor: 'pointer', padding: 'clamp(16px,2vw,22px)', borderRadius: 16, border: `1px solid ${bd}`, background: dark ? 'rgba(12,4,26,.85)' : '#fff', borderLeft: `3px solid ${post.color}`, transition: 'box-shadow .25s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: '.63rem', fontWeight: 700, background: tc.bg, color: tc.text, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: .5 }}>
          {post.tag}
        </span>
        <span style={{ fontSize: '.68rem', color: dark ? '#7B6A9A' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 4 }}>
          <Calendar size={10} /> {post.dateLabel}
        </span>
      </div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 'clamp(.88rem,1.5vw,.98rem)', color: dark ? '#F0E8FF' : '#1A0A2E', lineHeight: 1.4, marginBottom: 6 }}>
        {post.title}
      </div>
      <p style={{ fontSize: 'clamp(.75rem,1.3vw,.81rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0 }}>
        {post.excerpt}
      </p>
    </motion.div>
  );
}

export function BlogPostPage({ dark }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  useSEO({
    title: post ? `${post.title} | Paralox Pulse` : 'Post | Paralox Pulse',
    description: post?.excerpt ?? 'Paralox Media — AI Agency news, events and insights.',
  });

  if (!post) {
    return (
      <div style={{ paddingTop: 140, textAlign: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", color: dark ? '#B8A0D8' : '#5B4080', paddingBottom: 80 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(91,29,232,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Search size={28} color={T.p1} />
        </div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.3rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 8 }}>Post not found</div>
        <div style={{ fontSize: '.9rem', marginBottom: 28, color: dark ? '#7B6A9A' : '#9B8BC0' }}>This post may have been moved or deleted.</div>
        <motion.button whileHover={{ y: -2 }} onClick={() => navigate('/pulse')}
          style={{ padding: '11px 26px', borderRadius: 50, background: T.grad, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 7, boxShadow: '0 8px 24px rgba(91,29,232,.3)' }}>
          <ArrowLeft size={14} /> Back to Pulse
        </motion.button>
      </div>
    );
  }

  const tc    = TAG_COLOR[post.tag] || TAG_COLOR['Insight'];
  const bd    = dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.07)';
  const other = BLOG_POSTS.filter(p => p.id !== post.id).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  const paras = post.body.split('\n\n');
  const mid   = Math.ceil(paras.length / 2);
  const first = paras.slice(0, mid);
  const rest  = paras.slice(mid);

  const articleCard = (children, extraStyle = {}) => (
    <div style={{ padding: 'clamp(28px,3.5vw,44px)', borderRadius: 20, border: `1px solid ${bd}`, background: dark ? 'rgba(10,4,22,.75)' : '#fff', boxShadow: dark ? '0 4px 32px rgba(0,0,0,.3)' : '0 4px 32px rgba(91,29,232,.05)', ...extraStyle }}>
      {children}
    </div>
  );

  return (
    <div style={{ paddingTop: 86, paddingBottom: 100 }}>

      {/* ── Hero ── */}
      <div style={{ background: `linear-gradient(145deg,#07031A,#130744,${post.color}40)`, padding: 'clamp(48px,7vw,80px) clamp(16px,5%,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .07, backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <div style={{ position: 'absolute', top: '-30%', right: '3%', width: 'min(500px,55vw)', height: 'min(500px,55vw)', borderRadius: '50%', background: `radial-gradient(circle,${post.color}38,transparent 68%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: 'min(240px,30vw)', height: 'min(240px,30vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,239,255,.12),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Back */}
          <motion.button whileHover={{ x: -4 }} onClick={() => navigate('/pulse')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 50, padding: '7px 16px', color: 'rgba(255,255,255,.75)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: '.8rem', marginBottom: 32, backdropFilter: 'blur(12px)', transition: 'all .2s' }}>
            <ArrowLeft size={13} /> Back to Pulse
          </motion.button>

          {/* Tag + date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: 20, fontSize: '.68rem', fontWeight: 700, letterSpacing: .8, background: tc.bg, color: tc.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {post.tag}
            </span>
            <span style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.48)', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 5 }}>
              <Calendar size={11} /> {post.dateLabel}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,5vw,3.4rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 18, maxWidth: 820 }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{ color: 'rgba(255,255,255,.58)', fontSize: 'clamp(.88rem,1.8vw,1.04rem)', lineHeight: 1.9, fontFamily: "'Plus Jakarta Sans',sans-serif", maxWidth: 680, marginBottom: 0 }}>
            {post.excerpt}
          </p>

          {/* Event meta */}
          {(post.venue || post.time || post.seats) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 26 }}>
              {post.venue && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.8rem', color: 'rgba(255,255,255,.55)', fontFamily: "'Plus Jakarta Sans',sans-serif", background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 50, padding: '5px 13px', backdropFilter: 'blur(8px)' }}>
                  <MapPin size={11} color={post.color} /> {post.venue}
                </span>
              )}
              {post.time && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.8rem', color: 'rgba(255,255,255,.55)', fontFamily: "'Plus Jakarta Sans',sans-serif", background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 50, padding: '5px 13px', backdropFilter: 'blur(8px)' }}>
                  <Clock size={11} color={post.color} /> {post.time}
                </span>
              )}
              {post.seats && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.8rem', color: 'rgba(255,255,255,.55)', fontFamily: "'Plus Jakarta Sans',sans-serif", background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 50, padding: '5px 13px', backdropFilter: 'blur(8px)' }}>
                  <Users size={11} color={post.color} /> {post.seats} seats only
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Article body ── */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(16px,5%,60px) 0' }}>

        {/* First half */}
        <FadeUp>
          {articleCard(
            <>
              {first.map((para, i) => (
                <p key={i} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.9rem,1.6vw,1.02rem)', color: dark ? '#C8B8E8' : '#2D1B4E', lineHeight: 2.05, margin: 0, marginBottom: i < first.length - 1 ? 20 : 0 }}>
                  {para}
                </p>
              ))}
            </>,
            { marginBottom: 28 }
          )}
        </FadeUp>

        {/* Photo slideshow in the middle */}
        {post.photos?.length > 0 && (
          <FadeUp delay={0.06}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Camera size={15} color={post.color} />
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.85rem', color: dark ? '#B8A0D8' : '#5B4080', letterSpacing: 1.2, textTransform: 'uppercase' }}>Event Photos</div>
              </div>
              <PhotoSlideshow photos={post.photos} color={post.color} dark={dark} />
            </div>
          </FadeUp>
        )}

        {/* Rest of article */}
        {rest.length > 0 && (
          <FadeUp delay={0.08}>
            {articleCard(
              <>
                {rest.map((para, i) => (
                  <p key={i} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.9rem,1.6vw,1.02rem)', color: dark ? '#C8B8E8' : '#2D1B4E', lineHeight: 2.05, margin: 0, marginBottom: i < rest.length - 1 ? 20 : 0 }}>
                    {para}
                  </p>
                ))}
              </>,
              { marginBottom: 28 }
            )}
          </FadeUp>
        )}

        {/* Key Highlights */}
        {post.highlights?.length > 0 && (
          <FadeUp delay={0.1}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <Sparkles size={15} color={post.color} />
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.85rem', color: dark ? '#B8A0D8' : '#5B4080', letterSpacing: 1.2, textTransform: 'uppercase' }}>Key Highlights</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                {post.highlights.map((h, i) => {
                  const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
                  return (
                    <motion.div key={i} whileHover={{ y: -5, boxShadow: `0 16px 40px ${post.color}22` }}
                      style={{ padding: '22px 20px', borderRadius: 16, border: `1px solid ${post.color}28`, background: dark ? `rgba(10,4,22,.85)` : '#fff', boxShadow: dark ? '0 2px 16px rgba(0,0,0,.2)' : '0 2px 16px rgba(91,29,232,.05)', transition: 'box-shadow .25s' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 11, background: `linear-gradient(135deg,${post.color}22,${post.color}0a)`, border: `1px solid ${post.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                        <Icon size={18} color={post.color} />
                      </div>
                      <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '.95rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 8, lineHeight: 1.3 }}>{h.title}</div>
                      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.78rem', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.75, margin: 0 }}>{h.text}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        )}
      </div>

      {/* ── Latest from Pulse ── */}
      {other.length > 0 && (
        <div style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(40px,5vw,56px) clamp(16px,5%,60px) 0' }}>
          <FadeUp>
            <div style={{ height: 1, background: bd, marginBottom: 40 }} />
            <Chip text="Latest from Pulse" />
            <Heading dark={dark} size="clamp(1.5rem,2.8vw,2.2rem)">
              More from <GradText>Paralox Media</GradText>
            </Heading>
          </FadeUp>

          <div className="latest-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 24 }}>
            {other.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.06}>
                <LatestCard post={p} dark={dark} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .97 }}
                onClick={() => { navigate('/pulse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ padding: '11px 28px', borderRadius: 50, border: `2px solid ${T.p1}`, background: 'transparent', color: T.p1, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.88rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View All Posts <ArrowRight size={14} />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      )}
    </div>
  );
}
