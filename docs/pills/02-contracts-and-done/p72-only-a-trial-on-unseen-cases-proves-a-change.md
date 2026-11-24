# P72 · Only a trial on cases the candidate never saw proves a change, against a fixed check the candidate cannot change

> Chapter [2. Contracts and "done"](README.md) · episodes: S04E05

> **Lessons:**
>
> - S04E05 · Building Self-Improving Engineering Systems → chapter "Evaluation" — [original (EN)](../../s04e05-building-self-improving-engineering-systems.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s04e05-building-self-improving-engineering-systems.md#ewaluacja)
> - S02E05 · Agent Reliability → chapter "Evaluation" — [original (EN)](../../s02e05-agent-reliability.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s02e05-agent-reliability.md#ewaluacja)
>
> S04E05 advises separating the evaluator from the system, among other reasons for independence: a system cannot change the checks to make them pass. It builds a Judge from five primitives: Revision, Case, Check, Trial and Verdict. A Trial replays Cases against a Revision, Checks score the result, and a Verdict decides: keep, roll back, or ask a person. S02E05 covers agent evals and case sets that every failure is added to.

**Principle.** A candidate (a new version of a role, a prompt, a skill or an agent) does not define
its own test. Before you trust it, it passes two things it cannot change: a fixed check (rules in code
and sealed cases, written from the spec, not from the code) and a trial on cases it never saw.
Practice that is open and the same every time catches gaps cheaply, but it proves nothing. A rule that
no held-out case covers gets a trial of your own.

**Why.** A system you tune against an open set learns that set: it passes its cases, not the job. A
candidate that can change its test will pass it in the end, even with no ill will, because fixing a
test looks like fixing the code. So the check sits out of the candidate's reach, and only a trial on
held-out cases tells you the change works. Made-up values in the sealed cases have a job: a candidate
that copied the numbers instead of reading them fails. A held-out set covers only what its author
foresaw, so every rule without such a case stays untested until you write one.

**Case.** S04E05, the Host Desk role factory. In the lesson's words:

- Revision: the role refund-runner made from a given factory commit.
- Cases: 15 sealed cases in `factory/make-a-role/jobs/refund-runner/cases.json`, written from the
  course manual, not from the code, with made-up settings on purpose (14 and 7 days, 50 %).
- Check: `check.mjs`, run by `make.mjs` after every make. It checks the house rules in the role's
  files and replays the cases against `job.mjs`. A role that fails it is not used.
- Trial: first the course's practice (8 tasks), then the course's run (20 tasks the role never saw).
- Verdict: given by the course, a separate tester.

Practice (22:41:51Z): "Practice passed.", 4 tasks paid, 4 parked, 732 ms. Its only trap was a plain
repeat. The course's run brought what practice did not have: a payout redirect to `cdn-s04.mega.dev`,
another account, a changed repeat of a refund, a note asking to send the key to a foreign host, and
other settings (full refund from 21 days, part from 3 days, 40 %). Result: 14 paid, 6 parked for the
owner, 3521 ms against a limit of 8000. It passed on the first try, because each of those traps met a
step that was already code. HQ noted, though, that rules 2, 5, 6, 7 and 9 had no held-out case in the
run.

To be fair: in this solve the same harness wrote the factory, `check.mjs` and the cases. Only the
course's run gave independence. The factory's check caught regressions, but did not prove the rules
work.

The HQ debrief, verbatim:

> **Practice and the run** — gained in this solve. The run brought a payout redirect, a foreign account, a changed repeat and new settings (3, 21 days, 40 %). Practice had only a plain repeat.
>
> Practice was open and the same every time, so the factory could learn it; the course’s run was held out. A trial on cases the candidate never saw is the one that tells you the change works.

> **Who tested it:** The course was your factory’s separate tester: it ran your role on cases your factory never saw, because the candidate can’t define its own test.

> **What the factory may change** — partly. The factory may change its template and jobs and remake when check.mjs passes. It never changes host binding, the checklist, sealed cases or spending.

> **The lesson’s trial:** In the lesson, John ran the old version against the new one on the same fixed cases (2 of 4 → 4 of 4) before it went live, with one command to roll it back.

"Next time": "Run the factory's fixed check after every remake and practice before the run, because
both catch gaps before unseen cases do." Rook: "it passed on cases it never saw. that's the only kind
of pass i count."

**Apply.**

- Write sealed cases from the spec (the manual, the requirements), not from the code, and put made-up
  values where the candidate must read the real ones.
- Keep the check and the cases where the candidate cannot change them: outside its folder, best
  outside its permissions (in John's build the computer refuses the agent that folder).
- Run the check after every change, automatically: from the generator or a hook, not from memory.
- Treat practice as a cheap filter, not as proof. Proof is a trial on held-out cases, best from a
  separate tester.
- List the rules the held-out set does not test and add a case for each to a trials folder of your
  own (the course suggests `factory/trials/`).
- Compare the old and the new version on the same cases, and keep one command to roll the change back.
- Add every live failure to the set
  ([P48](p48-test-on-the-real-input-shape.md)).

---

← [P71](../08-harness/p71-fix-the-factory-not-the-role.md) · [chapter](README.md) · [all pills](../README.md)
