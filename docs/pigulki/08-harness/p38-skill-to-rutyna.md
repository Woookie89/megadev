# P38 · Skill to rutyna, która przeżyła jedno użycie

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S01E03, S02E03, S03E01, S03E02, S03E03

> **Lekcje:**
>
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Projektowanie i generowanie skilli” — [po polsku](../../pl/s01e02-steering-models-through-context.md#projektowanie-i-generowanie-skilli) · [oryginał EN: „Designing and generating skills”](../../s01e02-steering-models-through-context.md#designing-and-generating-skills)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Wykonywalny Markdown a kod” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) · [oryginał EN: „Executable Markdown vs Code”](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code)

**Zasada.** Gdy coś robisz drugi raz, zapisz to jako skill: kroki, zasady zgody, przykłady.

**Przypadek.** `github-cli-routine` (S01E03): utwórz, podlinkuj, zamknij z powodem. Karty
z talii kursu: `read` (S01E01), `rig` (S01E04), `loop` (S02E01), `hands` (S02E03). Żadna
nie została zainstalowana automatycznie, bo instalacja to decyzja człowieka. `hands`
harness najpierw rozpakował do katalogu tymczasowego i sprawdził sumy SHA-256 wszystkich
6 plików. Skrypt przejrzał pod kątem miejsc, które uruchamiają procesy. Folder do `~/.claude/skills/`
skopiował człowiek.

S03E01: kurs wymagał własnego skilla w zasięgu użytkownika, wysłanego razem z listą
wymagań. Harness, za zgodą użytkownika, zapisał `capture` w
`~/.agents/skills/capture/SKILL.md` i podlinkował go do `~/.claude/skills/capture`. Skill
mówi, jak czytać każdy rodzaj pliku (dźwięk, wideo, obraz, PDF, bieżąca strona), jak
cytować miejsce i że sprzeczności rozstrzyga właściciel. Kurs zapisał go w toolboxie jako
narzędzie zdobyte w trakcie (T1).

S03E02: skill `triage` w `.agents/skills/triage/SKILL.md` (zasięg projektu; `.claude/skills`
to junction do `.agents/skills`, więc `check-lane` odpowiedział „The harness already loads
the repo's skills”). Cztery kroki: zbierz wszystko, rozstrzygnij każde zgłoszenie według
tabeli pytań, napisz issue w formacie trackera, sprawdź skryptem. Po rozwiązaniu sprzeczności
i wycofania harness dopisał do skilla dwie reguły, które wynikły z przebiegu: sprzeczne prośby
to jedno issue `needs-human` z oboma id, a późniejsze zgłoszenie może wycofać wcześniejsze.
Kurs zapisał skill jako T1: „A triage skill of your own: requests in, a marked tracker out —
each decision citing the fact behind it.” Kartę „ask” z talii kursu harness zainstalował po
rozwiązaniu, na prośbę użytkownika, w `~/.claude/skills/ask/` (9 plików, sumy SHA-256 zgodne z kursem).

S03E03: ten sam skill `triage` dostał sekcję 5 „Running alone”, bo teraz czytał go agent bez
człowieka. Sekcja mówi, co czytać przed każdą decyzją (`AGENTS.md` i kontrakt, cały wątek
issue, rekordy decyzji i research, kod i testy), że komentarz odbioru pisze kod, a nie model,
kiedy budować, odmówić i pytać właściciela (tabela), jak wygląda linia ship logu i czego nie
robić nigdy. Runner wkładał cały skill do promptu. Kurs zapisał to jako zdobyte T1: „Your triage
skill, grown to run alone: per issue, read what is in force, ask the owner only what is open,
build the answer, log it once it is live.” Lekcja z rundy (rekordy w każdej turze) trafiła na
razie tylko do kodu runnera, a nie do skilla. Kartę „bet” z talii kursu (skill do rekordów
decyzji) harness zainstalował 20.11.2026, na prośbę użytkownika, w `~/.claude/skills/bet`
(wersja 5597ebd80849, 6 plików, sumy SHA-256 zgodne z kursem, sprawdzenia skilla przechodzą).

---

← [P37](p37-brakujace-narzedzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P39](p39-mcp-kontrakt-dla-klienta.md) →
