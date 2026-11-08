# S02E03 · Możliwości agentów

Personalizacja środowiska agenta polega na **zwiększaniu szansy**, że agenci będą zachowywać się tak, jak tego potrzebujemy. Jednocześnie nasze instrukcje, wtyczki i rozszerzenia nie powinny ograniczać agenta. W praktyce chodzi o to, by nie mówić agentom, jak mają wykonywać zadania, lecz ułatwić im eksplorowanie środowiska i samodzielne znajdowanie najlepszej drogi.

Biorąc pod uwagę, jak szybko rozwijają się najbardziej zaawansowane modele, personalizacja nie jest czymś, co robi się raz, lecz **procesem, który musimy stale ulepszać** i w pewnym stopniu pozwalać mu doskonalić się samodzielnie. Wymaga odpowiedniego uogólnienia i właściwej równowagi między nadzorem a autonomią, aby można było mu zaufać.

## Plan

- **Personalizacja:** instrukcje globalne, jawne wczytywanie, zakres, konwencje, wskazówki
- **Model Context Protocol:** serwer i klient, narzędzia, zasoby, odkrywanie, konfiguracja, kompromisy między CLI a API, bezpieczeństwo, hosting i utrzymanie
- **Projektowanie własnego MCP:** planowanie integracji, kształtowanie narzędzi, wdrażanie
- **Umiejętności i narzędzia:** procedury, odkrywanie, stopniowe wczytywanie, materiały pomocnicze i skrypty, rozszerzone narzędzia, możliwości wielokrotnego użytku

## Personalizacja

Personalizacja często odbywa się za pomocą **własnych instrukcji** (takich jak AGENTS.md), **umiejętności** i **narzędzi**, ale wiemy, że można ją też realizować przez modyfikacje środowiska agenta, rozszerzenia i piaskownice.

Przyjrzyjmy się najpierw bliżej [agents.md](https://agents.md/#examples) i niektórym przykładom. Znajdziemy wśród nich bardzo szczegółowe instrukcje, a nawet listę kroków, których agent ma przestrzegać. Nawet na stronie można znaleźć taki przykład:

> Zawsze uruchamiaj `pnpm lint` i `pnpm test` przed zatwierdzeniem zmian.

Wiemy już jednak, że takie reguły nie gwarantują, iż agent ich przestrzega, bo może zająć się czymś innym. Jako programiści znamy narzędzia takie jak [Husky](https://typicode.github.io/husky/), które agent może skonfigurować raz, aby określone skrypty uruchamiały się zawsze. W ten sposób możemy zwiększyć **zaufanie**, ponieważ agent zostanie zablokowany. Czasem jednak znajdzie sposób na obejście reguły, a nawet ją wyłączy… albo zrobi to człowiek, ponieważ oba skrypty mogą długo działać i spowalniać cały proces.

![Wykres z jednym przykładem: agent edytuje jeden plik i sprawdza zmianę. Reguła w AGENTS.md uruchamia pnpm lint i pnpm test tylko wtedy, gdy agent jej przestrzega. Hook Husky uruchamia je zawsze. Pełne sprawdzenie lint i test ponownie analizuje wszystkie pliki i uruchamia wszystkie testy, zajmuje trochę czasu przed zatwierdzeniem zmian, a hook można wyłączyć. Jeden edytowany plik jest przykładem.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-1/frame.html)

Dziś LLM-y doskonale wiedzą, jak przeprowadzać ukierunkowaną weryfikację kodu i na podstawie zmian wybrać tylko testy, które rzeczywiście trzeba uruchomić. Proszenie ich o pełne `lint / test` przed każdym zatwierdzeniem zmian nie jest więc szczególnie przydatne, a może wręcz szkodzić.

Z drugiej strony zależy nam na jakości i przeniesienie całej odpowiedzialności na agenta też nie jest dobrym pomysłem. Celem jest zatem **dobrze uogólniona instrukcja** oraz skonfigurowana logika deterministyczna, która **wspiera** agentów, zamiast ich blokować. Na przykład:

> Weryfikuj zmiany proporcjonalnie do ich wpływu. Opisz, co uruchomiłeś.

Zwróćcie uwagę, że to zdanie pozwala agentowi samodzielnie dostosować się do aktualnego stanu środowiska, zamiast nakazywać mu przestrzeganie sztywnych, z góry ustalonych reguł.

Następnie możemy wspólnie z agentem omówić projekt i ustalić, jakie hooki i reguły warto skonfigurować, aby zabezpieczyć ten proces i go zoptymalizować. Jak już wspomnieliśmy, nie robimy tego tylko raz. Możemy ustawić harmonogram, który będzie okresowo sprawdzał, co można ulepszyć **lub usunąć**, ponieważ środowisko agenta i modele mogą się rozwijać, a nasze ustawienia mogą przestać być potrzebne.

![Diagram pętli. Modele i środowisko agenta stale się ulepszają i wpływają na okresowy przegląd. Przegląd prowadzi do dwóch gałęzi: ulepszania, aby wykorzystać nowe możliwości, oraz usuwania ustawień, których agent już nie potrzebuje. Obie gałęzie aktualizują konfigurację środowiska. Konfiguracja trafia następnie do kolejnego przeglądu zgodnie z harmonogramem. Wyróżniono gałąź usuwania. Instrukcja w szczegółach konfiguracji jest przykładem z lekcji.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-2/frame.html)

Takie podejście do uogólniania i iteracyjnej optymalizacji środowiska agenta można stosować wszędzie tam, gdzie pracujemy z agentami — zarówno podczas projektowania ich od podstaw, jak i pracy z istniejącymi rozwiązaniami.

Uogólnianie to umiejętność, którą programiści już posiadają, ale teraz musimy stosować ją zarówno do logiki deterministycznej, jak i niedeterministycznej. Ta druga jest zupełnie nowa i pod wieloma względami sprzeczna z tym, co już wiemy. Wymagany poziom uogólnienia jest jeszcze wyższy w przypadku instrukcji stanowiących **rdzeń agenta**, ponieważ muszą być **rozszerzane** o profile użytkowników, zasoby i umiejętności.

W praktyce musimy pamiętać o różnicy między **instrukcjami podstawowymi** a **personalizacją profilu użytkownika**, ponieważ instrukcje podstawowe są często **rozszerzane** przez inne elementy, ale nie powinny być nadpisywane.

> Uwaga: technicznie nie ma sposobu, by „nadpisać” instrukcję. Choć [Model Spec](https://model-spec.openai.com/2026-08-18.html) sugeruje, że prompt systemowy jest dla modelu ważniejszy niż wiadomości dewelopera lub użytkownika, doświadczenie pokazuje, że model nie zawsze się do tego stosuje.

Myśląc o dobrych instrukcjach dla agenta, możemy rozważyć:

- **Zasady zamiast procedur:** zamiast mówić agentowi, co ma zrobić, przedstawmy mu zasady, których ma przestrzegać, i polegajmy na inteligencji modelu, by dobrze je zastosował.
- **Powód istnienia zasad:** jeśli agent zna [przyczynę danej zasady](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/rule-with-reason), może lepiej się do niej dostosować, a nawet **jawnie ją zignorować**, jeśli dzięki temu osiągnie lepsze rezultaty.
- **Dynamiczne granice:** modele mają domyślnie pewne zachowania, takie jak konieczność potwierdzania przez użytkownika niektórych rodzajów działań. Jak dowiedzieliśmy się w **S02E02**, są jednak sytuacje, na przykład praca agentów działających w tle, w których modele powinny tego unikać. Zachowanie agenta można w praktyce ukierunkować za pomocą **dynamicznie wstrzykiwanych** informacji o bieżącym kliencie. Agent będzie wtedy zachowywać się inaczej, gdy użytkownik rozmawia z nim przez aplikację mobilną, a inaczej, gdy uruchomi go harmonogram.
- **Zachowanie domyślne:** za każdym razem, gdy chcemy, aby model zachowywał się inaczej niż zwykle, musimy mu to polecić. Na razie jednak samo umieszczenie instrukcji w prompcie systemowym nie wystarcza. Trzeba ją też powtarzać w toku interakcji za pomocą hooków.
- **Preferencje:** nawet najbardziej inteligentne modele nie znają naszych osobistych preferencji ani kontekstu, który może wpływać na sposób wykonania pracy. Musimy nauczyć się przekazywać im te informacje bez nadmiernego ograniczania agentów, aby nadal miały **przestrzeń** do znalezienia najlepszego sposobu realizacji zadań.
- **Rozszerzalność:** warto zadać sobie pytanie: „Jak nasze zasady będą działać, jeśli na przykład umiejętności wprowadzą nowe zachowania?”.

Chociaż instrukcje dla modelu są dziś często generowane, nadal musimy pamiętać o uogólnianiu. Jest ono ważne nie tylko przy **rozszerzaniu instrukcji środowiska agenta**, ale również przy **rozszerzaniu narzędzi**, aby agent mógł korzystać z nich w spersonalizowany sposób.

## Model Context Protocol

Wspomnieliśmy już kilka razy o MCP ([Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro)) i mieliśmy nawet okazję z niego skorzystać. Czas przyjrzeć się bliżej samemu protokołowi i jego działaniu.

MCP można postrzegać jako **standard**, który ma ujednolicić połączenie między agentem (lub jego środowiskiem) a zewnętrznymi aplikacjami, usługami, a nawet urządzeniami. Innymi słowy, zapewnia agentowi **nowe możliwości interakcji ze światem**.

Model Context Protocol opiera się na trzech podstawowych pojęciach:

- **Host:** środowisko agenta, takie jak Claude, Codex lub nasza własna aplikacja
- **Klient:** komponent działający w hoście, który zarządza połączeniem z dokładnie jednym serwerem MCP
- **Serwer:** lokalny lub zdalny proces udostępniający hostowi narzędzia i zasoby

Można to przedstawić następująco:

![Diagram przepływu. Ramka Host zawiera dwóch klientów MCP. Jeden klient łączy się z serwerem MCP kalendarza. Drugi klient łączy się z serwerem MCP oświetlenia. Dzięki tym połączeniom agent może korzystać z usługi kalendarza i urządzenia oświetleniowego.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-3/frame.html)

W praktyce najbardziej interesuje nas tworzenie serwerów MCP, które pozwalają popularnym środowiskom agentów uzyskiwać dostęp do naszych usług lub urządzeń. Rzadko tworzy się hosty/klientów MCP, ale aby budować dobre serwery MCP, musimy rozumieć działanie całego protokołu.

Poniżej znajduje się minimalny przykład serwera MCP. Ma on **nazwę**, której środowisko agenta używa, by poinformować agenta, do czego służy serwer. Dalej mamy **narzędzia (schemat i funkcję zwrotną)**, którymi zarządza środowisko agenta. Jak wiemy, schemat może być od razu pokazany agentowi, ale częściej prezentuje się go w minimalnej postaci, na przykład jako same **nazwę i opis**.

![Opisany komentarzami kod źródłowy serwera MCP math-server w TypeScript, korzystającego z Streamable HTTP. Notatki obok kodu wskazują poszczególne elementy: importy, fabrykę handlera, narzędzie add, adapter oraz zabezpieczenia localhost, kontrolę żądań i wywołanie listen. Czerwona ramka wyróżnia fabrykę handlera, która dla każdego żądania tworzy nowy McpServer z narzędziem add. Aby kod zmieścił się w ramce, użyto dwuspacjowych wcięć, podzielono kilka długich wierszy, a komentarze źródłowe zastąpiono notatkami.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-4/frame.html)

Powyższy kod wystarczy, by przekazać agentowi adres serwera MCP (w tym przypadku http://127.0.0.1:3000/mcp) i poprosić go o połączenie. W ten sposób udostępniamy agentowi zdefiniowane narzędzie **add**, a on sam decyduje, kiedy go użyć. Jeśli je wywoła, środowisko agenta **poprosi serwer** o wykonanie funkcji zwrotnej przypisanej do wybranego narzędzia.

Jak pokazuje poniższy graf, mechanizm jest taki sam jak w przypadku narzędzi natywnych. Różnica polega na tym, że **schemat** pochodzi z serwera MCP, który na żądanie **wykonuje funkcję zwrotną**.

![Diagram pionowy. Zapytanie (przykład: „Ile wynosi 2 + 3?”) trafia do modelu wraz z narzędziem add. Model wybiera narzędzie add i generuje ładunek, pokazany jako przykładowy JSON. Środowisko agenta prosi serwer Example MCP o wykonanie narzędzia (czerwona linia). Serwer zwraca wynik do środowiska agenta, które wprowadza go do kontekstu modelu. Liczby i nazwy argumentów są przykładami.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-6/frame.html)

Aby zobaczyć pełny obraz, poniżej przedstawiamy **klienta MCP**, który łączy się z serwerem MCP i udostępnia **listę narzędzi oraz interfejs do ich wywoływania**. Poniższy kod obsługuje dwa typy serwerów MCP: **Streamable HTTP** dla serwerów zdalnych oraz **STDIO** dla lokalnych procesów, które często działają na komputerze hosta.

![Kod źródłowy createClient, klienta MCP w TypeScript. Wyróżniona jest instrukcja transport: tworzy StreamableHTTPClientTransport dla adresu URL oraz StdioClientTransport dla ścieżki lokalnej. Pozostały kod — client.connect i zwracane metody — jest taki sam dla obu serwerów.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-5/frame.html)

Początkowo Model Context Protocol uznawano za chwilowy trend, a wkrótce potem za rozwiązanie gorsze od CLI, które lepiej sprawdzało się **w kontekście pojedynczego użytkownika**. Głównym problemem MCP było wczytywanie przez środowiska agentów wszystkich narzędzi do kontekstu **z góry**, przez co nawet jeden serwer udostępniający 50–90 narzędzi rozrastał kontekst, zanim agent otrzymał jakąkolwiek wiadomość. Dziś mamy jednak tryb kodu, więc możemy wczytać nawet [2500 narzędzi](https://x.com/Cloudflare/status/2024847784914882945?s=20).

MCP to nie tylko narzędzia. Upraszcza też autoryzację, umożliwia udostępnianie **zasobów** (takich jak pliki) i **promptów**, a nawet obsługuje **sampling**, dzięki któremu serwer może poprosić host o wywołanie LLM. Obsługa tych funkcji różni się jednak zależnie od klienta, o czym warto pamiętać.

Obecnie protokół leży u podstaw niemal każdej integracji dostępnej w popularnych środowiskach agentów. Jednocześnie bardzo się rozwinął, między innymi w kierunku **[bezstanowych serwerów MCP](https://modelcontextprotocol.io/seps/2575-stateless-mcp)**, **[umiejętności przez MCP](https://modelcontextprotocol.io/extensions/overview#skills-over-mcp)** oraz **[zdarzeń (wersja robocza)](https://github.com/modelcontextprotocol/experimental-ext-triggers-events/blob/main/docs/design-sketch-proposal.md)**.

Aby utworzyć pierwszy serwer, możemy zacząć od wybrania [SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk) i poproszenia agenta AI o wygenerowanie go. Warto też dołączyć jako wzorzec [ten szablon TypeScript](https://github.com/iceener/streamable-mcp-server-template), który opracowuję na własny użytek. Serwer MCP można hostować na naszym VPS-ie lub w Cloudflare — zależnie od preferencji. Wystarczy udostępnić adres, z którym połączy się środowisko agenta.

Podczas tworzenia serwera MCP warto pamiętać o omówionych w **S02E02** zasadach projektowania narzędzi, a także o tym, że:

- **Nazwa serwera** powinna być możliwie unikatowa, ponieważ środowiska agentów często przedstawiają narzędzia w formacie `server_name__tool_name`, na przykład `spotify__play` albo `integrations.spotify.play()`.
- Można ustawić **instrukcje serwera**, choć większość środowisk agentów je ignoruje lub skraca. Mimo to warto je dodać, aby krótko wyjaśnić agentowi, jak skutecznie korzystać z serwera.
- Serwery MCP mogą być używane wewnętrznie do łatwego współdzielenia integracji i wiedzy między agentami.
- **Ewaluacje:** testuj serwer w popularnych środowiskach agentów, aby sprawdzić, jak zmiany logiki i kształtu narzędzi wpływają na zachowanie. Jak zawsze, warto dążyć do automatyzacji tego procesu.
- **MCP** może nie tylko udostępniać narzędzia, lecz także stać się **warstwą możliwości** agenta, która będzie podążać za użytkownikiem i jego środowiskami agentów. Opisałem tę koncepcję tutaj: https://mega.dev/wrong-about-mcps — w skrócie MCP może udostępniać narzędzia do pracy z **prymitywami**, które obejmują pamięć, integracje, logikę deterministyczną i wiele więcej.

Najciekawsze są tu dwa ostatnie punkty, bo mogą sprawić, że serwery MCP będą niezwykle użyteczne. Warto też rozważyć tworzenie nie jednego, lecz wielu serwerów. Z tym wiąże się koncepcja kontekstu globalnego, dzięki któremu nasze agenty programistyczne będą wiedzieć nie tylko o naszym serwerze MCP, ale również o wszystkich pozostałych.

## Projektowanie własnego MCP

Współczesne agenty potrafią zbudować cały serwer MCP i go wdrożyć, jeśli wskażemy dokumentację usługi, dla której ma powstać. Naszym zadaniem jest ułatwienie im tego procesu (na przykład przez wspomniany szablon), zwiększenie jego niezawodności i **dostosowanie go do naszych potrzeb**. AI nie domyśli się, że możemy chcieć wielu serwerów ani jakie preferujemy końcowe kształty MCP, w tym jakie **umiejętności** chcemy dodać, by rozszerzyć narzędzia.

Jednym z najlepszych sposobów rozpoczęcia pracy nad serwerami MCP jest zbudowanie takiego **dla zabawy** — niekoniecznie do pracy lub dla klientów, lecz po prostu dla siebie. Powinien to być serwer, który po połączeniu z wybranym przez nas środowiskiem stanie się częścią codziennego życia. Przykładem może być **Spotify**. Początkowo może się to wydawać głupie — po co serwer MCP do odtwarzania muzyki? W praktyce istnieje wiele powodów:

- **Personalizacja:** dzięki pamięci agent może poznać nasze preferencje nie tylko w Spotify, ale też powiązać je z porą, miejscami lub osobami. Wspomnienia mogą pomagać nie tylko przy bieżącym odtwarzaniu, ale też w tworzeniu playlist i kolejek.
- **Zaawansowane wyszukiwanie:** rozległa wiedza modeli językowych i agentowe wyszukiwanie w sieci mogą znajdować muzykę na podstawie nieprecyzyjnych opisów lub skojarzeń, na przykład ścieżek dźwiękowych z filmów czy gier.
- **Automatyzacja:** agent połączony z naszymi urządzeniami, kalendarzami i lokalizacją może lepiej dostosowywać muzykę i zarządzać nią autonomicznie.

![Przepływ w trzech kolumnach, po jednej dla każdego zastosowania serwera Spotify MCP: Personalizacja, Zaawansowane wyszukiwanie i Automatyzacja. W każdej kolumnie dane wejściowe użytkownika lub zdarzenie prowadzą do kontekstu dodawanego przez agenta: pamięci, wyszukiwania w sieci albo kalendarza. Następnie następuje wywołanie narzędzia Spotify MCP, a na końcu odpowiedź agenta dla użytkownika. Wiersz kontekstu otacza czerwona ramka. Prośby, utwory, godziny i argumenty narzędzia są przykładami.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-7/frame.html)

Wszystkie te mechanizmy nie muszą zwiększać naszej produktywności, ale mogą dać nam **doświadczenie** z rzeczywistymi scenariuszami, takimi jak:

- **Problemy z łącznością:** zdarzają się często. Serwer MCP powinien prawidłowo obsługiwać awarie i informować agenta o błędach, by mógł znaleźć rozwiązanie lub poprosić o pomoc.
- **Problemy z API:** czasem API zachowuje się nieoczekiwanie, nie sygnalizując żadnego błędu. Spotify na przykład okazjonalnie zwraca całkowicie przypadkowe wyniki wyszukiwania. Innym przykładem jest blokowanie odtwarzania, gdy Spotify jest bezpośrednio połączone z zewnętrznym głośnikiem, takim jak Sonos.
- **Problemy z transkrypcją:** muzyką najłatwiej sterować głosem, często w różnych miejscach i warunkach, które mogą powodować błędy transkrypcji i problemy z rozpoznawaniem intencji. Takie doświadczenia nauczą nas, z jakimi rzeczywistymi przypadkami mogą spotykać się użytkownicy naszych produktów.
- **Nieoczywiste zastosowania:** automatyczna zmiana muzyki, gdy laptop przechodzi w tryb „nie przeszkadzać”, albo przypomnienie utworu na podstawie miejsca i pory jego odtwarzania — takie drobiazgi uczą nas myślenia wykraczającego poza podstawowe polecenia i pozwalają rozwijać rozumowanie na potrzeby agentów działających w tle.
- **Niespodzianki:** gdy pamięć agenta się rozrasta i łączy się on nie tylko z usługami, ale też z urządzeniami i strumieniem zdarzeń naszej aktywności, może zaskoczyć nas playlistami, na które sami byśmy nie wpadli. To zachęca do kształtowania środowiska agenta tak, by lepiej rozumiał nasz kontekst, a to prowadzi do potencjalnych zastosowań serwerów MCP, które zbudujemy w pracy.

![Diagram przepływu w dwóch ramkach. Lewa ramka „Rzeczywiste przykłady ze Spotify MCP” wymienia pięć rodzajów problemów i rzeczywiste przypadki: problemy z łącznością (awarie), problemy z API (przypadkowe wyniki wyszukiwania), problemy z transkrypcją (sterowanie głosem w różnych miejscach), nieoczywiste zastosowania (muzyka przy włączonym trybie „nie przeszkadzać”) i niespodzianki (nieoczekiwane playlisty). Linia łączy każdy problem z wnioskiem w prawej ramce: informuj agenta o błędach, uwzględniaj awarie bez błędów, poznawaj rzeczywiste warunki użytkowników, myśl poza podstawowymi poleceniami i kształtuj środowisko agenta. Problemy z API są wyróżnione jako najważniejszy element.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-8/frame.html)

Tworzenie serwerów MCP dla używanych przez nas usług lub inteligentnych urządzeń jest proste. Nie ma jednak potrzeby odwzorowywania 100% funkcji API, ponieważ agent nigdy nie będzie potrzebował większości z nich. Warto najpierw przejrzeć API, a następnie zaprojektować narzędzia MCP, decydując nie tylko, które działania wybrać, ale też jaki powinny mieć kształt.

Najtrudniejsze są takie funkcje jak **filtrowanie i stronicowanie**, a także zwracanie wyników, które trzeba wzbogacić dodatkowymi wywołaniami API, aby uzyskać pełne szczegóły każdego rekordu. Naszym celem jest **ułatwienie agentowi interakcji**, jak pokazano w poniższym przykładzie.

![Przykład z API Spotify. Po lewej znajdują się trzy endpointy API: GET /v1/search, GET /v1/me/tracks/contains i GET /v1/me/player/devices. Po prawej jedno wywołanie narzędzia MCP, search({ query: "Interstellar soundtrack", limit: 2 }), zastępuje je wszystkie. Poniżej znajduje się przykładowy wynik. Zawiera dwa utwory z oznaczeniem „zapisano”, aktywne urządzenie i kursor następnej strony. Kończy się wskazówkami, zaznaczonymi na czerwono: odtwórz utwór za pomocą play({ uri }), pobierz więcej wyników przez search i kursor oraz wykonaj inne działanie za pomocą ogólnego narzędzia api({ method, path, body }). Zapytanie, utwory, URI, kursor i narzędzie api są przykładami.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-9/frame.html)

Jak widać, MCP to nie tylko **interfejs** umożliwiający komunikację między agentem a usługą zewnętrzną. To także sposób kształtowania tej interakcji, aby zapewnić lepsze wrażenia użytkownika i większą kontrolę nad działaniem, często wymaganą w środowisku produkcyjnym.

Najlepszym sposobem kontynuowania pracy nad tą lekcją będzie wybranie **usługi lub urządzenia**, z którym chcemy zintegrować nasze środowisko agenta, i użycie [tego szablonu](https://github.com/iceener/streamable-mcp-server-template) do wygenerowania pierwszej wersji serwera. Możemy też wyjść poza środowisko agenta programistycznego i wypróbować Grok Bot, Hermes Agent lub inną alternatywę, którą da się dostosować i mieć zawsze dostępną.

Warto też przyjrzeć się stworzonemu przeze mnie do użytku osobistego [Spotify MCP](https://github.com/iceener/spotify-streamable-mcp-server) i porównać go z API Spotify, aby zrozumieć różnice. Następnie możemy podjąć **własne decyzje** dotyczące kształtu tworzonego przez nas MCP. Jak zawsze, nie chodzi o to, by od razu zrobić wszystko idealnie, lecz o opublikowanie pierwszej wersji i iterowanie nad nią.

Podsumowując, proces wygląda następująco:

1. **Typ:** w przypadku procesów lokalnych lepiej wybrać CLI niż MCP.
2. **Zakres:** często nie ma potrzeby odwzorowywania 100% istniejącego API w narzędziach MCP. Musimy więc określić przynajmniej ich początkowy kształt, uwzględniając zastosowania, które **AI może wygenerować dla nas** i przedstawić jako plik HTML / MDX.
3. **Pierwsza wersja:** mimo że możemy wygenerować całe MCP jednym promptem, lepiej utrzymać je możliwie lekkie, aby szybko iterować nad jego podstawowymi funkcjami. Gdy będą gotowe, AI może wdrożyć resztę, kierując się istniejącymi wzorcami.
4. **Środowisko agenta:** jako programiści możemy znać lokalne agenty programistyczne. Jeśli nadal są naszym domyślnym rozwiązaniem, warto rozważyć przeniesienie niektórych do chmury.
5. **Iteracje:** iterowanie nad kształtem MCP wymaga czasu, zwłaszcza gdy mamy wiele serwerów. Możemy poradzić sobie z tym za pomocą **kontekstu globalnego / mapy**, z której agenty będą korzystać do zarządzania MCP i oceny zmian.
6. **Wdrożenie:** jak wspomnieliśmy, najłatwiej wdrożyć MCP na Cloudflare Workers, ale możemy też hostować je na własnym VPS-ie i udostępnić pod subdomeną. Niezależnie od wybranej opcji agentom trzeba przekazać, jak uzyskać dostęp do instancji, odczytywać ich dzienniki i monitorować potencjalne problemy.

## Umiejętności i narzędzia

Do tej pory omawialiśmy głównie umiejętności jako sposób na uniknięcie powtarzania tych samych instrukcji i dostosowanie zachowania agenta do naszych preferencji. Powinno już być jasne, że chcemy unikać umiejętności mówiących agentowi **dokładnie, co ma zrobić**, bo ograniczałoby to jego naturalne możliwości. Wyjątkiem są **procedury**, które mogą zawierać dokładne kroki do wykonania. Ponieważ kroki te są specyficzne dla naszego przypadku, model trzeba po prostu o nich poinformować.

Chcemy teraz skupić się na **łączeniu** umiejętności z narzędziami, opierając się na dogłębnym zrozumieniu tego, jak środowiska agentów obsługują oba te elementy, oraz na naszej wiedzy o **uogólnianiu instrukcji**. Dzięki temu ukierunkowanie pozostanie na tyle łagodne i elastyczne, by agent mógł osiągać najlepsze rezultaty w każdej sytuacji.

Obecnie najlepszym sposobem na tworzenie **narzędzi rozszerzonych o umiejętności** jest użycie **[rozszerzenia skills](https://modelcontextprotocol.io/seps/2640-skills-extension)** dla MCP. Serwer może wtedy udostępniać zarówno narzędzia, jak i umiejętności, a środowisko agenta pokaże modelowi ich nazwy i opisy, aby mógł on **odkryć i wczytać je w razie potrzeby**.

![Diagram pionowy. U góry ramka Środowisko agenta zawiera Agenta, a pod nim klienta MCP. Agent wywołuje narzędzie przez klienta. Poniżej środowiska, poza nim, ramka serwera MCP zawiera obok siebie Narzędzie i Umiejętność. Klient uruchamia narzędzie. Przerywana czerwona linia do umiejętności ma etykietę „nie wczytano”. Linia od umiejętności do narzędzia ma etykietę „wskazuje, jak używać”.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-10/frame.html)

Załóżmy, że mamy narzędzie do **generowania obrazów**, które korzysta z API [Replicate](https://replicate.com/home). Narzędzie może też udostępniać zestaw umiejętności opisujących różne style, takie jak sztuka koncepcyjna, sztuka pikselowa, realistyczne zdjęcia czy kreskówki. Aby zwiększyć niezawodność takiej konfiguracji, [opis narzędzia powinien informować, że można użyć z nim umiejętności, a każda umiejętność powinna wskazywać narzędzie, z którym może współpracować](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/tool-skill-links). **Nie oznacza to jednak**, że zawsze trzeba ich używać razem. Instrukcje mogą dopuszczać użycie każdego z tych elementów osobno.

![Jeden serwer MCP zawiera narzędzie do generowania obrazów oraz zestaw umiejętności dotyczących stylów: sztuka koncepcyjna, sztuka pikselowa, realistyczne zdjęcia i kreskówki. Łączą je dwie czerwone linie. Opis narzędzia mówi, że można użyć go z umiejętnością dotyczącą stylu. Każda umiejętność wskazuje, że można jej użyć z narzędziem do generowania obrazów. Nad serwerem agent otrzymuje prośbę o użycie narzędzia z jednej strony i umiejętności z drugiej. Z dowolnego punktu wejścia agent znajduje odniesienie do drugiego elementu. Nazwy umiejętności są przykładami z tekstu.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-11/frame.html)

Następnym krokiem jest **łączenie umiejętności** za pomocą „umiejętności-routerów”. Załóżmy, że serwer udostępnia zestaw narzędzi do obróbki obrazów, wideo i dźwięku oraz umiejętności wskazujące, jak stylizować każdy z tych rodzajów treści. Umiejętności mogą też odsyłać do siebie nawzajem, dzięki czemu przez MCP można udostępniać zaawansowane przepływy pracy.

![Diagram umiejętności-routerów na jednym serwerze MCP. U góry agent otrzymuje przykładową prośbę: „Stwórz zwiastun w stylu sztuki pikselowej z retro ścieżką dźwiękową”. Czerwona linia prowadzi od agenta do umiejętności Ruter, jedynego elementu w czerwonej ramce. Ruter i trzy grupy (Obraz, Wideo i Dźwięk) znajdują się w ramce serwera MCP. Każda grupa ma narzędzie na dole i umiejętności stylizacji nad nim. Cienkie linie łączą każde narzędzie z jego umiejętnościami. Umiejętności grupy Obraz to sztuka pikselowa, sztuka koncepcyjna, realistyczne zdjęcie i kreskówka. Umiejętności grupy Wideo to animacja i styl filmowy. Umiejętności grupy Dźwięk to retro, muzyka ambientowa i lektor. Czerwone linie prowadzą od rutera do sztuki pikselowej, animacji i retro. Neutralne strzałki łączą sztukę pikselową z animacją, a animację z retro, tworząc przepływ pracy. Cienka, przerywana linia z etykietą „można pominąć ruter” prowadzi od agenta bezpośrednio do narzędzia Obraz. Nazwy umiejętności, prośba i wybory routera są przykładami. Retro to przykładowa umiejętność dźwiękowa dodana na potrzeby tej prośby.](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e03/artifacts/lesson/figure-12/frame.html)

Wniosek jest taki: projektując agenta, warto utrzymać jego rdzeń prostym i elastycznym, a następnie wyspecjalizować go za pomocą **narzędzi i umiejętności MCP**. Celem nie jest uczenie agenta dokładnie, jak ma wykonywać zadania. Zamiast tego zapewniamy mu możliwości, by sam znalazł najlepszy sposób ich wykorzystania, albo procedury, których może przestrzegać.

## Wnioski

Powinno być już jasne, że **uogólnianie** to jedna z najważniejszych umiejętności, które trzeba rozwijać, jeśli chcemy budować dobre agenty. Uogólnianie musi być jednak „wbudowane” również w samych agentach. Innymi słowy, należy unikać przekazywania im dokładnych procedur. Zostawmy im trochę przestrzeni na dostosowanie się, aby mogły znaleźć najlepszy sposób realizacji zadania.

Uogólnianie powinno pojawiać się nie tylko w promptach, ale również w sposobie projektowania **narzędzi i umiejętności agentowych**, serwerów MCP oraz narzędzi CLI.

Jest też oczywiste, że ogólnie dobry agent powinien działać w dedykowanej piaskownicy z nieograniczonym dostępem do systemu plików i wykonywania kodu. Umożliwia to zaawansowane zarządzanie kontekstem, ponieważ agent może wykorzystać swoje naturalne umiejętności pisania kodu i korzystania z terminala. Dzięki nim może łatwo uzyskiwać dostęp do historii sesji, wyników narzędzi i wygenerowanych artefaktów.

Z drugiej strony w niektórych przypadkach agent potrzebuje jedynie łatwego dostępu tylko do odczytu do dokumentów oraz ograniczonego środowiska wykonawczego. To od nas zależy, która ścieżka lepiej pasuje do danego zastosowania.

Najważniejszy wniosek na dziś to **stworzyć własny serwer MCP**, choćby dla zabawy, aby samodzielnie poznać jego zalety i wady. Nawet jeśli nie użyjemy tego serwera z własnym środowiskiem, lecz z istniejącym, pomoże nam to zrozumieć, co wyróżnia dobry serwer MCP. W pewnym momencie możemy też zbudować własny host MCP, aby poznać cały protokół.
