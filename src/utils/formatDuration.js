export function formatDuration(minutes) {
  if (!minutes) return null; // handle null or undefined
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
