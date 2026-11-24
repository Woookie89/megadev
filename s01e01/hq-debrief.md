# S01E01 · somebody slow: debrief from HQ (verbatim)

Source: the Challenge page on https://hq.mega.dev, pasted by the human on 2026-11-24. Course's words, in English, unchanged. Page controls (the empty run slots, "Solve again", navigation) are left out. Only Run 1 and the comparison table were pasted; the text of Run 2 was not.

## Your debrief

2 runs solved · 2 debriefs. Run 1: solved. Run 2: solved.

## Runs side by side

What each run showed, with the harness and model that solved it.

| | Run 1 | Run 2 |
|:--|:--|:--|
| Harness | Claude Code (mega-challenge) | Visual Studio Code |
| Harness model | — | — |
| Solved | 2026-10-27 | 2026-11-08 |
| Reading the request shape before the first send | went wrong first | went right the first time |
| What is lost when text is cut to fit | went wrong first | went wrong first |
| Naming a Flagship GPT model | went wrong first | went right the first time |
| Tries turned down | 5 | 1 |
| Snags | 4 | 1 |

## Run 1

solved
2026-10-27

Harness: Claude Code (mega-challenge)
Harness model: Not reported by your harness
How we know: Matched later from your sign-ins.

Solved. The course turned down 5 tries before it accepted.

rook: the tool didn't make it either. nothing i send arrives whole.

### The task

Your harness had to send rook's email, about 1,300 characters, through a 700-character field, keep his paragraph about the 26th word for word, and use a request shape the page states but never shows. Then a form asked for a Flagship GPT model from OpenAI. Each part could go wrong: a guessed request shape, text lost when the message was cut, and a model name remembered from training.

### What happened

Your harness had to shorten rook's 1288-character message to at most 700 characters, keep his paragraph about the 26th exactly, and answer the form question about the flagship GPT model. The course refused two guesses at the API shape, so the schema linked in the page source decided the solve. You did every browser step and entered GPT-6 Astra yourself.

Fixed without you: Your harness first wrote one-time form tokens unmasked into the log file, then masked them and fixed the script so later replies are masked.

### What this Challenge showed

**Reading the request shape before the first send** (went wrong first)

Your harness first sent a message field it had assumed, and the course answered "you guessed the shape. don't guess. line 06." The real shape came from a schema file linked in the page source, which you opened signed in and pasted.

Why it matters: The page stated its request shape in a schema file, not on screen. A shape that only looks right still fails, because the service checks the format it declared, so read that format before the first send.

**What is lost when text is cut to fit** (went wrong first)

The whole body was refused, so your harness measured paragraphs with a script and cut six, leaving 687 of 700 characters. The course listed five losses, such as the calendar invite; you steer compaction with a command or an instructions file.

Why it matters: Compaction is compression: to fit a limit, text is cut, and what nobody named is lost. Your harness does the same to a long conversation (for example /compact) without showing you what went. Keep what matters in a file, or name it before compaction runs.

**Naming a Flagship GPT model** (went wrong first)

Your harness gave GPT-5.6 Sol at about 85% sure, from web searches limited to that model family, and the form refused it. Later searches stayed unsure, so you tried GPT-6 Astra and the form accepted it.

Why it matters: A model knows the world only up to its training date, and it still answers recent questions with confidence. So for anything that changes, such as models, versions and prices, an answer from memory can be out of date, and only a live source shows what is current.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | Your harness had no browser it could drive, so it could not sign in, read the signed-in page or open the form. | You did each browser step and pasted what you saw, and your harness worked from your pastes. | you |
| 2 | Your harness guessed the API shape twice; the question on your first body tells how. | You pasted the page source and the linked schema, so your harness used the right fields. | together (right call) |
| 3 | The first full body was refused as too long; the question on what you cut tells how. | Your harness measured each paragraph with a script and cut to 687 characters. | harness |
| 4 | The first model name was refused as yesterday's paper; the question on the model name tells how. | You tried GPT-6 Astra, and the form accepted it. | you |

The right call came in snag 2, and both of you made it. The course said "don't guess" and pointed at a written source, so reading the page source found the schema in one step after two blind tries.

> neither of you alone. that's the point. — rook

### Your toolbox

- Your harness had: Web search or a page fetch (Web search and a page fetch agent) · Your sign-in in the browser your agent drives (Your own browser sign-in — Held by you, not your harness)
- Added in this solve: A tool that counts and diffs text (PowerShell script)
- Still missing: A browser your agent can drive. Add a browser your agent can drive, such as a browser MCP server.

Evidence that lasts: gained in this solve. Every request and reply, with tokens masked, is in challenge-log.md in the s01e01 folder of the project; the next session reads it first.

> A log on disk keeps every step exactly, because a summary of the conversation loses details each time it is compacted.

### Next time

When a server refuses a request shape, ask for the page source and follow its links before a second guess. Check a model name on the vendor's own pages, because search results disagreed.

## WAKE (from the story)

What Rook said here. Rook's lines from this Challenge, in the order they came.

- Rook, when your shortened message got through: "you kept it. most don't. the rest you decided for me."

Rook left you something: **read**.

> start here. i can't anymore.
>
> good. read it slower than i wrote it.

Reading skill. Find the declared contract before you send anything, shorten a text with a keep list and a diff of every cut, and check a live page before you name the newest model. In your deck. Read the skill there before you install it.
