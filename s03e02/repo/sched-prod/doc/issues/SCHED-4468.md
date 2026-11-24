---
key: SCHED-4468
title: "spacing: move hard-coded margins to the spacing scale"
status: open
labels: [agent-ready, from:product]
---

## Intent
Move every hard-coded margin and padding in components to the 4 px spacing scale in the tokens (DES-3). Nothing visible changes.

## Acceptance
- Given the component sources, when they are searched for margin and padding values, then every one is a spacing token.
- Given any page before and after the change, when it is rendered, then it looks the same.
- Given a value that is not on the 4 px scale, when it is moved, then no new step is added; it maps to the nearest step.

## Boundaries
- Must not add steps to the spacing scale or change its values.
- Must not change colours, type or copy.

Allowed by AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-3).
