import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Building2, Globe, Briefcase, Wallet, CalendarClock, Send, CheckCircle2 } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';

const SERVICES_LIST = ['Social Media Management','AI-Driven Digital Marketing','Website / App Development','AI Agent Development','Performance Marketing','Video Production','SEO & Content','Not sure yet — need advice'];
const BUDGET_LIST   = ['Under LKR 50,000 / month','LKR 50,000 – 100,000 / month','LKR 100,000 – 200,000 / month','LKR 200,000 – 500,000 / month','LKR 500,000+ / month','One-off project budget','Not decided yet'];
const TIMELINE_LIST = ['Immediately — ready to start','Within 2–4 weeks','In 1–3 months','Just exploring for now'];
const SIZE_LIST     = ['Solo / Founder only','2–10 employees','11–50 employees','51–200 employees','200+ employees'];
const HEARD_LIST    = ['Google Search','Instagram / Facebook','LinkedIn','TikTok','Referral from a friend or client','Event or conference','Other'];
const WORKED_LIST   = ['No — you would be our first agency','Yes — currently working with one','Yes — but we stopped','We handle it fully in-house'];

/* Presentational pieces — defined at module scope so React keeps input focus
   between renders instead of remounting them on every keystroke. */
function SectionTitle({ n, title, sub, dark }) {
  return (
    <div style={{ marginBottom: 20, marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: T.grad, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", flexShrink: 0 }}>{n}</span>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: dark ? '#F0E8FF' : '#1A0A2E' }}>{title}</h3>
      </div>
      <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.8rem', lineHeight: 1.6, fontFamily: "'Plus Jakarta Sans',sans-serif", paddingLeft: 34 }}>{sub}</p>
    </div>
  );
}

function Pill({ icon, st, ...rest }) {
  return (
    <div style={st.pillS}>
      <span style={st.iconWrap}>{icon}</span>
      <input onFocus={st.focus} onBlur={st.blur} style={st.inputS} {...rest} />
    </div>
  );
}

function Picker({ icon, name, options, placeholder, value, onChange, st }) {
  return (
    <div style={st.pillS}>
      <span style={st.iconWrap}>{icon}</span>
      <select name={name} value={value} onChange={onChange} onFocus={st.focus} onBlur={st.blur} style={{ ...st.inputS, cursor: 'pointer' }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Area({ name, rows = 3, placeholder, value, onChange, st }) {
  return (
    <textarea name={name} value={value} onChange={onChange} onFocus={st.aFocus} onBlur={st.aBlur} rows={rows} placeholder={placeholder} style={st.areaS} />
  );
}

export function RequirementsPage({ dark }) {
  useSEO({
    title: 'Start a Project | Tell Us Your Requirements | Paralox Media',
    description: 'Share your business goals, budget, and requirements so the Paralox Media team can build the right AI and digital marketing strategy for you.',
  });

  const [form, setForm] = useState({
    name: '', business: '', role: '', email: '', phone: '', website: '', industry: '', size: '',
    service: '', whyService: '', goals: '', audience: '', competitors: '',
    budget: '', timeline: '', workedBefore: '', pastExperience: '', whyParalox: '',
    success: '', challenges: '', heard: '', anythingElse: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const bd = dark ? 'rgba(139,82,247,.22)' : 'rgba(91,29,232,.16)';
  const pillS = {
    display: 'flex', alignItems: 'center', gap: 9, height: 46, padding: '0 5px 0 15px',
    border: `1.5px solid ${bd}`, borderRadius: 999,
    background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF',
    transition: 'border-color .25s, box-shadow .25s',
  };
  const inputS = {
    flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent',
    color: dark ? '#F0E8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem',
  };
  const areaS = {
    width: '100%', padding: '13px 15px', boxSizing: 'border-box',
    border: `1.5px solid ${bd}`, borderRadius: 18, resize: 'vertical', outline: 'none',
    background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF', color: dark ? '#F0E8FF' : '#1A0A2E',
    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem', transition: 'border-color .25s, box-shadow .25s',
  };
  const labelS = { display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 7, fontFamily: "'Plus Jakarta Sans',sans-serif" };
  const iconWrap = { display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#8B7BB0' : '#8B7BAC', flexShrink: 0 };
  const ring = `0 0 0 3px ${dark ? 'rgba(139,82,247,.18)' : 'rgba(91,29,232,.12)'}`;

  const h     = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus = e => { e.target.parentElement.style.borderColor = T.p2; e.target.parentElement.style.boxShadow = ring; };
  const blur  = e => { e.target.parentElement.style.borderColor = bd; e.target.parentElement.style.boxShadow = 'none'; };
  const aFocus = e => { e.target.style.borderColor = T.p2; e.target.style.boxShadow = ring; };
  const aBlur  = e => { e.target.style.borderColor = bd; e.target.style.boxShadow = 'none'; };
  const st = { pillS, inputS, areaS, iconWrap, focus, blur, aFocus, aBlur };

  const sub = async () => {
    if (!form.name || !form.business || !form.email || !form.service || !form.budget) {
      alert('Please fill in your name, business, email, the service you need, and your budget range.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/xlgojvpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: 'New Project Requirement Submission', ...form }),
      });
      if (response.ok) setSent(true);
    } catch (error) {
      console.error('Error sending requirements:', error);
      alert('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ paddingTop: 130, paddingBottom: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FadeUp>
          <div style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={32} color="#16A34A" />
            </motion.div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,1.9rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 10, letterSpacing: '-.5px' }}>
              We've Got Everything We Need
            </h2>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.92rem', lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Our team is reviewing your requirements now. Expect a tailored proposal and a call invitation within 24–48 hours.
            </p>
          </div>
        </FadeUp>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 118, paddingBottom: 90 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(16px,5%,24px)' }}>

        <FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 44 }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.p1, background: dark ? 'rgba(139,82,247,.16)' : 'rgba(91,29,232,.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 18, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Start a Project
            </span>
            <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5.5vw,2.9rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: 14 }}>
              Tell Us What You Need.
            </h1>
            <p style={{ maxWidth: 460, color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.92rem', lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              The more we understand about your business and goals, the sharper our proposal. This takes about 5 minutes — and there's no obligation.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div>
            {/* 1 — About you */}
            <SectionTitle n="1" title="About You" sub="So we know who we're speaking with." dark={dark} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div><label style={labelS}>Your Name *</label><Pill st={st} icon={<User size={17} />} name="name" value={form.name} onChange={h} placeholder="John Doe" /></div>
              <div><label style={labelS}>Your Role</label><Pill st={st} icon={<Briefcase size={17} />} name="role" value={form.role} onChange={h} placeholder="Founder / Marketing Head" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div><label style={labelS}>Email Address *</label><Pill st={st} icon={<Mail size={17} />} name="email" type="email" value={form.email} onChange={h} placeholder="you@company.com" /></div>
              <div><label style={labelS}>Phone / WhatsApp</label><Pill st={st} icon={<Phone size={17} />} name="phone" type="tel" value={form.phone} onChange={h} placeholder="+94 75 032 8833" /></div>
            </div>

            {/* 2 — Business */}
            <SectionTitle n="2" title="Your Business" sub="Context about the brand we'd be working with." dark={dark} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div><label style={labelS}>Business Name *</label><Pill st={st} icon={<Building2 size={17} />} name="business" value={form.business} onChange={h} placeholder="Acme Inc." /></div>
              <div><label style={labelS}>Website / Social Link</label><Pill st={st} icon={<Globe size={17} />} name="website" value={form.website} onChange={h} placeholder="acme.com" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div><label style={labelS}>Industry</label><Pill st={st} icon={<Briefcase size={17} />} name="industry" value={form.industry} onChange={h} placeholder="Retail, F&B, SaaS..." /></div>
              <div><label style={labelS}>Company Size</label><Picker st={st} onChange={h} icon={<User size={17} />} name="size" value={form.size} options={SIZE_LIST} placeholder="Select size..." /></div>
            </div>

            {/* 3 — Requirements */}
            <SectionTitle n="3" title="What You're Looking For" sub="The heart of it — what you need and why it matters now." dark={dark} />
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Service You Need *</label>
              <Picker st={st} onChange={h} icon={<Briefcase size={17} />} name="service" value={form.service} options={SERVICES_LIST} placeholder="Select a service..." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Why do you want this specific service right now?</label>
              <Area st={st} value={form.whyService} onChange={h} name="whyService" placeholder="What changed, or what's not working today, that made you look for this?" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>What business goals are you trying to hit?</label>
              <Area st={st} value={form.goals} onChange={h} name="goals" placeholder="More leads, higher sales, brand awareness, entering a new market..." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>What's your biggest challenge or frustration right now?</label>
              <Area st={st} value={form.challenges} onChange={h} name="challenges" placeholder="The thing that would make the biggest difference if it were solved." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Who is your ideal customer?</label>
              <Area st={st} value={form.audience} onChange={h} name="audience" rows={2} placeholder="Age, location, income, interests — as specific as you can be." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Who are your main competitors?</label>
              <Area st={st} value={form.competitors} onChange={h} name="competitors" rows={2} placeholder="Names or links — and what you admire or dislike about their marketing." />
            </div>

            {/* 4 — Budget & timeline */}
            <SectionTitle n="4" title="Budget & Timeline" sub="Honest numbers help us recommend what's genuinely right, not oversized." dark={dark} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div><label style={labelS}>Monthly Budget Range *</label><Picker st={st} onChange={h} icon={<Wallet size={17} />} name="budget" value={form.budget} options={BUDGET_LIST} placeholder="Select budget..." /></div>
              <div><label style={labelS}>When do you want to start?</label><Picker st={st} onChange={h} icon={<CalendarClock size={17} />} name="timeline" value={form.timeline} options={TIMELINE_LIST} placeholder="Select timeline..." /></div>
            </div>

            {/* 5 — Experience & fit */}
            <SectionTitle n="5" title="Experience & Fit" sub="Understanding your history helps us avoid repeating what didn't work." dark={dark} />
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Have you worked with an agency or freelancer before?</label>
              <Picker st={st} onChange={h} icon={<Briefcase size={17} />} name="workedBefore" value={form.workedBefore} options={WORKED_LIST} placeholder="Select an option..." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>If yes — what worked well, and what didn't?</label>
              <Area st={st} value={form.pastExperience} onChange={h} name="pastExperience" placeholder="Be candid. Knowing what disappointed you is the fastest way for us to do better." />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Why Paralox Media?</label>
              <Area st={st} value={form.whyParalox} onChange={h} name="whyParalox" rows={2} placeholder="What made you reach out to us specifically?" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>What would make this project a clear success for you?</label>
              <Area st={st} value={form.success} onChange={h} name="success" rows={2} placeholder="If we nail it, what does that look like in 6 months?" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>How did you hear about us?</label>
              <Picker st={st} onChange={h} icon={<Globe size={17} />} name="heard" value={form.heard} options={HEARD_LIST} placeholder="Select an option..." />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelS}>Anything else we should know?</label>
              <Area st={st} value={form.anythingElse} onChange={h} name="anythingElse" rows={2} placeholder="Brand guidelines, internal constraints, key dates..." />
            </div>

            <motion.button whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(91,29,232,.4)' }} whileTap={{ scale: .97 }} onClick={sub} disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: 999, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.94rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(91,29,232,.3)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Sending...' : 'Submit Requirements'} <Send size={16} />
            </motion.button>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: '.76rem', color: dark ? '#8B7BB0' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Your details stay confidential and are only used to prepare your proposal.
            </p>

            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 14, padding: '11px', borderRadius: 14, textAlign: 'center', background: 'rgba(34,197,94,.09)', border: '1px solid rgba(34,197,94,.24)', color: '#16A34A', fontWeight: 600, fontSize: '.83rem', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <CheckCircle2 size={15} /> Received — we'll be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
