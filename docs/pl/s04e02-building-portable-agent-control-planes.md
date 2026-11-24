# S04E02 · Budowanie przenośnych control plane'ów dla agentów

> **Ta lekcja jest rozszerzona.** Ma dwie części. Ta część zawiera wideo Johna i wyjaśnia zasady przenośnego control plane'u dla agentów. [Build guide](https://hq.mega.dev/lessons/s04e02/build-guide/) to pisemna wersja tego, co John buduje na wideo, krok po kroku, z promptami i sprawdzeniami dla każdego narzędzia. Na tej stronie notatki zaczynające się od „W buildzie Johna” łączą każdą zasadę z jej realizacją w buildzie.

Niezależnie od tego, czy pracujemy z agentami jako użytkownicy, czy projektujemy ich od zera, jedno pozostaje bez zmian: **wszystko się zmienia**, i to szybko. W ciągu ostatnich kilku miesięcy pracowałem z Claude, potem z Pi, a teraz z Grok Botem (który zarządza Pi). Przełączanie się między nimi poszło dość gładko, bo moja konfiguracja nie zależy od harnessu, a wiele ustawień po prostu przestało mieć znaczenie.

Z systemami autonomicznymi jest podobnie, bo musimy być gotowi je dopracowywać, budować od nowa albo **skalować**. Gdy zaczynamy budować, szybko zauważamy, że agenci mogą współdzielić większość logiki, konfiguracji i zasobów. Ale jeśli nie pomyślimy o tym odpowiednio wcześnie, trudno będzie oddzielić to, co specyficzne dla każdego agenta, od tego, co mogą współdzielić. A nawet gdy już to rozdzielimy, każda aktualizacja nadal może być trudna, bo dopóki nie mamy obserwowalności i ewaluacji, nie wiemy, jak zmiana wpłynie na każdego z agentów.

W 3. tygodniu MEGA Kent opowiedział o swoim podejściu do Product Engineeringu i pokazał nam swój projekt, Kody. W skrócie to serwer MCP, który nie tylko udostępnia narzędzia harnessowi. Wnosi całą warstwę możliwości do każdego harnessu, z którym się połączy. To znaczy, że każda integracja, każde ustawienie, pamięć i zasób podróżują razem z Kentem. Jeśli nie zdążyłeś jeszcze przyjrzeć się temu projektowi, omów jego [kod źródłowy](https://github.com/kody-hq/kody) ze swoim agentem. Jest tam wiele pomysłów wartych zapamiętania.

Jeden z nich mówi, że **control plane** to warstwa, która decyduje o tym, **jak pracują agenci**, i pozostaje **oddzielona od samych uruchomień**. Innymi słowy, chodzi o **oddzielenie tego, co definiuje agenta, od miejsca, w którym działa**.

Mając to na uwadze, porozmawiajmy o tym, jak zbudować fundamenty systemu autonomicznego, wychodząc od pierwszych zasad i od tego, czego nauczyliśmy się do tej pory.

## Plan

- Konfiguracja: wykonywalny Markdown, profile, skille, reguły, hooki, narzędzia, listy agentów
- Przenośność: trwałe definicje przepływów pracy z jawnymi adapterami dla różnych harnessów
- Dostarczanie wiedzy: ładowanie kontekstowe, routing, wstrzykiwanie typu push, mapy kodu, dokumentacja
- Operacje: wersjonowanie, inspekcja, ponowne użycie, migracja, rollback, odzyskiwanie oparte na Gicie

## Konfiguracja

Popularne harnessy starają się zapewnić płynne doświadczenie: pomagają agentom nauczyć się, jak z nami pracować, samodzielnie się konfigurować i budować pamięć o nas. Nawet jeśli nie wszystkie z tych funkcji działają dziś tak, jak byśmy sobie wyobrażali, stają się coraz lepsze i w pewnym momencie możemy mieć naprawdę ogólnych agentów. Jeśli nic się nie zmieni, ich możliwości będą w dużej mierze zależeć od aplikacji, usług, urządzeń **i innych agentów**, z którymi się łączą. I tu wkracza konfiguracja.

Konfiguracja może tu znaczyć różne rzeczy. Część z nas będzie chciała budować przepływy pracy na bazie istniejących agentów, a inni będą chcieli dostosować praktycznie każdy poziom systemu. W **S01E02** omawialiśmy **personalizację harnessu**, co może wciąż brzmieć znajomo. Ale tutaj mówimy nie tylko o tym, jak pracujemy z agentami kodującymi, lecz także o tym, jak konfigurujemy systemy autonomiczne wokół siebie, produktu albo całej firmy.

Patrząc na to, czego dotąd się nauczyliśmy, możemy rozważyć kilka strategii konfiguracji:

- **Osoba:** nasze integracje, pamięć i ustawienia są w jednym miejscu i każdy harness może z nich korzystać. Tak jak w Kody Kenta.
- **Projekt:** zadanie agenta, jego reguły i testy są w folderze i agenci każdego z nas mogą z nich korzystać. Tak jak role Johna.
- **Usługa:** wszystkim zarządza osobny agent, który działa cały czas na serwerze. Tak jak w przykładzie ze Specterem z **S04E01**. W tej strategii nic się nie przenosi.
- **Pakiet:** skille i rozszerzenia są udostępniane przez `npx skills`, więc każdy może je zainstalować i dostawać aktualizacje.

Żeby było jasne: nie zawsze wybieramy **między** tymi strategiami, bo możemy chcieć je łączyć. Na przykład agent zdefiniowany w folderze projektu może używać zainstalowanych skilli i łączyć się z naszymi serwerami MCP.

![Cztery strategie konfiguracji agentów, obok siebie w czterech kolumnach o tym samym kształcie. Osoba: nasze integracje, pamięć i ustawienia w jednym miejscu; osoba trzyma warstwę, do której podłączają się trzy pudełka harnessów; jak Kody. Projekt: zadanie agenta, reguły i testy w folderze; pudełka harnessów dwojga członków zespołu czytają ten sam folder w repozytorium; jak role Johna. Usługa: jeden agent, który działa cały czas na serwerze; działający serwer, z którym cienkimi liniami połączone są trzy pudełka harnessów; nic się nie przenosi; jak Specter. Pakiet: skille i rozszerzenia, które każdy może zainstalować; stos pakietów z etykietą wersji i znakiem odświeżenia wysyła strzałki do trzech pudełek harnessów; jak npx skills.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-1/frame.html)

Liczą się tu **skille**, **CLI**, **MCP**, **agenci w chmurze** i **A2A**, i liczą się razem, a nie osobno. Do gry wchodzi wszystko, o czym mówiliśmy: **personalizacja harnessu**, **projektowanie skilli**, **wykonywalny Markdown**, **code mode**, **przenoszenie agentów na zdalne maszyny**, **kontrola** i **bezpieczeństwo**.

Zastanówmy się, jak mogłaby wyglądać konfiguracja dla inżynierów takich jak my. Nasze konteksty mogą się różnić, więc dla uproszczenia załóżmy, że pracujemy nad kilkoma prywatnymi projektami i mamy paru klientów. Zatem:

- Wszyscy mamy agentów połączonych z naszymi prywatnymi kontami, przynajmniej w minimalnej formie: kalendarz, e-mail, lista zadań, notatki, repozytoria, bazy wiedzy i osobiste skille.
- Każdy projekt ma własne zasoby, wymaga połączeń z określonymi kontami, usługami i serwerami i może mieć własną bazę wiedzy, w repozytorium albo poza nim. W niektórych przypadkach możemy mieć prawo korzystać tylko z tych dostawców AI, których zatwierdzi klient.
- Prędzej czy później wielu naszych agentów przeniesie się do chmury, gdzie będą obserwować projekty, zajmować się powtarzalnymi czynnościami albo pomagać nam w sprawach osobistych. Ci agenci nie mogą mieszać projektów różnych klientów, a to wymaga twardych granic.
- I wreszcie żadne sekrety, połączenia, serwery, konta, raporty ani wiedza nie mogą nigdy wyciec do innego klienta ani na zewnątrz.

W praktyce bardzo trudno tym wszystkim zarządzać. Przed AI większość z tych aspektów nie miała aż takiego znaczenia, bo zajmowaliśmy się nimi bezpośrednio, często na niewielkiej liczbie maszyn. Ale teraz, gdy pracujemy z agentami, wszystko to musi być porządnie zorganizowane. Powodem nie jest tylko bezpieczeństwo (choć ono powinno być priorytetem). Bez porządku, w miarę jak będziemy skalować naszą konfigurację, więcej czasu spędzimy na walce z nią niż na pracy nad właściwym projektem.

![Uporządkowana konfiguracja agentów. Pas Osoba u góry wysyła strzałkę w dół do każdej z trzech kolumn, a każda strzałka ma etykietę „tylko narzędzia i preferencje”. Pasek Pakiet po lewej wysyła strzałki z etykietą „zainstalowane” do każdej kolumny, wzdłuż jednej linii nad kolumnami. Trzy kolumny to Prywatne (nasze własne projekty i konta), Klient A i Klient B. Każda kolumna zawiera te same trzy elementy: Projekt (repozytoria, reguły, role, wiedza), Usługa (agenci w tle tylko dla tego kontekstu) i Środowisko (sekrety, konta, serwery, zatwierdzeni dostawcy AI). Tylko Prywatne dodaje „kalendarz, e-mail, notatki” pod swoim Środowiskiem. Dwie grube czerwone ściany z etykietą „bez przejścia” oddzielają kolumny. Pas Control plane u dołu, z napisami „mapa tego, co istnieje i gdzie” oraz „reguły w kodzie: co się ładuje w każdym kontekście”, wysyła strzałkę w górę do każdej kolumny.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-2/frame.html)

Jak już mówiliśmy, takimi konfiguracjami zarządzają agenci. Ale to my mówimy im, co trzeba zrobić i dlaczego. Gdy zadbamy o fundamenty, łatwiej będzie wszystko skalować. A nawet jeśli mamy już dziś jakąś konfigurację, agenci mogą ją dla nas przeskanować i zwizualizować, żebyśmy mogli zdecydować, czy coś zmienić. Możemy tu rozważyć:

- **Profile:** Prawie każdy harness oferuje ustawienia profili, które sam harness może łatwo skonfigurować. Obejmują modele, uprawnienia, połączenia MCP, skille oraz pluginy i rozszerzenia.
- **Kontekst globalny:** Powinniśmy mieć notatki, które pomagają agentom poruszać się po całym systemie, łącznie z naszym urządzeniem, zdalnymi serwerami i wszystkimi usługami. Tych notatek nie pisze się tylko raz. Trzeba je też aktualizować, na przykład o to, czego uczymy się w sesjach z agentami.
- **Obserwowalność:** Platformy takie jak Langfuse można zintegrować nie tylko z naszymi własnymi agentami, ale też z agentami kodującymi. Podłączenie takiej platformy w całym zespole może pomóc nam zrozumieć, jak pracujemy z agentami, i wyciągać z tego wnioski, a także utrzymywać konfiguracje w aktualnym stanie.
- **Zdalny system plików:** Mówiliśmy o tym już wcześniej. Nasza globalna konfiguracja powinna być w osobnym repozytorium i zawierać cały kontekst, którego agenci potrzebują, żeby skonfigurować się na nowych maszynach.
- **Sandbox:** Sandboxy ([sbx](https://www.docker.com/products/docker-sandboxes/) / [boat](https://boat.dev/)) można traktować jako ustawienie domyślne, ale zawsze musimy pamiętać, że często nie powstrzymają agenta przed odbieraniem albo wysyłaniem informacji ani przed wykonywaniem niepożądanych akcji. Może to brzmieć oczywiście, ale często się o tym zapomina.
- **Sekrety:** Jak wspomnieliśmy w 3. tygodniu, agenci muszą mieć ograniczony dostęp do usług i nigdy nie dotykać naszych sekretów. Trzymanie sekretów w plikach .env często nie jest wystarczająco bezpieczne, nawet jeśli reguły uprawnień zabraniają ich czytania, bo agenci łatwo znajdują obejścia.

Mogą też istnieć aspekty specyficzne dla projektu albo organizacji, o których musimy pamiętać. Ale to wszystko powinno dać nam właściwe rozumienie tego, jak organizować konfiguracje. Najważniejsze jest to, że potrzebujemy tego wszystkiego, żeby łatwo **uruchamiać nowych agentów**.

**W buildzie Johna:** widgety i agenci korzystają ze strategii Projekt z tej sekcji. Każdy z nich to folder w repozytorium: `widgets/issues/` zawiera instrukcje i oczekiwania widgetu Issues, a `rules.md` zawiera reguły pracy nad issue. Widget Memories utrzymuje globalny kontekst projektu w aktualnym stanie. Proponuje regułę, my klikamy Keep, a on zapisuje jedną linię w `MEMORIES.md`, do którego `AGENTS.md` linkuje w każdej nowej rozmowie. Zobacz [Widgets](https://hq.mega.dev/lessons/s04e02/build-guide/#widgets).

## Przenośność

O automatyzacji warto wiedzieć jedno: **jeśli raz zrobimy ją dobrze, możemy ją uruchomić wszędzie i tyle razy, ile potrzebujemy.** Brzmi to oczywiście, ale cała trudność polega na tym, żeby **zrobić ją dobrze**. Jeśli choćby jeden ruchomy element za każdym razem trzeba ręcznie poprawić, pojawia się tarcie. Część z tego znamy już z narzędzi takich jak Docker czy Kubernetes, gdzie środowisko deklaruje się raz, a potem odbudowuje się je za każdym razem tak samo.

Systemy autonomiczne można budować na wiele sposobów i na razie nie ma uniwersalnego sposobu, żeby uczynić je przenośnymi i zarządzać nimi na wielu urządzeniach. Najlepsze, co możemy zrobić, to **skonfigurować system na zdalnym urządzeniu**, a potem **poprosić go**, żeby sklonował się na inne. Jeśli to się uda, klon powinien wykonać to samo zadanie i uzyskać ten sam wynik, bez ręcznych kroków. Następny krok to **uruchomienie kilku zadań równolegle** i sprawdzenie, czy coś pójdzie nie tak.

Przy moich osobistych agentach trzymam się bardzo prostej zasady: **wszystko jest po prostu folderem**. Warto zaznaczyć, że **jestem jedynym użytkownikiem**, ale **agenci działają równolegle**. Co więcej, prawie cała praca w tle odbywa się w chmurze, więc wszystko pozostaje zsynchronizowane, niezależnie od tego, gdzie praca jest wykonywana. Ilustracja poniżej pokazuje architekturę i to, jak **prymitywy** i **agenci w chmurze** działają razem.

![System agentów jako jeden folder w trzech kopiach. Pośrodku jest Chmura, która zawsze działa i porządkuje każdą zmianę. Po lewej jest Komputer stacjonarny, a po prawej Laptop, i każdy z nich działa offline. Każde z trzech miejsc ma tę samą ikonę folderu z etykietą „pełna kopia”. Dwukierunkowa linia „synchronizacja” łączy Komputer stacjonarny z Chmurą, a druga łączy Laptop z Chmurą. Żadna linia nie łączy Komputera stacjonarnego z Laptopem. Nad Chmurą Web i Telefon komunikują się z kopią w chmurze. Nad miejscami jest rząd pasków rozmów: dwa nad Komputerem stacjonarnym, cztery nad Chmurą i jeden nad Laptopem. Zakrzywiona strzałka prowadzi od Telefonu do paska nad Komputerem stacjonarnym, bo wiadomość jest przekazywana tam, gdzie toczy się rozmowa. Pod Chmurą ramka „Co się synchronizuje” wymienia agentów, skille i dokumenty, załączniki, historię rozmów, wspólne preferencje i harmonogramy oraz klucze, które są zaszyfrowane i trzymane poza folderem. Pod Komputerem stacjonarnym i pod Laptopem ramka „Zostaje tutaj” wymienia pracę, która właśnie trwa, uprawnienia dla tej maszyny i indeksy, które są odbudowywane z folderu. Notatka mówi, że przy konflikcie zostają obie wersje, więc nic nie ginie. Liczba pasków jest tylko przykładowa.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-3/frame.html)

Ten system współdzieli też **jądro agenta**, które działa albo bezpośrednio na urządzeniu, albo w chmurze. Ponieważ agent jest niedeterministyczny, nie będzie działał **dokładnie** tak samo wszędzie, ale jego podstawowe zachowanie jest wspólne dla wszystkich środowisk. A nawet gdyby to nie było możliwe, nadal mielibyśmy **foldery**, którymi może zarządzać dowolny agent.

![Diagram z kolumną etykiet wierszy po lewej i dwiema kolumnami: Lokalnie (komputer stacjonarny) i Chmura (zawsze włączona). U góry wyciszona linia mówi, że każde okno to tylko widok środowiska uruchomieniowego: ikona aplikacji jest nad kolumną Lokalnie, a ikony weba i telefonu nad kolumną Chmura. Wiersz Folder, taki sam w obu miejscach: każda kolumna ma tę samą ikonę folderu z agentami, skillami, regułami i historią, a jedna czerwona linia z etykietą „utrzymywane w synchronizacji” łączy oba foldery. Wiersz Środowisko uruchomieniowe, takie samo w obu miejscach: każda kolumna ma jedno czerwone zaokrąglone pole z trzema krokami: przeczytaj folder, uruchom agentów, sprawdź każdą akcję. Strzałka z etykietą „na świeżo przy każdym uruchomieniu” prowadzi od każdego folderu do kroku „przeczytaj folder”. Wiersz Dostarczane przez to miejsce, różne w każdym miejscu: Lokalnie wymienia sekrety w bezpiecznym magazynie samego urządzenia, uprawnienia dla tego urządzenia, pracę offline i pracę, która trwa tu teraz. Chmura wymienia sekrety w zaszyfrowanym magazynie, dostęp do zasobów lokalnych tylko przez urządzenie, działanie, gdy urządzenie śpi, i pracę, która trwa tu teraz. Żadna linia nie łączy tych dwóch list.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-4/frame.html)

Nawet jeśli dziś taka konfiguracja działa tylko dla jednego użytkownika, można ją rozszerzyć na cały zespół. Potrzebny byłby do tego **wspólny folder** z możliwościami i zasobami oraz jakieś polityki dostępu. Każda osoba nadal miałaby własne rozmowy, pamięć i sekrety (do sekretów można by sięgać przez menedżer haseł zespołu).

![Konfiguracja zespołowa zbudowana na osobistych systemach agentów. U góry pas z etykietą „Warstwa zespołu” (wspólne pliki, czytane przez wszystkich) zawiera agentów, skille, skrypty, wiedzę, deklaracje usług i limity. Notatka nad nim mówi: limity: zespół ustala górną granicę; zachowanie: każda osoba może dodawać albo nadpisywać. Pole „Review” na prawym końcu pasa (każda zmiana jest zatwierdzana) ma krótką strzałkę do pasa. Poniżej są trzy równe kolumny: Osoba 1, Osoba 2 i Osoba 3. Każda ma Warstwę osobistą (własni agenci, skille i preferencje), pole Środowisko uruchomieniowe (czyta obie warstwy przy każdym uruchomieniu) i Warstwę prywatną (rozmowy, pamięć, sekrety). Czerwona strzałka z etykietą „czytane przy każdym uruchomieniu” prowadzi od Warstwy zespołu do każdego Środowiska uruchomieniowego, a krótka szara strzałka prowadzi od każdej Warstwy osobistej do jej Środowiska uruchomieniowego. Przerywana strzałka z etykietą „zaproponuj zmianę” prowadzi od Osoby 3 w górę do Review. Dwie grube ściany z etykietą „nigdy niewspółdzielone” stoją między Warstwami prywatnymi. Pod Osobą 2 notatka mówi: łączy usługę z własnymi danymi logowania.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-5/frame.html)

Żeby było jasne: **nie twierdzę, że to najlepsze możliwe podejście**, bo wciąż niesie wiele wyzwań, takich jak problemy z synchronizacją. Ale wiele z tych pomysłów można przenieść do innych systemów, także do agentów kodujących.

Jedną rzecz warto mieć na uwadze: **przenośność** jest możliwa tylko w niektórych częściach naszego systemu. Na przykład:

- **Agenci w tle** mogą się w pełni skalować i możemy całkowicie zautomatyzować ich wdrażanie. Jednocześnie możesz ograniczyć ich kontakt z użytkownikami i zawęzić ich do akcji niedestrukcyjnych, takich jak research, raportowanie, testowanie czy monitoring.
- **Wewnętrzny MCP / CLI:** zamiast podłączać każdy serwer MCP albo konto CLI osobno, możemy zbudować wewnętrzny serwer MCP dostępny tylko dla naszego zespołu albo naszych klientów. Dawałby im dostęp do określonych zasobów i akcji.
- **Agenci przez MCP:** Model Context Protocol pozwala nam współpracować z agentami, którzy oferują kontrolowany dostęp do określonych akcji albo wiedzy.
- **Konfiguracjami osobistymi** nadal mogą zarządzać członkowie zespołu.

W skrócie przenośność oznacza **wydzielenie wspólnych komponentów**, żeby można było zarządzać nimi w jednym miejscu i rozprowadzać je do agentów, członków zespołu i klientów. Zauważ też, że Kent był w stanie rozwiązać prawie wszystkie te problemy, po prostu **używając MCP jako warstwy możliwości**.

**W buildzie Johna:** przenośność pojawia się w małej skali. Każde narzędzie jest opisane przez możliwość, której potrzebuje, a nie przez produkt: widget potrzebuje powierzchni, źródła, wywołania modelu i akcji. Pi i Herdr to jeden przykład z etykietą, a listy zatytułowane „If something is missing” podają zamiennik dla innego harnessu albo workspace'u. Jego build nie obejmuje agentów w chmurze ani klonowania systemu na inne urządzenie. Zobacz [Widgets](https://hq.mega.dev/lessons/s04e02/build-guide/#widgets).

## Dostarczanie wiedzy

Wszyscy agenci, którzy dla nas pracują, potrzebują dostępu do najnowszych danych i aktualnej konfiguracji. Gdy pracujemy z agentami bezpośrednio, sami o to wszystko dbamy. W przypadku agentów w tle potrzebujemy systematycznego podejścia, nie tylko do wdrażania, ale też do **utrzymywania ich konfiguracji w aktualnym stanie**.

Zachowanie agenta można całkowicie zmienić bez modyfikowania jego kodu, po prostu dając mu inny **kontekst i narzędzia**. Już sam ten fakt sprawia, że dostarczanie wiedzy jest jednym z najważniejszych aspektów systemów autonomicznych.

Jedno z podejść to oprzeć się na **MCP jako warstwie możliwości**, jak wspomnieliśmy wyżej. W praktyce oznacza to zbudowanie osobnej aplikacji, do użytku wewnętrznego albo jako usługi w naszym produkcie. Ta aplikacja skupia się całkowicie **na agentach** i komunikuje się z nimi przez serwer MCP. Co jeszcze ciekawsze, sama może też działać jako MCP Host. W efekcie ten jeden serwer MCP może połączyć nas z wieloma innymi!

Poniżej jest ogólny przegląd idei stojącej za Kody Kenta, która sprowadza się właśnie do tego. Kent po prostu zbudował **uogólnioną aplikację** na przemyślanych prymitywach, dzięki czemu może się ona dynamicznie dostosowywać do wielu scenariuszy, a jej struktura pozostaje stosunkowo lekka. W praktyce cała integracja sprowadza się do podłączenia **jednego serwera MCP**, który w pełni aktualizuje harness dowolnego rodzaju.

![Trzy kolumny na jednej linii środkowej. Po lewej trzej agenci (agent kodujący w dowolnym harnessie, własna aplikacja z naszym interfejsem, agent w tle działający według harmonogramu) mają linie, które łączą się w jedno połączenie z serwerem MCP zbudowanym dla agentów. Ramka serwera zawiera dwa narzędzia: search (znajdź, co istnieje), a potem run (użyj tego w kodzie). Zaznacza, że kontekst agenta pozostaje mały. Linia prowadzi od run do ramki Możliwości, która zawiera cztery rodzaje możliwości: skrypty, zbudowane raz i używane wielokrotnie; integracje, do których użytkownik loguje się raz; pamięć, przywoływaną, gdy jest istotna; oraz harmonogramy, które działają bez modelu. Spod ramki Możliwości linie prowadzą do innych serwerów MCP i usług zewnętrznych, do których dociera się przez serwer. Nad nią wyróżniona nowa możliwość trafia do ramki i od razu staje się dostępna dla każdego agenta.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-6/frame.html)

Jak pokazuje diagram, wszyscy agenci używają tylko dwóch narzędzi do pracy z możliwościami takimi jak **pamięć, harmonogramy, integracje i skrypty**. To oznacza, że wszystko, co zmieni jeden agent, jest natychmiast dostępne dla pozostałych agentów, **ale** muszą oni wiedzieć o tych zmianach albo przynajmniej być skonfigurowani tak, żeby przed każdą akcją zawsze sięgać po aktualną wiedzę.

Poza tym taki serwer MCP opiera się na natywnych funkcjach harnessu i na modelach, które ten udostępnia. To znaczy, że za każdym razem, gdy harness dostaje aktualizację albo wychodzą nowsze modele, cała nasza konfiguracja staje się lepsza, a my nie musimy niczego zmieniać po swojej stronie. To świetny przykład **opierania się na natywnych możliwościach** środowiska i **elastycznej architektury opartej na prymitywach**. I Kent nie jest jedynym, który stosuje to podejście. Pojawia się ono też we [wpisie na blogu Ubera](https://www.uber.com/gb/en/blog/designing-mcp-gateway/) o ich gatewayu dla wewnętrznych agentów, co sugeruje, że dobrze się skaluje w organizacjach. Zanim zbudujemy własny gateway od zera, warto sprawdzić, czy [Executor](https://executor.sh/#build) nie spełnia naszych potrzeb.

**W buildzie Johna:** wysłanie issue do głównej rozmowy to dostarczanie wiedzy w praktyce. Mały model planuje, których zbieraczy uruchomić. Zbieracze czytają potem równolegle kod i testy, historię, powiązane issue, aktualizacje pakietów i wcześniejsze rozmowy. Główna rozmowa dostaje w jednym prompcie issue, brief, w którym każda linia podaje swoje źródło, oraz nasze reguły. Kontekst jest wypychany w chwili, gdy jest potrzebny, więc główna rozmowa nie musi go szukać. Zobacz [From Issue to Work](https://hq.mega.dev/lessons/s04e02/build-guide/#from-issue-to-work).

## Operacje

Gdy wielu agentów pracuje razem, zwłaszcza na wspólnych zasobach i możliwościach, istnieje duża szansa na zdublowaną pracę, nadpisaną pracę i inne rodzaje konfliktów. Wszystko to dzieje się już w naszej codziennej pracy, nawet bez AI. Tym razem wyzwanie polega na tym, żeby agenci radzili sobie z tym prawie całkowicie sami.

Wiemy już, że systemy autonomiczne wymagają **szczegółowej obserwowalności**, bo większość ich aktywności odbywa się w czasie działania i nie da się jej śledzić samym czytaniem kodu. A ponieważ wielu agentów może korzystać z tego samego zasobu, musimy też zadbać o claimy, izolację, wersjonowanie, rollbacki i odzyskiwanie. Większość tych problemów agenci potrafią rozwiązać natywnie, ale przy niektórych będą potrzebować skilli, które powiedzą im, co wziąć pod uwagę, żeby mogli podejmować dobre decyzje.

Żeby obserwowalność była w tym przypadku użyteczna, musi rejestrować nie tylko **co się stało**, ale też **jaka była wtedy konfiguracja** i **dlaczego została zmieniona**. Jest to szczególnie ważne w systemach samoewoluujących, gdzie agenci mogą modyfikować własne ustawienia i rozszerzać swoje możliwości (choć nie powinni móc poszerzać swoich uprawnień bez potwierdzenia od użytkownika).

W praktyce każde uruchomienie powinno zapisywać wersję konfiguracji i jej **hash treści**, użyty model i narzędzia oraz to, kto je uruchomił. Każda zmiana powinna zapisywać, kto ją wprowadził, dlaczego, kiedy oraz hash przed i po.

![Oś czasu z trzema torami: Agent A, Agent B i Konfiguracja. Czas biegnie od lewej do prawej. Agent A startuje pierwszy i zakłada claim na wspólny plik. W tym samym czasie Agent B czeka na claim. Pionowa linia oznacza moment zwolnienia claimu i tam zaczyna się uruchomienie Agenta B. Pod każdym uruchomieniem karta zapisuje, co się stało, wersję konfiguracji z jej hashem, użyty model i narzędzia, kto i kiedy je uruchomił oraz wynik. Drugie uruchomienie Agenta A zmienia konfigurację na wersję 2. Notatka pod wersją 2 zapisuje, kto ją zmienił, dlaczego (powtarzająca się awaria), poprzedni i nowy hash oraz kiedy. Późniejsze uruchomienie Agenta B używa wersji 2. Następnie proponuje szersze uprawnienia, które czekają na użytkownika.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-7/frame.html)

Ponieważ agenci będą mieli dostęp do danych obserwowalności ze wszystkimi tymi szczegółami, zobaczą pełny kontekst, a nie tylko przyczynę albo uproszczony ślad. Jednocześnie musimy zastanowić się, czy będą potrzebować jeszcze innych informacji, żeby lepiej zrozumieć, co się stało i co zrobić dalej. Na przykład: gdy agenci modyfikują ten sam plik, jaką logiką powinni się kierować, żeby rozwiązać konflikt? Odpowiedź często przyjdzie ze skilli dostępnych dla danego agenta, takich jak „**sędzia**”: agent, który specjalizuje się wyłącznie w rozwiązywaniu problemów systemu.

Ale wszędzie, gdzie to możliwe, operacje powinna chronić logika deterministyczna, na przykład **claimy z leasem**, które **blokują dany wątek** albo **zasób**, dopóki praca trwa, i zwalniają go, gdy tylko praca się zakończy albo nie powiedzie. System powinien też obsługiwać przypadki, w których agent po prostu umiera albo z jakiegoś powodu się zawiesza. I wreszcie wszystkie modyfikacje, a nawet wykonane akcje, powinny być odwracalne. Tu możemy chcieć oprzeć się na rozwiązaniach, które dają to od razu, takich jak historia Gita. A akcje, których nie da się cofnąć, jak wysłanie e-maila, powinny przynajmniej nigdy nie wykonać się dwa razy.

![Dwa pasy. Górny pas, „Decyduje kod” (deterministyczny, zawsze włączony), ma trzy panele. „Claim z leasem”: claim, pełny pasek pracy, a potem zwolnienie, oznaczone jako zakończone albo nieudane; jeden agent naraz na wątek albo zasób. „Agent umiera albo się zawiesza”: pasek pracy urywa się wcześniej i staje się kropkowany (brak odpowiedzi), zegar pokazuje, że lease wygasa, a zasób zostaje zwolniony dla następnego agenta. „Odwracalne albo jednorazowe”: zmiana to nowa wersja, którą można cofnąć; akcja jest wysyłana z kluczem i wykonuje się tylko raz. Dolny pas, „Decyduje agent”: konflikt trafia do agenta-sędziego, który korzysta z pełnego śladu i skilli, a rozwiązanie i tak zakłada claim.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-8/frame.html)

Nie ma wątpliwości, przynajmniej na razie, że to do nas należy ustalenie, jak zastosować to wszystko w naszym przypadku. Nie mówię o implementacji technicznej, bo z nią agenci dziś łatwo sobie radzą. Chodzi raczej o decyzję, **jaka architektura** i **jakie mechanizmy** są przydatne w projekcie, nad którym pracujemy.

Gdy myślimy o tym, jak działają wieloagentowe systemy autonomiczne, dobrym źródłem inspiracji jest projekt **[AgentFS](https://www.agentfs.ai/)**. W chwili pisania jest w fazie beta, więc najlepiej traktować go jako źródło pomysłów do własnych implementacji albo do eksperymentów. W skrócie to **system plików dla agentów działający w sandboxie**. Zmiany z każdej sesji są zapisywane w jednym pliku SQLite, oddzielnie od naszych prawdziwych plików (jak wirtualny system plików). Dzięki temu możemy przejrzeć zmiany, cofnąć je, zforkować albo zastosować tylko te, których chcemy. A ponieważ wszystkie zmiany są w jednej bazie danych, od razu są przenośne i łatwe do obserwowania. Co więcej, taka konfiguracja zapewnia wyraźną izolację każdego agenta z opcją dzielenia się informacjami z innymi agentami.

![Diagram systemu plików dla agentów działającego w sandboxie. Po lewej agent, który pracuje jak zwykle i używa dowolnego narzędzia, czyta i zapisuje przez jedną dwukierunkową linię do ramki z trzema warstwami ułożonymi jedna na drugiej: to, co widzi agent (projekt z jego zmianami), warstwa zmian (każdy zapis trafia tutaj i jest przechowywany jako jeden plik) i prawdziwy projekt (tylko do odczytu, nigdy nieruszany). Wewnątrz ramki zapisy idą w dół od górnej warstwy do warstwy zmian, a odczyty tego, co się nie zmieniło, idą w górę od prawdziwego projektu. Po prawej warstwa zmian łączy się z czterema akcjami: Przejrzyj, Cofnij, Zforkuj i Zastosuj. Od Zastosuj strzałka przenosi zaakceptowane zmiany z powrotem do prawdziwego projektu.](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e02/artifacts/lesson/figure-9/frame.html)

Podobnie jak koncepcja „MCP jako warstwy możliwości”, to prosty i elastyczny pomysł: trzymanie **przestrzeni roboczej agenta jako pliku SQLite**. To podejście bez wątpienia ma wady i zostawia część problemów nierozwiązanych (takich jak konflikty czy izolowanie wywołań sieciowych). Jednocześnie proponuje konkretny sposób myślenia, który przydaje się przy projektowaniu systemów autonomicznych. Uogólnia problem wystarczająco dobrze i proponuje rozwiązanie, które w najprostszy możliwy sposób adresuje większość problemów.

**W buildzie Johna:** pojawia się jeden pomysł z tej sekcji: zmiana konfiguracji agenta jest zapisywana razem z jej efektem. Pętla hill climbingu zmienia jedną rzecz w instrukcjach widgetu, uruchamia to samo sprawdzenie na zapisanej próbce i zachowuje zmianę tylko wtedy, gdy mniej linii nie przechodzi. Każda zmiana jest pokazana z liczbą błędów przed i po. Jego build nie ma claimów, leasów ani cofania akcji, więc dla nich naszymi przykładami pozostają Git i AgentFS. Zobacz [The Issues Widget](https://hq.mega.dev/lessons/s04e02/build-guide/#the-issues-widget).

## Najważniejsze wnioski

Budowanie systemów autonomicznych i przepływów pracy sprowadza się do **projektowania logiki, która dobrze się skaluje**. Wymaga to szerokiego zrozumienia projektowania systemów oraz mechaniki stojącej za agentami i generatywną AI w ogóle. Wszystko to musi być osadzone w prawdziwych potrzebach biznesowych i uwzględniać kontekst użytkownika. Innymi słowy, to nie jest proste zadanie, nawet dla doświadczonego inżyniera. Ale perspektywa bardzo się zmienia w chwili, gdy mamy AI po swojej stronie, bo agenci mogą zająć się większością implementacji i wieloma decyzjami.

W tym momencie warto wrócić do pierwszych dwóch tygodni MEGA i razem z naszym agentem wybrać coś małego, na przykład „inteligentny cron job” albo prosty serwer MCP, czego użyjemy w więcej niż jednym środowisku. To ujawni wszystkie problemy i zacznie przestawiać nasze myślenie w stronę systemów autonomicznych, a jednocześnie da wartość w naszym życiu prywatnym, w naszym przepływie pracy przy kodowaniu albo w produktach, nad którymi pracujemy.
