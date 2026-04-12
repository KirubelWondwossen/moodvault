import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";
import {
  Activity,
  Calendar,
  Hourglass,
  Layers,
  Leaf,
  Minus,
  Play,
  Plus,
  Star,
} from "lucide-react";
import DetailSkeleton from "../components/ui/DetailSkeleton";
import { deleteItem, fetchSavedItemsMap, saveItem } from "../lib/items";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Tags } from "../components/ui/Tags";
import ErrorScreen from "../components/ui/ErrorScreen";
import { getErrorType } from "../utils/getErrorType";

export default function Detail() {
  const { id, type } = useParams();
  const { data, isLoading, error } = useGetDetail(type, id);

  if (error && !data) {
    return (
      <MainLayout showSideBar={false}>
        <ErrorScreen type={getErrorType(error)} />
      </MainLayout>
    );
  }

  return (
    <MainLayout showSideBar={false} backdrop={data?.backdrop}>
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 h-full py-4 px-3 md:px-6">
          <Image data={data} />
          <DetailContent data={data} />
        </div>
      )}
    </MainLayout>
  );
}
function Image({ data }) {
  return (
    <>
      <div
        className="
          md:hidden w-full h-[60vh] relative
        "
      >
        <img
          src={data?.poster || "/no-image.png"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-transparent" />
      </div>

      <img
        src={data?.poster || "/no-image.png"}
        className="
          hidden md:block
          w-full max-w-[350px]
          h-auto object-contain rounded-xl
        "
      />
    </>
  );
}

function DetailContent({ data }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    async function load() {
      if (!user?.uid || !data?.id) return;

      try {
        const { savedIds, docMap } = await fetchSavedItemsMap(user.uid);

        const exists = savedIds.has(data.id);
        const id = docMap[data.id];

        if (exists && typeof id === "string") {
          setIsSaved(true);
          setDocId(id);
        } else {
          setIsSaved(false);
          setDocId(null);
        }
      } catch (err) {
        console.error(err);
        setIsSaved(false);
        setDocId(null);
      }
    }

    load();
  }, [user?.uid, data?.id]);

  return (
    <div className="w-full flex flex-col gap-4 mb-4 overflow-y-auto scrollbar-hide">
      <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
        {data.title}
      </h1>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {data.genres?.map((el, i) => (
          <Tags tag={el} key={el.id ?? i} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 items-center">
        <FactContainer
          text={data.rating ? data.rating + " / 10" : "N/A"}
          icon={Star}
          iconStyle={"text-[#F5C518] fill-[#F5C518]"}
        />
        <FactContainer
          text={data.duration || "N/A"}
          icon={Hourglass}
          iconStyle={"fill-tPrimary text-tPrimary"}
        />
        <FactContainer
          text={
            data.type
              ? data.type.charAt(0).toUpperCase() + data.type.slice(1)
              : "N/A"
          }
          icon={Layers}
        />
        <FactContainer
          text={data.status || "N/A"}
          icon={Activity}
          iconStyle={"fill-tPrimary text-tPrimary"}
        />
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 items-center">
        <FactContainer text={data.releaseDate || "N/A"} icon={Calendar} />
        <FactContainer
          text={
            data.season
              ? data.season.charAt(0).toUpperCase() + data.season.slice(1)
              : "N/A"
          }
          icon={Leaf}
        />
      </div>

      <Overview overview={data.overview} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-1">
        <Button
          icon={Play}
          className={"bg-primary text-background"}
          onClick={() => {
            if (data?.trailer) {
              window.open(data.trailer, "_blank", "noopener,noreferrer");
            }
          }}
        >
          Watch Trailer
        </Button>

        <button
          onClick={async () => {
            if (!user?.uid || loading) return;

            setLoading(true);

            try {
              if (!isSaved) {
                const newDocId = await saveItem(user.uid, {
                  itemId: data.id,
                  rating: data.rating,
                  source: data.source,
                  type: data.type,
                  title: data.title,
                  poster: data.poster,
                  year: data.year,
                  genres: data.genres,
                  isWatched: false,
                });

                setIsSaved(true);
                setDocId(newDocId);
              } else {
                if (!docId) return;

                await deleteItem(user.uid, docId);

                setIsSaved(false);
                setDocId(null);
              }
            } catch (err) {
              console.error(err);
            } finally {
              setLoading(false);
            }
          }}
          className={`
            relative overflow-hidden px-5 sm:px-7 py-2 text-sm sm:text-lg font-heading
            border border-primary rounded-3xl flex items-center gap-3
            transition-all duration-300 ease-out
            active:scale-95 w-full sm:w-auto justify-center
            ${
              isSaved
                ? "bg-primary text-background shadow-[0_0_15px_rgba(88,166,255,0.5)]"
                : "text-primary hover:bg-primary/10"
            }
          `}
        >
          <span
            className={`transition-all duration-500 ${
              isSaved ? "rotate-180 scale-110" : "rotate-0"
            }`}
          >
            {isSaved ? <Minus size={20} /> : <Plus size={20} />}
          </span>

          <span className="relative h-[24px] flex items-center overflow-hidden">
            <span
              className={`transition-all duration-300 ${
                !isSaved
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-6 opacity-0"
              }`}
            >
              {loading ? "Adding..." : "Add to Vault"}
            </span>

            <span
              className={`absolute transition-all duration-300 ${
                isSaved
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {loading ? "Removing..." : "Remove"}
            </span>
          </span>

          {loading && (
            <ClipLoader color={isSaved ? "#0d1117" : "#58A6FF"} size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line
function FactContainer({ text, iconStyle, icon: Icon, className }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <Icon size={20} className={iconStyle} />
      <span className="font-body text-sm sm:text-base md:text-lg">{text}</span>
    </div>
  );
}

function Overview({ overview }) {
  const [expanded, setExpanded] = useState(false);

  const text = overview || "No overview available.";
  const limit = 160;

  const isLong = text.length > limit;

  return (
    <div className="max-w-3xl mt-3">
      <p
        className={`
    font-body text-gray-300 leading-relaxed text-sm sm:text-base
    ${expanded ? "" : "line-clamp-3"}
  `}
      >
        {text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-xs sm:text-sm text-primary hover:underline transition"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

// eslint-disable-next-line
function Button({ children, className, icon: Icon, ...props }) {
  return (
    <button
      className={`group px-5 sm:px-7 py-2 text-sm sm:text-lg font-heading hover:scale-105 border-primary border transition-all duration-300 rounded-3xl ${className} flex items-center justify-center gap-3 w-full sm:w-auto`}
      {...props}
    >
      {children}
      <Icon size={20} />
    </button>
  );
}
