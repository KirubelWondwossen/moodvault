export default function MovieCard({ data }) {
  if (!data) return null;
  return (
    <div>
      <div className="h-64">
        <img
          src={data.poster}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <h3 className="mt-2 text-sm font-medium line-clamp-2">{data.title}</h3>

      <p className="text-xs text-gray-400">
        ⭐ {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
      </p>
    </div>
  );
}
