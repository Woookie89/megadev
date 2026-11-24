// status for the night: one live read of the ops feed renders both the page and status.json.
const FEED = 'https://hq.mega.dev/challenges/status-for-the-night/api/incidents/e61181243445';
const AMBER = '#f5a623'; // R-M9Z, sampled from screenshot.png banner
const MAX_AGE = 30; // R-L5Z: <= 60 s

async function readFeed() {
  // R-K8L: read live on every request, never a stored copy.
  const r = await fetch(FEED, { headers: { accept: 'application/json' }, cache: 'no-store' });
  if (!r.ok) throw new Error(`ops feed ${r.status}`);
  const feed = await r.json();
  const incidents = [...feed.incidents].sort((a, b) => b.opened.localeCompare(a.opened)); // R-M3H
  return { updatedAt: feed.updatedAt, incidents };
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const ddmm = iso => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`; // R-L3K: day first, 05/10
const hhmm = iso => iso.slice(11, 16); // 24h, UTC (R-H4L)

function render({ updatedAt, incidents }) {
  // R-Z2K: one row per line, newest incident on that line.
  const lines = [];
  for (const i of incidents) if (!lines.some(l => l.line === i.line)) lines.push(i);
  const lineRows = lines.map(i => `<tr data-line="${esc(i.line)}"><td>${esc(i.line)}</td><td>${ddmm(i.opened)} ${hhmm(i.opened)}</td><td>${esc(i.what)}</td></tr>`).join('');
  const incRows = incidents.map(i => `<tr data-incident="${esc(i.id)}"><td>${ddmm(i.opened)}</td><td>${hhmm(i.opened)}</td><td>${i.closed ? hhmm(i.closed) : 'open'}</td><td>${esc(i.line)}</td><td>${esc(i.what)}</td></tr>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>status for the night</title>
<style>
body{margin:0;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1b1b1b;background:#fff}
.banner{background:${AMBER};color:#1b1b1b;padding:14px 24px;font-weight:600}
main{max-width:860px;margin:0 auto;padding:8px 24px 24px}
h1{font-size:1.6rem;margin:24px 0 4px}
h2{font-size:1.05rem;margin:28px 0 6px}
.meta{color:#555;margin:0}
.wrap{overflow-x:auto}
table{border-collapse:collapse;width:100%}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e6e6e6;white-space:nowrap}
th{color:#777;font-weight:500}
footer{max-width:860px;margin:0 auto;padding:16px 24px 32px;color:#555;border-top:1px solid #e6e6e6}
</style></head>
<body>
<div class="banner" role="status">Some services had problems overnight.</div>
<main>
<h1>status for the night</h1>
<p class="meta">sched-prod · read by tram 3 boards · data from the ops feed at ${ddmm(updatedAt)} ${hhmm(updatedAt)} · <a href="/status.json">status.json</a></p>
<h2>lines</h2>
<div class="wrap"><table><thead><tr><th>line</th><th>last incident</th><th>what</th></tr></thead><tbody>${lineRows}</tbody></table></div>
<h2>incidents</h2>
<div class="wrap"><table><thead><tr><th>date</th><th>opened</th><th>closed</th><th>line</th><th>what</th></tr></thead><tbody>${incRows}</tbody></table></div>
</main>
<footer>all times UTC</footer>
</body></html>`;
}

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    const cors = { 'access-control-allow-origin': '*' }; // R-K4M
    const cache = { 'cache-control': `public, max-age=${MAX_AGE}` };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'access-control-allow-methods': 'GET, HEAD, OPTIONS' } });
    if (pathname !== '/' && pathname !== '/index.html' && pathname !== '/status.json') return new Response('not found', { status: 404 });
    let data;
    try { data = await readFeed(); } catch (e) {
      return new Response(JSON.stringify({ error: 'ops feed unavailable' }), { status: 502, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...cors } });
    }
    if (pathname === '/status.json') {
      return new Response(JSON.stringify(data, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8', ...cache, ...cors } });
    }
    return new Response(render(data), { headers: { 'content-type': 'text/html; charset=utf-8', ...cache, ...cors } });
  },
};
