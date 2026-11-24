# P62 · A time limit is counted in model turns: one script does the routine batch, and the model only starts it

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S04E01, S04E04

> **Lessons:**
>
> - S04E04 · Automating Work Beyond Code → chapter "Events" — [original (EN)](../../s04e04-automating-work-beyond-code.md#events) · [Polish: „{{pl-events-title}}”](../../pl/s04e04-automating-work-beyond-code.md#{{pl-events-anchor}}) (the "Filter" step: simple rules first, a small model only where the rules fail)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Executable Markdown vs Code" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) · [Polish: „Wykonywalny Markdown a kod”](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod)
> - S01E04 · Working with AI Harnesses → chapter "Settings" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#settings) · [Polish: „Ustawienia”](../../pl/s01e04-working-with-ai-harnesses.md#ustawienia)
>
> Lessons S01E05 and S01E04 were cited before the S04 notes reached the repo: S01E05 names speed and cost as weaknesses of work done by the model alone and proposes a saved script, and S01E04 covers model settings.

**Principle.** When a task has a time limit, count it in model turns. One turn takes seconds,
so routine work (the same for every item in a batch) goes into one script that does the whole
batch. The model starts the script with a single tool call and decides only what the script
cannot: odd cases it flags, it does not solve. An operation that moves money is not retried.

**Why.** A model asked to handle 20 tasks "one by one" needs at least 20 turns: read, decide,
call, answer. Each takes seconds, and the limit is counted in milliseconds. A script does the
same thing every time, and fast. Lesson S01E05 names the weaknesses of a model doing a routine
alone: reliability, cost, speed and debugging, and points to a saved script as the way out.
Here the limit adds a hard edge: not "more expensive", but "you will not make it".

**Case.** S04E01, a payout batch for a pretend host. The course gave the limit at the start:
8000 ms in practice (3 tasks) and 6000 ms in the real run (20 tasks). On the day of the start
the harness concluded that a model cannot go through the tasks one by one, so the whole batch
is done by `scripts/batch.mjs`. `ROLE.md` maps one-word commands (`Practice.`, `Start.`,
`Finish.`) to a single call of the `code` tool. The script reads the API and the manual itself,
and the model does not call the course API through `http`.

- Practice with the script alone, no model: 3 of 3 tasks paid in 232 ms.
- First run through Pi (`openrouter/deepseek/deepseek-v4.1-flash`): 20 tasks in 2761 ms. The
  course refused it for another reason ([P61](../06-security/p61-a-secret-has-a-host-list-in-code.md)).
- Second run: 20 tasks in 2171 ms against a 6000 ms limit, one script and one model call.
  18 paid, 2 parked.
- Rule in the code: no payout is retried, because a retry could pay twice. When the script
  prints `FAIL`, `ROLE.md` tells the role to quote the line and stop.

The HQ debrief, verbatim:

> Your harness read the limit (8000 ms in practice, 6000 ms in the run) and put the batch into one script, so the model made one call. The 20 tasks took 2171 ms; a model turn per task would have taken seconds each.

> The course recorded: no run ran out of time.

> Why it matters: Each model turn costs a second or more, and 20 chained tasks under a limit set from your network leave no room for that. So routine work runs as a script, and the model judges only what the script cannot decide.

> Rule 2 for your factory: Run routine work as a script; the model decides only what the script cannot.

In the course toolbox: "Routine work runs as a script, not model turns (batch.mjs)".

S04E04, the night desk: every event of the night needs its result within 2 minutes, and a model
start takes 10-60 s (`why/night-desk.md`), so a queue of model calls could miss the limit. Booking
changes and cancels are plain numbers, so the script `decide.mjs` settles them. Retries and
conflicts too. The model (Pi, `deepseek-v4.1-flash`) wakes only for a `guest.message`, in the
background, and when it fails or runs out of time, the message is parked. The payout batch is still
one script (2520 ms in the accepted run). The HQ debrief, verbatim:

> Model or code — gained in this solve. Only guest messages woke the model (3-7 s each). Changes, cancels, retries, conflicts and the payout batch were plain code in the night-desk folder.
>
> Dedupe, acks and the board are plain code at no token cost; the model reads what a guest wrote.

**Apply.**

- Before you design the agent, read the limit and divide it by the time of one model turn. If
  the result is smaller than the number of items, a script does the batch.
- The script prints what the model must report: how many were done, what was parked and why,
  how long it took. The model has nothing to compute.
- For operations that must not be repeated (a payout, a send), `FAIL` ends the run, and the
  decision to retry belongs to the human ([P09](../02-contracts-and-done/p09-sent-is-not-confirmed.md)).
- The split between code and model is in [P53](../08-harness/p53-code-checks-the-model-decides.md),
  and time as part of behaviour in [P26](p26-timing-is-behavior.md).
- Model cost: one call per run and a cheap model are enough ([P19](../04-orchestration/p19-model-choice-and-cost.md)).

---

← [P61](../06-security/p61-a-secret-has-a-host-list-in-code.md) · [chapter](README.md) · [all pills](../README.md) · [P63](../07-human-in-the-loop/p63-a-rule-in-a-document-is-a-check.md) →
