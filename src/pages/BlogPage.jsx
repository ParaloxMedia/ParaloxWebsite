import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles, Newspaper, Lightbulb, CheckCircle2, TrendingUp } from 'lucide-react';
import { T } from '../data';
import { BLOG_POSTS } from '../data/blog';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const FILTERS = ['All', 'Rewind', 'News', 'Paralox Labs'];


function matches(post, filter) {
  if (post.status === 'upcoming') return false;
  if (filter === 'All')         return true;
  if (filter === 'Rewind')      return post.status === 'past';
  if (filter === 'News')        return post.type === 'news';
  if (filter === 'Paralox Labs') return post.type === 'insight';
  return true;
}

function EventMeta({ post, dark }) {
  if (!post.location && !post.time) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, margin: '10px 0' }}>
      {post.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.76rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <MapPin size={11} color={post.color} /> {post.venue || post.location}
        </div>
      )}
      {post.time && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.76rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Clock size={11} color={post.color} /> {post.time}
        </div>
      )}
      {post.seats && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.76rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Users size={11} color={post.color} /> {post.seats} seats only
        </div>
      )}
    </div>
  );
}

/* ── Uniform card — same layout, colour-themed per type ── */
const TYPE_THEME = {
  past:    { color: '#DC2626', icon: <CheckCircle2 size={10} />, label: 'Rewind',        cta: 'Read Recap'   },
  news:    { color: '#1A56DB', icon: <Newspaper    size={10} />, label: 'Company News',  cta: 'Read Story'   },
  insight: { color: '#7C3AED', icon: <Lightbulb    size={10} />, label: 'Paralox Labs',  cta: 'Read More'    },
};

function BlogCard({ post, dark }) {
  const navigate = useNavigate();
  const theme = TYPE_THEME[post.status === 'past' ? 'past' : post.type] || TYPE_THEME.insight;
  const c  = theme.color;
  const bg = dark ? 'rgba(12,4,26,.9)' : '#fff';

  return (
    <motion.div whileHover={{ y: -5, boxShadow: `0 16px 48px ${c}20` }}
      style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, overflow: 'hidden', height: '100%', background: bg, border: `1px solid ${c}22`, position: 'relative' }}>

      {/* Left accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: `linear-gradient(180deg,${c},${c}44)`, borderRadius: '18px 0 0 18px' }} />

      <div style={{ padding: 'clamp(18px,2.5vw,24px) clamp(18px,2.5vw,24px) clamp(18px,2.5vw,24px) clamp(22px,3vw,28px)', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Tag + date */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 6 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 6, fontSize: '.64rem', fontWeight: 700, background: `${c}15`, color: c, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: .5, textTransform: 'uppercase' }}>
            {theme.icon} {theme.label}
          </span>
          <span style={{ fontSize: '.7rem', color: dark ? '#7B6A9A' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={10} /> {post.dateLabel}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1rem,1.8vw,1.13rem)', color: dark ? '#F0E8FF' : '#1A0A2E', lineHeight: 1.35, marginBottom: 10 }}>
          {post.title}
        </div>

        {/* Excerpt */}
        <p style={{ fontSize: 'clamp(.78rem,1.4vw,.84rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.8, fontFamily: "'Plus Jakarta Sans',sans-serif", flex: 1, marginBottom: 14 }}>
          {post.excerpt}
        </p>

        {/* Indicator row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 14 }}>
          <TrendingUp size={11} color={c} />
          <span style={{ fontSize: '.68rem', color: c, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700 }}>{theme.label}</span>
        </div>

        {/* CTA */}
        <motion.button whileTap={{ scale: .97 }}
          onClick={() => { navigate(`/pulse/${post.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ width: '100%', padding: '9px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg,${c},${c}cc)`, color: '#fff', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {theme.cta} <ArrowRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}

function UpcomingTimeline({ posts, dark }) {
  const navigate = useNavigate();
  const upcoming = posts.filter(p => p.status === 'upcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  if (!upcoming.length) return null;
  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.08)';

  return (
    <section style={{ padding: 'clamp(44px,6vw,60px) clamp(16px,5%,60px)', background: dark ? 'rgba(91,29,232,.04)' : 'rgba(91,29,232,.02)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp>
          <Chip text="What's Coming" center />
          <Heading dark={dark} size="clamp(1.7rem,3.2vw,2.7rem)" center>
            Upcoming <GradText>Events</GradText>
          </Heading>
          <p style={{ textAlign: 'center', color: dark ? '#B8A0D8' : '#5B4080', marginTop: 8, marginBottom: 36, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.84rem,1.6vw,.94rem)' }}>
            Mark your calendar — don't miss what's next from Paralox Media.
          </p>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {upcoming.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.08}>
              <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', alignItems: 'flex-start', marginBottom: 24 }} className="tl-row">
                {/* Date pill */}
                <div style={{ flexShrink: 0, width: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: post.color, boxShadow: `0 0 12px ${post.color}88`, marginBottom: 6 }} />
                  {i < upcoming.length - 1 && <div style={{ width: 2, height: 56, background: `linear-gradient(${post.color},transparent)`, borderRadius: 2 }} />}
                </div>

                {/* Card */}
                <motion.div whileHover={{ x: 4 }}
                  style={{ flex: 1, padding: 'clamp(14px,2vw,20px)', borderRadius: 14, border: `1px solid ${bd}`, background: dark ? 'rgba(20,8,44,.5)' : '#fff', display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: '.68rem', fontWeight: 700, color: post.color, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 4 }}>
                      {post.dateLabel}
                    </div>
                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(.9rem,1.6vw,1.05rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 5 }}>
                      {post.title}
                    </div>
                    <p style={{ fontSize: 'clamp(.76rem,1.3vw,.82rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans',sans-serif", margin: 0 }}>
                      {post.excerpt}
                    </p>
                    <EventMeta post={post} dark={dark} />
                  </div>
                  {post.cta && (
                    <motion.button whileTap={{ scale: .97 }} onClick={() => navigate(post.ctaLink)}
                      style={{ flexShrink: 0, alignSelf: 'center', background: post.color, border: 'none', color: '#fff', padding: '8px 16px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.78rem', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
                      {post.cta} <ArrowRight size={12} />
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPage({ dark }) {
  useSEO({
    title: 'Pulse | AI Marketing News, Events & Insights | Paralox Media',
    description: 'Paralox Pulse — your source for AI marketing insights, company news, past events, and upcoming workshops and launches from Paralox Media.',
  });

  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.08)';

  const filtered = BLOG_POSTS
    .filter(p => matches(p, filter))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const featured = BLOG_POSTS.filter(p => p.featured).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>

      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg,#0C0524,#2A0868,#5B1DE8)', padding: 'clamp(44px,7vw,72px) clamp(16px,5%,60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .1, backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', top: '-30%', right: '5%', width: 'min(380px,50vw)', height: 'min(380px,50vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.4),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Chip text="Paralox Pulse" center light />
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.8rem)', color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 14 }}>
            News, Events &{' '}
            <span style={{ background: 'linear-gradient(135deg,#60EFFF,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Insights</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.62)', fontSize: 'clamp(.86rem,1.8vw,.97rem)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 28px', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Stay in the loop with everything happening at Paralox Media — from AI marketing insights and company milestones to upcoming events and workshops.
          </p>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .97 }} onClick={() => navigate('/contact')}
            style={{ padding: '11px 26px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#fff', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '.9rem', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <Sparkles size={14} /> Get Notified of Events
          </motion.button>
        </div>
      </div>

      {/* ── All Posts ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(16px,5%,60px) 0' }}>

        <FadeUp>
          <Chip text="Pulse Feed" />
          <Heading dark={dark} size="clamp(1.7rem,3.2vw,2.7rem)">
            Everything from <GradText>Paralox Pulse</GradText>
          </Heading>
        </FadeUp>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '20px 0 28px' }}>
          {FILTERS.map(f => (
            <motion.button key={f} whileTap={{ scale: .97 }} onClick={() => setFilter(f)}
              style={{ padding: '7px 16px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.8rem', transition: 'all .22s', ...(filter === f ? { background: T.grad, color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(91,29,232,.3)' } : { background: 'transparent', border: `2px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.14)'}`, color: dark ? '#B8A0D8' : '#5B4080' }) }}>
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: dark ? '#7B6A9A' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                No posts in this category yet.
              </div>
            ) : (
              <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
                {filtered.map((post, i) => (
                  <FadeUp key={post.id} delay={i * 0.06} style={{ height: '100%' }}>
                    <BlogCard post={post} dark={dark} featured={post.featured} />
                  </FadeUp>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Upcoming Events Timeline ── */}
      <UpcomingTimeline posts={BLOG_POSTS} dark={dark} />

      {/* ── CTA Banner ── */}
      <div style={{ maxWidth: 1280, margin: '60px auto 0', padding: '0 clamp(16px,5%,60px)' }}>
        <FadeUp>
          <div style={{ borderRadius: 20, background: 'linear-gradient(135deg,#5B1DE8,#7C3AED)', padding: 'clamp(28px,4vw,40px) clamp(20px,3vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
            <div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', color: '#fff', marginBottom: 6 }}>
                Want to be part of our next event?
              </div>
              <p style={{ color: 'rgba(255,255,255,.65)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.82rem,1.5vw,.92rem)', margin: 0 }}>
                Register your interest and we'll keep you updated on workshops, launches, and exclusives.
              </p>
            </div>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .97 }} onClick={() => navigate('/contact')}
              style={{ padding: '12px 26px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#fff', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              Get in Touch <ArrowRight size={14} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
