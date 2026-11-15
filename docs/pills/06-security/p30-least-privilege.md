# P30 · Least privilege, declared explicitly

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S01E05

> **Lessons:**
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)
> - S02E02 · Building an Agent → chapter "Architecture" — [original (EN)](../../s02e02-building-an-agent.md#architecture) · [Polish: „Architektura”](../../pl/s02e02-building-an-agent.md#architektura)

**Principle.** An agent gets only the rights it needs. Even if the model is talked into
something, it has nothing to do harm with.

**Case.** S01E05: `/.well-known/mega-pulse.json` gave pulse only `answer` and the test
writer only `test`. The course's example also granted `comment`, `label` and `close`. Had
the model obeyed issue #14, it still could not have closed #12.

**Apply.** Defense in depth: an input filter ([P29](p29-trust-boundary-in-code.md)) and narrow tools (P30) together.

---

← [P29](p29-trust-boundary-in-code.md) · [chapter](README.md) · [all pills](../README.md) · [P31](p31-authenticated-requests.md) →
