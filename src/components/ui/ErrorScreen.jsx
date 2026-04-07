export default function ErrorScreen({ type }) {
  const handleReload = () => {
    window.location.reload();
  };

  const isOffline = type === "offline";

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-0">
      <div className="text-center max-w-md w-full space-y-5 sm:space-y-4">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold leading-snug">
          {isOffline ? "No Internet Connection" : "Something went wrong"}
        </h1>

        {isOffline && (
          <p className="text-sm sm:text-base text-gray-400 font-body px-2 sm:px-0">
            Check your network and try again.
          </p>
        )}

        <button
          onClick={handleReload}
          className="
            w-full sm:w-auto
            px-6
            py-3 sm:py-2.5
            bg-primary
            text-white
            rounded-xl sm:rounded-lg
            active:scale-95 sm:active:scale-100
            hover:opacity-80
            transition
            text-sm sm:text-base
            font-medium
          "
        >
          Reload
        </button>
      </div>
    </div>
  );
}
