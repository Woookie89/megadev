# P39 · An MCP server is a contract for a stranger client

> Chapter [8. The harness as a toolkit](README.md) · episodes: S02E03

> **Lessons:**
>
> - S02E03 · Agentic Capabilities → chapter "Model Context Protocol" — [original (EN)](../../s02e03-agentic-capabilities.md#model-context-protocol) · [Polish: „Model Context Protocol”](../../pl/s02e03-agentic-capabilities.md#model-context-protocol)
> - S02E03 · Agentic Capabilities → chapter "Designing a custom MCP" — [original (EN)](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp) · [Polish: „Projektowanie własnego MCP”](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp)

**Principle.** You design an MCP server for a client you do not know and cannot ask. Everything
it needs must be in what the server publishes:

- sign-in metadata,
- a way to register,
- a page that describes the server,
- tool names, descriptions and schemas.

**Why.** A stranger client reads only declarations. It has no channel to ask what the author
meant. Each gap in the metadata ends in a guess or an error on the client side. The protocol
also moves: revision 2026-07-28 removed `initialize` and sessions. So write the contract
for the current specification, not for the model's memory.

**Case.** S02E03: the course had never seen the `mcp-home` server. In order, it:

1. Got a `401` with `WWW-Authenticate`.
2. Read the protected resource metadata (RFC 9728) and the authorization server metadata.
3. Registered through a Client ID Metadata Document.
4. Waited until the human let it in with the owner password.
5. Called `server/discover`, `tools/list` and the tools by their schemas.

It needed to ask nothing. The server spoke both protocol eras and checked every result
against its `outputSchema` before it sent it.

**Apply.**

- Before you write code, read the current specification and its changelog
  ([P05](../01-context/p05-check-changing-facts-at-source.md)).
- Publish the full discovery set:
  - resource metadata with `authorization_servers` and `resource_documentation`,
  - authorization server metadata with PKCE `S256`,
  - Client ID Metadata Documents as the preferred registration, DCR as a fallback.
- Letting a stranger client in is the human's decision: a consent page with the owner's own
  sign-in.
- Walk the whole path from outside, as a stranger client, before you hand over the address
  ([P10](../02-contracts-and-done/p10-check-from-outside.md)).
- Design each tool's result and error for the model: [P40](p40-results-have-a-budget.md),
  [P41](p41-errors-say-what-to-fix.md), [P42](p42-big-bytes-beside-the-model.md).

---

← [P38](p38-skill-is-a-routine.md) · [chapter](README.md) · [all pills](../README.md) · [P40](p40-results-have-a-budget.md) →
