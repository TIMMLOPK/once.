"use client";

import { m, useWillChange } from "framer-motion";
import Image from "next/image";

export const AnimatedIcon = ({ src }: { src: string }) => {
  const willChange = useWillChange();
  return (
    <m.div
      className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full"
      animate={{
        y: [-40, -30, 0],
        rotateY: [
          0,
          0,
          180,
          ...Array.from({ length: 4 }, (_, i) => 180 * (i % 2)),
          360,
        ],
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        y: {
          delay: 0.5,
          duration: 1.0,
        },
        rotateY: {
          duration: 1.2,
        },
      }}
      style={{ willChange }}
    >
      <Image
        src={src}
        alt="icon"
        width={240}
        height={240}
        priority
        className="rounded-full"
      />
    </m.div>
  );
};
