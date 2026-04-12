import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems, listenUserItems } from "../lib/items";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import VaultItemCard from "../components/ui/VaultItemCard";
import { useEffect, useMemo, useState } from "react";
import {
  filterByStatus,
  filterByType,
  sortByLatest,
  sortByOldest,
} from "../utils/filterOptions";
import ErrorScreen from "../components/ui/ErrorScreen";
import Filter from "../components/ui/Filter";
import { getErrorType } from "../utils/getErrorType";

export default function MyVault() {
  const { user } = useAuth();
  const [items, setItems] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movieDetail", user?.uid],
    queryFn: () => fetchUserItems(user.uid),
    enabled: !!user,
  });
  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenUserItems(user.uid, setItems);
    return () => unsubscribe();
  }, [user]);

  const [filtersState, setFiltersState] = useState({
    type: "all",
    status: "all",
    sort: "latest",
  });

  function updateFilter(key, value) {
    setFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const processedItems = useMemo(() => {
    const sourceItems = items ?? data ?? [];

    let result = [...sourceItems];
    result = filterByType(result, filtersState.type);
    result = filterByStatus(result, filtersState.status);

    if (filtersState.sort === "latest") {
      result = sortByLatest(result);
    } else if (filtersState.sort === "oldest") {
      result = sortByOldest(result);
    }

    return result;
  }, [items, data, filtersState]);

  if (error) {
    return (
      <MainLayout title={"My Vault"}>
        <ErrorScreen type={getErrorType(error)} />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={"My Vault"}
      filters={
        <FilterList filtersState={filtersState} updateFilter={updateFilter} />
      }
    >
      {isLoading && <SkeletonGrid count={6} />}

      {!isLoading && processedItems.length > 0 && (
        <CardContainer data={processedItems} setItems={setItems} user={user} />
      )}

      {!isLoading && processedItems.length === 0 && (
        <div className="w-full flex justify-center items-center py-12 sm:py-16 md:py-20">
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-center">
            No matching items
          </h2>
        </div>
      )}
    </MainLayout>
  );
}

function CardContainer({ data, setItems, user }) {
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
      <div className="w-full flex justify-center items-center py-12 sm:py-16 md:py-20">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-center">
          No added items
        </h2>
      </div>
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
        {displayedData.map((item) => (
          <VaultItemCard
            key={item.id}
            data={item}
            userId={user.uid}
            onToggle={(id) => {
              setItems((prev) =>
                (prev ?? []).map((item) =>
                  item.id === id
                    ? { ...item, isWatched: !item.isWatched }
                    : item,
                ),
              );
            }}
            onDelete={(id) => {
              setItems((prev) => (prev ?? []).filter((item) => item.id !== id));
            }}
          />
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

function FilterList({ filtersState, updateFilter }) {
  const typeFilterOptions = ["All", "Movie", "Tv", "Anime"];
  const statusFilterOption = ["All", "Watched", "Not Watched"];

  return (
    <div className="flex flex-col gap-2">
      <Filter
        filterBy="Type"
        filterKey="type"
        selected={filtersState.type}
        onChange={updateFilter}
        filterOptions={typeFilterOptions}
      />

      <Filter
        filterBy="Status"
        filterKey="status"
        selected={filtersState.status}
        onChange={updateFilter}
        filterOptions={statusFilterOption}
      />
      <Filter
        filterBy="Sort"
        filterKey="sort"
        selected={filtersState.sort}
        onChange={updateFilter}
        filterOptions={["Latest", "Oldest"]}
      />
    </div>
  );
}
