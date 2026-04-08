import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import ErrorScreen from "../ui/ErrorScreen";
import { useState } from "react";

export default function MainLayout({
  children,
  title,
  showSideBar = false,
  backdrop,
  filters,
}) {
  const { error } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(showSideBar);

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <Sidebar
        showSideBar={isExpanded}
        setShowSideBar={setIsExpanded}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      >
        {filters}
      </Sidebar>

      {/* Main Content */}
      <div
        className={`
          flex flex-col flex-1
          px-3 sm:px-4 md:px-6 lg:px-8
          transition-all duration-300
          ${backdrop && "bg-cover bg-no-repeat bg-center"}
        `}
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth >= 1024
              ? isExpanded
                ? "14rem"
                : "4rem"
              : "0",
          ...(backdrop && {
            backgroundImage: `
              linear-gradient(to top, #0d1117 10%, rgba(13,17,23,0.7) 40%, #0d1117 90%),
              linear-gradient(to right, rgba(13,17,23,0.8) 0%, rgba(13,17,23,0) 50%, rgba(13,17,23,0.8) 100%),
              url(${backdrop})
            `,
          }),
        }}
      >
        <Navbar setMobileOpen={setMobileOpen} />

        {!error ? (
          <>
            {!backdrop && (
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                {title}
              </h1>
            )}

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </>
        ) : (
          <ErrorScreen type={"offline"} />
        )}
      </div>
    </div>
  );
}
