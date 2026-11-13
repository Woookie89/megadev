# S03E05 · Produkty, które uczą się po wydaniu

Kiedy funkcja trafia na produkcję, zwykle dwukrotnie sprawdzamy, czy wszystko poszło dobrze. W zależności od budowanego systemu jego zachowanie jest logowane albo po to, by monitorować stabilność, albo po to, by dostarczać wniosków zespołom produktowym czy marketingowym. W obu przypadkach rzadko zwracamy większą uwagę na te logi, dopóki coś się nie zepsuje.

Może to sugerować, że wystarczy, by agenci weryfikowali zmiany po wdrożeniu i ewentualnie ustawili jakieś alerty lub skanery wykrywające anomalie. Ale na tym etapie kursu MEGA możemy zrobić znacznie więcej.

Produkt można ulepszać na wiele sposobów, zwłaszcza z pomocą agentów. I choć dbanie o techniczną stronę funkcji należy do naszych obowiązków jako inżynierów, nie oznacza to, że nie możemy wziąć odpowiedzialności za nieco szerszy zakres, tym bardziej że jest on ściśle związany z naszą dziedziną.

Agenci potrafią zbudować niemal każdą funkcję i wprowadzić niemal każdą zmianę. Wiemy już jednak, że samo to nie wystarcza, by zbudować właściwą rzecz we właściwy sposób. Czas więc ustalić, jak budować właściwą rzecz, patrząc szerzej na to, co jest możliwe dzięki AI i wiedzy, którą mamy.

## Plan

- Sygnały: analityka, logi, incydenty, opinie z supportu, język klientów, obserwowane zachowania
- Obserwacja: zamierzone a faktyczne rezultaty, tarcia, obejścia, regresje, niezamierzone skutki
- Synteza: grupowanie sygnałów, wykrywanie sprzeczności, analiza przyczyn źródłowych, pewność, dowody
- Decyzje: rozwinąć, poprawić, uprościć, cofnąć, zbadać lub zatrzymać
- Pętle sprzężenia zwrotnego: aktualizacje zgłoszeń, specyfikacji, ewaluacji, pamięci produktu, kontekstu agentów

## Sygnały

Aby ulepszyć cokolwiek w produkcie i jego funkcjach, musimy najpierw zebrać dane, głównie poprzez **nasłuchiwanie sygnałów**. Pochodzą one nie tylko z logów systemowych, ale też z każdego innego miejsca, które może zawierać przydatne informacje. W dotychczasowych lekcjach wspominaliśmy kilka źródeł sygnałów wartych uwzględnienia, takich jak **webhooki** raportujące zdarzenia z zewnętrznych usług, **heartbeaty**, które uruchamiają skrypty lub agentów skanujących wybrane źródła, **transkrypcje** spotkań sprzedażowych oraz opinie użytkowników z **kanałów supportu**.

Jeśli się nad tym zastanowić, istnieje wiele podobnych źródeł sygnałów, które mogą być przydatne do zbierania opinii o funkcjach lub o produkcie w ogóle. Część z nich może być użyteczna **nie tylko dla inżynierii**, ale także dla product managerów, marketingu czy sprzedaży. Gdy te zespoły otrzymają sygnał, mogą wykorzystać go u siebie i wrócić do nas z prośbami o nowe funkcje.

![Pętla sprzężenia zwrotnego po wydaniu funkcji. Po lewej znajduje się pudełko „Wydana funkcja”. Linia z podpisem „Zostawia ślady” prowadzi do ramki „Źródła sygnałów”. Zawiera ona pięć pudełek: logi systemowe; webhooki, czyli zdarzenia z innych usług; heartbeaty, czyli zaplanowane skany; transkrypcje spotkań sprzedażowych; kanały supportu, czyli opinie użytkowników. Linia z podpisem „Sygnały” prowadzi z tej ramki do ramki „Zespoły”. Zawiera ona cztery pudełka: inżynieria (my), produkt, marketing i sprzedaż. Gruba czerwona linia z podpisem „Prośby o funkcje” wychodzi z ramki Zespoły, biegnie pod obiema ramkami i wraca do pudełka Wydana funkcja. Wniosek: sygnały docierają nie tylko do inżynierii, a każdy zespół może zamienić je w prośby o funkcje.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-1/frame.html)

Źródła sygnałów różnią się w zależności od produktu, więc najpierw musimy je zidentyfikować, pracując zarówno z zespołem, jak i z agentami, ponieważ:

- zespół może nam powiedzieć, z jakich narzędzi korzysta, jak ich używa, czego mu brakuje itp. Może też wskazać, o czym chciałby być informowany i czego oczekiwałby po takich powiadomieniach.
- agenci mogą pomóc ustalić, jak dopasować przepływy pracy zespołu do tego, co oferują narzędzia, jakie inne usługi mogłyby się przydać i jak je zintegrować. Do takich zadań możemy użyć trybów „Deep Research” dostępnych w ChatGPT, Gemini lub Grok albo po prostu poprosić naszego agenta kodującego o poprowadzenie badania z użyciem podagentów.

Rezultatem tej pracy powinna być wiedza o **potrzebach biznesowych** i o tym, jak można je zaspokoić od strony **technicznej**, ale też o tym, **jak te informacje mogą pomóc naszym agentom** podejmować lepsze decyzje albo pomagać nam w ich podejmowaniu.

Ponieważ to, co otrzymamy, będzie zależało od naszego kontekstu, **załóżmy, że:**

- **Product Manager** korzysta z narzędzi analitycznych i systemu zgłoszeń oraz ma własne dashboardy i skille do badania rynku i zarządzania roadmapą. Interesuje go **szczegółowa aktywność użytkowników**, zna **kierunek**, w którym zmierza produkt, i ma opinie użytkowników.
- **Marketing** pracuje z analityką oraz narzędziami do kampanii, SEO i mediów społecznościowych. Interesują go **nadchodzące funkcje** i ważne aktualizacje produktu do promowania, a z mediów społecznościowych ma część opinii użytkowników.
- **Sprzedaż** pracuje głównie z CRM-em, nagraniami rozmów i transkrypcjami spotkań. Interesują ją nietechniczne informacje o produkcie i liczby, które za nim stoją. Z jej pracy możemy się dowiedzieć, o jakie funkcje proszą klienci i **co powstrzymuje ludzi przed zakupem**, a to także niezwykle cenna informacja zwrotna.
- **Zarząd** pracuje z raportami i zbiorczymi podsumowaniami od innych zespołów. Śledzi wskaźniki KPI, takie jak przychody i churn, oraz dba o płynność finansową. Choć dostęp do jego narzędzi bywa ograniczony, może dać nam cenny wgląd w **wizję** produktu lub całej firmy.

Oczywiście to tylko hipotetyczny scenariusz, ale jego celem jest pokazanie, jak myśleć o **kontekście wykraczającym poza nasz kod**, który mimo to może być użyteczny dla agentów. Jednocześnie posiadanie nawet części tych informacji może otworzyć drogę do budowania przydatnych **narzędzi wewnętrznych**.

![Diagram na trzech poziomach. Na górze ramka „Zespoły”. Zawiera szerokie pudełko Zarząd (daje: wizję, priorytety; potrzebuje: wyników, trendów) nad trzema pudełkami: Product Manager (daje: kierunek, opinie użytkowników; potrzebuje: szczegółowej aktywności użytkowników), Marketing (daje: opinie z mediów społecznościowych; potrzebuje: nadchodzących funkcji) oraz Sprzedaż (daje: prośby, powody niekupowania; potrzebuje: faktów o produkcie, liczb). Marketing i Sprzedaż dzielą przerywaną ramkę. Dwie równoległe pionowe linie łączą Zarząd z rzędem zespołów: „Wizja i priorytety” biegnie w dół, a „Wyniki i trendy” w górę. Dwie równoległe poziome linie łączą Product Managera z ramką Marketing i Sprzedaż: „Co nadchodzi i dlaczego” biegnie w prawo, a „Słowa klientów i utracone transakcje” wracają. Gruba czerwona linia z podpisem „Dowody, kontekst i potrzeby” prowadzi z ramki Zespoły w dół do pudełka „Inżynieria + agenci”. Dwie linie prowadzą stamtąd w dół do „Ulepszeń produktu” (dla klientów) i „Narzędzi wewnętrznych” (dla zespołów). Przerywana linia z obu dolnych pudełek, podpisana „Z powrotem do użycia”, biegnie prawą stroną z powrotem do ramki Zespoły. Wniosek: informacja przydatna jednemu zespołowi może pomóc innemu i pokazać nam, co budować.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-2/frame.html)

Jak zawsze, dobrze jest zacząć od małej rzeczy, na przykład od **przechwycenia zgłoszenia błędu** i przekazania go agentowi w chmurze, który naprawi błąd i przygotuje pull request. Po zmergowaniu pull requesta informacja wraca do zespołu, a użytkownik, który zgłosił problem, dostaje powiadomienie. Żeby to zadziałało, potrzebujemy:

- **Sygnał:** webhook z narzędzia supportu lub **wewnętrznego** kanału komunikacji otwiera zgłoszenie ze słowami samego użytkownika, metadanymi pomagającymi zidentyfikować użytkownika i identyfikatorem żądania. Ważna uwaga: **źródło musi być tu zaufane, aby uniknąć prompt injection.**
- **Triaż:** zgłoszenie musi zostać zidentyfikowane i opisane przez agenta, który także je kategoryzuje, wzbogaca, usuwa duplikaty itd. W niektórych przypadkach agent może poprosić człowieka o pomoc.
- **Ustalenie:** agent przygotowuje ustalenie, które może zawierać kroki odtworzenia, kryteria akceptacji itp. Może też zawierać dowody, że problem istnieje.
- **Agent w chmurze:** gdy ustalenie zostanie zaakceptowane, rutyna je podejmuje, wdraża poprawkę i zbiera dowody.
- **Dowód:** końcowy raport pokazujący różnice w systemie oraz dowody, że problem zniknął.
- **Merge:** merge uruchamia bramki jakości i wszystkie kontrole wymagane przed wdrożeniem.
- **Odpowiedź:** po zakończeniu pracy ostatnim krokiem jest powiadomienie źródła, a odpowiedź może w razie potrzeby zawierać szczegóły dotyczące problemu.

Większością tych działań mogą zająć się nasze własne skrypty, GitHub Actions lub agenci w chmurze dostępni w harnessie. Z perspektywy tego, co wiemy o programowaniu, może to wyglądać na bardzo złożone. Jednak przy dzisiejszych narzędziach skonfigurowanie takiego przepływu pracy jest często proste, choć, jak zawsze, trzeba też wziąć pod uwagę wiele szczegółów i przypadków brzegowych.

![Oś czasu jednego przykładowego zgłoszenia błędu od 09:12 do 11:22. Ma siedem kolumn: Sygnał, Triaż, Ustalenie, Agent w chmurze, Dowód, Merge i Odpowiedź. Ma cztery ścieżki: Źródło, Agenci, Kontrole i Zespół. Na ścieżce Źródło klient zgłasza błąd („Eksport ucina mi ostatnią stronę.”) przez zaufane źródło, którego słowa są danymi, a nie instrukcjami. To otwiera zgłoszenie dla agentów. Agenci kategoryzują i wzbogacają zgłoszenie oraz scalają 2 duplikaty. Następnie piszą ustalenie z krokami odtworzenia, kryteriami akceptacji i dowodem błędu. Zespół akceptuje ustalenie, co uruchamia rutynę. Agent w chmurze naprawia błąd i zbiera dowody. Agenci piszą potem raport końcowy z różnicami w systemie, przed i po. Na ścieżce Kontrole przechodzą bramki jakości, a następnie poprawka zostaje wdrożona. Wdrożenie uruchamia odpowiedź, a klient dostaje wiadomość („Naprawione w dzisiejszej aktualizacji.”). Czerwona linia identyfikatora żądania łączy zgłoszenie z odpowiedzią. Zespół jest pytany tylko wtedy, gdy coś jest niejasne, i zatwierdza tylko wtedy, gdy zmiana jest ryzykowna. Te dwa kroki są pustymi kropkami z linią przerywaną, bo zdarzają się tylko czasem. Na końcu zespół dostaje notatkę. Dolny rząd pokazuje, co wykonuje każdy krok: skrypt, przepływ pracy, przepływ pracy, agent w chmurze, agent w chmurze, przepływ pracy, przepływ pracy. Błąd, cytaty i godziny są przykładami.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-4/frame.html)

Żeby było jasne, nie mówimy tylko o prostych przepływach pracy. Im więcej informacji dostępnych dla naszych agentów, tym więcej możemy z nimi zrobić. Przepływy pracy można nawet zintegrować z produktem, a agenci mogą z nim wchodzić w interakcję, dostarczając wartość użytkownikom końcowym.

Kolejny przykład pochodzi z jednego z moich produktów. Pomysł to **onboarding na całe życie**: zamiast uczyć użytkowników obsługi produktu tylko raz, na początku, używamy agentów, by pomagali im nieustannie. Cały mechanizm jest dość prosty, ponieważ sprowadza się do przetwarzania **strumienia zdarzeń** opisujących działania użytkowników i ich kontekst, a następnie podejmowania decyzji na podstawie akcji dostępnych w produkcie. Agent nie wykonuje żadnej z tych akcji w imieniu użytkownika. Jedynie podpowiada optymalizacje lub funkcje, o których użytkownik może nie wiedzieć.

Poniżej znajduje się przykładowy dashboard pokazujący ogólne statystyki trwającego onboardingu, status zdefiniowanych etapów oraz odpowiedzi agentów na zdarzenia użytkowników.

![Przykładowy dashboard onboardingu na całe życie z agentami. To produkt ogólny, nie prawdziwy, a wszystkie liczby są przykładowe. Nagłówek zawiera tytuł „Onboarding na całe życie” i plakietkę „Na żywo”. Cztery kafelki ze statystykami pokazują: 128 „Aktywnych teraz”, 342 „Podpowiedzi kroków dzisiaj”, 41% „Wykonanych kroków” i 6 „Alertów dla zespołu”. Panel „Użytkownicy według etapu” ma cztery słupki: Rejestracja jest krótki, Pierwszy tydzień jest najdłuższy, Miesiące później jest średni, a Lata później krótki, z notatką „Onboarding nigdy się nie kończy”. Panel „Kanał agenta” zestawia każde zdarzenie użytkownika z odpowiedzią agenta: „Pominięto konfigurację” prowadzi do „Podpowiedź: zaimportuj swoje dane” (w produkcie). „Nigdy nie otwarto ustawień” prowadzi do „Podpowiedź: włącz przypomnienia” (w produkcie). „Utknął przy eksporcie” prowadzi do „Alert: support nawiązuje kontakt” (zespół). „Dwukrotnie oglądał cennik” prowadzi do „Alert: sprzedaż podejmuje kontakt” (zespół). Dolny pasek „Kontekst zespołu używany przez agentów” wymienia „Kierunek produktu”, „Funkcje do pokazania” i „Dlaczego ludzie nie kupują”.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-3/frame.html)

Podsumowując tę część: powyższe przykłady pokazują, że koncepcje stojące za tym, co Kent pokazał w wideo, można stosować nie tylko w pracy nad samym kodem, ale także w działaniach odbywających się wokół produktu lub wewnątrz niego.

## Obserwacja

Ta lekcja dotyczy **produktów, które uczą się po wydaniu**. Sama idea oznacza, że system musi **przypominać sobie i aktualizować** swoje wcześniejsze obserwacje oraz wiedzieć dość o oczekiwanym kształcie funkcji i produktu, by właściwie ocenić sytuację. A ta wiedza pochodzi nie tylko z kodu, ale także ze źródeł omawianych w dotychczasowych lekcjach. Na przykład agent potrzebuje początkowego **ustalenia** dotyczącego wydanej funkcji, aby mógł się do niego odwołać i ocenić, jak dobrze wyniki są z nim zgodne.

![Zamknięty tor biegowy pokazuje życie jednej funkcji. Strzałki na torze wskazują kierunek: od lewej do prawej na górnym pasie i od prawej do lewej na dolnym. Na górnym pasie są cztery punkty. Ustalenie: cel: przywrócić nieaktywnych użytkowników, sukces: 15% powrotów w 30 dni, zakres: jeden e-mail tygodniowo. Wydanie: cotygodniowy e-mail do nieaktywnych użytkowników. Sygnały: wróciło 18%, support: „Dlaczego co poniedziałek dostaję dwa e-maile?”. Ocena: porównuje sygnały z tym, co wie. Na dolnym pasie znajduje się Następne ustalenie: akceptujesz: połącz go z newsletterem. Wewnątrz pętli jest „Co wie agent”: ustalenie, wcześniejsze obserwacje, wizja i inne funkcje, plany zespołu: cotygodniowy newsletter. Ta ostatnia linia jest czerwona. Zakrzywione linie łączą te części. Ustalenie jest zapisywane w tym, co wie agent. Ocena przywołuje je, a następnie aktualizuje. Z Oceny wychodzą trzy odnogi poza prawy koniec toru. Dwie są przerywane, dla innych przypadków: „Zgadza się i pasuje” (zostaw, mierz dalej) oraz „Nie spełnia ustalenia” (wróciło mniej niż 15%). Jedna jest czerwona, dla tego przykładu: „Zgadza się, ale nie pasuje” (użytkownicy dostają teraz dwa cotygodniowe e-maile). E-mail, liczby i cytat są przykładami.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-5/frame.html)

Normalnie, aby system mógł obserwować samego siebie, musielibyśmy zbudować każdą obserwację od zera albo przygotować jakiś interfejs ułatwiający obserwację. Ale skoro pracujemy z agentami, naszym celem jest, by obserwacją **zarządzali agenci**, w sposób możliwie **niezawodny**. A najlepsza wiadomość jest taka, że już wiemy, jak to zrobić: **potrzebujemy odpowiednich prymitywów** i narzędzi, których agenci mogą używać do tworzenia **zaplanowanych przepływów pracy**.

Jeśli spojrzymy na proces z szerokiej perspektywy, możemy go podzielić na następujące fazy:

- **Wydanie:** wydając funkcję, potrzebujemy zarówno ustalenia, jak i dowodów. Powinny to być dokumenty, do których agent może się później odwołać.
- **Konfiguracja:** aby obserwacja działała, potrzebuje instrukcji, skilli i opcjonalnie skryptów. Każde uruchomienie rozpoczyna harmonogram lub zasubskrybowane zdarzenie.
- **Weryfikacja:** albo razem z nami, albo samodzielnie agent musi wiedzieć, czy konfiguracja działa i właściwie realizuje swoje cele.
- **Wybudzenie:** wyzwalacz uruchamia sesję agenta w tle z odpowiednią instrukcją, skillami i narzędziami.
- **Raport:** gdy agent uzna to za stosowne, może zostawić notatkę lub wysłać raport ze szczegółami uruchomienia. Ta notatka lub raport powinny być dostępne w kolejnych uruchomieniach.
- **Zarządzanie:** agenci powinni móc zarządzać harmonogramami, modyfikować je lub wyłączać, ale poziom ich uprawnień zależy od nas.

Architektura będzie się różnić, ale jej rdzeń będzie prawdopodobnie obejmował kilka obszarów z powyższej listy. Aby uczynić ją **elastyczną** i łatwą w zarządzaniu dla agenta, musimy wybrać właściwe prymitywy. Na przykład: **Subskrypcję**, która wybudza agenta, **Integrację**, która daje dostęp do źródła danych, **Skill** do powtarzalnych, podobnych przepływów pracy, **Dokument** do zarządzania wiedzą, **Dziennik** do zapisywania, co wydarzyło się w każdym uruchomieniu, oraz **Kanał** do komunikacji z ludźmi lub innymi agentami.

Poniżej znajduje się ogólna wizualizacja całego przepływu.

![Oś czasu jednej wydanej funkcji, którą agent obserwuje samodzielnie przez 30 dni, w sześciu kolumnach od lewej do prawej: Wydanie (dzień 0), Konfiguracja (dzień 0), Weryfikacja (dzień 1), Wybudzenie (dni 7–21), Raport (dzień 21) i Zarządzanie (dni 22–30). Ma cztery ścieżki. Zespół: wydaje funkcję, zatwierdza konfigurację (albo agent sprawdza sam), czyta raport i ustala granice tego, co agent może zmieniać. Agent: zapisuje ustalenie i dowody, pisze konfigurację, uruchamia ją raz na danych z zeszłego tygodnia, dodaje codzienną kontrolę rezygnacji z subskrypcji i wyłącza obserwację w dniu 30. Uruchomienia w tle: cztery uruchomienia w fazie Wybudzenie (pon., pon., zdarzenie, pon.) z przykładowymi odczytami: wróciło 9%, wróciło 14%, wzrost rezygnacji, wróciło 18%, po czym jedno z uruchomień wysyła raport: zgadza się, ale nie pasuje. Dokumenty: Ustalenie i dowody; Instrukcja, skille, opcjonalny skrypt i wyzwalacze; notatka po każdym z pierwszych trzech uruchomień; raport; oraz zaktualizowane wyzwalacze. Dokument z wyzwalaczami uruchamia każde wykonanie, a czerwona linia pod wszystkimi dokumentami mówi, że każde uruchomienie je czyta. Funkcja, liczby i dni są przykładami, które kontynuują przykład cotygodniowego e-maila.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-6/frame.html)

## Synteza

Sama obserwacja może dostarczać przydatnych sygnałów, ale rzadko prowadzi bezpośrednio do konkretnego działania. Sygnały trzeba przetworzyć i często rozpatrywać je razem z innymi sygnałami. Chcemy też, by każdy agent skupiał się na jednej rzeczy. Po części po to, by uniknąć „rozdęcia kontekstu”, ale także ze względu na uprawnienia i optymalizację kosztów.

Jeden z przykładów syntezy pochodzi z projektu Kenta i jest pokazany na poniższej ilustracji. Stworzył go jego agent, a najważniejsze jest to, że **Kent nie prosił o to bezpośrednio**. Funkcja była zmianą bezpieczeństwa, która zamykała lukę: „pakiety” publikowane przez użytkowników, które mogą uruchamiać inni ludzie i ich agenci, mogły używać poświadczeń, których pakiety nigdy nie zadeklarowały.

Plan agenta, zatwierdzony przez Kenta, umieszczał zmianę za flagą i stawiał jeden warunek: **flaga zostaje włączona dopiero wtedy, gdy skan produkcji jest czysty.** Tego samego ranka, tuż po wydaniu, agent uruchomił ten skan i znalazł 211 pakietów od 89 właścicieli, które wymagały ręcznych zmian. Flaga pozostała więc wyłączona, a Kent dostał dane potrzebne do podjęcia decyzji.

![Pięć etapów czytanych od lewej do prawej. Po lewej luźna chmura wielu małych szarych kropek jest podpisana „Wyniki sprawdzenia”, „wymagane przez ustalenie”. Cienkie zakrzywione szare linie biegną z chmury do trzech zwartych skupisk kropek, ułożonych od góry do dołu: „W porządku”, „nie trzeba działać”; „Agenci mogą naprawić”, „jedna poprawka, przetestowana na próbce”; oraz największe, na czerwono, „Wymagają decyzji”, „brak bezpiecznej poprawki”. Czerwona zakrzywiona linia prowadzi z tego skupiska do jednej większej czerwonej kropki, „Jedna główna przyczyna”, „wspólna dla większości ustaleń”, z ograniczeniem „jeden przypadek przeczytany w całości”. Druga czerwona linia unosi się do czerwonej kropki „Jedno pytanie”, „na które może odpowiedzieć tylko człowiek”. Przerywana pionowa linia jest podpisana „agent zatrzymuje się tutaj, zmiana pozostaje wyłączona”. Szara linia przecina ją i prowadzi do kropki po drugiej stronie, „Człowiek decyduje”, „odpowiedź staje się regułą”.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-7/frame.html)

Synteza może być też przydatna do identyfikowania **przyczyn źródłowych** problemów, zamiast po prostu zajmowania się objawami. Często wymaga to lepszego zrozumienia szerszego kontekstu i odkrycia wzorców, które nie zawsze są widoczne na powierzchni. Nie jest to oczywiste, zwłaszcza że dzisiejsi agenci często mają skłonność do **nadmiernego komplikowania** rozwiązań albo przeciwnie, upraszczają zbyt mocno i pomijają przypadki brzegowe. Co więcej, wielu agentów może nadpisywać swoją pracę nawzajem, jeśli kontekst jasno nie wyjaśnia, dlaczego dana zmiana została wprowadzona.

Przykład pochodzi znów z projektu Kenta, w którym [Sentry](https://sentry.io/welcome/) zgłosiło problem naprawiony przez agenta. Około dwa tygodnie później problem wrócił w nieco innej postaci podczas testów. Ale zamiast naprawiać go w ten sam sposób, agent powiązał go z wcześniej rozwiązanym problemem, znalazł znacznie lepsze rozwiązanie i poczekał na zatwierdzenie przez Kenta, zanim je wdrożył.

![Diagram syntezy. Tor biegnie od „Zgłoszono problem” (objaw) przez „Szybką poprawkę” (obejmuje jeden przypadek) do „Wraca” (w nowej postaci). Krótka przerywana odnoga od „Wraca” kończy się odrzuconą opcją „Napraw tak samo”, która cofa decyzję i wraca. Zamiast tego czerwona ścieżka w kształcie litery U zanurza się pod powierzchnię, w kontekst. Łączy się i przekopuje przez wcześniejsze zgłoszenia, zapisane decyzje i kontekst produktu do jednej przyczyny źródłowej stojącej za oboma objawami. Następnie wynurza się do „Naprawy u źródła” (obejmuje każdy przypadek), „Człowiek zatwierdza” (przed wdrożeniem) i „Sygnał cichnie” (dowód, że zadziałało).](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-8/frame.html)

Oba przykłady pokazują, że agenci mogą nie rozwiązać niektórych problemów od razu. Powodem nie jest brak inteligencji. Część problemów można rozwiązać dopiero w dłuższym horyzoncie czasowym i wymagają one połączenia kropek między historycznymi zmianami a kontekstem, który nie jest dostępny wyłącznie w kodzie.

Myśląc o syntezie, znów musimy myśleć o tym, by **umożliwić agentowi dynamiczne poruszanie się po jego środowisku**. Możemy wtedy tworzyć narzędzia MCP lub CLI, które łączą go z wewnętrznymi narzędziami i źródłami danych. W ten sposób nie ma potrzeby ręcznego tworzenia przepływów pracy, ponieważ agenci mogą zarządzać nimi sami.

## Decyzje

Biorąc pod uwagę to, co już omówiliśmy, powinno być jasne, że agenci będą musieli podejmować wiele decyzji bez nas. Ile? To zależy od nas, ale także **od agentów** oraz od zasad i reguł, które im damy. Zastanawiając się nad tym, możemy wziąć pod uwagę takie kwestie:

- **Ścisłe bariery:** przy agentach niemal nie ma powodu, by nie mieć przepływów CI/CD, a gdy je mamy, możemy ustawić ścisłe reguły, których agenci nie mogą obejść i które deterministycznie blokują ich zmiany przed wdrożeniem. Podobne bariery można ustawić przez zakres narzędzi i kontekst udostępniony agentom. Dlatego często unikamy pracy z jednym agentem i zamiast tego uruchamiamy agentów w zależności od zadania.
- **Ustalenie:** po zakończeniu pracy agenci powinni sprawdzić wynik względem początkowego ustalenia. Ustalenie może też zawierać sekcję z jasnymi oczekiwaniami w formie zasad, które określają, kiedy agent może się z nami skontaktować. Kontakt może być dozwolony także **przed ukończeniem zadania**, na przykład gdy coś pójdzie nie tak albo agent po prostu potrzebuje więcej kontekstu.
- **Odwracalność:** agentów można kierować tak, by mogli podejmować decyzje, które łatwo odwrócić lub których ewentualne błędy są tanie do naprawienia. W rzeczywistości przygotowanie systemu tak, by zmiany dało się łatwo cofać, może zwiększyć nasze zaufanie do agentów.
- **Preferencje:** wreszcie możemy mieć osobiste preferencje co do tego, gdzie i kiedy chcemy być wzywani. Na przykład agent może mieć pozwolenie, by docierać do nas różnymi kanałami w zależności od pilności sytuacji.

W zależności od kontekstu naszego produktu, struktury organizacyjnej i wewnętrznej polityki naszym celem będzie **ograniczenie do minimum obszarów, w których jesteśmy potrzebni**. Pomaga też myślenie o tym w kategoriach **obszarów**, które chcemy mieć pod okiem, na przykład **decyzje dotyczące produktu** pozostają po naszej stronie, a szczegóły implementacji trafiają do agentów.

Czasem coś idzie nie tak mimo kontroli, zasad, a nawet ręcznej weryfikacji. Dane mogą zostać uszkodzone lub utracone. W takich przypadkach agentom też można powiedzieć, co robić, aby pomogli nam szybko się odbudować. Aby to ułatwić, Kent ma dokument [disaster recovery](https://github.com/kody-hq/kody/blob/main/docs/contributing/disaster-recovery.md#live-evidence-log), który agenci na bieżąco aktualizują.

## Pętle sprzężenia zwrotnego

Ostatnim elementem „produktów, które uczą się po wydaniu” jest **pętla sprzężenia zwrotnego**. Jej celem jest sprawienie, by system z czasem stawał się „mądrzejszy” i „uczył się” na swoich błędach.

Mamy już większość elementów potrzebnych pętli sprzężenia zwrotnego. Omówiliśmy globalny kontekst, taki jak wizja produktu, mapy funkcji i rekordy decyzji, a także różne rodzaje dzienników, które śledzą wszystko, czego agenci nie mogą wywnioskować wyłącznie z kodu i dostępnych narzędzi (takich jak historia repozytorium).

Kształt pętli sprzężenia zwrotnego w dużej mierze zależy od działań agentowych w naszym projekcie. Każde działanie, czy to naprawa błędu, przegląd, zaplanowana obserwacja czy rozmowa z klientem, jest potencjalnym źródłem przydatnej wiedzy. Po każdym z nich agent musi więc zadać pytanie w rodzaju: **czy wyniknęło z tego coś użytecznego, a jeśli tak, dokąd to powinno trafić, żeby nikt nie musiał uczyć się tego ponownie?** Agent oceniający działanie może na nie odpowiedzieć tylko wtedy, gdy ma dostęp do kontekstu produktu.

To, dokąd trafi rezultat, zależy od tego, czego agent się nauczył, a każdy rodzaj wiedzy ma swoje miejsce, które zbudowaliśmy już w poprzednich lekcjach:

- **Zgłoszenia:** nowa praca, której nie można wykonać od razu, na przykład problem znaleziony przez przepływ triażu supportu (**S01E05**) lub drobna uciążliwość, na którą agent natknął się podczas pracy.
- **Specyfikacje:** zmiana tego, co robi produkt, trafia do mapy funkcji (**S03E03**), a jeśli wpływa na kierunek produktu, do wizji produktu (**S01E04**).
- **Ewaluacje:** błąd, który może się powtórzyć, staje się przypadkiem ewaluacyjnym (**S02E05**), dzięki czemu następna zmiana jest sprawdzana pod kątem tego, czego nauczyła nas produkcja.
- **Pamięć produktu:** decyzja podjęta przez człowieka trafia do rekordów decyzji (**S03E02**) lub bazy wiedzy (**S01E03**).
- **Kontekst agenta:** lekcja o tym, jak agenci powinni pracować, trafia do AGENTS.md, zasad lub skilli (**S01E02**, **S03E02**).

![Diagram. Cztery przykładowe działania (naprawa błędu, przegląd, zaplanowana obserwacja, rozmowa z klientem) trafiają do jednego pudełka, „Agent ocenia działanie”, które pyta: „Czy wyniknęło z tego coś użytecznego? Dokąd to powinno trafić?”. Cienka linia z „Kontekstu produktu” (mapa funkcji, decyzje, wizja) także wchodzi do pudełka, ponieważ agent potrzebuje go, by odpowiedzieć. Z pudełka linie prowadzą do pięciu miejsc docelowych: Zgłoszenia dla nowej pracy (S01E05), Specyfikacje dla tego, co robi produkt (S03E03, S01E04), Ewaluacje dla błędów, które mogą wrócić (S02E05), Pamięć produktu dla decyzji podjętych przez ludzi (S03E02, S01E03) oraz Kontekst agenta dla tego, jak agenci powinni pracować (S01E02, S03E02). Przerywana linia podpisana „Nic użytecznego” prowadzi do małego znacznika „Pomiń”.](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s03e05/artifacts/lesson/figure-9/frame.html)

W projekcie Kenta ten proces jest opisany jako **[pętla ciągłego doskonalenia](https://github.com/kody-hq/kody/blob/main/docs/contributing/harness-engineering.md)**: **zdefiniuj intencję → zbuduj → sprawdź → zapisz, czego się nauczono → przekształć powtarzające się wskazówki w egzekwowanie.** Ostatni krok jest najciekawszy: gdy ten sam błąd zdarza się ponownie, zostaje zakodowany jako zabezpieczenie, takie jak reguła lintera, sprawdzenie typów czy test.

Jednym z przykładów **pętli sprzężenia zwrotnego** jest **[dziennik tarć](https://github.com/kody-hq/kody/blob/main/docs/contributing/friction-log.md)** (friction log). Ilekroć repozytorium przeszkadza agentowi (lub człowiekowi) i zdarza się to więcej niż raz, zgłasza on issue z etykietą `friction`, które opisuje, co się stało, co chciał osiągnąć, jak to odtworzyć i ile to kosztowało.

Następnie, raz dziennie, zaplanowane zadanie podejmuje otwarte zgłoszenia tarć i uruchamia agenta w chmurze, który albo naprawia je w pull requeście, albo odkłada je dla Kenta z krótkim podsumowaniem i rekomendowaną poprawką.

Aby lepiej to zrozumieć, spójrzmy na coś, co naprawdę mu się przydarzyło. Pewnego ranka agent w chmurze wysyłał pull request i potrzebował tokena CLI. Gdy o niego poprosił, system odmówił, ponieważ osiągnięto limit aktywnych tokenów. Prawie wszystkie z nich zostały pozostawione przez innych agentów, bo każdy nowy agent w chmurze tworzy własny token. Agent obszedł problem, unieważniając trzy stare tokeny, ale zamiast o tym zapomnieć, zgłosił **[zgłoszenie tarcia](https://github.com/kody-hq/kody/issues/2966)**.

Następny codzienny przegląd podjął to zgłoszenie i znalazł przyczynę źródłową. Nie wdrożył poprawki, ponieważ zmiany w autoryzacji to decyzja Kenta. Odłożył więc zgłoszenie i zostawił mu podsumowanie z rekomendowaną poprawką. **[Poprawka została wdrożona tego samego dnia](https://github.com/kody-hq/kody/pull/2986)**, około dziesięciu godzin po tym, jak agent po raz pierwszy natknął się na problem. W tym samym pull requeście **[rekord decyzji](https://github.com/kody-hq/kody/blob/main/docs/contributing/decisions/0056-cli-credential-bootstrap.md)** dostał datowaną notatkę wyjaśniającą nową regułę i powód zmiany. Dzięki temu następny agent pracujący z tokenami przeczyta regułę, zamiast ponownie odkrywać problem. Agenci zauważyli problem, zapisali go i zbadali. Jedyna rola Kenta to jedna decyzja, która go wymagała.

Ale pętla nie jest domknięta, gdy poprawka zostaje wdrożona. Jest domknięta, gdy pierwotny sygnał zostanie zmierzony ponownie i ucichnie, tak jak w przykładzie z przyczyną źródłową w sekcji Synteza dzisiejszej lekcji. To samo dotyczy **eksperymentów**: Kent umieszcza zmianę za feature flagą, a gdy metryka pokazuje, że zmiana jest lepsza, wdraża ją dla wszystkich i **usuwa flagę** — i to jest ważna lekcja.

**Usuwanie jest równie ważne jak dodawanie**. Każda pętla coś po sobie zostawia: notatkę, regułę, kontrolę, dokument. Pętla, która tylko dodaje, powoli pogarsza agentów, ponieważ zaczynają mieć trudności z poruszaniem się po kontekście i mylą fakty. Dlatego, jak powiedzieliśmy w **S03E03**, agenci utrzymaniowi powinni głównie usuwać rzeczy. Jednym z przykładów jest **[sprzątanie po migracji](https://github.com/kody-hq/kody/blob/main/docs/contributing/cleanup-after-migrations.md)**.

Wreszcie pętle sprzężenia zwrotnego nie są tylko dla agentów. W projektach Kenta, gdy użytkownik zgłasza problem, a poprawka jest oczywista, trafia ona na produkcję, a **użytkownik dostaje odpowiedź**. Widzieliśmy to jako ostatni krok przepływu pracy ze zgłoszeniem błędu na początku tej lekcji. Kent robi to samo z opiniami o produkcie. Musimy jednak uważać: **pamiętajmy o prompt injection** i nie wpuszczajmy do systemu niefiltrowanych danych od użytkowników.

## Najważniejsze wnioski

Ta lekcja jasno pokazała, że **tworzenie produktów w duchu AI-native** to nie kilka promptów ani nawet przepływów pracy. Obejmuje ono wiele komponentów związanych z niemal każdym aspektem produktu, a nawet całej firmy.

Ostatnia uwaga: **produkt AI-native** może wykraczać poza wewnętrzne procesy i proces tworzenia, ponieważ sam produkt będzie często ewoluował do formy, w której **użytkownicy nie będą z niego korzystać bezpośrednio**. Zamiast tego będą to robić ich agenci w ich imieniu. Dobra wiadomość jest taka, że niemal wszystko, czego nauczyliśmy się do tej pory, już kieruje nasze myślenie w tę stronę, ponieważ takie rzeczy jak **prymitywy**, **MCP**, przepływy pracy, rutyny i bazy wiedzy odgrywają tam również ważną rolę.
