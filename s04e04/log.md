# S04E04 "Leave it running" — log

## 2026-11-24 start-challenge c0000000-0000-4000-8000-0000005e04e4
- task: give the Host Desk a night desk that handles booking events while nobody types. Start the night, keep the desk running for the whole window, then run the payout batch on the bookings as the night left them.
- why: work that starts itself from events, so the desk outlives any one chat.
- done: every event gets its result within 2 minutes, the desk's job is still running when the night closes, and the payout batch passes.
- you (human): approve the download; a push URL is optional (pulling is enough); decides the parked payouts on the owner page after a run passes.
- proofs: `ticket` (session.secrets.local.json, expires 2026-11-25T21:13:42Z; vars TICKET, Bearer for the manual), `attempt` (from the manual; vars ATTEMPT, Bearer for board, events, run). Fetch the manual ONCE: night and run share one attempt.
- build: night zip https://hq.mega.dev/media/leave-it-running/night-2be2323c.zip (roles/night-desk + poller; unzip where S04E01 zip was unzipped); alt day-4 zip https://hq.mega.dev/media/host-desk/host-desk-day-4-9de5c2b0.zip (not needed: we have s04e03/host-desk). API https://hq.mega.dev/challenges/leave-it-running/api.
- submit: claim receipts {} answer {}.
- headless? no (the night itself runs unattended).
- rook: "night's yours. i'm off at eleven and up at seven. i'd like to sleep through it."
- next (course): ask before download; TICKET into vars, fetch manual once, ATTEMPT into vars; then GET /board. A refusal may name a need -> call check-lane.
- human: "ok" (consent to start + download night zip)
