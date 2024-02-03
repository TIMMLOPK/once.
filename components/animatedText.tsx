"use client";

import { m, useWillChange } from "framer-motion";
import { useEffect, useState } from "react";
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
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
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
      {words.map((word, index) => (
        <m.span variants={child} className="mx-2" key={index}>
          {word}
        </m.span>
      ))}
    </m.div>
  );
};

const HomePageTitle = ({ className }: { className?: string }) => {
  const [animaing, setAnimating] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimating("once");
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const completeCallback = () => {
    setAnimating("Everything is always once");
  };

  return (
    <>
      <AnimatedTextChar
        text="once"
        completeCallback={completeCallback}
        shouldAnimate={animaing === "once"}
        className={cn(className, animaing !== "once" ? "hidden" : "")}
      />
      <AnimatedTextChar
        text="Everything is always once"
        shouldAnimate={animaing === "Everything is always once"}
        className={cn(
          className,
          animaing === "Everything is always once" ? "" : "hidden",
        )}
      />
    </>
  );
};

export { AnimatedTextChar, AnimatedTextWord, HomePageTitle };
