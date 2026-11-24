# P07 · "Done" is set by a check, not by a feeling that the work is over

> Chapter [2. Contracts and "done"](README.md) · episodes: S02E01, MEGA Assessment

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)
> - S02E03 · Agentic Capabilities → chapter "Personalization" — [original (EN)](../../s02e03-agentic-capabilities.md#personalization) · [Polish: „Personalizacja”](../../pl/s02e03-agentic-capabilities.md#personalizacja)

**Principle.** The agent finishes when a concrete check passes: a command, a test or the
system's reply. Without one, the agent's own report decides when it is over.

**Why.** The agent loop (S02E01) ends when the model stops asking for tools. Models tend to
announce success, and a tired context makes it worse. An outside check has no such
tendency.

**Case.** S02E01: two refusals before it was solved. The harness wrote `stop_gate.py`,
which fetches the list of sources before the work ends and sends the agent back if anything
is unread. MEGA Assessment: T06 (verifiable acceptance criteria) is the weakest trait (38%).

**Apply.**

- End every request with "done when …", e.g. "done when `pytest` is green and sign-in works
  in a real browser".
- In loops, use `./verify` (rook-loop, done-check) or a `Stop` hook.
- A gate needs a limit (`MAX_BLOCKS = 3` in `stop_gate.py`), or it becomes a loop with no
  exit itself.

---

← [P06](p06-contract-first.md) · [chapter](README.md) · [all pills](../README.md) · [P08](p08-test-must-fail-first.md) →
