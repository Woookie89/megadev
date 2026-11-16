# P43 · Przekaż skill razem z zadaniem

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S02E04

> **Lekcje:**
> - S02E04 · Współpraca wielu agentów → rozdział „Agent2Agent” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#agent2agent) · [oryginał EN: „Agent2Agent”](../../s02e04-multi-agent-collaboration.md#agent2agent)
> - S02E04 · Współpraca wielu agentów → rozdział „Najważniejsze wnioski” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#najważniejsze-wnioski) · [oryginał EN: „Takeaways”](../../s02e04-multi-agent-collaboration.md#takeaways)

**Zasada.** Delegowanie to praca, która wychodzi z głównego agenta: worker ma własny
kontekst i własne połączenie z narzędziami. Skill, który mówi, *jak* zrobić zadanie, musi
trafić do workera razem z nim. Skill przeczytany przez głównego agenta to nie skill użyty przez
workera.

**Dlaczego.** Agenci nie dzielą wątków. Worker widzi tylko to, co dostał w briefie i co
załaduje jego harness. Narzędzie mówi, *co* da się zrobić. Bez procedury worker zrobi to,
co oczywiste: przeszuka domyślny zakres, przeczyta wszystkie pola, odda surowy zrzut.
Skill zamienia ten zrzut w kształt, którego potrzebuje następny czytelnik.

**Przypadek.** S02E04: dwa zadania kursu, dwa skille, dwa workery.

- Lokalny `claude -p` miał `voice-to-memo` w `.claude/skills/` swojego katalogu, a prompt
  kazał go wczytać i podał wersję 1. Notatki wyszły w kształcie skilla: jedna na
  zdarzenie, z `@m:ss`, także powtórzenia (11 notatek).
- Routine w chmurze klonowała prywatne repo, w którym leżał tylko `incident-lookup`.
  Worker najpierw porównał tę kopię ze skillem z linku zadania, a potem przeszukał
  `ops/live` zamiast domyślnego archiwum i nie przeczytał pola `crew`.

Kurs: „A tool says what; a skill says how. The skill has to travel with the job — a skill
the main agent read is not one the worker used.” Oba `submit` przeszły za pierwszym razem.

**Stosuj.**

- Skill kładź tam, skąd harness workera go ładuje: `.claude/skills/` w jego katalogu,
  w repo, które sklonuje, w obrazie CI.
- W briefie podaj nazwę skilla i wersję. Gdy kurs albo zespół serwuje skill u źródła,
  worker ma porównać swoją kopię z oryginałem.
- Główny agent nie streszcza skilla workerowi własnymi słowami. Streszczenie gubi
  właśnie te reguły, które odróżniają procedurę od rzeczy oczywistej.
- Szablon briefu z polem na skill: [A3](../szablony/brief-workera.md).

---

← [P42](../08-harness/p42-duze-bajty-obok-modelu.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P44](p44-normalizuj-przed-zlaczeniem.md) →
