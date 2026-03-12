import { useQueries } from "@tanstack/react-query";
import {
  getPopularMovies,
  getPopularTv,
  getTrendingMovies,
} from "../services/tmdb";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";
import { Loader } from "../components/ui/Loader";
import MainLayout from "../components/Layout/MainLayout";

export default function Explore() {
  const results = useQueries({
    queries: [
      { queryKey: ["trendingMovies"], queryFn: getTrendingMovies },
      { queryKey: ["topAnime"], queryFn: getTopAnime },
      { queryKey: ["currentAnime"], queryFn: getSeasonalAnime },
      { queryKey: ["popularMovies"], queryFn: getPopularMovies },
      { queryKey: ["popularTv"], queryFn: getPopularTv },
    ],
  });

  const [
    moviesQuery,
    topAnimeQuery,
    currentAnimeQuery,
    popularMoviesQuery,
    popularTvQuery,
  ] = results;

  const movies = moviesQuery.data || [];
  const anime = currentAnimeQuery.data || [];
  const topAnime = topAnimeQuery.data || [];
  const popularMovies = popularMoviesQuery.data || [];
  const popularTv = popularTvQuery.data || [];
  console.log(movies);

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      {results.some((q) => q.isLoading) && <Loader />}
      {!results.some((q) => q.isLoading) && (
        <div className="flex flex-col overflow-x-auto pb-4 scrollbar-hide pl-8">
          <h2 className="text-xl font-semibold mb-3">Trending Movies</h2>
          <div className="flex gap-4">
            <MovieCards data={movies} />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

function MovieCards({ data }) {
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div key={movie.id} className="w-40">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg"
      />
      <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
      <p className="text-xs text-gray-400">
        ⭐ {movie.vote_average?.toFixed(1)}
      </p>
    </div>
  );
}

function AnimeCards({ data }) {
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((anime) => (
        <AnimeCard anime={anime} />
      ))}
    </div>
  );
}

function AnimeCard({ anime }) {
  return (
    <div key={anime.mal_id} className="w-40">
      <img
        src={anime.images?.jpg?.image_url}
        alt={anime.title}
        className="rounded-lg"
      />
      <h3 className="mt-2 text-sm font-medium">{anime.title}</h3>
      <p className="text-xs text-gray-400">⭐ {anime.score ?? "N/A"}</p>
    </div>
  );
}
