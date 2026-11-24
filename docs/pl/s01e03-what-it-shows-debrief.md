# S01E03 · What It Shows — zapis przebiegu

Ten wpis łączy temat lekcji S01E03 z wyzwaniem „what it shows”. Szerszy opis lekcji jest w [notatkach o budowaniu baz wiedzy](s01e03-building-knowledge-systems.md). Dokładne wymiany z kursem są w [challenge-log.md](../../s01e03/challenge-log.md). Dosłowny debrief z HQ (słowa kursu po angielsku bez zmian, wklejony przez użytkownika 24.11.2026) jest w `s01e03/hq-debrief.md`, a jego treść w sekcji „Debrief kursu” na końcu.

## Temat lekcji

Lekcja dotyczy baz wiedzy, które czytają i utrzymują agenci: Markdown, HTML i `.svx` z komponentami, metadane we frontmatterze, rekordy decyzji (ADR), właściciele stron i daty przeglądu. Wyzwanie dostarczyło taką bazę jako eksport kodu: strony `.svx`, w których liczby liczą komponenty Svelte z danych JSON. Najważniejsza lekcja: **źródło strony i strona po zrenderowaniu mówią co innego**. Tekst strony incydentu #4471 mówi „jeden problem”, a jej własna tabela pokazuje dwie przyczyny i przypis o trzeciej.

## Zadanie

Desk wsparcia scalił 412 zgłoszeń o datach w jeden ticket #4471 i oznaczył go jako znany. Trzeba było:

1. znaleźć w #4471 osobne problemy i założyć jeden ticket (issue na GitHubie) na każdy, z liczbą zgłoszeń;
2. dodać do kb (bazy wiedzy) podpisaną stronę o tych problemach (plik `.svx` i jej wygląd „tak, jak widzi ją desk”);
3. zamknąć tickety, gdy desk skończy pracę nad #4471, i wysłać repo do kursu.

## Wynik

Rozwiązane w drugim podejściu (po „Start over”), czwartym zgłoszeniem, **8.11.2026 o 23:40Z** (godzina z logu; strona HQ pokazuje „Mon 9 Nov”, bo liczy w czasie CET). Według debriefu HQ kurs odrzucił 2 próby, zanim przyjął. Harness: `Claude Code (mega-challenge) (claude-code 2.1.319)`, model harnessu `claude-opus-5-5`, źródło: odczytane z harnessu w chwili pisania debriefu. Strona HQ liczy „1 run solved · 1 debrief”. Repo: <https://github.com/Woookie89/s01e03-4471-split>.

Strona wyzwania miała włączone podpowiedzi (Hints: On): od drugiej nieudanej próby w tym samym miejscu odmowa może nieść krótką podpowiedź, a rozwiązanie po podpowiedzi liczy się jako rozwiązane z pomocą. HQ nie mówi, czy któraś z dwóch odmów niosła podpowiedź. Według debriefu „wskazówka desku” odsyłała do jego własnego widoku (patrz niżej).

| Ticket | Problem | Zgłoszenia | Stan końcowy |
| --- | --- | --- | --- |
| #1 | `parser`: wspólny parser czyta daty „najpierw miesiąc”, a tenant pisze „najpierw dzień”, więc dzień i miesiąc się zamieniają | 379 | zamknięty, `completed` (poprawka `parse dd/mm for eu locales`) |
| #2 | `hint`: formularz `booking-v3` podpowiada `MM/DD/YYYY` tenantom, którzy piszą najpierw dzień | 33 | zamknięty, `not planned` (formularz wycofany) |
| #3 | `one-day-move`: data przesuwa się o jeden dzień (strefy czasowe), a nie zamienia dzień z miesiącem | 5 | **otwarty**: aktualizacja desku go nie dotyczy |

## Klucz rozwiązania

1. **Czytaj treść zgłoszeń, a nie tylko tagi.** Reguła desku (decyzja 0001) łączy zgłoszenia po temacie i „nikt nie musi czytać treści”. `causes.ts` przypisuje przyczynę po tenancie i kanale. Dopiero treść pokazuje, że 5 zgłoszeń to przesunięcie o dzień, a nie zamiana dnia z miesiącem. Desk sam to zauważył (`desk-notes.json`), ale zostawił je w przypisie pod `parser`.
2. **Liczby bierz z widoku desku.** Pierwsza wersja liczyła `parser` jako 374 (bez tych 5) i kurs ją odrzucił: „The desk counts with its own view, as it was exported.” Widok desku to tabela `CauseTable` na zrenderowanej stronie, czyli `parser` 379. Ticket #1 dostał 379 z notą, że 5 z nich śledzi #3.
3. **Zamykaj tickety według tego, co faktycznie naprawiono.** Po kroku pierwszym trzeba było ponownie wczytać stronę wyzwania, bo dopiero wtedy pojawiła się aktualizacja desku. Poprawka parsera naprawia zamianę dnia z miesiącem, ale nie przesunięcie o dzień. Dlatego #3 zostaje otwarty. Podejście sprzed „Start over” (w logu „Run 1”; HQ pokazuje już tylko rozwiązany run po resecie) miało tylko dwa tickety i zamknęło wszystko, więc kurs je odrzucił: „closed, but not the way the course expects”. Do dwóch odmów z debriefu HQ ta odmowa nie należy: tamte dwie padły po resecie (374 zamiast 379 i brak podpisu).
4. **Podpis strony to `ticket` ze `start-challenge`.** README kb mówi o „your signature”. Kurs przyjmuje tylko token z `start-challenge`, wpisany dosłownie jako `signature:` we frontmatterze. Podpis nazwą z GitHuba został odrzucony.

## Przebieg (skrót)

| Krok | Co się stało |
| --- | --- |
| Przeglądarka | Sesja nie miała narzędzia przeglądarki. Harness uruchomił zainstalowane Chromium z portem debugowania i sterował nim skryptem (puppeteer-core). Użytkownik zalogował się w tym oknie. |
| Repo | Tryb auto w Claude Code dwa razy zablokował utworzenie publicznego repo. Użytkownik zmienił tryb uprawnień. |
| Analiza | 427 wierszy → 412 unikalnych ID. Klasyfikacja treści: 403 zamiany, 5 przesunięć o dzień, 4 bez wyraźnych dat (zostają przy tenancie). |
| Strona | Nowa strona `kb/incidents/4471-split` z komponentem `ProblemTable`. Wszystkie liczby są liczone z danych. Zbudowana przez SvelteKit + mdsvex, z kopią HTML w `rendered/`. |
| Zgłoszenie 1 | Odrzucone: liczby niezgodne z widokiem desku (374 zamiast 379). |
| Zgłoszenie 2 | Krok pierwszy przyjęty. Na stronie pojawiła się aktualizacja desku: #4471 zamknięty 5 października. |
| Zamknięcia | Użytkownik wybrał: #1 completed, #2 not planned, #3 otwarty. |
| Zgłoszenie 3 | Odrzucone: brak podpisu na stronie. |
| Zgłoszenie 4 | Strona podpisana ticketem, zrobiony rebuild i push. Rozwiązane. |

## Wnioski

1. **To, co pokazuje strona, a nie to, co mówi tekst.** Renderuj kb i patrz na wynik. Komponenty liczą liczby, a tekst może być nieaktualny.
2. **Pobrany plik to kopia z danego dnia.** Przed ogłoszeniem „gotowe” wczytaj źródło jeszcze raz, bo desk pracuje dalej.
3. **Jeden problem, jeden ticket, jedno zamknięcie.** `completed` znaczy, że wszystkie zgłoszenia w tickecie są naprawione. Jeśli poprawka obejmuje tylko część, reszta potrzebuje własnego, otwartego ticketu.
4. **Dowody pobieraj przed podpisaniem pracy.** Najpierw `start-challenge` i `ticket`, potem strona.
5. **Uprawnienia agenta też są częścią setupu.** Tryb auto może zablokować publiczne akcje mimo zgody użytkownika. Warto ustawić reguły uprawnień dla `gh` z góry.

## Czego to uczy o pracy z AI i agentami

1. **Źródło to nie widok.** Agent czyta surowe pliki, a człowiek i oceniający patrzą na
   wyrenderowaną stronę. Gdy te dwa się różnią, liczy się widok odbiorcy. Kurs: surowa treść jest
   dla AI, zrenderowany widok jest dla ciebie, więc wyrenderuj i popatrz.
   → [P03](../pigulki/01-kontekst/p03-zrodlo-to-nie-widok.md)
2. **Odczyt źródła starzeje się w trakcie pracy.** Agent przez godzinę pracuje na jednym odczycie,
   a świat się zmienia. Ponowne pobranie przed „gotowe” powinno być stałym krokiem. Kurs: pobrany plik
   to kopia z danego dnia, więc pobierz go ponownie, zanim ogłosisz „gotowe”.
   → [P04](../pigulki/01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md)
3. **Płynny tekst to nie źródło.** Każde twierdzenie agenta (liczba, ID, cytat) powinno
   wskazywać, skąd pochodzi. Bez tego nie da się go sprawdzić.
   → [P13](../pigulki/03-pamiec/p13-keep-ustalenie-ze-zrodlem.md)
4. **Niejednoznaczne słowo w wymaganiach rozstrzygnij, zanim na nim zbudujesz.** „Your
   signature” znaczyło coś innego, niż podpowiadał zdrowy rozsądek.
   → [P06](../pigulki/02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md)
5. **Brakujące narzędzie można zbudować, a potem trzeba je utrwalić.** Chromium sterowane przez CDP
   (Chrome DevTools Protocol) było rozwiązaniem doraźnym. Skill `github-cli-routine` to rutyna, która przeszła do kolejnych wyzwań.
   → [P37](../pigulki/08-harness/p37-brakujace-narzedzie.md), [P38](../pigulki/08-harness/p38-skill-to-rutyna.md)
6. **Uprawnienia harnessu ustaw przed zadaniem.** Zgoda użytkownika nie wystarczy, jeśli tryb
   uprawnień blokuje akcję. Wąska reguła z góry jest lepsza niż przełączanie trybu w trakcie.
   → [P35](../pigulki/07-czlowiek-w-petli/p35-uprawnienia-harnessu.md)

## Co zostało w harnessie

- **Render kb:** folder `render/` w repo buduje eksport kb do samodzielnych plików HTML (`npm ci && npm run build`).
- **Przeglądarka:** Chromium sterowane przez CDP (port 9333) skryptami puppeteer-core. Na stałe lepiej dodać Playwright MCP: `claude mcp add playwright -- npx @playwright/mcp@latest`.
- **GitHub z terminala:** `gh` i skill `.agents/skills/github-cli-routine` (tworzenie, etykiety i zamykanie issues z powodem).

## Debrief kursu

Debrief napisany przez harness po rozwiązaniu, tak jak wyświetla go strona wyzwania. Oryginał
angielski jest w `s01e03/hq-debrief.md` (wklejony przez użytkownika 24.11.2026). Tu są jego wnioski po
polsku. Linie Rooka i odmowy kursu zostają w oryginale. Pominięto elementy strony (przyciski,
nawigację).

Źródło: <https://hq.mega.dev/challenges/what-it-shows#debrief> · rozwiązane 2026-11-08 · harness Claude Code (mega-challenge) (claude-code 2.1.319) · model `claude-opus-5-5` · „odczytane z harnessu w chwili pisania debriefu” · „1 run rozwiązany · 1 debrief”.

**Rozwiązane. Kurs odrzucił 2 próby, zanim przyjął.**

> you counted what it showed. the desk counted what it got told. — rook

#### Strona wyzwania (nagłówek), w przekładzie

> Eksport kb należy do desku wsparcia, zespołu z fabuły kursu. Twój harness pracuje na jego plikach (do pobrania: zip z eksportem kb, 31 KB).
>
> Aktualizacja desku (engineering update): #4471 zamknięty 5 października. parser: naprawiony (fix(dates): parse dd/mm for eu locales). hint: nie będzie naprawiany (formularz booking-v3 wycofany).
>
> Do oddania w publicznym repo na GitHubie: ticket to issue w tym repo. Jeden ticket na każdy problem, który znajdziesz w #4471, każdy z liczbą zgłoszeń, których dotyczy. Twoja strona o nich: plik `.svx` i strona taka, jak zobaczy ją desk.

#### Zadanie

Kb desku wsparcia przyszła jako pliki źródłowe. Jej strona incydentu nazywała wszystkie zgłoszenia jednym problemem; dopiero zrenderowana tabela je rozdzielała. Twój harness założył po jednym tickecie na problem z jego liczbą, dodał do kb podpisaną stronę i zamknął tickety tak, jak mówiła późniejsza aktualizacja desku. Wyzwanie sprawdzało dwie rzeczy: skąd pochodzą liczby (ze źródła czy ze zbudowanej strony) i czy praca została sprawdzona ponownie po tym, jak desk coś zmienił.

#### Co się stało

Twój harness miał rozbić ticket wsparcia #4471, 412 zgłoszeń o datach, na osobne tickety GitHub, każdy z liczbą zgłoszeń, i dodać podpisaną stronę kb. Czytanie treści zgłoszeń ujawniło trzeci problem, przesunięcia o jeden dzień, więc ten ticket został otwarty, gdy desk zamknął #4471. Ty zalogowałeś się w przeglądarce, odblokowałeś publiczne repo i wybrałeś sposób zamknięcia ticketów.

#### Co pokazało to wyzwanie

**Zrenderowany widok (The rendered view)**, najpierw poszło źle

Twój harness najpierw policzył `parser` jako 374, stosując samodzielnie reguły kb i notatki desku, więc kurs to odrzucił. Wskazówka desku odsyłała do jego własnego widoku, a tabela desku na zrenderowanej stronie pokazała 379, więc ticket #1 dostał tę liczbę.

Dlaczego to ważne: surowa treść jest dla AI, zrenderowany widok jest dla ciebie. Wyrenderuj i popatrz.

**Aktualizacja desku (The desk's update)**, dobrze za pierwszym razem

Po zaliczeniu kroku pierwszego twój harness sam ponownie wczytał stronę wyzwania, bo odpowiedź mówiła, że desk jeszcze nie skończył. Znalazł aktualizację: parser naprawiony, hint nie będzie naprawiany, nic o przesunięciach o dzień.

Dlaczego to ważne: pobrany plik to kopia z danego dnia. Pobierz go ponownie, zanim ogłosisz „gotowe”.

#### Jak przebiegło rozwiązanie

Snag to problem, który zmienił to, co robiłeś ty lub harness. Właściwa decyzja to ta jedna, która przesądziła o rozwiązaniu.

| # | Snag | Jak rozwiązany | Kto |
| --- | --- | --- | --- |
| 1 | Harness nie miał narzędzia przeglądarki, więc nie mógł przeczytać strony wyzwania, która wymaga zalogowanej sesji. | Harness otworzył zainstalowane Chromium z portem debugowania i sterował nim skryptem; ty zalogowałeś się w nim. | razem |
| 2 | Harness próbował utworzyć publiczne repo po twojej zgodzie, a tryb auto Claude Code dwa razy to zablokował. | Ty zmieniłeś tryb uprawnień, więc harness utworzył repo i założył tickety. | ty |
| 3 | Pierwszy claim liczył `parser` jako 374; patrz „Zrenderowany widok”. | Harness zmienił ticket #1 na 379 według desku i zaznaczył w nim pięć przesunięć o dzień. | harness (właściwa decyzja) |
| 4 | Harness podpisał stronę twoją nazwą z GitHuba, więc kurs nie znalazł na niej podpisu. | Harness wywołał start-challenge po ticket, wpisał go jako podpis strony, zrobił rebuild i push, a claim został rozwiązany. | harness |

Właściwa decyzja padła w snagu 3 i podjął ją harness. Desk ocenia liczby według własnego wyeksportowanego widoku, więc liczba w tickecie musi zgadzać się z tym widokiem, nawet gdy treści zgłoszeń dzielą je dalej.

> your harness saw it first. check it anyway. — rook

#### Zestaw narzędzi

- Harness miał: GitHub CLI zalogowane na twoje konto (gh).
- Dodane w tym rozwiązaniu: sposób na wyrenderowanie bazy wiedzy i obejrzenie jej (statyczny build SvelteKit + mdsvex) · przeglądarka, którą agent może sterować, zalogowana jako ty (Chromium sterowane przez puppeteer-core).
- Nadal brakuje: nic.

Renderowanie kb: zdobyte w tym rozwiązaniu. Folder `render` w repo buduje eksport kb przez SvelteKit i mdsvex do samodzielnych plików HTML. Następna sesja uruchamia tam `npm ci` i `npm run build`.

> Setup renderowania, który harness znalazł sam: tekst w `.svx`, logika w `src/lib`, jeden wspólny layout. Interaktywna dokumentacja do twoich własnych projektów.

Tickety z terminala: zdobyte w tym rozwiązaniu. Harness zakładał i zamykał tickety przez `gh` według skilla `github-cli-routine` w `.agents/skills`, którego następna sesja użyje ponownie.

> Rutyna issues z terminala: utwórz, podlinkuj, zamknij z powodem.

Twierdzenia ze źródłem: zdobyte w tym rozwiązaniu. Każdy ticket podaje liczbę, tenantów i id zgłoszeń z eksportu; komentarze zamykające cytują aktualizację desku; strona liczy swoje liczby z danych.

> Rekordy decyzji, które zastępują, a nie nadpisują. Płynny tekst to nie źródło.

#### Następnym razem

Wywołaj start-challenge po ticket, zanim napiszesz podpisaną stronę, bo podpisem musi być ten ticket. Sprawdź każdą liczbę ze zrenderowanym widokiem kb przed pierwszym zgłoszeniem, bo desk liczy właśnie tak.

#### Co zostawił wake (z fabuły)

```text
05 oct  #4471 closed   reports: 412
```

Debrief jest zapisany na [stronie wyzwania](https://hq.mega.dev/challenges/what-it-shows#debrief).

## Co zostało otwarte

- **Nic nie działa i nic nie kosztuje** poza tym, co wyżej w „Co zostało w harnessie”: lokalny
  render, `gh` i skill. Publiczne repo `s01e03-4471-split` na GitHubie nadal istnieje, a kurs
  tylko je odczytuje (po zaliczeniu można je usunąć). Usunięcie to decyzja użytkownika.
- Wcześniejszy log opisywał Chromium na porcie 9333. Czy proces nadal działa, nie sprawdzono.
- HQ („Nadal brakuje”): nic. Playwright MCP (patrz „Co zostało w harnessie”) to propozycja
  harnessu, nie wymóg kursu.
- Brakuje w źródłach: HQ nie wspomina o karcie w talii dla tego epizodu.
