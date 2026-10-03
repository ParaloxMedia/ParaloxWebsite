// Private rate card: share links and encryption.
//
// The repository is public, so the rate card is only ever committed encrypted
// (private/rate-card.sealed, AES-256-GCM). The readable files live in
// private/rate-card/ (git-ignored) and the key in .env as RATE_CARD_KEY. The
// server decrypts with the same key, set as an environment variable on the host.
//
//   node scripts/rate-card.mjs new "Client name"   create a share link
//   node scripts/rate-card.mjs list                show all links
//   node scripts/rate-card.mjs revoke <link|name>  switch a link off
//   node scripts/rate-card.mjs seal                re-encrypt after editing card.json or the PDF
import { createCipheriv, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'private/rate-card');
const SEALED = join(ROOT, 'private/rate-card.sealed');
const LINKS = join(DIR, 'links.json');
const ENV = join(ROOT, '.env');
const SITE = 'https://paraloxmedia.com';

function loadKey() {
  if (process.env.RATE_CARD_KEY) return process.env.RATE_CARD_KEY;
  const env = existsSync(ENV) ? readFileSync(ENV, 'utf8') : '';
  const m = env.match(/^RATE_CARD_KEY=(.+)$/m);
  if (m) return m[1].trim();
  // First run: create a key and keep it in the git-ignored .env.
  const key = randomBytes(32).toString('base64');
  appendFileSync(ENV, `${env && !env.endsWith('\n') ? '\n' : ''}# Decrypts private/rate-card.sealed. Also set on the host (DigitalOcean).\nRATE_CARD_KEY=${key}\n`);
  console.log('Created RATE_CARD_KEY in .env. Add the same value on the host as an environment variable.');
  return key;
}

const readLinks = () => (existsSync(LINKS) ? JSON.parse(readFileSync(LINKS, 'utf8')) : []);
const writeLinks = (links) => writeFileSync(LINKS, `${JSON.stringify(links, null, 2)}\n`);
const url = (token) => `${SITE}/rate-card/${token}`;

function seal() {
  const key = Buffer.from(loadKey(), 'base64');
  if (key.length !== 32) throw new Error('RATE_CARD_KEY must be 32 bytes, base64-encoded.');
  const payload = Buffer.from(JSON.stringify({
    card: JSON.parse(readFileSync(join(DIR, 'card.json'), 'utf8')),
    links: readLinks().filter((l) => !l.revoked).map(({ token, name }) => ({ token, name })),
    pdf: existsSync(join(DIR, 'rate-card.pdf')) ? readFileSync(join(DIR, 'rate-card.pdf')).toString('base64') : null,
  }));
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(payload), cipher.final()]);
  writeFileSync(SEALED, `${JSON.stringify({ v: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: data.toString('base64') })}\n`);
  console.log(`Sealed rate card → private/rate-card.sealed (${readLinks().filter((l) => !l.revoked).length} active link(s)).`);
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'new') {
  const name = args.join(' ').trim() || 'Shared link';
  const token = randomBytes(18).toString('base64url'); // 144 bits: not guessable
  writeLinks([...readLinks(), { token, name, created: new Date().toISOString().slice(0, 10) }]);
  seal();
  console.log(`\n${name}\n${url(token)}\n`);
} else if (cmd === 'list') {
  const links = readLinks();
  if (!links.length) console.log('No links yet. Create one with: node scripts/rate-card.mjs new "Client name"');
  for (const l of links) console.log(`${l.revoked ? 'REVOKED ' : 'active  '} ${l.created}  ${l.name.padEnd(28)} ${url(l.token)}`);
} else if (cmd === 'revoke') {
  const q = args.join(' ').trim();
  const links = readLinks();
  const hit = links.filter((l) => !l.revoked && (q.endsWith(l.token) || l.name.toLowerCase() === q.toLowerCase()));
  if (!hit.length) { console.error(`No active link matches "${q}".`); process.exit(1); }
  hit.forEach((l) => { l.revoked = new Date().toISOString().slice(0, 10); });
  writeLinks(links);
  seal();
  console.log(`Revoked: ${hit.map((l) => l.name).join(', ')}. Commit and deploy for it to take effect.`);
} else if (cmd === 'seal') {
  seal();
} else {
  console.log('Usage: node scripts/rate-card.mjs new "Client name" | list | revoke <link|name> | seal');
}
