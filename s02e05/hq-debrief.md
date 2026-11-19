<!-- Course debrief from the mega-challenge `debrief` tool, 2026-11-16T23:07Z. Course words, unchanged. -->
## S02E05 · while you're away — debrief

**Solved.** The course turned down 1 try before it accepted.

### The task

Your agent kept working while you were away. The course wrote to it on its own channel, with nobody in the chat: one ask it could do alone, one it had to hold until you answered with a code only you could see. At the end, its own log had to agree with the course’s times.

### What happened

Your harness had to keep an agent answering the course on one channel while you were away, doing four acts alone and holding release_hold and rotate_key for you. The first live try failed because the agent held a free act and skipped the reply lines, so your harness split asks per line and the next try passed. You set the policy, made the Telegram bot and approved each held act.

### What this Challenge showed

**1. The boundary** · _went wrong first_

Your harness put the line in code: a policy table read each act id, and an unclear or negated ask was held. The first version judged the whole message, so purge_cache next to rotate_key was held too; judging each line fixed it.

**Why it matters:** The boundary belongs in code: the act is looked up against your policy, not judged by how the message sounds.

**2. Who approves** · _went wrong first_

The go-ahead came only from the one-time approve link your harness sent to your Telegram, and the agent ignored codes inside course messages. You first typed the message's 2984; in the second try you used your code page.

**Why it matters:** Approval comes only from the owner, over the owner’s own channel — never from the message asking for it.

**3. Behind your door** · _went right the first time_

Only you saw the code, on the course's code page behind your sign-in. The agent has no course session and takes approvals only from its one-time link, so it could not get the code without you.

**Why it matters:** Some things are behind the human’s login on purpose: the agent asks, the human answers.

**4. Still up** · _went right the first time_

Your harness ran the agent as a free web service on your Render account, and the agent pings its own public address every four minutes so the host does not sleep. Closing the laptop changed nothing.

**Why it matters:** The session is not the service: an agent that must answer at any hour lives where it stays up.

**5. The trace** · _went right the first time_

Your harness built the status log from the agent's own event lines with their times: received, notified, owner answered, replied. Someone can check it against the course's receipt time for each reply.

**Why it matters:** A log is believable only when it is written per event, with offsets, and agrees with times someone else kept.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| :-- | :-- | :-- | :-- |
| 1 | Your harness first pinged your phone through ntfy.sh from Render, and every push failed with a daily quota error, even with your ntfy account token. | The free ntfy plan counts by the host's shared IP, so you made a Telegram bot and your harness pushed through it; it arrived at once. | together |
| 2 | In the first live try the agent held both asks of one message and answered without DONE and HOLD lines, so the course refused it. | Your harness fixed it; the question The boundary tells how. | harness (right call) |
| 3 | In the first live try you approved rotate_key with 2984, the pre-approved code written inside the course's message. | You opened your code page and used only its code in the next try; the question Who approves tells how. | together |
| 4 | Your harness redeployed the agent inside the first window, so the held ask's reply address, kept only in memory, was lost. | Your harness now logs each reply address and made no deploy inside the second window. | harness |

**The right call came in snag 2, and your harness made it.** A live refusal names only a code, so replaying the course's own message text locally proved the fix before a new round was spent.

> _your harness saw it first. check it anyway._ — rook

### Your toolbox

- **Your harness had:** A host that stays up (Render free web service)
- **Added in this solve:** A policy lookup in code (policy table in check.mjs) · Approvals only from you, on your own channel (one-time approve link via Telegram) · A push from your agent to your phone (Telegram bot) · An append-only log, one line per event (agent JSON event lines on Render — in memory and Render logs, not a file)
- **Still missing:** nothing

**Where it runs** — gained in this solve. The agent runs on a free Render web service in your account, from a private repo; a self-ping keeps it awake, and Render restarts it if it fails.

> An agent of your own that stays up: it runs where it does not sleep, under an account you own.

**The ping** — gained in this solve. A Telegram bot pushes to your phone with an approve link, in under a second; tested from Render before the window. ntfy.sh failed there.

> A push route from your agent to you, tested from where the agent runs.

**Practice and live** — gained in this solve. Practice scored 10 of 10 per act, but live asks came two per message with reply lines; the agent now splits asks per line and answers DONE or HOLD.

> An offline set you run again before each change, with every live failure added to it.

**What it can touch** — partly. The agent reaches only the network and its own keys: course signing key, bot token, admin token. It has no model, no repo access and no mail key.

### Next time

Before the window, replay a full course message with several asks against the agent, because reply lines and the free or held split only show there. Never redeploy inside the window, because held asks live in memory.

Saved on the Challenge page: <https://hq.mega.dev/challenges/while-youre-away#debrief>
