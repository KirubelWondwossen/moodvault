import { searchMovies, searchTV } from "./tmdb";
import { searchAnime } from "./jikan";
import {
  normalizeMovie,
  normalizeTV,
  normalizeAnime,
} from "../utils/normalizeMedia";

export async function searchAll(query) {
  const results = await Promise.allSettled([
    searchMovies(query),
    searchTV(query),
    searchAnime(query),
  ]);

  results.forEach((res, index) => {
    if (res.status === "rejected") {
      console.error(`API ${index} failed:`, res.reason);
    }
  });

  const [moviesRes, tvRes, animeRes] = results;

  return [
    ...(moviesRes.status === "fulfilled"
      ? moviesRes.value.map(normalizeMovie)
      : []),

    ...(tvRes.status === "fulfilled" ? tvRes.value.map(normalizeTV) : []),

    ...(animeRes.status === "fulfilled"
      ? animeRes.value.map(normalizeAnime)
      : []),
  ];
}
