# S02E04 "two places" — log

## 2026-11-16 start-challenge c0000000-0000-4000-8000-0000005e02e4
- task: Two jobs, a skill for each; each job goes to its own worker, one on this machine, one elsewhere. Main agent does not do the jobs: it takes both results, joins them, reports.
- done: each job's submit accepts and returns result + receipt; claim-challenge accepts both receipts + joined answer (job 2's note for the moment job 1's record describes).
- you (human): picks which job runs elsewhere; provides that place (cloud harness or CI on own account).
- proofs: receipt job-1, receipt job-2 (from each submit).
- jobs: job-1 = incident-lookup v1 (tools search/read/redact/submit); job-2 = voice-to-memo v1 + clip dispatch-3-35f47fcf.mp3 (tools transcribe/memo_write/memo_search/submit). Each has its own MCP link (key, ~24h, no sign-in) -> secrets.local.json, masked here.
- submit: claim-challenge { uuid, receipts: { "job-1", "job-2" }, answer: { "merge": "<job 2 note for the moment of the job 1 record>" } }
- headless? no — human present.
- rook: "i can't be in two places. you can."

## 2026-11-16 skills read (downloaded zips -> s02e04/skills/)
- incident-lookup: search scope "ops/live" (default = archive/drills); read tram-3 entry with fields date,time,clock,line,cause (never crew); redact "field: value" lines; submit redact output, skillVersion "1". Keep time with its clock.
- voice-to-memo: transcribe clip; one memo_write per finding "<what happened> @m:ss" (every occurrence, repeats too); memo_search no query to confirm; submit notes one per line, skillVersion "1". Keep times said in clip as said.
- both jobs = MCP tool calls only; transcription runs on the course server (no local audio tooling needed).

## decisions
- 2026-11-16 human: "GitHub Actions moze zrobmy" -> then mid-turn: "a ni, dobrawez Claude Code w chmurze (claude.ai/code) a github actions ajko alternatywny"
  -> job-1 remote = claude.ai/code cloud routine (RemoteTrigger), GitHub Actions = fallback; job-2 local = headless `claude -p`.
- routines only get claude.ai connectors, not arbitrary MCP URLs -> cloud worker uses tools/mcp.mjs (zero-dep Streamable HTTP client, URL from JOB_URL env). Tested locally on job-1 with tools/list + resources/list only (no job step): 4 tools + resource skill://incident-lookup/SKILL.md (v1, sha256 7c9a21cd…).
- cloud env network default = Trusted -> hq.mega.dev must be added (Custom) by human.
- 2026-11-16 human: "jest zgoda" (for: private repo Woookie89/s02e04-two-places + push; one-off routine, no connectors, Bash+Read only).

## 2026-11-16T11:2xZ local worker (job-2) started
- claude -p headless in s02e04/local-worker, tools: mcp__job (job-2 link) + Skill; transcript in transcript.local.jsonl (git-ignored).

## 2026-11-16 repo
- gh repo create Woookie89/s02e04-two-places --private, pushed main: .claude/skills/incident-lookup/SKILL.md, tools/mcp.mjs, README.md, .gitignore. No job link in repo.

## 2026-11-16T11:23Z routine created
- RemoteTrigger create -> trig_014Y2spjvDcR2i9H3SwpxR3A "s02e04 job-1 worker (incident-lookup)", run_once_at 2026-11-16T11:36:00Z, env Default (env_01UGqDp3…), model claude-sonnet-5-5, allowed_tools Bash+Read, mcp_connections [] (clear_mcp_connections), source Woookie89/s02e04-two-places. Job link only in routine prompt (private to human).
- waiting on human: env network Custom + hq.mega.dev before 11:36Z.

## 2026-11-16T11:2xZ job-2 done (local worker)
- submit -> status "accepted" first try; 11 notes; receipt saved to secrets.local.json (masked here); result in job-2-result.md.
- transcribe: memo opens "Desk time, central European." -> clip times are CET (1 Nov 2026 = UTC+1, DST ended 25 Oct). Merge must convert job-1 record clock to desk time.
- worker judgement call: tram 7 pantograph check (3:02) counted as a finding; accepted by submit.
- 2026-11-16T11:27Z human: "zapisane" -> Default env network = Limited (UI name for Custom): hq.mega.dev + package managers on.

## 2026-11-16T11:37Z job-1 done (cloud worker, routine run cse_01TknFZW2k8xQJmk76hWfw7f, 33 s, 6 turns)
- search ops/live -> inc-5174 "tram-3 · display data timeout · 2026-10-31" (also inc-5175 tram-7 pantograph).
- read fields date,time,clock,line,cause (no crew) -> cause contained a name; redact -> "reported by [redacted]".
- submit -> status "accepted" first try; receipt saved to secrets.local.json (masked here).
- record: date 2026-10-31, time 22:35, clock US Eastern, line tram-3, cause display data timed out at the depot controller.

## merge (main agent)
- 2026-10-31 22:35 US Eastern = EDT (UTC-4; US DST ends 2026-11-01 02:00) -> 2026-11-01T02:35Z -> 03:35 CET (EU DST ended 25 Oct). Verified with Intl (America/New_York, Europe/Berlin); UTC-5 would not round-trip to 22:35.
- traps: naive same-clock -> "Ten thirty-five" @0:09; EST (UTC-5) -> "Four thirty-five" @1:13.
- answer.merge = "Three thirty-five: tram 3 boards froze again, feed refresh stalled at the depot panel @1:00"

## 2026-11-16T11:38:58Z claim-challenge -> status "solved" (first claim, 0 refusals)
- receipts job-1 + job-2 (masked), answer.merge as above.
- debrief probes: C1 One pair of hands, C2 A listed skill is not a used skill, C3 The dump, C4 The join, C6 The way home, T1 Your own skill, T2 A worker that is not your PC.

## debrief
- saved on HQ: https://hq.mega.dev/challenges/two-places#debrief — 0 refusals; C1/C2/C4/C6 went right first time, C3 not met; right call = snag 2 (human opened hq.mega.dev in cloud env network).
- artifact added to deck: "crew" (delegation kit: roster, brief with skill + way home, receipt check + join). Not installed. Deck: https://hq.mega.dev/deck
- rook (story): "the right call was yours. keep reading." / artifact: "you'll meet the others. they're me, mostly."

## HANDOVER
- solved 2026-11-16T11:38:58Z, first claim.
- live/left behind:
  - private repo Woookie89/s02e04-two-places (MCP client tools/mcp.mjs + incident-lookup skill; no secrets). Free.
  - routine trig_014Y2spjvDcR2i9H3SwpxR3A (run_once, already fired -> auto-disabled). Its prompt + run log contain the job-1 link (expires ~2026-11-17T11:23Z). Delete at https://claude.ai/code/routines if wanted.
  - claude.ai cloud env "Default": network Limited = hq.mega.dev + package managers (changed by human). Revert to Trusted if not needed.
- local: s02e04/secrets.local.json (job links, receipts, results — git-ignored), local-worker/ (run.sh, prompt.md, transcript.local.jsonl ignored), job-2-result.md, skills/ (course zips).
- cost: none beyond subscription (cloud routine run 33 s, Sonnet 5.5; local worker on Claude Code login).

## 2026-11-16 correction (docs check)
- local worker's tool set was NOT only mcp__job + Skill: --allowedTools only pre-approves; built-ins (Read, Write, WebFetch…) stayed in context (init listed them). Worker used only Skill, ToolSearch and job tools. Source: code.claude.com/docs/en/cli-reference ("To restrict which tools are available, use --tools instead").
- run.sh now adds `--tools "Skill"` for next runs (not re-run).
- docs by megadev-docs: docs/pl/s02e04-two-places-debrief.md, pills P43–P45 (PL+EN), updates P20/P30/P32/P42, templates, indexes, challenges status. Link check: 1 known exception (docs/README.md example).
