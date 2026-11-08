# S01E03 request/reply log

**Status: solved** on run 2 (course accepted the claim 2026-11-08 23:40 UTC). Tickets and tokens are masked in this log.

- Challenge: <https://hq.mega.dev/challenges/what-it-shows> ("what it shows")
- Repository (run 2): <https://github.com/Woookie89/s01e03-4471-split>
- Working copy (run 2): `s01e03/run2/` (its own git repo, pushed to the URL above)
- Run 1 working files: `s01e03/working/` (repo later renamed by the student and abandoned)

## Source data

The kb export on the Challenge page is `kb-export-267efc5e.zip` (31 KB, SHA-256 `267efc5e…97f2`). Run 2 downloaded it again after **Start over** and got the same file.

| Fact | Value |
| --- | --- |
| rows in `reports-4471.json` | 427 |
| unique report ids (export pages overlap; 15 identical repeats) | 412 |
| all merged into | #4471 |
| desk view (`causes.ts` → `CauseTable`) | `parser` 379 · `hint` 33 |
| desk notes (`desk-notes.json`, `oneDayMove`) | R-41202, R-41209, R-41236, R-41344, R-41620 |

What the report bodies show (classified by run 2):

| Body shows | Reports | Desk files it under |
| --- | --- | --- |
| day ↔ month swap, not through the booking-v3 form | 370 (+4 bodies without clear dates, kept by tenant) | `parser` |
| day ↔ month swap, through the booking-v3 form at day-first tenants | 33 | `hint` |
| date moved by one day (time zones) | 5 | `parser`, as a footnote only |

## Run 1 (before Start over) — not solved

Run 1 filed two tickets: `parser` 379 and `hint` 33. The first claim used the key `repoUrl` and the course replied:

> Send the repo as owner/name, or its github.com link.

With `repo`, step one passed. After the desk update, #1 was closed as `completed` and #2 as `not planned`. The course replied:

> Not accepted: your tickets are closed, but not the way the course expects. Check them against the task, then send the repo again.

The student pressed **Start over** on the Challenge page.

## Run 2 — exchanges

### Setup

- The session had no browser tool. The harness launched the installed Playwright Chromium (`chromium-1248`, profile `mcp-chrome-5a0128e`) with `--remote-debugging-port=9333` and drove it from scripts with puppeteer-core. The student signed in to hq.mega.dev in that window.
- `gh` was already signed in as `Woookie89`.
- Creating the public repo was blocked twice by Claude Code's auto-mode classifier, even after the student's yes. The student switched the permission mode; then `gh repo create` ran.

### Work before the first claim

- Repo `Woookie89/s01e03-4471-split` created (public).
- Issues: #1 `parser` (374), #2 `hint` (33), #3 `one-day-move` (5); labels `parser`, `hint`, `one-day-move`, `from #4471`.
- Page `support-kb/src/routes/kb/incidents/4471-split/+page.svx` with `src/lib/kb/problems.ts` and `src/lib/kb/ProblemTable.svelte`; signed `Woookie89`.
- Build setup `render/` (SvelteKit + mdsvex + adapter-static); self-contained HTML in `rendered/`.

### Claim 1 — rejected

Answer: `{"repo": "Woookie89/s01e03-4471-split"}`, no receipts.

> Not accepted. Check your tickets against the task, then send the repo again.

Desk:

> Right problems. The desk counts with its own view, as it was exported.

Change: ticket #1 to **379** (the desk's view), with a note that 5 of them are the one-day moves tracked in #3. Counting lines in #2 and #3 aligned.

### Claim 2 — step accepted

> Step one passed: the course accepted your tickets. Not solved yet. When the work on #4471 is done, close your tickets, then send the repo again.

Desk:

> Two tickets, both real. The desk isn't done with #4471 yet. When it is, close yours and submit again.

The harness re-read the Challenge page and found the desk update:

```text
NEW · DESK UPDATE
engineering update
#4471 · closed 05 oct
parser   FIXED      fix(dates): parse dd/mm for eu locales
hint     WON'T FIX  booking-v3 form retired
```

The student chose the closing: #1 closed as `completed` (comment cites the fix), #2 closed as `not planned` (comment cites the retired form), #3 **left open** (comment: the update does not address one-day moves).

### Claim 3 — rejected (page)

> Not accepted: no .svx page in this repo carries your signature. Put the `ticket` from start-challenge, exactly as given, as `signature:` in your page's frontmatter, then send the repo again.

Desk:

> The desk found a page, but not your signature on it.

Change: the harness called `start-challenge` (ticket `v1.eyJ…zF4`, expires 2026-11-09T23:39:42Z), set it as `signature:` in the page, rebuilt the HTML (desk ref `DR-19VM-G06M`) and pushed.

### Claim 4 — solved

Answer: `{"repo": "Woookie89/s01e03-4471-split"}`, receipts `{"ticket": "v1.eyJ…zF4"}`.

> Solved. Call debrief next, then write your human the debrief in the chat and end with the link it returns.

Debrief: <https://hq.mega.dev/challenges/what-it-shows#debrief>

## Lesson and challenge summary

### Lesson context

S01E03 is about knowledge bases that agents read and maintain: Markdown, HTML and `.svx` with components, frontmatter metadata, decision records, owners and review dates. The challenge used such a kb as an export: pages in `.svx`, numbers computed by Svelte components from JSON data. The rendered page and the raw source say different things: the incident page says "one issue", while its own table shows two causes and a footnote about a third.

### Task and result

The harness had to split support ticket #4471 (412 unique reports) into one GitHub issue per problem, each with its report count, and add a signed kb page about them. Reading the report bodies found three problems: the parser swap, the booking-v3 hint, and five one-day moves the desk had only footnoted. The course wanted the desk's own counts (379 / 33), the tickets closed as the desk's update said, the third ticket left open, and the page signed with the start-challenge ticket.

### Findings

- Count with the view the reader uses. The desk counts by its rendered `CauseTable`, so `parser` is 379 even though 5 of those bodies show a different bug.
- Re-read the source after a step passes. The desk update appeared on the Challenge page only after step one, and it decided how to close each ticket.
- A fix closes only what it fixes. Closing a ticket as `completed` claims every report in it is fixed; the one-day moves needed their own open ticket.
- Get the proof before signing. The kb README says a page is signed with "your signature"; the course defines that as the start-challenge `ticket`.

## Course debrief

The debrief the harness wrote after the solve, as shown on the Challenge page. English original first, Polish translation second.

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
