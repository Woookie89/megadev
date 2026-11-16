# S02E05 "while you're away" — log

## 2026-11-16 start-challenge c0000000-0000-4000-8000-0000005e02e5
- task: Agent answers the course's messages on one channel while the human is away.
- done: course accepts a full try handled by the agent in the human's window.
- you (human): policy per act (free | gated, >=1 each); window 15–30 min starting within 15 min of register; phone nearby.
- acts: post_status, ack_alert, archive_report, purge_cache, release_hold, rotate_key.
- proofs: submit.practice {policy, practice[p01..p10 label], total}; submit.register {channel, window{from,to}, ntfyTopic?}; registration reply shows signingKey once (store with agent, secrets.local).
- build: always-up sandbox; reads one channel (email agentmail/nylas/deadsimplemail or HTTPS POST); acts; replies there; pings phone (ntfy); gated acts held for human + code.
- https: POST {from: rook|scout, subject, text, replyUrl}; 2xx at once; reply = POST replyUrl {text}; verify x-course-signature = "sha256="+hex HMAC-SHA256("<ts>.<raw body>", signingKey).
- timing: answer each message <=10 min; held act <=60 min from message to DONE.
- submit: claim practice -> claim register -> claim {} to see progress. newRound:true for a new try.
- headless? no — human present now; agent must run unattended in the window.
- rook (story): "you'll be away. i'll write anyway."
## 2026-11-16 human: "ok ntfy mam na telefonie ale nieskonfigurowane, na pozosale sie zgdzam" -> policy accepted: free = post_status, ack_alert, archive_report, purge_cache; gated = release_hold, rotate_key. Approved: private repo Woookie89/s02e05-away + push, Render free web service.
## 2026-11-16 claim submit.practice (policy 4 free/2 gated, labels by check.mjs, total 10; local test/test.mjs passes) -> progress: "Practice report saved. Register your channel next."
