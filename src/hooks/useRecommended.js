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
  });

  const topGenres = useMemo(() => {
    const items = userItemsQuery.data || [];
    if (!items.length) return [];

    const allGenres = items.flatMap((item) => item.genres || []);
    if (!allGenres.length) return [];

    const genreCount = {};
    allGenres.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1;
    });

    return Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  }, [userItemsQuery.data]);

  const hasSavedItems = (userItemsQuery.data || []).length > 0;
  const hasGenres = topGenres.length > 0;

  // 3. Fetch only if valid
  const movieQuery = useQuery({
    queryKey: ["recommendedMovies", topGenres],
    queryFn: () => fetchMovieByGenres(topGenres),
    enabled: hasSavedItems && hasGenres,
    staleTime: 1000 * 60 * 10,
  });

  const tvQuery = useQuery({
    queryKey: ["recommendedTV", topGenres],
    queryFn: () => fetchTVByGenres(topGenres),
    enabled: hasSavedItems && hasGenres,
    staleTime: 1000 * 60 * 10,
  });

  const combined = useCombinedMedia(movieQuery, tvQuery);

  const recommended = useMemo(() => {
    const savedItems = userItemsQuery.data || [];

    if (!hasSavedItems || !hasGenres) return [];

    if (!combined.length) return [];

    const savedIds = new Set(savedItems.map((item) => item.itemId));

    return combined.filter((item) => !savedIds.has(item.id)).slice(0, 20);
  }, [combined, userItemsQuery.data, hasSavedItems, hasGenres]);

  return {
    recommended,
    isLoadingRec:
      userItemsQuery.isLoading ||
      (hasSavedItems &&
        hasGenres &&
        (movieQuery.isLoading || tvQuery.isLoading)),
    isErrorRec:
      userItemsQuery.isError ||
      (hasSavedItems && hasGenres && (movieQuery.isError || tvQuery.isError)),
  };
}
