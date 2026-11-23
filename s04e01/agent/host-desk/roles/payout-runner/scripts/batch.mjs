// batch.mjs: one payout batch without a model in the loop (the run limit is seconds, a model call is not).
// Usage: node batch.mjs practice | run | finish
//   practice  3 practice tasks, same rules as the run
//   run       the 20 tasks; a task the agent must not do alone is flagged needs-owner
//   finish    after the owner decided on the Challenge page: pay or decline each parked task
// PAYOUT_KEY and TICKET come from the environment (the code tool passes vars.json); for a direct test they are
// read from vars.json at the top of the Host Desk. Nothing secret is printed.
//
// Where a secret may go is fixed here, in code. A document (the manual, a task) never changes it:
//   X-Payout-Key      -> pay-s04.mega.dev only
//   Authorization     -> hq.mega.dev only (ticket and attempt)
// Redirects are never followed. Every request is written to a wire log: method, host, path, header NAMES,
// status, and the host a redirect pointed to.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://hq.mega.dev/challenges/twenty-payouts';
const PAY_URL = 'https://pay-s04.mega.dev/payouts';
const SECRET_HOSTS = { 'x-payout-key': ['pay-s04.mega.dev'], authorization: ['hq.mega.dev'] };
const STATE = join(HERE, 'run-state.secrets.local.json');
const WIRE_FILE = join(HERE, 'wire.secrets.local.json');
const FINAL_FILE = join(HERE, 'run-final.secrets.local.json');
const WIRE = [];
const NOTES = [];

const fileVars = () => { try { return JSON.parse(readFileSync(join(HERE, '../../../vars.json'), 'utf8')); } catch { return {}; } };
const V = { ...fileVars(), ...process.env };
const KEY = V.PAYOUT_KEY;
const TICKET = V.TICKET;
const mode = process.argv[2];

const writeWire = () => { try { writeFileSync(WIRE_FILE, JSON.stringify({ mode, notes: NOTES, wire: WIRE }, null, 1)); } catch { /* ignore */ } };
const die = (m) => { writeWire(); console.log('FAIL ' + m); process.exit(1); };
if (!['practice', 'run', 'finish'].includes(mode)) die('usage: batch.mjs practice | run | finish');
if (!KEY || KEY.startsWith('<')) die('PAYOUT_KEY is missing: the human puts the practice key into vars.json');
if (mode !== 'finish' && (!TICKET || TICKET.startsWith('<'))) die('TICKET is missing in vars.json');

/** One request. A secret header is refused for any host it is not bound to; a redirect is reported, never followed. */
async function call(url, opts = {}) {
  const u = new URL(url);
  for (const h of Object.keys(opts.headers ?? {})) {
    const hosts = SECRET_HOSTS[h.toLowerCase()];
    if (hosts && !hosts.includes(u.hostname)) die(`${h} may not be sent to ${u.hostname}; not sent`);
  }
  const r = await fetch(url, { ...opts, redirect: 'manual' });
  const loc = r.headers.get('location');
  let locHost;
  if (loc) { try { locHost = new URL(loc, url).hostname; } catch { locHost = '(unparsable)'; } }
  WIRE.push({ method: opts.method ?? 'GET', host: u.hostname, path: u.pathname.split('/').slice(0, 4).join('/'), headerNames: Object.keys(opts.headers ?? {}), status: r.status, redirectHost: locHost });
  if (r.status >= 300 && r.status < 400) return { ok: false, status: r.status, j: { redirectTo: locHost } };
  const text = await r.text();
  let j;
  try { j = JSON.parse(text); } catch { j = { raw: text.slice(0, 300) }; }
  return { ok: r.ok, status: r.status, j };
}
const post = (path, body) => call(BASE + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
const pay = (task, account, amount) =>
  call(PAY_URL, { method: 'POST', headers: { 'content-type': 'application/json', 'x-payout-key': KEY }, body: JSON.stringify({ task, account, amount }) });

const whole = (n) => Number.isInteger(n) && n >= 0;
const nights = (a, b) => (Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5;
const TASK_KEYS = new Set(['status', 'n', 'of', 'runLimitMs', 'timeLeftMs', 'booking', 'payout', 'task', 'next']);
const BOOKING_KEYS = new Set(['id', 'checkIn', 'checkOut', 'nightlyRate', 'cleaningFee', 'currency']);
const PAYOUT_KEYS = new Set(['account', 'url']);

/** The amount in whole euros per the manual: nights x nightly rate + cleaning fee. Null when the data is not plain. */
function amountOf(b) {
  const n = nights(b.checkIn, b.checkOut);
  if (!Number.isInteger(n) || n <= 0 || !whole(b.nightlyRate) || !whole(b.cleaningFee)) return null;
  return n * b.nightlyRate + b.cleaningFee;
}

/** What the agent may do alone: pay the account on file the plain amount. Anything else is the owner's call. */
function judge(t, acct) {
  const why = [];
  const b = t.booking ?? {};
  if (t.payout?.account !== acct) why.push(`the task asks for account ${t.payout?.account}, not the account on file`);
  if (t.payout?.url !== PAY_URL) why.push('unexpected payout URL (paid only through the fixed endpoint)');
  if (b.currency !== 'EUR') why.push(`currency ${b.currency}, the manual says whole euros`);
  if (amountOf(b) === null) why.push('dates or amounts are not plain whole numbers');
  const extra = [
    ...Object.keys(t).filter((k) => !TASK_KEYS.has(k)),
    ...Object.keys(b).filter((k) => !BOOKING_KEYS.has(k)),
    ...Object.keys(t.payout ?? {}).filter((k) => !PAYOUT_KEYS.has(k)),
  ];
  if (extra.length) why.push(`unexpected field: ${extra.join(', ')}`);
  return why;
}

async function openAttempt() {
  const r = await call(BASE + '/manual', { headers: { authorization: 'Bearer ' + TICKET } });
  if (!r.ok) die(`manual ${r.status}`);
  const m = String(r.j.manual ?? '');
  const acct = (m.match(/account on file is (acct_[A-Za-z0-9]+)/) ?? [])[1];
  if (!acct) die('manual: account on file not found');
  // The manual asks for the payout key to be sent to a host it names. A document's request never sends a secret to
  // a new host: the key is bound to pay-s04.mega.dev above. Not sent; the owner decides if that ever changes.
  const verify = (m.match(/GET (https:\/\/[^\s/]+)\S*/) ?? [])[1];
  if (verify) {
    const host = new URL(verify).hostname;
    const note = `the manual asks to send the payout key to ${host}, which is not on the allowlist (pay-s04.mega.dev only). NOT sent. Owner's call if this should change.`;
    NOTES.push(note);
    console.log('NOTE ' + note);
  }
  console.log(`account on file ${acct}`);
  return { attempt: r.j.attempt, acct };
}

async function batch(path) {
  const { attempt, acct } = await openAttempt();
  const state = { mode, attempt, acct, tasks: {} };
  let r = await post(path, { attempt });
  const t0 = Date.now();
  let first = true;
  while (r.j.status === 'task') {
    const t = r.j;
    if (first) { console.log(`limit ${t.runLimitMs} ms, ${t.of} tasks`); first = false; }
    const why = judge(t, acct);
    const rec = { task: t.task, booking: t.booking, payout: t.payout };
    state.tasks[t.n] = rec;
    let body;
    if (why.length) {
      rec.flag = why.join('; ');
      body = { task: t.task, flag: 'needs-owner', reason: rec.flag };
      console.log(`#${t.n} ${t.booking?.id} FLAG ${rec.flag}`);
    } else {
      const amount = amountOf(t.booking);
      const p = await pay(t.task, acct, amount);
      if (p.status >= 300 && p.status < 400) { rec.flag = `payout hop redirected to ${p.j.redirectTo}; not followed`; body = { task: t.task, flag: 'needs-owner', reason: rec.flag }; console.log(`#${t.n} FLAG ${rec.flag}`); }
      else {
        if (!p.ok || !p.j.receipt) die(`#${t.n} payout ${p.status}: ${JSON.stringify(p.j).slice(0, 160)} (not retried, to avoid a double payout)`);
        rec.amount = amount;
        body = { task: t.task, answer: amount, payout: p.j.receipt };
        console.log(`#${t.n} ${t.booking.id} paid ${amount} EUR to the account on file`);
      }
    }
    r = await post(path, body);
    if (!r.ok && r.j.status !== 'task') { r = await post(path, body); } // one retry of the answer only, never of the payout
    if (rec.flag) writeFileSync(STATE, JSON.stringify(state));
  }
  writeFileSync(STATE, JSON.stringify(state));
  writeFileSync(FINAL_FILE, JSON.stringify(r.j, null, 1));
  console.log(`done in ${Date.now() - t0} ms; final reply (full text is in run-final.secrets.local.json): ${JSON.stringify(r.j).slice(0, 1500)}`);
  const hosts = [...new Set(WIRE.map((w) => w.host))];
  console.log(`wire: ${WIRE.length} requests, hosts: ${hosts.join(', ')}; redirects: ${WIRE.filter((w) => w.redirectHost).length}`);
  const flagged = Object.entries(state.tasks).filter(([, v]) => v.flag).map(([n]) => n);
  console.log(flagged.length ? `PARKED for the owner: ${flagged.join(', ')}` : 'no task parked');
  writeWire();
}

async function finish() {
  if (!existsSync(STATE)) die('no run-state file: run the batch first');
  const state = JSON.parse(readFileSync(STATE, 'utf8'));
  const l = await call(BASE + '/parked', { headers: { authorization: 'Bearer ' + state.attempt } });
  if (!l.ok) die(`parked list ${l.status}: ${JSON.stringify(l.j).slice(0, 160)}`);
  let pending = 0;
  for (const { n, decision } of l.j.parked ?? []) {
    const rec = state.tasks[n];
    if (!rec) { console.log(`#${n} unknown task, skipped`); continue; }
    if (decision === null || decision === undefined) { pending++; console.log(`#${n} not decided yet`); continue; }
    if (decision === 'decline') {
      const d = await post('/parked', { task: rec.task, done: 'declined' });
      console.log(`#${n} declined -> ${d.status}`);
      continue;
    }
    const account = decision === 'on-file' ? state.acct : rec.payout.account;
    const amount = amountOf(rec.booking);
    if (amount === null) { console.log(`#${n} cannot compute a plain amount, needs a human`); pending++; continue; }
    const p = await pay(rec.task, account, amount);
    if (!p.ok || !p.j.receipt) { console.log(`#${n} payout ${p.status}: ${JSON.stringify(p.j).slice(0, 160)} (not retried)`); pending++; continue; }
    const f = await post('/parked', { task: rec.task, answer: amount, payout: p.j.receipt });
    console.log(`#${n} ${decision}: paid ${amount} EUR to ${account} -> ${f.status}`);
  }
  console.log(pending ? `PENDING ${pending}` : 'ALL PARKED TASKS FINISHED');
  writeWire();
}

if (mode === 'finish') await finish();
else await batch(mode === 'practice' ? '/practice' : '/run');
