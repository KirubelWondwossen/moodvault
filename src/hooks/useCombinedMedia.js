import { useMemo } from "react";
import { normalizeMovie, normalizeTV } from "../utils/normalizeMedia";

export function useCombinedMedia(movieQuery, tvQuery) {
  return useMemo(() => {
    const movies = movieQuery.data ?? [];
    const tv = tvQuery.data ?? [];

    return [...movies.map(normalizeMovie), ...tv.map(normalizeTV)].sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    );
  }, [movieQuery.data, tvQuery.data]);
}
