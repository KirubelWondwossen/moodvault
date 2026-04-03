import { useParams } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";
import { useSeeMore } from "../hooks/useSeeMore";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import { SectionBreak } from "../components/ui/SectionBreak";
import ErrorScreen from "../components/ui/ErrorScreen";

const titles = {
  "trending-movie-tv": "Trending Movies & TV",
  "popular-movie-tv": "Popular Movies & TV",
  "top-anime": "Top Animes",
  "trending-anime": "Currently Airing Anime",
};

export default function MoreExplore() {
  const { type } = useParams();
  const { data, isLoading, error } = useSeeMore(type);

  if (error) {
    return (
      <MainLayout title={titles[type]}>
        <ErrorScreen />
      </MainLayout>
    );
  }
  return (
    <MainLayout title={titles[type]}>
      {isLoading ? <SkeletonGrid count={12} /> : <CardContainer data={data} />}
    </MainLayout>
  );
}

function CardContainer({ data }) {
  if (!data || data.length === 0) {
    return <h2 className="text-center text-xl">No data found</h2>;
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {data.map((element) => (
        <MovieCard data={element} key={element.id} />
      ))}
    </div>
  );
}
