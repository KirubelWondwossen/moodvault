const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

export function getRandomBackdrop(items = []) {
  const valid = items.filter((item) => item.backdrop_path);

  if (!valid.length) return null;

  const randomIndex = Math.floor(Math.random() * valid.length);
  const randomItem = valid[randomIndex];

  return `${TMDB_BACKDROP_BASE}${randomItem.backdrop_path}`;
}
