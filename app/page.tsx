import Layout from "../components/layout/main";
import { FiGithub, FiInstagram } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { Line } from "../components/icons/line";
import About from "../components/sections/about";
import TechStack from "../components/sections/techStack";
import Project from "../components/sections/project";
import GithubStats from "../components/githubStats";
import Link from "next/link";
import ToolTip from "../components/shared/tooltip";
import Blog from "../components/sections/blog";

export default async function Home() {
  return (
    <Layout>
      <section
        className="relative m-2 flex min-h-screen items-center"
        id="about"
      >
        <About />
        <Line />
      </section>
      <section
        className="relative m-2 min-h-screen px-6 md:flex md:items-center"
        id="about-2"
      >
        <div className="md:flex md:w-full md:flex-col md:items-center md:justify-center md:p-6">
          <h1 className="text-3xl font-bold">About me</h1>
          <br />
          <GithubStats />
        </div>
        <div className="mr-5 mt-8 md:flex md:w-full md:items-center md:justify-center">
          <div className="leading-relaxed tracking-wide text-gray-900 dark:text-gray-300">
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
              <div className="mt-12 flex items-center space-x-4">
                <Link
                  href="https://github.com/TIMMLOPK"
                  aria-label="GitHub"
                  passHref
                >
                  <span className="text-gray-400 hover:text-[#333] dark:hover:text-[#fff]">
                    <FiGithub className="h-6 w-6" />
                  </span>
                </Link>
                <Link
                  href="https://www.instagram.com/tw_wu_as_tim/"
                  aria-label="Instagram"
                  passHref
                >
                  <span className="text-gray-400 hover:text-[#c92bb7]">
                    <FiInstagram className="h-6 w-6" />
                  </span>
                </Link>
                <ToolTip text="Timmy#2600" position="right">
                  <span className="inline-flex items-center text-gray-400">
                    <FaDiscord className="mr-1 h-6 w-6 hover:text-[#7289DA]" />
                  </span>
                </ToolTip>
              </div>
            </div>
          </div>
        </div>
        <Line />
      </section>
      <section className="relative min-h-screen items-center md:flex" id="tech">
        <TechStack />
        <Line />
      </section>
      <section className="relative min-h-screen" id="projects">
        <Project />
        <Line />
      </section>
      <section className="relative min-h-screen" id="blog">
        <Blog />
      </section>
    </Layout>
  );
}
