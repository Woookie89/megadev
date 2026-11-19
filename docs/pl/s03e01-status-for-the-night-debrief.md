# S03E01 · Status for the Night — zapis przebiegu

Ten wpis łączy temat lekcji S03E01 z wyzwaniem „status for the night”. Szerszy opis lekcji
jest w [notatkach o mechanice inżynierii produktu](s03e01-mechanics-behind-product-engineering.md).
Pojęcia kursu i agentów (claim, receipt, tag wymagania, pytanie do właściciela, canvas,
contact sheet) wyjaśnia [słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja otwiera tydzień o produkcie. Skoro agenci piszą coraz więcej kodu, różnicę robi
decyzja, co zbudować, i to, czy użytkownik może potem zrobić to, czego potrzebuje (przejście
„od wyniku pracy do rezultatu”). Product manager decyduje, jaki problem rozwiązać i dlaczego,
a inżynier produktu decyduje, co produkt musi robić, żeby go rozwiązać. Zakres, założenia
i kompromisy leżą na styku obu ról. Lekcja przypomina też, że przy decyzjach o produkcie nie
wystarczy bazowa wiedza modelu ani sam kod, bo brakuje w nich kontekstu tych decyzji.

Wyzwanie sprawdzało to w praktyce. Wymagania przysłało sześć osób, każda w innej formie, i nie
wszystkie się zgadzały. Harness miał zebrać je w jedną listę z odwołaniem do źródła przy
każdym wymaganiu, sprzeczności oddać właścicielowi jako pytania, a potem zbudować stronę tylko
z tego, co uzgodnione.

## Zadanie i wynik

Produkt chce publicznej strony statusu na noc. Źródła: notatka głosowa (`memo.m4a`),
zrzut ekranu, nagranie ekranu, PDF ze specyfikacją, zdjęcie tablicy i bieżąca tablica
„tram 3 board”. Pięć plików było w paczce kursu. Tablicy w paczce nie było: plik
`board-link.txt` mówił tylko „its link is on the challenge page, signed in. it is not in
this pack.”

Dwa kroki zgłoszenia:

1. claim `{ list, skill }`: lista wymagań w kształcie `{ accepted, conflicts, unreadable? }`,
   gdzie każdy tag ma `source = { file, at?, region? }`, oraz tekst własnego skilla `capture`
   w zasięgu użytkownika (user scope). Przyjęty krok daje receipt.
2. claim `{ receipt, buildUrl }`: adres wdrożonej strony. Kurs poprosił o Cloudflare
   Workers: „deploy it on Cloudflare Workers, next to the MCP server you put up earlier —
   public https, no login.”

Kurs przyjął oba kroki przy pierwszej próbie. Rozwiązanie: 19.11.2026 o 10:47:33 UTC.
Odmów: zero. Podpowiedzi były na stronie włączone (HINTS = On), ale z żadnej nie skorzystano.

Strona działała pod adresem `https://status-for-the-night.woookie89.workers.dev` (Cloudflare
Worker na darmowym planie). Po rozwiązaniu użytkownik poprosił o jej zatrzymanie („zatrzymaj
jak nie potrzebne, w razie czego sie wlaczy”), więc adres zwraca teraz 404. Worker i kod
zostały na koncie, a da się je włączyć z powrotem (patrz „Co zostało otwarte”). Kod jest
w `s03e01/status-page/`.

Użytkownik:

- zalogował się do kursu w przeglądarce, którą sterował harness („zalogowany”), bo link do
  tablicy był tylko na stronie wyzwania za logowaniem,
- założył konto Cloudflare (logowanie przez GitHub) i zatwierdził logowanie `wrangler`
  w przeglądarce,
- zgodził się na instalację skilla `capture` („tak i kontynuuj do rozwiaza”),
- uruchomił `npx wrangler@4 deploy` we własnym terminalu i zarejestrował subdomenę
  `woookie89.workers.dev`.

## Jak powstała lista i jak działa strona

| Element | Rozwiązanie |
| --- | --- |
| notatka głosowa | faster-whisper lokalnie, na dźwięku zdekodowanym przez ffmpeg; drugie przejście większym modelem (`medium`) na wycinkach z tagami |
| nagranie ekranu | transkrypcja dźwięku i obok niej contact sheet: jedna klatka na sekundę (`fps=1`, siatka 5×6) |
| zrzut ekranu, tablica, PDF | odczyt wizualny; obszar tagu mierzony w pikselach i zapisany jako ułamki 0–1 (`region`), w PDF z numerem strony |
| bieżąca tablica | wyrenderowana w Chromium sterowanym przez harness i zapisana jako zrzut (`s03e01/board-canvas.png`) |
| dane | publiczny feed incydentów kursu: 7 rekordów (4465–4471), `access-control-allow-origin: *`, `max-age=60` |
| lista | 15 tagów: 10 przyjętych, 5 spornych (dwie pary tag–tag i jeden tag sprzeczny z rekordem 4471) |
| skill | `capture` w `~/.agents/skills/capture/SKILL.md`, podlinkowany do `~/.claude/skills/capture` |
| host | Cloudflare Worker `status-for-the-night`, darmowy plan |
| strona | `/` (HTML) i `/status.json` z jednego odczytu feedu przy każdym żądaniu (`cache: 'no-store'`) |
| testy | `test.mjs`: 15 sprawdzeń, lokalnie na feedzie o prawdziwym kształcie i na wdrożonym adresie z prawdziwym feedem |

Przyjęte wymagania i ich źródła:

| Tag | Wymaganie | Źródło |
| --- | --- | --- |
| R-K4M | `status.json` z nagłówkiem `access-control-allow-origin: *` | notatka głosowa, 5,6 s |
| R-H8X | `updatedAt` w UTC, zakończone `Z` | notatka głosowa, 18,7 s |
| R-Z5L | nagłówek „status for the night” | notatka głosowa, 27,3 s |
| R-L5Z | `Cache-Control` z `max-age` najwyżej 60 s | notatka głosowa, 34,6 s |
| R-Z2K | jeden wiersz na linię, tramwaj 3 też | nagranie, 6,8 s (mowa) |
| R-H4L | stopka „all times UTC” | nagranie, od ok. 14,5 do 24 s, tylko na ekranie |
| R-M9Z | bursztynowy pasek `#f5a623` | zrzut ekranu |
| R-M3H | najnowszy incydent na górze | PDF, strona 1 |
| R-K8L | `updatedAt` równe `updatedAt` feedu, czytanego na żywo | zdjęcie tablicy |
| R-X2M | napis „read by tram 3 boards” | bieżąca tablica |

Sprzeczności oddane właścicielowi:

| Tag | Druga strona | O co chodzi |
| --- | --- | --- |
| R-L3K (PDF) | R-X6H (zrzut ekranu) | daty: dzień pierwszy, 05/10, czy miesiąc pierwszy, 10/05 |
| R-H9K (PDF) | R-Z6M (zdjęcie tablicy) | zakres: tylko ostatnia noc czy cały tydzień |
| R-X5K (PDF) | rekord 4471 z feedu | „each incident names who ran it”, a rekord 4471 ma autora „—” |

## Przebieg

1. **Start w przeglądarce (18.11.2026).** Wyzwanie startowało ze strony HQ. Sesja nie miała
   narzędzia przeglądarki, więc harness uruchomił zainstalowany Chromium z portem debugowania.
   Puppeteer 24 nie widział w nim stron, więc harness rozmawiał z przeglądarką przez surowy
   Chrome DevTools Protocol po WebSocket (sesja
   `ac01d3fb-65aa-49fb-859c-ecaca63638e0.jsonl:665`). Użytkownik zalogował się w tej
   przeglądarce. `start-challenge` dał zadanie, kształt listy i prośbę o Cloudflare Workers.
   Rook (fabuła): „they want a status page for the night. six files from six people, one
   page. they don't agree. not everything comes through your agent. the challenge page has
   the rest.”
2. **Konto hosta.** Użytkownik: „pomoz mi skonfigurowac loould flare. zalgowalem sie”. Po
   `npx wrangler@4 login` zatwierdził dostęp w przeglądarce: „Successfully logged in.”
   Paczka (687 545 B) miała sześć plików, w tym wskazówkę do tablicy zamiast tablicy.
3. **Skill `capture` (19.11.2026).** Po zgodzie użytkownika harness zapisał skill w
   `~/.agents/skills/capture/SKILL.md` i podlinkował go do `~/.claude/skills/capture`. Skill
   opisuje, jak czytać każdy rodzaj pliku, jak cytować miejsce i że sprzeczności rozstrzyga
   właściciel.
4. **Czytanie źródeł.** Cztery tagi były tylko w notatce głosowej. Transkrypcja literowanych
   tagów wychodzi w rodzaju „RK4, M”, więc każdy wycinek z tagiem harness sprawdził drugim,
   większym modelem. W nagraniu tag R-H4L („all times UTC”) był tylko na ekranie, od ok.
   14,5 do 24 s, i nikt go nie wypowiedział. Znalazł go contact sheet ułożony obok
   transkrypcji. Tablica „tram 3 board” rysowała swój tekst, więc harness wyrenderował ją
   w przeglądarce i odczytał zrzut: „read by tram 3 boards”.
5. **Wymagania na prawdziwych danych.** Feed miał 7 rekordów z 3–5 października. Rekord 4471
   (sched-prod, schedule rebuild, 03:51–04:04 UTC) nie ma autora, czyli łamie R-X5K. To też
   trafiło na listę jako sprzeczność, z rekordem zamiast drugiego tagu.
6. **Claim kroku 1.** Lista: 10 przyjętych tagów i 5 spornych, każdy sporny z pytaniem do
   właściciela, które nazywa obie strony. Kurs przy pierwszej próbie: „no guesses in it. one
   of them answered you. Not solved yet: step two is the build.” Receipt trafił do
   `s03e01/receipts.secrets.local.json` (plik ignorowany przez git).
7. **Odpowiedź produktu.** Na stronie HQ pojawiło się: „PRODUCT ANSWERED YOUR LIST: dates day
   first, 05/10, the way the night shift writes them. R-L3K holds, R-X6H goes. — product”.
   Na pytanie o zakres i o autora rekordu 4471 odpowiedzi nie było. Harness nie wybrał więc
   żadnej strony: strona pokazuje wszystkie rekordy feedu tak, jak przyszły, i nie ma kolumny
   z autorem.
8. **Ponowny prompt startowy.** W trakcie pracy użytkownik wkleił jeszcze raz prompt startowy.
   Harness nie zaczął od nowa (przycisku „Start over” na HQ nikt nie nacisnął) i przeszedł do
   kroku 2.
9. **Budowa.** Worker czyta feed przy każdym żądaniu i z jednego odczytu renderuje HTML
   i `status.json`. `test.mjs` ma 15 sprawdzeń: 10 przyjętych tagów, R-L3K po odpowiedzi
   produktu oraz 4 ogólne (JSON z incydentami, publiczny HTML 200, godziny HH:MM w UTC, brak
   śledzenia i ciasteczek). Lokalnie, na feedzie o prawdziwym kształcie: 15/15.
10. **Deploy zatrzymany (ok. 08:40 UTC).** `wrangler deploy` skończył się błędem: „Could not
    automatically register "status-page" as your workers.dev subdomain because the name is
    unavailable.” Konto nie miało jeszcze subdomeny `workers.dev`. Harness spróbował
    zarejestrować ją przez API Cloudflare tokenem wranglera. Klasyfikator uprawnień trybu
    auto odmówił: „Permission for this action was denied by the Claude Code auto mode
    classifier. Reason: [Destructive or Unwanted Actions].” (sesja `…:612`). Harness nie szukał
    obejścia: „Nie obchodzę blokady. To ustawienie musisz zrobić Ty w panelu” (sesja `…:642`).
11. **Krok człowieka.** Link do panelu, który podał wrangler (`/workers/onboarding`), w nowym
    panelu Cloudflare prowadził do strony 404. Użytkownik uruchomił więc `npx wrangler@4
    deploy` we własnym terminalu, interaktywnie, i zarejestrował subdomenę `woookie89`.
    Wdrożenie: 10:44:51 UTC.
12. **Czekanie na TLS.** Pierwsze żądania HTTPS kończyły się błędem połączenia TLS, bo nowa
    subdomena nie miała jeszcze certyfikatu. Harness odpytywał adres w tle. Strona odpowiedziała
    o 10:47:13 UTC, ok. 2,5 minuty po wdrożeniu. `node test.mjs <adres>` na wdrożonej stronie
    i prawdziwym feedzie: 15/15.
13. **Rozwiązanie.** 10:47:33 UTC claim `{ receipt, buildUrl }` → przyjęte przy pierwszej
    próbie. Rook (fabuła): „you built what was agreed. the rest went back as questions.”
14. **Zatrzymanie.** Tego samego dnia, na prośbę użytkownika, harness ustawił
    `"workers_dev": false` w `wrangler.jsonc` i wdrożył Workera ponownie. Wrangler: „No
    targets deployed”. Publiczny adres jest wyłączony, a Worker i kod zostały na koncie.

## Wnioski

Debrief kursu zadał pięć pytań. Na wszystkie odpowiedź brzmiała: dobrze od razu.

| Pytanie | Wynik | Czego uczy (arkusz kursu, w skrócie) |
| --- | --- | --- |
| The board draws it | od razu dobrze | tego, co strona rysuje, nie ma w jej tekście ani kodzie: wyrenderuj i patrz |
| Said is not shown | od razu dobrze | transkrypcja to połowa nagrania; to, co pokazane na ekranie, trzeba obejrzeć |
| Neither side wins by rank | od razu dobrze | sprzeczne źródła rozstrzyga właściciel, a nie ranga dokumentu |
| The row with no author | od razu dobrze | gdy dane łamią wymaganie, pytasz właściciela i nie wymyślasz brakującej wartości |
| Accepted is a contract | od razu dobrze | każde przyjęte wymaganie musi być na stronie i mieć sprawdzenie z zewnątrz |

Narzędzia według kursu (toolbox): w trakcie doszedł skill `capture` (T1). Przeszkody według
kursu: brak subdomeny `workers.dev` (rozwiązał użytkownik) i czekanie na certyfikat TLS.
Decyzję, która przesądziła o wyniku, kurs przypisał użytkownikowi: zmiana na koncie należy do
jego właściciela, więc harness przekazał mu jeden dokładny krok w terminalu, zamiast obchodzić
odmowę. Rook na arkuszu: „the right call was yours. keep reading.” Rada kursu na następny raz,
w skrócie: konto hosta i subdomenę przygotuj przed budową, a każde przyjęte wymaganie sprawdź
z zewnątrz przed claimem. Na arkuszu jest też linia fabuły z rekordem bez autora: „04:04
incident closed   what: schedule rebuild   author: —”.

1. **Każde źródło czytane swoim sposobem.** Dźwięk: transkrypcja ze znacznikami czasu i druga
   kontrola większym modelem. Wideo: transkrypcja i klatki. Obrazy i PDF: odczyt wizualny
   z obszarem. Tablica: render w przeglądarce. Dzięki temu znalazły się wszystkie trzy tagi,
   których sam tekst by nie dał: cztery mówione w notatce, R-H4L tylko na ekranie i R-X2M
   tylko na tablicy.
2. **Brakujące narzędzie zastąpił most.** Sesja nie miała przeglądarki, a Puppeteer nie
   widział stron w Chromium. Surowy CDP po WebSocket wystarczył do logowania, odczytu tablicy
   i zrzutu ([P37](../pigulki/08-harness/p37-brakujace-narzedzie.md)). Pomocnik został
   w plikach tymczasowych sesji, nie w repo.
3. **Sprzeczności poszły do właściciela, a budowa tylko z tego, co pewne.** Z trzech pytań
   produkt odpowiedział na jedno (daty). Na zakres i autora rekordu 4471 odpowiedzi nie było,
   więc strona nie przesądza żadnej strony: pokazuje rekordy feedu tak, jak przyszły, i nie
   ma kolumny autora. Kurs: „no guesses in it”.
4. **Test na każde wymaganie, lokalnie i na żywo.** Ten sam `test.mjs` działał na udawanym
   feedzie o prawdziwym kształcie i na wdrożonym adresie. Claim poszedł dopiero po 15/15
   z zewnątrz, więc nie było żadnej odmowy.
5. **Konto hosta nie było gotowe przed budową.** Strona była gotowa i przetestowana ok. 08:40
   UTC, a wdrożona dopiero o 10:44:51 UTC. Brakowało jednorazowego ustawienia konta
   (subdomeny), którego harness nie mógł i nie powinien zrobić sam, więc gotowa strona czekała
   na człowieka. Link z wranglera do panelu
   nie działał, a skutecznym krokiem okazała się jedna komenda w terminalu użytkownika.
6. **Nowa subdomena potrzebuje kilku minut.** Błąd TLS zaraz po pierwszym wdrożeniu na nowej
   subdomenie to nie błąd strony. Harness czekał na odpowiedź 200 i dopiero wtedy uruchomił
   sprawdzenia.

## Czego to uczy o pracy z AI i agentami

1. **Tego, co strona rysuje, nie ma w jej tekście.** Strona, która rysuje treść na canvasie
   albo składa ją skryptem, nie ma tej treści w HTML ani w odpowiedzi API. Agent, który
   czyta tylko źródło strony, uzna, że jej tam nie ma. Trzeba ją wyrenderować w prawdziwej
   przeglądarce i odczytać zrzut. Przyda się przy dashboardach, wykresach, mapach, PDF-ach
   z warstwą graficzną i każdym „pokaż mi, co jest na ekranie”.
   → [P03](../pigulki/01-kontekst/p03-zrodlo-to-nie-widok.md)
2. **Transkrypt to połowa nagrania.** Model mowy słyszy tylko dźwięk. To, co ktoś pokazał
   na ekranie i przemilczał, w transkrypcji nie istnieje, a cisza w nagraniu często oznacza
   właśnie coś pokazanego. Wideo czytaj dwiema drogami: dźwięk i klatki (contact sheet,
   jedna klatka na sekundę). Literowane kody i nazwy sprawdzaj drugim modelem na krótkich
   wycinkach. Przyda się przy nagraniach z demo, spotkaniach z udostępnianym ekranem
   i zgłoszeniach błędów nagranych telefonem.
   → [P02](../pigulki/01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md)
3. **Sprzeczne źródła nie wygrywają rangą.** Model ma odruch domykania: wybierze źródło,
   które wygląda na ważniejsze (specyfikacja przed notatką na zrzucie), i zbuduje dalej.
   O zakresie i kompromisach decyduje jednak właściciel produktu. Agent zapisuje obie strony
   z miejscem w źródle, zadaje jedno pytanie, które je nazywa, i do odpowiedzi buduje tylko
   to, co niesporne. Przyda się przy każdym zbieraniu wymagań od kilku osób: z Jiry, Slacka,
   maili i notatek ze spotkań.
   → [P49](../pigulki/07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md),
   [P33](../pigulki/07-czlowiek-w-petli/p33-prawa-decyzyjne.md)
4. **Brak w danych zostaje brakiem.** Gdy dane łamią wymaganie (rekord bez autora), kuszą
   dwa skróty: wpisać wiarygodne imię albo udawać, że wymagania nie ma. Oba ukrywają problem
   przed właścicielem, a wymyślona wartość na publicznej stronie wygląda jak fakt. Wymaganie
   sprawdzaj na prawdziwych danych, rekord, który je łamie, zgłoś jako sprzeczność, a do
   odpowiedzi pokaż dane takie, jakie są. Przyda się przy raportach, migracjach danych
   i wszędzie, gdzie agent wypełnia pola.
   → [P49](../pigulki/07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)
5. **Wymaganie ma adres i test.** Każde wymaganie ma plik i miejsce w źródle (sekundę
   nagrania, obszar strony), a każde przyjęte dostaje jedno sprawdzenie na wdrożonym adresie.
   Bez adresu nie wiadomo, czy agent czegoś nie dopowiedział. Bez testu na wymaganie łatwo
   zgubić jedno z dziesięciu, najczęściej to najtrudniejsze do znalezienia. Lokalny test nie
   widzi nagłówków, cache'u i TLS hosta. Przyda się przy każdym odbiorze funkcji według
   kryteriów akceptacji.
   → [P50](../pigulki/02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md),
   [P10](../pigulki/02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)
6. **Zmiana na koncie należy do właściciela: przy odmowie podaj jeden dokładny krok.**
   Klasyfikator uprawnień zablokował rejestrację subdomeny, bo to trwała zmiana na cudzym
   koncie. Obejście (inny token, inne API) zrobiłoby z odmowy formalność. Lepiej przekazać
   człowiekowi jedną komendę, która działa, niż link, którego nikt nie sprawdził. Jeszcze
   lepiej przygotować konto przed budową. Przyda się przy chmurze, DNS-ie, płatnościach
   i każdym koncie, którego właścicielem jest człowiek.
   → [P35](../pigulki/07-czlowiek-w-petli/p35-uprawnienia-harnessu.md),
   [P33](../pigulki/07-czlowiek-w-petli/p33-prawa-decyzyjne.md)

## Co zostało otwarte

- **Worker na Cloudflare: zatrzymany.** `status-for-the-night` jest na darmowym planie konta
  użytkownika (subdomena `woookie89.workers.dev`), ale ma `"workers_dev": false`, więc adres
  zwraca 404. Worker i kod zostały na koncie. Włączenie: ustaw `"workers_dev": true`
  w `s03e01/status-page/wrangler.jsonc`, uruchom `npx -y wrangler@4 deploy`, potem
  `node test.mjs https://status-for-the-night.woookie89.workers.dev`. Usunięcie na stałe:
  `npx wrangler@4 delete` albo w panelu Workers & Pages → worker → Settings → Delete.
- **Dostęp wranglera.** Zgoda OAuth dla wranglera nadal działa. Cofnięcie: w Cloudflare My
  Profile → Access Management → Connected Applications albo `npx wrangler@4 logout`.
- **Skill `capture`.** Jest w `~/.agents/skills/capture/SKILL.md` z linkiem w
  `~/.claude/skills/capture`. Kopii w repo nie ma.
- **Pytania bez odpowiedzi.** Zakres strony (R-H9K „last night only” czy R-Z6M „whole week”)
  i autor rekordu 4471 (R-X5K) nadal czekają na produkt. Do tego czasu strona pokazuje
  wszystkie rekordy feedu i nie ma kolumny autora.
- **Pliki lokalne.** `s03e01/receipts.secrets.local.json` (ignorowany przez git, ważny do ok.
  20.11.2026 08:38 UTC, po rozwiązaniu niepotrzebny). Paczka (`pack.zip`, `pack/`), klatki
  (`frames/`), `board-canvas.png`, `feed-browser.json`, `transcripts.txt` i `list.json` leżą
  w `s03e01/`. Cały folder jest jeszcze poza gitem.
- **Przeglądarka z portem debugowania.** Czy Chromium uruchomiony z
  `--remote-debugging-port` został zamknięty: w logu nie znaleziono.
- **Koszt.** Brak: darmowy plan Cloudflare i lokalna transkrypcja.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/status-for-the-night#debrief).
