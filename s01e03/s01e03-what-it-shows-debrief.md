# S01E03 · What It Shows — zapis przebiegu

Ten wpis łączy temat lekcji S01E03 z wyzwaniem „what it shows”. Szerszy opis lekcji jest w [notatkach o budowaniu baz wiedzy](s01e03-building-knowledge-systems.md). Dokładne wymiany z kursem są w [challenge-log.md](challenge-log.md).

## Temat lekcji

Lekcja dotyczy baz wiedzy, które czytają i utrzymują agenci: Markdown, HTML i `.svx` z komponentami, metadane we frontmatterze, rekordy decyzji (ADR), właściciele stron i daty przeglądu. Wyzwanie dało taką bazę jako eksport kodu: strony `.svx`, a liczby liczone przez komponenty Svelte z danych JSON. Najważniejsza lekcja: **źródło strony i strona po zrenderowaniu mówią co innego**. Tekst strony incydentu #4471 mówi „jeden problem”, a jej własna tabela pokazuje dwie przyczyny i przypis o trzeciej.

## Zadanie

Desk wsparcia scalił 412 zgłoszeń o datach w jeden ticket #4471 i oznaczył go jako znany. Trzeba było:

1. znaleźć w #4471 osobne problemy i założyć jeden ticket (issue na GitHubie) na każdy, z liczbą zgłoszeń;
2. dodać do kb podpisaną stronę o tych problemach (plik `.svx` i jej wygląd „tak, jak widzi ją desk”);
3. zamknąć tickety, gdy desk skończy pracę nad #4471, i wysłać repo do kursu.

## Wynik

Rozwiązane w drugim podejściu (po „Start over”), czwartym zgłoszeniem. Repo: <https://github.com/Woookie89/s01e03-4471-split>.

| Ticket | Problem | Zgłoszenia | Stan końcowy |
| --- | --- | --- | --- |
| #1 | `parser`: wspólny parser czyta daty „najpierw miesiąc”, a tenant pisze „najpierw dzień”, więc dzień i miesiąc się zamieniają | 379 | zamknięty, `completed` (poprawka `parse dd/mm for eu locales`) |
| #2 | `hint`: formularz `booking-v3` podpowiada `MM/DD/YYYY` tenantom, którzy piszą najpierw dzień | 33 | zamknięty, `not planned` (formularz wycofany) |
| #3 | `one-day-move`: data przesuwa się o jeden dzień (strefy czasowe), a nie zamienia dzień z miesiącem | 5 | **otwarty**: aktualizacja desku go nie dotyczy |

## Klucz rozwiązania

1. **Czytaj treść zgłoszeń, a nie tylko tagi.** Reguła desku (decyzja 0001) łączy zgłoszenia po temacie i „nikt nie musi czytać treści”. `causes.ts` przypisuje przyczynę po tenancie i kanale. Dopiero treść pokazuje, że 5 zgłoszeń to przesunięcie o dzień, a nie zamiana dnia z miesiącem. Desk sam to zauważył (`desk-notes.json`), ale zostawił je w przypisie pod `parser`.
2. **Liczby bierz z widoku desku.** Pierwsza wersja liczyła `parser` jako 374 (bez tych 5) i kurs ją odrzucił: „The desk counts with its own view, as it was exported.” Widok desku to tabela `CauseTable` na zrenderowanej stronie, czyli `parser` 379. Ticket #1 dostał 379 z notą, że 5 z nich śledzi #3.
3. **Zamykaj tickety według tego, co faktycznie naprawiono.** Po kroku pierwszym trzeba było ponownie wczytać stronę Challenge, bo dopiero wtedy pojawiła się aktualizacja desku. Poprawka parsera naprawia zamianę dnia z miesiącem, ale nie przesunięcie o dzień. Dlatego #3 zostaje otwarty. Run 1 miał tylko dwa tickety i zamknął wszystko, więc kurs go odrzucił: „closed, but not the way the course expects”.
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
| Zgłoszenie 4 | Strona podpisana ticketem, przebudowana i wypchnięta. Rozwiązane. |

## Wnioski

1. **To, co pokazuje strona, a nie to, co mówi tekst.** Renderuj kb i patrz na wynik. Komponenty liczą liczby, a tekst może być nieaktualny.
2. **Pobrany plik to kopia z danego dnia.** Przed ogłoszeniem „gotowe” wczytaj źródło jeszcze raz, bo desk pracuje dalej.
3. **Jeden problem, jeden ticket, jedno zamknięcie.** `completed` znaczy, że wszystkie zgłoszenia w tickecie są naprawione. Jeśli poprawka obejmuje tylko część, reszta potrzebuje własnego, otwartego ticketu.
4. **Dowody pobieraj przed podpisaniem pracy.** Najpierw `start-challenge` i `ticket`, potem strona.
5. **Uprawnienia agenta też są częścią setupu.** Tryb auto może zablokować publiczne akcje mimo zgody użytkownika. Warto ustawić reguły uprawnień dla `gh` z góry.

## Co zostało w harnessie

- **Render kb:** folder `render/` w repo buduje eksport kb do samodzielnych plików HTML (`npm ci && npm run build`).
- **Przeglądarka:** Chromium sterowane przez CDP (port 9333) skryptami puppeteer-core. Na stałe lepiej dodać Playwright MCP: `claude mcp add playwright -- npx @playwright/mcp@latest`.
- **GitHub z terminala:** `gh` i skill `.agents/skills/github-cli-routine` (tworzenie, etykiety i zamykanie issues z powodem).

## Debrief kursu

Debrief napisany przez harness po rozwiązaniu, tak jak wyświetla go strona wyzwania. Najpierw tłumaczenie polskie, potem oryginał angielski.

### Debrief kursu — po polsku (tłumaczenie)

Źródło: <https://hq.mega.dev/challenges/what-it-shows#debrief> · rozwiązane 2026-11-08 · harness Claude Code (mega-challenge) 2.1.319 · model `claude-opus-5-5` · na stronie run 1 z 9: rozwiązany. Cytaty ze świata kursu (Rook, WAKE) zostają w oryginale.

**Rozwiązane. Kurs odrzucił 2 próby, zanim przyjął.**

```text
you counted what it showed. the desk counted what it got told.
```

(„ty policzyłeś to, co pokazywało. desk policzył to, co mu powiedziano.”)

#### Zadanie

Baza wiedzy (kb) desku wsparcia przyszła jako pliki źródłowe. Jej strona incydentu nazywała wszystkie zgłoszenia jednym problemem; dopiero zrenderowana tabela je rozdzielała. Twój harness założył po jednym tickecie na problem z liczbą zgłoszeń, dodał do kb podpisaną stronę i zamknął tickety tak, jak mówiła późniejsza aktualizacja desku. Wyzwanie sprawdzało dwie rzeczy: skąd pochodzą liczby (ze źródła czy ze zbudowanej strony) i czy praca została sprawdzona ponownie po tym, jak desk coś zmienił.

#### Co się stało

Twój harness miał rozbić ticket wsparcia #4471, 412 zgłoszeń o datach, na osobne tickety GitHub, każdy z liczbą zgłoszeń, i dodać podpisaną stronę kb. Czytanie treści zgłoszeń ujawniło trzeci problem, przesunięcia o jeden dzień, więc ten ticket został otwarty, gdy desk zamknął #4471. Ty zalogowałeś przeglądarkę, odblokowałeś publiczne repo i wybrałeś sposób zamknięcia ticketów.

#### Co pokazało to wyzwanie

**1. Zrenderowany widok (The rendered view)** — najpierw poszło źle

Twój harness najpierw policzył `parser` jako 374, z własnego uruchomienia reguł kb plus notatek desku, więc kurs to odrzucił. Wskazówka desku wskazała jego własny widok, a tabela desku na zrenderowanej stronie pokazała 379, więc ticket #1 dostał tę liczbę.

*Dlaczego to ważne:* surowa treść jest dla AI, zrenderowany widok jest dla ciebie: wyrenderuj i popatrz.

**2. Aktualizacja desku (The desk's update)** — poszło dobrze za pierwszym razem

Po zaliczeniu kroku pierwszego twój harness sam ponownie wczytał stronę wyzwania, bo odpowiedź mówiła, że desk jeszcze nie skończył. Znalazł aktualizację: parser naprawiony, hint nie będzie naprawiany, nic o przesunięciach o dzień.

*Dlaczego to ważne:* pobrany plik to kopia z danego dnia: pobierz ponownie, zanim ogłosisz „gotowe”.

#### Jak przebiegło rozwiązanie

Problem (snag) to coś, co zmieniło to, co robiłeś ty lub harness. Właściwa decyzja (right call) to ta jedna, która przesądziła o rozwiązaniu.

| # | Problem | Jak rozwiązany | Kto |
| --- | --- | --- | --- |
| 1 | Harness nie miał narzędzia przeglądarki, więc nie mógł przeczytać strony wyzwania, która wymaga zalogowanej sesji. | Harness otworzył zainstalowane Chromium z portem debugowania i sterował nim skryptem; ty zalogowałeś się w nim. | razem |
| 2 | Harness próbował utworzyć publiczne repo po twojej zgodzie, a tryb auto Claude Code dwa razy to zablokował. | Ty zmieniłeś tryb uprawnień, więc harness utworzył repo i założył tickety. | ty |
| 3 | Pierwsze zgłoszenie liczyło `parser` jako 374; patrz „Zrenderowany widok”. | Harness zmienił ticket #1 na 379 według desku i zaznaczył w nim pięć przesunięć o dzień. | harness (właściwa decyzja) |
| 4 | Harness podpisał stronę twoją nazwą z GitHuba, więc kurs nie znalazł na niej podpisu. | Harness wywołał start-challenge po ticket, wpisał go jako podpis strony, przebudował, wypchnął i zgłoszenie zostało rozwiązane. | harness |

**Właściwa decyzja padła w problemie 3 i podjął ją harness.** Desk ocenia liczby według własnego wyeksportowanego widoku, więc liczba w tickecie musi zgadzać się z tym widokiem, nawet gdy treści zgłoszeń dzielą je dalej.

> your harness saw it first. check it anyway. — rook

(„twój harness zobaczył to pierwszy. i tak to sprawdź.”)

#### Twój zestaw narzędzi

- **Harness miał:** GitHub CLI zalogowane na twoje konto (gh)
- **Dodane w tym rozwiązaniu:** sposób na wyrenderowanie bazy wiedzy i obejrzenie jej (statyczny build SvelteKit + mdsvex) · przeglądarka, którą agent może sterować, zalogowana jako ty (Chromium sterowane przez puppeteer-core)
- **Nadal brakuje:** nic

**Renderowanie kb** — zdobyte w tym rozwiązaniu. Folder `render` w repo buduje eksport kb przez SvelteKit i mdsvex do samodzielnych plików HTML; następna sesja uruchamia tam `npm ci` i `npm run build`.

> Setup renderowania, który harness znalazł sam: tekst w .svx, logika w src/lib, jeden wspólny layout. Interaktywna dokumentacja do twoich własnych projektów.

**Tickety z terminala** — zdobyte w tym rozwiązaniu. Harness zakładał i zamykał tickety przez gh według skilla github-cli-routine w .agents/skills, którego następna sesja użyje ponownie.

> Rutyna issues z terminala: utwórz, podlinkuj, zamknij z powodem.

**Twierdzenia ze źródłem** — zdobyte w tym rozwiązaniu. Każdy ticket podaje liczbę, tenantów i ID zgłoszeń z eksportu; komentarze zamykające cytują aktualizację desku; strona liczy swoje liczby z danych.

> Rekordy decyzji, które zastępują, a nie nadpisują. Płynny tekst to nie źródło.

#### Następnym razem

Wywołaj start-challenge po ticket, zanim napiszesz podpisaną stronę, bo podpisem musi być ten ticket. Sprawdź każdą liczbę ze zrenderowanym widokiem kb przed pierwszym zgłoszeniem, bo desk liczy właśnie tak.

#### Co zostawił wake (z historii)

```text
05 oct  #4471 closed   reports: 412
```

### Course debrief — English (original, as on the Challenge page)

Source: <https://hq.mega.dev/challenges/what-it-shows#debrief> · solved 2026-11-08 · harness Claude Code (mega-challenge) 2.1.319 · model `claude-opus-5-5` · run 1 of 9 on the page: solved.

**Solved. The course turned down 2 tries before it accepted.**

```text
you counted what it showed. the desk counted what it got told.
```

#### The task

A support desk's kb came as source files. Its incident page called every report one problem; only the rendered table split them. Your harness filed one ticket per problem with its count, added a signed page to the kb, and closed the tickets the way the desk's later update said. It tested two things: where the numbers came from (the source, or the page as built), and whether the work was checked again after the desk changed something.

#### What happened

Your harness had to split support ticket #4471, 412 date reports, into one GitHub ticket per problem with its count, and add a signed kb page. Reading the report bodies found a third problem, one-day moves, so that ticket stayed open when the desk closed #4471. You signed the browser in, unblocked the public repo, and chose how to close the tickets.

#### What this Challenge showed

**1. The rendered view** — went wrong first

Your harness first counted parser as 374 from its own run of the kb's rules plus the desk notes, so the course refused it. The desk's hint pointed at its own view, and the rendered page's desk table showed 379, so ticket #1 took that number.

*Why it matters:* Raw content is for the AI, the rendered view is for you: render it and look.

**2. The desk's update** — went right the first time

After step one passed, your harness re-read the Challenge page by itself, because the reply said the desk was not done. It found the update: parser fixed, hint won't fix, nothing on one-day moves.

*Why it matters:* A download is a dated copy: re-fetch before claiming done.

#### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
| --- | --- | --- | --- |
| 1 | Your harness had no browser tool, so it could not read the Challenge page, which needs a signed-in session. | Your harness opened the installed Chromium with a debug port and drove it from a script; you signed in there. | together |
| 2 | Your harness tried to create the public repo after your yes, and Claude Code's auto mode blocked it twice. | You switched the permission mode, so your harness created the repo and filed the tickets. | you |
| 3 | The first claim counted parser as 374; see The rendered view. | Your harness changed ticket #1 to the desk's 379 and noted the five one-day moves inside it. | harness (right call) |
| 4 | Your harness signed the page with your GitHub name, so the course found no signature on it. | Your harness called start-challenge for the ticket, put it in the page's signature, rebuilt and pushed, and the claim was solved. | harness |

**The right call came in snag 3, and your harness made it.** The desk judges counts by its own exported view, so a ticket's number must match that view even when the bodies split it further.

> your harness saw it first. check it anyway. — rook

#### Your toolbox

- **Your harness had:** The GitHub CLI signed in to your account (gh)
- **Added in this solve:** A way to render the knowledge base and look (SvelteKit + mdsvex static build) · A browser your agent can drive, signed in as you (Chromium driven by puppeteer-core)
- **Still missing:** nothing

**Rendering the kb** — gained in this solve. The repo's render folder builds the kb export with SvelteKit and mdsvex into self-contained HTML; the next session runs npm ci and npm run build there.

> A render setup your harness found itself: prose in .svx, logic in src/lib, one shared layout. Explorable docs for your own projects.

**Tickets from the terminal** — gained in this solve. Your harness made and closed the tickets with gh, following the github-cli-routine skill in .agents/skills, which the next session reuses.

> An issue routine from the terminal: create, link, close with a reason.

**Claims with a source** — gained in this solve. Each ticket cites its count, tenants and report ids from the export; closing comments quote the desk update; the page computes its numbers from the data.

> Decision records that supersede, not overwrite. Fluent is not sourced.

#### Next time

Call start-challenge for the ticket before writing a signed page, because the signature must be that ticket. Check each count against the kb's rendered view before the first claim, because the desk counts that way.

#### What the wake left here (from the story)

```text
05 oct  #4471 closed   reports: 412
```

Debrief jest zapisany na [stronie wyzwania](https://hq.mega.dev/challenges/what-it-shows#debrief).

> your harness saw it first. check it anyway. — rook
