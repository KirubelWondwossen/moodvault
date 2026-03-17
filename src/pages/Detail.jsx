import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";
import { Hourglass, Star } from "lucide-react";

export default function Detail() {
  const { id, type } = useParams();
  const { data } = useGetDetail(type, id);
  console.log(data);

  return (
    <MainLayout showSideBar={false} backdrop={data.backdrop}>
      <div className="flex items-center gap-8 h-full py-3">
        <Image data={data} />
        <DetailContent data={data} />
      </div>
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
    <div className="w-full h-full flex flex-col gap-4 justify-start">
      <h1 className="font-heading font-bold text-6xl mb-6">{data.title}</h1>
      <div className="flex gap-5 items-center">
        {data.genres?.map((el) => (
          <GenreTags genre={el} />
        ))}
      </div>
      <div className="flex gap-5 items-center">
        <RatingStar rating={data.rating} />
        <Duration duration={data.duration} />
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

function RatingStar({ rating }) {
  return (
    <div className="flex items-center gap-3">
      <Star size={28} className="text-[#F5C518] fill-[#F5C518]" />
      <span className="font-body text-xl">{rating} / 10</span>
    </div>
  );
}
function Duration({ duration }) {
  return (
    <div className="flex items-center gap-1">
      <Hourglass size={24} className="fill-tPrimary text-tPrimary" />
      <span className="font-body text-xl">{duration}</span>
    </div>
  );
}
