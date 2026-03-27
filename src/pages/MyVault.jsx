import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems, listenUserItems } from "../lib/items";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import VaultItemCard from "../components/ui/VaultItemCard";
import { useEffect, useState } from "react";
import { sortByLatest } from "../utils/filterOptions";

export default function MyVault() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["movieDetail", user.uid],
    queryFn: () => fetchUserItems(user.uid),
  });

  const latestItems = data ? sortByLatest(data) : [];
  return (
    <MainLayout title={"My Vault"}>
      {isLoading && <SkeletonGrid count={12} />}
      {!isLoading && latestItems.length > 0 && (
        <CardContainer userId={user.uid} data={latestItems} user={user} />
      )}
    </MainLayout>
  );
}

function CardContainer({ data, user }) {
  const [items, setItems] = useState(data || []);
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenUserItems(user.uid, setItems);

    return () => unsubscribe();
  }, [user]);
  if (!items || items.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <h2 className="font-heading text-3xl text-center">No added items</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {items.map((item) => (
        <VaultItemCard
          key={item.id}
          data={item}
          userId={user.uid}
          onToggle={(id) => {
            setItems((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, isWatched: !item.isWatched } : item,
              ),
            );
          }}
          onDelete={(id) => {
            setItems((prev) => prev.filter((item) => item.id !== id));
          }}
        />
      ))}
    </div>
  );
}
