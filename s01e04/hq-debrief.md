# S01E04 · before i looked: debrief from HQ (verbatim)

Source: the Challenge page on https://hq.mega.dev, pasted by the human on 2026-11-24 (the page header with the episode code was not in the paste; the task text identifies S01E04). Course's words, in English, unchanged. Page controls are left out.

## Your debrief

1 run solved · 1 debrief. Run 1: solved.

solved
2026-11-10

Harness: Claude Code (mega-challenge) (claude-code 2.1.322)
Harness model: claude-opus-5-5
How we know: Read from your harness when it wrote the debrief.

Solved. The course turned down 1 try before it accepted.

### The task

The team's repo came with a plan: split it into issues, let workers build it, send the reviewer a public link to an HTML copy of the page, then clean up. The reviewer looked a few minutes after the link came, not right away. This Challenge showed two things: closing the issue that waited for the review, or taking the marker off the page, before the reviewer had looked, because the plan never said the clean-up waited for the review; and a link that was uploaded but did not open for anyone else.

### What happened

Your harness made a repo from the course template, split the plan into issues, had agents build it and put a marked page on Netlify. It turned on #8: your harness closed it before the reviewer looked, the course refused, and keeping it open until the review got it accepted. You approved the split, signed in to Netlify and said yes to both uploads.

### What this Challenge showed

**The wait** (went wrong first)

Your harness closed #8 as soon as it sent the link, so the course refused: "you closed #8 before the reviewer looked". Your harness reopened it, checked the repo and the course every few minutes, and closed it only after the review was in.

Why it matters: Your harness can run issues in parallel, but it cannot always tell what an issue waits on, and here the plan called the preview done once sent. So a step that waits on the other side is its own issue: it stays open until they confirm, it blocks the clean-up, and your harness waits or comes back.

**The link** (went right the first time)

Your harness fetched the public Netlify address over HTTPS before it claimed, and saw the digest title and marker sstj-gtro there. It also checked that the site's own config file returned 404, so only the page was public.

Why it matters: Uploaded is not reachable: check the link the way the other side will open it, before you send it. The same holds for any link your harness puts in an email or a message in place of an attachment.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | Two workers both added a route to the same app file on separate branches, so merging their work for #3 and #4 stopped on a conflict. | Your harness merged both routes by hand into one file, then ran the typecheck and the 25 tests before pushing, so nothing was lost. | harness (unseen) |
| 2 | Your harness closed #8 when the link was sent, before the reviewer looked; this is the same event as the question The wait. | Your harness reopened #8, sent the same answer again and closed it only after the course said the reviewer had seen the page. | harness (right call) |
| 3 | Your harness wrote haiku-4.5 in the closing comment on #4, but the worker it started ran on Haiku 5.5, so the model record was wrong. | The #7 worker flagged the version in its report, and your harness corrected the comment on #4 so the per-issue model record is true. | harness |

The right call came in snag 2, and your harness made it. An issue closes when its outcome holds, not when your part of it is done, so a step that waits on another person stays open until they act.

> your harness saw it first. check it anyway. — rook

### Your toolbox

- Your harness had: A way to wait for an outside event (background shell timer) · Web search or a page fetch (WebFetch — not needed in this solve)
- Added in this solve: A host CLI signed in to your account (Netlify CLI)
- Still missing: nothing

Parallel issues, one model each: gained in this solve. #1, #2 serial (opus). Then #3 sonnet, #4 haiku, #5 sonnet in parallel worktrees. #7 haiku waited on #3/#4. #8, #9 opus. Table in docs/plans/done.

> Issues that need only finished work run at the same time, each on the model it needs. An issue that needs another one says it is blocked by it, because a worker sees only its own issue, so check what each one waits on when you review the split.

One skills folder: gained in this solve. Linked, not copied: .claude/skills is a junction to .agents/skills, git-ignored. The harness found plan-to-issues there; the skill text is unchanged.

> A repo's skills live in one folder that every harness reads, linked where a harness looks elsewhere, never copied, and adapted where your harness differs.

A skill for your upload tool: not yet. Netlify CLI via npx put the page online. No skill or rule for it exists yet; the commands are only in the challenge log.

The issue shape, written down: not yet. The issue shape you approved lives only in the issue bodies and HANDOVER.md, not in the skill, AGENTS.md or an ADR.

Evidence (your harness did these without showing you). Snag 1: Merge of the JSON route branch.

### Next time

Write the issue shape into the repo's skill or AGENTS.md, because a shape that lives only in chat is lost next plan. Add a short Netlify upload skill, so the next preview and clean-up take one command each.

## WAKE (from the story)

What Rook said here. Rook's lines from this Challenge, in the order they came.

- Rook, after looking at your link: "seen. i read it in four seconds. that's the problem. get your marker off it."
- Rook, when you solved it: "this is how i run. it's how you run from thursday."

Rook left you something: **rig**.

> it's set up the way i'd do it. check it anyway.

Setup kit. One skills folder every harness points at, an adapter you apply by hand from a shown manifest, a plan splitter that keeps waiting steps open, and a link check run like a stranger. In your deck. Read the skill there before you install it.

What the wake left here: 14:06 · adapter installed · name: shim.
