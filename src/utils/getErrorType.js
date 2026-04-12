export function getErrorType(error) {
  if (!navigator.onLine) return "offline";

  if (error?.message?.includes("429")) return "rate";
  if (error?.message?.includes("504")) return "server";

  return "unknown";
}
