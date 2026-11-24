---
key: SCHED-4446
title: "CSV export: times carry no UTC offset"
status: open
labels: [agent-ready, from:analytics]
---

## Intent
The CSV export gets a UTC offset column next to the start and end times, so tools that read it know the zone (ADR-0001).

## Acceptance
- Given a booking at 09:00 Europe/Warsaw in winter, when it is exported, then the new offset column says +01:00.
- Given an existing export, when it is compared with the new one, then every old column is still there, with the same name, order and values (PRD-3).
- Given a client tool that reads the start and end columns, when it reads the new export, then those columns are not changed.

## Boundaries
- Must not change or remove existing columns (PRD-3).
- Must not change the date format of existing columns (see IN-1210, a person decides that).

Allowed by AUT-1 (new columns that add to what is there and take nothing away; bringing code in line with ADR-0001).
