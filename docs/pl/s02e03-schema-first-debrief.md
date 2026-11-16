# S02E03 · Schema First — zapis przebiegu

Ten wpis łączy temat lekcji S02E03 z wyzwaniem „schema first”. Szerszy opis lekcji jest w
[notatkach o możliwościach agentów](s02e03-agentic-capabilities.md).

## Temat lekcji

Lekcja omawia personalizację środowiska agenta i Model Context Protocol: hosta, klienta,
serwer, narzędzia, autoryzację i hosting. Uczy też projektowania własnego serwera MCP, czyli
wyboru narzędzi i ich kształtu zamiast odwzorowania całego API. Wyzwanie sprawdziło, czy
taki serwer obsłuży klient, którego autor nigdy nie widział. Kurs znalazł serwer przez
metadane i zalogował się sam. Narzędzia wołał według zadeklarowanych schematów. Ocenił przy
tym to, co dostaje model: rozmiar wyniku i to, czy błąd pozwala poprawić następne wywołanie.

## Zadanie i wynik

Harness zbudował własny zdalny serwer MCP z czterema narzędziami: `memo_write`, `memo_search`,
`upload` i `transcribe`. Warunki zadania:

- publiczny adres https,
- aktualna rewizja MCP,
- dostęp tylko dla wpuszczonych klientów,
- strona z planem podana jako `resource_documentation` w metadanych chronionego zasobu.

Kurs przyjął rozwiązanie 16.11.2026 o 06:39:52Z. Wcześniej jedną próbę odrzucił.

- Kod: prywatne repo `Woookie89/mcp-home`, lokalnie `s02e03/mcp-home` (ostatni commit
  `999d211`).
- Host: Render, darmowy web service i darmowy Postgres we Frankfurcie,
  `https://mcp-home-tn2y.onrender.com/mcp`. Strona planu: `/plan`.
- Transkrypcja: Whisper przez OpenRouter, na kluczu, który użytkownik już miał.

Użytkownik:

- wybrał Rendera,
- założył Blueprint i wpisał sekrety (hasło właściciela, klucz OpenRouter),
- dwa razy otworzył link połączenia i wpuścił kurs hasłem,
- zalogował Render CLI w przeglądarce,
- zlecił wstrzymanie `rig-pulse`,
- sam skopiował skill `hands`.

## Jak działa serwer

| Element | Rozwiązanie |
| --- | --- |
| protokół | Rewizja 2026-07-28 jest bezstanowa: wersja i możliwości klienta w `_meta` każdego żądania, nagłówki `Mcp-Method` i `Mcp-Name` zgodne z treścią, obowiązkowe `server/discover`. Dla rewizji 2025-11-25 i starszych serwer dalej obsługuje `initialize`. |
| logowanie | Własny serwer OAuth 2.1: metadane chronionego zasobu (RFC 9728) z `resource_documentation`, metadane serwera autoryzacji, rejestracja przez Client ID Metadata Document albo DCR, PKCE S256, parametr `resource`, `iss` w odpowiedzi, rotacja refresh tokenów. |
| kto wchodzi | Klienta wpuszcza strona zgody, która wymaga hasła właściciela. Błędne hasła mają limit na adres IP i limit globalny. |
| narzędzia | Każde narzędzie ma `inputSchema` i `outputSchema`, a wynik przechodzi walidację (ajv) przed wysłaniem. |
| pliki | Pliki są publiczne pod `/f/<id>/<nazwa>` z nagłówkiem `Content-Security-Policy: sandbox`. HTML, SVG i JS idą jako załącznik. |
| transkrypcja | Whisper przez OpenRouter, z ponowieniem przy 429 i 5xx, modelem zapasowym i dziennym limitem. |
| stan | Postgres na Renderze, bo darmowy host nie ma dysku. |
| testy | 25 testów `node:test` na PGlite oraz `./verify` z kontrolami na żywym adresie. |

## Przebieg

1. **Research przed kodem.** Harness przeczytał specyfikację i jej changelog. Aktualna jest
   rewizja 2026-07-28: bez `initialize` i bez sesji, z `server/discover`, nowymi kodami błędów
   (`-32020`, `-32022`) i polami `ttlMs`/`cacheScope`. Serwer powstał więc jako dwuerowy.
   Transkrypcję harness oparł na `/audio/transcriptions` w OpenRouter, które zwraca segmenty
   z czasami.
2. **Budowa i testy lokalne.** 24 testy przeszły, a prawdziwa transkrypcja mowy wygenerowanej
   przez Windows trwała 1,5 s i zwróciła 4 segmenty. Przed pushem harness poprawił trzy
   rzeczy:
   - CSP `form-action` zablokowałby przekierowanie po zgodzie,
   - kod `-32001` należy do zakresu legacy,
   - limit błędnych haseł per IP dało się obejść, więc doszedł limit globalny.
3. **Deploy.** Użytkownik założył Blueprint. Harness przeszedł całą ścieżkę na żywym adresie
   jako obcy klient: rejestracja, zgoda, token, discover, upload i transkrypcja.
4. **Pierwszy claim.** „The course found your server. First save the note with your memo tool.”
   Harness zapisał kod `b3fheuak` przez `memo_write`, a użytkownik otworzył link połączenia.
   Kurs zalogował się przez Client ID Metadata Document.
5. **Odmowa.** Kurs zmierzył wyniki i błędy:

   ```text
   result_too_big · transcribe · on https://hq.mega.dev/media/calibration/calibration-fdadf085.mp3: the whole result is 1394 B, over the 1024 B limit (structuredContent 569 B, text 569 B, rest 256 B); make it 1024 B or less
   unhelpful_error · transcribe · a web page as the url (https://hq.mega.dev/login): the tool error does not name the url
   unhelpful_error · transcribe · a missing file as the url (https://hq.mega.dev/media/s02e03/missing.mp3): the tool error does not name the url
   ```

6. **Poprawka zmierzona przed deployem.** `transcribe` zwraca teraz tylko `segments`.
   Wypadły zdublowany tekst, język i długość. Blok tekstowy to jedna linia
   `[start-end] tekst` na segment zamiast kopii JSON-a. Każdy błąd nazywa url i przyczynę.
   Harness pobrał klip kalibracyjny kursu i zmierzył wynik lokalnie, na prawdziwym Whisperze:
   822 B. Potem zrobił commit `999d211`, zapisał nowy kod `sgzhxjfg` i dał drugi link
   połączenia.
7. **Plik.** Kurs przysłał `logs/sched/2026-10-05.log` (8,5 MB) i linię `lane hwqkgnn3`.
   Skrypt dopisał linię na górze i wysłał plik przez `upload`. Bajty pobrane z linku były
   identyczne z lokalnymi.
8. **Notatka kursu.** „The check passed. The course left a new note on your server.”
   Najnowsza notatka kursu miała kod `6hmjn2j2`. Kurs odpowiedział: „The note is right. The
   course will come back later.”
9. **Czekanie.** „Claim again later: the course looks when that claim comes in”, po 11 348 s.
   Ciągły keep-alive okazał się zbędny, więc harness go wyłączył. Na prośbę użytkownika
   harness zainstalował Render CLI (v2.34.0, suma kontrolna sprawdzona), a użytkownik
   zalogował je w przeglądarce. Przez API harness wstrzymał oba serwisy `rig-pulse`.
10. **Rozwiązane.** Rano harness obudził uśpiony host (zimny start 22 s) i dopiero wtedy
    wysłał claim. Wynik: `solved`.

Na arkuszu debriefu kursu: „your harness saw it first. check it anyway.” — rook, oraz wpis
z historii WAKE: `04:04:04  job ended   exit: 0`. Nagrodą jest karta `hands` („everything
i touch, i touch with these. schema first.”). Użytkownik zainstalował ją w
`~/.claude/skills/hands/` (v1451720afc1f), a harness sprawdził sumy 6 plików.

## Wnioski

1. **Kurs ocenił to, co dostaje model.** Protokół, logowanie i schematy przeszły od razu.
   Odmowa dotyczyła rozmiaru wyniku i jakości błędów, czyli tego, za co agent płaci
   kontekstem i z czego poprawia kolejne wywołanie.
2. **Pomiar na danych oceniającego oszczędził rundę.** Klip kalibracyjny był publiczny.
   Lokalny pomiar (822 B) przed deployem dał pewność, że druga runda przejdzie.
3. **Wynik wysłany dwa razy kosztuje dwa razy.** Pole `text` powtarzało segmenty, a blok
   tekstowy powtarzał cały JSON. Specyfikacja tylko zaleca (SHOULD) kopię JSON-a w tekście,
   a budżet bajtów tego zalecenia nie zostawił.
4. **Dwuerowość nic nie kosztowała, a chroniła.** Kurs mówił nowym protokołem, ale starsi
   klienci dalej działają przez `initialize`.
5. **Duży plik poszedł skryptem, nie przez model.** Kontrakt `upload` przyjmuje jednak base64.
   Według reguły 4 skilla `hands` to błąd projektu, który przeszedł tylko dzięki skryptowi.
6. **Darmowy host wymaga dwóch rzeczy.** Postgres trzyma dane przez uśpienie i restart.
   Przed claimem trzeba obudzić host.
7. **Harness widzi logi.** Po instalacji Render CLI harness sam sprawdził w logach, którędy
   i kiedy kurs wszedł (Client ID Metadata Document, 21:49Z). Tego brakowało w S01E05.
8. **Uprawnienia harnessu zostały na swoim miejscu.** Klasyfikator trybu auto zablokował
   `claude mcp add` i zapis do `~/.claude/skills/`. Harness tego nie obchodził. Podał
   komendę, a użytkownik zrobił to sam.

## Czego to uczy o pracy z AI i agentami

1. **Serwer MCP to kontrakt dla obcego klienta.** Wszystko, czego klient potrzebuje, musi
   być w deklaracjach i metadanych: discovery, rejestracja, zgoda, schematy, strona planu.
   Kurs nie zadał ani jednego pytania. Wszystko wyczytał z serwera.
   → [P39](../pigulki/08-harness/p39-mcp-kontrakt-dla-klienta.md)
2. **Wynik narzędzia ma budżet bajtów.** Każdy bajt wyniku trafia do kontekstu agenta
   i zabiera miejsce na myślenie. Zwracaj tylko to, czego agent użyje w następnym kroku,
   i tylko raz. → [P40](../pigulki/08-harness/p40-wynik-ma-budzet.md)
3. **Błąd narzędzia to instrukcja dla modelu.** Model poprawia następne wywołanie tylko
   z tego, co przeczyta w błędzie. Błąd ma nazwać złą wartość, powiedzieć, co z nią nie tak,
   i co wysłać zamiast niej.
   → [P41](../pigulki/08-harness/p41-blad-mowi-co-poprawic.md)
4. **Duże bajty idą obok modelu, nie przez niego.** Plik, audio i długi log przekazuj jako
   url albo ścieżkę, a nie jako base64 w argumentach.
   → [P42](../pigulki/08-harness/p42-duze-bajty-obok-modelu.md)
5. **Sprawdzaj na danych odbiorcy.** Pomiar na klipie kursu przed deployem zamienił
   zgadywanie w liczbę. → [P10](../pigulki/02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)
6. **Host bez człowieka: stan w bazie, logi w zasięgu harnessu, uprawnienia u człowieka.**
   → [P23](../pigulki/05-agent-bez-czlowieka/p23-stan-poza-procesem.md),
   [P27](../pigulki/05-agent-bez-czlowieka/p27-agent-widzi-swoje-logi.md),
   [P35](../pigulki/07-czlowiek-w-petli/p35-uprawnienia-harnessu.md)

## Co zostało otwarte

- **Render.** `mcp-home` i baza `mcp-home-db` działają na planie free. Baza wygasa około
  15.12.2026 (30 dni od założenia). Po 14 dniach karencji Render ją usuwa razem z notatkami
  i plikami. Jeśli serwer ma zostać dłużej, trzeba przenieść bazę.
- **Dostęp kursu.** Kurs dalej ma token (24 h) i refresh token (30 dni). Odebrać go można przez
  `/revoke`, w bazie albo zmianą hasła właściciela i unieważnieniem tokenów. Panelu admina nie
  ma.
- **Własny harness.** `mcp-home` nie jest jeszcze dopisany do Claude Code. Komenda dla
  użytkownika:
  `claude mcp add --transport http --scope user mcp-home https://mcp-home-tn2y.onrender.com/mcp`,
  potem `/mcp` → Authenticate.
- **Kontrakt `upload`.** Przyjmuje base64, wbrew regule 4 `hands`. Do przepisania z `TOOL.md`
  na url do pobrania albo osobną ścieżkę HTTP dla bajtów.
- **`check-tool` nie zaloguje się do serwera z OAuth.** Do sprawdzania `mcp-home` skillem
  `hands` brakuje wejścia stdio.
- **Inne.** Serwisy `rig-pulse` i `rig-pulse-7d7o` są wstrzymane (Resume w dashboardzie).
  Render CLI jest zalogowane (`render logout` cofa dostęp). Koszt transkrypcji ogranicza
  dzienny limit 200. Sekrety leżą w `s02e03/secrets.local.md` (ignorowany przez git).

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/schema-first#debrief).
