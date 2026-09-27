import { useId } from 'react';
import { GLYPHS, STAR_PATH } from '../lib/glyphs';

/** Shared SVG material (gradients + filters) referenced by every glass object. Render once. */
export function GlassDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gBody" x1=".1" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#C9B5FF" stopOpacity=".46" />
          <stop offset=".45" stopColor="#7C3AED" stopOpacity=".14" />
          <stop offset="1" stopColor="#3E2087" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="gCore" cx=".55" cy=".92" r=".75">
          <stop offset="0" stopColor="#7C3AED" stopOpacity=".62" />
          <stop offset=".6" stopColor="#7C3AED" stopOpacity=".08" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".30" />
          <stop offset=".42" stopColor="#FFFFFF" stopOpacity=".04" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset=".35" stopColor="#E4DCFA" stopOpacity=".35" />
          <stop offset=".7" stopColor="#B69CFF" stopOpacity=".25" />
          <stop offset="1" stopColor="#C9B5FF" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="gStreak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".30" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gCurve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B69CFF" stopOpacity="0" />
          <stop offset=".45" stopColor="#C9B5FF" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="fGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b" />
          <feFlood floodColor="#C4B5FD" floodOpacity=".85" />
          <feComposite in2="b" operator="in" result="g" />
          <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".9" /></filter>
        <filter id="fSoft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
    </svg>
  );
}

/** Line glyph (48 grid). Static, trusted markup from GLYPHS. */
export function Glyph({ name, ...rest }) {
  return <g {...rest} dangerouslySetInnerHTML={{ __html: GLYPHS[name] || GLYPHS.ai }} />;
}

/** Premium glass tile icon. `tilt` enables pointer tilt. */
export function Glass({ glyph = 'ai', tilt = false, className = '', style }) {
  const id = useId().replace(/:/g, '');
  return (
    <span className={`glass ${className}`} data-tilt={tilt ? '' : undefined} style={style}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs><clipPath id={`tc${id}`}><rect x="2" y="2" width="96" height="96" rx="26" /></clipPath></defs>
        <rect x="2" y="2" width="96" height="96" rx="26" fill="url(#gBody)" />
        <rect x="2" y="2" width="96" height="96" rx="26" fill="url(#gCore)" />
        <g clipPath={`url(#tc${id})`}>
          <rect x="0" y="0" width="100" height="50" fill="url(#gSheen)" />
          <path className="streak" d="M-34 86 56 -4 70 -4 -20 86Z" fill="url(#gStreak)" />
          <Glyph name={glyph} transform="translate(28 29)" fill="none" stroke="#C9B5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".4" filter="url(#fBlur)" />
        </g>
        <Glyph name={glyph} transform="translate(26 26)" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#fGlow)" />
        <rect x="2.6" y="2.6" width="94.8" height="94.8" rx="25.4" fill="none" stroke="url(#gRim)" strokeWidth="1.2" />
        <path d="M16 6.8Q6.8 6.8 6.8 17" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Floating glass tile positioned inside a hero stage (parallax depth `d`). */
export function FloatTile({ glyph, s, pos, d, dur, delay = 0, rot = 0 }) {
  return (
    <div className="ft px" style={{ '--s': `${s}px`, '--d': `${d}px`, ...pos }}>
      <div className="float" style={{ '--dur': `${dur}s`, '--delay': `${delay}s`, '--rot': `${rot}deg` }}>
        <Glass glyph={glyph} tilt />
      </div>
    </div>
  );
}

export function Star({ fill = '#7C3AED', ...rest }) {
  return <svg viewBox="0 0 48 48" aria-hidden="true" {...rest}><path d={STAR_PATH} fill={fill} /></svg>;
}

/** Brand signature curves (glow + hairline). */
export function Curves({ className = 'curves', glowOpacity = 0.45, draw = false }) {
  const a = 'M1032 -48C840 264 456 564 -72 840';
  const b = 'M-72 1032C432 960 840 828 1152 708C1440 600 1704 528 1992 504';
  return (
    <svg className={className} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="url(#gCurve)" strokeLinecap="round">
        <g filter="url(#fSoft)" strokeWidth="10" opacity={glowOpacity}>
          <path className={draw ? 'draw' : undefined} d={a} /><path className={draw ? 'draw d2' : undefined} d={b} />
        </g>
        <g strokeWidth="2">
          <path className={draw ? 'draw' : undefined} d={a} /><path className={draw ? 'draw d2' : undefined} d={b} />
        </g>
      </g>
    </svg>
  );
}
