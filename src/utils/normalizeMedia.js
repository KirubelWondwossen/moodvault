import { formatDuration } from "./formatDuration";
import { getTrailer } from "./getTrailer";
import { normalizeDate } from "./normalizeDate";

const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_BACKDROP =
  "https://via.placeholder.com/1280x720?text=No+Backdrop";

function formatRating(value) {
  return typeof value === "number" ? Number(value.toFixed(1)) : 0;
}

function getYear(dateString) {
  if (!dateString) return null;
  return new Date(dateString).getFullYear() || null;
}

export function normalizeMovie(movie = {}) {
  return {
    id: movie?.id ?? null,
    title: movie?.title ?? "Unknown Title",

    poster: movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : FALLBACK_POSTER,

    rating: formatRating(movie?.vote_average),

    year: getYear(movie?.release_date),

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

    year: getYear(tv?.first_air_date),

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

    year: anime?.year || getYear(anime?.aired?.from),

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
    year: getYear(movie?.release_date),
    releaseDate: movie?.release_date ?? null,
    status: movie?.status ?? null,
    duration: formatDuration(movie?.runtime ?? null),

    trailer: getTrailer(movie?.videos?.results),

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
    duration: formatDuration(tv?.episode_run_time?.[0] ?? null),

    genres: tv?.genres?.map((g) => g.name) ?? [],
    year: getYear(tv?.first_air_date),
    releaseDate: tv?.first_air_date ?? null,
    status: tv?.status ?? null,
    episodes: tv?.number_of_episodes ?? null,

    trailer: getTrailer(tv?.videos?.results),

    type: "tv",
    source: "tmdb",
  };
}

export function normalizeAnimeDetail(anime = {}) {
  const poster = anime?.images?.jpg?.large_image_url ?? FALLBACK_POSTER;
  const backdrop = anime?.images?.jpg?.large_image_url ?? FALLBACK_POSTER;

  const trailer =
    anime?.trailer?.url ||
    anime?.trailer?.embed_url?.replace("embed/", "watch?v=").split("?")[0] ||
    null;

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
    year: anime?.year || getYear(anime?.aired?.from),
    releaseDate: normalizeDate(anime?.aired?.from) ?? null,
    status: anime?.status ?? null,
    episodes: anime?.episodes ?? null,
    duration: anime?.duration ?? null,

    trailer,

    type: "anime",
    source: "jikan",
    season: anime?.season ?? null,
  };
}
