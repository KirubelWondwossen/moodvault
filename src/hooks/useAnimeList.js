import { useMemo } from "react";
import { normalizeAnime } from "../utils/normalizeMedia";

export function useAnimeList(animeQuery) {
  return useMemo(() => {
    const anime = animeQuery.data || [];
    return [
      ...anime
        .map(normalizeAnime)
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    ];
  }, [animeQuery.data]);
}
