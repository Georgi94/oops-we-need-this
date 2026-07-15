'use client';
// Client component: two-step delete confirmation needs local state + transition.

import Link from 'next/link';
import { useState, useTransition } from 'react';

import { OWNERS } from '@/config/owners';

import { deleteList } from '../actions/lists';

export function ListCard({ list }) {
  const theme = OWNERS[list.owner];
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  function handleDeleteClick() {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    startTransition(async () => {
      const result = await deleteList(list.id);
      if (result.status === 'error') {
        setError(result.message ?? 'Нещо се обърка');
        setIsConfirming(false);
      }
    });
  }

  const progress =
    list.itemCount === 0 ? 0 : Math.round((list.doneCount / list.itemCount) * 100);

  return (
    <div className={`relative transition-opacity ${isPending ? 'opacity-40' : ''}`}>
      <Link
        href={`/list/${list.id}`}
        className={`group block rounded-2xl border-2 p-4 pr-20 outline-none transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-2 ${theme.cardClass} ${theme.ringClass}`}
      >
        <span className="flex items-center gap-3">
          <span
            className="text-3xl group-hover:animate-wiggle group-focus-visible:animate-wiggle"
            aria-hidden="true"
          >
            {list.emoji}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-bold">{list.title}</span>
            <span className="block text-sm text-muted">
              {list.itemCount === 0
                ? 'още няма задачки'
                : `${list.doneCount} от ${list.itemCount} готови`}
            </span>
          </span>
        </span>
        {list.itemCount > 0 && (
          <span className={`mt-3 block h-2 overflow-hidden rounded-full ${theme.trackClass}`}>
            <span
              className={`block h-full origin-left rounded-full transition-transform duration-300 ${theme.barClass}`}
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={handleDeleteClick}
        onBlur={() => setIsConfirming(false)}
        disabled={isPending}
        aria-label={
          isConfirming
            ? `Потвърди изтриването на „${list.title}“`
            : `Изтрий „${list.title}“`
        }
        className={`absolute right-2 top-2 z-10 flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-sm font-bold outline-none transition-transform focus-visible:ring-2 active:scale-90 lg:h-9 lg:min-w-9 ${
          isConfirming ? 'bg-danger text-white' : theme.ghostButtonClass
        }`}
      >
        {isConfirming ? 'Сигурно?' : '✕'}
      </button>
      {error && (
        <p role="alert" className="mt-1 px-2 text-xs font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
