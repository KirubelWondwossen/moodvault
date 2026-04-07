import { useMemo } from "react";
import {
  normalizeMovie,
  normalizeTV,
  normalizeAnime,
} from "../utils/normalizeMedia";

// 🔹 same helpers
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleWithSeed(array, seed = 1) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const rand = seededRandom(seed + i);
    const j = Math.floor(rand * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function useAllMedia(movieQuery, tvQuery, animeQuery) {
  return useMemo(() => {
    const movies = (movieQuery.data ?? []).map(normalizeMovie);
    const tv = (tvQuery.data ?? []).map(normalizeTV);
    const anime = (animeQuery.data ?? []).map(normalizeAnime);

    const combined = [...movies, ...tv, ...anime];

    const uniqueMap = new Map();

    combined.forEach((item) => {
      const key = item.id ?? item.title?.toLowerCase();

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });

    const unique = Array.from(uniqueMap.values());

    return shuffleWithSeed(unique, unique.length);
  }, [movieQuery.data, tvQuery.data, animeQuery.data]);
}
