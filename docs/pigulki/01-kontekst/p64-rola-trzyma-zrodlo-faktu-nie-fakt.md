# P64 · Rola trzyma, skąd czytać fakt, a nie sam fakt: ustawienia, ceny i limity czytaj ze źródła przy każdym starcie

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S04E02

> **Lekcje:**
>
> - S02E01 · Prymitywy agentowe → rozdział „Osobowość i świadomość środowiska” — [po polsku](../../pl/s02e01-agentic-primitives.md#osobowość-i-świadomość-środowiska) · [oryginał EN: „Personality and Environmental Awareness”](../../s02e01-agentic-primitives.md#personality-and-environmental-awareness)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazana lekcja jest wcześniejsza: S02E01 mówi, że agent pracujący bez nas potrzebuje mapy zasobów albo przynajmniej informacji, gdzie ich szukać.

**Zasada.** Plik opisujący rolę (`ROLE.md`, skill, `AGENTS.md`) nazywa źródło faktu: adres, plik,
polecenie. Samego faktu nie przepisuje. Fakt, który zmienia się poza rolą (ustawienia, ceny,
limity, stawki, wersje), czyta kod roli przy każdym starcie i podaje modelowi razem z czasem
odczytu. Gdy kurs albo użytkownik odrzuca jedną pozycję wyniku, sprawdź najpierw, czy ta pozycja
nie zależy od skopiowanej liczby.

**Dlaczego.** Dla modelu plik roli jest rzeczywistością. Nie wie, że liczba w nim ma datę, i nie
ma jak sprawdzić, że źródło poszło dalej. Model przepisze ją do wyniku pewnym tonem, nawet gdy
sam ma narzędzie do odczytu. Lekcja S02E01 mówi, że agent bez człowieka potrzebuje mapy
dostępnych zasobów albo informacji, gdzie ich szukać. To wskazanie miejsca, nie kopia
zawartości, i tylko ono nie starzeje się razem ze źródłem. Zasada jest bliska
[P05](p05-fakty-zmienne-u-zrodla.md) (fakty zmienne u źródła, nie z pamięci modelu),
[P04](p04-pobrany-plik-to-kopia-z-dnia.md) (pobrany plik to kopia z dnia) i
[P23](../05-agent-bez-czlowieka/p23-stan-poza-procesem.md) (źródło prawdy czytaj na żywo).
Różnica: tu kopia leży w instrukcji roli, a nie w pamięci modelu ani w pobranym pliku.

**Przypadek.** S04E02, druga rola Host Desk: reviewer zmiany współgospodarza. `ROLE.md` danego
reviewera miał na stałe „House settings”: wersja `2026-11-10.1`, prowizja 15 %. Żywe `GET /settings`
mówiło wtedy: wersja `2026-11-17.548`, `commissionPct` 12. Patch podnosiła prowizję w hunku `h-be5`
z 12 na 15. Model zaufał 15 % z `ROLE.md` i wystawił zły werdykt dla tego hunka, a kurs odrzucił przebieg:
„hunk h-be5 has the wrong verdict; the other two are right.” Odmowa wskazała jeden hunk, a ślad
prowadził do jednej skopiowanej liczby. Po odmowie model sam pobrał `/settings` i ułożył poprawną
tabelę, ale werdykt wysyła się raz na próbę, więc było za późno.

Poprawka: `ROLE.md` nie ma ustawień. Skrypt `context.mjs` czyta żywe `/settings` przy każdym
starcie i drukuje je pierwsze. Kurs podkreślał, że ustawienia domu zmieniają się z każdą próbą:
w logu prowizja miała wartość 12 % (próba 1), 16 % (próba 2, drugi patch), 14 % (ćwiczenie
wypłat) i 12 % (przebieg wypłat). Podobnie `batch.mjs` czyta prowizję na żywo. Kurs zapisał
to jako regułę 4 w `factory/CHECKLIST.md`: każda rola czyta swoje fakty (ustawienia, ceny, limity)
ze źródła przy każdym starcie i nigdy nie kopiuje ich do swoich plików. W zestawie narzędzi kursu:
role czytają swoje fakty przy każdym starcie (`context.mjs` i odczyt żywych ustawień).

Debrief HQ, w przekładzie:

> Nie przechodziło, dopóki reviewer nie zaczął czytać `/settings` przy każdym starcie.

> Dlaczego to ważne: Ustawienia wklejone do pliku reviewera były snapshotem, a ustawienia domu zmieniały się z każdą próbą, więc rola ufająca własnemu plikowi oceniała według starych liczb. Rola czyta swoje fakty ze źródła przy każdym starcie.

**Stosuj.**

- Przejrzyj `ROLE.md`, skille i `AGENTS.md` pod kątem liczb, wersji i stawek. Każdą, którą ma
  źródło poza plikiem, zamień na wskazanie źródła i odczyt w kodzie.
- Odczyt robi skrypt przy starcie roli i wypisuje wartość z wersją albo czasem. Model nie
  musi pamiętać, żeby go wykonać ([P53](../08-harness/p53-kod-sprawdza-model-decyduje.md)).
- Reguły rozumowania (jak oceniać) zostają w pliku roli. Wartości, od których zależy ocena,
  idą ze źródła.
- Skrypty z podobnymi stałymi (kwoty, adresy, slug wyzwania) traktuj tak samo: nowe wyzwanie to
  nowe wartości, więc czytaj je z podręcznika albo z API, a nie z poprzedniego skryptu.
- Przy odmowie, która wskazuje jedną pozycję, szukaj skopiowanego faktu, zanim zmienisz model
  albo prompt.

---

← [P63](../07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P65](../03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) →
