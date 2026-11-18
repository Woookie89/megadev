# P45 · A remote worker: plan the way there and the way home

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S02E04

> **Lessons:**
>
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)
> - S02E04 · Multi-Agent Collaboration → chapter "Agent2Agent" — [original (EN)](../../s02e04-multi-agent-collaboration.md#agent2agent) · [Polish: „Agent2Agent”](../../pl/s02e04-multi-agent-collaboration.md#agent2agent)

**Principle.** A worker off your machine reaches only what its place allows, and comes back
only by the way the brief planned. Before the handoff, check three things: the network
(allowlist), access to the job's tools, and where you will read the result.

**Why.** A cloud sandbox inherits nothing from your computer. It has none of your MCP
servers, files or network. It has only what you open and ship to it. A network error or a
missing tool shows up only during the run, and a one-off run does not repeat. The result
does not come back by itself either: the worker finishes in its own place, and the main
agent must know where and in what shape to collect it.

**Case.** S02E04: job 1 went to a one-off routine on claude.ai/code. The harness caught two
snags before the run:

1. A routine gets only claude.ai connectors, not an arbitrary MCP URL. So the harness gave
   the worker `tools/mcp.mjs`, a zero-dependency MCP client, in a private repo. It passed
   the job link (a key) only in the routine prompt.
2. The environment's default network is Trusted, which does not let `hq.mega.dev` through.
   The human set it to Limited with the course domain before the start.

The way home was in the brief: the worker ends with a message holding `JOB1_RECORD:` and
`JOB1_SUBMIT_REPLY:`, and the main agent fetches the run log (`get_run_log`). The run took
33 s, and `submit` passed on the first try. The course: "A remote worker reaches only what
its place allows, so open the course domain before the run instead of learning it from a
failed one." and "A job sent away comes back only if the handoff planned the way home."

**Apply.**

- Before the handoff: which domains must the worker reach, and does the allowlist let them
  through?
- How will the worker reach the tools: a connector, an MCP config file, its own client in
  the repo?
- Test the client locally without a job step (`tools/list`, `resources/list`), so you do
  not spend the one-off run.
- Write the way home into the brief: a marker in the final message, a file, a comment, the
  run log. Make sure the main agent can read it.
- Keys only in a prompt the owner alone can see, or in the environment's secrets, never in
  the repo ([P32](../06-security/p32-secrets-never-in-chat.md)).

---

← [P44](../04-orchestration/p44-normalize-before-joining.md) · [chapter](README.md) · [all pills](../README.md) · [P46](p46-test-the-route-from-the-agents-host.md) →
