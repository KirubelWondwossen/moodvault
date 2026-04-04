export function SkeletonGrid({ count = 10 }) {
  return (
    <div
      className="
        grid gap-3 sm:gap-4 md:gap-5
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      "
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
function SkeletonCard() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-700">
        <div className="absolute top-2 right-2 h-4 sm:h-5 w-8 sm:w-10 rounded bg-gray-600"></div>

        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1.5 sm:gap-2">
          <div className="h-2.5 sm:h-3 w-3/4 rounded bg-gray-600"></div>
          <div className="h-2.5 sm:h-3 w-1/3 rounded bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
