export function DropdownWrapper({ children }) {
  return (
    <div
      className="
        absolute left-0 right-0 mt-2 z-[100]
        w-[80vw] sm:w-[500px] md:w-[650px] lg:w-[750px]
        max-h-[60vh] overflow-y-auto
        rounded-xl bg-[#191d23] shadow-lg scrollbar-hide
      "
    >
      {children}
    </div>
  );
}
