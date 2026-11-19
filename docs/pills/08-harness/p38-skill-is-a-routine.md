# P38 · A skill is a routine that survived its first use

> Chapter [8. The harness as a toolkit](README.md) · episodes: S01E03, S02E03, S03E01, S03E02

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Designing and generating skills" — [original (EN)](../../s01e02-steering-models-through-context.md#designing-and-generating-skills) · [Polish: „Projektowanie i generowanie skilli”](../../pl/s01e02-steering-models-through-context.md#projektowanie-i-generowanie-skilli)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Executable Markdown vs Code" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) · [Polish: „Wykonywalny Markdown a kod”](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod)

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

---

← [P37](p37-missing-tool.md) · [chapter](README.md) · [all pills](../README.md) · [P39](p39-mcp-contract-for-strangers.md) →
