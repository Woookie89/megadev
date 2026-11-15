import { pgTable, serial, integer, text, unique } from 'drizzle-orm/pg-core';

// One job per SKU per night. The unique key lets a re-run of the same night skip what is already queued.
export const reorderJobs = pgTable(
  'reorder_jobs',
  {
    id: serial('id').primaryKey(),
    sku: text('sku').notNull(),
    night: text('night').notNull(),
    qty: integer('qty').notNull(),
    status: text('status').notNull().default('queued'),
  },
  (t) => [unique('reorder_jobs_sku_night').on(t.sku, t.night)],
);
