import { Dot, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchResult({ results, isLoading, setSearchTerm }) {
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

  if (results.length === 0) return null;

  return (
    <DropdownWrapper>
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="font-heading text-sm sm:text-base">Search results</h3>
        <X
          size={20}
          className="cursor-pointer"
          onClick={() => setSearchTerm("")}
        />
      </div>

      {results.map((element) => (
        <ResultCard
          key={`${element.source}-${element.id}`}
          data={element}
          setSearchTerm={setSearchTerm}
        />
      ))}
    </DropdownWrapper>
  );
}

function DropdownWrapper({ children }) {
  return (
    <div
      className="
        absolute left-0 right-0
        mt-2
        z-[100]
        w-[80vw] sm:w-[500px] md:w-[650px] lg:w-[750px]
        max-h-[60vh]
        overflow-y-auto
        rounded-xl
        bg-[#191d23]
        shadow-lg
        p-3
      "
    >
      {children}
    </div>
  );
}

function ResultCard({ data, setSearchTerm }) {
  return (
    <Link
      to={`/details/${data.type}/${data.id}`}
      onClick={() => setSearchTerm("")}
      className="
        flex items-center gap-3
        p-2 rounded-md
        hover:bg-borderColor
        transition-all
      "
    >
      <img
        src={data.poster}
        alt={data.title}
        className="w-10 sm:w-12 aspect-[2/3] object-cover rounded-md"
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <h3 className="text-sm font-medium truncate">{data.title}</h3>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>
            ⭐{" "}
            {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
          </span>
          <Dot size={14} />
          <span>{data.type?.toUpperCase()}</span>
        </div>
      </div>
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
