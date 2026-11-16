# P22 · A chat is not a host

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05, S02E02, S02E05

> **Lessons:**
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Getting remote" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote) · [Polish: „Dostęp zdalny”](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny)
> - S02E02 · Building an Agent → chapter "Workflows and long-horizon tasks" — [original (EN)](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) · [Polish: „Przepływy pracy i zadania długookresowe”](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe)

**Principle.** An agent that must answer on its own has to run as a service, independent of
the harness session.

**Case.**
- S01E05: a webhook on Render answers 202 at once, does the work in the background and skips
  a repeated ping with the same id (idempotency).
- S02E02 (left open): the mail agent runs as a `node` process started from a Claude Code
  session and ends with it.
- S02E05: the agent runs as a free Render web service and calls its own public `/health`
  address every 4 minutes, so the host does not sleep. Closing the laptop changed nothing.
  The course: "The session is not the service: an agent that must answer at any hour lives
  where it stays up."

---

← [P21](../04-orchestration/p21-delegate-research.md) · [chapter](README.md) · [all pills](../README.md) · [P23](p23-state-outside-the-process.md) →
