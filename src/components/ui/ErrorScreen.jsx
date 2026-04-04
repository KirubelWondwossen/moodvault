export default function ErrorScreen({ type }) {
  const handleReload = () => {
    window.location.reload();
  };

  const isOffline = type === "offline";

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center max-w-md w-full space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold">
          {isOffline ? "No Internet Connection" : "Something went wrong"}
        </h1>

        {isOffline && (
          <p className="text-sm sm:text-base text-gray-400 font-body">
            Check your network and try again.
          </p>
        )}

        <button
          onClick={handleReload}
          className="
            w-full sm:w-auto
            px-5 sm:px-6
            py-2.5
            bg-primary
            text-white
            rounded-lg
            hover:opacity-80
            transition
            text-sm sm:text-base
          "
        >
          Reload
        </button>
      </div>
    </div>
  );
}
