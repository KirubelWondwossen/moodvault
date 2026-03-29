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

    if (typeof data === "string") {
      return data
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (Array.isArray(data)) {
      return data.map((t) => String(t).trim()).filter(Boolean);
    }

    return [];
  };

  const rawTitles = normalizeTitles(aiQuery.data);

  const titles = rawTitles
    .map((t) =>
      t
        .replace(/\(.*?\)/g, "")
        .replace(/-.*$/, "")
        .replace(/[!]+/g, "")
        .trim(),
    )
    .filter(Boolean);

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

  const isEmptyAI = !aiQuery.isLoading && !hasTitles;

  return { aiResult, aiLoading, aiError, isEmptyAI };
}
