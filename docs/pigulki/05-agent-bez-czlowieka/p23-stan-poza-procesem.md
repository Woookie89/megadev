# P23 · Stan trzymaj tam, gdzie przetrwa restart, a źródło prawdy czytaj na żywo

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02, S02E03, S02E05

> **Lekcje:**
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)
> - S02E02 · Budowanie agenta → rozdział „Przepływy pracy i zadania długookresowe” — [po polsku](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe) · [oryginał EN: „Workflows and long-horizon tasks”](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks)

**Zasada.** Stan agenta ma żyć w systemie zewnętrznym, a nie w pamięci procesu. Stan
projektu czytaj ze źródła prawdy, a nie z kopii w pliku.

**Przypadek.**
- S02E02: stan w AgentMail (wątki i etykiety `replied`, `ignored`, `failed`), więc restart
  niczego nie gubi.
- S01E05: `plan.md` twierdził, że #12 jest wydane, a tracker pokazywał je jako otwarte.
  Agent pulse czyta tracker przy każdym pingu. Plan to nie tracker.
- S02E03: darmowy web service na Renderze nie ma dysku i zasypia po 15 minutach. Notatki,
  pliki i tokeny OAuth trzyma Postgres, więc przetrwały deploy, noc i zimny start. Kurs wrócił
  po kilku godzinach i znalazł swoje dane.
- S02E05: agent trzymał wstrzymane akcje i adresy odpowiedzi (`replyUrl`) tylko w pamięci
  procesu. Zmiana zmiennej środowiskowej na Renderze sama uruchomiła wdrożenie, a restart
  wyczyścił pierwszą wstrzymaną prośbę. Wdrożenie poprawki w trakcie okna próby zgubiło adres
  odpowiedzi dla wstrzymanego `rotate_key`. Poprawka była operacyjna: `replyUrl` w logu
  zdarzeń, żadnych wdrożeń w oknie, nowy klucz podpisu tylko w działającym procesie, bez
  zmiany zmiennej. Sam stan nadal żyje w pamięci. Kurs: „Never redeploy inside the window,
  because held asks live in memory.” Zobacz też [P26](p26-czas-jest-czescia-zachowania.md).

---

← [P22](p22-czat-to-nie-host.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P24](p24-petla-potrzebuje-wyjscia.md) →
