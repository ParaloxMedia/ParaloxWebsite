import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, Send, Heart } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';

const SERVICES_LIST = [
  'Social Media Management',
  'AI-Driven Digital Marketing',
  'Website / App Development',
  'AI Agent Development',
  'Performance Marketing',
  'Video Production',
  'SEO & Content',
  'Custom Package',
];

const RATING_FIELDS = [
  { n: 'quality',        l: 'Quality of Work' },
  { n: 'communication',  l: 'Communication' },
  { n: 'timeliness',     l: 'On-Time Delivery' },
  { n: 'value',          l: 'Value for Money' },
];

function StarRow({ value, onChange, dark }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer', lineHeight: 0 }}
          aria-label={`${n} star`}
        >
          <Star
            size={22}
            fill={n <= value ? '#F59E0B' : 'none'}
            color={n <= value ? '#F59E0B' : (dark ? 'rgba(240,232,255,.28)' : 'rgba(26,10,46,.22)')}
            strokeWidth={1.6}
          />
        </button>
      ))}
    </div>
  );
}

export function FeedbackPage({ dark }) {
  useSEO({
    title: 'Client Feedback | Paralox Media',
    description: 'Share your experience working with Paralox Media. Your feedback helps us improve and serve you better.',
  });

  const [form, setForm] = useState({
    name: '', business: '', role: '', service: '',
    quality: 0, communication: 0, timeliness: 0, value: 0,
    best: '', improve: '', recommend: 0, comments: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.09)';
  const iS = {
    width: '100%', padding: '11px 13px', borderRadius: 10,
    border: `1.5px solid ${bd}`,
    background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF',
    color: dark ? '#F0E8FF' : '#1A0A2E',
    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color .25s,box-shadow .25s',
  };
  const label = { display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 6, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '.2px' };

  const h = e => setForm({ ...form, [e.target.name]: e.target.value });
  const setRating = (field, v) => setForm({ ...form, [field]: v });

  const sub = async () => {
    if (!form.name || !form.business || !form.service || !form.quality || !form.recommend) {
      alert('Please fill in your name, business, service, quality rating, and recommendation rating.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/xlgojvpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'New Client Feedback Submission',
          name: form.name,
          business: form.business,
          role: form.role,
          service: form.service,
          quality: form.quality,
          communication: form.communication,
          timeliness: form.timeliness,
          value: form.value,
          best: form.best,
          improve: form.improve,
          recommend: form.recommend,
          comments: form.comments,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({
          name: '', business: '', role: '', service: '',
          quality: 0, communication: 0, timeliness: 0, value: 0,
          best: '', improve: '', recommend: 0, comments: '',
        });
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ paddingTop: 86, paddingBottom: 72, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FadeUp>
          <div style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} color="#16A34A" />
            </motion.div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 10, letterSpacing: '-.5px' }}>
              Thank You!
            </h2>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.92rem', lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Your feedback means a lot to us. We use every response to sharpen how we work and serve clients like you.
            </p>
          </div>
        </FadeUp>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>

      {/* Header band */}
      <div style={{ background: 'linear-gradient(135deg,#0C0524,#2A0868,#1A0A48)', padding: 'clamp(40px,7vw,52px) clamp(16px,5%,60px) clamp(40px,6vw,56px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .11, backgroundImage: 'linear-gradient(rgba(139,82,247,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.4) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', top: '-40%', right: '10%', width: 'min(380px,50vw)', height: 'min(380px,50vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,29,232,.42),transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 30, padding: '6px 16px' }}>
            <Heart size={12} color="#FF6BFF" fill="#FF6BFF" />
            <span style={{ fontSize: '.68rem', fontWeight: 700, color: 'rgba(255,255,255,.85)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>We'd Love Your Thoughts</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.6rem)', color: 'white', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 12 }}>
            How Did We Do?
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}
            style={{ color: 'rgba(255,255,255,.5)', maxWidth: 480, margin: '0 auto', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.8, fontSize: 'clamp(.84rem,1.8vw,.94rem)' }}>
            Now that we've wrapped up your project, we'd genuinely appreciate two minutes of your time. Your honest feedback helps us keep improving.
          </motion.p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px,6vw,48px) clamp(16px,5%,60px) 0' }}>
        <FadeUp>
          <div style={{ padding: 'clamp(20px,4vw,36px)', borderRadius: 22, border: `1px solid ${dark ? 'rgba(139,82,247,.17)' : 'rgba(91,29,232,.1)'}`, background: dark ? 'rgba(12,4,26,.85)' : '#fff', backdropFilter: 'blur(10px)' }}>

            {/* Identity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }} className="g1">
              <div>
                <label style={label}>Your Name *</label>
                <input name="name" value={form.name} onChange={h} placeholder="John Doe" style={iS} />
              </div>
              <div>
                <label style={label}>Business / Company *</label>
                <input name="business" value={form.business} onChange={h} placeholder="Acme Inc." style={iS} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }} className="g1">
              <div>
                <label style={label}>Your Role</label>
                <input name="role" value={form.role} onChange={h} placeholder="Founder / Marketing Manager..." style={iS} />
              </div>
              <div>
                <label style={label}>Service We Provided *</label>
                <select name="service" value={form.service} onChange={h} style={{ ...iS, cursor: 'pointer' }}>
                  <option value="">Select a service...</option>
                  {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ height: 1, background: bd, margin: '4px 0 22px' }} />

            {/* Ratings */}
            <div style={{ marginBottom: 8 }}>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Rate Your Experience</h3>
              <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.8rem', marginBottom: 16, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Quality of Work is required — the rest help us understand more.</p>
            </div>

            {RATING_FIELDS.map(({ n, l }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: '.86rem', fontWeight: 600, color: dark ? '#F0E8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l}{n === 'quality' ? ' *' : ''}</span>
                <StarRow value={form[n]} onChange={v => setRating(n, v)} dark={dark} />
              </div>
            ))}

            <div style={{ height: 1, background: bd, margin: '10px 0 22px' }} />

            {/* Open questions */}
            <div style={{ marginBottom: 16 }}>
              <label style={label}>What did we do best?</label>
              <textarea name="best" value={form.best} onChange={h} placeholder="What stood out to you the most..." rows={3} style={{ ...iS, resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={label}>Where should we improve?</label>
              <textarea name="improve" value={form.improve} onChange={h} placeholder="Anything we could have done better..." rows={3} style={{ ...iS, resize: 'vertical' }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={label}>Any other comments?</label>
              <textarea name="comments" value={form.comments} onChange={h} placeholder="Anything else you'd like to share..." rows={3} style={{ ...iS, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 10, padding: '14px 16px', borderRadius: 14, background: dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.05)' }}>
              <span style={{ fontSize: '.86rem', fontWeight: 700, color: dark ? '#F0E8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>How likely are you to recommend us? *</span>
              <StarRow value={form.recommend} onChange={v => setRating('recommend', v)} dark={dark} />
            </div>

            <motion.button whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(91,29,232,.4)' }} whileTap={{ scale: .97 }} onClick={sub} disabled={loading}
              style={{ width: '100%', padding: '13px', borderRadius: 50, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.93rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 6px 20px rgba(91,29,232,.3)', opacity: loading ? 0.7 : 1 }}>
              <Send size={15} /> {loading ? 'Sending...' : 'Submit Feedback'}
            </motion.button>

            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 12, padding: '11px', borderRadius: 10, textAlign: 'center', background: 'rgba(34,197,94,.09)', border: '1px solid rgba(34,197,94,.24)', color: '#16A34A', fontWeight: 600, fontSize: '.83rem', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <CheckCircle2 size={15} /> Thank you for your feedback!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
