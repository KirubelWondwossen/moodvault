export function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    rating: movie.vote_average,
    type: "movie",
    source: "tmdb",
  };
}

export function normalizeTV(tv) {
  return {
    id: tv.id,
    title: tv.name,
    poster: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    rating: tv.vote_average,
    type: "tv",
    source: "tmdb",
  };
}

export function normalizeAnime(anime) {
  return {
    id: anime.mal_id,
    title: anime.title,
    poster: anime.images.jpg.image_url,
    rating: anime.score,
    type: "anime",
    source: "jikan",
  };
}
