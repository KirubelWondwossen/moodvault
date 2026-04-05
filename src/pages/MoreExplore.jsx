import { useParams } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";
import { useSeeMore } from "../hooks/useSeeMore";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import ErrorScreen from "../components/ui/ErrorScreen";
import { useEffect, useState } from "react";
import { useGetVisibleCards } from "../hooks/useGetVisbleCards";

const titles = {
  "trending-movie-tv": "Trending Movies & TV",
  "popular-movie-tv": "Popular Movies & TV",
  "top-anime": "Top Animes",
  "trending-anime": "Currently Airing Anime",
};

export default function MoreExplore() {
  const { type } = useParams();
  const { data, isLoading, error } = useSeeMore(type);
  const visibleSkeleton = useGetVisibleCards();

  if (error) {
    return (
      <MainLayout title={titles[type]}>
        <ErrorScreen />
      </MainLayout>
    );
  }
  return (
    <MainLayout title={titles[type]}>
      {isLoading ? (
        <SkeletonGrid count={visibleSkeleton} />
      ) : (
        <CardContainer data={data} />
      )}
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
        No data found
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

      {/* Load More button (mobile only) */}
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
