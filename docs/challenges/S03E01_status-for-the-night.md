# S03E01 — status for the night

| Pole | Wartość |
| --- | --- |
| Kod | S03E01 |
| Tydzień / dzień | Week 3 — Product, dzień 1 |
| Data | 9 listopada 2026, otwarcie 05:00 CET |
| Prowadzący | Kent C. Dodds |
| Strona HQ | [hq.mega.dev/challenges/status-for-the-night](https://hq.mega.dev/challenges/status-for-the-night) |
| Sposób startu | w przeglądarce, na stronie wyzwania |

## Cel

Product potrzebuje publicznej strony statusu na noc. Wymagania przysłało sześć osób,
każda w innej formie. Trzeba złożyć z nich jedną listę wymagań z odwołaniami do źródeł,
a potem zbudować i wdrożyć stronę zgodną z tą listą.

## Role

- **Użytkownik:** loguje się na stronie wyzwania, bo jedno ze źródeł jest dostępne tylko
  tam.
- **Harness:** tworzy listę wymagań z odwołaniami do źródeł, buduje stronę i ją wdraża.

## Wymagania

- Publiczny hosting HTTPS, dostępny bez logowania.
- Logowanie do kursu, żeby odczytać źródło dostępne tylko na stronie wyzwania.

## Ograniczenia

- Nie wszystkie źródła docierają do harnessu. Część jest tylko na stronie wyzwania.
- Sprzeczne wymagania rozstrzyga product owner, a nie harness.

## Kryterium ukończenia

Kurs przyjmuje najpierw listę wymagań, a potem wdrożoną stronę.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | otwarte, jeszcze nierozwiązane (Open · not solved yet) |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | otwarte |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026. Według opisu jest sześć źródeł wymagań: notatka, zrzut
ekranu, nagranie, PDF, zdjęcie tablicy i bieżąca tablica. Pięć z nich jest w paczce, którą
przekazuje kurs (na stronie HQ nie ma plików do pobrania). Szóste źródło jest linkiem tylko
na stronie HQ:

| Nazwa | Rozmiar | Link |
| --- | --- | --- |
| „tram 3 board” (bieżąca tablica) | nie podano (strona, nie plik) | `https://hq.mega.dev/challenges/status-for-the-night/board?t=…`: link z osobistym tokenem, który wygasa, więc tokenu tu nie zapisano; aktualny link jest na [stronie HQ](https://hq.mega.dev/challenges/status-for-the-night) po zalogowaniu |

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S03E01_status-for-the-night.md).
  Linku do tablicy nie otwierano.
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
