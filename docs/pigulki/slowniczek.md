# Słowniczek

| Termin | Znaczenie |
| --- | --- |
| harness (w transkryptach: uprząż) | Program, który owija model: narzędzia, pliki instrukcji, skille, hooki, uprawnienia. Tu Claude Code i Codex. |
| okno kontekstu | Wszystko, co model widzi w jednym wywołaniu. Poza nim model nic nie wie. |
| kompakcja | Skrócenie rozmowy, gdy kontekst się zapełnia. Stratna ([P01](01-kontekst/p01-kompakcja-jest-stratna.md)). |
| pętla agenta | Model woła narzędzie, dostaje wynik, decyduje dalej, aż przestanie wołać narzędzia. |
| subagent | Osobna instancja modelu z własnym kontekstem i briefem. Nie widzi rozmowy rodzica. |
| worktree | Osobny checkout tego samego repo w innym folderze, dzięki któremu równoległe zapisy się nie mieszają. |
| skill | Plik z instrukcją rutyny, którą harness ładuje, gdy zadanie jej dotyczy. |
| hook | Skrypt, który harness uruchamia przy zdarzeniu (np. `Stop`) i który może zablokować akcję. |
| MCP | Model Context Protocol: standard, którym serwer wystawia narzędzia dla dowolnego klienta AI. |
| prompt injection | Tekst w danych udający polecenie dla modelu ([P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md)). |
| najmniejsze uprawnienia | Agent ma tylko te prawa, których potrzebuje ([P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md)). |
| idempotencja | Powtórzenie tego samego requestu nie zmienia wyniku (deduplikacja po id). |
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
| ship log / ship line | Log wdrożeń w trackerze S03E03: jedna linia na issue, `#<issue> · <verb> · live: ✓\|✗ · open risks: …`. `live: ✓` wolno wpisać dopiero po odczycie zmiany z adresu na żywo ([P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)). |
| próba na makiecie (rehearsal, mock tracker) | Przebieg agenta na lokalnej atrapie trackera i feedu, z wdrożeniem na sucho, przed prawdziwą rundą. W S03E03 wykryła błąd hosta, ale nie błąd z rekordem, bo nie miała takiego issue ([P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)). |
| supervisor | Osobny proces, który pilnuje agenta w tle: uruchamia go ponownie po każdym wyjściu i kończy pracę, gdy zniknie plik-flaga ([P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md)). |
| replay (sprawdzarka kursu) | Skrypt kursu, który używa wdrożonej strony jak człowiek (patrzy, celuje, klika po chwili) i drukuje wynik jako JSON. W S03E04 litery nonce wybierały sprawdzenia, a wynik szedł do claimu kroku 2 ([P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md)). |
| render po kluczu (keyed render) | Odświeżenie listy, które rozpoznaje wiersze po id: wiersze już widoczne zostają w DOM, dochodzą tylko nowe, a zmienia się tylko to, co się zmieniło. Przeciwieństwo przebudowy całej listy przez `innerHTML`, przy której lista mruga ([P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md)). |
| blok `evidence` | Blok JSON na końcu raportu z dowodem w polach: przepływ, moment `mm:ss`, `expected` (co miało się stać), `got` (co się stało), sha buildu, link do nagrania i receipt ([P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md)). |
| stempel buildu (build sha) | Skrót commitu wpisany w stronę (`<meta name="build">`, stopka), żeby nagranie i dowód mówiły, który build pokazują. W S03E04 to ostatni commit, który zmienił `app/` ([P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md)). |
| system diff | Zestawienie dla człowieka: co zmieniło się w zachowaniu, UX i danych względem planu, jakie decyzje zapadły i jakie czekają. W S03E04 obowiązkowa sekcja raportu kroku 2 ([P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)). |
| bariera (guardrail) | Granica zapisana w rekordzie wydania, której metryka pomocnicza nie może przekroczyć (np. mediana TTR najwyżej +5%). Przekroczona bariera to błąd: zespół poprawia albo wycofuje, bez decyzji właściciela ([P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md)). |
| werdykt (verb) | Jedna z sześciu decyzji S03E05 dla grupy sygnałów: `expand`, `revise`, `simplify`, `revert`, `investigate`, `stop`. Wpisana z id sygnałów i polem `who` (`agent` albo `owner`) ([P59](02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md)). |
| wyciek sekretu (secret egress) | Wysłanie sekretu (klucza, ticketu) do hosta, do którego nie miał trafić. W S04E01 pierwszy przebieg wysłał klucz ćwiczebny do `verify-s04.mega.dev`, hosta z podręcznika, i kurs odrzucił przebieg ([P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)). |
| wire log | Plik, w którym skrypt zapisuje każdy request: host, nazwy headerów (nie wartości), status i host przekierowania. Pozwala powiedzieć, dokąd poszedł każdy sekret ([P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)). |
| zaparkowane zadanie (parked, `needs-owner`) | Zadanie, którego agent nie rozstrzyga sam: dostaje flagę `needs-owner` z powodem i czeka na decyzję właściciela. W S04E01 właściciel wybiera na stronie wyzwania (`on-file`, `new`, `decline`), a agent kończy zadanie osobnym krokiem ([P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md)). |
| konto z akt (account on file) | Jedyne konto, na które wolno wypłacać według podręcznika S04E01. Różni się między próbami, więc skrypt czyta je z podręcznika za każdym razem ([P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md)). |
| hunk | Jeden spójny fragment zmiany (patcha) w pliku, z własnym id, np. `h-be5`. W S04E02 reviewer wystawia werdykt `flag` albo `pass` dla każdego hunka osobno ([P66](04-orkiestracja/p66-rola-ma-piec-czesci.md)). |
| pięć części roli (Purpose, Tools, Limits, Startup reads, Output) | Słownik sterowania z S04E02: co rola robi, jakich narzędzi używa, czego jej nie wolno, co czyta na starcie i jaki wynik oddaje ([P66](04-orkiestracja/p66-rola-ma-piec-czesci.md)). |
| notatki `why/` (house notes) | Krótkie pliki obok kodu: decyzja, dlaczego, co z tego wynika. W S04E02 trzy: `nights.md`, `payout-date.md`, `payout-rounding.md` ([P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md)). |
| ustawienia domu (`/settings`) | Żywy odczyt wersji i prowizji w S04E02. Zmienia się z każdą próbą, więc rola czyta go na starcie, a nie kopiuje do `ROLE.md` ([P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md)). |

---

[← wszystkie pigułki](README.md)
