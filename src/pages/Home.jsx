import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { Tags } from "../components/ui/Tags";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import CardContainer from "../components/Layout/CardContainer";
import { sortByLatest } from "../utils/filterOptions";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";

export default function Home() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["movieDetail", user.uid],
    queryFn: () => fetchUserItems(user.uid),
  });

  const latestItems = data ? sortByLatest(data) : [];

  return (
    <MainLayout title={`Welcome, ${user.firstName}`}>
      {isLoading && <SkeletonGrid count={12} />}
      {!isLoading && latestItems.length > 0 && (
        <>
          <MoodPicker />
          <CardContainer
            data={latestItems}
            title={"Continue Watching (from My Vault)"}
            link={"/myvault"}
            className={"mt-4"}
          />
        </>
      )}
    </MainLayout>
  );
}

function MoodPicker() {
  return (
    <div className="flex gap-3 flex-col">
      <h3 className="font-heading font-semibold text-lg ">
        How are you feeling today?
      </h3>
      <div className="flex gap-5 ">
        <Tags tag={"Sad"} />
        <Tags tag={"Happy"} />
        <Tags tag={"Chill "} />
        <Tags tag={"Excited"} />
      </div>
    </div>
  );
}
