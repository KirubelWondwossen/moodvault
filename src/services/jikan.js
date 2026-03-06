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
  if (!res.ok) throw new Error("Failed to search anime");
  const data = await res.json();
  return data.data;
};

// end points
/**
 * /seasons/now
 * Filter
 * /anime?genres=1
 * Action = 1
 * Comedy = 4
 * Romance = 22
 */
