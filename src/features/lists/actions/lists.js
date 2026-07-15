'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import { EMOJI_CHOICES, OWNER_KEYS } from '@/config/owners';
import { isAuthenticated } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { lists } from '@/lib/db/schema';

import { toPositiveInt } from '../lib/ids';

const UNAUTHORIZED = { status: 'error', message: 'Нямаш достъп 🔒' };

export async function createList(_prev, formData) {
  if (!(await isAuthenticated())) return UNAUTHORIZED;

  const title = String(formData.get('title') ?? '').trim();
  const emoji = String(formData.get('emoji') ?? '');
  const owner = String(formData.get('owner') ?? '');

  if (!title) return { status: 'error', message: 'Дай име на списъка 🙏' };
  if (title.length > 80) {
    return { status: 'error', message: 'Твърде дълго име (до 80 знака)' };
  }
  // Allowlist both radio-backed fields — the form only offers these values,
  // so anything else is a tampered request.
  if (!EMOJI_CHOICES.includes(emoji) || !OWNER_KEYS.includes(owner)) {
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
  if (!(await isAuthenticated())) return UNAUTHORIZED;

  const safeListId = toPositiveInt(listId);
  if (!safeListId) {
    return { status: 'error', message: 'Невалиден списък' };
  }
  try {
    await getDb().delete(lists).where(eq(lists.id, safeListId));
  } catch (error) {
    console.error('deleteList failed', error);
    return { status: 'error', message: 'Изтриването не мина — опитай пак 🙏' };
  }
  revalidatePath('/');
  return { status: 'success' };
}
