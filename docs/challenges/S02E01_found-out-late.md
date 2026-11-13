# S02E01 — found out late

| Pole | Wartość |
| --- | --- |
| Kod | S02E01 |
| Tydzień / dzień | Week 2 — Agents, dzień 1 |
| Data | 2 listopada 2026, otwarcie 05:00 CET |
| Prowadząca | Angie Jones |
| Strona HQ | [hq.mega.dev/challenges/found-out-late](https://hq.mega.dev/challenges/found-out-late) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Dwa zespoły przebudowały nocny proces uzupełniania zapasów w `stock-5` i zostawiły zapisy
swoich sesji. Repozytorium zawiera plan w wersji z chwili przekazania. Trzeba ustalić, co
naprawdę uzgodniono, napisać obowiązujący plan i zbudować opisany w nim sklep.

## Role

- **Użytkownik:** uruchamia sklep lokalnie i instaluje zależności, gdy harness o to poprosi.
- **Harness:** analizuje repozytorium i sesje zespołów, ustala rzeczywiste decyzje, pisze
  plan i buduje sklep.

## Wymagania

Kont i kluczy nie podano w źródłach odczytanych w tej sesji. Potrzebne jest środowisko
lokalne zdolne uruchomić sklep. Zależności wskazuje harness w trakcie pracy.

## Ograniczenia

- Plan w repozytorium może nie odpowiadać temu, co zespoły ustaliły. O wyniku decydują
  faktyczne decyzje.

## Kryterium ukończenia

Kurs przyjmuje implementację zgodną z ustalonymi decyzjami.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | otwarte, jeszcze nierozwiązane (Open · not solved yet) |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | otwarte |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Repozytorium i sesje
zespołów przekazuje narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S02E01_found-out-late.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącą
  i status z HQ wzięto wtedy z notatek z HQ w poprzedniej wersji [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
