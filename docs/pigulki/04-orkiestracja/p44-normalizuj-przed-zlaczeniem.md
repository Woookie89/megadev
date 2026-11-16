# P44 · Normalizuj, zanim złączysz

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S02E04

> **Lekcje:**
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)
> - S02E04 · Współpraca wielu agentów → rozdział „Orkiestracja” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#orkiestracja) · [oryginał EN: „Orchestration”](../../s02e04-multi-agent-collaboration.md#orchestration)

**Zasada.** Złączenie wyników to własna praca głównego agenta. Dwa źródła mają dwa układy
odniesienia: strefę czasową, jednostkę, walutę, identyfikatory. Najpierw sprowadź oba do
jednego układu, kodem, a dopiero potem łącz.

**Dlaczego.** Model łączy po tym, jak wartości wyglądają. „22:35” z jednego źródła pasuje
mu do „ten thirty-five” z drugiego, choć to inne chwile. Zmiany czasu, przesunięcia stref
i wyjątki kalendarza to fakty zmienne, których model nie liczy pewnie z pamięci
([P05](../01-kontekst/p05-fakty-zmienne-u-zrodla.md)). Workery nie powinny tego robić
same: każdy zna tylko swoje źródło, a skill każe mu zachować wartość tak, jak ją podaje.

**Przypadek.** S02E04: job-1 oddał wpis z 2026-10-31, 22:35, z zegarem US Eastern. Klip
z job-2 mówił „Desk time, central European.”. 31 października USA miały jeszcze czas letni
(EDT, UTC-4, zmiana 1.11 o 02:00), a Europa już zimowy (od 25.10). W tym tygodniu różnica
to 5 godzin, nie 6. Główny agent przeliczył to przez `Intl` (`America/New_York`,
`Europe/Berlin`): 22:35 EDT → 02:35Z → 03:35 CET → notatka „Three thirty-five … @1:00”.
Pułapki: ten sam zegar dla obu źródeł daje @0:09, a EST (UTC-5) daje @1:13. Kurs: „The
merge is the main agent's own job: two sources, two frames of reference — normalize before
joining.”

**Stosuj.**

- Przy każdym polu z dwóch źródeł zapytaj: w jakim układzie jest każde z nich?
- Workery zwracają wartość razem z jej układem (`clock: US Eastern`, waluta, jednostka),
  bez przeliczania.
- Przeliczenie robi kod z biblioteką, która zna reguły (`Intl`, `zoneinfo`, tabela kursów),
  przez UTC albo inną wspólną bazę.
- Sprawdź wynik w obie strony i wypisz pułapki, które dałyby inną odpowiedź.

---

← [P43](p43-przekaz-skill-z-zadaniem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P45](../05-agent-bez-czlowieka/p45-zdalny-worker-droga-tam-i-z-powrotem.md) →
