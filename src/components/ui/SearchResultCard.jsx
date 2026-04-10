import { useState } from "react";
import { deleteItem, saveItem } from "../../lib/items";
import { Link } from "react-router-dom";
import { CircleCheck, CirclePlus, Dot, Loader2 } from "lucide-react";

export default function SearchResultCard({
  data,
  setSearchTerm,
  isSaved,
  docId,
  setSavedIds,
  setDocMap,
  user,
}) {
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
          rating: data.rating,
          source: data.source,
          type: data.type,
          title: data.title,
          poster: data.poster,
          year: data.year,
          genres: data.genres,
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
