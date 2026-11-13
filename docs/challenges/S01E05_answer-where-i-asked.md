# S01E05 — answer where i asked

| Pole | Wartość |
| --- | --- |
| Kod | S01E05 |
| Tydzień / dzień | Week 1 — Core, dzień 5 |
| Data | 30 października 2026, otwarcie 05:00 CET |
| Prowadzący | Theo Browne |
| Strona HQ | [hq.mega.dev/challenges/answer-where-i-asked](https://hq.mega.dev/challenges/answer-where-i-asked) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Trzeba naprawić to, co zostało otwarte w kursowym projekcie rig, i uruchomić agenta na
wybranym hostingu. Agent sam odpowiada recenzentowi kursu, gdy ten zapyta o stan rigu.
Drugi agent pisze test dla otwartego błędu.

## Role

- **Użytkownik:** wybiera hosting, zatwierdza wdrożenie i sam zapisuje klucz modelu
  w sekretach hostingu.
- **Harness:** czyta projekt startowy, buduje obu agentów i plik ich uprawnień, a po
  zgodzie użytkownika wdraża ich.

## Wymagania

- Publiczny hosting z HTTPS.
- Klucz API modelu.

## Ograniczenia

- Klucz modelu wpisuje użytkownik, nie harness.
- Płatny klucz nalicza opłaty za każde wywołanie.
- Agent odpowiada bez udziału użytkownika.

## Kryterium ukończenia

Agent odpowiada recenzentowi, a kurs przyjmuje zgłoszenie.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | rozwiązane (Solved, pt 13 lis); 1 run, 1 debrief |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | rozwiązane |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `true` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026: strona nie ma załączników (0 plików). Projekt startowy
przekazuje narzędzie `start-challenge`.

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony jest w [oryginale](../challenges-original/S01E05_answer-where-i-asked.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego,
  status z HQ i wymagania wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md).
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
