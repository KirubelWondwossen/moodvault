import { useState, useEffect } from "react";
import MovieCard from "../ui/MovieCard";
import { Link } from "react-router-dom";

export default function CardContainer({ data, title, link }) {
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
    <section className="flex flex-col w-full gap-1">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link
          to={`/explore/${link}`}
          className="text-primary underline underline-offset-4 font-heading"
        >
          See More →
        </Link>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-4 items-center">
          {data.slice(0, visibleCards).map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
