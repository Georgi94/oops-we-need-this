import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Relative import: drizzle-kit loads this file outside Next.js, where the
// jsconfig "@/" alias is not resolved.
import { OWNER_KEYS } from '../../config/owners';

export const ownerEnum = pgEnum('owner', OWNER_KEYS);

export const lists = pgTable('lists', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  title: varchar('title', { length: 80 }).notNull(),
  emoji: varchar('emoji', { length: 16 }).notNull().default('📝'),
  owner: ownerEnum('owner').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const listItems = pgTable('list_items', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  listId: integer('list_id')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),
  text: varchar('text', { length: 300 }).notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
