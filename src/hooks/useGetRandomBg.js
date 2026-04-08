import { useMemo } from "react";
import { getRandomBackdrop } from "../utils/getRandomBackdrop";

export function useGetRandomBg(movieQuery, tvQuery) {
  return useMemo(() => {
    const movies = movieQuery.data || [];
    const tv = tvQuery.data || [];

    const combined = [...movies, ...tv];

    if (!combined.length) {
      return { items: [], backdrop: null };
    }

    const random = getRandomBackdrop(combined);

    return {
      items: combined,
      backdrop: random,
    };
  }, [movieQuery.data, tvQuery.data]);
}
