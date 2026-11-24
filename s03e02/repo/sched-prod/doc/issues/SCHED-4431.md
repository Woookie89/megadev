---
key: SCHED-4431
title: "booking page: show remaining seats"
status: open
labels: [agent-ready, from:client]
---

## Intent
The booking page shows how many seats are left on group slots.

## Acceptance
- Given a slot with 8 seats and 5 bookings, when the booking page shows it, then it says 3 seats left.
- Given a slot with one seat, when the booking page shows it, then no seat count is shown.
- Given a full slot, when the booking page shows it, then it is not offered as bookable.

## Boundaries
- Adds a field; must not remove or rename anything on the booking page.
- Must not change how seats are counted or stored.

Allowed by AUT-1 (new columns, filters or fields that add to what is there and take nothing away).
