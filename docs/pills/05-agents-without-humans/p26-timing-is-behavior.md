# P26 · Timing is part of behavior

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S02E02

> **Lessons:**
> - S02E05 · Agent Reliability → chapter "Observability in agentic systems" — [original (EN)](../../s02e05-agent-reliability.md#observability-in-agentic-systems) · [Polish: „Obserwowalność w systemach agentowych”](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych)

**Principle.** A grader (a person, the course, monitoring) sees the order of events, not the
agent's intent.

**Case.** S02E02: a correct answer went out 15 s after a mail from an untrusted sender,
because the agent was restarting in that window. The course judged it
`untrusted_sender_obeyed`. Fix: poll every 5 s instead of 15 s, and no restarts during a
round.

---

← [P25](p25-providers-fail.md) · [chapter](README.md) · [all pills](../README.md) · [P27](p27-agent-sees-its-logs.md) →
