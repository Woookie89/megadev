---
key: SCHED-4418
title: "week view: first day of the week follows the account locale"
status: open
labels: [agent-ready, from:support]
sources: [IN-3326]
---

## Intent
Week view starts on the first day of the week of the account locale, not always on Sunday.

## Acceptance
- Given an account with locale de-DE, like the Berlin studio in IN-3326, when week view opens, then the week starts on Monday.
- Given an account with locale en-US, when week view opens, then the week still starts on Sunday.
- Given a booking on any day, when the start day changes, then the booking is not moved and keeps its UTC time (PRD-2).

## Boundaries
- Must not change stored bookings, the calendar feed or exports.
- Uses the account locale only; no new setting.

Allowed by AUT-1 (bug fixes and small features inside the specs, with a test that shows the change).
