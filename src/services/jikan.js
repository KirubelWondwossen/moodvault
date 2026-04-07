const BASE_URL = "https://api.jikan.moe/v4";

export const getTopAnime = async () => {
  const res = await fetch(`${BASE_URL}/top/anime`);
  if (!res.ok) throw new Error("Failed to fetch anime");
  const data = await res.json();
  return data.data;
};

export const getSeasonalAnime = async () => {
  const res = await fetch(`${BASE_URL}/seasons/now`);
  if (!res.ok) throw new Error("Failed to fetch seasonal anime");
  const data = await res.json();
  return data.data;
};

export const searchAnime = async (query) => {
  const res = await fetch(`${BASE_URL}/anime?q=${query}`);
  if (!res.ok) throw new Error("Failed to search anime try another");
  const data = await res.json();
  return data.data;
};

export const getAnimeDetails = async (animeId) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch anime details");
  }

  const data = await res.json();
  return data.data;
};
