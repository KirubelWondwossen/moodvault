import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children, title, showSideBar, backdrop }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Toaster position="top-center" />
      <Sidebar showSideBar={showSideBar} />
      <div
        className={`flex flex-col flex-1 px-4 ${backdrop && "bg-cover bg-no-repeat bg-center"}`}
        style={
          backdrop
            ? {
                backgroundImage: `
                  linear-gradient(to top, #0d1117 10%, rgba(13,17,23,0.7) 40%, #0d1117 90%),
                  linear-gradient(to right, rgba(13,17,23,0.8) 0%, rgba(13,17,23,0) 50%, rgba(13,17,23,0.8) 100%),
                  url(${backdrop})
                `,
              }
            : { backgroundColor: "#0d1117" }
        }
      >
        <Navbar />
        {!backdrop && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
        <div
          className={`flex-1 min-h-0 ${!backdrop && "overflow-y-auto scrollbar-hide"} px-4`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
