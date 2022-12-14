import Card from "../../components/langBox.js";
import { SiPython, SiRust } from "react-icons/si";
import { JavascriptIcon, ReactIcon, TSIcon } from "../icons/lang.js";

const Lang = () => {
  return (
    <div className="md:flex items-center justify-center w-full">
      <div className="flex w-full justify-center items-center md:p-6">
        <h1 className="font-bold text-2xl">📦 Languages & Skills</h1>
      </div>
      <div className="flex md:w-full md:justify-center md:items-center md:mt-0 mt-10 md:p-0 p-4">
        <div className="grid gap-4 md:grid-flow-col md:grid-rows-2 md:gap-10">
          {langs.map((lang, index) => (
            <div key={index++}>
              <Card
                icon={lang.icons}
                name={lang.name}
                description={lang.description}
                key={index++}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const langs = [
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
];

export default Lang;
