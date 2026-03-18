import { useMemo } from "react";
import { normalizeMovie, normalizeTV } from "../utils/normalizeMedia";
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

export function useCombinedMedia(movieQuery, tvQuery) {
  return useMemo(() => {
    const movies = (movieQuery.data ?? []).map(normalizeMovie);
    const tv = (tvQuery.data ?? []).map(normalizeTV);

    const combined = [...movies, ...tv];

    return shuffleWithSeed(combined, combined.length);
  }, [movieQuery.data, tvQuery.data]);
}
