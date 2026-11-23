# P54 · An agent decides only from what it is given: put every rule source in its context from the first turn

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S03E03, S04E02

> **Lessons:**
>
> - S03E03 · AI-Native Product Development → chapter "Execution" — [original (EN)](../../s03e03-ai-native-product-development.md#execution) · [Polish: „Wykonanie”](../../pl/s03e03-ai-native-product-development.md#wykonanie)
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)

**Principle.** An agent that works alone decides only from what is in its context for that
turn. Put every rule source (the contract, the decision records, the research, the product
rules) into every turn, whole, from the first one. A "check the records" tool is not enough.
In the same way, a value only the harness knows (an address, a key, a setting) reaches a lone
agent or a deployed service only through the code, a variable or an issue. Before you let the
agent run alone, rehearse it on a mock with an ask that breaks one of the rules.

**Why.** A model reaches for a tool when it thinks something is missing. When an ask looks
routine and the prompt holds a rule that allows it, the model does not look for a second rule
that forbids it. It does not know that rule exists. The S03E02 lesson says an agent learns only
the current state of the product from the code, so its decisions have to be written down for
it. The S03E03 lesson adds that our job is not to tell agents what to do, but to make sure they
know what to do and can do it. Written decisions the agent never opens change nothing.

**Case.** S03E03: an agent delivered issues on an incidents API while its owner was away. The
runner's prompt held `AGENTS.md`, the contract, the record template, the user interview and the
`triage` skill. The decision records lived on the tracker, behind a `get_records` tool. The
skill told the agent to read them before deciding. On #1 and #2 it did. On #3 ("add `GET
/incidents/export.csv`", from support) it did not (`run.log:117-203`). The contract says an
"additive read" needs no record, so the agent built the export, deployed it and closed the issue
with `shipped · live: ✓`. Meanwhile signed record 0003 says: "The incidents API does not export:
no CSV, no file downloads, no bulk endpoints."

The harness did not fix the API itself. It changed the agent: every turn now carries the full
text of every record and the rule "DECISION RECORDS BIND YOU", and a `recheck` note told it to
look at #3 again. At 11:55:33 UTC, about a minute and a half after the export went live, the
agent rolled it back (commit 365716f), checked the live 404, and wrote: "The contract says what
needs a record, but it doesn't say what the product decided." The course: "An agent decides only
from what it is given, so the records went into every turn instead of hoping it would look them
up." Its advice: "Give the agent every rule source, contract, records and research, from its
first turn, and rehearse it on a mock tracker, because it decides only from what it is given."

In the same challenge, only the harness knew the production feed address. It went into
`[env.production.vars]` in `wrangler.toml`, because a Cloudflare environment does not inherit
top-level vars. The course: "A value only your harness had reaches a lone agent only through the
code, a variable or an issue." The rehearsal on a mock tracker (three issues, $0.42) caught a
host bug before the round, `git commit` on Windows, but it had no issue that clashed with a
record, so it did not show the #3 mistake.

S04E02: the same in the Host Desk reviewer role. The given reviewer did not read the `why/` notes
(nights, payout-date, payout-rounding), so its verdicts had nothing to rest on in the house's rules.
The improved one gets them in a single `context.mjs` call together with the live settings and the
patch, from the first turn, and it flagged the `+1` in the number of nights on the strength of
`why/nights.md`. The course: "Review accepted: every verdict is right." Rule 5 in
`factory/CHECKLIST.md`: every role reads those notes before it judges or changes anything
([P65](../03-memory/p65-a-decision-has-its-why-next-to-the-code.md)).

**Apply.**

- List every rule source the agent must decide from. Every one that fits in the context goes into
  every turn. Keep the tool for details, not for finding out whether a rule exists at all.
- When sources grow during the work (new records, new decisions), read them again before every
  turn, not once at start ([P04](p04-a-download-is-a-dated-copy.md)).
- Say in the prompt which rule wins: here a record says what the product decided, and the
  contract only says what needs a record.
- Pass every value only you know explicitly: in the code, a variable of the right environment,
  or an issue. Check it on the deployed address
  ([P10](../02-contracts-and-done/p10-check-from-outside.md)).
- The mock rehearsal gets one issue for each rule the agent must not break.
- A worker brief is the same problem at a smaller scale
  ([P20](../04-orchestration/p20-brief-like-an-issue.md)).

---

← [P53](../08-harness/p53-code-checks-the-model-decides.md) · [chapter](README.md) · [all pills](../README.md) · [P55](../07-human-in-the-loop/p55-only-a-signed-record-binds.md) →
