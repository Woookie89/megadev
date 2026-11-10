# S01E04 · Praca z harnessami AI

Każdy z nas pracuje z harnessami AI na swój sposób. Niektórzy wolą przepływy pracy bez konfiguracji, inni mają niezwykle złożone środowiska. Niezależnie od tego, po której stronie jesteś, możemy na chwilę się zatrzymać i rozejrzeć, czy jest coś, co moglibyśmy dziś robić inaczej.

- Harnessy: harnessy CLI i UI, wielu dostawców, podstawowe i kluczowe funkcje, konfiguracja niezależna od harnessu, natywne możliwości
- Samodzielne zarządzanie: agenci konfigurujący się samodzielnie, rozszerzenia, uruchamianie workerów, sesje w tle
- Konfiguracja wielu agentów: koordynator i workery, sterowanie, pliki jako wiadomości, worktrees, reguły globalne, wizja i przewodnik po stylu
- Ustawienia: wybór i kierowanie do modeli, poziom wysiłku rozumowania, koszt zadania, granice prywatności
- Praca zespołowa: współdzielone umiejętności, wewnętrzna baza wiedzy, stos narzędzi przyjazny AI
- Automatyzacja: agenci repozytorium, wzbogacone zgłoszenia, automatyczne przeglądy, drobne poprawki, aktualna dokumentacja

Znalezienie odpowiedniej konfiguracji jest dość trudne, bo dostępnych opcji jest bardzo wiele. Co tydzień pojawiają się też nowe funkcje, przepływy pracy i narzędzia, przez co trudno za tym wszystkim nadążyć. Sekret polega na tym, że **nie musimy gonić za każdą nowinką**, ale nie oznacza to, że powinniśmy całkowicie ignorować nowe rozwiązania. Potrzebujemy po prostu **dobrego systemu**. Oznacza to podjęcie kilku dobrych decyzji dotyczących naszego środowiska — nie tylko w kontekście programowania — przygotowanie konfiguracji niezależnej od harnessu i pracę nad **naszym nastawieniem**.

Zobaczmy, co składa się na taki system.

## Harnessy

Wśród dostępnych opcji znajdziemy wiele harnessów CLI, takich jak [Codex](https://openai.com/codex/), [Claude Code](https://claude.com/product/claude-code), [OpenCode](https://opencode.ai/), [Pi](https://pi.dev/), [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), [Grok Build](https://x.ai/build); harnessy UI, takie jak [Cursor](https://cursor.com), [Zed](https://zed.dev/) i [Devin](https://devin.ai/); a także aplikacje takie jak [t3code](https://t3.codes/), [humanlayer](https://www.humanlayer.dev/) i [superset](https://superset.sh/) oraz agentów, takich jak [Hermes Agent](https://hermes-agent.nousresearch.com/), [Grok Bot](https://x.ai/bot) czy [Dots](https://openai.com/index/introducing-dots/).

Oprócz harnessu musimy wybrać terminal, na przykład [iTerm](https://iterm2.com/), [Warp](https://www.warp.dev/) lub [cmux](https://cmux.com/), a także modele od OpenAI, Anthropic, xAI lub innych dostawców. Musimy też rozważyć korzystanie z umiejętności i integracji, w tym narzędzi CLI i MCP, a na koniec skonfigurować sam harness.

Sporo tego, prawda?

Sprawa komplikuje się jeszcze bardziej, gdy weźmiemy pod uwagę, że co kilka tygodni pojawia się nowy trend, przełomowe narzędzie, funkcja API albo model.

![Stos siedmiu warstw w jednej czerwonej ramce zatytułowanej „Co kilka tygodni coś nowego”: harness (Claude Code, Codex, Open Code, Pi, Cursor, Zed, Devin), terminal (iTerm, Warp, cmux), modele i dostawcy (OpenAI, Anthropic, xAI, Gemini), umiejętności, integracje (narzędzia CLI, serwery MCP), rozszerzenia oraz konfiguracja (AGENTS.md, ustawienia harnessu).](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-1/frame.html)

Dobra wiadomość jest taka, że gdy zrozumiemy kilka ogólnych zasad, wszystko stanie się znacznie łatwiejsze. Oto one:

- **Źródła:** skonfiguruj kanały w mediach społecznościowych (zwłaszcza X i YouTube) tak, by otrzymywać informacje od **największych laboratoriów**, oficjalnych kont wspomnianych wcześniej narzędzi i osób, które za nimi stoją. Staraj się jednocześnie unikać kont nakręcających szum, bo piszą o tematach gorących teraz, ale zapomnianych po tygodniu lub dwóch. Tak naprawdę dobrze jest być trochę z tyłu. Dopiero gdy coś utrzymuje się przez ponad miesiąc (lub nieco dłużej), można uznać, że warto się temu przyjrzeć.

- **Wielu dostawców:** jeśli to możliwe, wybierz harness obsługujący najlepszych dostawców (OpenAI/Anthropic/xAI/DeepSeek itd.), aby łatwo przełączać się między modelami **lub używać kilku z nich do tego samego zadania**. Często może to być bardzo przydatne, ponieważ różne modele przypominają pod pewnymi względami różne osoby o odmiennych perspektywach. Kompromis polega na tym, że natywne harnessy dostawców są często lepiej zoptymalizowane pod kątem ich własnych modeli.

![Dwie ramki o jednakowej wysokości obok siebie. Po lewej harness natywny łączy się wyłącznie z modelami swojego dostawcy. Jest lepiej zoptymalizowany pod te modele, ale obsługuje jednego dostawcę. Po prawej, zaznaczony na czerwono, harness obsługujący wielu dostawców łączy się z OpenAI, Anthropic, Gemini, xAI i DeepSeek. Pozwala przełączać się między modelami lub używać kilku modeli do tego samego zadania.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-2/frame.html)

- **Podstawowe funkcje:** wszystkie harnessy oferują [podobny zestaw funkcji](https://arxiv.org/pdf/2609.00006), takich jak MCP, umiejętności czy subagenci. Gdy nowa funkcja zyskuje popularność, szybko trafia do kolejnych narzędzi, więc nie trzeba zmieniać narzędzi tylko ze względu na jedną funkcję.

- **Kluczowe funkcje:** od czasu do czasu pojawiają się nowe narzędzia, które oferują tak wiele, że warto się na nie przesiąść. Dobrym przykładem są **samodzielne zarządzanie** (agenci konfigurujący się i zarządzający osobnymi instancjami) oraz **agenci chmurowi**. Takie rozwiązania otwierają ogromne możliwości, na które nie powinniśmy czekać; po MEGA cała zdobyta wiedza pomoże nam rozpoznawać takie funkcje. Gdy się pojawią, powinniśmy móc łatwo zmienić harness.

![Dwa diagramy obok siebie. Agenci chmurowi: zlecasz pracę trzem agentom, a każdy z nich ma własne środowisko. Samodzielne zarządzanie: jeden agent łączy się z własnymi ustawieniami i dwiema swoimi instancjami.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-3/frame.html)

- **Konfiguracja niezależna od harnessu:** tam, gdzie to możliwe, warto wybierać konfiguracje, które łatwo przenosić między harnessami. Dobrymi przykładami są **agenci, umiejętności, narzędzia CLI i MCP**, choć ponowna autoryzacja wielu usług może być uciążliwa. [Kody](https://github.com/kentcdodds/kody), projekt open source stworzony przez Kenta, pokazuje, jak przenosić konfigurację między harnessami niemal bez dodatkowych ustawień.

- **Natywne możliwości:** najtrudniejszą kwestią w pracy z agentami i ich tworzeniu jest fakt, że **możliwości modeli szybko się poprawiają**. Jeśli zbudujemy wokół agenta jakąś logikę (może to być nawet umiejętność zawierająca [rozbudowane wskazówki](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/heavy-guidance)), możemy otrzymać konfigurację, która **pogarsza wydajność modelu**, i nie będzie jasne, co jest za to odpowiedzialne. Dobrym przykładem jest publikacja [Context Language Models](https://arxiv.org/abs/2609.37725), sugerująca, że LLM-y lepiej zarządzają kontekstem niż najlepsze znane nam dotąd strategie.

Wiedząc to wszystko, możemy łatwo być na bieżąco, **nie musząc w pośpiechu gonić za każdą nowością**. Z czasem zauważymy, że podstawy generatywnej AI i agentów AI nie zmieniają się co tydzień, a ich zrozumienie ułatwia nam ocenę, **co może być ważne, a co nie**. Jeśli wartość tych podstaw nie jest jeszcze dla nas jasna, stanie się jasna przed końcem MEGA.

Do tego czasu przyjrzyjmy się następującym opcjom:

- Harnessy takie jak **OpenCode, Pi, DeepSeek Agent** są najlepszym wyborem dla osób, które chcą **dostosowywać konfigurację na najgłębszym poziomie**.
- Harnessy takie jak **Cursor, Devin, Dots** są najlepszym wyborem dla osób, które chcą jak najwięcej funkcji od razu po uruchomieniu, w tym agentów chmurowych i orkiestracji.
- Interfejs użytkownika (UI)
- Narzędzia takie jak **T3 Code** pozwalają **zarządzać wieloma harnessami z jednego interfejsu** i dodają funkcje, których żaden z nich samodzielnie nie oferuje, na przykład uruchamianie subagentów Codex z poziomu wątku Claude Code.

![Diagram wyboru. „Wybierz harness” rozdziela się na dwie ścieżki. Ścieżka „najgłębsze dostosowanie” prowadzi do niestandardowego harnessu: OpenCode, Pi, DeepSeek Agent. Ścieżka „jak najwięcej od razu” prowadzi do gotowego harnessu: Cursor, Devin, Dots, z agentami chmurowymi i orkiestracją. Obie ścieżki prowadzą do opcjonalnej warstwy zarządzającej agentami programistycznymi. Ta warstwa to płaszczyzna sterowania (T3 Code, Superset) lub ogólny harness (Grok Bot, Dots).](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-4/frame.html)

Załóżmy, że wybieramy **Pi** jako nasz główny harness. Dzięki temu zobaczymy, jak działa od środka, i uzyskamy dostęp do najbardziej zaawansowanych przepływów pracy. Pi można używać **nie tylko jako agenta programistycznego** (który potrafi zarządzać sobą i swoimi instancjami), ale też **jako rdzenia własnego agenta**.

![Diagram przepływu z czerwoną ramką Pi zawierającą dwie części. W górnym wierszu rozmawiasz z Pi jako agentem programistycznym w CLI, a Pi zarządza własnymi ustawieniami i instancjami. W dolnym wierszu Twoja aplikacja używa Pi jako rdzenia własnego agenta.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-5/frame.html)

Kolejnym potrzebnym komponentem jest [Herdr](https://herdr.dev/), który pozwala nam **łatwo zarządzać instancjami Pi** i **utrzymywać je przy życiu nawet po zamknięciu terminala**. To ważny krok w kierunku trwałych agentów gotowych do podejmowania zadań wymagających długotrwałej pracy. Połączenie Pi z Herdr ma jeszcze jedną zaletę: oba narzędzia mogą **niemal całkowicie zarządzać sobą samodzielnie**. Zamiast samodzielnie je konfigurować, możemy więc **porozmawiać z agentami** o dostępnych ustawieniach i wspólnie ustalić najlepszą konfigurację dla naszych potrzeb.

![Zagnieżdżone pola, każde na całą szerokość pola nadrzędnego. Zewnętrzne pole to Serwer Herdr, zaznaczony na czerwono: zarządza procesami i działa nawet wtedy, gdy żadne okno nie jest otwarte. Wewnątrz znajduje się Obszar roboczy (jeden projekt) z etykietą „wymaga udziału człowieka”. Obszar roboczy zawiera Kartę, będącą układem paneli, a nie procesem. Karta zawiera trzy Panele. Każdy Panel to prawdziwy terminal z jednym agentem. Pierwszy agent pracuje (działa), drugi jest zablokowany (czeka na człowieka), a trzeci zakończył pracę (ale jego wynik nie został jeszcze sprawdzony). Pod polami tekst: zamknięcie okna pozostawia agentów działających, zatrzymanie serwera kończy ich pracę.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-6/frame.html)

Narzędzia takie jak Herdr nie służą wyłącznie do **wyświetlania** wątków z agentami, ale też umożliwiają **agentom zarządzanie własną pracą**. Przykładowo:

- Możemy poprosić agenta o uruchomienie kolejnego agenta
- Możemy poprosić agenta, by przekazał innemu agentowi jakąś informację
- Możemy poprosić agenta o uporządkowanie obszarów roboczych, kart i paneli
- Możemy poprosić agenta o zmianę niemal każdego ustawienia
- Możemy poprosić agenta o przejrzenie historii i zaproponowanie zmian w naszym przepływie pracy

Zarówno Pi, jak i Herdr udostępniają dokumentację, którą agenci mogą czytać. Możemy więc zacząć od prostego polecenia, by ją przeczytali i zaproponowali początkowe ustawienia, które warto zastosować. [Samodzielna konfiguracja](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/self-configuring-agent) jest również jednym z najważniejszych aspektów aplikacji generatywnych i agentów.

Warto też spróbować **uruchomić Herdr**, uruchomić w nim **Pi** i poprosić agenta o **utworzenie nowej karty Hello World z prostą wiadomością powitalną dla agenta**. Zobaczymy, jak agent:

1. Eksploruje swoje środowisko
2. Otwiera nową kartę w Herdr
3. Uruchamia nową instancję Pi
4. Wysyła do niej prompt
5. Czeka na zakończenie pracy workera i odczytuje jego wynik

Mówimy o **uruchomieniu workera**, który technicznie działa podobnie jak **subagent**, z tą różnicą, że worker jest w pełni interaktywny, można go dowolnie konfigurować, może mieć własne hooki i może być uruchamiany **w tle** w odpowiedzi na zdarzenie zewnętrzne. Dzięki temu **jeden agent może orkiestrwać pracę wielu workerów**, które działają nawet po zamknięciu terminala, bo uruchomione są w Herdr.

![Diagram sekwencji z czterema uczestnikami: Użytkownik, Koordynator, Herdr i Worker. Użytkownik zleca zadanie Koordynatorowi. Koordynator wysyła do Herdr cztery polecenia: herdr tab create, herdr agent start, herdr agent prompt i herdr agent read. Herdr uruchamia Pi na nowej karcie, wpisuje zadanie Workerowi i odczytuje ekran Workera. Herdr przekazuje tekst z ekranu Koordynatorowi, a Koordynator przekazuje odpowiedź użytkownikowi. Nie ma strzałki od Workera do żadnego innego uczestnika. Polecenie „herdr agent read” jest zaznaczone na czerwono.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-7/frame.html)

Agenci zarządzający sobą w ten sposób otwierają drogę do autonomii. Nawet jeśli nie wybierzemy takiego podejścia, może ono być przydatne do przygotowania przepływów pracy, które poprawiają jakość naszej aplikacji dzięki kontrolom UI / UX / wydajności / bezpieczeństwa lub różnym porządkom wykonywanym w tle.

Jest tu jednak pewien haczyk: samo uruchamianie workerów nie wystarczy. Potrzebujemy również:

- Sposobu na wymianę informacji między agentami
- Powiadomień o pracy agentów dla agentów koordynujących ich działania
- Bazy wiedzy do śledzenia wykonanych i planowanych zadań
- Zrozumienia przez agentów szerszej wizji projektu i przestrzegania ogólnych zasad
- Uwzględnienia udziału człowieka, a zarazem jego ograniczenia na wiele sposobów
- Piaskownic i mechanizmów zapobiegających niepożądanym działaniom agentów
- Własnego VPS-a lub fizycznego urządzenia dla agentów, gdy zajdzie taka potrzeba
- Własnych kont agentów i wszystkiego, co jest potrzebne do interakcji z aplikacją
- Hooków obsługujących interakcje z systemem na różnych etapach
- Przydatności systemu w zespole, w którym każdy członek ma własnych agentów
- Monitorowania i ewaluacji systemu, by w niektórych przypadkach mógł się doskonalić

To dużo. W kolejnych lekcjach omówimy jednak niemal każdy z tych aspektów. Na razie przyjrzyjmy się ogólnie temu, jak możemy wykorzystać Pi i Herdr, by agenci zarządzali sobą samodzielnie.

Po pierwsze, musimy zrozumieć, że harness **Pi** pomaga nam tworzyć własne **[rozszerzenia](https://pi.dev/docs/latest/extensions)**, które mogą modyfikować jego zachowanie na niskim poziomie, w tym cykl życia, niestandardowe narzędzia, polecenia, skróty, obsługę zdarzeń, manipulację promptem i wiele innych elementów.

Po drugie, **Herdr** zajmuje się wszystkim, co otacza agenta. Każdy worker otrzymuje **własną kartę** [otwieraną w tle](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/background-workers), dzięki czemu bieżąca rozmowa z Koordynatorem pozostaje interaktywna, a my możemy w dowolnym momencie przejść do dowolnego Workera. Herdr informuje też, czy Worker **nadal działa**, wskazuje, który utknął, i zamyka kartę po zakończeniu zadania.

Razem tworzą niezwykle potężne narzędzie, które możemy dostosować do naszych potrzeb. Warto jednak utrzymywać konfigurację **jak najprostszą** i możliwie ogólną.

Sposób konfiguracji harnessu nadal w dużym stopniu zależy od projektu, naszego sposobu pracy i oczekiwań wobec agentów. Dlatego przyjrzymy się projektowi, który przyjęło już kilka zespołów, więc każdy może znaleźć w nim coś dla siebie.

Poniżej wizualizacja struktury, w której **instancje Pi** (Koordynator / Worker) nie komunikują się ze sobą bezpośrednio. Zamiast tego wszystko odbywa się przez pliki (wszyscy mogą je odczytywać), a prosta logika Supervisora monitoruje każdego Workera i zapisuje wynik jego pracy (nawet po awarii). Koordynator obserwuje swoje Workery, otrzymuje powiadomienia o zakończeniu pracy i może nimi kierować. Każde uruchomienie jest śledzone w folderze zadań, a samo zadanie znajduje się w folderze funkcji.

![Diagram torów z pięcioma etapami od lewej do prawej: Zleć, Przekaż, Pracuj, Zakończ, Scal. Są na nim cztery tory od góry: Ty, Koordynator, Workery i Supervisor. Zlecasz uzyskanie wyniku, a Koordynator zapisuje zgłoszenie i uruchamia Workera. Worker otrzymuje własne środowisko. Supervisor uruchamia się razem z Workerem. Workery przedstawiono jako stos, ponieważ kilka działa równolegle. Wykonują zadanie, a następnie zatwierdzają zmiany i składają raport. Supervisor obserwuje je i zapisuje wynik. Koordynator pozostaje z Tobą i otrzymuje komunikat „zadanie zakończone”. Następnie decydujesz, co zostanie scalone, a Koordynator scala zmiany i zamyka zadanie. Od Workerów ani Supervisora nie prowadzi strzałka do Koordynatora.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-8/frame.html)

Całość zrealizowano głównie za pomocą zwykłych plików tekstowych, git i instrukcji tekstowych, przy minimalnej ilości skryptów. Nie ma tu bazy danych, kolejki komunikatów, bramek ani frameworków. Jest tylko małe narzędzie wiersza poleceń, które łączy następujące elementy:

- **git worktrees** zapewniają każdemu Workerowi własną kopię kodu i własną gałąź, dzięki czemu Workery sobie nie przeszkadzają
- **Herdr** zapewnia każdemu Workerowi własną kartę, a Supervisor używa herdr, by sprawdzać, czy Worker nadal działa
- **Rozszerzenia Pi** działają wewnątrz agentów. W Koordynatorze rozszerzenie obserwuje foldery zadań i [dodaje wiadomość do czatu po zakończeniu zadania](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/job-end-notifications). W Workerze rozszerzenie przekazuje [poprawki Koordynatora między wywołaniami narzędzi](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/worker-steering) i udostępnia agentowi narzędzie do przygotowania raportu końcowego.
- **Pliki tekstowe** przechowują zarówno reguły globalne, jak i zadania dotyczące konkretnych funkcji. Rozszerzenie dodaje pliki globalne (wizję, przewodnik po stylu i tablicę) do każdego promptu, dzięki czemu wszyscy agenci przestrzegają tych samych zasad. Zadanie dla każdej funkcji pozostaje w zgłoszeniu, które Worker odczytuje po uruchomieniu. Ogólnie rzecz biorąc, to niemal dokładnie to, o czym rozmawialiśmy w lekcji S01E03.

Kod wykonuje wyłącznie te czynności, których tekst nie potrafi niezawodnie realizować: uruchamia zadanie, monitoruje je, zapisuje wynik i wysyła powiadomienie. Wszystko inne to tekst odczytywany przez agentów, na przykład co zbudować, jak to napisać i kiedy poprosić o przegląd.

![Trzy rekordy w środkowym wierszu: Specyfikacja w Git ze stanami Planowane, Aktywne, Ukończone; Rekord zadania na tym komputerze; Gałąź w Git. Koordynator powyżej zapisuje zgłoszenie w Specyfikacji i scala Gałąź. Poniżej Worker odczytuje Specyfikację, zapisuje postęp i raport w Rekordzie zadania oraz zatwierdza zmiany w Gałęzi. Supervisor zapisuje wynik w Rekordzie zadania. Jedna czerwona strzałka prowadzi od Rekordu zadania do Koordynatora: „zadanie zakończone”. Koordynatora i Workera nie łączy żadna strzałka.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-9/frame.html)

Kod źródłowy tego projektu (w chwili pisania tego tekstu) [jest dostępny tutaj](https://github.com/overment/limen/tree/01fc400e916e05f4f92ff881b48cd1b40eee99e6). Warto omówić jego strukturę z agentem, trochę się nim pobawić, a nawet zastosować go we własnym projekcie. Można to zrobić w następujący sposób:

1. Uruchom `limen init`
2. Wspólnie z agentem opracuj pliki `vision.md` i `styleguide.md`
3. Zainstaluj Pi i Herdr
4. Otwórz Pi i poproś o zaimplementowanie czegoś

Plik **vision** zawiera ogólny opis produktu i kierunek jego rozwoju. Może również obejmować **mapę funkcji**, która odsyła do osobnych plików z ogólnymi opisami najważniejszych modułów itp. **styleguide** zawiera zasady, których agent powinien przestrzegać podczas pisania kodu. Różni się od AGENTS.md tym, że częściej dodaje się go do kontekstu, by przypominać modelowi o tych zasadach. Dlatego oba pliki muszą być dobrze opracowane i bardzo zwięzłe.

Uwaga: ten projekt działa na macOS i Linux, ale niektóre funkcje, na przykład jeden z elementów związanych z odzyskiwaniem agentów, są obsługiwane tylko na macOS.

## Ustawienia

Gdy mamy już dobrą kontrolę nad harnessem i agentami, dzięki czemu nie musimy zarządzać każdym z osobna, łatwiej przełączać się między dostawcami lub kierować zapytania do modeli. Wystarczy ustalić kilka zaleceń dla agenta zarządzającego pozostałymi.

Wybór modelu zależy przede wszystkim od naszych preferencji i budżetu. Jeśli to możliwe, najlepiej pracować z modelami najnowocześniejszymi (SOTA), czyli najlepszymi dostępnymi w danym momencie. Aby obniżyć koszty, możemy ustawić **niższy poziom wysiłku rozumowania** dla łatwiejszych zadań albo przełączyć się na osobny, mniejszy i tańszy model.

![Siatka dwa na dwa. Wiersze odpowiadają modelowi SOTA i mniejszemu modelowi, a kolumny — wysokiemu i niskiemu wysiłkowi. Model SOTA z wysokim wysiłkiem jest zaznaczony na czerwono jako najlepsza opcja. Model SOTA z niskim wysiłkiem służy do łatwiejszych zadań. Mniejszy model jest tańszy, a mniejszy model z niskim wysiłkiem — najtańszy. Ciemniejsze cieniowanie oznacza wyższy koszt.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-13/frame.html)

Niestety nie ma jasnej zasady mówiącej, którego poziomu rozumowania używać, ponieważ zależy to od modelu, zadania i naszego harnessu. Benchmarki mogą być przydatne do ustalenia punktu odniesienia, ale w praktyce nadal musimy [sprawdzić, jaki poziom rozumowania najlepiej działa dla naszych zadań](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/effort-routing).

Uwaga: sama cena tokenów nie wystarczy do określenia kosztu modelu, ponieważ niektóre modele generują znacznie więcej tokenów rozumowania lub potrzebują więcej czasu na rozwiązanie zadania. [slopalytics](https://slopalytics.com) udostępnia dokładniejszą miarę **kosztu zadania**.

![Wykres słupkowy z przykładowymi wartościami dla dwóch modeli. Model A kosztuje 0,50 USD za milion tokenów, a Model B — 2,00 USD. Model A zużywa 220 tys. tokenów na zadanie, a Model B — 40 tys. Zatem Model A kosztuje 0,11 USD za zadanie, a Model B — 0,08 USD. Kolumna kosztu zadania jest zaznaczona na czerwono.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-11/frame.html)

Warto zauważyć, że wiele przepływów pracy, takich jak współpraca wielu agentów, stało się znacznie wydajniejszych mniej więcej od czasu premiery Opus 4.8, która nastąpiła całkiem niedawno. Jeśli więc spróbujemy wykorzystać omawiane tu przepływy pracy ze starszymi modelami lub modelami open source, takimi jak najnowszy Qwen, może się okazać, że nie potrafią one w ten sposób realizować zadań.

![Diagram przepływu. Po lewej ogólne zalecenie i bieżący kontekst, oba prowadzą do nadrzędnego agenta pośrodku, zaznaczonego na czerwono. Od nadrzędnego agenta linie prowadzą do trzech zarządzanych agentów w jednej ramce. Agenci korzystają z modelu SOTA z wysokim wysiłkiem rozumowania, modelu SOTA z niskim wysiłkiem rozumowania i mniejszego modelu. Te trzy konfiguracje są przykładowe.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-10/frame.html)

W niektórych przypadkach możemy potrzebować **modeli open source** dla określonych projektów, a nawet konkretnych funkcji projektów, nad którymi pracujemy. Modele open source wykraczają poza zakres MEGA (przydatne wprowadzenie znajdziesz w [LLMs 101: A Practical Guide](https://x.com/TheAhmadOsman/status/2057590224729911346)), ale warto pamiętać, że gdy prywatność ma kluczowe znaczenie, **[żaden LLM nie potrafi niezawodnie wybrać modelu](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/privacy-boundary)**. Potrzebujemy **wyraźnego, deterministycznego rozdzielenia**, ponieważ obecne modele są bardzo sprytne i potrafią obchodzić nawet silne ograniczenia.

![Dwie konfiguracje dla prywatnego projektu. W górnej konfiguracji LLM wybiera model i może znaleźć sposób na skorzystanie z modelu chmurowego. W dolnej konfiguracji deterministyczne rozdzielenie łączy projekt prywatny wyłącznie z modelem open source, bez ścieżki do modelu chmurowego.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-12/frame.html)

## Praca zespołowa

Praca z agentami w zespole nie jest oczywista, a obecnie nie ma jasnych odpowiedzi na pytanie, jak robić to dobrze. Dlatego musimy wykorzystać naszą wiedzę o generatywnej AI i dostępnych narzędziach do tworzenia przepływów pracy, które najlepiej nam służą i **ewoluują razem z nami**.

Warto przyjrzeć się kilku kwestiom:

**Współdzielone zasoby:**
AGENTS.md i umiejętności, które omawialiśmy w S01E02, to pierwsze elementy, które powinniśmy przygotować. Następnie potrzebujemy łatwego sposobu udostępniania ich zespołowi — przez **repozytorium git**, [npx skills](https://github.com/vercel-labs/skills) lub [wewnętrzny serwer MCP](https://modelcontextprotocol.io/community/working-groups/skills-over-mcp), który omówimy w kolejnych lekcjach. W każdym przypadku musimy zadbać o to, by umiejętności były **współdzielone** i łatwe do **aktualizowania**.

![Diagram przepływu. Jedna umiejętność — plik SKILL.md wraz z opcjonalnymi plikami pomocniczymi — dociera do agenta na trzy sposoby. Dzięki repozytorium Git i npx skills umiejętność trafia na dysk. W przypadku Skills over MCP agent ładuje ją z serwera MCP i nie instaluje.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-14/frame.html)

**Wewnętrzna baza wiedzy:**
Podobnie jak umiejętności, baza wiedzy może mieć własne API i być dostępna dla agentów przez CLI lub MCP. Dokumenty mogą znajdować się **na zdalnym serwerze** i być zarządzane przez agenta, który porządkuje napływające informacje oraz wprowadza zmiany zgłaszane przez członków zespołu lub administratora. Taka konfiguracja otwiera też prostą drogę do zaplanowanych przepływów pracy, które utrzymują porządek i aktualność dokumentów.

![Diagram przepływu. Ramka Serwer zdalny zawiera harmonogram, skrzynkę odbiorczą i zdarzenie u góry, poniżej agentów (Pi / CLI), a pod nimi bazę wiedzy zaznaczoną na czerwono. Harmonogram i zdarzenie uruchamiają agentów. Agenci odczytują skrzynkę odbiorczą i porządkują bazę wiedzy. Druga ramka, Urządzenia zespołu, zawiera trzy zsynchronizowane klony. Baza wiedzy synchronizuje się z każdym klonem. Liczba urządzeń jest przykładowa.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-15/frame.html)

**Stos narzędzi przyjazny AI:**
Narzędzia używane w firmie **bezpośrednio określają**, ile możemy zrobić z pomocą AI. Dotyczy to nie tylko harnessu, ale także stosu technologicznego wykorzystywanego do tworzenia aplikacji, a nawet usług, platform i narzędzi, z których korzystamy poza wytwarzaniem oprogramowania, takich jak systemy CRM, narzędzia do projektowania, platformy obsługi klienta itp.

Oto na przykład lista narzędzi, których zespół MEGA używa do tworzenia produktów i przepływów pracy:

- Obserwowalność i telemetria produktu: [PostHog](https://posthog.com/), [Axiom](https://axiom.co/docs)
- Budowanie, przechowywanie i dostęp zdalny: [Vercel](https://vercel.com/), [Minio](https://www.min.io/), [Depot](https://depot.dev/), [Cloudflare](https://www.cloudflare.com/) + [Alchemy](https://alchemy.run/), [Tailscale](https://tailscale.com/), [UploadThing](https://uploadthing.com/)
- Interfejsy agentów i harnessy: [Pi](https://pi.dev/), [Herdr](https://herdr.dev/), [Moshi](https://getmoshi.app/), [OpenRouter](https://openrouter.com/)
- Typowana baza aplikacji: [XState](https://stately.ai/docs/xstate), [Effect](https://effect.website/), [oxlint](https://oxc.rs/), [mdsvex](https://svelte.dev/docs/cli/mdsvex)
- Uwierzytelnianie i backend: [Clerk](https://clerk.com/), [Convex](https://www.convex.dev/)
- Praca, którą może wykonać agent: [Linear](https://linear.app/), [Stripe](https://stripe.com/), [Resend](https://resend.com/), [Attio](https://attio.com/)
- Projektowanie: [Paper](https://paper.design/), [Figma](http://figma.com/)

Oczywiście nie wszystkie narzędzia z tej listy przydadzą się każdemu, ale niektóre z pewnością tak. Sama lista może też zainspirować do odkrywania nowych narzędzi i odświeżenia obecnego stosu technologicznego.

**Zautomatyzowane przepływy pracy:**
Na koniec mamy zautomatyzowane przepływy pracy, które działają niemal całkowicie w tle. Najpopularniejsze przykłady to agenci integrujący się z GitHubem, tacy jak [Claude Code](https://code.claude.com/docs/en/github-actions), [Cursor](https://cursor.com/docs/cli/github-actions), [Devin](https://devin.ai/) i [CodeRabbit](https://www.coderabbit.ai/). W praktyce oznacza to, że można wywoływać tych agentów **w komentarzach na GitHubie i Pull Requestach**, a zdarzenia w repozytorium również mogą ich uruchamiać. Można ich użyć do:

- utrzymywania aktualności dokumentacji, bazy wiedzy, a nawet całej witryny
- przekształcenia zgłoszenia w pull request wzbogacony o potrzebny kontekst
- [przeglądania pull requestów zaraz po ich utworzeniu](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/pr-review-rules) i dodania krótkiego komentarza
- autonomicznego naprawiania drobnych błędów i publikowania zmian
- wykrywania problemów w kodzie i zależnościach
- przypisywania pull requestów osobie odpowiedzialnej za daną funkcję
- zbierania danych z systemów zewnętrznych, a nawet od ludzi
- wykonywania rutynowych zadań, takich jak usuwanie nieużywanego kodu

![Diagram czytany od lewej do prawej. Agenta uruchamiają trzy rodzaje zdarzeń: @claude w komentarzu, nowy PR, push lub zgłoszenie oraz codzienny albo cotygodniowy harmonogram. Agent znajduje się w ramce Uprawnienia. Odczytuje kod, historię i zasady zespołu, a jego cykl działania to uruchomienie, jedno zadanie i zatrzymanie. Tworzy odpowiedzi na pytania, zmiany kodu i poprawki błędów, pull requesty na podstawie zgłoszeń, komentarze z przeglądu, aktualizacje dokumentacji oraz raporty i podsumowania. Wszystkie wyniki trafiają do człowieka, zaznaczonego na czerwono. Człowiek sprawdza wynik i scala go albo prosi o poprawki. Przerywana linia prowadzi z powrotem do agenta, by wprowadził zmiany.](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-16/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e04/artifacts/lesson/figure-16/frame.html)

AI potrafi teraz generować i **monitorować** takie przepływy pracy oraz okresowo proponować ich ulepszenia.

Zautomatyzowane przepływy pracy można rozwinąć jeszcze bardziej, przenosząc omówioną konfigurację Pi i Herdr na VPS i łącząc ją z GitHubem. Omówimy to jednak w kolejnych lekcjach.

## Wnioski

Najważniejsze w pracy z harnessami AI jest to, że możemy używać AI do tworzenia konfiguracji i zarządzania nią, **ale nadal powinniśmy utrzymywać ją tak prostą, jak to możliwe**, by szybko ją doskonalić. Omówiliśmy konfigurację z Pi i Herdr, ale nie oznacza to, że używanie Cursor, Claude Code lub innego harnessu jest złym pomysłem. Wszystko zależy od naszego kontekstu i musimy rozsądnie decydować, co jest **przydatne dla nas**, a co nie.

Jeśli z tej lekcji zapamiętasz **jedną rzecz**, niech będzie nią ta: pobaw się [tym repozytorium](https://github.com/overment/limen), porozmawiaj o nim z agentem AI i spróbuj **wyciągnąć z niego pomysły** albo **dostosować je do swoich potrzeb**.
