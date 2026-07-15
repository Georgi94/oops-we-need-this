'use client';
// Client component: optimistic item toggling + inline mutations.

import Link from 'next/link';
import { useOptimistic, useState, useTransition } from 'react';

import { OWNERS } from '@/config/owners';

import { deleteItem, toggleItem } from '../actions/items';

import { AddItemForm } from './AddItemForm';

function itemsReducer(items, action) {
  switch (action.type) {
    case 'toggle':
      return items.map((item) =>
        item.id === action.id ? { ...item, done: action.done } : item,
      );
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    default:
      return items;
  }
}

export function ListDetailView({ list }) {
  const theme = OWNERS[list.owner];
  const [items, applyItemAction] = useOptimistic(list.items, itemsReducer);
  const [error, setError] = useState(null);
  const [, startTransition] = useTransition();

  function handleToggle(item) {
    startTransition(async () => {
      applyItemAction({ type: 'toggle', id: item.id, done: !item.done });
      const result = await toggleItem({
        itemId: item.id,
        listId: list.id,
        done: !item.done,
      });
      setError(result.status === 'error' ? (result.message ?? 'Нещо се обърка') : null);
    });
  }

  function handleRemove(item) {
    startTransition(async () => {
      applyItemAction({ type: 'remove', id: item.id });
      const result = await deleteItem({ itemId: item.id, listId: list.id });
      setError(result.status === 'error' ? (result.message ?? 'Нещо се обърка') : null);
    });
  }

  const doneCount = items.filter((item) => item.done).length;

  return (
    <main className={`flex-1 ${theme.pageClass}`}>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className={`inline-flex h-11 items-center gap-1 rounded-xl px-3 font-bold outline-none focus-visible:ring-2 ${theme.ghostButtonClass}`}
        >
          ← Всички списъци
        </Link>
        <header className="mb-6 mt-4 flex items-center gap-4">
          <span className="animate-float text-5xl" aria-hidden="true">
            {list.emoji}
          </span>
          <div className="min-w-0">
            <h1 className={`break-words text-3xl font-extrabold sm:text-4xl ${theme.inkClass}`}>
              {list.title}
            </h1>
            <p className="text-muted">
              {items.length === 0
                ? 'още няма задачки'
                : `${doneCount} от ${items.length} готови`}
            </p>
          </div>
        </header>
        <AddItemForm listId={list.id} owner={list.owner} />
        {error && (
          <p role="alert" className="mt-3 text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {items.length === 0 ? (
          <p
            className={`mt-6 animate-pop-in rounded-2xl border-2 px-4 py-10 text-center text-muted ${theme.cardClass}`}
          >
            Празничко е… добави първата задачка! ✨
          </p>
        ) : (
          <ul
            className={`mt-6 flex flex-col divide-y-2 divide-dashed rounded-2xl border-2 px-4 py-1 ${theme.cardClass} ${theme.dividerClass}`}
          >
            {items.map((item) => (
              <li key={item.id} className="flex animate-pop-in items-center gap-2">
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 py-3">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggle(item)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg border-2 bg-card text-sm font-black transition-colors ${theme.checkboxClass}`}
                  >
                    {item.done && <span className="animate-check">✓</span>}
                  </span>
                  <span
                    className={`min-w-0 break-words text-lg transition-opacity ${
                      item.done ? 'line-through opacity-50' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label={`Изтрий „${item.text}“`}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold outline-none transition-transform focus-visible:ring-2 active:scale-90 lg:size-9 ${theme.ghostButtonClass}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
