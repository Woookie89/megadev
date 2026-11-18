# P44 · Normalizuj, zanim złączysz

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S02E04

> **Lekcje:**
>
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)
> - S02E04 · Współpraca wielu agentów → rozdział „Orkiestracja” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#orkiestracja) · [oryginał EN: „Orchestration”](../../s02e04-multi-agent-collaboration.md#orchestration)

**Zasada.** Łączenie wyników to zadanie głównego agenta, nie workerów. Każde źródło może
zapisywać dane po swojemu: w innej strefie czasowej, jednostce czy walucie, z innymi
identyfikatorami. Najpierw sprowadź wszystko do wspólnego formatu, kodem, a dopiero potem
łącz.

**Dlaczego.** Model dopasowuje wartości po tym, jak wyglądają. „22:35” z jednego źródła
łatwo połączy z „ten thirty-five” z drugiego, choć to zupełnie inne momenty. Zmiany czasu,
przesunięcia stref i wyjątki w kalendarzu to fakty, które się zmieniają, a model nie liczy
ich pewnie z pamięci ([P05](../01-kontekst/p05-fakty-zmienne-u-zrodla.md)). Workery nie
powinny przeliczać same: każdy zna tylko swoje źródło, a skill każe mu oddać wartość
dokładnie tak, jak zapisało ją źródło.

**Przypadek.** S02E04: job-1 oddał wpis z 31.10.2026, godz. 22:35, czas US Eastern
(wschodnie wybrzeże USA). Nagranie z job-2 zaczynało się od słów „Desk time, central
European.”, czyli czas środkowoeuropejski. 31 października w USA obowiązywał jeszcze czas
letni (EDT, UTC−4; zmiana dopiero 1.11 o 2:00), a w Europie już zimowy (od 25.10). W tym
tygodniu różnica wynosiła więc 5 godzin, a nie zwykłe 6. Główny agent przeliczył to kodem,
przez `Intl` (strefy `America/New_York` i `Europe/Berlin`): 22:35 EDT → 02:35 UTC →
03:35 CET → notatka „Three thirty-five … @1:00”.

Pułapki: przyjęcie tej samej godziny w obu źródłach dałoby notatkę @0:09, a przyjęcie
czasu zimowego w USA (EST, UTC−5) notatkę @1:13. Kurs: „The merge is the main agent's own
job: two sources, two frames of reference — normalize before joining.”

**Stosuj.**

- Dla każdej wartości z dwóch źródeł zapytaj: w jakim formacie (strefie, jednostce,
  walucie) jest każda z nich?
- Workery oddają wartość razem z jej formatem (`clock: US Eastern`, waluta, jednostka)
  i niczego nie przeliczają.
- Przeliczaj kodem, z biblioteką, która zna aktualne reguły (`Intl`, `zoneinfo`, tabela
  kursów walut), przez wspólną bazę, np. UTC. Gotowy skrypt do stref czasowych:
  `one-clock.mjs` ze skilla `crew`.
- Sprawdź wynik w obie strony i zapisz pułapki, które dałyby inną odpowiedź.

---

← [P43](p43-przekaz-skill-z-zadaniem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P45](../05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md) →
