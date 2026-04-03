import { useQueries } from "@tanstack/react-query";
import { getMovieDetails, getTvDetails } from "../services/tmdb";
import { getAnimeDetails } from "../services/jikan";
import {
  normalizeAnimeDetail,
  normalizeMovieDetail,
  normalizeTVDetail,
} from "../utils/normalizeMedia";

export function useGetDetail(type, id) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["movieDetail", id],
        queryFn: () => getMovieDetails(id),
        enabled: type === "movie" && !!id,
      },
      {
        queryKey: ["tvDetail", id],
        queryFn: () => getTvDetails(id),
        enabled: type === "tv" && !!id,
      },
      {
        queryKey: ["animeDetail", id],
        queryFn: () => getAnimeDetails(id),
        enabled: type === "anime" && !!id,
      },
    ],
  });

  const [movieDetail, tvDetail, animeDetail] = results;

  const isLoading = results.some((query) => query.isLoading);
  const error = results.some((query) => query.error);

  let data = null;

  if (type === "movie") data = normalizeMovieDetail(movieDetail.data);
  if (type === "tv") data = normalizeTVDetail(tvDetail.data);
  if (type === "anime") data = normalizeAnimeDetail(animeDetail.data);

  return { data, isLoading, error };
}
