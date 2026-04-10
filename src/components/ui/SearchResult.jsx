import { X, SlidersHorizontal, SlidersVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchSavedItemsMap } from "../../lib/items";
import NoResults from "./NoResults";
import { SearchSkeletonCard } from "./SearchSkeletonCard";
import { FilterDropdown } from "./FilterDropdown";
import SearchResultCard from "./SearchResultCard";
import { DropdownWrapper } from "./DropdownWrapper";

export default function SearchResult({ results, isLoading, setSearchTerm }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [docMap, setDocMap] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    rating: 0,
    year: "all",
  });

  useEffect(() => {
    async function load() {
      const { savedIds, docMap } = await fetchSavedItemsMap(user.uid);
      setSavedIds(savedIds);
      setDocMap(docMap);
    }

    if (user?.uid) load();
  }, [user?.uid]);

  if (!results) return null;

  if (isLoading) {
    return (
      <DropdownWrapper>
        {Array.from({ length: 6 }).map((_, i) => (
          <SearchSkeletonCard key={i} />
        ))}
      </DropdownWrapper>
    );
  }

  const filteredResults = results.filter((item) => {
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.rating && item.rating < filters.rating) return false;

    if (filters.year !== "all") {
      const year = item.year;
      if (filters.year === "2020s" && year < 2020) return false;
      if (filters.year === "2010s" && (year < 2010 || year >= 2020))
        return false;
      if (filters.year === "2000s" && (year < 2000 || year >= 2010))
        return false;
      if (filters.year === "older" && year >= 2000) return false;
    }

    return true;
  });

  return (
    <DropdownWrapper>
      <div className="max-h-80 overflow-y-auto scrollbar-hide">
        <DropdownHeader
          setSearchTerm={setSearchTerm}
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />

        {showFilters && (
          <FilterDropdown filters={filters} setFilters={setFilters} />
        )}

        <div className="px-3">
          {filteredResults.length === 0 ? (
            <NoResults />
          ) : (
            filteredResults.map((element) => (
              <SearchResultCard
                key={element.id}
                data={element}
                isSaved={savedIds.has(element.id)}
                docId={docMap[element.id]}
                setSavedIds={setSavedIds}
                setDocMap={setDocMap}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </DropdownWrapper>
  );
}

function DropdownHeader({ showFilters, setShowFilters, setSearchTerm }) {
  return (
    <div
      className={
        "sticky top-0 z-10 flex items-center justify-between w-full mb-2 p-3 bg-[#22272e]"
      }
    >
      <h3 className="font-heading text-sm sm:text-base">Search results</h3>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-white/5 hover:bg-white/10 rounded-md transition-all "
        >
          <div className="relative w-4 h-4">
            <SlidersHorizontal
              size={16}
              className={`
        absolute inset-0 transition-all duration-300 ease-in-out
        ${showFilters ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}
      `}
            />

            <SlidersVertical
              size={16}
              className={`
        absolute inset-0 transition-all duration-300 ease-in-out
        ${showFilters ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}
      `}
            />
          </div>

          <span className="hidden sm:inline">Filter</span>
        </button>
        <X
          size={20}
          className="cursor-pointer"
          onClick={() => setSearchTerm("")}
        />
      </div>
    </div>
  );
}
