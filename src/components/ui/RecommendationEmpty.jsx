import { useNavigate } from "react-router-dom";

export default function RecommendationEmpty({ desc }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex flex-col items-center text-center px-4 sm:px-6">
      <p className="text-xs sm:text-sm md:text-base text-gray-400 font-body mb-3 max-w-md">
        {desc}
      </p>

      <button
        onClick={() => navigate("/explore")}
        className="
          text-xs sm:text-sm md:text-base
          font-medium text-primary font-heading
          underline underline-offset-4
          transition-all duration-200 ease-out
          hover:text-primary/80 hover:scale-105
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-primary/40
          rounded-md
          px-2 py-1 sm:px-3 sm:py-1.5
        "
      >
        Explore content
      </button>
    </div>
  );
}
