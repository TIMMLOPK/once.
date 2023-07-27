"use client";

import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { m } from "framer-motion";

const ProjectCard = ({ data }) => {
  const { title, link, text, github } = data;
  return (
    <div className="p-4 md:m-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-4 max-w-[230px] font-mono text-sm opacity-80">{text}</p>
      <div className="mt-8 flex items-center space-x-2">
        {link && (
          <Link href={link} passHref aria-label="Open in new tab">
            <div className="flex items-center rounded-full text-gray-500 transition hover:text-blue-500 active:text-blue-500">
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
            <BsGithub className="text-gray-400 transition hover:text-gray-700 active:text-gray-700 dark:hover:text-gray-300 dark:active:text-gray-300" />
          </Link>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-3xl font-bold">🗂️ Projects</h1>
        <br />
        <p className="text-base text-gray-600 dark:text-gray-400">
          Some of my projects.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3 md:justify-center md:gap-10">
        {projects.map((project, index) => (
          <m.div
            initial={{ y: 100, opacity: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            key={index}
          >
            <ProjectCard data={project} />
          </m.div>
        ))}
      </div>
    </div>
  );
};

const projects = [
  {
    title: "ONCE",
    text: "ONCE is a powerful multi-purpose Discord bot.",
    link: "https://discord.lionceu.live/",
  },
  {
    title: "Meme Generator",
    text: "Generate an unique meme",
    link: "https://meme.lionceu.live/",
    github: "https://github.com/TIMMLOPK/meme-generator",
  },
  {
    title: "npm outdated.rs",
    text: "npm outdated checker",
    github: "https://github.com/TIMMLOPK/npm-outdated-rs",
  },
  {
    title: "ionce.me",
    text: "My personal website",
    link: "https://ionce.me/",
    github: "https://github.com/TIMMLOPK/once.",
  },
  {
    title: "CSS Website",
    text: "CSS website",
    github: "https://github.com/TIMMLOPK/once",
  },
  {
    title: "Discord RPC.rs",
    text: "Discord RPC for Rust",
    github: "https://github.com/TIMMLOPK/discord-RPC",
  },
];

export default Projects;
