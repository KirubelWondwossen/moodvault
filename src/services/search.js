import { searchMovies, searchTV } from "./tmdb";
import { searchAnime } from "./jikan";
import {
  normalizeMovie,
  normalizeTV,
  normalizeAnime,
} from "../utils/normalizeMedia";

export async function searchAll(query) {
  const [movies, tv, anime] = await Promise.all([
    searchMovies(query),
    searchTV(query),
    searchAnime(query),
  ]);

  return [
    ...movies.map(normalizeMovie),
    ...tv.map(normalizeTV),
    ...anime.map(normalizeAnime),
  ];
}
