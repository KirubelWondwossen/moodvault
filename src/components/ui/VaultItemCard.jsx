import { Check, Dot, Trash2 } from "lucide-react";
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

      onDelete?.(data.id); // ✅ remove from UI instantly

      await deleteItem(userId, data.id); // ✅ FIXED ID
    } catch (err) {
      console.error(err);
    } finally {
      setDelLoading(false);
    }
  };
  return (
    <Link
      to={`/details/${data.type}/${data.itemId}`}
      className="group block w-full max-w-[190px] transition-transform duration-300 hover:scale-[1.03]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-sm">
        {/* Poster */}
        <img
          src={data.poster || "/no-image.png"}
          alt={data.title || "No title"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Status */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md">
          {data.isWatched ? "Watched" : "Not Watched"}
        </div>

        {/* Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300">
          {/* Toggle Watched */}
          <button
            onClick={handleToggle}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-md transition"
          >
            {loading ? <ClipLoader size={14} /> : <Check size={14} />}
            {data.isWatched ? "Unwatch" : "Watch"}
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={delLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-md transition"
          >
            {delLoading ? <ClipLoader size={14} /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {data.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Dot size={14} />
            <span>{data.type?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
