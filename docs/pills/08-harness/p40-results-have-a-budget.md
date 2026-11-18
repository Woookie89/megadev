# P40 · A tool result has a byte budget

> Chapter [8. The harness as a toolkit](README.md) · episodes: S02E03

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)
> - S02E02 · Building an Agent → chapter "Designing tools" — [original (EN)](../../s02e02-building-an-agent.md#designing-tools) · [Polish: „Projektowanie narzędzi”](../../pl/s02e02-building-an-agent.md#projektowanie-narzędzi)
> - S02E03 · Agentic Capabilities → chapter "Designing a custom MCP" — [original (EN)](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp) · [Polish: „Projektowanie własnego MCP”](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp)

**Principle.** Give every tool one number: how many bytes its whole result may take. Return
only the fields the agent uses next, and each one once.

**Why.** Everything a tool returns goes into the model's context and stays there until the
task ends. Every extra byte takes room the model needs to reason, costs again on every later
call and distracts the model. A raw API answer usually carries fields the agent never uses.
It is also easy to send the same data twice: once as `structuredContent` and once as its
text copy.

**Case.** S02E03: the course measured `transcribe` on its calibration clip: "the whole result
is 1394 B, over the 1024 B limit (structuredContent 569 B, text 569 B, rest 256 B)". The
transcript was in the result twice: as a `text` field beside the segments and as a JSON copy
in the text block. The harness dropped `text`, language and duration, and replaced the JSON
copy with `[start-end] text` lines. The result fell to 822 B. The harness measured this
locally on the course's clip before it deployed.

**Apply.**

- In the tool's contract (`TOOL.md` from the `hands` skill), write the budget for one result
  in bytes.
- Ask of every field: "what does the agent do with this next?". A field with no answer goes.
- Do not send the same data twice. The text block can be a compact view (for example one
  line per record), not a copy of the JSON.
- Measure the whole result, JSON-RPC envelope included, on the recipient's data, not on your
  own sample.

---

← [P39](p39-mcp-contract-for-strangers.md) · [chapter](README.md) · [all pills](../README.md) · [P41](p41-errors-say-what-to-fix.md) →
