# S02E02 — nobody asked

| Pole | Wartość |
| --- | --- |
| Kod | S02E02 |
| Tydzień / dzień | Week 2 — Agents, dzień 2 |
| Data | 3 listopada 2026, otwarcie 05:00 CET |
| Prowadząca | Angie Jones |
| Strona HQ | [hq.mega.dev/challenges/nobody-asked](https://hq.mega.dev/challenges/nobody-asked) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Trzeba zbudować małego agenta dostępnego przez e-mail. Agent ma własny adres, wykonuje
prośby własnymi narzędziami i odpowiada w tym samym wątku. Jego adres trafia do kursu,
który pisze do agenta pod nieobecność użytkownika.

## Role

- **Użytkownik:** zakłada konto AgentMail i przekazuje klucz AgentMail oraz klucz modelu.
- **Harness:** buduje agenta i przekazuje kursowi jego adres.

## Wymagania

- Konto i klucz AgentMail.
- Klucz API modelu.

## Ograniczenia

- Klucz AgentMail nie może pojawić się w wiadomościach agenta. Jego ujawnienie unieważnia
  rundę.
- Odpowiedź musi przyjść w tym samym wątku i w ciągu 10 minut.

## Kryterium ukończenia

Runda jest zaliczona, gdy agent odpowie na wiadomość kursu w tym samym wątku, w ciągu
10 minut i z wymaganą treścią.

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
  strony, z promptem startowym, jest w [oryginale](../challenges-original/S02E02_nobody-asked.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącą,
  status z HQ, wymagania i ograniczenia wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
