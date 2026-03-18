export default function DetailSkeleton() {
  return (
    <div className="flex items-center gap-8 h-full py-3 animate-pulse">
      <div className="h-full max-h-full w-[300px] rounded-xl bg-gray-700" />

      <div className="w-full h-full flex flex-col gap-4">
        <div className="h-10 w-2/3 bg-gray-700 rounded" />

        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-20 bg-gray-700 rounded-full" />
          ))}
        </div>

        <div className="flex gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-6 w-6 bg-gray-600 rounded-full" />
              <div className="h-4 w-16 bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="h-6 w-6 bg-gray-600 rounded-full" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>

        <div className="flex flex-col gap-2 mt-3 max-w-3xl">
          <div className="h-3 w-full bg-gray-700 rounded" />
          <div className="h-3 w-5/6 bg-gray-700 rounded" />
          <div className="h-3 w-4/6 bg-gray-700 rounded" />
          <div className="h-3 w-3/6 bg-gray-700 rounded" />
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="h-10 w-40 bg-gray-700 rounded-3xl" />
          <div className="h-10 w-40 bg-gray-700 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
