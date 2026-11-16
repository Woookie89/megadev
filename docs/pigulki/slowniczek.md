# Słowniczek

| Termin | Znaczenie |
| --- | --- |
| harness | Program, który owija model: narzędzia, pliki instrukcji, skille, hooki, uprawnienia. Tu Claude Code i Codex. |
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
| claim | Zgłoszenie rozwiązania do kursu. Przy odmowie kurs zwykle nie podaje powodu. |
| debrief | Omówienie wyzwania po rozwiązaniu: przebieg, decyzje i wnioski. Kurs publikuje swój na stronie wyzwania, a repo ma własne w `docs/pl/*-debrief.md`. |
| Rook | Postać z fabuły kursu MEGA.dev. Jej krótkie komentarze do kroków wyzwań cytujemy w oryginale, po angielsku. |
| brief | Zlecenie dla innego agenta: zadanie, kryterium „gotowe”, skill, dostępy i sposób oddania wyniku ([P20](04-orkiestracja/p20-brief-jak-issue.md)). |
| worker | Agent, któremu główny agent zleca jedno zadanie. Ma własny kontekst i własne narzędzia ([P43](04-orkiestracja/p43-przekaz-skill-z-zadaniem.md)). |
| tryb headless (`claude -p`) | Claude Code uruchomiony bez interfejsu: dostaje prompt, pracuje sam i wypisuje wynik. |
| routine | Zadanie Claude Code uruchamiane w chmurze Anthropic (claude.ai/code): jednorazowo, według harmonogramu albo po zdarzeniu. |
| sandbox | Odizolowane środowisko, w którym działa agent. Ma tylko te pliki, narzędzia i dostęp do sieci, które mu udostępniono. |
| allowlista | Lista dozwolonych domen (albo komend). Wszystko spoza niej jest blokowane ([P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md)). |
| lane (tor) | Znacznik, który kurs przydziela uczestnikowi na starcie wyzwania (`laneMarker`). W S01E04 trafiał do `.env` jako `LANE_MARKER` i musiał być widoczny na opublikowanej stronie ([P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)). |

---

[← wszystkie pigułki](README.md)
