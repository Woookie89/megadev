---
key: SCHED-4494
title: "week view: a booking across midnight shows on its first day only"
status: open
labels: [agent-ready, from:support]
---

## Intent
In week view, a booking that crosses midnight shows on both days it covers.

## Acceptance
- Given a booking from 23:00 to 01:00, when week view shows that week, then it shows on the first day until midnight and on the second day from midnight.
- Given an all-day booking stored as midnight to midnight, when week view shows it, then it shows on its one day only, not on the next day too.
- Given the calendar feed, when it is read after the change, then all-day bookings still go out as midnight to midnight.

## Boundaries
- Must not change how all-day bookings go out in the calendar feed: midnight to midnight, as a client relies on it (IN-9975, AUT-2).
- Must not split or change stored bookings (PRD-1); display only.

Allowed by AUT-1 (bug fixes inside the specs, with a test that shows the change).
