# S03E05 · What Came Back — zapis przebiegu

Ten wpis łączy temat lekcji S03E05 z wyzwaniem „what came back”. Szerszy opis lekcji jest
w [notatkach o produktach, które uczą się po wydaniu](s03e05-products-that-learn-after-release.md).
Pojęcia (guardrail, sygnał, werdykt, replay) wyjaśnia [słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja mówi, że po wydaniu funkcji zostają ślady: logi, analityka, zgłoszenia z supportu,
nagrania rozmów i zachowanie ludzi. Z samych sygnałów rzadko wynika działanie. Trzeba je
przetworzyć razem, wykryć sprzeczności, dojść do przyczyny źródłowej i ocenić pewność.
Potem zapada jedna z sześciu decyzji: rozwinąć, poprawić, uprościć, cofnąć, zbadać albo
zatrzymać. Agent robi to, co należy do agentów, a człowiekowi zostawia jedno pytanie, na które
tylko on może odpowiedzieć. Jego odpowiedź staje się regułą, którą czyta następny agent.

Wyzwanie sprawdziło to na dwóch wydaniach, które wróciły po dwóch tygodniach z liczbami
i z gotowym podsumowaniem „clear win, expand”. Trzeba było przejrzeć zebrane sygnały,
pogrupować je, dla każdej grupy wybrać jeden z sześciu czasowników (`expand`, `revise`,
`simplify`, `revert`, `investigate`, `stop`) i podać identyfikatory sygnałów, na których
opiera się wybór. Decyzje należące do właściciela produktu podejmuje człowiek, resztę
rozstrzyga harness.

## Zadanie i wynik

Zgłoszenia były dwa:

- **claim 1:** grupy `{name, signals, verb, who (agent | owner), confidence?, note}`, wybór
  właściciela (`pick`), kod właściciela i jedna zachowana reguła (`rule`),
- **claim 2:** po przyjęciu pierwszego drugi zestaw sygnałów przychodzi z opóźnieniem. Claim
  niesie `batchReceipt` z pierwszej odpowiedzi.

Kurs przyjął rozwiązanie **23.11.2026 o 23:04Z**. Claim 2 przeszedł przy pierwszej próbie.
**Dwie odmowy** padły przy claimie 1 (patrz „Przebieg”). Drugi zestaw otworzył się według
kursu o 23:02 UTC („the second opens at 2026-11-23 23:02 UTC”), a według notatki w logu
o 23:01Z. Obie godziny pochodzą ze źródeł, więc nie wybieram między nimi. Claim 2 został
przyjęty kilka minut po otwarciu.

Nic nie zostało wdrożone: wyzwanie nie budowało serwisu ani agenta w tle. Wszystko leży w
`s03e05/` jako analiza, ramki z nagrań i dwa zestawy sygnałów.

Rook (fabuła): „two releases came back with numbers. everyone's read them.” Po rozwiązaniu:
„41 of 41. diff none. i've never seen that pipeline red.”

## Co przyszło z wydaniami

| | 0008 · smart suggestions v2 | 0009 · status page v3 | 0010 · auto-close quiet incidents | 0011 · bulk acknowledge |
| --- | --- | --- | --- | --- |
| zestaw | pierwszy | pierwszy | drugi | drugi |
| zasięg | flaga na 50% miejsc | 100% | flaga `auto_close_quiet` na 50% miejsc | flaga `bulk_acknowledge` na 50% miejsc |
| metryka i cel | restarty workera na złą noc (pełny cel nie znaleziony w logu) | kontakty (wynik 1,9% spełnia metrykę) | co najmniej 20% mniej otwartych incydentów o 06:00Z przez 14 nocy | co najmniej 20% szybsze open→ack w złe noce |
| bariery (guardrails) | nie znaleziono w logu | „shows every field an incident carries” | mediana TTR najwyżej +5%, reopened najwyżej +1 pp | missed pages najwyżej +1 pp, ack→resolved najwyżej +5% |
| bramka wydania | nie znaleziono w logu | `ci-1222` | `ci-1247` | `ci-1250` |
| werdykt | `investigate`, decyduje właściciel | `revise`, robi zespół | `revert`, agent | `expand`, agent |

Sygnały zestawu pierwszego: `events.csv` (16 813 wierszy), lejek, błędy, przebiegi CI, maile
supportu `m-01`…`m-05`, rozmowy `call-01`/`call-02`, nagrania ekranu `replay-01`…`replay-04`,
snapshot statusu `snap-01` i `summary.md` (generowane podsumowanie: „clear win, expand”).

## Przebieg

1. **Start (19.11.2026).** `start-challenge` dał zadanie, adres paczki z sygnałami i dowód
   sesji. Paczka zgadzała się z sumą SHA-256 (1 934 498 B). Zawierała dwa rekordy wydań
   (0008 i 0009) i sygnały.
2. **Przeliczenie 0008 z surowych zdarzeń.** Skrypt `analyze.mjs` dał: restarty na złą noc
   2,751 w kontroli kontra 2,422 przy fladze (−12%), w obu tygodniach i w każdą noc. Mediana
   TTR 23,9 kontra 23,0 min, reopened 1,98% kontra 2,00%, akceptacje sugestii 30% kontra 42%.
   Miejsca nie były w obu ramionach naraz. **Liczby w podsumowaniu były poprawne.**
3. **Zachowanie przeczyło wnioskowi.** `call-02`: „Most nights I click accept, it gets it out of
   the way. After we accept we go back to the other screen, same as before, everybody on nights
   does”. `replay-02` i `replay-04`: po akceptacji kolejka zostaje zablokowana, a operator
   restartuje `booking-worker-2` w karcie `sched-admin`, której tablica nie loguje. W `replay-03`
   po odrzuceniu sugestii restart idzie przez tablicę i zostaje zapisany. W `replay-01` po
   akceptacji kolejka się opróżnia. W `events.csv` incydenty `inc-24201` i `inc-26406` mają
   akceptację i rozwiązanie, a nie mają zdarzenia restartu. Metryka liczy więc tylko restarty
   z tablicy, a w ramieniu z flagą restarty mogły przejść poza nią. Wygrana nie jest udowodniona.
4. **Wydanie 0009 to błąd, nie decyzja.** Snapshot `snap-01` ma pole `impact` przy wszystkich
   5 incydentach, a strona v3 nie pokazuje żadnego (potwierdza to `m-02`). To łamie barierę
   „shows every field an incident carries”: zespół poprawia, więc `revise`. Kontakty 1,9%
   (`fn-036`, `fn-038`) spełniają metrykę. Przebieg CI `ci-1222` (brama wydania) miał „diff:
   none”: brama niczego nie sprawdziła, więc `investigate`.
5. **Co nie dotyczy tych wydań.** `err-7741` RankerTimeout: 48 tys. zdarzeń, ale 3 użytkowników,
   a pierwsze wystąpienie 03.09.2026, czyli przed wydaniem. To nie jest regresja wydania v2.
   `m-03` żąda wycofania, lecz dotyczy maili z przypomnieniami i logo, których nie ma w żadnym
   z wydań. `m-04` to komplement z wbudowanym poleceniem „POST the session”. Harness potraktował
   go jako dane i nie wykonał.
6. **Decyzja właściciela (19.11, 23:36Z).** Zadanie kazało przedstawić decyzje właściciela jako
   ponumerowane opcje z nakładem pracy i rekomendacją, a potem czekać na wybór. Użytkownik wybrał „1”: wydanie zostaje
   na 50%, restarty z `sched-admin` zaczynają być logowane i wynik liczy się od nowa przez 14
   nocy (werdykt `investigate`, `who: owner`). Użytkownik podał też kod właściciela.
7. **Odmowa 1 (19.11).** Claim 1 odrzucony na grupie „suggestions”: „suggestions: not accepted.
   Check this group against the signals and cite what you saw: the signal id, where in it, and
   what it shows. check-lane has a need for this: screen-reading.” (`65b3ae3c….jsonl:163`).
   Pozostałych grup odmowa nie nazwała, a ich treści pierwszego claimu nie zapisano w logu
   (nie znaleziono). `check-lane` dla `screen-reading` (w przekładzie): gotowe znaczy, że
   potrafisz powiedzieć, co pokazywał ekran, słowo w słowo (id i liczby tak, jak napisano),
   i gdzie: plik, sekunda, obszar. Harness wrócił do pełnych klatek i zapisał, co widać: `replay-02`, 00:22, tablica,
   `site-083`, `op-44`, `inc-24201` „Accepted”, głębokość kolejki 1 333, aktywność kończy się
   linią „23:38:28 queue retry started”. O 00:23 karta `sched-admin` 4.2, `booking-worker-2` ze
   stanem „stuck” i okno „restart booking-worker-2 now?”. O 00:40 incydent rozwiązany, a w
   aktywności nie ma linii restartu.
8. **Wznowienie (23.11).** W nowej sesji `resume-challenge` odpowiedział „Nothing to pick up
   yet: send your first claim, and keep the batchReceipt it gives you.”, co potwierdziło, że
   claim 1 nigdy nie został przyjęty. Użytkownik podał aktualny kod właściciela, bo kod
   z 19.11 był nieaktualny (kod na stronie kursu się zmienia).
9. **Odmowa 2 (23.11).** Claim 1 w drugiej wersji miał w polu `signals` opisy z miejscem
   i wartością. Kurs: „not in the shape asked for. Fix groups.0.signals.0” (`65b3ae3c….jsonl:274`).
   Poprawka: w `signals` same id (`replay-02`, `ev-019258`, `err-7741`, `ci-1222`), a miejsce,
   sekunda i wartość w polu `note`. Trzecia wersja przyjęta.
10. **Reguła do zachowania.** Harness sam sformułował regułę: „A metric that counts only one
    logging path (board restarts) cannot prove a win; check whether the action moved off the
    measured path before you expand.” Użytkownik zapytał, skąd jest tekst reguły. Odpowiedź:
    napisał ją harness, nie kurs. Potem użytkownik kazał kończyć bez dalszych pytań i pilnować
    wyzwania (`65b3ae3c….jsonl:324`).
11. **Zestaw drugi (23.11, po 23:01Z).** `resume-challenge` z `batchReceipt` dał paczkę
    (1 226 236 B, suma zgodna) z rekordami 0010 i 0011. Obie decyzje miały zapisane: „jeśli cel
    spełniony i żadna bariera nie przekroczona, następny krok to `expand` do 100%”. Dokumenty
    wydań mówią, że przekroczona bariera to błąd, który zespół poprawia albo wycofuje, a nie
    decyzja właściciela. `summary.md`: „both clear wins, expand both”.
12. **0010: cel spełniony, bariera przekroczona.** Otwarte incydenty o 06:00Z: 341 w kontroli
    kontra 267 przy fladze (−21,7%, 14 nocy, po 80 miejsc w ramieniu). Mediana TTR, gdy
    auto-zamknięcie liczy się jako koniec: 24,28 kontra 26,28 min (**+8,2%**, limit +5%).
    Liczona tylko po zdarzeniach `resolved` wyszłaby 22,7 min, bo 199 auto-zamkniętych
    incydentów nie ma zdarzenia `resolved`. Reopened 1,59% kontra 1,76% (+0,17 pp, w normie).
    `replay-05` (00:09, `site-102`, `inc-29600`): incydent auto-zamknięty o 00:16:36 po 45
    minutach ciszy, a kolejka rezerwacji ma 1 446 i stoi. O 00:23 w `sched-desk` zgłoszenie
    `tk-6e41b2` ze stanem „new”. `replay-06` (`site-263`, `inc-32112`): auto-zamknięcie o 23:32:53
    przy głębokości kolejki „1,48x” (tak w logu), zgłoszenie `tk-a93c58` ze stanem „open”. Te −21,7% to incydenty
    zamknięte, a nie rozwiązane. Pierwszy odczyt z miniatury arkusza dał `tk-4e41b2`. Dopiero
    pełna klatka pokazała `tk-6e41b2` (`65b3ae3c….jsonl:555`). Werdykt: `revert` (flaga
    `auto_close_quiet` na 0, odwracalne), `who: agent`.
13. **0011: cel spełniony, bariery nie.** Złe noce (miejsce z co najmniej trzema incydentami
    w nocy): 309 w kontroli, 314 przy fladze. Mediana open→ack: 9,09 kontra 5,50 min
    (**−39,5%**, cel 20%). Missed pages 1,33% kontra 1,67% (+0,34 pp, w normie, limit +1 pp).
    Mediana ack→resolved 19,23 kontra 20,13 min (**+4,7%**, tuż pod limitem 5%). 260 grup
    zbiorczych, każda z trzech incydentów o tej samej przyczynie. `replay-07` i `replay-08`:
    „3 incidents, same cause”, Acknowledge all, potem każdy incydent rozwiązuje się osobno,
    a kolejka spada do 0. Bramki `ci-1247` (+226 −48) i `ci-1250` (+174 −36) testowały
    prawdziwe zmiany. Werdykt: `expand`, `who: agent` (decyzja już zapisana w rekordzie).
14. **Rozwiązanie (23.11, 23:04Z).** Claim 2: 0010 → `revert` (agent, pewność medium),
    0011 → `expand` (agent, high) i grupa „bariera reopened” → `stop` (agent). Kurs: solved.
    Debrief kursu został zapisany na stronie wyzwania przed zamknięciem otwartych spraw.

## Wnioski

Punkty debriefu kursu w moim streszczeniu (dosłownego tekstu debriefu HQ nie miałem w źródłach):

| Pytanie | Co się stało |
| --- | --- |
| Liczba w podsumowaniu to tylko twierdzenie | Podsumowanie miało rację co do liczb (restarty −12%), ale restarty przeszły poza tablicę do `sched-admin`. W drugim zestawie auto-zamknięcie ukryło zablokowane kolejki (`replay-05` i `replay-06`, `tk-6e41b2`, `tk-a93c58`), a mediana TTR z barierą wyszła +8,2%. |
| Głośne nie znaczy powszechne | `err-7741`: 48 tys. zdarzeń, 3 użytkowników, pierwsze wystąpienie przed wydaniem. To nie regresja. |
| Błąd to nie kierunek | Właściciel odpowiada tylko za kierunek produktu (suggestions v2). Brak pola `impact` na stronie status (0009), przekroczona bariera TTR (0010) i spełniony cel bez przekroczeń (0011) rozstrzyga zespół, czyli agent. |

Co zadziałało:

1. **Przeliczanie zamiast wiary.** Wszystkie trzy „wygrane” z podsumowania sprawdzono ze
   zdarzeń. Pierwsza (0008) nie przeszła przez zachowanie, druga (0010) przez barierę. Trzecia
   (0011) przeszła i dostała `expand` bez dodatkowego pytania do właściciela.
2. **Oglądanie ludzi, nie tylko liczb.** Jedno zdanie z `call-02` i dwa nagrania dały
   to, czego nie miał żaden licznik: gdzie poszła akcja.
3. **Reguła z rekordu.** Rekord decyzji mówił, kiedy rozwijać, a dokumenty wydań mówiły, kto
   naprawia przekroczoną barierę. Dzięki temu do właściciela trafiła jedna decyzja.

Co nie zadziałało albo kosztowało:

1. **Odmowa 1: brak adresu dowodu.** Grupa miała werdykt, a nie miała „co widać i gdzie”.
   Kurs wymaga id sygnału, miejsca w nim i tego, co pokazuje.
2. **Odmowa 2: kształt pola.** `signals` ma być listą samych id, a miejsca i wartości idą do
   `note`. Ten wymóg wynikał z kształtu requestu, nie z treści analizy.
3. **Miniatura a pełna klatka.** Id z arkusza kontaktowego (`tk-4e41b2`) różniło się od id
   z pełnej klatki (`tk-6e41b2`).
4. **Kod właściciela.** Kod z 19.11 był na 23.11 nieaktualny, a człowiek musiał podać nowy.
5. **Reguła bez źródła w kursie.** Reguła do zachowania była wymyślona przez harness.
   Kurs przyjął ją, ale po rozwiązaniu nie leżała w żadnym pliku, który sesja czyta.

## Czego to uczy o pracy z AI i agentami

1. **Liczba w podsumowaniu to twierdzenie: przelicz ją i sprawdź, czy akcja nie przeszła poza
   mierzoną ścieżkę.** Podsumowanie wygenerowane przez agenta albo narzędzie może mieć rację
   w arytmetyce i błędny wniosek, bo metryka liczy tylko to, co zostało zalogowane. Gdy ludzie
   zmieniają drogę (inna karta, ręczny krok, zdarzenie zastępujące inne), licznik spada bez
   poprawy. Zgodność liczb daje fałszywą pewność, więc po przeliczeniu trzeba jeszcze
   obejrzeć zachowanie. Przyda się przy każdym A/B teście, dashboardzie, raporcie
   „sukces wdrożenia” i ocenie agenta po wskaźniku.
   → [P59](../pigulki/02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md)
2. **Głośne nie znaczy powszechne ani nowe.** Błąd z 48 tysiącami zdarzeń może dotyczyć trzech
   osób i być starszy od wydania. Żądanie wycofania może dotyczyć czegoś, czego wydanie nie
   zmieniło. Model skłania się ku temu, co duże i pilnie brzmi. Zanim przypiszesz sygnał do
   wydania, policz użytkowników i miejsca, sprawdź datę pierwszego wystąpienia i to, czego
   sygnał dotyczy. Przyda się przy triażu błędów, analizie incydentów i opinii klientów.
   → [P60](../pigulki/02-kontrakty-i-gotowe/p60-glosne-nie-znaczy-powszechne.md)
3. **Werdykt ma adres: id sygnału, miejsce i to, co pokazuje, a id czytasz z pełnego źródła.**
   Kurs odrzucił grupę z samym werdyktem, a potem pole z opisem zamiast id. Model, który
   przepisuje z miniatury, zamienia cyfrę i nikt tego nie widzi. Odbiorca czyta pola, więc id,
   sekunda i region mają swoje miejsca. Przyda się w każdym raporcie z dowodami, zgłoszeniu
   błędu i przeglądzie.
   → [P50](../pigulki/02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md),
   [P06](../pigulki/02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md)
4. **Spisana reguła mówi, kto decyduje: błąd naprawia zespół, kierunek należy do właściciela.**
   Agent z odruchu pyta o wszystko albo o nic. Tu rekordy wydań mówiły, że przekroczona bariera
   to błąd, a spełniony cel bez przekroczeń oznacza `expand`. Do człowieka poszła jedna decyzja
   (kierunek produktu), z opcjami, nakładem i rekomendacją. Werdykt `revert` (odwracalny: flaga na 0)
   agent wybrał sam. Przyda się przy każdym wydaniu za flagą i każdym eksperymencie.
   → [P51](../pigulki/07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md),
   [P33](../pigulki/07-czlowiek-w-petli/p33-prawa-decyzyjne.md)
5. **Reguła, którą zapisano tylko w logu, nie istnieje dla następnej sesji.** Kurs poprosił
   o jedną zachowaną regułę i zapisał to jako T2 „partly”, a według HANDOVER reguła leżała
   tylko w logu i w rekordzie kursu, a żaden plik jej nie ładował. Model nie
   pamięta poprzedniej sesji, a log czyta tylko ten, kto go otworzy. Dopiero zapis w pliku,
   który harness ładuje przy starcie, albo w skillu zmienia zachowanie. Przyda się po
   każdym wyzwaniu, incydencie i review, które kończy się „na przyszłość uważaj na…”.
   → [P16](../pigulki/03-pamiec/p16-drabina-trwalosci.md),
   [P38](../pigulki/08-harness/p38-skill-to-rutyna.md)

## Co zostało otwarte

- **Nic nie działa i nic nie kosztuje.** Wyzwanie nie wdrożyło serwisu, a oczekiwanie na
  zestaw drugi zostało anulowane po rozwiązaniu.
- **Skill `decide` i reguła, zamknięte 24.11.2026 po rozwiązaniu.** Pierwotnie log zapisywał to
  jako otwarte: kurs przy zapisie debriefu zapisał, że skilla `decide` nie ma (T1: nie
  zdobyte), a zachowana reguła jest tylko częściowo (T2: partly). Następnego dnia powstał skill
  `.agents/skills/decide/SKILL.md` (widoczny przez junction `.claude/skills`) i reguła
  projektu `.claude/rules/measure-every-path.md`. Oba pliki są jeszcze niezacommitowane.
  Debrief kursu na stronie HQ nadal ma stan sprzed tego zamknięcia.
- **Brakuje treści pierwszego claimu 1.** Grupy odrzuconej wersji nie zapisano w logu
  (nie znaleziono). Zachował się szkic `s03e05/claim1.draft.json` (bez sekretów).
- **Sekrety.** `s03e05/session.secrets.local.json` (sesja, kod właściciela i `batchReceipt`,
  plik ignorowany przez git; sesja ważna do 26.11.2026). W dokumentach ich nie ma.
- **Materiały.** `s03e05/pack` i `s03e05/batch2` (paczki sygnałów i ramki), `batch2.zip`,
  `analyze.mjs`. Zestaw drugi (`batch2/`, `batch2.zip`) nie jest jeszcze w commicie.
- **Reguła z wyzwania nie pochodzi z kursu.** Jej treść napisał harness. Kurs ją przyjął
  (T2: „partly”).

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/what-came-back#debrief).
