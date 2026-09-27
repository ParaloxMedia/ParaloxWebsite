// Generates the 1200×630 link-preview cards in public/og/ for every page that
// isn't a Pulse article (articles use their own header photo).
//
// Run locally when a card's image or text changes:  node scripts/make-og-cards.mjs
// Needs Google Chrome (headless screenshot) and macOS `sips` (JPEG compression).
// The output is committed, so the server build doesn't need either tool.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'public/og');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const file = (p) => `file://${join(ROOT, p).split('/').map(encodeURIComponent).join('/')}`;

// fit: 'contain' for cut-out mascots on the brand background; 'photo' for full-bleed photos.
const CARDS = [
  { key: 'home',        kicker: 'P/HOME',        title: ['Building the future', 'of AI-powered business.'], image: 'src/assets/img/duo.webp', small: true, fit: 'narrow' },
  { key: 'about',       kicker: 'P/ABOUT',       title: ['A creative technology', 'company.'],              image: 'public/Images/muscut/ChatGPT Image Sep 28, 2026, 02_15_10 AM.png', fit: 'hands' },
  { key: 'ai',          kicker: 'P/AI',          title: ['Make intelligence', 'useful.'],                   image: 'src/assets/img/duo_xray.webp' },
  { key: 'engineering', kicker: 'P/ENGINEERING', title: ['Build it', 'right.'],                             image: 'public/Images/muscut/both/ChatGPT Image Sep 28, 2026, 01_22_30 AM-1.png' },
  { key: 'media',       kicker: 'P/MEDIA',       title: ['Make people', 'notice.'],                         image: 'src/assets/img/duo_plain.webp' },
  { key: 'growth',      kicker: 'P/GROWTH',      title: ['Make growth', 'measurable.'],                     image: 'src/assets/img/present.webp' },
  { key: 'contact',     kicker: 'P/CONTACT',     title: ['Let’s build', 'it.'],                             image: 'src/assets/img/junior.webp' },
  { key: 'pulse',       kicker: 'P/PULSE',       title: ['News, events', 'and insights.'],                  image: 'src/assets/pulse/anniversary-1.jpg', fit: 'photo' },
];

const fonts = [400, 500, 700, 900].map((w) =>
  `@font-face{font-family:Satoshi;src:url('${file(`src/assets/fonts/satoshi-${w}.woff2`)}');font-weight:${w}}`).join('');

const card = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:Satoshi,sans-serif;color:#fff;
  background:radial-gradient(620px 420px at 78% 58%,rgba(124,58,237,.55),transparent 70%),linear-gradient(135deg,#0F0822 0%,#24124F 48%,#3E2087 100%)}
.grid{position:absolute;inset:0;opacity:.09;background-image:linear-gradient(rgba(233,227,250,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(233,227,250,.6) 1px,transparent 1px);background-size:60px 60px}
.copy{position:absolute;left:72px;top:64px;bottom:64px;width:560px;display:flex;flex-direction:column;justify-content:space-between;z-index:2}
.logo{height:40px;width:auto;align-self:flex-start}
.kicker{font:500 20px/1 'JetBrains Mono',ui-monospace,Menlo,monospace;letter-spacing:.14em;color:#B69CFF;margin-bottom:22px}
h1{font-weight:900;font-size:64px;line-height:1.02;letter-spacing:-.02em}
h1 .dot{color:#7C3AED}
.pillars{font:500 18px/1 'JetBrains Mono',ui-monospace,Menlo,monospace;letter-spacing:.12em;color:rgba(233,227,250,.7)}
.art{position:absolute;right:28px;top:28px;bottom:0;width:560px;display:flex;align-items:flex-end;justify-content:center}
.art img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 30px 40px rgba(15,8,34,.55))}
.art.hands{right:0;top:0;width:640px;align-items:center}
.art.hands img{width:100%;max-height:none;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 30%);mask-image:linear-gradient(90deg,transparent 0%,#000 30%)}
.art.narrow{width:470px;right:20px}
h1.small{font-size:52px}
.art.photo{right:0;top:0;width:600px;bottom:0}
.art.photo img{width:100%;height:100%;object-fit:cover;filter:none}
.art.photo::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#1B0E3C 0%,rgba(27,14,60,.55) 22%,transparent 50%)}
</style></head><body><div class="grid"></div>
<div class="art ${c.fit || ''}"><img src="${file(c.image)}"></div>
<div class="copy">
  <img class="logo" src="${file('src/assets/img/logo-white.png')}">
  <div><div class="kicker">${c.kicker}</div>
    <h1 class="${c.small ? 'small' : ''}">${c.title[0]}<br>${c.title[1].replace(/\.$/, '<span class="dot">.</span>')}</h1></div>
  <div class="pillars">AI · ENGINEERING · MEDIA · GROWTH</div>
</div></body></html>`;

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
try {
  for (const c of CARDS) {
    const html = join(tmp, `${c.key}.html`);
    const png = join(tmp, `${c.key}.png`);
    const jpg = join(OUT, `${c.key}.jpg`);
    writeFileSync(html, card(c));
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
      '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', jpg], { stdio: 'ignore' });
    console.log(`og: ${c.key.padEnd(12)} ${Math.round(statSync(jpg).size / 1024)} KB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
