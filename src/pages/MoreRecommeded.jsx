import { useRef, useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import { useGetVisibleCards } from "../hooks/useGetVisbleCards";
import { useRecommended } from "../hooks/useRecommended";
import MovieCard from "../components/ui/MovieCard";
import ErrorScreen from "../components/ui/ErrorScreen";
import { getErrorType } from "../utils/getErrorType";

export default function MoreRecommeded() {
  const {
    recommended,
    isLoadingRec,
    isErrorRec,
    errorRec,
    fetchNextPage,
    hasNextPage,
  } = useRecommended();

  const visibleSkeleton = useGetVisibleCards();

  if (isErrorRec) {
    return (
      <MainLayout title={"Recommended for you"}>
        <ErrorScreen type={getErrorType(errorRec)} back={true} />
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Recommended for you"}>
      {isLoadingRec && !recommended.length ? (
        <SkeletonGrid count={visibleSkeleton} />
      ) : (
        <CardContainer
          data={recommended}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          loading={isLoadingRec}
        />
      )}
    </MainLayout>
  );
}

function CardContainer({ data, fetchNextPage, hasNextPage, loading }) {
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

  if (!loading && (!data || data.length === 0)) {
    return (
      <h2 className="text-center text-base sm:text-lg md:text-xl">
        No data found
      </h2>
    );
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
        {loading && <p className="text-sm opacity-70">Loading more...</p>}

        {!hasNextPage && !loading && (
          <p className="text-sm opacity-50">No more results</p>
        )}
      </div>
    </>
  );
}
