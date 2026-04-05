import { Check, Dot, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteItem, toggleWatched } from "../../lib/items";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function VaultItemCard({ data, userId, onToggle, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  if (!data) return null;

  const handleToggle = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      onToggle?.(data.id);
      await toggleWatched(userId, data.id, data.isWatched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (delLoading) return;

    try {
      setDelLoading(true);
      onDelete?.(data.id);
      await deleteItem(userId, data.id);
    } catch (err) {
      console.error(err);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <Link
      to={`/details/${data.type}/${data.itemId}`}
      className="group block w-full transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg sm:rounded-xl shadow-sm">
        <img
          src={data.poster || "/no-image.png"}
          alt={data.title || "No title"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
          {data.isWatched ? "Watched" : "Not Watched"}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 opacity-0 sm:group-hover:opacity-100 transition duration-300">
          <button
            onClick={handleToggle}
            disabled={loading}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-md transition"
          >
            {loading ? <ClipLoader size={14} /> : <Check size={14} />}
            {data.isWatched ? "Unwatch" : "Watch"}
          </button>

          <button
            onClick={handleDelete}
            disabled={delLoading}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-md transition"
          >
            {delLoading ? <ClipLoader size={14} /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>

        <div className="absolute top-1 left-1 flex gap-1 sm:hidden">
          <button
            onClick={handleToggle}
            disabled={loading}
            className="
              flex items-center justify-center w-7 h-7
              bg-gray-700/90 hover:bg-gray-600
              backdrop-blur rounded-full shadow-md
              active:scale-95 transition
            "
          >
            {loading ? (
              <ClipLoader size={12} />
            ) : data.isWatched ? (
              <X size={14} className="text-gray-200" />
            ) : (
              <Check size={14} className="text-gray-200" />
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={delLoading}
            className="
              flex items-center justify-center w-7 h-7
              bg-gray-800/90 hover:bg-gray-700
              backdrop-blur rounded-full shadow-md
              active:scale-95 transition
            "
          >
            {delLoading ? (
              <ClipLoader size={12} />
            ) : (
              <Trash2 size={14} className="text-gray-300" />
            )}
          </button>
        </div>

        <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white line-clamp-2">
            {data.title}
          </h3>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">
            <Dot size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span>{data.type?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
