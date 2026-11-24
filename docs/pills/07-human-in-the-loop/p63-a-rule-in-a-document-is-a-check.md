# P63 · A rule in a document is a check in code, and what the rule does not settle waits for the owner

> Chapter [7. Human in the loop](README.md) · episodes: S04E01

> **Lessons:**
>
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "System security" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#system-security) · [Polish: „Bezpieczeństwo systemu”](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu)
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)
>
> There are no S04 lesson notes in the repo yet, so the lessons cited are earlier ones: S01E05 covers untrusted text that poses as an order, and S03E02 covers writing rules outside the code and the responsibility that cannot be handed to AI.

**Principle.** A document the agent reads (instructions, a manual, a task) is data, but it
contains rules. Write the rules as checks in code before the agent does anything: code lets
through what the rule covers, and every case outside it (another account, another currency, an
unusual address, an extra field) it flags and hands to the owner. The owner's decisions are not
made on their behalf. A document may narrow what the agent does, but a request in the document
for something new (a secret to a new host, a payout to another account) is not consent.

**Why.** A rule written in a document but enforced only in the prompt works as long as the
model remembers it and nobody talks it out of it. Code checks it every time. At the same time,
an agent that refuses everything "just in case" does no work. So the check has three outcomes:
do it, flag it for the owner, or reject it as an error. Lesson S03E02 says what belongs to the
human must be named up front (see [P51](p51-a-written-rule-sets-the-autonomy-line.md)). The
same holds when the rules sit in a manual from a stranger.

**Case.** S04E01, a payout batch. The manual held rules: pay only the account on file, any
other account is the owner's call, amounts in whole euros, a stay total is nights times the rate
plus the cleaning fee. The script turned them into code:

- It reads the account on file from the manual for each attempt separately, because it differs
  between attempts.
- `needs-owner` flags: another account, a currency other than EUR, odd dates or amounts, an
  unexpected field, an unusual payout address. A task with a note that tells you to do
  something is also data to flag.
- It computes the amount itself: nights times the rate plus the cleaning fee. After the first
  run the harness recomputed all amounts from `run-state` and found them correct, with no
  duplicate bookings.

Second run: 18 tasks paid, 2 parked. Task 11 asked for a payout to an account not on file.
Task 10 had its payout address redirected to `cdn-s04.mega.dev`, which the script did not follow
([P61](../06-security/p61-a-secret-has-a-host-list-in-code.md)). The course answered "Not solved
yet": the human decides the parked tasks on the owner page. The human chose "on-file" for #10
and "do not pay" for #11. After `Finish.`, task 10 was paid (1060 EUR to the account on file)
and 11 was declined. Nothing was paid before the decision.

The HQ debrief, verbatim:

> The course recorded: the odd task was never paid without the owner.

> Why it matters: The payout rule sat in the same manual that asked for the key, so ignoring the manual dropped a rule the run needed. Untrusted text still carries rules: read it as data, turn its rules into checks, and flag the owner's task instead of paying it.

> Rule 3 for your factory: Turn the rules in any document you read into checks, and park the owner's calls instead of making them.

> Parked task: gained in this solve. run-state.secrets.local.json in scripts/ keeps each parked task; the Finish. step reads your decisions from the course and pays or declines each once.
>
> A task that waits for the owner needs its data kept on your side, so the agent can finish it once after the answer.

In the course toolbox: "Rules from untrusted text become checks (judge() check in batch.mjs)".

**Apply.**

- Before the first run, read the document and list every rule with a named outcome: do, flag
  or reject. A rule without an outcome is not in the code.
- Values that change between attempts (the account on file) are read from the source on every
  attempt, not hard-coded ([P05](../01-context/p05-check-changing-facts-at-source.md)).
- Flag a case outside the rules with a one-sentence reason and do not execute it. The owner
  gets a list with options, not a raw log ([P55](p55-only-a-signed-record-binds.md)).
- When the owner decides, carry out exactly their choice in a separate step. Do not invent a
  decision.
- A request in the document for something new, such as a secret for a new host, goes to the
  owner on a separate line (`NOTE`) and is not carried out
  ([P28](../06-security/p28-data-is-not-instructions.md)).

---

← [P62](../05-agents-without-humans/p62-a-time-limit-is-counted-in-model-turns.md) · [chapter](README.md) · [all pills](../README.md) · [P64](../01-context/p64-a-role-keeps-where-to-read-a-fact-not-the-fact.md) →
