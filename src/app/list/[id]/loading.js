const SKELETON_ITEMS = 4;

export default function ListLoading() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <div className="h-11 w-40 animate-pulse rounded-xl bg-card" />
        <div className="mb-6 mt-4 flex items-center gap-4">
          <div className="size-14 animate-pulse rounded-2xl bg-card" />
          <div className="flex flex-col gap-2">
            <div className="h-9 w-52 animate-pulse rounded-xl bg-card" />
            <div className="h-5 w-32 animate-pulse rounded-lg bg-card" />
          </div>
        </div>
        <div className="h-11 animate-pulse rounded-xl bg-card" />
        <div className="mt-6 flex flex-col gap-3">
          {Array.from({ length: SKELETON_ITEMS }, (_, index) => (
            <div key={index} className="h-12 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      </div>
    </main>
  );
}
