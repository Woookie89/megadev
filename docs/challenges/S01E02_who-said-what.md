# S01E02 — who said what

| Pole | Wartość |
| --- | --- |
| Kod | S01E02 |
| Tydzień / dzień | Week 1 — Core, dzień 2 |
| Data | 27 października 2026, otwarcie 05:00 CET |
| Prowadzący | Theo Browne |
| Strona HQ | [hq.mega.dev/challenges/who-said-what](https://hq.mega.dev/challenges/who-said-what) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Są dwa nagrania tej samej nocy z życia jednego produktu: audio i wideo. Trzeba ustalić,
co mówi każde z nich i w którym miejscu nagrania, a potem zapisać jeden wspólny raport
z tej nocy. Na koniec nowa sesja odpowiada na dodatkowe pytanie dotyczące obu nagrań.

## Role

- **Użytkownik:** w połowie pracy otwiera nową sesję harnessu i wkleja do niej prompt
  przygotowany przez pierwszą sesję.
- **Harness:** pierwsza sesja analizuje oba nagrania, wskazuje miejsca w nagraniach
  i zapisuje raport. Nowa sesja korzysta z raportu i odpowiada na dodatkowe pytanie.

## Wymagania

Wymagań wstępnych (konta, klucze, narzędzia) nie podano w źródłach odczytanych w tej sesji.

## Ograniczenia

- Praca jest podzielona na dwie sesje harnessu. Druga sesja startuje bez kontekstu
  pierwszej i zna tylko to, co zapisano w raporcie i w przekazanym prompcie.
- Odpowiedzi muszą obejmować oba nagrania.

## Kryterium ukończenia

Kurs przyjmuje odpowiedzi dla obu nagrań, wysłane z nowej sesji.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | rozwiązane 27 paź (run 1); run 2 w toku |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | rozwiązane |
| Strona wyzwania HQ (notatki z HQ) | 13.11.2026 | trwa druga próba |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

Strona HQ z 14.11.2026 godzi wcześniejsze statusy: wyzwanie zaliczono w runie 1, a run 2
jest otwarty. Flaga `solved: false` z MCP prawdopodobnie odnosi się do otwartego runu 2.

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Nagrania przekazuje
narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem runu 2, jest w [oryginale](../challenges-original/S01E02_who-said-what.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego
  i status z HQ wzięto wtedy z notatek z HQ w poprzedniej wersji [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
