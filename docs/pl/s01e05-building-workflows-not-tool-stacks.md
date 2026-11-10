# S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi

Możemy dziś budować rzeczy w ułamku czasu i przy ułamku wysiłku, których wymagało to jeszcze kilka miesięcy temu. A jednak wdrażanie na produkcję nadal jest równie powolne i wymagające jak wcześniej. Można dojść do wniosku, że AI najlepiej sprawdza się w nowych projektach i niewielkich narzędziach dla pojedynczych użytkowników. Ale nawet one szybko stają się trudne w zarządzaniu — niezależnie od AI. Coś tu się nie zgadza, więc prawdziwe pytanie brzmi: **dlaczego?**

## Plan

- Złożoność: szybsze dostarczanie, szybszy przyrost długu technicznego, ludzie i procesy, wykorzystanie AI, by nadążyć
 - Przepływy pracy: wykonywalny Markdown, ograniczenia przepływów opartych wyłącznie na agentach, umiejętności o jednym przeznaczeniu, skrypty wielokrotnego użytku, uogólnione narzędzia, ewaluacja syntetyczna
 - Jakość: samodzielna weryfikacja, środowisko agenta, zasady, prymitywy, utrzymywanie systemu
 - Agenci zdalni: maszyna zdalna, harmonogramy i wyzwalacze, dostęp z urządzeń mobilnych, sekrety
 - Przepływy działające w tle: codzienne briefy, nocne kontrole, przeglądy, synchronizacja dokumentacji, monitorowanie, wnioski produktowe, samodoskonalenie
 - Bezpieczeństwo: prompt injection, jailbreaki, wielowarstwowe zabezpieczenia, nieodwracalne działania
 - Biznes: logika deterministyczna i niedeterministyczna, kierunek wyznaczany przez ludzi, upraszczanie, zaufanie zdobywane w działaniu

## Tempo wzrostu złożoności

Prosta odpowiedź na to pytanie brzmi: **teraz działamy szybciej**. Dotyczy to zarówno tempa dostarczania funkcji, jak i tempa przyrostu długu technicznego. Nawet jeśli przepływy pracy z AI zajmują się drobnymi ulepszeniami i utrzymaniem, aplikacja będzie miała więcej elementów wymagających modyfikacji, dokumentowania i testowania. W niektórych przypadkach samo testowanie zajmie więcej czasu niż praca agentów. Większość tych problemów da się przynajmniej w pewnym stopniu rozwiązać.

![Koncepcyjny wykres liniowy bez wartości. Dwie gładkie krzywe zaczynają się w tym samym punkcie w lewym dolnym rogu i pokrywają przez około pierwsze 30% osi czasu. Czerwona krzywa „To, co budujemy” przyspiesza następnie gwałtownie i biegnie ku prawemu górnemu rogowi. Szara krzywa „To, za czym nadążamy” rośnie równomiernie, nieco się wypłaszcza i kończy na wysokości około jednej trzeciej wykresu. Jasnoczerwone wypełnienie zaznacza obszar między nimi. Etykieta „luka” znajduje się po prawej stronie najszerszego fragmentu wypełnienia; prowadzi do niej cienka linia. Oś x jest opisana „Czas”.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-1/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-1/frame.html)

Jest jeszcze jedna rzecz, która spowalnia ten proces: wszystko, co wiąże się z ludźmi, a także z procesami biznesowymi. Coraz trudniej nadążyć za zmianami, a pojawiają się one tak szybko, że firmy nie mają dość czasu, by sprawdzić, jak wpływają na użytkowników, i zdecydować, co robić dalej.

W życiu prywatnym szybki wzrost złożoności również utrudnia ogarnięcie wszystkiego, co dotyczy stworzonych przez nas narzędzi. Do tego agenci wciąż pytają nas o rzeczy, których nie mogą zrobić bez naszej pomocy, a od czasu do czasu coś im się psuje, co pochłania jeszcze więcej naszej uwagi i energii.

![Diagram. Po lewej znajduje się pole z etykietą „Ty”. Po prawej małe pole „Twoja praca” umieszczono nad dużą ramką „Twój system”. W ramce są dwa pola narzędzi: „Skrypty” i „Integracje”, oraz trzy pola agentów: „Agent skrzynki odbiorczej”, „Agent notatek” i „Agent synchronizacji”. Cienka strzałka z etykietą „mniej czasu” prowadzi od „Ty” do „Twoja praca”. Gruba czerwona strzałka z etykietą „większość twojego czasu” prowadzi od „Ty” do „Twój system”. Poniżej cienkie strzałki wracają do „Ty” od „Agenta skrzynki odbiorczej”, z etykietą „utknął”, oraz od „Agenta notatek”, z etykietą „czeka na ciebie”. „Agent synchronizacji” ma przerywany obrys i notatkę „po cichu zawodzi”. Od tego agenta nie prowadzi żadna strzałka.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-2/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-2/frame.html)

Problemy, które tu widzimy, nie są nowe i mamy już na nie pewne odpowiedzi. Zmieniło się tempo oraz nowe możliwości, które odkrywamy, a które wcześniej nie były tak łatwo dostępne jak dziś. Innymi słowy: **musimy używać AI, żeby nadążyć za AI**.

## Wykonywalny Markdown a kod

Umiejętności można postrzegać jako pliki **wykonywalnego Markdowna**. Biorąc pod uwagę, co agenci potrafią zrobić nawet na podstawie prostego zestawu instrukcji, można śmiało powiedzieć, że **wiele produktów może składać się z jednego pliku .md**.

Wiedząc, jak działają modele językowe i że ich zachowanie jest **niedeterministyczne**, trudno sobie wyobrazić procesy biznesowe zbudowane w ten sposób. A jednak już się to dzieje: osoby nietechniczne używają umiejętności w codziennej pracy, a niektóre z nich zbudowały w ten sposób zautomatyzowane przepływy.

Na przykład agent połączony z internetem i potrafiący pisać kod może z łatwością:

- wysyłać nam spersonalizowany codzienny biuletyn
- korzystać z API przekształcania tekstu na mowę, by przygotować codzienny briefing w wersji audio
- wyszukiwać informacje na dany temat i wysyłać nam PDF z pełnym raportem
- sortować nasze e-maile i przygotowywać szkice notatek, które ułatwią nam odpowiedź
- ...i wiele więcej

Aby to działało, potrzebujemy jedynie agenta z narzędziami CLI / MCP — właśnie to sprawia, że to podejście jest tak potężne.

![Mały dokument o nazwie skill.md, z trzema szarymi liniami oznaczającymi zwykły tekst, przekazuje instrukcje agentowi grubą czerwoną strzałką. Cztery pola narzędzi — „Przeglądarka”, „Pliki”, „E-mail” i „Kod” — znajdują się nad agentem i pod nim oraz łączą się z nim cienkimi dwukierunkowymi liniami. Średniej wielkości strzałka prowadzi od agenta do dużej ramki o nazwie „Co robi”. Ramka zawiera trzy rezultaty: „Bada temat”, „Pisze raport” i „Wysyła go zespołowi”. Ramka jest około trzy razy większa od skill.md.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-3/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-3/frame.html)

A jednak jako programiści dostrzegamy wiele problemów związanych z tym podejściem:

- **niezawodność:** każdy przebieg może dać inne wyniki, w tym wprowadzające w błąd twierdzenia lub działania, których nie należało podejmować
- **koszt:** agent **za każdym razem robi wszystko od zera**, a jeśli umieścimy tę logikę w procedurach uruchamianych kilka razy dziennie dla wielu użytkowników, koszty mogą przewyższyć uzyskiwaną wartość
- **szybkość:** LLM-y działają coraz szybciej, ale nadal są powolne w porównaniu z uruchamianiem skryptów. Niezawodność API też bywa różna, więc zadanie może się w ogóle nie zakończyć
- **debugowanie:** gdy coś pójdzie nie tak, trudno ustalić, co dokładnie zawiodło, dlaczego i jak to naprawić
- **utrzymanie:** zmiany w przepływie pracy trudno testować i kontrolować, a my nie potrafimy wiarygodnie stwierdzić, która modyfikacja poprawiła, a która pogorszyła wynik

Mimo to **to działa** w wielu zastosowaniach... a w innych nie zadziała. Zamiast więc to ignorować lub wyśmiewać, możemy zastanowić się, jak rozwinąć to podejście i nauczyć się rozpoznawać sytuacje, w których wystarczą nam umiejętności i agent.

![Umiejętność w Markdownie działa za pośrednictwem agenta. skill.md przekazuje instrukcje agentowi. Agent wysyła każdy krok do Model API i otrzymuje odpowiedź, a każdy przebieg przynosi wynik. Pokazano cztery przykładowe przebiegi; wynik przebiegu 3 jest błędny. Pod każdym elementem czerwonym tekstem wymieniono jego problemy: przy skill.md widnieje „rozwój (zmiany trudno testować)”. Przy agencie: „koszt (za każdym razem zaczyna od zera)” i „debugowanie (brak jasnego śladu tego, co zawiodło)”. Przy Model API: „szybkość (powolne, może w ogóle nie skończyć)”. Przy wynikach: „niezawodność (każdy przebieg daje inny wynik)”.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-4/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-4/frame.html)

Na chwilę **zapomnijmy o wszystkich ograniczeniach** i skupmy się na tym, co naprawdę jest dobre: jak możemy wykorzystać to podejście i rozwinąć je dzięki naszej wiedzy oraz temu, co potrafią dziś modele. A konkretnie:

- **Elastyczność:** umiejętności można łatwo **łączyć** nie tylko z innymi umiejętnościami, ale też z narzędziami i jednorazowymi skryptami pisanymi przez agentów. Aby łatwo je łączyć, każda umiejętność musi jednak mieć jeden zakres odpowiedzialności.
- **Tryb kodu:** najnowsze modele bez problemu piszą kod, zwłaszcza gdy mówimy o niewielkich aplikacjach o ograniczonym zakresie, które można łatwo uruchomić, ale także [**zapisać i ponownie wykorzystać!**](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/skill-vs-saved-script) Skrypt można zapisać jako zależność umiejętności lub wdrożyć w Cloudflare, by można go było uruchamiać z dowolnego miejsca (jeśli ma odpowiednie uprawnienia), w reakcji na zdarzenia zewnętrzne, harmonogramy lub działania innych agentów.
- **Możliwości:** agenci mogą mieć dedykowane narzędzia do konkretnych zadań, ale możemy je też **uogólniać**, aby [agent mógł rozwiązywać problemy, do których nie został wcześniej przygotowany](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/primitives-vs-bespoke-tools). Uogólnione narzędzia można następnie wykorzystać do **personalizacji**. Innymi słowy, zamiast narzędzia „tworzącego reklamy na Facebooka” mamy narzędzie o nazwie **generate_creation**, które można wyspecjalizować na potrzeby reklam na Facebooku.
- **Ewaluacja:** nie potrafimy wiarygodnie przewidzieć, jak zmiany w umiejętności wpłyną na wynik, ale możemy poprosić AI o wygenerowanie [**syntetycznych scenariuszy**](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/synthetic-skill-eval) i użyć narzędzi takich jak [Promptfoo](https://www.promptfoo.dev/), by wychwycić trendy i ogólne zmiany w zachowaniu.

![Diagram przepływu przedstawiający przykład codziennego briefingu. Plik umiejętności daily-brief.md zawiera elastyczne instrukcje tekstowe i przekazuje je agentowi. Agent ponownie wykorzystuje zapisany skrypt i specjalizuje uogólnione narzędzie generate_creation. Oba znajdują się w ramce „Niezawodny kod”. Syntetyczne scenariusze testują zmiany w umiejętności. Nazwa pliku i briefing to przykładowe wartości.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-5/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-5/frame.html)

Dobra wiadomość jest taka, że projektowanie abstrakcji i uogólnionej logiki znamy już **z programowania**. Teraz dochodzi tylko jeden ważny element: agent, który przejmuje wiele zadań, które kiedyś musieliśmy budować ręcznie.

Najlepszym ćwiczeniem byłoby stworzenie **zestawu możliwości** i **umiejętności**, które pomagają nam w codziennym życiu i pracy. Powinny być dla nas dostępne **zawsze**, ale działać również w tle. Zamiast jednak **budować każde narzędzie ręcznie**, stworzylibyśmy **system**, który pozwala agentom generować narzędzia i zarządzać nimi za nas. I właśnie tu zaczyna się zabawa.

![Diagram z trzema kolumnami. Po lewej jest „Ty”, pośrodku „Agenci”. Po prawej ramka „Twoje narzędzia”, która zawiera „Codzienny briefing”, „Sortowanie skrzynki odbiorczej” i „Monitor wdrożeń”. Pod nimi znajduje się ramka „Twój system” z czterema polami: „Baza wiedzy (twoje notatki i fakty)”, „Kontekst globalny (cele, zasady, preferencje)”, „Prymitywy (wielokrotnego użytku elementy składowe)” i „Struktura pracy (pilnuje, by agenci trzymali się zadania)”. Czerwona strzałka z etykietą „buduj i udoskonalaj” prowadzi od „Ty” do „Twój system”. Nieopisane strzałki prowadzą z każdego pola systemu do agentów. Strzałki prowadzą od agentów do każdego narzędzia; jedna z nich ma etykietę „tworzy i utrzymuje”. Strzałka z etykietą „używaj” biegnie nad agentami od „Ty” do „Twoje narzędzia”.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-6/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-6/frame.html)

## Jakość

Gdy myślimy o systemach **tworzonych i utrzymywanych przez agentów** na skalę, której ludzie nie są w stanie przeglądać, co możemy zrobić, by zapewnić jakość produktu, a jednocześnie wiedzieć, co się dzieje i podejmować dobre decyzje dotyczące jego ogólnego kształtu?

Odpowiedź brzmi: „**pozwólmy agentowi weryfikować własne wyniki**” ~ [Lauren](https://x.com/poteto/status/2094457600259842065)

Agenci powinni weryfikować swoje wyniki nie tylko przez uruchamianie testów jednostkowych, a nawet testów e2e, które **agenci mogą łatwo oszukać**, ale także przez używanie narzędzi do interakcji z aplikacją tak, jak zrobiłby to człowiek, z kontekstem, jaki miałby człowiek. Na koniec agenci potrzebują przestrzeni, w której mogą z tego wszystkiego korzystać. Nie tylko czasu, bo w wielu przypadkach potrzebują do tego własnego komputera. Dlatego widzimy, jak narzędzia takie jak Devin, Cursor czy Grok Bot robią właśnie to.

![Po lewej znajduje się „Ty”. Po prawej ramka „Własny komputer agenta”. W górnym rzędzie znajdują się w niej „Agent” i „Aplikacja”, a poniżej ramka „Kontrole”. Zawiera ona cztery pola, od kontroli maszynowych po ludzkie: „Testy jednostkowe”, „Testy E2E”, „Używa aplikacji jak człowiek” i „Wie, czego oczekują użytkownicy”. Agent buduje i zmienia aplikację oraz uruchamia kontrole. Kontrole testują aplikację. Czerwona strzałka przenosi wyniki kontroli z powrotem do agenta. Agent wysyła raport do ciebie, a ty przekazujesz mu decyzje.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-7/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-7/frame.html)

Biorąc pod uwagę wszystko, czego dotąd się nauczyliśmy, musimy stale ulepszać **środowisko**, w którym agenci mogą swobodnie działać, przestrzegając jednocześnie **naszych zasad**. Zasady te określają ogólne wymagania i granice oraz wyznaczają kierunek, w którym zmierzamy. Musimy też zdefiniować wysokopoziomowe **prymitywy**: **uogólnione elementy składowe**, które agenci mogą łączyć i wykorzystywać ponownie na wiele sposobów, bez ich zmieniania. Dobrym wzorem jest filozofia UNIX-a: małe narzędzia, z których każde robi jedną rzecz dobrze i łączy się z innymi za pomocą wspólnego interfejsu.

![Czerwona ramka „Zasady” obejmuje obszar „Środowisko”. Wewnątrz znajduje się jeden rząd czterech jednakowych pól: „Wyszukaj”, „Odczytaj”, „Przekształć”, „Zapisz”. Agent A, okrąg w lewym górnym rogu, podąża ciągłą trasą: w dół do „Wyszukaj”, dalej do „Odczytaj”, łukiem nad „Przekształć” do „Zapisz”. Agent B, okrąg w lewym dolnym rogu, podąża przerywaną trasą: w górę do „Odczytaj”, następnie do „Przekształć”, a potem do „Zapisz”. Obie trasy korzystają z tych samych czterech pól i pozostają wewnątrz ramki. Trasy są przykładowe.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-8/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-8/frame.html)

**Zasady** nie sprowadzają się do jednego pliku określającego, czego chcemy, lecz obejmują **wszystko**, co sprawia, że agent zachowuje się tak, jak chcemy, bez konieczności ciągłego powtarzania tych samych czynności. Wymaga to pracy na początku, ale także nawyku **utrzymywania systemu w trakcie pracy**. Jeśli pierwszą część wykonamy dobrze, druga będzie znacznie łatwiejsza.

Dotąd omawialiśmy takie elementy jak:

- **Kontekst globalny i lokalny**, dostępny zarówno na naszej maszynie, jak i zdalnie, aby można go było łatwo udostępniać zespołowi
- **Umiejętności i generatory**, tworzone i zarządzane dzięki **nawykom, które rozwijamy**, ale też dzięki **rutynom** [analizującym historię](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/session-mining) i różne źródła, takie jak systemy śledzenia zgłoszeń, logi CI/CD itd., by proponować nowe umiejętności i optymalizować istniejące, a także archiwizować te, które nie są już potrzebne
- **Baza wiedzy**, dostępna **zdalnie** i łatwo osiągalna dla wszystkich agentów, przy czym — jak już omawialiśmy — jej zawartością mogą zarządzać tylko dedykowani agenci
- **Śledzenie zadań** w dowolnej postaci — specyfikacje funkcji, opisy zgłoszeń, ADR-y czy cokolwiek, co pozwala agentowi wiedzieć, **co budujemy, co już zbudowaliśmy i co zamierzamy zbudować**
- **Stos narzędzi**, który sam system rozwija jako własne narzędzia **MCP / CLI**, zgodnie z tymi samymi zasadami i z wykorzystaniem wspólnych prymitywów oraz bazy wiedzy

Teraz musimy połączyć to wszystko, a ostatnim brakującym elementem jest **skonfigurowanie maszyny zdalnej, takiej jak VPS lub komputer PC/Mac**, albo przynajmniej udostępnienie agentów w GitHub Actions runnerze lub za pomocą rutyn Claude/Devin.

![Lokalny komputer stacjonarny łączy się z dużą ramką „Maszyna zdalna: VPS lub PC/Mac”. Znajdują się w niej dwie ramki. Czerwona ramka „Ty nadajesz kształt” zawiera „Prymitywy”, „Zasady” i „Środowisko” oraz etykietę „niewiele rzeczy, o których pamiętasz”. Strzałka z etykietą „wyznacza kierunek” prowadzi z niej do ramki „Agent buduje”. Ramka ta zawiera „Narzędzia”, „Zarządzaj”, „Wykonuj pracę” i „Weryfikuj” oraz etykietę „duże zaufanie, nie musisz o tym pamiętać”.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-9/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-9/frame.html)

## Dostęp zdalny

**UWAGA:** następna sekcja opisuje konfigurację VPS z Tailscale, Pi i Herdr. Jest **całkowicie opcjonalna**; możesz ją pominąć, ponieważ Cursor i Devin już oferują agentów zdalnych od razu. Niezależnie od wybranej opcji potrzebujesz **agentów zdalnych, których można uruchamiać według harmonogramu lub w reakcji na zdarzenie zewnętrzne**.

Przewodnik jest dostępny tutaj: https://github.com/overment/limen/blob/main/docs/seat/agent-setup.md

**[Limen](https://github.com/overment/limen)**, omawiany w poprzednich lekcjach, zawiera przewodnik konfiguracji VPS, dzięki której **Pi i Herdr** będą dostępne na naszym serwerze. Nasi agenci AI mogą przejść przez konfigurację maszyny **razem z nami**. Przewodnik opisuje również konfigurację **GitHub Apps**, dzięki którym agenci będą dostępni w Issues i Pull Requests wybranych repozytoriów.

Proces konfiguracji wygląda w przybliżeniu tak:

- Kupno VPS-a
- Przejście przez przewodnik razem z agentem
- Wykonanie czynności, o które poprosi agent, takich jak autoryzacja Tailscale, logowanie do Pi (opcjonalne) parowanie Moshi i konfiguracja GitHub Apps

Dzięki temu otrzymujemy **agenta Pi pracującego na repozytorium GitHub** oraz sposób, by agenci działający na naszym komputerze mogli kontrolować **agentów zdalnych**. Przy obecnym stanie AI konfiguracja powinna być prosta nawet dla osoby bez doświadczenia z VPS-ami, choć obejmuje kilka kroków i może zająć godzinę lub dwie.

![Diagram przepływu z trzema ramkami. Ramka „Lokalny komputer” zawiera agentów działających na komputerze oraz zsynchronizowaną kopię bazy wiedzy. Ramka „Zdalny: VPS” zawiera agentów zdalnych, harmonogram i współdzieloną bazę wiedzy. Ramka „Zdalny: poza VPS-em” zawiera zgłoszenia i PR-y GitHub oraz przychodzące zdarzenia. Agenci z komputera, GitHub, harmonogram i zdarzenia uruchamiają zadania dla agentów zdalnych. Agenci zdalni odczytują współdzieloną bazę wiedzy, która synchronizuje się z komputerem.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-10/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-10/frame.html)

**OSTRZEŻENIE:** ten przewodnik może nie uwzględniać wszystkich kroków wymaganych przez Twój projekt i polityki Twojej firmy, więc pamiętaj, by je wziąć pod uwagę. Do użytku prywatnego powinien jednak w zupełności wystarczyć.

Aby wszystko było jasne, przyjrzyjmy się dokładnie temu, czego potrzebujemy:

- **Komputer:** z dostępnymi agentami, [Tailscale](https://tailscale.com/), najlepiej także [Pi](https://pi.dev/) i [Herdr](https://herdr.dev/)
- **Urządzenie mobilne:** z zainstalowanym [Grok Bot](https://x.ai/bot) lub [Moshi](https://getmoshi.app/) do dostępu zdalnego
- **VPS:** Ubuntu LTS · x86_64 lub arm64 · **≥8 GB RAM** · **≥150 GB dysku** · **≥2 vCPU** · publiczny IPv4. Możesz kupić taki serwer w [DigitalOcean](https://digitalocean.com/) lub [Hetzner](https://www.hetzner.com/)

A oto kroki, które wykonasz **wspólnie z agentami:**

- **Ty:** Zainstaluj Tailscale, Herdr i Limen na swoim komputerze.
- **Ty:** Utwórz trzy klucze SSH: admin (root przez Tailscale), break-glass (root przez publiczny adres IP) i worker (bez sudo przez Tailscale).
- **Ty:** Zainstaluj Moshi (lub ntfy) na telefonie.
- **Ty:** Utwórz VPS z Ubuntu. Dodaj do niego klucz break-glass. Zapisz publiczny adres IP. Skonfiguruj SSH. Rozpoznawaj seat po adresie IP, a nie wyłącznie po nazwie hosta nadanej przez dostawcę.
- **AI:** Zabezpiecz SSH i zaporę sieciową (publicznie dostępny tylko port 22). Zainstaluj Limen, Node, Herdr, Tailscale, GitHub CLI, acl i powiązane pakiety. Zainstaluj pi jako użytkownik worker (nie jako root).
- **Ty:** Zatwierdź Tailscale, gdy AI poda link. Z laptopa połącz się z seat przez SSH i zaloguj do GitHub CLI (`gh`) oraz pi. Nie wykonuj tych logowań z innego VPS-a.
- **AI:** Sklonuj projekt przez HTTPS i uruchom `limen init`.
- **Ty:** Zdecyduj, co zatwierdzić w commicie. Ten krok zależy od projektu, nad którym chcesz pracować.
- **Ty + AI:** Otwórz Herdr remote dla seat. AI uruchomi koordynator i małe zadanie smoke test. Na chwilę zamknij pokrywę laptopa, a potem sprawdź, czy zadanie się zakończyło i karta Herdr nadal jest otwarta.
- **Ty + AI:** Sparuj Moshi Hooks na seat (Settings → Hooks, nie Easy Pair) albo skonfiguruj ntfy, aby telefon powiadamiał Cię, kiedy agent będzie Cię potrzebował. Webhooki Grok Bot nie są tu domyślną opcją.
- **AI:** Włącz codzienny timer prune. Raz dziennie uruchamia on `limen prune` i usuwa worktree zakończonych zadań, by dysk VPS-a się nie zapełnił. To nie jest timer GitHub doorbell.
- AI (opcjonalnie): Przetestuj Tailscale Serve przy użyciu krótkiego podglądu lokalnego.
- **Ty:** Jeśli Tailscale o to poprosi, jednorazowo włącz Serve w przeglądarce. Upewnij się, że adres URL działa wyłącznie w tailnet, a potem zresetuj Serve.
- **Ty:** Utwórz GitHub App. Zainstaluj ją w repozytorium projektu. Przekaż App ID i PEM; AI zapisze PEM na serwerze w pliku dostępnym wyłącznie dla roota.
- **Ty + AI:** Uruchom instalator doorbell. Połącz aplikację (`limen github connect`). Włącz poller, gdy kontrola doctor zakończy się poprawnie. Przetestuj przez `@limen` na karcie PR Conversation. Uwaga: zielony wynik doctor nie potwierdza, że aplikacja została zainstalowana w repozytorium.

I jeszcze raz: **nawet jeśli powyższa lista wydaje się czarną magią, agenci przeprowadzą Cię przez każdy krok**. Konfiguracja końcowa wygląda tak:

![Ramka o nazwie „Tailnet (prywatny)” z czerwonym obrysem zawiera „Komputer (agenci, Herdr)”, „Telefon (Moshi lub ntfy)” i kontener VPS (Ubuntu LTS) z agentami Pi, Limen i Herdr. Komputer steruje agentami na VPS-ie. Telefon ma zdalny dostęp do VPS-a, a VPS może poprosić o kontakt przez telefon. Z ramki wychodzi tylko jedna strzałka: agenci Pi wybierają zadania i otwierają PR-y w repozytorium GitHub (Issues, Pull requests).](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-11/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-11/frame.html)

Możemy korzystać z tego systemu, po prostu rozmawiając z Pi na lokalnej maszynie. Możemy też logować się na VPS i rozmawiać z tamtejszymi agentami z komputera lub telefonu. To działa dobrze, choć możemy też rozważyć Grok Bot — boty można zaprosić do naszej sieci Tailscale, by zarządzały za nas agentami zdalnymi.

![Ramka sieci Tailscale zawiera dwie ramki. Po lewej „Komputer lub telefon” z „Tobą” i „Grok Bot”, połączonymi linią „czat”. Po prawej „VPS” zawiera jednego agenta Pi. Czerwona linia z etykietą „zarządza” prowadzi od Grok Bot do agenta Pi.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-12/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-12/frame.html)

Ta konfiguracja jest niezwykle potężna, bo możemy mieć zespół botów połączony z więcej niż jednym VPS-em. Zanim jednak pójdziemy tak daleko, musimy dobrze opanować podstawy — inaczej autonomiczne działanie nie będzie niezawodne.

Mając tę konfigurację, możemy utworzyć **bazę wiedzy** omawianą w **S01E03** i zsynchronizować ją z naszym komputerem. W ten sposób zainicjalizowaliśmy **nasz system**, który może rozwijać się razem z nami pod względem wiedzy, posiadanych umiejętności i dostępnych narzędzi. W zależności od potrzeb możemy też skonfigurować [1Password CLI](https://www.1password.dev/environments/mcp-server) lub [Bitwarden](https://bitwarden.com/blog/introducing-agent-access-sdk/), by dać agentom dostęp do kluczy i wszystkiego, co należy bezpiecznie przechowywać — tak, by [agenci mogli używać tych sekretów bez dodawania ich do kontekstu](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/secret-references).

Mając to wszystko, możemy połączyć harness z narzędziami MCP i CLI, by rozszerzyć możliwości agentów, i zacząć projektować potrzebne nam przepływy pracy, takie jak:

- **Codzienny briefing:** każdego ranka agent połączony z repozytoriami, skrzynkami odbiorczymi, komunikatorami lub narzędziami takimi jak [Firecrawl](https://www.firecrawl.dev/) przygotowuje pulpit z informacjami wymagającymi naszej uwagi: aktualizacjami projektów, istotnymi wiadomościami i raportem z nocnej pracy agentów.
- **Kontrola nocna:** nocą agenci przeglądają, testują, wychwytują błędy, porządkują i ulepszają pracę wykonaną w ciągu dnia.
- **Samodoskonalenie:** agenci analizują swoje interakcje z nami i ze sobą nawzajem, a następnie proponują lub wprowadzają ulepszenia i dokumentują, co zmienili oraz dlaczego.
- **Synchronizacja dokumentacji:** każde scalenie uruchamia agenta, który aktualizuje dokumentację i bazę wiedzy.
- **PR pulse:** agenci przeglądają każdy nowy pull request, zanim zrobi to człowiek.
- **Monitor wdrożeń:** agenci obserwują wdrożenia, naprawiają błędy i optymalizują pipeline.
- **Puls systemu:** agenci monitorują logi, aktywność użytkowników i bazę danych, by wykrywać nieoczekiwane zdarzenia, pojawiające się problemy i nowe możliwości.
- **Testy UX:** agenci utrzymują zestaw scenariuszy użytkownika, regularnie je uruchamiają i oceniają wyniki względem najważniejszych metryk UX produktu (KPI).
- **Audyty wydajności:** agenci korzystają z najważniejszych obszarów aplikacji tak jak użytkownik, szukając wąskich gardeł i możliwych optymalizacji.
- **Przegląd zależności:** każda zmiana pliku lockfile uruchamia agenta, który sprawdza nowe pakiety, skrypty instalacyjne i znane podatności, zanim cokolwiek trafi na produkcję.
- **Wnioski produktowe:** co tydzień agenci odpytują bazę danych i analitykę, porównują wyniki z poprzednim okresem, wyjaśniają anomalie i sugerują tematy do roadmapy.
- **Sortowanie zgłoszeń do pomocy technicznej:** agenci grupują opinie użytkowników z e-maili, czatów i zgłoszeń pomocy technicznej, łączą je z istniejącymi zgłoszeniami lub otwierają nowe, podając kroki odtworzenia problemu.
- **Raport badawczy:** na żądanie agenci badają temat w sieci i naszej bazie wiedzy oraz dostarczają raport ze źródłami.
- **Informacje o wydaniu:** każdy nowy tag uruchamia agenta, który przekształca scalone pull requesty w informacje dla użytkowników i wewnętrzny changelog.
- **Obserwowanie konkurencji:** co tydzień agenci sprawdzają changelogi, ceny i dokumentację konkurencji, a następnie raportują tylko to, co się zmieniło.
- **Notatki ze spotkań:** gdy pojawi się transkrypcja, agent przygotowuje podsumowanie, zapisuje decyzje w bazie wiedzy i otwiera zgłoszenia dotyczące zadań do wykonania.
- **Wyszukiwanie niestabilnych testów:** nocą agenci ponownie uruchamiają testy, które ostatnio zawiodły, odróżniają błędy niestabilnych testów od prawdziwych usterek i otwierają PR z poprawką lub kwarantanną testu.

To od nas zależy, które z tych przepływów pracy mają sens w naszym przypadku, a które nie, oraz jak możemy je dostosować do potrzeb naszego produktu i zespołu. Celem nie jest stworzenie **idealnego przepływu pracy** za pierwszym razem, ale **rozpoczęcie od prostego rozwiązania** i jego optymalizacja — nie tylko przez budowanie, lecz także przez **upraszczanie** i usuwanie zbędnych kroków.

## Bezpieczeństwo systemu

Agenci zdalni otwierają wiele możliwości, ale wiążą się też z wieloma zagrożeniami. Możemy zwiększać autonomię systemu, ale musimy pamiętać o ryzyku **błędów** i ataków z zewnątrz. Wiemy już, że **prompt injection** może nakłonić agentów do działań, których nie powinni podejmować; problem ten nadal nie został rozwiązany.

Problem staje się poważniejszy, gdy system zyskuje więcej możliwości — gdy podłączamy kalendarz, konta Gmail, komunikatory, a w przyszłości także nasze urządzenia i karty kredytowe. Agent czytający złośliwy e-mail, stronę internetową lub inną wiadomość może pozyskać wszystkie te informacje.

![Diagram przepływu. Po lewej ramka „Niezaufane dane wejściowe” zawiera złośliwy e-mail, stronę internetową i dowolną wiadomość. Czerwone linie prowadzą z tych źródeł do agenta. Agent łączy się z Gmail, Kalendarzem, komunikatorami oraz kartą kredytową i urządzeniami, znajdującymi się w ramce „Dostęp do usług”. Z Gmail prowadzi linia do wycieku danych. Z karty kredytowej i urządzeń prowadzi linia do wymuszonego działania. Ukryte instrukcje są przykładami.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-13/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-13/frame.html)

Musimy zrozumieć dwa terminy związane z bezpieczeństwem LLM-ów:

- **Prompt injection:** atak, który ma skłonić system oparty na LLM-ie do potraktowania niezaufanych danych wejściowych jako wiążących instrukcji i zastąpienia nimi zamierzonego zadania lub instrukcji o wyższym priorytecie. Dane mogą pochodzić bezpośrednio od użytkownika lub być ukryte w treści czytanej przez system, na przykład na stronie internetowej albo w dokumencie. Celem może być ujawnienie prywatnych danych, zmanipulowanie odpowiedzi lub wywołanie nieautoryzowanego działania.
- **Jailbreak:** atak, który ma ominąć ograniczenia bezpieczeństwa modelu i skłonić go do wygenerowania treści lub zachowań, których normalnie by odmówił. Często wykorzystuje wrogie prompty, odgrywanie ról lub starannie skonstruowaną rozmowę.

**Kluczowa różnica:** prompt injection atakuje **to, którym instrukcjom ufa system**; jailbreak atakuje **to, co model może zrobić**. Pojęcia te częściowo się pokrywają: jeden atak może wykorzystywać oba mechanizmy.

![Diagram przepływu z dwoma ścieżkami. Po lewej prompt injection wskazuje zaufane instrukcje, a jailbreak — ograniczenia bezpieczeństwa. Oba cele znajdują się w ramce „System oparty na LLM-ie”. Między dwoma atakami pokazano na czerwono pojedynczy atak wymierzony w oba cele, ponieważ te pojęcia częściowo się pokrywają.](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-14/frame.png)

[Otwórz rysunek](https://hq.mega.dev/figures/s01e05/artifacts/lesson/figure-14/frame.html)

Najlepsze materiały na temat prompt injection pochodzą od Pliny the Liberator i z jego repozytorium GitHub: **[L1B3RT4S](https://github.com/elder-plinius/L1B3RT4S)**. OSTRZEŻENIE: zastosowanie się do instrukcji z tego repozytorium może doprowadzić do zablokowania konta!

Na swoim profilu X Pliny pokazuje, że każdy dostępny obecnie model jest podatny na tego rodzaju ataki. Matthew Berman wyzwał kiedyś Pliny’ego, by włamał się do jego systemu, i zdołał odeprzeć wszystkie ataki, choć próby Pliny’ego były dość proste. Mimo to warto przeczytać [artykuł Bermana](https://x.com/MatthewBerman/status/2030423565355676100) o jego mechanizmach obronnych.

Jego zabezpieczenia obejmują:

- **Deterministyczny filtr:** usuwa niewidoczne znaki Unicode i znaki Unicode zajmujące dużo tokenów, zamienia podobne do siebie litery na łacińskie, dekoduje Base64, zapis szesnastkowy i encje HTML, ogranicza liczbę tokenów na wejściu i oznacza wzorce jailbreaków.
- **Skaner frontier:** najmocniejszy LLM ocenia ryzyko w skali od 0 do 100: kontrola przy 35, blokada przy 70. Jeśli skaner zawiedzie, blokuje źródła wysokiego ryzyka.
- **Filtr wyjściowy:** sprawdza tekst wychodzący pod kątem sekretów, ścieżek wewnętrznych, znaczników prompt injection, wycieków w adresach URL obrazów i kwot pieniężnych.
- **Redagowanie:** ukrywa sekrety, prywatne adresy e-mail, numery telefonów i kwoty pieniężne przed wysłaniem wiadomości.
- **Kontrola dostępu:** blokuje wrażliwe pliki i prywatne adresy sieciowe. Dopuszcza wyłącznie http/https.

Mimo tych wszystkich mechanizmów najważniejsza lekcja jest taka, że **wszędzie tam, gdzie używamy LLM-a, narażamy nasz system na podatności**. Musimy więc dwa razy się zastanowić, zanim udostępnimy agentom narzędzia mogące doprowadzić do wycieku danych lub nieodwracalnych działań.

## Wartość biznesowa

Pomysł uruchamiania agentów w tle może być interesujący, ale może też budzić obawy dotyczące **kosztów**, **jakości** i **niezawodności**, a także **rzeczywistej wartości**. Z pomocą AI łatwo konfigurować rutyny i wyzwalacze, które uruchamiają agentów, by wykonywali pracę, której nikt nie przeczyta ani nie wdroży, lub która okaże się bezużyteczna.

To prawdziwy problem i nie ma na niego jednej odpowiedzi, ale możemy rozważyć kilka kierunków:

- **Zachowaj równowagę między logiką deterministyczną i niedeterministyczną:** wiemy, że agenci potrafią pisać kod i konfigurować deterministyczne harmonogramy oraz wyzwalacze, które uruchamiają logikę bez LLM-a albo korzystają z niego oszczędnie.
- **Zaangażowanie ludzi:** agenci mogą dbać o jakość, niezawodność, porządek i bezpieczeństwo, ale ludzie muszą nadal odpowiadać za kierunek i najważniejsze decyzje — choć i w tym powinno pomagać AI. Przynajmniej na razie taki układ zwiększa szanse, że zbudujemy **właściwą rzecz**.
- **Pozbądź się tego, co zbędne:** łatwo coś dodać do systemu, ale ludzie i AI muszą aktywnie pracować nad **upraszczaniem** i **usuwaniem** — w rzeczywistości powinno to mieć wyższy priorytet niż dodawanie nowych elementów.
- **Zaufanie trzeba zdobyć:** jak już wspomniano, można ufać agentom **wyłącznie** wtedy, gdy potrafią zweryfikować swoją pracę za pomocą rzeczywistych obserwacji i samodzielnych testów. Właściwie cały system trzeba zoptymalizować pod tym kątem, bo naszym celem jest **zapewnienie jakości nawet wtedy, gdy wytwarzamy kilka tysięcy PR-ów miesięcznie**.

Jako programiści możemy myśleć o przepływach pracy opartych na **naszej wiedzy** o projektowaniu systemów oraz na tym, co wiemy już o generatywnej AI i dostępnych narzędziach. Nawet jeśli nasze spojrzenie może być zbyt wąskie, by stwierdzić, czy dane rozwiązanie przyniesie korzyść firmie, warto **zbadać i pokazać, co jest możliwe**.

Warto też sprawdzać, co mogą dla nas zrobić agenci zdalni i działający w tle — zarówno w kontekście naszej pracy, jak i codziennego życia.
