# Słowniczek

| Termin | Znaczenie |
| --- | --- |
| harness (uprząż) | Program, który owija model: narzędzia, pliki instrukcji, skille, hooki, uprawnienia. Tu Claude Code i Codex. |
| okno kontekstu | Wszystko, co model widzi w jednym wywołaniu. Poza nim model nic nie wie. |
| kompakcja | Skrócenie rozmowy, gdy kontekst się zapełnia. Stratna ([P01](01-kontekst/p01-kompakcja-jest-stratna.md)). |
| pętla agenta | Model woła narzędzie, dostaje wynik, decyduje dalej, aż przestanie wołać narzędzia. |
| podagent | Osobna instancja modelu z własnym kontekstem i briefem. Nie widzi rozmowy rodzica. |
| worktree | Osobny checkout tego samego repo w innym folderze, dzięki któremu równoległe zapisy się nie mieszają. |
| skill | Plik z instrukcją rutyny, którą harness ładuje, gdy zadanie jej dotyczy. |
| hook | Skrypt, który harness uruchamia przy zdarzeniu (np. `Stop`) i który może zablokować akcję. |
| MCP | Model Context Protocol: standard, którym serwer wystawia narzędzia dla dowolnego klienta AI. |
| prompt injection | Tekst w danych udający polecenie dla modelu ([P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md)). |
| najmniejsze uprawnienia | Agent ma tylko te prawa, których potrzebuje ([P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md)). |
| idempotencja | Powtórzenie tego samego żądania nie zmienia wyniku (deduplikacja po id). |
| ticket / receipt | Dowody kursu: ticket ze startu wyzwania, receipt za przyjęty krok. Mają terminy ważności. |
| claim | Zgłoszenie rozwiązania do kursu. Odmowa zwraca powód. |

---

[← wszystkie pigułki](README.md)
