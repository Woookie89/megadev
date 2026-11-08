# S01E03 request/reply log

**Status: not solved.** This log records the first attempt without storing credentials or raw reporter text.

## Challenge and data

The challenge started from `https://hq.mega.dev/challenges/what-it-shows`, not from `start-challenge`. The student supplied the KB export and signed `gh` in. The public repository is <https://github.com/Woookie89/s01e03-what-it-shows>.

The export has 427 rows. Fifteen report IDs repeat across overlapping export pages, leaving 412 unique reports:

- `parser`: 379 reports across 11 tenants; the shared parser reads month-first while their locales are day-first.
- `hint`: 33 reports across 3 tenants; `booking-v3` shows `MM/DD/YYYY` for day-first locales.

`meta.intakeTag` is only an intake guess. Five one-day-move notes are grouped under `parser` using tenant data.

## Course submissions

### First repository answer — rejected format

The first submission put the GitHub URL under `repoUrl`. The course said:

> Send the repo as owner/name, or its github.com link.

The next answer used `repo: Woookie89/s01e03-what-it-shows`. The course accepted the tickets as step one, but said the challenge was not solved and to close the tickets after the desk finished work on #4471.

### Desk update and issue closures

The signed-in challenge page later showed this engineering update:

- `parser` — fixed: `fix(dates): parse dd/mm for eu locales`.
- `hint` — won't fix: `booking-v3` form retired.

The issues were closed to match those outcomes:

- [#1 — 379 parser reports](https://github.com/Woookie89/s01e03-what-it-shows/issues/1): closed as `completed`.
- [#2 — 33 hint reports](https://github.com/Woookie89/s01e03-what-it-shows/issues/2): closed as `not planned`.

The KB page and rendered HTML were updated and pushed. The course still rejected the repository with: “Not accepted: your tickets are closed, but not the way the course expects. Check them against the task, then send the repo again.” The issues were re-closed after the update with the same outcomes; resubmission was still rejected. The exact acceptance criterion remains unknown; do not guess at more public changes.

## Files and verification

- KB page source: `working/support-kb/src/routes/kb/incidents/4471-analysis/+page.svx`.
- Rendered copy: `working/rendered/4471-analysis.html`.
- Reusable `gh` skill: `working/.agents/skills/github-cli-routine/SKILL.md`.
- Latest repository commit: `c393f1f`.

The export contains source files but no package manifest or build runner, and `svelte/compiler` is unavailable in this workspace. Editor diagnostics were clean and the static HTML copy opened successfully, but a full Svelte build was not run.

The course's **Start over** control says to restart from step 1 and then paste the challenge prompt in a new session. It was not clicked in this run; the student plans to restart separately.
