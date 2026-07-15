'use client';
// Client component: useActionState for inline validation feedback.

import { useActionState, useId } from 'react';

import { OWNERS } from '@/config/owners';

import { addItem } from '../actions/items';

import { SubmitButton } from './SubmitButton';

const INITIAL_STATE = { status: 'idle' };

export function AddItemForm({ listId, owner }) {
  const theme = OWNERS[owner];
  const inputId = useId();
  const [state, formAction] = useActionState(addItem, INITIAL_STATE);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="listId" value={listId} />
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={inputId}>
          Нова задачка
        </label>
        <input
          id={inputId}
          name="text"
          required
          maxLength={300}
          placeholder="Какво ще правим? ✨"
          className={`h-11 min-w-0 flex-1 rounded-xl border-2 px-3 outline-none focus-visible:ring-2 ${theme.inputClass}`}
        />
        <SubmitButton
          pendingLabel="…"
          className={`h-11 shrink-0 rounded-xl px-4 font-bold outline-none transition-transform hover:scale-105 focus-visible:ring-2 active:scale-95 disabled:opacity-60 ${theme.accentButtonClass}`}
        >
          Добави
        </SubmitButton>
      </div>
      {state.status === 'error' && (
        <p role="alert" aria-live="polite" className="text-sm font-semibold text-danger">
          {state.message}
        </p>
      )}
    </form>
  );
}
