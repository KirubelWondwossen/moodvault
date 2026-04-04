export function getTrailer(videos = []) {
  if (!videos || videos.length === 0) return null;

  const trailer =
    videos.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube" && vid.official,
    ) || videos.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
