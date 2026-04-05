import { useState, useEffect } from "react";
import MovieCard from "../ui/MovieCard";
import { Link } from "react-router-dom";
import { SkeletonGrid } from "../ui/SkeletonGrid";
import ErrorScreen from "../ui/ErrorScreen";

export default function CardContainer({
  data = [],
  title,
  link,
  className,
  handleNavigate,
  isLoading,
  isError,
  vault,
}) {
  const [visibleCards, setVisibleCards] = useState(6);

  useEffect(() => {
    const updateCardCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) setVisibleCards(6);
      else if (width >= 1024) setVisibleCards(5);
      else if (width >= 768) setVisibleCards(4);
      else if (width >= 640) setVisibleCards(3);
      else setVisibleCards(2);
    };

    updateCardCount();
    window.addEventListener("resize", updateCardCount);

    return () => window.removeEventListener("resize", updateCardCount);
  }, []);

  return (
    <section className={`flex flex-col w-full gap-3 sm:gap-4 ${className}`}>
      <div className="flex justify-between w-full items-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {title}
        </h2>

        {!handleNavigate ? (
          <Link
            to={link}
            className="text-sm sm:text-base text-primary underline underline-offset-4 font-heading"
          >
            See More →
          </Link>
        ) : (
          <span
            className="text-sm sm:text-base text-primary underline underline-offset-4 font-heading cursor-pointer"
            onClick={handleNavigate}
          >
            See More →
          </span>
        )}
      </div>

      <div className="relative w-full">
        {isLoading && <SkeletonGrid count={visibleCards} />}

        {!isLoading && isError && <ErrorScreen />}

        {!isLoading && !isError && !data?.length && (
          <p className="text-center text-sm sm:text-base md:text-lg">
            No {title.toLowerCase()} available
          </p>
        )}

        {!isLoading && !isError && data?.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-start">
            {data.slice(0, visibleCards).map((movie) => (
              <div
                key={movie.id}
                className="
                  w-[calc(50%-0.5rem)]
                  sm:w-[calc(33.333%-0.75rem)]
                  md:w-[calc(25%-0.75rem)]
                  lg:w-[calc(20%-0.8rem)]
                  xl:w-[calc(16.666%-0.85rem)]
                "
              >
                <MovieCard data={movie} vault={vault} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
