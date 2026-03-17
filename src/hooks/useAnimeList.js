import { useMemo } from "react";
import { normalizeAnime } from "../utils/normalizeMedia";

export function useAnimeList(animeQuery) {
  return useMemo(() => {
    const anime = animeQuery.data || [];
    return [...anime.map(normalizeAnime)];
  }, [animeQuery.data]);
}
