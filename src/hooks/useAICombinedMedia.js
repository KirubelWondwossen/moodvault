import { useQuery } from "@tanstack/react-query";
import { getFromOpenRouter } from "../services/openrouter";
import { searchMoviesMultiple, searchTVMultiple } from "../services/tmdb";
import { useCombinedMedia } from "./useCombinedMedia";

export function useAICombinedMedia(mood) {
  const aiQuery = useQuery({
    queryKey: ["aiRecommendations", mood],
    queryFn: () => getFromOpenRouter(mood),
    enabled: !!mood,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const normalizeTitles = (data) => {
    if (!data) return [];

    return data
      .split(",")
      .map((t) =>
        t
          .replace(/\(.*?\)/g, "")
          .replace(/-.*$/, "")
          .replace(/[!]+/g, "")
          .trim(),
      )
      .filter(Boolean);
  };

  const titles = normalizeTitles(aiQuery.data);

  const hasTitles = titles.length > 0;

  const movieQuery = useQuery({
    queryKey: ["aiMovies", titles],
    queryFn: () => searchMoviesMultiple(titles),
    enabled: hasTitles,
  });

  const tvQuery = useQuery({
    queryKey: ["aiTV", titles],
    queryFn: () => searchTVMultiple(titles),
    enabled: hasTitles,
  });

  const aiResult = useCombinedMedia(movieQuery, tvQuery);

  const aiLoading =
    aiQuery.isLoading ||
    (hasTitles && (movieQuery.isLoading || tvQuery.isLoading));

  const aiError =
    aiQuery.error ||
    (hasTitles && movieQuery.error) ||
    (hasTitles && tvQuery.error);

  const isEmptyAI = !aiQuery.isLoading && aiResult.length === 0;

  return {
    aiResult,
    aiLoading,
    aiError,
    isEmptyAI,
  };
}
