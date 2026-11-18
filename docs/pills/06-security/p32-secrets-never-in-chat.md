# P32 · Secrets never go through the chat

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S02E02, S02E04

> **Lessons:**
>
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "System security" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#system-security) · [Polish: „Bezpieczeństwo systemu”](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Getting remote" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote) · [Polish: „Dostęp zdalny”](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny)

**Principle.** The human types keys into `.env`. The agent knows only the variable names.

**Case.** In every challenge: `.env` in `.gitignore`, logs with masked tokens, `proofs.log`
ignored via `*.log`. In S02E02 a filter strips `am_…`, `sk-ant-…` and `sk-or-…` from every
agent answer and from the log.

S02E04: the job's MCP link is a key. Locally `run.sh` generates the MCP config from
`secrets.local.json` into `mcp.secrets.local.json`, which git ignores. In the cloud the link
lives only in the routine prompt, which only the owner sees, and in the `JOB_URL` variable,
never in the repo. The routine's prompt and run log still keep it until it expires (about
24 h).

**Apply.** Commit only `.env.example`. Redact secrets on the agent's output, not just its
input.

---

← [P31](p31-authenticated-requests.md) · [chapter](README.md) · [all pills](../README.md) · [P33](../07-human-in-the-loop/p33-decision-rights.md) →
