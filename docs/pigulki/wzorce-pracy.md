# 9. Twoje wzorce pracy (MEGA Assessment, 10.11.2026)

Lokalny raport z 8 sesji i 19 epizodów pracy (`mega-assessment/raport-pl.md`). Pokazuje,
jak ty prowadzisz agentów, a nie jak agent rozwiązał zadanie.

### Mocne strony, które warto utrzymać

| Cecha | Wynik | Jak to wygląda |
| --- | --- | --- |
| T04 kotwiczenie kontekstu | 12/12 | Wskazujesz dokładne miejsca: funkcję, zaznaczoną linię, id artefaktu. |
| T18 podział praw decyzyjnych | 11/11 | Jasne punkty zgody: instalacje, konta, akcje destrukcyjne. |
| T02 poziom ujęcia problemu | 7/8 | Opisujesz ryzyko albo objaw, a nie gotową zmianę w kodzie. |
| T10 stopniowe ujawnianie kontekstu | 6/7 | Fazy: rozpoznanie, rekomendacja, budowa. |
| T05 precyzja ograniczeń | 12/14 | Jawne zakazy: bez zmian przed wnioskami, bez czytania sekretów. |

### Do poprawy: jeden nawyk na każdą słabość

| Cecha | Wynik | Nawyk |
| --- | --- | --- |
| T06 sprawdzalne kryteria akceptacji | 6/16 | Każde zlecenie kończ zdaniem „gotowe, gdy …” ([P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md)). |
| T15 trafność delegowania | 1/4 | Niezależny research wprost do podagentów ([P21](04-orkiestracja/p21-deleguj-research.md)). |
| T07 najpierw zrozumienie | 2/4 | Przy podejrzanym błędzie najpierw „odtwórz”, potem „napraw”. |
| T16 dekompozycja | 2/4 | Przy planie wieloetapowym podaj, jak sprawdzić każdy krok osobno. |
| T23 domknięcie weryfikacji | 7/12 | Po ostatniej edycji dokumentu albo ustawień jedno sprawdzenie. |
| T10 (antywzorzec) | — | Dodatki (README, `.env`, uruchamianie) w pierwszej wiadomości, nie w kolejce w trakcie budowy. |
| T22 kalibracja zaufania | 7/10 | Duże zmiany w wielu plikach: czytaj diff, nie tylko podsumowanie. |

---

[← wszystkie pigułki](README.md)
