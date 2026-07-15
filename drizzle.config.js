import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// drizzle-kit runs outside Next.js, so .env.local must be loaded manually.
config({ path: '.env.local' });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL is missing. Copy .env.example to .env.local and fill it in (or run `vercel env pull .env.local`).',
  );
}

export default defineConfig({
  schema: './src/lib/db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url },
});
