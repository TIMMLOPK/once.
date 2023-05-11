"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import ToolTip from "../shared/tooltip";
import { m } from "framer-motion";

const ProjectCard = ({ data }) => {
  const { title, link, children, github } = data;
  return (
    <div className="group relative m-6 items-center dark:text-white">
      <div className="relative">
        <Image
          src="/card.png"
          className="transform rounded-lg border brightness-90 transition will-change-auto group-hover:brightness-110 dark:border-zinc-700"
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL="/card.png"
          width={250}
          height={120}
          alt="card"
        />
        {github && (
          <Link href={github} passHref aria-label="Open in new tab">
            <ToolTip text="Open Source" position="left">
              <button className="absolute bottom-2 left-2 inline-flex items-center rounded-full bg-hover p-1.5 text-gray-400 transition hover:text-white">
                <BsGithub />
              </button>
            </ToolTip>
          </Link>
        )}
      </div>
      <div className="relative mt-4">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-lg font-semibold tracking-wide">
            {title}
          </span>
          {link && (
            <Link href={link} passHref aria-label="Open in new tab">
              <MdOpenInNew className="text-gray-500 hover:text-blue-500 active:text-blue-500" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-2 max-w-[230px] font-mono text-sm opacity-80">
        {children}
      </div>
    </div>
  );
};

const Project = () => {
  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold">🗂️ Projects</h1>
      <br />
      <div className="mt-8 grid justify-center gap-6 md:grid-cols-3 md:gap-10">
        {projects.map((project, index) => (
          <m.div
            initial={{ y: 100, opacity: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            key={index++}
          >
            <ProjectCard data={project} key={index++} />
          </m.div>
        ))}
      </div>
    </div>
  );
};

const projects = [
  {
    title: "ONCE",
    children: "ONCE is a powerful multi-purpose Discord bot.",
    link: "https://discord.lionceu.live/",
  },
  {
    title: "Meme Generator",
    children: "Generate an unique meme",
    link: "https://meme.lionceu.live/",
    github: "https://github.com/TIMMLOPK/meme-generator",
  },
  {
    title: "npm outdated.rs",
    children: "npm outdated checker",
    github: "https://github.com/TIMMLOPK/npm-outdated-rs",
  },
  {
    title: "ONCE",
    children: "A profile website",
    link: "https://lionceu.live/",
    github: "https://github.com/TIMMLOPK/once.",
  },
  {
    title: "CSS Website",
    children: "CSS website",
    github: "https://github.com/TIMMLOPK/once",
    link: "https://timmlopk.github.io/once/",
  },
  {
    title: "Discord RPC.rs",
    children: "Discord RPC for Rust",
    github: "https://github.com/TIMMLOPK/discord-RPC",
  },
];

export default Project;
