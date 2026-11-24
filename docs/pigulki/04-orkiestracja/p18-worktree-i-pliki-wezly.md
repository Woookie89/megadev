# P18 · Każdy worker w swoim worktree, a konflikty zbiegają się w plikach-węzłach

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04, S04E03, S04E05

> **Lekcje:**
>
> - S01E04 · Praca z harnessami AI → rozdział „Harnessy” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#harnessy) · [oryginał EN: „Harnesses”](../../s01e04-working-with-ai-harnesses.md#harnesses)
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)

**Zasada.** Równoległe zapisy wymagają osobnych checkoutów. Konflikty i tak pojawią się
w plikach, które wszyscy muszą zmienić (router, index, config). Dlatego plan dzieli pracę po
plikach, a nie po zadaniach: jeden właściciel na plik, a plik, którego potrzebuje każda zmiana,
dostaje jeden integrator.

**Dlaczego.** Workery równoległe nie widzą swoich zmian. Dwa joby w jednym pliku to konflikt przy
merge'u albo, gorzej, zmiana, która po cichu nadpisuje drugą. Podział według zadań (jeden worker na
request) wygląda naturalnie, ale gdy wszystkie zadania zmieniają ten sam plik, wysyła kilku piszących
w jedno miejsce. Lekcja S02E04 mówi, że w zespole agentów nawet najprostsze działania łatwo na siebie
zachodzą.

**Przypadek.** S01E04: merge #3 i #4 zatrzymał się na konflikcie w tym samym pliku aplikacji
(rejestracja tras). Harness scalił go ręcznie, a przed pushem uruchomił typecheck i 25
testów. MEGA Assessment (T19): równoległe sesje kursowe dzieliły jedno drzewo robocze, więc
nieśledzone pliki z kilku wątków mieszały się. Worktrees `s01e04/wt-3`…`wt-7` leżały
w repo jeszcze tydzień po scaleniu, aż do sprzątania 15.11.2026.

S04E03: trzy requesty hosta (zniżka za długi pobyt, podatek miejski, opłata za sprzątanie bez
prowizji) zmieniały tę samą formułę wypłaty w `batch.mjs`. Planner Host Desk, rola napisana z
użytkownikiem, nie dał tego pliku żadnemu workerowi. Każdy worker dostał dwa nowe, własne pliki:
czystą funkcję `roles/payout-runner/scripts/pricing/<name>.mjs` i notatkę `why/<name>.md`.
`batch.mjs` i `ROLE.md` roli payout-runner dostał jeden job merge'a (`m-1`, integrator), który wpiął
trzy funkcje w kolejności z odpowiedzi hosta. Workery działały równolegle, każdy we własnym worktree
(`../host-desk-w-r1`…`w-r3`). Board przyjął każdą zmianę, a ich ścieżki to tylko pliki z planu.
Trzy merge'e przeszły bez konfliktu. Kurs, w przekładzie: przeszło, bo planner dał `batch.mjs` tylko
integratorowi. Reguła 6 dla twojej fabryki: zaplanuj po plikach, zanim ktokolwiek zacznie pracę,
z jednym właścicielem na plik, a plik, którego potrzebuje każda zmiana, oddaj jednemu integratorowi.

S04E05: dwa harnessy w jednym folderze. Gdy Claude Code przebudowywał fabrykę ról w
`s04e05/host-desk`, w tym samym folderze pracował Codex (aplikacja ChatGPT). Przeniósł sekrety do
`vars.secrets.local.json`, dodał testy w `factory/make-a-role/test/` i zmienił odpowiedź na zwrot
0 EUR na `{done:"declined"}`, czyli kształt, który API daje tylko zaparkowanym zadaniom. Żaden nie
widział decyzji drugiego, a test Codexa przechodził z jego kształtem (log). Użytkownik zatrzymał Codexa
i pozwolił nadpisać jego zmiany („nadpisz zmiany coddexa jak cos, smialo, ja go zastopowalem juz”),
więc harness przywrócił zwykłą odpowiedź 0 bez wypłaty (commit `8ec055f`) i zrobił rolę od nowa. Kurs,
w przekładzie, w tabeli przebiegu: sesja Codexa w tym samym czasie edytowała tę samą fabrykę i zmieniła
zwrot 0 EUR na odmowę, kształt, który API daje tylko zaparkowanym zadaniom (rozwiązane razem). Rada
„Next time”: trzymaj jeden harness na folder, bo dwóch edytujących zmieniało ten sam plik.

**Stosuj.**

- Pliki-węzły przypisz jednemu workerowi albo zaplanuj ich scalenie.
- Zanim ruszą workery, wypisz, które pliki zmienia każde zadanie. Plik potrzebny więcej niż jednemu
  zadaniu dostaje integrator, a workery piszą nowe, własne pliki, które on wpina.
- Żaden plik nie należy do dwóch jobów. Plan podaje ścieżki tak, jak drukuje je `git diff`.
- Po każdym merge'u uruchom testy.
- Jeden harness na folder. Gdy drugi agent (Codex, Cursor, druga sesja) ma pracować równolegle, daj mu
  osobny worktree. Jeśli już pisze w twoim folderze, zatrzymaj go, zanim ruszysz dalej, i ustal, czyje
  zmiany zostają.
- Po zakończeniu sprzątnij worktrees (`git worktree remove`).

---

← [P17](p17-kontrakt-przed-rownolegloscia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P19](p19-dobor-modelu-i-koszt.md) →
