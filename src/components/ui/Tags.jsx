export function Tags({ tag }) {
  return (
    <span className="font-body cursor-pointer px-3 py-1 text-sm text-gray-200 bg-[#161b22] border border-[#30363d] rounded-full shadow-[0_0_10px_rgba(88,166,255,0.15)] hover:shadow-[0_0_15px_rgba(88,166,255,0.3)] transition-all duration-300">
      {tag}
    </span>
  );
}
