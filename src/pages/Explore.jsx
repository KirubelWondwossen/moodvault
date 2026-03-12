import { useQueries } from "@tanstack/react-query";
import {
  getPopularMovies,
  getPopularTv,
  getTrendingMovies,
  getTrendingTv,
} from "../services/tmdb";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";
import { Loader } from "../components/ui/Loader";
import MainLayout from "../components/Layout/MainLayout";
import { useCombinedMedia } from "../hooks/useCombinedMedia";
import { useAnimeList } from "../hooks/useAnimeList";

export default function Explore() {
  const results = useQueries({
    queries: [
      { queryKey: ["trendingMovies"], queryFn: getTrendingMovies },
      { queryKey: ["topAnime"], queryFn: getTopAnime },
      { queryKey: ["currentAnime"], queryFn: getSeasonalAnime },
      { queryKey: ["popularMovies"], queryFn: getPopularMovies },
      { queryKey: ["popularTv"], queryFn: getPopularTv },
      { queryKey: ["trendingTv"], queryFn: getTrendingTv },
    ],
  });

  const [
    trendingMovieQuery,
    topAnimeQuery,
    currentAnimeQuery,
    popularMoviesQuery,
    popularTvQuery,
    trendingTvQuery,
  ] = results;

  const trendingMovieTv = useCombinedMedia(trendingMovieQuery, trendingTvQuery);

  const popularMovieTv = useCombinedMedia(popularMoviesQuery, popularTvQuery);

  const topAnime = useAnimeList(topAnimeQuery);

  const trendingAnime = useAnimeList(currentAnimeQuery);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      {results.some((q) => q.isLoading) && <Loader />}
      {!results.some((q) => q.isLoading) && (
        <div className="flex flex-col overflow-x-auto pb-4 scrollbar-hide pl-8">
          <h2 className="text-xl font-semibold mb-3">Trending Movies</h2>
          <div className="flex gap-4">
            <MovieCards data={trendingMovieTv} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

function MovieCards({ data }) {
  return (
    <div className="flex flex-wrap gap-4">
      {[...data]
        .sort((a, b) => b.rating - a.rating)
        .map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
    </div>
  );
}

function MovieCard({ data }) {
  if (!data) return null;
  return (
    <div key={data.id} className="w-40">
      <img src={data.poster} alt={data.title} className="rounded-lg" />
      <h3 className="mt-2 text-sm font-medium">{data.title}</h3>
      <p className="text-xs text-gray-400">
        ⭐ {data.rating && data.rating !== 0 ? data.rating.toFixed(1) : "N/A"}
      </p>
    </div>
  );
}
