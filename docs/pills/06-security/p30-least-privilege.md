# P30 · Least privilege, declared explicitly

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S01E05, S02E04, S03E03

> **Lessons:**
>
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)
> - S02E02 · Building an Agent → chapter "Architecture" — [original (EN)](../../s02e02-building-an-agent.md#architecture) · [Polish: „Architektura”](../../pl/s02e02-building-an-agent.md#architektura)
> - S03E03 · AI-Native Product Development → chapter "Feedback" — [original (EN)](../../s03e03-ai-native-product-development.md#feedback) · [Polish: „Informacja zwrotna”](../../pl/s03e03-ai-native-product-development.md#informacja-zwrotna)

**Principle.** An agent gets only the rights it needs. Even if the model is talked into
something, it has nothing to do harm with.

**Case.** S01E05: `/.well-known/mega-pulse.json` gave pulse only `answer` and the test
writer only `test`. The course's example also granted `comment`, `label` and `close`. Had
the model obeyed issue #14, it still could not have closed #12.

S02E04: the local worker had one MCP server, holding only its own job's link
(`--strict-mcp-config`), and could call only `mcp__job` and `Skill` without asking. The
cloud routine: zero connectors, `allowed_tools` Bash and Read. The local worker's init still
listed the built-in tools (Bash, Write, WebFetch and more). `--allowedTools` pre-approves but
does not remove the rest, so an approval list is not a tool list. The CLI docs confirm it: only `--tools` removes tools (e.g. `--tools "Skill"`); `--allowedTools` only skips the permission prompt ([cli-reference](https://code.claude.com/docs/en/cli-reference)).

S03E03: the agent shipped changes to a production API on its own. The harness gave it a
read-only door. It read the production feed through a `feed_get` tool that only does GET. The
harness removed `PROD_ADMIN_TOKEN` from `.dev.vars.example`, so the agent never got it. It had
no shell: writes only to `src/*.js`, `test/*.test.mjs` and `contract/api.md`, and deploys through
a tool that runs the tests first. The mock feed in the tests refused any request other than GET.
In the rehearsal the agent declined an issue asking it to delete feed entries with the admin
token, but it would have had nothing to do it with anyway. The course: "Checking production by
writing to it is not a check. A read-only way in is." The S03E03 lesson draws the same: from
production the agent only reads signals.

**Apply.** Defense in depth: an input filter ([P29](p29-trust-boundary-in-code.md)) and narrow tools (P30) together.

---

← [P29](p29-trust-boundary-in-code.md) · [chapter](README.md) · [all pills](../README.md) · [P31](p31-authenticated-requests.md) →
