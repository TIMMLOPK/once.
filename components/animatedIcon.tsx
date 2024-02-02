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
        className={cn("relative h-[240px] w-[240px] rounded-full mix-blend-multiply scale-150 transform-gpu mx-8 duration-1000", isLoaded ? "opacity-100 blur-0 scale-100" : "blur-3xl opacity-0")}
      />
  );
};
