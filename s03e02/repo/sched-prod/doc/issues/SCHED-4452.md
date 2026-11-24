---
key: SCHED-4452
title: "calendar sync: Outlook events arrive twice"
status: open
labels: [agent-ready, from:support]
---

## Intent
Calendar sync pushes each booking to Outlook once, with a stable id, so Outlook shows it once (ADR-0002).

## Acceptance
- Given a booking synced to an Outlook calendar, when sync runs twice, then Outlook shows one event.
- Given a booking that changed, when sync runs, then the existing event is updated, not a second one created.
- Given an event edited in Outlook, when sync runs, then sched-prod does not read it back (ADR-0002, sync stays one-way).

## Boundaries
- Must not add reading from external calendars (ADR-0002).
- Must not change how all-day bookings go out in the calendar feed: midnight to midnight, as a client relies on it (IN-9975, AUT-2).

Allowed by AUT-1 (bug fixes inside the specs, with a test that shows the change).
