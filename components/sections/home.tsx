"use client";

import { m } from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import dynamic from "next/dynamic";

const inter = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const Icon = ({ src }) => {
  return (
    <m.div
      className="group relative flex h-[300px] w-[300px] items-center justify-center rounded-full"
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
        duration: 1.5,
        type: "spring",
        stiffness: 800,
        y: {
          delay: 0.5,
          duration: 0.7,
        },
        rotateY: {
          duration: 1.0,
        },
      }}
    >
      <Image
        src={src}
        alt="Picture of the author"
        width={240}
        height={240}
        priority
        className="rounded-full"
      />
    </m.div>
  );
};

const AnimatedTextChar = dynamic(() =>
  import("../animatedText").then((mod) => mod.AnimatedTextChar),
);

const Home = () => {
  return (
    <div>
      <Icon src="/icon.webp" />
      <div className="relative hidden md:absolute md:inset-y-1/3 md:left-1/2 md:flex md:flex-col md:items-center md:justify-center">
        <AnimatedTextChar
          text="Everything is always once."
          className={`${inter.className} flex overflow-hidden text-4xl md:m-4 md:p-10`}
        />
        <div className="absolute -inset-y-5 inset-x-1/3 -z-10 -space-y-24 space-x-24">
          <div className="h-36 w-36  translate-x-1/2 rounded-3xl bg-blue-400 mix-blend-multiply blur-3xl dark:bg-blue-900" />
          <div className="h-24 w-24 -translate-x-1/2 translate-y-6 rounded-3xl bg-indigo-400 mix-blend-multiply blur-3xl dark:bg-indigo-900" />
          <div className="h-28 w-28 translate-y-10 rounded-3xl bg-green-400 mix-blend-multiply blur-3xl dark:bg-green-900" />
        </div>
      </div>
    </div>
  );
};

export default Home;
