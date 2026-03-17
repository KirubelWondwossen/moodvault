import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchResult({ results, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 max-h-[25rem] z-50 overflow-y-auto shadow-md p-3 rounded-md bg-[#191d23] absolute mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  if (!results.length) return null;

  return (
    <div className="z-50 flex flex-col items-start gap-2 max-h-[25rem] overflow-y-auto shadow-md p-3 rounded-md bg-[#191d23] absolute mt-2">
      {results?.map((element) => (
        <ResultCard key={`${element.source}-${element.id}`} data={element} />
      ))}
    </div>
  );
}

function ResultCard({ data }) {
  return (
    <Link
      to={`/details/${data.type}/${data.id}`}
      className="p-2 flex items-center gap-4 hover:bg-borderColor rounded-md w-full"
    >
      <img
        src={data.poster}
        alt={data.title}
        className="rounded-lg object-cover shadow-sm aspect-[2/3] w-12 object-center"
      />
      <div className="flex flex-col gap-1">
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
    <div className="p-2 flex items-center gap-4 w-full animate-pulse">
      <div className="w-12 aspect-[2/3] rounded-md bg-gray-600" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 w-32 bg-gray-600 rounded" />
        <div className="h-3 w-16 bg-gray-600 rounded" />
      </div>
    </div>
  );
}
