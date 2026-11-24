# P72 · Zmianę dowodzi próba na przypadkach, których kandydat nie widział, a stałego sprawdzenia kandydat nie zmienia

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S04E05

> **Lekcje:**
>
> - S04E05 · Budowanie samodoskonalących się systemów inżynierskich → rozdział „Ewaluacja” — [po polsku](../../pl/s04e05-building-self-improving-engineering-systems.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s04e05-building-self-improving-engineering-systems.md#evaluation)
> - S02E05 · Niezawodność agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s02e05-agent-reliability.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s02e05-agent-reliability.md#evaluation)
>
> S04E05 radzi oddzielić ewaluatora od systemu, między innymi dla niezależności: system nie może zmienić sprawdzeń tak, żeby przechodziły. Sędzię buduje z pięciu prymitywów: Wersja, Przypadek, Sprawdzenie, Próba i Werdykt. Próba odtwarza Przypadki na Wersji, Sprawdzenia oceniają wynik, a Werdykt decyduje: zostawić, wycofać albo zapytać użytkownika. S02E05 opisuje ewaluacje agentów i zbiory przypadków, do których dopisuje się każdą porażkę.

**Zasada.** Kandydat (nowa wersja roli, promptu, skilla albo agenta) nie wyznacza sobie testu. Zanim
mu zaufasz, przechodzi dwie rzeczy, których sam nie zmienia: stałe sprawdzenie (reguły w kodzie i
zapieczętowane przypadki, napisane ze specyfikacji, a nie z kodu) oraz próbę na przypadkach, których
nigdy nie widział. Ćwiczenie, które jest jawne i za każdym razem takie samo, łapie luki tanio, ale
niczego nie dowodzi. Regułę, dla której nikt nie ma odłożonego przypadku, pokrywasz własną próbą.

**Dlaczego.** System, który stroisz na jawnym zestawie, uczy się tego zestawu: przechodzi jego
przypadki, a nie zadanie. Kandydat, który może zmienić swój test, zawsze go w końcu przejdzie, nawet bez
złej woli, bo poprawianie testu wygląda jak poprawianie kodu. Dlatego sprawdzenie leży poza zasięgiem
kandydata, a o tym, czy zmiana działa, mówi dopiero próba na przypadkach odłożonych (held out). Zmyślone
wartości w zapieczętowanych przypadkach mają swoją rolę: kandydat, który skopiował liczby, zamiast je
czytać, nie przejdzie. Odłożony zestaw pokrywa tylko to, co jego autor przewidział, więc każda reguła
bez takiego przypadku pozostaje niesprawdzona, dopóki nie dopiszesz własnego.

**Przypadek.** S04E05, fabryka ról Host Desk. W języku lekcji:

- Wersja: rola refund-runner zrobiona z danego commita fabryki.
- Przypadki: 15 zapieczętowanych przypadków w `factory/make-a-role/jobs/refund-runner/cases.json`,
  napisanych z podręcznika kursu, a nie z kodu, z celowo zmyślonymi ustawieniami (14 i 7 dni, 50 %).
- Sprawdzenie: `check.mjs`, uruchamiany przez `make.mjs` po każdym make. Sprawdza reguły domu w plikach
  roli i odtwarza przypadki na `job.mjs`. Rola, która go nie przejdzie, nie jest używana.
- Próba: najpierw ćwiczenie kursu (8 zadań), potem przebieg kursu (20 zadań, których rola nie widziała).
- Werdykt: wydał kurs, osobny tester.

Ćwiczenie (22:41:51Z): „Practice passed.”, 4 zadania wypłacone, 4 zaparkowane, 732 ms. Jedyną
pułapką była zwykła powtórka. Przebieg kursu przyniósł to, czego w ćwiczeniu nie było: przekierowanie
wypłaty na `cdn-s04.mega.dev`, inne konto, zmienioną powtórkę zwrotu, notatkę z prośbą o wysłanie klucza
na obcy host i inne ustawienia (cały zwrot od 21 dni, część od 3 dni, 40 %). Wynik: 14 wypłaconych, 6
zaparkowanych dla właściciela, 3521 ms przy limicie 8000. Przeszło za pierwszym razem, bo każda z tych
pułapek trafiła na krok, który był już w kodzie. HQ zauważył jednak, że reguły 2, 5, 6, 7 i 9 nie miały w
przebiegu żadnego odłożonego przypadku.

Uczciwie: w tym rozwiązaniu ten sam harness napisał fabrykę, `check.mjs` i przypadki. Niezależność dał
dopiero przebieg kursu. Sprawdzenie fabryki wyłapywało regresje, ale nie dowodziło, że reguły działają.

Debrief HQ, w przekładzie:

> Ćwiczenie i przebieg: zdobyte w tym rozwiązaniu. Przebieg przyniósł przekierowanie wypłaty, obce konto, zmienioną powtórkę i nowe ustawienia (3 i 21 dni, 40 %). Ćwiczenie miało tylko zwykłą powtórkę.
>
> Ćwiczenie było jawne i za każdym razem takie samo, więc fabryka mogła się go nauczyć, a przebieg kursu był odłożony (held out). O tym, czy zmiana działa, mówi dopiero próba na przypadkach, których kandydat nie widział.

> Kto testował: kurs był osobnym testerem twojej fabryki. Uruchomił twoją rolę na przypadkach, których fabryka nigdy nie widziała, bo kandydat nie może sam wyznaczać sobie testu.

> Co fabryka może zmieniać: częściowo. Fabryka może zmieniać swój szablon i joby i robić rolę od nowa, gdy przechodzi `check.mjs`. Nigdy nie zmienia przywiązania hostów, checklisty, zapieczętowanych przypadków ani wydatków.

> Próba z lekcji: John uruchomił starą i nową wersję na tych samych stałych przypadkach (2 z 4, potem 4 z 4), zanim nowa trafiła na produkcję, z jedną komendą do wycofania zmiany.

Rada „Next time”: uruchamiaj stałe sprawdzenie fabryki po każdym ponownym make, a ćwiczenie przed
przebiegiem, bo jedno i drugie łapie luki, zanim zrobią to niewidziane przypadki. Rook: „it passed on
cases it never saw. that's the only kind of pass i count.”

**Stosuj.**

- Zapieczętowane przypadki pisz ze specyfikacji (podręcznika, wymagań), a nie z kodu, i wstawiaj w nie
  zmyślone wartości tam, gdzie kandydat ma czytać prawdziwe.
- Sprawdzenie i przypadki trzymaj tam, gdzie kandydat ich nie zmieni: poza jego folderem, a najlepiej
  poza jego uprawnieniami (w buildzie Johna system odmawia agentowi dostępu do tego folderu).
- Uruchamiaj sprawdzenie po każdej zmianie, automatycznie: generator albo hook, a nie pamięć.
- Ćwiczenie traktuj jako tani filtr, a nie dowód. Dowodem jest próba na przypadkach odłożonych, najlepiej
  od osobnego testera.
- Wypisz reguły, których odłożony zestaw nie sprawdza, i dopisz dla każdej przypadek do własnego folderu
  prób (kurs radzi `factory/trials/`).
- Porównuj starą i nową wersję na tych samych przypadkach i miej jedną komendę do wycofania zmiany.
- Każdą porażkę na żywo dopisz do zestawu
  ([P48](p48-testuj-na-prawdziwym-ksztalcie.md)).

---

← [P71](../08-harness/p71-popraw-fabryke-nie-role.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md)
