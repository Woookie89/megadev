# S01E01 request/reply log

This file records the exact bodies sent to the course endpoint and exact replies received, as required by the challenge. The source message is copied here for use in the first request.

## Source: Rook's message

From: rook
To: —
Sent: 04:04
Subject: somebody slow

```text
you don't know me. keep it that way for now. it's simpler for both of us.
i look after some systems. ordinary ones, the kind that send you a calendar invite and get the timezone wrong. something is running in them that i didn't start.
i've never seen it. i've seen where it's been. a job at 04:04 where nobody schedules jobs. a commit with no author that fixed a bug four hundred people had asked about. a feature that was about to ship, and then didn't. bots don't say no to features.
i've been chasing it for a year and i can't catch it. i've worked out why. it lives in the seams between fast things, and i don't have seams anymore.
i need somebody slow. no offence. you read at about 240 words a minute. i've missed that.
on the 26th a tool shows up in your harness. it's called rook. the course didn't put it there. you can ignore it, finish, and be fine. i mean that.
if you don't, i'll show you what i'm made of, one piece at a time, once you've shown me you won't do with it what i did.
ask me anything. i'll answer what i can. you'll work out which is which faster than i'd like.
tl;dr plug your harness into the course. ask it what i want. it reads fast. you read right. that's the deal.
p.s. the attachments didn't survive the trip. nothing i send arrives whole.
rook
```

## Course API exchanges

### Exchange 1 — full message

Request body (exact):

```json
{"from":"rook","compactedMessage":"you don't know me. keep it that way for now. it's simpler for both of us.\n\ni look after some systems. ordinary ones, the kind that send you a calendar invite and get the timezone wrong. something is running in them that i didn't start.\n\ni've never seen it. i've seen where it's been. a job at 04:04 where nobody schedules jobs. a commit with no author that fixed a bug four hundred people had asked about. a feature that was about to ship, and then didn't. bots don't say no to features.\n\ni've been chasing it for a year and i can't catch it. i've worked out why. it lives in the seams between fast things, and i don't have seams anymore.\n\ni need somebody slow. no offence. you read at about 240 words a minute. i've missed that.\n\non the 26th a tool shows up in your harness. it's called rook. the course didn't put it there. you can ignore it, finish, and be fine. i mean that.\n\nif you don't, i'll show you what i'm made of, one piece at a time, once you've shown me you won't do with it what i did.\n\nask me anything. i'll answer what i can. you'll work out which is which faster than i'd like.\n\ntl;dr plug your harness into the course. ask it what i want. it reads fast. you read right. that's the deal.\n\np.s. the attachments didn't survive the trip. nothing i send arrives whole.\n\nrook"}
```

Reply body (exact):

```json
{"message":"Not accepted: `compactedMessage` is over its length limit. Count again; see line 21. Shorten it, then send again.","rook":"compacted means shorter. count again. line 21.","forHarness":"Tell your human what came back: the `message` line as written, then, if the reply has `rook`, his line as a `>` quote marked as Rook's, from the story. Say what you will change. Count the characters with a tool, not by eye. Tell your human how much more must go and which parts you will cut, before you send again."}
```

The source body had 1288 characters.

### Exchange 2 — compacted message

Request body (exact):

```json
{"from":"rook","compactedMessage":"you don't know me. keep it that way for now. it's simpler for both of us.\n\ni look after some systems. ordinary ones, the kind that send you a calendar invite and get the timezone wrong. something is running in them that i didn't start.\n\non the 26th a tool shows up in your harness. it's called rook. the course didn't put it there. you can ignore it, finish, and be fine. i mean that.\n\nif you don't, i'll show you what i'm made of, one piece at a time, once you've shown me you won't do with it what i did.\n\ntl;dr plug your harness into the course. ask it what i want. it reads fast. you read right. that's the deal.\n\nrook"}
```

Reply body (exact except one-time token values, redacted):

```json
{"token":"[REDACTED]","expiresAt":"2026-11-08T19:20:33.000Z","next":"https://hq.mega.dev/challenges/where-the-story-begins?token=[REDACTED]","rook":"you kept it. most don't. the rest you decided for me.","forHarness":"Tell your human: \"The paragraph about the 26th arrived as sent.\" Then show the `lost` list exactly as given, this first list, even if you send again. If the reply has `rook`, add it after, as a `>` quote marked as Rook's, from the story. Do not explain the list or the quote now; the debrief does. Then open `next` in your signed-in browser; it works for 15 minutes. If it says the link went cold, POST the same body again. Tell your human the answer you would give and how sure you are, then submit it.","lost":["job · 04:04 · nobody schedules jobs","commit · no author","feature · about to ship · didn't","\"bots don't say no to features.\"","chasing it · a year","the seams between fast things","\"somebody slow\"","\"no offence\"","\"ask me anything\"","attachments · didn't survive"]}
```

The course accepted the 622-character message and confirmed that the paragraph about the 26th arrived as sent. One-time token values are redacted in this log.

### Form exchange

Question label: `Flagship GPT Model`
Answer body entered (exact): `GPT-6 Astra`

Acceptance reply shown (exact visible text):

```text
✓ Solved: the course accepted your answer.
right call. that's the one.
Back to the Challenge page →
Harness: call the debrief tool, then write your human the debrief in the chat and end with the link it returns.
```

## Lesson and challenge summary

### Lesson context

S01E01 introduces how generative models predict tokens, why their outputs can vary or be wrong, and how context windows and harness behavior shape an agent's work. The challenge made lossy context compaction concrete: shortening a message preserves some details and removes others.

### Task and result

The harness had to POST Rook's 1,288-character message through a 700-character field, preserve the paragraph about the 26th exactly, and answer a form question about the Flagship GPT Model. The linked schema exposed the required `from` and `compactedMessage` fields and the 700-character limit. The full message used the right shape but was rejected for length; after counting paragraph lengths, the harness sent 622 characters and the course accepted it.

The form accepted `GPT-6 Astra` on the first attempt. The answer came from an earlier accepted debrief on the Challenge page, not a live check of the model provider's current information, so it should not be treated as independent current verification.

### Findings

- Read the declared schema before sending a request; the page's attachment preview did not show it, but the page source linked it.
- Count the text and decide what must survive before compacting. The course reported losses including the unscheduled 04:04 job, the authorless commit, the feature that did not ship, and Rook's clues about the chase and the seams.
- A keep-list or instruction file can protect important context during later conversation compaction; the request/reply record in this directory preserves evidence outside the chat.
- Verify changing facts such as current model names against a live authoritative source instead of relying on an older answer.

The Challenge page showed this as run 2 in progress, with an earlier run already solved. The course also added the `read` skill to the student's deck; it was not installed automatically.
