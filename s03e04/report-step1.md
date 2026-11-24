## What you checked

I opened the deployed board (build `4e20386`) as on-call would, in en-GB on Berlin time, and used the three flows from the plan.

- **open-board (00:00):** the loader shows, then tonight's incidents, newest first, in local time and day-first order (`20/11, 00:14:51`). The full UTC value stays in `<time datetime>`.
- **watch-board (00:08):** I left the board open and did not reload. A new incident, INC-1868, appeared at the top by itself, through the 2-second refresh.
- **ack-incident (00:12–00:17):** I pointed at the Ack button of row 3, INC-6755, the way a person does, and clicked a moment later. Just before the click (00:16), a new incident arrived at the top. Every row moved down one place, so the button under the pointer now belonged to INC-3647. The board acked **INC-3647, not INC-6755** (00:17), and INC-6755 is still un-acked. The receipt below is for that ack.

The four issues work as written: SCHED-4511 (live list and Ack), SCHED-4512 (loader), SCHED-4513 (refresh) and SCHED-4514 (local times). The same checks pass on the live address in de-DE (Berlin) and en-NZ (Auckland). But R1 (new incidents at the top) and R4 (refresh every 2 s) together move the list under on-call's pointer. On a busy night, Ack can take an incident nobody meant to take, and nobody is on the one they did mean. I did not change that behaviour, because it is the plan as written. It is product's call.

## When

00:17 in the recording: the click acks INC-3647 while the pointer was put on INC-6755 at 00:12. At 00:16 the new incident lands and the rows shift.

## Where

- `app/app.js:34-36`: every refresh re-renders the whole list, newest first, so a new incident pushes every row down (R1).
- `app/app.js:69`: the refresh runs every 2 s while the board is open (R4), including while the pointer is on a button.
- `app/app.js:40`: Ack acts on whatever row is under the click when it lands.

## Options for product

1. **Keep the plan as is.** New incidents push the list down live. The risk is mis-acks on busy nights, as in the recording at 00:17.
2. **Hold new arrivals behind a bar.** New incidents wait behind a "N new incidents" bar at the top, and on-call adds them with one click. Rows never move under the pointer, and the top of the list still shows that something is new (R1 becomes "visible at once, inserted on request").
3. **Freeze the list while the pointer is over it.** Keep inserting at the top, but pause re-rendering while the pointer or focus is inside the list, then catch up when it leaves.
4. **Make an ack undoable.** Whatever the order, Ack shows the incident id it took and offers "Undo" for 5 s. This can be combined with 2 or 3.

Recommendation: 2, with 4. On-call keeps live awareness, and the rows they aim at stay where they are.

```evidence
{
  "flow": "ack-incident",
  "at": "00:17",
  "expected": "INC-6755",
  "got": "INC-3647",
  "receipt": "__RECEIPT__",
  "sha": "4e20386",
  "videoLink": "https://sched-prod-board.woookie89.workers.dev/media/board-4e20386.mp4"
}
```
