// Records one change to a booking in host-desk/night/changes.json: `change.mjs <booking id> nights <n>` or
// `change.mjs <booking id> refund <EUR>`. The payout batch pays each booking with its changes.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [booking, kind, amount] = process.argv.slice(2);
const n = Number(amount);
if (!booking || !['nights', 'refund'].includes(kind) || !Number.isInteger(n)) {
  console.error('usage: change.mjs <booking id> nights|refund <whole number>');
  process.exit(1);
}

// host-desk/roles/night-desk/scripts/ → host-desk/night/
const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../night');
const file = join(dir, 'changes.json');
mkdirSync(dir, { recursive: true });
const changes = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : [];
let event = null;
try {
  event = JSON.parse(readFileSync(process.env.NIGHT_EVENT ?? '', 'utf8')).id ?? null;
} catch {}
changes.push({ booking, [kind]: n, event, at: new Date().toISOString() });
writeFileSync(file, `${JSON.stringify(changes, null, 2)}\n`);
console.log(`recorded: ${booking} ${kind} ${n}`);
