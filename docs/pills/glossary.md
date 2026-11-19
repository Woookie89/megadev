# Glossary

| Term | Meaning |
| --- | --- |
| harness | The program that wraps the model: tools, instruction files, skills, hooks, permissions. Here Claude Code and Codex. |
| context window | Everything the model sees in one call. Outside it, the model knows nothing. |
| compaction | Shortening the conversation when the context fills up. Lossy ([P01](01-context/p01-compaction-is-lossy.md)). |
| agent loop | The model calls a tool, gets a result, decides what next, until it stops calling tools. |
| subagent | A separate model instance with its own context and brief. It cannot see the parent's conversation. |
| worktree | A separate checkout of the same repo in another folder, so parallel writes do not mix. |
| skill | A file describing a routine, which the harness loads when a task calls for it. |
| hook | A script the harness runs on an event (e.g. `Stop`); it can block the action. |
| MCP | Model Context Protocol: the standard a server uses to expose tools to any AI client. |
| prompt injection | Text in data posing as an instruction for the model ([P28](06-security/p28-data-is-not-instructions.md)). |
| least privilege | The agent has only the rights it needs ([P30](06-security/p30-least-privilege.md)). |
| idempotency | Repeating the same request does not change the result (dedup by id). |
| ticket / receipt | Course proofs: a ticket from starting a challenge, a receipt for an accepted step. They expire. |
| claim | Submitting a solution to the course. A refusal usually does not say why. |
| brief | A job handed to another agent: the task, what done means, the skill, the access and how the result comes back ([P20](04-orchestration/p20-brief-like-an-issue.md)). |
| worker | An agent the main agent gives one job to. It has its own context and its own tools ([P43](04-orchestration/p43-skill-travels-with-the-job.md)). |
| headless mode (`claude -p`) | Claude Code run without its interface: it takes a prompt, works alone and prints the result. |
| routine | A Claude Code job run in Anthropic's cloud (claude.ai/code): once, on a schedule or on an event. |
| sandbox | An isolated place where an agent runs. It has only the files, tools and network access it was given. |
| allowlist | A list of allowed domains (or commands). Everything else is blocked ([P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md)). |
| lane | A marker the course gives a student when a challenge starts (`laneMarker`). In S01E04 it went into `.env` as `LANE_MARKER` and had to show on the published page ([P10](02-contracts-and-done/p10-check-from-outside.md)). |
| free / gated | The split of the agent's acts in S02E05: a free act the agent does alone, a gated act it holds until the owner approves ([P47](07-human-in-the-loop/p47-approval-over-the-owners-channel.md)). |
| requirement tag | A short id for one requirement, e.g. `R-K8L`. In S03E01 every tag got a source: the file and the spot in it (a second in a recording or a region of an image) ([P50](02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md)). |
| owner question (`ownerQuestion`) | One question that names both sides of a conflict. The agent asks it; the product owner decides ([P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md)). |
| contact sheet | One image with many frames of a recording in a grid, e.g. one frame per second. It shows what was on screen without watching the whole video ([P02](01-context/p02-conversion-to-text-is-lossy.md)). |
| canvas | A page element a script draws pixels on. Drawn text is not in the HTML, so you read it from a screenshot ([P03](01-context/p03-source-is-not-the-view.md)). |
| `workers.dev` subdomain | The account's address on Cloudflare Workers (`<name>.workers.dev`). You register it once per account, before the first public deploy ([P35](07-human-in-the-loop/p35-harness-permissions.md)). |
| triage | Deciding each request against what is already in the tracker and the rules: merge it, close it with a reason, file a new issue, or hand it to a person ([P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md)). |
| `agent-ready` / `needs-human` | The two marks of an open issue in S03E02: an agent ships it alone (with an `Allowed by AUT-1` line), or it waits for a person to decide (a question with options, a recommendation and a reason) ([P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md)). |
| `blocked-by` | An issue field: the issues that must be done first. These dependencies set the order of work, not urgency ([P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md)). |
| cursor poller | A script that asks a channel for new items every few seconds, passing the cursor (`since`) from the previous reply, so it gets only what came after ([P52](05-agents-without-humans/p52-rebuild-on-every-arrival.md)). |
| egress IP | The address a server uses to reach the internet. Free hosts share it with many customers, so a per-IP quota can be used up by others ([P46](05-agents-without-humans/p46-test-the-route-from-the-agents-host.md)). |
| decision record | A short entry for one product decision in a fixed format (like an ADR): the ask, options, a recommendation, the cost of being wrong, a reopen threshold, the decision. It has a status (`proposed`, `accepted`) and the owner's signature. It binds only once accepted and signed ([P55](07-human-in-the-loop/p55-only-a-signed-record-binds.md)). |
| reopen threshold | A field of a decision record: the evidence that would reopen the decision, e.g. user behaviour or a written legal need. Without it the agent does not reopen the decision ([P55](07-human-in-the-loop/p55-only-a-signed-record-binds.md)). |
| ship log / ship line | The delivery log on the S03E03 tracker: one line per issue, `#<issue> · <verb> · live: ✓\|✗ · open risks: …`. `live: ✓` only after the change is read from the live address ([P10](02-contracts-and-done/p10-check-from-outside.md)). |
| rehearsal (mock tracker) | A run of the agent against a local fake tracker and feed, with a dry deploy, before the real round. In S03E03 it caught a host bug but not the record mistake, because it had no such issue ([P54](01-context/p54-the-agent-decides-from-what-it-is-given.md)). |
| supervisor | A separate process that watches a background agent: it restarts it after every exit and stops when a flag file is removed ([P23](05-agents-without-humans/p23-state-outside-the-process.md)). |
| replay (the course's checker) | A course script that uses the deployed page like a person (looks, aims, clicks a moment later) and prints a JSON result. In S03E04 the nonce letters chose the checks, and the result went with the step-two claim ([P58](02-contracts-and-done/p58-the-checker-is-a-spec.md)). |
| keyed render | A list refresh that knows rows by id: rows already on screen stay in the DOM, only new ones are added, and only what changed is changed. The opposite of rebuilding the whole list through `innerHTML`, which makes it blink ([P58](02-contracts-and-done/p58-the-checker-is-a-spec.md)). |
| `evidence` block | A JSON block at the end of a report that carries the proof in fields: the flow, the `mm:ss` moment, `expected` (what should happen), `got` (what happened), the build sha, the recording link and a receipt ([P57](02-contracts-and-done/p57-a-proof-names-its-build-and-moment.md)). |
| build stamp (build sha) | A short commit hash written into the page (`<meta name="build">`, the footer), so a recording and a proof say which build they show. In S03E04 it is the last commit that changed `app/` ([P57](02-contracts-and-done/p57-a-proof-names-its-build-and-moment.md)). |
| system diff | A summary for a person: what changed in behaviour, UX and data against the plan, which decisions were made and which are waiting. In S03E04 a required section of the step-two report ([P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md)). |

---

[← all pills](README.md)
