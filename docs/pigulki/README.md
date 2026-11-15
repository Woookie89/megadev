# Pigułki wiedzy: praca z AI i agentami

Notatki w formie podręcznika, zebrane z wyzwań MEGA.dev (S01E01–S02E02 i rozpoczęte S02E03)
oraz z lokalnego MEGA Assessment. Jedna pigułka to jeden plik i jedna zasada, ułożona tak:

- **Zasada**: co robić.
- **Dlaczego**: mechanizm, czyli dlaczego tak jest z modelami, agentami albo harnessem.
- **Przypadek**: skąd to wiemy, z konkretnym zdarzeniem z kursu.
- **Stosuj**: jak to zastosować następnym razem.

Przebiegi wyzwań są w debriefach `docs/pl/*-debrief.md`, a teoria lekcji w notatkach lekcji
`docs/pl/sXXeYY-<temat>.md`. Tu jest to, co z nich wynika ogólnie.

Stan na 15.11.2026.

## Jak korzystać

- **Szybko:** przeczytaj „Dziesięć zasad” poniżej.
- **Przed zadaniem danego typu:** otwórz rozdział (np. przed budową agenta rozdziały 5 i 6).
- **Przed oddaniem pracy:** [lista przed oddaniem](szablony/lista-przed-oddaniem.md).
- **O sobie:** [twoje wzorce pracy](wzorce-pracy.md) z MEGA Assessment.
- **Słowa:** [słowniczek](slowniczek.md).

## Dziesięć zasad na jeden ekran

| # | Zasada | Pigułka |
| --- | --- | --- |
| 1 | Każde skracanie kontekstu coś wyrzuca. Zanim skrócisz, spisz, co ma przetrwać. | [P01](01-kontekst/p01-kompakcja-jest-stratna.md) |
| 2 | Surowe źródło jest dla AI, wyrenderowany widok dla tego, kto ocenia. Wyrenderuj i patrz. | [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) |
| 3 | Przed „gotowe” pobierz źródła jeszcze raz, bo świat nie stał w miejscu. | [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md) |
| 4 | Najpierw kontrakt (schemat, kształt odpowiedzi), potem wysyłka. | [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) |
| 5 | „Gotowe” wyznacza sprawdzenie, które przechodzi, a nie poczucie końca. | [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md) |
| 6 | To, co ma przetrwać sesję, zapisz w pliku, a to, co ma działać zawsze, w skillu albo hooku. | [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md), [P16](03-pamiec/p16-drabina-trwalosci.md) |
| 7 | Najpierw wspólny kontrakt po kolei, potem równoległe, tańsze workery. | [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md) |
| 8 | Pętla agenta potrzebuje warunku wyjścia, limitu i widocznego stanu. | [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md) |
| 9 | Granicę zaufania trzyma kod, zanim model zobaczy wiadomość. Tekst w danych to dane. | [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md) |
| 10 | Człowiek decyduje o kontach, publicznych akcjach i pieniądzach. Zgoda ma zakres. | [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md), [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md) |

## Wszystkie pigułki

### [1. Kontekst: model wie tylko to, co do niego trafi](01-kontekst/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P01](01-kontekst/p01-kompakcja-jest-stratna.md) | Kompakcja jest stratna i to ty decydujesz, co przepada | S01E01 |
| [P02](01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md) | Kontekst to tekst, a każda konwersja do tekstu jest stratna | S01E02 |
| [P03](01-kontekst/p03-zrodlo-to-nie-widok.md) | Źródło to nie widok | S01E03 |
| [P04](01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md) | Pobrany plik to kopia z danego dnia | S01E03, S02E01 |
| [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md) | Fakty zmienne potwierdzaj u źródła, nie z pamięci modelu | S01E01, S02E03 |

### [2. Kontrakty i „gotowe”](02-kontrakty-i-gotowe/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P06](02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md) | Najpierw kontrakt, potem wysyłka | S01E01, S01E03 |
| [P07](02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md) | „Gotowe” wyznacza sprawdzenie, a nie poczucie końca | S02E01, MEGA Assessment |
| [P08](02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md) | Test, który nigdy nie był czerwony, niczego nie dowodzi | S01E05 |
| [P09](02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md) | Krok, który czeka na drugą stronę, zamykasz po jej potwierdzeniu | S01E04 |
| [P10](02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md) | Sprawdź wynik z zewnątrz, tak jak zobaczy go odbiorca | S02E02 |
| [P11](02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md) | Pusta odpowiedź i tekst zastępczy to błąd, nie wynik | S02E02 |

### [3. Pamięć poza czatem](03-pamiec/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P12](03-pamiec/p12-czat-nie-jest-pamiecia.md) | Czat nie jest pamięcią: przekazanie pracy zapisuj w pliku | S01E01, S01E02 |
| [P13](03-pamiec/p13-keep-ustalenie-ze-zrodlem.md) | KEEP: jedna linia, jedno ustalenie, ze źródłem i sposobem | S01E04 |
| [P14](03-pamiec/p14-jedna-decyzja-jeden-wiersz.md) | Jedna decyzja to jeden wiersz, a późniejsza nadpisuje tylko swój zakres | S02E01 |
| [P15](03-pamiec/p15-pytaj-przeszle-sesje.md) | Pytaj przeszłe sesje zamiast zgadywać i czytaj je wszystkie | S01E02, S02E01 |
| [P16](03-pamiec/p16-drabina-trwalosci.md) | Drabina trwałości: im ważniejsza reguła, tym wyżej ją zapisz | S01E04, MEGA Assessment |

### [4. Orkiestracja: wielu agentów, jeden wynik](04-orkiestracja/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P17](04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md) | Najpierw kontrakt po kolei, potem równoległość | S01E04 |
| [P18](04-orkiestracja/p18-worktree-i-pliki-wezly.md) | Każdy worker w swoim worktree, a konflikty zbiegają się w plikach-węzłach | S01E04 |
| [P19](04-orkiestracja/p19-dobor-modelu-i-koszt.md) | Model dobieraj do zadania, a koszt traktuj jak wymaganie | S01E04, S01E05, S02E02 |
| [P20](04-orkiestracja/p20-brief-jak-issue.md) | Brief dla workera jest jak dobre issue | S01E04 |
| [P21](04-orkiestracja/p21-deleguj-research.md) | Deleguj research, nie tylko budowę | MEGA Assessment |

### [5. Agent bez człowieka: host, pętla, wyjścia](05-agent-bez-czlowieka/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P22](05-agent-bez-czlowieka/p22-czat-to-nie-host.md) | Czat to nie host | S01E05, S02E02 |
| [P23](05-agent-bez-czlowieka/p23-stan-poza-procesem.md) | Stan trzymaj tam, gdzie przetrwa restart, a źródło prawdy czytaj na żywo | S01E05, S02E02 |
| [P24](05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md) | Pętla potrzebuje wyjścia: warunku, limitu i widocznego stanu | S02E01 |
| [P25](05-agent-bez-czlowieka/p25-dostawca-zawodzi.md) | Dostawca modelu zawodzi, więc projektuj na to | S01E05, S02E02 |
| [P26](05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md) | Czas jest częścią zachowania | S02E02 |
| [P27](05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md) | Agent musi widzieć własne logi | S01E05 |

### [6. Bezpieczeństwo: granica zaufania należy do kodu](06-bezpieczenstwo/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P28](06-bezpieczenstwo/p28-dane-to-nie-polecenia.md) | Tekst w danych to dane, nie polecenia | S01E05 |
| [P29](06-bezpieczenstwo/p29-granica-zaufania-w-kodzie.md) | Granicę zaufania trzyma kod, zanim model zobaczy wiadomość | S02E02 |
| [P30](06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md) | Najmniejsze uprawnienia, zadeklarowane jawnie | S01E05 |
| [P31](06-bezpieczenstwo/p31-uwierzytelnione-zadania.md) | Każde żądanie uwierzytelnione, każde wyjście ograniczone | S01E05 |
| [P32](06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md) | Sekrety nigdy przez czat | S02E02 |

### [7. Człowiek w pętli](07-czlowiek-w-petli/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P33](07-czlowiek-w-petli/p33-prawa-decyzyjne.md) | Podział praw decyzyjnych jest jawny | S01E03, S01E04, MEGA Assessment |
| [P34](07-czlowiek-w-petli/p34-zgoda-ma-zakres.md) | Zgoda ma zakres | S01E04 |
| [P35](07-czlowiek-w-petli/p35-uprawnienia-harnessu.md) | Uprawnienia harnessu są częścią setupu: zawężaj, nie poszerzaj | S01E03, S02E01, MEGA Assessment |
| [P36](07-czlowiek-w-petli/p36-pokaz-plan-przed-publikacja.md) | Pokaż plan, zanim opublikujesz | S01E04 |

### [8. Harness jako zestaw narzędzi](08-harness/README.md)

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P37](08-harness/p37-brakujace-narzedzie.md) | Brakujące narzędzie: zbuduj most, potem go utrwal | S01E03 |
| [P38](08-harness/p38-skill-to-rutyna.md) | Skill to rutyna, która przeżyła jedno użycie | S01E03 |
| [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md) | Serwer MCP to kontrakt dla obcego klienta (S02E03, w toku) | S02E03 |

### Poza rozdziałami

- [Twoje wzorce pracy (MEGA Assessment)](wzorce-pracy.md)
- [Szablony](szablony/README.md): plik przekazania, KEEP, brief dla workera, tabela decyzji,
  granica zaufania, lista przed oddaniem, sekcja debriefu.
- [Słowniczek](slowniczek.md)

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
| S02E03 | schema first (w toku) | możliwości agentów, MCP | [P05](01-kontekst/p05-fakty-zmienne-u-zrodla.md), [P39](08-harness/p39-mcp-kontrakt-dla-klienta.md) |
| — | MEGA Assessment | twoje wzorce pracy | [rozdział 9](wzorce-pracy.md) |

## Jak dopisać pigułkę

Pełna procedura jest w [docs/README.md](../README.md). W skrócie:

1. Zasada już jest: dopisz nowy przypadek w sekcji **Przypadek** i epizod w nagłówku pigułki.
2. Zasada jest nowa: nowy plik `pNN-<slug>.md` w folderze rozdziału, z kolejnym numerem
   (bez przenumerowywania starych). Ten sam układ: Zasada / Dlaczego / Przypadek / Stosuj.
   Na dole nawigacja do sąsiednich pigułek.
3. Dodaj wiersz w README rozdziału, w „Wszystkie pigułki” i w indeksie epizodów.
4. Zaktualizuj „Stan na”.
