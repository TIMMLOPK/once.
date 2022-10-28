import Sparkles from "../../components/AnimatedText.js";
import Image from "next/image";

const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

const About = () => {
  return (
    <div>
      <div>
        <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl md:text-left">
          <span className="font-semibold bg-gradient-to-r bg-clip-text text-transparent from-cyan-200 via-sky-500 to-sky-300 animate-text">
            Hello
          </span>
          <br />I am <Sparkles>Timmy</Sparkles>
        </h1>
      </div>
      <div className="absolute md:right-1/4 md:inset-y-1/3 invisible md:visible">
        <Image
          className="inline-block rounded-full"
          src="/icon.webp"
          alt="Picture of the author"
          width={200}
          height={200}
        />
      </div>
      <div className="flex justify-center absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
          onClick={scrollDown}
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
