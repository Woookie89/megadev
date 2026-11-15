# S01E04 · Before I Looked — zapis przebiegu

Ten wpis łączy temat lekcji S01E04 z wyzwaniem „before i looked”. Szerszy opis lekcji jest
w [notatkach o pracy z harnessami](s01e04-working-with-ai-harnesses.md). Dokładne wymiany
z kursem są w [challenge-log.md](../../s01e04/challenge-log.md).

## Temat lekcji

Lekcja dotyczy harnessu jako zestawu: skilli, plików z instrukcjami, workerów na różnych
modelach i kroków, które czekają na człowieka. Wyzwanie sprawdziło przejęcie cudzego repo:
plan trzeba było zamienić na issues, zbudować funkcję agentami i przeprowadzić przez recenzję,
która dzieje się poza harnessem.

## Zadanie

Zespół przekazał repo `rig-handover` z planem „morning digest”. Trzeba było:

1. rozbić plan na issues (każde zaczyna się od `Source: plan.md § <n>` i ma etykietę
   `plan:morning-digest`);
2. zbudować funkcję: stronę i JSON digestu za daną noc oraz linki na tablicy;
3. dać recenzentowi publiczny link do kopii strony w HTML, z markerem pasa (`LANE_MARKER`);
4. po recenzji wgrać stronę bez markera pod ten sam link i zamknąć plan.

## Wynik

Rozwiązane 10.11.2026 o 23:25:05Z, po jednej odmowie.

- Repo: <https://github.com/Woookie89/s01e04-rig-handover>
- Preview: <https://rig-preview-woookie89.netlify.app>
- Plan przeniesiony do `docs/plans/done/` z listą issues.

| Issue | Zakres | Kto zrobił |
| --- | --- | --- |
| #1 | typy digestu | główna sesja |
| #2 | czytnik logu nocy | główna sesja |
| #3 | strona `GET /digest/:night` | podagent, Sonnet, osobny worktree |
| #4 | JSON `GET /api/digest/:night` | podagent, Haiku, osobny worktree |
| #5 | linki na tablicy | podagent, Sonnet, osobny worktree |
| #7 | testy tras | podagent, Haiku, osobny worktree |
| #8 | preview do recenzji | główna sesja i użytkownik |
| #9 | sprzątanie preview i zamknięcie planu | główna sesja i użytkownik |

Numer #6 zajął PR Dependabota, którego harness nie ruszał.

## Przebieg

1. Użytkownik zatwierdził podział planu i kształt issue: `Source`, `Scope`, `Done when`,
   `Blocked by`, `Suggested worker`. Wybrał też Netlify jako host.
2. Typy (#1) i czytnik (#2) powstały po kolei w głównej sesji, bo od nich zależała reszta.
   Potem trzech workerów zrobiło równolegle #3–#5, każdy w swoim worktree. Merge #3 i #4
   zatrzymał się na konflikcie w tym samym pliku aplikacji. Harness scalił go ręcznie i przed
   pushem uruchomił typecheck oraz 25 testów.
3. Harness zamknął #8 zaraz po wysłaniu linku. Kurs odrzucił claim: „you closed #8 before the
   reviewer looked.” Harness otworzył #8 ponownie i zamknął je dopiero wtedy, gdy kurs
   potwierdził, że recenzent obejrzał stronę.
4. Po zgodzie użytkownika strona bez markera trafiła pod ten sam link (#9). Claim: solved.
5. Agent od #7 zauważył, że w komentarzu zamykającym #4 harness wpisał zły model
   (`haiku-4.5` zamiast `haiku-5.5`), i komentarz poprawiono.

Rook po akceptacji: „this is how i run. it's how you run from thursday.”

## Wnioski

1. **Krok, który czeka na drugą stronę, zostaje otwarty do jej potwierdzenia.** Zamknięcie #8
   przed recenzją kosztowało odmowę. Sprzątanie (#9) ma być zablokowane przez potwierdzenie,
   a nie przez wysłanie linku.
2. **Najpierw kontrakt, potem równoległość.** Typy i czytnik zrobione po kolei pozwoliły
   puścić tańsze modele równolegle na resztę planu.
3. **Równoległe worktrees zbiegają się w jednym pliku.** Konflikt merge'a trzeba przewidzieć,
   a po scaleniu uruchomić testy przed pushem.
4. **Sprawdź publiczny link przez HTTPS przed claimem.** Harness pobrał stronę i potwierdził
   tytuł i marker, a plik konfiguracyjny hosta zwracał 404.
5. **Zatwierdzony kształt zapisz poza czatem.** Kształt issue i komendy Netlify zostały tylko
   w issues, logu i `HANDOVER.md`. Należą do skilla albo `AGENTS.md`, inaczej przy kolejnym
   planie przepadną.
6. **Przekazanie sesji zapisuj w plikach.** `HANDOVER.md` (stan, otwarte pytania,
   rekomendacje, prompt) i `KEEP.md` (ustalenia ze źródłami) pozwoliły dokończyć pracę w nowej
   sesji po dwóch dniach.

## Co zostało otwarte

- Lokalne worktrees `s01e04/wt-3`, `wt-4`, `wt-5`, `wt-7`. Ich gałęzie są scalone, więc można
  je usunąć.
- Repo na GitHubie i strona na Netlify są nadal publiczne.
- Kurs dodał do talii artefakt „rig” (zestaw do konfiguracji repo dla agentów). Nie został
  zainstalowany.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/before-i-looked#debrief).
