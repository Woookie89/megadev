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
- fix: transcribe -> { segments } only (times 0.01 s), text block "[start-end] text" lines; errors name the url ("Could not download the audio at <url>: download answered HTTP 404.", "<url> is not a supported audio file (type ...)"). Plan page updated.
- tests 25/25 (new: whole transcribe result <= 1024 B; error texts name url).
- measured locally on calibration-fdadf085.mp3 with real OpenRouter: whole 822 B (structuredContent 355, text 225, rest 242).
- commit 999d211 pushed (Render autoDeploy). New note sgzhxjfg saved -> note_ZELry1TAhx_y2q0o (2026-11-15T21:47:55Z), before connect link #2.

## human opened connect link #2 -> Connected
## claim-challenge #3 (same answer)
-> status: progress. message: "The course checked your server and its tools. Not solved yet. Next: the file named in this reply."
-> name logs/sched/2026-10-05.log ; file https://hq.mega.dev/media/s02e03/sched-2026-10-05-e915d29d.log ; laneLine "lane hwqkgnn3"
-> do: download, put laneLine on top as its own first line, upload with server's upload tool, claim { uploadUrl }.
- downloaded 8483616 B (40213 lines, LF); prepended 'lane hwqkgnn3\n'; upload via MCP (base64, 2837 ms) -> https://mcp-home-tn2y.onrender.com/f/klKS5BKo2LqPt6bGImkWMg/2026-10-05.log size 8483630; served bytes identical (sha256 9d9c229b953eb1fe…).
## claim-challenge #4 {uploadUrl} -> status: retry, retryAfter 20. message: "The course is checking your server."
## claim-challenge #5 (same uploadUrl) -> status: progress. message: "The check passed. The course left a new note on your server. Read the newest course note with your own memo tool and claim with { noteA }."
- memo_search: newest course note 2026-11-15T21:49:09.792Z 'course note 6hmjn2j2' (author MEGA course check); older course note 35wth5vv (21:45:34Z, rejected round). Claiming noteA=6hmjn2j2.
## claim-challenge #6 {noteA:6hmjn2j2} -> status: progress. message: "The note is right. The course will come back later. Claim again then." next: claim again later, from any session.
## human: suspend rig-pulse (no Render access here -> human does it), yes keep-alive, stop it when done; point 3 (claude mcp add) not answered -> not done.
- keep-alive: background /health ping every 10 min in 30-min rounds; claim after each round.
- Render CLI v2.34.0 installed to ~/.local/bin (sha256 3492c4ff… matches SHA256SUMS + GitHub digest; chose >2-week-old release, not v2.36.0). human approved device login (workspace funproject).
- human: suspend rig-pulse -> two services from repo Woookie89/rig-pulse (rig-pulse-2ww7 duplicate + rig-pulse-7d7o). POST /v1/services/{id}/suspend -> 202 both; now suspended. mcp-home + mcp-home-db not suspended.
## claim-challenge #7 {noteA} -> status: retry, retryAfter 11348. message: "Not yet. The course has not come back. A claim before then does not bring it sooner. Claim again later: the course looks when that claim comes in."
- keep-alive stopped (course checks at claim time). Background: sleep ~11400 s, warm /health, then claim.

---------------------------------------------------------------------------
## HANDOVER 2026-11-15 ~22:00 UTC (human: "kończymy na dziś")

### Status
- NOT SOLVED YET. All checks so far passed; course will "come back later".
- Last claim (#7) -> retry, retryAfter 11348 s => next claim allowed from ~2026-11-16 01:05 UTC (02:05 PL).
- "the course looks when that claim comes in" -> warm the server first, then claim.

### How to finish (any session)
1. Warm Render free instance (may be asleep, cold start 30-60 s):
   curl -s -o /dev/null -w '%{http_code} %{time_total}\n' https://mcp-home-tn2y.onrender.com/health   (repeat until fast 200)
2. claim-challenge uuid c0000000-0000-4000-8000-0000005e02e3, receipts {}, answer { "noteA": "6hmjn2j2" }
   - status retry -> wait retryAfter, warm again, same call.
   - if it asks for something new (new note / connect link / file): follow its message; saving notes = memo_write
     via scratchpad script pattern (DCR client + owner password from s02e03/secrets.local.md) or via Claude Code once connected.
3. When solved: call debrief (mega-challenge) and build it from this log; write docs/pl/s02e03-schema-first-debrief.md like earlier episodes.

### What is where
- Code: s02e03/mcp-home (own git repo) -> private GitHub Woookie89/mcp-home, main @ 999d211. Tests: npm test (25/25). ./verify (+ MCP_URL=... for live checks).
- Live: https://mcp-home-tn2y.onrender.com/mcp ; plan page /plan ; Render workspace "funproject":
  web srv-dbt2eooae00c739fgbl0 (mcp-home, free), Postgres dpg-dbt2ef8ae00c739ffh9g-a (mcp-home-db, free, EXPIRES ~2026-12-15, 30 days after creation; 14-day grace then deleted).
- Secrets: s02e03/secrets.local.md (OWNER_PASSWORD, OPENROUTER_API_KEY) — git-ignored (*secrets.local* in megadev .gitignore).
- Render CLI v2.34.0 in ~/.local/bin, logged in (token in ~/.render/cli.yaml). Logs: CI=1 render logs -r srv-dbt2eooae00c739fgbl0 --limit 50 -o text
  Suspend/resume a service: POST https://api.render.com/v1/services/<id>/suspend|resume with the CLI key (CLI has no such command).
- rig-pulse (srv-dbpqq18…, -2ww7 duplicate) and rig-pulse-7d7o (srv-dbpqqo8…) SUSPENDED on human's request.
- Notes on server now: b3fheuak, course note 35wth5vv, sgzhxjfg, course note 6hmjn2j2 (newest course note = noteA).
- Course OAuth client: "MEGA course check", registered via Client ID Metadata Document; its token 24 h, refresh 30 days.

### Open / decide later
- Point 3 NOT done (human did not answer): `claude mcp add --transport http --scope user mcp-home https://mcp-home-tn2y.onrender.com/mcp`, then /mcp -> Authenticate with owner password. Needs human's yes (changes global settings).
- After solve: decide whether to keep mcp-home (Postgres free expires ~2026-12-15) or move DB (paid plan / Neon); keep-alive not running.
- Background warm-up task in the old session dies with that session; do not rely on it.

### Lessons for debrief (collected)
- Spec 2026-07-28 is stateless: no initialize; _meta + mirrored headers; dual-era server kept both.
- Course rejected round 1 on SIZE (whole transcribe result 1394 B > 1024 B) and ERROR QUALITY (errors must name the url and the problem), not on protocol.
  Fix: structuredContent {segments} only; text block compact "[start-end] text" lines (822 B on calibration clip); errors name the url.
- Measure against the course's own calibration file locally before redeploying (saved a round).
- Render free has no disk: Postgres needed so notes survive sleep/restart (they did across the redeploy).
- S01E05 lesson applied: retries + fallback model for the model provider; harness can now read Render logs itself (Render CLI).
- human: "tak" -> add mcp-home to Claude Code: `claude mcp add` blocked by auto-mode permission classifier -> human runs it.
- human: after solve also docs + pigulki/pills (debrief two layers, docs/README.md procedure) — not only the debrief call.

## 2026-11-16 06:39 UTC new session ("claim s02e03")
- warm-up: /health 200 22.3 s (cold start), then 200 0.11 s.
## claim-challenge #8 {noteA:6hmjn2j2} -> status: SOLVED, solvedAt 2026-11-16T06:39:52Z.
- debrief probes: C1 file disk->server; C2 letting in unknown client; C3 actionable errors; C4 result cost; C5 current MCP revision; C6 still up when course came back;
  T1 own tool next; T2 more than raw API; T3 taking grant back; T4 own harness. toolbox: upload-route, sign-in-discovery, model-facing-results, web-search, always-on-host.

## 2026-11-16 debrief saved (https://hq.mega.dev/challenges/schema-first#debrief); artifact 'hands' v1451720afc1f: human copied to ~/.claude/skills/hands (my write blocked by auto-mode classifier); verified 6/6 sha256 OK; check-tool on example: 'Every check passed (8)', exit 2 (nothing sent).
- docs done (2026-11-16): docs/pl/s02e03-schema-first-debrief.md; pills PL+EN: P39 finalized, new P40 (result budget), P41 (errors say what to fix), P42 (big bytes beside the model); S02E03 cases added to P10, P23, P27, P35, P38; chapter 8 + main README (all pills, lessons index, episode index, date 16.11.2026); docs/challenges.md + challenges/S02E03 status solved.
- link check: 1598 relative links / 220 files, 1 broken (pre-existing example in docs/README.md, not from this change).
- not committed (human did not ask).
