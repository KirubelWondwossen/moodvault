import { GENRE_NAME_TO_ID } from "../utils/genreNameToId";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};

export const getPopularTv = async () => {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
};

export const getTrendingTv = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending TV shows");
  }

  const data = await response.json();
  return data.results;
};

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const data = await res.json();
  return data.results;
}

export async function searchTV(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const data = await res.json();
  return data.results;
}

export const getMovieDetails = async (movieId) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await res.json();
  return data;
};

export const getTvDetails = async (tvId) => {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tv show details");
  }

  const data = await res.json();
  return data;
};

export async function searchMoviesMultiple(queries = []) {
  const cleanedQueries = queries.map((q) => q.trim()).filter(Boolean);

  const results = await Promise.all(
    cleanedQueries.map((q) =>
      fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(q)}`,
      ).then((res) => res.json()),
    ),
  );

  const bestMatches = results.flatMap((r) => {
    const sorted = (r.results || []).sort(
      (a, b) => b.popularity - a.popularity,
    );
    return sorted.slice(0, 3);
  });

  const filtered = bestMatches.filter(
    (item) =>
      item.popularity > 20 && item.vote_count > 50 && item.vote_average > 5,
  );

  const unique = Array.from(
    new Map(filtered.map((item) => [item.id, item])).values(),
  );

  return unique.slice(0, 20);
}

export async function searchTVMultiple(queries = []) {
  const cleanedQueries = queries.map((q) => q.trim()).filter(Boolean);

  const results = await Promise.all(
    cleanedQueries.map((q) =>
      fetch(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(q)}`,
      ).then((res) => res.json()),
    ),
  );

  const bestMatches = results.flatMap((r) => {
    const sorted = (r.results || []).sort(
      (a, b) => b.popularity - a.popularity,
    );
    return sorted.slice(0, 3);
  });

  const filtered = bestMatches.filter(
    (item) =>
      item.popularity > 20 && item.vote_count > 50 && item.vote_average > 5,
  );

  const unique = Array.from(
    new Map(filtered.map((item) => [item.id, item])).values(),
  );

  return unique.slice(0, 20);
}

export async function fetchMovieByGenres(genres = []) {
  try {
    // 1. Clean & validate input
    const cleanedGenres = genres.map((g) => g?.trim()).filter(Boolean);

    if (!cleanedGenres.length) {
      return [];
    }

    // 2. Convert names → IDs safely
    const genreIds = cleanedGenres
      .map((g) => GENRE_NAME_TO_ID[g])
      .filter(Boolean);

    if (!genreIds.length) {
      return [];
    }

    // 3. Build request
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds.join(",")}`;

    const response = await fetch(url);

    // 4. Handle HTTP errors
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genres");
    }

    const data = await response.json();

    // 5. Safety check
    const results = data.results || [];

    // 6. Optional: filter low-quality results (like your other functions)
    const filtered = results.filter(
      (item) =>
        item.vote_count > 50 && item.vote_average >= 5 && item.popularity > 10,
    );

    // 7. Optional: remove duplicates
    const unique = Array.from(
      new Map(filtered.map((item) => [item.id, item])).values(),
    );

    return unique;
  } catch (error) {
    console.error("fetchByGenres error:", error);
    return [];
  }
}

export async function fetchTVByGenres(genres = []) {
  try {
    // 1. Clean & validate input
    const cleanedGenres = genres.map((g) => g?.trim()).filter(Boolean);

    if (!cleanedGenres.length) {
      return [];
    }

    // 2. Convert names → IDs safely
    const genreIds = cleanedGenres
      .map((g) => GENRE_NAME_TO_ID[g])
      .filter(Boolean);

    if (!genreIds.length) {
      return [];
    }

    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreIds.join(",")}&sort_by=popularity.desc`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch TV shows by genres");
    }

    const data = await response.json();

    // 5. Safety check
    const results = data.results || [];

    // 6. Filter low-quality results
    const filtered = results.filter(
      (item) =>
        item.vote_count > 50 && item.vote_average >= 5 && item.popularity > 10,
    );

    // 7. Remove duplicates
    const unique = Array.from(
      new Map(filtered.map((item) => [item.id, item])).values(),
    );

    return unique;
  } catch (error) {
    console.error("fetchTVByGenres error:", error);
    return [];
  }
}
