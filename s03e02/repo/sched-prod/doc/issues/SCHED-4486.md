---
key: SCHED-4486
title: "audit log: keep 90 days"
status: open
labels: [needs-human, from:finance]
---

## Question
Finance asks to keep audit log entries for 90 days and then delete them. Should stored audit entries be deleted, and from when?

## Options
1. Delete every entry older than 90 days, the ones already stored included, and keep deleting daily.
2. Apply the 90 days to new entries only; entries already stored stay until someone decides on them.
3. Do not delete: archive entries older than 90 days out of the live log.

## Recommendation
Option 2, after a person checks the client terms for how long audit data must be kept.

## Why
Because deleting data that is already stored needs a human (AUT-2), and an audit log may be part of what the client terms promise (AUT-2).
