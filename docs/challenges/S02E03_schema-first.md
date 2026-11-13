# S02E03 — schema first

| Pole | Wartość |
| --- | --- |
| Kod | S02E03 |
| Tydzień / dzień | Week 2 — Agents, dzień 3 |
| Data | 4 listopada 2026, otwarcie 05:00 CET |
| Prowadząca | Angie Jones |
| Strona HQ | [hq.mega.dev/challenges/schema-first](https://hq.mega.dev/challenges/schema-first) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Trzeba zbudować i wdrożyć własny zdalny serwer MCP z trzema narzędziami: memo, upload
i transcribe. Serwer trzeba podłączyć do własnego harnessu i udostępnić kursowi, który
wywoła go jako obca osoba.

## Role

- **Użytkownik:** otwiera link połączenia i daje kursowi dostęp do serwera.
- **Harness:** buduje, wdraża i udostępnia serwer z wymaganymi narzędziami.

## Wymagania

- Publiczny adres HTTPS.
- W razie potrzeby konto lub klucz usługi transkrypcji.

## Ograniczenia

- Płatny klucz transkrypcji nalicza opłatę za każde wywołanie.
- Kurs może wykonać najwyżej 10 kontroli dziennie.
- Link do przesłanego pliku jest publiczny.
- Po zaliczeniu można usunąć plik i notatki oraz odebrać kursowi dostęp.

## Kryterium ukończenia

Kurs wywołuje serwer jako niezalogowany użytkownik i wszystkie kontrole przechodzą.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | otwarte, jeszcze nierozwiązane (Open · not solved yet) |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | otwarte |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików).

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S02E03_schema-first.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącą,
  status z HQ, wymagania i ograniczenia wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
