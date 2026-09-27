import { useId } from 'react';
import { Glyph } from './Glass';
import { rr, circ } from '../lib/glyphs';

/** A single glass shape: body, core glow, sheen, moving streak, rim. */
function GShape({ d, op, streak = true, rim = 1.4, children }) {
  const id = useId().replace(/:/g, '');
  return (
    <g>
      <path d={d} fill="url(#gBody)" opacity={op} />
      <path d={d} fill="url(#gCore)" />
      <path d={d} fill="url(#gSheen)" />
      {streak && (
        <>
          <clipPath id={`sc${id}`}><path d={d} /></clipPath>
          <g clipPath={`url(#sc${id})`}><path className="streak" d="M-200 700 400 -100 470 -100 -130 700Z" fill="url(#gStreak)" /></g>
        </>
      )}
      <path d={d} fill="none" stroke="url(#gRim)" strokeWidth={rim} />
      {children}
    </g>
  );
}

const Float = ({ dur, delay = 0, children }) => (
  <g className="float" style={{ '--dur': `${dur}s`, '--delay': `${delay}s` }}>{children}</g>
);

function AiScene() {
  const node = (cx, cy, key, d) => (
    <Float key={key} dur={9 + d} delay={-(d * 1.6)}>
      <GShape d={circ(cx, cy, 40)} streak={false} />
      <Glyph name={key} transform={`translate(${cx - 15} ${cy - 15}) scale(.625)`} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" filter="url(#fGlow)" />
    </Float>
  );
  return (
    <>
      <g fill="none" stroke="#B69CFF" strokeWidth="1.6" strokeDasharray="3 7" strokeLinecap="round" opacity=".8" className="wire">
        <path d="M280 324C280 372 168 366 168 402" /><path d="M280 324L300 428" /><path d="M280 324C280 372 432 366 432 402" />
      </g>
      <Float dur={10}>
        <GShape d={rr(110, 86, 340, 236, 32)}>
          <rect x="138" y="118" width="176" height="36" rx="18" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".28" />
          <rect x="154" y="132" width="120" height="8" rx="4" fill="#fff" fillOpacity=".7" />
          <rect x="246" y="168" width="178" height="36" rx="18" fill="#7C3AED" fillOpacity=".8" />
          <rect x="262" y="182" width="128" height="8" rx="4" fill="#fff" fillOpacity=".92" />
          <rect x="138" y="218" width="200" height="36" rx="18" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".28" />
          <rect x="154" y="232" width="150" height="8" rx="4" fill="#fff" fillOpacity=".7" />
          <g fill="#C9B5FF">
            <circle cx="152" cy="290" r="4" className="td" />
            <circle cx="166" cy="290" r="4" className="td" style={{ animationDelay: '.2s' }} />
            <circle cx="180" cy="290" r="4" className="td" style={{ animationDelay: '.4s' }} />
          </g>
        </GShape>
      </Float>
      {node(168, 444, 'calendar', 1)}{node(300, 470, 'data', 2)}{node(432, 444, 'user', 3)}
    </>
  );
}

function EngScene() {
  return (
    <>
      <Float dur={12} delay={-3}>
        <GShape d="M430 64 512 110 430 156 348 110Z" streak={false} />
        <GShape d="M348 110 430 156 430 248 348 202Z" op={0.8} />
        <GShape d="M430 156 512 110 512 202 430 248Z" op={0.6} />
        <g stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round"><path d="M362 146l52 29M362 170l52 29M362 194l52 29" /></g>
        <g fill="#C9B5FF"><circle cx="498" cy="146" r="3" /><circle cx="498" cy="170" r="3" opacity=".6" /></g>
      </Float>
      <Float dur={10}>
        <GShape d={rr(96, 196, 380, 270, 28)}>
          <path d="M96 240h380" stroke="#fff" strokeOpacity=".28" strokeWidth="1.5" />
          <g fill="#fff"><circle cx="126" cy="218" r="6" opacity=".85" /><circle cx="148" cy="218" r="6" opacity=".55" /><circle cx="170" cy="218" r="6" opacity=".35" /></g>
          <rect x="210" y="208" width="190" height="20" rx="10" fill="#fff" fillOpacity=".10" stroke="#fff" strokeOpacity=".2" />
          <g strokeLinecap="round" strokeWidth="10">
            <path d="M130 262h70" stroke="#C9B5FF" strokeOpacity=".9" /><path d="M216 262h120" stroke="#fff" strokeOpacity=".55" />
            <path d="M160 292h140" stroke="#fff" strokeOpacity=".4" /><path d="M160 322h60" stroke="#B69CFF" strokeOpacity=".8" /><path d="M236 322h96" stroke="#fff" strokeOpacity=".35" />
            <path d="M160 352h110" stroke="#fff" strokeOpacity=".4" /><path d="M130 382h40" stroke="#C9B5FF" strokeOpacity=".9" />
          </g>
          <rect x="180" y="342" width="3" height="22" fill="#fff" className="caret" />
        </GShape>
      </Float>
    </>
  );
}

function MediaScene() {
  return (
    <>
      <Float dur={12} delay={-5}>
        <g transform="rotate(-9 130 120)">
          <GShape d={rr(40, 60, 180, 124, 18)}>
            <path d="M60 164l40-40 30 26 26-18 46 32" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="178" cy="94" r="10" fill="#fff" fillOpacity=".55" />
          </GShape>
        </g>
      </Float>
      <Float dur={10} delay={-2}>
        <g transform="rotate(7 490 440)">
          <GShape d={rr(420, 392, 150, 104, 18)}><path d="M482 424v40l32-20z" fill="#fff" fillOpacity=".8" /></GShape>
        </g>
      </Float>
      <Float dur={11}>
        <GShape d={rr(214, 168, 150, 70, 20)} streak={false} op={0.8} />
        <GShape d={rr(118, 206, 364, 240, 52)} />
        <GShape d={rr(404, 232, 46, 24, 10)} streak={false} />
        <circle cx="300" cy="326" r="100" fill="#0E0C13" fillOpacity=".35" />
        <GShape d="M300 226a100 100 0 1 1 0 200a100 100 0 1 1 0-200Z" rim={2} />
        <GShape d="M300 258a68 68 0 1 1 0 136a68 68 0 1 1 0-136Z" />
        <circle cx="300" cy="326" r="40" fill="#1E0F45" fillOpacity=".85" stroke="url(#gRim)" strokeWidth="1.5" />
        <circle cx="300" cy="326" r="16" fill="#7C3AED" fillOpacity=".7" filter="url(#fBlur)" />
        <path d="M262 292a52 52 0 0 1 44-20" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
        <circle cx="287" cy="312" r="6" fill="#fff" fillOpacity=".85" />
      </Float>
    </>
  );
}

function GrowthScene() {
  const bars = [[150, 90], [240, 150], [330, 215], [420, 290]];
  return (
    <>
      <GShape d="M70 470 L470 470 L540 420 L140 420Z" streak={false} op={0.8} />
      {bars.map(([x, h], k) => (
        <Float key={x} dur={10 + k} delay={-(k * 1.7)}><GShape d={rr(x, 445 - h, 62, h, 14)} /></Float>
      ))}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M96 372C200 350 300 260 470 112" stroke="#B69CFF" strokeWidth="14" strokeOpacity=".35" filter="url(#fSoft)" />
        <path d="M96 372C200 350 300 260 470 112" stroke="#fff" strokeWidth="4" className="draw" />
        <path d="M430 108 474 108 472 152" stroke="#fff" strokeWidth="4" />
      </g>
      <g fill="#fff"><circle cx="96" cy="372" r="6" /></g>
    </>
  );
}

const MAP = { ai: AiScene, eng: EngScene, media: MediaScene, growth: GrowthScene };

/** Glass scene SVG (600×560 stage). */
export function Scene({ name, className = '', style }) {
  const Comp = MAP[name];
  return (
    <svg viewBox="0 0 600 560" className={className} style={style} aria-hidden="true">
      {Comp && <Comp />}
    </svg>
  );
}
