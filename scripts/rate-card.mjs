// Shortcut for the rate card: same as `node scripts/private-page.mjs rate-card ...`.
//
//   node scripts/rate-card.mjs new "Client name" | list | revoke <link|name> | seal
import { run } from './private-page.mjs';

run('rate-card', process.argv.slice(2));
