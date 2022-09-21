import { useEffect, useState } from "react";

const useScroll = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setScroll(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setScroll(false);
      }, 2000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
};

export default useScroll;
