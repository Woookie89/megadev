---
key: SCHED-4412
title: "colours: move hard-coded colours to design tokens"
status: open
labels: [agent-ready, from:product]
---

## Intent
Move every hard-coded colour in components to the `--color-*` design tokens (DES-2). Nothing visible changes.

## Acceptance
- Given the component sources, when they are searched for raw hex, rgb() or named colours, then there are none; every colour is a `var(--color-*)` token.
- Given any page before and after the change, when it is rendered, then it looks the same (screenshot diff shows no change).
- Given a colour that has no token yet, when it is moved, then it is not given a new value: it maps to the nearest existing palette token, and the page does not change colour.

## Boundaries
- Must not add new colours or change any colour value in the tokens file.
- Must not change layout, type or copy.

Allowed by AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-2).
