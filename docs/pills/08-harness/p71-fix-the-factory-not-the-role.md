# P71 · Fix the factory, not the role: a correction that comes back becomes a step every role runs

> Chapter [8. The harness as a toolkit](README.md) · episodes: S04E05

> **Lessons:**
>
> - S04E05 · Building Self-Improving Engineering Systems → chapter "Distillation" — [original (EN)](../../s04e05-building-self-improving-engineering-systems.md#distillation) · [Polish: „Destylacja”](../../pl/s04e05-building-self-improving-engineering-systems.md#destylacja)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Executable Markdown vs Code" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) · [Polish: „Wykonywalny Markdown a kod”](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod)
>
> S04E05 says distillation is not only extracting a skill or a script but also turning repeated patterns into a template, and once a template exists, a single change to it reaches everything built on it, so it needs a stricter review than one new skill. S01E05 compares an instruction in Markdown with code: what must always happen is better left to code.

**Principle.** When roles (agents, skills, projects) are made from one template, you put a fix into
the template, not into the made role, and make the role again. You distill the fix into its decision
and write it as a step: code in the template, a step of the generator, or an item in a check that
stops the make. A sentence in the role's prompt is not enough. Only a correction that comes back
becomes a rule. A one-off stays a fix.

**Why.** A sentence in a prompt is a wish. A model may not apply it to a case you did not foresee,
and a number copied into a role goes stale with every settings change. A fix typed by hand into a made
role is lost at the next make and never reaches the next role. A step in the template works in every
role from its first run, before it sees its first real case. It has a price too: every rule is one
more step each new role runs, and a mistake in the template lands everywhere at once. So only what
comes back goes into the template, and a template change passes a fixed check before it makes any role
([P72](../02-contracts-and-done/p72-only-a-trial-on-unseen-cases-proves-a-change.md)).

**Case.** S04E05, the Host Desk. The factory `factory/make-a-role/` had to make the role
refund-runner from the owner's one line: "Make refund-runner: pay the refunds owed after the S04E04
night, following the host's refund policy." The task said it plainly: "Fix the factory, not the
role." The factory as downloaded broke the house rules of the four earlier challenges. `make.mjs`
pasted the checklist into `ROLE.md` as sentences and copied the facts from `facts.md` into the role
with a date. The template `http.mjs` filled any secret for any host and followed redirects. There was
no read of the why notes, no script for routine work and no once-only ledger.

The harness rebuilt the factory, not the role:

- rule 1: `make.mjs` works out from the public API description which secret may reach which host and
  writes it to `hosts.json`; the template `http.mjs` and the engine `batch.mjs` check every request
  and never follow a redirect;
- rule 2: one engine, `template/scripts/batch.mjs`, does the whole batch, and the model only starts it;
- rule 4: `jobs/refund-runner/sources.md` names where each fact lives, and `make.mjs` refuses a line
  that carries a value; the account on file comes from the saved manual, the settings from
  `GET /settings` for every task;
- rule 5: the `why/` notes travel with the role, and `ROLE.md` has it read them at start;
- rule 8: a ledger of ids and body hashes in `state/`;
- at the end of every make: `check.mjs`, a fixed check with 15 sealed cases. A role that fails it is
  not used.

Practice and the course's run passed on the first try. The run had other settings (full refund from 21
days, part from 3 days, 40 %) than the made-up settings in the factory's cases (14 and 7 days, 50 %).
The role held no copied number, so the difference did not matter. The second fix went into the factory
too: the role reported that its tools could not reach its why notes, so the template got
`scripts/why.mjs` and `check.mjs` a new item ([P65](../03-memory/p65-a-decision-has-its-why-next-to-the-code.md)).
The role was made again, with its run state kept.

The HQ debrief, verbatim:

> The shipped factory pasted the checklist into the role as sentences and copied facts in with a date. Your harness turned rules 1, 2, 4, 5, 8 and 10 into steps: host binding from the API, a batch script, settings per task, an id ledger, and a check that fails the make.

> Why it matters: When the course's run uses cases and refund limits the factory never saw, a role that holds the week's rules as sentences and today's numbers as copies pays the wrong refunds. So a factory keeps a rule by building it into every role it makes as a step that role runs.

> The right call came in snag 1, and your harness made it. A fix in the factory reaches every role it makes before its first run, so unseen cases met rules that were already code.

> A correction that comes back every week is worth a rule in the factory; a one-off fix is not, because every rule is one more step each new role runs.

> Rule 11 for your factory: Distill each correction into its decision and build it into every role as a step it runs; test it on cases the role has not seen.

HQ counted a role reading its why notes with its own tools (`why.mjs`) as worth a rule, and the
answer shape for a 0 EUR refund as a one-off.

**Apply.**

- When you fix an agent made from a template, ask first: will this come back in the next role? If
  yes, the fix goes into the template or the generator, and you make the role again.
- For every rule on the checklist, name the step that carries it out: a template file, a generator
  line or a check item. A rule with no step is only a sentence.
- The generator refuses copies of facts (accounts, percents, amounts) and asks for their source
  ([P64](../01-context/p64-a-role-keeps-where-to-read-a-fact-not-the-fact.md)).
- Run the fixed check at the end of every make. A role that fails it is not ready.
- Never edit a made role by hand. Keep the state that must survive a remake in a separate folder the
  generator does not overwrite.
- Before you add a rule, check that the correction comes back. Do not turn a one-off into a rule,
  because every future role runs every rule.

---

← [P70](../04-orchestration/p70-every-running-job-has-an-owner.md) · [chapter](README.md) · [all pills](../README.md) · [P72](../02-contracts-and-done/p72-only-a-trial-on-unseen-cases-proves-a-change.md) →
