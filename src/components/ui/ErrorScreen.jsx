export default function ErrorScreen({ type }) {
  const handleReload = () => {
    window.location.reload();
  };
  if (type === "offline") {
    return (
      <div className="flex flex-1 gap-2 items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-2">
            No Internet Connection
          </h1>
          <p className="text-gray-400 font-body">
            Check your network and try again.
          </p>
          <button
            onClick={handleReload}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-80 transition"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col gap-2 items-center justify-center text-white">
      <h1 className="text-2xl font-heading font-bold">Something went wrong</h1>
      <button
        onClick={handleReload}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-80 transition"
      >
        Reload
      </button>
    </div>
  );
}
