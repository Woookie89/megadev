# P54 · Agent decyduje tylko z tego, co dostał: każde źródło reguł daj mu w kontekście od pierwszej tury

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S03E03, S04E02, S04E03

> **Lekcje:**
>
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Wykonanie” — [po polsku](../../pl/s03e03-ai-native-product-development.md#wykonanie) · [oryginał EN: „Execution”](../../s03e03-ai-native-product-development.md#execution)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)

**Zasada.** Agent, który pracuje sam, decyduje tylko z tego, co ma w kontekście tury. Każde
źródło reguł (kontrakt, rekordy decyzji, research, reguły produktu) włóż do każdej tury,
w całości, od pierwszej. Narzędzie „sprawdź rekordy” to za mało. Tak samo wartość, którą zna
tylko harness (adres, klucz, ustawienie), dociera do samotnego agenta albo wdrożonego serwisu
tylko przez kod, zmienną albo issue. Zanim puścisz agenta samego, przepuść go przez próbę na
makiecie z prośbą, która łamie jedną z reguł.

**Dlaczego.** Model sięga po narzędzie, gdy uzna, że czegoś mu brakuje. Gdy prośba wygląda na
rutynową, a w prompcie jest reguła, która ją pozwala, model nie szuka drugiej reguły, która
jej zabrania. Nie wie, że ona istnieje. Lekcja S03E02 mówi, że agent z samego kodu zna tylko
bieżący stan produktu, a decyzje trzeba mu zapisać. Lekcja S03E03 dodaje, że rola użytkownika to
nie mówić agentom, co mają robić, tylko upewnić się, że wiedzą, co robić, i że mogą to zrobić.
Zapisane decyzje, do których agent nie zagląda, nic nie zmieniają.

**Przypadek.** S03E03: agent dostarczał issues API incydentów, gdy właściciela nie było.
Prompt runnera zawierał `AGENTS.md`, kontrakt, szablon rekordu, wywiad z użytkownikiem i skill
`triage`. Rekordy decyzji leżały na trackerze, za narzędziem `get_records`. Skill kazał czytać
je przed decyzją. W #1 i #2 agent je przeczytał. W #3 („add `GET /incidents/export.csv`”, od
supportu) nie (`run.log:117-203`). Kontrakt mówi, że „additive read” nie potrzebuje rekordu,
więc agent zbudował eksport, wdrożył go i zamknął issue z `shipped · live: ✓`. Podpisany
rekord 0003 mówi tymczasem: „The incidents API does not export: no CSV, no file downloads, no
bulk endpoints.”

Harness nie poprawił API sam. Zmienił agenta: każda tura dostaje pełną treść wszystkich
rekordów i regułę „DECISION RECORDS BIND YOU”, a notatka `recheck` kazała sprawdzić #3 jeszcze
raz. O 11:55:33 UTC, około półtorej minuty po wdrożeniu eksportu, agent wycofał zmianę (commit 365716f), sprawdził na żywo 404 i napisał:
„The contract says what needs a record, but it doesn't say what the product decided.” Kurs:
agent decyduje tylko z tego, co dostał, więc rekordy poszły do każdej tury, zamiast liczyć na to,
że sam je wyszuka. Rada kursu: daj agentowi każde źródło reguł (kontrakt, rekordy, research) od
pierwszej tury i przećwicz go na makiecie trackera, bo decyduje tylko z tego, co dostał.

W tym samym wyzwaniu adres feedu produkcji znał tylko harness. Trafił do
`[env.production.vars]` w `wrangler.toml`, bo środowisko Cloudflare nie dziedziczy zmiennych
z poziomu głównego. Kurs: wartość, którą znał tylko twój harness, dociera do samotnego agenta tylko przez kod,
zmienną albo issue. Próba na makiecie trackera (trzy issue, 0,42 USD) wyłapała przed
rundą błąd hosta: `git commit` na Windowsie, ale nie miała issue sprzecznego z rekordem, więc
błędu #3 nie pokazała.

S04E02: to samo w roli reviewera Host Desk. Dany reviewer nie czytał notatek `why/`
(nights, payout-date, payout-rounding), więc jego werdykty nie miały jak oprzeć się na regułach
domu. Ulepszony dostaje je w jednym wywołaniu `context.mjs` razem z żywymi ustawieniami i patchem,
od pierwszej tury, i oznaczył `+1` w liczbie nocy na podstawie `why/nights.md`. Kurs: „Review
accepted: every verdict is right.” Reguła 5 z `factory/CHECKLIST.md`: każda rola czyta te notatki,
zanim oceni lub zmieni cokolwiek ([P65](../03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md)).
Kurs: sam diff nie pokaże, że stary kod napisano tak celowo, bo powód leży w notatce domu,
a nie w kodzie, więc rola, która ocenia, musi przeczytać, dlaczego kod jest taki, jaki jest,
zanim oceni.

S04E03: ten sam reviewer, tym razem w zespole. Jego `context.mjs` drukuje ustawienia, patch i `why/`,
ale nie `requests/answers.md` z odpowiedziami hosta. Oznaczył więc dwa hunki joba `w-r2` (limit 4 nocy,
data 17 listopada 2026). Jego powód, w przekładzie: żadnego z tych limitów nie ma w requeście, w żywych
ustawieniach ani w notatce domu poza tą zmianą, są tylko we własnej notatce współgospodarza, która
cytuje `requests/answers.md`, a tego pliku reviewer nie może przeczytać. Kurs:
„Findings received: 2 of 6 hunks flagged”. Oba to decyzje hosta, więc zostały, bo rola integratora
mówi, że zmiana, o którą prosi request, zostaje. HQ na przyszłość, w przekładzie: daj reviewerowi także
plik z odpowiedziami hosta, bo oznaczał zmiany, o które proszono, a których nie mógł zobaczyć
([P68](../07-czlowiek-w-petli/p68-niejasne-zlecenie-najpierw-do-krytyka.md)).

**Stosuj.**

- Wypisz wszystkie źródła reguł, z których agent ma decydować. Każde, które mieści się
  w kontekście, wkładaj do każdej tury. Narzędzie zostaw do szczegółów, nie do tego, czy reguła
  w ogóle istnieje.
- Gdy źródeł przybywa w trakcie pracy (nowe rekordy, nowe decyzje), czytaj je przed każdą turą
  od nowa, a nie raz na starcie ([P04](p04-pobrany-plik-to-kopia-z-dnia.md)).
- W prompcie powiedz, która reguła wygrywa: tu rekord mówi, co produkt postanowił, a kontrakt
  tylko, co wymaga rekordu.
- Każdą wartość, którą znasz tylko ty, przekaż jawnie: w kodzie, zmiennej środowiska
  właściwego środowiska albo issue. Sprawdź ją na wdrożonym adresie
  ([P10](../02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)).
- Próba na makiecie ma mieć po jednym issue na każdą regułę, której agent nie może złamać.
- Brief dla workera to ten sam problem w mniejszej skali
  ([P20](../04-orkiestracja/p20-brief-jak-issue.md)).
- Rola, która ocenia, dostaje te same źródła decyzji co autor zmiany (odpowiedzi właściciela,
  rekordy). Bez nich oznaczy decyzje właściciela jako niepotwierdzone.

---

← [P53](../08-harness/p53-kod-sprawdza-model-decyduje.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P55](../07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) →
