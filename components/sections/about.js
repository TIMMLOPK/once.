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
    <div className="my-0 mx-auto flex max-w-[450px] flex-col items-center justify-center p-0">
      <div className="relative min-w-[180px] rounded-[25px] bg-black py-[10px] px-[20px] leading-[24px] text-white">
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
        <div className="absolute top-[10rem] left-[10rem]">
          <m.div initial="initial" animate="enter" variants={variants}>
            <ChatBubble>
              <TypeWriter />
            </ChatBubble>
          </m.div>
        </div>
      </div>
      <div className="invisible relative md:absolute md:visible md:inset-y-1/3 md:left-1/2">
        <AnimatedTextChar
          text="Everything is always once."
          className={`${inter.className} md:m-4 md:p-10`}
        />
      </div>
    </div>
  );
};

export default About;
