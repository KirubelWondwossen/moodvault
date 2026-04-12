import {
  Hammer,
  Hourglass,
  SatelliteDish,
  SearchX,
  TriangleAlert,
} from "lucide-react";

export default function ErrorScreen({ type, back }) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const isOffline = type === "offline";
  const isServer = type === "server";
  const isRateLimit = type === "rate";
  const isEmpty = type === "empty";

  const title = isOffline
    ? "No Internet Connection"
    : isServer
      ? "Service Temporarily Unavailable"
      : isRateLimit
        ? "Too Many Requests"
        : isEmpty
          ? "No items found"
          : "Something went wrong";

  const message = isOffline
    ? "Check your internet connection and try again."
    : isServer
      ? "We’re having trouble reaching the server. Please try again in a moment."
      : isRateLimit
        ? "You’re making requests too fast. Please wait a bit and try again."
        : isEmpty
          ? "Content will appear here once it’s available."
          : "An unexpected error occurred. Please try again.";

  const Icon = isOffline
    ? SatelliteDish
    : isServer
      ? Hammer
      : isRateLimit
        ? Hourglass
        : isEmpty
          ? SearchX
          : TriangleAlert;

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-0">
      <div className="text-center max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <div className="p-4 sm:p-5 rounded-full bg-gray-800/60 border border-gray-700 shadow-md">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold leading-snug">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-gray-400 font-body px-2">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleReload}
            className="
              w-full sm:w-auto
              px-6 py-3 sm:py-2.5
              bg-primary text-white
              rounded-xl sm:rounded-lg
              active:scale-95 hover:opacity-80
              transition text-sm sm:text-base font-medium
            "
          >
            Retry
          </button>

          {back && (
            <button
              onClick={handleGoBack}
              className="
              w-full sm:w-auto
              px-6 py-3 sm:py-2.5
              border border-gray-600
              text-gray-300
              rounded-xl sm:rounded-lg
              hover:bg-gray-800
              transition text-sm sm:text-base font-medium
            "
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
