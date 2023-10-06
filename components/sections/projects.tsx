import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { BsGithub } from "react-icons/bs";

const ProjectCard = ({ data }) => {
  const { title, link, text, github } = data;
  return (
    <div className="px-2 py-4 ">
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
            <div className="flex items-center rounded-full text-gray-400 transition group-hover:text-blue-500 group-active:text-blue-500 dark:text-gray-100">
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
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">🗂️ Projects</h1>
        <p className="text-base text-gray-600 dark:text-gray-200">
          I make projects in my free time.
        </p>
      </div>
      <div className=" space-y-10 md:justify-center">
        {projects.map((project, index) => (
          <ProjectCard data={project} key={index} />
        ))}
      </div>
    </div>
  );
};

const projects = [
  {
    title: "ONCE",
    text: "ONCE is a powerful multi-purpose Discord bot.",
    link: "https://discord.ionce.me/",
  },
  {
    title: "Meme Generator",
    text: "Generate an unique meme",
    link: "https://meme.ionce.me/",
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
