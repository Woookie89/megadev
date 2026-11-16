# P46 · Drogę do człowieka testuj z miejsca, w którym działa agent

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S02E05

> **Lekcje:**
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Dostęp zdalny” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny) · [oryginał EN: „Getting remote”](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote)

**Zasada.** Każdą drogę, którą agent ma dotrzeć do człowieka albo do innej usługi (push na
telefon, mail, webhook, API), sprawdź z hosta agenta, a nie z własnego komputera. Zrób to,
zanim zostawisz agenta samego.

**Dlaczego.** Dla serwera ten sam request z laptopa i z hosta to dwa różne requesty: inny
adres IP, inny licznik limitu, inna reputacja. Darmowe hosty wychodzą do internetu ze
wspólnych adresów, które dzielą z wieloma innymi klientami. Darmowe plany usług często liczą
limit per IP, więc wyczerpują go cudze aplikacje, zanim twój agent wyśle cokolwiek. Token
konta nie pomoże, jeśli plan i tak liczy limit po adresie. Błąd wyjdzie dopiero wtedy, gdy
agent działa sam, czyli wtedy, gdy nikt na niego nie patrzy.

**Przypadek.** S02E05: agent na darmowym web service Rendera (Frankfurt) miał wysyłać
powiadomienia na telefon przez ntfy.sh. Każdy push z Rendera kończył się błędem 429 „limit
reached: daily message quota reached”, a ten sam push z komputera użytkownika dawał 200.
Darmowy, anonimowy limit ntfy.sh liczy się per IP. Token konta ntfy niczego nie zmienił:
sprawdzenie konta pokazało `limits.basis "ip"` na darmowym planie. Główną drogą został bot
w Telegramie, sprawdzony z Rendera przed oknem próby. Kurs: push dochodzi „in under a second”,
a w zestawie narzędzi zostało „A push route from your agent to you, tested from where the
agent runs.”

**Stosuj.**

- Przed startem wyślij z hosta prawdziwy testowy push, mail albo webhook i sprawdź, czy
  dotarł, a nie tylko czy request się wykonał.
- W cenniku usługi sprawdź, po czym liczy limit: po IP, po koncie, po kluczu.
- Loguj status każdego wywołania (np. `{"type":"tg","status":200}`), żeby odmowę było widać
  w logach, a nie po ciszy na telefonie ([P27](p27-agent-widzi-swoje-logi.md)).
- Miej drugą drogę i wysyłaj równolegle tam, gdzie powiadomienie jest krytyczne
  ([P25](p25-dostawca-zawodzi.md)).

---

← [P45](p45-zdalny-worker-dostep-i-odbior-wyniku.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P47](../07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md) →
