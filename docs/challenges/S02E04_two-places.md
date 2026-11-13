# S02E04 — two places

| Pole | Wartość |
| --- | --- |
| Kod | S02E04 |
| Tydzień / dzień | Week 2 — Agents, dzień 4 |
| Data | 5 listopada 2026, otwarcie 05:00 CET |
| Prowadząca | Angie Jones |
| Strona HQ | [hq.mega.dev/challenges/two-places](https://hq.mega.dev/challenges/two-places) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Kurs daje dwa zadania i skill do każdego z nich. Każde zadanie trafia do osobnego
workera: jeden działa na tej maszynie, drugi poza nią. Główny agent zbiera oba wyniki,
łączy je i składa raport.

## Role

- **Użytkownik:** wybiera, które zadanie wykona zdalny worker, i wskazuje środowisko
  zdalne.
- **Harness:** deleguje oba zadania osobno, odbiera wyniki i łączy je w jedną odpowiedź.

## Wymagania

- Konto lub usługa, która pozwala uruchomić agenta poza tą maszyną, np. środowisko
  chmurowe albo CI.

## Ograniczenia

- Główny agent sam nie wykonuje żadnego z zadań.
- Jeden worker musi działać lokalnie, a drugi poza tą maszyną.

## Kryterium ukończenia

Kurs przyjmuje odpowiedź złożoną z wyników obu workerów.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | otwarte, jeszcze nierozwiązane (Open · not solved yet) |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | otwarte |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Zadania i skille
przekazuje narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S02E04_two-places.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącą,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
