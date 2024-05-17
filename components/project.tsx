"use client";

import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { Variants, motion } from "framer-motion";

interface ProjectCardProps {
  data: {
    title: string;
    text: string;
    link?: string;
    github?: string;
  };
  key: number;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
      delayChildren: 1,
    },
  },
};

const itemsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    filter: "blur(10px)",
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
    },
  },
};

export const ProjectCard = ({ data }: ProjectCardProps) => {
  const { title, link, text, github } = data;
  return (
    <motion.div
      className="px-2 py-4"
      animate="visible"
      initial="hidden"
      variants={itemsVariants}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-4 font-mono text-lg opacity-70">{text}</p>
      <div className="mt-6 flex items-center space-x-2">
        {link && (
          <Link
            href={link}
            passHref
            aria-label="Open in new tab"
            className="group"
          >
            <div className="flex items-center rounded-full text-gray-500 transition group-hover:text-blue-500 group-active:text-blue-500 dark:text-gray-100">
              <MdOpenInNew />
              <p className="ml-1 text-xs">Website</p>
            </div>
          </Link>
        )}
        {link && github && (
          <span className="h-4 border-l border-gray-400 dark:border-gray-700" />
        )}
        {github && (
          <Link href={github} passHref aria-label="Open in new tab">
            <BsGithub className="text-gray-500 transition hover:text-gray-700 active:text-gray-700 dark:hover:text-gray-300 dark:active:text-gray-300" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export const ProjectsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="gap-8 space-y-10 md:grid md:grid-cols-2 md:space-y-0"
    >
      {children}
    </motion.div>
  );
};
