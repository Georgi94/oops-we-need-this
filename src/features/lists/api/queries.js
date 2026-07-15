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
    // id tiebreaker keeps the order stable when createdAt timestamps collide.
    .orderBy(asc(lists.createdAt), asc(lists.id));
});

/** Full export of every list with its items, for the JSON backup download. */
export const getBackupData = cache(async () => {
  const db = getDb();
  const [allLists, allItems] = await Promise.all([
    db
      .select({
        id: lists.id,
        title: lists.title,
        emoji: lists.emoji,
        owner: lists.owner,
        createdAt: lists.createdAt,
      })
      .from(lists)
      .orderBy(asc(lists.createdAt), asc(lists.id)),
    db
      .select({
        id: listItems.id,
        listId: listItems.listId,
        text: listItems.text,
        done: listItems.done,
        createdAt: listItems.createdAt,
      })
      .from(listItems)
      .orderBy(asc(listItems.createdAt), asc(listItems.id)),
  ]);
  return allLists.map((list) => ({
    ...list,
    items: allItems
      .filter((item) => item.listId === list.id)
      .map(({ listId: _listId, ...item }) => item),
  }));
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
      .orderBy(asc(listItems.createdAt), asc(listItems.id)),
  ]);
  const list = listRows[0];
  if (!list) return null;
  return { ...list, items };
});
