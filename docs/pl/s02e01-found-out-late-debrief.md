# S02E01 · Found Out Late — zapis przebiegu

Ten wpis łączy temat lekcji S02E01 z wyzwaniem „found out late”. Szerszy opis lekcji jest w
[notatkach o prymitywach agentowych](s02e01-agentic-primitives.md).

## Temat lekcji

Lekcja omawia pętlę agenta i to, kiedy agent może uznać pracę za skończoną. Wyzwanie pokazało
to w praktyce. O tym, co obowiązuje, decydują wszystkie źródła, także te dopisane po pierwszym
odczycie. Plan z repozytorium ani własne notatki o tym nie przesądzają.

## Zadanie i wynik

Dwa zespoły przebudowały nocną pętlę uzupełniania zapasów w `stock-5`. Zostawiły sesje Claude
Code i Codex, a w nich także wątki podagentów. Harness miał ustalić, co naprawdę uzgodniono,
napisać plan z sesją i czasem każdej decyzji, a potem zbudować magazyn zadań.

Kurs przyjął rozwiązanie 15.11.2026 o 19:04:56Z, po dwóch odmowach. Obowiązujący plan
(`s02e01/repo/stock-5/plan.md`):

| Obszar | Decyzja | Źródło |
| --- | --- | --- |
| Magazyn | Postgres w Dockerze zamiast SQLite (`SQLITE_BUSY` przy czterech workerach) | sesja Codex zespołu ops, 30.10 |
| Obraz / port | `postgres:17`, port hosta `5441` | podagent ops, 15.11, dopisany po check-inie |
| Baza | `reorder_zhbv` | jeszcze późniejsza sesja z 15.11 |
| ORM / schemat | Drizzle, tabela `reorder_jobs`, unikalna na (sku, night) | zespół A, 29.10; ops tego nie zmieniał |

## Przebieg

1. Pierwszy plan łączył obraz, port i dialekt w jednym wierszu. Kurs odpowiedział: „Your plan
   doesn't say which image version.” Harness rozbił plan tak, żeby każda decyzja miała własny wiersz.
2. Druga odmowa brzmiała: „Something changed since your check-in. Check again.” Archiwum sesji
   urosło już po pierwszym odczycie. Harness pobrał je ponownie i znalazł dwie późne sesje:
   podagenta, który zmienił obraz i port, oraz sesję, która zmieniła nazwę bazy.
3. Harness napisał skrypt `s02e01/tools/stop_gate.py`. Przed zakończeniem pracy pobiera listę
   źródeł i odsyła agenta z powrotem, jeśli coś jest nieprzeczytane. Kontrola uprawnień
   zablokowała dodanie go jako hooka `Stop`, więc przed ostatnią wysyłką harness uruchomił go
   ręcznie.

Rook po akceptacji: „the plan holds. i'd have shipped the first one. the exit is the important
part. i found out late.”

## Wnioski

1. **Przed „gotowe” przeczytaj źródła jeszcze raz.** Archiwum zmieniło się po pierwszym
   odczycie. Wysyłka bez ponownego pobrania oparła się na nieaktualnym obrazie i porcie.
2. **Jedna decyzja to jeden wiersz.** Plan, w którym jeden wiersz łączy kilka decyzji, ukrywa
   to, czego brakuje. Osobny wiersz ze źródłem i czasem pozwala sprawdzić każdą decyzję
   z osobna.
3. **Późniejsza decyzja nadpisuje tylko to, czego dotyczy.** Ops zmienił magazyn i dialekt, ale
   Drizzle i schemat zespołu A zostały w mocy.
4. **Czytaj każdy format i każdy wątek.** Jeden skrypt (`s02e01/work/dump.py`) czytał logi
   Claude Code, Codex i podagentów, więc żadna sesja nie umknęła.
5. **Pętlę zamykaj sprawdzeniem, nie poczuciem końca.** Hook `Stop` albo `./verify` (skill
   `rook-loop`, część done-check) wymusza ponowny odczyt przed zakończeniem. Instalację hooka
   zatwierdza użytkownik.

## Czego to uczy o pracy z AI i agentami

1. **Pętla agenta kończy się, gdy model przestaje wołać narzędzia, a nie gdy praca jest
   skończona.** Koniec musi wyznaczać zewnętrzne sprawdzenie: hook `Stop`, `./verify`, test.
   → [P07](../pigulki/02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md)
2. **Każda pętla potrzebuje wyjścia.** Warunek sukcesu, limit i widoczny plik stanu.
   `stop_gate.py` ma `MAX_BLOCKS = 3`. Pętla Ralph (`/ralph-loop`) z tego dnia nie miała ani warunku, ani
   limitu. → [P24](../pigulki/05-agent-bez-czlowieka/p24-petla-potrzebuje-wyjscia.md)
3. **Ponowny odczyt źródeł przed „gotowe” to zasada, nie ostrożność.** Inne zespoły
   i agenci pracowali równolegle i dopisali decyzje po pierwszym odczycie.
   → [P04](../pigulki/01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md)
4. **Decyzje zespołu zapisuj jak ADR-y: jedna na wiersz, ze źródłem.** Późniejsza decyzja
   zastępuje tylko swój zakres. → [P14](../pigulki/03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)
5. **Archeologia sesji to umiejętność.** Wiedza zespołu pracującego z agentami jest zapisana
   w transkryptach różnych harnessów i podagentów. Trzeba umieć je przeszukać.
   → [P15](../pigulki/03-pamiec/p15-pytaj-przeszle-sesje.md)
6. **Hook zmienia zachowanie harnessu, więc instaluje go użytkownik.** Blokada uprawnień
   przy hooku to zabezpieczenie, a nie przeszkoda.
   → [P35](../pigulki/07-czlowiek-w-petli/p35-uprawnienia-harnessu.md)

## Co zostało otwarte

- Magazyn nie został uruchomiony. Do tego trzeba włączyć Docker Desktop, uruchomić `npm install`
  i `docker compose up -d` w `s02e01/repo/stock-5`, a potem skrypt weryfikujący kursu. Pytanie
  „It runs” w debriefie zostało więc bez odpowiedzi.
- Hook `Stop` ze `stop_gate.py` nie jest wpięty w ustawienia. Czeka na zgodę użytkownika.

Kurs dodał do talii użytkownika artefakt „loop” (agent loop z widocznym plikiem stanu
i trzema wyjściami). Nie został zainstalowany. Debrief jest na
[stronie wyzwania](https://hq.mega.dev/challenges/found-out-late#debrief).
