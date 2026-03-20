import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/Layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { fetchUserItems } from "../lib/items";
import { SkeletonGrid } from "../components/ui/SkeletonGrid";
import VaultItemCard from "../components/ui/VaultItemCard";
import { useState } from "react";

export default function MyVault() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["movieDetail", user.uid],
    queryFn: () => fetchUserItems(user.uid),
  });
  return (
    <MainLayout title={"My Vault"}>
      {isLoading && <SkeletonGrid count={12} />}
      {data && data.length === 0 && (
        <h2 className="font-heading text-3xl text-center">No added items</h2>
      )}
      {!isLoading && (
        <CardContainer userId={user.uid} data={data} user={user} />
      )}
    </MainLayout>
  );
}

function CardContainer({ data, user }) {
  const [items, setItems] = useState(data);

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
