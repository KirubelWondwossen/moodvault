import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieCard({ data }) {
  if (!data) return null;
  return (
    <Link
      to={`/details/${data.type}/${data.id}`}
      className="group block w-full max-w-[190px] transition-transform duration-300"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-sm">
        <img
          src={data.poster || "/no-image.png"}
          alt={data.title || "No title"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {data.rating && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            ⭐{" "}
            {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
          </div>
        )}

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
