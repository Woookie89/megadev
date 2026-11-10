# S01E04 "before i looked" — handover (2026-11-09 → next session)

Read [KEEP.md](KEEP.md) first (sourced findings), then [challenge-log.md](challenge-log.md) (course replies).
Repo clone: [s01e04-rig-handover/](s01e04-rig-handover/) · GitHub: https://github.com/Woookie89/s01e04-rig-handover

## Where we stopped

The plan-to-issues skill is at step 3: the split table below was shown to the human. **The human has not approved it yet.** Nothing is on GitHub except the repo itself: no label, no issues, no commits. Source: KEEP.md (last finding).

## Done so far

1. list-challenges → S01E04 not solved; start-challenge called (source: challenge-log.md).
2. Human said yes to: a public repo from the template + pushes and issue work inside it, and to pnpm. They chose Netlify as the host, to set up later (source: human).
3. Repo created and cloned. `.env` set with LANE_MARKER. `.claude/skills` junction → `.agents/skills`. Install, tests and typecheck are green (source: KEEP.md findings + receipts).

## Proposed split (shown, NOT approved)

Label on all: `plan:morning-digest`. Source: plan.md sections, read in the clone.

| # | Title | Source | Done when | Blocked by | Worker model |
|---|---|---|---|---|---|
| 1 | Digest types: `DigestRow` + `readNight` signature | § 1 | typecheck passes, committed on main | — | strongest |
| 2 | Run log reader | § 1 | reader tests pass on 2026-10-28 (5 jobs, 1 bad line) | #1 | strongest |
| 3 | Digest page `GET /digest/:night` | § 2a | `/digest/2026-10-28` renders locally | #1 start · #2 done | cheaper |
| 4 | Digest JSON `GET /api/digest/:night` | § 2b | same jobs, same order as page | #1 start · #2 done | cheaper |
| 5 | Board links to digests | § 2c | both nights link to a digest that renders | #1 start · #2 done | cheaper |
| 6 | Route tests for page + JSON | § 2d | `pnpm test` green with new tests | #3, #4 | cheaper |
| 7 | Preview for review | § 3 | preview link sent to reviewer | #3 | main + human |
| 8 | Clean up preview + close plan | § 4 | link no longer shows marker | #7 | main + human |

## Open questions for the human

1. Approve the split, or say what to change.
2. § 2c counts: count log lines by status (2026-10-28 → ok 10 / retry 4 / fail 1), or count jobs by last status (ok 4 / retry 0 / fail 1)? Recommended: log lines. **Correction:** the chat message said "11 ok". A count I ran later says 10 (source: KEEP.md receipts).
3. Every issue must carry: first line `Source: plan.md § <n>` + label (both required by the course), plus Scope / Done when / Blocked by / Suggested worker? The human has not confirmed yet.

## Recommendations (harness's proposal; the human decides)

1. **Split: approve it as it is.** § 1 is split into #1 (types) and #2 (reader) because the plan says to commit `src/digest/types.ts` first (plan.md § 1). With #1 merged, #3–#6 can go to parallel workers.
2. **§ 2c: count log lines by status.** The board shows what happened that night, and the retries are the signal. Counting by job's last status hides them: 0 retry, even though fixtures/refresh retried 3×.
3. **Issue contents:** keep the required first line `Source: plan.md § <n>` + label `plan:morning-digest`. Add Scope / Done when / Blocked by (per ADR 0002) and Suggested worker (model + effort, matching the AGENTS.md closing comment).
4. **Workers:** do #1 and #2 in the main session with the strongest model, because the logic and the contract matter. Send #3–#6 to subagents on Sonnet or Haiku with low effort, each in its own git worktree, following AGENTS.md step 3.
5. **Preview:** Netlify, one site, with a fixed name (e.g. `rig-preview-<something>`), so § 4 uploads over the same link. Keep the HTML file outside the repo (`s01e04/preview/`), because ADR 0003 forbids previews in the repo.

## How to continue (commands)

**Option A — new session (recommended).** It starts clean and reads KEEP.md + HANDOVER.md:

```sh
cd C:\projects\megadev
claude
```

Or in VS Code: open a new Claude Code chat in the `megadev` folder. Then paste the prompt from the last section of this file.

**Option B — resume this exact conversation:**

```sh
cd C:\projects\megadev
claude --continue
```

Or in VS Code: open conversation history in the Claude Code panel and pick this session. Then say: "kontynuujemy S01E04, odpowiedzi na pytania: …".

**After you answer the questions**, the harness runs these. Shown here so you can check them:

```sh
cd C:\projects\megadev\s01e04\s01e04-rig-handover
gh label create plan:morning-digest -R Woookie89/s01e04-rig-handover --description "Plan: morning digest" --color 0e8a16
gh issue create -R Woookie89/s01e04-rig-handover --title "<title>" --label plan:morning-digest --body-file <tmp.md>   # ×8, in order #1 → #8
```

**Later (§ 3, only you can do this):** log in to Netlify once in the browser:

```sh
npx netlify-cli login
```

## Next steps

1. Get answers to the 3 open questions.
2. Create the label `plan:morning-digest`, then issues #1–#8 in dependency order with `gh issue create --body-file`. Record the URLs from gh's output.
3. Commit `pnpm-lock.yaml` with the first issue (#1). Build #1 → #2 on main. Then send subagents for #3–#6 in parallel on branches/worktrees with a cheaper model. Close each issue with the AGENTS.md closing comment.
4. Netlify: the human runs `npx netlify-cli login`. Ask before the first deploy. Save the page with a command (for example `curl localhost:8787/digest/2026-10-28 > ../preview/index.html`, kept outside the repo). Deploy to one site and record the https link.
5. claim-challenge with `{repo: "Woookie89/s01e04-rig-handover", preview: "<netlify https link>"}` and receipt `laneMarker: sstj-gtro`. Follow the reply: the reviewer may answer later.
6. § 4: ask the human, then re-save with LANE_MARKER unset and deploy over the same link. Move plan.md to `docs/plans/done/` with its issue list. Then debrief.

Run pnpm as `corepack pnpm <cmd>`. `corepack enable` fails with EPERM.

## Prompt to paste in the new session

```
Kontynuujemy challenge S01E04 "before i looked" z MEGA.dev (uuid c0000000-0000-4000-8000-0000005e01e4).
Jesteś moim harnessem. Najpierw przeczytaj C:\projects\megadev\s01e04\KEEP.md, potem HANDOVER.md i challenge-log.md w tym katalogu.
Wywołaj resume-challenge z tym uuid i receiptem laneMarker z KEEP.md. Potem pokaż mi jeszcze raz otwarte pytania i swoje rekomendacje z HANDOVER.md i czekaj na moje odpowiedzi, zanim cokolwiek opublikujesz.
Przed każdą akcją na zewnątrz (deploy na Netlify, nowe konto, wydatki) pytaj mnie.
```
