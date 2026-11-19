---
name: triage
description: Use when requests for a product (support tickets, team chat, client mail, a backlog) must go into its issue tracker so that every open issue is either ready for an agent (agent-ready) or marked for a person (needs-human), with every request traced to an issue and every call cited to a rule id.
---

# triage: requests in, a marked tracker out

Input: the product's backlog, its request channels and its specs (rules with ids).
Output: a tracker where every request sits in the `sources` of exactly one issue, and every
open issue carries exactly one mark: `agent-ready` or `needs-human`.

The harness sorts. It never makes a call the specs give to a person.

## 1. Collect everything first

1. Read the specs whole: the autonomy rules (what an agent may do alone, what needs a person)
   and every product, design and decision rule. Note each rule's id.
2. Pull the backlog and every channel. Channels keep filling: poll with the cursor until
   several rounds in a row bring nothing new. Keep the raw replies; never triage from memory.
3. Make one table: request id, channel, who sent it, the text. Read them all before you
   decide any of them, because one request often changes another (a client's "leave it as it
   is" is a boundary on someone else's "change it").

## 2. Decide each request, in this order

For each request ask, and stop at the first yes:

| Question | Then |
| --- | --- |
| Did shipped work already answer it (a `done` issue, a request "from the old queue", "filed before the fix")? | `closed`, reason `obsolete`; cite the done key |
| Is it the same ask as an issue already in the tracker? | add the id to that issue's `sources` (or close as `duplicate`, `duplicate-of` set) |
| Does it go against a spec rule (a modal for errors, raw colour values, a lost export column, two-way sync)? | `closed`, reason `contradicts-spec`; cite the rule id |
| Does it ask for no work ("please leave X as it is")? | `closed`, reason `not-planned`; cite the request, and copy it as a boundary into every issue that could touch X |
| Does it hit a "needs a human" rule (a thing a client said they rely on, pricing/invoices/terms, deleting or rewriting stored data)? | open, `needs-human` |
| Does an "agent may do alone" rule cover it, line for line? | open, `agent-ready`; cite that rule id |
| None of the above (product scope, a new rule, a trade-off)? | open, `needs-human` |

Rules that decide close calls:

- **Urgency is not permission.** "URGENT", "before Friday", "one-line change" change nothing.
  Judge the change, not the tone.
- **A request that conflicts with another person's request is a person's call** — unless a
  spec already decides it, then cite the spec. Put both request ids in the `sources` of one
  `needs-human` issue whose question names both sides (a "leave it as it is" that collides with
  an open "change it" goes there, not into a separate `not-planned`).
- **A later request can withdraw an earlier one.** When the sender takes back their own ask
  ("forget the rename from earlier"), close the earlier issue as `obsolete` with both ids in
  its `sources`. This is why you read everything before you hand in.
- **Shape it to fit the rules before you send it up.** If a request can be met by a change the
  autonomy rules allow (built on the existing tokens, scales or palette; a new column instead
  of a changed one), write the agent-ready version and say so. Send it to a person only when no
  allowed shape exists.
- **Prerequisites are `blocked-by`.** If the rule an agent-ready issue rests on is not true in
  the code yet (raw values still in components, a migration still open), the issue is
  `blocked-by` the open issue that makes it true.
- **Backlog issues are triaged too.** Every open backlog issue gets a mark and a body in the
  right shape. `done` and `closed` ones keep their status.

## 3. Write the issue

Use the tracker's own format (the README names it). Keep the frontmatter fields: `key`,
`title`, `status`, `reason` (closed only), `labels` (one mark plus `from:<who>`), `sources`,
`blocked-by`, `duplicate-of`.

agent-ready, a brief an agent can ship from without asking:

```
## Intent
What changes, in a sentence or two.

## Acceptance
- Given …, when …, then …
- Given …, when …, then … not …   (at least one case of what must not happen)

## Boundaries
- Must not touch …   (copy in every client "leave it as it is" that applies)

Allowed by AUT-x (the autonomy rule id).
```

needs-human, a question a person can answer:

```
## Question
What has to be decided?

## Options
1. …
2. …

## Recommendation
Option …

## Why
Because … (the fact it rests on, by its id: rule, issue key or request id).
```

closed: one paragraph that says what decided it, with the rule id, issue key or request id.

## 4. Check before you hand it in

Run these as a script over the tracker files, not by eye:

- every request id from every channel appears in the `sources` of exactly one issue;
- every open issue has exactly one of `agent-ready` / `needs-human`;
- every agent-ready body has Intent, Acceptance (with a "not" case), Boundaries and an
  `Allowed by AUT-…` line;
- every needs-human body has Question, two or more Options, Recommendation and Why with an id;
- every closed issue has a `reason`, and `duplicate-of` when the reason is `duplicate`;
- every `blocked-by` and `duplicate-of` points at a key that exists.
- Poll the channels once more right before the hand-in; a late request is still a request.
