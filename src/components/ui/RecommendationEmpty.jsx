import { useNavigate } from "react-router-dom";

export default function RecommendationEmpty({ desc }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex flex-col items-center">
      <p className="text-sm text-gray-400 font-body mb-2">{desc}</p>
      <button
        onClick={() => navigate("/explore")}
        className="text-sm font-medium text-primary underline underline-offset-4 transition-all 
                duration-200 ease-out hover:text-primary/80 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md font-heading"
      >
        Explore content
      </button>
    </div>
  );
}
