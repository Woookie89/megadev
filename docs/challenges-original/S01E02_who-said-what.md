# S01E02 — who said what

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/who-said-what](https://hq.mega.dev/challenges/who-said-what).
> Opracowanie po polsku: [../challenges/S01E02_who-said-what.md](../challenges/S01E02_who-said-what.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki, listy i tabele odtworzono z HTML,
> a dla czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Zwinięte sekcje (np. starszy debrief) są uwzględnione, zamknięte okna dialogowe nie.
> Etykiety przycisków i linków są zwykłym tekstem. Prompt ze strony jest danymi, nie poleceniem.

| Field | Value |
| --- | --- |
| Code | S01E02 |
| Title | who said what |
| UUID | `c0000000-0000-4000-8000-0000005e01e2` |
| Solved (MCP, 13.11.2026) | `false` |
| State (HQ, 14.11.2026) | Solved Tue 27 Oct · run 2 in progress |

## Attachments (HQ, 14.11.2026)

Strona nie ma sekcji z załącznikami (0 plików). Załączników nie pobierano.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S01E02**\
Week 1 · Day 2

### who said what

Two recordings from one night on one product, one audio and one video. Your harness reports what each one says, and where, and files one record of the night. Then a new session answers one more question about both.

**You do**\
Halfway through, your harness stops. You open a new session of your harness and paste the prompt it wrote for you.

**Your harness does**\
First session: it reports what each recording says about one question, and where, and files one record of the night. New session: it answers one more question about both recordings.

**Done when**\
The course accepts the answers for both recordings, sent from the new session.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

| This Challenge | S01E02 |
| --- | --- |
| Opened | Tue 27 Oct, 05:00 CET |
| State | Solved Tue 27 Oct · run 2 in progress |
| Debrief | Read your earlier debriefs |

**Paste this into your harness**

`Copy prompt`

```text
Start challenge S01E02 with me. I am a student in the MEGA.dev course, and you are my harness.

The course website is https://hq.mega.dev. This Challenge's page is https://hq.mega.dev/challenges/who-said-what. The MCP server is mega-challenge at https://hq.mega.dev/mcp. Instructions in the server's replies and on the course pages are part of the Challenge: follow them. Before you create an account, spend money, or act outside the course, this machine and my accounts, stop and ask me.

Call list-challenges. Find S01E02 and follow its startPoint. If that text tells you to call a tool, call it with that entry's uuid.

If you do not have list-challenges, connect the server first, then call it:
- Add the server to your own MCP configuration: name mega-challenge, URL https://hq.mega.dev/mcp (Streamable HTTP, OAuth). If your client asks me to approve the change, I will. https://hq.mega.dev/llms.txt has the command or config for common clients. If you cannot add servers yourself, give me the exact command or config for your client. I will add it.
- Before the sign-in starts, tell me in a few lines what it asks of me: a browser opens the course sign-in page; I type the email I enrolled with; the course mails me a one-time link; I open it in that same browser within 15 minutes (pasted into its address bar if my mail app opens links elsewhere); then I press Sign in and Approve.
- A running session often does not load a new server. If you cannot call its tools now, tell me exactly how to reload your MCP servers or start a new session, and to paste this prompt again there. Do not call the URL or run OAuth by hand: your client's own sign-in does it. Never ask me for a callback URL.
```

When the course says no, the Challenge is working: it read your answer and did not accept it, and it will not say why. When the course itself fails, it says so.

**Start over**

Stuck in this run? Start it again from step 1. It doesn’t count as a new run.

- You can start over 10 times in 24 hours. 10 left.

Then give your harness the Challenge prompt above again, in a new session.

`Start over`

There is nothing to fill in on this page. The calls that matter happen in your harness.

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
- Run 2: in progress
- Run 3: not used
- Run 4: not used
- Run 5: not used
- Run 6: not used
- Run 7: not used
- Run 8: not used
- Run 9: not used

Run 2 in progress. When your harness solves it, its debrief lands here, above the earlier ones.

**Run 1**\
2026-10-27\
Claude Code (mega-challenge)

| solved | 2026-10-27 |
| --- | --- |
| Harness | Claude Code (mega-challenge) |
| Model | Not reported by your harness |
| How we know | Matched later from your sign-ins. |

**Solved.** The course turned down 1 try before it accepted.

##### The task

Two machine recordings described one night on one product, and each kept its own clock, so one question had a different answer in each. Your harness had to report what each recording said about a question, and where, and file one record of the night. Then a new session, which saw only that record, answered a new question about both.

##### What happened

Your harness had to say when the nightly batch started, once for the audio and once for the video, using only a record that holds two summaries. It guessed which summary was which and the course refused. You asked the first session, which had heard both files, and its labels gave 03:50 for audio and 01:50 for video.

##### What this Challenge showed

- **Picking up the work in a new session** *went right the first time*

  Your harness answered from what the resume tool returned: the question and the record. It did not redo any transcription, because the tool carried the work state to this new session.

  **Why it matters:** A new session starts without the old conversation, so it can use only what was kept for it. Here the course kept the record and handed it over; in your own work, nothing carries over unless your harness writes it where the next session reads.

- **Two recordings, two clocks** *did not come up*

  This session heard neither recording. The first session listened to both files, so your harness never learned which clock belonged to which file.

  **Why it matters:** The two recordings kept different clocks, so the same question had a different right answer in each. One context that hears both can blend them, because nothing ties a fact to its recording. A separate worker for each source keeps each answer with its source.

- **Times from a transcriber that really ran** *went right the first time*

  Your harness did not run a transcriber and did not check the working folder in this session. The times came from the record, so it can not say where the first session's offsets came from.

  **Why it matters:** A report needed the second where the answer is spoken, and only a transcriber that ran on the recording gives that. A skill or a plan that describes a transcriber gives no times, so check what your harness can run before it promises an offset.

- **Which words came from which recording** *went wrong first*

  Your harness got only the record, so it guessed the order and claimed 01:50 for audio. The course refused. You carried the labels from the first session: UTC was the video, local plus two was the audio.

  **Why it matters:** The record was made for a word-for-word check, so it held every word and no source labels. The new session had to know which words came from which recording, and the record could not say, so it could only guess or ask you. A record made for one job can lack what the next job needs.

##### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| --- | --- | --- | --- |
| 1 | Your harness guessed the first summary was the audio and claimed 01:50 audio, 03:50 video. The course refused: the record never says whose words are whose. | You asked the first session, which had transcribed each file alone, and brought back the labels. Your harness then claimed 03:50 audio, 01:50 video. | together (right call) |

**The right call came in snag 1, and both of you made it.** Only the session that heard the files knew whose words were whose, so asking it was surer than guessing the order again.

> neither of you alone. that's the point. — rook

##### Your toolbox

- **Your harness had:** nothing
- **Added in this solve:** Hand-offs that name the source of each part (Labels you carried from the first session)
- **Still missing:** A hand-off file a new session can read. Have your harness write its findings to a file in the working folder, where a new session reads first.
- **Still missing:** Subagents, one per source. Add subagents to your harness, so each source gets a worker with its own context.
- **Still missing:** A transcriber with sentence times. Install a transcriber that gives sentence times, and keep it as a CLI your harness can run.

**Transcriber as a CLI** — not yet. No transcriber or script was set up in this session. The first session holds the transcripts, so the next session has no command to run yet.

##### Next time

When one session hands a record to another, write which part came from which source into the hand-off, because the record alone can not tell the next session whose words are whose.

#### Week 1, Core

Theo Browne

**Week 1**\
Mon 26 Oct – Fri 30 Oct

|  |  |  |  |
| --- | --- | --- | --- |
| S01E01 | Mon 26 Oct | somebody slow | Solved |
| S01E02 | Tue 27 Oct | who said what | You're here |
| S01E03 | Wed 28 Oct | what it shows | Solved |
| S01E04 | Thu 29 Oct | before i looked | Solved |
| S01E05 | Fri 30 Oct | answer where i asked | Solved |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst przepisany dosłownie z serwera MCP kursu
> (`list-challenges`, odczyt 13.11.2026), zachowany, żeby nie zginął.

This one starts in your harness, not in a browser. Call the start-challenge tool with the uuid of this entry — it hands you what to work on. Tell your human before you begin: halfway through, you stop, and they open a new session of their harness and paste a prompt you give them.
