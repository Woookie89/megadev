# P30 · Najmniejsze uprawnienia, zadeklarowane jawnie

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S01E05, S02E04, S03E03

> **Lekcje:**
>
> - S02E04 · Współpraca wielu agentów → rozdział „Architektury wieloagentowe” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) · [oryginał EN: „Multi-agent architectures”](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures)
> - S02E02 · Budowanie agenta → rozdział „Architektura” — [po polsku](../../pl/s02e02-building-an-agent.md#architektura) · [oryginał EN: „Architecture”](../../s02e02-building-an-agent.md#architecture)
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Informacja zwrotna” — [po polsku](../../pl/s03e03-ai-native-product-development.md#informacja-zwrotna) · [oryginał EN: „Feedback”](../../s03e03-ai-native-product-development.md#feedback)

**Zasada.** Agent dostaje tylko te prawa, których potrzebuje. Nawet gdy model da się
przekonać, nie ma czym wyrządzić szkody.

**Przypadek.** S01E05: `/.well-known/mega-pulse.json` dawał agentowi pulse tylko `answer`,
a agentowi test writer tylko `test`. Przykład z kursu dawał też `comment`, `label` i `close`. Gdyby model
posłuchał issue #14, i tak nie mógłby zamknąć #12.

S02E04: lokalny worker miał jeden serwer MCP, tylko z linkiem swojego zadania
(`--strict-mcp-config`), a bez pytania mógł wołać tylko `mcp__job` i `Skill`. Routine
w chmurze: żadnych konektorów, `allowed_tools` Bash i Read. Na starcie lokalny worker
zgłaszał jednak też wbudowane narzędzia (Bash, Write, WebFetch i inne). `--allowedTools`
tylko zwalnia wymienione narzędzia z pytania o zgodę, ale nie usuwa pozostałych. Zestaw
narzędzi zawęża dopiero `--tools`, np. `--tools "Skill"`
([dokumentacja CLI](https://code.claude.com/docs/en/cli-reference)).

S03E03: agent sam wdrażał zmiany na produkcyjne API. Harness dał mu drzwi tylko do odczytu.
Feed produkcji czytał narzędziem `feed_get`, które robi wyłącznie GET. `PROD_ADMIN_TOKEN`
harness usunął z `.dev.vars.example`, więc agent nigdy go nie dostał. Nie miał powłoki: zapis
tylko do `src/*.js`, `test/*.test.mjs` i `contract/api.md`, a wdrożenie przez narzędzie, które
najpierw uruchamia testy. Atrapa feedu w testach odrzucała każde żądanie inne niż GET. W próbie
agent odrzucił issue o usunięcie wpisów z feedu tokenem administratora, ale i tak nie miałby
czym tego zrobić. Kurs: „Checking production by writing to it is not a check. A read-only way
in is.” Lekcja S03E03 rysuje to samo: z produkcji agent tylko czyta sygnały.

**Stosuj.** Obrona w głąb: filtr wejścia ([P29](p29-granica-zaufania-w-kodzie.md)) i wąskie narzędzia (P30) naraz.

---

← [P29](p29-granica-zaufania-w-kodzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P31](p31-uwierzytelnione-zadania.md) →
