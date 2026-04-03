import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";
import {
  Activity,
  Calendar,
  Hourglass,
  Layers,
  Minus,
  Play,
  Plus,
  Star,
} from "lucide-react";
import DetailSkeleton from "../components/ui/DetailSkeleton";
import { checkItemSaved, deleteItem, saveItem } from "../lib/items";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Tags } from "../components/ui/Tags";
import ErrorScreen from "../components/ui/ErrorScreen";

export default function Detail() {
  const { id, type } = useParams();
  const { data, isLoading, error } = useGetDetail(type, id);
  return (
    <MainLayout showSideBar={false} backdrop={data.backdrop}>
      {error && <ErrorScreen />}
      {isLoading && <DetailSkeleton />}
      {!isLoading && !error && (
        <div className="flex items-center gap-8 h-full py-3">
          <Image data={data} />
          <DetailContent data={data} />
        </div>
      )}
    </MainLayout>
  );
}

function Image({ data }) {
  return (
    <img
      src={data?.poster || "/no-image.png"}
      className="h-full max-h-full object-contain rounded-xl shadow-[0_0_30px_rgba(88,166,255,0.35),0_0_60px_rgba(56,139,253,0.2)]"
    />
  );
}

function DetailContent({ data }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function check() {
      const exists = await checkItemSaved(user.uid, data.id);
      setIsSaved(exists);
    }

    if (user?.uid && data?.id) {
      check();
    }
  }, [user?.uid, data?.id]);
  return (
    <div className="w-full h-full flex flex-col gap-4 mb-4 justify-start overflow-y-auto scrollbar-hide">
      <h1 className="font-heading font-bold text-6xl mb-3">{data.title}</h1>
      <div className="flex gap-5 items-center">
        {data.genres?.map((el, i) => (
          <Tags tag={el} key={el.id ?? i} />
        ))}
      </div>
      <div className="flex gap-10 items-center">
        <FactContainer
          text={data.rating ? data.rating + " / 10" : "N/A"}
          icon={Star}
          iconStyle={"text-[#F5C518] fill-[#F5C518]"}
        />
        <FactContainer
          text={data.duration ? data.duration : "N/A"}
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
          text={data.status ? data.status : "N/A"}
          icon={Activity}
          iconStyle={"fill-tPrimary text-tPrimary"}
        />
      </div>

      <FactContainer
        text={data.releaseDate ? data.releaseDate : "N/A"}
        icon={Calendar}
        className={"mt-4"}
      />
      <Overview overview={data.overview} />

      <div className="flex items-center gap-8 mt-3 relative">
        <Button icon={Play} className={"bg-primary text-background"}>
          Watch Trailer
        </Button>

        <button
          onClick={async () => {
            if (!user?.uid || loading) return;

            setLoading(true);

            if (!isSaved) {
              await saveItem(user.uid, {
                itemId: data.id,
                type: data.type,
                title: data.title,
                poster: data.poster,
                isWatched: false,
              });
              setIsSaved(true);
            } else {
              await deleteItem(user.uid, data.id);
              setIsSaved(false);
            }

            setLoading(false);
          }}
          className={`
      relative overflow-hidden px-7 py-2 text-lg font-heading
      border border-primary rounded-3xl flex items-center gap-3
      transition-all duration-300 ease-out
      active:scale-95
      ${
        isSaved
          ? "bg-primary text-background shadow-[0_0_20px_rgba(88,166,255,0.5)]"
          : "text-primary hover:bg-primary/10"
      }
    `}
        >
          <span
            className={`
        transition-all duration-500
        ${isSaved ? "rotate-180 scale-110" : "rotate-0"}
      `}
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
    <div className={`flex items-center gap-3 ${className}`}>
      <Icon size={28} className={iconStyle} />
      <span className="font-body text-xl">{text}</span>
    </div>
  );
}

function Overview({ overview }) {
  return (
    <p className="font-body text-gray-300 leading-relaxed text-sm md:text-base max-w-3xl mt-3">
      {overview || "No overview available."}
    </p>
  );
}

// eslint-disable-next-line
function Button({ children, className, icon: Icon, ...props }) {
  return (
    <button
      className={`group px-7 py-2 text-lg font-heading hover:scale-105 border-primary border transition-all duration-300 rounded-3xl ${className} flex items-center gap-3 relative`}
      {...props}
    >
      {children}
      <Icon size={20} />
    </button>
  );
}
