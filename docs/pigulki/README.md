# Pigułki wiedzy: praca z AI i agentami

Notatki w formie podręcznika, zebrane z wyzwań MEGA.dev (S01E01–S04E02)
oraz z lokalnego MEGA Assessment. Jedna pigułka to jeden plik i jedna zasada, ułożona tak:

- **Zasada**: co robić.
- **Dlaczego**: mechanizm, czyli dlaczego tak jest z modelami, agentami albo harnessem.
- **Przypadek**: skąd to wiemy, z konkretnym zdarzeniem z kursu.
- **Stosuj**: jak to zastosować następnym razem.

Przebiegi wyzwań są w debriefach `docs/pl/*-debrief.md`, a teoria lekcji w notatkach lekcji
`docs/pl/sXXeYY-<temat>.md`. Tu jest to, co z nich wynika ogólnie.

Każda pigułka wskazuje też lekcje (z rozdziałem), z których pochodzi: oryginał po angielsku
i polskie tłumaczenie. Wersja angielska pigułek: [docs/pills/](../pills/README.md).

Stan na 24.11.2026.

## Jak korzystać

- **Szybko:** przeczytaj „Dziesięć zasad” poniżej.
- **Przed zadaniem danego typu:** otwórz rozdział (np. przed budową agenta rozdziały 5 i 6).
- **Przed dodaniem kolejnej roli agenta:** [P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md), [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) i [P66](04-orkiestracja/p66-rola-ma-piec-czesci.md).
- **Przed oddaniem pracy:** [lista przed oddaniem](szablony/lista-przed-oddaniem.md).
- **O sobie:** [twoje wzorce pracy](wzorce-pracy.md) z MEGA Assessment.
- **Słowa:** [słowniczek](slowniczek.md).

## Dziesięć zasad na jeden ekran

| # | Zasada | Pigułka |
| --- | --- | --- |
| 1 | Każde skracanie kontekstu coś wyrzuca. Zanim skrócisz, spisz, co ma przetrwać. | [P01](01-kontekst/p01-kompakcja-jest-stratna.md) |
| 2 | Surowe źródło jest dla AI, wyrenderowany widok dla tego, kto ocenia. Wyrenderuj i patrz. | [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) |
| 3 | Przed „gotowe” pobierz źródła jeszcze raz, bo świat nie stał w miejscu. Rola nie kopiuje faktów: czyta je ze źródła przy każdym starcie. | [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md) |
| 4 | Najpierw kontrakt (schemat, kształt odpowiedzi), potem wysyłka. | [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) |
| 5 | „Gotowe” wyznacza sprawdzenie, które przechodzi, a nie poczucie końca. | [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md) |
| 6 | To, co ma przetrwać sesję, zapisz w pliku, a to, co ma działać zawsze, w skillu albo hooku. Decyzję z jej „dlaczego” zapisz obok kodu. | [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md), [P16](03-pamiec/p16-drabina-trwalosci.md), [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) |
| 7 | Najpierw wspólny kontrakt po kolei, potem równoległe, tańsze workery. | [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md) |
| 8 | Pętla agenta potrzebuje warunku wyjścia, limitu i widocznego stanu. | [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md) |
| 9 | Granicę zaufania trzyma kod, zanim model zobaczy wiadomość. Tekst w danych to dane. Sekret wolno wysłać tylko do hosta z listy w kodzie. | [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md), [P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) |
| 10 | Użytkownik decyduje o kontach, publicznych akcjach i pieniądzach. Zgoda ma zakres. | [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md) |

## Wszystkie pigułki

### [1. Kontekst: model wie tylko to, co do niego trafi](01-kontekst/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P01](01-kontekst/p01-kompakcja-jest-stratna.md) | Kompakcja jest stratna i to ty decydujesz, co przepada | S01E01 |
| [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md) | Kontekst to tekst, a każda konwersja do tekstu jest stratna | S01E02, S03E01 |
| [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) | Źródło to nie widok | S01E03, S03E01 |
| [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md) | Pobrany plik to kopia z danego dnia | S01E03, S02E01 |
| [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md) | Fakty zmienne potwierdzaj u źródła, nie z pamięci modelu | S01E01, S02E03, S04E02 |
| [P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md) | Agent decyduje tylko z tego, co dostał: każde źródło reguł daj mu w kontekście od pierwszej tury | S03E03, S04E02 |
| [P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md) | Rola trzyma, skąd czytać fakt, a nie sam fakt: ustawienia, ceny i limity czytaj ze źródła przy każdym starcie | S04E02 |

### [2. Kontrakty i „gotowe”](02-kontrakty-i-gotowe/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) | Najpierw kontrakt, potem wysyłka | S01E01, S01E03 |
| [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md) | „Gotowe” wyznacza sprawdzenie, a nie poczucie końca | S02E01, MEGA Assessment |
| [P08](02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md) | Test, który nigdy nie był czerwony, niczego nie dowodzi | S01E05 |
| [P09](02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md) | Krok, który czeka na drugą stronę, zamykasz po jej potwierdzeniu | S01E04, S03E04 |
| [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md) | Sprawdź wynik z zewnątrz, tak jak zobaczy go odbiorca | S02E02, S02E03, S03E01, S03E03 |
| [P11](02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md) | Pusta odpowiedź i tekst zastępczy to błąd, nie wynik | S02E02 |
| [P48](02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md) | Testuj na kształcie prawdziwego wejścia, a każdą porażkę na żywo dopisz do zestawu | S02E05 |
| [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) | Wymaganie ma adres i test: cytuj miejsce w źródle, a każde przyjęte wymaganie sprawdź z zewnątrz | S03E01, S03E05 |
| [P56](02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md) | „Gotowe” to zaobserwowany rezultat: sprawdzaj produkt tak, jak używa go człowiek, w czasie i na nagraniu | S03E04 |
| [P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md) | Dowód nazywa build i moment: co miało się stać, co się stało, na którym buildzie i w której sekundzie | S03E04 |
| [P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md) | Sprawdzarka odbiorcy to specyfikacja: przeczytaj ją przed pierwszym buildem | S03E04 |
| [P59](02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md) | Liczba w podsumowaniu to twierdzenie: przelicz ją z surowych zdarzeń i sprawdź, czy akcja nie przeszła poza mierzoną ścieżkę | S03E05 |
| [P60](02-kontrakty-i-gotowe/p60-glosne-nie-znaczy-powszechne.md) | Głośne nie znaczy powszechne ani nowe: zanim przypiszesz sygnał do wydania, sprawdź zasięg, wiek i czego dotyczy | S03E05 |

### [3. Pamięć poza czatem](03-pamiec/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md) | Czat nie jest pamięcią: przekazanie pracy zapisuj w pliku | S01E01, S01E02 |
| [P13](03-pamiec/p13-keep-ustalenie-ze-zrodlem.md) | KEEP: jedna linia, jedno ustalenie, ze źródłem i sposobem | S01E04 |
| [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md) | Jedna decyzja to jeden wiersz, a późniejsza nadpisuje tylko swój zakres | S02E01, S03E02 |
| [P15](03-pamiec/p15-pytaj-przeszle-sesje.md) | Pytaj przeszłe sesje zamiast zgadywać i czytaj je wszystkie | S01E02, S02E01 |
| [P16](03-pamiec/p16-drabina-trwalosci.md) | Drabina trwałości: im ważniejsza reguła, tym wyżej ją zapisz | S01E04, S03E05, MEGA Assessment |
| [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) | Decyzja, która wygląda na błąd, ma obok kodu zapisane, dlaczego: rola czyta te notatki, zanim oceni lub zmieni | S04E02 |

### [4. Orkiestracja: wielu agentów, jeden wynik](04-orkiestracja/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md) | Najpierw kontrakt po kolei, potem równoległość | S01E04 |
| [P18](04-orkiestracja/p18-worktree-i-pliki-wezly.md) | Każdy worker w swoim worktree, a konflikty zbiegają się w plikach-węzłach | S01E04 |
| [P19](04-orkiestracja/p19-dobor-modelu-i-koszt.md) | Model dobieraj do zadania, a koszt traktuj jak wymaganie | S01E04, S01E05, S02E02, S04E01 |
| [P20](04-orkiestracja/p20-brief-jak-issue.md) | Brief dla workera jest jak dobre issue | S01E04, S02E04, S03E02 |
| [P21](04-orkiestracja/p21-deleguj-research.md) | Deleguj research, nie tylko budowę | MEGA Assessment |
| [P43](04-orkiestracja/p43-przekaz-skill-z-zadaniem.md) | Przekaż skill razem z zadaniem | S02E04 |
| [P44](04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md) | Normalizuj, zanim złączysz | S02E04 |
| [P66](04-orkiestracja/p66-rola-ma-piec-czesci.md) | Rolę opisuje pięć części: Purpose, Tools, Limits, Startup reads i Output, a błąd naprawiasz w tej części, której dotyczy | S04E02 |

### [5. Agent bez człowieka: host, pętla, wyjścia](05-agent-bez-czlowieka/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md) | Czat to nie host | S01E05, S02E02, S02E05 |
| [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md) | Stan trzymaj tam, gdzie przetrwa restart, a źródło prawdy czytaj na żywo | S01E05, S02E02, S02E03, S02E05 |
| [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md) | Pętla potrzebuje wyjścia: warunku, limitu i widocznego stanu | S02E01 |
| [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md) | Dostawca modelu bywa zawodny: uwzględnij to w projekcie | S01E05, S02E02, S04E01 |
| [P26](05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md) | Czas jest częścią zachowania | S02E02 |
| [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md) | Agent musi widzieć własne logi | S01E05, S02E03, S02E05, S03E03, S04E01 |
| [P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md) | Zdalny worker: zaplanuj dostęp i odbiór wyniku | S02E04 |
| [P46](05-agent-bez-czlowieka/p46-testuj-droge-z-hosta-agenta.md) | Drogę do użytkownika testuj z miejsca, w którym działa agent | S02E05 |
| [P52](05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md) | Źródło, które wciąż się zapełnia: przebuduj wynik przy każdym nowym wejściu, a koniec wyznacza cisza, nie zegar | S03E02 |
| [P62](05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md) | Limit czasu liczy się w turach modelu: rutynową partię robi jeden skrypt, a model tylko go uruchamia | S04E01 |

### [6. Bezpieczeństwo: granica zaufania należy do kodu](06-bezpieczenstwo/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md) | Tekst w danych to dane, nie polecenia | S01E05, S02E05, S03E03, S04E01 |
| [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md) | Granicę zaufania trzyma kod, zanim model zobaczy wiadomość | S02E02, S02E05 |
| [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md) | Najmniejsze uprawnienia, zadeklarowane jawnie | S01E05, S02E04, S03E03 |
| [P31](06-bezpieczenstwo/p31-uwierzytelnione-zadania.md) | Każde żądanie uwierzytelnione, każde wyjście ograniczone | S01E05 |
| [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md) | Sekrety nigdy przez czat | S02E02, S02E04, S04E01 |
| [P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) | Sekret ma listę hostów w kodzie: sprawdzaj każdy przeskok, także przekierowania, a lista nie pochodzi z dokumentu | S04E01 |

### [7. Human in the loop](07-czlowiek-w-petli/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md) | Podział praw decyzyjnych jest jawny | S01E03, S01E04, S03E01, MEGA Assessment |
| [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md) | Zgoda ma zakres | S01E04, S04E01, S04E02 |
| [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md) | Uprawnienia harnessu to część konfiguracji: zawężaj, nie poszerzaj | S01E03, S02E01, S02E03, S03E01, S04E02, MEGA Assessment |
| [P36](07-czlowiek-w-petli/p36-pokaz-plan-przed-publikacja.md) | Pokaż plan, zanim opublikujesz | S01E04 |
| [P47](07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md) | Zgoda przychodzi kanałem właściciela, nigdy z wiadomości, która o nią prosi | S02E05 |
| [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md) | Sprzeczne źródła nie wygrywają rangą: rozstrzyga właściciel, a do jego odpowiedzi budujesz tylko to, co pewne | S03E01, S03E04 |
| [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md) | Granicę autonomii wyznacza spisana reguła, nie głos zgłaszającego: każdy znacznik cytuje jej id | S03E02, S03E05 |
| [P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) | Wiąże tylko podpisany rekord: niepodpisany to dowód, a otwartą decyzję oddajesz właścicielowi z opcjami i rekomendacją | S03E03 |
| [P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) | Reguła z dokumentu to sprawdzenie w kodzie, a to, czego reguła nie rozstrzyga, czeka u właściciela | S04E01 |

### [8. Harness jako zestaw narzędzi](08-harness/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P37](08-harness/p37-brakujace-narzedzie.md) | Brakujące narzędzie: zbuduj most, potem go utrwal | S01E03 |
| [P38](08-harness/p38-skill-to-rutyna.md) | Skill to rutyna, która przeżyła jedno użycie | S01E03, S02E03, S03E01, S03E02, S03E03, S03E05 |
| [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md) | Serwer MCP to kontrakt dla obcego klienta | S02E03 |
| [P40](08-harness/p40-wynik-ma-budzet.md) | Wynik narzędzia ma budżet bajtów | S02E03 |
| [P41](08-harness/p41-blad-mowi-co-poprawic.md) | Błąd narzędzia mówi modelowi, co poprawić | S02E03 |
| [P42](08-harness/p42-duze-bajty-obok-modelu.md) | Duże bajty idą obok modelu, nie przez niego | S02E03 |
| [P53](08-harness/p53-kod-sprawdza-model-decyduje.md) | Kod pobiera, składa i sprawdza, a model decyduje: trzymaj każde po swojej stronie | S03E02, S04E01, S04E02 |

### Poza rozdziałami

- [Twoje wzorce pracy (MEGA Assessment)](wzorce-pracy.md)
- [Szablony](szablony/README.md): plik przekazania, KEEP, brief dla workera, tabela decyzji,
  granica zaufania, lista przed oddaniem, sekcja debriefu.
- [Słowniczek](slowniczek.md)

<!-- lessons:start -->
## Indeks lekcji

Które rozdziały lekcji stoją za którymi pigułkami. Kolumna PL prowadzi do polskich notatek, kolumna EN do oryginału.

| Epizod | Lekcja | Rozdział (PL) | Rozdział (EN, oryginał) | Pigułki |
| --- | --- | --- | --- | --- |
| S01E01 | Mechanika działania generatywnej AI | [Warto wiedzieć o LLM-ach](../pl/s01e01-mechanics-behind-generative-ai.md#warto-wiedzieć-o-llm-ach) | [Things worth knowing about LLMs](../../s01e01/s01e01-mechanics-behind-generative-ai.md#things-worth-knowing-about-llms) | [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md) |
| S01E01 | Mechanika działania generatywnej AI | [Mechanika dużych modeli językowych](../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych) | [Mechanics of Large Language Models](../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models) | [P01](01-kontekst/p01-kompakcja-jest-stratna.md), [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md), [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) |
| S01E01 | Mechanika działania generatywnej AI | [Platformy i harnessy](../pl/s01e01-mechanics-behind-generative-ai.md#platformy-i-harnessy) | [Platforms and Harnesses](../../s01e01/s01e01-mechanics-behind-generative-ai.md#platforms-and-harnesses) | [P01](01-kontekst/p01-kompakcja-jest-stratna.md), [P36](07-czlowiek-w-petli/p36-pokaz-plan-przed-publikacja.md) |
| S01E01 | Mechanika działania generatywnej AI | [Uogólnione sterowanie](../pl/s01e01-mechanics-behind-generative-ai.md#uogólnione-sterowanie) | [Generalized Steering](../../s01e01/s01e01-mechanics-behind-generative-ai.md#generalized-steering) | [P21](04-orkiestracja/p21-deleguj-research.md) |
| S01E02 | Sterowanie modelami za pomocą kontekstu | [Personalizacja harnessu](../pl/s01e02-steering-models-through-context.md#personalizacja-harnessu) | [Harness Personalization](../s01e02-steering-models-through-context.md#harness-personalization) | [P16](03-pamiec/p16-drabina-trwalosci.md) |
| S01E02 | Sterowanie modelami za pomocą kontekstu | [Jak działa kontekst?](../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst) | [How does the context work?](../s01e02-steering-models-through-context.md#how-does-the-context-work) | [P01](01-kontekst/p01-kompakcja-jest-stratna.md), [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md) |
| S01E02 | Sterowanie modelami za pomocą kontekstu | [Projektowanie i generowanie skilli](../pl/s01e02-steering-models-through-context.md#projektowanie-i-generowanie-skilli) | [Designing and generating skills](../s01e02-steering-models-through-context.md#designing-and-generating-skills) | [P38](08-harness/p38-skill-to-rutyna.md) |
| S01E02 | Sterowanie modelami za pomocą kontekstu | [Narzędzia od podszewki](../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) | [Tool use under the hood](../s01e02-steering-models-through-context.md#tool-use-under-the-hood) | [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md), [P11](02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md), [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md), [P37](08-harness/p37-brakujace-narzedzie.md), [P40](08-harness/p40-wynik-ma-budzet.md), [P41](08-harness/p41-blad-mowi-co-poprawic.md), [P42](08-harness/p42-duze-bajty-obok-modelu.md) |
| S01E02 | Sterowanie modelami za pomocą kontekstu | [Podagenci i workery](../pl/s01e02-steering-models-through-context.md#podagenci-i-workery) | [Subagents and Workers](../s01e02-steering-models-through-context.md#subagents-and-workers) | [P20](04-orkiestracja/p20-brief-jak-issue.md), [P21](04-orkiestracja/p21-deleguj-research.md) |
| S01E03 | Tworzenie systemów wiedzy | [Pliki tekstowe i platformy chmurowe](../pl/s01e03-building-knowledge-systems.md#pliki-tekstowe-i-platformy-chmurowe) | [Text Files and Cloud Platforms](../s01e03-building-knowledge-systems.md#text-files-and-cloud-platforms) | [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) |
| S01E03 | Tworzenie systemów wiedzy | [Poza Markdownem](../pl/s01e03-building-knowledge-systems.md#poza-markdownem) | [Beyond Markdown](../s01e03-building-knowledge-systems.md#beyond-markdown) | [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) |
| S01E03 | Tworzenie systemów wiedzy | [Cel baz wiedzy](../pl/s01e03-building-knowledge-systems.md#cel-baz-wiedzy) | [Purpose of the knowledge bases](../s01e03-building-knowledge-systems.md#purpose-of-the-knowledge-bases) | [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md), [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P13](03-pamiec/p13-keep-ustalenie-ze-zrodlem.md) |
| S01E03 | Tworzenie systemów wiedzy | [Szerszy kontekst](../pl/s01e03-building-knowledge-systems.md#szerszy-kontekst) | [Broader context](../s01e03-building-knowledge-systems.md#broader-context) | [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md) |
| S01E04 | Praca z harnessami AI | [Harnessy](../pl/s01e04-working-with-ai-harnesses.md#harnessy) | [Harnesses](../s01e04-working-with-ai-harnesses.md#harnesses) | [P09](02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md), [P18](04-orkiestracja/p18-worktree-i-pliki-wezly.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md) |
| S01E04 | Praca z harnessami AI | [Ustawienia](../pl/s01e04-working-with-ai-harnesses.md#ustawienia) | [Settings](../s01e04-working-with-ai-harnesses.md#settings) | [P19](04-orkiestracja/p19-dobor-modelu-i-koszt.md), [P62](05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md) |
| S01E05 | Tworzenie przepływów pracy, a nie stosów narzędzi | [Wykonywalny Markdown a kod](../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) | [Executable Markdown vs Code](../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code) | [P38](08-harness/p38-skill-to-rutyna.md), [P53](08-harness/p53-kod-sprawdza-model-decyduje.md), [P62](05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md) |
| S01E05 | Tworzenie przepływów pracy, a nie stosów narzędzi | [Jakość](../pl/s01e05-building-workflows-not-tool-stacks.md#jakość) | [Quality](../s01e05-building-workflows-not-tool-stacks.md#quality) | [P08](02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md), [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md) |
| S01E05 | Tworzenie przepływów pracy, a nie stosów narzędzi | [Dostęp zdalny](../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny) | [Getting remote](../s01e05-building-workflows-not-tool-stacks.md#getting-remote) | [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md), [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md), [P46](05-agent-bez-czlowieka/p46-testuj-droge-z-hosta-agenta.md) |
| S01E05 | Tworzenie przepływów pracy, a nie stosów narzędzi | [Bezpieczeństwo systemu](../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu) | [System security](../s01e05-building-workflows-not-tool-stacks.md#system-security) | [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P31](06-bezpieczenstwo/p31-uwierzytelnione-zadania.md), [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md), [P47](07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md), [P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md), [P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) |
| S02E01 | Prymitywy agentowe | [Pętla agenta](../pl/s02e01-agentic-primitives.md#pętla-agenta) | [Agentic Loop](../s02e01-agentic-primitives.md#agentic-loop) | [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md), [P15](03-pamiec/p15-pytaj-przeszle-sesje.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md), [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md), [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md), [P52](05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md) |
| S02E01 | Prymitywy agentowe | [Osobowość i świadomość środowiska](../pl/s02e01-agentic-primitives.md#osobowość-i-świadomość-środowiska) | [Personality and Environmental Awareness](../s02e01-agentic-primitives.md#personality-and-environmental-awareness) | [P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md), [P66](04-orkiestracja/p66-rola-ma-piec-czesci.md) |
| S02E01 | Prymitywy agentowe | [Kontekst i pamięć](../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć) | [Context and Memory](../s02e01-agentic-primitives.md#context-and-memory) | [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md) |
| S02E02 | Budowanie agenta | [Architektura](../pl/s02e02-building-an-agent.md#architektura) | [Architecture](../s02e02-building-an-agent.md#architecture) | [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md) |
| S02E02 | Budowanie agenta | [Dostawcy i konfiguracja](../pl/s02e02-building-an-agent.md#dostawcy-i-konfiguracja) | [Providers and configuration](../s02e02-building-an-agent.md#providers-and-configuration) | [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md) |
| S02E02 | Budowanie agenta | [Projektowanie narzędzi](../pl/s02e02-building-an-agent.md#projektowanie-narzędzi) | [Designing tools](../s02e02-building-an-agent.md#designing-tools) | [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md), [P40](08-harness/p40-wynik-ma-budzet.md) |
| S02E02 | Budowanie agenta | [Przepływy pracy i zadania długookresowe](../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe) | [Workflows and long-horizon tasks](../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) | [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md) |
| S02E03 | Możliwości agentów | [Personalizacja](../pl/s02e03-agentic-capabilities.md#personalizacja) | [Personalization](../s02e03-agentic-capabilities.md#personalization) | [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md), [P16](03-pamiec/p16-drabina-trwalosci.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md) |
| S02E03 | Możliwości agentów | [Model Context Protocol](../pl/s02e03-agentic-capabilities.md#model-context-protocol) | [Model Context Protocol](../s02e03-agentic-capabilities.md#model-context-protocol) | [P31](06-bezpieczenstwo/p31-uwierzytelnione-zadania.md), [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md), [P42](08-harness/p42-duze-bajty-obok-modelu.md) |
| S02E03 | Możliwości agentów | [Projektowanie własnego MCP](../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) | [Designing a custom MCP](../s02e03-agentic-capabilities.md#designing-a-custom-mcp) | [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md), [P40](08-harness/p40-wynik-ma-budzet.md), [P41](08-harness/p41-blad-mowi-co-poprawic.md) |
| S02E03 | Możliwości agentów | [Skille i narzędzia](../pl/s02e03-agentic-capabilities.md#skille-i-narzędzia) | [Skills & Tools](../s02e03-agentic-capabilities.md#skills--tools) | [P37](08-harness/p37-brakujace-narzedzie.md) |
| S02E04 | Współpraca wielu agentów | [Architektury wieloagentowe](../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) | [Multi-agent architectures](../s02e04-multi-agent-collaboration.md#multi-agent-architectures) | [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md), [P20](04-orkiestracja/p20-brief-jak-issue.md), [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md), [P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md) |
| S02E04 | Współpraca wielu agentów | [Agent2Agent](../pl/s02e04-multi-agent-collaboration.md#agent2agent) | [Agent2Agent](../s02e04-multi-agent-collaboration.md#agent2agent) | [P43](04-orkiestracja/p43-przekaz-skill-z-zadaniem.md), [P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md) |
| S02E04 | Współpraca wielu agentów | [Współpraca wieloagentowa](../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) | [Multi-agentic collaboration](../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) | [P18](04-orkiestracja/p18-worktree-i-pliki-wezly.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md), [P44](04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md) |
| S02E04 | Współpraca wielu agentów | [Orkiestracja](../pl/s02e04-multi-agent-collaboration.md#orkiestracja) | [Orchestration](../s02e04-multi-agent-collaboration.md#orchestration) | [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md), [P44](04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md) |
| S02E04 | Współpraca wielu agentów | [Najważniejsze wnioski](../pl/s02e04-multi-agent-collaboration.md#najważniejsze-wnioski) | [Takeaways](../s02e04-multi-agent-collaboration.md#takeaways) | [P43](04-orkiestracja/p43-przekaz-skill-z-zadaniem.md) |
| S02E05 | Niezawodność agentów | [Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec](../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec) | [Guardrails: preventing the unpreventable](../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable) | [P11](02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md), [P47](07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md), [P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) |
| S02E05 | Niezawodność agentów | [Obserwowalność w systemach agentowych](../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) | [Observability in agentic systems](../s02e05-agent-reliability.md#observability-in-agentic-systems) | [P15](03-pamiec/p15-pytaj-przeszle-sesje.md), [P26](05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md) |
| S02E05 | Niezawodność agentów | [Ewaluacja](../pl/s02e05-agent-reliability.md#ewaluacja) | [Evaluation](../s02e05-agent-reliability.md#evaluation) | [P08](02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md), [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P48](02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md) |
| S03E01 | Mechanika inżynierii produktu | [Zmiana](../pl/s03e01-mechanics-behind-product-engineering.md#zmiana) | [The Shift](../s03e01-mechanics-behind-product-engineering.md#the-shift) | [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) |
| S03E01 | Mechanika inżynierii produktu | [Odpowiedzialność](../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) | [Ownership](../s03e01-mechanics-behind-product-engineering.md#ownership) | [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md), [P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) |
| S03E01 | Mechanika inżynierii produktu | [Osąd](../pl/s03e01-mechanics-behind-product-engineering.md#osąd) | [Judgment](../s03e01-mechanics-behind-product-engineering.md#judgment) | [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md) |
| S03E01 | Mechanika inżynierii produktu | [Dźwignia](../pl/s03e01-mechanics-behind-product-engineering.md#dźwignia) | [Leverage](../s03e01-mechanics-behind-product-engineering.md#leverage) | [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) |
| S03E02 | Przekładanie intencji na pracę agentów | [Kontekst produktu](../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) | [Product context](../s03e02-translating-intent-into-agent-work.md#product-context) | [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md), [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md), [P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md), [P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md), [P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md), [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) |
| S03E02 | Przekładanie intencji na pracę agentów | [Wymagania i dekompozycja](../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja) | [Requirements and decomposition](../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition) | [P20](04-orkiestracja/p20-brief-jak-issue.md), [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md) |
| S03E02 | Przekładanie intencji na pracę agentów | [Ewaluacja](../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja) | [Evaluation](../s03e02-translating-intent-into-agent-work.md#evaluation) | [P52](05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md), [P53](08-harness/p53-kod-sprawdza-model-decyduje.md) |
| S03E03 | Rozwój produktu w duchu AI-native | [Planowanie](../pl/s03e03-ai-native-product-development.md#planowanie) | [Planning](../s03e03-ai-native-product-development.md#planning) | [P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) |
| S03E03 | Rozwój produktu w duchu AI-native | [Wykonanie](../pl/s03e03-ai-native-product-development.md#wykonanie) | [Execution](../s03e03-ai-native-product-development.md#execution) | [P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md) |
| S03E03 | Rozwój produktu w duchu AI-native | [Informacja zwrotna](../pl/s03e03-ai-native-product-development.md#informacja-zwrotna) | [Feedback](../s03e03-ai-native-product-development.md#feedback) | [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md) |
| S03E04 | Weryfikacja rezultatów produktu | [Akceptacja](../pl/s03e04-verifying-product-outcomes.md#akceptacja) | [Acceptance](../s03e04-verifying-product-outcomes.md#acceptance) | [P56](02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md), [P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md), [P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md) |
| S03E04 | Weryfikacja rezultatów produktu | [Weryfikacja](../pl/s03e04-verifying-product-outcomes.md#weryfikacja) | [Verification](../s03e04-verifying-product-outcomes.md#verification) | [P56](02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md) |
| S03E04 | Weryfikacja rezultatów produktu | [System diff](../pl/s03e04-verifying-product-outcomes.md#system-diff) | [System Diff](../s03e04-verifying-product-outcomes.md#system-diff) | [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md), [P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md) |
| S03E04 | Weryfikacja rezultatów produktu | [Przegląd](../pl/s03e04-verifying-product-outcomes.md#przegląd) | [Review](../s03e04-verifying-product-outcomes.md#review) | [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md), [P66](04-orkiestracja/p66-rola-ma-piec-czesci.md) |
| S03E04 | Weryfikacja rezultatów produktu | [Bramki jakości](../pl/s03e04-verifying-product-outcomes.md#bramki-jakości) | [Quality Gates](../s03e04-verifying-product-outcomes.md#quality-gates) | [P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md) |
| S03E05 | Produkty, które uczą się po wydaniu | [Sygnały](../pl/s03e05-products-that-learn-after-release.md#sygnały) | [Signals](../s03e05-products-that-learn-after-release.md#signals) | [P60](02-kontrakty-i-gotowe/p60-glosne-nie-znaczy-powszechne.md) |
| S03E05 | Produkty, które uczą się po wydaniu | [Obserwacja](../pl/s03e05-products-that-learn-after-release.md#obserwacja) | [Observation](../s03e05-products-that-learn-after-release.md#observation) | [P59](02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md) |
| S03E05 | Produkty, które uczą się po wydaniu | [Synteza](../pl/s03e05-products-that-learn-after-release.md#synteza) | [Synthesis](../s03e05-products-that-learn-after-release.md#synthesis) | [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md), [P59](02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md), [P60](02-kontrakty-i-gotowe/p60-glosne-nie-znaczy-powszechne.md) |
| S03E05 | Produkty, które uczą się po wydaniu | [Decyzje](../pl/s03e05-products-that-learn-after-release.md#decyzje) | [Decisions](../s03e05-products-that-learn-after-release.md#decisions) | [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md) |
| S03E05 | Produkty, które uczą się po wydaniu | [Pętle sprzężenia zwrotnego](../pl/s03e05-products-that-learn-after-release.md#pętle-sprzężenia-zwrotnego) | [Feedback Loops](../s03e05-products-that-learn-after-release.md#feedback-loops) | [P16](03-pamiec/p16-drabina-trwalosci.md), [P38](08-harness/p38-skill-to-rutyna.md) |
<!-- lessons:end -->

Notatek lekcji S04E01 i S04E02 w repo jeszcze nie ma, więc pigułki z tych epizodów wskazują
wcześniejsze lekcje. Gdy notatki powstaną, dopisz ich rozdziały do tej tabeli.

## Indeks epizodów

| Epizod | Wyzwanie | Temat lekcji | Główne pigułki |
| --- | --- | --- | --- |
| S01E01 | [somebody slow](../pl/s01e01-somebody-slow-debrief.md) | mechanika generatywnej AI | [P01](01-kontekst/p01-kompakcja-jest-stratna.md), [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md), [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md), [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md) |
| S01E02 | [who said what](../pl/s01e02-who-said-what-debrief.md) | sterowanie przez kontekst | [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md), [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md), [P15](03-pamiec/p15-pytaj-przeszle-sesje.md) |
| S01E03 | [what it shows](../pl/s01e03-what-it-shows-debrief.md) | systemy wiedzy | [P03](01-kontekst/p03-zrodlo-to-nie-widok.md), [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md), [P37](08-harness/p37-brakujace-narzedzie.md), [P38](08-harness/p38-skill-to-rutyna.md) |
| S01E04 | [before i looked](../pl/s01e04-before-i-looked-debrief.md) | praca z harnessami | [P09](02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md), [P13](03-pamiec/p13-keep-ustalenie-ze-zrodlem.md), [P16](03-pamiec/p16-drabina-trwalosci.md), [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md), [P18](04-orkiestracja/p18-worktree-i-pliki-wezly.md), [P19](04-orkiestracja/p19-dobor-modelu-i-koszt.md), [P20](04-orkiestracja/p20-brief-jak-issue.md), [P36](07-czlowiek-w-petli/p36-pokaz-plan-przed-publikacja.md) |
| S01E05 | [answer where i asked](../pl/s01e05-answer-where-i-asked-debrief.md) | przepływy pracy | [P08](02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md), [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md), [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md), [P31](06-bezpieczenstwo/p31-uwierzytelnione-zadania.md) |
| S02E01 | [found out late](../pl/s02e01-found-out-late-debrief.md) | prymitywy agentowe | [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md), [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md), [P15](03-pamiec/p15-pytaj-przeszle-sesje.md), [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md) |
| S02E02 | [nobody asked](../pl/s02e02-nobody-asked-debrief.md) | budowanie agenta | [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P11](02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md), [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md), [P26](05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md), [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md) |
| S02E03 | [schema first](../pl/s02e03-schema-first-debrief.md) | możliwości agentów, MCP | [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md), [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md), [P38](08-harness/p38-skill-to-rutyna.md), [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md), [P40](08-harness/p40-wynik-ma-budzet.md), [P41](08-harness/p41-blad-mowi-co-poprawic.md), [P42](08-harness/p42-duze-bajty-obok-modelu.md) |
| S02E04 | [two places](../pl/s02e04-two-places-debrief.md) | współpraca wielu agentów | [P20](04-orkiestracja/p20-brief-jak-issue.md), [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md), [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md), [P43](04-orkiestracja/p43-przekaz-skill-z-zadaniem.md), [P44](04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md), [P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md) |
| S02E05 | [while you're away](../pl/s02e05-while-youre-away-debrief.md) | niezawodność agentów | [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md), [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md), [P46](05-agent-bez-czlowieka/p46-testuj-droge-z-hosta-agenta.md), [P47](07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md), [P48](02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md) |
| S03E01 | [status for the night](../pl/s03e01-status-for-the-night-debrief.md) | inżynieria produktu | [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md), [P03](01-kontekst/p03-zrodlo-to-nie-widok.md), [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md), [P38](08-harness/p38-skill-to-rutyna.md), [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md), [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) |
| S03E02 | [nothing ships unmarked](../pl/s03e02-nothing-ships-unmarked-debrief.md) | przekładanie intencji na pracę agentów | [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md), [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md), [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md), [P20](04-orkiestracja/p20-brief-jak-issue.md), [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P38](08-harness/p38-skill-to-rutyna.md), [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md), [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md), [P52](05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md), [P53](08-harness/p53-kod-sprawdza-model-decyduje.md) |
| S03E03 | [out of office](../pl/s03e03-out-of-office-debrief.md) | rozwój produktu w duchu AI-native | [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md), [P38](08-harness/p38-skill-to-rutyna.md), [P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md), [P55](07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) |
| S03E04 | [show me when](../pl/s03e04-show-me-when-debrief.md) | weryfikacja rezultatów produktu | [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md), [P09](02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md), [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md), [P26](05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md), [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P45](05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md), [P49](07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md), [P56](02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md), [P57](02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md), [P58](02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md) |
| S03E05 | [what came back](../pl/s03e05-what-came-back-debrief.md) | produkty, które uczą się po wydaniu | [P16](03-pamiec/p16-drabina-trwalosci.md), [P38](08-harness/p38-skill-to-rutyna.md), [P50](02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md), [P51](07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md), [P59](02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md), [P60](02-kontrakty-i-gotowe/p60-glosne-nie-znaczy-powszechne.md) |
| S04E01 | [twenty payouts](../pl/s04e01-twenty-payouts-debrief.md) | agent pracujący sam z limitem czasu (notatek lekcji brak w repo) | [P19](04-orkiestracja/p19-dobor-modelu-i-koszt.md), [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md), [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md), [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md), [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md), [P53](08-harness/p53-kod-sprawdza-model-decyduje.md), [P61](06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md), [P62](05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md), [P63](07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) |
| S04E02 | [looks good to me](../pl/s04e02-looks-good-to-me-debrief.md) | druga rola i sterowanie rolami: recenzent (notatek lekcji brak w repo) | [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md), [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md), [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md), [P53](08-harness/p53-kod-sprawdza-model-decyduje.md), [P54](01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md), [P64](01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md), [P65](03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md), [P66](04-orkiestracja/p66-rola-ma-piec-czesci.md) |
| — | MEGA Assessment | twoje wzorce pracy | [rozdział 9](wzorce-pracy.md) |

## Jak dopisać pigułkę

Pełna procedura jest w [docs/README.md](../README.md). W skrócie:

1. Zasada już jest: dopisz nowy przypadek w sekcji **Przypadek** i epizod w nagłówku pigułki.
2. Zasada jest nowa: nowy plik `pNN-<slug>.md` w folderze rozdziału, z kolejnym numerem
   (bez przenumerowywania starych). Ten sam układ: Zasada / Dlaczego / Przypadek / Stosuj.
   Na dole nawigacja do sąsiednich pigułek.
3. Dodaj wiersz w README rozdziału, w „Wszystkie pigułki” i w indeksie epizodów.
4. Zaktualizuj „Stan na”.
