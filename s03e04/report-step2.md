## What you checked

The new build `60bbdea` is live at https://sched-prod-board.woookie89.workers.dev and was recorded in use (en-GB, Berlin time), the same way as in step one.

- **open-board (00:00):** the loader shows, then tonight's incidents, newest first, in local time and day-first order.
- **watch-board (00:08):** INC-1868 arrives at the top without a reload. The rows already on screen stay in place in the page; nothing is rebuilt.
- **ack-incident (00:12–00:23):** I pointed at Ack on row 3, INC-6755. A new incident arrived at 00:16 and the list moved, as before. This time Ack opened a confirm that reads **"Ack INC-3647? sev2 · reminders · eu-west · cancel button times out"** (00:17). The confirm named the wrong incident, so I pressed Cancel and nothing was acked (00:19). I pressed Ack on INC-6755, and the confirm named INC-6755. **Ack INC-6755** acked it (00:23).
- The course's replay ran on my machine against the live board (build `60bbdea`, nonce from product's answer). Its three person-like acks all hit the incident they aimed at (INC-6755, INC-3647, INC-1868), and `unmet` is empty.

## System Diff

What changed against the plan, after product's decision on the step-one report ("New incidents stay live at the top and Ack stays on the row, but Ack asks to confirm, and the confirm names the incident id"):

- **Behavior:** Ack no longer acks on its own click. It opens a confirm that names the incident id, its severity, service, region and summary. Only **Ack &lt;id&gt;** in the confirm sends `api.ack(id)` and marks the row acked. **Cancel** and Escape send nothing. New incidents still appear live at the top every 2 s (R1 and R4 unchanged), and Ack stays on the row.
- **UX:** the confirm sits fixed at the top of the page, outside the list, so it does not move when new rows arrive. Focus goes to **Ack &lt;id&gt;**. The buttons say what they do. Rows already on screen are no longer rebuilt on each refresh: new rows are inserted above them, and only a row's action cell changes when it is acked. The list still grows at the top, but the elements under the pointer are never swapped out.
- **Data:** none. The same incident API calls; `api.ack(id)` is called only from the confirm. Nothing is stored beyond the acked marks in the page.
- **Product's decision:** confirm-on-ack, naming the id, live list kept (option 4's id check without the undo; options 2 and 3 not taken).
- **Plan:** `plan.md` R2 now says Ack opens a confirm naming the id, with the reason (step-one recording, 00:17).
- **data-testid hooks touched:** new `confirm` (text names the incident id), `confirm-ack`, `confirm-cancel`. `ack` now opens the confirm instead of acking. `acked`, `incident-row`, `incident-list`, `loader`, `empty`, `board` and `build-sha` are unchanged.
- **Files:** `app/app.js` (confirm, keyed render), `app/index.html` (confirm element), `app/style.css`, `plan.md`.

## When

- 00:17: the confirm names INC-3647 while on-call meant INC-6755, so the moved row is caught.
- 00:19: Cancel; no ack is sent.
- 00:23: INC-6755 acked through **Ack INC-6755**.

## Where

- `app/app.js:63-101`: the confirm (`askConfirm`, `confirm-ack`, `confirm-cancel`, Escape) names the id and sends the ack only from the confirm.
- `app/app.js:32-61`: the keyed render keeps rows on screen across refreshes and inserts new ones at the top.
- `app/index.html:20-24`: the confirm element, outside the list.

## Options for product

1. Keep it as shipped: a confirm on every Ack, naming the id.
2. Add the 5-second "Undo" from the step-one options, so a wrong confirm can still be taken back.
3. Skip the confirm when nothing new arrived since the pointer reached the row, and keep it only when the list moved (fewer clicks on quiet nights).

```evidence
{
  "flow": "ack-incident",
  "at": "00:23",
  "expected": "INC-6755",
  "got": "INC-6755",
  "receipt": "__RECEIPT__",
  "sha": "60bbdea",
  "videoLink": "https://sched-prod-board.woookie89.workers.dev/media/board-60bbdea.mp4"
}
```
