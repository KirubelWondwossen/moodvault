import { useQueries, useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { Tags } from "../components/ui/Tags";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import CardContainer from "../components/Layout/CardContainer";
import { sortByLatest } from "../utils/filterOptions";
import { getTrendingMovies, getTrendingTv } from "../services/tmdb";
import { getSeasonalAnime } from "../services/jikan";
import { useAllMedia } from "../hooks/useAllMedia";
import { SectionBreak } from "../components/ui/SectionBreak";
import { useAICombinedMedia } from "../hooks/useAICombinedMedia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "../components/ui/ErrorScreen";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import { useGetVisibleCards } from "../hooks/useGetVisbleCards";

export default function Home() {
  const [mood, setMood] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isError } = useQuery({
    queryKey: ["movieDetail", user.uid],
    queryFn: () => fetchUserItems(user.uid),
  });

  const visibleCards = useGetVisibleCards();

  const latestItems = data ? sortByLatest(data) : [];

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

  const isTrendingLoading = results.some((q) => q.isLoading);
  const isTrendingError = results.some((q) => q.isError);

  const { aiResult, aiLoading, aiError } = useAICombinedMedia(mood);

  function handleNavigate() {
    navigate("/moremoodresult", {
      state: {
        mood,
        initialResults: aiResult,
      },
    });
  }
  if (isError) {
    return (
      <MainLayout title={`Welcome, ${user.firstName}`}>
        <ErrorScreen />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Welcome, ${user.firstName}`}>
      <MoodPicker setMood={setMood} />

      <AIRecomendation
        aiLoading={aiLoading}
        aiResult={aiResult}
        aiError={aiError}
        handleNavigate={handleNavigate}
        visibleCards={visibleCards}
        mood={mood}
      />

      <SectionBreak />

      <CardContainer
        data={trending}
        title={"Trending Now"}
        link={"/explore"}
        className={"mt-4"}
        isLoading={isTrendingLoading}
        isError={isTrendingError}
      />

      <SectionBreak />

      <CardContainer
        data={latestItems}
        title={"Continue Watching (My Vault)"}
        link={"/myvault"}
        className={"mt-4 mb-5"}
        isLoading={false}
        isError={false}
        vault={true}
      />
    </MainLayout>
  );
}

function MoodPicker({ setMood }) {
  return (
    <div className="flex gap-3 flex-col">
      <h3 className="font-heading font-semibold text-lg">
        How are you feeling today?
      </h3>
      <div className="flex gap-5">
        <Tags tag={"Sad"} onClick={() => setMood("Sad")} />
        <Tags tag={"Happy"} onClick={() => setMood("Happy")} />
        <Tags tag={"Chill"} onClick={() => setMood("Chill")} />
        <Tags tag={"Excited"} onClick={() => setMood("Excited")} />
        <Tags tag={"Bored"} onClick={() => setMood("Bored")} />
      </div>
    </div>
  );
}

function AIRecomendation({
  aiResult,
  aiLoading,
  aiError,
  handleNavigate,
  visibleCards,
  mood,
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {aiLoading && <SkeletonGrid count={visibleCards} />}

      {!aiLoading && aiError && (
        <p className="text-red-500 text-center">
          Failed to get recommendations
        </p>
      )}

      {!aiLoading && !aiError && aiResult?.length > 0 && (
        <CardContainer
          data={aiResult}
          title={`Based on your ${mood} mood`}
          link={"/explore"}
          className={"mt-4"}
          handleNavigate={handleNavigate}
          isLoading={false}
          isError={false}
        />
      )}
    </div>
  );
}
