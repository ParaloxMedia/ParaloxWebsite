import { useEffect, useRef, useState } from 'react';
import robotHand from '../assets/loader/robot-hand.png';
import humanHand from '../assets/loader/human-hand.png';
import { prefersReducedMotion } from '../hooks/useHashRoute';

/**
 * Robot and human hands reach toward each other and touch (the loader's moment, as a looping panel).
 * Meets when scrolled into view, holds, drifts apart a little, and meets again while visible.
 */
export default function HandsTouch({ className = '' }) {
  const ref = useRef(null);
  const [meet, setMeet] = useState(() => prefersReducedMotion());
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let timer = 0, visible = false;
    const cycle = (next) => {
      setMeet(next);
      timer = setTimeout(() => cycle(!next), next ? 4200 : 1400);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; timer = setTimeout(() => cycle(true), 350); }
      if (!e.isIntersecting && visible) { visible = false; clearTimeout(timer); setMeet(false); }
    }, { threshold: 0.35 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <div className={`ht${meet ? ' meet' : ''} ${className}`} ref={ref} aria-hidden="true">
      <div className="ht-box">
        <img className="ht-hand robot" src={robotHand} alt="" loading="lazy" decoding="async" />
        <img className="ht-hand human" src={humanHand} alt="" loading="lazy" decoding="async" />
        <span className="ht-glow" />
        <span className="ht-spark" />
      </div>
    </div>
  );
}
