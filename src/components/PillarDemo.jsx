import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useHashRoute';

/**
 * Step through a looping demo while it is on screen.
 * Returns the current step (0..steps). Reduced motion shows the final step, still.
 */
function useDemoLoop(ref, steps, ms, hold = 2) {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? steps : 0));
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let timer = 0, n = 0, visible = false;
    const tick = () => {
      n = n >= steps + hold ? 0 : n + 1;
      setStep(Math.min(n, steps));
      timer = setTimeout(tick, n === 0 ? 500 : ms);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; timer = setTimeout(tick, 400); }
      if (!e.isIntersecting && visible) { visible = false; clearTimeout(timer); }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [ref, steps, ms, hold]);
  return step;
}

const on = (cond) => (cond ? ' on' : '');

/* ---------- AI: an agent answers a WhatsApp enquiry and hands over ---------- */
const CHAT = [
  { who: 'in', t: 'Hi, is the 3-seater sofa in stock?' },
  { who: 'out', t: 'Yes, 4 left in grey and blue. Delivery in Colombo takes 2 days.' },
  { who: 'in', t: 'Great. Can I see it on Saturday?' },
  { who: 'out', t: 'Booked for Saturday, 11:00. Passing you to Nimal for the details.' },
];
function AiDemo() {
  const ref = useRef(null);
  const step = useDemoLoop(ref, CHAT.length * 2 + 1, 900, 3);
  // even steps show "typing", odd steps show the message
  const shown = Math.floor((step + 1) / 2);
  const typing = step % 2 === 1 && step < CHAT.length * 2 && CHAT[shown]?.who === 'out';
  return (
    <div className="dm dm-ai" ref={ref}>
      <div className="dm-bar"><span className="dm-av">AI</span><span><b>Paralox agent</b><small>{typing ? 'typing…' : 'online'}</small></span><span className="dm-live mono">Demo</span></div>
      <div className="dm-chat">
        {CHAT.map((m, i) => (
          <p key={i} className={`dm-msg ${m.who}${on(i < shown)}`}>{m.t}</p>
        ))}
        <p className={`dm-typing${on(typing)}`} aria-hidden="true"><i /><i /><i /></p>
        <p className={`dm-hand${on(step >= CHAT.length * 2 + 1)}`}><span className="dm-dot" />Handed to the team · conversation attached</p>
      </div>
    </div>
  );
}

/* ---------- Engineering: code types out, then build → tests → deploy ---------- */
const CODE = [
  [['k', 'export async function '], ['f', 'bookViewing'], ['p', '(slot) {']],
  [['p', '  const '], ['v', 'ok'], ['p', ' = await '], ['f', 'calendar.reserve'], ['p', '(slot);']],
  [['p', '  if (!'], ['v', 'ok'], ['p', ') '], ['k', 'return '], ['s', "'Slot taken'"], ['p', ';']],
  [['p', '  await '], ['f', 'whatsapp.send'], ['p', '(slot.customer, '], ['s', "'Confirmed'"], ['p', ');']],
  [['k', '  return '], ['s', "'Booked'"], ['p', ';']],
  [['p', '}']],
];
const STAGES = ['Build', 'Tests', 'Deploy'];
function EngDemo() {
  const ref = useRef(null);
  const step = useDemoLoop(ref, CODE.length + STAGES.length + 1, 650, 3);
  const lines = Math.min(step, CODE.length);
  const stage = Math.max(0, step - CODE.length); // 0..4
  return (
    <div className="dm dm-eng" ref={ref}>
      <div className="dm-bar"><span className="dm-lights"><i /><i /><i /></span><span className="mono">booking.js</span><span className="dm-live mono">Demo</span></div>
      <pre className="dm-code">
        {CODE.map((ln, i) => (
          <span key={i} className={`dm-ln${on(i < lines)}`}>
            <em>{i + 1}</em>{ln.map(([c, t], j) => <span key={j} className={`c-${c}`}>{t}</span>)}
            {i === lines - 1 && stage === 0 && <span className="dm-caret" />}
            {'\n'}
          </span>
        ))}
      </pre>
      <div className="dm-pipe">
        {STAGES.map((s, i) => <span key={s} className={`mono${on(stage > i)}`}><i />{s}</span>)}
        <div className="dm-track"><b style={{ transform: `scaleX(${Math.min(stage, 3) / 3})` }} /></div>
        <span className={`dm-ship mono${on(stage > STAGES.length)}`}>Live · 0.8s load</span>
      </div>
    </div>
  );
}

/* ---------- Media: an edit timeline with a moving playhead ---------- */
const TRACKS = [
  { label: 'V2', clips: [[8, 22, 'a'], [44, 18, 'b'], [70, 22, 'a']] },
  { label: 'V1', clips: [[0, 30, 'c'], [30, 26, 'd'], [56, 44, 'c']] },
  { label: 'A1', clips: [[0, 100, 'au']] },
];
function MediaDemo() {
  const ref = useRef(null);
  const step = useDemoLoop(ref, 10, 600, 2);
  return (
    <div className="dm dm-media" ref={ref}>
      <div className="dm-bar"><span className="dm-rec" /><span className="mono">Brand film · 00:30 · 4K</span><span className="dm-live mono">Demo</span></div>
      <div className="dm-screen"><div className="dm-frame" /><span className="dm-tc mono">00:00:{String(Math.round(step * 3)).padStart(2, '0')}:12</span><span className="dm-cap">Shot on location, finished with AI</span></div>
      <div className="dm-tl">
        {TRACKS.map((t) => (
          <div className="dm-track2" key={t.label}>
            <span className="mono">{t.label}</span>
            <div>{t.clips.map(([l, w, c], i) => <i key={i} className={`k-${c}`} style={{ left: `${l}%`, width: `${w}%` }} />)}</div>
          </div>
        ))}
        <span className="dm-head" />
      </div>
      <div className="dm-render mono"><span>Rendering 3 formats · 16:9 · 9:16 · 1:1</span><div className="dm-track"><b style={{ transform: `scaleX(${step / 10})` }} /></div></div>
    </div>
  );
}

/* ---------- Growth: bars grow, the trend line draws, numbers tick up ---------- */
const BARS = [28, 36, 33, 48, 55, 62, 74, 88];
function GrowthDemo() {
  const ref = useRef(null);
  const step = useDemoLoop(ref, BARS.length, 450, 4);
  const k = step / BARS.length;
  const pts = BARS.map((b, i) => `${10 + i * 40},${110 - b}`).join(' ');
  return (
    <div className="dm dm-growth" ref={ref}>
      <div className="dm-bar"><span className="dm-dot" /><span className="mono">Monthly report · enquiries</span><span className="dm-live mono">Demo</span></div>
      <div className="dm-kpis">
        <div><small className="mono">Enquiries</small><b>{Math.round(412 * k)}</b><em>+38%</em></div>
        <div><small className="mono">Cost / result</small><b>LKR {Math.round(1850 - 640 * k)}</b><em>−35%</em></div>
        <div><small className="mono">ROAS</small><b>{(1 + 3.2 * k).toFixed(1)}x</b><em>+2.1x</em></div>
      </div>
      <svg className="dm-chart" viewBox="0 0 300 120" aria-hidden="true">
        {[30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} />)}
        {BARS.map((b, i) => <rect key={i} x={i * 40 + 2} width="16" rx="3" y={i < step ? 110 - b : 110} height={i < step ? b : 0} />)}
        <polyline points={pts} style={{ strokeDashoffset: 400 * (1 - k) }} />
      </svg>
    </div>
  );
}

const DEMOS = {
  ai: { C: AiDemo, kicker: 'See it work', title: ['An agent that answers,', 'then hands over'], text: 'Customers get a correct answer in seconds, day or night. Anything that needs judgement goes to your team with the whole conversation attached.' },
  engineering: { C: EngDemo, kicker: 'See it work', title: ['From first line', 'to live site'], text: 'Readable code, automatic tests and one-click deploys, so every change reaches your customers quickly and safely.' },
  media: { C: MediaDemo, kicker: 'See it work', title: ['One edit,', 'every format'], text: 'We cut once and deliver the film in every shape your channels need: widescreen, vertical and square.' },
  growth: { C: GrowthDemo, kicker: 'See it work', title: ['Numbers that', 'move the business'], text: 'We report on enquiries, cost per result and return on spend, the numbers your business actually runs on.' },
};

/** Dark band with a short explainer and a looping, pillar-specific mini demo. */
export default function PillarDemo({ id }) {
  const d = DEMOS[id];
  if (!d) return null;
  const { C } = d;
  return (
    <section className="demo sec" aria-label={`${d.title.join(' ')} (animated demo)`}>
      <div className="wrap demo-grid">
        <div className="demo-copy">
          <p className="demo-kicker mono"><span className="dm-dot" />{d.kicker}</p>
          <h2 className="d-m">{d.title[0]}<br />{d.title[1]}<span className="dot">.</span></h2>
          <p>{d.text}</p>
        </div>
        <div className="demo-stage" aria-hidden="true"><C /></div>
      </div>
    </section>
  );
}
