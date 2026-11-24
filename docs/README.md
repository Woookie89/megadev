# docs — jak tu pracujemy

Ten plik mówi, co jest w `docs/` i **co robić za każdym razem**, gdy padnie jedna z próśb
poniżej. Czyta go człowiek i agent (Claude Code, Codex). Agent: przeczytaj właściwą sekcję
przed pracą i przejdź całą listę kontrolną.

## Co tu jest

| Ścieżka | Zawartość |
| --- | --- |
| `docs/sXXeYY-<temat>.md` | Notatki lekcji po angielsku. |
| `docs/sXXeYY-transcript.md` | Transkrypty lekcji po angielsku. |
| `docs/pl/sXXeYY-<temat>.md`, `docs/pl/sXXeYY-transcript.md` | To samo po polsku. |
| `docs/pl/sXXeYY-<slug>-debrief.md` | Zapis przebiegu wyzwania: co się stało i czego to uczy. |
| [`docs/pigulki/`](pigulki/README.md) | **Pigułki wiedzy** o pracy z AI i agentami, zebrane ze wszystkich wyzwań. Jedna pigułka w jednym pliku, rozdziały jako foldery, do tego szablony, wzorce pracy i słowniczek. |
| [`docs/pills/`](pills/README.md) | To samo po angielsku: te same numery pigułek i ten sam układ, angielskie nazwy plików. |
| [`docs/challenges.md`](challenges.md) | Indeks wyzwań ze statusami. |
| `docs/challenges/`, `docs/challenges-original/` | Opisy wyzwań: własnymi słowami i oryginalne ze stron HQ i serwera MCP kursu. |

Materiały robocze wyzwań (logi, KEEP, HANDOVER, kod) są w folderach `sXXeYY/` w katalogu
głównym repo, nie w `docs/`.

---

## „Napisz debrief” / „podsumuj wyzwanie”

Debrief ma **dwie warstwy**. Pierwsza mówi, co się stało w tym wyzwaniu. Druga mówi, czego
to uczy o pracy z AI i agentami ogólnie. Sam przebieg to za mało.

### 1. Zbierz źródła (nie pisz z pamięci)

- [ ] Log wyzwania: `sXXeYY/log.md` albo `sXXeYY/challenge-log.md`.
- [ ] `KEEP.md`, `HANDOVER.md` / `HANDOFF.md`, jeśli są.
- [ ] Debrief kursu ze strony HQ (`https://hq.mega.dev/challenges/<slug>#debrief`) albo z
      narzędzia `debrief` serwera mega-challenge. Oryginał angielski zapisz bez zmian
      w `sXXeYY/hq-debrief.md` (bez elementów strony, jak przyciski i nawigacja). To źródło dla
      wniosków kursu w debriefie po polsku.
- [ ] Przeszłe sesje: skill rook-loop (recall), z cytatem `plik:linia`. Czego nie ma, to
      „nie znaleziono”, a nie domysł.
- [ ] Notatki lekcji `docs/pl/sXXeYY-<temat>.md`, żeby powiązać wyzwanie z tematem. Gdy ich nie
      ma (S04), napisz to na początku debriefu i cytuj wcześniejsze lekcje, jak w S04E01 i S04E02.
- [ ] Reguły kursu z `s04e01/agent/host-desk/factory/CHECKLIST.md` (S04E01: 1–3, S04E02: 4–5), jeśli debrief je dodał.

### 2. Napisz plik `docs/pl/sXXeYY-<slug>-debrief.md`

Sekcje w tej kolejności (wzór: [s02e02-nobody-asked-debrief.md](pl/s02e02-nobody-asked-debrief.md)):

1. `# SXXEYY · <Tytuł> — zapis przebiegu` i link do notatek lekcji.
2. `## Temat lekcji`: o czym lekcja i co wyzwanie sprawdziło.
3. `## Zadanie i wynik`: zadanie, data rozwiązania, liczba odmów, linki (repo, host).
4. `## Jak działa …` (opcjonalnie): tabela rozwiązania, gdy powstał system lub agent.
5. `## Przebieg`: numerowane kroki z odmowami kursu cytowanymi dosłownie (w oryginale).
6. `## Wnioski`: co zadziałało i co nie, **w tym wyzwaniu**. Wnioski kursu z debriefu HQ
   („Why it matters”, „The course recorded”, „Next time”, reguły „for your factory”, linie zestawu
   narzędzi z jednozdaniowymi lekcjami, kolumny tabeli „How the solve went”, werdykty) podaj
   **po polsku, w przekładzie**. Oryginał angielski zostaje w `sXXeYY/hq-debrief.md`.
7. `## Czego to uczy o pracy z AI i agentami`: **obowiązkowe**. 3–6 zasad przenośnych
   poza kurs. Każda ma:
   - nazwę zasady (pogrubioną),
   - mechanizm: dlaczego tak jest z modelami, agentami albo harnessem,
   - gdzie to wróci w zwykłej pracy,
   - link do pliku pigułki, względny od `docs/pl/`: `→ [P07]` z adresem
     `../pigulki/02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md` (wzór: S04E02).
8. `## Co zostało otwarte`: procesy, serwisy, worktrees, zgody, których brakuje, koszty.
9. Link do debriefu na stronie HQ.

Pytania pomocnicze do sekcji 7:

- Co to mówi o **kontekście** modelu (co widzi, co gubi, co się starzeje)?
- Co o **weryfikacji** (skąd wiadomo, że gotowe)?
- Co o **pamięci** między sesjami i agentami?
- Co o **orkiestracji** (podział, delegowanie, dobór modelu)?
- Co o **agentach bez człowieka** (host, pętla, awarie dostawcy)?
- Co o **bezpieczeństwie** (zaufanie, uprawnienia, sekrety)?
- Co o **roli człowieka** (zgody, decyzje, uprawnienia harnessu)?

### 3. Zaktualizuj pigułki (`docs/pigulki/`)

Układ katalogu:

```text
pigulki/
  README.md                 dziesięć zasad, lista wszystkich pigułek, indeks epizodów
  01-kontekst/ … 08-harness/
    README.md               wstęp rozdziału + tabela jego pigułek
    pNN-<slug>.md           jedna pigułka
  wzorce-pracy.md           MEGA Assessment: twoje mocne i słabe strony
  szablony/                 handoff, keep, brief-workera, tabela-decyzji, …
  slowniczek.md
```

- [ ] Zasada już jest: dopisz nowy przypadek w sekcji **Przypadek** tej pigułki i epizod
      w jej linii `> Rozdział … · epizody: …`.
- [ ] Zasada jest nowa: nowy plik `pNN-<slug>.md` w folderze rozdziału.
  - Numer kolejny po ostatnim, bez przenumerowywania starych.
  - Nagłówek `# PNN · <zasada>`, pod nim linia `> Rozdział … · epizody: …`.
  - Pod nią **obowiązkowy** blok lekcji (patrz niżej).
  - Sekcje: **Zasada** / **Dlaczego** / **Przypadek** / **Stosuj**.
  - Na dole nawigacja: poprzednia, rozdział, wszystkie pigułki, następna. Popraw też
    link „następna” w poprzedniej pigułce.
- [ ] Dodaj wiersz w tabeli rozdziału (`0N-…/README.md`) i w `pigulki/README.md`
      (sekcje „Wszystkie pigułki”, „Indeks lekcji” i „Indeks epizodów”). Przy nowym przypadku
      w istniejącej pigułce dopisz epizod w wierszu rozdziału i w „Wszystkie pigułki”.
- [ ] Nowe pojęcie dodaj do `pigulki/slowniczek.md` i `pills/glossary.md`.
- [ ] Jeśli zmienia się któraś z „Dziesięciu zasad na jeden ekran”, zaktualizuj tabelę.
- [ ] Zaktualizuj datę „Stan na” i zakres epizodów (`S01E01–SXXEYY`) w `pigulki/README.md` i
      `pills/README.md`. Gdy notatek lekcji epizodu nie ma, zaktualizuj też przypis pod
      indeksem lekcji.
- [ ] **Zrób to samo w `docs/pills/` po angielsku**: ten sam numer, angielski slug, układ
      Principle / Why / Case / Apply, blok `> **Lessons:**`.
- [ ] Sprawdź, czy każdy względny link w `docs/` prowadzi do istniejącego pliku i istniejącego
      nagłówka (kotwica `#…`).

#### Blok lekcji w pigułce

Każda pigułka wskazuje lekcje, z których pochodzi: epizod, tytuł lekcji, **rozdział lekcji**
(nagłówek `##` w notatkach) oraz link do wersji polskiej i do oryginału angielskiego, oba
z kotwicą do tego rozdziału. Rozdział wybieraj po treści: zajrzyj, co faktycznie mówi, a nie
tylko po tytule. Notatki EN i PL mają te same rozdziały w tej samej kolejności.

```markdown
> **Lekcje:**
> - S01E04 · Praca z harnessami AI → rozdział „Harnessy” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#harnessy) · [oryginał EN: „Harnesses”](../../s01e04-working-with-ai-harnesses.md#harnesses)
```

Gdzie leżą notatki lekcji: polskie w `docs/pl/sXXeYY-<temat>.md`, angielskie w
`docs/sXXeYY-<temat>.md`. Wyjątek: oryginał S01E01 jest w
`s01e01/s01e01-mechanics-behind-generative-ai.md`.

### 4. Zaktualizuj indeks wyzwań

- [ ] Status w [challenges.md](challenges.md) (wiersz tygodnia, zakres w nagłówku, źródła) i w
      pliku wyzwania `docs/challenges/SXXEYY_<slug>.md` (nowy plik wzoruj na poprzednim).
- [ ] Sprawdź linki: `node .agents/skills/mega-task/scripts/check-links.mjs docs`.

---

## „Dopisz pigułkę” / „czego się nauczyliśmy”

- [ ] Ustal, czy to nowa zasada, czy nowy przypadek istniejącej (patrz krok 3 wyżej).
- [ ] Każde twierdzenie ma źródło: plik, log, sesja (`plik:linia`) albo raport.
- [ ] Pigułka wskazuje lekcję i jej rozdział, z linkami PL i EN (blok lekcji wyżej).
- [ ] Zmiana trafia do obu wersji: `docs/pigulki/` i `docs/pills/`.
- [ ] Pisz tak, żeby pigułka dała się zrozumieć bez czytania debriefu.

## „Przejrzyj wszystko od początku”

- [ ] Przeczytaj wszystkie debriefy, `KEEP.md` / `HANDOVER.md` i `mega-assessment/raport-pl.md`.
- [ ] Szukaj zasad, które wracają w kilku epizodach. To kandydaci do „Dziesięciu zasad”.
- [ ] Sprawdź, czy każdy debrief ma sekcję „Czego to uczy o pracy z AI i agentami”.
- [ ] Sprawdź „Co zostało otwarte” we wszystkich debriefach i powiedz człowiekowi, co nadal
      działa albo kosztuje (serwisy, pętle, worktrees).

## Zasady pisania (wszędzie w `docs/pl/`)

- Po polsku, krótkie zdania, prosty język. Terminy techniczne zostają (`harness`, `worktree`).
- Po angielsku, w cudzysłowie, zostają tylko krótkie cytaty kursu: linie Rooka i dosłowne odmowy.
  Wnioski z debriefu HQ piszemy po polsku, w przekładzie. Oryginał jest w `sXXeYY/hq-debrief.md`
  i w angielskich dokumentach (`docs/pills/`, `docs/sXXeYY-*.md`), których nie tłumaczymy.
- Pisz tak, jak programista mówi do kolegów. Słowa, które nazywają rzeczy w pracy z oprogramowaniem
  (to, co się wysyła, uruchamia, zapisuje, recenzuje, wdraża albo konfiguruje, i czasowniki wokół
  nich), zostają po angielsku i lekko się odmieniają („request”, „w harnessie”, „zmergował”).
  Tłumacz zwykłe słowa, których programiści używają też po polsku („zasada”, „przebieg”).
  Test: czy kolega powiedziałby to słowo po angielsku? Gdy polska wersja brzmi jak kalka albo
  podręcznik, albo masz wątpliwość, zostaw angielskie. Formy „polski termin (English)” używaj
  tylko dla terminu, który wymaga jednorazowego wyjaśnienia po polsku
  ([słowniczek](pigulki/slowniczek.md)). Nazwy plików, id i kod zostają bez zmian.
- Liczby, daty i odmowy z logu, nie z pamięci. Daty z godziną podawaj w UTC (`Z`).
- Żadnych kluczy, ticketów ani tokenów. Pełne dowody leżą w plikach ignorowanych przez git.
- Linki do plików względne, a do pigułek z kotwicą (`#p07`).
- Końce linii: pliki w `docs/pills/` i część w `docs/pigulki/` mają CRLF. Przy edycji zachowaj
  końce linii pliku, a nowy plik rób w stylu sąsiednich pigułek.
