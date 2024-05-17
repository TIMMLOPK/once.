"use client";

import { cn } from "../../utils/cn";
import Avatar from "./avatar";
import Button from "../shared/button";
import { motion } from "framer-motion";
import { MotionImage } from "../shared/motionImage";
import Link from "next/link";

const postItem = ({
  id,
  title,
  coverImage,
  date,
  author,
  authorImage,
  size = "large",
  setPostId,
}: {
  id: number;
  title: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
  size?: "small" | "large";
  setPostId: (id: number) => void;
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-2xl dark:border-b dark:border-zinc-700 dark:shadow-none",
        size === "small" ? "max-w-xl" : "max-w-3xl",
      )}
      layoutId={id.toString()}
    >
      <div className="absolute inset-x-0 bottom-0 z-10 h-[200px] bg-gradient-to-t from-black dark:from-zinc-900"></div>
      <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-6 text-left md:space-y-4">
        <motion.h1 className="mt-4 text-2xl font-bold leading-relaxed text-white md:mt-0">
          {title}
        </motion.h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar
              name={author}
              picture={authorImage}
              className="text-xs text-gray-100 md:text-sm"
              imageClassName="h-6 w-6 md:w-8 md:h-8"
            />
            <p className="text-xs text-gray-100 md:text-sm">{date}</p>
          </div>
          <Button
            className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/80 transition hover:bg-white/20 hover:text-white md:px-4 md:text-sm"
            onClick={() => setPostId(id)}
          >
            Read More
          </Button>
        </div>
      </div>
      <div>
        <MotionImage
          src={coverImage ?? "/card.png"}
          alt={`Cover Image for ${title}`}
          className="object-cover"
          width={size === "small" ? 600 : 1500}
          height={size === "small" ? 400 : 750}
        />
      </div>
    </motion.div>
  );
};

export default postItem;
