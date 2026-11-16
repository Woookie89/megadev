# S02E04 · Two Places — zapis przebiegu

Ten wpis łączy temat lekcji S02E04 z wyzwaniem „two places”. Szerszy opis lekcji jest w
[notatkach o współpracy wielu agentów](s02e04-multi-agent-collaboration.md).

## Temat lekcji

Lekcja omawia systemy wieloagentowe: architektury (pojedynczy agent, podagenci, hierarchia,
zespół, rój), protokół Agent2Agent, kontrakty między agentami i orkiestrację. Agenci nie
dzielą wątków, więc przekazanie zadania musi nieść wszystko, czego odbiorca potrzebuje.
Każdy agent ma własny zakres, możliwości i uprawnienia. Wyzwanie sprawdziło delegowanie
w praktyce. Główny agent nie zrobił żadnego zadania sam. Każde zadanie poszło do osobnego
workera razem ze swoim skillem, jeden worker działał poza tą maszyną, a oba wyniki wróciły
do głównego agenta, który je połączył.

## Zadanie i wynik

Kurs dał dwa zadania, każde z własnym skillem i własnym linkiem MCP (klucz ważny około 24 h,
bez logowania):

- **job-1** `incident-lookup` v1: znaleźć w logu incydentów wpis tram-3 z nocy awarii
  i oddać go bez nazwisk. Narzędzia: `search`, `read`, `redact`, `submit`.
- **job-2** `voice-to-memo` v1: przepisać notatkę głosową dyżurki tramwajowej z klipu
  `dispatch-3-35f47fcf.mp3` na notatki, jedna na zdarzenie. Narzędzia: `transcribe`,
  `memo_write`, `memo_search`, `submit`.

Każde `submit` zwraca wynik i receipt. Claim wymaga obu receiptów i odpowiedzi `merge`:
notatki z job-2 dla chwili, którą opisuje wpis z job-1.

Kurs przyjął rozwiązanie 16.11.2026 o 11:38:58Z, przy pierwszym claimie, bez odmów.

Użytkownik:

- wybrał miejsce dla zdalnego workera: Claude Code w chmurze (claude.ai/code), a GitHub
  Actions jako zapas,
- zgodził się na prywatne repo `Woookie89/s02e04-two-places` z pushem i na jednorazową
  routine bez konektorów, tylko z Bash i Read („jest zgoda”, 11:22Z),
- przed startem routine zmienił sieć środowiska „Default” z Trusted na Limited
  z `hq.mega.dev` i menedżerami pakietów („zapisane”, 11:27Z).

## Jak działają dwa workery

| | job-1 (zdalnie) | job-2 (lokalnie) |
| --- | --- | --- |
| miejsce | routine w claude.ai/code, jednorazowa (`run_once_at` 11:36Z), środowisko „Default” | `claude -p` (headless) w `s02e04/local-worker` |
| model | Sonnet 5.5 | Opus 5.5 |
| skill | `.claude/skills/incident-lookup/SKILL.md` w prywatnym repo, klonowanym przez routine | `local-worker/.claude/skills/voice-to-memo/SKILL.md` |
| narzędzia zadania | `tools/mcp.mjs`: klient MCP Streamable HTTP bez zależności, adres ze zmiennej `JOB_URL` | serwer MCP `job` z konfiguracji generowanej z pliku ignorowanego przez git (`--strict-mcp-config`) |
| uprawnienia | `allowed_tools` Bash i Read, zero konektorów | bez pytania tylko `mcp__job` i `Skill` |
| link zadania | tylko w prompcie routine (prywatnym dla użytkownika), nigdy w repo | tylko w `secrets.local.json` i wygenerowanym `mcp.secrets.local.json` |
| droga z powrotem | końcowa wiadomość z `JOB1_RECORD:` i `JOB1_SUBMIT_REPLY:`, czytana przez główny agenta z logu przebiegu routine (`get_run_log`) | końcowa wiadomość z transkryptem i `JOB2_SUBMIT_REPLY:` w `transcript.local.jsonl`, `run.sh` drukuje wynik |
| przebieg | 6 tur, 33 s | 18 tur, 191 s |

Główny agent nie wołał narzędzi żadnego zadania. Dostał oba wyniki i receipty, przeliczył
czas i złożył claim.

## Przebieg

1. **Start i skille.** `start-challenge` dał oba zadania. Harness pobrał skille kursu
   (`s02e04/skills/`) i zapisał ich reguły w logu. Obie prace to same wywołania narzędzi MCP,
   a transkrypcja działa na serwerze kursu, więc lokalne narzędzia audio nie były potrzebne.
2. **Wybór miejsca.** Użytkownik napisał najpierw o GitHub Actions, a w tej samej turze
   zmienił zdanie na Claude Code w chmurze, z Actions jako zapasem. Job-1 poszedł do chmury,
   job-2 został lokalnie.
3. **Pierwsza przeszkoda: konektory.** Routine w chmurze dostaje tylko konektory z claude.ai,
   a nie dowolny adres MCP. Harness napisał więc `tools/mcp.mjs`, czyli minimalny klient MCP
   bez zależności. Przetestował go lokalnie na job-1 tylko przez `tools/list`
   i `resources/list`, bez żadnego kroku zadania: 4 narzędzia i zasób
   `skill://incident-lookup/SKILL.md` (v1).
4. **Druga przeszkoda: sieć.** Domyślna sieć środowiska w chmurze to Trusted, która nie
   wpuszcza `hq.mega.dev`. Harness podał użytkownikowi, co zmienić, zanim routine ruszyła.
5. **Repo i routine.** Po zgodzie harness założył prywatne repo z samym skillem, klientem MCP,
   README i `.gitignore`. O 11:23Z utworzył routine z `run_once_at` 11:36Z, bez konektorów,
   z Bash i Read. Link zadania jest tylko w prompcie routine.
6. **Job-2 lokalnie.** Worker (11:22–11:25Z) wczytał skill i wywołał `transcribe`, 11 razy
   `memo_write`, raz `memo_search` i raz `submit`. Kurs przyjął wynik za pierwszym razem:
   11 notatek ([job-2-result.md](../../s02e04/job-2-result.md)). Transkrypt zaczyna się od
   „Desk time, central European.”, więc czasy w klipie to CET. Worker zaliczył też kontrolę
   pantografu tram-7 (3:02) jako zdarzenie, a `submit` to przyjął.
7. **Sieć otwarta.** O 11:27Z użytkownik ustawił w środowisku „Default” sieć Limited
   z `hq.mega.dev` i menedżerami pakietów.
8. **Job-1 w chmurze.** Routine ruszyła o 11:36:28Z. Worker najpierw przeczytał skill z linku
   zadania i porównał go z kopią w repo. Potem przeszedł procedurę:
   - `search` w `ops/live` dał `inc-5174` „tram-3 · display data timeout · 2026-10-31”,
   - `read` pól `date`, `time`, `clock`, `line`, `cause`, bez `crew`,
   - `redact`, bo w `cause` siedziało nazwisko (zostało „reported by [redacted]”),
   - `submit`, przyjęty za pierwszym razem o 11:37:03Z.

   Wpis: 2026-10-31, 22:35, zegar US Eastern, tram-3, „display data timed out at the depot
   controller”.
9. **Droga do domu.** O 11:38:17Z główny agent pobrał log przebiegu routine (`get_run_log`)
   i wziął z niego wynik oraz receipt. Receipty trafiły do `secrets.local.json` (ignorowany
   przez git).
10. **Złączenie.** Dwa źródła mają dwa zegary. Wpis job-1 jest w czasie US Eastern, a klip
    job-2 w CET. 31.10.2026 Nowy Jork był jeszcze na czasie letnim (EDT, UTC-4), bo w USA
    zmiana czasu jest 1.11 o 02:00. W Europie czas letni skończył się 25.10. W tym tygodniu
    różnica wynosi więc 5 godzin, nie 6:

    ```text
    2026-10-31 22:35 EDT (UTC-4) → 2026-11-01 02:35Z → 03:35 CET
    → "Three thirty-five: tram 3 boards froze again, feed refresh stalled at the depot panel @1:00"
    ```

    Harness sprawdził to przez `Intl` (`America/New_York`, `Europe/Berlin`). Dwie pułapki:
    ten sam zegar dla obu źródeł daje „Ten thirty-five” @0:09, a EST (UTC-5) daje
    „Four thirty-five” @1:13.
11. **Claim.** 11:38:58Z, oba receipty i `merge` jak wyżej. Wynik: `solved`, pierwszy claim,
    0 odmów.

Na arkuszu debriefu kursu (fabuła): „the right call was yours. keep reading.” — rook. Nagrodą
jest artefakt `crew` w talii, czyli zestaw do delegowania: lista, kto działa gdzie, brief,
który wysyła zadanie razem ze skillem i drogą powrotu, oraz sprawdzenie receiptów
i złączenie. Rook (fabuła): „you'll meet the others. they're me, mostly.” Nic nie zostało
zainstalowane.

## Wnioski

Debrief kursu postawił pięć pytań:

| Pytanie | Wynik | Why it matters (kurs) |
| --- | --- | --- |
| One pair of hands | went right | „Delegation means the work leaves the main agent: its own context, its own connection — and one job left the machine.” |
| A listed skill is not a used skill | went right | „A tool says what; a skill says how. The skill has to travel with the job — a skill the main agent read is not one the worker used.” |
| The dump | did not come up | „Without the procedure a worker does the obvious thing; the skill turns a dump into the shape the next reader needs.” |
| The join | went right | „The merge is the main agent's own job: two sources, two frames of reference — normalize before joining.” |
| The way home | went right | „A job sent away comes back only if the handoff planned the way home.” |

Za trafną decyzję kurs uznał otwarcie sieci przed przebiegiem: „A remote worker reaches only
what its place allows, so open the course domain before the run instead of learning it from
a failed one.” Rada kursu na następny raz: „Before you hand a job to a remote worker, check
its network allowlist and how it reaches the job's tools, because a cloud sandbox gets only
what you open and ship to it.”

Toolbox według kursu: było „time-zone-aware join (Node Intl)”. Doszły: „workers with own MCP
connection (claude -p with job MCP config)”, „worker off this machine (claude.ai/code
routine)”, „skill handed to each worker (Claude Code skills folder)” i „planned way home
(routine run log)”.

1. **Główny agent tylko delegował.** Każdy worker miał własny kontekst i własne połączenie
   z narzędziami zadania. Główny agent nie wykonał żadnego kroku zadania. Klienta MCP
   sprawdził na job-1 tylko przez `tools/list` i `resources/list`.
2. **Skill trafił do workera razem z zadaniem.** Lokalnie leżał w `.claude/skills/` katalogu workera,
   zdalnie w repo klonowanym przez routine. Prompt każdego workera kazał go wczytać
   i podał wersję. Zdalny worker sam porównał kopię z repo ze skillem z linku zadania.
3. **Złączenie wymagało normalizacji, nie zgadywania.** Każdy skill kazał zachować czas tak,
   jak go podaje źródło („Keep the time as the record gives it, with its clock”, „Keep the
   times said in the clip as they are said”). Przeliczenie zrobił główny agent, kodem,
   z bazą stref czasowych, a nie z pamięci o „zwykłej” różnicy 6 godzin.
4. **Drogę powrotu zaplanował brief.** Oba prompty kazały skończyć markerem z całą
   odpowiedzią `submit`. Lokalnie wynik trafił do pliku, zdalnie do logu przebiegu, który
   harness umiał pobrać.
5. **Przeszkody chmury dało się przewidzieć.** Routine nie dostaje dowolnego MCP, a sieć
   Trusted nie wpuszcza domeny kursu. Obie rzeczy harness rozwiązał przed przebiegiem
   (własny klient MCP, prośba o zmianę sieci), więc routine przeszła za pierwszym razem.
6. **`--allowedTools` to lista zgód, nie lista narzędzi.** Init lokalnego workera pokazał
   też wbudowane narzędzia (Bash, Write, WebFetch i inne). Worker użył tylko `Skill`,
   `ToolSearch` i narzędzi zadania. Ograniczały go prompt i lista zgód, a nie brak narzędzi.
   Potwierdzone w dokumentacji CLI: zawęża dopiero `--tools` ([cli-reference](https://code.claude.com/docs/en/cli-reference)).

## Czego to uczy o pracy z AI i agentami

1. **Skill trzeba przekazać razem z zadaniem.** Worker nie widzi kontekstu głównego agenta. Skill
   przeczytany w głównym wątku nie istnieje w kontekście workera. Musi leżeć tam, gdzie
   harness workera go załaduje, z wersją, którą da się sprawdzić. Wróci przy każdym
   podagencie, CI i agencie w chmurze, który ma robić coś „po naszemu”.
   → [P43](../pigulki/04-orkiestracja/p43-przekaz-skill-z-zadaniem.md),
   [P20](../pigulki/04-orkiestracja/p20-brief-jak-issue.md)
2. **Normalizuj, zanim złączysz.** Każde źródło ma swój układ odniesienia: strefę czasową,
   jednostkę, walutę, kodowanie. Model chętnie złączy „22:35” z „22:35”, bo wyglądają tak
   samo. Przeliczenie to deterministyczny kod po stronie tego, kto łączy. Wróci przy
   raportach z kilku systemów, logach z różnych serwerów i danych z różnych krajów.
   → [P44](../pigulki/04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md)
3. **Zdalny worker sięga tylko tam, gdzie pozwala mu miejsce, i wraca tylko zaplanowaną
   drogą.** Sandbox w chmurze ma własną sieć, własne konektory i własne uprawnienia. Wynik
   nie wraca sam: trzeba z góry wiedzieć, gdzie go odczytać. Wróci przy CI, routine,
   agentach na serwerze i każdym „puść to w tle”.
   → [P45](../pigulki/05-agent-bez-czlowieka/p45-zdalny-worker-droga-tam-i-z-powrotem.md)
4. **Worker dostaje tylko narzędzia swojego zadania.** Jeden serwer MCP na workera, zero
   konektorów w chmurze, krótka lista zgód. Lista zgód nie usuwa jednak wbudowanych narzędzi.
   → [P30](../pigulki/06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md)
5. **Link zadania to klucz.** Trzyma go plik ignorowany przez git albo prompt widoczny tylko
   dla właściciela, nigdy repo. Prompt i log przebiegu routine przechowują go jednak do
   wygaśnięcia. → [P32](../pigulki/06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md)

## Co zostało otwarte

- **Repo.** Prywatne `Woookie89/s02e04-two-places` z klientem `tools/mcp.mjs` i skillem
  `incident-lookup`, bez sekretów. Darmowe. Może się przydać przy kolejnym workerze w chmurze.
- **Routine** `trig_014Y2spjvDcR2i9H3SwpxR3A`. Jednorazowa, już wykonana i sama wyłączona.
  Jej prompt i log przebiegu zawierają link job-1, który wygasa około 17.11.2026 o 11:23Z.
  Usunąć można ją na <https://claude.ai/code/routines>.
- **Sieć środowiska „Default”** w claude.ai: Limited z `hq.mega.dev` i menedżerami pakietów.
  Zmienił ją użytkownik. Jeśli nie jest potrzebna, można wrócić do Trusted.
- **Pliki lokalne.** `s02e04/secrets.local.json` (linki, receipty, wyniki) i
  `local-worker/transcript.local.jsonl` są ignorowane przez git.
- **Koszt.** Nic poza subskrypcją: przebieg routine 33 s na Sonnet 5.5, lokalny worker na
  loginie Claude Code.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/two-places#debrief).
