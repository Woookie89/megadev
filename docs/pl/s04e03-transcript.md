John Lindquist (MEGA.dev) S04E03

## Gdzie kończą się widgety i swarmy

00:00:02,209 \--\> 00:00:50,329 \[John Lindquist\]

Mamy już więc widgety, które obserwują nasz projekt, i swarmy, które zbierają kontekst do Maina. Jeśli pracujesz sam nad własnym projektem, może to być wszystko, czego potrzebujesz. Bo jeśli cały twój projekt razem z całą historią mieści się w kontekście jednego modelu, to robienie teraz czegokolwiek więcej to w zasadzie przekombinowana architektura. Ale gdy projekt przekroczy ten punkt, kiedy duży model zaczyna gubić wątki? Jak zwykle wszystko sprowadza się do kontekstu. Gdy twoja baza kodu jest tak duża i ma długą historię, a pracuje nad nią kilka osób, które cały czas wysyłają kolejne zmiany, każdy moduł w projekcie kryje stare przypadki brzegowe. I jest jeden inżynier, który pamięta, dlaczego rezerwacja działa właśnie w ten sposób, a potem odchodzi z firmy. A świeża rozmowa Main wejdzie naiwnie i pewnie w pokój pełen pułapek.

## Agenci domenowi

00:00:51,279 \--\> 00:01:40,244 \[John Lindquist\]

Popularne rozwiązanie wraca do koncepcji domain-driven design i agentów domenowych. W przeciwieństwie do jednorazowego agenta, którego uruchamiasz w rozmowie Main, agent domenowy jest właścicielem części bazy kodu, jak w pliku CODEOWNERS na GitHubie, i może nosić ze sobą żywą pamięć o tej domenie. Agenci domenowi często odpowiadają pojęciom ustalonym w słowniczku albo w innych plikach. I tworzy się ich osobno dla każdego projektu. Twoja sesja Main nadal będzie pisać kod. Pozwoli tylko twoim agentom domenowym doradzać, robić review, rosnąć i rozwijać się, aż w końcu nawet pomagać twoim klientom. Zobaczmy, jak to wygląda w naszym projekcie RentAPlace. Stworzymy agenta domenowego dla rezerwacji i agenta domenowego dla cen oraz omówimy kilka strategii pamięci, żeby naprawdę stali się ekspertami w swojej dziedzinie.

## Zaseeduj agenta domenowego

00:01:40,799 \--\> 00:02:42,185 \[John Lindquist\]

Pewnie używasz agentów wystarczająco długo, żeby wiedzieć, że utrzymanie pliku AGENTS.md potrafi być sporym wyzwaniem. Przez długi czas wszyscy myśleli, że trzeba tam wpisać wszystkie wspomnienia i reguły. Ale z czasem nauczyliśmy się, że ten plik się dezaktualizuje. A agenci i tak często ignorują jego najważniejsze części. Zobaczmy więc, co możemy zrobić, żeby wydobyć część tej zapomnianej historii i zamienić ją w aktywnego agenta-eksperta. Spójrzmy na przykład na ten ticket w Mainie. Mamy zamknięty dom, który wciąż można zarezerwować. Oczywista poprawka to jednolinijkowe sprawdzenie na samym początku funkcji rezerwacji. Ale jeśli wdrożysz ten one-liner, po cichu zepsujesz retry i zwroty dla gości. Zobaczmy więc, co potrafi agent domenowy rezerwacji. W Mainie prosimy o nowy folder, agents/booking, i w tym folderze będziemy zarządzać ścieżkami do plików rezerwacji i ich testów, tak jak w pliku CODEOWNERS na GitHubie. Ten agent domenowy rezerwacji będzie działał na małym, szybkim modelu, tylko do odczytu, i będzie twoim mózgiem od rezerwacji.

## Zbierz swoją historię

00:02:42,909 \--\> 00:03:34,793 \[John Lindquist\]

Nie chcemy zaczynać pisania wspomnień od zera. Możemy szybko puścić swarm agentów albo twojego głównego agenta, żeby przekopał git blame, zamknięte issues, pull requesty, a nawet wcześniejsze rozmowy w poszukiwaniu pułapek związanych z czymkolwiek, co dotyczy rezerwacji. Co kluczowe, każde wspomnienie, które dodasz w tej początkowej rundzie, powinno wskazywać commit albo issue, w którym zespół nauczył się tej lekcji na własnej skórze. Stworzymy więc plik memories.md i utrzymamy w nim dwie czyste sekcje: jedną dla wewnętrznej inżynierii i jedną dla klientów. Możemy przechowywać wspomnienia związane z notatkami inżynierskimi, żeby wiedzieć, gdzie są wszystkie pułapki. Możemy przechowywać wspomnienia związane z regułami i zasadami dla klientów, które w przeszłości sprawiały problemy. I to naprawdę nam pomoże, jeśli albo gdy w końcu rozwiniemy tego agenta w coś, co będzie bardziej skierowane do klientów.

## Budzi się, gdy Main patrzy

00:03:35,620 \--\> 00:04:42,422 \[John Lindquist\]

Zrobimy to intuicyjnie: agent zniknie w tle. Prawie wszystkie harnessy mają sposób, żeby wykryć, kiedy agent dotyka pliku. To coś jak hook odczytu albo hook edycji. Zrobimy tak, że za każdym razem, gdy nasza główna rozmowa zacznie patrzeć na pliki zdefiniowane jako globy w konfiguracji agenta rezerwacji, może to uruchomić agenta rezerwacji, który automatycznie przekaże sprytne podsumowanie potencjalnych problemów, na które główna rozmowa może trafić, bo potrafi połączyć kontekst z głównej rozmowy z kontekstem wszystkich znanych mu wspomnień. Jeśli więc popatrzymy, co dzieje się w tym przebiegu, gdy Main dotyka czegokolwiek w module rezerwacji, agent domenowy rezerwacji od razu sygnalizuje tę pułapkę związaną z retry. I może ostrzec głównego agenta, żeby sprawdzał replaye i odrzucał zamknięte domy. Dzięki temu twój główny agent może zostać przy zadaniu, być agentem, który zapisuje pliki, i dalej uruchamiać podagentów. Ale za każdym razem, gdy wchodzi w konkretną domenę, kluczowe wspomnienia będą sączyć się do kontekstu i uchronią cię przed tymi minami.

## Uruchom to w labie

00:04:42,849 \--\> 00:05:24,418 \[John Lindquist\]

Możemy uruchomić to w naszym labie, gdzie mamy zamrożony zestaw testów rezerwacji, i każdy przypadek retry, zwrotu i zamkniętego domu przechodzi. Z zewnątrz dajemy agentowi domenowemu rezerwacji tę naiwną poprawkę na początku funkcji. A on powinien odpowiedzieć, że zewnętrzny agent w labie powinien uważać ze względu na te dawne wspomnienia. Jeśli więc spojrzysz, co teraz żyje w twoim repo, zobaczysz agenta domenowego rezerwacji zaseedowanego prawdziwą historią, który budzi się automatycznie, gdy tylko inny agent zacznie zaglądać do jego domeny, czyli do czegokolwiek w module rezerwacji. A potem przekazuje ten cenny kontekst dokładnie wtedy, gdy trzeba, właśnie wtedy, gdy Main na to patrzy, i pomaga twoim głównym agentom nie powtarzać starych błędów.

## Przejście przez dwie domeny

00:05:25,645 \--\> 00:06:25,690 \[John Lindquist\]

Jeśli twój główny agent przechodzi przez kilka domen, na przykład rezerwacje i ceny, mnoży to ryzyko pominięcia kluczowych informacji. Możemy więc trzymać wiele mózgów i nadal mieć jedną główną rozmowę. Możemy zaseedować drugiego agenta domenowego, Pricing, puścić go po naszych ścieżkach cenowych i kazać swarmowi przeczesać dawne issues związane z cenami. A teraz, gdy wrzucimy do Maina funkcję, która przechodzi przez obie domeny, na przykład „dodaj dopłatę świąteczną z 24-godzinnymi blokadami i krótkim oknem na zwrot przy anulowaniu”, zanim Main zmieni choćby jedną linię, będzie musiał równolegle skonsultować się z Pricing i Booking, które startują na swoich małych, szybkich modelach. Pricing sprawdzi, jak działają dopłaty, a Booking sprawdzi, co dzieje się z aktywnymi blokadami. I od razu wyłapują kolizję, której żaden z agentów domenowych nie zobaczyłby sam. Konkretny przykład: gdy admin doda dopłatę świąteczną, może to trafić na aktywną 24-godzinną blokadę i zachować pierwotną cenę albo może się skończyć zapłatą nowej dopłaty przy checkoucie.

## Decyzja produktowa, nie zgadywanie

00:06:26,500 \--\> 00:07:03,884 \[John Lindquist\]

I to jest prawdziwa decyzja produktowa, którą chcesz mieć przed oczami w rozmowie z głównym agentem. To nie zgadywanie, które chcesz zostawić agentowi w tle. Gdy więc ta kwestia do ciebie trafi, dzięki swojej wiedzy o produkcie możesz im powiedzieć, że aktywne blokady powinny zamrażać pierwotnie podaną kwotę w centach. I teraz Main może spójnie napisać zarówno ceny, jak i rezerwacje w jednym skupionym kontekście. I znów, zanim w pełni temu zaufasz, możesz to sprawdzić z zewnątrz. Możesz uruchomić Pricing i Booking w świeżych sesjach w labie, tylko do odczytu, mockując takie scenariusze albo prosząc agentów o ich zmockowanie, i sprawdzić, czy agenci domenowi zwracają te pułapki, na które byś trafił.

## Czyste wspomnienia, małe szybkie modele

00:07:04,550 \--\> 00:08:04,854 \[John Lindquist\]

Ogólnie po prostu każesz głównemu agentowi aktualizować agentów domenowych. Nie chcesz kopiować surowych transkryptów rozmów ani wrzucać ogromnych logów do wspomnień. Chcesz, żeby wspomnienia pozostały czyste i łatwe w utrzymaniu, i żeby zawsze miały odniesienie, takie jak commit, numer issue, zgłoszenie użytkownika albo przynajmniej znacznik czasu, tak żeby były prawdziwymi dowodami z twojego projektu. Dzięki temu, jeśli te dowody kiedyś z jakiegoś powodu się zdezaktualizują, łatwo je przejrzysz i posprzątasz. I znów używamy małych, szybkich modeli do tych zadań, które nie wymagają dużo myślenia. Nie wymagają wielu decyzji, bo są skupione na swojej konkretnej domenie. A potem coś je uruchamia: zdarzenie, hook albo coś podobnego. Przy wewnętrznej inżynierii takim zdarzeniem jest na przykład główny agent, który patrzy na plik w tej domenie. A jeśli myślisz perspektywicznie, na pewno przychodzi ci do głowy wiele innych scenariuszy, w których konkretne wyzwalacze chciałyby porozmawiać z ekspertami domenowymi.

## Słowniczki

00:08:05,494 \--\> 00:09:00,304 \[John Lindquist\]

Booking i Pricing mają więc teraz po folderze pełnym wspomnień. A w chwili, gdy commitujesz te foldery, żeby cały zespół je współdzielił, pojawiają się dwa problemy. Stos wspomnień to jeszcze nie model domeny, a Markdown nie ma kompilatora. Zacznijmy od pierwszego. Ekspert nie tylko pamięta stare bugi, ale też wie, co znaczą słowa w jego domenie. Poproś więc agenta, żeby dodał krótki słowniczek tuż obok wspomnień. Wspomnienia trzymają „dlaczego”, a słowniczek to, co dane słowo znaczy właśnie tutaj. Na przykład słowo „blokada”: zatrzymuje noce i zamraża cenę, którą podano gościowi. I pilnuj, żeby słowniczek był krótki, żeby nie zdezaktualizował się tak jak duży AGENTS.md. Teraz drugi problem. Testy jednostkowe nadal pilnują twojego kodu i sprawdzenie agenta nigdy nie powinno ich zastąpić. Ale żaden test nie padnie, gdy kolega z zespołu uporządkuje tę definicję, a blokada po cichu zamieni się w coś, co tylko zapisuje daty. Nic nie psuje się od razu, dopóki następna funkcja nie zostanie zbudowana na złym znaczeniu.

## Sprawdzenia scenariuszy

00:09:01,179 \--\> 00:09:45,745 \[John Lindquist\]

Dla słów, które naprawdę mają znaczenie, poproś więc o sprawdzenie scenariusza. To ten sam pomysł co oczekiwania, które dałeś labowi: proste pytanie i to, czego oczekujesz w odpowiedzi. I pytaj o samo słowo: co blokada zatrzymuje dla gościa? Uruchom to na swoim agencie domenowym, na jego małym, szybkim modelu, więcej niż raz. Potem poproś agenta, żeby pilnował tych folderów tak, jak twój zespół już pilnuje kodu. Zmiany w agencie domenowym przechodzą review u osób, które są właścicielami tej domeny, a sprawdzenia scenariuszy uruchamiają się, gdy zmieniają się te pliki, więc każdy inny pull request pozostaje szybki. Gdy więc ktoś rozwodni definicję, sprawdzenie może to wyłapać przed mergem. A gdy twój zespół nauczy się czegoś nowego, lekcja wchodzi razem ze scenariuszem, który ją potwierdza. To agent domenowy, którego cały twój zespół może współdzielić i któremu może ufać.

## Pull, push i kontrakty

00:09:46,320 \--\> 00:10:43,384 \[John Lindquist\]

Oddalmy się na chwilę. Zapomnij o panelach i plikach. Spójrz, jak agenci, których zbudowałeś, odnoszą się do Maina, bo łączy ich wszystkich jeden wzorzec. Na początku pomoc działała na zasadzie pull. Uruchamiałeś split albo wybierałeś issue, gdy potrzebowałeś kontekstu. Twój critic i twoje widgety już obserwowały same z siebie. A przy agentach domenowych ekspertyza też zaczyna przechodzić na push: Main patrzy na plik, a właściwy ekspert budzi się, choć nikt go nie prosił. Nadal siedzisz przy klawiaturze. Ale agenci, którzy budzą się na wyzwalacz, są tym, na czym działa fabryka oprogramowania. I zobacz, jak jasne jest zadanie każdego z nich. Main jest właścicielem zadania i pisze kod. Agenci wspierający, jak twój critic, obserwują i zabierają głos. Widgety obserwują projekt i przysyłają pracę. Swarm rozchodzi się szeroko i przynosi tylko to, co ważne. A agent domenowy pilnuje jednej części bazy kodu. To jest kontrakt: co wchodzi, co wraca i czego agent nigdy nie dotyka. Żaden z nich nie edytuje niczego za plecami Maina.

## Hooki, CLI, HTTP, MCP: to tylko kable

00:10:44,165 \--\> 00:11:20,094 \[John Lindquist\]

A jeśli zastanawiasz się, gdzie w tym wszystkim jest miejsce MCP: hooki, CLI, HTTP, MCP, to wszystko tylko kable. Podłącz wielki stos surowych narzędzi prosto do Maina, a możesz zapełnić jego kontekst, zanim praca w ogóle się zacznie. Postaw za kablem agenta z jasnym kontraktem, a szum zostanie w jego kontekście i Main pozostanie lekki, niezależnie od tego, którego kabla używasz. Myśl o tym więc tak. Na razie wszystko to dzieje się, gdy siedzisz przy klawiaturze. Ale ten wzorzec, czyli wyzwalacz, który budzi agenta z jednym jasnym kontraktem, nie potrzebuje twojej obecności. A gdy do twojego produktu przyjdą agenci innych ludzi, ten sam wzorzec powtórzy się, jak w lustrze, przy drzwiach.
