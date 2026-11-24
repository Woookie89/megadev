# P50 · A requirement has an address and a test: cite the spot in the source, and check every accepted requirement from outside

> Chapter [2. Contracts and "done"](README.md) · episodes: S03E01, S03E05

> **Lessons:**
>
> - S03E01 · Mechanics Behind Product Engineering → chapter "The Shift" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#the-shift) · [Polish: „Zmiana”](../../pl/s03e01-mechanics-behind-product-engineering.md#zmiana)
> - S03E01 · Mechanics Behind Product Engineering → chapter "Leverage" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#leverage) · [Polish: „Dźwignia”](../../pl/s03e01-mechanics-behind-product-engineering.md#dźwignia)
> - S03E05 · Products That Learn After Release → chapter "Synthesis" — [original (EN)](../../s03e05-products-that-learn-after-release.md#synthesis) · [Polish: „Synteza”](../../pl/s03e05-products-that-learn-after-release.md#synteza)

**Principle.** A requirements list is a contract. Every requirement has a tag, a file and a
spot in that file: a second in a recording, a region of an image, a page and region of a PDF.
Every accepted requirement gets one check, and "done" means all of them pass on the deployed
address, not only locally. The number of tags found equals accepted plus disputed.

**Why.** A requirement without an address cannot be checked or defended: nobody knows who
wrote it or whether the agent added it. Without a check per requirement, "done" means "looks
fine", and missing one in ten is easy. The one that goes missing is usually the hardest to
find: only spoken in a recording, or only shown on screen. A local test does not see the
host's headers, cache or TLS. The lesson changes the question from "is the ticket done?" to
"can the user now do what they need?", and it puts an environment where agents verify their
own work at the core of everything.

**Case.** S03E01: the list had 15 tags, 10 accepted and 5 disputed. Each tag had
`source = { file, at?, region? }`, for example R-H4L: the recording, 16 s, region `{x .675,
y .265, w .292, h .072}`. Four tags were only in the voice memo, so the harness checked each
clip again with a second, larger model. `test.mjs` had 15 checks: one per accepted tag, R-L3K
after product's answer, and 4 general ones. The same file ran locally (a mocked feed of the
real shape) and against the deployed address with the real feed. The first HTTPS requests to
the new `workers.dev` subdomain failed at TLS, so the harness waited about 2.5 minutes for the
certificate and only then ran the checks: 15/15. The claim went out after that result, and
the course accepted the page on the first try. The course question "Accepted is a contract":
right the first time.

The same mechanism in S03E05, this time for verdicts rather than requirements. The course
refused claim 1 on the group "suggestions": "suggestions: not accepted. Check this group against
the signals and cite what you saw: the signal id, where in it, and what it shows. check-lane has
a need for this: screen-reading." `check-lane` for `screen-reading`: "Done = you can say what the
screen showed, word for word (ids and numbers as written), and where: the file, the second, the
region." The harness went back to the full-resolution frames and wrote down, for example:
`replay-02`, 00:22, the board, `site-083`, `inc-24201` "Accepted", queue depth 1,333. The second
version had descriptions with place and value in the `signals` field, and the course answered:
"not in the shape asked for. Fix groups.0.signals.0". In the fix, `signals` holds bare ids
(`replay-02`, `ev-019258`, `err-7741`), and the place, second and value go in `note`. The third
version was accepted. In the second batch, a thumbnail from a contact sheet gave the ticket id
`tk-4e41b2`, while the full-resolution frame said `tk-6e41b2`.

**Apply.**

- Name every check after its requirement tag (`R-K4M status.json ACAO *`). A tag without a
  check then shows at once.
- One test file, two modes: local, and `node test.mjs <url>` against the deployed page
  ([P10](p10-check-from-outside.md)).
- Before you send the list, count: found = accepted + disputed, every tag has a file, every
  recording tag has `at`, every region fits in 0–1.
- A TLS error right after the first deploy on a new subdomain is usually the certificate
  still on its way. Wait for a 200 before you call the page broken, or done.
- The same goes for signals and evidence (S03E05): the id, the place (file, second, region) and
  what it shows, each in the field the recipient reads. Read ids and numbers from the
  full-resolution frame or the raw file, not from a thumbnail.

---

← [P49](../07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md) · [chapter](README.md) · [all pills](../README.md) · [P51](../07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md) →
