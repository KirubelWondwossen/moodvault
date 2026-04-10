export function SearchSkeletonCard() {
  return (
    <div className="flex items-center gap-3 p-2 animate-pulse">
      <div className="w-10 sm:w-12 aspect-[2/3] bg-gray-600 rounded-md" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-32 bg-gray-600 rounded" />
        <div className="h-3 w-16 bg-gray-600 rounded" />
      </div>
    </div>
  );
}
