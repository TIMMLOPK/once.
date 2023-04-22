import Icon from "../avatar.js";
import { m } from "framer-motion";
import { AnimatedTextChar } from "../animatedText.js";
import { Caveat } from "next/font/google";

const inter = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const TypeWriter = () => {
  return (
    <div className="box-border inline-flex animate-typing overflow-hidden whitespace-nowrap text-white">
      Hello, I am Timmy
    </div>
  );
};

const transition = {
  type: "spring",
  stiffness: 200,
  mass: 0.2,
  damping: 20,
};

const variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition,
  },
};

const ChatBubble = ({ children }) => {
  return (
    <div className="flex max-w-[450px] flex-col items-center justify-center p-0">
      <div className="relative min-w-[180px] rounded-3xl border border-zinc-500 bg-black pl-4 py-2.5 leading-6 text-white shadow-2xl dark:border-zinc-800">
        {children}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className="relative mb-16 md:ml-10">
        <Icon src="/icon.webp" />
        <div className="absolute left-40 top-40">
          <m.div initial="initial" animate="enter" variants={variants}>
            <ChatBubble>
              <TypeWriter />
            </ChatBubble>
          </m.div>
        </div>
      </div>
      <div className="invisible relative md:visible md:absolute md:inset-y-1/3 md:left-1/2">
        <AnimatedTextChar
          text="Everything is always once."
          className={`${inter.className} flex overflow-hidden text-[2rem] md:m-4 md:p-10`}
        />
      </div>
    </div>
  );
};

export default About;
