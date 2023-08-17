import { SiPostgresql, SiPython, SiRust } from "react-icons/si";
import { JavascriptIcon, ReactIcon, TSIcon } from "../icons/lang";

const TechBox = ({ icon, name }) => {
  return (
    <div className="inline-flex place-items-center space-x-4 px-2 py-4 text-base">
      <span className="flex items-center justify-center rounded-full dark:border-t dark:border-slate-700 dark:bg-stone-950">
        <span className="w-6 text-xl">{icon}</span>
      </span>
      <p>{name}</p>
    </div>
  );
};

const TechStack = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">🔧 Tech Stack</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          The magic I use to create things.
        </p>
      </div>
      <div className="grid gap-10 md:grid-flow-col md:grid-rows-2">
        {techs.map((tech, index) => (
          <TechBox icon={tech.icon} name={tech.name} key={index} />
        ))}
      </div>
    </div>
  );
};

const techs = [
  {
    icon: <SiRust />,
    name: "Rust",
  },
  {
    icon: <JavascriptIcon />,
    name: "Javascript",
  },
  {
    icon: <TSIcon />,
    name: "Typescript",
  },
  {
    icon: <ReactIcon />,
    name: "React",
  },
  {
    icon: <SiPython />,
    name: "Python",
  },
  {
    icon: <SiPostgresql />,
    name: "PostgreSQL",
  },
];

export default TechStack;
