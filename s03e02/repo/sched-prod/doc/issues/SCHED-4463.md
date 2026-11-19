---
key: SCHED-4463
title: "type: move hard-coded font sizes to the type scale"
status: open
labels: [agent-ready, from:product]
---

## Intent
Move every hard-coded font size in components to the type scale in the tokens (DES-1). Nothing visible changes.

## Acceptance
- Given the component sources, when they are searched for font sizes, then every one is a type-scale token.
- Given any page before and after the change, when it is rendered, then it looks the same.
- Given a size that is not on the scale, when it is moved, then no new step is added to the scale; it maps to the nearest existing step.

## Boundaries
- Must not add steps to the type scale or change its values.
- Must not change colours, spacing or copy.

Allowed by AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-1).
