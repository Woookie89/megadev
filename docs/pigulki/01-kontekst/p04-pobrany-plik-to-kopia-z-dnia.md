# P04 · Pobrany plik to kopia z danego dnia

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E03, S02E01

> **Lekcje:**
>
> - S01E03 · Tworzenie systemów wiedzy → rozdział „Cel baz wiedzy” — [po polsku](../../pl/s01e03-building-knowledge-systems.md#cel-baz-wiedzy) · [oryginał EN: „Purpose of the knowledge bases”](../../s01e03-building-knowledge-systems.md#purpose-of-the-knowledge-bases)
> - S02E01 · Prymitywy agentowe → rozdział „Kontekst i pamięć” — [po polsku](../../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć) · [oryginał EN: „Context and Memory”](../../s02e01-agentic-primitives.md#context-and-memory)

**Zasada.** Świat pracuje dalej, gdy agent pracuje. Przed ogłoszeniem „gotowe” pobierz źródła
jeszcze raz i porównaj z tym, co już przeczytano.

**Dlaczego.** Agent czyta źródło raz, na początku. Potem przez godzinę buduje na tym odczycie.
Im dłuższa praca, tym większa szansa, że źródło się zmieniło.

**Przypadek.** S01E03: aktualizacja od desku wsparcia pojawiła się na stronie dopiero po kroku 1. S02E01:
archiwum sesji urosło po pierwszym odczycie. Dopisana później sesja podagenta zmieniła obraz
i port Postgresa, a jeszcze późniejsza sesja nazwę bazy. Kurs: „Something changed since your check-in. Check again.”

**Stosuj.**

- Ostatni krok przed claimem, PR-em albo raportem to ponowne pobranie źródeł i diff.
- Zautomatyzuj to bramką przy wyjściu (patrz [P07](../02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md), [P24](../05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md)).

---

← [P03](p03-zrodlo-to-nie-widok.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P05](p05-fakty-zmienne-u-zrodla.md) →
