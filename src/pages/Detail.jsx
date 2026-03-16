import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";

export default function Detail() {
  const { id, type } = useParams();
  const { data } = useGetDetail(type, id);
  console.log(data);

  return (
    <div className="text-5xl font-bold text-center text-white">Hello There</div>
  );
}
