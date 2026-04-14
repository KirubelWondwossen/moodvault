import { GENRE_NAME_TO_ID } from "../utils/genreNameToId";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// -----------------------------
// helpers
// -----------------------------
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchTMDB(url, retries = 2, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    // Rate limit
    if (res.status === 429) {
      if (retries === 0) {
        const err = new Error("Rate limited");
        err.status = 429;
        throw err;
      }
      await delay(1500);
      return fetchTMDB(url, retries - 1, timeoutMs);
    }

    // Other HTTP errors
    if (!res.ok) {
      const err = new Error("TMDB request failed");
      err.status = res.status;
      throw err;
    }

    return await res.json();
  } catch (err) {
    clearTimeout(timeout);

    // Timeout
    if (err.name === "AbortError") {
      err.status = 408;
    }

    // Network / unknown
    if (!err.status) {
      err.status = 0;
    }

    // Retry
    if (retries > 0) {
      await delay(1000);
      return fetchTMDB(url, retries - 1, timeoutMs);
    }

    throw err;
  }
}

// -----------------------------
// basic fetches
// -----------------------------
export const getTrendingMovies = async () => {
  const data = await fetchTMDB(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );
  return data.results || [];
};

export const getPopularMovies = async () => {
  const data = await fetchTMDB(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return data.results || [];
};

export const getPopularTv = async () => {
  const data = await fetchTMDB(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  return data.results || [];
};

export const getTrendingTv = async () => {
  const data = await fetchTMDB(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
  );
  return data.results || [];
};

// -----------------------------
// search
// -----------------------------
export async function searchMovies(query) {
  if (!query?.trim()) return [];

  const data = await fetchTMDB(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  return data.results || [];
}

export async function searchTV(query) {
  if (!query?.trim()) return [];

  const data = await fetchTMDB(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  return data.results || [];
}

// -----------------------------
// details
// -----------------------------
export const getMovieDetails = async (movieId) => {
  const data = await fetchTMDB(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );
  return data;
};

export const getTvDetails = async (tvId) => {
  const data = await fetchTMDB(
    `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );
  return data;
};

// -----------------------------
// genre-based
// -----------------------------
export async function fetchMovieByGenres(genres = [], page = 1) {
  const cleaned = genres.map((g) => g?.trim()).filter(Boolean);
  if (!cleaned.length) return [];

  const genreIds = cleaned.map((g) => GENRE_NAME_TO_ID[g]).filter(Boolean);

  if (!genreIds.length) return [];

  let selectedGenres;

  if (page % 3 === 0 && genreIds.length > 1) {
    selectedGenres = genreIds.slice(0, 2).join(",");
  } else {
    selectedGenres = genreIds[page % genreIds.length];
  }

  const data = await fetchTMDB(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenres}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=20&include_adult=false&page=${page}`,
  );

  const results = data.results || [];

  const filtered = results.filter(
    (item) => item.poster_path && item.backdrop_path,
  );

  return filtered;
}

export async function fetchTvByGenres(genres = [], page = 1) {
  const cleaned = genres.map((g) => g?.trim()).filter(Boolean);
  if (!cleaned.length) return [];

  const genreIds = cleaned.map((g) => GENRE_NAME_TO_ID[g]).filter(Boolean);

  if (!genreIds.length) return [];

  let selectedGenres;

  if (page % 3 === 0 && genreIds.length > 1) {
    selectedGenres = genreIds.slice(0, 2).join(",");
  } else {
    selectedGenres = genreIds[page % genreIds.length];
  }

  const data = await fetchTMDB(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${selectedGenres}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=20&include_adult=false&page=${page}`,
  );

  const results = data.results || [];

  const filtered = results.filter(
    (item) => item.poster_path && item.backdrop_path,
  );

  return filtered;
}
