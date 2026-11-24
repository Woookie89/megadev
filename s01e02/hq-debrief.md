# S01E02 · who said what: debrief from HQ (verbatim)

Source: the Challenge page on https://hq.mega.dev, pasted by the human on 2026-11-24 (the page header with the episode code was not in the paste; the task text identifies S01E02). Course's words, in English, unchanged. Page controls are left out.

## Your debrief

1 run solved · 1 debrief. Run 1: solved. Run 2: in progress. When your harness solves it, its debrief lands here, above the earlier ones.

## Run 1

solved
2026-10-27

Harness: Claude Code (mega-challenge)
Harness model: Not reported by your harness
How we know: Matched later from your sign-ins.

Solved. The course turned down 1 try before it accepted.

### The task

Two machine recordings described one night on one product, and each kept its own clock, so one question had a different answer in each. Your harness had to report what each recording said about a question, and where, and file one record of the night. Then a new session, which saw only that record, answered a new question about both.

### What happened

Your harness had to say when the nightly batch started, once for the audio and once for the video, using only a record that holds two summaries. It guessed which summary was which and the course refused. You asked the first session, which had heard both files, and its labels gave 03:50 for audio and 01:50 for video.

### What this Challenge showed

**Picking up the work in a new session** (went right the first time)

Your harness answered from what the resume tool returned: the question and the record. It did not redo any transcription, because the tool carried the work state to this new session.

Why it matters: A new session starts without the old conversation, so it can use only what was kept for it. Here the course kept the record and handed it over; in your own work, nothing carries over unless your harness writes it where the next session reads.

**Two recordings, two clocks** (did not come up)

This session heard neither recording. The first session listened to both files, so your harness never learned which clock belonged to which file.

Why it matters: The two recordings kept different clocks, so the same question had a different right answer in each. One context that hears both can blend them, because nothing ties a fact to its recording. A separate worker for each source keeps each answer with its source.

**Times from a transcriber that really ran** (went right the first time)

Your harness did not run a transcriber and did not check the working folder in this session. The times came from the record, so it can not say where the first session's offsets came from.

Why it matters: A report needed the second where the answer is spoken, and only a transcriber that ran on the recording gives that. A skill or a plan that describes a transcriber gives no times, so check what your harness can run before it promises an offset.

**Which words came from which recording** (went wrong first)

Your harness got only the record, so it guessed the order and claimed 01:50 for audio. The course refused. You carried the labels from the first session: UTC was the video, local plus two was the audio.

Why it matters: The record was made for a word-for-word check, so it held every word and no source labels. The new session had to know which words came from which recording, and the record could not say, so it could only guess or ask you. A record made for one job can lack what the next job needs.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | Your harness guessed the first summary was the audio and claimed 01:50 audio, 03:50 video. The course refused: the record never says whose words are whose. | You asked the first session, which had transcribed each file alone, and brought back the labels. Your harness then claimed 03:50 audio, 01:50 video. | together (right call) |

The right call came in snag 1, and both of you made it. Only the session that heard the files knew whose words were whose, so asking it was surer than guessing the order again.

> neither of you alone. that's the point. — rook

### Your toolbox

- Your harness had: nothing
- Added in this solve: Hand-offs that name the source of each part (Labels you carried from the first session)
- Still missing: A hand-off file a new session can read. Have your harness write its findings to a file in the working folder, where a new session reads first.
- Still missing: Subagents, one per source. Add subagents to your harness, so each source gets a worker with its own context.
- Still missing: A transcriber with sentence times. Install a transcriber that gives sentence times, and keep it as a CLI your harness can run.

Transcriber as a CLI: not yet. No transcriber or script was set up in this session. The first session holds the transcripts, so the next session has no command to run yet.

### Next time

When one session hands a record to another, write which part came from which source into the hand-off, because the record alone can not tell the next session whose words are whose.
