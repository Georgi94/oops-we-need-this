'use server';

import { revalidatePath } from 'next/cache';

import { and, eq } from 'drizzle-orm';

import { isAuthenticated } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { listItems } from '@/lib/db/schema';

import { toPositiveInt } from '../lib/ids';

const UNAUTHORIZED = { status: 'error', message: 'Нямаш достъп 🔒' };

export async function addItem(_prev, formData) {
  if (!(await isAuthenticated())) return UNAUTHORIZED;

  const listId = toPositiveInt(formData.get('listId'));
  const text = String(formData.get('text') ?? '').trim();

  if (!listId) return { status: 'error', message: 'Невалиден списък' };
  if (!text) return { status: 'error', message: 'Напиши нещо първо 🙂' };
  if (text.length > 300) {
    return { status: 'error', message: 'Твърде дълго (до 300 знака)' };
  }

  try {
    await getDb().insert(listItems).values({ listId, text });
  } catch (error) {
    console.error('addItem failed', error);
    return { status: 'error', message: 'Задачката не се записа — опитай пак 🙏' };
  }
  revalidatePath(`/list/${listId}`);
  revalidatePath('/');
  return { status: 'success' };
}

export async function toggleItem({ itemId, listId, done }) {
  if (!(await isAuthenticated())) return UNAUTHORIZED;

  const safeItemId = toPositiveInt(itemId);
  const safeListId = toPositiveInt(listId);
  if (!safeItemId || !safeListId) {
    return { status: 'error', message: 'Невалидна задачка' };
  }
  try {
    await getDb()
      .update(listItems)
      .set({ done: Boolean(done) })
      .where(and(eq(listItems.id, safeItemId), eq(listItems.listId, safeListId)));
  } catch (error) {
    console.error('toggleItem failed', error);
    return { status: 'error', message: 'Промяната не мина — опитай пак 🙏' };
  }
  revalidatePath(`/list/${safeListId}`);
  revalidatePath('/');
  return { status: 'success' };
}

export async function deleteItem({ itemId, listId }) {
  if (!(await isAuthenticated())) return UNAUTHORIZED;

  const safeItemId = toPositiveInt(itemId);
  const safeListId = toPositiveInt(listId);
  if (!safeItemId || !safeListId) {
    return { status: 'error', message: 'Невалидна задачка' };
  }
  try {
    await getDb()
      .delete(listItems)
      .where(and(eq(listItems.id, safeItemId), eq(listItems.listId, safeListId)));
  } catch (error) {
    console.error('deleteItem failed', error);
    return { status: 'error', message: 'Изтриването не мина — опитай пак 🙏' };
  }
  revalidatePath(`/list/${safeListId}`);
  revalidatePath('/');
  return { status: 'success' };
}
