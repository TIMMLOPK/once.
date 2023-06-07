import { useEffect, useState, useCallback } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = useCallback((timer: NodeJS.Timeout) => {
    setScroll(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setScroll(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    window.addEventListener("scroll", () => handleScroll(timer));
    return () => {
      window.removeEventListener("scroll", () => handleScroll(timer));
    };
  }, [handleScroll]);

  return scroll;
};

export default useScroll;
