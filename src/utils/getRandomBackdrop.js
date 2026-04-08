export function getRandomBackdrop(movies = []) {
  const valid = movies.filter((m) => m.poster);

  if (!valid.length) return null;

  const randomIndex = Math.floor(Math.random() * valid.length);
  const movie = valid[randomIndex];

  return movie.poster;
}
