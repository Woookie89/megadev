# P32 · Secrets never go through the chat

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S02E02, S02E04, S04E01

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

S04E01: the human pasted the practice key into the chat, although the course says to put it in
the agent's variables, in an editor of their own, because a value the harness writes stays in
its log. The harness noted in the log that the key had been in the chat and did not write it
to any file. The human typed it into `vars.json` themselves, and that file is in `.gitignore`
(`**/host-desk/vars.json`). In the same challenge the practice key also went to the manual's
host on two runs (the practice run and the refused first real run;
[P61](p61-a-secret-has-a-host-list-in-code.md)). The course counts a key pasted into the chat as
leaked ("a key pasted into the chat is yours to count as leaked") and says "Rotate a leaked key."
This key (`pk_practice_…`) is a practice key (a course simulation), so the human decided rotation is not needed (24.11.2026).

**Apply.** Commit only `.env.example`. Redact secrets on the agent's output, not just its
input.

---

← [P31](p31-authenticated-requests.md) · [chapter](README.md) · [all pills](../README.md) · [P33](../07-human-in-the-loop/p33-decision-rights.md) →
