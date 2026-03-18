import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";
import {
  Activity,
  Calendar,
  Hourglass,
  Layers,
  Play,
  Plus,
  Star,
} from "lucide-react";
import DetailSkeleton from "../components/ui/DetailSkeleton";

export default function Detail() {
  const { id, type } = useParams();
  const { data, isLoading } = useGetDetail(type, id);
  console.log(data);

  return (
    <MainLayout showSideBar={false} backdrop={data.backdrop}>
      {isLoading && <DetailSkeleton />}

      {!isLoading && (
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
  return (
    <div className="w-full h-full flex flex-col gap-4 mb-4 justify-start overflow-y-auto scrollbar-hide">
      <h1 className="font-heading font-bold text-6xl mb-3">{data.title}</h1>
      <div className="flex gap-5 items-center">
        {data.genres?.map((el) => (
          <GenreTags genre={el} key={el.id} />
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
      <div className="flex items-center gap-8 mt-6">
        <Button icon={Play} className={"bg-primary text-background"}>
          Watch Trailer
        </Button>
        <Button icon={Plus} className={"text-primary"}>
          Add to Vault
        </Button>
      </div>
    </div>
  );
}

function GenreTags({ genre }) {
  return (
    <span className="font-body cursor-pointer px-3 py-1 text-sm text-gray-200 bg-[#161b22] border border-[#30363d] rounded-full shadow-[0_0_10px_rgba(88,166,255,0.15)] hover:shadow-[0_0_15px_rgba(88,166,255,0.3)] transition-all duration-300">
      {genre}
    </span>
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
function Button({ children, className, icon: Icon }) {
  return (
    <button
      className={`group px-7 py-2 text-lg font-heading hover:scale-105 border-primary border transition-all duration-300 rounded-3xl ${className} flex items-center gap-3 relative`}
    >
      {children}
      <Icon size={20} />
    </button>
  );
}
