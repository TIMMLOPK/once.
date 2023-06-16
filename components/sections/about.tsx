import React from "react";
import GithubStats from "../githubStats";
import Tooltip from "../shared/tooltip";
import { FaDiscord } from "react-icons/fa";
import { FiGithub, FiInstagram } from "react-icons/fi";
import Link from "next/link";

export const About = () => {
  return (
    <div className="w-full items-center justify-center md:flex">
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
                <FiGithub className="h-6 w-6 text-gray-400 hover:text-black dark:hover:text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/tw_wu_as_tim/"
                aria-label="Instagram"
                passHref
              >
                <FiInstagram className="h-6 w-6 text-gray-400 hover:text-[#c92bb7]" />
              </Link>
              <Tooltip text="Timmy#2600" position="right">
                <FaDiscord className="h-6 w-6 text-gray-400 hover:text-[#7289DA]" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
