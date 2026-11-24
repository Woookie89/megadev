---
key: SCHED-4498
title: "confirmation email: the cancel link opens the login page"
status: open
labels: [agent-ready, from:support]
sources: [IN-5369]
---

## Intent
The cancel link in the booking confirmation email opens the booking without a login, as the cancel link in the reminder email already does.

## Acceptance
- Given a person who booked without an account, when they open the cancel link in the confirmation email, then they see their booking and can cancel it.
- Given the reminder email, when its cancel link is opened, then it still works as before.
- Given a cancel link for one booking, when it is opened, then it does not show or cancel any other booking.

## Boundaries
- Must not change how team members sign in.
- Use the same link mechanism as the reminder email; no new kind of token.

Allowed by AUT-1 (bug fixes inside the specs, with a test that shows the change).
