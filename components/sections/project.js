import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { ToolTip } from "../tooltip";

const calDelay = (inView, index, list) => {
  return inView ? index * 200 : index === list.length - 1 ? 0 : index * 100;
};

const ProjectCard = ({ data }) => {
  const { title, link, children, github } = data;
  return (
    <div className="dark:text-white m-6 relative items-center group">
      <div className="relative">
        <Image
          src="/card.png"
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL="/card.png"
          width={250}
          height={120}
          alt="card"
        />
        {github && (
          <Link href={github} passHref aria-label="Open in new tab">
            <ToolTip text="Open Source">
              <button className="absolute bottom-2 left-2 inline-flex items-center text-gray-400 hover:text-white bg-hoverbg rounded-full p-[6px] transition">
                <BsGithub />
              </button>
            </ToolTip>
          </Link>
        )}
      </div>
      <div className="mt-4 relative">
        <div className="flex items-center space-x-2">
          <span className="font-mono tracking-wide text-lg font-semibold">
            {title}
          </span>
          {link && (
            <Link href={link} passHref aria-label="Open in new tab">
              <MdOpenInNew className="text-gray-500 hover:text-blue-500 active:text-blue-500" />
            </Link>
          )}
        </div>
      </div>
      <div className="mt-2 opacity-80 text-sm font-mono max-w-[230px]">
        {children}
      </div>
    </div>
  );
};

const Project = ({ inView }) => {
  const list = [...projects];

  return (
    <div>
      <h1 className="font-bold text-2xl">🗂️ Projects</h1>
      <br />
      <div className="grid gap-6 md:gap-12 md:grid-cols-3 mt-10 justify-center">
        {projects.map((project, index) => (
          <div
            className={`${
              inView ? "animate-fadeIn opacity-0" : "animate-fadeOut"
            } duration-500`}
            key={index++}
            style={{ animationDelay: `${calDelay(inView, index, list)}ms` }}
          >
            <ProjectCard data={project} key={index++}>
              {project.children}
            </ProjectCard>
          </div>
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
