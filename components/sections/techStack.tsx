import { SiPostgresql, SiPython, SiRust } from "react-icons/si";
import { JavascriptIcon, ReactIcon, TSIcon } from "../icons/lang";

const TechBox = ({ icon, name }) => {
  return (
    <>
      <div className="text-md mt-6 inline-flex place-items-center text-gray-900 dark:text-white">
        <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-full dark:border-t dark:border-slate-700 dark:bg-stone-950">
          <span className="w-4">{icon}</span>
        </span>
        <span className="ml-2">{name}</span>
      </div>
    </>
  );
};

const TechStack = () => {
  return (
    <div className="w-full space-y-10">
      <div>
        <h1 className="text-3xl font-bold">🔧 Tech Stack</h1>
        <br />
        <p className="text-base text-gray-600 dark:text-gray-400">
          The magic I use to create things.
        </p>
      </div>
      <div className="p-4 md:mt-0 md:p-0">
        <div className="grid gap-6 md:grid-flow-col md:grid-rows-2 md:gap-10">
          {techs.map((tech, index) => (
            <TechBox icon={tech.icon} name={tech.name} key={index} />
          ))}
        </div>
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
