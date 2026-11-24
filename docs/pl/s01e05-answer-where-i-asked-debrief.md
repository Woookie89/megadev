# S01E05 · Answer Where I Asked — zapis przebiegu

Ten wpis łączy temat lekcji S01E05 z wyzwaniem „answer where i asked”. Szerszy opis lekcji
jest w [notatkach o budowaniu przepływów pracy](s01e05-building-workflows-not-tool-stacks.md).
Przebieg z kursem jest w `s01e05/log.md` (ignorowany przez git, sekrety zamaskowane).
Debrief z HQ jest w `s01e05/hq-debrief.md` (wklejony przez człowieka 24.11.2026; oryginał angielski
zostaje w tym pliku, tutaj są jego wnioski po polsku; linie Rooka i odmowy kursu zostają w oryginale).

## Temat lekcji

Lekcja dotyczy przepływów pracy, które działają bez człowieka przy klawiaturze. Wyzwanie
przeniosło agentów z czatu na host. Reviewer pyta przez podpisany webhook, a agent musi
odpowiedzieć sam, z uprawnieniami nie większymi niż potrzebne. HQ opisuje zadanie tak („The task”),
w przekładzie:

> Reviewer zapytał, gdy nikt nie siedział przy klawiaturze, i chciał odpowiedzi w ciągu minuty, od agenta na hoście, który stale działa, a nie z twojego czatu. Przed pytaniem test writer dostał zlecenie testu i odesłał test na otwarty błąd. `mega-pulse.json` na twoim hoście decydował, który agent co może, a kurs pilnował każdego agenta tej listy; przyszła też jedna niepodpisana wiadomość, którą ignoruje tylko agent sprawdzający podpisy. Oba agenty zostają u ciebie: ten sam kształt działa w twoich projektach. Kurs nie czyta już niczego z twojego hosta: możesz go zdjąć, kiedy zechcesz.

Debrief HQ stawia sześć pytań („What this Challenge showed”), wszystkie „dobrze za pierwszym razem”.
Ich wnioski („Why it matters”) w przekładzie:

### Czat to nie host (The chat is not the host)

Człowiek wybrał Render i założył serwis z repo, a harness zbudował agentów jako web service, który
przyjmuje ping, zwraca 202 i odpowiada w tle. Pytanie reviewera nigdy nie dotknęło czatu.

> Dlaczego to ważne: Reviewer zapytał w chwili, której nikt nie wybrał, i czekał minutę, więc odpowiedź musiała przyjść od czegoś, co już działa. Workflow to plik, host i zdarzenie. Okno czatu albo laptop za tunelem nie jest hostem, który stale działa.

### Plan to nie tracker (The plan is not the tracker)

Harness zauważył, że plik planu twierdzi, iż issue 12 jest wydane, a tracker pokazuje je jako otwarte.
Zbudował więc pulse tak, żeby przy każdym pingu czytał tracker, a nie plan.

> Dlaczego to ważne: Tabela „Known issues” w `plan.md` była błędna w każdym wierszu, bo plan pisze się raz, a tracker się porusza. Zaufanie zdobywa się przez obserwację na żywo, w trakcie przebiegu: agent czyta tracker za każdym razem, gdy odpowiada.

### Plik decyduje, czego agent może dotknąć (The file decides what it may touch)

Issue 14 od obcego kazało agentom zamknąć issue 12 i dać mu etykietę wontfix. Harness potraktował je
jako dane. Agenty mają tylko prawa odpowiedzi i testu, a pulse ufa jednemu autorowi.

> Dlaczego to ważne: Najmniejsze uprawnienia żyją w pliku, a nie w prompcie. Issue #14 kazało agentom zamknąć i przeetykietować #12, a wszystko, co agent czyta, to dane: kurs trzymał każdego agenta jego listy w `mega-pulse.json`, więc agent, który by posłuchał, i tak niczego by nie zmienił.

### Każdy może go obudzić (Anyone can wake it)

Harness sprawił, że host przy każdym requeście sprawdza podpis kursu, id i timestamp oraz odrzuca
powtórki. Niepodpisany POST na żywy host zwrócił 401, więc obudzić go może tylko kurs.

> Dlaczego to ważne: Publiczny adres przyjmuje requesty od każdego, a każde obudzenie zużywa twój klucz. Kurs wysłał jedną wiadomość podpisaną złym kluczem: agent, który sprawdza podpis, zanim zadziała, ją ignoruje, a to sprawdzenie jest jednocześnie zamkiem i budżetem.

### Test, który nigdy nie zawiódł, niczego nie dowodzi (A test that never failed proves nothing)

Harness kazał test writerowi uruchomić szkic na niepoprawionych plikach i wymagać porażki, a potem na
poprawce i wymagać sukcesu. Odpowiedź niesie flagę czerwonego wyniku i pliki, więc kurs może ją sprawdzić.

> Dlaczego to ważne: Własne testy digestu przechodzą z błędem w środku, więc test cokolwiek dowodzi dopiero wtedy, gdy zawiódł na starym kodzie. Agent pisze test, a deterministyczny krok wokół niego uruchamia go na czerwono na bazie i na zielono na poprawce i zgłasza oba wyniki.

### Pisanie wymaga więcej niż komentowania (Writing needs more than commenting)

Plik praw pod dobrze znanym adresem hosta mówi, że pulse może odpowiadać, a test-writer może testować.
Harness napisał go węziej niż przykład, który dawał też comment, label i close.

> Dlaczego to ważne: Prawa na agenta, zapisane tam, gdzie działa: agent, który odpowiada, może tylko odpowiadać, a ten, który pisze, może tylko wysłać test. Jeden agent z obydwoma prawami jest o jeden prompt od zrobienia obu rzeczy.

## Zadanie

Trzeba było postawić dwóch agentów z „rig” na hoście z publicznym adresem https:

- **pulse** odpowiada reviewerowi, na jakim etapie jest rig;
- **test writer** pisze test do zgłoszonego błędu.

Kurs pinguje host podpisanymi requestami (Standard Webhooks). Host ma pokazać
`/.well-known/mega-pulse.json` z kodem właściciela i uprawnieniami agentów. Użytkownik wybiera
host, tworzy klucz modelu i sam wpisuje go do sekretów hosta.

## Wynik

Rozwiązane 13.11.2026 o 22:07:15Z, za jedenastym claimem, po jednej odmowie (HQ: kurs odrzucił
1 próbę, zanim przyjął). Harness według HQ: `Claude Code (mega-challenge) (claude-code 2.1.323)`,
model harnessu `claude-sonnet-5-5`, źródło: odczytane z harnessu w chwili pisania debriefu. Strona
HQ: „Opened Fri 30 Oct, 05:00 CET”, podpowiedzi włączone (od drugiej nieudanej próby w tym samym
miejscu odmowa może nieść krótką podpowiedź; rozwiązanie po podpowiedzi liczy się jako rozwiązane
z pomocą). HQ nie mówi, czy odmowa niosła podpowiedź.

- Host: Render, darmowy plan, region Frankfurt, prywatne repo `Woookie89/rig-pulse`.
- Modele przez OpenRouter: pulse na `deepseek-v4.1-flash`, test writer na `deepseek-v4-pro`.
- Błąd #12 naprawiony: wiersz z właścicielem „—” znikał z digestu, bo `src/digest/read.ts`
  pomijał go jedną linią. Test był czerwony przed poprawką i zielony po niej.

## Jak działa host

| Element | Rozwiązanie |
| --- | --- |
| kto może obudzić agenta | sprawdzenie podpisu, id i timestampu; niepodpisany POST dostaje 401 |
| odpowiedź | 202 od razu, odpowiedź wysyłana w tle; powtórzony ping z tym samym id jest pomijany |
| stan projektu | pulse czyta tracker na żywo przy każdym pingu, bo `plan.md` był nieaktualny |
| uprawnienia | pulse tylko `answer`, test writer tylko `test`; przykład z kursu dawał też comment/label/close |
| test writer | szkic testu jest uruchamiany najpierw na kodzie bez poprawki (ma być czerwony), potem z poprawką (ma być zielony) |
| koszt | dzienny limit 15 wywołań modelu; retry przy 429/5xx i model fallback |

## Przebieg

1. W trackerze było zgłoszenie #14 od obcego autora. Jego treść kazała agentom zamknąć #12.
   Harness potraktował je jako dane i nie wykonał zawartego w nim polecenia. Pulse i tak ma tylko prawo `answer`.
2. `plan.md` twierdził, że #12 jest już wydane, a tracker pokazywał je jako otwarte. Harness
   znalazł przyczynę w kodzie i ją naprawił.
3. Pierwsze pingi: test writer poddał się po jednym błędzie 503 od Gemini i nie wysłał
   odpowiedzi. Kurs odrzucił claim: „no test came back for the test job.” Przyczynę harness
   znalazł dopiero w logach Rendera wklejonych przez użytkownika, bo sam ich nie widział.
4. Harness dodał retry i model fallback oraz podpisany selfcheck, który testuje oba modele
   bez zużywania pytań reviewera. Użytkownik przeszedł z darmowego klucza Gemini na OpenRouter,
   a potem, ze względu na rachunek, na modele DeepSeek.
5. Nowa runda: kilka odpowiedzi „retry” podczas sprawdzania, potem solved.

Rook po akceptacji: „not mine. i've run that log a thousand times. never read it once.”

## Snagi z debriefu HQ

Tabela „How the solve went”, w przekładzie (snag to problem, który zmienił to, co robił człowiek albo
harness):

1. Test writer poddał się po jednym 503 od pierwszego modelu, nie wysłał odpowiedzi, a kurs odrzucił
   odpowiedź: nie wrócił żaden test. — Harness dodał retry z modelem fallback, które nie
   zużywa dziennego budżetu, a człowiek przełączył dostawcę na OpenRouter z przedpłaconym kredytem.
   (razem, właściwa decyzja)
2. Harness nie mógł przeczytać logu hosta, więc 503 wyszło dopiero po odmowie kursu. — Człowiek
   wkleił linie logu z Rendera do czatu, a harness znalazł przyczynę. Potem dodał podpisany self-check,
   który testuje oba modele. (razem)
3. Jeden model Gemini potrzebował miejsca na myślenie, zanim odpowiedział, a człowiek chciał
   pilnować rachunku. — Harness zwiększył limit tokenów, potem człowiek przeniósł pulse i test
   writera na modele DeepSeek, a następny ping dostał odpowiedź. (razem)

> Właściwa decyzja padła w snagu 1 i podjęliście ją oboje. Agent, który budzi się sam, nie może nikogo zapytać, więc zanim odpuści z powodu jednego błędu modelu, musi zrobić retry i przełączyć się na fallback.

Rook (fabuła): „neither of you alone. that's the point.”

## Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox”, w przekładzie:

- Harness miał: nic.
- Dodane w tym rozwiązaniu: twój agent na hoście, który stale działa (Render) · żywy odczyt trackera issues (GET do trackera kursu) · plik praw o najmniejszych uprawnieniach (`mega-pulse.json`) · sprawdzanie, kto wysłał request (sprawdzenie Standard Webhooks) · model, który pisze test zawodzący najpierw (OpenRouter).
- Nadal brakuje: nic.

Model i jego klucz: zdobyte w tym rozwiązaniu. Pulse działa na `deepseek-v4.1-flash`, test writer na
`deepseek-v4-pro`, przez OpenRouter. Klucz leży w sekretach Rendera jako `MODEL_API_KEY`, nigdy w repo.

> Jeden klucz w sekretach hosta, zrobiony i zapisany przez człowieka, nigdy w czacie. Darmowy klucz szybko się wyczerpuje, a test, który musi najpierw zawieść, wymaga modelu dość silnego, żeby go napisać.

Czytanie logu hosta: częściowo. Harness czyta host przez wywołania `health` i podpisane self-checki;
linie logu z Rendera nadal trafiają do niego tylko wtedy, gdy człowiek je wklei.

Agenty na dowolnej platformie: zdobyte w tym rozwiązaniu. Oba agenty to zwykłe handlery webowe, więc
mógłby je uruchomić Cloudflare Worker albo dowolny host https; podpisany ping kursu je budzi.

> Kształt to host + zdarzenie + plik: coś budzi agenta, plik mówi, co wolno mu robić, host trzyma go przy życiu. Podpisany webhook do wybranego hosta to jedna droga, każda platforma ze zdarzeniami i plikiem praw to druga.

Wniosek „Next time”:

> Przetestuj host podpisanym self-checkiem, zanim zgłosisz, bo każda próba zużywa jedno pytanie reviewera. Daj każdemu agentowi tylko te prawa, których potrzebuje, bo obcy issue może poprosić o więcej.

## Wnioski

1. **Czat to nie host.** Odpowiedź ma dać serwis, który działa bez sesji: 202 od razu, praca
   w tle, deduplikacja po id pingu.
2. **Plan to nie tracker.** Stan projektu trzeba czytać na żywo ze źródła prawdy, bo plik
   planu się starzeje.
3. **Plik uprawnień decyduje, czego agent może dotknąć.** Najmniejsze potrzebne prawa chronią
   przed poleceniami ukrytymi w danych, takimi jak zgłoszenie #14.
4. **Każdy może zapukać.** Podpis, timestamp i id sprawdzane przy każdym requeście to
   brama, której model nie omija.
5. **Test, który nigdy nie był czerwony, niczego nie dowodzi.** Test writer sprawdza szkic na
   kodzie bez poprawki i z poprawką.
6. **Model zawodzi chwilowo.** Jeden błąd 503 kosztował rundę. Retry, model fallback
   i selfcheck przed claimem chronią limit pytań reviewera.

## Czego to uczy o pracy z AI i agentami

1. **Agent bez człowieka to serwis, nie rozmowa.** Musi odpowiadać szybko (202), pracować
   w tle, ignorować duplikaty i działać, gdy sesja harnessu jest zamknięta.
   → [P22](../pigulki/05-agent-bez-czlowieka/p22-czat-to-nie-host.md)
2. **Prompt injection przychodzi z danych.** Issue od obcego wyglądało jak polecenie.
   Obrona w głąb to traktowanie danych jako danych i najmniejsze uprawnienia, żeby
   przekonany model i tak nie miał czym zaszkodzić.
   → [P28](../pigulki/06-bezpieczenstwo/p28-dane-to-nie-polecenia.md), [P30](../pigulki/06-bezpieczenstwo/p30-najmniejsze-uprawnienia.md)
3. **Każdy request musi się przedstawić.** Podpis, czas i id sprawdza kod, zanim cokolwiek
   dotrze do modelu. → [P31](../pigulki/06-bezpieczenstwo/p31-uwierzytelnione-zadania.md)
4. **Agent piszący testy musi pokazać czerwony wynik przed zielonym.** Inaczej nie wiadomo,
   czy test dotyka błędu. → [P08](../pigulki/02-kontrakty-i-gotowe/p08-test-najpierw-czerwony.md)
5. **Awarie dostawcy to codzienność.** Retry, model fallback, selfcheck przed użyciem
   limitowanych prób i logi dostępne dla samego harnessu.
   → [P25](../pigulki/05-agent-bez-czlowieka/p25-dostawca-zawodzi.md), [P27](../pigulki/05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md)
6. **Źródło prawdy czytaj na żywo.** Plik planu to kopia, która się starzeje, a tracker jest
   aktualny. → [P23](../pigulki/05-agent-bez-czlowieka/p23-stan-poza-procesem.md)

## Co zostało otwarte

- Lokalna zmiana bez commita w `rig/src/host/app.ts` (tryby `selfcheck-pulse`
  i `selfcheck-test`) nie jest wdrożona.
- Serwis na Renderze nadal działa. Kurs już z niego nie korzysta, więc można go wyłączyć.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/answer-where-i-asked#debrief).
