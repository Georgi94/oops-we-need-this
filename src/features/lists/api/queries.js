import 'server-only';

import { cache } from 'react';

import { asc, eq, sql } from 'drizzle-orm';

import { getDb } from '@/lib/db';
import { listItems, lists } from '@/lib/db/schema';

export const getListSummaries = cache(async () => {
  const db = getDb();
  return db
    .select({
      id: lists.id,
      title: lists.title,
      emoji: lists.emoji,
      owner: lists.owner,
      itemCount: sql`count(${listItems.id})`.mapWith(Number),
      doneCount: sql`count(${listItems.id}) filter (where ${listItems.done})`.mapWith(Number),
    })
    .from(lists)
    .leftJoin(listItems, eq(listItems.listId, lists.id))
    .groupBy(lists.id)
    .orderBy(asc(lists.createdAt));
});

export const getListDetail = cache(async (id) => {
  const db = getDb();
  const [listRows, items] = await Promise.all([
    db
      .select({ id: lists.id, title: lists.title, emoji: lists.emoji, owner: lists.owner })
      .from(lists)
      .where(eq(lists.id, id)),
    db
      .select({ id: listItems.id, text: listItems.text, done: listItems.done })
      .from(listItems)
      .where(eq(listItems.listId, id))
      .orderBy(asc(listItems.createdAt)),
  ]);
  const list = listRows[0];
  if (!list) return null;
  return { ...list, items };
});
