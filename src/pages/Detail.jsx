import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";

export default function Detail() {
  const { id, type } = useParams();
  const { data } = useGetDetail(type, id);
  console.log(data);

  return (
    <MainLayout showSideBar={false} backdrop={data.backdrop}>
      <div className="h-screen w-full bg-cover bg-no-repeat bg-center"></div>
    </MainLayout>
  );
}
