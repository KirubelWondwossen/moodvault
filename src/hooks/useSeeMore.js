import { useQueries } from "@tanstack/react-query";
import {
  getPopularMovies,
  getPopularTv,
  getTrendingMovies,
  getTrendingTv,
} from "../services/tmdb";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";
import { useCombinedMedia } from "./useCombinedMedia";
import { useAnimeList } from "./useAnimeList";

export function useSeeMore(type) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["trendingMovies"],
        queryFn: getTrendingMovies,
        enabled: type === "trending-movie-tv",
      },
      {
        queryKey: ["trendingTv"],
        queryFn: getTrendingTv,
        enabled: type === "trending-movie-tv",
      },
      {
        queryKey: ["popularMovies"],
        queryFn: getPopularMovies,
        enabled: type === "popular-movie-tv",
      },
      {
        queryKey: ["popularTv"],
        queryFn: getPopularTv,
        enabled: type === "popular-movie-tv",
      },
      {
        queryKey: ["topAnime"],
        queryFn: getTopAnime,
        enabled: type === "top-anime",
      },
      {
        queryKey: ["currentAnime"],
        queryFn: getSeasonalAnime,
        enabled: type === "trending-anime",
      },
    ],
  });

  const [
    trendingMovieQuery,
    trendingTvQuery,
    popularMoviesQuery,
    popularTvQuery,
    topAnimeQuery,
    currentAnimeQuery,
  ] = results;

  const isLoading = results.some((query) => query.isLoading);
  const error = results.find((query) => query.error)?.error;

  const trendingMovieTv = useCombinedMedia(trendingMovieQuery, trendingTvQuery);
  const popularMovieTv = useCombinedMedia(popularMoviesQuery, popularTvQuery);
  const topAnime = useAnimeList(topAnimeQuery);
  const trendingAnime = useAnimeList(currentAnimeQuery);

  let data = null;

  if (type === "trending-movie-tv") data = trendingMovieTv;
  if (type === "popular-movie-tv") data = popularMovieTv;
  if (type === "trending-anime") data = trendingAnime;
  if (type === "top-anime") data = topAnime;

  return { data, isLoading, error };
}
