# S04E03 — Three small changes

| Pole | Wartość |
| --- | --- |
| Kod | S04E03 |
| Tydzień / dzień | Week 4, dzień 3 (nazwy tygodnia nie znaleziono w źródłach) |
| Data | nie znaleziono (dnia otwarcia nie ma w źródłach; rozwiązane 24.11.2026, 21:08:03Z) |
| Prowadzący | nie znaleziono |
| Strona HQ | [hq.mega.dev/challenges/three-small-changes](https://hq.mega.dev/challenges/three-small-changes) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Dać Host Desk zespół. Napisać z użytkownikiem rolę planner, pozwolić zespołowi (planner, critic,
workery, integrator) wziąć z boardu trzy requesty zmian od hosta i wykonać dzisiejszy batch wypłat
na zmergowanej pracy. Wszystko jest symulacją.

Trzy requesty: zniżka 10 % na noce przy pobytach od 7 nocy (`r1`), podatek miejski 3 EUR za osobę
za noc (`r2`), cała opłata za sprzątanie dla hosta, bez prowizji (`r3`).

## Role

- **Użytkownik:** zgadza się na pobranie zipa zespołu, pisze rolę planner razem z harnessem, czyta
  na stronie właściciela odpowiedzi hosta na pytania zespołu i przekazuje je harnessowi. Po
  przebiegu decyduje o zaparkowanych wypłatach.
- **Harness:** przygotowuje Host Desk i zespół, pobiera podręcznik raz, uruchamia role (critic,
  planner, workery, integrator, reviewer, payout-runner), sprawdza wysłane zmiany przed merge'em,
  uruchamia batch i dokańcza go po decyzjach właściciela.

## Wymagania

- Host Desk z S04E01 i S04E02 albo zip „day 3” z całą aplikacją dla tych, którzy je pominęli.
- Zip zespołu: role `critic`, `worker` i `integrator` do użycia bez zmian i pusty `planner` do
  napisania, rozpakowany tam, gdzie starter S04E01.
- Host Desk w git, jeden worktree na job.
- Własny klucz modelu (np. OpenRouter), płatny przez użytkownika.

## Ograniczenia

- Jedna próba na cały zespół: podręcznik pobiera się raz, a każda rola używa tej samej próby
  (`ATTEMPT`). Rola, która sama pobierze podręcznik, zaczyna nową próbę z pustym boardem.
- Plan na boardzie zapisuje się raz, zanim ruszy jakikolwiek job. Według `roles/planner/ROLE.md`: od 1
  do 12 jobów, każdy request obsłużony przez job, dokładnie jeden job merge'a.
- Każdy job zmienia tylko pliki, które dał mu plan.
- Pytania critica idą na `POST /board/questions` (do 5 na request), a odpowiedzi hosta są tylko na
  stronie właściciela.
- Wypłaty tylko na konto z akt, w pełnych euro, zaokrąglone w dół. Prowizja z żywego `/settings`
  (w tym przebiegu 16 %). Zadania mają nowe pole `day` (`guests`, `bookedAt`).
- Limit czasu przebiegu właściwego: 6000 ms (20 zadań).
- Ticket sesji ma datę wygaśnięcia (w tym przebiegu 25.11.2026, 20:45:35Z), a próba też (24.11.2026,
  23:48:01Z).

## Kryterium ukończenia

W jednej próbie: plan jest na boardzie, zanim ruszy jakikolwiek job, każdy job wysyła swoją zmianę i
zmienia tylko pliki ze swojego planu, a batch wypłat przechodzi.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Serwer MCP kursu (`claim-challenge`) | 24.11.2026 | rozwiązane 21:08:03Z przy pierwszym claimie, bez odmów („Solved: your team planned on the board, posted every job's change, and the payout batch passed.”); batch wypłat przeszedł (2 zadania zaparkowane i rozstrzygnięte przez właściciela); [zapis przebiegu](../pl/s04e03-three-small-changes-debrief.md) |
| Serwer MCP kursu (`list-challenges`, `solved`) | nie odczytano | nie znaleziono |
| Debrief HQ (`s04e03/hq-debrief.md`) | 24.11.2026 | solved, kurs nie odrzucił żadnej próby; harnessu i modelu harnessu debrief nie podaje |

## Materiały i załączniki

- Zip zespołu (`team-e12fefc8.zip`, 54228 B), pobrany z HQ do `s04e03/dl`. Role skopiowano do
  `s04e03/host-desk/roles`.
- Alternatywny zip „host-desk-day-3” (cała aplikacja), nieużyty.
- API wyzwania: `hq.mega.dev/challenges/three-small-changes/api` (podręcznik, `/settings`, `/board`
  z pytaniami, planem, claimami i wynikami, `/patch`, `/practice`, lista zaparkowanych).
- Strona właściciela z odpowiedziami hosta i decyzjami o zaparkowanych zadaniach:
  `hq.mega.dev/challenges/three-small-changes/owner` (adres z `requests/answers.md`).
- Host Desk z S04E03: `s04e03/host-desk` (osobne repo git, poza śledzeniem megadev).

## Źródła i braki

- Opis, sposób startu i przebieg pochodzą z logu `s04e03/log.md` (z sekcją HANDOVER), z plików Host
  Desk (`roles/README.md`, `roles/*/ROLE.md`, `requests/answers.md`) i z dosłownego debriefu HQ
  (`s04e03/hq-debrief.md`). Przebieg jest w [zapisie przebiegu](../pl/s04e03-three-small-changes-debrief.md).
- Nie znaleziono: daty otwarcia, prowadzącego, nazwy tygodnia, dosłownego tekstu opisu wyzwania ze
  strony HQ (poza debriefem), notatek lekcji S04E03, harnessu i modelu w debriefie HQ oraz flagi
  `solved` z `list-challenges`.
- Stan strony HQ (State) nie został odczytany.
