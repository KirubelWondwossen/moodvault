import { useLocation } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import MovieCard from "../components/ui/MovieCard";

export default function MoreMoodResult() {
  const location = useLocation();
  const mood = location.state?.mood;
  const initialResults = location.state?.initialResults || [];

  return (
    <MainLayout
      title={`Based on Your (${mood.split("")[0].toUpperCase() + mood.slice(1, 6)}) Mood`}
    >
      <CardContainer data={initialResults} />
    </MainLayout>
  );
}

function CardContainer({ data }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {data.map((element) => (
        <MovieCard data={element} key={element.id} />
      ))}
    </div>
  );
}
