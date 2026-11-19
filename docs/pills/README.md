# Knowledge pills: working with AI and agents

Textbook-style notes collected from the MEGA.dev challenges (S01E01–S03E02) and from the local MEGA Assessment. One pill is one file and one principle, laid out as:

- **Principle**: what to do.
- **Why**: the mechanism, i.e. why it is so with models, agents or the harness.
- **Case**: how we know, with a concrete event from the course.
- **Apply**: how to use it next time.

Every pill also names the course lessons (and their chapters) it comes from, with links to the
original English notes and the Polish translation. Polish version of the pills:
[docs/pigulki/](../pigulki/README.md). Challenge debriefs are in Polish, in `docs/pl/*-debrief.md`.

As of 19.11.2026.

## How to use

- **Quick:** read "Ten principles" below.
- **Before a task of a given kind:** open the chapter (e.g. before building an agent, chapters 5 and 6).
- **Before handing work over:** [the checklist](templates/pre-handoff-checklist.md).
- **About you:** [your working patterns](work-patterns.md) from the MEGA Assessment.
- **Terms:** [glossary](glossary.md).

## Ten principles on one screen

| # | Principle | Pill |
| --- | --- | --- |
| 1 | Every context cut throws something away. Before you cut, write down what must survive. | [P01](01-context/p01-compaction-is-lossy.md) |
| 2 | Raw source is for the AI; the rendered view is for whoever judges the work. Render it and look. | [P03](01-context/p03-source-is-not-the-view.md) |
| 3 | Before "done", fetch the sources again: the world did not stand still. | [P04](01-context/p04-a-download-is-a-dated-copy.md) |
| 4 | Contract first (schema, answer shape), then send. | [P06](02-contracts-and-done/p06-contract-first.md) |
| 5 | "Done" is a check that passes, not a feeling that the work is over. | [P07](02-contracts-and-done/p07-done-is-a-check.md) |
| 6 | What must survive the session goes in a file; what must always happen goes in a skill or a hook. | [P12](03-memory/p12-chat-is-not-memory.md), [P16](03-memory/p16-durability-ladder.md) |
| 7 | Shared contract first, in sequence; then parallel, cheaper workers. | [P17](04-orchestration/p17-contract-before-parallelism.md) |
| 8 | An agent loop needs an exit condition, a limit and visible state. | [P24](05-agents-without-humans/p24-a-loop-needs-an-exit.md) |
| 9 | Code holds the trust boundary before the model sees the message. Text in data is data. | [P28](06-security/p28-data-is-not-instructions.md), [P29](06-security/p29-trust-boundary-in-code.md) |
| 10 | The human decides on accounts, public actions and money. Consent has a scope. | [P33](07-human-in-the-loop/p33-decision-rights.md), [P34](07-human-in-the-loop/p34-consent-has-scope.md) |

## All pills

### [1. Context: the model knows only what reaches it](01-context/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P01](01-context/p01-compaction-is-lossy.md) | Compaction is lossy, and you decide what gets lost | S01E01 |
| [P02](01-context/p02-conversion-to-text-is-lossy.md) | Context is text, and every conversion to text is lossy | S01E02, S03E01 |
| [P03](01-context/p03-source-is-not-the-view.md) | The source is not the view | S01E03, S03E01 |
| [P04](01-context/p04-a-download-is-a-dated-copy.md) | A download is a dated copy | S01E03, S02E01 |
| [P05](01-context/p05-check-changing-facts-at-source.md) | Check changing facts at the source, not in the model's memory | S01E01, S02E03 |

### [2. Contracts and "done"](02-contracts-and-done/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P06](02-contracts-and-done/p06-contract-first.md) | Contract first, then send | S01E01, S01E03 |
| [P07](02-contracts-and-done/p07-done-is-a-check.md) | "Done" is set by a check, not by a feeling that the work is over | S02E01, MEGA Assessment |
| [P08](02-contracts-and-done/p08-test-must-fail-first.md) | A test that was never red proves nothing | S01E05 |
| [P09](02-contracts-and-done/p09-sent-is-not-confirmed.md) | A step that waits on the other side closes when they confirm | S01E04 |
| [P10](02-contracts-and-done/p10-check-from-outside.md) | Check the result from outside, the way the recipient will see it | S02E02, S02E03, S03E01 |
| [P11](02-contracts-and-done/p11-empty-answer-is-an-error.md) | An empty answer or placeholder text is an error, not a result | S02E02 |
| [P48](02-contracts-and-done/p48-test-on-the-real-input-shape.md) | Test on the shape of real input, and add every live failure to the set | S02E05 |
| [P50](02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) | A requirement has an address and a test: cite the spot in the source, and check every accepted requirement from outside | S03E01 |

### [3. Memory outside the chat](03-memory/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P12](03-memory/p12-chat-is-not-memory.md) | Chat is not memory: write handovers to a file | S01E01, S01E02 |
| [P13](03-memory/p13-keep-finding-with-source.md) | KEEP: one line, one finding, with its source and how it was found | S01E04 |
| [P14](03-memory/p14-one-decision-one-row.md) | One decision per row; a later decision overrides only its own scope | S02E01, S03E02 |
| [P15](03-memory/p15-ask-past-sessions.md) | Ask past sessions instead of guessing, and read all of them | S01E02, S02E01 |
| [P16](03-memory/p16-durability-ladder.md) | The durability ladder: the more important the rule, the higher you write it | S01E04, MEGA Assessment |

### [4. Orchestration: many agents, one result](04-orchestration/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P17](04-orchestration/p17-contract-before-parallelism.md) | Contract first, in sequence; then parallelism | S01E04 |
| [P18](04-orchestration/p18-worktrees-and-hub-files.md) | One worktree per worker; conflicts gather in hub files | S01E04 |
| [P19](04-orchestration/p19-model-choice-and-cost.md) | Match the model to the task, and treat cost as a requirement | S01E04, S01E05, S02E02 |
| [P20](04-orchestration/p20-brief-like-an-issue.md) | A brief for a worker is like a good issue | S01E04, S02E04, S03E02 |
| [P21](04-orchestration/p21-delegate-research.md) | Delegate research, not just building | MEGA Assessment |
| [P43](04-orchestration/p43-skill-travels-with-the-job.md) | The skill travels with the job | S02E04 |
| [P44](04-orchestration/p44-normalize-before-joining.md) | Normalize before you join | S02E04 |

### [5. Agents without a human: host, loop, exits](05-agents-without-humans/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P22](05-agents-without-humans/p22-chat-is-not-a-host.md) | A chat is not a host | S01E05, S02E02, S02E05 |
| [P23](05-agents-without-humans/p23-state-outside-the-process.md) | Keep state where it survives a restart; read the source of truth live | S01E05, S02E02, S02E03, S02E05 |
| [P24](05-agents-without-humans/p24-a-loop-needs-an-exit.md) | A loop needs an exit: a condition, a limit and visible state | S02E01 |
| [P25](05-agents-without-humans/p25-providers-fail.md) | Model providers fail, so design for it | S01E05, S02E02 |
| [P26](05-agents-without-humans/p26-timing-is-behavior.md) | Timing is part of behavior | S02E02 |
| [P27](05-agents-without-humans/p27-agent-sees-its-logs.md) | The agent must see its own logs | S01E05, S02E03, S02E05 |
| [P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md) | A remote worker: plan the way there and the way home | S02E04 |
| [P46](05-agents-without-humans/p46-test-the-route-from-the-agents-host.md) | Test the route to the human from where the agent runs | S02E05 |
| [P52](05-agents-without-humans/p52-rebuild-on-every-arrival.md) | A source that keeps filling: rebuild the result on every arrival, and let quiet, not a clock, say when you are done | S03E02 |

### [6. Security: the trust boundary belongs to code](06-security/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P28](06-security/p28-data-is-not-instructions.md) | Text in data is data, not instructions | S01E05, S02E05 |
| [P29](06-security/p29-trust-boundary-in-code.md) | Code holds the trust boundary before the model sees the message | S02E02, S02E05 |
| [P30](06-security/p30-least-privilege.md) | Least privilege, declared explicitly | S01E05, S02E04 |
| [P31](06-security/p31-authenticated-requests.md) | Every request authenticated, every outbound call limited | S01E05 |
| [P32](06-security/p32-secrets-never-in-chat.md) | Secrets never go through the chat | S02E02, S02E04 |

### [7. Human in the loop](07-human-in-the-loop/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P33](07-human-in-the-loop/p33-decision-rights.md) | Decision rights are explicit | S01E03, S01E04, S03E01, MEGA Assessment |
| [P34](07-human-in-the-loop/p34-consent-has-scope.md) | Consent has a scope | S01E04 |
| [P35](07-human-in-the-loop/p35-harness-permissions.md) | Harness permissions are part of the setup: narrow them, don't widen them | S01E03, S02E01, S02E03, S03E01, MEGA Assessment |
| [P36](07-human-in-the-loop/p36-show-the-plan-first.md) | Show the plan before you publish | S01E04 |
| [P47](07-human-in-the-loop/p47-approval-over-the-owners-channel.md) | Approval comes over the owner's channel, never from the message asking for it | S02E05 |
| [P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md) | Conflicting sources don't win by rank: the owner decides, and until they answer you build only what is settled | S03E01 |
| [P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md) | A written rule sets the line of autonomy, not the voice of whoever asks: every mark cites its id | S03E02 |

### [8. The harness as a toolkit](08-harness/README.md)

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P37](08-harness/p37-missing-tool.md) | A missing tool: build a bridge, then make it permanent | S01E03 |
| [P38](08-harness/p38-skill-is-a-routine.md) | A skill is a routine that survived its first use | S01E03, S02E03, S03E01, S03E02 |
| [P39](08-harness/p39-mcp-contract-for-strangers.md) | An MCP server is a contract for a stranger client | S02E03 |
| [P40](08-harness/p40-results-have-a-budget.md) | A tool result has a byte budget | S02E03 |
| [P41](08-harness/p41-errors-say-what-to-fix.md) | A tool error tells the model what to fix | S02E03 |
| [P42](08-harness/p42-big-bytes-beside-the-model.md) | Big bytes travel beside the model, not through it | S02E03 |
| [P53](08-harness/p53-code-checks-the-model-decides.md) | Code fetches, files and checks; the model decides: keep each on its own side | S03E02 |

### Outside the chapters

- [Your working patterns (MEGA Assessment)](work-patterns.md)
- [Templates](templates/README.md): handover file, KEEP, worker brief, decision table,
  trust boundary, pre-handoff checklist, debrief section.
- [Glossary](glossary.md)

<!-- lessons:start -->
## Lesson index

Which lesson chapters stand behind which pills. The EN column links the original notes, the PL column the Polish translation.

| Episode | Lesson | Chapter (EN, original) | Chapter (PL) | Pills |
| --- | --- | --- | --- | --- |
| S01E01 | Mechanics Behind Generative AI | [Things worth knowing about LLMs](../../s01e01/s01e01-mechanics-behind-generative-ai.md#things-worth-knowing-about-llms) | [Warto wiedzieć o LLM-ach](../pl/s01e01-mechanics-behind-generative-ai.md#warto-wiedzieć-o-llm-ach) | [P05](01-context/p05-check-changing-facts-at-source.md) |
| S01E01 | Mechanics Behind Generative AI | [Mechanics of Large Language Models](../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models) | [Mechanika dużych modeli językowych](../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych) | [P01](01-context/p01-compaction-is-lossy.md), [P02](01-context/p02-conversion-to-text-is-lossy.md), [P06](02-contracts-and-done/p06-contract-first.md) |
| S01E01 | Mechanics Behind Generative AI | [Platforms and Harnesses](../../s01e01/s01e01-mechanics-behind-generative-ai.md#platforms-and-harnesses) | [Platformy i harnessy](../pl/s01e01-mechanics-behind-generative-ai.md#platformy-i-harnessy) | [P01](01-context/p01-compaction-is-lossy.md), [P36](07-human-in-the-loop/p36-show-the-plan-first.md) |
| S01E01 | Mechanics Behind Generative AI | [Generalized Steering](../../s01e01/s01e01-mechanics-behind-generative-ai.md#generalized-steering) | [Uogólnione sterowanie](../pl/s01e01-mechanics-behind-generative-ai.md#uogólnione-sterowanie) | [P21](04-orchestration/p21-delegate-research.md) |
| S01E02 | Steering Models Through Context | [Harness Personalization](../s01e02-steering-models-through-context.md#harness-personalization) | [Personalizacja harnessu](../pl/s01e02-steering-models-through-context.md#personalizacja-harnessu) | [P16](03-memory/p16-durability-ladder.md) |
| S01E02 | Steering Models Through Context | [How does the context work?](../s01e02-steering-models-through-context.md#how-does-the-context-work) | [Jak działa kontekst?](../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst) | [P01](01-context/p01-compaction-is-lossy.md), [P12](03-memory/p12-chat-is-not-memory.md) |
| S01E02 | Steering Models Through Context | [Designing and generating skills](../s01e02-steering-models-through-context.md#designing-and-generating-skills) | [Projektowanie i generowanie skilli](../pl/s01e02-steering-models-through-context.md#projektowanie-i-generowanie-skilli) | [P38](08-harness/p38-skill-is-a-routine.md) |
| S01E02 | Steering Models Through Context | [Tool use under the hood](../s01e02-steering-models-through-context.md#tool-use-under-the-hood) | [Narzędzia od podszewki](../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) | [P06](02-contracts-and-done/p06-contract-first.md), [P11](02-contracts-and-done/p11-empty-answer-is-an-error.md), [P25](05-agents-without-humans/p25-providers-fail.md), [P37](08-harness/p37-missing-tool.md), [P40](08-harness/p40-results-have-a-budget.md), [P41](08-harness/p41-errors-say-what-to-fix.md), [P42](08-harness/p42-big-bytes-beside-the-model.md) |
| S01E02 | Steering Models Through Context | [Subagents and Workers](../s01e02-steering-models-through-context.md#subagents-and-workers) | [Podagenci i workery](../pl/s01e02-steering-models-through-context.md#podagenci-i-workery) | [P20](04-orchestration/p20-brief-like-an-issue.md), [P21](04-orchestration/p21-delegate-research.md) |
| S01E03 | Building Knowledge Systems | [Text Files and Cloud Platforms](../s01e03-building-knowledge-systems.md#text-files-and-cloud-platforms) | [Pliki tekstowe i platformy chmurowe](../pl/s01e03-building-knowledge-systems.md#pliki-tekstowe-i-platformy-chmurowe) | [P03](01-context/p03-source-is-not-the-view.md) |
| S01E03 | Building Knowledge Systems | [Beyond Markdown](../s01e03-building-knowledge-systems.md#beyond-markdown) | [Poza Markdownem](../pl/s01e03-building-knowledge-systems.md#poza-markdownem) | [P03](01-context/p03-source-is-not-the-view.md) |
| S01E03 | Building Knowledge Systems | [Purpose of the knowledge bases](../s01e03-building-knowledge-systems.md#purpose-of-the-knowledge-bases) | [Cel baz wiedzy](../pl/s01e03-building-knowledge-systems.md#cel-baz-wiedzy) | [P02](01-context/p02-conversion-to-text-is-lossy.md), [P04](01-context/p04-a-download-is-a-dated-copy.md), [P13](03-memory/p13-keep-finding-with-source.md) |
| S01E03 | Building Knowledge Systems | [Broader context](../s01e03-building-knowledge-systems.md#broader-context) | [Szerszy kontekst](../pl/s01e03-building-knowledge-systems.md#szerszy-kontekst) | [P14](03-memory/p14-one-decision-one-row.md) |
| S01E04 | Working with AI Harnesses | [Harnesses](../s01e04-working-with-ai-harnesses.md#harnesses) | [Harnessy](../pl/s01e04-working-with-ai-harnesses.md#harnessy) | [P09](02-contracts-and-done/p09-sent-is-not-confirmed.md), [P18](04-orchestration/p18-worktrees-and-hub-files.md), [P35](07-human-in-the-loop/p35-harness-permissions.md) |
| S01E04 | Working with AI Harnesses | [Settings](../s01e04-working-with-ai-harnesses.md#settings) | [Ustawienia](../pl/s01e04-working-with-ai-harnesses.md#ustawienia) | [P19](04-orchestration/p19-model-choice-and-cost.md) |
| S01E05 | Building Workflows, Not Tool Stacks | [Executable Markdown vs Code](../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) | [Wykonywalny Markdown a kod](../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) | [P38](08-harness/p38-skill-is-a-routine.md), [P53](08-harness/p53-code-checks-the-model-decides.md) |
| S01E05 | Building Workflows, Not Tool Stacks | [Quality](../s01e05-building-workflows-not-tool-stacks.md#quality) | [Jakość](../pl/s01e05-building-workflows-not-tool-stacks.md#jakość) | [P08](02-contracts-and-done/p08-test-must-fail-first.md), [P10](02-contracts-and-done/p10-check-from-outside.md), [P33](07-human-in-the-loop/p33-decision-rights.md) |
| S01E05 | Building Workflows, Not Tool Stacks | [Getting remote](../s01e05-building-workflows-not-tool-stacks.md#getting-remote) | [Dostęp zdalny](../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny) | [P22](05-agents-without-humans/p22-chat-is-not-a-host.md), [P32](06-security/p32-secrets-never-in-chat.md), [P46](05-agents-without-humans/p46-test-the-route-from-the-agents-host.md) |
| S01E05 | Building Workflows, Not Tool Stacks | [System security](../s01e05-building-workflows-not-tool-stacks.md#system-security) | [Bezpieczeństwo systemu](../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu) | [P28](06-security/p28-data-is-not-instructions.md), [P31](06-security/p31-authenticated-requests.md), [P32](06-security/p32-secrets-never-in-chat.md), [P47](07-human-in-the-loop/p47-approval-over-the-owners-channel.md) |
| S02E01 | Agentic Primitives | [Agentic Loop](../s02e01-agentic-primitives.md#agentic-loop) | [Pętla agenta](../pl/s02e01-agentic-primitives.md#pętla-agenta) | [P07](02-contracts-and-done/p07-done-is-a-check.md), [P15](03-memory/p15-ask-past-sessions.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md), [P24](05-agents-without-humans/p24-a-loop-needs-an-exit.md), [P33](07-human-in-the-loop/p33-decision-rights.md), [P34](07-human-in-the-loop/p34-consent-has-scope.md), [P52](05-agents-without-humans/p52-rebuild-on-every-arrival.md) |
| S02E01 | Agentic Primitives | [Context and Memory](../s02e01-agentic-primitives.md#context-and-memory) | [Kontekst i pamięć](../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć) | [P04](01-context/p04-a-download-is-a-dated-copy.md), [P12](03-memory/p12-chat-is-not-memory.md) |
| S02E02 | Building an Agent | [Architecture](../s02e02-building-an-agent.md#architecture) | [Architektura](../pl/s02e02-building-an-agent.md#architektura) | [P30](06-security/p30-least-privilege.md) |
| S02E02 | Building an Agent | [Providers and configuration](../s02e02-building-an-agent.md#providers-and-configuration) | [Dostawcy i konfiguracja](../pl/s02e02-building-an-agent.md#dostawcy-i-konfiguracja) | [P25](05-agents-without-humans/p25-providers-fail.md) |
| S02E02 | Building an Agent | [Designing tools](../s02e02-building-an-agent.md#designing-tools) | [Projektowanie narzędzi](../pl/s02e02-building-an-agent.md#projektowanie-narzędzi) | [P05](01-context/p05-check-changing-facts-at-source.md), [P40](08-harness/p40-results-have-a-budget.md) |
| S02E02 | Building an Agent | [Workflows and long-horizon tasks](../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) | [Przepływy pracy i zadania długookresowe](../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe) | [P22](05-agents-without-humans/p22-chat-is-not-a-host.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md) |
| S02E03 | Agentic Capabilities | [Personalization](../s02e03-agentic-capabilities.md#personalization) | [Personalizacja](../pl/s02e03-agentic-capabilities.md#personalizacja) | [P07](02-contracts-and-done/p07-done-is-a-check.md), [P16](03-memory/p16-durability-ladder.md), [P35](07-human-in-the-loop/p35-harness-permissions.md) |
| S02E03 | Agentic Capabilities | [Model Context Protocol](../s02e03-agentic-capabilities.md#model-context-protocol) | [Model Context Protocol](../pl/s02e03-agentic-capabilities.md#model-context-protocol) | [P31](06-security/p31-authenticated-requests.md), [P39](08-harness/p39-mcp-contract-for-strangers.md), [P42](08-harness/p42-big-bytes-beside-the-model.md) |
| S02E03 | Agentic Capabilities | [Designing a custom MCP](../s02e03-agentic-capabilities.md#designing-a-custom-mcp) | [Projektowanie własnego MCP](../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) | [P39](08-harness/p39-mcp-contract-for-strangers.md), [P40](08-harness/p40-results-have-a-budget.md), [P41](08-harness/p41-errors-say-what-to-fix.md) |
| S02E03 | Agentic Capabilities | [Skills & Tools](../s02e03-agentic-capabilities.md#skills--tools) | [Skille i narzędzia](../pl/s02e03-agentic-capabilities.md#skille-i-narzędzia) | [P37](08-harness/p37-missing-tool.md) |
| S02E04 | Multi-Agent Collaboration | [Multi-agent architectures](../s02e04-multi-agent-collaboration.md#multi-agent-architectures) | [Architektury wieloagentowe](../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) | [P17](04-orchestration/p17-contract-before-parallelism.md), [P20](04-orchestration/p20-brief-like-an-issue.md), [P30](06-security/p30-least-privilege.md), [P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md) |
| S02E04 | Multi-Agent Collaboration | [Agent2Agent](../s02e04-multi-agent-collaboration.md#agent2agent) | [Agent2Agent](../pl/s02e04-multi-agent-collaboration.md#agent2agent) | [P43](04-orchestration/p43-skill-travels-with-the-job.md), [P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md) |
| S02E04 | Multi-Agent Collaboration | [Multi-agentic collaboration](../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) | [Współpraca wieloagentowa](../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) | [P18](04-orchestration/p18-worktrees-and-hub-files.md), [P29](06-security/p29-trust-boundary-in-code.md), [P44](04-orchestration/p44-normalize-before-joining.md) |
| S02E04 | Multi-Agent Collaboration | [Orchestration](../s02e04-multi-agent-collaboration.md#orchestration) | [Orkiestracja](../pl/s02e04-multi-agent-collaboration.md#orkiestracja) | [P17](04-orchestration/p17-contract-before-parallelism.md), [P44](04-orchestration/p44-normalize-before-joining.md) |
| S02E04 | Multi-Agent Collaboration | [Takeaways](../s02e04-multi-agent-collaboration.md#takeaways) | [Najważniejsze wnioski](../pl/s02e04-multi-agent-collaboration.md#najważniejsze-wnioski) | [P43](04-orchestration/p43-skill-travels-with-the-job.md) |
| S02E05 | Agent Reliability | [Guardrails: preventing the unpreventable](../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable) | [Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec](../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec) | [P11](02-contracts-and-done/p11-empty-answer-is-an-error.md), [P29](06-security/p29-trust-boundary-in-code.md), [P47](07-human-in-the-loop/p47-approval-over-the-owners-channel.md) |
| S02E05 | Agent Reliability | [Observability in agentic systems](../s02e05-agent-reliability.md#observability-in-agentic-systems) | [Obserwowalność w systemach agentowych](../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) | [P15](03-memory/p15-ask-past-sessions.md), [P26](05-agents-without-humans/p26-timing-is-behavior.md), [P27](05-agents-without-humans/p27-agent-sees-its-logs.md) |
| S02E05 | Agent Reliability | [Evaluation](../s02e05-agent-reliability.md#evaluation) | [Ewaluacja](../pl/s02e05-agent-reliability.md#ewaluacja) | [P08](02-contracts-and-done/p08-test-must-fail-first.md), [P10](02-contracts-and-done/p10-check-from-outside.md), [P48](02-contracts-and-done/p48-test-on-the-real-input-shape.md) |
| S03E01 | Mechanics Behind Product Engineering | [The Shift](../s03e01-mechanics-behind-product-engineering.md#the-shift) | [Zmiana](../pl/s03e01-mechanics-behind-product-engineering.md#zmiana) | [P50](02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) |
| S03E01 | Mechanics Behind Product Engineering | [Ownership](../s03e01-mechanics-behind-product-engineering.md#ownership) | [Odpowiedzialność](../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) | [P33](07-human-in-the-loop/p33-decision-rights.md), [P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md) |
| S03E01 | Mechanics Behind Product Engineering | [Judgment](../s03e01-mechanics-behind-product-engineering.md#judgment) | [Osąd](../pl/s03e01-mechanics-behind-product-engineering.md#osąd) | [P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md) |
| S03E01 | Mechanics Behind Product Engineering | [Leverage](../s03e01-mechanics-behind-product-engineering.md#leverage) | [Dźwignia](../pl/s03e01-mechanics-behind-product-engineering.md#dźwignia) | [P50](02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) |
| S03E02 | Translating Intent into Agent Work | [Product context](../s03e02-translating-intent-into-agent-work.md#product-context) | [Kontekst produktu](../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) | [P14](03-memory/p14-one-decision-one-row.md), [P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md) |
| S03E02 | Translating Intent into Agent Work | [Requirements and decomposition](../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition) | [Wymagania i dekompozycja](../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja) | [P20](04-orchestration/p20-brief-like-an-issue.md), [P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md) |
| S03E02 | Translating Intent into Agent Work | [Evaluation](../s03e02-translating-intent-into-agent-work.md#evaluation) | [Ewaluacja](../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja) | [P52](05-agents-without-humans/p52-rebuild-on-every-arrival.md), [P53](08-harness/p53-code-checks-the-model-decides.md) |
<!-- lessons:end -->

## Episode index

The debriefs are in Polish only.

| Episode | Challenge | Lesson topic | Main pills |
| --- | --- | --- | --- |
| S01E01 | [somebody slow](../pl/s01e01-somebody-slow-debrief.md) | mechanics of generative AI | [P01](01-context/p01-compaction-is-lossy.md), [P05](01-context/p05-check-changing-facts-at-source.md), [P06](02-contracts-and-done/p06-contract-first.md), [P12](03-memory/p12-chat-is-not-memory.md) |
| S01E02 | [who said what](../pl/s01e02-who-said-what-debrief.md) | steering models through context | [P02](01-context/p02-conversion-to-text-is-lossy.md), [P12](03-memory/p12-chat-is-not-memory.md), [P15](03-memory/p15-ask-past-sessions.md) |
| S01E03 | [what it shows](../pl/s01e03-what-it-shows-debrief.md) | knowledge systems | [P03](01-context/p03-source-is-not-the-view.md), [P04](01-context/p04-a-download-is-a-dated-copy.md), [P06](02-contracts-and-done/p06-contract-first.md), [P35](07-human-in-the-loop/p35-harness-permissions.md), [P37](08-harness/p37-missing-tool.md), [P38](08-harness/p38-skill-is-a-routine.md) |
| S01E04 | [before i looked](../pl/s01e04-before-i-looked-debrief.md) | working with harnesses | [P09](02-contracts-and-done/p09-sent-is-not-confirmed.md), [P13](03-memory/p13-keep-finding-with-source.md), [P16](03-memory/p16-durability-ladder.md), [P17](04-orchestration/p17-contract-before-parallelism.md), [P18](04-orchestration/p18-worktrees-and-hub-files.md), [P19](04-orchestration/p19-model-choice-and-cost.md), [P20](04-orchestration/p20-brief-like-an-issue.md), [P36](07-human-in-the-loop/p36-show-the-plan-first.md) |
| S01E05 | [answer where i asked](../pl/s01e05-answer-where-i-asked-debrief.md) | workflows | [P08](02-contracts-and-done/p08-test-must-fail-first.md), [P22](05-agents-without-humans/p22-chat-is-not-a-host.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md), [P25](05-agents-without-humans/p25-providers-fail.md), [P27](05-agents-without-humans/p27-agent-sees-its-logs.md), [P28](06-security/p28-data-is-not-instructions.md), [P30](06-security/p30-least-privilege.md), [P31](06-security/p31-authenticated-requests.md) |
| S02E01 | [found out late](../pl/s02e01-found-out-late-debrief.md) | agentic primitives | [P04](01-context/p04-a-download-is-a-dated-copy.md), [P07](02-contracts-and-done/p07-done-is-a-check.md), [P14](03-memory/p14-one-decision-one-row.md), [P15](03-memory/p15-ask-past-sessions.md), [P24](05-agents-without-humans/p24-a-loop-needs-an-exit.md), [P35](07-human-in-the-loop/p35-harness-permissions.md) |
| S02E02 | [nobody asked](../pl/s02e02-nobody-asked-debrief.md) | building an agent | [P10](02-contracts-and-done/p10-check-from-outside.md), [P11](02-contracts-and-done/p11-empty-answer-is-an-error.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md), [P25](05-agents-without-humans/p25-providers-fail.md), [P26](05-agents-without-humans/p26-timing-is-behavior.md), [P29](06-security/p29-trust-boundary-in-code.md), [P32](06-security/p32-secrets-never-in-chat.md) |
| S02E03 | [schema first](../pl/s02e03-schema-first-debrief.md) | agentic capabilities, MCP | [P05](01-context/p05-check-changing-facts-at-source.md), [P10](02-contracts-and-done/p10-check-from-outside.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md), [P27](05-agents-without-humans/p27-agent-sees-its-logs.md), [P35](07-human-in-the-loop/p35-harness-permissions.md), [P38](08-harness/p38-skill-is-a-routine.md), [P39](08-harness/p39-mcp-contract-for-strangers.md), [P40](08-harness/p40-results-have-a-budget.md), [P41](08-harness/p41-errors-say-what-to-fix.md), [P42](08-harness/p42-big-bytes-beside-the-model.md) |
| S02E04 | [two places](../pl/s02e04-two-places-debrief.md) | multi-agent collaboration | [P20](04-orchestration/p20-brief-like-an-issue.md), [P30](06-security/p30-least-privilege.md), [P32](06-security/p32-secrets-never-in-chat.md), [P43](04-orchestration/p43-skill-travels-with-the-job.md), [P44](04-orchestration/p44-normalize-before-joining.md), [P45](05-agents-without-humans/p45-remote-worker-way-there-and-back.md) |
| S02E05 | [while you're away](../pl/s02e05-while-youre-away-debrief.md) | agent reliability | [P22](05-agents-without-humans/p22-chat-is-not-a-host.md), [P23](05-agents-without-humans/p23-state-outside-the-process.md), [P27](05-agents-without-humans/p27-agent-sees-its-logs.md), [P28](06-security/p28-data-is-not-instructions.md), [P29](06-security/p29-trust-boundary-in-code.md), [P46](05-agents-without-humans/p46-test-the-route-from-the-agents-host.md), [P47](07-human-in-the-loop/p47-approval-over-the-owners-channel.md), [P48](02-contracts-and-done/p48-test-on-the-real-input-shape.md) |
| S03E01 | [status for the night](../pl/s03e01-status-for-the-night-debrief.md) | product engineering | [P02](01-context/p02-conversion-to-text-is-lossy.md), [P03](01-context/p03-source-is-not-the-view.md), [P10](02-contracts-and-done/p10-check-from-outside.md), [P33](07-human-in-the-loop/p33-decision-rights.md), [P35](07-human-in-the-loop/p35-harness-permissions.md), [P38](08-harness/p38-skill-is-a-routine.md), [P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md), [P50](02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) |
| S03E02 | [nothing ships unmarked](../pl/s03e02-nothing-ships-unmarked-debrief.md) | translating intent into agent work | [P04](01-context/p04-a-download-is-a-dated-copy.md), [P07](02-contracts-and-done/p07-done-is-a-check.md), [P14](03-memory/p14-one-decision-one-row.md), [P20](04-orchestration/p20-brief-like-an-issue.md), [P33](07-human-in-the-loop/p33-decision-rights.md), [P38](08-harness/p38-skill-is-a-routine.md), [P49](07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md), [P51](07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md), [P52](05-agents-without-humans/p52-rebuild-on-every-arrival.md), [P53](08-harness/p53-code-checks-the-model-decides.md) |
| — | MEGA Assessment | your working patterns | [chapter 9](work-patterns.md) |

## How to add a pill

The full procedure is in [docs/README.md](../README.md) (in Polish). In short: every new or
changed pill is updated in both languages, `docs/pigulki/` and `docs/pills/`, with the same
number, its lesson references, and rows in the chapter table and in this README.
