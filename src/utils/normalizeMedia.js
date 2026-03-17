import { formatDuration } from "./formatDuration";

const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_BACKDROP =
  "https://via.placeholder.com/1280x720?text=No+Backdrop";

// 🔥 helper (handles undefined safely)
function formatRating(value) {
  return typeof value === "number"
    ? Number(value.toFixed(1)) // change to string if you prefer: value.toFixed(1)
    : 0;
}

export function normalizeMovie(movie = {}) {
  return {
    id: movie?.id ?? null,
    title: movie?.title ?? "Unknown Title",

    poster: movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : FALLBACK_POSTER,

    rating: formatRating(movie?.vote_average),

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

    rating: formatRating(tv?.vote_average),

    type: "tv",
    source: "tmdb",
  };
}

export function normalizeAnime(anime = {}) {
  return {
    id: anime?.mal_id ?? null,

    title:
      anime?.title_english ||
      anime?.title ||
      anime?.title_japanese ||
      "Unknown Title",

    poster: anime?.images?.jpg?.image_url ?? FALLBACK_POSTER,

    rating: formatRating(anime?.score),

    type: "anime",
    source: "jikan",
  };
}

export function normalizeMovieDetail(movie = {}) {
  return {
    id: movie?.id ?? null,
    title: movie?.title ?? "Unknown Title",

    poster: movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : FALLBACK_POSTER,

    backdrop: movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : FALLBACK_BACKDROP,

    rating: formatRating(movie?.vote_average),

    overview: movie?.overview ?? "No description available",

    genres: movie?.genres?.map((g) => g.name) ?? [],

    releaseDate: movie?.release_date ?? null,
    status: movie?.status ?? null,
    duration: formatDuration(movie?.runtime ?? null),

    trailer: null,

    type: "movie",
    source: "tmdb",
  };
}

export function normalizeTVDetail(tv = {}) {
  return {
    id: tv?.id ?? null,
    title: tv?.name ?? "Unknown Title",

    poster: tv?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : FALLBACK_POSTER,

    backdrop: tv?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
      : FALLBACK_BACKDROP,

    rating: formatRating(tv?.vote_average),

    overview: tv?.overview ?? "No description available",
    duration: formatDuration(tv?.runtime ?? null),
    genres: tv?.genres?.map((g) => g.name) ?? [],

    releaseDate: tv?.first_air_date ?? null,
    status: tv?.status ?? null,
    episodes: tv?.number_of_episodes ?? null,

    trailer: null,

    type: "tv",
    source: "tmdb",
  };
}

export function normalizeAnimeDetail(anime = {}) {
  const poster = anime?.images?.jpg?.large_image_url ?? FALLBACK_POSTER;
  const backdrop = anime?.images?.jpg?.large_image_url ?? FALLBACK_POSTER;

  return {
    id: anime?.mal_id ?? null,

    title:
      anime?.title_english ||
      anime?.title ||
      anime?.title_japanese ||
      "Unknown Title",

    poster,
    backdrop: backdrop || FALLBACK_BACKDROP,

    rating: formatRating(anime?.score),

    overview: anime?.synopsis ?? "No description available",

    genres: anime?.genres?.map((g) => g.name) ?? [],

    releaseDate: anime?.aired?.from ?? null,
    status: anime?.status ?? null,
    episodes: anime?.episodes ?? null,
    duration: anime?.duration ?? null,

    trailer: anime?.trailer?.url ?? null,

    type: "anime",
    source: "jikan",
  };
}
