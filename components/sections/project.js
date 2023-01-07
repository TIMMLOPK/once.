import { useState } from "react";
import ProjectCard from "../../components/project.js";

const calDelay = (inView, index, list) => {
  return inView ? index * 200 : index === list.length - 1 ? 0 : index * 100;
};

const Project = ({ inView }) => {
  const [list] = useState([...projects]);

  return (
    <div>
      <h1 className="font-bold text-2xl">📁 Projects</h1>
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
            <ProjectCard title={project.title} link={project.link}>
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
    children: "Generate memes with your own text.",
    link: "https://meme.lionceu.live/",
  },
  {
    title: "npm outdated.rs",
    children: "npm outdated checker",
    link: "https://github.com/TIMMLOPK/npm-outdated-rs",
  },
  {
    title: "ONCE",
    children: "A profile website",
    link: "https://lionceu.live/",
  },
  {
    title: "CSS Website",
    children: "CSS website",
    link: "https://github.com/TIMMLOPK/once",
  },
];

export default Project;
