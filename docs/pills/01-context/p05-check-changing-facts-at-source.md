# P05 · Check changing facts at the source, not in the model's memory

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S01E01, S02E03

> **Lessons:**
>
> - S01E01 · Mechanics Behind Generative AI → chapter "Things worth knowing about LLMs" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#things-worth-knowing-about-llms) · [Polish: „Warto wiedzieć o LLM-ach”](../../pl/s01e01-mechanics-behind-generative-ai.md#warto-wiedzieć-o-llm-ach)
> - S02E02 · Building an Agent → chapter "Designing tools" — [original (EN)](../../s02e02-building-an-agent.md#designing-tools) · [Polish: „Projektowanie narzędzi”](../../pl/s02e02-building-an-agent.md#projektowanie-narzędzi)

**Principle.** Model names, library versions, prices and specs change faster than training
data. A model states them with the same confidence even when they are stale.

**Case.** S01E01: the answer "GPT-6 Astra" was accepted, but it came from someone else's
debrief, not from the vendor, so it is not an independent confirmation. S02E03: before
writing the MCP server, the harness fetched the current spec (revision 2026-07-28), because
it differs from the previous one (no `initialize`, different headers).

**Apply.**

- For a question about a library, an API or a CLI, go to current documentation (Context7,
  the spec, the changelog).
- Log where a fact came from and its date.

---

← [P04](p04-a-download-is-a-dated-copy.md) · [chapter](README.md) · [all pills](../README.md) · [P06](../02-contracts-and-done/p06-contract-first.md) →
