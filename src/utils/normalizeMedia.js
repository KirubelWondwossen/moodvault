const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";

export function normalizeMovie(movie = {}) {
  return {
    id: movie?.id ?? null,
    title: movie?.title ?? "Unknown Title",
    poster: movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : FALLBACK_POSTER,
    rating: movie?.vote_average ?? 0,
    type: "movie",
    source: "tmdb",
  };
}

export function normalizeTV(tv = {}) {
  return {
    id: tv?.id ?? null,
    title: tv?.name ?? "Unknown Title",
    poster: tv?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : FALLBACK_POSTER,
    rating: tv?.vote_average ?? 0,
    type: "tv",
    source: "tmdb",
  };
}

export function normalizeAnime(anime = {}) {
  return {
    id: anime?.mal_id ?? null,
    title: anime?.title ?? "Unknown Title",
    poster: anime?.images?.jpg?.image_url ?? FALLBACK_POSTER,
    rating: anime?.score ?? 0,
    type: "anime",
    source: "jikan",
  };
}
