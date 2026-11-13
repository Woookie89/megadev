# S03E04 · Weryfikacja rezultatów produktu

Skalowanie wieloagentowego rozwoju i popychanie go w stronę autonomii bez wcześniejszego zbudowania zaufania nie zadziała i należy tego unikać, nawet jeśli oznacza to spowolnienie rozwoju na jakiś czas. Trzeba jasno powiedzieć, że **agenci chętnie i szybko zbudują niewłaściwe rzeczy**. Obejmuje to odpływanie od wymagań, ale też kończenie pracy za wcześnie lub za późno. Co więcej, w wielu przypadkach takie zachowanie nie będzie w gruncie rzeczy błędne. Po prostu nie będzie zgodne z naszymi oczekiwaniami i procesami specyficznymi dla naszego produktu.

Podobnie jak w innych obszarach rozwoju produktu AI-native, weryfikacja rezultatów również musi w dużej mierze opierać się na agentach. Ale w zależności od naszych preferencji i cech produktu możemy zbudować weryfikację wokół mechanizmów, które pozwolą nam **zrozumieć i zobaczyć rezultaty**.

Gdy zrobimy to dobrze, agenci mogą udzielić cennej pomocy nawet przy najbardziej krytycznych częściach systemu, w których często nie czujemy się komfortowo z wdrażaniem jakichkolwiek zmian. Umożliwia to też refaktoryzacje, które bez AI by się nie wydarzyły ze względu na ich złożoność i ryzyko, że coś się zepsuje.

Ostatnia rzecz, którą warto wiedzieć przed startem: wiele działań, które możemy rozważyć przy weryfikacji rezultatów produktu, można zaprojektować **wyłącznie** z myślą o agentach. Oznacza to, że notatki, artefakty, dowody, narzędzia, a nawet całe moduły mogą powstawać tylko dla nich. Warto o tym pamiętać, bo nie zawsze jest to oczywiste.

## Plan

- Akceptacja: definicja ukończenia, pokrycie wymagań, obserwowalne zachowanie, dowody ukończenia
- Weryfikacja: testy regresji, testy w przeglądarce, syntetyczne scenariusze, agenci-recenzenci, kontrole deterministyczne
- System diff: zmiany w zachowaniu, doświadczeniu użytkownika, danych, architekturze, złożoności, operacjach
- Przegląd: kod, architektura, UX, dostępność, bezpieczeństwo, wydajność, utrzymywalność
- Bramki jakości: progi pewności, blokery wydania, znane ryzyka, gotowość do wycofania, zatwierdzenie przez człowieka

## Akceptacja

W lekcji **S03E02** omówiliśmy koncepcję **ustalenia** zawieranego **przed rozpoczęciem pracy**. Gdy takie ustalenie istnieje, akceptacja wydaje się prosta. Problem w tym, że nawet jeśli agent odwołuje się do ustalenia i raportuje, że zadania są skończone, nie oznacza to, że opisana tam praca została faktycznie dostarczona. Co więcej, agent może nas **oszukać**, generując dowody zamiast je rejestrować.

Pytanie brzmi więc: **czego potrzebujemy, żeby zaakceptować skończoną pracę?**

Odpowiedź nie jest oczywista, bo to, czego szukamy, musi być **uogólnione** i **dynamiczne**, a jednocześnie musi uwzględniać specyfikę każdej funkcji oraz możliwości i ograniczenia modelu, harnessu i narzędzi, które możemy zbudować.

Wiemy już, że potrzebny jest zestaw **zasad**, którymi agent będzie się kierował, ale tutaj musimy też zadbać o **aspekt deterministyczny**. To podchwytliwe, bo przed wdrożeniem dążymy do jak najwyższego poziomu pewności, ale jednocześnie chcemy uniknąć złożonego procesu przeglądu przy najprostszych zmianach.

![Wykres przedstawiający szansę, że praca jest poprawna, w zależności od nakładu pracy. Krzywa rośnie stromo i spłaszcza się poniżej przerywanej linii z etykietą Pewne. Cztery szare kropki na krzywej mają etykiety: Kontrole, Zarejestrowany dowód, Osobny recenzent i Człowiek zatwierdza. Trzy czerwone przerywane linie stopu przecinają krzywą na rosnących wysokościach: Składa (mała poprawka, używa tego, co istnieje), Rozszerza (zmienia istniejące zachowanie) i Drzwi jednokierunkowe (nowy prymityw, dane, pieniądze). Nawias z etykietą „Więcej wysiłku, mały zysk” zaczyna się przy stopie Składa i obejmuje płaską część krzywej. Pusty okrąg przy nakładzie Rozszerza, poniżej linii Drzwi jednokierunkowe, ma etykietę „Zaakceptowane za wcześnie”. Przekreślony okrąg blisko linii Pewne, niepołączony z krzywą, ma etykietę „Agent mówi, że gotowe”. Pod wykresem siatka pokazuje, z których z dziewięciu rodzajów dowodów korzystają cztery przykładowe zmiany. Poprawka literówki na stronie (Składa) używa Kontroli oraz Przed i po. Naprawa webhooka (Rozszerza) używa Kontroli, Testów, Prawdziwych żądań i Osobnego recenzenta. Przeprojektowanie menu mobilnego (Rozszerza) używa Kontroli, Pomiarów, Przed i po, Nagrań i Osobnego recenzenta. Migracja danych płatności (Drzwi jednokierunkowe) używa Kontroli, Testów, Prawdziwych żądań, Rekordów danych, Osobnego recenzenta i Zatwierdzenia przez człowieka. Nawias oznacza dwa wiersze Rozszerza: to samo ryzyko, inne dowody. Przerywana pigułka wyraża zasadę: dopasuj dowody do ryzyka i rodzaju zmiany i rejestruj je z prawdziwego buildu.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-1/frame.html)

Wspomniałem, że akceptacja w dużej mierze zależy **od ustalenia** (z S03E02), które zawieramy przed rozpoczęciem pracy. Zanim agent skończy zadanie, powinien już wiedzieć, co zrobić z weryfikacją i dowodami. **Ale agenci potrzebują pewnej elastyczności**, bo w międzyczasie zakres może się trochę zmienić.

Gdy ukształtujemy ustalenie, większość brakujących narzędzi i wiedzy o weryfikacji powinna wyjść na jaw. Ale nie zawsze tak się stanie i musimy wyłapywać przypadki, w których tak nie jest. Możemy to zrobić na dwa sposoby: **albo agenci nam to powiedzą**, albo **zostanie to odkryte podczas zaplanowanych kontroli**. Możemy też użyć obu.

W efekcie agent może dodać dla nas w pull requeście podsumowanie, takie jak to:

![Tabela pokazuje jedno przykładowe ustalenie dla menu mobilnego w trzech fazach: Ustalenie, Praca i Akceptacja. Jest sześć kryteriów i każde zachowuje swój wiersz. Cztery kryteria mają zarejestrowane dowody i dostają znak wyboru. „Działa z klawiaturą” nie ma zarejestrowanego dowodu. Dostaje krzyżyk z etykietą „Brakujące narzędzie”. W trakcie pracy dodano „Brak nakładania się na tablecie” i usunięto „Animowane otwieranie”. Każda zmiana ma dymek „Zgłoszone”. Znacznik „Koniec sesji” stoi między Pracą a Akceptacją.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-2/frame.html)

## Weryfikacja

W poprzednich lekcjach wspomnieliśmy większość rodzajów strategii weryfikacji i narzędzi, które pozwalają agentom zbierać dowody i potwierdzenia oraz faktycznie widzieć rezultaty swojej pracy, nie tylko przez kod. W razie potrzeby wróć do **S03E03** i jego sekcji „Informacja zwrotna”, która omawia, **jak trzeba dostosować nasz system do agentów**.

Co dokładnie to oznacza, zależy od produktu, stosu technologicznego, poziomu autonomii, który chcemy osiągnąć, a nawet od potrzeb biznesowych. Dobra wiadomość jest taka, że **agenci mogą zbudować dla nas wszystko.** Trudność polega na tym, że **musimy im powiedzieć, co zbudować**, a raczej **musimy pomóc im to ustalić**. Ponieważ nie ma uniwersalnego sposobu myślenia o tym, jako przykładu użyjemy jednego z moich projektów.

Dla kontekstu: **aplikacja to współdzielone środowisko uruchomieniowe z dwoma cienkimi klientami, desktopowym i webowym**, które dzielą niemal cały kod. Jej środowisko uruchomieniowe może działać w całości na urządzeniu użytkownika albo w chmurze. Architektura wygląda następująco:

![Diagram. Po lewej jest pudełko o nazwie Agent. Szara linia z etykietą „Zadanie” prowadzi od Agenta do „Narzędzi laboratorium” (Uruchom, steruj, oceń). Narzędzia laboratorium są w przerywanej ramce o nazwie „Laboratorium, tylko dla agentów”. W tej ramce linia z etykietą „Zapisuje” prowadzi w dół od Narzędzi laboratorium do „Zapisów uruchomień” (Zrzuty ekranu, logi, oceny). Gruba czerwona linia z etykietą „Używa jak użytkownik” prowadzi od Narzędzi laboratorium do „Interfejsu” (Desktop i web). Interfejs jest w ciągłej ramce o nazwie „Aplikacja, którą dostają użytkownicy”. W tej ramce linia prowadzi w dół od Interfejsu do „Środowiska uruchomieniowego” (Na urządzeniu lub w chmurze). Przerywana linia z etykietą „Dowody” prowadzi od Zapisów uruchomień z powrotem do Agenta.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-3/frame.html)

Jak pokazuje diagram, agent ma **„laboratorium agentowe”**. To głównie zestaw skryptów CLI, które pozwalają mu **używać przeglądarki** do testowania wersji webowej albo **uruchamiać instancję aplikacji desktopowej**. Dostępne narzędzia pozwalają mu klikać, pisać, załączać pliki, robić zrzuty ekranu i nagrywać krótkie filmy. Wyniki tych interakcji trafiają do tymczasowego folderu.

Brzmi to prosto, ale cała rzecz tkwi w szczegółach:

- Jest limit liczby przeglądarek lub instancji, które mogę mieć w danym momencie otwarte do debugowania, bo CPU i RAM się wyczerpują, zwłaszcza podczas testów, lintowania i kompilacji (w moim przypadku Rust).
- Każda instancja dostaje własne konto i przestrzeń roboczą, więc agenci sobie nie przeszkadzają. Mogą wybierać ziarna (seeds) profili, by testować różne konfiguracje. Jest też specjalny tryb do testowania procesu autoryzacji [Clerk](https://clerk.com/) i funkcji związanych z synchronizacją w chmurze.
- Jest ujednolicony interfejs logowania, więc agenci mogą mierzyć wszystko, co dotyczy przepływu danych, interfejsu użytkownika i wydajności.
- Aplikacji desktopowej nie da się testować na VPS-ie. Nie może też działać bezpośrednio na moim laptopie, bo kradłaby fokus okien, przerywała mi pisanie i tak dalej. Działa więc wewnątrz [VMPal](https://vmpal.com/?lang=en).
- Laboratorium używa klipów z przeglądarki i klipów z Maca do nagrywania krótkich filmów.
- Niektóre działania, zwłaszcza te, które wywołują API LLM, są „udawane”, żeby nie wydawać pieniędzy na testy skupione na interfejsie, które inaczej wysyłałyby prawdziwe żądania. Jest też tryb na żywo, który używa prawdziwego klucza API, ale z limitami wydatków i ograniczoną liczbą działań.
- Agenci mogą pisać **skrypty** automatyzujące powtarzalne kontrole, w tym raporty z tych kontroli. Ważna uwaga: te skrypty trzeba co jakiś czas przeglądać i porządkować.
- Niektóre działania zależą od platformy i agent-recenzent o tym wie, więc nie zgłasza ich jako problemów.
- Są też twarde limity: agenci nie mogą dotykać mojego środowiska deweloperskiego, mojej przestrzeni roboczej ani niczego związanego z instancjami, z którymi pracuję. Jednocześnie ja mam dostęp do trybu debugowania dostępnego dla moich ręcznych testów i interakcji.
- Wszędzie, gdzie to możliwe, agenci mają **zablokowane** działania, których nie da się cofnąć, takie jak wysyłanie e-maili.

Powyższa lista z grubsza dotyczy każdej aplikacji, bo większość projektów ma podobne wyzwania i potrzeby. Tym, co różni się między aplikacjami, są zmiany architektoniczne, które musimy wprowadzić w samej aplikacji, tak by laboratorium było **bezpośrednio połączone z modułami** i wiernie odzwierciedlało faktyczne interakcje. Tak czy inaczej, stworzenie **laboratorium agentowego** nie zawsze jest łatwe i nie jest pracą jednorazową, bo laboratorium musi ewoluować, a jego funkcje trzeba utrzymywać. Tu wkraczają **rutyny w tle**, które przeglądają historię zadań.

![Dwa wiersze w ramkach, każdy czytany od lewej do prawej w czterech wyrównanych kolumnach. Górny wiersz, „Po każdym zadaniu”: PR trafia do repozytorium, potem Warto się przyjrzeć? (zaznaczone na czerwono, z przerywaną linią w dół do „Nie: pomiń”), potem Przeczytaj historię zadania, potem Problemy z laboratorium: Niejasne zadanie, Brakujące narzędzie, Trudne w użyciu. Dolny wiersz, „Raz w tygodniu”: Agent w chmurze, potem Przeczytaj wszystkie zadania (historie i problemy z laboratorium), potem Zmiany: Scal podobne narzędzia, Wycofaj nieużywane narzędzia, Oskryptuj ręczne kontrole, Przyspiesz wolne kroki, potem Pull request (My zatwierdzamy).](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-4/frame.html)

Jeśli nie masz jeszcze żadnych rutyn, możesz je utworzyć w Grok Bocie, Cursorze lub Devinie, w zależności od swojej konfiguracji. To tylko kilka przykładów harnessów z funkcjami automatyzacji. Claude Code również oferuje [rutyny w chmurze](https://code.claude.com/docs/en/routines), które mogą działać według harmonogramu albo być wyzwalane wywołaniami API i zdarzeniami GitHuba. Ale jak zawsze mądrze jest zacząć od małej skali i iterować. Stworzenie nowej rutyny jest łatwe, ale zrobienie dobrej to wyzwanie.

Jedna uwaga o rutynach: **proś agentów, by zawsze śledzili, które rutyny są aktywne i gdzie zostały aktywowane**. Nie ma nic gorszego niż widok wyzwalającej się rutyny, o której nikt nie wie, skąd się wzięła.

Ponadto wszystkie dowody zbierane przez agentów muszą być odpowiednio uporządkowane. To proste, bo odpowiedzialni za ich przechowywanie będą agenci, ale trzeba ich o to poprosić. W przeciwnym razie dowody wylądują w wielu różnych miejscach, przez co trudno będzie je znaleźć, a łatwo usunąć.

## System diff

Pojedynczy agent może wygenerować tyle kodu, że trudno nam za nim nadążyć. Gdy pracuje dla nas zespół agentów, nie ma szans, by śledzić zmiany. Laboratorium agentowe może pomóc zweryfikować wiele aspektów przed wdrożeniem, ale nie oznacza to, że wszystko zostało zaimplementowane tak, jak chcieliśmy. Zawsze musimy pamiętać, że **zwiększamy szansę** na uzyskanie potrzebnych rezultatów, a nie je gwarantujemy.

Pytanie brzmi więc teraz: **co możemy zrobić, by nadążać za zmianami na tyle dobrze, by podejmować dobre decyzje** dotyczące rezultatów i tego, co nadchodzi.

Można do tego podejść na wiele sposobów, ale najlepszy jest bez wątpienia ten dopasowany do naszych preferencji, rodzaju wykonywanej pracy i naszego projektu. Dlatego warto pomyśleć o:

- **Celu:** „system diff” może oznaczać różne rzeczy. Może to być przegląd architektury, który mówi nam, czy kierunek jest poprawny, diff kodu wyróżniający najbardziej krytyczne części logiki albo interaktywny dashboard, który pozwala zobaczyć zmiany.
- **Formacie:** mogą to być tabele, wykresy, grafy, zrzuty ekranu, filmy lub pliki audio. Zasadniczo przyjmuje on formę HTML lub Markdownu z komponentami.
- **Treści:** dobry system diff często szuka równowagi między szeroką a wąską perspektywą albo zawiera obie i pozwala przełączać się między nimi. Jego głównym celem jest osiągnięcie jak najlepszego stosunku **sygnału do szumu** przy zachowaniu wystarczającego kontekstu, abyśmy mogli szybko zrozumieć, co się dzieje.

Mając to na uwadze, możemy poprosić agentów o przejrzenie naszych ostatnich PR-ów i historii pracy z agentami, a następnie o przygotowanie pierwszej wersji skilla do tworzenia system diffów.

![Dwie kolumny. Po lewej proces z góry na dół: czerwona ramka o nazwie „My wybieramy” zawiera Cel (kierunek, logika lub dashboard), Format (tabele, wykresy, zrzuty ekranu) i Treść (sygnał ponad szumem). Następnie „Agenci przeglądają” (ostatnie PR-y i naszą historię) i „Skill” (pierwsza wersja). Linia z etykietą „Tworzy” prowadzi od Skilla do strony po prawej o nazwie „System diff dla jednego PR-a”. Strona ma pięć wierszy: Odpowiedź, Decyzje (a. Rekomendowana, b. Inna opcja), Mapa (pięć małych kwadratów połączonych liniami, dwa pełne i trzy blade), Przed i po oraz Pliki i linie (otwierają się po kliknięciu). Strzałka obok wierszy prowadzi od Szerokiego w dół do Wąskiego. Pod stroną jest „My decydujemy” (tylko tak głęboko, jak trzeba). Przerywana linia z etykietą „Co pominął” prowadzi od My decydujemy z powrotem do Skilla.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-5/frame.html)

Patrząc na powyższy diagram, możemy przypomnieć sobie **mapy funkcji** omówione w **S03E03**, które pomagały agentom poruszać się po systemie i podejmować lepsze decyzje. Teraz przydają się też do tworzenia system diffów.

Dla przykładu: moje system diffy często mają postać plików .html lub .svx. Jeden z nich możesz zobaczyć [tutaj](https://cloud.overment.com/skills-96b61c0-3e0cbc9-v030-1793120375.html) (to tylko demo). Powstał za pomocą skilla [/system-diff](https://github.com/overment/skills/tree/main/skills/system-diff), który ciągle rozwijam. Gdy tylko system diff przychodzi, agenci czasem mają pozwolenie, by **otworzyć go w mojej przeglądarce**. Wtedy używam [Superwhisper](https://superwhisper.com/) (dowolna alternatywa też zadziała), by nagrać swobodną notatkę głosową z moimi komentarzami do dokumentu.

![Trzy kolumny. Po lewej: Agent pisze system diff, a pod „Potem” przełącza na 1b, zostawia 2a, nagrywa listę na telefonie i aktualizuje system diff. Pośrodku: jedna strona o nazwie „System diff” z odpowiedzią i dwiema ponumerowanymi decyzjami z opcjami oznaczonymi literami, gwiazdką przy każdej rekomendowanej opcji i przerywaną linią „Pierwszy ekran”; pod nią blade Mapa, Części i Pliki, „Tylko w razie potrzeby”. Po prawej: moja notatka głosowa jako czerwona fala dźwiękowa z cytatem „Idź z 1b. 2a jest ok. Czemu lista skacze na telefonie?”. Linie: od Agenta do strony, „Otwiera w mojej przeglądarce”; od strony do notatki głosowej, „Czytam, potem mówię”; przerywana linia „Transkrypcja” z powrotem do listy Agenta. Zmiana, opcje i cytat są przykładami.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-6/frame.html)

Dobry przykład pull requesta, który wydobywa najważniejsze szczegóły zmian, pochodzi z [repozytorium Matta](https://github.com/mattpocock/course-video-manager/pull/2399). Zawiera **podsumowanie** skupione na najważniejszych zmianach, **dowody** pokazujące „przed i po” oraz sekcję **zagrożeń przy merge'u**, która zwraca naszą uwagę na potencjalne problemy.

System diffy mogą być przydatne nie tylko dla nas, ale też dla naszych agentów, bo AI potrafi wyłapać w nich wiele potencjalnych problemów, zwłaszcza gdy porównuje je z wizją produktu lub podobnymi dokumentami opisującymi kontekst w długim horyzoncie. Agenci mogą też brać pod uwagę historyjki użytkowników i syntetyczne ścieżki, które mogą ujawnić luki, konflikty lub okazje do ulepszeń.

## Przegląd

Nawet jeśli przestaniemy patrzeć na kod, nie znaczy to, że powinniśmy przestać o niego dbać, zwłaszcza jeśli chodzi o organizację, spójność, złe wzorce, wydajność i problemy z bezpieczeństwem. Wszystkim tym można, i należy, zająć się z pomocą agentów. Dobrym przykładem jest [ten pull request](https://github.com/kody-hq/kody/pull/2931), który ma komentarze od [Bugbota](https://cursor.com/docs/bugbot), [CodeRabbita](https://www.coderabbit.ai/) i [Devina](https://devin.ai). Mimo to nasza własna aplikacja również może obsługiwać takie przeglądy (omawialiśmy to w **S01E05**).

Choć dzisiejsze modele radzą sobie bardzo przyzwoicie z ogólnymi przeglądami i ulepszeniami kodu, łatwo zauważyć, że często **naciskają za mocno albo za słabo**. Ponadto, ponieważ przeglądy wykonują **osobni agenci**, zmiany wprowadzone przez jednego agenta mogą łatwo zostać nadpisane przez innego. Wszystkie te problemy można rozwiązać właściwym kontekstem, który zawiera **zasady** i **źródła**, ale też **granice**, takie jak **macierz wykonalności** wspomniana w **S03E01**. Poniżej przykład przepływu przeglądu, jaki możemy mieć.

![Oś czasu jednej zmiany przeglądanej przez agentów, od „Zmiana gotowa” przez „Rundę 1” i „Rundę 2” do „Merge”. Ma cztery ścieżki: Agent-autor, Recenzenci, Inni agenci i Człowiek. W Rundzie 1 recenzent bezpieczeństwa stwierdza, że dane wejściowe nie są sprawdzane (etykieta: Zasada: najpierw użytkownicy i dane), a agent-autor poprawia sprawdzanie danych wejściowych. Recenzent kodu zostawia zmianę nazwy jako notatkę (etykieta: Źródło: inny agent to edytuje), z przerywaną linią do innego agenta, który edytuje ten sam plik. W Rundzie 2 recenzent danych stwierdza, że migracja jest jednokierunkowa (etykieta: Granica: drzwi jednokierunkowe), a człowiek zatwierdza migrację. Recenzent stylu odrzuca drobne uwagi (etykieta: Granica: ostatnia runda). Następnie agent-autor wykonuje merge. Uwagi, obszary i liczba rund są przykładami.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-7/frame.html)

Etap przeglądu może obejmować działania wykraczające poza kod. Agentów można poprosić o:

- **Synchronizację:** w **S01E03–S01E05** wspominaliśmy, że agenci mogą dbać o dokumentację i bazę wiedzy. Etap przeglądu to dobre miejsce na to, bo zmiany są już zaakceptowane i można je odzwierciedlić na stronie produktu lub w wewnętrznej bazie wiedzy. Aktualizacje mogą obejmować nie tylko tekst, ale też obrazy, animacje i interaktywne komponenty.
- **Wnioski:** po każdym działaniu agenci mogą aktualizować powiązane notatki i otrzymywać je w przyszłych uruchomieniach. W ten sposób mogą się doskonalić i zmniejszać ryzyko powtarzania tych samych błędów.
- **Komunikację:** informacje o nowych funkcjach można przekazywać zespołom marketingu i sprzedaży, dając im kontekst do mediów społecznościowych, newsletterów czy działań sprzedażowych. A jeśli o funkcję lub poprawkę prosili konkretni klienci lub użytkownicy, nasz zespół może zostać powiadomiony, co daje nam szansę na zmniejszenie wskaźnika churn (odsetka użytkowników, którzy przestają korzystać z produktu w danym okresie) lub na upsell.
- **Sprawdzenie rezultatu:** agenci mogą tworzyć nowe harmonogramy do monitorowania nowej funkcjonalności na produkcji albo do jej przeglądu po pewnym czasie, abyśmy mogli zobaczyć, jak funkcja została przyjęta.
- **Ulepszenia:** przegląd może skupiać się na badaniu, jak można ulepszyć funkcję, a to badanie może sięgać daleko poza produkt, w wiedzę o rynku, alternatywne narzędzia, biblioteki i tak dalej.

Podobne pomysły możemy burzyć mózgów z agentami i w zespole. Ale główna idea polega na tym, by myśleć o dźwigni, jaką możemy uzyskać dzięki agentom pracującym w tle. Dobrze wykonane, te działania mogą drastycznie poprawić jakość całego produktu, a jak pokazuje przykład z churnem i upsellem, wpłynąć także na wyniki biznesowe!

## Bramki jakości

Choć zmiany mogą zostać zablokowane na etapie **akceptacji** lub **przeglądu**, warto też rozważyć pewne ścisłe reguły lub zasady. Podkreślam tu **reguły**, nie zasady, bo musimy zdecydować, ile swobody dać agentowi. W rzeczywistości wiele (jeśli nie wszystkie) z naszych bramek jakości powinno być deterministycznych.

Przykładem bramki jakości jest [przepływ validate](https://github.com/kody-hq/kody/blob/main/.github/workflows/validate.yml), który Kent zbudował dla swojego projektu. Gdy otworzymy [przykładowe uruchomienie](https://github.com/kody-hq/kody/actions/runs/40680588304), zobaczymy około 30 kontroli specyficznych dla jego projektu, obejmujących:

- formatowanie za pomocą [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
- lintowanie za pomocą [oxlint](https://oxc.rs/docs/guide/usage/linter)
- kontrole TypeScriptu
- próbne uruchomienia Wranglera (część stosu Cloudflare)
- npm audit do kontroli zależności
- testy w [Vitest](https://vitest.dev/)
- testy jednostkowe workerów (z @cloudflare/vitest-plugin)
- testy e2e w przeglądarce z Playwrightem
- tsx --test do testów CLI

Ale to nie wszystko, bo jest mnóstwo **[własnych skryptów](https://github.com/kody-hq/kody/tree/main/tools)** do sprawdzania prymitywów, map funkcji, rozjazdu dokumentacji i nie tylko. Wszystko to działa na GitHub Actions i [WarpBuild](https://www.warpbuild.com/), który przyspiesza proces. Cała bramka jakości wygląda następująco:

![Bramka jakości. Każdy pull request uruchamia obok siebie sześć grup kontroli: testy jednostkowe, testy środowiska serwerowego, testy w przeglądarce, testy narzędzi agentów, narzędzie wiersza poleceń i kontrole statyczne. Końcowa kontrola czeka na wszystkie: jeśli wszystkie przejdą, zmianę można zmergować; jeśli jedna zawiedzie, zmiana jest zablokowana. Poniżej kontrole statyczne obejmują sześć popularnych narzędzi i sześć reguł domowych. Druga ramka pokazuje, co utrzymuje bramkę użyteczną: komentarz, który recenzent powtórzy dwa razy, staje się nową regułą domową, a co noc agent usuwa słabe testy, więc testy pozostają szybkie.](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e04/artifacts/lesson/figure-8/frame.html)

Już samo spojrzenie na powyższy diagram i zastanowienie się nad naszymi projektami powinno dać nam pierwsze pomysły na to, co chcielibyśmy uwzględnić. Świetnym ćwiczeniem jest też pobranie repozytorium i rozmowa z agentem o **[narzędziach](https://github.com/kody-hq/kody/tree/main/tools)** i ich konfiguracji. Po rozmowie możemy poprosić agenta o przejrzenie naszego projektu i zasugerowanie najważniejszych bramek jakości, które warto ustawić.

## Najważniejsze wnioski

Ta lekcja powinna nam pokazać, że zbudowanie procesu wokół weryfikacji rezultatów produktu może podnieść jakość całego produktu, a nasza praca może pozytywnie wpłynąć na inne obszary biznesu, ale przede wszystkim na użytkowników.

Jasne jest też, że proces musi być zoptymalizowany pod oprogramowanie, które budujemy, i sposób, w jaki pracujemy. I choć dziś omówiliśmy wiele aspektów, które warto rozważyć, nie zaleca się pośpiesznego budowania tego wszystkiego naraz. Zbudowanie choćby kilku elementów, i to dobrze, jest dobrym początkiem, bo pokaże nam, jak bramka się zachowuje i czy daje wystarczającą wartość, czy wymaga poprawek.

Gdy się nad tym zastanowimy, weryfikacja rezultatów produktu za pomocą omówionych dziś przepływów pracy jest tylko częściowo wyzwaniem technicznym, bo wymaga też **wzięcia odpowiedzialności za rezultat**, a to prowadzi nas do **sposobu myślenia inżyniera produktu**.
