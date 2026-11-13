# S03E05 — what came back

| Pole | Wartość |
| --- | --- |
| Kod | S03E05 |
| Tydzień / dzień | Week 3 — Product, dzień 5 |
| Data | 13 listopada 2026, otwarcie 05:00 CET |
| Prowadzący | Kent C. Dodds |
| Strona HQ | [hq.mega.dev/challenges/what-came-back](https://hq.mega.dev/challenges/what-came-back) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Dwa tygodnie po dwóch wydaniach zespół zebrał wszystkie sygnały. Trzeba je przejrzeć
i pogrupować, a dla każdej grupy wybrać jedną z sześciu akcji i podać identyfikatory
sygnałów, na których opiera się wybór.

## Role

- **Użytkownik:** podejmuje decyzje wskazane przez harness jako należące do niego. Potem
  pobiera kod ze strony kursu i przekazuje go harnessowi.
- **Harness:** analizuje oba zestawy, grupuje sygnały, rozstrzyga pozostałe przypadki
  i przygotowuje uzasadnione akcje.

## Wymagania

- Około 45 minut w jednej sesji.
- Logowanie do kursu.

## Ograniczenia

- Każda grupa dostaje dokładnie jedną z sześciu dozwolonych akcji.
- Każda akcja musi wskazywać identyfikatory sygnałów źródłowych.
- Decyzje należące do użytkownika podejmuje użytkownik, nie harness.

## Kryterium ukończenia

Kurs przyjmuje oba zestawy, a jedna reguła zostaje zachowana.

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
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S03E05_what-came-back.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
- Ani notatki z HQ, ani strona HQ (14.11.2026) nie mówią, której reguły dotyczy kryterium
  ukończenia („one rule is kept”). Wyjaśni to prawdopodobnie dopiero `start-challenge`.
