import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

let db = null;

/** Lazy singleton so `next build` succeeds without DATABASE_URL. */
export function getDb() {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL is missing. Copy .env.example to .env.local and fill it in (or run `vercel env pull .env.local`).',
      );
    }
    db = drizzle(neon(url), { schema });
  }
  return db;
}
