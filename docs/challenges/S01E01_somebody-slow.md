# S01E01 — somebody slow

| Pole | Wartość |
| --- | --- |
| Kod | S01E01 |
| Tydzień / dzień | Week 1 — Core, dzień 1 |
| Data | 26 października 2026, otwarcie 05:00 CET |
| Prowadzący | Theo Browne |
| Strona HQ | [hq.mega.dev/challenges/somebody-slow](https://hq.mega.dev/challenges/somebody-slow) |
| Sposób startu | w przeglądarce, na stronie wyzwania (po zalogowaniu) |

## Cel

Na stronie wyzwania czeka wiadomość, od której zaczyna się fabuła kursu. Harness ma ją
przekazać kursowi w skróconej formie, a potem odpowiedzieć na jedno pytanie w formularzu.

## Role

- **Użytkownik:** loguje się w przeglądarce, którą harness może sterować, przegląda wycięte
  fragmenty i może poprosić o przywrócenie któregoś z nich. Zatwierdza każdą zmianę już
  wysłanej odpowiedzi.
- **Harness:** czyta całą wiadomość, ustala format i limit długości, samodzielnie wybiera
  skróty, wysyła wersję skróconą i wypełnia formularz. Prowadzi dziennik wysłanych treści
  i odpowiedzi.

## Wymagania

- Przeglądarka, którą harness może sterować, zalogowana na konto kursu.

## Ograniczenia

- Jeden wskazany akapit musi pozostać bez zmian, słowo w słowo.
- Skrócona wersja musi zmieścić się w limicie pola: 700 znaków (pełna wiadomość ma 1288 znaków,
  według debriefu HQ i schematu żądania).
- Zmiana już wysłanej odpowiedzi wymaga zgody użytkownika.

## Kryterium ukończenia

Formularz przyjmuje odpowiedź, a kurs zalicza wyzwanie.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Strona HQ (State) | 14.11.2026 | rozwiązane (Solved, nd 8 lis); 2 runy rozwiązane, 2 debriefy |
| Debrief HQ (`s01e01/hq-debrief.md`, wklejony przez użytkownika) | 24.11.2026 | 2 runy rozwiązane. Run 1: 2026-10-27, harness Claude Code (mega-challenge), model nie podany, 5 odrzuconych prób, 4 snagi. Run 2: 2026-11-08, Visual Studio Code, model nie podany, 1 odrzucona próba, 1 snag. Wklejono tylko run 1 i tabelę porównawczą obu runów |
| Lista wyzwań HQ (notatki z HQ) | 13.11.2026 | rozwiązane |
| Serwer MCP kursu (`solved`) | 13.11.2026 | `true` |

## Materiały i załączniki

Stan ze strony HQ z 14.11.2026. Załączników nie pobierano.

| Nazwa | Rozmiar | Link |
| --- | --- | --- |
| `fail.txt` | 0 B | strona nie podaje linku (opis: „i keep meaning to write it”) |
| `schema.json` | 2.1 KB | [#attachment-unavailable](https://hq.mega.dev/challenges/somebody-slow#attachment-unavailable): link „didn't make it”, strona nie wyświetla pliku (to część wyzwania) |

## Źródła i braki

- 14.11.2026: odczytano stronę HQ w zalogowanej sesji Chrome (tylko odczyt). Dosłowna treść
  strony i lista załączników są w [oryginale](../challenges-original/S01E01_somebody-slow.md).
- Wcześniej (13.11.2026) strony HQ nie odczytano, bo wymaga logowania. Datę, prowadzącego,
  status z HQ i listę materiałów wzięto wtedy z notatek z HQ w poprzedniej wersji
  [indeksu](../challenges.md); strona HQ z 14.11.2026 je potwierdza.
- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (13.11.2026).
- 24.11.2026: debrief HQ (`s01e01/hq-debrief.md`) daje daty rozwiązania, harness i liczby
  odrzuconych prób. Nie znaleziono modelu harnessu ani godziny rozwiązania. Tekstu debriefu runu 2
  użytkownik nie wkleił.
- Pełna treść zadania i wiadomość są na [stronie HQ](https://hq.mega.dev/challenges/somebody-slow).
