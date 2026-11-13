# S03E03 — out of office

| Pole | Wartość |
| --- | --- |
| Kod | S03E03 |
| Tydzień / dzień | Week 3 — Product, dzień 3 |
| Data | 11 listopada 2026, otwarcie 05:00 CET |
| Prowadzący | Kent C. Dodds |
| Strona HQ | [hq.mega.dev/challenges/out-of-office](https://hq.mega.dev/challenges/out-of-office) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

API produktu do planowania jest dostarczone jako projekt startowy. Przez około 20 minut
product i support otwierają issues w trackerze kursu, gdy użytkownika nie ma. Agent ma
sam podejmować każde issue, wdrażać zmiany na żywy adres HTTPS, pytać użytkownika tylko
o decyzje należące do niego i prowadzić dziennik wdrożeń.

## Role

- **Użytkownik:** dostarcza potrzebne logowania i klucze oraz odpowiada na pytania na
  stronie rundy. Nie zmienia kodu.
- **Harness:** przygotowuje agenta na wybranym hostingu. Agent odbiera i realizuje issues
  według skilla triage.

## Wymagania

- Hosting z publicznym adresem HTTPS.
- Klucz API modelu.
- Około 20 minut dostępności na pytania, plus czas do zakończenia pracy agenta.

## Ograniczenia

- Użytkownik nie zmienia kodu.
- Agent pyta tylko o decyzje, które należą do użytkownika.
- Tracker kursu symuluje środowisko pracy. Runda nie dotyka kont zespołu użytkownika.

## Kryterium ukończenia

Gdy napłyną wszystkie issues i zmiany zostaną wdrożone, harness wysyła wynik, a kurs go
przyjmuje.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | otwarte, jeszcze nierozwiązane (Open · not solved yet) |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | otwarte |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `false` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Projekt startowy
przekazuje narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S03E03_out-of-office.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
