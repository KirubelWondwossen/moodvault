import {
  CircleCheck,
  CirclePlus,
  Dot,
  X,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deleteItem, fetchSavedItemsMap, saveItem } from "../../lib/items";
import NoResults from "./NoResults";

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
          <SkeletonCard key={i} />
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
        />

        {showFilters && (
          <FilterDropdown filters={filters} setFilters={setFilters} />
        )}

        <div className="px-3">
          {filteredResults.length === 0 ? (
            <NoResults />
          ) : (
            filteredResults.map((element) => (
              <ResultCard
                data={element}
                isSaved={savedIds.has(element.id)}
                docId={docMap[element.id]}
                setSavedIds={setSavedIds}
                setDocMap={setDocMap}
              />
            ))
          )}
        </div>
      </div>
    </DropdownWrapper>
  );
}

function DropdownWrapper({ children }) {
  return (
    <div
      className="
        absolute left-0 right-0 mt-2 z-[100]
        w-[80vw] sm:w-[500px] md:w-[650px] lg:w-[750px]
        max-h-[60vh] overflow-y-auto
        rounded-xl bg-[#191d23] shadow-lg scrollbar-hide
      "
    >
      {children}
    </div>
  );
}

function ResultCard({
  data,
  setSearchTerm,
  isSaved,
  docId,
  setSavedIds,
  setDocMap,
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.uid || loading) return;

    setLoading(true);

    try {
      if (!isSaved) {
        const newDocId = await saveItem(user.uid, {
          itemId: data.id,
          type: data.type,
          title: data.title,
          poster: data.poster,
          year: data.year,
          isWatched: false,
        });

        setSavedIds((prev) => new Set(prev).add(data.id));

        setDocMap((prev) => ({
          ...prev,
          [data.id]: newDocId,
        }));
      } else {
        if (!docId) return;

        await deleteItem(user.uid, docId);

        setSavedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.id);
          return newSet;
        });

        setDocMap((prev) => {
          const copy = { ...prev };
          delete copy[data.id];
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link
      to={`/details/${data.type}/${data.id}`}
      onClick={() => setSearchTerm("")}
      className="
        group flex items-center justify-between
        p-2 rounded-md
        hover:bg-borderColor
        transition-all
      "
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img
          src={data.poster}
          alt={data.title}
          className="w-10 sm:w-12 aspect-[2/3] object-cover rounded-md"
        />

        <div className="flex flex-col overflow-hidden">
          <h3 className="text-sm font-medium truncate">{data.title}</h3>

          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>
              ⭐{" "}
              {data.rating && data.rating !== 0
                ? data.rating.toFixed(1)
                : "N/A"}
            </span>
            <Dot size={14} />
            <span>{data.type?.toUpperCase()}</span>
            <Dot size={14} />
            <span>{data?.year ?? "N/A"}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleToggle}
        disabled={loading}
        title={isSaved ? "Remove from Vault" : "Add to Vault"}
        className={`
          ml-2 flex items-center justify-center
          w-8 h-8 sm:w-9 sm:h-9
          rounded-full
          transition-all duration-300
          shrink-0
          
          ${
            isSaved
              ? "bg-primary text-background shadow-[0_0_10px_rgba(88,166,255,0.5)]"
              : "bg-white/5 hover:bg-white/10"
          }

          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          hover:scale-110 active:scale-95
          disabled:opacity-50
        `}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : isSaved ? (
          <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <CirclePlus className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>
    </Link>
  );
}

function SkeletonCard() {
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

function FilterDropdown({ filters, setFilters }) {
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

function DropdownHeader({ setShowFilters, setSearchTerm }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full mb-2 p-3 bg-[#22272e]">
      <h3 className="font-heading text-sm sm:text-base">Search results</h3>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-white/5 hover:bg-white/10 rounded-md
    transition-all
  "
        >
          <SlidersHorizontal size={16} />
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
