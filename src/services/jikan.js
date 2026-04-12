const BASE_URL = "https://api.jikan.moe/v4";

const cache = new Map();

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchWithRetry = async (url, retries = 3, timeoutMs = 8000) => {
  if (cache.has(url)) return cache.get(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.status === 429) {
      if (retries === 0) {
        const err = new Error("Rate limited");
        err.status = 429;
        throw err;
      }
      await delay(2000);
      return fetchWithRetry(url, retries - 1, timeoutMs);
    }

    if (res.status === 504) {
      if (retries === 0) {
        const err = new Error("Server timeout");
        err.status = 504;
        throw err;
      }
      await delay(1000);
      return fetchWithRetry(url, retries - 1, timeoutMs);
    }

    if (!res.ok) {
      const err = new Error(`HTTP error`);
      err.status = res.status;
      throw err;
    }

    const data = await res.json();
    const result = data.data;

    cache.set(url, result);

    return result;
  } catch (err) {
    clearTimeout(timeout);

    if (err.name === "AbortError") {
      err.status = 408;
    }

    if (!err.status) {
      err.status = 0;
    }

    if (retries > 0) {
      await delay((4 - retries) * 1000);
      console.warn("Retrying:", url);
      return fetchWithRetry(url, retries - 1, timeoutMs);
    }

    console.error("Fetch failed:", url, err);
    throw err;
  }
};

let active = 0;
const MAX = 2;
const queue = [];

const enqueue = (fn) =>
  new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    runNext();
  });

const runNext = () => {
  if (active >= MAX || queue.length === 0) return;

  const { fn, resolve, reject } = queue.shift();
  active++;

  fn()
    .then(resolve)
    .catch(reject)
    .finally(() => {
      active--;
      runNext();
    });
};

export const getTopAnime = async () => {
  return enqueue(() => fetchWithRetry(`${BASE_URL}/top/anime`));
};

export const getSeasonalAnime = async () => {
  return enqueue(() => fetchWithRetry(`${BASE_URL}/seasons/now`));
};

export const searchAnime = async (query) => {
  if (!query?.trim()) return [];
  return enqueue(() =>
    fetchWithRetry(`${BASE_URL}/anime?q=${encodeURIComponent(query)}`),
  );
};

export const getAnimeDetails = async (animeId) => {
  return enqueue(() => fetchWithRetry(`${BASE_URL}/anime/${animeId}`));
};
