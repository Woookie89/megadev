# S01E04 · Before I Looked — zapis przebiegu

Ten wpis łączy temat lekcji S01E04 z wyzwaniem „before i looked”. Szerszy opis lekcji jest
w [notatkach o pracy z harnessami](s01e04-working-with-ai-harnesses.md). Dokładne wymiany
z kursem są w [challenge-log.md](../../s01e04/challenge-log.md).

Źródła: `s01e04/challenge-log.md`, `HANDOVER.md`, `KEEP.md` oraz debrief z HQ
(`s01e04/hq-debrief.md`, wklejony przez użytkownika 24.11.2026; oryginał angielski zostaje w tym pliku,
tutaj są jego wnioski po polsku; linie Rooka i odmowy kursu zostają w oryginale). Wklejka nie miała
nagłówka z kodem odcinka, więc epizod rozpoznano po zadaniu.

## Temat lekcji

Lekcja dotyczy harnessu jako zestawu: skilli, plików z instrukcjami, workerów na różnych
modelach i kroków, które czekają na użytkownika. Wyzwanie sprawdziło przejęcie cudzego repo:
plan trzeba było zamienić na issues, zbudować funkcję agentami i przeprowadzić przez review,
która dzieje się poza harnessem. HQ opisuje zadanie tak („The task”), w przekładzie:

> Repo zespołu przyszło z planem: rozbić go na issues, pozwolić workerom to zbudować, wysłać reviewerowi publiczny link do kopii strony w HTML, a potem posprzątać. Reviewer zajrzał kilka minut po przyjściu linku, nie od razu. To wyzwanie pokazało dwie rzeczy: zamknięcie issue, które czekało na review, albo zdjęcie znacznika ze strony, zanim reviewer zajrzał, bo plan nigdzie nie mówił, że sprzątanie czeka na review; oraz link, który został wgrany, ale nie otwierał się nikomu innemu.

Debrief HQ stawia dwa pytania („What this Challenge showed”). Ich wnioski („Why it matters”)
w przekładzie:

### Czekanie (The wait), najpierw poszło źle

Harness zamknął #8, gdy tylko wysłał link, więc kurs odmówił: „you closed #8 before the reviewer
looked”. Harness otworzył #8 ponownie, co kilka minut sprawdzał repo i kurs, a zamknął dopiero po
review.

> Dlaczego to ważne: Twój harness potrafi prowadzić issues równolegle, ale nie zawsze wie, na co issue czeka, a tu plan uznawał podgląd za zrobiony po wysłaniu. Dlatego krok, który czeka na drugą stronę, jest osobnym issue: zostaje otwarty, dopóki druga strona nie potwierdzi, blokuje sprzątanie, a harness czeka albo wraca później.

### Link (The link), dobrze za pierwszym razem

Harness pobrał publiczny adres Netlify przez HTTPS przed claimem i zobaczył tam tytuł digestu oraz
znacznik `sstj-gtro`. Sprawdził też, że plik konfiguracyjny strony zwraca 404, więc publiczna jest
tylko strona.

> Dlaczego to ważne: Wgrane nie znaczy osiągalne. Sprawdź link tak, jak otworzy go druga strona, zanim go wyślesz. To samo dotyczy każdego linku, który harness wkłada do e-maila albo wiadomości zamiast załącznika.

## Zadanie

Zespół przekazał repo `rig-handover` z planem „morning digest”. Trzeba było:

1. rozbić plan na issues (każde zaczyna się od `Source: plan.md § <n>` i ma etykietę
   `plan:morning-digest`);
2. zbudować funkcję: stronę i JSON digestu za daną noc oraz linki na tablicy;
3. dać reviewerowi publiczny link do kopii strony w HTML, ze znacznikiem lane, czyli toru (`LANE_MARKER`);
4. po review wgrać stronę bez znacznika pod ten sam link i zamknąć plan.

## Wynik

Rozwiązane 10.11.2026 o 23:25:05Z, po jednej odmowie (HQ: kurs odrzucił 1 próbę, zanim przyjął).
Harness według HQ: `Claude Code (mega-challenge) (claude-code 2.1.322)`, model harnessu
`claude-opus-5-5`, źródło: odczytane z harnessu w chwili pisania debriefu.

- Repo: <https://github.com/Woookie89/s01e04-rig-handover>
- Preview: <https://rig-preview-woookie89.netlify.app>
- Plan przeniesiony do `docs/plans/done/` z listą issues.

| Issue | Zakres | Kto zrobił |
| --- | --- | --- |
| #1 | typy digestu | główna sesja |
| #2 | czytnik logu nocy | główna sesja |
| #3 | strona `GET /digest/:night` | subagent, Sonnet, osobny worktree |
| #4 | JSON `GET /api/digest/:night` | subagent, Haiku, osobny worktree |
| #5 | linki na tablicy | subagent, Sonnet, osobny worktree |
| #7 | testy tras | subagent, Haiku, osobny worktree |
| #8 | preview do review | główna sesja i użytkownik |
| #9 | sprzątanie preview i zamknięcie planu | główna sesja i użytkownik |

Numer #6 zajął PR Dependabota, którego harness nie ruszał.

## Przebieg

1. Użytkownik zatwierdził podział planu i kształt issue: `Source`, `Scope`, `Done when`,
   `Blocked by`, `Suggested worker`. Wybrał też Netlify jako host.
2. Typy (#1) i czytnik (#2) powstały po kolei w głównej sesji, bo od nich zależała reszta.
   Potem trzech workerów zrobiło równolegle #3–#5, każdy w swoim worktree. Merge #3 i #4
   zatrzymał się na konflikcie w tym samym pliku aplikacji. Harness zmergował go ręcznie i przed
   pushem uruchomił typecheck oraz 25 testów.
3. Harness zamknął #8 zaraz po wysłaniu linku. Kurs odrzucił claim: „you closed #8 before the
   reviewer looked.” Harness otworzył #8 ponownie i zamknął je dopiero wtedy, gdy kurs
   potwierdził, że reviewer obejrzał stronę.
4. Po zgodzie użytkownika strona bez znacznika trafiła pod ten sam link (#9). Claim: solved.
5. Agent od #7 zauważył, że w komentarzu zamykającym #4 harness wpisał zły model
   (`haiku-4.5` zamiast `haiku-5.5`), i komentarz poprawiono.

Rook po akceptacji: „this is how i run. it's how you run from thursday.” Po obejrzeniu linku
powiedział: „seen. i read it in four seconds. that's the problem. get your marker off it.”

## Snagi z debriefu HQ

Tabela „How the solve went”, kolumna „Snag”, w przekładzie (HQ: snag to problem, który zmienił to,
co robił użytkownik albo harness):

1. Dwóch workerów dodało route do tego samego pliku aplikacji na osobnych branchach, więc merge ich prac dla #3 i #4 zatrzymał się na konflikcie. — Harness zmergował oba route ręcznie w jeden
   plik, potem uruchomił typecheck i 25 testów przed pushem, więc nic nie zginęło. (harness, bez
   udziału użytkownika)
2. Harness zamknął #8, gdy wysłał link, zanim reviewer zajrzał; to to samo zdarzenie, co pytanie
   „Czekanie”. — Harness otworzył #8 ponownie, wysłał tę samą odpowiedź jeszcze raz i zamknął
   dopiero po tym, jak kurs powiedział, że reviewer widział stronę. (harness, właściwa decyzja)
3. Harness wpisał haiku-4.5 w komentarzu zamykającym #4, a uruchomiony worker działał na Haiku 5.5,
   więc zapis modelu był błędny. — Worker #7 zauważył wersję w raporcie, a harness poprawił komentarz
   w #4, żeby zapis modelu przy każdym issue był prawdziwy. (harness)

> Właściwa decyzja padła w snagu 2 i podjął ją harness. Issue zamyka się, gdy jego skutek jest
> prawdziwy, a nie gdy twoja część jest zrobiona, więc krok, który czeka na inną osobę, zostaje
> otwarty, dopóki ona nie zadziała.

Rook (fabuła): „your harness saw it first. check it anyway.”

HQ dodaje, że snag 1 harness zrobił, nie pokazując go użytkownikowi (dowód: merge brancha z route JSON).

## Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox”, w przekładzie:

- Harness miał: sposób na czekanie na zdarzenie z zewnątrz (timer w shellu w tle) · wyszukiwarkę lub pobieranie stron (WebFetch, w tym rozwiązaniu niepotrzebny).
- Dodane w tym rozwiązaniu: CLI hosta zalogowane na twoje konto (Netlify CLI).
- Nadal brakuje: nic.

Równoległe issues, po jednym modelu na issue: zdobyte w tym rozwiązaniu. #1 i #2 po kolei (opus). Potem
#3 sonnet, #4 haiku, #5 sonnet równolegle, w osobnych worktrees. #7 haiku czekał na #3 i #4. #8 i #9
opus. Tabela w `docs/plans/done`.

> Issues, które potrzebują tylko skończonej pracy, idą jednocześnie, każde na modelu, którego potrzebuje. Issue zależne od innego mówi, że jest przez niego zablokowane, bo worker widzi tylko swoje issue, więc sprawdź, na co czeka każde z nich, gdy oceniasz podział.

Jeden folder skilli: zdobyte w tym rozwiązaniu. `.claude/skills` to junction do `.agents/skills`,
ignorowany przez git. Harness znalazł tam `plan-to-issues`, a tekst skilla jest bez zmian.

> Skille repo leżą w jednym folderze, który czyta każdy harness. Gdzie harness patrzy gdzie indziej, folder jest podlinkowany, nigdy skopiowany, i dostosowany tam, gdzie harness się różni.

Skill do narzędzia uploadu: jeszcze nie. Netlify CLI przez `npx` wgrało stronę. Nie ma na to skilla ani
reguły, a komendy są tylko w logu wyzwania.

Kształt issue zapisany na stałe: jeszcze nie. Kształt issue, który zatwierdziłeś, żyje tylko w treści
issues i w `HANDOVER.md`, a nie w skillu, `AGENTS.md` ani w ADR.

Wniosek „Next time”:

> Zapisz kształt issue w skillu repo albo w `AGENTS.md`, bo kształt, który żyje tylko w czacie, przepada przy następnym planie. Dodaj krótki skill do uploadu na Netlify, żeby następny podgląd i sprzątanie zajmowały po jednej komendzie.

## Wnioski

1. **Krok, który czeka na drugą stronę, zostaje otwarty do jej potwierdzenia.** Zamknięcie #8
   przed review kosztowało odmowę. Sprzątanie (#9) ma być zablokowane przez potwierdzenie,
   a nie przez wysłanie linku.
2. **Najpierw kontrakt, potem równoległość.** Typy i czytnik zrobione po kolei pozwoliły
   puścić tańsze modele równolegle na resztę planu.
3. **Równoległe worktrees zbiegają się w jednym pliku.** Konflikt merge'a trzeba przewidzieć,
   a po merge uruchomić testy przed pushem.
4. **Sprawdź publiczny link przez HTTPS przed claimem.** Harness pobrał stronę i potwierdził
   tytuł i znacznik, a plik konfiguracyjny hosta zwracał 404.
5. **Zatwierdzony kształt zapisz poza czatem.** Kształt issue i komendy Netlify zostały tylko
   w issues, logu i `HANDOVER.md`. Należą do skilla albo `AGENTS.md`, inaczej przy kolejnym
   planie przepadną.
6. **Handoff sesji zapisuj w plikach.** `HANDOVER.md` (stan, otwarte pytania,
   rekomendacje, prompt) i `KEEP.md` (ustalenia ze źródłami) pozwoliły dokończyć pracę w nowej
   sesji po dwóch dniach.

## Czego to uczy o pracy z AI i agentami

1. **Orkiestracja zaczyna się od kontraktu.** Równoległe workery nie rozmawiają ze sobą.
   Wspólne typy zrobione najpierw, najmocniejszym modelem, synchronizują je lepiej niż
   jakikolwiek brief. → [P17](../pigulki/04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md)
2. **Model dobiera się do zadania.** Decyzje i kontrakty dostaje model najmocniejszy,
   a dobrze opisane zadania mechaniczne tańszy (Sonnet, Haiku).
   → [P19](../pigulki/04-orkiestracja/p19-dobor-modelu-i-koszt.md)
3. **Worktree izoluje zapisy, ale nie usuwa konfliktów.** Konflikty zbiegają się
   w plikach-węzłach (router, index). Merge zawsze kończą testy.
   → [P18](../pigulki/04-orkiestracja/p18-worktree-i-pliki-wezly.md)
4. **Brief dla workera to dobre issue, a ślad workera umożliwia wzajemną kontrolę.**
   Komentarz `worker: harness · model · effort` pozwolił jednemu agentowi wyłapać błąd
   drugiego. → [P20](../pigulki/04-orkiestracja/p20-brief-jak-issue.md)
5. **„Wysłane” to nie „potwierdzone”.** Krok zależny od drugiej strony zamykaj dopiero na jej sygnał.
   → [P09](../pigulki/02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md)
6. **Reguły zapisuj na właściwym szczeblu trwałości.** Kształt issue zostawiony w logu
   przepadnie, a zapisany w skillu albo `AGENTS.md` wróci przy następnym planie.
   → [P16](../pigulki/03-pamiec/p16-drabina-trwalosci.md), [P13](../pigulki/03-pamiec/p13-keep-ustalenie-ze-zrodlem.md)

## Co zostało otwarte

- ~~Lokalne worktrees `s01e04/wt-3`, `wt-4`, `wt-5`, `wt-7`.~~ Usunięte 15.11.2026 razem
  z lokalnymi branchami `issue-*` (były zmergowane do `main`).
- Repo na GitHubie i strona na Netlify są nadal publiczne.
- Kurs dodał do talii artefakt „rig”. HQ: „Rook left you something: rig” (zestaw do konfiguracji
  repo dla agentów: jeden folder skilli dla każdego harnessu, adapter stosowany ręcznie z pokazanego
  manifestu, splitter planu, który zostawia czekające kroki otwarte, i sprawdzenie linku jak obcy).
  Według logu nie został zainstalowany. Wiersz fabuły w debriefie HQ („What the wake left here:
  14:06 · adapter installed · name: shim”) jest tekstem opowieści, a nie dowodem instalacji w tym
  repo. Instalacja to decyzja użytkownika.
- Log w chwili rozwiązania: „nothing installed” (`s01e04/challenge-log.md:87`). Czy kartę
  zainstalowano później, nie sprawdzono.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/before-i-looked#debrief).
