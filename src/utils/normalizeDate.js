export function normalizeDate(dateString) {
  if (!dateString) return null;

  return new Date(dateString).toISOString().split("T")[0];
}
