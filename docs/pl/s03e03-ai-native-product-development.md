# S03E03 · Rozwój produktu w duchu AI-native

Agenci radzą sobie niemal natywnie zarówno z projektami „[greenfield](https://en.wikipedia.org/wiki/Greenfield_project)”, jak i „[brownfield](https://en.wikipedia.org/wiki/Brownfield_\(software_development\))”. Bez żadnej specjalnej konfiguracji potrafią odpowiadać na pytania i wprowadzać zmiany z pewnym stopniem trafności. Ale w obu przypadkach szybkie działanie z agentami przy jednoczesnym zapewnieniu jakości i zgodności z potrzebami biznesu wymaga dodatkowej pracy. Widzieliśmy już wiele powodów, dla których tak jest, więc teraz przyjrzymy się szczegółowo, jak nasz system może **leczyć sam siebie**, **odzyskiwać sprawność po problemach** i **z czasem stawać się lepszy**.

Dotychczasowe lekcje pokazały, jak możliwości agentów rozszerzają się dzięki narzędziom i wiedzy, dając im wyższy stopień autonomii. Pozwala im to zająć się rzeczami, o których normalnie musimy pamiętać albo o które jesteśmy nieustannie pytani. Problem polega na tym, że z czasem system się przeciąża: niektóre narzędzia przestają być potrzebne, a stare dokumenty zamieniają się w szum. To problem, bo **„żaden dokument jest lepszy niż błędny”**.

Innym powodem, dla którego możemy chcieć **metaprzepływów pracy** do utrzymania systemu, jest to, że agenci będą w trakcie pracy często napotykać te same problemy. Gdy zdarza się to nam, zapamiętujemy to na następny raz. Agenci potrzebują czegoś podobnego, aby mogli budować i dostosowywać swoje skille lub tworzyć narzędzia.

Posiadanie tego wszystkiego czyni produkt AI-native. W praktyce jednak możemy chcieć zacząć od małej skali, bo zbudowanie wszystkiego wymaga czasu, a jeszcze nie wiemy, co to „wszystko” obejmuje.

## Plan

- Eksploracja: syntetyczne ścieżki użytkownika, interaktywne mapy, historyczne zmiany, wizualizacje architektury
- Planowanie: rozszerzanie i zawężanie zakresu, mapowanie ryzyka, grafy, wysokopoziomowe strategie implementacji
- Wykonanie: praca bezpośrednia, przekazania, równolegli agenci, punkty scalania, praca delegowana
- Informacja zwrotna: logi systemowe, informacja wizualna, informacja od ludzi, artefakty

## Eksploracja

Agenci zaczynają pracę od eksploracji, bo muszą zebrać kontekst, aby zrozumieć zadanie i wprowadzić zmiany. Potem powtarzają ten proces za każdym razem, jakby robili to po raz pierwszy. Czasem nawet im się to nie udaje, co szkodzi ich pracy, a mimo to **nie zostawiają żadnego śladu ani notatek na ten temat**, chyba że zbudujemy do tego przepływ pracy.

Takie scenariusze zdarzają się cały czas i nie ograniczają się do bazy kodu. Obejmują też nawigowanie po zewnętrznych systemach: zdalnych repozytoriach, systemach zgłoszeń, kanałach komunikacji i infrastrukturze. Najprostszym rozwiązaniem jest **mapa**, o której wspominaliśmy w **S02E01**. Problem w tym, że w szybko ewoluujących systemach taki dokument szybko się dezaktualizuje i wprowadza więcej zamętu niż wskazówek. I właśnie ten problem nasz przepływ pracy musi rozwiązać.

Kłopot polega na tym, że nie znamy dokładnego stanu mapy ani zmiennych, które musimy uwzględnić, aby ją ulepszyć. Wiemy jednak, że w takich przypadkach powinniśmy zdefiniować **zasady**, **zakres** oraz **harmonogram lub wyzwalacz**. Całą resztę należy zostawić agentowi. Agent powinien mieć też dostęp do historii swoich działań, aby nie powtarzał tych samych błędów, a system faktycznie „się uczył”.

I żeby było jasne, nie mówimy o mapie bazy kodu ani o niczym, co agent może łatwo znaleźć. Mówimy o kontekście, który nie jest oczywisty z samego kodu. To raczej **zestaw dokumentów** wyjaśniających funkcje: ich rolę, sposób interakcji z nimi, sposób ich weryfikacji i to, o czym warto pamiętać.

![Po lewej ramka o nazwie Mapa funkcji zawiera trzy małe dokumenty o tym samym kształcie: checkout.md, search.md i notifications.md. Przerywana linia prowadzi od checkout.md do otwartego checkout.md po prawej. Otwarty dokument ma cztery sekcje równej wysokości: Rola, Jak się tam dostać, Jak zweryfikować oraz Pamiętaj. Sekcja „Pamiętaj” jest jedyną czerwoną. Poniżej pasek ma dwa wiersze. „Znalezione przez czytanie kodu” ma wyblakłe znaczniki: trasy, komponenty, układ folderów. „Zapisane w Mapie funkcji” ma pełne znaczniki: jak się tam dostać, jak zweryfikować i czerwony znacznik, o czym pamiętać. Nazwy funkcji i tekst sekcji są przykładami.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-1/frame.html)

Lauren Tan opisała koncepcję **Mapy funkcji** (Feature Map) w odniesieniu do swoich skilli agentów do weryfikacji ([generowanie](https://github.com/cursor/plugins/blob/main/pstack/skills/create-verification-skill/SKILL.md), [utrzymanie](https://github.com/cursor/plugins/blob/main/pstack/skills/maintain-verification-skill/SKILL.md)). Używa ich z agentami Cursor Cloud, które działają według codziennego harmonogramu. Te dwa skille generują małe pliki opisujące obszary jej aplikacji, które chce, by agenci rozumieli. Dokładnie tego potrzebujemy w systemach produkcyjnych, gdzie zmiana zachowania jednej funkcji może mieć nieoczywisty wpływ na inną.

Nasza rola koncentruje się więc głównie na tworzeniu i iterowaniu skilli, ale też na **inicjalizowaniu map**, ponieważ początkowy kształt mapy bezpośrednio wpływa na jej niezawodność i użyteczność oraz kształtuje ulepszenia, które agenci później w niej wprowadzają.

W rezultacie Mapy funkcji poprawiają sposób, w jaki agenci przechodzą fazę eksploracji, i nie tylko. Posiadanie tego kontekstu czyni ich też lepszymi we wdrażaniu funkcji i ich późniejszej weryfikacji. Poniższy przykład pokazuje, jak może to działać w praktyce: **w aplikacji odtwarzacza muzyki naprawa błędu z playlistami może wpłynąć na kolejki**. Łatwo to przeoczyć, ale dzięki mapie funkcji agent się tym zajmuje.

![Diagram: agent używa Mapy funkcji do naprawy błędu w odtwarzaczu muzyki. Po lewej osiem kroków agenta biegnie od zadania „Błąd: po edycji playlisty tryb losowy odtwarza ten sam utwór dwa razy” do „Dodaj do queue.md → Pamiętaj: kolejność losowa jest buforowana”. Krok 5, odtworzenie błędu, jest czerwony. Po prawej Mapa funkcji zawiera cztery dokumenty. player.md i offline.md są wyblakłe, bo agent ich nie otwiera. playlist.md ma wyróżnioną linię „Edycja playlisty przebudowuje kolejkę.” Przerywana strzałka „przebudowuje” łączy go z queue.md. W queue.md krok 8 zapisuje nową linię „Kolejność losowa jest buforowana”, oznaczoną „dodane”.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-2/frame.html)

Harmonogramy lub wyzwalacze utrzymujące mapy muszą szukać nie tylko rzeczy **do dodania**. Muszą też szukać rzeczy **do zmodyfikowania i usunięcia (zarchiwizowania)**. W rzeczywistości większość agentów w tle zajmujących się utrzymaniem powinna skupiać się na sprzątaniu tego, co przestało być potrzebne. Warto też rozważyć łatwy sposób komunikacji z nami nie tylko wtedy, gdy trzeba, ale **zawsze**, z użyciem wizualnych artefaktów, które pozwalają szybko przejrzeć zmiany i wychwycić problemy.

## Planowanie

Posiadanie Mapy funkcji wraz z zasadami omówionymi w **S03E02** znacznie ułatwia nam rozmowy o zmianach i naprawach błędów. Nie musimy już opisywać każdego szczegółu ani **trzymać wszystkiego w głowie**. Nawet jeśli wspomnimy o funkcji tylko pobieżnie, agent powiąże ją ze wszystkim, co potrzebne, i pomoże nam zastanowić się, co zrobić. W rzeczywistości rozmowa z agentem posiadającym taką wiedzę przypomina dyskusję z kolegą z zespołu, który spędził lata przy projekcie i zna odpowiedzi na niemal wszystkie pytania.

![Rozmowa po lewej i Mapa funkcji po prawej. Użytkownik pisze: „Dodajmy crossfade między utworami. Powinien działać też z moimi pobranymi.” Cienkie linie łączą podkreślone frazy z dokumentami: „crossfade” z player.md, „między utworami” z queue.md i „pobranymi” z offline.md. Na mapie queue.md zasila player.md, offline.md ma czerwoną strzałkę „brak wstępnego ładowania” do queue.md, a wyblakły playlist.md „przebudowuje” queue.md. settings.md jest wyblakły. Agent odpowiada, że crossfade dotyka playera, kolejki i offline, i mówi, żeby zacząć od kolejki. Użytkownik odpowiada „OK, zaplanuj to.”](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-3/frame.html)

Omawianie funkcji to także idealny moment dla podagentów lub workerów, bo w naszym interesie jest utrzymanie głównego wątku skupionego na najważniejszych aspektach i interaktywnego. W tle agenci mogą skupić się na badaniach albo na aktualizowaniu grafów, wizualizacji czy laboratoriów, które omawialiśmy w **S03E02**.

Ale teraz możemy pójść **znacznie dalej**, ponieważ agenci potrafią przełożyć naszą intencję na plany wysokiej jakości i zastosować w pewnym stopniu „zdrowy rozsądek” wynikający ze „zrozumienia” systemu i relacji między jego komponentami. A najlepsze jest to, że im dłużej pracujemy nad systemem, tym lepszy staje się ten proces, bo dostępny kontekst stale się poprawia.

W rzeczywistości ten proces można łatwo delegować agentom w tle, które będą iterować nad kształtem funkcji, szukając przypadków brzegowych i najlepszego sposobu ich obsługi. Nie oznacza to, że jesteśmy całkowicie wyłączeni z procesu, bo ostateczna decyzja należy do nas. **Ale takie podejście pozwala nam wzmocnić naszą wiedzę, umiejętności i osąd**, ponieważ proponowany plan byłby trudny do opracowania przez nas nawet w bezpośredniej interakcji z AI.

![Trzy kolumny: Główny wątek, Agenci w tle, Plan, dla przykładu: dodania crossfade do odtwarzacza muzyki. Główny wątek zawiera pięć krótkich wiadomości. Wiadomość 2 uruchamia trzech agentów równej wielkości: Eksploruj, Badaj i Wizualizuj. Każdy agent pokazuje swoje ustalenia jako znaczniki. „utwór offline: brak wstępnego ładowania” to jedyny czerwony znacznik. Agenci czytają i zapisują blok Wspólne notatki, a wyniki odsyłają do wiadomości 2 i 4. Notatki iterują plan przez v1, v2 i v3. Plan jest narysowany jako trzy ułożone wersje, z v3 na wierzchu. v3 to krótka notatka, która mówi, co funkcja robi, a nie jak ją zbudować. Dołączony jest do niej graf zależności. Przykładowy tekst notatki parafrazuje ustalenia. Wiadomość 5, „Zatwierdzam. Maks. fade 8 s.”, ma akcentowaną ramkę i łączy się ze znacznikiem „twoja decyzja” pod planem.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-4/frame.html)

Jak omawialiśmy, plan nie powinien opisywać, **jak rzeczy mają być zrobione**. Zamiast tego powinien skupiać się na tym, co trzeba zrobić i jak rezultat zostanie udowodniony. Sam dokument powinien być dość krótki, choć może odwoływać się do zewnętrznych plików. Ogólnie w naszym interesie jest utrzymywanie pętli sprzężenia zwrotnego tak szybkich, jak to możliwe, przynajmniej dopóki system nie będzie gotowy do obsługi dłuższych zadań bez nadzoru.

Jeśli spojrzymy na to przez pryzmat wszystkich lekcji, które przeszliśmy, powinno być jasne, jak możemy **połączyć naszą wiedzę z własnymi narzędziami i konfiguracjami**, by ukształtować system dopasowany do naszego produktu. To od nas zależy, w których częściach chcemy być zaangażowani. Zależy to w dużej mierze od funkcji, nad którą pracujemy, ale też od **poziomu zaufania**, jakim darzymy system.

## Wykonanie

Rozwój produktu w duchu AI-native ogranicza, a czasem eliminuje wiele procesów, które znamy nie tylko z ery sprzed AI, ale też z początków AI, gdy pracowaliśmy z agentami bezpośrednio. Czynności takie jak **[pisanie kodu, czytanie go](https://x.com/unclebobmartin/status/2080257779395154409?s=20)** i nawet jego **przeglądanie** są automatyzowane do tego stopnia, że ludzie w ogóle nie są zaangażowani. A jeśli to nie brzmi dostatecznie szalenie, agenci zaczynają zarządzać innymi agentami i podejmować coraz więcej decyzji samodzielnie. Można odnieść wrażenie, że niewiele już zostało.

W praktyce jednak jest wiele rzeczy, którymi musimy się zająć.

**Badania:**
Przed AI rozwój produktu w dużej mierze zależał od naszych aktualnych umiejętności i tego, czego byliśmy gotowi nauczyć się w rozsądnym czasie. Na przykład, jeśli biegle znaliśmy ekosystem JavaScript, rzadko decydowaliśmy się zbudować coś w Rust. To samo dotyczyło bibliotek (takich jak Three.js) czy obszarów (takich jak programowanie funkcyjne), które były po prostu zbyt wymagające, by je opanować. Ale teraz te bariery albo zniknęły, albo są znacznie łatwiejsze do pokonania.

W ten sposób badania i eksploracja stały się częścią naszej pracy. A fakt, że AI potrafi bezbłędnie używać niemal każdego narzędzia, nie oznacza, że nie musimy rozumieć, jak ono działa. W rzeczywistości jest odwrotnie, ale zamiast uczyć się wszystkiego, musimy zagłębiać się tylko tak daleko, jak wymaga zadanie, i **musimy nauczyć się rozpoznawać ten punkt** oraz budować narzędzia i przepływy pracy, które nam w tym pomogą.

![Koncentryczne pierścienie wokół osoby, która oznacza nasze kompetencje. Kropkowany pierścień tuż za nią pokazuje nasz zasięg bez AI. Duży przerywany pierścień pokazuje granicę tego, co potrafimy zweryfikować. Między obydwoma pierścieniami strefa eksplorowana z AI zawiera sześć znaczników: Dokumentacja produktu, Mapa bazy kodu, Rynek, Ograniczenia, Wcześniejsze decyzje i Konwencje. Pięć ścieżek biegnie od osoby, każda z czerwoną kropką agenta. Trzy ścieżki zatrzymują się wewnątrz przerywanego pierścienia. Dwie przekraczają go i biegną dalej jako linie kropkowane w obszar poza naszym osądem. Linia łączy przerywany pierścień z czterema kontrolami: Czy potrafię to wyjaśnić własnymi słowami? Czy potrafię nazwać, jak to sprawdzić? Czy osobne eksploracje się zgadzają? Czy bym to zatwierdził? Pigułka na dole wyraża zasadę: idź tak daleko, jak jeszcze potrafimy zweryfikować, a nie tak daleko, jak agent może sięgnąć.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-5/frame.html)

**Struktura:**
Jako inżynierowie częścią naszej pracy było zarządzanie takimi rzeczami jak architektura, dokumentacja, usługi zewnętrzne i infrastruktura. Rozwój AI-native zachowuje większość z nich, ale to agenci wykonują faktyczną pracę. Naszym zadaniem jest teraz utrzymanie tego wszystkiego w porządku pod względem **procesów**, **harmonogramów** i **efektywności**, wraz z mechaniką stojącą za obserwowalnością, stabilnością i ulepszaniem systemu. I jak widzieliśmy, wymaga to pracy na swego rodzaju „metapoziomie”, bo nie chodzi o to, by **mówić agentom, co mają robić, lecz by upewnić się, że wiedzą, co robić**, i **zapewnić, że mogą to zrobić**. Świetny tekst Lauren na ten temat znajduje się w sekcji „*sztuka nadzorowania kogoś mądrzejszego od ciebie*” w [The Complete Guide to pstack](https://x.com/poteto/status/2097732320606507506).

![Dwie kolumny. Po lewej jedna osoba ma cztery grube linie rozchodzące się do czterech czerwonych kropek agentów. Trzy dymki z pytaniami wskazują z powrotem w górę, a podpis pod nimi mówi „Każde pytanie wraca do nas”. Po prawej, pod „Organizowanie systemu”, osoba organizuje procesy, harmonogramy i efektywność oraz dba o zdrowie systemu dzięki obserwowalności, stabilności i ulepszaniu. Trzy strzałki prowadzą w dół do pudełka „Na czym polegają agenci”. Pudełko ma dwie połowy: „Wiedzą, co robić” i „Mogą to zrobić”. Z tego pudełka strzałki prowadzą w dół do agenta prowadzącego i pięciu kolejnych agentów w łańcuchu. Agent prowadzący dostaje od osoby zestaw zadań przez przerywaną linię „Intencja i informacja zwrotna”. Dwie linie wracają w górę od ostatniego agenta: „Dowody” trafiają do Obserwowalności, a „Nowe narzędzia i skille” do środkowego pudełka.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-6/frame.html)

Wymaga to od nas zastosowania wszystkiego, czego nauczyliśmy się do tej pory, ale też zmiany sposobu, w jaki myślimy o swojej pracy i na nią patrzymy. Przed AI naszym domyślnym rozwiązaniem problemu było naprawienie go samemu. Z AI często jest to polecenie agentowi, by go naprawił. Ale to, co staramy się ustalić, to **jak sprawić, by agent był świadomy problemu i potrafił właściwie na niego zareagować.**

**Ekosystem:**
Załóżmy, że znamy [Axiom](https://axiom.co/), ale bardzo mało wiemy o [Datadog](https://www.datadoghq.com/) i [Better Stack](https://betterstack.com/). Gdyby nasz produkt potrzebował obserwowalności, Axiom byłby dla nas oczywistym wyborem, nawet gdyby alternatywy oferowały lepsze funkcje. Przed AI zrozumienie i dostosowanie się do zupełnie nowej platformy wymagało wysiłku, którego rzadko się podejmowaliśmy.

Z agentami po naszej stronie możemy mieć w ciągu godziny raport porównujący nasze opcje i jasno wyjaśniający ich funkcje w sposób dopasowany do nas, wraz z mapą architektury i nakładem pracy potrzebnym do integracji każdej z opcji. Można to zastosować do dosłownie każdej usługi.

Na przykład poniżej znajduje się stos, którego używamy w mega.dev i MEGA HQ. Jego komponenty wybraliśmy nie z powodu osobistych preferencji czy doświadczenia, ale ze względu na możliwości biznesowe i czynniki organizacyjne. Nie twierdzę, że ten stos jest idealny, ale nawet gdyby któryś z jego komponentów trzeba było zmienić, AI sprawiłoby, że byłoby to bezwysiłkowe, zwłaszcza dzięki dobrym decyzjom architektonicznym, które utrzymują integracje w prostocie.

![Diagram ekosystemu MEGA. Przerywane pudełko Treść lekcji (GitHub · build Astro) zasila MEGA HQ tylko przy wdrożeniu. Po lewej Student (przeglądarka) czyta lekcje w MEGA HQ, a harness AI Studenta (Claude Code, Cursor) wykonuje wyzwania przez MCP. Student łączy się też z mega.dev w sprawie konta i oceny. MEGA HQ (hq.mega.dev na Cloudflare: lekcje zablokowane w czasie, wyzwania, serwer MCP) dzieli dane Studenta z mega.dev (Vercel i Next.js: strona, konta, ocena i karty). Usługi: Airtable i Resend pod HQ; OpenRouter, Cloudinary, Stripe, Postmark i Sentry pod mega.dev. Zasada: wybierz najlepszą usługę do każdego zadania.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-7/frame.html)

Chociaż dziś możemy generować spersonalizowane oprogramowanie, często nie ma sensu tracić czasu na rzeczy, które możemy dostać od ręki. A ponieważ mamy agentów, którzy potrafią budować głęboko spersonalizowane integracje w pełni wykorzystujące to, co oferują usługi zewnętrzne, powinniśmy zdecydowanie wykorzystać to na swoją korzyść.

**Harmonogramy:**
Rozwój produktu w duchu AI-native niesie wyzwania, ponieważ wielu agentów może pracować jednocześnie. Szybko okazuje się, że narzędzia, których używamy, **nie zostały do tego zbudowane**, gdyż agenci uruchamiają procesy i odpalają testy, kompilatory, a nawet całe sandboxy i maszyny wirtualne. Nagle nawet 128 GB RAM-u w maksymalnie wyposażonym MacBooku to za mało.

W chwili, gdy zaczynamy zauważać, że kończą nam się zasoby (CPU, GPU, RAM lub miejsce na dysku), pierwszą rzeczą, jaką możemy zrobić, jest **poproszenie agentów o audyt**, który zidentyfikuje wąskie gardła. W zależności od stosu audyt może znaleźć jednorazowe rozwiązania, które możemy wdrożyć od razu, albo problemy wymagające obsługi według harmonogramu, takie jak sprawdzanie nieaktualnych procesów czy czyszczenie pozostałości. W niektórych przypadkach warto rozważyć dodanie kolejek lub dławienia dla najbardziej wymagających procesów, takich jak kompilacja.

![Trzy wykresy z jedną wspólną lewą krawędzią. Pierwszy wykres pokazuje RAM w ciągu jednego dnia pracy od 9:00 do 18:00. Bez harmonogramów skoki kompilacji siedzą na bazie, która rośnie co godzinę. Od około 15:00 skoki uderzają w limit z notatką „Swap, awarie, wolni agenci”. Z harmonogramami skoki są niższe i szersze, a zatrzymywanie nieaktualnych procesów co godzinę utrzymuje bazę płaską. Nawias o 18:00 oznacza różnicę między dwiema bazami jako pozostałe procesy. Drugi wykres pokazuje zużycie dysku w ciągu jednego tygodnia. Bez harmonogramów linia wspina się jak schody i osiąga limit w piątek, z oznaczeniem „Pełny dysk”. Z harmonogramami nocne czyszczenie tworzy piłę, która co noc spada do tego samego niskiego poziomu. Trzeci wykres pokazuje sześć kompilacji w ciągu jednej godziny. Bez kolejki wszystkie uruchamiają się naraz około 0 min. Z kolejką, po 2 naraz, biegną jedna po drugiej w ciągu godziny. Pigułka wyraża zasadę: zaplanuj sprzątanie i ustaw w kolejce szczyty, zanim kupimy więcej sprzętu. Kształty krzywych są przykładami, nie danymi pomiarowymi.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-8/frame.html)

Gdy optymalizacja nie wystarcza, zamiast kupować dodatkowy sprzęt, możemy rozważyć **agentów w chmurze** ([Codex](https://learn.chatgpt.com/docs/cloud), [Claude Code](https://code.claude.com/docs/en/claude-code-on-the-web) itd.). Nie oferują tyle elastyczności co VPS czy fizyczna maszyna, ale bardzo dobrze się skalują.

Oprócz optymalizacji harmonogramy są użyteczne w monitorowaniu systemu pod kątem anomalii, zachowań użytkowników i problemów z bezpieczeństwem. Obecnie takie harmonogramy są **krytyczną częścią systemu**, ponieważ możemy spodziewać się **ciągłych ataków**, które pochodzą nie od głupich botów, z którymi można niezawodnie walczyć, lecz od **dynamicznych agentów** szukających drogi do naszego systemu. Warto rozważyć skille takie jak **[security-audit](https://github.com/cloudflare/security-audit-skill)** oraz właściwą konfigurację [Sentry](https://sentry.io/), która zgłasza problemy bezpośrednio agentom.

Wreszcie mamy harmonogramy do zarządzania przepływami pracy, które obsługują faktyczną pracę nad produktem: rozwiązywanie zgłoszeń, naprawianie błędów, przeglądanie funkcji, refaktoryzację itp. Często ustawia się je w chmurze, aby nie zależały od niczyjej maszyny.

Ogólnie harmonogramy stają się ważnym obszarem do uwzględnienia w rozwoju AI-native. Dobre ich ustawienie może łatwo zrobić realną różnicę, a nawet stać się przewagą konkurencyjną.

## Informacja zwrotna

Agenci potrzebują jak najszerszego dostępu do danych środowiska w czasie rzeczywistym. Dane te pomagają im zrozumieć system, w tym jego stan bieżący i historyczny. Aby to umożliwić, sam system musi być zorganizowany z myślą o tym. Możemy rozważyć takie rzeczy jak łatwy dostęp do logów deweloperskich i produkcyjnych, zdarzeń aktywności, łatwy sposób interakcji z aplikacją, możliwość robienia zrzutów ekranu i nagrywania filmów i więcej.

Takie interaktywne, bogate w dane środowisko rzadko istnieje w oprogramowaniu. Oznacza to, że najpierw musimy **zdecydować, jakie informacje są potrzebne**, a następnie **przebudować lub rozszerzyć system**, aby faktycznie je dostarczał. Nie dla nas, lecz dla agentów.

Poniżej znajduje się przykładowa architektura systemu zawierającego cały zestaw struktur, narzędzi i usług **dedykowanych agentom**. Pozwalają one agentom **wchodzić w interakcję z aplikacją** w środowisku deweloperskim, a także dają im łatwy dostęp do niemal wszystkiego, co dotyczy systemu produkcyjnego. Ten diagram wyraźnie pokazuje, że nie mówimy o prostym loggerze. A zbudowanie tego wymaga uczynienia z tego prawdziwego priorytetu.

![Diagram tego, skąd agent bierze informację zwrotną. Po lewej jest Agent. W sandboxie (development) agent steruje aplikacją (klika, pisze, loguje się) i ją obserwuje (zrzuty ekranu, logi, nagrania) oraz dołącza dowód (przed i po, zaliczone kontrole). Aplikacja trafia na produkcję (tylko do odczytu). Z produkcji agent tylko czyta sygnały: logi i błędy, odtworzenia sesji i opinie użytkowników.](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e03/artifacts/lesson/figure-9/frame.html)

Budowanie struktur, dzięki którym agenci uzyskują wartościową informację zwrotną, jest kluczowe i stanowi fundament całego systemu, ponieważ te struktury odgrywają dużą rolę w **budowaniu zaufania** i pozwalają agentom niezawodnie weryfikować swoją pracę. Niezależnie od tego, czy mamy istniejący system, czy budujemy go od zera, trudno z góry określić, czego dokładnie potrzebujemy, więc jak zawsze **dobrze jest zacząć od małej skali**, a następnie ustawić **użyteczne harmonogramy**, które pozwolą agentom utrzymywać narzędzia i doskonalić się na podstawie wniosków z dostępnych logów.

## Najważniejsze wnioski

Wyjście poza bezpośrednią pracę z agentami i zbudowanie prawdziwie AI-native cyklu rozwoju wymaga wiele wysiłku. I choć agenci zajmują się faktyczną pracą nad oprogramowaniem i samym systemem, nasze obowiązki nadal obejmują wiele czynności, decyzji i rozumienia. Co ważne, praca w ten sposób wymaga **nowego sposobu myślenia** o budowaniu oprogramowania, bo nie „przechodzimy po prostu na kolejny poziom abstrakcji”. Musimy też poszerzyć perspektywę i spojrzeć daleko poza kod, na inne obszary całego produktu.

Ostatnia rzecz do rozważenia po tej lekcji: gdy spojrzymy wstecz na to, co dziś omówiliśmy, możemy zdać sobie sprawę, że **produkty AI-native mogą poruszać się znacznie szybciej przy zachowaniu jakości, a produkty rozwijane przez bezpośrednią pracę z agentami nie mają szans nadążyć.** To może prowadzić do wniosku, że w niektórych scenariuszach mądrzej jest zbudować od zera całą platformę, by zyskać tę przewagę.
