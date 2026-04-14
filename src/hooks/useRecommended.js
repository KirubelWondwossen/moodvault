import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import { fetchMovieByGenres, fetchTvByGenres } from "../services/tmdb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useCombinedAIMedia } from "./useCombinedMedia";

export function useRecommended() {
  const { user } = useAuth();

  const userItemsQuery = useQuery({
    queryKey: ["userItems", user?.uid],
    queryFn: () => fetchUserItems(user.uid),
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5,
  });

  const savedItems = useMemo(
    () => userItemsQuery.data ?? [],
    [userItemsQuery.data],
  );

  const topGenres = useMemo(() => {
    if (!savedItems.length) return [];

    const genreCount = {};

    savedItems.forEach((item) => {
      (item.genres || []).forEach((g) => {
        genreCount[g] = (genreCount[g] || 0) + 1;
      });
    });

    return Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  }, [savedItems]);

  const hasSavedItems = savedItems.length > 0;
  const hasGenres = topGenres.length > 0;

  const movieQuery = useInfiniteQuery({
    queryKey: ["recommendedMovies", topGenres],
    queryFn: ({ pageParam = 1 }) => fetchMovieByGenres(topGenres, pageParam),
    enabled: hasGenres,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length) return undefined;
      return allPages.length + 1;
    },
  });

  const tvQuery = useInfiniteQuery({
    queryKey: ["recommendedTV", topGenres],
    queryFn: ({ pageParam = 1 }) => fetchTvByGenres(topGenres, pageParam),
    enabled: hasGenres,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length) return undefined;
      return allPages.length + 1;
    },
  });

  const movieData = movieQuery.data?.pages.flat() || [];
  const tvData = tvQuery.data?.pages.flat() || [];

  const combined = useCombinedAIMedia(movieData, tvData);

  const recommended = useMemo(() => {
    if (!hasSavedItems || !hasGenres) return [];

    const savedIds = new Set(savedItems.map((item) => item.itemId));

    return combined.filter((item) => !savedIds.has(item.id));
  }, [combined, savedItems, hasSavedItems, hasGenres]);

  const isLoadingRec =
    userItemsQuery.isLoading ||
    (hasGenres &&
      (movieQuery.isLoading ||
        tvQuery.isLoading ||
        movieQuery.isFetchingNextPage ||
        tvQuery.isFetchingNextPage));

  const isErrorRec =
    userItemsQuery.error ||
    (hasGenres && movieQuery.error) ||
    (hasGenres && tvQuery.error);

  const noUserData = !userItemsQuery.isLoading && !hasSavedItems;
  const noGenres = hasSavedItems && !hasGenres;

  const isEmptyRec =
    !isLoadingRec && hasSavedItems && hasGenres && recommended.length === 0;

  const fetchNextPage = () => {
    if (movieQuery.hasNextPage) movieQuery.fetchNextPage();
    if (tvQuery.hasNextPage) tvQuery.fetchNextPage();
  };

  const hasNextPage = movieQuery.hasNextPage || tvQuery.hasNextPage;

  return {
    recommended,
    isLoadingRec,
    isErrorRec,
    noUserData,
    noGenres,
    isEmptyRec,
    fetchNextPage,
    hasNextPage,
  };
}
