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
