# S01E02 · Sterowanie modelami za pomocą kontekstu

Wiemy już, że jakość wyników LLM-a w dużej mierze zależy od dostępnego mu kontekstu: **od tego, co ma już w pamięci roboczej i do czego może łatwo uzyskać dostęp.** Jest jednak też druga strona medalu: **ile kontekstu sami przechowujemy w głowie, pracując z agentami.**

## Plan

- Uprząż: co widzi agent, AGENTS.md, pamięć, konfiguracja, rozszerzenia, hooki, samodoskonalenie
 - Kontekst: zarządzanie kontekstem, limity kontekstu, optymalizacje uprzęży, uwaga, stosowanie się do instrukcji, brakujący kontekst, krótkie wątki, strefa dobrej skuteczności
 - Umiejętności: nazwa i opis, wybór, zakres, długość, umiejętności routera, zasady, dynamiczne zasoby, kotwice semantyczne, samodzielne sterowanie, generowanie
 - Narzędzia: natywne i niestandardowe, odkrywanie, żądania, prompt injection, wyniki, duże wyniki, wskazówki, błędy
 - Podagenci: narzędzia, rozwidlenia wątków, ustawienia, szablony, umiejętności a podagenci, wykonawcy, orkiestracja

Agent potrzebuje czasu, by dokończyć zadanie. Uruchamiamy więc kolejnego, a potem jeszcze jednego. Nagle bez przerwy przełączamy się między agentami, podejmujemy mnóstwo decyzji i próbujemy nadążać za tym, co się dzieje. Szybko odbiera nam to energię, więc zaczynamy akceptować wszystko, co sugerują agenci. Ponieważ brakuje im kontekstu i dobrego zrozumienia tego, co budujemy, szybko otrzymujemy kiepskie rezultaty. Poświęcamy jeszcze więcej czasu na ich poprawianie, ale rzadko to pomaga. Frustrujemy się i często wracamy do starych sposobów tworzenia oprogramowania.

![Trzy okna agentów: Agent A, Agent B i Agent C, każde zadaje jedno pytanie temu samemu programiście. Przykładowe pytania: „Czy zachować aktywne sesje?”, „Usunąć stare rekordy?” oraz „Zmienić test czy kod?”. Programista jest zaznaczony na czerwono, ponieważ każda decyzja czeka na tę jedną osobę.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-1/frame.html)

W takim kontekście myślenie o autonomicznym tworzeniu oprogramowania i dostarczaniu go w wysokiej jakości wydaje się niedorzeczne. Dlatego dziś szczegółowo poznamy kontekst, mechanizmy i wzorce, które mogą pomóc nam uzyskiwać znacznie lepsze wyniki przy mniejszym obciążeniu poznawczym. Dzięki lepszemu zrozumieniu kontekstu możemy skupić się na tym, co ważne.

## Personalizacja uprzęży

Ponieważ na początku sesji LLM-y nic o nas ani o naszym projekcie nie wiedzą, chcemy, by automatycznie uzyskiwały przynajmniej ogólne zrozumienie kontekstu. Większość uprzęży obsługuje obecnie plik `AGENTS.md`, który **jest wczytywany na początku każdej rozmowy**. Szerzej rzecz ujmując, system plików i pliki tekstowe można traktować jako **podstawowe elementy** zarządzania kontekstem. Pliki tekstowe często służą do zarządzania sesjami i przechowywania większości ustawień uprzęży. Ponieważ agenci mogą edytować te pliki, mogą też zmieniać własne ustawienia.

Warto wiedzieć, że uprząż często robi o wiele więcej niż tylko wczytuje jeden plik. Model musi mieć możliwość poznania z góry wszystkich funkcji, by móc poruszać się po dostępnych możliwościach i rozumieć środowisko.

Poniżej znajduje się uproszczona wizualizacja **tego, co widzi Claude Code**: prompt systemowy, informacje o środowisku, MEMORY.md, wczytane i odroczone narzędzia, umiejętności, agenci oraz dynamiczne przypomnienia wstawiane w trakcie interakcji.

![Uproszczony, poglądowy przykład kontekstu Claude Code, czytany od góry do dołu w czterech sekcjach: prompt systemowy, możliwości, rozmowa i limit kontekstu. Każdy wiersz znajduje się w jednej z dwóch kolumn: „Dodaje uprząż” albo „Ty i model”. Trzecia kolumna pokazuje poziom zaufania: reguły, żądania, wskazówki lub wyłącznie dane. Prompt systemowy i możliwości pochodzą z uprzęży i są przekazywane przed pierwszą wiadomością. W trakcie rozmowy elementy dodane przez uprząż, takie jak system-reminders, wyniki narzędzi, wyjście hooków, treść umiejętności i raporty agentów, pojawiają się między wiadomościami użytkownika a wywołaniami asystenta. system-reminder wstawiony w środku tury jest czerwony. Po osiągnięciu limitu kontekstu podsumowanie starszych tur trafia do kolejnego okna. Kolejność wierszy rozmowy to przykładowa tura.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-2/frame.html)

Powyższa wizualizacja wyraźnie pokazuje, że **pod maską dzieje się naprawdę dużo**. Co ważne, nie jest to tajemna wiedza — możemy po prostu **poprosić agenta** [o wyjaśnienie, jak postrzega naszą interakcję](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/context-self-report). Dzięki temu możemy kształtować przepływ pracy, a nawet **doskonalić go z czasem**. Zacznijmy jednak od początku.

Większość uprzęży i narzędzi agentowych pozwala konfigurować następujące elementy:

- **Podstawowy plik:** AGENTS.md jest często wczytywany na początku interakcji. Zawiera ogólny kontekst i przydatne omówienie projektu, a także może odsyłać do dokumentów opisujących moduły lub funkcje, których nie da się wywnioskować z samego kodu. Może zawierać również preferencje, na przykład konwencje i reguły specyficzne dla projektu. Warto pamiętać, że [AGENTS.md pomaga agentom, ale nie gwarantuje, że będą przestrzegać każdej reguły.](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/agents-md-onboarding)
- **Pamięć:** Można ją zaimplementować na wiele sposobów. Nawet jeden agent może dysponować wieloma sposobami przechowywania różnych rodzajów pamięci dostępnych także w kolejnych wątkach. Wspomnienia często są wyodrębniane automatycznie w trakcie interakcji albo na wyraźną prośbę użytkownika.
- **Konfiguracja:** Większość uprzęży dąży do samoobsługowej konfiguracji, więc agenci mają dostęp do ustawień i dokumentacji. Możemy dzięki temu **rozmawiać z agentem o nim samym** i znajdować najlepsze dla siebie ustawienia. W pewnym momencie agent może też sam zdecydować, które ustawienia najlepiej pasują do danego zadania, i odpowiednio je zmienić. Warto o tym pamiętać, bo nasz przepływ pracy staje się bardziej dynamiczny niż kiedykolwiek.
- **Baza wiedzy:** Często jest to zbiór plików niezwiązany ściśle z konkretną uprzężą. Zawiera informacje o produkcie i procesach, dzięki którym agent może lepiej pracować i podejmować trafniejsze decyzje. Przydaje się także użytkownikom, ich agentom i innym członkom zespołu, zwłaszcza gdy użyjemy Astro lub Next do przekształcenia dokumentów w witrynę.
- **Umiejętności**, o których wspominaliśmy, to foldery zawierające plik SKILL.md oraz opcjonalne skrypty opisujące agentom konkretny proces. Są wczytywane podczas interakcji i stanowią jeden z najbardziej elastycznych sposobów **kształtowania zachowania agenta** zgodnie z naszymi preferencjami. Ponieważ umiejętności to często zwykłe pliki, mogą odsyłać do innych umiejętności, które agent może zdecydować się wczytać. Możemy też mieć „umiejętności tworzenia umiejętności”, dzięki którym agenci mogą dynamicznie się „uczyć”.
- **CLI / MCP:** Omówimy je później, ale oba rozwiązania rozszerzają możliwości agenta i pozwalają mu wchodzić w interakcje ze światem zewnętrznym.

Ponadto niektóre uprzęże pozwalają nam **zarządzać ich instancjami**, a także **tworzyć rozszerzenia**, które dzięki hookom mogą dołączać naszą logikę do niemal każdej części interakcji. Co najlepsze, **AI może zbudować je za nas.** Mimo to nadal musimy wiedzieć, co da się zbudować i kiedy naprawdę potrzebujemy czegoś więcej niż domyślnej konfiguracji.

**Uwaga:** nie każdą uprząż można konfigurować samodzielnie. Jeśli to możliwe, spróbuj przejść na narzędzie, które daje taką możliwość, na przykład Pi, OpenCode, Claude Code lub inną uprząż.

![Uprząż agentowa przedstawiona jako system komponentów. Model, pętla agentowa i wątek tworzą cykl. Wątek ogranicza okno kontekstu. Kontekst globalny i pamięć zasilają wątek. Pętla uruchamia narzędzia i wywołuje hooki. Za pomocą narzędzi agent edytuje system plików zawierający kontekst globalny, pamięć, hooki i ustawienia narzędzi, dzięki czemu może konfigurować własną uprząż.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-3/frame.html)

Mając to wszystko na uwadze, możemy wykorzystać wiedzę z poprzedniej lekcji i **porozmawiać z agentem**, by dowiedzieć się, jak **usprawnić nasz przepływ pracy**. Możemy spersonalizować go jeszcze bardziej, prosząc agenta o przejrzenie historii ostatnich rozmów, by lepiej zrozumiał, jak pracujemy. Możemy też zautomatyzować ten proces i poprosić agenta, by co jakiś czas przeglądał historię oraz sugerował usprawnienia z użyciem dostępnych funkcji. Naszym zadaniem będzie **niedopuszczenie do nadmiernego skomplikowania systemu**. Właściwie powinniśmy maksymalnie go uprościć.

W gruncie rzeczy jest to początek **systemu samodoskonalącego się**. Wraz z rosnącym zrozumieniem będziemy zmierzać ku autonomii i prostym, ale skutecznym mechanizmom, które będą się doskonalić wraz z rozwojem modeli.

![Diagram przepływu. Historia rozmów, wspomnienia i kontekst trafiają do okresowego skanowania wewnątrz uprzęży agentowej. Skanowanie uwzględnia także samoświadomość możliwości uprzęży. Wynikiem są propozycje usprawnień, a czerwona, przerywana linia prowadzi od nich z powrotem do uprzęży. Ta pętla to początek systemu samodoskonalącego się.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-4/frame.html)

## Jak działa kontekst?

Jedną z najważniejszych rzeczy, które trzeba zrozumieć o kontekście, jest to, że **[nawet jeśli informacja znajduje się w kontekście, nie oznacza to, że zostanie użyta](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/instruction-drift)**. To jednak nie wszystko, bo agent może **początkowo** przestrzegać danej instrukcji, a później ją **ignorować** i wracać do pierwotnego zachowania.

Wiemy, że LLM-y mają **limity okna kontekstu**, które obejmują **wszystko, co wysyłamy modelowi**, a także wszystko, co model generuje. Innymi słowy, jeśli nasze żądanie zajmie 95% dostępnego okna kontekstu, a rozumowanie, użycie narzędzi lub odpowiedź modelu przekroczą pozostałe 5%, pojawi się błąd. Uprzęże starają się nie dopuścić do tego błędu, ale robią też coś więcej: próbują **optymalizować zużycie tokenów**, by obniżyć koszty i poprawić wydajność. Łatwo może to doprowadzić do sytuacji, w której oczekujemy, że [model ma dostęp do pewnych informacji](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/silent-context-loss), choć w praktyce ich nie otrzymał.

![Poglądowy pasek jednego okna kontekstu. Żądanie wypełnia 95% okna, pozostawiając 5%. Wyjście modelu (rozumowanie, użycie narzędzi i odpowiedź) zaczyna się w pozostałych 5% i przekracza limit okna kontekstu. Fragment poza limitem jest czerwony i oznaczony jako „Błąd”. Wartości 95% i 5% pochodzą z przykładu w lekcji. Pasek nie zachowuje skali.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-6/frame.html)

Moglibyśmy więc uznać, że AI jest bezużyteczna, bo nawet po określeniu oczekiwań nie mamy pewności, czy model zastosuje się do instrukcji. Wiemy jednak, że praca z AI nie polega na pewności, lecz na **zwiększaniu szans na uzyskanie potrzebnych wyników**.

W przeciwieństwie do kodu prompty **nie są wykonywane wiersz po wierszu** i nawet jeśli określimy w nich warunki lub zasady, modele nie zachowują się jak kompilator. To, jak modele przetwarzają kontekst, a zwłaszcza co dzieje się wewnętrznie, **nie jest w pełni zrozumiane** i stanowi przedmiot badań (na przykład [Mapping the mind of a large language model](https://www.anthropic.com/research/mapping-mind-language-model)).

Poniższa ilustracja pokazuje, że problemy mogą być związane z:

- **Uwagą:** zdolnością modelu do rozumienia kontekstu i relacji między pojęciami, regułami, faktami, instrukcjami i innymi elementami.
- **Stosowaniem się do instrukcji:** zdolnością modelu do przestrzegania instrukcji systemu, dewelopera lub użytkownika.
- **Problemami z kontekstem:** niektóre informacje mogą zostać usunięte z kontekstu albo ukryte przed modelem przez logikę uprzęży lub problemy techniczne.
- **Brakującym kontekstem:** podobnie jak człowiek agent może mieć trudności ze zrozumieniem zadania lub uzyskaniem oczekiwanego wyniku, jeśli modelowi nigdy nie przekazano pewnych informacji.
- **Zrozumieniem ogólnego kontekstu:** model może inaczej interpretować pojęcia lub obiekty, mieć trudności ze szczegółami obrazu lub dźwięku albo napotkać „ciche problemy” podczas uzyskiwania dostępu do zawartości witryny lub dokumentu.

![Pionowa oś czasu z czterema etapami: instrukcje początkowe, wczesna odpowiedź zgodna z instrukcją, rozwijająca się rozmowa z wynikami narzędzi i późniejsza odpowiedź częściowo zgodna z instrukcją. Pionowa linia po lewej pokazuje pierwotną instrukcję, która pozostaje w kontekście na każdym etapie. Przykład instrukcji: „Używaj list punktowanych. Zakończ słowami ‘Check needed’”. Wczesna odpowiedź przestrzega obu zasad. Późniejsza zachowuje listę punktowaną, ale pomija zakończenie, i jest zaznaczona na czerwono. Ramka po prawej pokazuje pięć potencjalnych, nakładających się przyczyn połączonych z poszczególnymi etapami: brakujący kontekst, obsługa kontekstu, uwaga / wykorzystanie kontekstu, rozumienie i stosowanie się do instrukcji. Nagłówek brzmi: „Dostępne ≠ użyte ≠ przestrzegane”. W stopce widnieje uwaga, że prompty ukierunkowują zachowanie i nie są wykonywane jak kod.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-5/frame.html)

Widać już, że agent może nas nie zrozumieć z wielu powodów. Największy problem polega jednak na tym, że **większość z tych rzeczy jest poza naszą kontrolą** — ale nie wszystkie.

Na razie warto kierować się prostą zasadą: **rozmowa powinna być możliwie krótka**. Może się to dziś wydawać irytujące, bo oznacza wielokrotne przekazywanie tego samego kontekstu, ale wkrótce będzie to znacznie łatwiejsze.

![Pionowe okno kontekstu z oznaczeniem 0% u góry i limitem u dołu. Linie wskazują poziomy 30% i 50%. Trzy krótkie wątki, przedstawione jako czerwone paski, zaczynają się przy 0% i kończą przed 50%, w strefie dobrej skuteczności. Obok obszaru między 30% a 50% widnieje napis „Rozpocznij nowy wątek”. Obszar poniżej 50% jest kreskowany i opisany „Degradacja kontekstu, kompakcja”. Długości wątków są przykładowe.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-7/frame.html)

Rozpoczynanie nowych rozmów może często wydawać się sprzeczne z intuicją, zwłaszcza gdy weźmiemy pod uwagę, że **agent musi na nowo odkryć kontekst**. W wielu przypadkach musi przez jakiś czas poznawać projekt, zanim rozpocznie pojedyncze zadanie. Można to jednak ułatwić na wiele sposobów — jednym z nich są umiejętności.

## Projektowanie i generowanie umiejętności

Wiemy już, że umiejętność to zwykły plik Markdown wczytywany do kontekstu przez użytkownika lub agenta, który może też zawierać dodatkowe skrypty. Wiele przykładów znajdziemy na [skills.sh](https://skills.sh), a przydatne wskazówki na [agentskills.io](https://agentskills.io/home). Wybierając umiejętności albo tworząc własne od podstaw, pamiętajmy jednak o tym, co wiemy o modelach językowych i uprzężach.

> OSTRZEŻENIE: Sprawdzaj umiejętności przed ich zainstalowaniem. Zobacz [How Some Malicious AI Skills Hide Instructions from Reviewers](https://blog.virustotal.com/2026/10/how-some-malicious-ai-skills-hide.html).

**Nazwa i opis:** to najważniejsze elementy umiejętności, ponieważ agent wykorzystuje je, by zdecydować, kiedy jej użyć. Trudno zrobić to dobrze, bo nazwy łatwo mogą się pokrywać lub być błędnie rozumiane w zależności od kontekstu. Najlepiej **zacząć od prostego rozwiązania**. Poniższa umiejętność jest na przykład jednoznaczna, łatwa do zapamiętania i łatwa do wybrania przez agenta.

![Przykładowy plik SKILL.md dla niestandardowego API CRM. Nagłówek zawiera nazwę crm-api i krótki opis. Jest zaznaczony na czerwono, ponieważ agent czyta tylko te wiersze, decydując, czy użyć umiejętności. Treść jest krótka. Mówi agentowi, gdzie znaleźć dokumentację API i jak się uwierzytelnić. Nazwa umiejętności, API i polecenia są przykładami.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-9/frame.html)

Wiele uprzęży potrafi już konfigurować się samodzielnie. Jeśli więc widzimy, że umiejętność się nie uruchamia albo jest wybierana niepotrzebnie, możemy poprosić agenta o dopracowanie jej opisu. Wystarczy nam nawyk lub **harmonogram**, według którego agent będzie przeglądał historię rozmów i sprawdzał, czy trzeba udoskonalić istniejące umiejętności albo utworzyć nowe.

![Pionowy kontekst agenta. U góry prompt systemowy wymienia dwie umiejętności wyłącznie z nazwy i opisu: code-review i release-notes. Niżej znajduje się rozmowa. Użytkownik pyta, co potrafi AI, a AI odpowiada bez użycia umiejętności. Następnie użytkownik prosi o przejrzenie wiersza return items\[0\].name;. AI wybiera code-review, ponieważ opis pasuje do żądania. Czerwona ramka oznacza aktywowaną umiejętność: treść jej pliku SKILL.md trafia do kontekstu wraz z instrukcją, by każde zgłoszenie opisać jako poziom ważności, wiersz i poprawka. Ostatnia odpowiedź AI zachowuje ten format. Umiejętności, wiadomości i instrukcja są przykładami.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-8/frame.html)

**Długość:** Wiele umiejętności dostępnych w internecie jest długich i złożonych. Szansa, że dowolny model zastosuje się do wszystkich zawartych w nich instrukcji, jest bliska zeru. Niektóre z najlepszych umiejętności są krótkie i bardzo jasno określają swój cel. Jeśli zadanie wymaga czegoś bardziej złożonego, możemy użyć **umiejętności routera**, które odsyłają do innych umiejętności. Dobrym przykładem jest [ask-matt](https://www.skills.sh/mattpocock/skills/ask-matt).

![Diagram przepływu. Model wczytuje krótką umiejętność routera. Router odsyła do trzech innych umiejętności: debug, test i review. Każda jest osobnym plikiem SKILL.md, który model wczytuje tylko wtedy, gdy wymaga tego zadanie. Nazwy umiejętności i tekst routera są przykładami.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-10/frame.html)

**Wskazówki:** pojęcie umiejętności może sugerować potrzebę **szczegółowych instrukcji**, ale w przypadku modeli takie podejście często przynosi więcej szkody niż pożytku. Dzieje się tak z kilku powodów:

- Złożone instrukcje prawdopodobnie zostaną zignorowane lub źle zrozumiane.
- Nadmiar wskazówek pogorszy wydajność modelu, ograniczając jego elastyczność.
- Zarządzanie długimi umiejętnościami jest znacznie trudniejsze, nawet jeśli LLM-y mogą nam w tym pomagać.
- Dłuższe instrukcje częściej zawierają treści, które z czasem się dezaktualizują.
- Długa umiejętność może odwracać uwagę agenta od bieżącego zadania.

Możemy natomiast:

- Tworzyć umiejętności **ogólne**, które nie mówią agentowi, co ma robić, lecz przekazują mu **zasady** i „sposób myślenia”, pozwalające **dynamicznie dostosować się do bieżącej sytuacji**.
- Odwoływać się do dynamicznych zasobów i narzędzi. Na przykład zamiast umieszczać dokumentację narzędzia w umiejętności, możemy wyjaśnić agentowi, **jak łatwo uzyskać dostęp do tej dokumentacji**.
- Szukać [kotwic semantycznych](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/semantic-anchors), czyli słów niosących głębokie znaczenie albo przywołujących skojarzenia i pojęcia. Na przykład **„Noir”** budzi skojarzenia ze stylem: cienie, cynizm i moralna dwuznaczność.
- Tworzyć umiejętności pozwalające modelowi **sterować samym sobą** przez **zadawanie pytań** i udzielanie na nie odpowiedzi, by zbudować lepszy kontekst.

![Dwie kolumny w ramkach. Po lewej „Zła umiejętność”: długa lista sztywnych reguł (dokładne kroki, warunki, przypadki, wyjątki, nadpisania, stałe ustawienia, format), wbudowana dokumentacja narzędzia, która często się zmienia, oraz wyblakłe wiersze pokazujące, że tekst ciągnie się dalej. Po prawej „Dobra umiejętność”, zaznaczona na czerwono i znacznie krótsza: cztery odrębne pomysły — zasady, dostęp do dokumentacji, kotwice semantyczne („Noir” jako przykład) i samodzielne sterowanie.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-11/frame.html)

LLM-y coraz lepiej tworzą umiejętności, ale nadal mają trudności z **kompresją**, **uogólnianiem** i **upraszczaniem**. Z drugiej strony są bardzo przydatne w **formułowaniu treści**. Poza tym stworzenie dobrej umiejętności wymaga zrozumienia jej celu i kontekstu.

Jasne jest więc, że kształtowanie dobrej umiejętności wymaga iteracyjnego podejścia i naszego udziału, choć być może z czasem stworzymy proces, w którym **model sam znajdzie** najlepszą postać umiejętności.

Przykładem jest utworzona przeze mnie na własny użytek umiejętność [skill-shaper](https://github.com/overment/skills/blob/main/skills/skill-shaper/SKILL.md), czyli rodzaj **metaumiejętności** do iteracyjnego kształtowania nowych umiejętności. Być może nie będzie idealnie dopasowana do Twoich potrzeb, ale może stanowić dobrą inspirację, a nawet punkt wyjścia przy tworzeniu własnej. W tym przypadku proces wygląda tak:

![Diagram przepływu metaumiejętności skill-shaper. Żądanie przechodzi przez cztery etapy. Najpierw należy ustalić, czy w ogóle powinna powstać umiejętność, czy raczej skrypt albo reguła. Następnie trzeba dopasować ją do istniejących umiejętności i uniknąć nakładania się. Kolejny krok to wyobrażenie sobie, jak może zawieść. Na koniec trzeba wybrać sposób ukierunkowania: koncepcje i pytania do zadań wymagających oceny albo dokładne kroki do zadań, w których łatwo popełnić błąd. Proces kończy się testem w nowej sesji, zaznaczonym na czerwono, który rozróżnia przypadki trafnego i błędnego dopasowania.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-22/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-22/frame.html)

Podsumowując tę część:

- Warto zadać uprzęży kilka pytań o mechanizmy działania umiejętności i agentów. Każda uprząż może implementować je nieco inaczej. Ogólna idea jest ta sama, ale przydatne mogą się okazać różnice w szczegółach.
- Zarówno umiejętności, jak i agentów można definiować globalnie albo lokalnie (dla danego projektu). W internecie dostępnych jest wiele umiejętności, ale warto iteracyjnie dostosowywać je do własnych potrzeb.
- Praca z umiejętnościami i agentami to przede wszystkim kwestia nawyku, ale nie należy ich nadmiernie komplikować. Ich kształtowanie może wymagać naszego udziału — i często tak powinno być — choć agenci mogą też zajmować się tym samodzielnie.

## Narzędzia od podszewki

Wiemy już, że LLM-y mogą generować ustrukturyzowane odpowiedzi i bardzo dobrze pisać kod. Wykorzystujemy oba te sposoby, by umożliwić im interakcję ze środowiskiem. Szczegółowe mechanizmy omówimy w kolejnych lekcjach, ale na razie musimy zrozumieć kilka zagadnień:

**Natywne i niestandardowe:** każda uprząż ma kilka wbudowanych narzędzi, ale ich listę można rozszerzyć o **MCP** (Model Context Protocol — omówimy go później) lub narzędzia **CLI** zainstalowane lokalnie na urządzeniu.

![Schemat drzewa. Uprząż ma narzędzia natywne, które są wbudowane, oraz opcjonalne rozszerzenia. Rozszerzenia obejmują MCP (Model Context Protocol), narzędzia CLI zainstalowane lokalnie i skrypty niestandardowe.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-14/frame.html)

**Odkrywanie:** podobnie jak w przypadku umiejętności, agenci muszą wiedzieć, jakie narzędzia są dostępne. Można to zrobić, **udostępniając schemat JSON każdego narzędzia** albo **dając agentom narzędzie do wyszukiwania dostępnych narzędzi** (wymaga to podstawowych wskazówek, jak przeszukiwać katalog).

W pierwszym scenariuszu agent może od razu używać narzędzi, ale ich schematy są włączone do kontekstu nawet wtedy, gdy nie są potrzebne. Drugi scenariusz pozwala pominąć schematy narzędzi w początkowym kontekście, ale wymaga dodatkowych kroków: przed wywołaniem narzędzi agent musi je odkryć.

![Porównanie dwóch sposobów informowania modelu o narzędziach. W pierwszym żądanie zawiera schemat JSON każdego narzędzia, więc model może od razu wywołać narzędzie, ale wszystkie schematy trafiają do kontekstu. W drugim żądanie zawiera narzędzie do wyszukiwania katalogu oraz minimalne wskazówki. Początkowo kontekst jest pusty. Model najpierw wyszukuje narzędzia, a potem pisze kod, który je wywołuje. To tryb kodu, czyli programistyczne użycie narzędzi. Nazwy narzędzi i kod są przykładami.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-12/frame.html)

**Żądanie:** rolą LLM-a jest **wskazanie narzędzia, którego należy użyć**, i **wygenerowanie dla niego ładunku**. Model może zażądać wywołania **wielu narzędzi**, nawet równolegle. Strukturę żądania określają schematy — często bardzo rygorystyczne i weryfikowane programowo — ale wartości są generowane na podstawie kontekstu i wiedzy bazowej modelu.

OSTRZEŻENIE: **modele mogą popełniać błędy** albo dać się **oszukać** i wyodrębnić dane z jednego narzędzia, a następnie ujawnić je za pośrednictwem innego. Wiąże się to z problemem **prompt injection**, który wciąż pozostaje nierozwiązany. Wszystkie modele nadal są na to podatne, co pokazuje profil [Pliny the Liberator](https://x.com/elder_plinius).

![Diagram przepływu. Model, korzystając z kontekstu i wiedzy bazowej, generuje jedno z dwóch żądań: wywołanie narzędzia z jego nazwą i ładunkiem albo skrypt importujący narzędzie. Oba żądania znajdują się w czerwonej ramce. Trafiają do uprzęży, która wywołuje narzędzie. Przykładami wartości są narzędzie search i zapytanie „docs”.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-13/frame.html)

**Odpowiedź:** Po wygenerowaniu ładunku przez model uprząż go wykonuje i zwraca wynik modelowi, który decyduje, co zrobić dalej. Musimy jednak pamiętać, że **wszystko, co zwraca narzędzie**, staje się częścią kontekstu, a więc wpływa na zachowanie modelu. Wyjątkiem jest sytuacja, gdy wynik jest zbyt duży i uprząż zapisuje go do pliku. Agent może wtedy odczytać tylko jego część.

![Pionowy diagram przepływu. Model wywołuje narzędzie, a uprząż je uruchamia. Wynik, który nie jest zbyt duży, trafia bezpośrednio do kontekstu modelu. Zbyt duży wynik trafia do pliku. Agent analizuje plik za pomocą wywołań narzędzi, podobnie jak w pierwszym kroku, a do kontekstu może dotrzeć tylko część jego zawartości. Ostatnia ścieżka jest oznaczona na czerwono.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-15/frame.html)

Patrząc na powyższy przepływ żądania i odpowiedzi, możemy dostrzec wiele podobieństw do typowych interakcji z API, które budujemy od lat. Najważniejsza różnica polega jednak na tym, że **to model decyduje, co wywołać i jak to zrobić**. Dlatego odpowiedzi mogą zawierać **nie tylko żądane dane, lecz także [wskazówki dotyczące następnych działań](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/tool-feedback)**.

![Pionowy diagram. U góry agent wywołuje narzędzie: search\_docs(query: "pagination"). Strzałka prowadzi do ramki „Odpowiedź narzędzia”. Zawiera ona dwa pola. Pierwsze to żądane dane: doc\_17, przewodnik po paginacji. Drugie jest czerwone i zawiera wskazówki dla agenta. Wskazówka dotycząca paginacji mówi, że dostępne są kolejne wyniki i agent może powtórzyć wyszukiwanie, używając kursora „next\_2”. Wskazówka dotycząca użycia mówi, że read\_doc(id) zwraca pełny tekst dokumentu. Strzałka prowadzi do agenta, który decyduje, co zrobić dalej. Nazwa narzędzia, dokument i kursor są przykładowe.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-16/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-16/frame.html)

**Błędy:** Jeśli coś pójdzie nie tak, uprząż nie powinna zawsze zgłaszać wyjątku. Zamiast tego powinna przekazać modelowi szczegóły błędu. Dzięki temu agent może **odzyskać sprawność po błędzie** albo poprosić użytkownika o pomoc.

![Pionowy przepływ jednej interakcji z agentem. Kontekst zawiera prompt systemowy, definicje narzędzi i wiadomość użytkownika. Agent wywołuje narzędzie, które zwraca błąd. Błąd wraca do agenta i jest zaznaczony na czerwono. Agent wysyła poprawione wywołanie i przekazuje użytkownikowi odpowiedź końcową. Z boku znajduje się błąd systemowy, na przykład problem z połączeniem z LLM-em — to jedyny rodzaj błędu przekazywany użytkownikowi. Nazwy narzędzi, ścieżki i tekst błędu są przykładami.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-17/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-17/frame.html)

Podsumowując, na razie musimy wiedzieć, że:

- Agenci muszą znać dostępne narzędzia i możliwości. Wymaga to udostępnienia im z góry schematów narzędzi albo umożliwienia ich odkrywania.
- Agenci coraz częściej polegają na programistycznym użyciu narzędzi. Innymi słowy, piszą kod pozwalający wchodzić w interakcję ze środowiskiem za pomocą dostępnych możliwości lub bezpośrednio przez API.
- Wiedza bazowa i dostępny kontekst wpływają na wybór narzędzi. Ładunki żądań mogą być weryfikowane, ale modele mogą halucynować wartości, co w skrajnych przypadkach może prowadzić do wycieków danych lub incydentów związanych z bezpieczeństwem.
- Odpowiedzi narzędzi mogą zawierać dodatkowe wskazówki pomagające agentowi odzyskać sprawność po błędach, lepiej eksplorować dostępne dane lub zdecydować, co zrobić dalej.

## Podagenci i wykonawcy

Pomimo coraz większych okien kontekstu z wielu powodów możemy preferować krótkie i, co najważniejsze, skupione na jednym zadaniu interakcje. Można to osiągnąć na wiele sposobów, a do najważniejszych należą:

**Podagenci**: wiele uprzęży pozwala agentowi **uruchamiać** kolejnego agenta na bieżąco albo **wywoływać istniejącego**. Taki agent może [**rozwidlić** istniejący wątek albo otrzymać nowy](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/fork-or-fresh-subagent). Podagent może też otrzymać inne ustawienia, na przykład poziom rozumowania lub model.

Z technicznego punktu widzenia podagent jest jednym z natywnych narzędzi: można go wywołać, a jego odpowiedź trafia do kontekstu.

![Główny wątek interakcji z jednym agentem, czytany od góry do dołu. Zawiera przykładowy prompt systemowy „Jesteś agentem programistycznym…”, który stopniowo zanika. Niżej znajdują się trzy etykiety narzędzi: read\_file, bash i subagent. Tylko subagent jest czerwony. Następnie pojawia się przykładowe żądanie użytkownika: „Przeprowadź audyt auth, billing i search pod kątem problemów z bezpieczeństwem”. Asystent wykonuje trzy wywołania narzędzia subagent: dla auth, billing i search. Potem pojawiają się trzy krótkie wyniki narzędzi, a na końcu odpowiedź w jednym wierszu. Po prawej ramka „Podagenci” o tej samej wysokości zawiera trzy karty: auth, billing i search. Każda jest wypełniona wyblakłymi, nieczytelnymi wierszami, takimi jak read\_file i bash, oznaczającymi długi własny kontekst podagenta. Ciągła strzałka „wywołania narzędzi” prowadzi od bloków wywołań narzędzi do ramki Podagentów. Strzałka przerywana „tylko wyniki” prowadzi z powrotem do bloków z wynikami narzędzi.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-18/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-18/frame.html)

**Wykonawcy:** z definicji wykonawca również jest podagentem, ale działa w osobnym procesie, na przykład w drugiej karcie Claude Code. Uruchamia go i zarządza nim inny agent, który otrzymuje także powiadomienie o ukończeniu zadania. Wykonawcę może uruchomić również deterministyczne zdarzenie, takie jak harmonogram lub webhook.

![Diagram przepływu. Agent koordynujący uruchamia dwóch wykonawców. Każdy działa we własnej ramce procesu, a pierwsza ramka jest czerwona. Przerywane linie prowadzą od każdego wykonawcy do agenta: wykonawca informuje agenta o postępach, błędach i wyniku. Ustawienia wykonawców są przykładowe.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-19/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-19/frame.html)

Zarówno podagentów, jak i wykonawców można uruchamiać na podstawie istniejących szablonów, ale zależy to od używanej uprzęży. Na przykład Claude Code / Codex / Pi obsługują taką opcję od razu albo za pośrednictwem rozszerzeń.

Można powiedzieć, że **umiejętności** i **agenci** są technicznie podobni, ponieważ oba rozwiązania zazwyczaj są zwykłymi plikami tekstowymi (md lub toml), które modelowi często przedstawia się jako listę **nazw i opisów**. Ponadto pliki agentów zawierają ustawienia, takie jak dostępne narzędzia, uprawnienia lub model.

![Przykładowy szablon agenta o nazwie scout. Nagłówek pliku tekstowego zawiera nazwę, opis, narzędzia (read, grep, find, ls, bash) i model (gpt-6). Instrukcje dla agenta znajdują się pod nagłówkiem. Wiersze z narzędziami i modelem są oznaczone jako ustawienia.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-21/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-21/frame.html)

Różnica polega na tym, że **umiejętności przydają się, gdy chcemy wykonać coś w tym samym wątku**, bo zadanie wymaga bieżącego kontekstu, natomiast **agenci przydają się, gdy chcemy wykonać coś w osobnym wątku**.

![Dwie kolumny pionowych wątków. Po lewej Umiejętność: jeden wątek zawiera wcześniejszy kontekst, zadanie, wczytanie umiejętności, zawartość SKILL.md i odpowiedź. Wszystko dzieje się w tym samym wątku. Po prawej Podagent: wątek główny zawiera wcześniejszy kontekst, zadanie i wywołanie podagenta. Linia prowadzi do osobnego, czerwonego wątku, który zawiera tylko podzadanie, wykonaną pracę i wynik. Linia przerywana przenosi wynik z powrotem do wątku głównego, który następnie odpowiada. Elementy wątków są przykładami poglądowymi.](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-20/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e02/artifacts/lesson/figure-20/frame.html)

Wkrótce dowiemy się więcej o zaawansowanych, ale nadal prostych przepływach pracy z wykonawcami. Na razie warto pamiętać, że:

- podagenci to po prostu narzędzia — szczególne, ale z perspektywy modelu nadal są narzędziami
- podagenci / wykonawcy mogą być **zdefiniowani z góry** albo **tworzeni dynamicznie**
- podagenci / wykonawcy służą głównie **zarządzaniu kontekstem**, koncentracją i wydajnością
- podagentami / wykonawcami może zarządzać człowiek, ale też inny agent lub skrypt
- najłatwiej zacząć korzystanie z podagentów, **prosząc model**, by rozwiązał zadanie przez dynamiczne utworzenie podagentów i podzielenie pracy na mniejsze kroki

## Najważniejsze wnioski

Powinno być już jasne, że zarządzanie kontekstem to jeden z najważniejszych aspektów pracy z agentami i musimy dowiedzieć się o nim jak najwięcej. Jednocześnie pamiętajmy, że **AI coraz lepiej radzi sobie z zarządzaniem kontekstem**. Naszym zadaniem jest pozwolić agentom wybierać skuteczne sposoby zarządzania kontekstem i wspierać ich w razie potrzeby, zwłaszcza przy długotrwałych zadaniach. System powinien być prosty, a my powinniśmy pozostawać otwarci na nowe podejścia. Może się na przykład okazać, że **po kilku miesiącach trzeba zmienić nasze strategie zarządzania kontekstem**.

Tak czy inaczej, musimy rozumieć, co dzieje się za kulisami, by podejmować lepsze decyzje. A najważniejsze, co możemy zrobić, to **budować** i **eksperymentować**, nawet z najbardziej szalonymi pomysłami.
