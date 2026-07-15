"use client";
// Route error boundary — must be a Client Component per Next.js convention.

import Link from "next/link";
import { useEffect } from "react";

export default function ListError({ error, unstable_retry }) {
  useEffect(() => {
    // Digest matches the corresponding server-side log entry.
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-6xl" aria-hidden="true">
        💔
      </p>
      <h1 className="text-2xl font-extrabold">Списъкът не се зареди</h1>
      <p className="text-muted">Пробвай пак — или се върни при другите списъци.</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={unstable_retry}
          className="h-11 rounded-2xl bg-macinka-accent px-6 font-bold text-macinka-accent-ink outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-macinka-ink active:scale-95"
        >
          Опитай отново
        </button>
        <Link
          href="/"
          className="flex h-11 items-center rounded-2xl bg-zhorzhi-accent px-6 font-bold text-zhorzhi-accent-ink outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-zhorzhi-ink active:scale-95"
        >
          ← Всички списъци
        </Link>
      </div>
    </main>
  );
}
