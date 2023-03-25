import Layout from "../components/Layout/main.js";
import About from "../components/sections/about.js";
import TechStack from "../components/sections/techStack.js";
import Project from "../components/sections/project.js";
import GithubStats from "../components/githubStats.js";
import { FiGithub, FiInstagram } from "react-icons/fi";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { Line } from "../components/icons/line.js";
import { ToolTip } from "../components/tooltip.js";

const Home = () => {
  return (
    <Layout>
      <section
        className="flex items-center min-h-screen m-2 relative"
        id="about"
      >
        <About />
        <Line />
      </section>
      <section
        className="min-h-screen m-2 relative px-6 block md:flex md:items-center "
        id="about-2"
      >
        <div className="md:flex md:w-full md:justify-center md:items-center md:flex-col md:p-6">
          <h1 className="font-bold text-3xl">About me</h1>
          <br />
          <GithubStats />
        </div>
        <div className="md:flex md:w-full md:justify-center md:items-center mt-8 mr-5">
          <div className="text-gray-900 dark:text-gray-300 leading-relaxed tracking-wide">
            <p>
              Hello, I am student from Hong Kong. I am insterested in
              web-development and programming.
            </p>
            <br />
            <div className="mt-4">
              You may visit GitHub if you are interested in my ongoing and
              upcoming projects. I have developed some works like Discord bot,
              profile website and meme generator. I am glad if you appreciate
              them. Please feel free to tell me if you have advice or questions.
              <br />
              <div className="flex mt-12 items-center space-x-4">
                <Link
                  href="https://github.com/TIMMLOPK"
                  aria-label="GitHub"
                  passHref
                >
                  <span className="text-gray-400 hover:text-[#333] dark:hover:text-[#fff]">
                    <FiGithub className="w-6 h-6" />
                  </span>
                </Link>
                <Link
                  href="https://www.instagram.com/tw_wu_as_tim/"
                  aria-label="Instagram"
                  passHref
                >
                  <span className="text-gray-400 hover:text-[#c92bb7]">
                    <FiInstagram className="w-6 h-6" />
                  </span>
                </Link>
                <span className="inline-flex items-center text-gray-400">
                  <ToolTip text="Timmy#2600" position="left" tigger="click">
                    <FaDiscord className="w-6 h-6 mr-1 hover:text-[#7289DA]" />
                  </ToolTip>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Line />
      </section>
      <section className="md:flex items-center min-h-screen relative" id="tech">
        <TechStack />
        <Line />
      </section>
      <section className="min-h-screen relative" id="projects">
        <Project />
      </section>
    </Layout>
  );
};

export default Home;
