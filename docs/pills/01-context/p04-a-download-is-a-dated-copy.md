# P04 · A download is a dated copy

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S01E03, S02E01

> **Lessons:**
> - S01E03 · Building Knowledge Systems → chapter "Purpose of the knowledge bases" — [original (EN)](../../s01e03-building-knowledge-systems.md#purpose-of-the-knowledge-bases) · [Polish: „Cel baz wiedzy”](../../pl/s01e03-building-knowledge-systems.md#cel-baz-wiedzy)
> - S02E01 · Agentic Primitives → chapter "Context and Memory" — [original (EN)](../../s02e01-agentic-primitives.md#context-and-memory) · [Polish: „Kontekst i pamięć”](../../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć)

**Principle.** The world keeps working while the agent works. Before announcing "done",
fetch the sources again and compare them with what was read.

**Why.** An agent reads a source once, at the start, and then builds on that read for an
hour. The longer the work, the more likely the source has changed.

**Case.** S01E03: the desk's update appeared on the page only after step 1. S02E01: the
session archive grew after the first read. A late subagent changed the Postgres image and
port, and a later session changed the database name. Course: "Something changed since your
check-in. Check again."

**Apply.**
- The last step before a claim, a PR or a report is re-fetching the sources and diffing.
- Automate it with a gate at the exit (see [P07](../02-contracts-and-done/p07-done-is-a-check.md), [P24](../05-agents-without-humans/p24-a-loop-needs-an-exit.md)).

---

← [P03](p03-source-is-not-the-view.md) · [chapter](README.md) · [all pills](../README.md) · [P05](p05-check-changing-facts-at-source.md) →
