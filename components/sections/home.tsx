import { Caveat } from "next/font/google";
import { HomePageTitle } from "../animatedText";
import { AnimatedIcon } from "../animatedIcon";

import Icon from "../../public/icon.webp";

const inter = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const Home = () => {
  return (
    <div>
      <AnimatedIcon src={Icon} />
      <div className="relative inset-0 hidden md:absolute md:left-1/2 md:flex md:flex-col md:items-center md:justify-center">
        <HomePageTitle
          className={`${inter.className} flex overflow-hidden text-4xl md:m-4 md:p-10`}
        />
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-36 w-36  translate-x-1/2 rounded-3xl bg-blue-400 mix-blend-multiply blur-3xl dark:bg-blue-900" />
          <div className="h-24 w-24 -translate-y-10 translate-x-1/2 rounded-3xl bg-indigo-400 mix-blend-multiply blur-3xl dark:bg-indigo-900" />
          <div className="h-28 w-28 translate-y-10 rounded-3xl bg-purple-400 mix-blend-multiply blur-3xl dark:bg-purple-900" />
        </div>
      </div>
    </div>
  );
};

export default Home;
