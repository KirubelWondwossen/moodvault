import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFromOpenRouter } from "../services/openrouter";
import { fetchMovieByGenresAI, fetchTvByGenresAI } from "../services/tmdb";
import { useCombinedAIMedia } from "./useCombinedMedia";

export function useAICombinedMedia(mood) {
  const aiQuery = useQuery({
    queryKey: ["aiGenres", mood],
    queryFn: () => getFromOpenRouter(mood),
    enabled: !!mood,
    staleTime: 1000 * 60 * 60,
  });

  function normalizeGenres(data) {
    if (!data) return [];

    return data
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
  }

  const genres = normalizeGenres(aiQuery.data);
  const hasGenres = genres.length > 0;

  const movieQuery = useInfiniteQuery({
    queryKey: ["discoverMovies", genres],
    queryFn: ({ pageParam = 1 }) => fetchMovieByGenresAI(genres, pageParam),
    enabled: hasGenres,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length) return undefined;
      return allPages.length + 1;
    },
  });

  const tvQuery = useInfiniteQuery({
    queryKey: ["discoverTV", genres],
    queryFn: ({ pageParam = 1 }) => fetchTvByGenresAI(genres, pageParam),
    enabled: hasGenres,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length) return undefined;
      return allPages.length + 1;
    },
  });

  const movieData = movieQuery.data?.pages.flat() || [];
  const tvData = tvQuery.data?.pages.flat() || [];

  const combinedRaw = [...movieData, ...tvData];

  const uniqueCombined = Array.from(
    new Map(combinedRaw.map((item) => [item.id, item])).values(),
  );

  const aiResult = useCombinedAIMedia(uniqueCombined);

  const aiLoading =
    aiQuery.isLoading ||
    (hasGenres &&
      (movieQuery.isFetchingNextPage ||
        tvQuery.isFetchingNextPage ||
        movieQuery.isLoading ||
        tvQuery.isLoading));

  const aiError =
    aiQuery.error ||
    (hasGenres && movieQuery.error) ||
    (hasGenres && tvQuery.error);

  const isEmptyAI = !aiQuery.isLoading && aiResult.length === 0;

  const fetchNextPage = () => {
    if (movieQuery.hasNextPage) movieQuery.fetchNextPage();
    if (tvQuery.hasNextPage) tvQuery.fetchNextPage();
  };

  const hasNextPage = movieQuery.hasNextPage || tvQuery.hasNextPage;

  return {
    aiResult,
    aiLoading,
    aiError,
    isEmptyAI,
    fetchNextPage,
    hasNextPage,
  };
}
