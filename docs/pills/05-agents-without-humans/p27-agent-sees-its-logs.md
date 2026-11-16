# P27 · The agent must see its own logs

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05, S02E03, S02E05

> **Lessons:**
> - S02E05 · Agent Reliability → chapter "Observability in agentic systems" — [original (EN)](../../s02e05-agent-reliability.md#observability-in-agentic-systems) · [Polish: „Obserwowalność w systemach agentowych”](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych)

**Principle.** If the harness cannot see the service's logs, it cannot diagnose it. The
human becomes a log courier.

**Case.** S01E05: the harness found the cause (the test writer gave up after a 503) only in
the Render logs the user pasted in. S02E02: a local `log.md` recorded every `received`,
`replied`, `ignored` and `fetch_url`. That made it possible to confirm the value was not
made up and to rebuild the timeline of the failure. S02E03: the harness installed the Render
CLI (the human logged it in through the browser) and read the `mcp-home` logs itself. They
showed that the course came in through a Client ID Metadata Document and which tools it
called. Nobody had to paste logs.

S02E05: the status log for the course was built from the JSON lines the agent wrote at each
event (`received`, `notified`, `owner_answered`, `replied`), with ISO times and an offset.
The 12 lines agreed with the course's times and passed on the first send. Those lines lived
only in process memory and the Render logs, though, not in a file. The course: "A log is
believable only when it is written per event, with offsets, and agrees with times someone
else kept."

**Apply.** Logs reachable from the CLI, a selfcheck endpoint, a timestamped log of every
agent action.

---

← [P26](p26-timing-is-behavior.md) · [chapter](README.md) · [all pills](../README.md) · [P28](../06-security/p28-data-is-not-instructions.md) →
