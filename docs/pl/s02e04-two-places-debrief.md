# S02E04 · Two Places — zapis przebiegu

Ten wpis łączy temat lekcji S02E04 z wyzwaniem „two places”. Szerszy opis lekcji jest w
[notatkach o współpracy wielu agentów](s02e04-multi-agent-collaboration.md). Pojęcia kursu
i agentów (worker, brief, receipt, claim, routine, sandbox) wyjaśnia
[słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja omawia systemy wieloagentowe: architektury (pojedynczy agent, podagenci, hierarchia,
zespół, rój), protokół Agent2Agent, kontrakty między agentami i orkiestrację. Agenci nie
widzą nawzajem swoich rozmów, więc przy przekazaniu zadania odbiorca musi dostać wszystko,
czego potrzebuje. Każdy agent ma własny zakres, możliwości i uprawnienia.

Wyzwanie sprawdzało delegowanie w praktyce. Główny agent nie wykonał żadnego zadania sam.
Każde zadanie trafiło do osobnego workera razem ze swoim skillem. Jeden worker działał poza
tym komputerem, a oba wyniki wróciły do głównego agenta, który je połączył.

## Zadanie i wynik

Kurs dał dwa zadania. Każde miało własny skill i własny link do serwera MCP. Link działa
jak klucz: nie wymaga logowania i jest ważny około 24 h.

- **job-1** `incident-lookup` v1: znaleźć w rejestrze incydentów wpis o tramwaju tram-3
  z nocy awarii i oddać go bez nazwisk. Narzędzia: `search`, `read`, `redact`, `submit`.
- **job-2** `voice-to-memo` v1: zamienić nagranie głosowe dyspozytora tramwajów
  (`dispatch-3-35f47fcf.mp3`) na notatki, po jednej na zdarzenie. Narzędzia: `transcribe`,
  `memo_write`, `memo_search`, `submit`.

Każde zadanie kończy się wywołaniem `submit`, które zwraca wynik i receipt (potwierdzenie
przyjęcia). Do zgłoszenia rozwiązania (claim) potrzebne były oba receipty i odpowiedź
`merge`: ta notatka z job-2, która dotyczy momentu opisanego we wpisie z job-1.

Kurs przyjął rozwiązanie 16.11.2026 o 11:38:58 UTC, przy pierwszym zgłoszeniu, bez odmów.

Użytkownik:

- wybrał miejsce dla zdalnego workera: Claude Code w chmurze (claude.ai/code), a GitHub
  Actions jako plan zapasowy,
- zgodził się na prywatne repo `Woookie89/s02e04-two-places` z pushem i na jednorazową
  routine bez konektorów, z narzędziami Bash i Read („jest zgoda”, 11:22 UTC),
- przed startem routine zmienił ustawienie sieci środowiska „Default” z Trusted na Limited,
  z domeną `hq.mega.dev` i dostępem do menedżerów pakietów („zapisane”, 11:27 UTC).

## Jak działały dwa workery

| | job-1 (zdalnie) | job-2 (lokalnie) |
| --- | --- | --- |
| miejsce | routine w claude.ai/code, jednorazowa (start 11:36 UTC), środowisko „Default” | `claude -p` (Claude Code bez interfejsu) w `s02e04/local-worker` |
| model | Sonnet 5.5 | Opus 5.5 |
| skill | `.claude/skills/incident-lookup/SKILL.md` w prywatnym repo, które routine pobrała | `local-worker/.claude/skills/voice-to-memo/SKILL.md` |
| dostęp do narzędzi zadania | `tools/mcp.mjs`: własny klient MCP bez zależności, adres ze zmiennej `JOB_URL` | serwer MCP `job` z konfiguracji tworzonej z pliku ignorowanego przez git (`--strict-mcp-config`) |
| uprawnienia | narzędzia Bash i Read, żadnych konektorów | bez pytania o zgodę tylko `mcp__job` i `Skill` (pozostałe wbudowane narzędzia nadal były dostępne, patrz wniosek 6) |
| link zadania | tylko w prompcie routine (widocznym wyłącznie dla użytkownika), nigdy w repo | tylko w `secrets.local.json` i wygenerowanym `mcp.secrets.local.json` |
| powrót wyniku | ostatnia wiadomość z liniami `JOB1_RECORD:` i `JOB1_SUBMIT_REPLY:`, którą główny agent odczytał z logu uruchomienia (`get_run_log`) | ostatnia wiadomość z transkryptem i linią `JOB2_SUBMIT_REPLY:` w `transcript.local.jsonl`; `run.sh` wypisuje wynik |
| czas działania | 6 tur, 33 s | 18 tur, 191 s |

Główny agent nie wywołał żadnego kroku zadania. Odebrał oba wyniki i receipty, przeliczył
czas i zgłosił rozwiązanie.

## Przebieg

1. **Start i skille.** `start-challenge` dał oba zadania. Harness pobrał skille kursu
   (`s02e04/skills/`) i zapisał ich reguły w logu. Oba zadania to wyłącznie wywołania
   narzędzi MCP, a transkrypcja działa na serwerze kursu, więc lokalne narzędzia do audio
   nie były potrzebne.
2. **Wybór miejsca.** Użytkownik najpierw zaproponował GitHub Actions, a chwilę później
   zmienił zdanie na Claude Code w chmurze, z Actions jako planem zapasowym. Job-1 poszedł
   do chmury, job-2 został lokalnie.
3. **Pierwsza przeszkoda: konektory.** Routine w chmurze może korzystać tylko z konektorów
   claude.ai, a nie z dowolnego adresu MCP. Harness napisał więc `tools/mcp.mjs`, minimalnego
   klienta MCP bez zależności. Przetestował go lokalnie na linku job-1 wyłącznie
   operacjami tylko do odczytu (`tools/list`, `resources/list`), bez żadnego kroku zadania.
   Wynik: 4 narzędzia i skill udostępniony jako zasób `skill://incident-lookup/SKILL.md` (v1).
4. **Druga przeszkoda: sieć.** Domyślne ustawienie sieci w środowisku chmurowym (Trusted)
   blokuje `hq.mega.dev`. Harness opisał użytkownikowi, co zmienić, zanim routine
   wystartowała.
5. **Repo i routine.** Po zgodzie użytkownika harness założył prywatne repo ze skillem,
   klientem MCP, README i `.gitignore`. O 11:23 UTC utworzył routine z jednorazowym startem
   o 11:36 UTC, bez konektorów, z narzędziami Bash i Read. Link zadania jest tylko w prompcie
   routine.
6. **Job-2 lokalnie.** Worker (11:22–11:25 UTC) wczytał skill i wywołał raz `transcribe`,
   11 razy `memo_write`, raz `memo_search` i raz `submit`. Kurs przyjął wynik za pierwszym
   razem: 11 notatek ([job-2-result.md](../../s02e04/job-2-result.md)). Transkrypt zaczyna się
   od słów „Desk time, central European.”, więc czasy w nagraniu są w strefie CET. Worker
   uznał też za zdarzenie kontrolę pantografu w tram-7 (3:02), a kurs to przyjął.
7. **Sieć otwarta.** O 11:27 UTC użytkownik ustawił w środowisku „Default” sieć Limited
   z `hq.mega.dev` i dostępem do menedżerów pakietów.
8. **Job-1 w chmurze.** Routine wystartowała o 11:36:28 UTC. Worker najpierw przeczytał skill
   z linku zadania i porównał go z kopią w repo. Potem wykonał procedurę:
   - `search` w zakresie `ops/live` zwrócił wpis `inc-5174` „tram-3 · display data timeout ·
     2026-10-31”,
   - `read` pobrał pola `date`, `time`, `clock`, `line`, `cause`, bez pola `crew`,
   - `redact` usunął nazwisko z pola `cause` (zostało „reported by [redacted]”),
   - `submit` został przyjęty za pierwszym razem o 11:37:03 UTC.

   Wpis: 31.10.2026, 22:35, czas US Eastern, tram-3, „display data timed out at the depot
   controller”.
9. **Odbiór wyniku.** O 11:38:17 UTC główny agent pobrał log uruchomienia routine
   (`get_run_log`) i odczytał z niego wynik oraz receipt. Receipty zapisał w
   `secrets.local.json` (plik ignorowany przez git).
10. **Łączenie wyników.** Źródła podawały czas w różnych strefach: wpis z job-1 w czasie
    US Eastern, a nagranie z job-2 w CET. 31.10.2026 w Nowym Jorku obowiązywał jeszcze czas
    letni (EDT, UTC−4), bo w USA zmiana czasu następuje 1.11 o 2:00. W Europie czas letni
    skończył się 25.10. W tym tygodniu różnica wynosiła więc 5 godzin, a nie 6:

    ```text
    2026-10-31 22:35 EDT (UTC-4) → 2026-11-01 02:35 UTC → 03:35 CET
    → "Three thirty-five: tram 3 boards froze again, feed refresh stalled at the depot panel @1:00"
    ```

    Harness sprawdził to kodem, przez `Intl` (strefy `America/New_York` i `Europe/Berlin`).
    Dwie pułapki: przyjęcie tej samej godziny w obu źródłach dałoby notatkę „Ten thirty-five”
    @0:09, a przyjęcie czasu zimowego w USA (EST, UTC−5) notatkę „Four thirty-five” @1:13.
11. **Zgłoszenie.** O 11:38:58 UTC harness wysłał oba receipty i odpowiedź `merge` jak wyżej.
    Wynik: rozwiązane przy pierwszym zgłoszeniu, 0 odmów.

W debriefie kursu jest linia z fabuły: „the right call was yours. keep reading.”
(Rook). Nagrodą jest artefakt `crew` w talii kursu: zestaw do delegowania pracy, czyli
lista workerów (kto działa gdzie), szablon briefu, który przekazuje zadanie razem ze
skillem i sposobem oddania wyniku, oraz reguły sprawdzania receiptów i łączenia wyników.
Rook (fabuła): „you'll meet the others. they're me, mostly.” Po rozwiązaniu użytkownik
poprosił o instalację: skill `crew` (wersja b72fc24a6ef8) jest zainstalowany globalnie
w `~/.claude/skills/crew`, obok innych skilli z kursu, a sumy SHA-256 wszystkich plików
zgadzają się z podanymi przez kurs.

## Wnioski

Debrief kursu zadał pięć pytań:

| Pytanie | Wynik | Dlaczego to ważne (słowa kursu) |
| --- | --- | --- |
| One pair of hands | od razu dobrze | „Delegation means the work leaves the main agent: its own context, its own connection — and one job left the machine.” |
| A listed skill is not a used skill | od razu dobrze | „A tool says what; a skill says how. The skill has to travel with the job — a skill the main agent read is not one the worker used.” |
| The dump | nie wystąpiło | „Without the procedure a worker does the obvious thing; the skill turns a dump into the shape the next reader needs.” |
| The join | od razu dobrze | „The merge is the main agent's own job: two sources, two frames of reference — normalize before joining.” |
| The way home | od razu dobrze | „A job sent away comes back only if the handoff planned the way home.” |

Za decyzję, która przesądziła o wyniku, kurs uznał otwarcie sieci przed uruchomieniem: „A
remote worker reaches only what its place allows, so open the course domain before the run
instead of learning it from a failed one.” Rada kursu na następny raz: „Before you hand a
job to a remote worker, check its network allowlist and how it reaches the job's tools,
because a cloud sandbox gets only what you open and ship to it.”

Narzędzia według kursu (toolbox): przed wyzwaniem było łączenie z uwzględnieniem stref
czasowych (Node `Intl`). W trakcie doszły: workery z własnym połączeniem MCP (`claude -p`
z konfiguracją MCP zadania), worker poza tym komputerem (routine w claude.ai/code), skill
przekazany każdemu workerowi (folder skilli Claude Code) i zaplanowany powrót wyniku (log
uruchomienia routine).

1. **Główny agent tylko delegował.** Każdy worker miał własny kontekst i własne połączenie
   z narzędziami zadania. Główny agent nie wykonał żadnego kroku zadania. Klienta MCP
   sprawdził na linku job-1 tylko operacjami do odczytu (`tools/list`, `resources/list`).
2. **Skill trafił do workera razem z zadaniem.** Lokalnie leżał w `.claude/skills/`
   katalogu workera, a zdalnie w repo pobranym przez routine. Prompt każdego workera kazał
   go wczytać i podawał wersję. Zdalny worker sam porównał kopię z repo ze skillem
   z linku zadania.
3. **Łączenie wymagało przeliczenia, a nie zgadywania.** Oba skille kazały oddać czas tak,
   jak podaje go źródło („Keep the time as the record gives it, with its clock”, „Keep the
   times said in the clip as they are said”). Przeliczył go główny agent, kodem, z bazą
   stref czasowych, a nie z pamięci o „zwykłej” różnicy 6 godzin.
4. **Powrót wyniku był zaplanowany w briefie.** Oba prompty kazały zakończyć pracę linią
   ze znacznikiem i pełną odpowiedzią `submit`. Lokalnie wynik trafił do pliku, a zdalnie
   do logu uruchomienia, który harness umiał pobrać.
5. **Przeszkody w chmurze dało się przewidzieć.** Routine nie łączy się z dowolnym
   serwerem MCP, a sieć Trusted blokuje domenę kursu. Harness rozwiązał obie sprawy przed
   uruchomieniem (własny klient MCP, prośba o zmianę sieci), więc routine zadziałała za
   pierwszym razem.
6. **`--allowedTools` nie ogranicza zestawu narzędzi.** Na starcie lokalny worker zgłosił
   też wbudowane narzędzia (Bash, Write, WebFetch i inne). `--allowedTools` tylko zwalnia
   wymienione narzędzia z pytania o zgodę. Żeby naprawdę zawęzić zestaw, trzeba użyć
   `--tools` ([dokumentacja CLI](https://code.claude.com/docs/en/cli-reference)). Worker
   użył tylko `Skill`, `ToolSearch` i narzędzi zadania, ale ograniczał go prompt, a nie brak
   innych narzędzi. Skrypt `run.sh` ma już `--tools "Skill"` na kolejne uruchomienia.

## Czego to uczy o pracy z AI i agentami

1. **Skill trzeba przekazać razem z zadaniem.** Worker nie widzi kontekstu głównego agenta.
   Skill przeczytany przez głównego agenta nie istnieje dla workera. Musi leżeć tam, skąd
   harness workera go wczyta, z wersją, którą da się sprawdzić. Przyda się przy każdym
   podagencie, zadaniu w CI i agencie w chmurze, który ma pracować według ustalonej
   procedury.
   → [P43](../pigulki/04-orkiestracja/p43-przekaz-skill-z-zadaniem.md),
   [P20](../pigulki/04-orkiestracja/p20-brief-jak-issue.md)
2. **Normalizuj, zanim złączysz.** Każde źródło zapisuje dane po swojemu: w innej strefie
   czasowej, jednostce, walucie czy kodowaniu. Model chętnie połączy „22:35” z „22:35”, bo
   wyglądają tak samo. Przeliczenie powinien zrobić kod po stronie tego, kto łączy wyniki.
   Przyda się przy raportach z kilku systemów, logach z różnych serwerów i danych z różnych
   krajów. → [P44](../pigulki/04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md)
3. **Zdalny worker ma dostęp tylko do tego, na co pozwala jego środowisko, a wynik wraca
   tylko zaplanowaną drogą.** Sandbox w chmurze ma własną sieć, własne konektory i własne
   uprawnienia. Wynik nie wraca sam: trzeba z góry wiedzieć, skąd go odebrać. Przyda się
   przy CI, routine, agentach na serwerze i każdej pracy puszczonej w tle.
   → [P45](../pigulki/05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md)
4. **Worker dostaje tylko narzędzia swojego zadania.** Jeden serwer MCP na workera, żadnych
   konektorów w chmurze, krótka lista zgód. Pamiętaj jednak, że lista zgód nie usuwa
   wbudowanych narzędzi, robi to dopiero `--tools`.
   → [P30](../pigulki/06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md)
5. **Link zadania to klucz.** Przechowuj go w pliku ignorowanym przez git albo w prompcie
   widocznym tylko dla właściciela, nigdy w repo. Uwaga: prompt i log uruchomienia routine
   przechowują go aż do wygaśnięcia.
   → [P32](../pigulki/06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md)

## Co zostało otwarte

- **Repo.** Prywatne `Woookie89/s02e04-two-places` z klientem `tools/mcp.mjs` i skillem
  `incident-lookup`, bez sekretów. Darmowe. Może się przydać przy kolejnym workerze
  w chmurze.
- **Routine** `trig_014Y2spjvDcR2i9H3SwpxR3A`. Jednorazowa, już wykonana i sama się
  wyłączyła. Jej prompt i log uruchomienia zawierają link job-1, który wygasa około
  17.11.2026 o 11:23 UTC. Można ją usunąć ręcznie na <https://claude.ai/code/routines>.
- **Sieć środowiska „Default”** w claude.ai: Limited z `hq.mega.dev` i dostępem do
  menedżerów pakietów. Zmienił ją użytkownik. Jeśli nie będzie potrzebna, można wrócić do
  Trusted.
- **Pliki lokalne.** `s02e04/secrets.local.json` (linki, receipty, wyniki) i
  `local-worker/transcript.local.jsonl` są ignorowane przez git.
- **Koszt.** Nic poza subskrypcją: uruchomienie routine trwało 33 s na Sonnet 5.5, a lokalny
  worker działał na koncie Claude Code użytkownika.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/two-places#debrief).
