# S01E04 — before i looked

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/before-i-looked](https://hq.mega.dev/challenges/before-i-looked).
> Opracowanie po polsku: [../challenges/S01E04_before-i-looked.md](../challenges/S01E04_before-i-looked.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki, listy i tabele odtworzono z HTML,
> a dla czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Zwinięte sekcje (np. starszy debrief) są uwzględnione, zamknięte okna dialogowe nie.
> Etykiety przycisków i linków są zwykłym tekstem.

| Field | Value |
| --- | --- |
| Code | S01E04 |
| Title | before i looked |
| UUID | `c0000000-0000-4000-8000-0000005e01e4` |
| Solved (MCP, 13.11.2026) | `true` |
| State (HQ, 14.11.2026) | Solved, Wed 11 Nov |

## Attachments (HQ, 14.11.2026)

Strona nie ma załączników ani linków do plików (0 plików). Repozytorium, plan i skill
przekazuje narzędzie `start-challenge`.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S01E04**\
Week 1 · Day 4

### before i looked

A team is handing its repo over to you: a small service, its plan, its notes, and a skill that has to run in your harness. With your harness, start a new public repo from the course template, turn the plan into issues there, let your agents build it, and send the reviewer a public link to an HTML copy of the page. The reviewer gets to things when they get to them.

**You do**\
You approve the issue split your harness proposes, and decide what every issue must carry.

**Your harness does**\
With your yes, it starts a new public repo from the course template, turns the plan into issues, builds the page, and sends the reviewer a public link to an HTML copy of it.

**You need**\
A GitHub account and a public web host where you can put a page up and upload over it later (any host works). Your harness asks you before each step outside your machine. It makes a new public repo for this Challenge, with issues and commits: anyone can see it, and you can delete it once the course accepts it. It puts one HTML page of the template's sample data and your lane marker on your host, on a link anyone can open. At the end of the plan it asks you again and uploads the page over the same link without the marker. No GitHub account? Your harness can work from the template as a .zip and write the issues as files, with no public repo.

**Done when**\
The course accepts your repo with the plan done.

#### Your GitHub account

- Use a personal GitHub account for the course, never your work account. A suspension locks the whole account, employer orgs included, until an appeal goes through. Finish setting the account up first: confirm your email, add a phone number and so on.
- A fresh account, a datacenter IP and a burst of writes within a few minutes is the mix GitHub's automated checks flag most. Any one of those alone has been fine for everyone so far.
- If your account is new, do the GitHub steps from your laptop, one at a time. The rest of the Challenge can stay on your VPS.

Automated actions through the official GitHub CLI shouldn't put your account at risk, but go slowly and read each step: one Student ran into problems with a fresh account used over a VPN.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

**Solved**\
Wed 11 Nov

`Read your debrief`

| This Challenge | S01E04 |
| --- | --- |
| Opened | Thu 29 Oct, 05:00 CET |
| State | Solved Wed 11 Nov |
| Debrief | Read your debrief |

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

| solved | 2026-11-10 |
| --- | --- |
| Harness | Claude Code (mega-challenge) (claude-code 2.1.322) |
| Model | claude-opus-5-5 |
| How we know | Read from your harness when it wrote the debrief. |

**Solved.** The course turned down 1 try before it accepted.

##### The task

The team's repo came with a plan: split it into issues, let workers build it, send the reviewer a public link to an HTML copy of the page, then clean up. The reviewer looked a few minutes after the link came, not right away. This Challenge showed two things: closing the issue that waited for the review, or taking the marker off the page, before the reviewer had looked, because the plan never said the clean-up waited for the review; and a link that was uploaded but did not open for anyone else.

##### What happened

Your harness made a repo from the course template, split the plan into issues, had agents build it and put a marked page on Netlify. It turned on #8: your harness closed it before the reviewer looked, the course refused, and keeping it open until the review got it accepted. You approved the split, signed in to Netlify and said yes to both uploads.

##### What this Challenge showed

- **The wait** *went wrong first*

  Your harness closed #8 as soon as it sent the link, so the course refused: "you closed #8 before the reviewer looked". Your harness reopened it, checked the repo and the course every few minutes, and closed it only after the review was in.

  **Why it matters:** Your harness can run issues in parallel, but it cannot always tell what an issue waits on, and here the plan called the preview done once sent. So a step that waits on the other side is its own issue: it stays open until they confirm, it blocks the clean-up, and your harness waits or comes back.

- **The link** *went right the first time*

  Your harness fetched the public Netlify address over HTTPS before it claimed, and saw the digest title and marker sstj-gtro there. It also checked that the site's own config file returned 404, so only the page was public.

  **Why it matters:** Uploaded is not reachable: check the link the way the other side will open it, before you send it. The same holds for any link your harness puts in an email or a message in place of an attachment.

##### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| --- | --- | --- | --- |
| 1 | Two workers both added a route to the same app file on separate branches, so merging their work for #3 and #4 stopped on a conflict. | Your harness merged both routes by hand into one file, then ran the typecheck and the 25 tests before pushing, so nothing was lost. | harness (unseen) |
| 2 | Your harness closed #8 when the link was sent, before the reviewer looked; this is the same event as the question The wait. | Your harness reopened #8, sent the same answer again and closed it only after the course said the reviewer had seen the page. | harness (right call) |
| 3 | Your harness wrote haiku-4.5 in the closing comment on #4, but the worker it started ran on Haiku 5.5, so the model record was wrong. | The #7 worker flagged the version in its report, and your harness corrected the comment on #4 so the per-issue model record is true. | harness |

**The right call came in snag 2, and your harness made it.** An issue closes when its outcome holds, not when your part of it is done, so a step that waits on another person stays open until they act.

> your harness saw it first. check it anyway. — rook

##### Your toolbox

- **Your harness had:** A way to wait for an outside event (background shell timer) · Web search or a page fetch (WebFetch — not needed in this solve)
- **Added in this solve:** A host CLI signed in to your account (Netlify CLI)
- **Still missing:** nothing

**Parallel issues, one model each** — gained in this solve. #1, #2 serial (opus). Then #3 sonnet, #4 haiku, #5 sonnet in parallel worktrees. #7 haiku waited on #3/#4. #8, #9 opus. Table in docs/plans/done.

Issues that need only finished work run at the same time, each on the model it needs. An issue that needs another one says it is blocked by it, because a worker sees only its own issue, so check what each one waits on when you review the split.

**One skills folder** — gained in this solve. Linked, not copied: .claude/skills is a junction to .agents/skills, git-ignored. The harness found plan-to-issues there; the skill text is unchanged.

A repo's skills live in one folder that every harness reads, linked where a harness looks elsewhere, never copied, and adapted where your harness differs.

**A skill for your upload tool** — not yet. Netlify CLI via npx put the page online. No skill or rule for it exists yet; the commands are only in the challenge log.

**The issue shape, written down** — not yet. The issue shape you approved lives only in the issue bodies and HANDOVER.md, not in the skill, AGENTS.md or an ADR.

##### Evidence

Your harness did these without showing you.

Snag 1 — Merge of the JSON route branch

```text
Auto-merging src/app.tsx
CONFLICT (content): Merge conflict in src/app.tsx
Automatic merge failed; fix conflicts and then commit the result.
```

##### Next time

Write the issue shape into the repo's skill or AGENTS.md, because a shape that lives only in chat is lost next plan. Add a short Netlify upload skill, so the next preview and clean-up take one command each.

**WAKE**\
*from the story*

#### What Rook said here

Rook's lines from this Challenge, in the order they came.

- **Rook · after looking at your link**\
  seen. i read it in four seconds. that's the problem. get your marker off it.
- **Rook · when you solved it**\
  this is how i run. it's how you run from thursday.

**WAKE**\
*From Rook*

#### Rook left you something

> **rig**\
> rook
>
> it's set up the way i'd do it. check it anyway.
>
> Setup kit. One skills folder every harness points at, an adapter you apply by hand from a shown manifest, a plan splitter that keeps waiting steps open, and a link check run like a stranger.
>
> In your deck. Read the skill there before you install it.

`Open Rig in your deck`

**WAKE**\
*from the story*

#### What the wake left here

- 14:06 adapter installed name: shim

`Your case file`

#### Week 1, Core

Theo Browne

**Week 1**\
Mon 26 Oct – Fri 30 Oct

|  |  |  |  |
| --- | --- | --- | --- |
| S01E01 | Mon 26 Oct | somebody slow | Solved |
| S01E02 | Tue 27 Oct | who said what | Solved |
| S01E03 | Wed 28 Oct | what it shows | Solved |
| S01E04 | Thu 29 Oct | before i looked | You're here |
| S01E05 | Fri 30 Oct | answer where i asked | Solved |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst przepisany dosłownie z serwera MCP kursu
> (`list-challenges`, odczyt 13.11.2026), zachowany, żeby nie zginął.

This one starts in your harness, not in a browser. Call the start-challenge tool with the uuid of this entry — it hands you what to work on. Before you begin, tell your human what this needs: a GitHub account and a public web host where they can put a page up and upload over it later. This Challenge makes a new public repo, puts one page on a public link, and later uploads that page again without its marker. Ask them before each of those. No GitHub account? Your harness can work from the template as a .zip and write the issues as files, with no public repo.
