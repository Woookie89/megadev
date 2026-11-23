# P05 · Fakty zmienne potwierdzaj u źródła, nie z pamięci modelu

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E01, S02E03, S04E02

> **Lekcje:**
>
> - S01E01 · Mechanika działania generatywnej AI → rozdział „Warto wiedzieć o LLM-ach” — [po polsku](../../pl/s01e01-mechanics-behind-generative-ai.md#warto-wiedzieć-o-llm-ach) · [oryginał EN: „Things worth knowing about LLMs”](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#things-worth-knowing-about-llms)
> - S02E02 · Budowanie agenta → rozdział „Projektowanie narzędzi” — [po polsku](../../pl/s02e02-building-an-agent.md#projektowanie-narzędzi) · [oryginał EN: „Designing tools”](../../s02e02-building-an-agent.md#designing-tools)

**Zasada.** Nazwy modeli, wersje bibliotek, ceny i specyfikacje zmieniają się szybciej niż
dane treningowe. Model poda je pewnym tonem, nawet gdy są nieaktualne.

**Przypadek.** S01E01: odpowiedź „GPT-6 Astra” została przyjęta, ale pochodziła z cudzego
debriefu, a nie od dostawcy, więc nie jest niezależnym potwierdzeniem. S02E03: przed
napisaniem serwera MCP harness pobrał aktualną specyfikację (rewizja 2026-07-28), bo różni
się od poprzedniej (bez `initialize`, inne nagłówki).

S04E02: nieaktualna liczba siedziała nie w pamięci modelu, tylko w instrukcji roli. `ROLE.md`
recenzenta miał prowizję 15 % i wersję `2026-11-10.1`, a żywe `/settings` mówiło 12 % i
`2026-11-17.548` ([P64](p64-rola-trzyma-zrodlo-faktu-nie-fakt.md)).

**Stosuj.**

- Przy pytaniu o bibliotekę, API albo CLI sięgnij po aktualną dokumentację (Context7, spec,
  changelog).
- W logu zapisz, skąd fakt pochodzi i z jakiej daty.

---

← [P04](p04-pobrany-plik-to-kopia-z-dnia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P06](../02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) →
