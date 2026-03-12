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
import {
  normalizeMovie,
  normalizeTV,
  normalizeAnime,
} from "../utils/normalizeMedia";
import { useMemo } from "react";

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
    trendingMoviesQuery,
    topAnimeQuery,
    currentAnimeQuery,
    popularMoviesQuery,
    popularTvQuery,
    trendingTvQuery,
  ] = results;

  const trendingMovieTv = useMemo(() => {
    const movies = trendingMoviesQuery.data ?? [];
    const tv = trendingTvQuery.data ?? [];

    return [...movies.map(normalizeMovie), ...tv.map(normalizeTV)].sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    );
  }, [trendingMoviesQuery.data, trendingTvQuery.data]);

  const popularMovieTv = useMemo(() => {
    const movies = popularMoviesQuery.data ?? [];
    const tv = popularTvQuery.data ?? [];

    return [...movies.map(normalizeMovie), ...tv.map(normalizeTV)].sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    );
  }, [popularMoviesQuery.data, popularTvQuery.data]);

  const topAnime = useMemo(() => {
    const anime = topAnimeQuery.data || [];
    return [
      ...anime
        .map(normalizeAnime)
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    ];
  }, [topAnimeQuery.data]);

  const trendingAnime = useMemo(() => {
    const anime = currentAnimeQuery.data || [];
    return [
      ...anime
        .map(normalizeAnime)
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    ];
  }, [currentAnimeQuery.data]);

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
        ⭐ {data.rating && data.rating !== 0 ? data.rating : "N/A"}
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
