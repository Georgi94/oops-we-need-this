"use client";
// Route error boundary — must be a Client Component per Next.js convention.

export default function HomeError({ reset }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-6xl" aria-hidden="true">
        💔
      </p>
      <h1 className="text-2xl font-extrabold">Ой, нещо се счупи</h1>
      <p className="text-muted">Не се тревожи — пробвай пак.</p>
      <button
        type="button"
        onClick={reset}
        className="h-11 rounded-2xl bg-macinka-accent px-6 font-bold text-macinka-accent-ink outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-macinka-ink active:scale-95"
      >
        Опитай отново
      </button>
    </main>
  );
}
