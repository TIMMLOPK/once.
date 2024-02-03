// check the page is at the top or bottom edge
import { useEffect, useState } from "react";

export const useAtEdge = () => {
  const [atTop, setAtTop] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
      setAtBottom(
        window.innerHeight + window.scrollY >= document.body.offsetHeight,
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { atTop, atBottom };
};
