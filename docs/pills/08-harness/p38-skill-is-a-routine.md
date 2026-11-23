# P38 · A skill is a routine that survived its first use

> Chapter [8. The harness as a toolkit](README.md) · episodes: S01E03, S02E03, S03E01, S03E02, S03E03, S03E05

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Designing and generating skills" — [original (EN)](../../s01e02-steering-models-through-context.md#designing-and-generating-skills) · [Polish: „Projektowanie i generowanie skilli”](../../pl/s01e02-steering-models-through-context.md#projektowanie-i-generowanie-skilli)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Executable Markdown vs Code" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) · [Polish: „Wykonywalny Markdown a kod”](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod)
> - S03E05 · Products That Learn After Release → chapter "Feedback Loops" — [original (EN)](../../s03e05-products-that-learn-after-release.md#feedback-loops) · [Polish: „Pętle sprzężenia zwrotnego”](../../pl/s03e05-products-that-learn-after-release.md#pętle-sprzężenia-zwrotnego)

**Principle.** When you do something a second time, write it down as a skill: the steps,
the consent rules, examples.

**Case.** `github-cli-routine` (S01E03): create, link, close with a reason. Cards from the
course deck: `read` (S01E01), `rig` (S01E04), `loop` (S02E01), `hands` (S02E03). None was
installed automatically, because installing is the human's decision. For `hands` the harness
first unpacked the files into a temporary folder and checked the SHA-256 of all 6 files. It
read the script where it starts processes. The human copied the folder to `~/.claude/skills/`.

S03E01: the course asked for a skill of our own in user scope, sent along with the
requirements list. With the human's consent, the harness wrote `capture` to
`~/.agents/skills/capture/SKILL.md` and linked it from `~/.claude/skills/capture`. The
skill says how to read each kind of file (audio, video, image, PDF, live page), how to
cite the spot, and that the owner settles conflicts. The course put it in the toolbox as
gained during the solve (T1).

S03E02: the `triage` skill in `.agents/skills/triage/SKILL.md` (project scope;
`.claude/skills` is a junction to `.agents/skills`, so `check-lane` answered "The harness
already loads the repo's skills"). Four steps: collect everything, decide each request by a
table of questions, write the issue in the tracker's format, check with a script. After it
settled a conflict and a withdrawal, the harness added two rules the run had taught it:
conflicting requests are one `needs-human` issue with both ids, and a later request can
withdraw an earlier one. The course recorded the skill as T1: "A triage skill of your own:
requests in, a marked tracker out — each decision citing the fact behind it." After the solve,
at the user's request, the harness installed the course deck's "ask" card in
`~/.claude/skills/ask/` (9 files, SHA-256 matching the course).

S03E03: the same `triage` skill got a section 5, "Running alone", because now an agent with no
person watching read it. It says what to read before every decision (`AGENTS.md` and the
contract, the whole issue thread, the decision records and the research, the code and tests),
that code posts the pickup comment and the model does not, when to build, decline or ask the
owner (a table), what a ship-log line looks like, and what never to do. The runner put the whole
skill in the prompt. The course counted it as gained, T1: "Your triage skill, grown to run alone:
per issue, read what is in force, ask the owner only what is open, build the answer, log it once
it is live." The lesson of the round (records in every turn) so far lives only in the runner's
code, not in the skill. On 20.11.2026, at the user's request, the harness installed the course
deck's "bet" card (a skill for decision records) in `~/.claude/skills/bet` (version 5597ebd80849,
6 files, SHA-256 matching the course, the skill's checks pass).

S03E05: the harness got through the challenge without a skill of its own for deciding after a
release. The course recorded it in the debrief: T1 not gained, and the toolbox was missing a
`decide` skill. The rules came out of the run: read the release records before the numbers,
recompute from raw files, watch the recordings, count the reach and age of errors, and write
each verdict as signal ids in `signals`, with the place and value in `note`. The day after the
solve (24.11.2026) the `decide` skill was written in `.agents/skills/decide/SKILL.md` (visible
through the `.claude/skills` junction).

---

← [P37](p37-missing-tool.md) · [chapter](README.md) · [all pills](../README.md) · [P39](p39-mcp-contract-for-strangers.md) →
