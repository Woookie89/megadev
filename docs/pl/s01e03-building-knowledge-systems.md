# S01E03 · Tworzenie systemów wiedzy

Bazy wiedzy nie są niczym nowym, ale ich znaczenie i rola zmieniają się, gdy **agenci stają się ich głównymi użytkownikami** (i opiekunami). To skłania nas do ponownego przemyślenia wszystkiego, co wiemy o ich tworzeniu — od celu, przez narzędzia i strukturę, po zarządzanie.

Zaczynajmy!

## Plan

- Formaty: Markdown, HTML, mdx i svx, komponenty, poziomy szczegółowości, artefakty i umiejętności
- Bazy stawiające agentów na pierwszym miejscu: agenci a ludzie, pomosty do istniejących narzędzi, LLM tworzy i utrzymuje bazę
- Wyszukiwanie: grep i ripgrep, wyszukiwanie semantyczne, trafność a podobieństwo, modele decyzyjne, wyszukiwanie hybrydowe
- Docieranie do kontekstu: kontekst globalny, kontekst projektu, metadane, struktura wybierana przez agenta
- Samodzielne zarządzanie: jedna skrzynka odbiorcza, tablice, szablony, harmonogramy, zdarzenia

Kiedyś narzędzia takie jak Google Drive czy Notion w zupełności wystarczały, bo miały świetne edytory i funkcje współpracy — i **w wielu przypadkach nadal tak jest**. Jednak coraz więcej osób pracuje głównie z agentami, a narzędzia, których nie projektowano z myślą o AI, utrudniają agentom łatwy dostęp zarówno do **odczytu**, jak i **zapisu**. Często niemożliwe jest nawet coś tak prostego jak **dostęp do obrazu**.

![Agent AI łączy się z dokumentami w Google Drive i Notion. Pod dokumentami znajdują się dwie osobne kolumny. Kolumna Odczyt pokazuje, że agent często nie może uzyskać dostępu do obrazów i innych szczegółów. Ta część jest zaznaczona na czerwono. Kolumna Zapis pokazuje, że agent ma trudności z edytowaniem dokumentów.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-1/frame.html)

## Pliki tekstowe i platformy chmurowe

Ponieważ natywnym „językiem” LLM-ów jest tekst, Markdown i HTML zyskały ogromną popularność mimo swoich ograniczeń. Agenci mogą łatwo uzyskiwać do nich dostęp i nimi zarządzać, a Markdown można łatwo konwertować do innych formatów, a nawet do stron internetowych, korzystając z [Astro](https://astro.build/) lub [Next](https://nextjs.org/). W praktyce często potrzebujemy jednak **zarządzania uprawnieniami**, **współpracy w czasie rzeczywistym** i wielu funkcji dostępnych od lat w narzędziach takich jak Notion czy Google Docs.

![Pionowy diagram. U góry LLM odczytuje i zapisuje tekst. Linia prowadzi w dół do ramki Pliki tekstowe, w której znajdują się przykładowy plik Markdown i przykładowy plik HTML z tą samą notatką o wdrożeniu. Z ramki wychodzą dwie linie do kolejnych ramek. Ramka Agenci wymienia czynności, które agenci wykonują łatwo: uzyskiwanie dostępu do dowolnego pliku i jego edycja, przeszukiwanie plików, przechodzenie między plikami oraz konwertowanie Markdown do stron internetowych. Ramka Ludzie jest zaznaczona na czerwono i wymienia trudności ludzi: HTML jest trudny do czytania, współpraca w czasie rzeczywistym nie jest domyślnie dostępna, a udostępnianie i uprawnienia również nie są domyślne. Zawartość plików jest przykładowa.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-2/frame.html)

Oczywiście istnieją narzędzia, które próbują połączyć zalety obu podejść. Niektóre to dotychczasowe narzędzia, które **przekształcają się w rozwiązania natywne dla AI**, choć agenci nadal nie mogą korzystać ze wszystkich ich funkcji. Inne to nowe narzędzia **natywne dla AI**, którym brakuje ważnych funkcji. Wybór nie jest łatwy.

Rozważmy następujące kwestie:

- Agenci zyskują popularność także wśród osób nietechnicznych
- Wiedza dociera do ludzi za pośrednictwem agenta, a nie bezpośrednio
- Dokumentami zarządzają agenci i to oni z nich korzystają; ludzie robią to rzadko
- Agenci mogą szybko przetwarzać dużą liczbę dokumentów
- W wielu przypadkach nie potrzebujemy dokumentów, tylko wyniku

Te stwierdzenia **nie są dziś prawdziwe w większości organizacji**, ale sytuacja szybko się zmienia. Możemy więc chcieć **bazy wiedzy stworzonej dla agentów, a nie dla ludzi**. Na razie przydatne mogą być różne pomosty, ale nie powinny stanowić rdzenia całego systemu.

![Diagram przepływu. Po lewej stronie znajduje się ramka Rdzeń. Jest w niej Agent, który odczytuje i zapisuje bazę wiedzy z plikami Markdown i HTML. Baza wiedzy jest zaznaczona na czerwono. Po prawej znajduje się ramka Pomosty dla ludzi. Zawiera Google Drive i Notion, z którymi baza wiedzy łączy się za pośrednictwem integracji. Nazwy plików widoczne po kliknięciu są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-3/frame.html)

Kilka miesięcy temu Andrej Karpathy [opisał swoją osobistą bazę wiedzy](https://x.com/karpathy/status/2039805659525644595). Niezależnie od przeznaczenia naszej wiki możemy wyciągnąć z tego kilka wniosków:

- Wiki tworzy LLM, a nie człowiek.
- Surowe treści są dla AI, a dobrze zaprezentowane — dla nas.
- Edytory Markdown (takie jak [Obsidian](https://obsidian.md/)) nadal się przydają, ale głównie do **czytania** treści.
- W przypadku małych, osobistych baz wiedzy [nie potrzeba zaawansowanych wyszukiwarek](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/summary-index).
- LLM może pomagać nie tylko w **tworzeniu**, ale przede wszystkim w **utrzymywaniu** bazy. To jedna z największych zmian od czasów „przed AI”; konserwacja pomaga utrzymać bazę wiedzy w czystości i aktualności.

![Diagram osobistej wiki Karpathy'ego, od lewej do prawej: raw/ (źródła zapisane przez niego), następnie LLM, potem wiki/ (artykuły Markdown, podsumowania, pliki indeksu i odnośniki zwrotne), a na końcu Ty, czytający w Obsidianie. Ciągłe strzałki prowadzą od raw/ do LLM, od LLM do wiki/ i od wiki/ do Ciebie. Wszystkie wskazują tylko jeden kierunek. Na diagramie umieszczono pięć ponumerowanych lekcji. 1: LLM tworzy wiki, nie Ty; nigdy nie zapisujesz niczego w wiki/. 2: surowe treści są dla AI, a dobrze zaprezentowane — dla Ciebie. 3: Obsidian służy głównie do czytania. 4: przy tej skali nie potrzeba zaawansowanej wyszukiwarki, bo LLM korzysta z własnych plików indeksu i podsumowań (około 100 artykułów, 400 tys. słów). 5, na czerwono: przerywana pętla prowadzi od LLM z powrotem do wiki/. Opisano ją jako kontrolę kondycji: poprawianie niespójności, uzupełnianie brakujących danych i sugerowanie nowych artykułów. To największa zmiana od czasów przed AI.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-4/frame.html)

## Poza Markdownem

Markdown i HTML to nie jedyne formaty, których możemy używać w bazach wiedzy. Są też `mdx` i `svx`, które pozwalają umieszczać komponenty w plikach Markdown. Dzięki temu łączymy **czytelność plików** z **interaktywnością**, a w zależności od potrzeb także ze **stanem**!

Poniżej przykład pliku `.svx`, którego źródło pozostaje proste, a wyrenderowana wersja zawiera działającą listę kontrolną. Ponieważ można tu używać [komponentów](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/guided-components), można je ponownie wykorzystywać w wielu plikach.

![Dwa panele obok siebie. Po lewej „Plik”: zwykły kod źródłowy przykładowej notatki deploy-checklist.svx z frontmatter (tytuł i cztery kroki), nagłówkiem, jednym zdaniem i wierszem komponentu \<Checklist items={steps} />, obramowanym na czerwono. Mały tekst pod panelem głosi „mdx lub svx”. Czerwona strzałka z etykietą „renderuje się jako” prowadzi od wiersza komponentu do prawego panelu „To, co widzisz”: ta sama wyrenderowana notatka z nagłówkiem, zdaniem i działającą listą kontrolną obramowaną na czerwono. Kompilacja i Uruchom testy są zaznaczone, Wdróż i Zweryfikuj — nie, a licznik pokazuje „2 z 4 ukończone”.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-5/frame.html)

Jest to szczególnie przydatne w przypadku złożonych zagadnień, które najpierw trzeba przedstawić z szerokiej perspektywy, z możliwością zagłębienia się w szczegóły bez przewijania całej ściany tekstu.

![Interaktywny przewodnik po schemacie bazy wiedzy tworzonej przez LLM. U góry pasek z czterema etapami: źródła, dokumenty, fragmenty i łącza. Poniżej znajdują się cztery jednakowe kolumny tabel z listą pól i typów. Etykieta „do decyzji” oznacza każdą nierozstrzygniętą kwestię. Karta na całą szerokość u dołu objaśnia wybraną tabelę lub pole. Początkowo wybrane jest documents.updated\_by. Przykładowe wartości na karcie, takie jak adresy URL, UUID, znaczniki czasu i liczba wierszy, mają charakter ilustracyjny.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-6/frame.html)

Agenci potrafią dziś całkiem sprawnie korzystać z `.svx`, ale warto poświęcić trochę czasu na przygotowanie konfiguracji, która jeszcze bardziej im to ułatwi. Przykład znajdziesz w [repozytorium skills](https://github.com/overment/skills/tree/main/skills/explainer), gdzie umiejętność `explainer` to nie tylko prompt. Zawiera również szablony i logikę ułatwiające agentowi przygotowywanie **spójnych** wizualizacji. Taka umiejętność działa najlepiej z **najnowocześniejszymi modelami (SOTA)**.

Umiejętność `explainer` może być **inspiracją** do tworzenia umiejętności w różnych wyspecjalizowanych obszarach: objaśniania zgłoszeń, raportów aktywności, ogólnych decyzji architektonicznych i innych — dostosowanych do projektów, nad którymi pracujemy. Wniosek jest taki, że **artefakty i umiejętności mogą stać się częścią naszej bazy wiedzy** i powinny **ukierunkowywać model** na wyniki zgodne z naszymi potrzebami, nie ograniczając jego możliwości.

![Diagram przepływu. Ramka Baza wiedzy zawiera dwa pola: Struktura, treść (Markdown, HTML, .svx) oraz Szablony, wskazówki (umiejętności, artefakty). Struktura i treść dostarczają modelowi treści. Szablony i wskazówki ukierunkowują model — ten element zaznaczono na czerwono. Model jest ukierunkowany, ale nieograniczony, i dostarcza spersonalizowane, pożądane i spójne wyniki.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-7/frame.html)

## Cel baz wiedzy

Systemy wiedzy, takie jak wewnętrzne wiki, tworzono w wielu celach: **organizowania dokumentów**, **wdrażania nowych pracowników** czy **usprawniania komunikacji** i **procesów**. Ich głównymi użytkownikami byli ludzie, więc mogliśmy zakładać, że przynajmniej ogólnie rozumieją szerszy kontekst, co pomagało im korzystać z systemu.

W przypadku agentów wygląda to nieco inaczej: modele potrafią czytać i rozumieć dokumenty szybciej niż ludzie, ale sposób, w jaki uzyskują do nich dostęp i je postrzegają, może łatwo prowadzić do błędów mimo ich inteligencji. Rozważmy następujący przykład:

1. Agent otrzymuje pytanie o **proces wdrażania**
2. Przeszukuje bazę wiedzy i trafia na kilka notatek, które **wyglądają na kompletne**
3. Agent **nie dociera jednak do notatki**, która wyjaśnia kontekst potrzebny do zrozumienia szerszej perspektywy
4. W rezultacie otrzymujemy odpowiedź będącą **halucynacją** albo **źle zaimplementowaną funkcję**

![Pytanie „Jak wdrażamy?” trafia do agenta ze strzałką opisaną „wyszukuje”. Czerwona strzałka z etykietą „czyta” prowadzi od agenta do notatki „Lista kontrolna wdrożenia”, która ma czerwoną ramkę i zawiera wiersze „uruchom testy · oznacz wydanie” oraz „powiadom #eng · monitoruj”. Zwykłe linie łączą ją z notatką „Proces wydania” po lewej i „Dyżury” po prawej. Wszystkie notatki znajdują się w jednej ramce. Poniżej przerywanej linii i etykiety „nie dotarto” są trzy przygaszone notatki z przerywanymi obramowaniami: „Dlaczego wdrażamy w ten sposób”, „Architektura systemu” i „Zasady wycofywania zmian”. Nie prowadzi do nich żadna linia.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-8/frame.html)

Takie sytuacje zdarzają się bardzo często i nie ma rozwiązania, które **gwarantuje** sukces. Jak wspominałem w poprzednich lekcjach, **praca z LLM-ami nie polega na pewności, lecz na zwiększaniu szans na uzyskanie oczekiwanych rezultatów**.

Najpierw musimy zrozumieć, jak agent **dociera** do kontekstu. Korzysta w tym celu z narzędzi wyszukiwania używanych w **logice agentowej**, więc proces wyszukiwania może obejmować wiele tur. Przyjrzyjmy się temu:

**bash / grep / ripgrep:** agenci poruszają się po plikach, pisząc skrypty i/lub polecenia, które dopasowują słowa kluczowe do dostępnego kontekstu. Nawet jeśli za pierwszym razem nie znajdą wszystkich istotnych plików, mogą dalej **eksplorować**, aż model uzna, że ma dość informacji lub że żadnych nie ma. Ten rodzaj wyszukiwania jest bardzo skuteczny w przypadku samych plików tekstowych i baz kodu, ale [niemal bezużyteczny dla obrazów, dokumentów PDF](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/image-sidecar-notes) i podobnych materiałów.

![Diagram przepływu. Agent uruchamia polecenia bash, grep lub ripgrep, by przeszukać bazę wiedzy. Polecenia dobrze sprawdzają się w przypadku plików tekstowych i kodu, a niemal bezużyteczne są dla obrazów i plików PDF. Przerywana czerwona strzałka prowadzi od poleceń z powrotem do agenta i zawiera tekst „kontynuuj eksplorację”. Polecenia i nazwy plików w szczegółach są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-9/frame.html)

**Wyszukiwanie semantyczne:** istnieją **modele embeddingowe** wyspecjalizowane w **opisywaniu znaczenia** treści za pomocą listy liczb (wektora). Możemy dzięki temu indeksować istniejące dokumenty i uzyskiwać ich embeddingi. Gdy chcemy coś wyszukać, przekazujemy zapytanie do modelu embeddingowego, by **uzyskać jego znaczenie**, a następnie **porównać wektory** i ustalić, **które dokumenty są podobne do zapytania pod względem znaczenia**.

![Diagram przepływu. Dokumenty i zapytanie trafiają do tego samego modelu embeddingowego. Model przekształca dokumenty w wektory dokumentów, a zapytanie — w wektor zapytania. Etap porównania, zaznaczony na czerwono, porównuje wektory, aby znaleźć dokumenty podobne do zapytania znaczeniowo. Tytuły dokumentów, zapytanie, liczby wektorów i wyniki podobieństwa są przykładowymi wartościami.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-10/frame.html)

Wyszukiwanie semantyczne zwiększa szansę znalezienia dokumentów, których wyszukiwanie oparte na wzorcach **nie dopasuje za pomocą wyrażeń regularnych**, ale dodaje też złożoność, ponieważ wymaga indeksowania.

Ponadto modele embeddingowe mają **limity kontekstu**, więc długie dokumenty trzeba dzielić na fragmenty. Mają też **datę odcięcia wiedzy**, więc mogą **inaczej rozumieć niektóre pojęcia** albo po prostu ich nie znać. Z kolei embeddingi multimodalne obsługują **wyszukiwanie obrazów**.

Przede wszystkim musimy jednak zrozumieć, że embeddingi pozwalają znajdować treści „podobne znaczeniowo”, co niekoniecznie oznacza, że są „trafne”.

![Przykładowe zapytanie „Jak wdrożyć na produkcję?” i cztery przykładowe dokumenty uszeregowane według podobieństwa znaczeniowego. Cieniowane paski pokazują, jak podobny do zapytania jest każdy dokument. Długości pasków są poglądowe, a nie oparte na zmierzonych wynikach. Najbardziej podobny dokument „Wdrożenia: historia naszych narzędzi” jest zaznaczony na czerwono, ponieważ nie jest trafny. Runbook wdrożenia na produkcję jest trafny i zajmuje drugie miejsce. Notatka o przeprojektowaniu panelu wdrożeń jest podobna, ale nietrafna. Notatka mówiąca, że serwery produkcyjne wymagają dostępu przez VPN, jest trafna, lecz ma najniższy wynik podobieństwa.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-11/frame.html)

**Modele decyzyjne:** szybkie modele decyzyjne mogą być również przydatne do wyszukiwania i poruszania się po plikach w bazie kodu lub systemie plików. Jednym z przykładów jest [jevgrep](https://github.com/dzhng/jevgrep), który w niektórych przypadkach wyraźnie obniża koszty, ponieważ [agent spędza mniej czasu na eksplorowaniu bazy kodu](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/file-picker) i/lub bazy wiedzy.

![Diagram przepływu. Zadanie trafia do Jev — szybkiego modelu decyzyjnego. Jev wskazuje trzy elementy w bazie kodu lub bazie wiedzy: folder deploy/, plik rollback.md i funkcję release(). Dwa pozostałe elementy, onboarding/ i clean(), nie są wskazane. Zadanie i wszystkie nazwy są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-12/frame.html)

**Wyszukiwanie hybrydowe:** na koniec mamy [wyszukiwanie hybrydowe](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/hybrid-search). To najbardziej złożone podejście, ale często daje najlepsze wyniki, ponieważ dokumenty niedopasowane przez **wyszukiwanie oparte na wzorcach** mogą zostać znalezione przez **wyszukiwanie podobieństwa**.

Oprócz narzędzi wyszukiwania powinniśmy rozważyć dodatkowe rodzaje kontekstu, które **[pomagają agentom dotrzeć do potrzebnej wiedzy](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/unreached-notes)**. Należą do nich:

- **kontekst globalny:** pliki wykraczające poza zakres danego projektu, zawierające informacje o bieżącym systemie, środowisku, istniejących projektach, zainstalowanych narzędziach i ogólnych zasadach
- **kontekst projektu:** pliki opisujące projekt, ale także **jego wizję**, **mapę funkcji**, **przewodnik po stylu** czy nawet **aspekty biznesowe** — innymi słowy, informacje, które mogą pomóc agentowi zrozumieć szeroki kontekst
- **metadane:** kategorie, tagi, źródła i inne metadane mogą również zwiększyć szansę na uzyskanie właściwych wyników. Warto przyjrzeć się [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md), który nadal jest zwykłym Markdownem z YAML frontmatter, ale informuje też agentów, **skąd pochodzi notatka**, **na ile można jej ufać** i **czy jest nadal aktualna**.

![Trzy warstwy plików bazy wiedzy ułożone jedna na drugiej. U góry kontekst globalny: system, środowisko, istniejące projekty, zainstalowane narzędzia i ogólne zasady. Pośrodku kontekst projektu: wizja, mapa funkcji, przewodnik po stylu i aspekty biznesowe. Na dole notatki w postaci pól. Każde pole zawiera treść i metadane notatki: tagi i źródło. Nazwy notatek, treści i metadane są przykładowymi wartościami. Linie łączą deploy.md z env-setup.md i rollback.md. Czerwona strzałka z boku wskazuje w górę — od konkretnej treści ku szerszej perspektywie.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-13/frame.html)

Możemy teraz zacząć zastanawiać się nad **strukturą** folderów, kategorii, tagów i szablonów, a następnie odruchowo próbować zbudować ją samodzielnie, by „zachować kontrolę”. Prawda jest jednak taka, że **za zarządzanie dokumentami będą odpowiadać agenci**, więc warto **pozwolić im** samodzielnie ustalić strukturę i w razie potrzeby ukierunkować ten proces tak, by uwzględnić nasze szczególne potrzeby. Możemy nawet zdecydować się na narzędzia, których jeszcze nie znamy, bo AI z łatwością może nas z nimi zapoznać. Dobrym przykładem może być [neo4j](https://neo4j.com/).

Nie ma jednej odpowiedzi na pytanie, **jak stworzyć idealną bazę wiedzy**. To jednak dobrze znany problem, a **modelom znanych jest wiele podejść** — wystarczy zapytać o popularne strategie, by otrzymać taką listę:

![Transkrypcja z dwiema ramkami. Ramka Użytkownik zawiera pytanie: „Jakie znane, wyraziste metody służą tworzeniu i utrzymywaniu bazy wiedzy?”. Ramka AI jest zaznaczona na czerwono. Zawiera odpowiedź — listę 36 metod w trzech kolumnach: Zettelkasten, Folgezettel, notatki wiecznie zielone, mapy treści (LYT), cyfrowy ogród, PARA, CODE (Budowanie drugiego mózgu), stopniowe podsumowywanie, Johnny.Decimal, GTD: katalogowanie materiałów referencyjnych i cotygodniowy przegląd, najpierw notatki dzienne, księga cytatów, powtórki interwałowe, czytanie przyrostowe, Diátaxis, każda strona to strona pierwsza, tworzenie treści zorientowanych na tematy (DITA), BLUF (odwrócona piramida), sortowanie kart, testowanie drzewa, kontrolowane słowniki, taksonomie SKOS, dokumentacja jako kod, najpierw podręcznik, KCS (Knowledge-Centered Service), ADR-y (Architecture Decision Records), RFC-y (dokumenty projektowe), jedno źródło prawdy, właściciele stron z datami przeglądu, audyty ROT, archiwizuj, nie usuwaj, zasada skauta (pielęgnowanie wiki), analityka wyszukiwania, automatyczne sprawdzanie linków i nieaktualności, przetwarzanie skrzynki odbiorczej, gotowość na AI (llms.txt).](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-14/frame.html)

Ponieważ modele **myślą podczas generowania tokenów**, a **zawartość kontekstu wpływa na to, co zostanie wygenerowane**, musimy zadbać, by ta wiedza pojawiła się w rozmowie — przez uwzględnienie jej w naszych wiadomościach lub poproszenie modelu, by ją przedstawił.

Omówienie tych technik baz wiedzy może pomóc nam lepiej je zrozumieć, ale naszym celem nie jest **samodzielne budowanie systemu**, tylko **kształtowanie środowiska, w którym agenci tworzą bazę wiedzy**.

Przykładem może być [umiejętność knowledge](https://github.com/overment/skills/tree/main/skills/knowledge), która ma na celu uogólnione zbudowanie struktury bazy wiedzy:

1. **Określenie celu:** kilka pytań, które musimy sobie zadać w związku z bazą wiedzy.
2. **Zbudowanie kontekstu:** agent musi ustalić najbardziej użyteczne metody i ogólne zasady.
3. **Zainicjowanie struktury:** agent musi iterować nad początkową strukturą i relacjami między dokumentami, wypróbowując kilka różnych podejść.
4. **Zainicjowanie szablonów:** trzeba określić formę dokumentów — niekoniecznie jako listę sztywnych sekcji, lecz raczej jako ogólne wskazówki dotyczące wyboru najlepszej struktury dla danej notatki.
5. **Napisanie instrukcji:** na tym etapie agent musi utworzyć umiejętność pracy z bazą wiedzy.
6. **Przetestowanie:** korzystając z subagentów lub osobnych sesji, agent musi użyć umiejętności, sprawdzić, jak działa baza wiedzy, i wspólnie z nami ustalić, co można poprawić.

Warto zrozumieć, że **przy początkowych wymaganiach** powyższy proces może przebiegać **automatycznie**, aż LLM uzna, że jest gotowy. Co jeszcze ważniejsze, **proces może uruchamiać się automatycznie** w miarę rozrastania się bazy wiedzy, aby ulepszać jej strukturę. Modyfikowanie bazy zawierającej tysiące notatek nie będzie łatwe nawet dla AI, ale i tak może ona zrobić znacznie więcej, niż potrafilibyśmy bez niej.

![Sześć ponumerowanych etapów, od lewej do prawej: 1 Określ cel, 2 Zbuduj kontekst, 3 Zainicjuj strukturę, 4 Zainicjuj szablony, 5 Napisz instrukcje, 6 Przetestuj. Etapy łączą strzałki. Nad etapem 3 znajduje się czerwona, okrężna strzałka z napisem „wypróbuj kilka podejść”. Czerwona strzałka prowadzi od etapu 6 z powrotem do etapu 3 i ma napis „ulepszaj teraz i w miarę rozwoju bazy”. Przy etapach 1 i 6 widnieje „z nami”. Nawias nad etapami 2–6 ma opis „automatycznie, aż model uzna, że jest gotowy”.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-15/frame.html)

Podobne podejście można zastosować do niemal **wszystkiego**, co da się **w jakiś sposób** zweryfikować, dzięki czemu pętla informacji zwrotnej pozwala agentom ulepszać ich pracę. W tym przypadku nie ma **ścisłej** weryfikacji, choć modele świetnie oceniają jakość struktur. Potrzebują jednak **jasnej definicji tego, co oznacza „wystarczająco dobrze”**.

## Samodzielne zarządzanie

Przed ChatGPT bazy wiedzy mogły być częściowo utrzymywane przez **automatyzacje**, które pobierały dane z usług zewnętrznych lub archiwizowały stare notatki. Automatyzacje te mogły być dość zaawansowane, choć budowanie ich logiki było trudne. Teraz **nawet podłączenie bazy wiedzy do Claude Code** (lub dowolnego innego agenta) wydaje się magią. Problem polega na tym, że **działa to głównie reaktywnie**, więc musimy uczestniczyć w tych działaniach. Jako programiści wiemy jednak, że możemy sprawić, by rozwiązanie było **proaktywne**.

Mechanizmy umożliwiające działanie **trwałych agentów działających w tle** omówimy w drugim tygodniu MEGA, ale już teraz możemy rozważyć następujące możliwości:

**Jeden punkt wejścia:** każda informacja, którą chcemy dodać do bazy wiedzy, powinna trafiać do jednego punktu wejścia, na przykład do **skrzynki odbiorczej**. Stamtąd agenci mogą ją pobrać, uporządkować i niezawodnie [powiązać z istniejącą wiedzą](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/inbox-filing).

![Diagram przepływu. Cztery źródła (plik audio, tekst, zdarzenie i dowolna inna rzecz) trafiają do jednej skrzynki odbiorczej. Agent pobiera z niej każdy element. Korzysta ze swojej wiedzy o bazie, by uporządkować element i powiązać go z istniejącą wiedzą.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-16/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-16/frame.html)

**Harmonogramy:** [codzienne lub cotygodniowe porządki](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/knowledge-health-check) albo synchronizacja mogą pozytywnie wpłynąć na ogólną kondycję bazy wiedzy. Największym wyzwaniem jest jednak zbudowanie procedur, które będą **całkowicie autonomiczne**, ale zarazem **proste**, tak by ryzyko pogorszenia jakości bazy lub utraty informacji było minimalne.

![Diagram przepływu. Czerwona ramka Agenci działający w tle zawiera trzy procedury: Scal duplikaty (codziennie), Popraw strukturę (co tydzień) oraz Wzbogać dokumenty (co tydzień, uzupełnianie brakujących informacji). Każda procedura jest połączona z bazą wiedzy. Częstotliwości dzienne i tygodniowe są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-17/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-17/frame.html)

**Zdarzenia:** skoro bazy wiedzy tworzy się teraz głównie dla agentów, ograniczające jest traktowanie ludzi jako jedynego źródła informacji. Warto przyjrzeć się usługom i ich API, ponieważ mogą udostępniać webhooki, które można skonfigurować do **obserwowania** zmian. To samo możemy zrobić z **urządzeniami** i **lokalnymi demonami** działającymi na naszych komputerach Mac lub PC. Oto kilka przykładów:

- **PR-y:** każda scalona zmiana może być powodem do aktualizacji bazy wiedzy, a agenci mogą decydować, co warto zachować, a co nie.
- **Repozytoria:** nowe repozytorium na naszym koncie prawdopodobnie oznacza nowy projekt, o którym agent powinien wiedzieć. Należy automatycznie dodać go do kontekstu globalnego, aby te informacje były już dostępne, gdy agent zostanie o niego zapytany.
- **Zgłoszenia do pomocy technicznej:** baza wiedzy niekoniecznie jest właściwym miejscem na same zgłoszenia, ale można ją uzupełniać o ogólny stan produktu i najważniejsze tematy poruszane przez użytkowników.
- **Zgłoszenia:** podobnie jak zgłoszenia do pomocy technicznej, systemy obsługi zgłoszeń zawierają wiedzę, której **nie należy kopiować do bazy wiedzy**, ale którą można podsumować, aby wzbogacić szerszy kontekst projektu i jego funkcji.
- **Oznaczone e-maile i wiadomości:** agenci nie muszą czytać wszystkich naszych wiadomości, ale te automatycznie oznaczone można przekazywać agentowi, a ich treść może trafiać do bazy wiedzy jako dokumenty.
- **Do przeczytania później:** nowe zakładki lub wyróżnienia mogą automatycznie trafiać do bazy wiedzy i być **powiązane** z istniejącymi informacjami.

![Diagram przepływu. Jedna ramka zawiera sześć źródeł zdarzeń z usług i urządzeń: PR-y, repozytoria, zgłoszenia do pomocy technicznej, zgłoszenia, oznaczone e-maile i wiadomości oraz Do przeczytania później. Każde źródło wysyła zdarzenia do agenta. Agent decyduje, co zachować, i aktualizuje bazę wiedzy, zaznaczoną na czerwono.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-18/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-18/frame.html)

## Szerszy kontekst

Rozumienie agentów jest ograniczone do tego, co znajduje się w ich kontekście. Nawet jeśli mamy bazę wiedzy, agenci widzą **tylko to, co jest w niej obecnie**, przez co tracą z oczu **to, co było wcześniej i co dopiero nadejdzie**.

Może przychodzi nam na myśl repozytorium git, ale mówimy raczej o **liście zaimplementowanych, aktywnych, planowanych i zarchiwizowanych funkcji**. Dzięki temu agent trafiający do folderu **„tasks”** od razu zna nie tylko **wąski kontekst** swojego zadania, lecz także **szerszy kontekst**, który pomaga mu podejmować dobre decyzje.

![Ramka „tasks/” zawiera cztery kolumny: Zaimplementowane, Aktywne, Planowane i Zarchiwizowane. Każda kolumna wymienia przykładowe funkcje z lekcji: Zaimplementowane — „Skrzynka odbiorcza jako jedyny punkt wejścia” i „Eksport Markdowna do witryny”. Aktywne — „Indeksowanie wyszukiwania semantycznego”, zaznaczone na czerwono jako zadanie agenta. Planowane — „Wyszukiwanie hybrydowe” i „Codzienne porządki”. Zarchiwizowane — „Pomost synchronizujący z Notion”. Nazwy funkcji są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-19/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-19/frame.html)

Tablica Kanban może nie wydawać się odkryciem, ale [w praktyce jest niezwykle przydatna agentom](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/task-board-context), bo pomaga im **lepiej rozumieć kontekst**. Przydaje się nie tylko podczas implementacji, ale też wtedy, gdy agenci **opracowują wymagania i ADR-y** (Architecture Decision Records) lub inne szczegóły planowanych funkcji.

![Diagram przepływu. Po lewej ramka tasks/ zawiera cztery przykładowe funkcje, po jednej na każdy status: zaimplementowana „Konta użytkowników”, aktywna „Dodaj eksport danych”, planowana „Przechowywanie w S3” i zarchiwizowana „Import CSV”. Agent odczytuje aktywne zadanie, które należy do niego, a także planowaną funkcję. Czerwona ścieżka prowadzi od planowanej funkcji do agenta, a następnie od agenta do projektu eksportu, który wykorzystuje interfejs przechowywania. Nazwy funkcji są przykładowe.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-20/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-20/frame.html)

## Przykład

Załóżmy, że chcemy mieć osobistą bazę wiedzy przeznaczoną wyłącznie dla nas i naszego „osobistego agenta AGI”, który ma szeroki kontekst dotyczący nas, naszej pracy i życia prywatnego. Ma stać się naszym „drugim mózgiem” — koncepcją znaną od lat, ale teraz zarządzaną w całości przez agenta. Aby baza była użyteczna, musimy ustalić kilka zasad:

- **Dostępność:** agent musi mieć do niej łatwy dostęp niezależnie od tego, czy działa w chmurze, na komputerze Mac lub PC, czy na urządzeniu mobilnym (telefonie, zegarku lub innym urządzeniu ubieralnym). Dlatego baza wiedzy musi znajdować się zdalnie, a jeśli jest oparta na systemie plików, można ją synchronizować z naszym komputerem za pomocą narzędzi takich jak `mutagen sync`.
- **Źródło prawdy:** baza wiedzy powinna być źródłem prawdy dla własnych notatek, bez synchronizacji dwukierunkowej. Informacje dobrze utrzymywane w usługach zewnętrznych powinny w nich pozostać, ale [agent powinien wiedzieć, co można tam znaleźć](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/pointer-notes).
- **Samodoskonalenie:** baza powinna rozwijać się niemal autonomicznie, bez konieczności weryfikowania lub zmieniania czegokolwiek przez nas poprzez przeglądanie plików. Każda interakcja z nami musi odbywać się za pośrednictwem agenta lub agentów.
- **Prostota:** baza wiedzy może łatwo stać się odrębnym systemem, ale jak dotąd najlepszym podejściem jest **zachowanie prostoty** i poleganie wyłącznie na **rozwijających się możliwościach agentów i harnessów**, zamiast walczyć z ich słabościami.

W zależności od naszych potrzeb może pojawić się więcej zasad. Następnie możemy użyć wspomnianej wcześniej `knowledge skill`, by nadać bazie wiedzy początkową strukturę oraz utworzyć umiejętność zarządzania nią. Poniżej przedstawiono wygenerowaną umiejętność.

![Karta zatytułowana „personal-agi-kb skill” z trzema poziomami. U góry pole SKILL.md wymienia przeznaczenie bazy, zasady wraz z uzasadnieniem oraz wskazuje, którą notatkę otworzyć dla danego zadania. Cienkie linie prowadzą od niego do sześciu notatek referencyjnych: map, flow, intake, search, upkeep i structure log — każda z krótkim opisem roli. Na dole znajdują się dwa skrypty: check.ts sprawdza łącza i pola, a kb.ts obsługuje identyfikatory, zapytania i przebudowywane strony. Pionowa skala po prawej oznacza poziomy: zawsze czytane, otwierane w razie potrzeby oraz uruchamiane, a nie czytane. Pod kartą napis: osąd w notatkach, mechanika w skryptach.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-21/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-21/frame.html)

Poniżej znajduje się **ogólna struktura** „osobistej bazy wiedzy AGI”, obejmująca nasz **ogólny kontekst, zdobytą wiedzę** i informacje o naszej **aktywności zawodowej**. W praktyce struktura będzie dopracowywana w miarę napływu nowych informacji; chodzi nie tylko o jej rozbudowę, ale też o dostosowanie jej do naszych potrzeb.

![Pole oznaczone inbox po lewej ma strzałkę z etykietą „wszystko trafia tutaj”, która prowadzi do bazy wiedzy. Baza ma trzy ułożone warstwy. Kontekst zawiera system · narzędzia · projekty. Praca to jedyna czerwona warstwa. Zawiera pasek z czterema etapami: planowane → aktywne → przegląd → ukończone, z pustymi kartami na każdym etapie i tekstem plany · zadania · PR-y · decyzje pod paskiem. Wiedza opisuje to, czego się nauczono.](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-22/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e03/artifacts/lesson/figure-22/frame.html)

## Wnioski

Nawet w dobie AI bazy wiedzy „łatwo zacząć, trudno opanować”, ale nie powinno nas to powstrzymywać. Osobista baza wiedzy to jedna z najlepszych rzeczy, których możemy spróbować, bo pomoże nam odkrywać wiele możliwości, ale też napotkać problemy — nie tylko po stronie AI, lecz także w otaczającym je środowisku, ponieważ wiele aplikacji i usług wciąż nie jest gotowych na erę AI.
