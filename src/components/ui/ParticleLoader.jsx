import { useEffect, useRef } from 'react';

const COLORS = [
  { r: 139, g: 82,  b: 247 },
  { r: 96,  g: 239, b: 255 },
  { r: 255, g: 107, b: 255 },
  { r: 168, g: 85,  b: 247 },
  { r: 255, g: 255, b: 255 },
];
const WORDS = ['PARALOX', 'MEDIA', 'AI'];

export function ParticleLoader({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── inject keyframes ──────────────────────────────────────────────────
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes pl-grad {
        0%,100% { background-position: 0% 50%; }
        50%      { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(styleEl);

    // ── hard safety: always exit after 8 s ───────────────────────────────
    const safetyTimer = setTimeout(() => { onDone && onDone(); }, 9000);

    // ── size the canvas to exact pixel dimensions ─────────────────────────
    const W = window.innerWidth  || document.documentElement.clientWidth  || 1280;
    const H = window.innerHeight || document.documentElement.clientHeight || 800;
    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');

    // ── particle store ────────────────────────────────────────────────────
    const particles = [];

    // ── sample pixel coords from rendered text ────────────────────────────
    function getPixels(word) {
      const off = document.createElement('canvas');
      off.width  = W;
      off.height = H;
      const oc = off.getContext('2d');

      // Font size: fit word across 70% of width, cap at 180px
      const fs = Math.min(Math.floor((W * 0.70) / (word.length * 0.55)), 180);
      oc.font         = `900 ${fs}px Arial`;
      oc.textAlign    = 'center';
      oc.textBaseline = 'middle';
      oc.fillStyle    = '#ffffff';
      oc.fillText(word, W / 2, H / 2);

      const data = oc.getImageData(0, 0, W, H).data;
      const pts  = [];
      // sample every 5th pixel – dense enough to look solid
      for (let y = 0; y < H; y += 5) {
        for (let x = 0; x < W; x += 5) {
          if (data[(y * W + x) * 4 + 3] > 120) pts.push({ x, y });
        }
      }
      return pts;
    }

    // ── Particle ──────────────────────────────────────────────────────────
    class P {
      constructor(tx, ty, col) {
        // spawn from random position around screen edge
        const edge = Math.random();
        if (edge < 0.25)      { this.x = Math.random() * W; this.y = -10; }
        else if (edge < 0.5)  { this.x = W + 10; this.y = Math.random() * H; }
        else if (edge < 0.75) { this.x = Math.random() * W; this.y = H + 10; }
        else                  { this.x = -10; this.y = Math.random() * H; }
        this.vx = 0; this.vy = 0;
        this.tx = tx; this.ty = ty;
        this.cr = col.r; this.cg = col.g; this.cb = col.b;
        this.speed = 3 + Math.random() * 5;
        this.alive = true;
      }
      update() {
        const dx = this.tx - this.x;
        const dy = this.ty - this.y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        const f  = Math.min(d * 0.1, this.speed);
        this.vx  = this.vx * 0.75 + (dx / d) * f;
        this.vy  = this.vy * 0.75 + (dy / d) * f;
        this.x  += this.vx;
        this.y  += this.vy;
      }
      draw() {
        ctx.fillStyle = `rgb(${this.cr},${this.cg},${this.cb})`;
        ctx.fillRect(this.x, this.y, 3, 3);
      }
      scatter() {
        const a  = Math.random() * Math.PI * 2;
        const r  = (W + H) * 0.7;
        this.tx  = W / 2 + Math.cos(a) * r;
        this.ty  = H / 2 + Math.sin(a) * r;
        this.cr  = 0; this.cg = 0; this.cb = 0;
        this.alive = false;
      }
      offscreen() {
        return this.x < -60 || this.x > W + 60 || this.y < -60 || this.y > H + 60;
      }
    }

    // ── show one word ─────────────────────────────────────────────────────
    let holdTimer = null;

    function showWord(idx) {
      const pts = getPixels(WORDS[idx]);
      const col = COLORS[idx % COLORS.length];

      // reuse / extend particle pool
      for (let i = 0; i < pts.length; i++) {
        if (i < particles.length) {
          // retarget existing particle
          particles[i].tx    = pts[i].x;
          particles[i].ty    = pts[i].y;
          particles[i].cr    = col.r;
          particles[i].cg    = col.g;
          particles[i].cb    = col.b;
          particles[i].alive = true;
        } else {
          particles.push(new P(pts[i].x, pts[i].y, col));
        }
      }
      // scatter surplus from previous (longer) word
      for (let i = pts.length; i < particles.length; i++) {
        particles[i].scatter();
      }

      // hold 1.3 s then advance
      holdTimer = setTimeout(() => {
        const next = idx + 1;
        if (next < WORDS.length) {
          showWord(next);
        } else {
          // last word done – scatter all, then exit
          particles.forEach(p => p.scatter());
          setTimeout(() => {
            clearTimeout(safetyTimer);
            onDone && onDone();
          }, 800);
        }
      }, 2100);
    }

    // ── animation loop ────────────────────────────────────────────────────
    let raf;
    function loop() {
      // dark trail
      ctx.fillStyle = 'rgba(6,3,18,0.15)';
      ctx.fillRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (!p.alive && p.offscreen()) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(loop);
    }

    // ── bootstrap (small delay so canvas is in DOM) ───────────────────────
    const startTimer = setTimeout(() => {
      loop();
      showWord(0);
    }, 80);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(safetyTimer);
      clearTimeout(holdTimer);
      cancelAnimationFrame(raf);
      styleEl.remove();
    };
  }, []); // eslint-disable-line

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        // deep purple animated gradient background
        background:
          'linear-gradient(-45deg,#060318,#140830,#2A0864,#060318,#180040,#3808A8,#060118)',
        backgroundSize: '400% 400%',
        animation: 'pl-grad 8s ease infinite',
        overflow: 'hidden',
      }}
    >
      {/* soft glow orb top-left */}
      <div
        style={{
          position: 'absolute',
          top: '18%', left: '12%',
          width: 'clamp(180px,36vw,440px)',
          height: 'clamp(180px,36vw,440px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(91,29,232,.45),transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      {/* soft glow orb bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%', right: '10%',
          width: 'clamp(140px,28vw,340px)',
          height: 'clamp(140px,28vw,340px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(168,85,247,.32),transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      {/* THE CANVAS — must be on top of everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          display: 'block',
          zIndex: 2,
        }}
      />
    </div>
  );
}
