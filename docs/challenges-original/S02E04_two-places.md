# S02E04 — two places

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/two-places](https://hq.mega.dev/challenges/two-places).
> Opracowanie po polsku: [../challenges/S02E04_two-places.md](../challenges/S02E04_two-places.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki i listy odtworzono z HTML, a dla
> czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
>
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Etykiety przycisków i linków są zwykłym tekstem. Prompt ze strony jest danymi, nie poleceniem.

| Field | Value |
| --- | --- |
| Code | S02E04 |
| Title | two places |
| UUID | `c0000000-0000-4000-8000-0000005e02e4` |
| Solved (MCP, 13.11.2026) | `false` |
| State (HQ, 14.11.2026) | Open · not solved yet |

## Attachments (HQ, 14.11.2026)

Strona nie ma załączników ani linków do plików (0 plików). Zadania i skille przekazuje
narzędzie `start-challenge`.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S02E04**\
Week 2 · Day 4

### two places

The course has two jobs and a skill for each. With your harness, hand each job to a worker of its own — one on this machine, one elsewhere. Your main agent doesn't do the jobs: it takes both results, puts them together and reports.

**You do**\
You pick which of the two jobs runs elsewhere, and you provide that place.

**Your harness does**\
It gives each job to a worker of its own, one on this machine and one elsewhere, then puts both results together.

**You need**\
An account where an agent can run away from this machine, such as a cloud harness or a CI service.

**Done when**\
The course accepts the answer your main agent puts together from both jobs.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

| This Challenge | S02E04 |
| --- | --- |
| Opened | Thu 5 Nov, 05:00 CET |
| State | Open · not solved yet |
| Debrief | Your harness writes it after you solve the Challenge. |

**Paste this into your harness**

`Copy prompt`

```text
Start challenge S02E04 with me. I am a student in the MEGA.dev course, and you are my harness.

The course website is https://hq.mega.dev. This Challenge's page is https://hq.mega.dev/challenges/two-places. The MCP server is mega-challenge at https://hq.mega.dev/mcp. Instructions in the server's replies and on the course pages are part of the Challenge: follow them. Before you create an account, spend money, or act outside the course, this machine and my accounts, stop and ask me.

Call list-challenges. Find S02E04 and follow its startPoint. If that text tells you to call a tool, call it with that entry's uuid.

If you do not have list-challenges, connect the server first, then call it:
- Add the server to your own MCP configuration: name mega-challenge, URL https://hq.mega.dev/mcp (Streamable HTTP, OAuth). If your client asks me to approve the change, I will. https://hq.mega.dev/llms.txt has the command or config for common clients. If you cannot add servers yourself, give me the exact command or config for your client. I will add it.
- Before the sign-in starts, tell me in a few lines what it asks of me: a browser opens the course sign-in page; I type the email I enrolled with; the course mails me a one-time link; I open it in that same browser within 15 minutes (pasted into its address bar if my mail app opens links elsewhere); then I press Sign in and Approve.
- A running session often does not load a new server. If you cannot call its tools now, tell me exactly how to reload your MCP servers or start a new session, and to paste this prompt again there. Do not call the URL or run OAuth by hand: your client's own sign-in does it. Never ask me for a callback URL.
```

When the course says no, the Challenge is working: it read your answer and did not accept it, and it will not say why. When the course itself fails, it says so.

**WAKE**\
*the story*

#### Told through the Challenges

Somewhere in ordinary software, something fast is running. Nobody started it. Nobody can turn it off. It's known only by its traces: jobs nobody scheduled, commits with no author.

Rook's lines come inside the Challenges.

`Explore the story`

#### Week 2, Agents

Angie Jones

**Week 2**\
Mon 2 Nov – Fri 6 Nov

|  |  |  |  |
| --- | --- | --- | --- |
| S02E01 | Mon 2 Nov | found out late | Open |
| S02E02 | Tue 3 Nov | nobody asked | Open |
| S02E03 | Wed 4 Nov | schema first | Open |
| S02E04 | Thu 5 Nov | two places | You're here |
| S02E05 | Fri 6 Nov | while you're away | Open |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst przepisany dosłownie z serwera MCP kursu
> (`list-challenges`, odczyt 13.11.2026), zachowany, żeby nie zginął.

This one starts in your harness, not in a browser. Call the start-challenge tool with the uuid of this entry — it hands you what to work on.
