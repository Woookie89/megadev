# S02E01 · Prymitywy agentowe

W tym tygodniu przyjrzymy się bliżej logice agentowej i jej mechanizmom. Ta wiedza pozwoli nam **stworzyć harness od zera** albo **dostosować harness na dowolnym poziomie**. To jedna z najważniejszych części całego MEGA, bo wszystko inne, co będziemy budować — dla siebie i dla klientów — będzie na niej oparte.

## Plan

- Pętla agenta: wywołania modelu, wykonanie narzędzi, wyniki, stan, warunki zatrzymania, obowiązki środowiska uruchomieniowego
- Instrukcje: cel, zakres odpowiedzialności, profile, konfiguracja, wskazówki dotyczące zachowania, wymuszane ograniczenia
- Kontekst i pamięć: wiadomości, metadane, załączniki, świadomość środowiska, trwałość danych, wyszukiwanie, wstrzykiwanie kontekstu, buforowanie promptów
- Narzędzia: dostępne działania, wywoływanie funkcji, Bash, korzystanie z przeglądarki, wykonywanie kodu, systemy plików, uprawnienia, sandboxing

Warto zauważyć, że AI potrafi dziś budować pętle agentowe bez „żadnych” problemów. Istnieją też niesamowite projekty open source, takie jak [Pi](https://github.com/earendil-works/pi/blob/main/packages/agent/src/agent-loop.ts) (to samo Pi, które znamy jako harness) i [Goose](https://github.com/aaif-goose/goose), elegancko implementujące taką pętlę, a wiele innych projektów korzysta z dokładnie tego pakietu. Agenci to jednak nie tylko pętla. Możemy z grubsza przedstawić to tak:

![Harness agenta. U góry znajduje się etykieta „Wywołujący”. Jedna strzałka prowadzi w dół do „Wybudź”, a strzałka z etykietą „odpowiedz lub zatrzymaj” prowadzi od „Modelu” z powrotem do wywołującego. Czerwona ramka „Ograniczenia” obejmuje jeden rząd czterech jednakowych pól: „Wybudź”, „Kontekst”, „Model” i „Działania”. Nad strzałką od „Modelu” do „Działań” znajduje się etykieta „wywołania narzędzi”, a pod nią „zatwierdzenie”. Przerywana strzałka „wyniki” biegnie dołem ramki od „Działań” z powrotem do „Kontekstu”. Na sześciu strzałkach znajdują się białe kropki oznaczające hooki. Pod ramką umieszczono trzy pasy na całą szerokość: „Historia”, „Pamięć” i „Obserwowalność”. Pod nimi znajduje się jednolinijkowa legenda hooków i podpis.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-1/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-1/frame.html)

Istnieje wiele architektur i wzorców, których możemy użyć do budowania i rozszerzania harnessów agentowych. Celem nie jest **zbudowanie ich wszystkich**, lecz poznanie dostępnych opcji oraz tego, gdzie i kiedy z nich korzystać. A gdy już poczujesz się z nimi swobodnie, możesz zechcieć **złamać niektóre zasady** i poszukać lepszych wzorców oraz implementacji dla własnych zastosowań.

![Diagram przepływu. Jeden element, „znajomość logiki agentowej”, łączy się z czterema zastosowaniami. Dwa z nich znajdują się w ramce „Harnessy”: „budowanie od zera” i „dostosowywanie na dowolnym poziomie”. Dwa pozostałe umieszczono w ramce „Narzędzia agentowe”: „do własnego użytku” i „jako funkcje produktu”.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-4/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-4/frame.html)

## Pętla agenta

Wiemy już, że u podstaw agenci są **pętlami**, które działają, dopóki LLM nie zdecyduje, że nie chce użyć żadnych narzędzi, tylko zwróci tekst i zakończy zadanie. Między iteracjami możemy modyfikować kontekst, ustawienia i uruchamiać potrzebną nam logikę. Brzmi prosto, bo takie jest.

![Diagram przepływu pętli agenta. Stan przekazuje kontekst do wywołania modelu. Model odpowiada wywołaniami narzędzi albo zwraca tekst końcowy. Narzędzia zwracają wyniki, a następnie hooki aktualizują stan przed kolejną iteracją. Zaznaczono hooki wykonywane między iteracjami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-2/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-2/frame.html)

Oto jej elementy:

- **Stan:** przechowuje wątek, kontekst, konfigurację i zmienne pętli
- **Model:** obsługuje interakcję z API dostawcy LLM-a (na przykład OpenAI)
- **Narzędzia:** lista schematów używanych przez model oraz callbacki uruchamiane przez pętlę po wybraniu narzędzia
- **Hooki:** lista callbacków obsługujących obserwowalność lub działania takie jak kompakcja czy przetwarzanie plików

Poniżej pokazano naiwną implementację. [Pi agent](https://github.com/earendil-works/pi/tree/main/packages/agent/src) w pełni implementuje te same mechanizmy i pokazuje, jak potężna jest ta logika: możemy używać Pi do programowania, ale możemy też połączyć go z dowolnymi narzędziami i **uzyskać agenta ogólnego przeznaczenia** — albo przynajmniej jego pierwszą wersję.

![Przykładowy fragment kodu JavaScript przedstawiający naiwną pętlę agentową. Obiekt tools mapuje nazwy narzędzi na funkcje. Obiekt hooks zawiera beforeModel, beforeTool i afterTool. Pętla while wywołuje hooki, wywołuje model z wiadomościami i schematami narzędzi, a następnie wykonuje każde wywołanie narzędzia. Wyróżniono warunek zatrzymania: gdy model nie zwraca żadnych wywołań narzędzi, pętla zwraca tekst. Nazwy narzędzi i hooków są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-3/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-3/frame.html)

Powyższa logika jest niezwykle elastyczna, zwłaszcza jeśli agent otrzyma **narzędzie do pisania i wykonywania kodu** oraz **system plików**. W praktyce wiele rzeczy uniemożliwia agentowi niezawodną pracę, szczególnie przy zadaniach rozciągniętych w czasie. Nawet pojedynczy problem z API może zatrzymać takiego agenta. W praktyce czyha też znacznie więcej pułapek związanych z **pamięcią**, **obsługą długiego kontekstu**, **autoryzowanymi działaniami** czy **błędami wewnętrznymi i zewnętrznymi, limitami czasu itd.** Codziennie mierzymy się z wieloma takimi problemami podczas pracy z agentami programistycznymi: widzimy, jak się blokują, nie potrafią czegoś zrobić albo zbaczają z kursu z powodu brakujących informacji i tym podobnych.

![Pionowy diagram przepływu. Przykładowe wieloetapowe zapytanie rozpoczyna pętlę agenta. Wywołanie modelu 1 zwraca wywołanie narzędzia, a narzędzie zwraca wynik. Wywołanie modelu 2 napotyka błąd API oznaczony na czerwono. W pętli nie ma obsługi tego błędu, więc zadanie zatrzymuje się w połowie tury. Zapytanie, wywołanie narzędzia i tekst błędu są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-5/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-5/frame.html)

Harnessy takie jak Claude Code czy Codex mają na celu rozwiązanie jak największej liczby tych problemów, by [agenci mogli samodzielnie **odzyskiwać sprawność** po większości błędów](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/loop-error-recovery). Nie są to jednak jedyne obowiązki, którymi muszą się zająć.

**Połączenie:**
Agenci muszą łączyć się z LLM-ami, często pochodzącymi od więcej niż jednego dostawcy. Wymaga to adapterów i mapowania interakcji, bo API dostawców mogą się różnić. Wiele bibliotek obsługuje wielu dostawców od razu po instalacji (na przykład [AI SDK](https://vercel.com/ai-sdk)), ale często zaleca się korzystanie z **oficjalnych SDK**, by uniknąć niepotrzebnych abstrakcji.

![Diagram przepływu. Po lewej pętla agenta. Łączy się z dwoma adapterami w ramce „Adaptery”: jednym dla OpenAI, drugim dla Anthropic. Każdy adapter łączy się przez oficjalne SDK z API swojego dostawcy. Dwaj dostawcy i ładunki wywołań narzędzi są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-6/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-6/frame.html)

**Wątki i sesje:**
Interakcje z agentem zapisują się w wątku, który może obejmować wiele sesji i angażować więcej niż jednego agenta (`subagents`). Taka historia jest często przechowywana w plikach tekstowych, które agenci mogą łatwo odczytywać przy użyciu **bash** lub dowolnego innego narzędzia pozwalającego na interakcję z systemem plików. Warto zauważyć, że **nie każdy harness** obsługuje subagentów i łatwy dostęp do wątków.

![Ramka „Wątek główny” zawiera dwie ramki sesji. W „Sesji 1” użytkownik zadaje pytanie, a agent odpowiada. W „Sesji 2” użytkownik wraca do tego samego głównego wątku, a agent pyta subagenta. Subagent znajduje się w oddzielnej ramce „Wątek subagenta” i odpowiada agentowi. Czerwone linie pokazują to połączenie.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-7/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-7/frame.html)

**Trwałość danych:**
Wątek to nie jedyna rzecz, którą harness musi przechowywać. Są też załączniki, wygenerowane artefakty, skrypty, umiejętności, uprawnienia, połączenia, integracje, niestandardowe narzędzia i wiele więcej. Z perspektywy programisty nie ma w tym nic ciekawego, dopóki nie uwzględnimy, że **agenci muszą mieć możliwość zarządzania tym wszystkim**.

Na przykład wygenerowane obrazy lub artefakty powinny być dostępne agentowi, aby mógł wykonać dotyczące ich zadania uzupełniające. Jeśli dana integracja wymaga dodatkowego uprawnienia, agent powinien móc pokazać nam ustawienia, w których możemy je przyznać.

![Diagram przepływu trwałości danych w harnessie agenta. Agent łączy się z trzema przechowywanymi elementami w ramce „Pamięć harnessu”: wątkami, artefaktami i uprawnieniami. Czerwona linia od agenta do artefaktów pokazuje, jak agent odnajduje wcześniej wygenerowany obraz na potrzeby zadania uzupełniającego. Linia od uprawnień do użytkownika wskazuje ustawienia, w których użytkownik musi je przyznać. Obraz i integracja są przykładowymi wartościami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-10/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-10/frame.html)

Jest tu pewien haczyk, związany z **wyjściem poza kontekst pojedynczego użytkownika**. Przyzwyczailiśmy się do tego, że agenci mogą swobodnie korzystać z systemu plików na naszym Macu lub PC. Gdy jednak wyjdziemy poza ten zakres i pozwolimy agentom pracować dla zespołu lub użytkowników na produkcji, bez sandboxów i odpowiedniego zarządzania uprawnieniami sytuacja znacznie się komplikuje.

![Agent po lewej łączy się z trzema ramkami trwałych elementów. Ramki pokazują trzy poziomy dostępu. „Agent odczytuje” zawiera wątki i załączniki. „Agent tworzy i edytuje” zawiera artefakty, skrypty, umiejętności i niestandardowe narzędzia; ta ramka jest czerwona. „Agent prosi, użytkownik przyznaje” zawiera uprawnienia, połączenia i integracje. Grupowanie elementów na poziomy jest przykładowe.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-8/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-8/frame.html)

**Konfiguracja:**
Harnessy takie jak Claude Code mogą **konfigurować się samodzielnie**. Wszystkie aplikacje AI-native zaczynają stosować ten sam wzorzec i rozwijać go dalej, dzięki czemu ustawieniami, a nawet elementami **UI**, można zarządzać w czasie działania. Przykładami są [OpenCode](https://anoma.ly/notes/opencode-reloaded/) i [DeepSeek Harness](https://arxiv.org/pdf/2608.25512). Ten ostatni podąża drogą **oprogramowania samodoskonalącego się** i ideą „wszystko jest wtyczką”.

![Diagram przepływu. W ramce „Harness” agent konfiguruje własne ustawienia i zmienia własne elementy UI w czasie działania. Zmienione ustawienia wracają do agenta, a użytkownik widzi zmienione UI. Wywołania narzędzi podane w szczegółach są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-9/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-9/frame.html)

**Kontekst:**
Harnessy na różne sposoby zarządzają oknem kontekstu. Obejmuje to jasny opis bieżącego środowiska i sposobu poruszania się po nim. Trudność polega na zarządzaniu **[buforem kontekstu opartym na prefiksie](https://developers.openai.com/api/docs/guides/prompt-caching)**, który ogranicza koszty i opóźnienia, ale tylko [jeśli istniejący kontekst pozostaje niezmieniony](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/prompt-cache-prefix). Harness nie może też załadować wszystkiego z góry, więc agent musi odkrywać to, co nie jest krytyczne, dopiero wtedy, gdy będzie tego potrzebować. Jednocześnie kontekst musi być **kompresowany**, by nie przekroczyć pojemności okna.

![Trzy kolumny pokazują okno kontekstu na początku sesji, po odkryciu narzędzi i po kompakcji. Czerwona ramka obejmuje buforowany prefiks, taki sam w każdej kolumnie: prompt systemowy, AGENTS.md, profil i podstawowe narzędzia. Poniżej prefiksu wątek rozrasta się o wiadomości i schemat narzędzia, ładowany w razie potrzeby. Następnie kompakcja skraca wątek do podsumowania starszych wiadomości oraz najnowszych wiadomości pozostawionych bez zmian.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-11/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-11/frame.html)

**Narzędzia:**
W zeszłym tygodniu dowiedzieliśmy się, że model może korzystać z narzędzi przez Function Calling lub Code Mode. Pierwsze podejście wymaga **załadowania schematu** do kontekstu, a wywołania są osobne (choć mogą być wykonywane równolegle). Ich wyniki dołączane są do wątku, by model mógł zdecydować o kolejnym kroku. Sprawdza się to przy prostych interakcjach, ale jest bardzo nieefektywne w złożonych przepływach pracy. Dlatego nowoczesne agenty **piszą kod**, który może **łączyć narzędzia w łańcuchy** i przechowywać wyniki w zmiennych zamiast dodawać każdy wynik do kontekstu.

![Diagram przepływu w Code Mode. Model pisze jeden skrypt wywołujący kolejno trzy narzędzia: calendar.list, mail.search i files.write. Każdy wynik pozostaje w zmiennej: events, mails i file. Do wątku trafia tylko wynik końcowy, który model odczytuje w następnym wywołaniu. Nazwy narzędzi, kod i wartości są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-12/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-12/frame.html)

Czasami zadanie wykonane w **Code Mode** może zwrócić dużą porcję danych, na przykład cały raport. Zamiast dodawać jego zawartość do kontekstu (co może przekroczyć limit), można zapisać wyniki w pliku i przekazać modelowi odwołanie do niego. Agent może wtedy odczytać fragment, wyświetlić plik użytkownikowi lub przekazać go innemu narzędziu.

![Diagram przepływu. Code Mode zapisuje duży raport w pliku. Model otrzymuje tylko odwołanie do pliku, a następnie odczytuje fragment, wyświetla plik użytkownikowi lub przekazuje go innemu narzędziu, które wysyła e-mail. Ścieżka do pliku i wywołanie poczty są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-13/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-13/frame.html)

Na koniec harness odpowiada za uzyskanie **zgody** użytkownika przed wykonaniem działań nieodwracalnych lub wymagających uprawnienia z innych powodów. Oczekiwanie na użytkownika może trwać nawet kilka dni i [należy je odpowiednio obsłużyć](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/resumable-run).

![Diagram sekwencji zatwierdzania narzędzia w pętli agentowej z przykładowym narzędziem poczty. Model prosi o mail.send. Harness nie wykonuje go, lecz prosi użytkownika o zatwierdzenie. Użytkownik może odpowiedzieć nawet po kilku dniach. Po zatwierdzeniu harness uruchamia narzędzie i przekazuje wynik z powrotem do modelu. Nazwa narzędzia, adres i tekst są przykładowymi wartościami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-14/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-14/frame.html)

Wszystkie te elementy można uznać za rdzeń logiki harnessu. Razem dobrze pokazują, dlaczego **agent to nie tylko pętla**: potrzebuje wielu mechanizmów umożliwiających interakcję ze środowiskiem.

Jeśli ta wiedza wydaje się zbędna osobom, które nie będą budować własnego agenta, rozważmy następujące kwestie:

- nie możemy mieć bardzo długiego pliku AGENTS.md, bo model zignoruje jego większość, a opóźnienie i koszt wzrosną, dopóki zawartość nie zostanie zbuforowana
- umiejętności również muszą być krótkie, a czasem trzeba je **aktywować ponownie** wiele razy z powodu kompakcji kontekstu
- jeśli to możliwe, powinniśmy zadbać, by wątek był **jak najkrótszy**, albo przynajmniej utrzymać agenta **wyspecjalizowanego** w określonych zadaniach
- możemy oczekiwać, że agent znajdzie informacje potrzebne do wykonania zadania, ale powinniśmy mu to ułatwić i pamiętać, że informacje te mogą zniknąć wskutek kompresji albo po prostu zostać zignorowane przez model

To tylko przykłady wniosków wynikających bezpośrednio z mechaniki harnessu i samych agentów. Jak wkrótce się przekonamy, w praktyce dochodzą też inne elementy, takie jak **rutyny, harmonogramy, zdarzenia, webhooki** i wiele więcej.

## Osobowość i świadomość środowiska

Modele stają się coraz inteligentniejsze, co może prowadzić do wniosku, że agenci nie potrzebują naszych wskazówek. Do pewnego stopnia to prawda. Widzimy to na co dzień, gdy pracujemy z agentami jako użytkownicy, bo często wystarczą krótkie wiadomości, by uzyskać oczekiwane wyniki. Możemy też przeczytać, że [80% promptu systemowego Claude Code usunięto z myślą o najnowszych modelach](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/), i zacząć wierzyć, że pisanie jasnych instrukcji nie tylko staje się nieistotne, ale wręcz może pogorszyć działanie modelu.

Perspektywa zmienia się, gdy zaczynamy myśleć o tym, by nasi agenci **pracowali bez nas**: w automatyzacjach, przepływach działających w tle i niestandardowej logice agentowej potrzebnej w naszych aplikacjach. W takich przypadkach zależy nam na **niezawodności, autonomii i wysokiej wydajności**. Aby to osiągnąć, potrzebujemy jasnych instrukcji, które poinformują agenta, co jest dla niego dostępne, i pozwolą mu samodzielnie ustalić, co trzeba zrobić, by ukończyć zadanie.

![Porównanie dwóch sposobów korzystania z agenta. W pracy bezpośredniej użytkownik uczestniczy w sesji i krótkimi wiadomościami kieruje agentem. Gdy agent pracuje bez nas — w automatyzacjach, przepływach działających w tle i logice aplikacji — nikt go nie prowadzi. Instrukcje muszą mówić mu, co jest dostępne w jego środowisku, by mógł samodzielnie znaleźć kolejne kroki.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-15/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-15/frame.html)

Aby lepiej poznać wartość dobrych instrukcji, możemy przejrzeć prompty systemowe popularnych harnessów, dostępne na [GitHubie Pliny the Liberator](https://github.com/elder-plinius/CL4R1T4S/tree/main). Przykłady to [prompt dla GPT-6 Sol](https://github.com/elder-plinius/CL4R1T4S/blob/main/OPENAI/Codex_Desktop/GPT-6-Sol_Prompts.txt) i [Claude Opus 5.5](https://github.com/elder-plinius/CL4R1T4S/blob/main/ANTHROPIC/CLAUDE-OPUS-5.5.md) (ten drugi zawiera więcej niż sam prompt systemowy). Istnieją też oficjalne poradniki Anthropic i OpenAI, na przykład [Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5) lub [Rethinking skills and prompts for GPT-6](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).

Poniżej przedstawiono **strukturę** [promptu systemowego Claude'a dla Haiku 5.5](https://platform.claude.com/docs/en/release-notes/system-prompts/claude-haiku-5-5). Już na pierwszy rzut oka widać, że **harnessy definiują solidny prompt systemowy, dzięki któremu użytkownicy mogą rozmawiać z agentami w naturalniejszy sposób**. Gdy tylko zaczniemy tworzyć własne narzędzia i automatyzacje agentowe, to my będziemy musieli przygotowywać taki prompt.

![Drzewo zarysu sekcji promptu systemowego Claude'a o nazwie claude\_behavior, w kolejności ich występowania w prompcie. Pod korzeniem znajduje się dziesięć sekcji. tone\_and\_formatting zawiera lists\_and\_bullets, a user\_wellbeing zawiera provide\_crisis\_resources. Każda sekcja ma krótki opis. Opisy streszczają nazwy sekcji, nie są cytatami z promptu.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-16/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-16/frame.html)

Dobra wiadomość jest taka, że nie musimy pisać promptu ręcznie. Prompty, których będziemy używać, często będą znacznie prostsze niż te w Claude czy ChatGPT, chyba że stworzymy agentów ogólnego przeznaczenia. Nadal musimy jednak wiedzieć, czego oczekiwać od promptu i jakie są najważniejsze zasady Prompt Engineering.

**Osobowość:** podstawowe informacje o roli agenta i osobach, z którymi wchodzi w interakcję. Taki kontekst wpływa na zachowanie modelu.
**Środowisko:** istotne informacje o celu agenta i środowisku, na przykład o tym, że agent działa bez łatwego dostępu do człowieka.
**Kontekst:** agentowi trzeba przedstawić mapę dostępnych zasobów lub przynajmniej informacje, gdzie ich szukać; inaczej nie ukończy zadania albo błędnie stwierdzi, że nie potrafi zrobić czegoś, do czego został przeznaczony.
**Odkrywanie:** podobnie jak w przypadku kontekstu agent musi wiedzieć, jak poznawać możliwości harnessu, by właściwie z nich korzystać. Na przykład może wykonać jakiś proces, pomijając część kroków z powodu kiepskiej organizacji dokumentów opisujących ten proces.
**Granice:** agent musi znać swoje ograniczenia i wiedzieć, czego nie wolno mu robić. Wiemy już, że to tylko **zalecenie**, ponieważ model może technicznie zignorować te instrukcje.

![Ramka „Prompt systemowy” zawiera od góry pięć bloków: „Osobowość”, „Środowisko”, „Kontekst”, „Odkrywanie” i „Granice”, każdy z krótkim opisem. Blok „Osobowość” jest czerwony.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-18/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-18/frame.html)

Tworzenie dobrego promptu systemowego możemy zacząć **od prostego rozwiązania**: napisać minimalne instrukcje albo opisać ogólny cel promptu i pozwolić modelowi przygotować pierwszą wersję, ponieważ LLM-y bardzo dobrze radzą sobie już z prompt engineeringiem. Jest duża szansa, że prompt zacznie **działać** za pierwszym razem, ale [naszym celem jest, by był **właściwy**](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/prompt-eval-loop). Instrukcja ma być **klarowna, dobrze uogólniona** i zawierać tylko to, co naprawdę potrzebne. Aby to osiągnąć, musimy pracować iteracyjnie, mając jasny sposób weryfikowania wyników lub przynajmniej ich oceniania za pomocą ewaluacji.

![Diagram przepływu pokazujący, jak powstaje prompt systemowy. Zaczynamy od prostego rozwiązania, a model przygotowuje wersję promptu. Weryfikujemy wyniki lub oceniamy je za pomocą ewaluacji. Od weryfikacji do udoskonalenia promptu przez model prowadzi wyróżniona, cofająca się linia; w wyniku tego powstaje nowa wersja. Pętla powtarza się, aż prompt będzie właściwy: klarowny, dobrze uogólniony i zawierający tylko to, co potrzebne.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-17/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-17/frame.html)

Prawdopodobnie **najlepszą pojedynczą radę** dotyczącą promptów znajdziemy w repozytorium **[Latent Space Activation](https://github.com/daveshap/latent_space_activation)**. Ma ono prawie cztery lata, ale nadal jest aktualne. Według niego promptowanie polega mniej więcej na **skłonieniu modelu do przypomnienia sobie istotnej wiedzy i metod rozwiązywania problemów oraz przywołaniu ich w rozmowie, zanim odpowie**. Musimy zawsze o tym pamiętać, nawet jeśli rozumowanie dużych modeli rozumujących ma rozwiązywać właśnie ten problem.

## Kontekst i pamięć

Biorąc pod uwagę wszystkie problemy z zarządzaniem kontekstem omawiane w zeszłym tygodniu, powinno być jasne, że dobre zarządzanie kontekstem jest kluczowym elementem każdego harnessu. W zeszłym tygodniu dowiedzieliśmy się, jak modele językowe obsługują kontekst i jak możemy zbudować bazę wiedzy. Przyjrzyjmy się teraz bliżej temu, jak agenci mogą **zapamiętywać rzeczy**.

Pamięć agentową można sprowadzić do czterech elementów:

- **struktura:** tabela, drzewo lub graf zawierający dokumenty i relacje między nimi. Dokumenty mogą zawierać metadane opisujące je i łączące ze źródłami zewnętrznymi.
- **ekstrakcja:** działania związane z zapisywaniem nowych informacji — pochodzących z interakcji z agentem albo z danych pobranych z systemów zewnętrznych.
- **wyszukiwanie:** często jest to wyszukiwanie agentowe wykorzystujące LLM-y, dopasowywanie wzorców, modele embeddingowe, wyszukiwanie pełnotekstowe, przeszukiwanie grafu i modele decyzyjne.
- **kontekst:** sposób przedstawiania pamięci agentowi oraz zestaw narzędzi pozwalających ją odczytywać, zapisywać, modyfikować i usuwać.

![Pionowy diagram pamięci agentowej. Ramka „Pamięć agentowa” zawiera od góry cztery elementy: „Ekstrakcja”, „Struktura”, „Wyszukiwanie” i „Kontekst”. Szczegóły każdego elementu znajdują się po prawej. Ekstrakcja zapisuje nowe informacje pochodzące z interakcji z agentem i z systemów zewnętrznych. Struktura przechowuje dokumenty i ich relacje w tabeli, drzewie lub grafie; metadane opisują dokument i łączą go ze źródłami zewnętrznymi. Wyszukiwanie to często wyszukiwanie agentowe z użyciem LLM-ów, dopasowywania wzorców, modeli embeddingowych, wyszukiwania pełnotekstowego, przeszukiwania grafu i modeli decyzyjnych. Zaznaczony na czerwono „Kontekst” przedstawia pamięć agentowi za pomocą narzędzi do odczytu, zapisu, modyfikacji i usuwania. Linia prowadzi z „Kontekstu” w dół do agenta pod ramką.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-19/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-19/frame.html)

Pamięć to jedna z najczęściej oczekiwanych przez użytkowników funkcji, ale nie istnieją ustalone standardy ani wzorce jej implementacji. Gdy przyjrzymy się szczegółom, zauważymy, że większość harnessów obsługuje pamięć naiwnie — tak, by sprawiać wrażenie, że agent coś pamięta. Są jednak wyjątki.

Zapamiętywanie sprowadza się do wyodrębniania danych z bieżącego wątku — albo za pomocą dodatkowego wywołania LLM-a działającego w tle, albo przez jawne wywołania narzędzi. Wspomnienia często są wyodrębniane jako **aktualizacje profilu użytkownika / klienta**, w którym fakty konkurują o uwagę, albo jako osobne dokumenty kategoryzowane i łączone z istniejącymi wspomnieniami.

![Diagram przepływu z dwiema ramkami. Po lewej znajduje się wątek między klientem i agentem: klient mówi „Wolę krótkie odpowiedzi”, agent udziela krótkiej odpowiedzi, klient prosi o podsumowanie wysyłane e-mailem w każdy piątek, a następnie mówi „Właściwie od teraz odpowiadaj szczegółowo”. Agent potwierdza. Po prawej profil klienta w pamięci zawiera trzy pola: długość odpowiedzi, podsumowanie i źródło. Żądanie LLM-a działające w tle wyodrębnia pierwszą wiadomość i ustawia długość odpowiedzi na „krótka”. Wywołanie narzędzia memory.update ustawia podsumowanie na „e-mail, w każdy piątek”, a następnie zmienia długość odpowiedzi na „szczegółowa”. Pole długości odpowiedzi jest czerwone: późniejsza preferencja zastępuje wcześniejszą, nie powstaje osobny dokument. Wszystkie wiadomości i wartości są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-20/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-20/frame.html)

Wyzwaniem jest tu **łączenie istniejących wspomnień**, gdy niektóre z nich mogą sobie przeczyć albo zastępować inne. Dość trudne jest też prawidłowe łączenie niejednoznacznych informacji, na przykład faktów o dwóch różnych osobach o tym samym imieniu, bo [agent może mieć trudności z ustaleniem, o której osobie mówimy](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/memory-extraction). Dlatego eksperymentuje się z **wynikami pewności** lub tymczasowymi notatkami do czasu wyjaśnienia niejednoznaczności. Zapisywanie wspomnień wiąże się też z innymi problemami: **duplikowaniem**, a także **aktualizacją** i śledzeniem **zmian zachodzących w czasie**.

![Jedna przykładowa preferencja z wątku — „Od teraz odpowiadaj szczegółowo” — wskazuje profil klienta w pamięci, który zawiera trzy problematyczne wiersze. „Sprzeczność” (czerwona): profil zawiera już „długość odpowiedzi: krótka”, więc nowa preferencja musi ją zastąpić. „Duplikat”: „podsumowanie: e-mail, w każdy piątek” znajduje się w profilu, a ta sama preferencja widnieje obok w osobnej notatce „Piątkowe podsumowanie e-mailem”. „Niejednoznaczność”: profil zawiera „Adam: raporty: co tydzień”, a linie prowadzą od tego wpisu do dwóch klientów o imieniu Adam. Wniosek: zapisanie preferencji jest łatwe. Trudność polega na utrzymaniu jednej aktualnej wartości, bez duplikatów i z jasno określonym właścicielem. Wszystkie wiadomości i wartości są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-21/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-21/frame.html)

Większość tych problemów nie została jeszcze rozwiązana — częściowo z powodu kosztu przetwarzania w tle, ale także dlatego, że cały proces jest tak złożony. A to tylko jedna strona medalu, bo agent musi też jakoś przywoływać istniejące wspomnienia, co jest jeszcze trudniejsze.

Prawidłowe przywoływanie wspomnień jest trudne, ponieważ musi być **szybkie**, **kontekstowe** i **wydajne**. Harness [musi uwzględniać bieżący wątek](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/contextual-recall) i szybko dopasowywać dokumenty, których model użyje do wygenerowania spersonalizowanej odpowiedzi. Często nie da się tego zrobić na podstawie samych wiadomości, więc potrzebujemy kontekstu globalnego w postaci **profilu użytkownika / klienta** lub jakiejś mapy.

![Pionowy diagram przywoływania kontekstowego dla opiekuna klienta i jego agenta. U góry czerwona ramka zawiera cały wątek: prompt systemowy z wstrzykniętym profilem klienta (Acme Logistics, plan: Enterprise, długość odpowiedzi: szczegółowa, następne spotkanie: czwartek), wiadomość użytkownika „Acme chce rozszerzyć działalność na Niemcy w przyszłym kwartale”, krótką odpowiedź agenta i najnowszą wiadomość użytkownika „Przygotuj ofertę na spotkanie”. Sama najnowsza wiadomość nie wskazuje klienta, oferty ani spotkania. Strzałka prowadzi z czerwonej ramki do szybkiego wyszukania w pamięci, a następnie do ponownego rankingu pozostawiającego 2 najlepsze dokumenty. Pliki acme/contract.md i acme/expansion-notes.md zostają załadowane do wątku. Agent odpowiada szczegółowym szkicem oferty dla Acme Logistics: ekspansja do Niemiec, na podstawie aktualnej umowy Enterprise, gotowa na czwartkowe spotkanie. Wszystkie nazwy, wiadomości, nazwy plików i wartości są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-23/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-23/frame.html)

Sprawa komplikuje się jeszcze bardziej, gdy weźmiemy pod uwagę wszystko, czego dotąd dowiedzieliśmy się o pętlach agentowych i modelach językowych. Istnieje wiele projektów, które próbują rozwiązać problem pamięci agentowej, na przykład [mem0](https://mem0.ai/), [supermemory](https://supermemory.ai/) i [hindsight](https://hindsight.vectorize.io/). Większość z nich jest open source, więc możemy się wiele nauczyć, rozmawiając z agentami o ich kodzie źródłowym.

Poniżej znajduje się krótki przegląd mechanizmów wyszukiwania używanych przez Hindsight, które możemy połączyć z naszym harnessem. Możemy też zbudować własne narzędzia. Dobrymi źródłami inspiracji są artykuł Joela Hooksa [How I Built an Observation Pipeline So My AI Remembers Yesterday](https://joelclaw.com/observation-pipeline-persistent-ai-memory) oraz [lamarck](https://github.com/johnlindquist/lamarck) Johna.

![Przepływ pamięci Hindsight w czterech strefach, od lewej do prawej. Agent AI wysyła do API Hindsight wywołania retain(), recall() i reflect(). Retain zapisuje dane w źródłach, a etap extract przekształca źródła w fakty. Recall przeszukuje wspomnienia. Reflect korzysta z danych Synthesized. Worker Hindsight scala fakty w obserwacje, a następnie Refresh przepisuje strony wiedzy.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-22/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-22/frame.html)

Możemy w końcu oczekiwać, że czołowe narzędzia AI opracują pamięć agentową znacznie dokładniejszą niż dostępna dziś. Nadal mogą się jednak zdarzać sytuacje, w których potrzebna będzie pamięć w pełni spersonalizowana do naszego przypadku użycia.

## Narzędzia

Interakcje agenta ze światem zewnętrznym można zaimplementować na wiele sposobów. Ogólnie rzecz biorąc, agent musi **znać swoje możliwości** i umieć **łączyć je ze sobą**, by wykonać zadanie w jak najmniejszej liczbie kroków, zachowując jednocześnie kontekst i nie gubiąc celu. Wiąże się to z kilkoma wyzwaniami:

**Świadomość:** agent musi znać swoje możliwości, [ale nie wszystkie muszą być załadowane do kontekstu](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/tool-search). Niektóre możliwości muszą być jednak dostępne od razu; musimy zdecydować, które z nich.

![Diagram przepływu. Agent odczytuje swój prompt systemowy. Prompt zawiera trzy elementy: listę możliwości, wskazówki, jak ładować ich szczegóły, oraz narzędzia natywne. Agent od razu wywołuje narzędzia natywne. Zgodnie ze wskazówkami ładuje szczegóły możliwości, które pozostają poza kontekstem, dopóki nie będą potrzebne. Nazwy możliwości, wywołanie wyszukiwania i schematy narzędzi są przykładami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-24/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-24/frame.html)

**Zarządzanie:** agent może mieć z góry określony zestaw narzędzi, ale może też **integrować się** z nowymi za pomocą Model Context Protocol, który omówimy w tym tygodniu, albo pisać **własne integracje niestandardowe**, które po przetestowaniu można zapisać i ponownie wykorzystać. W obu przypadkach możemy zaprojektować rozwiązanie tak, by agent sam **zarządzał** swoimi integracjami.

![Diagram przepływu. Po lewej znajduje się agent z predefiniowanym zestawem narzędzi. Łączy się z serwerem MCP. Pisze też niestandardową integrację, którą po przetestowaniu zapisuje i ponownie wykorzystuje. Czerwona ramka obejmuje serwer MCP, niestandardową integrację i zapisaną integrację. Ramka wskazuje integracje zarządzane przez agenta.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-25/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-25/frame.html)

- **Odkrywanie:** narzędzia mogą być dostępne w postaci wbudowanego katalogu, który agent przeszukuje za pomocą udostępnionego mu dedykowanego **narzędzia wyszukiwania**, albo w postaci **plików**, które agent przegląda przy użyciu Bash. Pierwsze podejście daje nam znacznie większą kontrolę, drugie jest natomiast niezwykle elastyczne, bo agent może natywnie zarządzać swoimi możliwościami (co może być zarówno zaletą, jak i wadą). Jeśli jednak potrzebujemy narzędzi na dużą skalę, musimy znaleźć rozwiązanie pośredniczące, takie jak [bramka stworzona przez Ubera do zarządzania ponad 8000 narzędzi](https://www.uber.com/pl/en/blog/designing-mcp-gateway/), ich autoryzacją i uprawnieniami. Innym przykładem jest [otwartoźródłowy Treg](https://github.com/superdesigndev/treg).

![Diagram bramki MCP Ubera. W płaszczyźnie sterowania crawler odnajduje narzędzia i dodaje je do rejestru, w którym nowe narzędzia są wyłączone. Rejestr przesyła konfigurację do proxy w płaszczyźnie danych. Agenci komunikują się przez MCP z wejściem wyszukiwania narzędzi: serwerem wyszukiwania, listą narzędzi i schematami. Wejście kieruje wywołanie do proxy, które autoryzuje je, redaguje i skraca odpowiedź. Z proxy prowadzi czerwona linia przekształcająca wywołania w istniejące API (HTTP, gRPC, TChannel). Pozostałe linie kierują wywołania przez proxy do natywnych serwerów MCP i przekazują token do serwerów zewnętrznych (Jira, Google).](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-26/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-26/frame.html)

- **Możliwość ponownego użycia:** wiemy, że umiejętności mogą zawierać skrypty, które agent **wykorzystuje ponownie**, by nie wykonywać ręcznie tego samego zadania. To samo dotyczy narzędzi, jeśli pozwolimy agentowi nimi zarządzać. Nie chodzi jednak tylko o to, by agent **tworzył narzędzia**, ale także o połączenie ich z innymi możliwościami, takimi jak **dostępne integracje**, **magazyny wartości** lub **inne pakiety**.

![Pionowy diagram. Agent u góry tworzy pakiet. Pakiet zawiera logikę. Linie prowadzą od logiki do trzech możliwości: integracji, magazynów wartości i innych pakietów. Linie importu w logice są przykładem.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-27/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-27/frame.html)

- **Środowisko:** na produkcji agenci, którzy mogą zarządzać własnymi ustawieniami, muszą mieć dostęp do **wyraźnie odseparowanych** przestrzeni roboczych użytkowników. Musimy pamiętać, że agenci mogą **łatwo** znaleźć sposób na obejście granic, co może doprowadzić do uzyskania dostępu do danych innych użytkowników.

![Diagram przepływu. Użytkownik A i użytkownik B wysyłają zadania do własnych agentów na serwerze. Każdy agent uruchamia kod wyłącznie we własnej przestrzeni roboczej, zawierającej środowisko uruchomieniowe i system plików. Przestrzeń robocza A, przestrzeń robocza B i serwer znajdują się w osobnych ramkach. Ścieżki przestrzeni roboczych są przykładowymi wartościami.](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-28/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s02e01/artifacts/lesson/figure-28/frame.html)

W praktyce wszystkie te elementy mogą być **ograniczone** lub **rozszerzone** w takim stopniu, w jakim potrzebujemy, by **kontrolować agenta** albo pozwolić mu działać swobodniej i samodzielnie się konfigurować, poznawać nowe rzeczy oraz rozwiązywać nowe problemy bez konieczności tworzenia dla niego nowych funkcji.

## Najważniejsze wnioski

Codziennie pracujemy z agentami, czasem nawet nie zdając sobie sprawy, jak wiele dzieje się pod maską. Po tej lekcji — niezależnie od tego, czy będziemy budować własnych agentów, czy korzystać z istniejących — lepiej rozumiemy, **czego możemy od nich oczekiwać** i co sprawia, że zawodzą, na przykład gdy prosimy ich o przywołanie czegoś, a oni twierdzą, że tego nie mają.

Ostatnia lekcja jest taka, że zbudowanie nawet prostego agenta, by nauczyć się, jak działa, może sprawić, że znacznie lepiej poradzimy sobie z Claude, Pi lub dowolnym innym harnessem.
