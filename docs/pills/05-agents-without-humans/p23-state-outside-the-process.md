# P23 · Keep state where it survives a restart; read the source of truth live

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05, S02E02

> **Lessons:**
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)
> - S02E02 · Building an Agent → chapter "Workflows and long-horizon tasks" — [original (EN)](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) · [Polish: „Przepływy pracy i zadania długoterminowe”](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długoterminowe)

**Principle.** Agent state lives in an outside system, not in process memory. Project state
is read from the source of truth, not from a copy in a file.

**Case.**
- S02E02: state in AgentMail (threads and the labels `replied`, `ignored`, `failed`), so a
  restart loses nothing.
- S01E05: `plan.md` claimed #12 had shipped, while the tracker showed it open. Pulse reads
  the tracker on every ping. A plan is not a tracker.

---

← [P22](p22-chat-is-not-a-host.md) · [chapter](README.md) · [all pills](../README.md) · [P24](p24-a-loop-needs-an-exit.md) →
