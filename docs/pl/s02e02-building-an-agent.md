# S02E02 · Budowanie agenta

Myśląc o budowaniu agentów, możemy zadać sobie pytanie: **po co mielibyśmy budować własnego, skoro Devin, Grok Bot czy Claude są tak dobre** i nasza aplikacja lub usługa może łatwo się z nimi integrować dzięki Model Context Protocol?

## Plan

- Środowisko agenta: konfiguracja agenta, środowiska uruchomieniowe, środowiska wykonawcze, pakiety, pamięć masowa, struktury danych, artefakty wielokrotnego użytku
- Modele: wybór modelu, kompromisy między możliwościami a kosztem, zwykły kod zamiast decyzji modelu
- Projektowanie narzędzi: narzędzia a API, jasno określone odpowiedzialności, opisy, schematy, zwalidowane dane wejściowe, użyteczne wyniki, błędy wskazujące możliwe działania, ustrukturyzowane odpowiedzi
- Kontekst i pamięć: składanie kontekstu, historia konwersacji, pamięć robocza, trwała pamięć, wyszukiwanie, zakres i cykl życia pamięci
- Przepływy pracy i mechanizmy kontroli: kroki, rozgałęzienia, grafy, zadania, kolejki, przejścia stanów, skutki uboczne, limity wykonania, izolacja, zatwierdzanie, wstrzymywanie i wznawianie

Załóżmy, że mamy platformę e-commerce, na której użytkownicy sprzedają swoje produkty. Mogą chcieć zarządzać nimi z pomocą swoich agentów, więc łączą konta z Claude za pomocą MCP. My jednak chcemy oferować klientom spersonalizowane rekomendacje optymalizacji kampanii, oparte na uogólnionych informacjach z całej naszej platformy. Potrzebujemy do tego agenta i **nie możemy użyć środowiska użytkownika**, więc musimy zbudować własne.

![Diagram przepływu. Sprzedawca, będący użytkownikiem dzierżawcą aplikacji, zarządza produktami przez Claude, wybrane przez siebie środowisko agenta, które łączy się z kontem sprzedawcy w naszej aplikacji przez MCP. W naszej aplikacji działa własny agent z naszym środowiskiem, który korzysta z uogólnionych informacji z całej platformy i rekomenduje sprzedawcy optymalizacje kampanii. Dwie ramki oddzielają środowisko agenta użytkownika od naszej aplikacji.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-1/frame.html)

Dlatego dzisiaj omawiamy, czego potrzeba do zbudowania własnego agenta. Warto też obejrzeć wykład Lee Robinsona na Stanford CS146S „[How always-on agents work](https://x.com/leerob/status/2108650243365736855?s=20)”.

## Architektura

Agentów można budować od podstaw, a przy dzisiejszych agentach programistycznych jest to całkiem wykonalne. Możemy też skorzystać z agentowych frameworków, takich jak [Mastra](https://mastra.ai/) lub [Agents SDK](https://developers.cloudflare.com/ai-search/agent-sdks/agents-sdk/), które ułatwiają ten proces, obsługując typowe mechanizmy, których nie musimy implementować samodzielnie. Warto tylko pamiętać, że korzystając z frameworków AI, możemy stracić możliwość niektórych „niskopoziomowych” modyfikacji. Wreszcie, jak wspomnieliśmy wcześniej, możemy oprzeć się na otwartoźródłowych środowiskach agentów, takich jak Pi czy Goose.

Projektując architekturę agenta, musimy odejść od niektórych typowych wzorców znanych z tworzenia aplikacji i zadać sobie kilka pytań:

- **Autonomia:** jaki poziom autonomii jest potrzebny i jaką rolę będą pełnić ludzie?
- **Interfejs użytkownika:** czy potrzebujemy pełnego interfejsu, samych [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview), a może **generatywnego interfejsu użytkownika**?
- **Profile:** czy użytkownicy potrzebują własnych przestrzeni roboczych, czy możemy scentralizować środowisko?
- **Możliwości:** czy agent potrzebuje własnego komputera, przeglądarki, systemu plików lub piaskownicy?
- **Integracje:** jak agent ma obsługiwać integracje?
- **Łączność:** czy agent musi łączyć się z systemami zewnętrznymi?
- **Pamięć:** jakiej strategii ekstrakcji i wyszukiwania chcemy użyć?
- **Samodoskonalenie:** czy agent ma się sam konfigurować i w jakim stopniu?
- **Zarządzanie kontekstem:** jakie wzorce zarządzania kontekstem chcemy zastosować?
- **Środowisko:** co agent musi wiedzieć o swoim środowisku?
- **Pamięć podręczna:** jak zoptymalizować trafienia w pamięć podręczną do poziomu 99%? To **kluczowe!**
- **Komunikacja:** jak agent będzie prosić o uprawnienia lub informować o wykonanej pracy?
- **Bezpieczeństwo:** jak zapewnimy bezpieczeństwo danych i wykryjemy potencjalne nadużycia systemu?

Trzeba tu podjąć wiele decyzji, wybierzemy więc ścieżkę najtrudniejszą, ale przynoszącą największą wartość. Chodzi o **samodoskonalącego się, opartego na prymitywach agenta zdolnego do niezawodnego wznawiania pracy**. Oczywiście nie zbudujemy tu całego systemu, ale omówimy jego aspekty i najważniejsze mechanizmy.

![Architektura samodoskonalącego się agenta opartego na prymitywach i zdolnego do niezawodnego wznawiania pracy. W centrum znajduje się pętla agenta: Myśl, Działaj i Obserwuj w cyklu, z modelem pośrodku. Ramka środowiska („to, co budujemy”) otacza pętlę i zawiera cztery elementy: Kontekst, Narzędzia, Uprawnienia i Stan. Pod środowiskiem ramka Prymitywy zawiera sześć bloków: Integracje, Wartości, Sekrety, Aplikacje, Dokumenty i Pakiety. Po lewej użytkownik przekazuje środowisku zadanie i otrzymuje prośby o zatwierdzenie oraz raporty. Czerwona ścieżka prowadzi z pętli agenta przez Uprawnienia do Prymitywów („utwórz / edytuj”), a następnie z Prymitywów do Kontekstu („wczytane przy następnym uruchomieniu”). Tylko Integracje łączą się z systemami zewnętrznymi („jedyna droga na zewnątrz”).](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-2/frame.html)

## Najważniejsze funkcje

Projektowanie agentów różni się od projektowania typowych aplikacji. Wraz z tym, jak modele stają się lepsze, tańsze i szybsze, możemy dawać im więcej swobody i przestrzeni. Zamiast budować wąskie rozwiązanie wyspecjalizowane w jednej rzeczy, możemy pozwolić AI znaleźć sposób obsługi przypadków, których nie przewidzieliśmy.

Na przykład, jeśli chcemy stworzyć narzędzie do edycji zdjęć, nie musi ono oferować z góry określonego zestawu filtrów i opcji. Zamiast tego może dać agentowi możliwość generowania filtrów i opcji spersonalizowanych dla każdego użytkownika. Przed AI mieliśmy bardzo ograniczone możliwości w tym zakresie. Teraz daje to naszej aplikacji dużą elastyczność, ale stawia też nowe wyzwania: co stanie się z projektami, w których użyto filtra, który agent później zmodyfikował?

![Użytkownik z potrzebą łączy się z agentem. Agent łączy się z interfejsem, zaznaczonym na czerwono i opisanym jako z góry określony zakres, który udostępnia cztery operacje: filters.list, filters.create, filters.update i filters.delete. Interfejs łączy się z biblioteką filtrów użytkownika. Każdy filtr ma próbkę pikselową, nazwę i opcje. Nowy filtr, Stary film, ma opcje ziarno i wyblaknięcie. Pozostałe filtry to Miękki portret, Nocne miasto i Ciepły zachód słońca. Nazwy operacji, filtrów i opcji są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-3/frame.html)

Ten przykład pokazuje **nowy sposób myślenia** o architekturze aplikacji, ale możemy pójść jeszcze dalej. Zamiast generować tylko filtry, agent mógłby tworzyć całe narzędzia, panele i przepływy pracy dostosowane do sposobu pracy każdego użytkownika. W ten sposób nasza rola zmienia się z projektowania funkcji na **kształtowanie środowiska**, w którym agent je buduje. Innymi słowy, decydujemy, jaki interfejs dostanie agent, jakich zasad będzie przestrzegać i jakich granic nie może przekroczyć.

![Użytkownik zwraca się do agenta. Agent działa wewnątrz czerwonej ramki „Środowisko, które kształtujemy”, zawierającej cztery oznaczone wiersze. Wiersz Interfejs zawiera tools.create, panels.create i workflows.create. Każda operacja wskazuje element tworzony w przestrzeni roboczej użytkownika: narzędzie „Zbiorczy znak wodny”, panel „Wybory klienta” i przepływ pracy „Dostawa ślubna”. Wiersz Zasady zawiera „Zachowaj historię projektu” i „Nie psuj istniejących projektów”. Wiersz Ograniczenia zawiera „Brak dostępu poza aplikacją” i „Nie usuwaj plików użytkownika”. Nazwy elementów i opisy są przykładami dla aplikacji do edycji zdjęć.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-4/frame.html)

Takie środowisko kształtuje się za pomocą **prymitywów**: ogólnych elementów składowych, które można łączyć, aby uzyskać niezawodne, a nawet deterministyczne wyniki. Trudno zrobić to dobrze, ale dzięki AI możemy **łatwo iterować nad prototypami i makietami**, aby spojrzeć na architekturę z różnych perspektyw.

Załóżmy, że chcemy **rozwijającego się agenta działającego w tle**, który pomaga nam się uczyć. Porządkuje on naszą bazę wiedzy i wyszukuje informacje na tematy, które nas ciekawią, korzystając **wyłącznie z zaufanych przez nas źródeł**. **Nie ma własnego interfejsu**. Zamiast tego działa w bazie wiedzy i dociera do nas za pośrednictwem kanałów, z których już korzystamy, takich jak krótka notatka, wiadomość lub cotygodniowe podsumowanie. Po skonfigurowaniu **wymaga bardzo niewielkiej obsługi** i minimalnego nadzoru.

Jest **proaktywny**, ale nie dlatego, że działa według harmonogramu ustalonego na początku. Zamiast tego **analizuje własną pracę**. Zauważa, jak bardzo jesteśmy aktywni, na czym się teraz skupiamy oraz z których jego działań skorzystaliśmy, a które zignorowaliśmy. Następnie dostosowuje to, co robi, jak często i jak intensywnie: zachowuje ciszę podczas pracowitych tygodni i prowadzi dokładniejsze badania, gdy coś odkrywamy. Każda zmiana, którą wprowadza, jest **rejestrowana w bazie wiedzy i można ją cofnąć**, więc działanie w tle nie oznacza utraty kontroli.

![Po lewej znajduje się użytkownik, poza czerwoną ramką Prymitywy. Ramka zawiera sześć bloków składowych, każdy ze swoimi operacjami: Pamięć (baza wiedzy: notes.read, notes.write, notes.link), Zdarzenia (aktywność: events.watch, na przykład „edytowano notatkę”, „zapisano link”, „dodano plik”), Narzędzia (świat zewnętrzny: web.search, page.read), Wiadomości (jedyna droga dotarcia do użytkownika: message.send), Dziennik (wykonane działania i ich skuteczność: journal.read, journal.write) oraz Harmonogram (własne wybudzenia agenta, które sam zmienia: schedule.get, schedule.set). Użytkownik łączy się tylko z Pamięcią linią opisaną „edytuje notatki” oraz z Wiadomościami przerywaną linią „cotygodniowe podsumowanie”. Pod ramką pętla otacza agenta, który nie ma interfejsu: obserwuje (Zdarzenia, Pamięć), analizuje (Dziennik), działa (Narzędzia, Pamięć, Wiadomości) i ponownie planuje (Harmonogram, Dziennik). Obok pętli oś czasu aktywności porównuje dwa tygodnie. W pracowitym tygodniu agent budzi się często, a wysokość słupków pokazuje większą liczbę badań. W spokojnym tygodniu budzi się tylko dwa razy. Położenie i wysokości słupków są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-5/frame.html)

Mając tę wizję na uwadze, możemy zacząć myśleć o **prymitywach**, które ukształtują środowisko agenta. Razem zapewnią mu wszystko, czego potrzebuje do wykonywania swojej pracy, ale także do **dostosowywania się** i **zarządzania sobą**.

**Zdarzenie:** sygnał o aktywności, który może pochodzić z dowolnego źródła i wpływać na dokumenty.
**Harmonogram:** wybudzenia, które agent ustawia samodzielnie.
**Dokument:** wszystko, co agent napisał dla siebie i dla nas.
**Umiejętność:** powtarzalna praca zapisana w formie, którą agent może ponownie wykorzystać, również w sposób deterministyczny.
**Dziennik:** wszystko, co agent zrobił. Wpisy są tylko dodawane, nigdy edytowane.
**Kanał:** jedyny sposób, w jaki agent może skontaktować się z użytkownikiem.

Takie prymitywy można łączyć, więc **Zdarzenie** może na podstawie swojego typu wywołać określoną **Umiejętność**, **Harmonogram** może być powiązany z daną kategorią **Dokumentów**, a każda czynność pozostawia wpis w **Dzienniku**. Podczas analizy agent czyta **Dziennik**, aby zdecydować, kiedy obudzić się następnym razem, którą pracę warto zapisać jako nową **Umiejętność** i czy coś zasługuje na naszą uwagę oraz przekazanie przez **Kanał**.

W ten sposób kilka ogólnych elementów tworzy zachowanie, którego nie musieliśmy wcześniej projektować, a każdy krok nadal mieści się w ukształtowanym przez nas środowisku. Gdy coś pójdzie nie tak, **Dziennik** pokaże, co się stało i dlaczego.

![Przykład agenta bazy wiedzy. Czerwona ramka „Środowisko, które kształtujemy” zawiera sześć bloków prymitywów. Wiersz 1: Umiejętność „podsumuj artykuł w notatce” ze strzałką „zapisuje notatkę” do Dokumentu „tematy badań”. Wiersz 2: Zdarzenie „zapisano link” ze strzałką „wyzwala” w górę do Umiejętności, szeroki Dziennik z wpisami „09:12 podsumowano artykuł” i „pon. 08:00 zaktualizowano 3 notatki badawcze” oraz Harmonogram „w każdy poniedziałek” ze strzałką „aktualizuje” w górę do Dokumentu. Cienkie linie z wszystkich trzech strzałek wchodzą do górnej części Dziennika. Wiersz 3: Agent analizuje. Strzałka „odczytuje” prowadzi z Dziennika do Agenta. Agent wysyła ukośną strzałkę „zapisz powtarzalną pracę jako Umiejętność” w lewo i w górę do Umiejętności oraz ukośną strzałkę „obudź się za 2 dni” w prawo i w górę do Harmonogramu. Wiersz 4: strzałka „wyślij krótkie podsumowanie” prowadzi od Agenta do Kanału. Tylko strzałka od Kanału przekracza ramkę i prowadzi do okręgu Użytkownika na zewnątrz. Pod nią panel Ślad pokazuje przygaszony wpis „pon. 08:00 zaktualizowano 3 notatki badawcze” i wyróżniony wpis „09:12 podsumowano artykuł”. Kropkowana strzałka „utworzono przez” prowadzi do Umiejętności „podsumuj artykuł w notatce”, a kropkowana strzałka „wyzwolono przez” prowadzi do Zdarzenia „zapisano link”. Podpis znajduje się po prawej stronie panelu. Wszystkie nazwy, zdarzenia i wpisy są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-6/frame.html)

W tym momencie widzimy, że niektóre **prymitywy** mogą znajdować się w systemie plików, dzięki czemu agent może łatwo z nimi pracować. Harmonogramy, zdarzenia, skrypty, dokumenty i dziennik mogą być plikami. Aby agent mógł swobodnie z nich korzystać, musi umieć pisać kod, co oznacza, że potrzebuje piaskownicy. Nie oznacza to jednak, że **wszystkie prymitywy muszą znajdować się w systemie plików**, ponieważ niektóre mogą istnieć w bazie danych i być dostępne przez dedykowany interfejs. To od nas zależy również, czy rdzeń agentowy będzie oparty na wybranym przez nas frameworku, czy na całkowicie własnej logice.

## Dostawcy i konfiguracja

Budując agentów, nie powinniśmy uzależniać się od konkretnego dostawcy, nie tylko ze względu na uzależnienie od dostawcy, ale też dlatego, że możemy chcieć korzystać **jednocześnie z wielu modeli** albo z modeli dostępnych u konkretnego dostawcy.

Możemy na przykład używać Gemini do generowania obrazów, modelu decyzyjnego od TypeSafe albo mieszaniny modeli Anthropic i OpenAI, aby uzyskać różne perspektywy lub po prostu korzystać z aktualnie najlepszego modelu. Najłatwiej uzyskać to wszystko za pośrednictwem platform takich jak [OpenRouter](https://openrouter.com/), choć warto pamiętać, że niektóre natywne funkcje API danego dostawcy mogą być tam niedostępne. Tworząc produkty dla klientów B2B, możemy rozważyć [Amazon Bedrock](https://aws.amazon.com/bedrock/model-choice/) lub [Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-foundry/models).

Architektura naszego agenta powinna obejmować bramę i adaptery dla dostawców, których chcemy obsługiwać. Innymi słowy, musimy zadbać o to, by wszyscy dostawcy posługiwali się w naszej aplikacji tym samym językiem, a dodanie lub usunięcie dostawcy nie stanowiło problemu.

![Diagram architektury agenta korzystającego z trzech modeli jako przykładu. Cotygodniowe zadanie agenta ma trzy czynności: sortowanie nowych notatek jest łatwym zadaniem, pisanie podsumowania obejmuje pozostałe działania, a rysowanie obrazu okładkowego wymaga generowania obrazów. Wszystkie trzy zadania trafiają do jednej bramy, zaznaczonej na czerwono. Brama kieruje każde zadanie przez osobny adapter dostawcy. Adapter OpenAI wywołuje mały model, adapter Anthropic wywołuje główny model, a adapter Gemini wywołuje model obrazowy. Zadania i przyporządkowanie dostawców do modeli są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-7/frame.html)

Dostęp do wielu modeli pozwala nam myśleć o **routingu modeli**: obsługiwaniu łatwiejszych zadań przez mniejszy, szybszy i tańszy model lub przy niższych ustawieniach rozumowania. Pierwszym krokiem może być skonfigurowanie modeli **primary / secondary** dla danego dostawcy, co może zauważalnie zwiększyć ogólną wydajność agenta. Dostępne są też bardziej zaawansowane routery, takie jak [Max od Arena AI](https://arena.ai/blog/introducing-max) — model kierujący każde zadanie do najlepszego modelu, aby poprawić wydajność i dokładność — choć w wielu przypadkach może to być przerost formy nad treścią.

![Diagram przepływu prostego routingu modeli. Zadanie trafia do reguły routingu w kodzie. Reguła kieruje wyszukiwanie do modelu pomocniczego, który jest mały i szybki, a planowanie do modelu głównego, który ma duże możliwości. Reguła routingu jest wyróżnionym elementem. Typy zadań i mapa reguł są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-8/frame.html)

W miarę rozwoju LLM-ów i ich API nasze aplikacje powinny unikać warstw, które niepotrzebnie utrudniają migrację do nowszych wersji. Na przykład, jeśli ktoś zbudował aplikację z użyciem API Chat Completions od OpenAI i nie ma łatwego sposobu na migrację do API Responses, [niektóre modele i funkcje mogą być dla niego niedostępne.](https://developers.openai.com/api/docs/guides/migrate-to-responses).

## Projektowanie narzędzi

Agenci mogą łatwo tworzyć narzędzia dla siebie — potrzebują tylko dokumentacji i kilku przykładowych żądań. Przy bliższym spojrzeniu widać jednak, że warto rozważyć kilka kwestii, aby poprawić wydajność i niezawodność narzędzi utworzonych w ten sposób.

Narzędzia agentowe dotyczą głównie **schematów** i **funkcji zwrotnych**, ale najważniejsze pytania brzmią: **czy narzędzie jest naprawdę potrzebne** i **czy agent będzie wiedział, jak go używać**.

Można powiedzieć, że **modele są wystarczająco inteligentne, by bezpośrednio korzystać z API**. To prawda w wielu przypadkach, zwłaszcza gdy aplikacja lub usługa należy do podstawowej wiedzy modelu albo jej dokumentacja jest bezbłędna. W praktyce zależy nam jednak na niezawodności, elastyczności i wydajności. Nie zawsze jest to oczywiste, bo wiele API jest źle zaprojektowanych, a agenci często uzyskują **fałszywie pozytywne wyniki** i sądzą, że działanie się powiodło, choć tak nie było.

Przykładem może być usługa muzyczna, która zwraca **status 200** dla interakcji z odtwarzaczem [niezależnie od tego, czy działanie się powiodło](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/false-success-tool).

![Graf przepływu. Agent prosi API usługi muzycznej o odtworzenie utworu. API przekazuje polecenie odtwarzaczowi, który nie wykonuje działania. API mimo to zwraca status 200, co jest fałszywie pozytywnym wynikiem. Agent sprawdza więc stan odtwarzacza, aby potwierdzić działanie. Żądania i odpowiedzi są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-9/frame.html)

Niektóre działania trzeba też wykonać w określonej kolejności albo nie da się ich przeprowadzić bez zachowania konkretnego przebiegu. Na przykład Stripe nie pozwala zmienić ceny istniejącego produktu. Jedynym sposobem jest utworzenie nowej ceny z tymi samymi ustawieniami i dezaktywowanie starej. Stripe jest dobrze znany LLM-om, ale gdy agenci napotykają nieznane im wewnętrzne API, po prostu sobie nie radzą.

![Diagram przepływu. Agent musi zmienić cenę produktu w Stripe. Bezpośrednia zmiana istniejącej ceny jest niedozwolona. Wymagany przepływ składa się z dwóch działań: utworzenia nowej ceny z tymi samymi ustawieniami, a następnie dezaktywowania starej ceny. Agent musi znać ten przebieg. Zna go w przypadku Stripe, ale nie w przypadku nieznanego mu wewnętrznego API.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-10/frame.html)

Mając to na uwadze, musimy samodzielnie projektować **natywne narzędzia**. Jeśli agent ma autonomicznie tworzyć narzędzia, musimy przekazać mu wskazówki dotyczące naszych preferencji i rekomendacji oraz zapewnić możliwość oceny i testowania **nazw, opisów, schematów i formatu wyników** tych narzędzi.

Nasz agent może więc mieć cztery natywne narzędzia:

- **core.exec:** wykonuje kod w piaskownicy w przestrzeni roboczej
- **web.search:** przeszukuje sieć, ale tylko w zaufanych źródłach
- **web.fetch:** pobiera treść spod adresu URL
- **channel.send:** wysyła wiadomość do użytkownika

Dodatkowo środowisko agenta będzie korzystać z **journal.append** i **events.add**, dzięki czemu agent będzie wyraźnie widział, co się dzieje, ale fizycznie nie będzie mógł ich modyfikować.

![Folder przestrzeni roboczej zawiera sześć elementów w dwóch grupach. Odczyt i zapis: documents/, skills/ i schedule.yaml. Tylko do odczytu: events/ (zapisuje środowisko agenta), journal.jsonl (środowisko agenta + journal.append) i config.yaml (tylko użytkownik). Wyróżniono grupę tylko do odczytu.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-11/frame.html)

W przypadku tego agenta nie wystarczy zadbać o narzędzia, ponieważ agent musi też wiedzieć, jak poruszać się po przestrzeni roboczej, kształtować dokumenty, rozumieć zależności między nimi itd. Możemy więc rozważyć przygotowanie początkowego **przewodnika** w postaci **Dokumentów** i **Umiejętności** (natywnych prymitywów). Dzięki temu otrzymamy **rozszerzone narzędzia**, które nie są sztywne, ponieważ agent będzie mógł je modyfikować.

![Diagram przepływu z przykładową umiejętnością. Przewodnik udostępnia agentowi umiejętność „weekly-digest”, zaznaczoną na czerwono. Umiejętność korzysta z trzech natywnych narzędzi: web.search, core.exec i channel.send, aby przygotować cotygodniowy raport na podstawie szablonu użytkownika. Agent może modyfikować umiejętność i jej szablon. Nazwa umiejętności, szablon i ścieżki plików są przykładami.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-12/frame.html)

Jeśli wszystko to dobrze przygotujemy, nasz agent będzie mógł **uczyć się i rozwijać**. Harmonogramy, takie jak **„dreaming”**, mogą na przykład zlecać mu porządkowanie dokumentów i harmonogramów.

Warto więc wyraźnie dostrzec, jak możemy **równoważyć logikę deterministyczną i niedeterministyczną**, aby tworzyć rozwiązania wyspecjalizowane w określonych zastosowaniach i użyteczniejsze od ogólnych agentów. Aby to osiągnąć, musimy najpierw uwzględnić wszystko, co wiemy o modelach językowych i agentach AI, a następnie wykorzystać nasze doświadczenie w tworzeniu oprogramowania do opracowania potrzebnego rozwiązania.

## Zarządzanie kontekstem

Docieramy tu do punktu, w którym nasze środowisko agenta może dać nam przewagę nad ogólnymi agentami — nie dlatego, że uczymy model, co ma robić, lecz dlatego, że **dynamicznie pokazujemy mu, co jest dostępne**.

Wiemy, że **współczynnik trafień w pamięć podręczną** jest jednym z najważniejszych wskaźników dla agentów. Powinniśmy o nim pamiętać zarówno podczas projektowania agenta od podstaw, jak i rozszerzania istniejącego agenta za pomocą hooków lub rozszerzeń. W naszym przypadku chcemy informować agenta nie tylko o jego celu, ale także **o bieżącym stanie jego środowiska**, w tym o zdarzeniach, harmonogramach i innych aktualnie działających instancjach. Oznacza to, że nie możemy po prostu „ustawić AGENTS.md”, ponieważ musimy wstrzykiwać kontekst w trakcie tury!

![Pionowy stos bloków pokazuje kontekst własnego agenta, od góry do dołu. Ramka „Prompt systemowy” zawiera trzy fragmenty: „Rola” (spersonalizowana), „Możliwości” (spersonalizowane) i „Notatki” (agent może je modyfikować), a przerywana linia prowadzi od „Agenta” do „Notatek”. Dalej znajdują się „Narzędzia” (exec · search · fetch), początkowa „Wiadomość dewelopera” (bieżący stan), „Wiadomość użytkownika” (zaplanowana przez środowisko agenta), „Wywołanie narzędzia” i „Wynik narzędzia”. Nawias oznacza te bloki jako „buforowane”. Poniżej znajduje się wyróżniona wiadomość dewelopera w trakcie tury („co się zmieniło”), zawierająca „Zdarzenia”, „Harmonogramy” i „Działające instancje”, ze strzałką od „Środowiska agenta”. Wyszarzone „Wywołanie narzędzia” na dole pokazuje, że tura jest kontynuowana.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-13/frame.html)

Nie ma uniwersalnych odpowiedzi na pytanie o zarządzanie kontekstem w agentach własnych, ale możemy kierować się kilkoma zasadami i iteracyjnie rozwijać system, aż spełni nasze oczekiwania. W naszym przypadku możemy rozważyć takie elementy, jak:

- **System Prompt:** informuje agenta o jego roli i możliwościach, dzięki czemu nie poświęca zbyt wiele czasu na eksplorację. Może też zawierać notatkę, którą agent będzie mógł utrzymywać między sesjami i ulepszać w drodze autorefleksji.
- **Tools:** w trybie kodu agent otrzymuje schematy tylko najważniejszych narzędzi. W naszym przypadku są to **exec, search i fetch**, ponieważ wszystkie pozostałe możliwości są kontrolowane przez kod napisany przez agenta.
- **Początkowa Developer Message:** tuż przed pierwszą wiadomością możemy dodać bieżący stan systemu, aby agent od razu wiedział, co się dzieje i czy przed rozpoczęciem zadania powinien coś uwzględnić.
- **Wiadomości użytkownika:** ten agent będzie działał autonomicznie, więc wiadomość użytkownika często będzie zaplanowaną wiadomością wysyłaną mu przez środowisko. Agent musi o tym wiedzieć, ponieważ **nie będzie mógł zadawać pytań**. Jedynym sposobem kontaktu z użytkownikiem jest **channel.send** (chyba że skonfigurujemy to inaczej).
- **Śród-turę Developer Message:** środowisko się zmienia, dlatego w trakcie tury agent powinien otrzymywać wyłącznie informacje o **tym, co się zmieniło**.
- **Tool Hooks:** ze względu na znaczenie prawidłowej organizacji i samodzielnego zarządzania agent może otrzymywać **dobrze uogólnione, ukierunkowujące jego działanie** wiadomości przed wywołaniem narzędzia i po nim.

Zaleca się rozpocząć prosto i zbudować środowisko, w którym agenci będą mogli osiągnąć najlepszą postać przez samodzielną praktykę. Naszą rolą jest nadzorowanie tego procesu, ponieważ modele mogą skłaniać się ku złożonej logice, a my szukamy **najprostszego możliwego rozwiązania**.

W kolejnych lekcjach omówimy tworzenie własnych ewaluacji, aby agenci nie wprowadzali zmian na ślepo, bez wyraźnej informacji zwrotnej o wydajności systemu.

## Przepływy pracy i zadania długoterminowe

Budowa dobrego agenta działającego w tle to świetne ćwiczenie z tworzenia niezawodnych systemów obejmujących logikę niedeterministyczną. Dodatkowym wyzwaniem jest utrzymanie tych systemów w lekkiej postaci dzięki prymitywom, które AI może łączyć, wykraczając poza scenariusze, dla których zaprojektowano agenta.

Nie chodzi tu wyłącznie o inżynierię i architekturę, lecz także o znalezienie użytecznych zastosowań, które nie zawsze są oczywiste. W przypadku naszego agenta możemy używać **Zdarzeń**, by informować go o poziomie naszej aktywności, o tym, czy otworzyliśmy jego ostatni e-mail albo przeczytaliśmy wiadomość. Na tej podstawie system może dostosować zachowanie lub zatrzymać niektóre działania.

![Przepływ od lewej do prawej. Środowisko agenta dodaje Zdarzenia do strumienia. Przykładowe zdarzenia to „activity: zajęty”, „email: otwarty” i „message: przeczytana”. Czerwona linia opisana „search, filter” prowadzi ze strumienia do agenta. Agent zapisuje spostrzeżenia w Dokumencie, odpowiada przez Kanał albo tworzy Harmonogram. Przerywana linia opisana „wakes up” prowadzi z Harmonogramu z powrotem do agenta.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-15/frame.html)

Innym przykładem może być harmonogram skanujący naszą aktywność w X, Raindrop lub dowolnej innej aplikacji, która może dostarczyć informacji o naszych ostatnich zainteresowaniach. W takim przypadku musimy znaleźć sposób, by agent **pamiętał poprzednie uruchomienia** i mógł obserwować oraz analizować swoje ustalenia. Najbardziej naturalnym rozwiązaniem byłoby polecenie agentowi filtrowania wpisów w **Dzienniku** i zapisywania spostrzeżeń w ustrukturyzowany sposób.

![Pętla. Harmonogram wybudza agenta. Uruchomienie agenta skanuje aktywność w X i Raindrop. Agent zapisuje działania w Dzienniku i zapisuje spostrzeżenia w Dokumentach. Razem Dziennik i Dokumenty tworzą pamięć między uruchomieniami. Podczas analizy agent odczytuje tę pamięć i ustawia następne wybudzenie w Harmonogramie.](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s02e02/artifacts/lesson/figure-14/frame.html)

Eksperymentując z podobnymi scenariuszami, wiele się nauczymy o działaniu agentów, podejmowaniu decyzji przez modele, ich trudnościach oraz ograniczeniach naszego środowiska. Możemy na przykład napotkać problemy z równoległymi aktualizacjami, które mogą nawet prowadzić do utraty danych, dlatego trzeba wprowadzić kolejki lub wersjonowanie. Niektóre zadania mogą wymagać uwzględnienia logiki takiej jak w [pi-durable](https://github.com/earendil-works/pi/tree/main/packages/durable), aby agent mógł łatwo odzyskać działanie po niemal każdej awarii lub wstrzymać wykonanie na dowolnie długo, albo koncepcji z [pi-until](https://github.com/joelhooks/pi-until), aby skonfigurować obserwatory i cykliczne wybudzenia.

## Wnioski

Przykład z tej lekcji powinien jasno pokazać, dlaczego możemy chcieć budować własne środowisko agenta albo nauczyć się rozszerzać istniejące środowiska, by dostosować je do konkretnych zadań.

Nawet jeśli doprowadzi nas to do porzucenia pracy nad agentem albo nowe modele czy środowiska szybko go zastąpią, zdobędziemy doświadczenie, które może pomóc nam budować jeszcze bardziej zaawansowane systemy z użyciem przyszłych modeli.
