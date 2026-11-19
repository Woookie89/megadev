# P20 · Brief dla workera jest jak dobre issue

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04, S02E04, S03E02

> **Lekcje:**
>
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Podagenci i workery” — [po polsku](../../pl/s01e02-steering-models-through-context.md#podagenci-i-workery) · [oryginał EN: „Subagents and Workers”](../../s01e02-steering-models-through-context.md#subagents-and-workers)
> - S02E04 · Współpraca wielu agentów → rozdział „Architektury wieloagentowe” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) · [oryginał EN: „Multi-agent architectures”](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Wymagania i dekompozycja” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja) · [oryginał EN: „Requirements and decomposition”](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition)

**Zasada.** Worker nie dziedziczy rozmowy. Brief musi zawierać wszystko, czego worker nie
widzi: źródło, zakres, „gotowe, gdy”, blokady i warunki stopu.

**Przypadek.** S01E04, kształt issue: `Source: plan.md § <n>`, `Scope`, `Done when`,
`Blocked by`, `Suggested worker`. Komentarz zamykający: `done: …` / `worker: <harness> ·
<model> · <effort>` / `commit: <sha>`. Dzięki temu śladowi agent od #7 zauważył, że w
komentarzu do #4 wpisano zły model (`haiku-4.5` zamiast `haiku-5.5`). Workery mogą
sprawdzać się nawzajem, jeśli zostawiają ślad.

S02E04: brief każdego workera miał jedno zadanie, nazwę i wersję skilla, jedyne narzędzia
(serwer MCP zadania), limit prób („retry at most once after fixing what it names”) i sposób
oddania wyniku: zakończ pracę wiadomością ze znacznikiem `JOB2_SUBMIT_REPLY:` (zdalnie `JOB1_SUBMIT_REPLY:`)
i całą odpowiedzią `submit`. Oba workery oddały wynik za pierwszym razem, a główny agent
o nic nie dopytywał ([P43](p43-przekaz-skill-z-zadaniem.md),
[P45](../05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md)).

S03E02: issue `agent-ready` w trackerze to brief, z którego agent zrobi zmianę bez pytania
człowieka. Format: Intent, Acceptance (Given / When / Then, w tym co najmniej jeden przypadek
„then … not …”), Boundaries („Must not touch …”, z każdym „zostaw, jak jest” od klienta)
i linia `Allowed by AUT-1 (…)`. Pierwsza budowa trackera zatrzymała cztery briefy bez
przypadku „not” (`acceptance has no "not" case`), np. SCHED-4465 (nagłówek Retry-After).
Dopisana linia: „Given a caller under its limit, when it calls the API, then the reply does not
carry a Retry-After header.” Lekcja nazywa to porozumieniem: zakres, rezultat, granice
i dowód ([P53](../08-harness/p53-kod-sprawdza-model-decyduje.md)).

**Stosuj.** Szablon w [Dodatku A3](../szablony/brief-workera.md).

---

← [P19](p19-dobor-modelu-i-koszt.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P21](p21-deleguj-research.md) →
