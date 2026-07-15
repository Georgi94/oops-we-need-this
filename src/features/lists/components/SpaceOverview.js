import { OWNER_KEYS } from '@/config/owners';

import { getListSummaries } from '../api/queries';

import { OwnerColumn } from './OwnerColumn';

export async function SpaceOverview() {
  const lists = await getListSummaries();
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 text-center sm:mb-12">
        <div className="mb-3 flex items-center justify-center gap-2 text-4xl" aria-hidden="true">
          <span className="animate-float">💛</span>
          <span className="animate-float [animation-delay:800ms]">💚</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Нашето кътче</h1>
        <p className="mt-2 text-lg text-muted">Списъчетата на Мацинка и Жоржи</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {OWNER_KEYS.map((owner) => (
          <OwnerColumn
            key={owner}
            owner={owner}
            lists={lists.filter((list) => list.owner === owner)}
          />
        ))}
      </div>
      <footer className="mt-10 text-center text-sm text-muted">
        Направено с 💛 и 💚
      </footer>
      <a
        href="/api/backup"
        download
        className="fixed bottom-4 right-4 z-10 hidden h-10 items-center gap-1.5 rounded-full border-2 border-card bg-card px-4 text-sm font-bold text-muted outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-foreground active:scale-95 lg:inline-flex"
      >
        <span aria-hidden="true">⬇️</span>
        Резервно копие
      </a>
    </main>
  );
}
