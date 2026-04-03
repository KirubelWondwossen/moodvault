import MainLayout from "../components/Layout/MainLayout";
import { useCombinedMedia } from "../hooks/useCombinedMedia";
import { useAnimeList } from "../hooks/useAnimeList";
import CardContainer from "../components/Layout/CardContainer";
import { SectionBreak } from "../components/ui/SectionBreak";
import { useExploreData } from "../hooks/useExploreData";

export default function Explore() {
  const { results } = useExploreData();

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
      <div className="flex flex-col items-center gap-6 mb-8">
        <CardContainer
          data={trendingMovieTv}
          title={"Trending Movie & TV"}
          link={"/explore/trending-movie-tv"}
          isLoading={trendingMovieQuery.isLoading || trendingTvQuery.isLoading}
          isError={trendingMovieQuery.isError || trendingTvQuery.isError}
        />

        <SectionBreak />

        <CardContainer
          data={trendingAnime}
          title={"Currently Airing Anime"}
          link={"/explore/trending-anime"}
          isLoading={currentAnimeQuery.isLoading}
          isError={currentAnimeQuery.isError}
        />

        <SectionBreak />

        <CardContainer
          data={popularMovieTv}
          title={"Popular Movie & TV"}
          link={"/explore/popular-movie-tv"}
          isLoading={popularMoviesQuery.isLoading || popularTvQuery.isLoading}
          isError={popularMoviesQuery.isError || popularTvQuery.isError}
        />

        <SectionBreak />

        <CardContainer
          data={topAnime}
          title={"Top Animes"}
          link={"/explore/top-anime"}
          isLoading={topAnimeQuery.isLoading}
          isError={topAnimeQuery.isError}
        />
      </div>
    </MainLayout>
  );
}
