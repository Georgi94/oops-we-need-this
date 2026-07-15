import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="animate-float text-6xl" aria-hidden="true">
        🥺
      </p>
      <h1 className="text-2xl font-extrabold">Няма такава страничка</h1>
      <p className="text-muted">Може би списъкът е изтрит?</p>
      <Link
        href="/"
        className="flex h-11 items-center rounded-2xl bg-zhorzhi-accent px-6 font-bold text-zhorzhi-accent-ink outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-zhorzhi-ink active:scale-95"
      >
        ← Към нашето кътче
      </Link>
    </main>
  );
}
