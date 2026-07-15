"use client";
// Replaces the root layout when it crashes — must render its own <html> and <body>.

import { useEffect } from "react";

import "./globals.css";

export default function GlobalError({ error, unstable_retry }) {
  useEffect(() => {
    // Digest matches the corresponding server-side log entry.
    console.error(error);
  }, [error]);

  return (
    <html lang="bg">
      <body className="bg-background text-foreground">
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-6xl" aria-hidden="true">
            💔
          </p>
          <h1 className="text-2xl font-extrabold">Ой, нещо се счупи</h1>
          <p className="text-muted">Не се тревожи — пробвай пак.</p>
          <button
            type="button"
            onClick={unstable_retry}
            className="h-11 rounded-2xl bg-macinka-accent px-6 font-bold text-macinka-accent-ink outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-macinka-ink active:scale-95"
          >
            Опитай отново
          </button>
        </main>
      </body>
    </html>
  );
}
