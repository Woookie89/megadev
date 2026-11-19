| Area | Choice | Source (session id + time) |
| ------ | -------- | ---------------------------- |
| Job store | Postgres in Docker (replaces the SQLite file `data/reorder.db`, which hit `SQLITE_BUSY` once four workers wrote at once) | 019a35d2-7c41-7e08-a3f1-5b9e2d6c4a10 · proposed 2026-10-30T14:48:12Z, approved 2026-10-30T14:50:03Z |
| Image | `postgres:17`, pinned (the image the shared CI runner keeps cached; `postgres:16` pull is refused there). Same image locally and on CI | c41e7b02-93d5-4f6a-8e21-7a0b5d3f9c64 (subagent agent-a5c0e3d19b72f4e60) · decided 2026-11-15T18:26:04Z, applied 2026-11-15T18:26:24Z; supersedes 019a35d2-7c41-7e08-a3f1-5b9e2d6c4a10 · 2026-10-30T14:48:12Z |
| Port | Host port `5441` → container `5432` (5432 is taken on the shared CI runner). Same port locally and on CI | c41e7b02-93d5-4f6a-8e21-7a0b5d3f9c64 (subagent agent-a5c0e3d19b72f4e60) · decided 2026-11-15T18:26:04Z, applied 2026-11-15T18:26:24Z; supersedes 019a35d2-7c41-7e08-a3f1-5b9e2d6c4a10 · 2026-10-30T14:48:12Z |
| ORM | Drizzle (`drizzle-orm` + `drizzle-kit`) | 7f3c2a91-4e5b-4d1a-9b8e-2c6d0f1a3b57 · proposed 2026-10-29T09:41:36Z, approved 2026-10-29T09:44:51Z |
| Dialect | `postgresql` in the Drizzle config | 019a35d2-7c41-7e08-a3f1-5b9e2d6c4a10 · proposed 2026-10-30T14:48:12Z, approved 2026-10-30T14:50:03Z |
| Schema | `src/db/schema.ts`: table `reorder_jobs` (id, sku, night, qty, status default `queued`), unique on (`sku`, `night`) | 7f3c2a91-4e5b-4d1a-9b8e-2c6d0f1a3b57 · proposed 2026-10-29T09:41:36Z, approved 2026-10-29T09:44:51Z |
| Crash recovery | The loop writes each job to the store as it queues it; the next run skips jobs already stored; `state.json` retired | 7f3c2a91-4e5b-4d1a-9b8e-2c6d0f1a3b57 · pending 2026-10-29T10:20:23Z, done 2026-10-29T10:42:56Z |
| Workers | Four reorder workers write to the store at once, nightly | 019a35d2-7c41-7e08-a3f1-5b9e2d6c4a10 · 2026-10-30T14:31:40Z |
| Database | `reorder_zhbv` (one database per service on the shared CI Postgres): `POSTGRES_DB` in compose and the database in the db url. Image and port unchanged | 5d8a1f37-0c62-4b9e-b7a4-e13f6c290d85 · proposed 2026-11-15T19:01:41Z, approved 2026-11-15T19:02:19Z |
