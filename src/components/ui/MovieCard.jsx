export default function MovieCard({ data }) {
  if (!data) return null;
  return (
    <div className="w-40 flex-shrink-0">
      <img src={data.poster} alt={data.title} className="rounded-lg" />
      <h3 className="mt-2 text-sm font-medium">{data.title}</h3>
      <p className="text-xs text-gray-400">
        ⭐ {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
      </p>
    </div>
  );
}
