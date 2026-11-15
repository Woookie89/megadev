# P27 · The agent must see its own logs

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05

> **Lessons:**
> - S02E05 · Agent Reliability → chapter "Observability in agentic systems" — [original (EN)](../../s02e05-agent-reliability.md#observability-in-agentic-systems) · [Polish: „Obserwowalność w systemach agentowych”](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych)

**Principle.** If the harness cannot see the service's logs, it cannot diagnose it. The
human becomes a log courier.

**Case.** S01E05: the harness found the cause (the test writer gave up after a 503) only in
the Render logs the user pasted in. S02E02: a local `log.md` recorded every `received`,
`replied`, `ignored` and `fetch_url`. That made it possible to confirm the value was not
made up and to rebuild the timeline of the failure.

**Apply.** Logs reachable from the CLI, a selfcheck endpoint, a timestamped log of every
agent action.

---

← [P26](p26-timing-is-behavior.md) · [chapter](README.md) · [all pills](../README.md) · [P28](../06-security/p28-data-is-not-instructions.md) →
