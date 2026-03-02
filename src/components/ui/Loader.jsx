import ClipLoader from "react-spinners/ClipLoader";

export function Loader({ loading, page, className }) {
  return (
    <div
      className={
        page
          ? "fixed inset-0 flex items-center justify-center bg-white/50"
          : `flex flex-col justify-center items-center ${className} gap-2 py-6`
      }
    >
      <ClipLoader color="#58A6FF" loading={loading} size={40} />
      <span
        className={`text-lg font-heading font-semibold text-primary ${
          page && "ml-3"
        }`}
      >
        Loading
      </span>
    </div>
  );
}
