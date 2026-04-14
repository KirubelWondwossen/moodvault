import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";
import ErrorScreen from "../components/ui/ErrorScreen";
import { useAICombinedMedia } from "../hooks/useAICombinedMedia";

const moodMap = {
  Happy: "feel-good comedy and uplifting movies",
  Sad: "emotional drama and deep storytelling",
  Relaxed: "calm, slow-paced, slice-of-life content",
  Excited: "action-packed, thrilling movies",
  Romantic: "love stories and romance",
  Adventurous: "fantasy, adventure, epic journeys",
  Scared: "horror and suspenseful content",
};

export default function MoreMoodResult() {
  const location = useLocation();
  const mood = location.state?.mood;

  const moodM =
    Object.keys(moodMap).find((key) => moodMap[key] === mood) || "Unknown";

  const { aiResult, aiLoading, aiError, fetchNextPage, hasNextPage } =
    useAICombinedMedia(mood);

  if (!mood) {
    return (
      <MainLayout title="Mood Results">
        <ErrorScreen type={"empty"} back={true} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Based on Your (${moodM}) Mood`}>
      <CardContainer
        data={aiResult}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        loading={aiLoading}
        error={aiError}
      />
    </MainLayout>
  );
}

function CardContainer({ data, fetchNextPage, hasNextPage, loading, error }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasNextPage && !loading) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "200px",
      },
    );

    const current = loaderRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, loading, fetchNextPage]);

  if (error) {
    return <ErrorScreen type={"general"} back={true} />;
  }

  if (!loading && (!data || data.length === 0)) {
    return <ErrorScreen type={"empty"} back={true} />;
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-3 sm:gap-4
          mb-6 sm:mb-8
        "
      >
        {data.map((element) => (
          <MovieCard data={element} key={element.id} />
        ))}
      </div>

      <div ref={loaderRef} className="h-16 flex justify-center items-center">
        {loading && (
          <p className="text-sm opacity-70 font-body">Loading more...</p>
        )}

        {!hasNextPage && !loading && (
          <p className="text-sm opacity-50">No more results</p>
        )}
      </div>
    </>
  );
}
