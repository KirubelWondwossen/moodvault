import { useMemo } from "react";
import { normalizeMovie, normalizeTV } from "../utils/normalizeMedia";

export function useCombinedMedia(movieQuery, tvQuery) {
  return useMemo(() => {
    const movies = movieQuery.data ?? [];
    const tv = tvQuery.data ?? [];

    return [...movies.map(normalizeMovie), ...tv.map(normalizeTV)];
  }, [movieQuery.data, tvQuery.data]);
}
