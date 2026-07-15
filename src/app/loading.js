const SKELETON_CARDS_PER_COLUMN = 3;

export default function HomeLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex flex-col items-center gap-3 sm:mb-12">
        <div className="h-10 w-24 animate-pulse rounded-full bg-card" />
        <div className="h-12 w-64 animate-pulse rounded-2xl bg-card" />
        <div className="h-6 w-48 animate-pulse rounded-xl bg-card" />
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {["macinka-skeleton", "zhorzhi-skeleton"].map((column) => (
          <div
            key={column}
            className="flex flex-col gap-4 rounded-3xl border-2 border-card bg-card/50 p-4 sm:p-6"
          >
            <div className="h-8 w-36 animate-pulse rounded-xl bg-card" />
            <div className="h-11 animate-pulse rounded-2xl bg-card" />
            {Array.from({ length: SKELETON_CARDS_PER_COLUMN }, (_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-2xl bg-card" />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
