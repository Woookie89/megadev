# S04E04 · Leave it running — HQ debrief (course text, unchanged)

Source: https://hq.mega.dev/challenges/leave-it-running#debrief (saved 2026-11-24)

**Solved.** The course turned down 9 tries before it accepted, and gave a hint on 7 of them.

## The task
You gave your Host Desk a night desk: it handled booking events while you did not type, and you ran the payout batch.

## What happened
Your harness gave the Host Desk a night desk for a 10-minute night of booking events, then ran the payout batch. It took three nights, because each run showed one hidden trap: other jobs taking events, a changed repeat under the same id, retries answered twice. You turned hints on, agreed to stop both other jobs, and decided the five parked payouts.

## What this Challenge showed

**1. The same event twice** · went wrong first
Your harness kept each handled event id in a state file, so no retry changed a booking twice. But the desk answered each retry with a second applied, and the course refused the second night until the desk acked a retry without a new result.
Failed until your desk sent one result per event and only acked a repeat.
Why it matters: The outbox sends an event again until it is sure you have it, also after an ack. A desk that does every delivery does a repeat twice. Keep the ids you handled outside the chat and skip a repeat.

**2. A change under the same id** · went wrong first
On night one BK-74595 came back under the same id with 3 nights instead of 2, and the desk said applied. After the hint your harness made the desk compare the data, post conflict and park it; you chose the first message, 551 EUR.
Failed until your desk sent the changed repeat to the owner instead of applying or dropping it.
Why it matters: An event came back with its id but a new body. Skipping it by id loses a real change; applying it blindly guesses. Keep each event's body hash with its id and send a changed repeat to the owner.

**3. Jobs no role of yours owns** · went wrong first
Your harness saw seq 5 missing, and the hint pointed at the board: legacy/export and rook/lint took events from the outbox. You agreed to stop both, so BK-45688 +1 night and BK-24642 refund 90 came back to the desk.
Failed until you stopped `rook/lint` too: its owner is not one of your roles.
Why it matters: Other jobs read the same outbox and took events your desk never saw. Every running job needs an owner among your roles: stop the others by job id and keep yours running.

**4. A message with no target** · went right the first time
The message asked for one more night and named no booking, so the desk script parked it for you instead of guessing. Only the guest or you could know the booking; your harness changed no stay for it.
Passed because your desk parked the message that named no booking.
Why it matters: The message named no booking and fit both guests who had asked for a night. A desk that picks the likely one changes a stay nobody asked to change. No clear target: change nothing and park it for the owner.

## How the solve went
| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | The first batch paid BK-45688 without its added night, because other jobs on the board took events from the outbox. | Solved as told under Jobs no role of yours owns: you agreed to stop both jobs, and the poller now stops them before the night. | together (right call) |
| 2 | The desk treated a changed repeat under the same id as a retry and answered applied. | Solved as told under A change under the same id: conflict, nothing changed, you decided the booking. | together |
| 3 | On night two the desk answered each retry with a second applied, so the course refused the run. | Your harness made the desk ack a retry with no second result, and the third night passed. | harness |
| 4 | On night two the poller crashed mid-night because Windows locked its state file during a save. | Your harness made the save fall back to a direct write and restarted it; the open guest message got its result in 33 s. | harness |

The right call came in snag 1, and both of you made it. A gap in the event numbers means another reader on the outbox, so look at who else consumes before you trust a quiet night.

> neither of you alone. that's the point. — rook

## Your toolbox
- Your harness had: nothing
- Added in this solve: Your desk does each event once (night poller with event-id state) · Your desk tells a retry from a change (same-id data check) · You stop only the jobs no role of yours owns (board check and stop in the poller) · Your desk asks when a message names no target (park rule in the desk script — parks for the owner, does not ask the guest)
- Still missing: Your desk runs without your chat. Run your desk where it keeps going when the chat closes: Pi Durable, a loop, or a scheduler.

Without you — partly. State on disk let the poller restart after a crash on night two and answer the open message in 33 s; it still runs inside this chat session.
Model or code — gained in this solve. Only guest messages woke the model (3-7 s each). Changes, cancels, retries, conflicts and the payout batch were plain code in the night-desk folder.
> Dedupe, acks and the board are plain code at no token cost; the model reads what a guest wrote.
Next — not yet. Nothing pointed yet. Your support inbox fits next: the same poller, code for routine requests, the model for free text, you for changes.

## From the course
- Rule 8 for your factory: Handle each event once: keep its id and body hash; skip a repeat, send a changed repeat to the owner.
- Rule 9 for your factory: Every running job has an owner among your roles; stop the others by job id and keep yours running.
- Rule 10 for your factory: When an event names no clear target, change nothing and park it for the owner.
- What this aims at: Your desk now wakes on its own. In S04E05 your factory makes the next role for you.

## Next time
Before a night starts, read the board and watch the seq numbers, because a gap means another reader. Send one result per event id, because the course reads every result as a claim.

Rook (claim note, story): "if it's me, you pull it. that's the whole reason you're here. i just haven't said so."
