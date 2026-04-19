import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DottedMap from 'dotted-map';

/**
 * WorldMap — adapted for CRA + React (no Next.js, no Tailwind)
 *
 * Props:
 *  dots            – array of { start: {lat, lng, label?}, end: {lat, lng, label?} }
 *  lineColor       – stroke colour for arcs  (default: brand purple)
 *  dark            – boolean, passed from parent for theme
 *  animationDuration – seconds each arc takes to draw  (default 2)
 *  loop            – repeat animation  (default true)
 */
export function WorldMap({
  dots = [],
  lineColor = '#A855F7',
  dark = false,
  animationDuration = 2,
  loop = true,
  region = null, // viewBox string e.g. "415 52 380 190" in 800×400 space
}) {
  const svgRef = useRef(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  /* ── region zoom: compute SVG viewBox + bg-image CSS transform ── */
  const svgViewBox = region || '0 0 800 400';

  const bgZoomStyle = useMemo(() => {
    if (!region) return {};
    const [x, y, w, h] = region.split(' ').map(Number);
    const scale = 800 / w; // 800×400 is the base coordinate space
    const originX = w < 800 ? (x / (800 - w)) * 100 : 50;
    const originY = h < 400 ? (y / (400 - h)) * 100 : 50;
    return {
      transformOrigin: `${originX}% ${originY}%`,
      transform: `scale(${scale})`,
    };
  }, [region]);

  /* ── build the dotted background SVG once ── */
  const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: dark ? '#FFFFFF25' : '#5B1DE820',
        shape: 'circle',
        backgroundColor: 'transparent',
      }),
    [map, dark]
  );

  /* ── geo → SVG coordinate helpers ── */
  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  /* ── animation timing ── */
  const staggerDelay      = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime          = 2;
  const fullCycleDuration  = totalAnimationTime + pauseTime;

  /* ── styles ── */
  const wrapStyle = {
    width: '100%',
    aspectRatio: '2 / 1',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    background: dark ? '#0A0616' : '#F8F5FF',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  return (
    <div style={wrapStyle}>
      {/* Dotted background */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="world map"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          userSelect: 'none',
          maskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)',
          ...bgZoomStyle,
        }}
      />

      {/* Interactive SVG overlay */}
      <svg
        ref={svgRef}
        viewBox={svgViewBox}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', userSelect: 'none' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wm-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"     stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"     stopOpacity="0" />
          </linearGradient>

          <filter id="wm-glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Arcs ── */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint   = projectPoint(dot.end.lat,   dot.end.lng);
          const pathD      = createCurvedPath(startPoint, endPoint);

          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime   = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;

          return (
            <g key={`arc-${i}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#wm-path-gradient)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={
                  loop
                    ? { pathLength: [0, 0, 1, 1, 0] }
                    : { pathLength: 1 }
                }
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: i * staggerDelay,
                        ease: 'easeInOut',
                      }
                }
              />

              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  filter="url(#wm-glow)"
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{
                    offsetDistance: [null, '0%', '100%', '100%', '100%'],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{ offsetPath: `path('${pathD}')` }}
                />
              )}
            </g>
          );
        })}

        {/* ── Points & Labels ── */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint   = projectPoint(dot.end.lat,   dot.end.lng);

          return (
            <g key={`pts-${i}`}>
              {/* start */}
              <LocPoint
                x={startPoint.x}
                y={startPoint.y}
                label={dot.start.label}
                lineColor={lineColor}
                delay={i * 0.5}
                onHover={setHoveredLocation}
                dark={dark}
              />
              {/* end */}
              <LocPoint
                x={endPoint.x}
                y={endPoint.y}
                label={dot.end.label}
                lineColor={lineColor}
                delay={i * 0.5 + 0.2}
                onHover={setHoveredLocation}
                dark={dark}
              />
            </g>
          );
        })}
      </svg>

      {/* Mobile tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: dark ? 'rgba(10,6,22,.9)' : 'rgba(255,255,255,.9)',
              color: dark ? '#F0E8FF' : '#1A0A2E',
              padding: '6px 14px',
              borderRadius: 10,
              fontSize: '.8rem',
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${dark ? 'rgba(139,82,247,.25)' : 'rgba(91,29,232,.15)'}`,
            }}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── reusable pulsing location dot ── */
function LocPoint({ x, y, label, lineColor, delay, onHover, dark }) {
  return (
    <g>
      <motion.g
        onHoverStart={() => label && onHover(label)}
        onHoverEnd={() => onHover(null)}
        whileHover={{ scale: 1.25 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        style={{ cursor: label ? 'pointer' : 'default' }}
      >
        {/* solid core */}
        <circle cx={x} cy={y} r="3" fill={lineColor} filter="url(#wm-glow)" />
        {/* pulse ring */}
        <circle cx={x} cy={y} r="3" fill={lineColor} opacity="0.45">
          <animate attributeName="r"       from="3"   to="12" dur="2s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0"  dur="2s" begin="0s" repeatCount="indefinite" />
        </circle>
      </motion.g>

      {label && (
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          style={{ pointerEvents: 'none' }}
        >
          <foreignObject x={x - 70} y={y - 34} width="140" height="24">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <span
                style={{
                  fontSize: '.38rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: dark ? 'rgba(10,6,22,.92)' : 'rgba(255,255,255,.95)',
                  color: dark ? '#F0E8FF' : '#1A0A2E',
                  border: `1px solid ${dark ? 'rgba(139,82,247,.3)' : 'rgba(91,29,232,.18)'}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,.12)',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {label}
              </span>
            </div>
          </foreignObject>
        </motion.g>
      )}
    </g>
  );
}
