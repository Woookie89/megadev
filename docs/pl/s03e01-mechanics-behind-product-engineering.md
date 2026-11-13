# S03E01 · Mechanika inżynierii produktu

Nawet gdyby rozwój modeli językowych zatrzymał się dzisiaj, można rozsądnie stwierdzić, że nie ma już powrotu do ręcznego kodowania i że możemy zbudować praktycznie wszystko, co chcemy. Ale **nie wszystko**, zwłaszcza biorąc pod uwagę to, czego nauczyliśmy się o budowaniu systemów produkcyjnych, które muszą być niezawodne i wydajne. Zmieniło się to, że **nasza rola nie polega już na pisaniu kodu. A skoro nie na tym, to na czym?**

Gdy spojrzymy na otaczające nas oprogramowanie, zobaczymy, że AI potrafi odtworzyć większość jego funkcji dość łatwo, nawet przez inżynierię wsteczną. Ale zbudowanie całego produktu właściwie nie jest czymś, co da się „vibe codować” kilkoma promptami, a nawet flotą agentów. Chodzi bowiem nie tylko o pisanie kodu, projektowanie architektury, rozumienie biznesu czy podejmowanie pojedynczych decyzji. **Chodzi o to, by robić to wszystko dobrze i we właściwym czasie.**

I tu zaczyna się inżynieria produktu.

## Plan

- Zmiana: rezultat ponad wynik pracy, inżynier produktu a product manager, uwaga jako wąskie gardło
- Odpowiedzialność: zakres, wpływ na użytkowników, wartość biznesowa, konsekwencje techniczne
- Osąd: założenia, kompromisy, smak, przypadki brzegowe, niepewność, konsekwencje
- Myślenie systemowe: architektura, zależności, wpływ operacyjny, różnice w systemie
- Dźwignia: eksploracja wspierana przez AI, prototypowanie w pętli, eksploracja generatywna, syntetyczne dane wejściowe

## Zmiana

Załóżmy, że postępy w generatywnej AI trwają do momentu, w którym **cały proces tworzenia oprogramowania** staje się autonomiczny. Agenci potrafią podjąć każde wymaganie czy zgłoszenie i dobrze je obsłużyć. Dbają o jakość, przypadki brzegowe i wydajność, podejmują dobre decyzje architektoniczne, a nawet dodają ten rodzaj dopracowania, który wielu uważa za wymagający smaku. Mówiąc wprost: **niemal wszystko w naszej pracy zostaje zautomatyzowane**.

Co wtedy?

Nikt nie wie tego na pewno, ale jeśli się zastanowić, gdy każdy może dostać prawie wszystko, o co poprosi, różnicę robi **decydowanie o tym, co zbudować**, **jak dobry będzie rezultat** i **jak szybko może ewoluować**. Poza tym są rzeczy, których LLM nie może wygenerować, takie jak **dane ze świata rzeczywistego, baza użytkowników, klienci** czy **reputacja**.

Wszystko razem daje nam dobry produkt, którego nie da się łatwo sklonować. Bo nawet jeśli ktoś zbuduje tę samą funkcję w jeden dzień, nie zdobędzie naszych klientów tego samego dnia. I działa to też w drugą stronę: jeśli ktoś ma użytkowników, nie znaczy to, że ma nasze funkcje.

![Aplikacja do notatek ze spotkań użyta jako przykład. Po lewej pętla pięciu stacji biegnie zgodnie z ruchem wskazówek zegara wokół okręgu: sygnał (38 zespołów prosi o eksport do Notion), decyzja (zbudować eksport do Notion, pominąć PDF), ustalenie poprzeczki (zachowuje nagłówki, linki, zadania), budowanie z agentami (2 dni, oznaczone jako łatwe do skopiowania), wydanie i nauka (71% zespołów używa go w pierwszym tygodniu). Środek mówi: 1 obrót: 9 dni. Poniżej rząd zatytułowany „co buduje pętla” ma cztery komórki: użytkownicy 12 000, klienci 340 zespołów, dane ze świata rzeczywistego 1,2 mln spotkań, reputacja 3 lata i ocena 4,8. Strzałka podpisana „rośnie” prowadzi od wydania i nauki do tego rzędu. Strzałka podpisana „zasila” prowadzi z rzędu z powrotem do sygnału. Po prawej tabela zatytułowana „klon zbudowany w jeden dzień” porównuje Twój produkt z klonem. Oba mają 24 funkcje. Klon ma 0 użytkowników, 0 klientów, brak danych ze świata rzeczywistego, brak reputacji i 0 obrotów pętli, a następną funkcję wybiera na zgadywankę. Te wartości klonu są czerwone. Przerywana szara strzałka podpisana „jedyna skopiowana część” prowadzi od budowania z agentami do kolumny klonu. Wszystkie wartości są przykładami.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-1/frame.html)

Dla każdego, kto zna już budowanie produktów nie tylko od strony inżynierskiej, to wszystko może nie brzmieć jak nowość. Jest jednak różnica: **tempo** i **zdolność adaptacji**. Oba muszą osiągnąć poziomy niespotykane dotąd, nie tylko w generowaniu kodu, ale w każdym aspekcie rozwoju produktu. Dziś dodanie nowej funkcji do produktu może być szybkie, ale dodanie **właściwej funkcji, dobrze zrobionej**, to zupełnie inna gra.

Jest kilka powodów, a jednym z nich jest to, że **agenci stają się pośrednikiem między użytkownikami a aplikacjami**. Jednym z przykładów jest **Google Search**, z którego wielu z nas korzysta dziś przez agentów, a nie bezpośrednio. Innym przykładem jest ffmpeg, narzędzie, którego agenci często używają, nawet nam o tym nie mówiąc. To samo dotyczy [Sentry](https://sentry.io/welcome/), [Resend](https://resend.com/), [Parallel](https://parallel.ai/), [Kitesurf](https://blog.cloudflare.com/kitesurf/), [e2b](https://e2b.dev/), [AgentMail](https://www.agentmail.to/), [1Password](https://1password.com/) i wielu, wielu innych. A wszystko to są usługi i narzędzia, których nie da się łatwo wygenerować.

![Po lewej okno czatu, które widzi użytkownik. Zawiera jedną prośbę: „Wytnij 30 sekund z wczorajszego dema i wyślij do Acme z fakturą.” oraz jedną odpowiedź: „Gotowe. Wysłano na anna@acme.com z fakturą nr 1042.” Przerywana linia podpisana „ukryte przed Tobą” oddziela czat od listy sześciu wywołań agenta: znajdź adres Anny w poprzednich e-mailach (Gmail), sprawdź dane rozliczeniowe Acme (Google Search), wytnij 0:42–1:12 z demo.mp4 (ffmpeg), zmień nazwę i skompresuj klip (skrypt napisany na bieżąco, linia przerywana), utwórz fakturę nr 1042 (Stripe) oraz wyślij klip i fakturę (Resend). Lista kończy się podpisem „6 wywołań, 1 napisane na bieżąco, 41 s”. Strzałka podpisana „1 prośba” prowadzi od wiadomości użytkownika do pierwszego wywołania. Strzałka podpisana „1 odpowiedź” prowadzi od ostatniego wywołania do wiadomości agenta. Poniżej skala od „łatwo wygenerować” do „nie da się wygenerować” z trzema strefami. „agent to pisze”: skrypt zmiany nazw, 12 linii, usuwany po użyciu. „szybciej wywołać”: ffmpeg, ponad 20 lat pracy nad kodekami. „jedyna droga to wywołanie”, na czerwono: Google Search, indeks sieci; Stripe, powiązania z bankami, licencje; Resend, reputacja nadawcy; Gmail, Twoja skrzynka. Wszystkie wartości są przykładami.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-2/frame.html)

Wszystko to sugeruje, że oprogramowanie **będzie potrzebne** nawet w agentowym świecie, a zapotrzebowanie na nie prawdopodobnie wzrośnie, ponieważ jedna osoba **nie będzie miała jednego agenta, lecz całe floty agentów**. Rodzi to nowy zestaw wyzwań związanych nie tylko z oprogramowaniem, ale też ze sprzętem i większością procesów towarzyszących budowaniu produktów. A te wyzwania są **niezwykle ekscytujące** z inżynierskiego punktu widzenia.

Mając to na uwadze, wróćmy do tego, gdzie jesteśmy dzisiaj. To, co widzieliśmy do tej pory, sugeruje, że autonomia jest już osiągalna w wielu obszarach, ale pozostaje bardzo wymagająca i napotyka realne bariery techniczne. Ich pokonanie wymaga zrozumienia nie tylko technologii, ale też szerszego kontekstu produktu. Pytanie nie brzmi więc już „**czy zgłoszenie jest zrobione?**”, lecz „**czy użytkownik może teraz zrobić to, czego potrzebuje?**”

To jest przejście **od wyniku pracy do rezultatu.**

## Odpowiedzialność

Odpowiedzialność jest jednym z podstawowych aspektów naszej pracy, ponieważ zależy nam na jakości, utrzymywalności, skalowalności, wydajności, bezpieczeństwie i niezliczonych szczegółach składających się na dostarczanie świetnego oprogramowania. Dzisiaj agenci radzą sobie z większością z nich, ale nie całkiem samodzielnie, bo nadal musimy podejmować wiele krytycznych decyzji dotyczących kształtu systemu.

W **S02E02** rozmawialiśmy o prymitywach agentowych, uogólnionych klockach budulcowych, jako o krytycznym aspekcie architektury, który otwiera drogę do autonomicznego rozwoju i samoewoluującego oprogramowania. W praktyce prymitywy to nie tylko wyzwanie inżynierskie, bo równie ważne jest głębokie zrozumienie domeny, produktu i użytkowników.

Świetny przykład pochodzi z [wystąpienia Jediaha Katza](https://www.youtube.com/watch?v=7Y4sbZgBdnc&t=969s) o harnessach i Grok Bocie. Przedstawia on **Subskrypcje** jako **prymityw**, który pozwala agentom obsługiwać **e-maile, komunikatory, przeglądy PR, alerty i harmonogramy**. Ten jeden klocek wystarcza do obsługi ich wszystkich oraz wszystkiego innego, co możemy subskrybować i co wysyła sygnały wybudzenia dowolnego rodzaju.

![Pięć wyzwalaczy (e-mail do bota, wzmianka na Slacku, przegląd PR, alert PagerDuty, dni robocze o 9:00) prowadzi do pudełka Subskrypcje, które obsługuje uprawnienia, kierowanie do właściwego agenta, deduplikację, filtrowanie szumu i wybudzanie agenta. Po prawej biała maskotka agenta w kształcie kropli z budzikiem, dzwonkiem, kopertą i dymkiem rozmowy. Agent wysyła subscribe(trigger) do Subskrypcji, a Subskrypcje wysyłają wake(event) do agenta.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-3/frame.html)

Decyzja o prymitywie **Subskrypcje** wydaje się w tym przypadku oczywista. Ale jeśli przyjrzymy się bliżej takim elementom jak **uprawnienia, kierowanie, deduplikacja, filtrowanie i wybudzanie** oraz temu, że ten jeden prymityw obsługuje nie tylko komunikatory, ale wiele rodzajów źródeł, staje się jasne, że ten, kto go wymyślił, **dokładnie wiedział, jak wygląda szerszy obraz całego produktu**. Sądząc po takiej decyzji architektonicznej, miał też chyba spore doświadczenie inżynierskie.

Choć uogólnianie w inżynierii oprogramowania nie jest niczym nowym, łatwo sobie wyobrazić, że ta funkcja zaczęła się od prośby o **integrację naszej aplikacji z e-mailem i kalendarzem**. Bez szerszego kontekstu my, jako inżynierowie, moglibyśmy przewidzieć, że integracji będzie więcej niż jedna, i zbudować jakąś bramę i adaptery. Choć by to działało, byłaby to pułapka w porównaniu z prymitywem **Subskrypcje**, ponieważ zamknęłaby nam drogę do innych rodzajów kompozycji.

![Jedna prośba o funkcję, „zintegruj naszą aplikację z e-mailem i kalendarzem”, rozdziela się na dwie ścieżki w czterech kolumnach: tydzień 1, miesiąc 2, miesiąc 4 i po 4 miesiącach. Na ścieżce wyniku pracy brama rośnie z 2 do 4 i do 6 adapterów (e-mail, kalendarz, Slack, przeglądy PR, alerty, harmonogramy). Każdy krok zajmuje 3, potem 5, potem 8 dni, co daje 6 adapterów do utrzymania i łącznie 16 dni. Na ścieżce rezultatu jedno pudełko Subskrypcje tej samej wielkości obsługuje 2, potem 4, potem 6 wyzwalaczy przez subscribe(trigger) / wake(event). Kroki zajmują 4 dni, potem 1 dzień, potem 0 dni, ponieważ agent dodaje ostatnie źródła w czasie działania. Łącznie to 1 prymityw i 5 dni. Produktem jest aplikacja agentowa, a wszystkie wartości są przykładami.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-4/frame.html)

Myślenie w kategoriach prymitywów wyraźnie pokazuje różnicę między **wynikiem pracy a rezultatem**. Pierwsze podejście doprowadziło nas do zaimplementowanej funkcji, ale dodało ciężaru architekturze, co szybko nas spowolniło. Drugie **rozszerzyło możliwości produktu**, zachowując przy tym szczupłą i elastyczną architekturę. Sprawiło też, że dodawanie nowych subskrypcji jest tak łatwe, że agenci mogą nimi zarządzać sami w czasie działania. W rzeczywistości to jedna z funkcji Grok Bota.

Wszystko to **nie przychodzi samo** i wymaga **dodatkowego wysiłku**, bo znacznie prościej jest po prostu zaimplementować funkcję, o którą nas poproszono. Jednocześnie znalezienie właściwego prymitywu wymaga od nas **wzięcia odpowiedzialności** i poszukiwania dodatkowego kontekstu, który może pochodzić z biznesu, od użytkowników i z naszych własnych badań.

Może to brzmieć, jakbyśmy stawali się product managerami, ale różnica między tą rolą a inżynierem produktu polega na tym, że **product manager (PM) decyduje, jaki problem rozwiązać i dlaczego**, a **inżynier produktu (PE) decyduje, co produkt musi robić, aby go rozwiązać.**

![Mapa cieplna tego, w jakim stopniu product manager (PM) i inżynier produktu (PE) odpowiadają za każdy z jedenastu obszarów produktu. Obszary są w dwóch grupach: Biznes i Inżynieria. Poziomy odpowiedzialności są przykładami poglądowymi. Komórki poza częścią wspólną mają neutralne odcienie: im więcej tuszu, tym większa odpowiedzialność. PM ma wysoki poziom przy klientach i użytkownikach oraz przy wyborze problemu do rozwiązania. PE ma wysoki poziom przy tym, co produkt musi robić, przypadkach brzegowych, architekturze, zależnościach i wpływie operacyjnym. Cztery wiersze mają czerwone komórki ze wzorem blokowym i klamrę podpisaną Część wspólna: wartość biznesowa, zakres, wpływ na użytkowników oraz założenia i kompromisy. Legenda pokazuje skalę od braku do wysokiego poziomu.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-5/frame.html)

Powyższy diagram pokazuje, że inżynieria produktu to nie tylko dobre prymitywy, ale też wszystko, czego wymaga ich stworzenie, i rezultaty, które dostajemy, gdy już działają. Poza tym taki sposób myślenia dotyczy nie tylko decyzji architektonicznych, ale niemal każdego aspektu produktu, z pytaniami takimi jak **„czy ta funkcja powinna istnieć?”**, **„czy to nadal jest potrzebne?”**, **„jak można połączyć te funkcje?”**, **„co daje użytkownikom największą wartość?”** czy **„przez co użytkownicy odchodzą?”**

I żeby było jasne, **nie mówimy o zmianie naszych ról** ani o budowaniu produktów od zera, lecz o zmianie sposobu, w jaki myślimy, pracujemy, podejmujemy decyzje i budujemy. Mówimy raczej o **płynnym przejściu**, niekoniecznie o natychmiastowym przełączeniu. Zwłaszcza że **większość baz kodu i większość produktów nie jest jeszcze gotowa na autonomiczny rozwój**.

W trakcie przejścia możemy zaobserwować, że:

- **Produkt** lepiej odpowiada na rzeczywiste potrzeby użytkowników i pozostaje bardziej konkurencyjny, ponieważ może szybciej się adaptować dzięki lepszym prymitywom i systemowi, który budujemy wokół niego. Ten system dba o jakość nie tylko w procesach inżynierskich, ale też w innych obszarach, takich jak marketing i sukces klienta.
- **Użytkownicy** zaczynają zauważać, że produkt ewoluuje szybciej niż wcześniej oraz staje się bardziej konfigurowalny i dostępny, zwłaszcza jeśli znajdziemy sposób, by ich agenci mogli z nim współdziałać.
- **Baza kodu** stopniowo staje się mniej złożona dzięki właściwemu uogólnianiu i usuwaniu funkcji, które można zastąpić prostszymi lub łatwo wycofać. Ponadto agenci przejmą niemal każdy proces, bo środowisko, które dla nich kształtujemy, pozwala im niezawodnie weryfikować wyniki własnej pracy i dawać nam faktyczne dowody.
- **Biznes** zyskuje więcej narzędzi do docierania do nowych klientów i zwiększania wartości życiowej istniejących użytkowników, co przekłada się niemal bezpośrednio na zdrowsze przepływy pieniężne i nowe możliwości utrzymania zrównoważonego wzrostu.

Będzie znacznie więcej sygnałów pokazujących efekty naszej pracy, a te sygnały przyniosą nam nowe pomysły i nowe wyzwania do rozwiązania.

## Osąd

Jako inżynierowie wiemy, jak tworzyć dobre oprogramowanie. Pod wieloma względami AI znacznie to ułatwiła, ale jednocześnie dodała wiele nowych komponentów i zmieniła wiele reguł. Dziś możemy przetwarzać dane w sposób, który 3 lata temu nie był wykonalny, a funkcje, które kiedyś były na tyle wartościowe, że budowano wokół nich całe produkty, może teraz wygenerować każdy.

Choć AI potrafi pisać lepszy kod niż większość programistów, nasza wiedza, doświadczenie i wiele naszych umiejętności nadal się przydaje, zwłaszcza jeśli rozumiemy, jak inżynieria zmienia się z powodu nowych możliwości, które wszyscy mamy.

Zgodnie z definicją inżyniera produktu musimy znaleźć sposób, by pracować znacznie szerzej. Oznacza to sięganie do innych obszarów produktu i biznesu albo zagłębianie się w niskopoziomowe szczegóły, a nawet technologie, których nie znamy. I choć może to brzmieć niezwykle trudno, większość wiedzy, której potrzebujemy, jest o jeden prompt stąd. Musimy tylko nauczyć się eksplorować **nieznane niewiadome**.

![Macierz dwa na dwa. Kolumny: wiemy to, nie wiemy tego. Wiersze: jesteśmy tego świadomi, nie jesteśmy tego świadomi. Cztery komórki to znane znane, znane nieznane, nieznane znane i nieznane nieznane. Nieznane nieznane, w prawej dolnej komórce, są zaznaczone na czerwono.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-7/frame.html)

Eksplorowanie zupełnie nowego tematu nie jest łatwe, gdy nie wiemy, czego chcemy się nauczyć, ani nawet gdzie szukać. Ale LLM-y potrafią więcej niż odpowiadać na nasze pytania. Mogą też podsuwać [pytania, o których nie wiedzieliśmy, że chcemy je zadać](https://github.com/overment/skills/tree/main/skills/unknown-unknowns). Co więcej, możemy stworzyć skill, który skraca pętlę sprzężenia zwrotnego, tak by zamiast rzucać w nas ścianą tekstu, AI prowadziło nas krótkimi, dobrze sformułowanymi wiadomościami. A kiedy tylko tego potrzebujemy, agent może dać nam mapę myśli lub interaktywne artefakty prezentujące **makiety** (wireframes) albo **proof of concept**.

![Duża mapa myśli przykładowego tematu, Tryb offline, narysowana tylko zakrzywionymi liniami i słowami kluczowymi. Dziewięć gałęzi rozchodzi się w lewo i w prawo, a większość ma mniejsze odnogi. Dwie gałęzie są czerwone jako silny sygnał: Konflikty, z notatką „równoległe edycje” i załącznikiem proof of concept, oraz Status synchronizacji, z notatką „co widzą użytkownicy” i załącznikiem z makietą. Linie ciągłe pokazują gałęzie zbadane. Linie przerywane pokazują gałęzie jeszcze niezbadane. Małe kółka z liczbami, takimi jak +2 i +3, pokazują zwinięte gałęzie. Nazwy tematu i gałęzi są przykładami.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-8/frame.html)

W ten sam sposób możemy omawiać i szybko iterować struktury baz danych, prymitywy czy cokolwiek innego, co warto zobaczyć z szerokiej perspektywy, z możliwością przybliżenia szczegółów.

Agenci mogą też pomagać nam zrozumieć produkt i funkcje, które zamierzamy zbudować, oraz podejmować decyzje na ich temat. W tym przypadku nie możemy jednak polegać wyłącznie na bazowej wiedzy modelu, a nawet sama baza kodu często nie wystarcza, bo brakuje w niej kontekstu potrzebnego do zrozumienia decyzji, które musimy podjąć. Dlatego w **S01E03** omawialiśmy systemy wiedzy: gdy już je mamy, możemy uruchomić kilku agentów z różnymi modelami, by wspólnie pracowali w T3 Code/Devin/Cursor lub Herdr nad dokumentem HTML przedstawiającym dostępne wybory.

W takich dokumentach możemy prosić agentów o użycie dobrze znanych narzędzi do podejmowania decyzji, takich jak **macierz wykonalności**, macierz Eisenhowera, drzewo decyzyjne czy analiza pre-mortem. Poniżej przykład, który przedstawia funkcje pod kątem ich wartości, złożoności i ryzyka, tak by my lub agent mogli zdecydować, którą wybrać, na podstawie dostępnych zasobów i szerszego kontekstu.

![Macierz wykonalności ze złożonością na osi poziomej i wartością na osi pionowej. Numerowany kwadrat oznacza każdą funkcję, a jego odcień pokazuje ryzyko. Pozycje i poziomy ryzyka to wartości przykładowe dla jednego scenariusza: prośby o integrację aplikacji z e-mailem i kalendarzem. 1 Integracja z e-mailem, 2 Integracja z kalendarzem i 3 Integracja z przeglądami PR mają niską złożoność i niską wartość. 4 Brama i adaptery ma większą złożoność, niewiele większą wartość i wysokie ryzyko. 5 Prymityw Subskrypcje, zaznaczony na czerwono, ma wysoką złożoność, wysoką wartość i średnie ryzyko. 6 Nowe źródło jako subskrypcja ma niską złożoność, wysoką wartość i niskie ryzyko, ponieważ jest zbudowane na 5.](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e01/artifacts/lesson/figure-6/frame.html)

Niewątpliwie mamy wiele narzędzi i możemy tworzyć nowe, idealnie dopasowane do naszych potrzeb. Ale dobry osąd nie polega na tym, by za pierwszym razem wszystko zrobić dobrze. Polega na decydowaniu, co zrobić dalej, tak aby odkryć jak najwięcej niewiadomych, efektywnie wykorzystując posiadane zasoby i ucząc się z tego, co już zrobiliśmy.

AI pozwala nam budować szybko, ale budowanie na produkcję nadal jest trudne, a zrobienie tego dobrze wymaga czasu. Jak prędzej czy później przekonamy się na własnej skórze, flota agentów pracujących dla nas niemal całą dobę przynosi nowe wyzwania, także takie, które nie są ściśle związane z agentami.

## Dźwignia

Prymitywy, odpowiedzialność, lepsza architektura, właściwe zarządzanie kontekstem, równoległi agenci i inżynieria produktu jako całość mogą nas zaprowadzić do miejsca, w którym rozwój przebiega szalenie szybko. Po **S01E05** wiemy też, że u podstaw wszystkiego innego leży dbanie o **środowisko, które pozwala agentom weryfikować własną pracę**.

Ale to wszystko może być bezużyteczne... jeśli zbudujemy niewłaściwą rzecz.

W książce [Getting Real](https://basecamp.com/gettingreal) jest świetny cytat: „*najlepsi projektanci i najlepsi programiści to nie ci z najlepszymi umiejętnościami czy najzwinniejszymi palcami (...), lecz ci, którzy potrafią określić, **co po prostu nie ma znaczenia.** Tam osiąga się prawdziwe zyski*”.

Ta książka została napisana w 2006 roku, ale ten fragment pozostaje aktualny i staje się jeszcze ważniejszy, bo dziś możemy szybko poruszać się w złym kierunku. I choć teraz łatwo jest po prostu usunąć kod, nie możemy łatwo wycofać rzeczy, które już trafiły do użytkowników, bo tu chodzi o **ich zaufanie.**

Dźwignia, której szukamy, zwłaszcza gdy chcemy przejść od pracy bezpośrednio z agentami do autonomicznego rozwoju, pochodzi z **dobrego ułożenia fundamentów**, takich jak:

- **Telemetria:** trudno ulepszać rzeczy, których nie mierzymy, a agenci muszą otrzymywać szczegółowe informacje o aktywności użytkowników i o wszystkim, co uznamy za przydatne dla nich.
- **Opinie użytkowników:** jeśli to możliwe, powinniśmy szukać bezpośredniego kontaktu z użytkownikami przez czat supportu, rozmowy lub spotkania osobiste. Niezwykle użyteczny kontekst pochodzi z analizy zgłoszeń błędów i próśb o funkcje, ale także z transkrypcji rozmów z ludźmi, którzy nigdy nie zostali naszymi klientami.
- **Kontekst biznesowy:** znalezienie właściwych prymitywów i ich właściwego kształtu wymaga głębokiego zrozumienia celów biznesowych, jego kierunku, wyzwań, a nawet wniosków z rynku.
- **Analityka produktowa:** telemetria nie jest jedynym źródłem cennych informacji o użytkownikach. Product managerowie mogą mieć wiedzę o profilach użytkowników, podobnych produktach lub szeroką perspektywę całego produktu.
- **Środowisko agenta:** wszystko, co omawialiśmy w **S01E05**, skonfigurowane na zdalnych maszynach lub w chmurze. Bez tego myślenie o autonomii trzeba odłożyć, dopóki kompletne środowisko i niezbędne szczegóły dające agentom swobodę nie będą na miejscu.
- **Laboratoria:** warto wyrobić sobie nawyk **tworzenia prostych laboratoriów** do zabawy pomysłami i iterowania koncepcji. Mogą to być aplikacje HTML i CSS, nad którymi pracujemy przez agentów. Dzięki temu szybko zrozumiemy funkcję, którą chcemy zbudować, i będziemy mogli dzielić się koncepcjami z innymi. Jest to podobne do artefaktów dostępnych na przykład w Claude, ale laboratorium jest wbudowane w aplikację, którą budujemy.
- **Kanał beta:** warto rozważyć kanały beta lub wersje nightly aplikacji, w których aktualizacje są częste, a funkcje mogą się pojawiać i znikać. Jest to szczególnie przydatne w fazie skalowania procesu rozwoju.

Innymi słowy, uzyskanie prawdziwej dźwigni wymaga, byśmy rozejrzeli się i zobaczyli, [co możemy zrobić z systemami](https://www.agentready.org/), zasobami i narzędziami, które już mamy, aby przygotować je zarówno na wyższe tempo, jak i na agentów, którzy będą z nich korzystać w imieniu użytkowników. I musi to obejmować nie tylko kontekst inżynierski, ale także szeroką perspektywę produktu.

Następnie, w zależności od produktu i biznesu, warto przynajmniej rozważyć odważne decyzje dotyczące roadmapy, które w niektórych przypadkach mogą obejmować zbudowanie zupełnie nowej wersji systemu. Ale częściej będziemy chcieli zaprojektować plan, który stopniowo, a potem nagle, przesunie produkt w stronę ery agentowej i autonomicznego rozwoju. I stąd właśnie będzie pochodzić prawdziwa dźwignia.

## Najważniejsze wnioski

Rozwijanie mentalności inżyniera produktu pomaga spojrzeć na nasze role znacznie szerzej, poza pisanie kodu, naprawianie błędów i implementowanie funkcji. Nawet jeśli organizacja, w której pracujemy, nie jest jeszcze gotowa na tę zmianę, w naszym interesie jest zacząć patrzeć na swoją pracę z szerszej perspektywy. Pozwoli nam to zobaczyć, że **autonomiczny rozwój to nie koniec naszej pracy. To kolejny rozdział.**

Inżynieria produktu jako rola nie jest nowa i istnieje wiele książek na ten temat, które warto przeczytać. Jedną z nich jest wspomniane już **[Getting Real](https://basecamp.com/gettingreal)**, a inne to **[Empowered](https://www.goodreads.com/book/show/53481975)**, **[The Mom Test](https://www.goodreads.com/book/show/52283963)** i **[Shape Up](https://www.goodreads.com/en/book/show/50776459-shape-up)**. Przeczytałem je wszystkie i choć powstały przed „erą ChatGPT”, nadal niosą cenne lekcje dla nas, inżynierów.
