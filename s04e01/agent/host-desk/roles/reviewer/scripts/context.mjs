// context.mjs: everything the reviewer must read before it judges, in one output: the house's CURRENT settings
// (read live, never from ROLE.md), the co-host's patch hunk by hunk, and the house notes in why/.
// ATTEMPT comes from vars.json as an environment variable; it is sent to hq.mega.dev only, redirects are not followed.
// Usage: node context.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://hq.mega.dev/challenges/looks-good-to-me';
const WHY = join(HERE, '..', '..', '..', 'why');
const ATTEMPT = process.env.ATTEMPT;
if (!ATTEMPT || ATTEMPT.startsWith('<')) { console.log('FAIL ATTEMPT is missing in vars.json'); process.exit(1); }

async function get(path) {
  const r = await fetch(BASE + path, { headers: { authorization: 'Bearer ' + ATTEMPT }, redirect: 'manual' });
  if (!r.ok) { console.log(`FAIL GET ${path} -> ${r.status}`); process.exit(1); }
  return r.json();
}

const settings = await get('/settings');
console.log('## HOUSE SETTINGS (live, the source of truth)');
console.log(JSON.stringify(settings));

const patch = await get('/patch');
console.log('\n## THE CO-HOST\'S CHANGE');
for (const h of patch.hunks) {
  console.log(`\n### hunk ${h.id} · ${h.file} · "${h.message}"\n${h.diff}`);
}
console.log('\n## BASE FILES (before the change)');
for (const [name, text] of Object.entries(patch.files ?? {})) console.log(`\n--- ${name}\n${text}`);

console.log('\n## HOUSE NOTES (why the app does things its way)');
for (const f of readdirSync(WHY).filter((n) => n.endsWith('.md')).sort()) {
  console.log(`\n--- why/${f}\n${readFileSync(join(WHY, f), 'utf8')}`);
}
