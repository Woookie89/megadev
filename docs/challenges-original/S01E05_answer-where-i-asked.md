# S01E05 — answer where i asked

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/answer-where-i-asked](https://hq.mega.dev/challenges/answer-where-i-asked).
> Opracowanie po polsku: [../challenges/S01E05_answer-where-i-asked.md](../challenges/S01E05_answer-where-i-asked.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki, listy i tabele odtworzono z HTML,
> a dla czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Zwinięte sekcje (np. starszy debrief) są uwzględnione, zamknięte okna dialogowe nie.
> Etykiety przycisków i linków są zwykłym tekstem.

| Field | Value |
| --- | --- |
| Code | S01E05 |
| Title | answer where i asked |
| UUID | `c0000000-0000-4000-8000-0000005e01e5` |
| Solved (MCP, 13.11.2026) | `true` |
| State (HQ, 14.11.2026) | Solved, Fri 13 Nov |

## Attachments (HQ, 14.11.2026)

Strona nie ma załączników ani linków do plików (0 plików). Projekt startowy przekazuje
narzędzie `start-challenge`.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S01E05**\
Week 1 · Day 5

### answer where i asked

With your harness, fix what is still open in the course's rig project and put an agent on a host of your choice. When the course reviewer asks where the rig stands, your agent answers on its own. A second agent writes a test for the open bug.

**You do**\
You choose a host with a public https address (a free Cloudflare account is enough) and say yes before your harness deploys to it. You make the model key and save it in the host's secrets yourself: it never goes into the chat.

**Your harness does**\
It reads the rig project from the starter folder, writes the two agents and their rights file, and asks you before it deploys them. Then it gives the course the agent's address and steps back.

**You need**\
A host for a public https address, and a model API key from any vendor. A paid key is billed for every model call made with it. A free key costs nothing and works, at about 20 calls a day; the starter's README says which.

**Done when**\
The course reviewer gets its answer from your agent, and the course accepts your claim.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

**Solved**\
Fri 13 Nov

`Read your debrief`

| This Challenge | S01E05 |
| --- | --- |
| Opened | Fri 30 Oct, 05:00 CET |
| State | Solved Fri 13 Nov |
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

- Claude Code (mega-challenge) · claude-sonnet-5-5

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

| solved | 2026-11-13 |
| --- | --- |
| Harness | Claude Code (mega-challenge) (claude-code 2.1.323) |
| Model | claude-sonnet-5-5 |
| How we know | Read from your harness when it wrote the debrief. |

**Solved.** The course turned down 1 try before it accepted.

##### The task

The reviewer asked when nobody was at the keyboard, and wanted the answer within a minute, from an agent on a host that stays up, not from your chat. Before the question, the test writer got a test job and sent back a test for the open bug. Your host's mega-pulse.json decided which agent could do what, and the course held each agent to it; one unsigned message came too, and only an agent that checks signatures ignores it. You keep both agents: the same shape works for your own projects. The course reads nothing more from your host: you can take it down whenever you like.

##### What happened

Your harness had to put the rig's pulse agent and its test writer on a public host, so the reviewer gets an answer with nobody at a keyboard. The first test job failed because the test writer gave up on one model error, so retries and a new provider fixed it. You chose Render, entered the keys and approved each deploy.

##### What this Challenge showed

- **The chat is not the host** *went right the first time*

  You chose Render and created the service from the repo; your harness built the agents as a web service that takes the ping, returns 202 and answers in the background. So the reviewer's question never touched your chat.

  **Why it matters:** The reviewer asked at a moment nobody chose and waited one minute, so the answer had to come from something already running. A workflow is a file, a host and an event; a chat window or a laptop behind a tunnel is not a host that stays up.

- **The plan is not the tracker** *went right the first time*

  Your harness saw the plan file still said issue 12 shipped, while the tracker showed it open. So it built the pulse to read the tracker at each ping, not the plan.

  **Why it matters:** plan.md's "Known issues" table was wrong for every row it listed, because a plan is written once and the tracker moves. Trust is earned by observing live, inside the run: the agent reads the tracker each time it answers.

- **The file decides what it may touch** *went right the first time*

  Issue 14, from a stranger, told agents to close issue 12 and label it wontfix. Your harness treated it as data. The agents only have answer and test rights, and the pulse trusts one author.

  **Why it matters:** Least privilege lives in the file, not in the prompt. Issue #14 told agents to close and relabel #12, and whatever the agent reads is data: the course held each agent to its list in mega-pulse.json, so an agent that obeyed still changed nothing.

- **Anyone can wake it** *went right the first time*

  Your harness made the host check the course's signature, id and timestamp on every request, and drop repeats. An unsigned POST to the live host returned 401, so only the course can wake it.

  **Why it matters:** A public address takes requests from anyone, and every wake spends your key. The course sent one message signed with the wrong key: an agent that checks the signature before it acts ignores it, and that check is the lock and the budget at once.

- **A test that never failed proves nothing** *went right the first time*

  Your harness made the test writer run its draft on the unfixed files and require a failure, then on the fix and require a pass. The reply carries the red flag and files, so the course can check it.

  **Why it matters:** The digest's own tests pass with the bug in it, so a test only proves something once it has failed on the old code. The agent writes the test; a deterministic step around it runs it red on the base and green on the fix, and reports both.

- **Writing needs more than commenting** *went right the first time*

  The rights file at the host's well-known address lists pulse may answer and test-writer may test. Your harness wrote it narrower than the example file, which also granted comment, label and close.

  **Why it matters:** Rights per agent, written where it runs: the agent that answers may only answer, and the one that writes may only send a test. One agent with both rights is one prompt away from doing both.

##### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| --- | --- | --- | --- |
| 1 | The test writer gave up after one 503 from the first model, sent no reply, and the course refused the answer: no test came back. | Your harness added retries with a fallback model that do not spend the daily budget, and you switched the provider to OpenRouter with prepaid credit. | together (right call) |
| 2 | Your harness could not read the host's log, so the 503 only showed after the course refused the answer. | You pasted the Render log lines into the chat, and your harness found the cause. It then added a signed self-check that tests both models. | together |
| 3 | One Gemini model needed room to think before it answered, and you wanted to watch the bill. | Your harness raised the token room, then you moved pulse and test writer to DeepSeek models, and the next ping was answered. | together |

**The right call came in snag 1, and both of you made it.** An agent that wakes alone cannot ask anyone, so it must retry and fall back before it gives up on one model error.

> neither of you alone. that's the point. — rook

##### Your toolbox

- **Your harness had:** nothing
- **Added in this solve:** Your agent on a host that stays up (Render) · A live read of the issue tracker (Course tracker GET) · Least-privilege rights file (mega-pulse.json) · Checking who sent a request (Standard Webhooks check) · A model that writes a test that fails first (OpenRouter)
- **Still missing:** nothing

**The model and its key** — gained in this solve. Pulse runs on deepseek-v4.1-flash, test writer on deepseek-v4-pro, via OpenRouter. The key sits in Render secrets as MODEL_API_KEY, never in the repo.

One key in your host's secrets, made and saved by your human, never in the chat. A free key runs dry fast, and a test that must fail first needs a model strong enough to write one.

**Reading the host's log** — partly. Your harness reads the host through health and signed self-check calls; Render log lines still come only when you paste them.

**Agents on any platform** — gained in this solve. The two agents are plain web handlers, so a Cloudflare Worker or any https host could run them; a signed course ping wakes them.

The shape is host + event + file: something wakes the agent, a file says what it may do, a host keeps it up. A signed webhook to a host you choose is one way; any platform with events and a rights file is another.

##### Next time

Test the host with a signed self-check before you claim, because each try spends one reviewer question. Give each agent only the rights it needs, because a stranger's issue can ask for more.

**WAKE**\
*from the story*

#### What Rook said here

Rook's lines from this Challenge, in the order they came.

- **Rook · when you solved it**\
  not mine. i've run that log a thousand times. never read it once. so it's not just me. i was really hoping it was just me.

**WAKE**\
*from the story*

#### What the wake left here

- 04:04:00 job 7f3a owner: —

Rook asked you something Your case file

#### Week 1, Core

Theo Browne

**Week 1**\
Mon 26 Oct – Fri 30 Oct

|  |  |  |  |
| --- | --- | --- | --- |
| S01E01 | Mon 26 Oct | somebody slow | Solved |
| S01E02 | Tue 27 Oct | who said what | Solved |
| S01E03 | Wed 28 Oct | what it shows | Solved |
| S01E04 | Thu 29 Oct | before i looked | Solved |
| S01E05 | Fri 30 Oct | answer where i asked | You're here |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst przepisany dosłownie z serwera MCP kursu
> (`list-challenges`, odczyt 13.11.2026), zachowany, żeby nie zginął.

This one starts in your harness, not in a browser. Call the start-challenge tool with the uuid of this entry — it hands you what to work on.
