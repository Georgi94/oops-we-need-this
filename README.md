# Мацинка 💛 Жоржи — нашето кътче

A cozy shared space for two people: Мацинка (yellow side) and Жоржи (green side) each keep cute checklists everyone can create, check off, and delete.

Built with Next.js 16 (App Router, Server Actions, React 19), plain JavaScript, Tailwind CSS 4, Drizzle ORM, and Neon Postgres (Vercel Marketplace).

## Prerequisites

- Node.js ≥ 20.9.0
- A [Vercel](https://vercel.com) account
- A Neon Postgres database created through Vercel (Storage → Create Database → Neon)

## Getting started

```bash
npm install

# 1. Get the database connection string into .env.local — either:
vercel env pull .env.local
#    …or copy .env.example to .env.local and paste DATABASE_URL manually.

# 2. Create the tables:
npm run db:push

# 3. Run it:
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string for the Neon database (format: `postgres://USER:PASSWORD@HOST/DB?sslmode=require`) |
| `BASIC_AUTH_USER` | Yes | HTTP Basic Auth username — the whole site is behind it (fail-closed if unset) |
| `BASIC_AUTH_PASS` | Yes | HTTP Basic Auth password |

All variables are documented in `.env.example`. Never commit `.env.local`.

## Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push the Drizzle schema in `src/lib/db/schema.js` to the database |
| `npm run db:studio` | Browse the database with Drizzle Studio |

## Deployment (Vercel)

First-time setup:

1. Push this repo to GitHub and import it in Vercel (framework preset: Next.js — no config needed).
2. In Vercel → Storage, create a **Neon** Postgres database and connect it to the project. `DATABASE_URL` is injected automatically.
3. Locally, run `vercel env pull .env.local` then `npm run db:push` to create the tables in that database.
4. Redeploy. Done.

Routine deployments: push to `main` — Vercel builds and deploys automatically.

**Recommended:** the app has no login (it's a private space for two). Enable [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection) (e.g. password protection) or keep the URL private.

Post-deploy check: open the production URL, create a list on each side, add an item, check it off, delete it.

## Architecture notes

- `src/features/lists/` — the whole feature: server queries (`api/`), Server Actions (`actions/`), components. Public interface: `src/features/lists/index.ts`.
- `src/lib/db/` — Drizzle schema + lazy Neon client (build works without `DATABASE_URL`; the first query fails fast with a clear message).
- `src/config/owners.ts` — the two people, their colors and copy. Add fields here to re-theme.
- Pages are `force-dynamic`: every request reads fresh data; mutations revalidate via `revalidatePath`.
