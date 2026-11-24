# P24 · A loop needs an exit: a condition, a limit and visible state

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S02E01

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)

**Principle.** Every agent loop has three things: a success condition (a command that
checks it), a limit (iterations, time, budget) and a state file a human can read and switch
off.

**Case.**

- `stop_gate.py` (S02E01): `MAX_BLOCKS = 3` and the rule "a source that does not load is not
  a reason to loop".
- The "loop" artifact from the course deck: a loop with a visible state file and three
  exits.
- Counter-example from this repo: the Ralph loop started on 15.11 ("rób dopóki nie zwróci
  solved", i.e. "keep going until it returns solved") had `completion_promise: null` and
  `max_iterations: 0` in `s02e01/.claude/ralph-loop.local.md`: no condition and no limit.
  The file still said `active: true` after both challenges were solved, and was removed by
  hand on 15.11.2026.

**Apply.** With `/ralph-loop` and `/loop`, always give an end condition (a completion
promise or a command) and an iteration limit. When it ends, check that the state file is
switched off.

---

← [P23](p23-state-outside-the-process.md) · [chapter](README.md) · [all pills](../README.md) · [P25](p25-providers-fail.md) →
