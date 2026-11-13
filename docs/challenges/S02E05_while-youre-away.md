# S02E05 — while you're away

| Pole | Wartość |
| --- | --- |
| Kod | S02E05 |
| Tydzień / dzień | Week 2 — Agents, dzień 5 |
| Data | 6 listopada 2026, otwarcie 05:00 CET |
| Prowadząca | Angie Jones |
| Strona HQ | [hq.mega.dev/challenges/while-youre-away](https://hq.mega.dev/challenges/while-youre-away) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Agent ma pracować pod nieobecność użytkownika. Trzeba przenieść go do sandboxa na stale
działającej maszynie, dać mu sposób powiadamiania telefonu i zarejestrować kanał, przez
który pisze kurs. Część wiadomości agent obsługuje sam. Inne wymagają użytkownika i kodu,
który zna tylko on.

## Role

- **Użytkownik:** ustala, co agent robi sam, a co wymaga zgody, i podaje kod potrzebny do
  działań z jego udziałem. Wybiera okno 15–30 minut, które zaczyna się w ciągu 15 minut,
  i ma przy sobie telefon.
- **Harness:** przygotowuje agenta, który pod nieobecność użytkownika obsługuje wiadomości
  kursu na jednym kanale.

## Wymagania

- Agent, który odczytuje i obsługuje wybrany kanał.
- Bezpłatny sposób powiadamiania telefonu.
- Około 1,5 godziny na całość.

## Ograniczenia

- Część działań wymaga kodu od użytkownika i agent nie może ich wykonać sam.
- Próba odbywa się w wybranym oknie czasowym.

## Kryterium ukończenia

Kurs przyjmuje pełną próbę obsłużoną przez agenta pod nieobecność użytkownika.

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
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S02E05_while-youre-away.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącą,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
