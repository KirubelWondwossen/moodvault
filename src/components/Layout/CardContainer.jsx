import { useState, useEffect } from "react";
import MovieCard from "../ui/MovieCard";
import { Link } from "react-router-dom";

export default function CardContainer({
  data,
  title,
  link,
  className,
  handleNavigate,
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
    <section className={`flex flex-col w-full gap-2 ${className}`}>
      <div className="flex justify-between w-full items-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {!handleNavigate ? (
          <Link
            to={link}
            className="text-primary underline underline-offset-4 font-heading"
          >
            See More →
          </Link>
        ) : (
          <span
            className="text-primary underline underline-offset-4 font-heading cursor-pointer"
            onClick={handleNavigate}
          >
            See More →
          </span>
        )}
      </div>
      <div className="relative w-full overflow-hidden">
        {data.length === 0 && (
          <h2 className="font-heading text-3xl text-center">
            Add movies to vault
          </h2>
        )}
        {data.length > 0 && (
          <div className="flex gap-4 items-center">
            {data.slice(0, visibleCards).map((movie) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
