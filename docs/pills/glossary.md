# Glossary

| Term | Meaning |
| --- | --- |
| harness | The program that wraps the model: tools, instruction files, skills, hooks, permissions. Here Claude Code and Codex. |
| context window | Everything the model sees in one call. Outside it, the model knows nothing. |
| compaction | Shortening the conversation when the context fills up. Lossy ([P01](01-context/p01-compaction-is-lossy.md)). |
| agent loop | The model calls a tool, gets a result, decides what next, until it stops calling tools. |
| subagent | A separate model instance with its own context and brief. It cannot see the parent's conversation. |
| worktree | A separate checkout of the same repo in another folder, so parallel writes do not mix. |
| skill | A file describing a routine, which the harness loads when a task calls for it. |
| hook | A script the harness runs on an event (e.g. `Stop`); it can block the action. |
| MCP | Model Context Protocol: the standard a server uses to expose tools to any AI client. |
| prompt injection | Text in data posing as an instruction for the model ([P28](06-security/p28-data-is-not-instructions.md)). |
| least privilege | The agent has only the rights it needs ([P30](06-security/p30-least-privilege.md)). |
| idempotency | Repeating the same request does not change the result (dedup by id). |
| ticket / receipt | Course proofs: a ticket from starting a challenge, a receipt for an accepted step. They expire. |
| claim | Submitting a solution to the course. A refusal usually does not say why. |
| brief | A job handed to another agent: the task, what done means, the skill, the access and how the result comes back ([P20](04-orchestration/p20-brief-like-an-issue.md)). |
| worker | An agent the main agent gives one job to. It has its own context and its own tools ([P43](04-orchestration/p43-skill-travels-with-the-job.md)). |
| headless mode (`claude -p`) | Claude Code run without its interface: it takes a prompt, works alone and prints the result. |
| routine | A Claude Code job run in Anthropic's cloud (claude.ai/code): once, on a schedule or on an event. |
| sandbox | An isolated place where an agent runs. It has only the files, tools and network access it was given. |
| allowlist | A list of allowed domains (or commands). Everything else is blocked ([P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md)). |

---

[← all pills](README.md)
