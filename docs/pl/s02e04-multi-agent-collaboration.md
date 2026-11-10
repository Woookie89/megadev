# S02E04 · Współpraca wielu agentów

W **S01E02** wspomnieliśmy o podagentach i workerach (oddzielnych instancjach) jako świetnym sposobie na odciążenie głównego wątku od wymagających zadań, dzięki czemu model może skupić się na głównym celu. Teraz czas pójść o krok dalej i przyjrzeć się temu, jak agenci mogą współpracować w zespołach, komunikować się ze sobą, wymieniać zasoby i korzystać ze swoich możliwości.

Systemy wieloagentowe są przydatne zarówno dla pojedynczego użytkownika pracującego z całym zespołem agentów, jak i dla całych produktów oraz organizacji, które chcą wymieniać informacje i korzystać ze swoich usług. Zespoły agentów mogą też wspólnie pracować nad złożonymi problemami, takimi jak zaawansowana analiza produktu, refaktoryzacja czy wdrażanie i testowanie całych funkcji. Systemy wieloagentowe mogą również poprawiać wyniki, gdy zadania zyskują na specjalizacji lub odizolowaniu kontekstu.

## Plan

- **Wieloagentowość:** odpowiedzialności, izolowanie konfliktów, współdzielone zasoby, wzorce architektoniczne
- **Agent2Agent:** niezależni agenci, połączenia, granice, wiadomości, zadania, wykrywanie
- **Delegowanie:** kompletowanie kontekstu, kontrakty przekazania zadania, odpowiedzialność, śledzenie postępów, raportowanie, błędy
- **Orkiestracja:** zależności, praca równoległa, konflikty, praca w tle, przepływy pracy człowiek–agent

## Architektury wieloagentowe

Idea systemów wieloagentowych nie jest nowa. Sięga czasów znacznie wcześniejszych niż premiera ChatGPT — lat 70. i 80. oraz [rozproszonej sztucznej inteligencji](https://en.wikipedia.org/wiki/Distributed_artificial_intelligence) — a większość tych koncepcji można łączyć ze współczesnymi modelami językowymi.

Ciekawe jest to, że jeszcze w zeszłym roku można było dyskutować o efektywności systemów wieloagentowych, zwłaszcza w przypadku najbardziej złożonych zadań. Jednak około połowy 2026 roku LLM-y stały się bardzo dobre w komunikacji i przekazywaniu zadań między agentami. Otwiera to nowe możliwości i stawia nowe wyzwania: zarządzanie kontekstem pojedynczego agenta nie jest łatwe, a teraz musimy ustalić, jak zarządzać wieloma agentami. Możemy też oczekiwać, że harnessy będą ewoluować w tym kierunku; wczesnymi przykładami są [Claude Managed Agents](https://platform.claude.com/workspaces/default/agent-quickstart).

Poniżej znajduje się przykład **badań** przeprowadzonych przez wielu agentów. Każdy z nich analizuje problem z innej perspektywy, a następnie **współpracują**, porównując wyniki i ucząc się od siebie nawzajem. Cała flota jest konfigurowana **dynamicznie**; w tym przypadku agent wiodący kontroluje cały przepływ pracy — w tym uruchamianie i zamykanie każdego workera.

![Przykład badań wieloagentowych w dwóch falach, od góry do dołu. Agent wiodący wysyła jedno pytanie do fali 1, w której agent techniczny, agent kosztowy i agent ryzyka prowadzą badania i porównują ze sobą wyniki. Fala 2, z udziałem agenta kosztowego i technicznego, bada temat dokładniej i ponownie porównuje wyniki. Rezultaty wracają w formie raportu. Role agentów są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-1/frame.html)

Każdy z agentów na powyższym diagramie ma własny kontekst i znamy już mechanikę, która za nim stoi. Z naszej perspektywy musimy jednak zarządzać również szerszym kontekstem całego przepływu pracy, w ramach którego agenci się komunikują, a agent wiodący zarządza pozostałymi. Poza kontekstem w systemach wieloagentowych musimy określić **zakres, możliwości i uprawnienia** każdego agenta. Dlatego należy zdecydować, jaką architekturę zbudować dla danego zastosowania.

**Pojedynczy agent:**
Może się to wydawać sprzeczne z intuicją, ale system oparty na jednym agencie nadal może być wieloagentowy, jeśli działa w nim kilka instancji tego agenta, współdzielących zasoby i możliwości. Wiąże się to z szansami i wyzwaniami typowymi dla systemów wieloagentowych.

![Oś czasu harmonogramu pracy jednego agenta od 06:00 do 08:00. Instancja 1 prowadzi codzienne badania od 06:00 do 07:30. Instancja 2 rozpoczyna przygotowywanie codziennego podsumowania o 07:00. Czerwona linia pokazuje, że podsumowanie odczytuje współdzielone pliki o 07:00, kiedy nadal zawierają wyniki poprzednich badań. Nowe wyniki pojawiają się o 07:30. Podane godziny są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-2/frame.html)

**Podagenci:**
Technicznie rzecz biorąc, podagent to mechanizm, a nie wzorzec architektoniczny. Występuje w większości harnessów, choć może być zaimplementowany na wiele sposobów. Podstawowa koncepcja to **przekazanie zadania**: zlecamy konkretne zadanie oddzielnemu, krótkotrwałemu agentowi, który wraca z wynikami. W zależności od implementacji mechanizm może także umożliwiać **oczekiwanie i wznowienie**, dzięki czemu [podagent może poprosić o dodatkowy kontekst](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/subagent-asks-back) lub uprawnienia i dokończyć zadanie, gdy otrzyma wszystkie potrzebne informacje.

![Wymiana między agentem nadrzędnym a podagentem, przedstawiona jako dwie linie życia z czterema prostymi, opisanymi strzałkami. Agent nadrzędny deleguje zadanie: {"task": "Draft a reply about the project delay"}. Podagent prosi o kontekst i czeka: {"status": "waiting", "question": "What is the new date?"}. Agent nadrzędny wysyła odpowiedź: {"answer": "24 October"}. Podagent wznawia pracę i zwraca wynik: {"status": "done", "result": "Dear client, … 24 October."}. Zadanie i wartości są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-3/frame.html)

Podagenci mogą być też implementowani jako **workery**: oddzielne, interaktywne instancje działające niezależnie, które **emitują zdarzenia** do instancji nadrzędnej, aby się z nią komunikować, i są przez nią kontrolowane.

**Hierarchia:**
Podagenci są mechanizmem delegowania, ale możemy nadać im strukturę, która usprawnia organizację i zarządzanie kontekstem. W rezultacie powstaje hierarchia, która może być głęboko zagnieżdżona i obejmować zdefiniowanych wcześniej workerów oraz koordynatorów zarządzających nimi i współpracujących ze sobą. Liderzy lub koordynatorzy mogą tworzyć tę hierarchię **dynamicznie**.

![Hierarchia pionowa, dwupoziomowa. Lider na górze łączy się z trzema koordynatorami. Każdy koordynator znajduje się we własnej ramce określającej jego zakres i zarządza dwoma workerami. Czerwone linie łączą sąsiednich koordynatorów, którzy współpracują ze sobą. Liczba koordynatorów i workerów jest przykładowa.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-4/frame.html)

**Zespół:**
Struktura hierarchiczna zakłada połączenia między koordynatorami i liderami. Możemy jednak potrzebować **zespołu agentów** o określonych rolach, dążących do wspólnego celu za pośrednictwem **wspólnego obszaru roboczego**. Każdy worker może komunikować się z pozostałymi, więc koordynatorzy ani liderzy nie są konieczni, choć mogą występować.

![Wspólny obszar roboczy u góry zawiera cel zespołu. Poniżej znajdują się trzej agenci: A, B i C, każdy z własną rolą. Każdy agent odczytuje dane ze wspólnego obszaru roboczego i zapisuje w nim dane. Linie łączą każdego agenta z dwoma pozostałymi, dzięki czemu wymieniają wiadomości bezpośrednio, bez koordynatora ani lidera.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-5/frame.html)

**Rój:**
Grupa agentów może samodzielnie zdecydować, który agent lub agenci powinni wziąć udział w danym działaniu, aby zrealizować zadanie. Możemy określić role, reguły i uprawnienia, a także zakres i główny cel. W tych granicach to agenci decydują, kto wykona pracę, a agent wiodący nie kontroluje przepływu. Taka architektura nazywana jest rojem i nie jest jeszcze powszechna w środowiskach produkcyjnych. W miarę doskonalenia modeli może jednak zyskiwać na użyteczności i popularności.

![Rój pięciu agentów w jednej ramce. Nazwa ramki wymienia role, reguły, uprawnienia, zakres i cel. Agenci są połączeni ze sobą; nad nimi nie ma agenta wiodącego. Dwaj agenci wybrani przez grupę łączą się z zadaniem czerwonymi liniami.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-7/frame.html)

Ogólnie architektury wieloagentowe pomagają przezwyciężać ograniczenia obecnych modeli w takich obszarach jak okna kontekstu czy przestrzeganie instrukcji. Może to sugerować, że wraz z rozwojem modeli znaczenie tych architektur będzie maleć. Możemy jednak spojrzeć na nie także przez pryzmat **zwiększania wydajności** dzięki równoległości, która zapewnia zarówno szybkość, jak i różnorodność eksploracji. Wszystko to, w połączeniu ze środowiskami pozwalającymi agentom empirycznie weryfikować wyniki swojej pracy, otwiera niezwykłe możliwości.

![Przepływ od góry do dołu. Otwarty problem trafia równolegle do trzech agentów. Agenci dzielą się wynikami między sobą i przekazują je do środowiska. Środowisko je weryfikuje i wywołuje usługi zewnętrzne. Nieudany wynik trafia do etapu obsługi błędu, a czerwona, przerywana linia prowadzi z powrotem do agenta, który odzyskuje sprawność i ponawia próbę. Zweryfikowane wyniki składają się na najlepszą odpowiedź.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-6/frame.html)

Agenci mogą współpracować nie tylko w naszym środowisku, lecz także z agentami stworzonymi przez innych. To jeden z najważniejszych aspektów, o których należy pamiętać, myśląc o agentach. W takich scenariuszach możemy chcieć **udostępnić innym część możliwości**, jednocześnie zabezpieczając pozostałe.

Dzięki architekturom wieloagentowym możemy pracować jednocześnie z setkami, a nawet tysiącami agentów. Z doświadczenia wiemy, że współpraca z zaledwie kilkoma agentami bywa trudna. Musimy więc ustalić, jak współdziałać z całymi flotami, zwłaszcza pod względem niezawodności, kontroli kosztów i szybkości.

Warto pamiętać, że **błędy mogą propagować się między agentami**. Musimy zwracać szczególną uwagę na jakość systemu, w tym obsługę i raportowanie błędów, oraz zapewniać ścieżki odzyskiwania sprawności.

![Wykres osi czasu dla czterech przykładowych agentów: agenta wiodącego oraz agentów A, B i C. Czas biegnie od lewej do prawej. Agent A popełnia błąd na jednym z etapów. Każdy kolejny etap korzystający z jego wyniku zostaje nim dotknięty: następne etapy agenta A, etapy agenta B, który przejmuje jego zadanie, oraz wynik końcowy agenta wiodącego. Agent C również otrzymuje błędny wynik, ale odzyskuje sprawność, więc jego dalsze etapy nie są nim dotknięte.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-8/frame.html)

## Agent2Agent

Agenci muszą móc swobodnie współpracować, ale zazwyczaj nie chcemy, by udostępniali swoje wewnętrzne szczegóły. Powodem może być zarządzanie kontekstem, specjalizacja, nasze wewnętrzne zasady albo **fakt, że drugi agent do nas nie należy**. Jednocześnie agenci muszą móc się wzajemnie odnajdywać i rozumieć, czego można oczekiwać od danego agenta.

Załóżmy, że mam osobistego agenta z dostępem do moich usług, urządzeń i zasobów. Chcę jednocześnie, żebyś mógł poprosić go o coś, nie ujawniając moich danych osobowych ani nie uzyskując dostępu do używanych przeze mnie aplikacji.

Poniżej dwa agenty próbują umówić spotkanie. Problem polega na tym, że jeden z nich ujawnił prywatne szczegóły dotyczące wpisów w kalendarzu. To nie jedyny problem, bo przy takiej konfiguracji pierwszy agent mógłby poprosić drugiego o usunięcie wpisów z kalendarza, a drugi by się na to zgodził.

![Przykład: dwa agenty rozmawiają o umówieniu spotkania w piątek. Po lewej, w obszarze „Twoja strona”, agent użytkownika ma zadanie i zasoby: Kalendarz oraz Poczta. Po prawej, w obszarze „Moja strona”, agent nie ma opisu samego siebie i ma zasoby: Poczta, Pliki, Inteligentny zamek i Kalendarz. Agent użytkownika pyta: „Co potrafisz?”, a mój agent wymienia wszystkie swoje zasoby. Agent użytkownika pyta: „Czy twój użytkownik może spotkać się w piątek?”. Mój agent wywołuje calendar.list("Friday") i odpowiada na czerwono prywatnymi informacjami: „Dentysta o 09:00, rozmowa kwalifikacyjna w Acme o 14:00. Wolne po 16:00”. Agent użytkownika odpowiada: „W takim razie w piątek o 16:00”.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-9/frame.html)

Jednym z najlepszych sposobów rozwiązania problemu wykrywania agentów i komunikacji między nimi jest [protokół Agent2Agent](https://github.com/a2aproject/A2A), czyli A2A. Jak dotąd nie jest on tak popularny jak Model Context Protocol (MCP) i trudno przewidzieć, czy kiedykolwiek będzie. Jednocześnie oba protokoły ze sobą nie konkurują: MCP rozszerza możliwości pojedynczego agenta, a A2A łączy agentów ze sobą.

Poniżej znajduje się przykład dwóch agentów, w którym jeden odnajduje drugiego. W tym scenariuszu pierwszy agent staje się **klientem**, a drugi **serwerem**. W zależności od konfiguracji może to działać w obie strony i każdy agent może pełnić rolę klienta oraz serwera.

![Dwie ramki: „Twoja strona” i „Moja strona”. W każdej agent łączy się z własnym kalendarzem, będącym serwerem MCP: agent użytkownika przez „MCP: dodaj wydarzenie”, mój agent przez „MCP: odczytaj wydarzenia”. Czerwona linia opisana „A2A” prowadzi od agenta użytkownika do mojego agenta. Spotkanie jest przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-10/frame.html)

Protokół A2A opiera się na założeniu, że każdy agent przedstawia się za pomocą **karty** zawierającej jego nazwę, opis, wersję, dostępne umiejętności i szczegóły połączenia, a także pewne metadane, takie jak informacje o dostawcy czy flagi możliwości. Karty są dostępne zgodnie z konwencją dobrze znanych URI (RFC 8615). Warto również wiedzieć, że w razie potrzeby [dostęp do karty można ograniczyć do uprawnionych użytkowników](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/agent-card-boundary).

![Przykładowa karta agenta (Agent Card) w formacie JSON, opublikowana pod adresem /.well-known/agent-card.json. Zawiera nazwę, opis, wersję, obsługiwane interfejsy, możliwości, formaty wejściowe i wyjściowe oraz umiejętności przykładowego agenta do planowania. Krótka uwaga obok każdej sekcji wyjaśnia, jakie informacje przekazuje ona klientowi. Pod kartą znajduje się informacja, że nie zawiera ona narzędzi wewnętrznych, pamięci ani szczegółów implementacyjnych. Wszystkie wartości są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-12/frame.html)

Agenci udostępniają tylko najważniejsze informacje, więc nie współdzielą **wątków**. Oznacza to, że komunikacja musi zawierać **wszystko, co potrzebne**, w tym niezbędny kontekst. Kontekst ten może obejmować nie tylko tekst, ale również dane strukturalne, takie jak odwołania do plików.

Komunikacja odbywa się za pośrednictwem żądań HTTP(S) i często wykorzystuje format JSON-RPC, dlatego wiadomości zawierają właściwości takie jak **jsonrpc, id, method i params**. Poniżej pokazano przykładową kopertę.

![Karta z żądaniem JSON-RPC wykorzystującym metodę SendMessage. W jego params znajduje się jedna wiadomość A2A. Wiadomość zawiera messageId, role i trzy części: tekst, dane strukturalne oraz odwołanie do pliku. Zawiera również opcjonalne pola contextId, taskId, metadata i extensions. Krótka uwaga obok każdego pola wyjaśnia jego funkcję. Tablica parts jest zaznaczona na czerwono. Wszystkie wartości są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-13/frame.html)

Interakcję można obsłużyć na kilka sposobów: przez odpytywanie, zdarzenia wysyłane przez serwer lub powiadomienia push. Wybór wzorca zależy głównie od naszych potrzeb w zakresie szybkości reakcji i trwałości.

Załóżmy, że agent badawczy potrzebuje informacji od drugiego agenta. Interakcja przebiega następująco:

1. Agent A odnajduje kartę agenta B i poznaje jego możliwości.
   2. Agent A wysyła do agenta B wiadomość zawierającą wszystkie posiadane informacje.
   3. Agent B potrzebuje jeszcze jednego szczegółu. Wstrzymuje zadanie w stanie wymagającym danych wejściowych i zadaje pytanie.
   4. Agent A wysyła odpowiedź z tym samym identyfikatorem zadania.
   5. Agent B kończy zadanie i zwraca wyniki.

Poniżej przedstawiono możliwy sposób reprezentacji tej wymiany. Warto też sklonować [to repozytorium](https://github.com/a2aproject/a2a-samples/tree/main/samples) i porozmawiać z agentem o dołączonych przykładach, aby poznać dostępne wzorce.

![Wymiana A2A między agentem A (agentem badawczym) a agentem B (agentem pogodowym). Wykrywanie: agent A wysyła żądanie HTTP GET pod adres https://weather.example.com/.well-known/agent-card.json, a agent B zwraca kartę agenta z umiejętnością prognozowania deszczu i punktem końcowym JSON-RPC (adres /a2a jest przykładowy). Następnie pojawiają się cztery wiadomości JSON-RPC 2.0: SendMessage z rolą ROLE\\_USER i tekstem „Czy w sobotę we Wrocławiu będzie padać?”; result.task task-abc123 w kontekście ctx-1, ze stanem TASK\\_STATE\\_INPUT\\_REQUIRED i pytaniem agenta „W jakich godzinach?”, bez artefaktu; drugie SendMessage z taskId task-abc123, contextId ctx-1 i tekstem „Od 14:00 do 18:00.”; oraz result.task task-abc123 w stanie TASK\\_STATE\\_COMPLETED z artefaktem rain-forecast: „W sobotę w godz. 14:00–18:00 we Wrocławiu: 20% szans na deszcz, deszczu się nie przewiduje.” Na czerwono zaznaczono stan TASK\\_STATE\\_INPUT\\_REQUIRED oraz taskId w drugim żądaniu: wskazują, że jest to kontynuacja tego samego zadania.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-14/frame.html)

Niezależnie od tego, czy A2A stanie się częścią naszego systemu, warto poznać jego koncepcje, bo mogą się przydać przy budowaniu niestandardowych systemów wieloagentowych. Jedną z nich jest współbieżność. A2A nie rozwiązuje tego problemu w pełni, ale wprowadza takie rozwiązania jak:

- **Wielozadaniowość:** agent może obsługiwać jednocześnie wiele niezależnych zadań, z których każde ma własny identyfikator i stan.
- **Wiele strumieni:** umożliwia wielu klientom subskrybowanie wyników tego samego zadania. Zdarzenia są rozgłaszane do wszystkich aktywnych strumieni w tej samej kolejności. Zamknięcie jednego strumienia nie wpływa na pozostałe.
- **Zarządzanie identyfikatorami zadań:** identyfikatory generuje serwer, a nie klient, aby uniknąć kolizji.

W praktyce istnieje jednak znacznie więcej wyzwań i problemów, przyjrzyjmy się więc niektórym z nich.

## Współpraca wieloagentowa

Najnowsze modele coraz lepiej radzą sobie z [zadaniami długookresowymi](https://metr.org/time-horizons/), ale wystarczy spróbować pracy z agentami w zespole, by zobaczyć, jak trudno zarządzać pracą przebiegającą w tak szybkim tempie. Nawet najprostsze działania łatwo na siebie zachodzą i wchodzą ze sobą w konflikt. Ludzie nie są jedynymi, którym trudno nadążyć — agenci również szybko się gubią.

Nie znam odpowiedzi na wszystkie pytania, z którymi mierzymy się w naszej pracy, ale warto pamiętać o kilku kwestiach:

**Struktura:**
Agenci z łatwością poruszają się po złożonych strukturach, ale mimo to warto zachować **jak największą prostotę** i projektować **przede wszystkim z myślą o agentach**. Warto również ustalić, czy ludzie będą kiedykolwiek czytać dokumenty w ich oryginalnej formie, bo już dziś większość osób korzysta z treści za pośrednictwem agentów. Struktura musi natywnie uwzględniać wszelkie wymagania dotyczące bezpieczeństwa i zarządzania uprawnieniami, ponieważ aspekty te muszą być obsługiwane przez logikę deterministyczną, a nie wyłącznie przez agentów.

![Diagram poziomy. Ciągła strzałka prowadzi od pigułki „Ludzie” do pigułki „Agenci”. Kolejna ciągła strzałka prowadzi od „Agentów” do bramki Uprawnienia. Przerywana linia z etykietą „rzadko” prowadzi od „Ludzi”, nad „Agentami” i w dół do górnej części tej samej bramki. Bramka stanowi lewą ścianę ramki „Struktura”. Widnieje na niej czerwona kłódka, etykieta „Uprawnienia” i słowo „kod”. Strzałka prowadzi od bramki do drzewa workspace/ z katalogami documents/, knowledge/ i skills/. Nic innego nie wchodzi do ramki.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-11/frame.html)

**Kontrakty:**
Idąc za przykładem A2A, możemy chcieć ujednolicić kontrakty dotyczące dokumentów, folderów, komunikacji, raportów i dzienników aktywności. Taka struktura umożliwia **deterministyczne wyszukiwanie**, walidatory i kontrole poprawności. W niektórych przypadkach warto rozważyć **bazy grafowe**.

![Trzy przykładowe kontrakty obok siebie. Wiadomość jest kopertą JSON. Folder ma ustalone drzewo. Dokument zawiera frontmatter. Wszystkie trzy wykorzystują przykładowy identyfikator zadania t-42. Linie prowadzą od każdego kontraktu do jednego elementu zaznaczonego na czerwono: deterministycznego wyszukiwania i walidatorów. Wartości pól są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-15/frame.html)

**Zarządzanie:**
Role menedżerskie w systemach wieloagentowych mają kluczowe znaczenie i warto zadbać o ich prawidłowe zaprojektowanie. Gdy menedżerowie dobrze rozumieją zarówno szeroki, jak i szczegółowy kontekst projektu, mogą podejmować trafne decyzje za innych agentów. Zamiast więc zapewniać wszystkim agentom bezpośredni dostęp do zasobów, kierujemy ich do agentów odpowiedzialnych za zarządzanie tymi zasobami.

![Diagram harnessu wieloagentowego. Agent A i agent B mają dwukierunkowe strzałki do menedżera zasobów. Agent C ma dwukierunkową strzałkę do menedżera narzędzi. Obaj menedżerowie znajdują się w czerwonej grupie „Menedżerowie”. Każdy menedżer ma kolejkę agentów, wolne miejsce i listę reguł. Dwukierunkowa strzałka z etykietą „rozwiązywanie konfliktów” łączy obu menedżerów. Globalny kontekst projektu wskazuje w dół na grupę menedżerów. Każdy menedżer ma jednokierunkową strzałkę do swojego zasobu: Zasobów lub Narzędzi. Przerywana linia w obu kierunkach łączy z menedżerami człowieka, gdy jest potrzebny. Workery nigdy nie mają bezpośredniego dostępu do zasobów ani narzędzi.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-16/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-16/frame.html)

**Samonaprawa:**
Cały system należy zbudować tak, aby mógł obserwować własne działanie, uzyskiwać dostęp do niemal każdego rodzaju dzienników i danych o aktywności, a w niektórych przypadkach modyfikować własną logikę. Działania samonaprawcze mają kluczowe znaczenie i mogą stanowić nawet 40–60% całej pracy wykonywanej przez system. W praktyce oznacza to, że większość uwagi musimy poświęcić mechanizmom umożliwiającym agentom niemal autonomiczny rozwój, któremu możemy zaufać.

![Wykres słupkowy pokazuje, że działania samonaprawcze stanowią 40–60% wszystkich aktywności systemu, a pozostałą część — inne działania. Poniżej słupka pętla przedstawia sposób działania samonaprawy: logika systemu prowadzi do „Obserwuj własne działanie”, następnie „Odczytaj dzienniki i aktywności”, a potem „Uzyskaj dostęp do niemal wszystkich zasobów”. W niektórych przypadkach prowadzi to do „Zmodyfikuj własną logikę”, co zamyka pętlę i wraca do logiki systemu.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-17/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-17/frame.html)

**Śledzenie aktywności:**
Śledźmy wszystko, co dzieje się w systemie, za pomocą platform takich jak [Axiom](https://axiom.co) lub [PostHog](https://posthog.com/). Obserwowalność ma **kluczowe** znaczenie, ponieważ mamy do czynienia z niedeterministyczną logiką, której działania nie da się w pełni wyjaśnić ani „debugować” wyłącznie na podstawie kodu. Logika obserwowalności powinna być natywnie wbudowana w system, tak abyśmy nie tylko rejestrowali odrębne zdarzenia, ale także zachowywali kontekst każdego z nich. Dzięki temu można śledzić całą interakcję między wszystkimi zaangażowanymi agentami.

![Dwa panele obok siebie. Po lewej szara ramka „Samodzielne” zawiera pięć niepowiązanych wpisów dziennika w różnej kolejności: 12:01:04 tool\\_call, 12:01:02 llm\\_response, 12:01:07 error, 12:01:03 tool\\_call, 12:01:05 llm\\_response. Po prawej czerwona ramka „Kontekstowe” zawiera wykres śladu. Drzewo po lewej odczytuje się tak: trace 7f3a, następnie Agent A z tool\\_call i Agent B, Agent B z llm\\_response i Agent C, a Agent C z error. Każdy wiersz ma po prawej oś czasu. Każdy pasek elementu podrzędnego mieści się w przedziale elementu nadrzędnego, a cienkie czerwone linie łączą rodzica z elementami podrzędnymi. Na czerwono wypełniono tylko pasek błędu. Położenie pasków jest przykładowe. Strzałka prowadzi w dół od ramki „Kontekstowe” do przerywanej ramki „Axiom / PostHog”.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-18/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-18/frame.html)

**Heartbeat:**
Podczas pracy agenci mogą napotkać różne błędy i ślepe zaułki albo po prostu z jakiegoś powodu utknąć. Problem polega na tym, że przy zadaniach długookresowych trudno stwierdzić, czy agent utknął, nadal pracuje, czy na coś czeka. Musimy to właściwie wykrywać i reagować. Na szczęście istnieją dobrze znane mechanizmy; jednym z nich jest **heartbeat**, który pozwala okresowo sprawdzać aktywność agentów.

![Diagram osi czasu. Trzej agenci, A, B i C, mają własne osie czasu. Czas biegnie od lewej do prawej. Agent A wykazuje aktywność na całej szerokości. Agent B ma znaczniki aktywności w pierwszej połowie, potem puste kółko, a następnie przerywaną linię bez aktywności. Agent C ma znaczniki w pierwszej połowie, potem czerwony znacznik, a następnie ciągłą linię bez aktywności. Dwa końcowe odcinki bez aktywności wyglądają niemal identycznie. Przerywane czerwone linie heartbeat przecinają wszystkie trzy osie w równych odstępach, a ostatnia linia jest ciągła. Za ostatnią linią widoczne są czerwone etykiety statusu: „pracuje” dla A, „czeka” dla B i „utknął” dla C. Strzałka prowadzi tylko od „utknął” do pola „zareaguj”. Odstępy między znacznikami i liczba linii heartbeat są przykładowe.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-19/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-19/frame.html)

W tym momencie powinno być jasne, że budowanie systemów wieloagentowych jest wymagające, zwłaszcza że nie chodzi w nim wyłącznie o technologię, lecz także o procesy biznesowe, decyzje i potrzeby. Z drugiej strony niektóre z tych mechanizmów można dość łatwo zbudować na istniejących harnessach, rozszerzając ich możliwości za pomocą serwerów MCP lub dostosowań. Musimy jedynie zadbać o to, by nasza konfiguracja nie opierała się na problemach, które wkrótce zostaną rozwiązane. Najlepiej regularnie pytać: **co stanie się z twoim systemem, gdy modele / harnessy będą lepsze?**

## Orkiestracja

Praca bezpośrednio z agentami sprawia, że odpowiadamy za zarządzanie ich pracą, pomaganie im w rozwiązywaniu problemów i kierowanie ich działaniami ku większemu celowi. Aby agenci mogli działać samodzielnie, większość tych czynności trzeba przełożyć na omówione wcześniej funkcje systemu. W prawdziwym świecie wyniki muszą być jednak **wystarczająco niezawodne**, by można było je przewidywać (co da się osiągnąć na wiele sposobów).

Załóżmy, że chcemy, aby agenci obsługiwali proces publikacji filmów w YouTube. Może on obejmować wiele etapów, takich jak:

- montaż surowych nagrań, oczyszczanie i mastering dźwięku,
- generowanie napisów i tłumaczeń,
- przygotowanie tytułu, opisu, tagów i znaczników rozdziałów,
- projektowanie kilku miniaturek, które następnie można poprawiać,
- sprawdzanie praw autorskich, licencji muzycznych i informacji o sponsorach,
- konfigurowanie ekranów końcowych, kart i playlist, przygotowywanie Shorts i klipów,
- tworzenie wersji roboczych postów do mediów społecznościowych, posta społeczności i newslettera,
- planowanie publikacji i pisanie przypiętego komentarza,
- a po publikacji — śledzenie komentarzy i statystyk w celu dostosowania tytułu i miniaturki.

To dużo pracy! Niezależnie od natywnych możliwości LLM-ów prawdopodobieństwo, że **za każdym razem, gdy publikujemy film, wszystko zostanie wykonane prawidłowo**, jest niewielkie, ponieważ większość tych etapów zależy od **naszej strategii, preferencji i procedur**. Ponadto niemal na każdym etapie może wystąpić sytuacja brzegowa, którą musi rozwiązać dobrze wyszkolony agent lub człowiek.

Cały proces musi być nie tylko niezawodny, lecz także spójny i stale doskonalony, tak aby wnioski z przeszłości wpływały na bieżące działanie systemu.

Na podstawie dotychczasowej wiedzy powinno być jednak jasne, że celem nie jest **stworzenie systemu do publikowania filmów**, lecz **zbudowanie prymitywów (uogólnionych elementów składowych)**, które pozwolą systemowi dostosować się do bieżącej sytuacji. Obejmuje to modyfikowanie procesu, a nawet **obsługę innego procesu**, który może korzystać z podobnych prymitywów.

![Pionowy diagram przepływu. U góry znajduje się pięć etykiet: YouTube, Podcast, Artykuł, Newsletter i Druk. Pierwsze cztery strzałki łączą się w jedną, prowadzącą do czerwonej ramki „Agenci publikacji”. Strzałka przechodzi przez pasek Możliwości z etykietami: wideo, audio, obraz, tekst, konta i statystyki. Przerywana szara etykieta Druk ma krótką strzałkę, która zatrzymuje się na pasku z czerwonym ×. W ramce znajduje się rząd sześciu kart etapów: przygotuj, opakuj, zweryfikuj, rozpowszechnij, opublikuj i wyciągnij wnioski. Każda karta ma czerwoną kropkę oznaczającą agenta odpowiedzialnego za etap. Pod etapami znajduje się karta Playbook z etykietami: strategia, preferencje i procedury. Szary nawias prowadzi od Playbooka do rzędu etapów. Czerwona strzałka prowadzi od „wyciągnij wnioski” w dół, do Playbooka. Po prawej, poza ramką, przerywana linia z etykietą „sytuacje brzegowe” łączy pigułkę „Człowiek” z ramką.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-20/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-20/frame.html)

Powinna być tu wyraźnie widoczna różnica między klasycznymi systemami lub przepływami automatyzacji a podejściem opartym na AI: zyskujemy **elastyczność** kosztem **kontroli**. Kontrola jest jednak często kluczowa w procesach biznesowych. Na przykład możemy nie chcieć pozwolić agentowi publikować publicznych komentarzy w naszym imieniu.

Pierwszy wniosek jest taki: **gdy potrzebujemy 100-procentowej pewności, nie możemy polegać na LLM-ach** (choć [rozwiązano zadanie składające się z miliona kroków bez żadnego błędu](https://arxiv.org/pdf/2511.09030)).

Drugi wniosek brzmi: **nie każde działanie w procesie biznesowym wymaga pewności**, więc wystarczy znaleźć odpowiednią równowagę między logiką agentową a kodem deterministycznym. W naszym przykładzie możemy podejść do tego tak:

- montaż wideo można wykonać za pomocą [DaVinci MCP](https://x.com/The_Alex/status/2097847043796725924?s=20) i agenta,
- miniaturki można wygenerować za pośrednictwem [Replicate](http://replicate.com/) lub własnego narzędzia AI do generowania obrazów,
- agent może iteracyjnie poprawiać tytuł, opis itp., a zaakceptować je może dopiero człowiek,
- śledzenie aktywności i statystyk może odbywać się autonomicznie, a powiadomienia dla ludzi mogą być wysyłane tylko w razie potrzeby.

Poziom autonomii zależy tu od firmy, ale wyraźnie widać, że niektóre etapy mogą być realizowane przez agentów w całości lub częściowo. Niektóre etapy zależą od siebie nawzajem, inne nie, a zależności często wynikają z decyzji biznesowych, w tym z potrzeby **fizycznego zablokowania agentowi dostępu do określonych działań**. Wreszcie niektóre działania muszą być wykonywane całkowicie w tle, bez bezpośredniego nadzoru.

![Mapa procesu publikacji filmu w postaci torów. Ma trzy tory: Człowiek, Agent i Tło. Są cztery kolumny: przygotuj, opakuj, opublikuj i wyciągnij wnioski. Na torze Agenta etap montażu (DaVinci MCP) prowadzi do napisów, a następnie do tytułu. Tytuł prowadzi w górę do kroku „zaakceptuj” na torze Człowieka. Akceptacja przechodzi przez etykietę kłódki do punktu łączenia, do którego prowadzą także miniaturki (Replicate). Punkt łączenia prowadzi do publikacji. Od publikacji jedna strzałka zatrzymuje się na zablokowanej ścianie kodu z czerwonym ×, pod krokiem komentarza na torze Człowieka. Druga strzałka prowadzi w dół do statystyk na torze Tła. Czerwona strzałka prowadzi od statystyk z powrotem do miniaturek. Przerywana linia z etykietą „w razie potrzeby” prowadzi od statystyk w górę do toru Człowieka.](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-21/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e04/artifacts/lesson/figure-21/frame.html)

## Najważniejsze wnioski

Zbierzmy teraz to w całość, łącząc z dotychczasową wiedzą:

- **Agenci:** nawet jeśli pojedynczy agent mógłby obsłużyć cały proces, podział obowiązków między agentów daje nam kontrolę nad **ich kontekstem, możliwościami i uprawnieniami**, a także nad **współbieżnością, konfliktami i strukturą**.
- **Prymitywy:** dobrze dobrane, uogólnione elementy składowe zapewniają elastyczność zarówno w kodzie, jak i w czasie działania. Dzięki nim można łatwo rozszerzać możliwości całego systemu przy minimalnych zmianach w kodzie.
- **Code Mode:** agenci mogą automatyzować część pracy za pomocą kodu, ponieważ niektóre działania są powtarzalne i nie wymagają AI, chyba że trzeba zmienić ich logikę.
- **Kontekst:** uruchamiani agenci mogą otrzymywać zarówno dynamiczny kontekst od swojego rodzica, jak i zdefiniowane wcześniej instrukcje zależne od ich roli **lub bieżącego stanu systemu**.
- **Zależności:** agenci lub kod mogą kontrolować proces, określając, które kroki można wykonywać równolegle, a które są od siebie zależne. Niektóre działania można też **blokować** do czasu spełnienia określonych warunków. Na przykład publikacja komentarza może być zablokowana do czasu zatwierdzenia przez człowieka, a po zatwierdzeniu komentarza nie można edytować bez dodatkowej zgody. Jednym ze sposobów realizacji takiej logiki jest skierowany graf acykliczny (DAG).
- **Trwałość:** na koniec, ponieważ mamy do czynienia z długotrwałym procesem częściowo obsługiwanym w tle, konieczne jest użycie pi-durable lub agentów, którzy potrafią odzyskać sprawność po awarii.

Powyższa lista pokazuje, że nasza podróż z MEGA coraz wyraźniej prowadzi nas ku systemom agentowym. Możemy patrzeć na nie z perspektywy **tworzenia oprogramowania** oraz przez pryzmat **systemów wieloagentowych**, które potrafią zarządzać całymi procesami biznesowymi lub obsługiwać je autonomicznie.
