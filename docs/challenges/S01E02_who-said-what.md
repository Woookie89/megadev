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
| Debrief HQ (`s01e02/hq-debrief.md`, wklejony przez człowieka) | 24.11.2026 | 1 run rozwiązany, run 2 w toku. Run 1: 2026-10-27, harness Claude Code (mega-challenge), model nie podany („Not reported by your harness”), 1 odrzucona próba, 1 snag |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | rozwiązane |
| Strona wyzwania HQ (notatki z HQ) | 13.11.2026 | trwa druga próba |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

Strona HQ z 14.11.2026 i debrief HQ z 24.11.2026 godzą statusy z listy HQ i ze strony wyzwania:
wyzwanie zaliczono w runie 1 (27.10.2026), a run 2 jest w toku. **Rozbieżność z flagą `solved: false`
z MCP jest otwarta.** Wcześniej zakładano, że flaga odnosi się do otwartego runu 2, ale to
przypuszczenie: odczyty MCP (9.11 i 13.11.2026) przypadają po rozwiązaniu runu 1, a po 13.11 flagi
nie odczytano ponownie. Do sprawdzenia nowym `list-challenges`. Nie znaleziono też, jak próby z
logu repo (8–9 i 19.11.2026) odpowiadają dwóm runom z HQ.

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Nagrania przekazuje
narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem runu 2, jest w [oryginale](../challenges-original/S01E02_who-said-what.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego
  i status z HQ wzięto wtedy z notatek z HQ w poprzedniej wersji [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
- 24.11.2026: debrief HQ (`s01e02/hq-debrief.md`; wklejka bez nagłówka z kodem odcinka, więc
  epizod rozpoznano po zadaniu). Pytanie w runie 1 dotyczyło godziny startu nocnego batcha, a w
  próbach z logu repo brzmiało „How many invites moved?”. Powodu różnicy nie znaleziono.
