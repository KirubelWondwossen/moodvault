import { useQueries } from "@tanstack/react-query";
import {
  getPopularMovies,
  getPopularTv,
  getTrendingMovies,
  getTrendingTv,
} from "../services/tmdb";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";

export function useExploreData() {
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

  const isLoading = results.some((q) => q.isLoading);
  const isError = results.some((q) => q.isError);

  const errors = results.filter((q) => q.isError).map((q) => q.error);

  return {
    results,
    isLoading,
    isError,
    errors,
  };
}
