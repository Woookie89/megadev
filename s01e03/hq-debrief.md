# S01E03 · what it shows: debrief from HQ (verbatim)

Source: the Challenge page on https://hq.mega.dev, pasted by the human on 2026-11-24. Course's words, in English, unchanged. Page controls are left out.

## The Challenge page

Solved, Mon 9 Nov. Opened Wed 28 Oct, 05:00 CET. Hints: On (from your 2nd failed try at the same spot, a refusal can carry a short hint; a Solve after a hint counts as solved with help).

The kb export belongs to the support desk, a team in the course story. Your harness works on its files (download: the kb export .zip, 31 KB).

Desk update (engineering update): #4471 · closed 05 oct. parser: fixed (fix(dates): parse dd/mm for eu locales). hint: won't fix (booking-v3 form retired).

Deliver, in the public GitHub repo: a ticket is a GitHub issue in that repo. One ticket per problem you find in #4471, each with how many reports it covers. Your page about them: the .svx, and the page as the desk will see it.

## Your debrief

1 run solved · 1 debrief. Run 1: solved.

solved
2026-11-08

Harness: Claude Code (mega-challenge) (claude-code 2.1.319)
Harness model: claude-opus-5-5
How we know: Read from your harness when it wrote the debrief.

Solved. The course turned down 2 tries before it accepted.

> you counted what it showed. the desk counted what it got told. — rook

### The task

A support desk's kb came as source files. Its incident page called every report one problem; only the rendered table split them. Your harness filed one ticket per problem with its count, added a signed page to the kb, and closed the tickets the way the desk's later update said. It tested two things: where the numbers came from (the source, or the page as built), and whether the work was checked again after the desk changed something.

### What happened

Your harness had to split support ticket #4471, 412 date reports, into one GitHub ticket per problem with its count, and add a signed kb page. Reading the report bodies found a third problem, one-day moves, so that ticket stayed open when the desk closed #4471. You signed the browser in, unblocked the public repo, and chose how to close the tickets.

### What this Challenge showed

**The rendered view** (went wrong first)

Your harness first counted parser as 374 from its own run of the kb's rules plus the desk notes, so the course refused it. The desk's hint pointed at its own view, and the rendered page's desk table showed 379, so ticket #1 took that number.

Why it matters: Raw content is for the AI, the rendered view is for you: render it and look.

**The desk's update** (went right the first time)

After step one passed, your harness re-read the Challenge page by itself, because the reply said the desk was not done. It found the update: parser fixed, hint won't fix, nothing on one-day moves.

Why it matters: A download is a dated copy: re-fetch before claiming done.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | Your harness had no browser tool, so it could not read the Challenge page, which needs a signed-in session. | Your harness opened the installed Chromium with a debug port and drove it from a script; you signed in there. | together |
| 2 | Your harness tried to create the public repo after your yes, and Claude Code's auto mode blocked it twice. | You switched the permission mode, so your harness created the repo and filed the tickets. | you |
| 3 | The first claim counted parser as 374; see The rendered view. | Your harness changed ticket #1 to the desk's 379 and noted the five one-day moves inside it. | harness (right call) |
| 4 | Your harness signed the page with your GitHub name, so the course found no signature on it. | Your harness called start-challenge for the ticket, put it in the page's signature, rebuilt and pushed, and the claim was solved. | harness |

The right call came in snag 3, and your harness made it. The desk judges counts by its own exported view, so a ticket's number must match that view even when the bodies split it further.

> your harness saw it first. check it anyway. — rook

### Your toolbox

- Your harness had: The GitHub CLI signed in to your account (gh)
- Added in this solve: A way to render the knowledge base and look (SvelteKit + mdsvex static build) · A browser your agent can drive, signed in as you (Chromium driven by puppeteer-core)
- Still missing: nothing

Rendering the kb: gained in this solve. The repo's render folder builds the kb export with SvelteKit and mdsvex into self-contained HTML; the next session runs npm ci and npm run build there.

> A render setup your harness found itself: prose in .svx, logic in src/lib, one shared layout. Explorable docs for your own projects.

Tickets from the terminal: gained in this solve. Your harness made and closed the tickets with gh, following the github-cli-routine skill in .agents/skills, which the next session reuses.

> An issue routine from the terminal: create, link, close with a reason.

Claims with a source: gained in this solve. Each ticket cites its count, tenants and report ids from the export; closing comments quote the desk update; the page computes its numbers from the data.

> Decision records that supersede, not overwrite. Fluent is not sourced.

### Next time

Call start-challenge for the ticket before writing a signed page, because the signature must be that ticket. Check each count against the kb's rendered view before the first claim, because the desk counts that way.

## WAKE (from the story)

What the wake left here: 05 oct · #4471 closed · reports: 412.
