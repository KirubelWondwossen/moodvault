import { useParams } from "react-router-dom";
import { useGetDetail } from "../hooks/useGetDetail";
import MainLayout from "../components/Layout/MainLayout";
import Navbar from "../components/Layout/Navbar";

export default function Detail() {
  const { id, type } = useParams();
  const { data } = useGetDetail(type, id);
  // console.log(data);

  return <MainLayout showSideBar={false}></MainLayout>;
}
