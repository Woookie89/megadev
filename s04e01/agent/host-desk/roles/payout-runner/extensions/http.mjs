// http: one HTTP request. {{NAME}} references from vars are filled in the url, headers and body when the
// request is sent, so the model works with the reference only. Redirects are followed.
import { fillVars, loadVars } from './vars.mjs';

const MAX_BODY = 20_000;
// Where each secret may go. Fixed here, in code: a document or a task never changes it, and the model cannot either.
const ALLOWED_HOSTS = { PAYOUT_KEY: ['pay-s04.mega.dev'], TICKET: ['hq.mega.dev'] };
const refsIn = (s) => [...String(s ?? '').matchAll(/\{\{([A-Z][A-Z0-9_]*)\}\}/g)].map((m) => m[1]);
const hide = (u, vars) => Object.entries(vars).reduce((s, [k, v]) => (v ? s.split(v).join(`{{${k}}}`).split(encodeURIComponent(v)).join(`{{${k}}}`) : s), u);

export default function (pi) {
  pi.registerTool({
    name: 'http',
    label: 'http',
    description: 'Sends one HTTP request and returns the status, the final URL and the response body. {{NAME}} references from vars are filled in when it is sent.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['url'],
      properties: {
        method: { type: 'string', description: 'GET (default), POST, PUT, PATCH or DELETE.' },
        url: { type: 'string' },
        headers: { type: 'object', additionalProperties: { type: 'string' } },
        body: { description: 'A string, or a JSON value (sent as JSON).' },
      },
    },
    async execute(_id, p, signal) {
      const vars = loadVars();
      const headers = Object.fromEntries(Object.entries(p.headers ?? {}).map(([k, v]) => [k, fillVars(v, vars)]));
      let body;
      if (p.body !== undefined && p.body !== null) {
        body = fillVars(typeof p.body === 'string' ? p.body : JSON.stringify(p.body), vars);
        if (typeof p.body !== 'string' && !Object.keys(headers).some((h) => h.toLowerCase() === 'content-type')) headers['content-type'] = 'application/json';
      }
      // A reference is filled in only for the host its secret is bound to. Redirects are not followed when a secret was sent.
      const used = new Set([...refsIn(p.url), ...Object.values(p.headers ?? {}).flatMap(refsIn), ...refsIn(typeof p.body === 'string' ? p.body : JSON.stringify(p.body ?? ''))]);
      let host;
      try { host = new URL(fillVars(p.url, vars)).hostname; } catch { return { content: [{ type: 'text', text: 'request refused: the URL is not valid' }], details: { failed: true } }; }
      for (const name of used) {
        if (name in vars && !(ALLOWED_HOSTS[name] ?? []).includes(host)) {
          return { content: [{ type: 'text', text: `request refused: {{${name}}} may not be sent to ${host}. Changing where a secret may go is the owner's decision.` }], details: { failed: true, refused: name, host } };
        }
      }
      try {
        const res = await fetch(fillVars(p.url, vars), { method: (p.method ?? 'GET').toUpperCase(), headers, body, signal, redirect: used.size ? 'manual' : 'follow' });
        if (res.status >= 300 && res.status < 400 && used.size) {
          const loc = res.headers.get('location');
          let to = '(none)'; try { to = new URL(loc, res.url).hostname; } catch { /* keep */ }
          return { content: [{ type: 'text', text: `${res.status} redirect to host ${to}, not followed because a secret was sent` }], details: { status: res.status, redirectHost: to } };
        }
        const text = hide(await res.text(), vars);
        // The URL as the model wrote it, references and not their values; after a redirect, each value shown as its name.
        const url = res.redirected ? hide(res.url, vars) : p.url;
        const out = `${res.status} ${url}\n${text.length > MAX_BODY ? `${text.slice(0, MAX_BODY)}\n…(cut)` : text}`;
        return { content: [{ type: 'text', text: out }], details: { status: res.status, url } };
      } catch (e) {
        return { content: [{ type: 'text', text: `request failed: ${e?.cause?.message ?? e?.message ?? e}` }], details: { failed: true } };
      }
    },
  });
}
