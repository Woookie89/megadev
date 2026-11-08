# S01E01 · Mechanika działania generatywnej AI

Generatywna AI zmienia sposób, w jaki pracujemy. Wielu z nas pracuje szybciej, mierzy się z bardziej złożonymi problemami albo podnosi jakość i bezpieczeństwo swoich produktów.

Jednak gdy **agenci przejmują coraz więcej pracy, którą wykonujemy od lat**, część z nas zaczyna zastanawiać się nad przyszłością programowania. Możemy się zastanawiać, czy za kilka miesięcy nadal będziemy mieć pracę. Po drodze ta zmiana może odbierać nam satysfakcję, poczucie sensu, a nawet radość, którą kiedyś czerpaliśmy z naszej pracy.

[MEGA.dev](http://mega.dev/) to opowieść o tym wszystkim. Zapraszam Cię, by przez najbliższe 4 tygodnie wspólnie poznawać generatywną AI. Razem z Theo, Angie, Kentem i Johnem przyjrzymy się temu, co znaczy być MEGA Developerem i jak nim zostać.

## Plan

- Wprowadzenie: generatywna AI, uprzęże, konfiguracja, narzędzia agentowe, narzędzia niestandardowe
- Mechanika: instrukcje, dopełnianie, tokenizacja, przewidywanie, uwaga, stosowanie się do instrukcji
- Ograniczenia: złudzenia, konfabulacje, wiedza bazowa, granica wiedzy, okna kontekstu, limity wyjścia
- Dostawcy: modele, możliwości, funkcje, ustawienia, ceny, specjalizacja, łączenie modeli
- Interakcje: generowanie tekstu, ustrukturyzowane wyniki, wywoływanie funkcji, narzędzia natywne, narzędzia zewnętrzne
- Sterowanie: uogólnianie, skojarzenia, samodzielne zadawanie pytań, przestrzeń ukryta, J-space, rozumowanie

Zanim zaczniemy: pierwsze dwie lekcje mają dać Ci **szeroką perspektywę** na wiele tematów. Nie oczekuj, że wszystko zrozumiesz w dzień czy dwa. Obejrzyj filmy, przeczytaj teksty, zapoznaj się z przykładami i ćwiczeniami oraz pobaw się tym, co przykuje Twoją uwagę.

## Warto wiedzieć o LLM-ach

Praca z dużymi modelami językowymi (LLM-ami) jest łatwa: **wystarczy wysłać wiadomość.** Jeśli jednak przyjrzymy się temu bliżej, odkryjemy sposoby na uzyskiwanie lepszych wyników, a możliwości wykraczają daleko poza bezpośrednią interakcję. W internecie znajdziemy konfiguracje, narzędzia i przepływy pracy, ale często trzeba je dostosować do naszych projektów i preferencji. Wtedy przydaje się ogólne zrozumienie tego, co dzieje się pod maską.

**Duże modele językowe** to zazwyczaj sieci neuronowe trenowane na dużych zbiorach tekstu, by generować treści przez przewidywanie, co pojawi się dalej. Możemy myśleć o nich jak o funkcjach, które przyjmują **wejście** (prompt) i zwracają **wyjście** (dopełnienie). Dziś jednak **modele takie jak GPT-6 przypominają bardziej systemy**, które mogą przetwarzać multimodalne wejścia, generować multimodalne wyjścia i „rozumować” nad tym, co robią.

LLM-y, z których korzystamy, są często dostępne za pośrednictwem platform i narzędzi takich jak ChatGPT, Cursor, Claude Code czy Gemini, ale możemy też komunikować się z nimi przez API. Niezależnie od używanego modelu czy narzędzi, pewne cechy i mechanizmy są zawsze obecne, nawet jeśli nie widać ich na pierwszy rzut oka.

Poniżej przedstawiamy przegląd **najważniejszych zagadnień**, które warto krótko poznać, zanim przejdziemy dalej.

**Tokenizacja:** LLM-y operują na liczbach, więc wszystkie dane, które chcemy przetworzyć, trzeba zakodować jako liczby, a następnie zdekodować z powrotem. Stąd pomysł tokenizerów, które przypisują identyfikatory fragmentom tekstu. Fragmenty są dobierane w procesie optymalizującym zarówno liczbę fragmentów w słowniku, jak i ich rozmiar. Na razie tyle wystarczy, ale jeśli chcesz dowiedzieć się więcej, [Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE&t=286s) to jedno z najlepszych źródeł na ten temat.

Wklej zdanie do [Tokenization round trip](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/tokenization-round-trip) i przyjrzyj się każdemu tokenowi oraz jego identyfikatorowi. Następnie wpisz to samo zdanie z emoji albo w innym języku i sprawdź, jak rośnie liczba tokenów.

![Pionowy diagram z pięcioma etapami. Zapytanie: przykładowy tekst „Hey, how are you?”. Kodowanie: sześć tokenów („Hey”, „,”, „ how”, „ are”, „ you”, „?”), a pod każdym jego identyfikator cl100k\_base (19182, 11, 1268, 527, 499, 30). Generowanie: model językowy. Dekodowanie: siedem nowych identyfikatorów (40, 2846, 3815, 2294, 11, 9523, 0), a pod każdym jego token („I”, „'m”, „ doing”, „ great”, „,”, „ thanks”, „!”). Wynik: przykładowy tekst „I'm doing great, thanks!”. Identyfikatory są czerwone, a tokeny mają neutralny kolor.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-1/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-1/frame.html)

**Przewidywanie następnego tokenu:** LLM generuje treść token po tokenie, „przewidując”, co pojawi się dalej na podstawie wcześniejszej treści. Powtarza ten proces do chwili wybrania specjalnego „tokena końca”. Trudność polega na tym, że nikt nie potrafi dokładnie określić, jaki będzie wynik ani dlaczego model wybiera konkretne tokeny. Po wybraniu tokenu nie można go już usunąć, więc jedna zła decyzja może negatywnie wpłynąć na kolejne tokeny, a ten efekt narasta. Znamy jednak wiele szczegółów mechanizmu, a [What Is ChatGPT Doing … and Why Does It Work?](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/) to starszy, ale nadal aktualny tekst na ten temat.

Możesz otworzyć [next-token probabilities](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/next-token-probabilities) i porównać „Miłego dnia” z „Piątkowe popołudnie. Miłego dnia”. Następnie kliknij token, który nie jest najbardziej prawdopodobny, i kontynuuj: każdy wybrany token staje się częścią tekstu, który model odczyta jako następny. Poeksperymentuj z kilkoma zdaniami, żeby zobaczyć, jak to działa.

![Wejściowy tekst „Have a nice” jest dzielony na trzy tokeny cl100k\_base: „Have” (12389), „ a” (264) i „ nice” (6555). Tokeny trafiają do modelu językowego. Model podaje cztery przykładowe prawdopodobieństwa następnego tokenu: „ weekend” 41%, „ day” 34%, „ trip” 17%, „ evening” 8%. Model wybiera „ day” (1938), mimo że nie jest to najbardziej prawdopodobny token, i dopisuje go do wejścia.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-2/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-2/frame.html)

**Niedeterministyczność**: Nawet przy tym samym wejściu LLM-y nie zawsze zwracają ten sam wynik. Wynika to nie tylko z modelu i jego ustawień; rolę może odgrywać również sprzęt, co omawia [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/). Dla nas oznacza to, że **[nigdy nie możemy mieć całkowitej pewności co do wyników](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/same-prompt-many-runs) generowanych przez model językowy**, niezależnie od tego, jak wygląda prompt i jakie są ustawienia. To zupełne przeciwieństwo tego, czego przez lata nauczyło nas programowanie.

Komunikując się z LLM-ami przez API, możemy kontrolować parametry takie jak **temperature** i **top_p**, które wpływają na sposób wyboru kolejnych tokenów przez model. Ustawienie temperature na `0` oznacza, że wybierane będą najbardziej prawdopodobne tokeny, ale nie gwarantuje to powtarzalnych wyników.

![Diagram przepływu przedstawiający niedeterministyczność. Przykładowy prompt prosi o liczbę pierwszą od 10 do 20. Ten sam model z tymi samymi ustawieniami jest uruchamiany trzy razy. Zwraca 13, 17 i 15. Odpowiedź 15 jest błędna i oznaczona na czerwono.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-3/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-3/frame.html)

**Konfabulacje (lub halucynacje):** Modele generatywne są trenowane na ogromnych, ale ograniczonych zbiorach danych i generują wyniki na podstawie prawdopodobieństw. Ich wiedza nie obejmuje wszystkiego i jest ograniczona w czasie — nazywamy to **granicą wiedzy**. Zachowanie modelu zależy też w dużym stopniu od dostępnego kontekstu i zadania. W rezultacie **modele popełniają błędy**, a praca z nimi nie polega na pewności, lecz na **zwiększaniu szans na uzyskanie oczekiwanych wyników**. Warto przeczytać [Why language models hallucinate](https://openai.com/index/why-language-models-hallucinate/). Warto wiedzieć, że nie mamy rozwiązania, które całkowicie eliminuje konfabulacje.

Uruchom [Confabulation probe](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/confabulation-probe), aby zapytać „Opowiedz mi o Alice” bez kontekstu, a potem z dwoma różnymi kontekstami. Odpowiedź bez kontekstu może się zmieniać, ale ścisłe halucynacje zdarzają się dziś rzadko i wynikają głównie z błędnego lub brakującego kontekstu.

![Przykład: trzy osoby mają na myśli różne Alice: przyjaciółkę, projekt i postać z książki. Każda z nich wysyła ten sam prompt: „Opowiedz mi o Alice”. Model dostaje tylko ten prompt i odpowiada: „Alice to dziewczynka, która podąża za królikiem do Krainy Czarów”. W przypadku przyjaciółki i projektu odpowiedź jest błędna. W przypadku postaci z książki jest przypadkowo poprawna.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-4/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-4/frame.html)

**Rozumowanie:** Modele językowe „myślą” na dwa sposoby: jawnie, generując tokeny „myślenia” przed odpowiedzią, oraz niejawnie, w ramach pojedynczego przebiegu w przód. Tekst Anthropic „[Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html)” pokazuje, że ta niejawna część odbywa się w **J-space** — niewielkim zbiorze reprezentacji przypominających słowa, które pełnią rolę podobną do globalnej przestrzeni roboczej w ludzkim mózgu.

Dłuższe rozumowanie często prowadzi do lepszych wyników, ale zajmuje też więcej czasu i kosztuje więcej. Ustawienia rozumowania różnią się w zależności od dostawcy i często możemy je zmieniać. Właściwe ustawienie zależy jednak od modelu i zadania, które chcemy mu powierzyć.

Dobrze widać to w [Reasoning effort](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/reasoning-effort), gdzie na każdym poziomie wysiłku model otrzymuje jedno weryfikowalne zadanie, a następnie porównywane są tokeny rozumowania, czas i koszt z poprawnością odpowiedzi. Warto porównać wyniki z mniejszym modelem, by znaleźć najniższy poziom, na którym nadal odpowiada poprawnie.

Istnieją jednak przesłanki, że rozumowanie nie działa dokładnie tak, jak moglibyśmy się spodziewać: modele, zwłaszcza mniejsze, nie radzą sobie z zadaniem tylko dlatego, że informacje przedstawiono w innej kolejności ([Premise Order Matters](https://arxiv.org/pdf/2402.08939)), co możemy zaobserwować [tutaj](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/premise-order).

![Pionowy diagram z przykładowym zapytaniem „Ile wynosi 17 × 6?”. Zapytanie trafia do modelu. Najpierw model generuje tokeny rozumowania, oznaczone na czerwono, na przykład „10 × 6 = 60, 7 × 6 = 42”. Następnie generuje odpowiedź: 102.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-5/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-5/frame.html)

Nie mówimy tu wyłącznie o teorii, lecz o podstawach generatywnej AI, jakie znamy z ostatnich kilku lat. Większość tych mechanizmów pozostała niezmienna od premiery ChatGPT w listopadzie 2022 roku i nadal jest przydatna, niezależnie od tego, czy pracujemy z agentami, budujemy uprzęże czy tworzymy agentów od podstaw.

## Mechanika dużych modeli językowych

Aby wejść na wyższy poziom pracy z agentami, musimy dobrze rozumieć ich podstawowe mechanizmy, by wykorzystywać ich mocne strony i unikać słabych.

**Żądanie:** Każde żądanie wysyłane do LLM zawiera **kontekst** i **ustawienia**. Kontekst to często tablica wiadomości, którą trzeba „uzupełnić” odpowiedzią AI. Ustawienia obejmują model i poziom rozumowania, a także dostępne narzędzia i pola specyficzne dla platformy. Obecnie najpopularniejszym formatem komunikacji z API LLM jest [Responses API](https://developers.openai.com/api/docs/quickstart). Możesz wypróbować je w przykładzie [Responses API request](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/responses-request), obejrzeć surowy JSON wysyłany do dostawcy oraz JSON, który wraca. Znajdź `usage` i zwróć uwagę, że `output` jest listą, a nie pojedynczym ciągiem znaków.

![Po lewej żądanie Responses API w formacie JSON: model, poziom rozumowania, jedno narzędzie maps\_distance i wiadomość użytkownika „Trasa Paryż–Lyon samochodem?”. Po prawej odpowiedź w trzech turach: Model z wywołaniem narzędzia maps\_distance("Paris", "Lyon"), oznaczonym na czerwono; Narzędzie z wynikiem { "km": 465 }; oraz Model z tekstem „Samochodem z Paryża do Lyonu jest około 465 km”. Nazwa modelu, miasta i odległość to przykładowe wartości.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-16/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-16/frame.html)

**Dopełnianie:** LLM-y generują treści, „przewidując kolejny token”, a możliwość rozmowy z nimi wynika wyłącznie z formatu o nazwie [ChatML](https://model-spec.openai.com/2026-08-18.html#definitions), który porządkuje przetwarzany kontekst za pomocą specjalnych tokenów. Możesz poeksperymentować z nim przy użyciu [Tiktokenizer](https://tiktokenizer.vercel.app/). Współczesne LLM-y strukturyzują swoje odpowiedzi **za pomocą specjalnych tokenów**, dzięki czemu łatwo rozpoznajemy, co powiedział użytkownik, co zostało wygenerowane i które instrukcje pochodzą od twórców używanego narzędzia. Innymi słowy, **z perspektywy modelu wiadomości czatu to po prostu tekst.**

Otwórz [Chat template](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/chat-template), aby zobaczyć wątek z poniższej ilustracji jako tekst odczytywany przez model, ze specjalnymi tokenami wokół każdej roli. Następnie wpisz `<|im_end|>` w wiadomości użytkownika: zamienia się w sześć zwykłych tokenów, więc użytkownik nie może zakończyć własnej tury.

![Dwie kolumny. Po lewej przykładowy wątek z żądania jako sekwencja tokenów, w osobnym wierszu dla każdej wiadomości, ze specjalnymi tokenami \<|im\_start|>, \<|im\_sep|> i \<|im\_end|> zaznaczonymi na czerwono. Po prawej ten sam wątek jako wiadomości czatu: system „Odpowiadaj krótko”, użytkownik „Cześć”, asystent „Witaj” oraz otwarta wiadomość asystenta. Ostatni wiersz kończy się ciągiem \<|im\_start|>assistant\<|im\_sep|> i pustym miejscem na kolejny token. Liczby tokenów są szacunkowe: treść jest dzielona za pomocą cl100k\_base, a każdy specjalny token liczy się jako jeden token, łącznie około 20 tokenów.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-6/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-6/frame.html)

**Okno kontekstu:** LLM potrzebuje wszystkich treści koniecznych do wygenerowania odpowiedzi, ale ilość, którą może przetworzyć, jest ograniczona do około 250 tys.–1 mln tokenów, zależnie od modelu. W praktyce rzadko osiągamy ten limit, ponieważ narzędzia wykorzystują różne formy automatycznej kompakcji.

Warto jednak pamiętać, że **nie wszystko** w wątku jest przekazywane modelowi. Jednocześnie wiemy, że **model przewiduje następny token na podstawie dostępnego dotąd kontekstu**. Dlatego dłuższe rozmowy z agentami są **stratne**: część informacji zostaje skompresowana albo usunięta.

![Ilustracja opisana „Okno kontekstu”, mieszczącego około 250 tys.–1 mln tokenów, zależnie od modelu. Od góry zawiera prompt systemowy i definicje narzędzi. Niżej znajdują się wcześniejsze wiadomości, które skompaktowano lub skrócono, następnie wiadomość użytkownika, rozumowanie AI, wywołanie narzędzia przez AI, wynik narzędzia, dalsze rozumowanie AI i odpowiedź AI. Czerwony znacznik „następny token” kończy odpowiedź: model przewiduje go na podstawie całej wcześniejszej treści. Kreskowany obszar u dołu pokazuje pozostałą pojemność. Diagram jest poglądowy i nie zachowuje skali.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-7/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-7/frame.html)

Kompakcja kontekstu z czasem staje się coraz lepsza, ale nadal mówimy o kompresji, więc część danych zostaje utracona **albo wyodrębniona**. W obu przypadkach model traci z oczu pierwotną treść naszego zapytania, przez co maleje szansa na uzyskanie oczekiwanego wyniku.

Strategie kompakcji kontekstu różnią się między uprzężami. W przykładzie [Context compaction](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/context-compaction) widać, że trzykrotna kompakcja wątku programistycznego powoduje utratę części informacji, co po cichu obniża wydajność. Następnie uruchom go z `--words 50` i porównaj, które fakty zostaną utracone.

![Trzy kadry od lewej do prawej: pierwotny wątek, skompaktowany raz i skompaktowany dwukrotnie, połączone strzałkami z podpisem „kompaktuj”. W każdym kadrze znajduje się to samo przykładowe zapytanie: „Zbuduj API zadań. Zachowaj istniejące trasy. Używaj znaczników czasu UTC. Nigdy nie zapisuj sekretów w logach”. W pierwszym kadrze tekst jest wyraźny, w drugim rozmyty, a w trzecim ledwo czytelny. Trzeci kadr jest czerwony. Rozmycie stanowi wizualną analogię stratnej kompakcji.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-20/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-20/frame.html)

**Rozumienie kontekstu:** To, że LLM może obsłużyć 1 mln tokenów, [nie znaczy, że warto z tylu korzystać](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/context-window-budget). Skuteczność rozumowania modelu nadal spada wraz z długością kontekstu. Zasadniczo modele działają najlepiej, gdy wykorzystują mniej niż 30–40% limitu kontekstu. Najnowsze modele bardzo dobrze radzą sobie z prostszymi zadaniami, takimi jak wyszukiwanie informacji w długim tekście.

![Dwa wykresy obok siebie. Po lewej wykres nachylenia dla odtwarzania informacji (MRCR 8-needle) w dwóch przedziałach kontekstu, 256–512K i 512K–1M: Astra spada ze 100% do 96%, a Sol z 92% do 74%. Po prawej poziome słupki rozumowania (AA-LCR) na skali 0–100: Kimi K3 — 89, Fable 5.1 — 85, Sol/5.5 — 84, Astra — 81. Astra jest zaznaczona na czerwono na obu wykresach. Zajmuje pierwsze miejsce w odtwarzaniu informacji, a ostatnie w rozumowaniu.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-12/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-12/frame.html)

**Multimodalność:** Modele mają różne możliwości, a niektóre przetwarzają nie tylko tekst, lecz także obrazy, dźwięk, a czasem nawet wideo. Aby to umożliwić, dane również muszą zostać stokenizowane (ale w inny sposób), a następnie przetworzone przez model. Najważniejsze jest to, że **modele przetwarzają liczby, a nie rzeczywiste informacje**, dlatego postrzegają obrazy, dźwięk, a nawet tekst inaczej, niż moglibyśmy się początkowo spodziewać. Na przykład modele językowe [często mają trudności ze zrozumieniem szczegółów](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/image-detail-probe), takich jak nachodzące na siebie elementy, dokładne kolory, [a nawet godzina na zegarze](https://clockbench.ai/ClockBench.pdf).

![Poglądowy diagram multimodalnego wejścia. Po lewej ułożono cztery wejścia: tekst „A dog is barking”, symbol zastępczy obrazu, przebieg fali dźwiękowej i trzy klatki wideo. Każde trafia do własnego kodera: tokenizer tekstu, koder obrazu (fragmenty), koder dźwięku, koder wideo (próbkowane klatki). Każdy koder zwraca krótki wiersz kwadratowych tokenów. Wiersze mają ten sam kształt kwadratów, ale różne wypełnienie dla każdej modalności. Wszystkie cztery wiersze znajdują się w czerwonej ramce zatytułowanej „Reprezentacje liczbowe”. Następnie trafiają do jednego węzła: „Model multimodalny, Transformer”. Wiersz tekstu ma 5 tokenów, ponieważ cl100k\_base dzieli frazę na A, dog, is, b, arking. Pozostałe liczby tokenów są przykładowe. Uwaga: architektura poglądowa; implementacje mogą się różnić.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-11/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-11/frame.html)

**Ustrukturyzowane wyjścia:** Model może generować tekst w postaci ciągu JSON, który można łatwo przetwarzać w kodzie. Dzięki temu możemy **wyodrębniać** informacje z nieustrukturyzowanych dokumentów, a także **wykorzystywać modele językowe w logice aplikacji**, która często przyjmuje postać agentów.

Aby zobaczyć, jak to działa, uruchom [Structured output](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/structured-output) dla Kioto oraz dla Tarvenmoor, miasta, które nie istnieje. Obie odpowiedzi przechodzą sprawdzenie schematu: **schemat kontroluje kształt odpowiedzi, a nie jej prawdziwość**.

![Przykład wyodrębniania danych z faktury. Trzy wejścia trafiają do modelu językowego: dokument w kontekście („Faktura od Hoshino Tea, Kioto. Do zapłaty: 48 000 jenów”), skrócony schemat JSON zawierający pola vendor, city, country, total i currency wraz z ich typami oraz wiedza bazowa z treningu („Kioto to miasto w Japonii. Kod jena to JPY”). Model wyodrębnia obiekt JSON. Dane sprzedawcy, miasta i kwoty pochodzą z dokumentu. Kraj i waluta pochodzą z wiedzy bazowej. Faktura, wartości i skrócony schemat są przykładowe.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-8/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-8/frame.html)

**Wywoływanie funkcji:** Skoro modele mogą generować ciągi JSON, jedno ze zwracanych pól może zawierać **nazwę funkcji**, a więc [bezpośrednio wskazywać narzędzie, którego trzeba użyć](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/function-calling). Kod obsługuje te informacje, wykonuje działanie z wygenerowanym ładunkiem i przekazuje wyniki z powrotem do modelu.

![Pionowy diagram przepływu wywoływania funkcji. U góry znajduje się ramka żądania z opisami schematów narzędzi i zapytaniem użytkownika. Oba trafiają do modelu. Model generuje JSON zawierający nazwę narzędzia, zaznaczoną na czerwono. Kod użytkownika uruchamia to narzędzie. Wynik narzędzia wraca do modelu, a model odpowiada. Narzędzia, zapytanie, JSON, wynik i odpowiedź to przykładowe wartości.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-9/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-9/frame.html)

**Tryb kodu:** Wywoływanie funkcji wymaga umieszczenia wszystkich schematów w kontekście, by model mógł zdecydować, którego narzędzia użyć. Wiemy jednak, że okno kontekstu ma ograniczenia, a dołączanie tych wszystkich informacji jest marnotrawstwem, jeśli interakcja ich nie wymaga. Jednocześnie najnowsze modele bardzo dobrze piszą kod.

Prowadzi nas to do scenariusza, w którym model otrzymuje tylko **dwa narzędzia, na przykład „find” i „execute”**. To wystarcza, by agenci **pisali kod** przy użyciu **dostępnych możliwości**. Pod niemal każdym względem jest to wydajniejsze od wywoływania funkcji, ale trudniej wdrożyć to na produkcji, ponieważ kod trzeba wykonywać w piaskownicach, takich jak [Daytona](https://www.daytona.io/) lub [Cloudflare](https://developers.cloudflare.com/agents/tools/codemode/). W przypadku agentów programistycznych działających na naszych komputerach jest to często dużo łatwiejsze, bo uruchamiają skrypty lokalnie.

Różnicę widać w przykładzie [Code mode](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/code-mode), gdzie to samo zadanie uruchamiamy dwa razy: raz z 30 narzędziami funkcyjnymi, a raz tylko z `find` i `execute`. W naszych uruchomieniach domyślnego zadania wywoływanie funkcji zużywało około 2300 z 3000 tokenów wejściowych na schematy narzędzi. Spróbuj też zapytać „Kim jestem?” — zadanie wymagające jednego wywołania może kosztować więcej w trybie kodu.

![Diagram sekwencji trybu kodu między modelem, uprzężą i piaskownicą. Uprząż udostępnia modelowi tylko dwa narzędzia: find i execute. Najpierw model wywołuje find i otrzymuje sygnatury docs.search oraz docs.read. Następnie model wywołuje execute z kodem JavaScript, który przekazuje wyniki wyszukiwania do docs.read. Piaskownica uruchamia kod, a uprząż przesyła modelowi tylko wynik końcowy. Narzędzia docs, zapytanie, kod i wyniki to przykładowe wartości.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-10/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-10/frame.html)

LLM-y nie mogą fizycznie wchodzić w interakcje ze swoim otoczeniem, a ilość informacji, które mogą przetworzyć, jest ściśle ograniczona. Mogą jednak zwracać ustrukturyzowane dane, których użyjemy do wywoływania API. Dzięki temu możemy szybko przejść z interakcji z AI „od odpowiedzi do działania”. Widzimy to już w narzędziach agentowych takich jak Claude Code, Devin, Hermes i Grok Bot.

**Agenci:** Niektóre definicje mówią, że **agenci to po prostu pętle wywołań LLM**. Minimalnego agenta można zaimplementować w ten sposób, ale budowanie agentów staje się dużo bardziej skomplikowane, gdy muszą działać niezawodnie i wykonywać zadania rozciągnięte w czasie. Omówimy to szczegółowo w drugim tygodniu, więc na razie zapamiętajmy, że **agent to pętla, w której model decyduje, czy użyć narzędzia i kontynuować zadanie, czy odpowiedzieć tekstem, co kończy pętlę i zwraca odpowiedź**.

[Agent loop](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/agent-loop) pokazuje krok po kroku podstawową pętlę agentową: wywołanie narzędzia podtrzymuje pętlę, a odpowiedź tekstowa ją kończy. Ustaw limit kroków na 1, aby zobaczyć, jak pętla zatrzymuje się, zanim model zdąży odpowiedzieć.

![Diagram przepływu pętli agenta. Zapytanie trafia do modelu. W ramce pętli agenta model może użyć narzędzia, a wynik wraca, by model kontynuował pracę. Jeśli model odpowie tekstem, pętla kończy się, a tekst jest zwracany. Czerwona strzałka oznacza wyjście z tekstem.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-25/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-25/frame.html)

**CLI / MCP:** agenci mogą otrzymywać natywne narzędzia udostępniane przez uprząż, ale mogą też korzystać ze znanych narzędzi CLI, które najlepiej sprawdzają się **lokalnie**. W produkcji znacznie lepszym rozwiązaniem jest **MCP** (Model Context Protocol). Jest powszechnie używany i obsługiwany przez niemal wszystkie narzędzia, takie jak Claude, ChatGPT, Grok Bot i inne. Na razie wystarczy wiedzieć, że CLI / MCP mogą łatwo rozszerzyć możliwości agenta, [udostępniając mu **narzędzia**](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/mcp-tool-bridge), z których korzysta przez wywoływanie funkcji albo tryb kodu. Dobrym przykładem jest bardzo popularny [Playwright MCP](https://playwright.dev/docs/getting-started-mcp), który pozwala agentowi wchodzić w interakcje z przeglądarką.

![Diagram przepływu. Po lewej CLI i MCP udostępniają narzędzia. MCP może też udostępniać zasoby i umiejętności. Narzędzia trafiają do agenta, który korzysta z nich przez wywoływanie funkcji lub tryb kodu. Czerwona ramka wokół tych dwóch mechanizmów pokazuje, że pozostają takie same niezależnie od źródła narzędzi.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-26/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-26/frame.html)

## Platformy i uprzęże

Większość z nas będzie pracować z narzędziami AI takimi jak [Cursor](https://cursor.com), [Claude Code](https://claude.com/product/claude-code), [Pi](https://pi.dev) czy [T3 Code](https://t3.codes/). Każde z nich ma własne funkcje, ale wszystkie opierają się na tej samej podstawie: modelu językowym. Różnica tkwi w „opakowaniu”, czyli, mówiąc w przybliżeniu, w sposobie wykorzystania natywnych mocnych stron modelu i łagodzenia jego słabości oraz w tym, jak wpływa to na UX i ogólną wydajność.

Aby ułatwić pracę z AI, uprzęże często **ukrywają podstawowe mechanizmy**, dzięki czemu nie musimy się nimi przejmować. Problem w tym, że wymaga to uogólnienia rozwiązania tak, by działało dla większości użytkowników.

Na przykład:

- **Automatyczna kompakcja** rozwiązuje problem limitów okna kontekstu, dzięki czemu możemy prowadzić długie wątki bez błędów. Pod maską często dochodzi do dalszej kompresji i skracania, co sprawia, że wierzymy, iż „nasi agenci wiedzą, o czym mówimy”, choć w praktyce mogą widzieć tylko niewielką część tego, co my.

![Diagram przepływu w trzech kolumnach. Po lewej ramka „Wątek, który widzisz” zawiera starsze wiadomości, wyniki narzędzi, załączniki i najnowsze wiadomości. Uprząż podsumowuje starsze wiadomości. Usuwa wyniki narzędzi i odkłada załączniki na bok, więc oba elementy trafiają do sekcji „Nie wysłano do modelu”. Zachowuje najnowsze wiadomości. Ramka po prawej, „Kontekst otrzymywany przez model”, jest zaznaczona na czerwono. Zawiera tylko podsumowanie i najnowsze wiadomości.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-13/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-13/frame.html)

- **Tryb planowania**: Agenci często zachęcają nas do zaplanowania pracy w specjalnym trybie, który skupia się na dodawaniu kontekstu i jasnym opisie zadania. **To pomaga, dopóki plan nie stanie się zbyt szeroki lub zbyt szczegółowy.** W obu przypadkach modele mają trudność ze stosowaniem wszystkich reguł w jednym wątku. Lepiej podzielić plan na mniejsze zadania, ale koordynowanie ich zajmuje więcej czasu, chyba że agenci sami zarządzają swoją pracą, zamiast korzystać z trybu planowania. Omówimy to w kolejnych lekcjach.

![Diagram przepływu z przykładowymi punktami planu. Długi plan składa się z pięciu bloków: zbuduj API, dodaj interfejs, sprawdź uprawnienia dostępu, przetestuj przypadki błędów, zaktualizuj dokumentację. Blok interfejsu ginie podczas kompakcji, a testy przypadków błędów zostają pominięte w długim kontekście. Pozostałe trzy bloki trafiają do wyniku w niewłaściwej kolejności: najpierw sprawdzenie uprawnień, wykonane błędnie (oznaczone na czerwono), potem API, a na końcu dokumentacja.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-14/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-14/frame.html)

- **Umiejętności** to pliki (lub foldery) zawierające instrukcje, a czasem skrypty, które mają ukierunkowywać model na określone zachowania. Po włączeniu często pozostają w kontekście aż do usunięcia podczas kompakcji albo rozpoczęcia nowego wątku. Model może też sam uruchomić umiejętność, ale wybiera ją wyłącznie na podstawie jej nazwy i opisu, ponieważ nie da się jednocześnie wczytać wszystkich umiejętności do kontekstu.

  Przykład [Skill selection](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/skill-selection) pokazuje sześć umiejętności dodanych do kontekstu wyłącznie jako nazwy i opisy, użytych w 15 testowych żądaniach. Większość zadań kończy się powodzeniem, ale w niektórych umiejętność **nie jest wybierana wtedy, kiedy powinna, albo zostaje wybrana niepotrzebnie**.

![Pionowa oś czasu jednej rozmowy. Użytkownik włącza umiejętność przesyłania plików i umiejętność pojawia się w kontekście jako osobny blok. Użytkownik wysyła plik, agent widzi odwołanie do niego, korzysta z umiejętności i przesyła plik. Następnie użytkownik przechodzi do innego tematu. Czerwona linia po lewej zaczyna się przy bloku umiejętności i biegnie do końca osi czasu, pokazując, że umiejętność pozostaje w kontekście jako jedna kopia. Działania są szare, a tekst wiadomości ma główny kolor. Nazwa pliku report.pdf i wiadomości są przykładowe.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-15/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-15/frame.html)

- **Załączniki**, takie jak obrazy i inne pliki, a nawet same odwołania do nich, często są przedstawiane tak, jakby model widział je w całości. Prawie nigdy tak nie jest. AI musi wczytać ich zawartość, a czasem wczytuje tylko jej część. Innymi słowy, nawet jeśli interfejs sugeruje, że **agent widzi określone pliki i foldery**, nie oznacza to, że naprawdę je widzi. To samo dotyczy całej bazy kodu i wszelkiego rodzaju baz wiedzy.

![Diagram przepływu. Po lewej ramka „Wątek” zawiera wiadomość użytkownika „Przejrzyj src/auth.ts” i załącznik „project.zip”. Pliki projektu znajdują się poza wątkiem. Po prawej ramka „Kontekst modelu” zawiera wiadomość wyłącznie jako tekst, a załącznik tylko jako nazwę. Zawartość plików trafia do kontekstu dopiero po wczytaniu jej przez AI, czasem tylko częściowo. Nazwy plików są przykładowe.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-17/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-17/frame.html)

- **Środowisko**: Niektóre informacje, na przykład ogólny profil lub zestaw reguł, można przekazać modelowi z góry. Jednak gdy pracujemy z agentami, środowisko się zmienia. Na przykład zmieniają się pliki albo aktualizuje się repozytorium Git. Model musi być świadomy tych zmian, ale **nie możemy zmienić jego instrukcji** z powodu mechanizmu buforowania, który omówimy później. Na razie wystarczy wiedzieć, że **nasza wiadomość nie jest jedyną treścią, którą otrzymuje model**.

Umieść [Request inspector](https://github.com/MEGA-DOT-DEV/examples/tree/main/tools/request-inspector) między uprzężą a API, a następnie wyślij „Cześć”. Porównaj swoją wiadomość z promptem systemowym, definicjami narzędzi i blokami `<system-reminder>` dodanymi przez uprząż. Ten przykład ma **przycisk demonstracyjny**, który wczytuje próbkę z Claude Code.

![Blok buforowanych instrukcji znajduje się nad wiadomością użytkownika, a instrukcje się nie zmieniają. Wewnątrz wiadomości użytkownika uprząż umieszcza blok system-reminder z adresem e-mail użytkownika przed tekstem „Witaj, świecie”. Po nim uprząż dodaje wiersz reasoning\_effort i wiersz total\_tokens. „Witaj, świecie” to jedyny tekst wpisany przez użytkownika. Przykładowe wartości pochodzą z sesji Claude Code.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-21/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-21/frame.html)

Te przykłady pokazują **podstawowe mechanizmy** narzędzi, z których korzystamy na co dzień. Ich zachowanie zależy od ogólnego sposobu działania LLM-ów i dostawcy API, ale zawsze **wpływa na nasze doświadczenie i uzyskiwane wyniki**. W trakcie kursu omówimy jeszcze więcej podobnych zachowań i technik, które pozwolą nam wykorzystać je na swoją korzyść.

Przyjrzyjmy się teraz bliżej popularnym dostawcom, takim jak OpenAI, Anthropic, xAI oraz DeepMind / Google, ich ofercie i narzędziom.

- **OpenAI** oferuje modele GPT i niemal pełen zakres możliwości multimodalnych, w tym generowanie i edycję obrazów, rozumienie i generowanie dźwięku oraz generowanie wideo. Jego głównym produktem jest ChatGPT, a OpenAI ukształtowało popularny format API o nazwie [Responses API](https://developers.openai.com/api/reference/responses/overview).
- **Anthropic** oferuje modele Claude i skupia się na generowaniu tekstu oraz rozumieniu obrazów. Jego główne produkty to Claude i Claude Code.
- **xAI** dąży do zaoferowania pełnego zakresu możliwości multimodalnych. Jego główne produkty to Grok i Grok Bot.
- **DeepMind / Google** oferuje pełen zakres możliwości multimodalnych, w tym rozumienie wideo. Ma także własny format API o nazwie [Interactions API](https://ai.google.dev/gemini-api/docs/interactions-overview).
- Bonus: istnieją też platformy takie jak [OpenRouter](https://openrouter.com/), które zapewniają łatwy dostęp do modeli wszystkich największych laboratoriów oraz ogromnej biblioteki modeli open source.

Z technicznego punktu widzenia można sprawdzić, który model jest w danym momencie najlepszy do określonego zadania (zob. [Artificial Analysis](https://artificialanalysis.ai/)), ale sytuacja często się zmienia. Warto więc unikać „uzależnienia od dostawcy”, zwłaszcza że **do danego zadania możemy chcieć użyć innego modelu**, by zoptymalizować koszt i szybkość, albo **kilku modeli do tego samego zadania**, by poprawić jakość.

Pracując z AI, niemal zawsze chcemy korzystać z **najlepszych dostępnych modeli**, choć są zadania, które chcemy zautomatyzować lub uruchamiać na dużą skalę. Wtedy warto sprawdzić, czy możemy obniżyć ustawienia rozumowania albo przejść na mniejszy model.

Aby uniknąć uzależnienia od dostawcy, omówimy konfigurację niezależną od uprzęży, z narzędziami ściśle niezwiązanymi z konkretnym dostawcą. W przypadku największych laboratoriów niezależność od uprzęży i dostawcy jest niemal tym samym, ponieważ każde z nich ma własną uprząż, na przykład Codex od OpenAI lub Claude Code od Anthropic. Zamiast Codex proponujemy na przykład pracę z [Pi](https://pi.dev/), [OpenCode](https://opencode.ai/) lub narzędziami takimi jak [T3 Code](https://t3.codes/) czy [Superset](https://superset.sh/).

## Uogólnione sterowanie

Być może znasz techniki promptowania takie jak chain of thought, few-shot prompting czy tree of thoughts, popularne przed pojawieniem się LRM-ów (Large Reasoning Models). Później pojawiły się ogólne pliki z instrukcjami, na przykład AGENTS.md, zawierające szerokie zasady i informacje personalizujące.

Ostatnio rozpowszechniło się przekonanie, że nie tylko nie potrzebujemy dodatkowego sterowania modelem, ale że może ono przynieść więcej szkody niż pożytku. Jest w tym trochę prawdy, ale rzeczywistość nie jest aż tak prosta. Nadal możemy chcieć ukierunkowywać model — nie przez precyzyjne instrukcje, których ma przestrzegać, lecz przez naprowadzanie go na określone zachowania. Na przykład:

- **Różne perspektywy:** Możemy zadać AI zestaw pytań i poczekać na wyniki. Możemy też zadać to samo pytanie kilku modelom, a następnie połączyć odpowiedzi. Inną możliwością jest poproszenie modelu o uruchomienie kilku **podagentów** (często w osobnych wątkach) i przydzielenie im różnych części zadania. Wykorzystuje to fakt, że modele „myślą”, generując tokeny, a każdy token zależy od tego, co go poprzedza.

  Uruchom [Ask models](https://github.com/MEGA-DOT-DEV/examples/tree/main/tools/ask-models), aby jednocześnie wysłać jedno pytanie do kilku modeli i połączyć odpowiedzi w odrębne perspektywy. Jeśli chodzi o podagentów, otwórz [Subagents as tools](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/subagents-as-tools): w moich testach jeden podagent na umowę poprawnie wypełnił 79–80 z 80 pól, podczas gdy pojedynczy agent analizujący wszystkie szesnaście umów — 75–79. Twoje wyniki mogą się różnić.

![Trzy sposoby organizowania pracy z AI, od góry do dołu. Najpierw zestaw pytań trafia do jednego modelu, który zwraca odpowiedzi. Następnie to samo pytanie trafia do Modelu A i Modelu B, a ich odpowiedzi są łączone. W trzecim przypadku koordynujący model dzieli zadanie między Podagenta A i Podagenta B, z których każdy działa we własnym wątku, po czym łączy wyniki.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-18/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-18/frame.html)

- **Samodzielne zadawanie pytań:** LLM-y dysponują ogromną wiedzą, ale jej duża część pozostaje poza zasięgiem bieżącej interakcji, czyli „pamięci roboczej”. Możemy zadać modelowi kilka pytań, zanim przekażemy właściwe zadanie. Możemy też **poprosić model, by sam zadał sobie pytania**, a następnie na nie odpowiedział, poszerzając własne rozumienie tematu.

  Uruchom [Self-querying](https://github.com/MEGA-DOT-DEV/examples/tree/main/examples/self-querying), aby dwukrotnie odpowiedzieć na jedno pytanie: najpierw bezpośrednio, a następnie po tym, jak model zada sobie pytania pomocnicze. Przeczytaj utworzone pytania i porównaj podczas kilku uruchomień, jak często każdy tryb obejmuje kluczowe zagadnienia.

![Diagram przepływu samodzielnego zadawania pytań. Pytanie użytkownika trafia do modelu. Model nie odpowiada od razu. Najpierw zadaje sobie pytania pomocnicze, zaznaczone na czerwono. W razie potrzeby pyta użytkownika, a użytkownik doprecyzowuje. Odpowiedzi i doprecyzowanie budują właściwy kontekst, który pomaga odpowiedzieć na pierwotne pytanie. Pytanie o ponowienie płatności, odpowiedzi i odpowiedź końcowa są przykładami.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-19/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-19/frame.html)

- **Pamięć**: Każdy wątek z LLM-em zaczyna się od zera, więc nie możemy oczekiwać, że nawet najinteligentniejszy model będzie wszystko o nas wiedział. Pamięć agentowa pozostaje nierozwiązanym problemem i omówimy różne strategie pozwalające uzyskać dzięki niej jak najlepsze wyniki. Na razie pamiętajmy, że **agent musi mieć sposób na dostęp do informacji potrzebnych** do wykonania zadania, nawet jeśli nie uwzględniono ich w pierwotnym żądaniu.

![Wątek agenta z przykładowymi wartościami. Użytkownik pisze tylko „Wyślij raport e-mailem do Anny”. W wywołaniu 1 model szuka w bazie wiedzy hasła „Anna”. Wynik narzędzia zawiera adres anna@example.com. W wywołaniu 2 model ma już ten adres i odpowiada.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-22/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-22/frame.html)

- **Samodzielne zarządzanie**: Pojawiają się oznaki, że oprogramowanie zmierza ku samodzielnej konfiguracji, a nawet samorozwojowi. Dobrym przykładem są Pi i [OpenCode 2](https://anoma.ly/notes/opencode-reloaded/), gdzie agenci mogą zarządzać wszystkimi ustawieniami bez ponownego wczytywania środowiska. Ten paradygmat zmienia zarówno sposób pracy z agentami, jak i tworzenia oprogramowania. Innymi słowy, agenci muszą stać się pełnoprawnymi elementami oprogramowania. Jako użytkownicy musimy zaś zastanowić się, **jak agenci mogą pracować w naszym imieniu** i **zarządzać sobą** przy minimalnym udziale z naszej strony.

![Diagram przepływu. Określasz cel dla agenta. Agent i ustawienia znajdują się we wspólnej ramce „Działająca aplikacja”. Agent zmienia ustawienia na miejscu. Czerwona linia oznacza tę zmianę. Zmiana ustawień wpływa na sposób działania agenta, więc agent zarządza samym sobą. Ścieżka od użytkownika przez interfejs do ustawień jest opcjonalna. Wartości ustawień są przykładowe.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-23/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-23/frame.html)

- **Agenci działający w tle i długotrwale**: Znamy już bezpośrednią pracę z agentami. Nadal jest wiele do poprawienia, ale szybko przechodzimy od agentów lokalnych do zdalnych, uruchamianych według harmonogramu i reagujących na zdarzenia. Projektuje się ich przede wszystkim z myślą o autonomicznej pracy, więc ich kontakt z ludźmi jest ograniczony. Musimy zapewnić im zarówno **dostęp do potrzebnych informacji**, jak i **narzędzia do bezpiecznego i niezawodnego wchodzenia w interakcje ze środowiskiem**. Często oznacza to uruchamianie agentów w piaskownicach, na własnym VPS-ie lub komputerze, z dedykowanymi kontami.

![Diagram przepływu. Harmonogram i zdarzenie uruchamiają agenta. Agent działa w piaskownicy na własnym VPS-ie, zaznaczonym czerwoną ramką. Wewnątrz ramki agent uzyskuje dostęp do informacji i wykonuje działania za pomocą narzędzi korzystających z dedykowanych kont. Linia przerywana oznacza ograniczony kontakt z człowiekiem.](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-24/frame.png)

[Otwórz ilustrację](https://hq.mega.dev/figures/s01e01/artifacts/lesson/figure-24/frame.html)

## Najważniejsze wnioski

Jak wspominałem, **ta lekcja ma dać Ci szeroki, ogólny obraz podstawowych mechanizmów**. Na tym etapie nie wszystko musi być całkowicie jasne. Możesz wyobrazić sobie, że wspinasz się na wzgórze i rozglądasz: widzisz wszystko dookoła, ale nie dostrzegasz każdego szczegółu.

Omówione dziś tematy można uznać za **podstawy generatywnej AI**. Modele rozwijały się głównie dzięki skalowaniu, a nie fundamentalnym zmianom architektury, dlatego ta wiedza pozostaje w przybliżeniu aktualna.

Jak w przypadku każdej technologii, z którą zetknęliśmy się w pracy, warto poznać szczegóły i zdobyć przynajmniej podstawową wiedzę o tym, co dzieje się pod maską. Dzięki temu możemy **rozumować od podstaw o pracy z agentami i ich budowaniu** oraz łatwiej odróżniać zwykły szum medialny od rzeczywistej wartości.
