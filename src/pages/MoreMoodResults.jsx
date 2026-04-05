import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";

export default function MoreMoodResult() {
  const location = useLocation();

  const mood = location.state?.mood;
  const initialResults = location.state?.initialResults;

  if (!mood || !initialResults) {
    return (
      <MainLayout title="Mood Results">
        <p className="text-center text-sm sm:text-base text-red-500">
          No data available. Please go back and try again.
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={`Based on Your (${mood[0].toUpperCase() + mood.slice(1)}) Mood`}
    >
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
    return (
      <h2 className="text-center text-base sm:text-lg md:text-xl">
        No results found
      </h2>
    );
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
