export default function NoResults() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          No results found
        </h2>

        <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </div>
  );
}
