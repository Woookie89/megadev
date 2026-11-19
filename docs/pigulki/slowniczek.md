# Słowniczek

| Termin | Znaczenie |
| --- | --- |
| harness (w transkryptach: uprząż) | Program, który owija model: narzędzia, pliki instrukcji, skille, hooki, uprawnienia. Tu Claude Code i Codex. |
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
| free / gated | Podział akcji agenta w S02E05: akcję free agent wykonuje sam, akcję gated wstrzymuje do zgody właściciela ([P47](07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md)). |
| tag wymagania | Krótki identyfikator jednego wymagania, np. `R-K8L`. W S03E01 każdy tag dostawał źródło: plik i miejsce w nim (sekundę nagrania albo obszar obrazu) ([P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md)). |
| pytanie do właściciela (`ownerQuestion`) | Jedno pytanie, które nazywa obie strony sprzeczności. Agent je zadaje, a rozstrzyga właściciel produktu ([P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)). |
| contact sheet | Jeden obraz z wieloma klatkami nagrania w siatce, np. jedna klatka na sekundę. Pozwala zobaczyć, co było na ekranie, bez oglądania całości ([P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md)). |
| canvas | Element strony, na którym skrypt rysuje piksele. Narysowanego tekstu nie ma w HTML, więc trzeba go odczytać ze zrzutu ekranu ([P03](01-kontekst/p03-zrodlo-to-nie-widok.md)). |
| subdomena `workers.dev` | Adres konta w Cloudflare Workers (`<nazwa>.workers.dev`). Rejestruje się ją raz na konto, przed pierwszym publicznym wdrożeniem ([P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md)). |
| triage | Rozstrzygnięcie każdego zgłoszenia wobec tego, co już jest w trackerze i w regułach: scalić, zamknąć z powodem, założyć nowe issue albo oddać człowiekowi ([P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md)). |
| `agent-ready` / `needs-human` | Dwa znaczniki otwartego issue w S03E02: agent zrobi je sam (z linią `Allowed by AUT-1`) albo czeka ono na decyzję człowieka (pytanie z opcjami, rekomendacją i powodem) ([P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md)). |
| `blocked-by` | Pole issue: lista issue, które muszą być zrobione wcześniej. Kolejność pracy wyznaczają te zależności, a nie pilność ([P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md)). |
| poller z kursorem | Skrypt, który co kilka sekund pyta kanał o nowe wpisy, podając kursor (`since`) z poprzedniej odpowiedzi, więc dostaje tylko to, co przyszło potem ([P52](05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md)). |
| IP wyjściowe (egress IP) | Adres, z którego serwer łączy się z internetem. Darmowe hosty dzielą go z wieloma klientami, więc limit liczony per IP mogą wyczerpać inni ([P46](05-agent-bez-czlowieka/p46-testuj-droge-z-hosta-agenta.md)). |
| rekord decyzji (decision record) | Krótki zapis jednej decyzji produktu w stałym formacie (jak ADR): prośba, opcje, rekomendacja, koszt pomyłki, próg ponownego otwarcia, decyzja. Ma status (`proposed`, `accepted`) i podpis właściciela. Wiąże dopiero przyjęty i podpisany ([P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md)). |
| próg ponownego otwarcia (reopen threshold) | Pole rekordu decyzji: dowód, który pozwala wrócić do decyzji, np. zachowanie użytkowników albo pisemna potrzeba prawna. Bez niego agent nie otwiera decyzji na nowo ([P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md)). |
| ship log / ship line | Dziennik wdrożeń w trackerze S03E03: jedna linia na issue, `#<issue> · <verb> · live: ✓\|✗ · open risks: …`. `live: ✓` wolno wpisać dopiero po odczycie zmiany z adresu na żywo ([P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)). |
| próba na makiecie (rehearsal, mock tracker) | Przebieg agenta na lokalnej atrapie trackera i feedu, z wdrożeniem na sucho, przed prawdziwą rundą. W S03E03 wykryła błąd hosta, ale nie błąd z rekordem, bo nie miała takiego issue ([P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)). |
| supervisor | Osobny proces, który pilnuje agenta w tle: uruchamia go ponownie po każdym wyjściu i kończy pracę, gdy zniknie plik-flaga ([P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md)). |

---

[← wszystkie pigułki](README.md)
