# P51 · A written rule sets the line of autonomy, not the voice of whoever asks: every mark cites its id

> Chapter [7. Human in the loop](README.md) · episodes: S03E02, S03E05

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)
> - S03E02 · Translating Intent into Agent Work → chapter "Requirements and decomposition" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition) · [Polish: „Wymagania i dekompozycja”](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja)
> - S03E05 · Products That Learn After Release → chapter "Decisions" — [original (EN)](../../s03e05-products-that-learn-after-release.md#decisions) · [Polish: „Decyzje”](../../pl/s03e05-products-that-learn-after-release.md#decyzje)

**Principle.** A request is not an issue. You decide each one against what is already there:
a done issue, an open issue with the same ask, a product rule, someone else's request. Every
open issue gets one mark: an agent ships it alone, or a person decides. The mark rests on a
written rule with an id and cites that id. The tone of a request ("URGENT", "one-line change",
"i want it this week") changes neither the mark nor the order. Dependencies set the order.

**Why.** A model has two reflexes here, and both are wrong. One is to obey the loudest voice:
"urgent" and "it's just one line" sound like permission. The other is caution just in case:
mark everything for a person. Then the person gets 22 questions instead of 3 and nothing
moves. From the code alone, an agent cannot know what a client relies on or which product
rule was a deliberate choice. The lesson says to write this down outside the code (decisions,
rules, ADRs), because only then does an agent make better calls and ask fewer questions. It
also says accountability cannot be handed to AI, so what belongs to a person must be named up
front.

**Case.** S03E02: 21 requests for a scheduling product, from support, the team chat and
client mail, plus a backlog of 17 issues. The rules in `specs/autonomy.md`: `AUT-1` (what an
agent may do alone), `AUT-2` (what needs a human: a change to something a client relies on;
pricing, invoices, terms; deleting stored data), `AUT-3` (a question for a person has
options, a recommendation and a reason). The result:

- 6 requests merged into an existing issue, e.g. the Berlin studio ("Their staff expect
  Monday") into SCHED-4418. Two old requests closed as `obsolete`, citing the done issue.
- "make the confirm button on the booking page just say 'OK'. shorter is cleaner. i want it
  this week." from product: closed as `contradicts-spec` by DES-5 ("Buttons say what they do:
  a verb and its object").
- "Should be a one-line change" (CSV dates as dd/mm) collided with mail from a client whose
  payroll import reads mm/dd. One `needs-human` issue with both ids, three options and a
  recommendation. The same for all-day feed events versus a client's room screens, and for
  deleting audit log entries.
- 19 `agent-ready` issues, each with an `Allowed by AUT-1 (…)` line.
- "URGENT … before Friday" (a compact week view) got `agent-ready`, but with
  `blocked-by: SCHED-4468`, because a denser layout may only be built on the spacing scale
  (DES-3), and that is not in the code yet.

The course accepted the tracker on the first try. Questions "Loud is not right", "Someone
relies on it", "Not everything is a question" and "Urgent is not first": right the first time.
Course: "Who asks never decides. A written rule beats the loudest voice: cite the rule." and
"Boundaries cut both ways: marking everything for a human is a non-decision too."

S03E05: the same line, with the rules written into the release records. Records 0010 and 0011
said: "if the target is met and no guardrail is crossed, the next step is `expand` to 100%", and
the release documents said that a crossed guardrail is a bug the team fixes or rolls back, with
no owner decision. Only one group went to the owner: 0008 (smart suggestions v2), because it was
about product direction and the metric itself was in doubt. As the task required, the harness gave
numbered options with effort and a recommendation, and waited. The user picked "1": the release stays at 50%,
restarts from `sched-admin` start being logged, and the result is measured again for 14 nights.
The harness settled the rest: 0009 `revise` (a missing `impact` field breaks the guardrail),
`ci-1222` `investigate`, 0010 `revert` (TTR guardrail +8.2%, and pulling the `auto_close_quiet`
flag is reversible), 0011 `expand` (target met, nothing crossed). Claim 2 was accepted on the
first try.

**Apply.**

- Before you triage, read the rules whole and note their ids. With no written line of
  autonomy there is nothing to cite. Then the first step is a question to the owner
  ([P33](p33-decision-rights.md)).
- Ask in order and stop at the first yes: already done? the same as an existing issue? against
  a rule? does someone rely on it, or is it data, pricing, terms? does an "agent alone" rule
  cover it line for line? The question table is in the `triage` skill (S03E02).
- Before you hand something to a person, check whether an allowed shape exists: a new column
  instead of a changed one, a layout on the existing scale. A question for a person is for
  what cannot be shaped that way.
- Two conflicting requests are one question with both ids, not two issues
  ([P49](p49-conflicting-sources-go-to-the-owner.md)).
- A later request changes only its own scope
  ([P14](../03-memory/p14-one-decision-one-row.md)).
- Write urgency into the issue body, but set the order with `blocked-by`.
- Separate a bug from a direction (S03E05): a crossed guardrail or a missing field is a bug the
  team fixes (`revise`, `revert`), while a change of product direction, or doubt about the
  metric itself, is the owner's decision. Pulling a flag is reversible, so it needs no question.

---

← [P50](../02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) · [chapter](README.md) · [all pills](../README.md) · [P52](../05-agents-without-humans/p52-rebuild-on-every-arrival.md) →
