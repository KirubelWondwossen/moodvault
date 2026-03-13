import { useQueries } from "@tanstack/react-query";
import {
  getPopularMovies,
  getPopularTv,
  getTrendingMovies,
  getTrendingTv,
} from "../services/tmdb";
import { getSeasonalAnime, getTopAnime } from "../services/jikan";
import { Loader } from "../components/ui/Loader";
import MainLayout from "../components/Layout/MainLayout";
import { useCombinedMedia } from "../hooks/useCombinedMedia";
import { useAnimeList } from "../hooks/useAnimeList";
import CardContainer from "../components/Layout/CardContainer";
import { SectionBreak } from "../components/ui/SectionBreak";

export default function Explore() {
  const results = useQueries({
    queries: [
      { queryKey: ["trendingMovies"], queryFn: getTrendingMovies },
      { queryKey: ["topAnime"], queryFn: getTopAnime },
      { queryKey: ["currentAnime"], queryFn: getSeasonalAnime },
      { queryKey: ["popularMovies"], queryFn: getPopularMovies },
      { queryKey: ["popularTv"], queryFn: getPopularTv },
      { queryKey: ["trendingTv"], queryFn: getTrendingTv },
    ],
  });

  const [
    trendingMovieQuery,
    topAnimeQuery,
    currentAnimeQuery,
    popularMoviesQuery,
    popularTvQuery,
    trendingTvQuery,
  ] = results;

  const trendingMovieTv = useCombinedMedia(trendingMovieQuery, trendingTvQuery);
  const popularMovieTv = useCombinedMedia(popularMoviesQuery, popularTvQuery);
  const topAnime = useAnimeList(topAnimeQuery);
  const trendingAnime = useAnimeList(currentAnimeQuery);

  return (
    <MainLayout title={"Explore"}>
      {results.some((q) => q.isLoading) && <Loader />}
      {!results.some((q) => q.isLoading) && (
        <div className="flex flex-col items-center gap-6 mb-8 ">
          <CardContainer
            data={trendingMovieTv}
            title={"Trending Movie & Tv"}
            link={"trending-movie-tv"}
          />
          <SectionBreak />
          <CardContainer data={trendingAnime} title={"Trending Anime"} />
          <SectionBreak />
          <CardContainer data={popularMovieTv} title={"Popular Movie & Tv"} />
          <SectionBreak />
          <CardContainer data={topAnime} title={"Top Animes"} />
        </div>
      )}
    </MainLayout>
  );
}
