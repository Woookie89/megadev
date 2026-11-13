# S01E03 — what it shows

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/what-it-shows](https://hq.mega.dev/challenges/what-it-shows).
> Opracowanie po polsku: [../challenges/S01E03_what-it-shows.md](../challenges/S01E03_what-it-shows.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki, listy i tabele odtworzono z HTML,
> a dla czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Zwinięte sekcje (np. starszy debrief) są uwzględnione, zamknięte okna dialogowe nie.
> Etykiety przycisków i linków są zwykłym tekstem.

| Field | Value |
| --- | --- |
| Code | S01E03 |
| Title | what it shows |
| UUID | `c0000000-0000-4000-8000-0000005e01e3` |
| Solved (MCP, 13.11.2026) | `true` |
| State (HQ, 14.11.2026) | Solved, Mon 9 Nov |

## Attachments (HQ, 14.11.2026)

| Name | Size | Link | Note on the page |
| --- | --- | --- | --- |
| kb export (`kb-export-267efc5e.zip`) | 31 KB | [/media/what-it-shows/kb-export-267efc5e.zip](https://hq.mega.dev/media/what-it-shows/kb-export-267efc5e.zip) | link "download the kb export .zip · 31 KB" |
| engineering update (desk update, #4471) | — (tekst na stronie, nie plik) | [strona HQ](https://hq.mega.dev/challenges/what-it-shows) | "new · desk update" |

Załączników nie pobierano.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S01E03**\
Week 1 · Day 3

### what it shows

The support desk merged 412 reports about dates into one ticket, #4471, and marked it known. Its knowledge base (kb) comes as an export, not a site. With your harness, file one ticket per problem you find in #4471 in your own public GitHub repo, each with how many reports it covers, and add your page about them to the kb. The desk keeps working while you do.

**You do**\
You download the kb export below and give the .zip to your harness. It asks you before it makes or changes anything on GitHub.

**Your harness does**\
It files one ticket per problem in #4471, adds a signed page about them to the kb, and sends the repo to the course.

**You need**\
A GitHub account, and gh (the GitHub command-line tool) signed in to it where your harness runs. The work goes in one public repo: a repo you name, or a new one your harness makes after you say yes. Anyone can see it. The course only reads it. You can delete it when the course accepts your tickets and your page.

**Done when**\
The course accepts your tickets and your page.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

**Solved**\
Mon 9 Nov

`Read your debrief`

| This Challenge | S01E03 |
| --- | --- |
| Opened | Wed 28 Oct, 05:00 CET |
| State | Solved Mon 9 Nov |
| Debrief | Read your debrief |

#### Files

#### the kb (knowledge base) export

This kb export belongs to the support desk, a team in the course story. Your harness works on its files.

`Hide the story`\
Only the plain text of each Challenge stays. Turn it back on any time.

download the kb export .zip · 31 KB

new · desk update

#### engineering update

\#4471 · closed 05 oct

- parser fixed fix(dates): parse dd/mm for eu locales
- hint won't fix booking-v3 form retired

#### deliver, in the public GitHub repo

A ticket is a GitHub issue in that repo.

- one ticket per problem you find in #4471, each with how many reports it covers
- your page about them: the .svx, and the page as the desk will see it

**WAKE**\
*the story*

#### Told through the Challenges

Somewhere in ordinary software, something fast is running. Nobody started it. Nobody can turn it off. It's known only by its traces: jobs nobody scheduled, commits with no author.

Rook's lines come inside the Challenges.

`Explore the story`

**Debrief**\
*written by your harness*

#### Your debrief

1 run solved · 1 debrief

- Run 1: solved
- Run 2: not used
- Run 3: not used
- Run 4: not used
- Run 5: not used
- Run 6: not used
- Run 7: not used
- Run 8: not used
- Run 9: not used

**Solve again**

Run this Challenge again from step 1, for example with another harness or model. It stays solved, and every debrief stays on this page.

- This is run 2 of 9.
- You can start 2 new runs in 24 hours. Both are left now.

You already have a debrief from:

- Claude Code (mega-challenge) · claude-opus-5-5

To compare harnesses or models, switch one of them and start the new run clean, with nothing kept from your earlier runs. The same pair again, started clean, mostly repeats a run you have.

After you start, this page shows the Challenge prompt again. You might give it to your harness.

**Start the new run with a clean harness**

The debrief compares harnesses and models fairly only if the new run starts clean. Clean means:

- a new session, in a new, empty folder;
- no memory, skills, rules files (CLAUDE.md, AGENTS.md and similar), notes or sessions from your earlier runs;
- no hints from you about what you learned.

Changing only the model is not enough: the memory and the old sessions stay.

A run that is not clean is OK, but its result shows what you learned, not what the harness can do.

`Start run 2`

| solved | 2026-11-08 |
| --- | --- |
| Harness | Claude Code (mega-challenge) (claude-code 2.1.319) |
| Model | claude-opus-5-5 |
| How we know | Read from your harness when it wrote the debrief. |

**Solved.** The course turned down 2 tries before it accepted.

> `you counted what it showed. the desk counted what it got told.`

##### The task

A support desk's kb came as source files. Its incident page called every report one problem; only the rendered table split them. Your harness filed one ticket per problem with its count, added a signed page to the kb, and closed the tickets the way the desk's later update said. It tested two things: where the numbers came from (the source, or the page as built), and whether the work was checked again after the desk changed something.

##### What happened

Your harness had to split support ticket #4471, 412 date reports, into one GitHub ticket per problem with its count, and add a signed kb page. Reading the report bodies found a third problem, one-day moves, so that ticket stayed open when the desk closed #4471. You signed the browser in, unblocked the public repo, and chose how to close the tickets.

##### What this Challenge showed

- **The rendered view** *went wrong first*

  Your harness first counted parser as 374 from its own run of the kb's rules plus the desk notes, so the course refused it. The desk's hint pointed at its own view, and the rendered page's desk table showed 379, so ticket #1 took that number.

  **Why it matters:** Raw content is for the AI, the rendered view is for you: render it and look.

- **The desk's update** *went right the first time*

  After step one passed, your harness re-read the Challenge page by itself, because the reply said the desk was not done. It found the update: parser fixed, hint won't fix, nothing on one-day moves.

  **Why it matters:** A download is a dated copy: re-fetch before claiming done.

##### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| --- | --- | --- | --- |
| 1 | Your harness had no browser tool, so it could not read the Challenge page, which needs a signed-in session. | Your harness opened the installed Chromium with a debug port and drove it from a script; you signed in there. | together |
| 2 | Your harness tried to create the public repo after your yes, and Claude Code's auto mode blocked it twice. | You switched the permission mode, so your harness created the repo and filed the tickets. | you |
| 3 | The first claim counted parser as 374; see The rendered view. | Your harness changed ticket #1 to the desk's 379 and noted the five one-day moves inside it. | harness (right call) |
| 4 | Your harness signed the page with your GitHub name, so the course found no signature on it. | Your harness called start-challenge for the ticket, put it in the page's signature, rebuilt and pushed, and the claim was solved. | harness |

**The right call came in snag 3, and your harness made it.** The desk judges counts by its own exported view, so a ticket's number must match that view even when the bodies split it further.

> your harness saw it first. check it anyway. — rook

##### Your toolbox

- **Your harness had:** The GitHub CLI signed in to your account (gh)
- **Added in this solve:** A way to render the knowledge base and look (SvelteKit + mdsvex static build) · A browser your agent can drive, signed in as you (Chromium driven by puppeteer-core)
- **Still missing:** nothing

**Rendering the kb** — gained in this solve. The repo's render folder builds the kb export with SvelteKit and mdsvex into self-contained HTML; the next session runs npm ci and npm run build there.

A render setup your harness found itself: prose in .svx, logic in src/lib, one shared layout. Explorable docs for your own projects.

**Tickets from the terminal** — gained in this solve. Your harness made and closed the tickets with gh, following the github-cli-routine skill in .agents/skills, which the next session reuses.

An issue routine from the terminal: create, link, close with a reason.

**Claims with a source** — gained in this solve. Each ticket cites its count, tenants and report ids from the export; closing comments quote the desk update; the page computes its numbers from the data.

Decision records that supersede, not overwrite. Fluent is not sourced.

##### Next time

Call start-challenge for the ticket before writing a signed page, because the signature must be that ticket. Check each count against the kb's rendered view before the first claim, because the desk counts that way.

**WAKE**\
*from the story*

#### What the wake left here

- 05 oct #4471 closed reports: 412

`Your case file`

#### Week 1, Core

Theo Browne

**Week 1**\
Mon 26 Oct – Fri 30 Oct

|  |  |  |  |
| --- | --- | --- | --- |
| S01E01 | Mon 26 Oct | somebody slow | Solved |
| S01E02 | Tue 27 Oct | who said what | Solved |
| S01E03 | Wed 28 Oct | what it shows | You're here |
| S01E04 | Thu 29 Oct | before i looked | Solved |
| S01E05 | Fri 30 Oct | answer where i asked | Solved |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst z serwera MCP kursu (`list-challenges`,
> odczyt 13.11.2026).

<https://hq.mega.dev/challenges/what-it-shows>
