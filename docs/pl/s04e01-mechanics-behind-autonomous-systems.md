# S04E01 · Mechanika systemów autonomicznych

> **Ta lekcja jest rozszerzona.** Ma dwie części. Ta część zawiera wideo Johna i wyjaśnia zasady systemów autonomicznych. [Build guide](https://hq.mega.dev/lessons/s04e01/build-guide/) to pisemna wersja tego, co John buduje w wideo, krok po kroku, z promptami i sprawdzeniami dla każdego narzędzia. Na tej stronie notatki, które zaczynają się od „W tym, co buduje John”, łączą każdą zasadę z tym, jak John ją buduje.

Systemy autonomiczne otwierają wiele nowych możliwości i stawiają przed nami nowe wyzwania inżynierskie. Z perspektywy inżynierii są zbudowane niemal z tych samych klocków co każde inne oprogramowanie. Różni się tylko jeden komponent: **„inteligencja”** w postaci modelu językowego, modelu decyzyjnego albo czegoś podobnego. Już samo to zmusza nas do przemyślenia na nowo wielu aspektów inżynierii oprogramowania. Na przykład naszym zadaniem nie jest już budowanie funkcji, tylko zbudowanie systemu, który potrafi je zbudować sam.

W nadchodzącym tygodniu John pokaże krok po kroku, jak zbudować fabrykę oprogramowania. W lekcjach przyjrzymy się bliżej zasadom, mechanice i narzędziom, które warto wziąć pod uwagę przy budowaniu autonomicznego oprogramowania, czy to będzie fabryka oprogramowania, osobisty agent, czy gotowy na produkcję system agentowy.

Zanim zaczniemy, warto pamiętać o jednej rzeczy. To pytanie: **jaki system autonomiczny mógłbym zbudować dla siebie?** To ważne, bo prawdopodobnie nie ma lepszego sposobu nauki niż budowanie rzeczy dla siebie. Będziemy ich używać codziennie, zobaczymy, gdzie zawodzą, i ustalimy, jak zrobić je dobrze. Te doświadczenia możemy potem wykorzystać przy budowaniu systemów produkcyjnych, bo nawet jeśli nie znamy wszystkich odpowiedzi, będziemy wiedzieć, „gdzie szukać” tego, czego potrzebujemy.

## Plan

- Autonomia: poziomy nadzoru, ograniczona niezależność, zachowanie proaktywne, kalibracja zaufania
- Runtime: zdarzenia, wyzwalacze, joby, kolejki, harmonogramy, heartbeaty, długo działające pętle
- Stan: trwałe sesje, checkpointy, wspólny stan, ciągłość między uruchomieniami
- Kontrola: uprawnienia, budżety, bramki zatwierdzeń, anulowanie, eskalacja, interwencja użytkownika
- Obserwacja i odzyskiwanie: postęp, trace'y, koszty, awarie, retry, rollbacki, naprawy

## Autonomia

Większość oprogramowania potrafi działać bez nadzoru i niezawodnie wykonywać swoje zadanie. Autonomia, o której chcemy teraz mówić, jest inna. Chodzi o oprogramowanie, które **potrafi wykonywać zadania, do których nie zostało zaprojektowane**, dostosowywać się do zmieniającego się środowiska, podnosić się nawet po krytycznych błędach i ewoluować. W takim przypadku nie da się przewidzieć każdego możliwego scenariusza. Co więcej, rdzeń jego logiki opiera się na systemach niedeterministycznych, które, jak wiemy, mogą wykonać dokładnie to samo zadanie na wiele różnych sposobów, bez jasnego wyjaśnienia. Zupełnie nie przypomina to systemów produkcyjnych, które budujemy na co dzień.

Ale jak pokazał **S02E05**, da się tak wyważyć logikę, żeby system był użyteczny, wydajny i bezpieczny, a przy tym elastyczny. Warto jednak uważać, bo jako programiści domyślnie myślimy w sposób (niekoniecznie błędny), który może nas szybko poprowadzić w stronę ścisłych reguł i guardraili.

Projektując autonomiczne oprogramowanie, powinniśmy stawiać sobie za cel **pełną autonomię**. Nie dlatego, że zawsze chcemy faktycznie tam dojść, tylko dlatego, że dążenie do niej **przestawia nasze myślenie** w stronę tego, co naprawdę możliwe. Drugim celem powinna być **prostota**, doprowadzona tak daleko, jak się da, aż do poziomu „wykonywalnego Markdownu” albo prostego skilla. Znów nie dlatego, że chcemy, by wszystkie systemy były zwykłym tekstem, tylko po to, żeby zmienić perspektywę.

Stamtąd widać, **co trzeba zrobić**, żeby zapewnić potrzebny poziom niezawodności, wydajności i bezpieczeństwa. W wielu przypadkach może się okazać, że poziom autonomii możliwy dla danego systemu jest znacznie wyższy, niż początkowo zakładaliśmy. I znów warto pamiętać o tym, czego już się nauczyliśmy o „tworzeniu logiki, która staje się lepsza, gdy modele się poprawiają”, oraz o tym, że część reguł i guardraili, które dodajemy, w pewnym momencie może zostać usunięta.

Innymi słowy, szukamy **ograniczonej niezależności**, czyli stanu, w którym agent może działać w wyznaczonych przez nas granicach przy minimalnej utracie elastyczności.

![Schody z pięciu równych stopni wznoszą się od lewej do prawej pod przerywaną linią z podpisem „Pełna autonomia” i stonowanym dopiskiem „cel, nawet jeśli nigdy tam nie dojdziemy”. Lewa oś ma podpis „przejęte przez program”. Każdy stopień to jedna praca, którą przejmuje program. Pierwszy stopień jest pełny: „Limity”, bez pilnowania każdej próby. Pozostałe stopnie są przerywane: „Dostarczanie”, bez gonienia za wynikami; „Stan”, bez tłumaczenia wszystkiego od nowa; „Decyzje”, tylko prawdziwe pytania; „Odzyskiwanie”, bez ręcznego debugowania. Szczyt piątego stopnia dotyka przerywanej linii. Kropka oznacza „Dziś” na narożniku między pierwszym a drugim stopniem. Obszar nad przerywanymi stopniami jest zabarwiony na czerwono. W tym obszarze leży czerwony podpis „Tu się zastanów” z dopiskiem „czego potrzebuje dalej?”. Zakrzywiona strzałka prowadzi od niego w dół do drugiego stopnia, z podpisem „dodaj następny stopień, potem sprawdź jeszcze raz”.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-1/frame.html)

Autonomia, o której mówimy, oznacza, że agenci pracują **domyślnie bez udziału użytkownika**, a jednocześnie mają sposób, żeby do nas dotrzeć, a my mamy sposób, żeby dotrzeć do nich. Obie rzeczy są zresztą równie ważne, niezależnie od tego, czy budowany system ma działać w tle, czy być aktywnie dostępny w harnessie użytkownika albo gdziekolwiek indziej.

Inną cechą agentów działających w tle, którą warto rozważyć, jest ich **proaktywność**, o której już mówiliśmy. Możemy ją osiągnąć dopiero wtedy, gdy wszystkie inne komponenty są na miejscu, więc zostawimy ją na później. Wspominam o niej teraz, bo musimy o niej pamiętać.

Jak wspomniałem, najlepszy sposób, żeby nauczyć się budować autonomicznych agentów, to faktycznie zbudować jednego i sprawdzić, jak działa w naszym codziennym życiu. Można to zrobić na kilka sposobów:

- **Agenci w chmurze:** agent w tle może być po prostu zestawem **skilli** + **agentem w chmurze**, którego być może już mamy, albo w harnessie, takim jak Cursor, albo jako samodzielnego agenta, takiego jak Hermes, Grok Bot czy Muse. Ta ścieżka świetnie sprawdza się przy osobistych automatyzacjach albo optymalizacji wewnętrznych procesów biznesowych.
- **Własni agenci:** aplikacje, które budujemy w całości sami, z pełną kontrolą nad ich logiką i dostosowaniem. Tę ścieżkę często wybiera się przy budowaniu aplikacji produkcyjnych, które mają obsługiwać wielu użytkowników.

Przykłady zawierają kod źródłowy agenta **[Specter](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/specter)**. Zaprojektowano go do prowadzenia badań i zarządzania bazą wiedzy w tle, zarówno reaktywnie, jak i proaktywnie, i ma działać niemal całkowicie w tle, jak agent ambient. Dla prostoty pracuje tylko dla jednej osoby.

Specter przez większość czasu śpi. Pracuje tylko wtedy, gdy coś go obudzi, a potem znów zasypia. Obudzić go można tylko na dwa sposoby:

- **Aktywność użytkownika:** użytkownik zapisuje link, edytuje notatkę albo wysyła wiadomość. Należy do tego też to, co użytkownik robi z wcześniejszymi wynikami Spectera: linkowanie, edytowanie albo usuwanie ich.
- **Alarm:** Specter ustawił ten alarm sam podczas wcześniejszego uruchomienia, na przykład „wyślij podsumowanie za godzinę”.

Każda akcja użytkownika i każdy alarm zapisuje się jako jeden wiersz w logu. Mały, tani model (albo model decyzyjny) czyta każdą akcję użytkownika i porównuje ją z focus.md, który opisuje, co jest dla użytkownika ważne w tej chwili. Jeśli akcja ma znaczenie, Specter się budzi. Jeśli nie, nic się nie dzieje. Alarmy pomijają to sprawdzenie, bo Specter ustawił je sam. Po obudzeniu Specter zaczyna nowe uruchomienie i wykonuje pracę, której większość po cichu trafia do bazy wiedzy. Kontaktuje się z użytkownikiem tylko wtedy, gdy wynik jest wart przerwania mu pracy, a przed ponownym zaśnięciem ustawia następny alarm.

![Pionowy diagram działania Spectera. Na górze Użytkownik wykonuje swoją zwykłą pracę. Linia z podpisem „każda akcja” prowadzi w dół do pigułki Pierwsze spojrzenie („czy to ważne?”). Linia z podpisem „tylko to, co ważne” prowadzi w dół do największego pudełka, Uruchomienie („zaczyna od zera”). Linia z dwoma grotami, podpisana „czyta i zapisuje”, łączy Uruchomienie z szerokim pudełkiem Workspace na dole („jedyna pamięć między uruchomieniami”), w którym są trzy kafelki: Focus, Notatki i Agenda. Po lewej szara pętla biegnie od Workspace'u w górę do Użytkownika, z podpisem „użytkownik znajduje notatki”. Po prawej gruba czerwona pętla biegnie od Workspace'u, na wysokości kafelka Agenda, w górę do Uruchomienia, z podpisem „budzi się sam”. Wniosek: użytkownik nigdy nie musi z nim rozmawiać, każde uruchomienie zaczyna od zera, pamięć niosą pliki, a uruchomienie może obudzić się samo.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-3/frame.html)

W przypadku tego agenta autonomia opiera się na kilku mechanizmach, takich jak:

- **Percepcja:** zewnętrzne aktywności zamieniają się w zdarzenia, ale nie są obsługiwane, jeśli nie są istotne.
- **Decyzja:** o istotności decyduje mały model, który skupia się wyłącznie na porównywaniu tego, co się wydarzyło, z tym, co zapisano w **focus.md**.
- **Pętla:** w sercu systemu jest główny agent, a jego zadaniem jest nie tylko wykonywanie zadań, ale też zarządzanie samym sobą.
- **Refleksja:** alarmy, które agent ustawia sam sobie, pozwalają mu zastanowić się nie tylko nad ostatnimi działaniami, ale też nad swoimi działaniami w szerszym kontekście. Agent może ich też użyć do ustawienia „heartbeatu”, który pozwala mu samemu się naprawiać.
- **Świadomość:** każde działanie zostawia ślad, do którego można później sięgnąć, w tym decyzje, żeby nic nie robić, razem z powodem każdej z nich. Dzięki temu agent może się podnieść nawet po wcześniejszych awariach.

I choć Specter to tylko przykład, pokazuje pewien sposób myślenia o projektowaniu systemów autonomicznych. Z jednej strony pokazuje, że większość architektury takich systemów ma wspólne cechy z klasycznymi aplikacjami. Z drugiej strony pokazuje, jak koncepcje związane z AI otwierają nowe możliwości i wymagają od nas patrzenia na oprogramowanie przez pryzmat inteligencji.

Gdybym w tym miejscu miał wskazać **jedno źródło** warte przeczytania, byłby to **DeepSeek Harness**, a zwłaszcza artykuł „**[Exploring Super-agent Design: Towards a More Autonomous Agent System](https://x.com/DeepSeekHarness/status/2116857257245987236)**”, bo ma wiele świetnych pomysłów. Część z nich już omawiamy w MEGA, a części nie omówimy.

**W tym, co buduje John:** Critic to mały przykład ograniczonej niezależności. Działa obok głównej rozmowy na małym, szybkim modelu. Czyta każdy prompt i każdą odpowiedź, nie czekając na prośbę, i zapisuje krótkie uwagi we własnym panelu. Jego granica jest jasna: nic nie wraca do głównej rozmowy, dopóki sami tego nie wyślemy. Zobacz [Supporting Agents](https://hq.mega.dev/lessons/s04e01/build-guide/#supporting-agents).

## Runtime

Systemy autonomiczne to w gruncie rzeczy zwykłe aplikacje backendowe, które często wystawiają jakieś API. W drugim tygodniu MEGA omawialiśmy, jak buduje się agentów, jaka jest rola prymitywów i jak ich używać do poruszania się w dynamicznym środowisku. Teraz, przy projektowaniu systemów autonomicznych, większość tych rzeczy się łączy.

Specter znów jest tu dobrym przykładem, bo obejmuje wiele mechanizmów, które możemy zobaczyć w każdym rodzaju autonomicznego agenta, takich jak **zdarzenia, wyzwalacze, joby, kolejki, harmonogramy, heartbeaty i długo działające pętle**.

Jeśli spojrzymy na jego architekturę, mamy **węzeł [celld](https://github.com/denoland/celld)**, czyli self-hosted runtime dla [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/). Stan agenta jest zapisywany, a dzięki [pi-durable](https://github.com/earendil-works/pi/tree/main/packages/durable), który zapisuje każdy krok uruchomienia, agent po restarcie kontynuuje od ostatniego zapisanego kroku, zamiast zaczynać od nowa.

Mówiąc prościej, Durable Object to mały obiekt po stronie serwera ze stałym ID i własnym magazynem SQLite. Można o nim myśleć jak o funkcji serverless, tyle że to stanowy „obiekt serverless”, więc dane, które zapisze, będą tam przy następnym użyciu. Każdy request do niego trafia do tej samej, jedynej instancji, więc dwa procesy nigdy nie zmieniają jego stanu w tym samym czasie. Obiekt może też ustawić alarm, który go obudzi, nawet gdy nie przyjdzie żaden request. **W Specterze cały agent żyje w jednym takim obiekcie**: jego log, jego workspace, bieżące uruchomienie i następny alarm. **Outbox żyje w osobnym obiekcie**, dzięki czemu awaria nigdy nie wyśle tego samego e-maila dwa razy.

![Oś czasu agenta Specter podzielona na tory. Wiersze od góry do dołu: Użytkownik, Pierwsze spojrzenie, Uruchomienie agenta, Pliki, Skrzynka odbiorcza. Wiersz Użytkownik leży poza przerywaną ramką o nazwie węzeł celld. Wewnątrz niej jedna ramka Durable Object o nazwie Specter zawiera wiersze Pierwsze spojrzenie, Uruchomienie agenta i Pliki, a druga ramka Durable Object o nazwie Outbox zawiera wiersz Outbox. Od lewej do prawej: użytkownik poprawia literówkę, a pierwsze spojrzenie ją ignoruje. Użytkownik zapisuje link, pierwsze spojrzenie uznaje, że to ważne, i zaczyna się uruchomienie agenta. Uruchomienie zapisuje notatkę i ustawia alarm w plikach. Potem agent śpi. Budzi się sam alarmem, bez pierwszego spojrzenia. Drugie uruchomienie ma awarię, wznawia pracę i wysyła jeden e-mail do skrzynki odbiorczej. Strzałka na dole pokazuje, że czas płynie w prawo.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-2/frame.html)

Architektura Spectera obejmuje takie komponenty jak:

- **Węzeł:** proces celld, który uruchamia Durable Objects, trzyma ich dane na dysku i budzi je, gdy włączą się ich alarmy.
- **Router:** cienki worker, który przekazuje każdy request (zdarzenie, odczyt z dashboardu albo wywołanie MCP) do właściwego obiektu i nie ma własnej logiki.
- **Log:** lista append-only, która trzyma każde zdarzenie, decyzję, krok uruchomienia i receipt.
- **Decyzja:** mały model, który czyta nowe zdarzenia i porównuje je z focus.md. Agenta budzi tylko to, co ważne.
- **Uruchomienie:** jedna rozmowa agenta na jedno obudzenie, prowadzona przez pi-durable. Zaczyna się bez pamięci, zapisuje na bieżąco każdy krok, a po awarii kontynuuje od ostatniego zapisanego kroku.
- **Workspace:** wersjonowane pliki (focus, notatki, agenda, skille). To jedyna pamięć agenta między uruchomieniami, a każdą zmianę można prześledzić i cofnąć.
- **Alarm:** jedyny timer obiektu, ustawiony na najwcześniejszy moment, w którym coś musi się wydarzyć: następną pozycję w agendzie, retry albo heartbeat, gdy trwa uruchomienie.
- **Sprawdzenia:** kod, a nie prompt, który sprawdza, co uruchomienie czyta i co wysyła na zewnątrz: zaufane źródła, dozwolone ścieżki zapisu, limity i klucz wysyłki przy każdym e-mailu.
- **Outbox:** osobny obiekt, który zastępuje skrzynkę pocztową użytkownika. Trzyma jeden e-mail na klucz wysyłki, więc awaria nigdy nie dostarczy tego samego e-maila dwa razy.

Wszystkie te komponenty nie tylko pozwalają agentowi wykonywać swoją pracę, ale przede wszystkim **pomagają mu przetrwać problemy**. Jednocześnie **budują zaufanie**, bo agent rzadziej powtarza swoje działania, a część z nich jest nieodwracalna.

Agent Specter specjalizuje się w jednym zadaniu i choć jego architektura pozwala robić wiele innych rzeczy, jego cel pozostaje jasny.

Żeby pokazać, jak mogłoby to wyglądać w **agencie ogólnego przeznaczenia**, który w niczym się nie specjalizuje, ale potrafi elastycznie dostosować się do użytkownika i środowiska, użyję przykładu z jednego z moich projektów. Nie opiera się na Pi. To w całości moja własna implementacja, która obsługuje trwałe wątki z własnymi dziennikami, zaplanowaną pracę, agentów uruchamiających innych agentów w nowych wątkach, sprawdzanie uprawnień przy każdej akcji i odzyskiwanie po restarcie, przy czym żaden efekt nigdy się nie powtarza. Wszystko to działa na jednej pętli, takiej samej dla każdego agenta.

Diagram poniżej pokazuje, jak pętla agenta obsługuje całą interakcję, w tym przejęcie wątku, które blokuje go na czas jednego fragmentu interakcji. Pętla składa też kontekst z wielu warstw i wywołuje model, który wybiera następną akcję. Potem pętla sprawdza, czy ta akcja jest dozwolona (albo pyta użytkownika), i przekazuje ją do wykonania.

Ten agent też opiera się na prymitywach, a wszystkie omawialiśmy już w różnych formach w trakcie kursu, więc nie powinno tu być niespodzianek. Te prymitywy sprawiają, że cała architektura jest niezwykle elastyczna, bo niemal wszystko da się łączyć tak, jak chcemy. I wreszcie jest cała warstwa trwałości, którą zbudowałem ręcznie, a którą runtime taki jak **celld** daje nam teraz od ręki.

![Pionowy diagram runtime'u agenta w trzech warstwach w ramkach, czytany od góry do dołu. Lewa kolumna, „Co widzisz”, zawiera Wysłanie, Zatwierdzenie i Odpowiedź. Ramka 1, „Pętla agenta” (jedna pętla obsługuje każdy wątek), zawiera siedem stacji jedna pod drugą, połączonych strzałkami w dół: Scheduler, Przejęcie, Następny krok, Kontekst, Model, Sprawdzenie uprawnień i Przekazanie. Wysłanie wskazuje na Scheduler. Zatwierdzenie i Sprawdzenie uprawnień łączy dwukierunkowa linia „pytaj”. Przekazanie wskazuje w dół na ramkę 2, „Co mogą robić agenci”, z ośmioma prymitywami: Pliki, Wartości, Sekrety, Integracje, Kod, Uruchomienia, Zdarzenia, Uprawnienia. Linia „spawn” prowadzi od Uruchomień w dół do Wątku potomnego w ramce 3, „Trwały stan” (przetrwa restart). Wątek potomny oddaje „jeden gotowy wynik” Twojemu wątkowi. Ramka 3 zawiera też Pliki agentów, Wiersz zadania, Magazyny i Odzyskiwanie. Dwukierunkowa linia z podpisem „każdy krok odczytany i zapisany” łączy pętlę z trwałym stanem. Linia z podpisem „czyta dziennik” prowadzi od trwałego stanu do Odpowiedzi. Czerwona linia z podpisem „znów ta sama pętla” prowadzi od Wiersza zadania z powrotem w górę do Schedulera.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-4/frame.html)

Oba przykłady pokazują, jak komponenty znane z klasycznej inżynierii można teraz łączyć i owijać wokół modeli językowych, żeby modele mogły skutecznie poruszać się w prawdziwym świecie, równoważąc swoją niedeterministyczną naturę niezawodnymi strukturami. Warto też pamiętać, że ta wiedza przydaje się nie tylko przy budowaniu całych systemów, ale też przy małych skryptach i aplikacjach, które mogą pracować dla nas w tle.

**W tym, co buduje John:** ta sama idea pojawia się w małej skali. Agenta pomocniczego budzą dwa zdarzenia: wysłanie promptu i koniec odpowiedzi. Harness zgłasza oba przez hooki albo przez plik rozmowy. Wersja Johna nie ma alarmów, kolejek ani trwałych uruchomień, więc w tych sprawach naszym przykładem zostaje Specter. Zobacz [Supporting Agents](https://hq.mega.dev/lessons/s04e01/build-guide/#supporting-agents).

## Stan

Wiemy, że wywołania LLM są domyślnie bezstanowe (choć Responses API [oferuje tryb stanowy](https://developers.openai.com/api/docs/guides/reasoning?api-mode=responses)). To znaczy, że stan agenta musimy trzymać po naszej stronie, a jest kilka rodzajów stanu, które możemy chcieć przechowywać.

Większość agentów, z którymi pracujemy, przechowuje historię interakcji i często ma jakiś system pamięci. Ale Grok Bot niedawno wprowadził interfejs bez żadnych wątków, z jedną ciągłą rozmową, w której jeden bot sam ustala wszystko, czego potrzebuje. Ta zmiana pokazuje nam jedno: **każdy wzorzec, którego uczymy się o agentach, można złamać**, zwłaszcza że zarówno modele, jak i narzędzia ciągle się rozwijają.

W naszym przykładzie ze Specterem nie przechowujemy wątków po zakończeniu uruchomienia, bo tym, co żyje długo, jest sam agent, a nie sesja czatu. Jeśli proces padnie w środku uruchomienia, pi-durable pozwala nam podjąć pracę od ostatniego zapisanego stanu, zamiast zaczynać od nowa. Te zapisane kroki działają jak **checkpointy**. Ale gdy uruchomienie się kończy, jego rozmowa nie jest już potrzebna. Ciągłość między uruchomieniami bierze się z tego, co uruchomienie zapisało: nowych wierszy w logu, nowych wersji plików, takich jak focus.md, notatki i agenda, oraz następnego alarmu. Następne uruchomienie zaczyna od zera, czyta wiersze logu, których jeszcze nie widziało, i potrzebne pliki, a potem odbudowuje z nich swój kontekst. Innymi słowy, Specter niczego nie pamięta. Czyta tylko to, co sam wcześniej zapisał, dzięki czemu jego pamięć łatwo przejrzeć, edytować i cofnąć.

![Dwa rodzaje stanu w Specterze. Górny rząd, „Wewnątrz uruchomienia”: ramka uruchomienia zawiera linię z pięcioma kropkami checkpointów. Znak awarii leży między trzecią a czwartą kropką, a uruchomienie podejmuje pracę od ostatniego checkpointu. Na końcu uruchomienia linia blednie, a rozmowa zostaje porzucona. Kropkowana przerwa „śpi” prowadzi do drugiej ramki, „Następne uruchomienie”, która zaczyna od zera z własną linią checkpointów. Dolny rząd, „Między uruchomieniami”: ramka „Zapisane”, jedyna pamięć między uruchomieniami, zawiera log (nowe wiersze, których następne uruchomienie jeszcze nie widziało), pliki (focus, notatki, agenda) i alarm (następne obudzenie). Czerwona strzałka z podpisem „zapisuje” prowadzi od pierwszego uruchomienia w dół do ramki „Zapisane”. Czerwona strzałka z podpisem „czyta” prowadzi od tej ramki w górę do następnego uruchomienia.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-5/frame.html)

Podejście Spectera świetnie działa w jego przypadku, ale to nie znaczy automatycznie, że zadziała w każdym agencie w tle. Dlatego, zanim złamiemy takie reguły czy wzorce, musimy najpierw zrozumieć zasady, które za nimi stoją.

Drugi przykład, agent ogólnego przeznaczenia, działa inaczej. Musi śledzić kilka rodzajów stanu: **interakcje, wykonanie, workspace** i **zmienne tymczasowe**. Dokładnie:

- **Dziennik:** plik append-only, który trzyma każdy szczegół każdej interakcji. Model używa tych szczegółów jako kontekstu, a służą one też do odzyskiwania po awarii. Dziennik zapisuje też zatwierdzenia, powtórzone wywołania i model użyty przy każdym requeście, więc **zawsze widzimy, co naprawdę się wydarzyło**.
- **Obserwacje:** gdy historia robi się za długa, model wyciąga z niej kluczowe fakty, a każdy fakt zachowuje link do wpisu, z którego pochodzi. Ta pamięć jest odbudowywana z dziennika na każdym kroku, więc dziennik pozostaje jedynym źródłem prawdy (single source of truth).
- **Katalog:** lista wątków, wyszukiwanie i indeks załączników. Jest budowany z dzienników, więc jeśli coś pójdzie nie tak, możemy go po prostu odbudować.
- **Wiersze zadań:** jeden wiersz na wątek, który pokazuje, czy wątek czeka na swoją kolej, działa, na coś czeka, czy jest zakończony, i jak daleko pętla przeczytała jego dziennik. Scheduler używa tych wierszy także do wyboru następnego joba.
- **Harmonogramy:** praca zaplanowana na później albo powtarzana w czasie. Gdy harmonogram się uruchomi, zwykła pętla agenta podejmuje ją jak każdy inny job.
- **Rejestr efektów:** krótki zapis wszystkiego, co zrobiło jedno uruchomienie w **code mode**, trzymany tylko na czas tego uruchomienia.
- **Agenci i skille:** każdy agent to plik z nazwą, regułami, skillami i modelem. Te pliki są czytane ponownie przed każdym wywołaniem modelu, więc zmiana działa od razu.
- **Uprawnienia:** reguły uprawnień, przez które musi przejść każda akcja. Reguła może pozwolić na akcję, zablokować ją albo zapytać użytkownika. Reguły dotyczące zasobów samego urządzenia, takich jak podlinkowane foldery, nigdy nie opuszczają tego urządzenia.
- **Dokumenty:** notatki i pliki, przy czym każdy załącznik jest przechowywany raz, pod hashem swojej zawartości.
- **Wartości / Sekrety:** wartości to typowane wiersze na rzeczy takie jak preferencje, wspólne dla każdego agenta, który ma do nich dostęp. Sekrety służą do haseł i kluczy. Agenci dostają tylko uchwyt, więc nigdy nie widzą faktycznej wartości.
- **Przejęcia:** który worker obsługuje teraz fragment wątku i które okno go obserwuje.
- **Zdarzenia:** powiadomienia na żywo dla okna. Nigdy nie są przechowywane, bo po ponownym połączeniu okno po prostu czyta jeszcze raz dziennik i wiersze zadań.

Widać jasno, że budowanie systemów autonomicznych może być zupełnie inną grą, zależnie od tego, co chcemy osiągnąć. Kiedy projektowałem tę architekturę, trudno było znaleźć jakiekolwiek źródło, które opisywałoby dokładnie, co trzeba zrobić. Jednocześnie żaden z mechanizmów na naszej liście nie jest całkiem nowy, a ja wypracowałem je razem z AI, iterując nad logiką rdzenia agenta, **kernela**. Korzystając z wiedzy modelu i z własnego doświadczenia w programowaniu i projektowaniu agentów, uzyskałem satysfakcjonujące wyniki.

Piszę o tym, bo **my, inżynierowie, mamy już większość wiedzy potrzebnej do budowania systemów agentowych**. A teraz, z całą wiedzą z MEGA, możemy zacząć od budowania prostych agentów, takich jak „inteligentne cron joby”, które zajmą się za nas jakimiś trywialnymi zadaniami. Doświadczenie zdobyte przy ich budowaniu szybko doprowadzi nas do poziomu, na którym zbudujemy bardziej złożoną logikę, a w końcu systemy autonomiczne.

**W tym, co buduje John:** agent pomocniczy też trzyma swój stan w plikach. Folder `agents/critic/` zawiera zadanie w `agent.md`, sprawdzenia w `expectations.md` i wyniki w `reports/`. Agent jest otwierany z tych plików, a lab testuje go względem nich, więc możemy go przeglądać i edytować tak samo, jak przeglądamy workspace Spectera. Zobacz [Supporting Agents](https://hq.mega.dev/lessons/s04e01/build-guide/#supporting-agents).

## Kontrola

Jak kontrolować system, który działa autonomicznie? Odpowiedź nie jest oczywista, bo możemy nawet zapytać: „Czy jakakolwiek kontrola jest w ogóle potrzebna?” albo „Czy to w ogóle powinno być obsługiwane autonomicznie?”. I nawet gdy jasno wiemy, co system może zrobić i kiedy musi poprosić nas o zgodę, wciąż zostaje pytanie, jak może do nas dotrzeć i jak sprawić, żeby zatwierdzenia były użyteczne, niezawodne i wygodne.

Jak każdą inną pętlę, pętlę autonomiczną można zbudować tak, żebyśmy mogli ją wstrzymać i poczekać na jakąś informację albo zdarzenie, zanim ruszy dalej. Najważniejsze jest jednak to, że gdy pętla czeka na zatwierdzenie, to zatwierdzenie **musi być deterministyczne**, czyli to kod, a nie model, odpowiada za przepuszczenie akcji albo jej odrzucenie. Na tym etapie może to brzmieć oczywiście, ale implementacja bywa podchwytliwa, bo musimy dokładnie wiedzieć, które akcje wymagają zgody, czy inne akcje mogą w tym czasie działać i jak obsłużyć czekanie, które może trwać dniami. Tu bardzo pomaga trwałość, bo możemy łatwo przywrócić interakcję nawet po długim czasie, nawet jeśli w międzyczasie zerwało się połączenie.

![Oś czasu jednej autonomicznej pętli, czytana od lewej do prawej. W tym przykładzie agent chce wysłać e-mail do klienta. Reguły sprawdza kod, a nie model. Możliwe są trzy wyniki: wykonaj, odmów i zapytaj. Tutaj wynikiem jest zapytaj. Pętla się zatrzymuje i zapisuje prośbę. Następuje długi kropkowany odcinek oznaczony „minuty albo dni”. Nad nim równoległa linia pokazuje, że inna praca trwa dalej. Potem przychodzi odpowiedź i zostaje zapisana, zanim cokolwiek ruszy. Kod sprawdza ponownie i wykonuje akcję tylko dla tej samej prośby. Notatka na końcu mówi, że brak odpowiedzi nigdy nie staje się „tak”. Trzy karty pod osią czasu odpowiadają na trzy pytania. Które akcje wymagają zgody? Za każdym razem decydują reguły w kodzie. Czy inna praca może w tym czasie działać? Tak, wstrzymana jest tylko ta pętla. A jeśli czekanie trwa dni? Prośba przetrwa restarty.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-6/frame.html)

Ale kontrolowanie systemu autonomicznego to nie tylko zatwierdzanie wywołań narzędzi, bo agenci mogą też zarządzać zasobami, integracjami i interakcjami z innymi użytkownikami i agentami. A to wszystko trzeba obsłużyć właściwymi prymitywami, często centralnie, żeby łatwiej było zarządzać uprawnieniami.

Diagram poniżej pokazuje reguły uprawnień (Grants) w jednym z moich agentów. Są złożone, bo zależnie od tego, gdzie agent działa, obowiązują różne reguły: część zależy od urządzenia, bo zostaje lokalnie, a inne muszą być synchronizowane między użytkownikami z tej samej organizacji.

Do tego reguły muszą obowiązywać wszędzie, gdzie używa się danego prymitywu. Na przykład **Integracji** można używać w **Czacie**, ale też w **Aplikacjach**. Gdy użytkownik ustawi uprawnienia dla integracji, te uprawnienia muszą być respektowane wszędzie.

![Diagram tego, jak kontroluje się agentów. Od lewej do prawej: Agent (chce działać), Znajdź (widzi tylko to, czego może użyć), Plan (akcja i jej ryzyko), potem obrysowane na czerwono Sprawdzenie uprawnień (pozwól, odmów albo zapytaj użytkownika). Nad sprawdzeniem przerywana ramka Reguły (czytane ponownie przy każdym wywołaniu) zawiera Reguły przenośne (pliki, które się synchronizują; zły zestaw zostaje odrzucony) i Reguły urządzenia (tylko to urządzenie, nigdy nie synchronizowane), ze strzałką w dół z podpisem przy każdym wywołaniu. Poniżej strzałka z podpisem tylko to, co dozwolone prowadzi do ramki Prymitywy (jedyny sposób działania) z ośmioma elementami: Pliki, Wartości, Sekrety, Integracje, Kod, Uruchomienia, Zdarzenia, Uprawnienia. Czerwona linia od Kodu wraca do Sprawdzenia uprawnień: każde wywołanie z kodu jest sprawdzane ponownie.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-7/frame.html)

Są też pewne rodzaje akcji, których użytkownik nie może oznaczyć jako zaufane, więc zawsze wymagają wyraźnej zgody. Jedną z nich jest **utworzenie integracji**, co zdarza się rzadko, ale jest potencjalnie niebezpieczne.

W praktyce zatwierdzenia są problemem. Jeśli ustawimy reguły zbyt ściśle i użytkownik musi potwierdzać każdą akcję agenta, system autonomiczny traci sens. Do tego tak bardzo irytuje to użytkownika, że przestaje czytać, czego dotyczy każda prośba. Dlatego nasze polityki mogą obejmować **zatwierdzenia ograniczone czasowo** albo **zatwierdzenia ograniczone kontekstem**.

Ale polityki i UX to nie jedyne sprawy, którymi musimy się zająć. Jak już mówiliśmy, współcześni agenci działają w świecie przez **code mode**, więc piszą skrypty i komendy, których użytkownik końcowy może nie rozumieć. Co gorsza, niemal nie da się napisać wszystkich możliwych reguł, które deterministycznie wyłapią niebezpieczne akcje, zwłaszcza że to, co uznajemy za niebezpieczne, może zależeć od kontekstu użytkownika. Tu jednak możemy rozważyć **modele decyzyjne**, takie jak **[jev](https://openrouter.ai/docs/guides/community/jev)** albo [Decisions API](https://developers.openai.com/api/docs/guides/decisions).

![Przepływ, który zatwierdza akcję agenta. Akcja agenta trafia najpierw do reguł w kodzie, które są sprawdzane jako pierwsze i nigdy nie są zgadywane. Gdy akcja nigdy nie jest dozwolona, zostaje odrzucona. Gdy reguły mówią „zawsze pytaj”, system pyta użytkownika. Gdy żadna reguła nie pasuje, akcja trafia dalej do modelu decyzyjnego, obrysowanego na czerwono, który dostaje też akcję i kontekst użytkownika. Model zwraca małą typowaną odpowiedź, narysowaną jako czerwona pigułka z miejscem na etykietę i paskiem pewności. Potem kod kieruje akcję według tej odpowiedzi. Pewne, że bezpieczna: akcja się wykonuje i nikt nie jest przerywany. Niepewne: system pyta użytkownika i podaje powód prostymi słowami. Pewne, że niebezpieczna: akcja zostaje odrzucona, a agent widzi dlaczego. Środkowy wynik, pytanie użytkownika, ma delikatną ramkę, która pokazuje, gdzie wchodzi użytkownik.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-8/frame.html)

I wreszcie część kontroli może opierać się na samych modelach, zwłaszcza najnowszych, które mniej halucynują, dobrze trzymają się instrukcji i dobrze korzystają z kontekstu. Nie zagwarantuje to, że nie zostaną podjęte żadne niechciane akcje, ale na pewno zmniejszy ryzyko.

**W tym, co buduje John:** kontrola jest domyślnie ręczna. Critic pokazuje ponumerowane uwagi, a my wybieramy tę, którą wysyłamy do głównej rozmowy. Wysłanie nie przerywa trwającej odpowiedzi i nie zmienia tekstu, który wpisaliśmy. Automatyczne przerywanie jest opcjonalne. Jest tylko dla destrukcyjnych zmian i lab musi je najpierw udowodnić. Zobacz [Bringing the Critic Home](https://hq.mega.dev/lessons/s04e01/build-guide/#bringing-the-critic-home).

## Obserwacja i odzyskiwanie

W **S02E05** omawialiśmy obserwowalność i ewaluacje. Ta wiedza i te narzędzia są teraz jeszcze bardziej przydatne, bo chcemy nie tylko mieć oko na system i jego stan, ale też dodać proaktywne mechanizmy, które autonomicznie iterują nad systemem i wyłapują problemy zaraz po ich wystąpieniu.

Gdy autonomiczni agenci zaczynają dla nas pracować, szybko robi się niemal niemożliwe, żeby monitorować ich wszystkich, zwłaszcza gdy ich aktywność rośnie i rozkłada się na wiele urządzeń. Zamiast próbować zarządzać tym wszystkim ręcznie, chcemy, żeby inni agenci obserwowali, reagowali i naprawiali problemy w chwili, gdy się pojawią.

Wiemy już, że platformy takie jak Langfuse dają nie tylko zaawansowany monitoring, ale też ewaluacje online, które mogą powiadomić naszych agentów, gdy coś pójdzie nie tak, i dać im informacje potrzebne do dostępu do systemu i wprowadzenia zmian. Musimy więc przemyśleć, jakie dane przechowujemy, nie tylko z perspektywy użytkownika, ale też z perspektywy systemu, który musi rozumieć siebie na tyle dobrze, żeby iterować nad swoim zachowaniem.

W tym miejscu niemal wszystko, co omówiliśmy do tej pory, łączy się tak:

- **Trwały stan i efekty uboczne z kluczem** pozwalają systemowi podnieść się i kontynuować pracę bez powtarzania tego, co już zrobione.
- **Logi i dzienniki** zostawiają ślad każdej akcji i decyzji, w tym decyzji, żeby nic nie robić, więc każde zachowanie można prześledzić aż do przyczyny.
- **Harmonogramy i heartbeaty** pozwalają systemowi obserwować samego siebie i wyłapywać problemy, nawet gdy nikt nie patrzy.
- **Agenci w tle** mogą naprawić przynajmniej część tych problemów bez nas, o ile każda poprawka zaczyna się od odtworzonej awarii.
- **Ewaluacje** pokazują agentom, jak zmiana wpływa na system, zanim zaczniemy jej ufać.
- **Eskalacja** przynosi nam jeden raz to, czego system nie potrafi rozwiązać, razem z jedną akcją, którą musimy wykonać.
- **Prymitywy** pozwalają agentom rozwiązywać problemy na poziomie architektury, zamiast łatać objawy.

![Zamknięta pętla zgodna z ruchem wskazówek zegara, z siedmioma stacjami i pustym środkiem z napisem „system sam utrzymuje się w działaniu”. Strzałka z podpisem „coś idzie nie tak” wchodzi z lewego górnego rogu do pierwszej stacji. Stacje to: Przetrwaj (trwały stan i efekty uboczne z kluczem), Zapisz (logi i dzienniki), Zauważ (harmonogramy i heartbeaty), Napraw (agenci w tle, od odtworzonej awarii), Zweryfikuj (ewaluacje), Eskaluj (tylko to, czego system nie potrafi rozwiązać) i Ulepsz (prymitywy, nie łatki). Ulepsz prowadzi z powrotem do Przetrwaj. Poza pętlą, w prawym dolnym rogu, jest Użytkownik (zawiadamiany raz, z jedną akcją do wykonania). Jedna czerwona linia prowadzi od Eskaluj do Użytkownika. Żadna inna stacja nie łączy się z użytkownikiem.](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e01/artifacts/lesson/figure-9/frame.html)

**W tym, co buduje John:** lab to ta sekcja w praktyce. Drugi agent testuje narzędzie z zewnątrz, w odizolowanej kopii workspace'u. Pisze tak, jak pisze człowiek, czyta tylko ekran i raportuje: „Spróbowałem X, oczekiwałem Y, dostałem Z”. Gdy sprawdzenie nie przechodzi, zmieniamy zadanie agenta i uruchamiamy to samo sprawdzenie jeszcze raz. Nigdy nie luzujemy oczekiwań. Zobacz [The Lab](https://hq.mega.dev/lessons/s04e01/build-guide/#the-lab).

## Najważniejsze wnioski

Idea systemów autonomicznych, które najpierw budujemy dla siebie i które dostarczają wartość bez naszego udziału, to coś, na czym warto się skupić w najbliższej przyszłości, zwłaszcza że ich budowanie to jeden z najlepszych sposobów, żeby nauczyć się budować systemy autonomiczne, uczyć się na awariach i odkrywać nowe techniki, których potem możemy chcieć używać w pracy.

Jednocześnie już to, co omówiliśmy w tej jednej lekcji, powinno jasno pokazać, że nawet jeśli systemy autonomiczne działają bez nas albo przy naszym minimalnym zaangażowaniu, ich budowanie wymaga mnóstwa wysiłku, nie tylko od strony inżynierii, ale w niemal każdym aspekcie inżynierii produktu.
