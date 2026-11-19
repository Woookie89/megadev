# S03E03 "out of office" — log

## 2026-11-19 start-challenge c0000000-0000-4000-8000-0000005e03e3

- task: from the starter (sched-prod API), set up an agent that runs on a host without the human for the whole round. ~20 min of issues on the course tracker; agent picks each up (<5 min: comment/label/record/ship line naming it), ships to our live https address, asks the owner only owner's calls (on the round page), keeps a ship log on the tracker. Works each issue from our triage skill, grown to run alone.
- done: after every issue arrived and agent delivered, claim { round, url } accepted.
- you (human): sign-ins and keys asked for; keep round page open and answer questions there; after round opens, change no code.
- proofs: `round` receipt from the first claim { open: true } -> final claim answer.round (NOT in receipts).
- build: starter https://hq.mega.dev/media/out-of-office/sched-prod-api-beb82817.zip (sha256 beb82817..., 6770 B), with AGENTS.md + contract.
- submit: claim { open: true } when agent + starter deployed -> tracker address, agent token, round page, production feed. Then claim { round, url } (url = https, standard port).
- skill: grow .agents/skills/triage (S03E02) so the agent runs it alone: what to read first, when to build / decline / ask owner, ship line format.
- headless? no — human present (round needs the human on the round page).
- 11:30Z human: "ok, to wlacz sobie tam ten worker bo juz sa a klucz wez do open router, tam gdzies uzywalismy juz chyba s01e05 albo w s02 gdzies" -> host Cloudflare Workers (woookie89), model via OpenRouter key from earlier challenge.
- starter -> s03e03/api (own git). Removed PROD_ADMIN_TOKEN from .dev.vars.example (agent never gets it). wrangler.toml: [env.production.vars] FEED_URL (top-level vars are not inherited by env).
- pre-round: test/run.mjs harness (mock feed, refuses any non-GET to the feed); /incidents sorted newest first per contract (starter passed feed order through).
- skill triage grown: section 5 'Running alone' (read order, pickup by code, build/decline/ask table, ship steps, never-list).
