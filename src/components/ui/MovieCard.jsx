import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

export default function MovieCard({ data, vault }) {
  if (!data) return null;

  return (
    <Link
      to={
        vault
          ? `/details/${data.type}/${data.itemId}`
          : `/details/${data.type}/${data.id}`
      }
      className="
        group block w-full
        transition-transform duration-300
      "
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg sm:rounded-xl shadow-sm">
        {/* Image */}
        <img
          src={data.poster || "/no-poster.png"}
          alt={data.title || "No title"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Rating */}
        {data.rating && (
          <div
            className="
              absolute top-1 right-1
              sm:top-2 sm:right-2
              bg-black/70 text-white
              text-[10px] sm:text-xs
              px-1.5 py-0.5 sm:px-2 sm:py-1
              rounded-md
            "
          >
            ⭐{" "}
            {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
          </div>
        )}

        {/* Bottom Content */}
        <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2">
          <h3
            className="
              text-xs sm:text-sm md:text-base
              font-semibold text-white
              line-clamp-2
            "
          >
            {data.title}
          </h3>

          <div
            className="
              flex items-center gap-1
              text-[10px] sm:text-xs
              text-gray-300
              mt-0.5 sm:mt-1
            "
          >
            <span className="font-body">{data.type?.toUpperCase()}</span>
            <Dot size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="font-body">{data?.year ?? "N/A"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
