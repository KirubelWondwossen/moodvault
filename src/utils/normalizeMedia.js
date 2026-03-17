const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Image";
const FALLBACK_BACKDROP =
  "https://via.placeholder.com/1280x720?text=No+Backdrop";

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
    title:
      anime?.title_english ||
      anime?.title ||
      anime?.title_japanese ||
      "Unknown Title",

    poster: anime?.images?.jpg?.image_url ?? FALLBACK_POSTER,
    rating: anime?.score ?? 0,
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

    rating: movie?.vote_average ?? 0,
    overview: movie?.overview ?? "No description available",

    genres: movie?.genres?.map((g) => g.name) ?? [],

    releaseDate: movie?.release_date ?? null,
    status: movie?.status ?? null,
    duration: movie?.runtime ?? null,

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

    rating: tv?.vote_average ?? 0,
    overview: tv?.overview ?? "No description available",

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
  const poster = anime?.images?.jpg?.image_url ?? FALLBACK_POSTER;
  const backdrop = anime?.images?.jpg?.large_image_url ?? poster;

  return {
    id: anime?.mal_id ?? null,

    title:
      anime?.title_english ||
      anime?.title ||
      anime?.title_japanese ||
      "Unknown Title",

    poster,
    backdrop: backdrop || FALLBACK_BACKDROP,

    rating: anime?.score ?? 0,
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
