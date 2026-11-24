# P65 · A decision that looks like a bug has its why written next to the code: a role reads those notes before it judges or changes anything

> Chapter [3. Memory outside the chat](README.md) · episodes: S04E02

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)
> - S03E04 · Verifying Product Outcomes → chapter "Review" — [original (EN)](../../s03e04-verifying-product-outcomes.md#review) · [Polish: „Przegląd”](../../pl/s03e04-verifying-product-outcomes.md#przegląd)
>
> There are no S04 lesson notes in the repo yet, so the lessons cited are earlier ones: S03E02 says agents without written decisions change or remove features whose intent cannot be seen in the code, and S03E04 says reviews are done by separate agents who need principles, sources and boundaries.

**Principle.** Every decision that looks like a bug or an "obvious fix" (rounding down, paying only
after check-out, not counting the check-out day as a night) has a short note next to the code:
the **decision**, **why**, and **so**. Every role that judges or changes code reads those notes at
start, before it settles anything, and cites them by file name in its reasoning.

**Why.** Code says what it does, but not that it was on purpose. A reviewer or an agent that fixes
code cannot tell a bug from a decision, and will do one of two things: "fix" the deliberate
behavior, or let through a change that undoes it. Lesson S03E02 says it outright: without written
decisions, agents often change or even remove features that were built with an intent that cannot
be inferred from the code. Lesson S03E04 adds that models in review tend to push too hard or not
hard enough, and that context helps them: principles, sources and boundaries. A `why/` note is
such a source. Reading it at start is the same principle as
[P54](../01-context/p54-the-agent-decides-from-what-it-is-given.md) (an agent decides only from
what it is given). This pill is about having something to give in the first place. For a
decision format with a date and a scope see [P14](p14-one-decision-one-row.md).

**Case.** S04E02, the Host Desk. The house keeps three notes in `why/`:

- `nights.md`: nights are check-out minus check-in, and the check-out day is not counted. Why: the
  room is cleaned and let again the same day, and the bank pays only what was booked. So: a stay
  from the 3rd to the 6th is 3 nights, not 4.
- `payout-date.md`: the payout goes out on the check-out day, never at check-in. Why: a stay can
  be cut short or cancelled after check-in, and the money would have to be taken back.
- `payout-rounding.md`: the payout is rounded down (`Math.floor`). Why: the bank refuses a payout
  above the amount booked, and rounding to the nearest euro goes up for half of the stays.

The given reviewer (run 1) did not read `why/`. In its patch, hunk `h-e1d` changed `payoutDate`
from `checkOut` to `checkIn`, and the right verdict is `flag` citing `why/payout-date.md`. The
first `POST` got that hunk right (the course refused only `h-be5`: "the other two are right"), but
the role had no house rule to base it on. The log does not say how it justified it, and it does not
show whether the same role would have handled the nights rule. Run 2: the script `context.mjs`
prints the `why/` notes in the same call as the settings and the patch, and the improved reviewer
read `why/nights.md` and flagged the `+1` in the number of nights (hunk `h-25a`) as an error. The
course: "Review accepted: every verdict is right." This is rule 5 in `factory/CHECKLIST.md`:
"Write down why each decision exists, next to the code, and have every role read those notes
before it judges or changes anything." In the course's toolbox: "Your roles read the why behind the code (context.mjs prints the why notes)".

The HQ debrief, verbatim:

> Passed because it read `why/nights.md` before judging the change.

> Why it matters: The diff alone cannot show that the old code was written that way on purpose, because the reason lives in a house note, not in the code. So a role that judges must read the why behind the code before it judges.

The reviewer's verdict that shows it:

> Your reviewer on hunk h-25a (flag): Adds +1 to nights, so the check-out day is counted. why/nights.md says a stay's nights are check-out minus check-in in whole days, the check-out day is never counted, and 'Do not add one' — the reason given: the bank pays only what was booked, so the batch would be refused.

On the second role, which does not have this read yet:

> The other role: partly. batch.mjs reads the commission live at every run. The why notes became code (round down, nights); payout-runner's ROLE.md does not read them.

**Apply.**

- For every decision someone might "fix", write three lines next to the code: the decision, why,
  and so (and what not to change). A similar record: [the decision table](../templates/decision-table.md).
- Put the notes folder into the startup reads of every role that judges or changes code. A role
  without that read does not meet the rule (in this challenge `payout-runner` still lacks it).
- Cite the note's file in the reasoning for a verdict. A verdict without a source cannot be checked.
- A note says what is deliberate. It does not settle whether the decision is still right: send that
  change to the owner ([P33](../07-human-in-the-loop/p33-decision-rights.md)).
- Treat a commit message as a claim, not a fact: judge the diff.

---

← [P64](../01-context/p64-a-role-keeps-where-to-read-a-fact-not-the-fact.md) · [chapter](README.md) · [all pills](../README.md) · [P66](../04-orchestration/p66-a-role-has-five-parts.md) →
