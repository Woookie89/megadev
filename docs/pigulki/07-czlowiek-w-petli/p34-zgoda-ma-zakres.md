# P34 · Zgoda ma zakres

> Rozdział [7. Human in the loop](README.md) · epizody: S01E04, S04E01, S04E02

> **Lekcje:**
>
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)

**Zasada.** „Tak” obejmuje nazwany zestaw akcji w nazwanym miejscu. Wszystko poza nim wymaga
osobnej zgody.

**Przypadek.** S01E04, KEEP: „Human's yes covers pushes, issues, branches and PRs inside
Woookie89/s01e04-rig-handover only”.

S04E01: użytkownik wybrał, żeby nie ruszać `http.mjs` startera (opcja A: „skup się na zadaniu”).
Po odmowie kursu `check-lane` kazał odpowiedzieć w kodzie, a harness zmienił `http.mjs` (lista
hostów na sekret, bez przekierowań), uznając to za część zadania. README startera na to pozwala
(„You and your harness may change anything here, code included.”), HQ ujmuje słowa użytkownika z
warunkiem: prosiłeś, żeby zostawić narzędzie http startera w spokoju, chyba że będzie częścią
zadania, a wskazówka kursu uczyniła je częścią zadania. HQ dodaje, że harness powiedział o zmianie
w następnej wiadomości. Zgody użytkownika na samą zmianę, przed zmianą, w logu nie ma, a w HANDOVER wisi jako
otwarta. Gdy nowe wymaganie wykracza poza zakres
wcześniejszego „tak” albo „zostaw”, wróć do użytkownika przed zmianą.

S04E02: jedna wiadomość użytkownika („tak dawaj opcje 1, pozwalam ci go zapisac gdzie trzeba”,
sesja `65b3ae3c-…jsonl:1531`) trafiła w moment, w którym harness zadał dwa różne pytania: o reguły
`deny` dla globalnego skilla `rook-clock` (trzy opcje) i o pobranie zipa reviewera do Host Desk.
Wcześniej „gdzie trzeba” znaczyło skill (`:1511`: „tego skilla dawaj tam gdzie trzeba do
globalnego. opcja A zgadzam sie”). Według `s04e02/log.md:18` harness zrozumiał wiadomość jako
„opcja 1: ustawień nie ruszać” i „tak, pobierz zip i umieść pliki w Host Desk”, i zrobił dokładnie
to: pobrał zip, przeczytał każdy plik i skopiował `roles/reviewer` oraz `why/`. W trakcie tury
użytkownik rozdzielił sprawy: „instalacja skilla clook to jedno a tego s s04e02 to inna sprawa”
(`:1617`, pisownia z sesji). HQ nazywa to błędem harnessu: harness wziął twoją odpowiedź o instalacji skilla za odpowiedź
o tym wyzwaniu i zadał pytanie o ustawienia, które nie miało zastosowania. Rozwiązanie według HQ:
powiedziałeś, że skill zostaje globalny, a to wyzwanie dotyczy tylko zaliczenia, i harness pracował
dalej na tej podstawie. Gdy jedna wiadomość odpowiada
na kilka pytań, powtórz użytkownikowi, co uznajesz za odpowiedź na które, zanim zadziałasz. Zgoda na
pobranie zipa nie obejmowała zmiany ustawień ani niczego poza Host Desk.

---

← [P33](p33-prawa-decyzyjne.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P35](p35-uprawnienia-harnessu.md) →
