"use client";

import { m, useWillChange } from "framer-motion";
import { useState } from "react";
import { cn } from "../utils/cn";

const AnimatedTextChar = ({
  text,
  className,
  completeCallback,
  shouldAnimate = true,
}: {
  text: string;
  className?: string;
  completeCallback?: () => void;
  shouldAnimate?: boolean;
}) => {
  const letters = Array.from(text);
  const willChange = useWillChange();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <m.div
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      onAnimationComplete={completeCallback}
      className={className}
      style={{ willChange }}
    >
      {letters.map((letter: string, index) => (
        <m.span variants={child} key={index} className="md:text-[3rem]">
          {letter === " " ? "\u00A0" : letter}
        </m.span>
      ))}
    </m.div>
  );
};

const AnimatedTextWord = ({
  text,
  className,
  completeCallback,
  shouldAnimate = true,
}: {
  text: string;
  className?: string;
  completeCallback?: () => void;
  shouldAnimate?: boolean;
}) => {
  const words = text.split(" ");
  const willChange = useWillChange();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <m.div
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      onAnimationComplete={completeCallback}
      className="flex overflow-hidden text-[2rem]"
      style={{ willChange }}
    >
      {words.map((word, index) => (
        <m.span variants={child} className={className} key={index}>
          {word}
        </m.span>
      ))}
    </m.div>
  );
};

const HomePageTitle = ({ className }: { className?: string }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const completeCallback = () => {
    setShouldAnimate(true);
  };

  return (
    <>
      <AnimatedTextChar
        text="once"
        completeCallback={completeCallback}
        shouldAnimate={!shouldAnimate}
        className={cn(className, shouldAnimate ? "hidden" : "")}
      />
      <AnimatedTextChar
        text="Everything is always once"
        shouldAnimate={shouldAnimate}
        className={cn(className, shouldAnimate ? "" : "hidden")}
      />
    </>
  );
};

export { AnimatedTextChar, AnimatedTextWord, HomePageTitle };
