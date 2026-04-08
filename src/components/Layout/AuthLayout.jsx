import { useEffect, useState } from "react";
import { Features } from "../features/Features";
import ErrorScreen from "../ui/ErrorScreen";
import { getTrendingMovies, getTrendingTv } from "../../services/tmdb";
import { useQueries } from "@tanstack/react-query";
import { useGetRandomBg } from "../../hooks/useGetRandomBg";

export default function AuthLayout({ children }) {
  const results = useQueries({
    queries: [
      { queryKey: ["trendingMovies"], queryFn: getTrendingMovies },
      { queryKey: ["trendingTv"], queryFn: getTrendingTv },
    ],
  });

  const [trendingMovieQuery, trendingTvQuery] = results;

  const { backdrop: bg } = useGetRandomBg(trendingMovieQuery, trendingTvQuery);

  const [error, setError] = useState(null);
  useEffect(() => {
    const handleOffline = () => setError("offline");
    const handleOnline = () => setError(null);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center">
        <ErrorScreen type="offline" />
      </div>
    );
  }

  return (
    <div
      className="grid lg:grid-cols-2 min-h-screen p-3 md:p-6 items-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: bg
          ? `
            linear-gradient(to top, #0d1117 10%, rgba(13,17,23,0.7) 40%, #0d1117 90%),
            linear-gradient(to right, rgba(13,17,23,0.8) 0%, rgba(13,17,23,0) 50%, rgba(13,17,23,0.8) 100%),
            url(${bg})
          `
          : undefined,
      }}
    >
      <Features />
      {children}
    </div>
  );
}
