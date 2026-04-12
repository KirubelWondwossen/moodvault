import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";
import ErrorScreen from "../components/ui/ErrorScreen";
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
  const initialResults = location.state?.initialResults;
  const moodM =
    Object.keys(moodMap).find((key) => moodMap[key] === mood) || "Unknown";

  if (!mood || !initialResults) {
    return (
      <MainLayout title="Mood Results">
        <ErrorScreen type={"empty"} back={true} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Based on Your (${moodM}) Mood`}>
      <CardContainer data={initialResults} />
    </MainLayout>
  );
}

function CardContainer({ data }) {
  const [visibleCards, setVisibleCards] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!data || data.length === 0) {
    return <ErrorScreen type={"empty"} back={true} />;
  }

  const displayedData = isMobile ? data.slice(0, visibleCards) : data;

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
        {displayedData.map((element) => (
          <MovieCard data={element} key={element.id} />
        ))}
      </div>

      {isMobile && visibleCards < data.length && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setVisibleCards((prev) => prev + 10)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
