import { useEffect, useState, useCallback } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = useCallback((timer) => {
    setScroll(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setScroll(false);
    }, 800);
  }, []);

  useEffect(() => {
    let timer;
    window.addEventListener("scroll", () => handleScroll(timer));
    return () => {
      window.removeEventListener("scroll", () => handleScroll(timer));
    };
  }, [handleScroll]);

  return scroll;
};

export default useScroll;
