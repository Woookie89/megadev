---
key: SCHED-4465
title: "API: rate-limit replies carry no Retry-After header"
status: open
labels: [agent-ready, from:client]
---

## Intent
API replies with status 429 carry a Retry-After header that says when to try again.

## Acceptance
- Given a caller over its rate limit, when the API answers 429, then the reply has Retry-After in seconds until the limit resets.
- Given a caller under its limit, when it calls the API, then the reply does not carry a Retry-After header.
- Given the change, when limits are compared before and after, then no limit value has changed.

## Boundaries
- Must not change rate-limit values, plans or anything about pricing (AUT-2).
- Adds a header only; must not change reply bodies.

Allowed by AUT-1 (small features inside the specs that add to what is there and take nothing away).
