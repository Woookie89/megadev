# S03E02 · Przekładanie intencji na pracę agentów

Agenci potrafią działać naprawdę szybko, ale muszą wiedzieć, dokąd zmierzają, bez konieczności odpowiadania na każde ich pytanie czy śledzenia każdego ich ruchu i bez poświęcania jakości ani właściwego kształtu produktu. Osiągnięcie tego wszystkiego bez czytania kodu brzmi jak myślenie życzeniowe. Ale czy na pewno?

Mimo swoich technicznych ograniczeń modele generatywne mają możliwości przekraczające wiele z tego, co potrafimy my, i ten jeden fakt to **kluczowa koncepcja, którą musimy pojąć**. Zamiast martwić się, że staniemy się zbędni, lepiej skupić się na ustaleniu, jak te możliwości wykorzystać. A jest wiele rzeczy do zbadania.

Pomyślmy przez chwilę: jeśli mamy agenta bardziej zdolnego od nas, zamiast mówić mu, jak ma coś robić, musimy powiedzieć mu, **czego potrzebujemy, jakich zasad (nie reguł) ma przestrzegać i jak udowodnić, że wynik jest z nimi zgodny.**

Ale jak dokładnie to zrobić?

## Plan

- Intencja: definicja ukończenia, wpływ na użytkowników, istniejące zachowanie, pożądany rezultat
- Kontekst: wiedza o produkcie, wiedza o rynku, mapy bazy kodu, ograniczenia, konwencje, wcześniejsze decyzje
- Wymagania i dekompozycja: założenia, niejednoznaczności, sprzeczności, brakujące informacje, ukierunkowane pytania, ustrukturyzowane briefy, negatywne przykłady, granice, uproszczenia, zależności, punkty kontrolne, reguły, przydziały, otwartość
- Ewaluacja: oczekiwania, kryteria akceptacji, poprzeczki jakości, wymagania dotyczące dowodów, testy

## Opisywanie intencji

Na podstawie [dwóch miesięcy moich interakcji z agentami](https://cloud.overment.com/overment-agents-1792502457.html) moje wpisywane wiadomości miały średnio około 7 słów, a dyktowane około 150 słów. Na moje 4,5 tys. wiadomości agenci odesłali około 13,5 tys. odpowiedzi i wysłali dwa razy tyle wiadomości między sobą, bez mojego udziału, w sesjach trwających od 3 do prawie 40 godzin.

![Dwa wykresy obok siebie, wycentrowane i wyrównane. Po lewej wykres kołowy wiadomości z dwóch miesięcy: 4,5 tys. ode mnie (10%), około 13,5 tys. odpowiedzi agentów (30%) i około 27 tys. między agentami (60%). Wartość około 27 tys. jest dwukrotnością 13,5 tys. odpowiedzi, jak mówi tekst. Po prawej kwadratowe siatki słów w jednej wiadomości: około 7 dla wiadomości wpisanej i około 150 dla podyktowanej, jeden kwadrat na każde słowo.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-1/frame.html)

Większość tego, co robię, sprowadza się do **opisywania intencji** i **udzielania informacji zwrotnej**. Agenci rzadko dostają dokładne instrukcje mówiące, co mają zrobić. W rzeczywistości kierują się **zasadami**, a nie regułami, ponieważ daje im to więcej przestrzeni do podejmowania decyzji, których trudno byłoby przewidzieć, na przykład:

- **Reguła:** odpowiedzi mają mieć mniej niż 100 słów.
- **Zasada:** szanuj uwagę czytelnika. Każde zdanie powinno zasłużyć na swoje miejsce.

- **Reguła:** nigdy nie usuwaj plików.
- **Zasada:** dopasuj ostrożność do kosztu pomyłki.

- **Reguła:** używaj wypunktowań.
- **Zasada:** pozwól, by treść decydowała o swojej formie.

Zarówno reguły, jak i zasady wskazują ten sam kierunek, ale reguła może być zbyt rygorystyczna lub zbyt wąska, by była użyteczna w dynamicznym środowisku, w którym agent będzie pracował. A modele, które mamy dziś, są dość inteligentne, by znaleźć najlepszą opcję mieszczącą się w granicach wyznaczonych przez nasze zasady.

![Trzy panele w jednym rzędzie. Każdy panel ma białą kropkę po lewej i tarczę w prawym górnym rogu. Pod „Regułą” panel 1 ma szarą ścieżkę wzdłuż pasa dwóch równoległych linii. Ścieżka kończy się znakiem wyboru poniżej celu. W panelu 2 szara ścieżka skręca w górę w stronę celu i zatrzymuje się na górnej linii pasa, oznaczona znakiem X. Pod „Zasadą” panel 3 ma przerywaną zaokrągloną granicę wokół kropki i celu. Czerwona ścieżka zakrzywia się od kropki do czerwonego środka tarczy.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-2/frame.html)

Obok zasad warto rozważyć powiedzenie agentowi o **powodzie** stojącym za intencją. Daje to dodatkową warstwę cennego kontekstu, który pozwala agentowi zobaczyć szerszy obraz tego, co chcemy osiągnąć, a jednocześnie zostawia mu dość miejsca, by kierować się ku najlepszemu możliwemu rozwiązaniu. Jednocześnie powód pomaga agentowi **zrozumieć dynamiczne granice**, które mogą wpływać na jego zachowanie.

Wyobraźmy sobie, że mamy agenta z dostępem do kontekstu o ludziach w naszym zespole. Chcemy, by komunikował się otwarcie w wiadomościach bezpośrednich, ale nie ujawniał zbędnych szczegółów na kanałach zespołu. Mamy więc:

- **Zasada:** dziel się informacjami tylko z osobami, których dotyczą.
- **Powód:** ludzie dzielą się rzeczami z agentem tylko wtedy, gdy ufają, że zachowa je w odpowiednim miejscu.

W tej konfiguracji możemy oczekiwać, że agent zachowa się tak, iż wiadomości bezpośrednie ujawnią wszystkie szczegóły, a kanał zespołu ukryje je. A jeśli agent zauważy, że na niektórych kanałach mogą być **goście** spoza organizacji, odpowiednio się dostosuje.

![Blok na górze zawiera zasadę „Dziel się informacjami tylko z osobami, których dotyczą” i jej powód „Ludzie dzielą się rzeczami z agentem tylko wtedy, gdy ufają, że zachowa je w odpowiednim miejscu.” Linia biegnie w dół do przerywanej pigułki „Zmienna: kto może czytać kanał” i rozdziela się na trzy panele. Wiadomość bezpośrednia: jedna osoba; agent mówi „Masz wizytę u lekarza o 14:00, więc przesunąłem przegląd na 16:00.” (Pełny kontekst). Kanał zespołu: cztery osoby; agent mówi „Adam jest niedostępny od 14:00 do 15:00. Przegląd przesuwa się na 16:00.” (Fakt, bez powodu). Kanał z gośćmi: cztery osoby i dwie przerywane postacie gości; agent mówi „Przegląd przesuwa się na 16:00.” (Tylko to, czego potrzebują goście). Dymki robią się mniejsze od lewej do prawej.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-3/frame.html)

To tylko przykład, ale najważniejsze jest to, że **zasady i powody** pozwalają nam kształtować intencje, które bardziej opierają się na natywnych możliwościach modeli. Rezultat, który dostaniemy, może więc nie tylko odpowiadać naszym pierwotnym wymaganiom, ale też uwzględniać aspekty, których nie przewidzieliśmy, zwłaszcza jeśli agent eksploruje bazę wiedzy i inne dostępne źródła.

## Kontekst produktu

Agenci kodujący natywnie wiedzą, jak eksplorować bazę kodu, ale bardzo mało wiedzą o wszystkim, czego nie da się odczytać z kodu: zewnętrznych usługach, platformach, narzędziach i wewnętrznych bazach wiedzy. Co więcej, z samego kodu mogą dowiedzieć się tylko o **bieżącym stanie** produktu. Mają niewielkie pojęcie o jego kierunku, o tym, nad czym zespół już pracuje, ani o tym, czy trzeba uwzględnić jakieś strategiczne decyzje biznesowe.

Naszym celem jest sprawić, by agent „nauczył się”, jak eksplorować kontekst wykraczający poza kod i jak podejmować decyzje zgodne z wizją produktu i celami biznesowymi. Pytanie brzmi: jak to osiągnąć?

W [repozytorium Kenta](https://github.com/kody-hq/kody/tree/main/docs/contributing/decisions) znajduje się dosłownie folder o nazwie **decisions**, który zawiera bardzo proste dokumenty w tym samym formacie, ADR (Architecture Decision Record), z informacją o decyzji podjętej przez Kenta, o kontekście i o powodzie. Wszystkimi tymi plikami zarządzają w całości agenci, ale ich treść pochodzi z interakcji z nim.

![Dwie wyrównane kolumny. Po lewej: folder decisions/ z identycznie sformatowanymi plikami rekordów, a następnie jedna karta rekordu z pięcioma wierszami: Numer · Tytuł · Status · Data, Kontekst, Decyzja, Konsekwencje oraz przerywany wiersz Kryterium wyjścia oznaczony „dodane, z datą”. Po prawej: dla każdego elementu po lewej cienka szara linia prowadzi do czerwonej kropki agenta i pytania, którego agent nie musi już zadawać, wraz z tym, co robi zamiast tego. Na dole: pętla czterech węzłów – właściciel wyjaśnia wybór, agent pisze rekord, następny agent czyta go przed kodowaniem, zmiana pasuje albo nowy rekord zastępuje stary – i z powrotem do początku.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-4/frame.html)

Podobne podejście reprezentuje nasz przyjaciel Matt Pocock, który mówi, że [ADR-y świetnie działają z /grill-with-docs](https://x.com/mattpocockuk/status/2107560148243812772?s=20), skillem pomagającym w podejmowaniu decyzji nie tylko wtedy, gdy pracujemy sami nad projektem, ale także w zespole. Według niego ADR-y pomagają agentom lepiej rozumieć wcześniejsze zmiany i unikać zakłócania pracy innych. Bez ADR-ów agenci często modyfikują, a nawet usuwają funkcje, które zaimplementowano z konkretną intencją, której nie da się wywnioskować z samego kodu.

Z kolei Lauren Tan twierdzi, że [ADR-y u niej się nie sprawdzają](https://x.com/poteto/status/2098214871943033209?s=20), ponieważ zbyt mocno rozpraszają jej agentów. Biorąc pod uwagę skalę jej pracy (ponad 2500 PR-ów miesięcznie), to zrozumiałe, że może mieć inną perspektywę. Warto jednak zbadać [jej podejście](https://x.com/poteto/status/2094457600259842065) i bardzo dobry opis dostępny [tutaj](https://barnabyrobson.org/on-pstack/). Dowiemy się z niego, że jej podejście silnie opiera się na **zasadach**, które zamienia w **trwałe wskazówki** poprzez skille, typy, projektowanie środowiska i samoweryfikację. Unika karmienia agentów rosnącym archiwum dawnych decyzji.

Kolejny przykład pochodzi od Joela Hooksa, który twierdzi, że schematy [Effect](https://effect.website/) i intensywne Domain-Driven Design (DDD) to sposób, w jaki sama baza kodu opisuje kształt produktu. W swoim projekcie opiera się na stosie „CAFE” (Cloudflare, Alchemy, Foldkit i Effect), sugerując, że ma on wiele cech, które czynią go „agent-first”.

Wszystkie te przykłady, choć różne, ujawniają podobne wzorce skoncentrowane na **zwiększaniu autonomii agentów**, dzięki czemu nie tylko zadają mniej pytań, ale też podejmują **lepsze decyzje**.

## Wymagania i dekompozycja

Agenci potrafią wiele robić autonomicznie, ale większość wymagań nadal pochodzi z biznesu i od klientów. Naszym zadaniem jest przełożenie tych danych wejściowych na zakres prac, którymi zajmą się agenci, ponieważ odpowiedzialności nie możemy delegować AI.

Domyślnie, gdy myślimy o delegowaniu zadań technicznych komuś, najbardziej naturalna wydaje się szczegółowa specyfikacja. Ale nie tego szukamy w pracy z agentami AI. Lepszym wyborem byłoby osiągnięcie **porozumienia** określającego **zakres, rezultat, granice i dowód**. AI może nam pomóc także w tym wszystkim!

Aby ukształtować porozumienie, musimy najpierw zebrać jak najwięcej zasobów. Nie dlatego, że chcemy przeczytać je wszystkie, ale dlatego, że chcemy, by nasi agenci mieli więcej kontekstu. W ten sposób możemy wykorzystać nie tylko wiedzę pochodzącą z naszego doświadczenia, ale też wiedzę wykraczającą poza nasze obecne kompetencje. A ten proces nie musi opierać się wyłącznie na rozmowie. Możemy też używać różnych „jednorazowych” interaktywnych dokumentów, a nawet mini-aplikacji, by łatwiej było nam zrozumieć, **co mamy, czego chcemy i czy nasze porozumienie to odzwierciedla**.

**Wizualizacje:**
Od Opus 5.5 modele wykazują wybitną zdolność do przedstawiania kontekstu wizualnie. Jednym z najlepszych przykładów jest skill [Anatomy](https://skills.wheresryan.sh/anatomy), który może nie być aż tak przydatny w naszej pracy, ale doskonale pokazuje, do czego te modele są zdolne. Innym przykładem, który możemy wypróbować, jest [skill **/show-me** od HumanLayer](https://x.com/dexhorthy/status/2087569590268391897?s=20), stworzony specjalnie z myślą o **rozmowach wizualnych** zamiast ścian tekstu.

![Diagram: jeden temat programistyczny, dodanie przycisku „Uruchom skill” na stronie sesji, pokazany na dwa sposoby. Po lewej „Ściana tekstu”: wysoki dymek wiadomości z czerwoną kropką agenta i 14 szarymi liniami, ze strzałką w prawo. Po prawej „Rozmowa wizualna”: sześć kafelków w trzech kolumnach. „Co mamy” zawiera drzewo plików i drzewo wywołań. „Czego chcemy” zawiera pseudokod i szkic interfejsu z akcentowanym przyciskiem „Uruchom skill” i kartą „Wynik skilla”. „Czy porozumienie się zgadza?” zawiera diff z dwiema akcentowanymi liniami „+” i przepływ czterech pudełek. Przerywana pigułka głosi: „Zasada: wybierz najmniejszy widok, który jasno przedstawia sedno.”](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-5/frame.html)

**Porównania:**
Sposobem, by stwierdzić, czy zmiana, którą chcemy wprowadzić, obejmuje wszystko, czego potrzebujemy, jest przedstawienie jej jako **porównania obok siebie**. Porównanie może mieć formę syntetycznych wizualizacji logiki back-endu, **zrzutów ekranu** aplikacji, a nawet rzeczywistych komponentów wygenerowanych z systemu projektowego lub Storybooka. Jeden z przykładów z moich projektów [pokazuje jedną z iteracji](https://cloud.overment.com/settings-1792679861.html) ekranu ustawień aplikacji i został stworzony na podstawie jej **systemu projektowego**, więc komponenty są **interaktywne**.

![Porównanie trzy na trzy jednej zmiany na ekranie ustawień: aplikacja obsługuje teraz klucz API, który dostawca odrzuca. Lewa kolumna nazywa trzy formy: logikę back-endu, zrzut ekranu i komponenty systemu projektowego. Każda forma ma swoje pytanie. Dwie kolumny po prawej porównują „Teraz” i „Proponowane”. Logika back-endu: proponowany handler ma cztery nowe czerwone linie. Sprawdzają klucz u dostawcy i jeśli dostawca go odrzuci, pokazują problem, zostawiają pole otwarte i kończą. Zrzut ekranu: to samo okno Ustawień w skali szarości z wierszami OpenAI, Anthropic i Gemini. W proponowanym oknie wiersz OpenAI ma czerwoną kropkę, tekst „OpenAI nie zaakceptowało klucza.” i pole z czerwonym obrysem „Wklej nowy klucz”. Komponenty systemu projektowego: siatka 2×2 kart stanów. To REST, BRAK KLUCZA i NIE ODPOWIADA oraz pusty przerywany slot. W proponowanej siatce pusty slot zawiera czerwoną przerywaną kartę „KLUCZ ODRZUCONY”. Kursor wskazuje jej pole.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-6/frame.html)

**Grafy i diagramy:**
Rozumowanie na podstawie wielu dokumentów obejmujących szeroki zakres tematów jest łatwiejsze, gdy możemy z łatwością przełączać się między pojęciami wysokiego poziomu a szczegółami niskiego poziomu. Można to osiągnąć za pomocą grafów warstwowych lub ich wariantów, budowanych przez agentów jako strony HTML przechowujące stan, tak by agent mógł go odczytać i szybko zrozumieć nasze bieżące skupienie. Takie struktury najlepiej **projektuje** flota agentów, która wspólnie dopasuje **framework** grafu do typu posiadanych danych. Warto kilka razy iterować nad frameworkiem, aż jego kształt będzie wystarczająco dobry, by użyć go więcej niż raz.

![Przykładowy rysunek. Po lewej: graf bazy kodu o nazwie Alice, pokazany w trzech panelach o rosnącym przybliżeniu. Panel Zakład pokazuje 14 modułów, z zaznaczonym „Desktop host”. Panel Moduł wymienia 14 miejsc Desktop host, z zaznaczonym „Caller factory”. Panel Miejsce pokazuje Caller factory jako okrągły węzeł z 7 połączeniami i 1 krokiem podróży. Każdy panel ma przerywane kopie za sobą dla pozostałych soczewek (Miejsca 88, Prace 457, Podróże 4, Dni 27). Linie wywołań biegną od każdego zaznaczonego elementu do następnego panelu. Strzałka pod panelami prowadzi od pojęć wysokiego poziomu do szczegółów niskiego poziomu. Po prawej: karta stanu strony z fokusem (soczewka Miejsca, przybliżenie miejsce, ścieżka Zakład / Desktop host / Caller factory). Linia łączy kartę z węzłem. Kropka agenta czyta kartę i odpowiada na „Co tego dotyka?” słowami „Caller factory: 7 połączeń, 1 podróż, 26 elementów pracy.” Wszystkie nazwy i liczby są wartościami przykładowymi.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-7/frame.html)

**Laboratorium:**
I wreszcie jest koncepcja **laboratorium**, którym może być pojedynczy plik HTML, samodzielna aplikacja lub osobny moduł aplikacji. Laboratorium różni się od poprzednich form tym, że pozwala dosłownie doświadczyć rezultatów, zachowując przy tym bardzo szybkie iteracje. Laboratorium może też mieć **osadzonych agentów** obsługujących logikę i interakcje w czasie działania. Laboratoria można budować z myślą o podejściu **agent-first**, tak by agenci mogli szybko uzyskiwać z nich informację zwrotną: laboratorium może generować artefakty i być źródłem użytecznego kontekstu.

![Diagram laboratorium. Po lewej: laboratorium może być pojedynczym plikiem HTML (lab.html), samodzielną aplikacją lub modułem aplikacji (/lab). Pośrodku przykładowe okno laboratorium „Laboratorium prywatności kanału”. Panel Scenariusz zawiera zdarzenie „Adam: wizyta u lekarza, 14:00–15:00”, kontrolkę odbiorców z wybranym „Kanał z gośćmi” i kursor na przycisku Uruchom. Panel Wynik pokazuje czterech członków zespołu i dwóch gości, odpowiedź osadzonego agenta „Przegląd przesuwa się na 16:00.”, dwie zaliczone kontrole i „Uruchomienie 14 · 1,4 s”. Lista Uruchomień pokazuje, że uruchomienie 12 nie przeszło („Wspomniano o wizycie”), a uruchomienia 13 i 14 przeszły. Po prawej: linie prowadzą z laboratorium do trzech plików artefaktów (runs/0014.json, transcript.md, screenshot.png), a następnie do karty z wynikami uruchomienia 14, którą czyta agent kodujący. Na dole pętla. Agent kodujący zmienia prompt, laboratorium uruchamia się ponownie w kilka sekund, wypróbowujemy wynik, a agent kodujący czyta artefakty. Scenariusz, odpowiedź, numery uruchomień i czasy są przykładami.](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e02/artifacts/lesson/figure-8/frame.html)

Niezależnie od tego, którego narzędzia użyjemy, celem jest odkrywanie martwych punktów, możliwych przypadków brzegowych, skutków drugiego rzędu (skutków ubocznych zmiany) i ukrytych możliwości. To przybliża nas do myślenia systemowego: **zamiast patrzeć na funkcję lub zgłoszenie w izolacji, chcemy zrozumieć, jak łączy się ono z resztą produktu.** Powyższe narzędzia czynią system widocznym, tak byśmy my i nasi agenci mogli zobaczyć, których części dotyka zmiana i co uruchamia, zanim praca się zacznie.

Samo narzędzie nie wystarcza do wypracowania właściwego porozumienia, zwłaszcza że nie mówimy tu o jednym, kompleksowym planie, ale o **zestawie zadań.** Agent prowadzący otrzyma je i będzie zarządzał pracą innych agentów, by dostarczyć rezultaty.

Możemy też stosować techniki związane z **uogólnionym sterowaniem**, o którym wspomniano w **S01E01**, takie jak **self-querying**, razem z **metapytaniami** i różnymi formami **drzewa myśli**. Innymi słowy, powinniśmy skupić się na znalezieniu sposobów sterowania agentem tak, by jednocześnie ładował bazową wiedzę modelu i eksplorował dostępny kontekst. Na przykład:

- **Oczywiste pytania:** pytajmy agenta o rzeczy, które już znamy, by załadować je do wątku. Następnie poprośmy go o wypisanie modułów / funkcji / pojęć, a potem **uruchommy podagentów**, którzy zagłębią się w nie albo wykonają inną przydatną dla zadania transformację.
- **Parafrazowanie:** włączmy mikrofon i powiedzmy wszystko, co wiemy o tym, co chcemy osiągnąć. Następnie poprośmy agenta, by **sparafrazował to, co właśnie powiedzieliśmy**, i wzbogacił odpowiedź dostępnym kontekstem.
- **Dzielenie i scalanie:** podczas eksploracji kontekstu nie idźmy od razu do końcowego rezultatu. Zamiast tego kierujmy się ku **szerokiej eksploracji**, następnie **ujednolićmy istotne wyniki** i powtórzmy to kilka razy. To forma „drzewa myśli”, którą możemy modyfikować, jak chcemy.
- **Używanie modeli mentalnych:** podczas eksploracji kontekstu poprośmy agenta o użycie modeli mentalnych, takich jak brzytwa Ockhama, myślenie od pierwszych zasad, myślenie drugiego rzędu czy inwersja. Często poprawia to jakość końcowego rezultatu.

Mówiąc prosto, musimy zachować ciekawość i bawić się z agentem, by uzyskać wyniki, z których jesteśmy zadowoleni. A gdy poczujemy się komfortowo z tym procesem i po drodze wyodrębnimy pewne zasady, możemy pozwolić agentom na samodzielną grę (self-play).

## Ewaluacja

Osiągnięcie porozumienia co do zakresu, pożądanego rezultatu i granic to nie wszystko. W rzeczywistości porozumienie jest bezwartościowe, jeśli wyniku nie da się udowodnić bez oszukiwania i bez konieczności przeglądania przez nas każdej pojedynczej zmiany. Musimy więc budować zaufanie, **definiując, jak rezultat zostanie udowodniony**, i dbając o to, by agent miał wszystkie narzędzia i wiedzę potrzebne do jego udowodnienia.

Definiując, jak praca agenta zostanie udowodniona, musimy wziąć pod uwagę:

- **Możliwości modeli:** modele świetnie piszą kod, używają narzędzi i znajdują wzorce w danych multimodalnych. Potrafią też łączyć te zdolności, by testować funkcje w dynamicznych scenariuszach i zbierać dowody swojej pracy w postaci logów, pomiarów, zrzutów ekranu i filmów.
- **Ograniczenia modeli:** modele mają trudności ze szczegółami, śledzeniem wielu zmiennych i instrukcji, zachowaniem spójności i „świadomością” wszystkiego, czego nie ma aktualnie w ich kontekście.
- **Zasoby:** uruchamianie modeli kosztuje pieniądze i czas, a także wymaga sprzętu, jeśli ewaluacja ma zarządzać procesami, kompilacją, sandboxami lub emulacją. Nie leży więc w naszym interesie weryfikowanie wszystkiego, tylko tego, co naprawdę ma znaczenie.
- **Narzędzia, które mamy:** możemy mieć lintery, sprawdzacze typów, kompilatory, testy jednostkowe, środowiska deweloperskie, konta testowe, a nawet dedykowane maszyny, których agenci mogą używać do uruchamiania testów.
- **Narzędzia, których potrzebujemy:** jeśli cokolwiek uniemożliwia agentowi weryfikację własnej pracy, musimy najpierw zaprojektować i wygenerować narzędzia, z których będzie mógł korzystać. Może to obejmować konfigurację środowisk testowych lub nawet maszyn przy użyciu platform takich jak [agentcomputer](https://www.agentcomputer.ai/) czy [Browserbase](http://browserbase.com/).
- **Metryki:** ewaluacja potrzebuje metryk i dowodów, które dokładnie odzwierciedlają rzeczywistość. Na przykład podczas testowania interfejsu analiza zrzutów ekranu przez LLM nie wystarcza, bo model ma trudności z dostrzeganiem szczegółów, więc pomiary trzeba wykonać w kodzie. Także jeśli funkcja wpływa na bazę danych, historia mutacji rekordów może ujawnić potencjalne problemy.
- **Definicja sukcesu:** agent musi wiedzieć, co dla nas oznacza sukces, bo bez tej definicji może pójść za daleko albo nie dość daleko. Dobrymi przykładami zbytniej gorliwości są feature flagi, backfille czy funkcje bezpieczeństwa, które agenci często budują domyślnie, ponieważ nie wiedzą, że w szerszym kontekście produktu są one nieistotne.
- **Definicja porażki:** agent musi wiedzieć, kiedy zebrane dowody, mimo dobrej jakości, powinny zostać uznane za porażkę. To, że często zależy to od kontekstu, utrudnia zgadywanie.

Robienie tego wszystkiego jest trudne i pochłania wiele zasobów, nie tylko na zbudowanie, ale też na powtarzanie. Dlatego część tego procesu musi być poświęcona **wyodrębnianiu uogólnionych narzędzi i skilli**, które można użyć ponownie. Co ważniejsze, **wszystko, co da się zweryfikować deterministycznie**, powinno być obsłużone przez kod, chyba że mamy solidny powód, by zrobić inaczej.

## Najważniejsze wnioski

Dziś przekładanie intencji na pracę agentów nie polega na tym, by dokładnie mówić agentowi, co ma robić, lecz na **rozszerzaniu jego stosu narzędzi i „rozumienia” oraz dostosowywaniu jego środowiska**, przy jednoczesnym **wykorzystaniu wiedzy modelu** i jego natywnych zdolności agentowych.

Robienie tego wszystkiego jest trudne, ponieważ agenci są ograniczeni na wiele sposobów, ich kontakt ze środowiskiem jest ograniczony, a aby wykonać właściwą pracę i wykonać ją dobrze, trzeba wziąć pod uwagę wiele czynników wykraczających poza kod. Co więcej, musimy zarządzać tempem, jakością, skalą, postępem i własną energią.

Patrząc na to, wyraźnie widzimy, że programowanie, jakie znaliśmy, już nie istnieje. Jednocześnie wiele z tych „nowych wyzwań” to wyzwania, które my, inżynierowie, znamy od lat. A gdy spojrzymy na możliwości, jakie otwiera przed nami AI, staje się jasne, że jest dużo pracy do wykonania, wiele wyzwań do podjęcia i barier do pokonania, a stąd właśnie bierze się radość i satysfakcja, które znamy od lat.
