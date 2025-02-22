import { useLayoutEffect, useState } from "react";

export const useTouch = () => {
  const [supportTouch, setSupportTouch] = useState(false);

  useLayoutEffect(() => {
    const onChange = (e: MediaQueryListEvent) => {
      setSupportTouch(e.matches);
    };

    const mq = matchMedia("(pointer: coarse) and (hover: none)");
    mq.addEventListener("change", onChange);

    setSupportTouch(mq.matches);

    return () => {
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return supportTouch;
};
