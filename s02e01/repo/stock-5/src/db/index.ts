import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const url = process.env.DATABASE_URL ?? 'postgres://stock5:stock5@localhost:5441/reorder_zhbv';
export const db = drizzle(postgres(url), { schema });
