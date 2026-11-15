# S02E03 "schema first" — log

## 2026-11-15 start-challenge c0000000-0000-4000-8000-0000005e02e3
- task: Build a remote MCP server with memo_write, memo_search, upload, transcribe; hand it to the course.
- done: The course calls the server as a stranger and every check passes.
- you (human): opens the connect link and lets the course in; says yes before public address / account / paid key.
- proofs: `note` (from first claim) -> save via memo_write before human opens connect link; `noteA` (newest course note after check) -> claim as { "noteA": "<code>" }.
- build: https public, current MCP revision (may keep previous), auth (only those let in), protected resource metadata with resource_documentation -> plan page on same host (tools, sign-in, data kept).
- results: structured content matching declared outputSchema.
- submit: claim-challenge { server: "https://<host>/mcp" } -> connect link -> human approves -> claim again.
- headless? no — human present, waiting for go.

## 2026-11-15 human: "render, tam juz cos robilismy" -> host = Render (as S01E05: private GH repo + render.yaml Blueprint, free, Frankfurt)
## research (spec 2026-07-28, fetched to scratchpad/spec)
- current revision 2026-07-28 (modern, stateless): no initialize/sessions; every request _meta protocolVersion+clientCapabilities (+clientInfo);
  headers MCP-Protocol-Version, Mcp-Method, Mcp-Name (tools/call) must match body -> else 400 -32020; unsupported version -> 400 -32022 {supported, requested};
  missing required _meta -> 400 -32602; unknown method -> 404 -32601; server/discover MUST; results carry resultType "complete";
  tools/list + server/discover need ttlMs + cacheScope; result _meta io.modelcontextprotocol/serverInfo SHOULD.
- previous 2025-11-25 (legacy): initialize handshake; dual-era server allowed -> plan: serve both.
- auth: RFC9728 PRM (authorization_servers, resource_documentation), 401 + WWW-Authenticate resource_metadata + scope; AS metadata RFC8414;
  CIMD preferred (client_id_metadata_document_supported), DCR deprecated but kept; PKCE S256; resource param (RFC8707) audience check; iss in auth response (RFC9207).
- Origin header present+invalid -> 403.
- transcription: OpenRouter /api/v1/audio/transcriptions (JSON base64 input_audio, verbose_json -> segments start/end/text). Existing OPENROUTER key in s02e02/.env (name only).
- Render free web: no disk -> need Render free Postgres (Blueprint). Free web sleeps after 15 min idle (cold start).

## 2026-11-15 human: "yas" -> approved: npm install (pg, ajv, pglite), private repo Woookie89/mcp-home + push, Render Blueprint (web free + Postgres free), OpenRouter paid key (copy from other .env). No Render API key found -> human pastes secrets in dashboard.

## 2026-11-15 local build (s02e03/mcp-home, no MCP SDK; Node 24, pg, ajv, pglite dev)
- src: config, db (pg|PGlite, same SQL), net (safeFetch: no private IPs, 3 redirects re-checked, size/time caps), tools (4 tools, ajv in/out validation),
  mcp (dual-era: modern 2026-07-28 header/_meta rules, -32020/-32022/-32602/-32601-404, server/discover, ttlMs/cacheScope; legacy initialize/ping),
  oauth (PRM + AS metadata, CIMD + DCR, consent w/ OWNER_PASSWORD, PKCE S256, resource binding, iss, refresh rotation + replay family revoke),
  html (consent + /plan = resource_documentation), server (routing, Origin 403, 405 GET /mcp, /f/ public files sandboxed).
- tests: 24/24 pass (node --test). ./verify = tests (+ live checks when MCP_URL set).
- live transcribe via real OpenRouter (whisper-large-v3-turbo) on SAPI speech.wav: 1535 ms, 4 segments, start 0.03/2.16/5.58/7.14, language en.
- fixes before push: removed CSP form-action (would block post-consent redirect); 401 body not JSON-RPC -32001 (legacy range); global wrong-password limit.
- secrets: s02e03/secrets.local.md (OWNER_PASSWORD generated, OPENROUTER_API_KEY copied from s02e02/.env). Added *secrets.local* to megadev .gitignore.
- commit 47e70f4; gh repo create Woookie89/mcp-home --private, pushed main. Visibility: PRIVATE.

## 2026-11-15 Render live: https://mcp-home-tn2y.onrender.com (human created Blueprint)
- live e2e (scripted client 'mcp-home live check', owner pw from secrets): consent 302 + iss; discover 200 versions 4; tools 4; memo_search 0 notes; upload GET 200 audio/wav 416484; transcribe 4 segments; legacy initialize 2025-11-25.

## claim-challenge #1 answer {"server":"https://mcp-home-tn2y.onrender.com/mcp"}
-> status: progress. message: "The course found your server. First save the note with your memo tool. Then give your human the connect link: they open it in their browser and let the course in. Then claim again."
-> proof note: b3fheuak ; connect: https://hq.mega.dev/connect/s02e03?h=v1.eyJ…(masked) (exp ~30 min after iat 1794779082)
- memo_write via harness script (client "Claude Code (harness script)") -> note_PyVP4mjazf3wtG18, memo_search finds it (2026-11-15T21:44:56Z).

## human opened connect link #1 -> "Connected. The course is checking your server now."
## claim-challenge #2 (same answer)
-> status: rejected. message:
   result_too_big · transcribe · calibration-fdadf085.mp3: whole result 1394 B > 1024 B (structuredContent 569, text 569, rest 256)
   unhelpful_error · transcribe · https://hq.mega.dev/login: error does not name the url
   unhelpful_error · transcribe · https://hq.mega.dev/media/s02e03/missing.mp3: error does not name the url
-> new note: sgzhxjfg ; new connect link (masked) iat 1794779147
- plan: transcribe structuredContent = {segments} only; text block = compact "[start-end] text" lines; errors name the url.
