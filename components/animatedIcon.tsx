"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "../utils/cn";

export const AnimatedIcon = ({ src }: { src: ImageProps["src"] }) => {
  const [isLoaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt="icon"
      width={240}
      height={240}
      onLoad={() => setLoaded(true)}
      className={cn(
        "relative mx-8 h-[240px] w-[240px] scale-150 rounded-full duration-1000",
        isLoaded ? "scale-100 opacity-100 blur-0" : "opacity-0 blur-3xl",
      )}
    />
  );
};
