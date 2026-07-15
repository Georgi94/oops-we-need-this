import { OWNERS } from '@/config/owners';

import { CreateListForm } from './CreateListForm';
import { ListCard } from './ListCard';

const CARD_STAGGER_MS = 50;

export function OwnerColumn({ owner, lists }) {
  const theme = OWNERS[owner];
  return (
    <section
      aria-labelledby={`${owner}-heading`}
      className={`flex flex-col gap-4 rounded-3xl border-2 p-4 sm:p-6 ${theme.surfaceClass}`}
    >
      <header className="flex items-center justify-between gap-2">
        <h2
          id={`${owner}-heading`}
          className={`flex items-center gap-2 text-2xl font-extrabold ${theme.inkClass}`}
        >
          <span className="animate-float" aria-hidden="true">
            {theme.heartEmoji}
          </span>
          {theme.displayName}
        </h2>
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${theme.badgeClass}`}>
          {lists.length === 1 ? '1 списък' : `${lists.length} списъка`}
        </span>
      </header>
      <CreateListForm owner={owner} />
      {lists.length === 0 ? (
        <p className="rounded-2xl bg-card/60 px-4 py-8 text-center text-muted">
          {theme.emptyMessage}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {lists.map((list, index) => (
            <li
              key={list.id}
              className="animate-pop-in"
              style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
            >
              <ListCard list={list} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
