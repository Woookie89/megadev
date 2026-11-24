# P71 · Popraw fabrykę, nie rolę: poprawka, która wraca, staje się krokiem, który każda rola wykonuje

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S04E05

> **Lekcje:**
>
> - S04E05 · Budowanie samodoskonalących się systemów inżynierskich → rozdział „Destylacja” — [po polsku](../../pl/s04e05-building-self-improving-engineering-systems.md#destylacja) · [oryginał EN: „Distillation”](../../s04e05-building-self-improving-engineering-systems.md#distillation)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Wykonywalny Markdown a kod” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) · [oryginał EN: „Executable Markdown vs Code”](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code)
>
> S04E05 mówi, że destylacja to nie tylko wyciąganie skilla czy skryptu, ale też zamiana powtarzających się wzorców w szablon, a gdy szablon już istnieje, jedna zmiana w nim dociera do wszystkiego, co na nim zbudowano, więc wymaga ostrzejszego review niż jeden nowy skill. S01E05 porównuje instrukcję w Markdownie z kodem: to, co ma się dziać zawsze, lepiej powierzyć kodowi.

**Zasada.** Gdy role (agenci, skille, projekty) powstają z jednego szablonu, poprawkę wpisujesz do
szablonu, a nie do zrobionej roli, i robisz rolę od nowa. Poprawkę sprowadzasz do jej decyzji i
zapisujesz jako krok: kod w szablonie, krok generatora albo punkt w sprawdzeniu, które przerywa
generowanie. Zdanie w prompcie roli to za mało. Regułą zostaje tylko poprawka, która wraca. Jednorazowa
zostaje poprawką.

**Dlaczego.** Zdanie w prompcie to życzenie. Model może go nie zastosować przy przypadku, którego nie
przewidziałeś, a liczba skopiowana do roli starzeje się z każdą zmianą ustawień. Poprawka wpisana
ręcznie w zrobioną rolę znika przy następnym generowaniu i nie trafia do następnej roli. Krok w
szablonie działa w każdej roli od jej pierwszego przebiegu, zanim zobaczy pierwszy prawdziwy
przypadek. Ma to też swoją cenę: każda reguła to jeszcze jeden krok, który wykonuje każda nowa rola, a
błąd w szablonie trafia wszędzie naraz. Dlatego do szablonu idzie tylko to, co wraca, a zmiana szablonu
przechodzi stałe sprawdzenie, zanim zrobi jakąkolwiek rolę
([P72](../02-kontrakty-i-gotowe/p72-zmiane-dowodzi-proba-na-niewidzianych-przypadkach.md)).

**Przypadek.** S04E05, Host Desk. Fabryka `factory/make-a-role/` miała zrobić rolę refund-runner z
jednej linii właściciela: „Make refund-runner: pay the refunds owed after the S04E04 night, following
the host's refund policy.” Zadanie mówiło wprost: „Fix the factory, not the role.” Fabryka z zipa
łamała reguły domu z czterech poprzednich wyzwań. `make.mjs` wklejał checklistę do `ROLE.md` jako zdania,
a fakty z `facts.md` kopiował do roli z datą. Szablon `http.mjs` wstawiał każdy sekret dla każdego hosta
i podążał za przekierowaniami. Nie było odczytu notatek why, skryptu dla rutyny ani rejestru raz-na-id.

Harness przebudował fabrykę, a nie rolę:

- reguła 1: `make.mjs` wylicza z publicznego opisu API, który sekret może trafić na który host, i
  zapisuje to w `hosts.json`; szablon `http.mjs` i silnik `batch.mjs` sprawdzają każdy request i nie
  podejmują przekierowań;
- reguła 2: jeden silnik `template/scripts/batch.mjs` robi całą partię, a model tylko go uruchamia;
- reguła 4: `jobs/refund-runner/sources.md` nazywa źródła faktów, a `make.mjs` odrzuca linię, która
  zawiera wartość; konto z akt pochodzi z zapisanego podręcznika, ustawienia z `GET /settings` przy
  każdym zadaniu;
- reguła 5: notatki `why/` jadą z rolą, a `ROLE.md` każe je czytać na starcie;
- reguła 8: rejestr id i hasha treści w `state/`;
- na końcu make: `check.mjs`, stałe sprawdzenie z 15 zapieczętowanymi przypadkami. Rola, która go nie
  przejdzie, nie jest używana.

Ćwiczenie i przebieg kursu przeszły za pierwszym razem. Przebieg miał inne ustawienia (cały zwrot od 21
dni, część od 3 dni, 40 %) niż zmyślone ustawienia w przypadkach fabryki (14 i 7 dni, 50 %). Rola nie
miała żadnej skopiowanej liczby, więc różnica nie miała znaczenia. Druga poprawka też poszła do fabryki:
rola zgłosiła, że jej narzędzia nie sięgają notatek why, więc szablon dostał `scripts/why.mjs`, a
`check.mjs` nowy punkt ([P65](../03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md)). Rola zrobiona
od nowa, jej stan przebiegu zachowany.

Debrief HQ, w przekładzie:

> Fabryka z zipa wklejała checklistę do roli jako zdania i kopiowała do niej fakty z datą. Twój harness zamienił reguły 1, 2, 4, 5, 8 i 10 w kroki: przywiązanie hostów na podstawie API, skrypt batcha, ustawienia przy każdym zadaniu, rejestr id i sprawdzenie, które przerywa make.

> Dlaczego to ważne: Gdy przebieg kursu używa przypadków i limitów zwrotów, których fabryka nigdy nie widziała, rola, która trzyma reguły tygodnia jako zdania, a dzisiejsze liczby jako kopie, wypłaca złe zwroty. Dlatego fabryka utrzymuje regułę, wbudowując ją w każdą robioną rolę jako krok, który ta rola wykonuje.

> Właściwa decyzja padła w snagu 1 i podjął ją twój harness. Poprawka w fabryce trafia do każdej roli, którą fabryka robi, jeszcze przed jej pierwszym przebiegiem, więc niewidziane przypadki trafiły na reguły, które już były kodem.

> Poprawka, która wraca co tydzień, jest warta reguły w fabryce, a jednorazowa nie, bo każda reguła to jeszcze jeden krok, który wykonuje każda nowa rola.

> Reguła 11 dla twojej fabryki: Każdą poprawkę sprowadź do jej decyzji i wbuduj w każdą rolę jako krok, który ta rola wykonuje; sprawdź ją na przypadkach, których rola nie widziała.

HQ uznał za warte reguły to, że rola czyta notatki why własnymi narzędziami (`why.mjs`), a kształt
odpowiedzi dla zwrotu 0 EUR za sprawę jednorazową.

**Stosuj.**

- Gdy coś poprawiasz w agencie zrobionym z szablonu, zapytaj najpierw: czy to wróci w następnej roli?
  Jeśli tak, poprawka idzie do szablonu albo generatora, a rolę robisz od nowa.
- Dla każdej reguły z checklisty nazwij krok, który ją wykonuje: plik szablonu, linię generatora albo
  punkt sprawdzenia. Reguła bez kroku to tylko zdanie.
- Generator odrzuca kopie faktów (konta, procenty, kwoty) i każe nazwać ich źródło
  ([P64](../01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md)).
- Na końcu generowania uruchom stałe sprawdzenie. Rola, która go nie przejdzie, nie jest gotowa.
- Zrobionej roli nie edytuj ręcznie. Stan, który ma przetrwać ponowne generowanie, trzymaj w osobnym
  folderze, którego generator nie nadpisuje.
- Zanim dopiszesz regułę, sprawdź, czy poprawka wraca. Jednorazowej nie zamieniaj w regułę, bo każdą
  regułę wykonuje każda przyszła rola.

---

← [P70](../04-orkiestracja/p70-kazdy-job-ma-wlasciciela.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P72](../02-kontrakty-i-gotowe/p72-zmiane-dowodzi-proba-na-niewidzianych-przypadkach.md) →
