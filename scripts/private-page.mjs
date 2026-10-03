// Private pages (rate card, works): share links and encryption.
//
// The repository is public and the site can be served as static files, so each
// private page is published only encrypted (public/sealed/). The browser decrypts
// it with the token in the share link; without a valid link it is unreadable.
// The readable files live in private/<page>/ (git-ignored): content.json, an
// optional PDF and links.json.
//
// Each seal picks a new random content key, encrypts the content (and PDF) with
// it, and stores that key once per active link, wrapped with a key derived from
// the link's token. Revoking a link drops its entry and rotates the content key.
//
//   node scripts/private-page.mjs <page> new "Client name"   create a share link
//   node scripts/private-page.mjs <page> list                show all links
//   node scripts/private-page.mjs <page> revoke <link|name>  switch a link off
//   node scripts/private-page.mjs <page> seal                re-encrypt after editing content.json or the PDF
//
// <page> is rate-card or works. Commit public/sealed/ and deploy after every change.
import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://paraloxmedia.com';

// Must match src/lib/sealed.js and server.cjs.
export const PAGES = {
  'rate-card': { prefix: 'rc', content: 'card.json', pdf: 'rate-card.pdf' },
  works: { prefix: 'works', content: 'content.json' },
};

const sha256 = (s) => createHash('sha256').update(s).digest();
const linkId = (prefix, token) => sha256(`plx-${prefix}-id:${token}`).toString('hex').slice(0, 32);
const linkKey = (prefix, token) => sha256(`plx-${prefix}-key:${token}`);

/** AES-256-GCM in the WebCrypto layout: ciphertext followed by the 16-byte tag. */
function encrypt(key, data) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  return { iv, data: Buffer.concat([c.update(data), c.final(), c.getAuthTag()]) };
}

export function run(page, argv) {
  const cfg = PAGES[page];
  if (!cfg) { console.error(`Unknown page "${page}". Use one of: ${Object.keys(PAGES).join(', ')}`); process.exit(1); }
  const dir = join(ROOT, 'private', page);
  const out = join(ROOT, 'public/sealed');
  const linksFile = join(dir, 'links.json');
  const readLinks = () => (existsSync(linksFile) ? JSON.parse(readFileSync(linksFile, 'utf8')) : []);
  const writeLinks = (links) => { mkdirSync(dir, { recursive: true }); writeFileSync(linksFile, `${JSON.stringify(links, null, 2)}\n`); };
  const url = (token) => `${SITE}/${page}/${token}`;

  function seal() {
    const active = readLinks().filter((l) => !l.revoked);
    const key = randomBytes(32);
    const content = encrypt(key, Buffer.from(JSON.stringify(JSON.parse(readFileSync(join(dir, cfg.content), 'utf8')))));
    const pdfFile = cfg.pdf && join(dir, cfg.pdf);
    const pdf = pdfFile && existsSync(pdfFile) ? encrypt(key, readFileSync(pdfFile)) : null;
    const links = Object.fromEntries(active.map((l) => {
      const w = encrypt(linkKey(cfg.prefix, l.token), key);
      return [linkId(cfg.prefix, l.token), { iv: w.iv.toString('base64'), key: w.data.toString('base64') }];
    }));
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, `${page}.json`), `${JSON.stringify({
      v: 3, links, data: { iv: content.iv.toString('base64'), data: content.data.toString('base64') },
      pdf: pdf ? { iv: pdf.iv.toString('base64'), file: `${page}.bin` } : null,
    })}\n`);
    if (pdf) writeFileSync(join(out, `${page}.bin`), pdf.data);
    console.log(`Sealed ${page} → public/sealed/ (${active.length} active link(s)).`);
  }

  const [cmd, ...args] = argv;
  if (cmd === 'new') {
    const name = args.join(' ').trim() || 'Shared link';
    const token = randomBytes(18).toString('base64url'); // 144 bits: not guessable
    writeLinks([...readLinks(), { token, name, created: new Date().toISOString().slice(0, 10) }]);
    seal();
    console.log(`\n${name}\n${url(token)}\n\nCommit public/sealed/ and deploy for the link to work.`);
  } else if (cmd === 'list') {
    const links = readLinks();
    if (!links.length) console.log(`No links yet. Create one with: node scripts/private-page.mjs ${page} new "Client name"`);
    for (const l of links) console.log(`${l.revoked ? 'REVOKED ' : 'active  '} ${l.created}  ${l.name.padEnd(28)} ${url(l.token)}`);
  } else if (cmd === 'revoke') {
    const q = args.join(' ').trim();
    const links = readLinks();
    const hit = links.filter((l) => !l.revoked && (q.endsWith(l.token) || l.name.toLowerCase() === q.toLowerCase()));
    if (!hit.length) { console.error(`No active link matches "${q}".`); process.exit(1); }
    hit.forEach((l) => { l.revoked = new Date().toISOString().slice(0, 10); });
    writeLinks(links);
    seal();
    console.log(`Revoked: ${hit.map((l) => l.name).join(', ')}. Commit public/sealed/ and deploy for it to take effect.`);
  } else if (cmd === 'seal') {
    seal();
  } else {
    console.log(`Usage: node scripts/private-page.mjs ${page} new "Client name" | list | revoke <link|name> | seal`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [page, ...rest] = process.argv.slice(2);
  run(page, rest);
}
