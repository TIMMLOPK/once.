"use client";

import { m } from "framer-motion";
import { Caveat } from "next/font/google";
import Image from "next/image";
import dynamic from "next/dynamic";

const inter = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

const ChatBubble = () => {
  return (
    <div className="flex flex-col items-center justify-center p-0">
      <div className="relative min-w-[170px] rounded-3xl border border-zinc-500 bg-black px-4 py-2.5 leading-6 text-white shadow-2xl dark:border-zinc-700">
        Hello, I am Timmy
      </div>
    </div>
  );
};

const Icon = ({ src }) => {
  return (
    <m.div
      className="group relative flex h-[248px] w-[248px] items-center justify-center rounded-full"
      animate={{
        y: [0, -15, 0],
        rotateY: [
          0,
          0,
          180,
          ...Array.from({ length: 4 }, (_, i) => 180 * (i % 2)),
          360,
        ],
      }}
      transition={{
        duration: 2.5,
        type: "spring",
        stiffness: 800,
        y: {
          delay: 0.7,
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
    <div className="flex">
      <m.div
        className="relative flex flex-col items-center justify-center"
        transition={{ when: "afterChildren", staggerChildren: 0.6 }}
      >
        <Icon src="/icon.webp" />
        <m.div
          initial="initial"
          animate="enter"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="absolute left-40 top-40"
        >
          <ChatBubble />
        </m.div>
      </m.div>
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
