# P67 · A team shares one board: the shared state is created once, and every role only reads it

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S04E03

> **Lessons:**
>
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)
>
> There are no S04 lesson notes in the repo yet, so the lesson cited is an earlier one: S02E04 says that in a team of agents even the simplest actions easily overlap, and advises standard contracts for communication, reports and activity logs, so lookup is deterministic.

**Principle.** When several roles work together, they all write and read one shared state: the plan,
the claims, each job's result. The step that creates that state (a new attempt, session, branch,
queue) runs **once**, at the top, and the roles get only its id. No role creates the state itself at
start.

**Why.** Every role starts from zero and does what its `ROLE.md` says. If a role's first step is
"fetch the manual" or "open a session", every role opens its own and works on an empty state. The
workers do not see the plan, the integrator does not see the results, and the logs all look fine,
because every call succeeded. A shared state outside the chat also lets any agent pick up a job
without the conversation that started it ([P12](../03-memory/p12-chat-is-not-memory.md)).

**Case.** S04E03: the Host Desk got a team (planner, critic, three workers, integrator, then the
payout-runner). The team README from the course zip: "Every role uses that one attempt, so the whole
team shares one board. A role that fetches the manual itself starts a new attempt with an empty
board." The harness fetched the manual **once** (20:48Z), saved it in `manual.secrets.local.json`,
and put the attempt in `vars.json` as `ATTEMPT`. Every given role has in its Limits "Never fetch the
manual: every role uses the attempt already in vars". Our own `batch.mjs` from S04E01 and S04E02
fetched the manual on every run, so the harness changed it for S04E03+ slugs: it reads the saved
manual and requires its attempt to equal `ATTEMPT`. One board then held the critic's questions
(5/5/5), the plan (stored once), the claims and the results of four jobs. The course counted the
payout batch only once every job of the plan had a result. From the course:

> The board holds the plan, claims and each job's posted change for the attempt, so a fresh worker reads its job and files there, not in an old chat.
>
> The plan and the results live on the board, so any agent can pick up a job without the chat that started it.

The challenge was solved on the first claim, in one attempt.

**Apply.**

- Before you start a team, find the step that creates the shared state and run it once, by hand or
  in a start script. Write the id in one place (`vars.json`) that every role reads.
- Write in every role's Limits that it does not run that step, and where you can, do not give it the
  tool for it ([P66](p66-a-role-has-five-parts.md)).
- Check your own scripts too: code that "refreshes the session" on every run quietly creates a new
  state. Have it compare the id with the saved one and refuse when they differ.
- Keep the plan, claims and results in that shared state, not in the orchestrator's chat
  ([P23](../05-agents-without-humans/p23-state-outside-the-process.md)).
- A state created once is also one chance: the plan is stored once, so check its shape before you
  send it ([P06](../02-contracts-and-done/p06-contract-first.md)).

---

← [P66](p66-a-role-has-five-parts.md) · [chapter](README.md) · [all pills](../README.md) · [P68](../07-human-in-the-loop/p68-an-unclear-request-goes-to-a-critic-first.md) →
