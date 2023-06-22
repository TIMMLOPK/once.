"use client";

import Icon from "../avatar";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { AnimatedTextChar } from "../animatedText";
import { Caveat } from "next/font/google";
import { CSSProperties } from "react";

const inter = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const TypeWriter = () => {
  return (
    <div className="box-border inline-flex animate-typing overflow-hidden whitespace-nowrap text-white">
      Hello, I am Timmy
    </div>
  );
};

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

const ChatBubble = ({ children }) => {
  return (
    <div className="flex max-w-[450px] flex-col items-center justify-center p-0" >
      <div className="relative min-w-[180px] rounded-3xl border border-zinc-500 bg-black py-2.5 pl-4 leading-6 text-white shadow-2xl dark:border-zinc-800">
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const ref = useRef();
  const inview = useInView(ref, { once: true });
  return (
    <div>
      <div className="relative mb-16 md:ml-10">
        <Icon src="/icon.webp" />
        <div className="absolute left-40 top-40">
          <m.div
            initial="initial"
            animate={inview ? "enter" : "initial"}
            variants={variants}
            ref={ref}
          >
            <ChatBubble>
              <TypeWriter />
            </ChatBubble>
          </m.div>
        </div>
      </div>
      <div className="invisible relative md:visible md:absolute md:inset-y-1/3 md:left-1/2">
        <div>
          <AnimatedTextChar
            text="Everything is always once."
            className={`${inter.className} flex overflow-hidden text-4xl md:m-4 md:p-10`}
          />
          <div className="absolute -inset-y-5 inset-x-1/3 -z-10 -space-y-24 space-x-24">
            <div className="h-36 w-36  translate-x-1/2  transform-gpu rounded-3xl bg-blue-400 mix-blend-multiply blur-3xl dark:bg-blue-900 " />
            <div className="h-24 w-24 -translate-x-1/2  translate-y-6 transform-gpu rounded-3xl bg-indigo-400 mix-blend-multiply blur-3xl dark:bg-indigo-900" />
            <div className="h-28 w-28 translate-y-10  transform-gpu rounded-3xl bg-green-400 mix-blend-multiply blur-3xl dark:bg-green-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
