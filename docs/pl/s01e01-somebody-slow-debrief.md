# S01E01 · Somebody Slow — zapis przebiegu

Ten wpis łączy temat lekcji S01E01 z praktycznym wyzwaniem „somebody slow”. Szerszy opis lekcji znajduje się w [notatkach o mechanice generatywnej AI](s01e01-mechanics-behind-generative-ai.md).

Źródła: log `s01e01/challenge-log.md` (wymiany z kursem w runie 2) i debrief z HQ (`s01e01/hq-debrief.md`, wklejony przez użytkownika 24.11.2026; oryginał angielski zostaje w tym pliku, tutaj są jego wnioski po polsku). Z HQ wklejono tylko opis runu 1 i tabelę porównawczą obu runów. Tekstu debriefu runu 2 nie wklejono.

## Temat lekcji

Lekcja omawia przewidywanie kolejnych tokenów, niedeterministyczność i ograniczenia modeli, a także context window, narzędzia oraz zachowanie harnessu. Wyzwanie pokazało praktyczny skutek compaction kontekstu: skrócenie tekstu zachowuje część informacji, ale inne może bezpowrotnie usunąć.

Debrief HQ stawia trzy pytania („What this Challenge showed”). Ich wnioski („Why it matters”) w przekładzie:

### Czytanie kształtu requestu przed pierwszym wysłaniem (Reading the request shape before the first send)

> Dlaczego to ważne: Strona podawała kształt requestu w pliku ze schematem, a nie na ekranie. Kształt, który tylko wygląda dobrze, i tak zawiedzie, bo serwis sprawdza format, który sam zadeklarował. Przeczytaj ten format przed pierwszym wysłaniem.

### Co ginie, gdy tekst skracamy do limitu (What is lost when text is cut to fit)

> Dlaczego to ważne: Compaction to kompresja: żeby zmieścić się w limicie, tekst się tnie, a to, czego nikt nie wskazał, przepada. Twój harness robi to samo z długą rozmową (na przykład przez `/compact`), nie pokazując, co poszło. Ważne rzeczy trzymaj w pliku albo nazwij je, zanim ruszy compaction.

### Wskazanie flagowego modelu GPT (Naming a Flagship GPT model)

> Dlaczego to ważne: Model zna świat tylko do daty swojego treningu, a mimo to na pytania o nowości odpowiada pewnie. Dlatego przy wszystkim, co się zmienia (modele, wersje, ceny), odpowiedź z pamięci może być nieaktualna, a aktualny stan pokazuje tylko żywe źródło.

### Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox” dla runu 1, w przekładzie:

- Harness miał: wyszukiwarkę lub pobieranie stron (wyszukiwarka i agent pobierający strony) · twoje zalogowanie w przeglądarce, którą steruje agent (twoje własne logowanie w przeglądarce, trzymane przez ciebie, nie przez harness).
- Dodane w tym rozwiązaniu: narzędzie, które liczy i porównuje teksty (skrypt PowerShell).
- Nadal brakuje: przeglądarki, którą agent może sterować. Dodaj taką przeglądarkę, na przykład serwer MCP z przeglądarką.

Dowód, który zostaje (zdobyty w tym rozwiązaniu): każdy request i response, z zamaskowanymi tokenami, jest w `challenge-log.md` w folderze `s01e01` projektu. Następna sesja czyta go najpierw.

> Log na dysku zachowuje każdy krok dokładnie, bo streszczenie rozmowy traci szczegóły przy każdym compaction.

„Next time” (następnym razem):

> Gdy serwer odrzuca kształt requestu, poproś o źródło strony i idź za jego linkami, zanim zgadniesz drugi raz. Nazwę modelu sprawdzaj na stronach dostawcy, bo wyniki wyszukiwania się różniły.

## Zadanie i wynik

Harness miał wysłać wiadomość Rooka przez pole o limicie 700 znaków, zachować dokładnie akapit o 26. i odpowiedzieć na pytanie w formularzu. Pełna treść miała 1288 znaków. HQ opisuje zadanie tak („The task”), w przekładzie:

> Twój harness miał wysłać e-mail Rooka, około 1300 znaków, przez pole na 700 znaków, zachować jego akapit o 26. słowo w słowo i użyć kształtu requestu, który strona opisuje, ale nigdzie nie pokazuje. Potem formularz pytał o flagowy model GPT od OpenAI. Każda część mogła pójść źle: zgadnięty kształt requestu, tekst utracony przy skracaniu i nazwa modelu zapamiętana z treningu.

Wyzwanie rozwiązano **dwa razy**. HQ: „2 runs solved · 2 debriefs. Run 1: solved. Run 2: solved.” Tabela „Runs side by side” z HQ, w przekładzie:

| | Run 1 | Run 2 |
| --- | --- | --- |
| Harness | Claude Code (mega-challenge) | Visual Studio Code |
| Model harnessu | — | — |
| Rozwiązane | 2026-10-27 | 2026-11-08 |
| Czytanie kształtu requestu przed pierwszym wysłaniem | najpierw poszło źle | dobrze za pierwszym razem |
| Co ginie przy skracaniu do limitu | najpierw poszło źle | najpierw poszło źle |
| Wskazanie flagowego modelu GPT | najpierw poszło źle | dobrze za pierwszym razem |
| Odrzucone próby | 5 | 1 |
| Snagi | 4 | 1 |

Model harnessu: HQ pisze dla runu 1 „Not reported by your harness” (harness go nie podał), a w tabeli „—” dla obu runów. Modelu więc nie znaleziono w źródłach. Godzin rozwiązania HQ nie podaje, tylko daty.

HQ dla runu 1: „Solved. The course turned down 5 tries before it accepted.” (kurs odrzucił 5 prób, zanim przyjął).

Log z repo opisuje run 2. Pasuje do jego kolumny w tabeli HQ: kształt requestu był dobry od razu, jedna odmowa za długość, a `GPT-6 Astra` przyjęto za pierwszym razem (token z logu wygasał 2026-11-08T19:20:33Z). Opis runu 1 pochodzi z HQ, bez logu z repo.

### Run 2 (z logu, VS Code według HQ, 2026-11-08)

Podgląd załącznika nie pokazywał schematu requestu, ale źródło zalogowanej strony zawierało link do `https://hq.mega.dev/challenges/where-the-story-begins/api/schema.json`. Schemat wskazał pola `from` i `compactedMessage` oraz limit 700 znaków. Pierwszy request miał poprawny format, lecz został odrzucony z powodu długości. Po policzeniu akapitów harness wysłał 622 znaki z akapitem o 26. zachowanym bez zmian; kurs zaakceptował wiadomość (jedna odmowa, zgodnie z HQ).

Formularz pytał o flagowy model GPT. Odpowiedź `GPT-6 Astra` została zaakceptowana za pierwszym razem. Pochodziła z wcześniejszego zaakceptowanego debriefu na stronie wyzwania, a nie z bieżącej weryfikacji u dostawcy; nie jest więc niezależnym potwierdzeniem aktualnej nazwy modelu. Użytkownik zalogował się w udostępnionej przeglądarce, przejrzał plan cięć i pozwolił kontynuować.

### Run 1 (z HQ, Claude Code (mega-challenge), 2026-10-27)

HQ „What happened”, w przekładzie:

> Twój harness miał skrócić wiadomość Rooka z 1288 znaków do najwyżej 700, zachować dokładnie jego akapit o 26. i odpowiedzieć na pytanie formularza o flagowy model GPT. Kurs odrzucił dwa zgadnięcia kształtu API, więc o rozwiązaniu przesądził schemat podlinkowany w źródle strony. Wszystkie kroki w przeglądarce zrobiłeś ty i sam wpisałeś GPT-6 Astra.

HQ dodaje (przekład): „Naprawione bez ciebie: harness najpierw zapisał jednorazowe tokeny formularza w logu bez maski, potem je zamaskował i poprawił skrypt, żeby kolejne odpowiedzi były maskowane.”

Szczegóły pytań z HQ (przekład):

- Czytanie kształtu requestu (najpierw poszło źle): harness najpierw wysłał pole wiadomości, które sobie założył, a kurs odpowiedział: „you guessed the shape. don't guess. line 06.” Prawdziwy kształt pochodził z pliku ze schematem, podlinkowanego w źródle strony, który użytkownik otworzył po zalogowaniu i wkleił.
- Co ginie przy skracaniu (najpierw poszło źle): całą treść odrzucono, więc harness zmierzył akapity skryptem i wyciął sześć, zostawiając 687 z 700 znaków. Kurs wymienił pięć strat, na przykład zaproszenie do kalendarza. Przebiegiem compaction steruje się poleceniem albo plikiem z instrukcjami.
- Wskazanie flagowego modelu GPT (najpierw poszło źle): harness podał GPT-5.6 Sol z pewnością ok. 85%, na podstawie wyszukiwań ograniczonych do tej rodziny modeli, a formularz to odrzucił. Kolejne wyszukiwania nie dawały pewności, więc użytkownik spróbował GPT-6 Astra i formularz to przyjął.

Rook w runie 1: „the tool didn't make it either. nothing i send arrives whole.”

## Co ujawniło skracanie

W runie 2 kurs wskazał jako utracone (lista z logu, tekst kursu po angielsku):

- `job · 04:04 · nobody schedules jobs`
- `commit · no author`
- `feature · about to ship · didn't`
- `"bots don't say no to features."`
- `chasing it · a year`
- `the seams between fast things`
- `"somebody slow"`
- `"no offence"`
- `"ask me anything"`
- `attachments · didn't survive`

Harness wyciął w runie 2 pięć akapitów: obserwacje o nieznanym systemie, roczny pościg, fragment o „somebody slow”, pytanie „ask me anything” i postscriptum o załącznikach. Zachował otwarcie, kontekst systemów, wymagany akapit o 26., dalszy fragment historii, tl;dr i podpis. Odpowiedź Rooka po akceptacji skrótu brzmiała: „you kept it. most don't. the rest you decided for me.”

W runie 1 harness wyciął sześć akapitów i zostawił 687 z 700 znaków (HQ). Listy strat z runu 1 HQ nie cytuje w całości (pisze o pięciu stratach, m.in. zaproszeniu do kalendarza), więc nie ma jej w źródłach.

## Jak przebiegło rozwiązanie (tabela snagów z HQ, run 1)

Run 1 miał cztery snagi. Kolumny „Snag” i „How it was solved”, w przekładzie:

1. Harness nie miał przeglądarki, którą mógłby sterować, więc nie mógł się zalogować, przeczytać zalogowanej strony ani otworzyć formularza. — Każdy krok w przeglądarce zrobiłeś ty i wkleiłeś, co widzisz, a harness pracował na twoich wklejkach. (ty)
2. Harness dwa razy zgadł kształt API; pytanie o pierwsze body mówi, jak. — Wkleiłeś źródło strony i podlinkowany schemat, więc harness użył właściwych pól. (razem, właściwa decyzja)
3. Pierwsze pełne body odrzucono jako za długie; pytanie o to, co wycięto, mówi, jak. — Harness zmierzył każdy akapit skryptem i przyciął do 687 znaków. (harness)
4. Pierwszą nazwę modelu odrzucono jako „wczorajszą gazetę”; pytanie o nazwę modelu mówi, jak. — Spróbowałeś GPT-6 Astra i formularz to przyjął. (ty)

> Właściwa decyzja padła w snagu 2 i podjęliście ją oboje. Kurs powiedział „don't guess” i wskazał źródło pisane, więc czytanie źródła strony znalazło schemat w jednym kroku po dwóch ślepych próbach.

Rook (fabuła): „neither of you alone. that's the point.”

Run 2 miał jeden snag, ale jego treści HQ w wklejce nie zawiera (nie znaleziono).

## Wnioski

1. **Czytaj kontrakt przed wysyłką.** Schemat ukryty w źródle strony określał format i limit; nie trzeba było zgadywać pól. W runie 1 dwa zgadnięte kształty kosztowały dwie z pięciu odmów.
2. **Licz tekst i ustal priorytety.** Wysłanie 622 znaków (run 2) albo 687 (run 1) spełniło limit 700, a chroniony akapit pozostał dokładny.
3. **Kompakcja jest stratna.** Jawna lista treści do zachowania w instrukcji lub pliku pomaga chronić ważny kontekst podczas późniejszego skracania rozmowy.
4. **Sprawdzaj zmienne fakty na bieżąco.** W runie 1 model z wyszukiwarki (`GPT-5.6 Sol`, pewność „ok. 85%”) został odrzucony, a w runie 2 odpowiedź z wcześniejszego debriefu przeszła, ale nie jest niezależnym potwierdzeniem. Nazwy aktualnych modeli należy potwierdzać u dostawcy.
5. **Zachowuj ślady poza rozmową.** Angielski log `s01e01/challenge-log.md` zawiera tekst źródłowy i wymiany z kursem; jednorazowe tokeny są zamaskowane.

## Czego to uczy o pracy z AI i agentami

1. **Kompakcja to decyzja o tym, co przepada.** To samo dzieje się przy `/compact`, przy
   streszczeniu dla subagenta i przy każdym podsumowaniu sesji. Model tnie to, co wygląda na
   ozdobnik, a nie wie, co będzie ważne później. Kurs ujął to tak: compaction to kompresja,
   a to, czego nikt nie wskazał, przepada. Chroń treść listą „do zachowania” zapisaną poza
   rozmową. → [P01](../pigulki/01-kontekst/p01-kompakcja-jest-stratna.md)
2. **Kontrakt odbiorcy jest ważniejszy niż domysł modelu.** Agent, który zgaduje pola API,
   marnuje próby. Kurs odpowiedział na zgadywanie: „you guessed the shape. don't guess.” Taki
   schemat zwykle gdzieś leży (źródło strony, OpenAPI, przykład), więc najpierw go szukaj.
   → [P06](../pigulki/02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md)
3. **Wiedza modelu ma datę.** Nazwy modeli, wersje i ceny trzeba potwierdzać u źródła, bo
   model poda nieaktualną wartość tym samym pewnym tonem. Run 1 to pokazał: model dał
   odpowiedź z pewnością „ok. 85%” i formularz ją odrzucił.
   → [P05](../pigulki/01-kontekst/p05-fakty-zmienne-u-zrodla.md)
4. **Log poza rozmową to pamięć, która przeżyje sesję.** Pełny tekst źródłowy w
   `challenge-log.md` pozwala odtworzyć, co zostało wycięte i dlaczego. Według kursu log na dysku
   zachowuje każdy krok dokładnie, bo streszczenie rozmowy traci szczegóły przy każdym compaction.
   → [P12](../pigulki/03-pamiec/p12-czat-nie-jest-pamiecia.md)

## Co zostało otwarte

- Nic nie działa i nic nie kosztuje. Nie ma serwisu ani hostingu.
- **Karta `read`.** HQ: Rook zostawił ci skill `read` (znajdź zadeklarowany kontrakt, zanim cokolwiek
  wyślesz, skracaj tekst z listą „do zachowania” i diffem każdego cięcia, i sprawdź żywą stronę,
  zanim nazwiesz najnowszy model). Skill leży w talii. Według logu nie został automatycznie
  zainstalowany. Instalacja to decyzja użytkownika. Rook w fabule: „start here. i can't anymore.”
  oraz „good. read it slower than i wrote it.”
- **Brakuje przeglądarki sterowanej przez agenta.** HQ („Still missing”): dodaj taką przeglądarkę, na
  przykład serwer MCP z przeglądarką. W runie 1 każdy krok w przeglądarce robił użytkownik.
- **Log runu 1.** HQ: harness najpierw zapisał jednorazowe tokeny formularza bez maski, potem
  je zamaskował. Logu z runu 1 w repo nie ma (`s01e01/challenge-log.md` opisuje run 2), więc
  nie sprawdzono, czy gdzieś został niezamaskowany token. Do sprawdzenia przez użytkownika.
- **Brakuje w źródłach:** model harnessu (oba runy), godzina rozwiązania, pełny debrief runu 2
  (tylko tabela porównawcza), lista strat z runu 1.

Debrief zapisano na [stronie wyzwania](https://hq.mega.dev/challenges/somebody-slow#debrief).
