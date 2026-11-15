# P39 · An MCP server is a contract for a stranger client (S02E03, in progress)

> Chapter [8. The harness as a toolkit](README.md) · episodes: S02E03

> **Lessons:**
> - S02E03 · Agentic Capabilities → chapter "Model Context Protocol" — [original (EN)](../../s02e03-agentic-capabilities.md#model-context-protocol) · [Polish: „Model Context Protocol”](../../pl/s02e03-agentic-capabilities.md#model-context-protocol)
> - S02E03 · Agentic Capabilities → chapter "Designing a custom MCP" — [original (EN)](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp) · [Polish: „Projektowanie własnego MCP”](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp)

**Principle.** You design an MCP server for a client you do not know. Everything it needs
must be in the declarations: input and output schemas, a description of sign-in, resource
documentation.

**From the S02E03 research (to be confirmed once solved):**
- Spec revision 2026-07-28 is stateless: no `initialize`. Every request carries
  `protocolVersion` in `_meta`, and the headers must match the body.
- Tool results carry `structuredContent` matching the declared `outputSchema`.
- Authorization: Protected Resource Metadata (RFC 9728), PKCE, an audience check on the
  token.
- Render's free tier has no disk, so data has to live in an outside database ([P23](../05-agents-without-humans/p23-state-outside-the-process.md)).

---

← [P38](p38-skill-is-a-routine.md) · [chapter](README.md) · [all pills](../README.md)
