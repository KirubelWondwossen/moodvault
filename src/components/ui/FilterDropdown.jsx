export function FilterDropdown({ filters, setFilters }) {
  return (
    <div
      className="
      px-3 pb-3
      border-b border-white/10
      animate-in fade-in slide-in-from-top-2 duration-200 font-heading
    "
    >
      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1">Type</p>
        <div className="flex gap-2 flex-wrap">
          {["all", "movie", "tv", "anime"].map((t) => (
            <button
              key={t}
              onClick={() => setFilters((prev) => ({ ...prev, type: t }))}
              className={`
              px-2 py-1 rounded-md text-xs
              transition-all
              ${
                filters.type === t
                  ? "bg-primary text-background"
                  : "bg-white/5 hover:bg-white/10"
              }
            `}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1">Minimum Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 5, 6, 7, 8].map((r) => (
            <button
              key={r}
              onClick={() => setFilters((prev) => ({ ...prev, rating: r }))}
              className={`
              px-2 py-1 rounded-md text-xs
              transition-all
              ${
                filters.rating === r
                  ? "bg-primary text-background"
                  : "bg-white/5 hover:bg-white/10"
              }
            `}
            >
              {r === 0 ? "All" : `⭐ ${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-400 mb-1">Year</p>
        <div className="flex gap-2 flex-wrap">
          {["all", "2020s", "2010s", "2000s", "older"].map((y) => (
            <button
              key={y}
              onClick={() => setFilters((prev) => ({ ...prev, year: y }))}
              className={`
              px-2 py-1 rounded-md text-xs
              transition-all
              ${
                filters.year === y
                  ? "bg-primary text-background"
                  : "bg-white/5 hover:bg-white/10"
              }
            `}
            >
              {y.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
