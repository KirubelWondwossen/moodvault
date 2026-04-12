import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import { fetchMovieByGenres, fetchTVByGenres } from "../services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useCombinedMedia } from "./useCombinedMedia";

export function useRecommended() {
  const { user } = useAuth();

  const userItemsQuery = useQuery({
    queryKey: ["userItems", user?.uid],
    queryFn: () => fetchUserItems(user.uid),
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const savedItems = useMemo(() => {
    return userItemsQuery.data || [];
  }, [userItemsQuery.data]);

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

  const movieQuery = useQuery({
    queryKey: ["recommendedMovies", topGenres],
    queryFn: () => fetchMovieByGenres(topGenres),
    enabled: hasSavedItems && hasGenres,
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 2,
  });

  const tvQuery = useQuery({
    queryKey: ["recommendedTV", topGenres],
    queryFn: () => fetchTVByGenres(topGenres),
    enabled: hasSavedItems && hasGenres,
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    retry: 2,
  });

  const combined = useCombinedMedia(movieQuery, tvQuery);

  const recommended = useMemo(() => {
    if (!hasSavedItems || !hasGenres) return [];

    const savedIds = new Set(savedItems.map((item) => item.itemId));

    return combined.filter((item) => !savedIds.has(item.id)).slice(0, 20);
  }, [combined, savedItems, hasSavedItems, hasGenres]);

  const isLoadingRec =
    userItemsQuery.isLoading ||
    (hasSavedItems && hasGenres && (movieQuery.isLoading || tvQuery.isLoading));

  const isErrorRec = userItemsQuery.isError;

  const noUserData = !userItemsQuery.isLoading && !hasSavedItems;

  const noGenres = hasSavedItems && !hasGenres;

  const isEmptyRec =
    !isLoadingRec && hasSavedItems && hasGenres && recommended.length === 0;

  return {
    recommended,
    isLoadingRec,
    isErrorRec,
    noUserData,
    noGenres,
    isEmptyRec,
  };
}
