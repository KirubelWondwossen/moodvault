export const sortByLatest = (items) => {
  return [...items].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
};
