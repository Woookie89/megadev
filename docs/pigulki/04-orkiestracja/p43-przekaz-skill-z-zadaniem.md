# P43 · Przekaż skill razem z zadaniem

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S02E04

> **Lekcje:**
>
> - S02E04 · Współpraca wielu agentów → rozdział „Agent2Agent” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#agent2agent) · [oryginał EN: „Agent2Agent”](../../s02e04-multi-agent-collaboration.md#agent2agent)
> - S02E04 · Współpraca wielu agentów → rozdział „Najważniejsze wnioski” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#najważniejsze-wnioski) · [oryginał EN: „Takeaways”](../../s02e04-multi-agent-collaboration.md#takeaways)

**Zasada.** Delegowanie to praca, która wychodzi z głównego agenta: worker ma własny
kontekst i własne połączenie z narzędziami. Skill, który opisuje, _jak_ wykonać zadanie,
trzeba przekazać workerowi razem z zadaniem. To, że główny agent przeczytał skill, nie
znaczy, że worker go zna.

**Dlaczego.** Agenci nie widzą nawzajem swoich rozmów. Worker wie tylko to, co dostał
w briefie, i to, co wczyta jego harness. Opis narzędzia mówi, _co_ da się zrobić, ale nie
_jak_. Bez procedury worker zrobi to, co najprostsze: przeszuka domyślny zakres, przeczyta
wszystkie pola i odda surowe dane. Dopiero skill sprawia, że wynik ma postać, której
potrzebuje następny odbiorca.

**Przypadek.** S02E04: dwa zadania kursu, dwa skille, dwa workery.

- Lokalny worker (`claude -p`) miał skill `voice-to-memo` w folderze `.claude/skills/`
  swojego katalogu, a prompt kazał go wczytać i podał wersję 1. Notatki miały format
  opisany w skillu: jedna na zdarzenie, z momentem w nagraniu (`@m:ss`), także dla
  powtórzeń. Razem 11 notatek.
- Worker w chmurze (routine w claude.ai/code) pobrał prywatne repo, w którym był tylko skill
  `incident-lookup`. Najpierw porównał tę kopię ze skillem udostępnionym pod linkiem
  zadania. Potem szukał w zakresie `ops/live` zamiast w domyślnym archiwum i nie czytał
  pola `crew` z nazwiskami załogi.

Kurs: „A tool says what; a skill says how. The skill has to travel with the job — a skill
the main agent read is not one the worker used.” Kurs przyjął wyniki obu workerów
(`submit`) za pierwszym razem.

**Stosuj.**

- Umieść skill tam, skąd wczyta go harness workera: w `.claude/skills/` jego katalogu,
  w repo, które pobierze, albo w obrazie CI.
- W briefie podaj nazwę i wersję skilla. Jeśli skill jest też dostępny u źródła (np. na
  serwerze kursu), niech worker porówna z nim swoją kopię.
- Nie streszczaj workerowi skilla własnymi słowami. Streszczenie gubi akurat te reguły,
  które odróżniają procedurę od tego, co oczywiste.
- Szablon briefu z polem na skill: [A3](../szablony/brief-workera.md).

---

← [P42](../08-harness/p42-duze-bajty-obok-modelu.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P44](p44-normalizuj-przed-zlaczeniem.md) →
