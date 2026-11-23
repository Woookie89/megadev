# P34 · Consent has a scope

> Chapter [7. Human in the loop](README.md) · episodes: S01E04, S04E01

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)

**Principle.** A "yes" covers a named set of actions in a named place. Anything outside it
needs its own yes.

**Case.** S01E04, KEEP: "Human's yes covers pushes, issues, branches and PRs inside
Woookie89/s01e04-rig-handover only".

S04E01: the human chose to leave the starter's `http.mjs` alone (option A: "focus on the
task"). After the course's refusal, `check-lane` said to answer in code, and the harness changed
`http.mjs` (a host list per secret, no redirects), treating it as part of the task. The
starter's README allows it ("You and your harness may change anything here, code included."),
but the log holds no consent from the human for that change, and HANDOVER lists it as open.
When a new requirement goes beyond the scope of an earlier "yes" or "leave it", go back to the
human before the change.

---

← [P33](p33-decision-rights.md) · [chapter](README.md) · [all pills](../README.md) · [P35](p35-harness-permissions.md) →
