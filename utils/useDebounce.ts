import { useEffect } from "react";

const useDebounce = (func: any, delay: number, deps: any) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      func();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [deps]);
};

export default useDebounce;
