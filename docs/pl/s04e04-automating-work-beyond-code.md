# S04E04 · Automatyzacja pracy poza kodem

> **Ta lekcja jest rozszerzona.** Ma dwie części. Ta część zawiera wideo Johna i wyjaśnia zasady automatyzowania pracy poza kodem. [Build guide](https://hq.mega.dev/lessons/s04e04/build-guide/) to pisemna wersja tego, co John buduje w wideo, krok po kroku, z promptami i kontrolami dla każdego joba. Na tej stronie notatki zaczynające się od „W buildzie Johna” łączą każdą zasadę z jej buildem.

Agenci potrafią odpowiedzieć niemal na każde pytanie o naszą codzienną pracę i o pracę większości osób, z którymi pracujemy. Najlepsze dziś modele, tak zwane SOTA, rzadko wymagają od nas merytorycznej poprawki. Większość problemów, które wciąż widzimy, wynika z rozjazdu między tym, co dostajemy, a tym, czego się spodziewaliśmy.

Trudno dziś znaleźć pytanie, a nawet całe zadanie, które my potrafimy wykonać, a AI nie. Mimo to słabe wyniki łatwo zauważyć i mają one dwie główne przyczyny. Pierwsza: ludzie używają AI poza obszarem swoich kompetencji, gdzie trudno im ocenić, czy wyniki są poprawne. Druga: większość ludzi nie pracuje z modelami SOTA.

W lekcji **S03E03** jest diagram naszego kręgu kompetencji. Pokazuje, jak AI pomaga nam sięgać poza ten krąg, aż do granicy tego, co wciąż potrafimy zweryfikować. Ponieważ modele ciągle się poprawiają, ta granica może przesuwać się dalej. Jeśli tak się stanie, warto być jeszcze bardziej otwartym na rzeczy, które są dla nas nowe, i nauczyć się szybko w nie wchodzić.

Dobra wiadomość jest taka, że dzięki wszystkiemu, co omówiliśmy dotąd w MEGA, możemy po prostu zacząć działać i razem z AI sięgać dalej. Od nas zależy, czy zostaniemy w inżynierii i skupimy się na zupełnie nowym poziomie ekspertyzy, czy sięgniemy szerzej, w obszary biznesowe. W obu przypadkach chcemy zacząć myśleć o tym, **jak używać AI do automatyzowania rzeczy poza kodem**. Dobrym punktem wyjścia jest przejrzenie dostępnych aplikacji i usług i sprawdzenie, jak połączyć je z naszymi agentami. I nie chodzi tylko o techniczne szczegóły podłączenia API, ale o **przypadki użycia**, które możemy chcieć przedstawić biznesowi.

## Plan

- Eventy: zmiany w repozytorium, zgłoszenia, wiadomości, harmonogramy, wywołania narzędzi, awarie, sygnały z zewnątrz
- Hooki: sprawdzanie, przekierowywanie, blokowanie, wzbogacanie lub kontynuowanie akcji agenta
- Pipeline'y: obserwuj, klasyfikuj, kieruj, wykonaj, zweryfikuj, komunikuj
- Systemy push: dostarczanie wiedzy i instrukcji wtedy, gdy są potrzebne, zamiast liczyć na to, że agent sam je odkryje

## Eventy

Jedną z korzyści, jakie dają nam agenci AI, jest umiejętność bardzo szybkiego **odkrywania dostępnych API**, w tym funkcji bibliotek i platform, które możemy znać od lat. Ale to nie wszystko, co robi AI. Jak już mówiliśmy, może też **dawać nam spersonalizowane rekomendacje**, jak korzystać z tych funkcji, razem z wieloma oryginalnymi pomysłami. Pierwsze z nich są jednak często bardzo płytkie, więc warto drążyć dalej z wiedzą z pierwszego tygodnia.

Myśląc o systemach autonomicznych, warto się zastanowić, **kiedy system może sam się wybudzić**. Odpowiedź nie jest oczywista, gdy nie mamy wielu pomysłów na to, co mogłoby go uruchamiać. Z drugiej strony w pewnym momencie może kusić dodanie zbyt wielu eventów, które stają się zwykłym szumem.

Załóżmy, że mamy produkt oparty na subskrypcji. Ten model biznesowy wymaga uważnego monitorowania różnych metryk, takich jak miesięczny przychód cykliczny (MRR), churn, konwersja z triala na płatny plan i wartość klienta w czasie (LTV). Przed agentami takie produkty integrowano z bardzo złożonymi narzędziami analitycznymi, na przykład z [Mixpanel](https://mixpanel.com). Ale w tamtych czasach te narzędzia nie były proaktywne i to ludzie musieli zamieniać wnioski w działania. Teraz większością tej pracy mogą się zająć agenci AI.

Zanim jednak w ogóle zaczniemy myśleć o podpinaniu eventów, musimy zrozumieć i dopasować do siebie:

- **Kontekst biznesowy:** co biznes oferuje klientom i jakie ma cele
- **Metryki:** co możemy mierzyć, żeby osiągnąć cele biznesowe
- **Narzędzia analityczne:** co oferują narzędzia analityczne i jak możemy się z nimi połączyć
- **Produkt:** jak obecny stan produktu odpowiada na wszystko powyżej i co możemy z tym zrobić
- **Event:** co agenci (lub ich skrypty) muszą obserwować
- **Akcja:** jakie rodzaje akcji można podjąć
- **Eval:** jak możemy zweryfikować wyniki akcji

Bez AI wszystkimi tymi punktami musiał się zajmować przynajmniej mały zespół ludzi z różnym doświadczeniem. Dziś agenci AI **mogą przynajmniej zbadać** to wszystko i dać jasne rekomendacje oraz plan wdrożenia. Tu jednak nie szukamy pojedynczej akcji, tylko **eventów**, które **wybudzą nasz system** bez proszenia. I stąd bierze się prawdziwa różnica.

![Diagram przepływu na kwadratowym płótnie. Po lewej pudełko „Kontekst biznesowy” (oferta i cele) wysyła strzałkę z podpisem „metryki” w dół do ramki „Narzędzia analityczne”. Ramka zawiera cztery przykładowe metryki produktu subskrypcyjnego: MRR (wzrost zwalnia), churn (rośnie w drugim miesiącu), konwersja z triala (spada po wydaniu) i LTV (spada dla jednego planu). Pudełko konwersji z triala jest czerwone. Gruba czerwona strzałka z podpisem „event” prowadzi z niego do ramki „Agent” pośrodku. Nad ramką Agent pudełko „Produkt” (mapa funkcji i wydania) wysyła do ramki strzałkę z podpisem „przywołuje”. Ramka Agent zawiera trzy kroki połączone strzałkami w dół: Budzi się (bez proszenia), Wyjaśnia (znajduje przyczynę w produkcie) i Planuje (wybiera akcje). Strzałka z podpisem „otwiera” prowadzi z ramki Agent do ramki „Akcje” po prawej. Ramka zawiera pięć przykładowych akcji: Analiza (gdzie zatrzymują się triale?), Eksperyment (krótsza konfiguracja, za flagą), Aktualizacja przewodnika (nowe kroki konfiguracji w dokumentacji), Brief dla zespołu (fakty dla marketingu i sprzedaży) i Prośba o funkcję (ustalenie z dowodami). Strzałka z podpisem „prosi o funkcję” prowadzi z Prośby o funkcję w dół i w lewo do pudełka „My” (akceptujemy, zmieniamy albo odrzucamy). Strzałka z podpisem „zaakceptowane” prowadzi z My do pudełka „Eval” (czy metryka drgnęła?). Strzałka z podpisem „mierzy ponownie” prowadzi z Eval z powrotem w górę do ramki Narzędzia analityczne, więc pętla się zamyka. Trendy metryk i pięć akcji to przykłady jednego przypadku: po wydaniu mniej triali zamienia się w płatne plany.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-1/frame.html)

Ten przykład pokazuje, jak poruszać się zarówno po inżynierskich, jak i biznesowych aspektach, żeby zobaczyć szerszy obraz i razem z AI **oraz naszym zespołem** wypracować najlepszą możliwą konfigurację, którą da się zamienić w **autonomiczne joby**. I nawet jeśli większość pracy mogą wykonać agenci, ktoś musi wpaść na pomysł. Równie ważne jest jednak to, że **praktyczne wdrożenie takich mechanizmów wymaga prawdziwej pracy zespołowej**.

Jeśli się nad tym zastanowić, ten jeden przykład dotyczy niemal każdej części procesów biznesowych i inżynierii produktu. A te zadania nie są po prostu „promptami”, które AI może wykonać od początku do końca, bo w wielu miejscach dotykają prawdziwego świata, w tym klientów. Na przykład:

- **Cennik:** konkurent zmienia swoje plany, a jeden z naszych agentów wyłapuje to za pomocą Firecrawl. Agent porównuje te plany z naszymi i z naszymi raportami finansowymi ze Stripe i przygotowuje opcje, ale decyzja i rozmowy z klientami zostają po naszej stronie.
- **Płatności:** webhooki [Stripe](https://stripe.com) pokazują, że w jednym kraju rośnie liczba nieudanych płatności. Agent sprawdza lejek checkoutu w [PostHog](https://posthog.com/), znajduje przyczynę i proponuje poprawkę checkoutu, a w tym czasie zespół kontaktuje się z klientami, których to dotyczy.
- **Support:** to samo pytanie od miesięcy wraca w narzędziu takim jak [Plain](https://www.plain.com/). Agent aktualizuje dokumentację i proponuje zmianę interfejsu w [Paper](https://paper.design/), a zespół supportu nadal odpowiada ludziom.
- **Sprzedaż:** transkrypcje rozmów (na przykład z [Granola](https://www.granola.ai/)) wspominają o tej samej brakującej funkcji. Agent sprawdza, czy możemy ją zbudować, i przygotowuje szkic ustalenia w [Linear](https://linear.app/), a decyzję zostawia nam.
- **Ocena w sklepie:** ocena aplikacji spada po konkretnej wersji. Agent łączy recenzje z [Sentry](https://sentry.io/welcome/) ze zmianami w tym wydaniu i rekomenduje, co cofnąć.
- **Zgłoszenia spamu:** Resend raportuje więcej skarg na nasze kampanie marketingowe, a ludzie wypisują się z listy bez podawania jasnych powodów. Taka anomalia może emitować event i pozwolić agentom ustalić przyczynę źródłową i zaproponować zmiany.

Poniżej jest wizualizacja pierwszego przykładu, dotyczącego **cennika**, rozpisanego na fazy i obszary biznesu. Pokazuje, jak szeroki jest zakres tego procesu, mimo że zaprojektowano go tak, by niemal w całości obsługiwali go agenci AI. Musimy tu też pamiętać, że **nie projektujemy tego procesu sami**, więc warto rozważyć zaprojektowanie właściwych prymitywów, których da się użyć ponownie w innych procesach.

![Przykładowy przebieg autonomicznego joba cenowego. Trzy ścieżki, Inżynieria (dane i narzędzia), Produkt (plany i funkcje) i Biznes (cele i ludzie), przecinają cztery kroki: Event (agent zauważa), Analiza (agent porównuje), Decyzja (ludzie wybierają) i Wynik (zmienione, zmierzone). Na każdym przecięciu jest jedna kropka z tym, co przygotowuje dany obszar. Event: obserwacja cenników, sprawdzana codziennie; reguły zmian, pomijaj drobne edycje; właściciel, kto dostaje zadanie. Analiza: dane o przychodach, dostęp tylko do odczytu; nasze plany, funkcje w każdym planie; cele, targety, marże. Decyzja: symulacja, uruchomiona na naszych danych; opcje, pokazane na jednej stronie; zatwierdzenie, decyduje właściciel. Wynik: eval, czy przychód drgnął?; nowe plany, za flagą; ogłoszenie, ludzie informują klientów. Jedna czerwona ścieżka z podpisem „jeden przebieg joba” zaczyna się przy „Konkurent” (zmienia swoje plany) i biegnie w dół przez pierwszą kolumnę, w górę przez drugą, w dół przez trzecią i w górę przez czwartą, kończąc się na Eval. Przypadek i wszystkie dwanaście punktów to przykłady.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-2/frame.html)

Gdy przyjmujemy sposób myślenia product engineera, coraz wyraźniej widać, że możemy używać AI, by przynosić na spotkania zespołu wiele wartościowych pomysłów. A w zależności od struktury naszej organizacji możemy brać na siebie różne części prac wdrożeniowych.

Jeśli się nad tym zastanowić, działania w tym procesie są w dużej mierze takie same jak te, które omawialiśmy dotąd w kontekście programowania. Jedyne, co musimy w tym momencie zrobić, to **to przemyśleć** i zacząć działać. Celem **eventów** jest sprawić, by cały system **budził się bez proszenia**, obsługiwał niemal cały proces i prosił o pomoc tylko wtedy, gdy jest to potrzebne.

Najbardziej konkretne kroki są więc takie:

- **Zmapuj:** poproś agenta, żeby przeskanował usługi, z których korzystamy, i wypisał ich webhooki, API i logi. Większość produktów już produkuje eventy, których nikt nie czyta.
- **Wybierz:** wybierz jeden proces z jasną wartością biznesową i przejdź z zespołem przez siedem punktów powyżej. Na start wystarczą jeden event, jedna akcja i jeden eval.
- **Ujednolić:** spraw, by każdy event przychodził przez jeden punkt wejścia i w tym samym kształcie, ze źródłem, typem, tożsamością, czasem i payloadem. To prymityw **Subskrypcje** z **S03E01** i dzięki niemu kolejne źródło dodamy bez budowania nowej integracji.
- **Zidentyfikuj:** nadaj każdemu eventowi tożsamość. Ten sam event dostarczony dwa razy musi pozostać jedną pracą, a ten sam event z inną treścią to zmiana, a nie retry.
- **Filtruj:** zacznij od prostych reguł, a mały model dodaj tylko tam, gdzie reguły zawodzą, jak w przykładzie ze Specterem z **S04E01**. Agent powinien budzić się tylko przy eventach, które mają znaczenie.
- **Zamień:** zamień każdy event w jedno zadanie z właścicielem i odwołaniem do eventu. Jeśli nie wiadomo, kto jest właścicielem, system powinien zapytać, zamiast zgadywać.
- **Obserwuj:** niech agent najpierw raportuje, co by zrobił, zanim dostanie pozwolenie, by to robić. I regularnie przeglądaj eventy, bo usuwanie tych, które tylko hałasują, jest równie ważne jak dodawanie nowych.

A **prymitywy** zawsze warto rozważać w szerszym kontekście, a nie tylko w kontekście jednego procesu, nad którym akurat pracujemy.

**W buildzie Johna:** ticket z supportu budzi mały job. Aplikacja zapisuje w swoim logu jedną linię dla każdego nowego ticketu, z jego ID. Osobny program, watcher, czyta nowe linie i uruchamia sorter, więc gość nigdy nie czeka na model. Ten sam ticket dostarczony dwa razy dostaje jeden tag, a zakładka pozwala sorterowi kontynuować po restarcie. Nieudany request budzi drugi job, error huntera. Zobacz [Wake a Job](https://hq.mega.dev/lessons/s04e04/build-guide/#wake-a-job).

## Hooki

O ile eventy decydują, kiedy system startuje, o tyle hooki decydują o tym, **co dzieje się po drodze**. W **S04E03** omawialiśmy używanie hooków w całym cyklu życia pętli agentowej. Teraz patrzymy na procesy wokół tej pętli: jak obserwować akcje, czekać na nie, reagować na nie i odpowiednio dostosowywać zachowanie agenta. Dzięki temu agenci mogą obsługiwać joby o długim horyzoncie, które mogą wymagać czekania tygodniami na informację zwrotną.

Są też scenariusze, w których domyślny przebieg joba musi się zmienić w zależności od bieżącego kontekstu. Na przykład gdy system wykryje problemy z ważnymi metrykami, takimi jak konwersja z triala na płatny plan albo dostarczalność e-maili, może podnieść alert po przekroczeniu określonych progów.

![Oś czasu obejmująca trzy tygodnie. Na górze są dwa wiersze metryk i każdy ma przerywany próg, który obserwuje hook. Metryka konwersji z triala na płatny plan pozostaje w normie, więc jej hook nigdy się nie uruchamia. W drugim tygodniu metryka dostarczalności e-maili spada poniżej progu, a czerwona kropka oznacza miejsce przekroczenia. Wiersz joba poniżej to głównie linia kropkowana, bo job śpi. Event uruchamia joba, a job podpina dwa hooki. Gdy uruchamia się hook e-mailowy, czerwony objazd opuszcza domyślną ścieżkę joba. Schodzi w dół do właściciela, który decyduje o kontynuacji, a potem wraca w górę, gdzie job zostaje wznowiony. W trzecim tygodniu job raportuje wynik. Job, obie metryki i alert to przykłady.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-3/frame.html)

Hooki zwykle powinny być definiowane razem z całym planem danego joba. Ale tak jak w przypadku prymitywów, warto myśleć o ich roli w wielu kontekstach. Na przykład **alerty** to świetny kandydat na prymityw. Możesz go użyć zawsze, gdy coś idzie nie tak, albo żeby dotrzeć do użytkownika, albo żeby uruchomić dedykowane procedury. Innym hookiem może być **Zatwierdzenie**, które kontaktuje się z osobą lub agentem, żeby uzyskać zgodę lub informacje potrzebne do kontynuowania joba.

Poniżej są trzy osie czasu przedstawiające joby, które autonomiczny system może obsłużyć po wybudzeniu przez event. Każda oś czasu ma własne hooki, które mogą się uruchomić albo nie, w zależności od działań agenta. Niektóre hooki są jednak wspólne, bo zmienia się tylko payload i kontekst ich wyzwalacza, a nie ich cel.

![Trzy przykładowe joby z biznesu internetowego, każdy narysowany jako jedna pozioma oś czasu. Przegląd cennika (plany się zmieniły, trwa dniami) napotyka hooki Zmiana (strona się zmienia, porównuje ponownie), Timeout (brak decyzji, przypomina właścicielowi), Zatwierdzenie (właściciel zatwierdza, te opcje) i Zakończenie (wynik zmierzony, zamyka się sam). Nieudane płatności (liczba błędów rośnie, trwa godzinami) napotykają Dołączenie (nowe zgłoszenia, dołącz do tego joba), Alert (nadal rośnie, alarmuje osobę), Zatwierdzenie (osoba zatwierdza, poprawkę) i Zakończenie (wskaźnik w normie, zamyka się sam). Kondycja kampanii (skargi rosną, trwa tygodniami) napotyka Próg (limit przekroczony, wstrzymuje segment), Zatwierdzenie (lead zatwierdza, zdejmuje wstrzymanie) i Zakończenie (dwie czyste wysyłki, zamyka się sam). Hook Zatwierdzenie jest oznaczony na czerwono i stoi w tej samej kolumnie we wszystkich trzech wierszach, pod podpisem „ten sam hook w każdym jobie”. Hook Zakończenie kończy każdą linię w tej samej kolumnie. Pod wszystkimi wierszami biegnie strzałka czasu. Joby i szczegóły hooków to przykłady.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-4/frame.html)

Z technicznego punktu widzenia hook to zarejestrowana reguła z przypisaną akcją. Łączy warunek z reakcją i należy do jednego joba. Ogólna struktura hooka może obejmować:

- **Właściciel:** job, do którego należy hook
- **Wyzwalacz:** czego hook nasłuchuje, np. typu eventu, punktu w czasie albo kroku joba
- **Warunek:** kiedy hook ma zastosowanie, na przykład gdy metryka przekroczy próg
- **Reakcja:** co robi system, np. budzi agenta, uruchamia skrypt, wysyła alert albo prosi o zatwierdzenie
- **Opis:** po co istnieje hook, napisany dla agenta, który obudzi się z pustym kontekstem
- **Wygaśnięcie:** kiedy hook zostaje usunięty, zwykle w momencie zakończenia joba

Taką strukturę można odczytać jako: **dla** tego joba, **gdy** to się stanie, **wtedy** zrób tamto, **dopóki** job się nie skończy.

System może trzymać **rejestr** hooków, który może być plikiem albo tabelą w bazie danych. Gdy powstaje job, rejestruje potrzebne mu hooki z odpowiednimi callbackami. Hook można utworzyć z istniejącego szablonu albo zbudować od zera. Od tego momentu agent może iść spać, bo żaden model nie musi działać, gdy hook czeka.

Każdy przychodzący event, alarm czy krok joba jest następnie porównywany z zarejestrowanymi hookami przez **zwykły kod**. Gdy któryś z nich pasuje, system albo od razu wykonuje reakcję, albo budzi agenta i przekazuje mu notatkę razem z eventem, żeby agent wiedział, co się stało i dlaczego to ważne. Każde uruchomienie hooka jest zapisywane w historii joba, a gdy job się kończy, jego hooki są usuwane.

Warto pamiętać o jeszcze trzech rzeczach. Hook może robić tylko to, co wolno robić jego jobowi. Ten sam event powinien uruchomić hook tylko raz. A job powinien mieć tylko kilka hooków, bo ich nadmiar staje się szumem, dokładnie tak jak nadmiar eventów.

![Diagram ogólnej struktury hooka: jeden rekord o nazwie Hook z sześcioma wierszami, które czyta się jak zdanie. Słowa „dla”, „gdy”, „wtedy” i „dopóki” dzielą wiersze na cztery grupy. Wiersze to Właściciel (job, do którego należy), Wyzwalacz (czego nasłuchuje), Warunek (kiedy ma zastosowanie), Reakcja (co robi system), Notatka (dlaczego, dla agenta) i Czas życia (kiedy zostaje usunięty). Przykładowe wartości opisują jeden hook joba przeglądu cennika: przegląd cennika, strona się zmieniła, strona jest na naszej liście, obudź agenta, porównaj plany ponownie, job się kończy. Po lewej pudełko Job (planuje joba) rejestruje hook, a pudełko Event (albo alarm) jest z nim porównywane w kodzie. Po prawej jedna czerwona strzałka z podpisem „budzi” prowadzi od rekordu do pudełka Agent (kontynuuje).](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-5/frame.html)

**W buildzie Johna:** najbliżej tego pomysłu jest jedna reguła w sorterze. Gdy odpowiedź na pytanie o pieniądze wypada pośrodku albo sorter nie jest pewien właściciela, zwykły kod oznacza ticket jako niepewny, zapisuje powód i umieszcza ticket na górze widgetu Issues, gdzie czeka na użytkownika. To zmienia domyślną ścieżkę tak, jak robi to tutaj alert albo zatwierdzenie. Build Johna nie ma rejestru hooków ani jobów, które czekają tygodniami, więc dla nich naszym przykładem zostaje przegląd cennika. Zobacz [Sort New Tickets](https://hq.mega.dev/lessons/s04e04/build-guide/#sort-new-tickets).

## Pipeline'y

Nie wszystko w systemach autonomicznych musi być dynamiczne. Wiele procesów jest dobrze zdefiniowanych i ugruntowanych. Mogą iść stałą ścieżką i często muszą. Większość ich kroków może być w pełni deterministyczna, a agent tylko nimi zarządza. W ten sposób agent sam radzi sobie z potencjalnymi problemami, a te powtarzające się albo eskalowane trafiają do użytkownika.

Poniżej jest ilustracja pokazująca ogólną strukturę pipeline'u i komponenty, które może zawierać:

- **Obserwacja:** odbiera payload eventu i go zapisuje.
- **Klasyfikacja:** sprawdza payload według deterministycznych reguł albo przekazuje go modelowi, gdy reguły zawodzą. Niejasny przypadek trafia do ręcznego przeglądu.
- **Kierowanie:** w zależności od struktury pipeline'u router może wybrać właściciela danego przypadku.
- **Wykonanie:** wykonuje właściwą pracę. To krok, w którym agent jest potrzebny najczęściej.
- **Weryfikacja:** sprawdza wynik względem dowodu, zanim cokolwiek opuści pipeline. Praca, która nie przejdzie, wraca do wykonania.
- **Komunikacja:** raportuje wynik właściwej osobie lub systemowi i zapisuje go na potrzeby następnego przebiegu.

![Uogólniony pipeline narysowany jako jedna prosta czerwona ścieżka od „event” do „wynik”. Na ścieżce stoi sześć równomiernie rozmieszczonych kroków. Pod każdym krokiem jest jego nazwa, co robi i kto to robi: Obserwuj, przyjmuje event, kod; Klasyfikuj, nazywa jego rodzaj, reguły albo model; Kieruj, wybiera właściciela, kod; Wykonaj, robi pracę, agent; Zweryfikuj, sprawdza dowód, kod albo model; Komunikuj, raportuje wynik, kod. Przerywana linia prowadzi w górę od Klasyfikuj do „ręczny przegląd” dla niejasnych przypadków. Przerywany łuk wraca od Zweryfikuj do Wykonaj i ma podpis „nie przeszło: jeszcze raz”. Czerwony podpis nad ścieżką mówi „ścieżka jest stała”.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-6/frame.html)

Każdy krok ma jasne **wejście**, jasne **wyjście** i **sprawdzenie**. Event uruchamia cały pipeline, a hooki mogą zmienić jego ścieżkę. Ale ogólnie struktura jest zdefiniowana z góry, więc joba można powtarzać, obserwować i oceniać.

We wcześniejszych lekcjach omawialiśmy prymitywy **code mode** i **pakiety**. Oba świetnie pasują do pipeline'ów, bo łatwo je łączyć i można je uruchamiać deterministycznie albo pozwolić agentowi nimi zarządzać. Poniżej kilka pomysłów na pipeline'y, które mogą działać poza kodem.

![Cztery przykładowe pipeline'y biznesu internetowego, narysowane jako cztery poziome osie czasu z tymi samymi sześcioma kolumnami: Obserwuj, Klasyfikuj, Kieruj, Wykonaj, Zweryfikuj i Komunikuj. Szare kropki oznaczają kroki wykonywane przez zwykły kod. Czerwone kropki oznaczają kroki wykonywane przez agenta lub model. Materiały do wydania startują przy każdym merge'u: przychodzi merge, czyta etykiety, notatki i dokumentację, pisze teksty (agent), sprawdza linki, otwiera review. Uzgadnianie płatności działa co noc: czyta płatności, zgadza się czy nie, wyjątki, wyjaśnia każdy (agent), sumy się zgadzają, wysyła raport. Sortowanie opinii startuje przy nowej opinii: przyjmuje wiadomości, nazywa funkcję (agent), do jej właściciela, dodaje do zgłoszenia, poprawna etykieta, cotygodniowe podsumowanie. Publikacja lekcji startuje przy zapisanym szkicu: szkic zapisany, co się zmieniło, tekst i ilustracje, recenzuje i rysuje (agent), build przechodzi, osoba publikuje. Pipeline'y i teksty kroków to przykłady. Każdy krok to kod, z wyjątkiem jednego w każdym pipelinie. W trzech pipeline'ach tym krokiem jest Wykonaj, a w sortowaniu opinii Klasyfikuj.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-7/frame.html)

**W buildzie Johna:** każdy z trzech jobów idzie stałą ścieżką, a większość kroków wykonuje zwykły kod. W sorterze kod czyta nowy ticket, model odpowiada na dwa pytania (kto jest jego właścicielem i czy chodzi o pieniądze), a kod zapisuje tag. W drafterze kod sprawdza pobyt, Booking pisze odpowiedź, a kontrola sprawdza, czy każda kwota pochodzi z lookupu. Każdy wynik czeka na użytkownika: tag do przeczytania, szkic do wysłania albo nie i raport do przekazania Mainowi. Zobacz [Sort New Tickets](https://hq.mega.dev/lessons/s04e04/build-guide/#sort-new-tickets) i [Draft Replies from Lookups](https://hq.mega.dev/lessons/s04e04/build-guide/#draft-replies-from-lookups).

## Systemy push

Autonomiczni agenci potrzebują kontekstu, żeby podejmować dobre decyzje. Agenci świetnie radzą sobie dziś z wyszukiwaniem i odkrywaniem kontekstu, ale wciąż będą scenariusze, w których polegamy na mniejszych modelach albo po prostu chcemy mieć pewność, że agent jest właściwie sterowany. Wstrzykiwanie kontekstu może mieć też znaczenie dla optymalizacji, zwłaszcza przy zadaniach powtarzanych wiele razy, gdzie koszt i opóźnienie szybko się sumują. Ale najważniejsze, o czym trzeba tu pamiętać, to że musimy mieć pewność, że kontekst **musi być obecny** i pozostaje użyteczny.

Wiemy już, że w pętli agentowej hooki cyklu życia mogą dodawać kontekst. To samo dotyczy kroków przepływów pracy i pipeline'ów, gdzie możemy dokładnie wiedzieć, czego agent potrzebuje, by kontynuować zadanie, albo możemy to ustalić za pomocą routingu lub modeli decyzyjnych.

![Przepływ od lewej do prawej. Startuje krok w pipelinie albo hook. Strzałka prowadzi w dół do ramki „Wybierz”, która zawiera dwie opcje: „Stała lista” (znamy potrzeby) i „Router” (wybiera mały model). Strzałka z podpisem „wybiera” prowadzi do czerwonej ramki „Kontekst”. Zawiera ona trzy przykładowe rodzaje kontekstu: „Fakty” (aktualne, z informacją, ile mają), „Reguły” (dla tego rodzaju przypadku) i „Ostatni przebieg” (czego się nauczył). Gruba czerwona strzałka z podpisem „push” prowadzi do pudełka „Sprawdzenie” (wszystko jest?). Strzałka z podpisem „tak” prowadzi do pudełka „Agent” (startuje gotowy). Z pudełka Sprawdzenie strzałka prowadzi w dół do podpisu „nie: krok czeka”. Pod przepływem przerywana linia z podpisem „bez push: agent szuka tego wszystkiego sam” dochodzi do pudełka Agent od dołu. Wyciszona linia mówi „więcej wywołań, większy koszt i może coś przeoczyć”.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-8/frame.html)

Pushowanie kontekstu, nawet do pipeline'ów, w których wiemy niemal dokładnie, co się wydarzy, może łatwo wywołać problemy, z którymi agent sam sobie nie poradzi. Załóżmy, że mamy pipeline, który obsługuje zamówienia produktów. Jeśli **payload eventu** zawiera identyfikatory klienta i produktu, możemy łatwo pobrać ich szczegóły z góry. Dzięki temu agent od razu zna najważniejsze informacje i może od razu działać. W praktyce jednak nie jest oczywiste, które dane powinny być załadowane z góry, bo w jednych przypadkach agent może potrzebować historii zamówień użytkownika, a w innych powiązanych produktów do cross-sellingu.

![Event „złożono zamówienie” trafia do kroku prefetch. Prefetch ładuje dane z naszych danych, które zawierają dwa przykładowe fakty: to samo zamówienie przyszło wczoraj, a stary adres jest nadal zapisany. Prefetch buduje trzy konteksty, narysowane jako trzy tacki z tymi samymi sześcioma przegródkami: klient, produkt, ostatnie zamówienie, stare zamówienia, stary adres i powiązane. W „Za mało” wypełnione są tylko klient i produkt. Czerwona pusta przegródka „ostatnie zamówienie” oznacza, że agent potwierdza duplikat. W „Za dużo” wszystkich sześć przegródek jest wypełnionych. Czerwona przegródka „stary adres” jest sprzeczna z rekordem klienta, więc agent wysyła na stary adres. W „Pasuje do tego przypadku” wypełnione są klient, produkt i ostatnie zamówienie, a agent pyta, zanim potwierdzi. Pod każdą tacką jest ten sam agent. Zamówienie, powtórzenie i stary adres to przykłady.](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s04e04/artifacts/lesson/figure-9/frame.html)

W takich scenariuszach możemy znaleźć równowagę między **treścią** a **odwołaniami do źródeł lub identyfikatorami** połączonymi z **minimalnymi opisami**. Ta forma jest znacznie bardziej skompresowana, ale dla agentów doskonale czytelna. I choć załadowanie szczegółów nadal wymaga dodatkowych kroków, proces staje się dokładniejszy.

**W buildzie Johna:** drafter jest systemem push. Kod czyta pobyt z ticketu, pyta aplikację o daty, cenę i sumę i przekazuje te fakty Bookingowi razem z jego notatkami dla klientów. Booking nie ma narzędzi, więc nie może szukać więcej. Wewnętrzna połowa jego notatek zostaje poza kontekstem, bo gdy ją miał, Booking wyjaśnił gościowi wewnętrzny mechanizm. Gdy lookup się nie uda, fakty mówią „unknown”, a szkic nie podaje żadnej kwoty. Zobacz [Draft Replies from Lookups](https://hq.mega.dev/lessons/s04e04/build-guide/#draft-replies-from-lookups).

## Najważniejsze wnioski

Autonomiczne systemy agentowe nie dotyczą tylko pracy nad bazą kodu, bo mogą się zintegrować z każdym obszarem naszego życia i pracy. Dla wielu z nas, a w pewnym momencie może dla wszystkich, codzienne zajęcia zmienią się w porównaniu z tym, co znaliśmy i do czego przywykliśmy. A dla niektórych z nas to już się dzieje, gdy pracujemy z nowymi narzędziami i poruszamy się po obszarach, które są dla nas nowe.

Dzisiejsza lekcja dotyczyła głównie przemyślenia, **co jest naprawdę możliwe**, a przede wszystkim **spośród czego możemy wybierać**. Jednocześnie pokazuje, jak łączą się wszystkie koncepcje z MEGA. Jeśli wrócimy myślami do pierwszej lekcji, dotyczyła ona patrzenia na generatywną AI z bardzo szerokiej perspektywy, jak podziwianie widoku ze szczytu góry. Idąc za tą analogią, możemy traktować tę lekcję nie jako sposób na wypatrzenie szczegółów konkretnych miejsc, ale raczej jako sposób, by z pomocą AI szybko dostać się do tych, których potrzebujemy w danym momencie. A czasem nawet być w wielu z nich naraz.

Najważniejszy wniosek jest jednak taki: używajmy narzędzia, które lubimy najbardziej, albo zbudujmy własne, jeśli chcemy, i razem z agentem ustalmy, co możemy zrobić z aplikacjami lub usługami, z którymi pracujemy. Zobaczymy wtedy, jak z nich korzystamy i którymi częściami mogą się za nas zająć agenci. Przy tym przynajmniej część naszej uwagi powinna być skupiona nie na konkretnym przepływie pracy czy pipelinie, ale na płynnym przełączaniu się między szeroką i wąską perspektywą. W pewnym momencie powinno nas to doprowadzić do zestawu **prymitywów**, które my albo nasi agenci możemy łączyć, by rozwijać i utrzymywać nowe możliwości naszego systemu i doprowadzić go niemal do pełnej autonomii.
