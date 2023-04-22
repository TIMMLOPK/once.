import { SiPostgresql, SiPython, SiRust } from "react-icons/si";
import { JavascriptIcon, ReactIcon, TSIcon } from "../icons/lang.js";

const TechBox = ({ icon, name }) => {
  return (
    <>
      <div className="text-md md:0 mt-6 inline-flex place-items-center text-gray-900 dark:text-white">
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
    <div className="w-full items-center justify-center md:flex">
      <div className="md:flex md:w-full md:flex-col md:items-center md:justify-center md:p-6">
        <h1 className="text-2xl font-bold">🔧 Tech Stack</h1>
        <br />
        <p className="text-sm text-gray-600 dark:text-gray-400 md:ml-5">
          The magic I use to create things.
        </p>
      </div>
      <div className="mt-10 flex p-4 md:mt-0 md:w-full md:items-center md:justify-center md:p-0">
        <div className="grid gap-4 md:grid-flow-col md:grid-rows-2 md:gap-10">
          {techs.map((tech, index) => (
            <div key={index++}>
              <TechBox
                icon={tech.icons}
                name={tech.name}
                description={tech.description}
                key={index++}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const techs = [
  {
    icons: <SiRust />,
    name: "Rust",
  },
  {
    icons: <JavascriptIcon />,
    name: "Javascript",
  },
  {
    icons: <TSIcon />,
    name: "Typescript",
  },
  {
    icons: <ReactIcon />,
    name: "React",
  },
  {
    icons: <SiPython />,
    name: "Python",
  },
  {
    icons: <SiPostgresql />,
    name: "PostgreSQL",
  },
];

export default TechStack;
