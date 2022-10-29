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
    <div>
      <h1 className="font-bold text-2xl">📦 Languages & Skills</h1>
      <br />
      <div className="grid gap-5 md:grid-flow-col md:grid-rows-3 md:gap-8 mt-12">
        {langs.map((lang, index) => (
          <div>
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
