# P30 · Najmniejsze uprawnienia, zadeklarowane jawnie

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S01E05, S02E04

> **Lekcje:**
> - S02E04 · Współpraca wielu agentów → rozdział „Architektury wieloagentowe” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) · [oryginał EN: „Multi-agent architectures”](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures)
> - S02E02 · Budowanie agenta → rozdział „Architektura” — [po polsku](../../pl/s02e02-building-an-agent.md#architektura) · [oryginał EN: „Architecture”](../../s02e02-building-an-agent.md#architecture)

**Zasada.** Agent dostaje tylko te prawa, których potrzebuje. Nawet gdy model da się
przekonać, nie ma czym wykonać szkody.

**Przypadek.** S01E05: `/.well-known/mega-pulse.json` dawał pulse tylko `answer`, a test
writerowi tylko `test`. Przykład z kursu dawał też `comment`, `label` i `close`. Gdyby model
posłuchał issue #14, i tak nie mógłby zamknąć #12.

S02E04: lokalny worker miał jeden serwer MCP, tylko z linkiem swojego zadania
(`--strict-mcp-config`), a bez pytania mógł wołać tylko `mcp__job` i `Skill`. Routine
w chmurze: zero konektorów, `allowed_tools` Bash i Read. Init lokalnego workera wymieniał
jednak też wbudowane narzędzia (Bash, Write, WebFetch i inne). `--allowedTools` zatwierdza
z góry, ale nie usuwa reszty, więc lista zgód to nie lista narzędzi. Dokumentacja CLI to potwierdza: narzędzia usuwa dopiero `--tools` (np. `--tools "Skill"`), a `--allowedTools` tylko omija pytanie o zgodę ([cli-reference](https://code.claude.com/docs/en/cli-reference)).

**Stosuj.** Obrona w głąb: filtr wejścia ([P29](p29-granica-zaufania-w-kodzie.md)) i wąskie narzędzia (P30) naraz.

---

← [P29](p29-granica-zaufania-w-kodzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P31](p31-uwierzytelnione-zadania.md) →
