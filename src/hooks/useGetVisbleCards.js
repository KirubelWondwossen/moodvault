import { useEffect, useState } from "react";

export function useGetVisibleCards() {
  const [visibleCards, setVisibleCards] = useState(6);

  useEffect(() => {
    const updateCardCount = () => {
      const width = window.innerWidth;

      if (width >= 1280) setVisibleCards(6);
      else if (width >= 1024) setVisibleCards(5);
      else if (width >= 768) setVisibleCards(4);
      else if (width >= 640) setVisibleCards(3);
      else setVisibleCards(2);
    };

    updateCardCount();
    window.addEventListener("resize", updateCardCount);

    return () => window.removeEventListener("resize", updateCardCount);
  }, []);
  return visibleCards;
}
