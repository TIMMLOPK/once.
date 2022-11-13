import Card from "../../components/langBox.js";
import {
  SiRust,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";

const Lang = () => {
  return (
    <div className="md:flex items-center justify-center w-full">
      <div className="flex w-full justify-center items-center md:p-6">
        <h1 className="font-bold text-2xl">📦 Languages & Skills</h1>
      </div>
      <div className="flex md:w-full md:justify-center md:items-center md:mt-0 mt-5">
        <div className="grid gap-5 md:grid-flow-col md:grid-rows-3 md:gap-8">
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
    description: "I use it to build npm outdated checker.",
  },
  {
    icons: <SiJavascript />,
    name: "Javascript",
    description: "My favorite language.",
  },
  {
    icons: <SiPython />,
    name: "Python",
    description: "A language I am learning.",
  },
  {
    icons: <SiReact />,
    name: "React",
    description: "I use it to build this website.",
  },
  {
    icons: <SiNextdotjs />,
    name: "Next.js",
    description: "This page is built with Next.js 💙🤍",
  },
];

export default Lang;
