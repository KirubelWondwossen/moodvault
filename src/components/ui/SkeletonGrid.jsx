export function SkeletonGrid({ count = 10 }) {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="block w-full max-w-[190px] animate-pulse">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-700">
        <div className="absolute top-2 right-2 h-5 w-10 rounded bg-gray-600"></div>
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-2">
          <div className="h-3 w-3/4 rounded bg-gray-600"></div>
          <div className="h-3 w-1/3 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
