import { useState, useEffect } from "react";
import { useSection } from "../utils/useSection.js";
import Layout from "../components/Layout/main.js";
import About from "../components/sections/about.js";
import Lang from "../components/sections/lang.js";
import Project from "../components/sections/project.js";
import GithubStats from "../components/githubStats.js";
import { FiGithub, FiInstagram } from "react-icons/fi";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { Transition } from "@headlessui/react";

const Home = () => {
  const [inview, setinview] = useState("about");
  const [projectInview, setprojectInview] = useState(false);
  const inView = useSection();

  useEffect(() => {
    setinview(inView);
    if (inView === "projects") {
      setprojectInview(true);
    } else {
      setprojectInview(false);
    }
  }, [inView]);

  return (
    <Layout inView={inview}>
      <section
        className="flex items-center min-h-screen m-6 relative"
        id="about"
      >
        <About />
      </section>
      <section
        className="md:flex md:items-center min-h-screen m-2 relative px-6"
        id="about"
      >
        <div className="md:flex md:w-full md:justify-center md:items-center md:flex-col md:p-6">
          <h1 className="font-bold text-3xl">About me</h1>
          <br />
          <GithubStats />
        </div>
        <div className="md:flex md:w-full md:justify-center md:items-center mt-8 mr-5">
          <div className="font-normal text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide">
            <p>
              Hello, I am student from Hong Kong. I am insterested in
              programming and I am currently learning Rust.
            </p>
            <br />
            <div className="mt-4">
              You may visit GitHub if you are interested in my ongoing and
              upcoming projects. I have developed some works like Discord bot,
              profile website and meme generator. I am glad if you appreciate
              them. Please feel free to tell me if you have advice or questions.
              <br />
              <div className="flex gap-4 mt-12">
                <Link
                  href="https://github.com/TIMMLOPK"
                  aria-label="GitHub"
                  passHref
                >
                  <span className="text-gray-400 hover:text-gray-500">
                    <FiGithub className="w-6 h-6" />
                  </span>
                </Link>
                <Link
                  href="https://www.instagram.com/tw_wu_as_tim/"
                  aria-label="Instagram"
                  passHref
                >
                  <span className="text-gray-400 hover:text-gray-500">
                    <FiInstagram className="w-6 h-6" />
                  </span>
                </Link>
                <Link href="#" aria-label="Discord" passHref>
                  <span className="text-gray-400 hover:text-gray-500">
                    <FaDiscord className="w-6 h-6" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen md:p-6" id="lang">
        <Lang />
      </section>
      <section className="min-h-screen md:p-6 mb-12" id="projects">
        <Transition
          show={projectInview}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-0"
          enterTo="transform scale-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-0"
        >
          <Project />
        </Transition>
      </section>
    </Layout>
  );
};

export default Home;
