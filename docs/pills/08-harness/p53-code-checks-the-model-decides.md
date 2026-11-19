# P53 · Code fetches, files and checks; the model decides: keep each on its own side

> Chapter [8. The harness as a toolkit](README.md) · episodes: S03E02

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Evaluation" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Executable Markdown vs Code" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) · [Polish: „Wykonywalny Markdown a kod”](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod)

**Principle.** When you work with a model, split two sides. Code fetches the data, assembles
the result, writes the files and checks everything that can be checked deterministically:
counts, shape, references, required sections. The model makes the calls that need judgment
and writes them into one decisions file. The result exists only once the checks pass.

**Why.** A model weighs conflicting requests well and writes good briefs, but it counts
badly and easily loses one item out of twenty. It also struggles to hold many conditions at
once. A script checks the same thing every time, fast and for free. The S03E02 lesson says it
plainly: everything that can be verified deterministically should be checked by code. The
S01E05 lesson names reliability, cost and debugging as weak spots of a skill run by the model
alone, and suggests a saved script. With the decisions in one place and the checks in another,
you know what to test with code and what to judge, and a failure points at its side at once.

**Case.** S03E02: triage of 21 requests into a tracker. Three files:

- `tools/poll.mjs` fetches the channels with a cursor and dedupes by id,
- `tools/decisions.mjs` holds the model's calls: mark, status, reason, `sources`,
  `blocked-by` and the body of each issue,
- `tools/build.mjs` assembles the tracker from the backlog, the channels and the decisions,
  runs the checks from step 4 of the `triage` skill, and writes the files only on PASS.

The first build (10:58:25 UTC) gave FAIL: six new requests were in no issue, and four
`agent-ready` briefs (SCHED-4465, IN-4988, IN-7623, IN-2631) had no case of what must not
happen: `acceptance has no "not" case`. The briefs looked finished. The model added the
missing cases and the second build passed. The course put this split in the toolbox as T3:
"Code fetches and files; the model decides. Keep each on its own side and you know what to
test where."

**Apply.**

- Every rule in the skill that can be written as a condition goes into the script: "each id in
  exactly one place", "each open issue has exactly one mark", "each brief has a 'not' case",
  "each reference points at a key that exists".
- The script writes no files when something fails. The error names the item and the rule
  ([P41](p41-errors-say-what-to-fix.md)).
- Keep the model's calls in one data file, not scattered across the output. They are easy to
  review, compare and fix one at a time.
- "Done" means the checks pass ([P07](../02-contracts-and-done/p07-done-is-a-check.md)).

---

← [P52](../05-agents-without-humans/p52-rebuild-on-every-arrival.md) · [chapter](README.md) · [all pills](../README.md)
