import Sparkles from "../../components/animatedText.js";
import Icon from "../avatar.js";

const About = () => {
  const textColor = () => {
    if (new Date().getHours() >= 6 && new Date().getHours() < 12) {
      return {
        color: "from-yellow-200 via-amber-300 to-orange-400",
        text: "Good morning",
      };
    }
    if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
      return {
        color: "from-blue-400 via-sky-300 to-sky-400",
        text: "Good afternoon",
      };
    }
    if (new Date().getHours() >= 18 && new Date().getHours() < 24) {
      return {
        color: "from-purple-300 via-indigo-300 to-blue-400",
        text: "Good evening",
      };
    }

    return {
      color: "from-gray-400 via-gray-500 to-gray-600",
      text: "Good night",
    };
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl md:text-left space-y-4">
          <span
            className={`font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
              textColor().color
            } animate-text`}
          >
            {textColor().text}
          </span>
          <br />I am <Sparkles>Timmy</Sparkles>
        </h1>
      </div>
      <div className="absolute md:left-[80%] md:inset-y-[30%] invisible md:visible">
        <Icon src="/icon.webp" />
      </div>
    </div>
  );
};

export default About;
