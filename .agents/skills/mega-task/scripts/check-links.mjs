// Checks every relative link and #anchor in the .md files under a folder.
// Usage: node check-links.mjs docs
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'docs';
const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.md')) files.push(p);
  }
};
walk(root);

// GitHub-style heading slug: lowercase, drop punctuation, spaces -> dashes.
const slug = (h) => h.trim().toLowerCase().replace(/[`*]/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');

const cache = new Map();
const anchors = (f) => {
  if (!cache.has(f)) {
    const s = new Set();
    let inCode = false;
    for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
      if (/^```/.test(line)) inCode = !inCode;
      const m = !inCode && line.match(/^#{1,6}\s+(.*)$/);
      if (m) {
        const a = slug(m[1]);
        let b = a, i = 1;
        while (s.has(b)) b = `${a}-${i++}`;
        s.add(b);
      }
    }
    cache.set(f, s);
  }
  return cache.get(f);
};

let bad = 0, total = 0;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const href = m[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    total++;
    const [p, a] = href.split('#');
    const target = p ? path.resolve(path.dirname(f), decodeURIComponent(p)) : f;
    if (!fs.existsSync(target)) { bad++; console.log('MISSING FILE  ', path.relative(root, f), '->', href); continue; }
    if (a && target.endsWith('.md') && !anchors(target).has(decodeURIComponent(a).toLowerCase())) {
      bad++; console.log('MISSING ANCHOR', path.relative(root, f), '->', href);
    }
  }
}
console.log(`checked ${total} relative links in ${files.length} files, ${bad} broken`);
process.exitCode = bad ? 1 : 0;
