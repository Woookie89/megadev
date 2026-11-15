# P15 · Ask past sessions instead of guessing, and read all of them

> Chapter [3. Memory outside the chat](README.md) · episodes: S01E02, S02E01

> **Lessons:**
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)
> - S02E05 · Agent Reliability → chapter "Observability in agentic systems" — [original (EN)](../../s02e05-agent-reliability.md#observability-in-agentic-systems) · [Polish: „Obserwowalność w systemach agentowych”](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych)

**Principle.** When the answer is in an old session, search the sessions and cite
`file:line`. "Not found" is a result too, to be reported, not a gap to fill from memory.

**Case.**
- S02E01: decisions were spread across Claude Code sessions, Codex sessions and subagent
  threads. One script (`s02e01/work/dump.py`) read every format, so nothing was missed.
- S01E02: recall showed that the run 1 sessions were not in the archive. The debrief was
  marked as incomplete instead of filling in the story.

**Apply.** The rook-loop skill (recall). Anything that must live longer than 30 days goes
into files in the repo.

---

← [P14](p14-one-decision-one-row.md) · [chapter](README.md) · [all pills](../README.md) · [P16](p16-durability-ladder.md) →
