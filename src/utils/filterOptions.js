export const sortByLatest = (items) => {
  return [...items].sort(
    (a, b) =>
      (b?.createdAt?.seconds ?? new Date(b.createdAt).getTime() / 1000) -
      (a?.createdAt?.seconds ?? new Date(a.createdAt).getTime() / 1000),
  );
};

export const sortByOldest = (items) => {
  return [...items].sort(
    (a, b) =>
      (a?.createdAt?.seconds ?? new Date(a.createdAt).getTime() / 1000) -
      (b?.createdAt?.seconds ?? new Date(b.createdAt).getTime() / 1000),
  );
};

export const filterByDate = (items) => {
  return sortByOldest(items);
};

export const filterByType = (items, type) => {
  if (type === "all") return items;
  return items.filter((item) => item.type === type);
};

export const filterByStatus = (items, status) => {
  if (status === "all") return items;
  return items.filter((item) =>
    status === "watched" ? item.isWatched : !item.isWatched,
  );
};
