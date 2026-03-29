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
import { SectionBreak } from "../components/ui/SectionBreak";
import { useAICombinedMedia } from "../hooks/useAICombinedMedia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [mood, setMood] = useState("");
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

  const { aiResult, aiLoading } = useAICombinedMedia(mood);

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/moremoodresult", {
      state: {
        mood,
        initialResults: aiResult,
      },
    });
  }

  const latestItems = data ? sortByLatest(data) : [];

  return (
    <MainLayout title={`Welcome, ${user.firstName}`}>
      {isLoading && <SkeletonGrid count={12} />}
      {!isLoading && latestItems.length > 0 && (
        <>
          <MoodPicker setMood={setMood} />

          <AIRecomendation
            aiLoading={aiLoading}
            aiResult={aiResult}
            handleNavigate={handleNavigate}
          />
          <SectionBreak />
          <CardContainer
            data={trending}
            title={"Trending Now"}
            link={"/explore"}
            className={"mt-4"}
          />
          <SectionBreak />
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

function MoodPicker({ setMood }) {
  return (
    <div className="flex gap-3 flex-col">
      <h3 className="font-heading font-semibold text-lg ">
        How are you feeling today?
      </h3>
      <div className="flex gap-5 ">
        <Tags tag={"Sad"} onClick={() => setMood("Sad")} />
        <Tags tag={"Happy"} onClick={() => setMood("Happy")} />
        <Tags tag={"Chill"} onClick={() => setMood("Chill")} />
        <Tags tag={"Excited"} onClick={() => setMood("Excited")} />
      </div>
    </div>
  );
}

function AIRecomendation({ aiResult, aiLoading, handleNavigate }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {!aiLoading ? (
        <>
          {aiResult.length > 0 && (
            <CardContainer
              data={aiResult}
              title={"Recommended For You"}
              link={"/explore"}
              className={"mt-4"}
              handleNavigate={handleNavigate}
            />
          )}
        </>
      ) : (
        <SkeletonGrid count={6} />
      )}
    </div>
  );
}
