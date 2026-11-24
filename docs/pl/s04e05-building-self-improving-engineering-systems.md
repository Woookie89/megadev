# S04E05 · Budowanie samodoskonalących się systemów inżynierskich

> **Ta lekcja jest rozszerzona.** Ma dwie części. Ta część zawiera wideo Johna i wyjaśnia zasady budowania samodoskonalących się systemów inżynierskich. [Build guide](https://hq.mega.dev/lessons/s04e05/build-guide/) to pisemna wersja tego, co John buduje na wideo, krok po kroku, z promptami i sprawdzeniami dla każdego joba. Na tej stronie notatki zaczynające się od „Jak to robi John” łączą każdą zasadę z tym, jak John ją zbudował.

Generatywna sztuczna inteligencja potrafi zbudować niemal wszystko, o co poprosimy. Agenci potrafią też ustalić, co zbudować, po prostu przyglądając się swojemu środowisku i dostępnym zasobom. Dzięki temu mogą podnosić się po błędach, naprawiać bugi, a nawet ulepszać samych siebie. A gdy system jest zbudowany we właściwy sposób, mogą modyfikować własną logikę, wprowadzać zmiany, a nawet je wycofywać, jeśli coś pójdzie nie tak. Oznacza to też, że przy właściwej konfiguracji agenci budują nie tylko narzędzia, których mogą używać, ale też **całe funkcje i moduły**.

Tę koncepcję można stosować na wiele sposobów, w tym jako bardzo prosty mechanizm w naszych agentach kodujących, podstawowych skryptach crona czy prostych usługach w tle napędzanych przez AI. Można powiedzieć, że **to sposób myślenia**, ale też zestaw nawyków i wzorców, którymi możemy się kierować, by zmienić sposób pracy. Zamiast skupiać się bezpośrednio na tym, **jak coś zrobić**, częściej możemy myśleć o tym, **jak zbudować coś, co będzie to robić.**

W tej ostatniej lekcji MEGA skupimy się na koncepcji **samodoskonalących się systemów autonomicznych** i na tym, jak stosować ich elementy zarówno w codziennej pracy, jak i przy budowie takich systemów.

## Plan

- Informacja zwrotna: ślady, porażki, poprawki, ewaluacje, uwagi z review, decyzje użytkownika
- Ewaluacja: drabiny dowodów, punkty odniesienia, walidatory, testy regresji, wersjonowane wyniki
- Destylacja: zamiana udanych przebiegów w skille, reguły, przepływy pracy, kontekst i agentów wielokrotnego użytku
- Optymalizacja: dopracowywanie profili, routingu, narzędzi, środowisk i doboru modeli na podstawie obserwowanych wyników
- Nadzór: proponowanie, testowanie, zatwierdzanie, wersjonowanie i wycofywanie zmian w systemie

## Informacja zwrotna

Samodoskonalenie wymaga od nas **domknięcia pętli**. System musi sam ustalić zarówno **początkowe dane wejściowe** (co trzeba zrobić), jak i **informację zwrotną** (jak dobrze mu poszło). Brzmi to oczywiście, ale w praktyce nie jest łatwe. Prawie nikt tak nie pracuje. Domyślnie zajmujemy się jednym i drugim sami. Nawet w klasycznej automatyzacji dane wejściowe i informacja zwrotna są w większości znane z góry, a tutaj wszystko jest dynamiczne i trudne do przewidzenia. To prowadzi nas z powrotem do koncepcji **przyrostowych ulepszeń** całego systemu i jego środowiska zamiast prób zbudowania wszystkiego od razu.

Pętla poniżej pokazuje, jak informacja zwrotna domyka cykl i **może rozpocząć kolejną iterację**, dlatego jest tak ważna. Liczy się nie tylko to, czy informacja zwrotna w ogóle jest, ale też **jej jakość**: **wysoki stosunek sygnału do szumu**, **prawdziwość**, **kompletność**, **aktualność** i **dostępność**. A wszystko to trzeba osiągnąć autonomicznie i dynamicznie, przy minimalnym udziale użytkownika.

![Pętla informacji zwrotnej narysowana jako prostokąt w ramce „System autonomiczny”. Cztery pudełka idą zgodnie z ruchem wskazówek zegara. „Znajdź pracę” (co trzeba zrobić?) wysyła „wejście” do „Działaj” (wprowadź ograniczoną zmianę). „Działaj” wysyła swój „wynik” w dół do „Sprawdź wynik” (jak dobrze to zadziałało?). Dwie czerwone strzałki domykają pętlę. „Sprawdź wynik” wysyła „informację zwrotną” w lewo do „Wybierz następny krok” (wykorzystaj dowody). „Wybierz następny krok” prowadzi w górę do „Znajdź pracę” z podpisem „może rozpocząć kolejną iterację”. Pośrodku czerwony nagłówek „Użyteczna informacja zwrotna” wymienia pięć cech: wysoki stosunek sygnału do szumu, prawdziwość, kompletność, aktualność i dostępność. Linia pod ramką mówi: „Ulepszaj system i jego środowisko, krok po kroku”. Pętla nie obejmuje żadnej osoby ani zewnętrznego zadania.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-1/frame.html)

W jednej ze swoich [niedawnych prezentacji](https://youtu.be/O_zcc6Xl12g?t=744) Lauren Tan wymieniła listę **znanych technik testowania, walidacji i obserwowalności oprogramowania**, których można użyć, by **zwiększyć zaufanie do agentów**. Wiele z nich, jeśli nie wszystkie, może dostarczać agentom wysokiej jakości informacji zwrotnej. Niektóre mogą wręcz **zapobiegać** określonym typom błędów, a inne po prostu **mówią agentom, co jest nie tak**, by same mogły ustalić, co zrobić.

![Mapa testowania oprogramowania w czterech równych kolumnach, czytanych od lewej do prawej. Pierwsza kolumna, pod szarym zakresem „Przed produkcją”, wymienia dwadzieścia sprawdzeń, od testów jednostkowych po testy wydajności. Czerwony zakres „Testowanie na produkcji” obejmuje pozostałe trzy kolumny, podpisane Wdrożenie, Wydanie i Po wydaniu. Wdrożenie wymienia testy integracyjne, tap compare, testy obciążeniowe, shadowing, testy konfiguracji i soak testy. Wydanie wymienia canarying, monitoring, traffic shaping, feature flagi i śledzenie wyjątków. Po wydaniu wymienia jedenaście praktyk, od teeingu po doświadczenia z dyżurów on-call. Weryfikacja trwa także po wdrożeniu.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-2/frame.html)

W zespole Lauren te działania odpowiadają za mniej więcej 70% tokenów zużywanych na kodowanie i służą budowaniu zaufania do agentów. Dzięki temu jej zespół dostarcza do 11 000 PR-ów miesięcznie, nie tylko utrzymując jakość, ale wręcz ją poprawiając. Podobne spojrzenie przedstawia Addy Osmani w artykule „[How the Claude Code team thinks about verification](https://x.com/addyosmani/status/2122590683055993308)”.

Większość powyższych technik skupia się na **bazie kodu** i niektórych aspektach produktu. Jednocześnie odzwierciedlają one **sposób myślenia** o systemach niedeterministycznych, który można zastosować także do samodoskonalących się autonomicznych agentów. W takich systemach weryfikacja i informacja zwrotna mogą pochodzić bezpośrednio ze środowiska w czasie działania. System potrzebuje wtedy sposobu na **autorefleksję**, na przygotowanie i **zastosowanie** zmian oraz na **dalszą pracę**. Jeśli coś pójdzie nie tak, potrzebuje sposobu, by wycofać te zmiany i wrócić do działania.

Na tym etapie znamy już wszystkie wzorce i narzędzia potrzebne do zbudowania prostego systemu, który potrafi takie rzeczy, co pokazuje agent **[self-change](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/self-change)**. Po jego uruchomieniu zobaczymy w przeglądarce wizualizację logiki, której agent używa do obsługi zadań.

Gdy coś pójdzie nie tak, agent modyfikuje sam siebie, **przepisując swoją regułę routingu i restartując własny proces**. Ale nowa reguła jest tylko propozycją: zanim zacznie obowiązywać, musi przejść stałe sprawdzenie, nad którym agent nie ma kontroli. W przykładowym przebiegu pierwsza reguła agenta nie przechodzi, bo zostawia zwykłe zgłoszenia bez kolejki, więc nadal obowiązuje poprzednia reguła. Agent czyta, co poszło nie tak, poprawia regułę i znów się restartuje. Gdy sprawdzenia przechodzą, kontynuuje to samo zadanie z nową logiką.

Rozmowa i log akcji przetrwają na dysku, a receipty zapobiegają dwukrotnemu przekierowaniu tego samego zgłoszenia. Zarówno **zaplanowany restart**, jak i **awaria** przechodzą tę samą ścieżkę odzyskiwania, więc zmiana agenta nie oznacza utraty jego pracy.

![Oś czasu z czterema rzędami: Reguła w użyciu, Stałe sprawdzenie, Agent i Log na dysku. W rzędzie Agent trzy paski procesów następują po sobie, z kropkowaną przerwą na restart między nimi. Podpis „restart” jest pod każdą przerwą. Szara linia propozycji wychodzi w górę z pierwszego procesu i zatrzymuje się na przerywanej linii sprawdzenia: Odrzucona, zgłoszenie nie dostaje kolejki. Linia reguły pozostaje bieżącą regułą. Czerwona linia propozycji wychodzi w górę z drugiego procesu, przecina linię sprawdzenia (Przyjęta, każde zgłoszenie dostaje kolejkę) i dochodzi do rzędu reguły, gdzie zaczyna się czerwona poprawiona reguła. Jedna linia logu biegnie pod wszystkimi trzema procesami, a drugi i trzeci proces czytają log.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-3/frame.html)

Kolejny przykład samoewoluującej architektury pochodzi z pracy [A Programming Paradigm for Spatiotemporal Composability](https://arxiv.org/pdf/2608.25512), której autorami są badacze z Uniwersytetu Pekińskiego i DeepSeek. W odróżnieniu od naszego agenta self-change ta architektura nie restartuje procesu. Wymienia pojedynczą część systemu, podczas gdy reszta dalej działa. Każda zmiana, którą część wprowadza w systemie, jest zapisywana razem ze sposobem jej cofnięcia, więc gdy część zostanie usunięta albo zastąpiona, jej skutki zostają w pełni odwrócone. Praca wskazuje jeden cel, agentów, którzy przepisują komponenty własnego harnessu, ale testuje ten pomysł na pluginach, a nie na agentach. Nie sprawdza też nowej części, zanim zostanie użyta. A to jest właśnie zadanie stałego sprawdzenia w naszym przykładzie. Razem te dwa pomysły dają system, który potrafi zmieniać swoje części w czasie działania, odrzucać złe zmiany i czysto cofać te, które już wprowadził.

![Oś czasu w trzech rzędach. Rząd pierwszy, System: jeden szary pasek bez przerwy, podpisany „bez restartu”. Rząd drugi, Jedna część: pasek „Stara część” kończy się pośrodku, potem jest kropkowana przerwa „wymiana”, a następnie zaczyna się pasek „Nowa część”. Przerywana pionowa linia w przerwie jest podpisana „Stałe sprawdzenie z naszego przykładu”. Szara strzałka z podpisem „część usunięta” biegnie w dół od końca starej części do rzędu trzeciego, Zapis. Na linii zapisu trzy kropki pod starą częścią i trzy kropki pod nową częścią mają podpis „zmiany zapisane”. Czerwona strzałka pod linią wskazuje z powrotem pod kropki starej części, z podpisem „jej zmiany są cofnięte”.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-4/frame.html)

Obie strategie mają podobne cele, ale różnią się pod wieloma względami, zarówno implementacją, jak i tym, co umożliwiają. Jednocześnie kierują się wspólnymi zasadami, takimi jak **trwałość**, **architektura oparta na prymitywach**, **samonaprawa** i **autorefleksja**. Wreszcie jest też informacja zwrotna, której oba systemy potrzebują, by ocenić, czy wprowadzone zmiany je ulepszyły, czy nie.

Idea samodoskonalących się autonomicznych systemów agentowych daje nowe możliwości, ale też stawia wyzwania. Z jednej strony potrzebną funkcję można zbudować w locie. Z drugiej: jak sprawić, by była niezawodna, bezpieczna i skalowalna? Na część tego pytania odpowiedzią są ścisłe typy, przemyślane prymitywy i obserwowalność. Na inne nie ma jeszcze jasnych odpowiedzi. Ale nie zawsze będziemy ich potrzebować od razu, bo samoewolucja może dotyczyć małych usług w tle, które działają w ograniczonym zakresie. Takie usługi łatwo kontrolować, a jednocześnie można dać im przestrzeń, by same dynamicznie się dostosowywały.

**Jak to robi John:** każda wizyta w recepcji zostawia receipt: ile trwała, ile kosztowała, ile pochodziło z cache'u i czy odpowiedź zgadzała się z zapisanym rekordem. Request, którego recepcja nie może obsłużyć, staje się jedną linią na liście dla użytkownika, a tę linię pisze kod. Potem wizyty stają się sprawdzeniami, które można uruchamiać ponownie, z linią Saved, która czyta rekordy samej aplikacji, a nie słowa recepcji. Celowo zepsuta recepcja, uprzejma, ale niczego niezapisująca, tych sprawdzeń nie przechodzi. Zobacz [Open a Front Desk for Visiting Agents](https://hq.mega.dev/lessons/s04e05/build-guide/#open-a-front-desk-for-visiting-agents).

## Ewaluacja

W **S02E05** omawialiśmy obserwowalność i ewaluacje, i choć agenci w pewnym stopniu się nimi zajmowali, nadal musieliśmy angażować się na wielu etapach. Teraz jednak chcemy pójść dalej w stronę autonomii. Nie musi to oznaczać, że całkiem znikamy z obrazka, ale nasza rola przesuwa się tam, gdzie jesteśmy potrzebni, czy chodzi o drobne szczegóły, czy o ogólny kierunek.

Jedną z zasad, które warto rozważyć, jest **oddzielenie** ewaluatora od systemu. Powodów jest co najmniej kilka:

- **Zakres:** ewaluator może patrzeć na więcej niż jeden system, by sprawdzić, jak dobrze działają w szerszej strukturze, o której sam system może nie wiedzieć.
- **Uprawnienia:** ewaluacja może wymagać dostępu do kontekstu, narzędzi lub usług, do których sam system nie może dostać dostępu.
- **Niezależność:** system nie może zmienić sprawdzeń tak, by przechodziły, a ryzyko innych rodzajów oszukiwania jest mniejsze.
- **Kontrola:** osobny ewaluator może działać według własnego harmonogramu, budżetu i konfiguracji.

![Przykładowe zgłoszenie do supportu przechodzi jedną ścieżkę z czterema punktami: zgłoszenie przychodzi, trafia do działu rozliczeń, odpowiedź zostaje wysłana, a po kropkowanej przerwie oznaczonej „kilka dni później” zgłoszenie zostaje ponownie otwarte, na czerwono. Nad ścieżką dwa krótkie odcinki pokazują, co widzi każdy system. Router zgłoszeń obejmuje pierwszą część, a system piszący szkice odpowiedzi drugą. Każdy z nich raportuje „gotowe”. Żaden odcinek nie sięga ostatniego punktu. Pod przerywaną granicą, której systemy nie mogą przekroczyć ani zmienić, pod wszystkimi czterema punktami biegnie jeden długi czerwony odcinek ewaluatora. Widzi on całą ścieżkę i wydaje werdykt „nierozwiązane”. Zgłoszenie i wszystkie podpisy są przykładowe.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-5/frame.html)

Ewaluator (albo „Sędzia”) może używać deterministycznej logiki, by weryfikować określone aspekty naszego systemu według ścisłych reguł. Ewaluatorem może też być inny agent, który specjalizuje się w obserwowaniu i ocenianiu, a nawet w **generowaniu** zbiorów danych i ewaluacji. Część sprawdzeń możemy zdefiniować i dopracować z góry, tak by agent nie mógł ich modyfikować.

Jeśli teraz wrócimy do agenta **Specter** z **S04E01**, możemy postawić obok niego Sędziego: osobnego agenta, który działa co noc. Sędzia czyta log i notatki Spectera i zamienia je w zbiory danych. Na przykład: które akcje obudziły agenta i czy była to dobra decyzja, jakie notatki zostały zapisane i z jakich źródeł oraz jakie e-maile zostały wysłane i co z nimi zrobiliśmy.

Do tego dochodzą rzeczy, które definiujemy sami i utrzymujemy jako stałe, takie jak **sprawdzenia w kodzie** (dozwolone ścieżki, zaufane źródła, jeden e-mail na klucz wysyłki) oraz zbiory danych dla awarii i prompt injection.

![Dwie ramki obok siebie, Specter po lewej i Sędzia po prawej, z czterema wyrównanymi rzędami. Cztery poziome strzałki między ramkami zmieniają kierunek w każdym rzędzie. Rząd pierwszy: Specter „Działa” i wysyła „log i notatki” do Sędziego, który „Buduje zbiory danych”. Rząd drugi: Sędzia „Ocenia przebiegi” i odsyła „wniosek” do Spectera, który „Dostaje wniosek”. Rząd trzeci: Specter „Proponuje zmianę” i wysyła „propozycję” do Sędziego, który „Przeprowadza próbę”, odtwarzając zapisane akcje. Rząd czwarty: Sędzia „Decyduje” i wysyła czerwony „werdykt”, zostawić albo wycofać, do Spectera: „Reguła w użyciu”. Pod ramką Sędziego jest przerywane pudełko „Ustalone przez nas”: sprawdzenia, zbiór awarii, zbiór injection. Krótka strzałka prowadzi z tego pudełka w górę do Sędziego. Notatka obok pudełka mówi: „żaden agent nie może zmienić tej części”. Wniosek (budził się przy drobnych edycjach) i zmiana (nowa instrukcja budzenia) są przykładami.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-6/frame.html)

Gdy to wszystko jest na miejscu, pętla może się domknąć bez nas. Sędzia może na przykład ustalić, że Specter wiele razy budził się przy drobnych edycjach i że jego działania były nieefektywne. Specter może wtedy przeczytać te wnioski i zaproponować zmianę instrukcji, która decyduje, kiedy się budzi. Następnie Sędzia odtwarza zapisane akcje na nowej wersji. Zmiana zaczyna obowiązywać tylko wtedy, gdy wynik się poprawi i żadne stałe sprawdzenie nie zawiedzie. W przeciwnym razie zostaje poprzednia wersja.

Sędzia może szybko rozrosnąć się w osobny system, który zarządza resztą naszej infrastruktury, naszymi agentami i ich współpracą. Jednocześnie chcemy uniknąć nadmiernego komplikowania go, a odpowiedź na to już mamy: **dobre prymitywy**, takie jak:

- **Wersja:** jeden dokładny, zahashowany stan systemu: jego instrukcje, skille, hooki i ustawienia. Każda zmiana tworzy nową Wersję i tylko jedna jest aktywna.
- **Przypadek:** jedna zapisana sytuacja, którą można odtworzyć, na przykład akcja użytkownika razem z kontekstem z tamtej chwili. Przypadek pochodzi z dziennika samego systemu albo dostarczamy go my.
- **Sprawdzenie:** jedno pytanie o wynik, z jednym sposobem odpowiedzi: regułą w kodzie, modelem albo prawdziwym rezultatem zaobserwowanym później.
- **Próba:** jeden ograniczony przebieg, który odtwarza zestaw Przypadków na Wersji i stosuje Sprawdzenia.
- **Werdykt:** decyzja Sędziego o Wersji w porównaniu z aktywną, zawsze z dowodami: zostawić, wycofać albo zapytać użytkownika.

Razem czyta się je niemal jak zdanie: **Próba** odtwarza **Przypadki** na **Wersji**, **Sprawdzenia** oceniają wynik, a **Werdykt** decyduje. Dla innego systemu zmieniają się tylko Przypadki i Wersja. A architektura wygląda tak:

![Architektura Sędziego zbudowanego z pięciu prymitywów, na przykładzie agenta Specter. Po lewej ramka Specter zawiera trzy przykładowe pudełka: Aktywna wersja (reguła budzenia w użyciu), Dziennik (akcje, notatki, e-maile) i Propozycja (nowa reguła budzenia, przerywana). Po prawej ramka Sędzia zawiera Sprawdzenia (kod albo model), Przypadki (zapisane sytuacje) i Wersję (dokładna wersja). Z każdego z tych trzech pudełek wychodzi strzałka do jednego wysokiego pudełka Próba (ograniczony przebieg), a z Próby strzałka do Werdyktu (zostawić albo wycofać). Strzałka podpisana „odtworzone” prowadzi z ramki Specter do ramki Sędzia na wysokości Dziennika i Przypadków. Strzałka podpisana „przetestowane” prowadzi z ramki Specter do ramki Sędzia na wysokości Propozycji i Wersji. Jedna czerwona ścieżka podpisana „werdykt” wychodzi z góry Werdyktu i wraca na górę ramki Specter. Pod Sędzią przerywane pudełko My (ustalamy część sprawdzeń i przypadków) ma strzałkę w górę do Sędziego. Pod Specterem notatka mówi: inny system: zmienia się tylko ta strona. Teksty w ramce Specter są przykładami. Wniosek: Sędzia potrzebuje pięciu rzeczy: sprawdzeń, przypadków, wersji, próby i werdyktu. Dla innego systemu zmieniają się tylko przypadki i wersja.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-7/frame.html)

W praktyce możemy chcieć mieć **więcej niż jednego Sędziego**. A ponieważ Sędziowie to po prostu agenci, możemy stosować te same wzorce wieloagentowe, które omawialiśmy w **S02E04**, na przykład używać wielu modeli do weryfikacji i generowania pomysłów.

**Jak to robi John:** ewaluator jest trzymany z dala od agenta, którego ocenia. Kilka zapieczętowanych przypadków leży w folderze poza projektem, a agent wprowadzający zmiany jest uruchamiany tak, że komputer odmawia mu dostępu do tego folderu. Wyniki wracają jako jedna sucha linia na przypadek. Hook Gita po każdym commicie lub merge'u, który dotyka agenta, uruchamia jego codzienne sprawdzenia i zapieczętowane przypadki, a jeśli zapieczętowanych przypadków nie dało się uruchomić, mówi to wprost. Zobacz [Seal the Cases and Run Them Unasked](https://hq.mega.dev/lessons/s04e05/build-guide/#seal-the-cases-and-run-them-unasked).

## Destylacja

Autonomiczni agenci działający w tle, którzy pracują przy minimalnym nadzorze użytkownika w dynamicznych środowiskach, mogą wykonywać czynności, które dałoby się zoptymalizować, a nawet obsłużyć deterministyczną logiką. W niektórych przypadkach rozsądnie jest wręcz stworzyć nowego agenta, wyspecjalizowanego w zadaniach, z którymi pierwotny agent sobie nie radził. Problem w tym, że użytkownik może nigdy tego nie odkryć, a agenci mogą nigdy nic z tym nie zrobić, chyba że wprost o to poprosimy i przygotujemy na to środowisko.

W AI destylacja zwykle oznacza użycie jednego modelu, często mądrzejszego, do trenowania innego, mniejszego, wydajniejszego i bardziej wyspecjalizowanego. Ta sama idea działa też w systemach autonomicznych: możemy destylować ich działania, by optymalizować te systemy pod wieloma względami.

Tu znów powinniśmy od razu zobaczyć, jak wiele tematów z MEGA wchodzi w grę. Na przykład: **pamięć** (**S02E01**) i fakty wyciągane z interakcji; **skille** (**S02E02** / **S02E03**), które mogą pomagać w powtarzalnej pracy, nie tylko przez instrukcje, ale też przez skrypty i pakiety, oraz prymitywy takie jak **Dziennik** (log Spectera), który zapisuje działania agentów i pozwala nam się nad nimi zastanowić.

Dobrym przykładem jest znów nasz agent **Specter** i log jego działań, w którym wiele wpisów z czasem się powtarza. Część z nich dotyczy konkretnej kategorii źródeł lub dokumentów, a dzięki destylacji agent może „nauczyć się”, jak lepiej je obsługiwać. Ale nie chodzi tylko o wyciągnięcie skilla czy skryptu. Destylacja może być ciągłym procesem, który obejmuje nie tylko **wyciąganie** nowych możliwości, ale też **przekształcanie** tych, które już istnieją. W ten sposób system może zauważyć **powtarzające się wzorce** w swoich skillach i zamienić je w **szablon** albo **komponent** używany w wielu działaniach Spectera. A gdy taki szablon już istnieje, jedna zmiana w nim może dotrzeć do wszystkiego, co na nim zbudowano, dlatego zmiana szablonu wymaga ostrzejszego review niż jeden nowy skill.

![Pionowa oś czasu pracy Spectera (użytkownik zapisuje źródło, Specter pisze notatkę) na czterech stacjach: na początku, kilka tygodni później, kilka miesięcy później, jeszcze później. Na każdej stacji siatka pokazuje, kto wykonuje każdy z czterech kroków (pobranie, wyciągnięcie, zapisanie, powiązanie) dla publikacji naukowych, repozytoriów i artykułów: czerwona kropka oznacza, że robi to model, a pusty szary okrąg, że robi to skrypt. Na początku model wykonuje wszystkie kroki. Kilka tygodni później skill i skrypt przejmują pobranie, wyciągnięcie i zapisanie dla publikacji naukowych, a cienka ramka oznacza ten jeden rząd jako element wielokrotnego użytku. Kilka miesięcy później jeden szablon przejmuje te kroki dla wszystkich trzech typów, a ramka obejmuje wszystkie trzy rzędy. Jeszcze później szablon się zmienia, a nowy rząd, stare notatki, dostaje skrypt dla kroku zapisania, poza ramką. Powiązanie zostaje przy modelu na każdej stacji. Najpierw Specter decyduje po próbie, potem decyduje Sędzia, a potem użytkownik. Typy źródeł i kroki są przykładami.](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e05/artifacts/lesson/figure-8/frame.html)

Główna idea polega na tym, by używać obserwowalności do czegoś więcej niż reagowanie na problemy czy proste poprawki. Powinna ona napędzać zaawansowaną optymalizację, która może prowadzić nawet do rozwoju całego systemu.

**Jak to robi John:** na koniec `/lab suggest` czyta rozmowę, raporty agentów i zapisy projektu w poszukiwaniu tych samych, powtarzających się tarć i proponuje kilku agentów, których projekt jeszcze nie ma, a każda propozycja wskazuje, gdzie pojawił się problem. Niczego nie buduje: sugestia staje się agentem dopiero wtedy, gdy użytkownik ją wybierze i zapisze jej oczekiwania. Zobacz [Find Your Next Agent](https://hq.mega.dev/lessons/s04e05/build-guide/#find-your-next-agent).

## Optymalizacja i nadzór

Niemal od początku MEGA podkreślałem, że agenci powinni mieć dostęp do własnej konfiguracji i móc modyfikować własne środowisko uruchomieniowe i metody cyklu życia. To samo dotyczy ich możliwości, zarządzania zasobami i nie tylko. Teraz, gdy wiemy też o samodoskonaleniu, widać, jak autonomiczne mogą się stać takie systemy, nawet jeśli działają w granicach, które im wyznaczamy.

Gdy spojrzymy na to z dystansu, staje się jasne, że w pewnym momencie **nie chodzi o budowanie agentów**, tylko o **„trenowanie” ich**, by coraz lepiej poruszali się po **swoim środowisku**, które również możemy kształtować i dostosowywać. Jednym z przykładów jest [Self-Improving Memory](https://facebookresearch.github.io/RAM/blogs/self_improving_memory/), które pokazuje, jak system może ulepszać się sam, gdy ma już odpowiednie środowisko i mechanizmy.

Ta perspektywa powinna całkowicie zmienić nasze podejście do tworzenia oprogramowania, ale musi też być osadzona w rzeczywistości, w której żyjemy. I choć niektóre aplikacje i usługi można przełączyć w „yolo mode”, większości nie można.

Weźmy scenariusz, w którym nasz agent Specter dostaje dostęp do naszej poczty i otrzymuje wiadomość, która wygląda, jakbyśmy to my ją wysłali, z prośbą o raport z naszych ostatnich badań i działań. Jeśli system nie jest właściwie **zabezpieczony** jasnym, **deterministycznym** zarządzaniem uprawnieniami, istnieje szansa, że agent wyśle te informacje. W niektórych przypadkach może nawet dołączyć potencjalnie niebezpieczne szczegóły, które mogłyby dać atakującemu kontrolę nad naszym systemem.

Ale nawet bez żadnego ataku system może po prostu dostać słabej jakości polecenie głosowe i źle je zrozumieć. Może też dostać polecenie bez odpowiedniego kontekstu. Tak czy inaczej, może podjąć działanie, którego tak naprawdę nie chcemy. Potencjalne szkody mogą też wynikać z błędnej konfiguracji, patcha z błędem albo wygenerowanego narzędzia, które zamiast pomagać, wprowadza chaos do naszej bazy wiedzy, konfiguracji systemu lub systemów zewnętrznych.

Dobra wiadomość jest taka, że agenci znacznie ułatwiają zajęcie się takimi rzeczami jak **sandboxing**, **sieć**, **wersjonowanie**, **kopie zapasowe**, **logi audytowe** i **zarządzanie systemem**. Skonfigurowanie tego wszystkiego kiedyś zajmowało dużo czasu i wymagało specjalistycznej wiedzy, więc często to pomijano lub odkładano. Teraz agent może skonfigurować większość z tego za nas, wyjaśnić kompromisy, a nawet przetestować, czy granice naprawdę się trzymają.

Niemal wszystkie te tematy były omawiane lub przywoływane w poprzednich lekcjach. I nawet jeśli jest tu dużo wiedzy, którą trudno ogarnąć, mamy teraz narzędzia, które pomogą nam wyciągnąć z MEGA jak najwięcej: nie tylko „wiedzieć o różnych rzeczach”, ale też od razu je wdrażać.

Lekcja z tego płynie taka: **żeby budować systemy autonomiczne, potrzebujemy AI, które zwiększy możliwości naszego własnego procesu**.

**Jak to robi John:** Trainer bez narzędzi pisze szkic lepszego słowniczka dla agenta Booking, w limitach rund i wydatków, i widzi tylko codzienne sprawdzenia oraz to, ile razy każde przeszło. Jego najlepszy szkic dostaje jedno uruchomienie na zapieczętowanych przypadkach. Szkic staje się aktywny tylko z dwoma kluczami: sprawdzenia przeszły i użytkownik zatwierdził, oba dla dokładnie tej wersji, a stara wersja jest najpierw zapisywana, żeby można ją było przywrócić. Zobacz [Let a Trainer Climb, Behind Two Keys](https://hq.mega.dev/lessons/s04e05/build-guide/#let-a-trainer-climb-behind-two-keys).

## Najważniejsze wnioski

Przez ostatnie cztery tygodnie przeszliśmy przez przekrój generatywnej AI. Teraz od nas zależy, co zrobimy z tą wiedzą. Ale gdybym miał wskazać jedną najważniejszą rzecz, którą każdy z nas może zrobić, byłoby to **wybranie jednego pomysłu**, zwłaszcza takiego, który zawsze chcieliśmy zrealizować, i po prostu dowiezienie go z pomocą AI i wiedzy z MEGA. Taka praktyka da nam prawdziwą wiedzę, umiejętności i pewność siebie, ale też odsłoni zupełnie nowy zakres wyzwań do podjęcia.

Jeśli jest jedna rzecz, którą powinniśmy przynajmniej spróbować zmienić w swoim sposobie myślenia, by łatwiej odnaleźć się w świecie AI, to jest nią: **porzućmy wszystkie etykiety**, zwłaszcza te związane z naszą specjalizacją, narzędziami czy dziedziną. Nie oznacza to porzucenia tych rzeczy w ogóle, a jedynie niewidzialnych barier w naszych głowach. Kiedyś były prawdziwe, ale dzięki AI są dziś tylko złudzeniem.

Ta jedna zmiana, razem z praktyką, która przychodzi z budowaniem rzeczy z AI, daje dużą szansę, że staniemy się **MEGA developerami**: ludźmi, którzy nie boją się niemal żadnego wyzwania, są otwarci na pracę z każdym rodzajem technologii czy narzędzia i wykorzystują swoją wiedzę, by ulepszać nie tylko oprogramowanie, nad którym pracują, ale też samych siebie, **wzmacniając się spersonalizowanym systemem** albo przynajmniej zestawem narzędzi, których mogą używać na co dzień.

W takich chwilach lubię przywoływać cytat Lou Gerstnera, który moim zdaniem wciąż jest aktualny. Inspiruje mnie do budowania rzeczy i do widzenia jasnej przyszłości dla całej ludzkości:

> Technologia ma ograniczenia w tym, co może osiągnąć. Ty ich nie masz.

I z tym was zostawiam.

## Podziękowania

Chciałbym podziękować wam za zaufanie i za to, że zostaliście z MEGA do końca. Jeśli mogę was o coś prosić, to o podzielenie się opinią o MEGA w mediach społecznościowych albo zostawienie notatki na naszej [Wall of Love](https://app.easy.tools/review-ask/megadev?lang=en). Możecie też użyć zdjęcia albo awatara stworzonego na https://mega.dev/thanks.

Szczególne podziękowania:

- **Theo Browne, Angie Jones, Kent C. Dodds i John Lindquist** – za pracę nad pomysłem i treścią pierwszej edycji MEGA oraz za wszystko, co wnieśli w kształtowanie społeczności MEGA
- **Greg Rog, Joel Hooks i Bart Rycharski** – za to, że ten projekt stał się rzeczywistością, i za doprowadzenie go do końca
- **Martyna Ruta i Wojtek Holysz** – za pomoc w organizacji i dbanie o najmniejsze szczegóły operacyjne
- **Michal Jablonski i Olaf Sulich** – za pomoc w tworzeniu treści MEGA.dev i systemu zadań
- **Greg Cwiklinski, Remigiusz Pelica, Pawel Dulak, Ralph Majewski** – za ogromne wsparcie w dbaniu o jakość treści i zadań oraz za pomoc w rozwiązywaniu problemów i odpowiadaniu na pytania
- **Vojta Holik i Matt Wierzbicki** – za rozwój marki MEGA, zarówno wizualnej, jak i w komunikacji
- **Kate Cwiklinska, Anna Nowak i Anna Golebiewska** – za wsparcie w operacjach, sprzedaży i obsłudze klienta

Do zobaczenia następnym razem,\
Adam
