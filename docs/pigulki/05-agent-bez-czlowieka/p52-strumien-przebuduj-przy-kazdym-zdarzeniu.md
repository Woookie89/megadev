# P52 · Źródło, które wciąż się zapełnia: przebuduj wynik przy każdym nowym wejściu, a koniec wyznacza cisza, nie zegar

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S03E02

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s03e02-translating-intent-into-agent-work.md#evaluation)
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)

**Zasada.** Gdy źródło żyje dalej (kanał, kolejka, skrzynka), pierwszy odczyt to nie koniec.
Każde nowe wejście uruchamia przebudowę całego wyniku, bo może wycofać albo odwrócić coś, co
już oznaczyłeś. Koniec wyznacza stan danych: kilka rund ciszy z rzędu i ostatni odczyt tuż
przed oddaniem. Stały zegar („odpytuj przez 20 minut”) jest tylko limitem bezpieczeństwa, nie
warunkiem gotowości. Oddając, powiedz, co może jeszcze przyjść.

**Dlaczego.** Agent ma w kontekście stan z chwili odczytu i nie wie, co przyszło potem. Lekcja
wymienia to wśród ograniczeń modeli: brak „świadomości” wszystkiego, czego nie ma w kontekście.
Poller może zapisać nowe zgłoszenie od razu, ale jeśli przebudowa czeka na decyzję modelu,
a model czeka na koniec okna, zgłoszenie leży nieprzeczytane. Zegar nie patrzy na dane: albo
czeka za długo, gdy wszystko już przyszło, albo kończy za wcześnie, gdy coś jeszcze idzie.
Pętla agenta pozwala uruchamiać logikę między iteracjami, więc przebudowa może iść za każdym
zdarzeniem, a nie raz na końcu.

**Przypadek.** S03E02: kanały triage'u zapełniały się w trakcie pracy. Po pierwszym odczycie
przyszło 12 zgłoszeń w ok. 4 minuty (10:55:30–10:59:32 UTC). Harness uruchomił poller co 30 s
na 20 minut. Budowa trackera przeszła o 10:59:32,4 UTC, a 0,3 s później poller zapisał
IN-5342 od zespołu produktu: „forget the 'class' rename from earlier this week. the clinics
hated it in the survey. it stays 'group slot'.” Wcześniejsza prośba o tę zmianę (IN-9280)
była już oznaczona `agent-ready`. Harness czekał na koniec okna. Po 13 minutach użytkownik
zapytał: „cos tu czekamy?”. Harness od razu sprawdził stan, zobaczył ciszę od 10:59:32,
zamknął IN-9280 jako `obsolete` z oboma id w `sources`, zrobił ostatni odczyt i zgłosił
rozwiązanie. Wcześniej, w ten sam sposób, mail klienta (IN-4203: import płac czyta mm/dd)
zmienił prośbę o daty dd/mm (IN-1210) z poprawki w pytanie do człowieka.

Kurs: „Triage is a process, not a one-off sort: later requests update or cancel earlier
ones.” Przeszkoda według kursu: stały zegar. Decyzja, którą kurs przypisał parze: „A stream
that has gone quiet is the signal to hand in, so checking it when you asked beat waiting out a
timer.” Rada: „Rebuild the tracker each time a new request lands, not at the end of a fixed
timer, because a late request can withdraw or reverse an issue you already marked.”

**Stosuj.**

- Poller zapisuje każde wejście z czasem (`seenAt`) i od razu woła przebudowę. Model
  rozstrzyga tylko nowe wejście, ale sprawdzenia biegną po całości.
- Warunek końca: N rund bez nowych wejść (np. 3 × 30 s) i ostatni odczyt tuż przed
  oddaniem. Zegar zostaw jako górny limit ([P24](p24-petla-potrzebuje-wyjscia.md)).
- Pierwsze pytanie przy nowym wejściu: czy ono zmienia albo wycofuje coś, co już jest?
  Wycofanie zamyka wcześniejsze issue z oboma id
  ([P14](../03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)).
- Gdy człowiek pyta „na co czekamy?”, sprawdź stan od razu, zamiast tłumaczyć zegar.
- Pobrany stan to kopia z danej chwili. Przed „gotowe” pobierz jeszcze raz
  ([P04](../01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md)).

---

← [P51](../07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P53](../08-harness/p53-kod-sprawdza-model-decyduje.md) →
