# P31 · Every request authenticated, every outbound call limited

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S01E05

> **Lessons:**
> - S02E03 · Agentic Capabilities → chapter "Model Context Protocol" — [original (EN)](../../s02e03-agentic-capabilities.md#model-context-protocol) · [Polish: „Model Context Protocol”](../../pl/s02e03-agentic-capabilities.md#model-context-protocol)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "System security" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#system-security) · [Polish: „Bezpieczeństwo systemu”](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu)

**Case.**
- S01E05: signature, timestamp and id checked on every request (Standard Webhooks). An
  unsigned POST gets 401.
- S02E02: `fetch_url` blocks local and private addresses (SSRF protection).
- S02E03 (in progress): an MCP server with OAuth and Protected Resource Metadata.

---

← [P30](p30-least-privilege.md) · [chapter](README.md) · [all pills](../README.md) · [P32](p32-secrets-never-in-chat.md) →
