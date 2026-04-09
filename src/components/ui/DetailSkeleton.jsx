export default function DetailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 h-full py-4 px-3 md:px-6 animate-pulse">
      {/* Image Skeleton */}
      <>
        {/* MOBILE skeleton (matches full-width image) */}
        <div
          className="
      md:hidden w-full h-[60vh] bg-gray-700"
        />

        {/* DESKTOP skeleton */}
        <div
          className="
      hidden md:block
      w-full max-w-[350px]
      h-[500px]
      rounded-xl bg-gray-700
    "
        />
      </>

      {/* Content Skeleton */}
      <div className="w-full flex flex-col gap-4">
        {/* Title */}
        <div className="h-6 sm:h-8 md:h-10 w-2/3 bg-gray-700 rounded" />

        {/* Genres */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Facts Row */}
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-600 rounded-full" />
              <div className="h-3 sm:h-4 w-14 sm:w-16 bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* Extra Info */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="h-5 w-5 bg-gray-600 rounded-full" />
          <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-700 rounded" />
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-2 mt-3 max-w-3xl">
          <div className="h-3 w-full bg-gray-700 rounded" />
          <div className="h-3 w-5/6 bg-gray-700 rounded" />
          <div className="h-3 w-4/6 bg-gray-700 rounded" />
          <div className="h-3 w-3/6 bg-gray-700 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
          <div className="h-10 w-full sm:w-40 bg-gray-700 rounded-3xl" />
          <div className="h-10 w-full sm:w-40 bg-gray-700 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
