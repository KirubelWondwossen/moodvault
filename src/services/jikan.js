const BASE_URL = "https://api.jikan.moe/v4";

const fetchWithRetry = async (url, retries = 2, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    clearTimeout(timeout);

    if (retries > 0) {
      console.warn("Retrying:", url);
      return fetchWithRetry(url, retries - 1, timeoutMs);
    }

    console.error("Fetch failed:", url, err);
    throw err;
  }
};

export const getTopAnime = async () => {
  return fetchWithRetry(`${BASE_URL}/top/anime`);
};

export const getSeasonalAnime = async () => {
  return fetchWithRetry(`${BASE_URL}/seasons/now`);
};

export const searchAnime = async (query) => {
  if (!query?.trim()) return [];

  return fetchWithRetry(`${BASE_URL}/anime?q=${encodeURIComponent(query)}`);
};

export const getAnimeDetails = async (animeId) => {
  return fetchWithRetry(`${BASE_URL}/anime/${animeId}`);
};
