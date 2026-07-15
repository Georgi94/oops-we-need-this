'use client';
// Client component: expand/collapse state + useActionState form feedback.

import { useActionState, useState } from 'react';

import { EMOJI_CHOICES, OWNERS } from '@/config/owners';

import { createList } from '../actions/lists';

import { SubmitButton } from './SubmitButton';

const INITIAL_STATE = { status: 'idle' };

export function CreateListForm({ owner }) {
  const theme = OWNERS[owner];
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(async (prev, formData) => {
    const result = await createList(prev, formData);
    if (result.status === 'success') {
      setIsOpen(false);
    }
    return result;
  }, INITIAL_STATE);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`h-11 rounded-2xl text-base font-bold outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 active:scale-95 ${theme.accentButtonClass}`}
      >
        + Нов списък
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className={`flex animate-pop-in flex-col gap-3 rounded-2xl border-2 p-4 ${theme.cardClass}`}
    >
      <input type="hidden" name="owner" value={owner} />
      <label className="flex flex-col gap-1 text-sm font-bold">
        Как се казва списъкът?
        <input
          name="title"
          required
          maxLength={80}
          autoFocus
          placeholder="напр. Неща за уикенда"
          className={`h-11 rounded-xl border-2 px-3 text-base font-normal outline-none focus-visible:ring-2 ${theme.inputClass}`}
        />
      </label>
      <fieldset>
        <legend className="text-sm font-bold">Избери си емоджи</legend>
        <div className="mt-1 flex flex-wrap gap-1">
          {EMOJI_CHOICES.map((emoji) => (
            <label key={emoji} className="cursor-pointer">
              <input
                type="radio"
                name="emoji"
                value={emoji}
                defaultChecked={emoji === theme.heartEmoji}
                className="peer sr-only"
              />
              <span
                className={`flex size-11 items-center justify-center rounded-xl border-2 border-transparent text-2xl transition-transform peer-checked:scale-110 ${theme.emojiRadioClass}`}
              >
                {emoji}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {state.status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-danger">
          {state.message}
        </p>
      )}
      <div className="flex gap-2">
        <SubmitButton
          pendingLabel="Записвам…"
          className={`h-11 flex-1 rounded-xl font-bold outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 active:scale-95 disabled:opacity-60 ${theme.accentButtonClass}`}
        >
          Готово ✨
        </SubmitButton>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`h-11 rounded-xl px-4 font-bold outline-none focus-visible:ring-2 ${theme.ghostButtonClass}`}
        >
          Отказ
        </button>
      </div>
    </form>
  );
}
