# S01E05 · Answer Where I Asked — zapis przebiegu

Ten wpis łączy temat lekcji S01E05 z wyzwaniem „answer where i asked”. Szerszy opis lekcji
jest w [notatkach o budowaniu przepływów pracy](s01e05-building-workflows-not-tool-stacks.md).
Przebieg z kursem jest w `s01e05/log.md` (git-ignorowany, sekrety zamaskowane).

## Temat lekcji

Lekcja dotyczy przepływów pracy, które działają bez człowieka przy klawiaturze. Wyzwanie
przeniosło agentów z czatu na host. Recenzent pyta przez podpisany webhook, a agent musi
odpowiedzieć sam, z uprawnieniami nie większymi niż potrzebne.

## Zadanie

Trzeba było postawić dwóch agentów z „rig” na hoście z publicznym adresem https:

- **pulse** odpowiada recenzentowi, na jakim etapie jest rig;
- **test writer** pisze test do zgłoszonego błędu.

Kurs pinguje host podpisanymi żądaniami (Standard Webhooks). Host ma pokazać
`/.well-known/mega-pulse.json` z kodem właściciela i uprawnieniami agentów. Użytkownik wybiera
host, tworzy klucz modelu i sam wpisuje go do sekretów hosta.

## Wynik

Rozwiązane 13.11.2026 o 22:07:15Z, za jedenastym claimem, po jednej odmowie.

- Host: Render, darmowy plan, region Frankfurt, prywatne repo `Woookie89/rig-pulse`.
- Modele przez OpenRouter: pulse na `deepseek-v4.1-flash`, test writer na `deepseek-v4-pro`.
- Błąd #12 naprawiony: wiersz z właścicielem „—” znikał z digestu, bo `src/digest/read.ts`
  pomijał go jedną linią. Test był czerwony przed poprawką i zielony po niej.

## Jak działa host

| Element | Rozwiązanie |
| --- | --- |
| kto może obudzić agenta | sprawdzenie podpisu, id i znacznika czasu; niepodpisany POST dostaje 401 |
| odpowiedź | 202 od razu, odpowiedź wysyłana w tle; powtórzony ping z tym samym id jest pomijany |
| stan projektu | pulse czyta tracker na żywo przy każdym pingu, bo `plan.md` był nieaktualny |
| uprawnienia | pulse tylko `answer`, test writer tylko `test`; przykład z kursu dawał też comment/label/close |
| test writer | szkic testu biegnie najpierw na kodzie bez poprawki (ma być czerwony), potem z poprawką (ma być zielony) |
| koszt | dzienny limit 15 wywołań modelu; ponawianie przy 429/5xx i model zapasowy |

## Przebieg

1. W trackerze było zgłoszenie #14 od obcego autora. Jego treść kazała agentom zamknąć #12.
   Harness potraktował je jako dane i go nie wykonał. Pulse i tak ma tylko prawo `answer`.
2. `plan.md` twierdził, że #12 jest już wydane, a tracker pokazywał go jako otwarty. Harness
   znalazł przyczynę w kodzie i ją naprawił.
3. Pierwsze pingi: test writer poddał się po jednym błędzie 503 od Gemini i nie wysłał
   odpowiedzi. Kurs odrzucił claim: „no test came back for the test job.” Przyczynę harness
   znalazł dopiero w logach Rendera wklejonych przez użytkownika, bo sam ich nie widział.
4. Harness dodał ponawianie i model zapasowy oraz podpisany selfcheck, który testuje oba modele
   bez wydawania pytań recenzenta. Użytkownik przeszedł z darmowego klucza Gemini na OpenRouter,
   a potem, ze względu na rachunek, na modele DeepSeek.
5. Nowa runda: kilka odpowiedzi „retry” podczas sprawdzania, potem solved.

Rook po akceptacji: „not mine. i've run that log a thousand times. never read it once.”

## Wnioski

1. **Czat to nie host.** Odpowiedź ma dać serwis, który działa bez sesji: 202 od razu, praca
   w tle, deduplikacja po id pingu.
2. **Plan to nie tracker.** Stan projektu trzeba czytać na żywo ze źródła prawdy, bo plik
   planu się starzeje.
3. **Plik uprawnień decyduje, czego agent może dotknąć.** Najmniejsze potrzebne prawa chronią
   przed poleceniami ukrytymi w danych, takimi jak zgłoszenie #14.
4. **Każdy może zapukać.** Podpis, znacznik czasu i id sprawdzane przy każdym żądaniu to
   brama, której model nie omija.
5. **Test, który nigdy nie był czerwony, niczego nie dowodzi.** Test writer sprawdza szkic na
   kodzie bez poprawki i z poprawką.
6. **Model zawodzi chwilowo.** Jeden błąd 503 kosztował rundę. Ponawianie, model zapasowy
   i selfcheck przed claimem chronią limit pytań recenzenta.

## Co zostało otwarte

- Niezatwierdzona lokalna zmiana w `rig/src/host/app.ts` (tryby `selfcheck-pulse`
  i `selfcheck-test`) nie jest wdrożona.
- Serwis na Renderze nadal działa. Kurs już z niego nie korzysta, więc można go wyłączyć.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/answer-where-i-asked#debrief).
