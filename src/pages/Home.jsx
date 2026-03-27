import { useQueries, useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { Tags } from "../components/ui/Tags";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import CardContainer from "../components/Layout/CardContainer";
import { sortByLatest } from "../utils/filterOptions";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import { getTrendingMovies, getTrendingTv } from "../services/tmdb";
import { getSeasonalAnime } from "../services/jikan";
import { useAllMedia } from "../hooks/useAllMedia";

export default function Home() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["movieDetail", user.uid],
    queryFn: () => fetchUserItems(user.uid),
  });

  const results = useQueries({
    queries: [
      { queryKey: ["trendingMovies"], queryFn: getTrendingMovies },
      { queryKey: ["currentAnime"], queryFn: getSeasonalAnime },
      { queryKey: ["trendingTv"], queryFn: getTrendingTv },
    ],
  });
  const [trendingMovieQuery, currentAnimeQuery, trendingTvQuery] = results;

  const trending = useAllMedia(
    trendingMovieQuery,
    trendingTvQuery,
    currentAnimeQuery,
  );

  const latestItems = data ? sortByLatest(data) : [];
  return (
    <MainLayout title={`Welcome, ${user.firstName}`}>
      {isLoading && <SkeletonGrid count={12} />}
      {!isLoading && latestItems.length > 0 && (
        <>
          <MoodPicker />
          <CardContainer
            data={trending}
            title={"Trending Now"}
            link={"/explore"}
            className={"mt-4"}
          />
          <CardContainer
            data={latestItems}
            title={"Continue Watching (from My Vault)"}
            link={"/myvault"}
            className={"mt-4 mb-5"}
          />
        </>
      )}
    </MainLayout>
  );
}

function MoodPicker() {
  return (
    <div className="flex gap-3 flex-col">
      <h3 className="font-heading font-semibold text-lg ">
        How are you feeling today?
      </h3>
      <div className="flex gap-5 ">
        <Tags tag={"Sad"} />
        <Tags tag={"Happy"} />
        <Tags tag={"Chill "} />
        <Tags tag={"Excited"} />
      </div>
    </div>
  );
}
