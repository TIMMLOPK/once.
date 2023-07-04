"use client";

import { m } from "framer-motion";
import { AnimatedTextChar } from "../animatedText";
import { Caveat } from "next/font/google";
import Image from "next/image";

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
    <div className="flex max-w-[450px] flex-col items-center justify-center p-0">
      <div className="relative min-w-[180px] rounded-3xl border border-zinc-500 bg-black py-2.5 pl-4 leading-6 text-white shadow-2xl dark:border-zinc-800">
        <div className="box-border inline-flex overflow-hidden whitespace-nowrap text-white">
          Hello, I am Timmy
        </div>
      </div>
    </div>
  );
};

const Icon = ({ src }) => {
  return (
    <m.div
      className="group relative h-[248px] w-[248px] rounded-full flex items-center justify-center"
      animate={{
        y: [0, -20, 0],
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
          duration: 1.0,
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
        className="transform rounded-full shadow transition duration-500 ease-in-out group-hover:scale-105"
      />
    </m.div>
  );
};

const Home = () => {
  return (
    <div>
      <m.div
        className="relative mb-16 md:ml-12"
        transition={{ when: "afterChildren", staggerChildren: 0.6 }}
      >
        <Icon src="/icon.webp" />
        <div className="absolute left-40 top-40">
          <m.div
            initial="initial"
            animate="enter"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <ChatBubble />
          </m.div>
        </div>
      </m.div>
      <div className="relative hidden md:absolute md:inset-y-1/3 md:left-1/2 md:block">
        <AnimatedTextChar
          text="Everything is always once."
          className={`${inter.className} flex overflow-hidden text-4xl md:m-4 md:p-10`}
        />
        <div className="absolute -inset-y-5 inset-x-1/3 -z-10 -space-y-24 space-x-24">
          <div className="h-36 w-36  translate-x-1/2 rounded-3xl bg-blue-400 mix-blend-multiply blur-3xl dark:bg-blue-900 " />
          <div className="h-24 w-24 -translate-x-1/2 translate-y-6 rounded-3xl bg-indigo-400 mix-blend-multiply blur-3xl dark:bg-indigo-900" />
          <div className="h-28 w-28 translate-y-10 rounded-3xl bg-green-400 mix-blend-multiply blur-3xl dark:bg-green-900" />
        </div>
      </div>
    </div>
  );
};

export default Home;
