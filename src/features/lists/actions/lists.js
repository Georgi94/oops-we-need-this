'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import { OWNER_KEYS } from '@/config/owners';
import { getDb } from '@/lib/db';
import { lists } from '@/lib/db/schema';

export async function createList(_prev, formData) {
  const title = String(formData.get('title') ?? '').trim();
  const emoji = String(formData.get('emoji') ?? '').trim().slice(0, 16) || '📝';
  const owner = String(formData.get('owner') ?? '');

  if (!title) return { status: 'error', message: 'Дай име на списъка 🙏' };
  if (title.length > 80) {
    return { status: 'error', message: 'Твърде дълго име (до 80 знака)' };
  }
  if (!OWNER_KEYS.includes(owner)) {
    return { status: 'error', message: 'Невалидни данни' };
  }

  try {
    await getDb().insert(lists).values({ title, emoji, owner });
  } catch (error) {
    console.error('createList failed', error);
    return { status: 'error', message: 'Списъкът не се записа — опитай пак 🙏' };
  }
  revalidatePath('/');
  return { status: 'success' };
}

export async function deleteList(listId) {
  if (!Number.isInteger(listId) || listId <= 0) {
    return { status: 'error', message: 'Невалиден списък' };
  }
  try {
    await getDb().delete(lists).where(eq(lists.id, listId));
  } catch (error) {
    console.error('deleteList failed', error);
    return { status: 'error', message: 'Изтриването не мина — опитай пак 🙏' };
  }
  revalidatePath('/');
  return { status: 'success' };
}
