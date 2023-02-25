import { useCallback } from "react";
import Sparkles from "../../components/animatedText.js";
import Icon from "../avatar.js";

const About = () => {
  const scrollDown = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
          onClick={scrollDown}
          aria-label="Scroll down"
        >
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default About;
