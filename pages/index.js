import Image from "next/image";
import Card from "../components/langCard.js";
import Layout from "../components/Layout/main.js";
import {
  SiRust,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { MdOutlineTouchApp } from "react-icons/md";
import ProjectCard from "../components/project.js";
import { InView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Sparkles from "../components/AnimatedText.js";
import Social from "../components/social.js";
import TextTransition, { presets } from "react-text-transition";

const Home = () => {
  const [inview, setinview] = useState("about");
  const [index, setindex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setindex((index) => (index + 1) % TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Layout inView={inview}>
      <InView
        className="flex items-center min-h-screen m-6 p-0 relative"
        id="about"
        as="section"
        onChange={(inView) => setinview(inView && "about")}
        threshold={0.5}
      >
        <div>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl md:text-left">
            <span className="font-semibold bg-gradient-to-r bg-clip-text  text-transparent from-cyan-200 via-sky-500 to-blue-600 animate-text">
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
          <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
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
          </div>
        </div>
      </InView>
      <InView
        className="md:flex md:items-center min-h-screen m-2 relative"
        as="section"
        onChange={(inView) => setinview(inView && "about")}
        threshold={0.5}
      >
        <div className="md:flex md:w-full md:justify-center md:items-center md:flex-col md:p-6">
          <h1 className="font-bold text-3xl">About me</h1>
          <br />
          <strong>Your life is not undefined.</strong>
        </div>
        <div className="md:flex md:w-full md:justify-center md:items-center mt-2">
          <p className="font-normal text-gray-600 dark:text-gray-300">
            Hello, I am a student come from Hong Kong.I am learning web
            development.
            <br />
            <br />
            You may visit GitHub if you are interested in my ongoing and
            upcoming projects. I have developed some works like Discord bot,
            profile website and meme generator. I am glad if you appreciate
            them. Please feel free to tell me if you have advice or questions.
            My contact information is in the <a href="#social">social media</a>
          </p>
        </div>
      </InView>
      <InView
        className="min-h-screen p-6"
        id="lang"
        as="section"
        onChange={(inView) => setinview(inView && "lang")}
        threshold={0.5}
      >
        <h1 className="font-bold text-2xl">📦 Languages & Skills</h1>
        <Social icon={<MdOutlineTouchApp />} isLink={false}>
          Click them
        </Social>
        <br />
        <div className="grid gap-5 md:grid-flow-col md:grid-rows-3 md:gap-8 mt-8">
          <div>
            <Card
              icons={<SiRust />}
              name="Rust"
              description="🪄I use it to build npm outdated checker."
            />
          </div>
          <div>
            <Card
              icons={<SiJavascript />}
              name="Javascript"
              description="My favorite language."
            />
          </div>
          <div>
            <Card
              icons={<SiPython />}
              name="Python"
              description="📦 Coming soon."
            />
          </div>
          <div>
            <Card
              icons={<SiReact />}
              name="React"
              description="📦 Coming soon."
            />
          </div>
          <div>
            <Card
              icons={<SiNextdotjs />}
              name="Next.js"
              description="This page is built with Next.js 💙🤍"
            />
          </div>
        </div>
      </InView>
      <InView
        className="min-h-screen p-6"
        id="projects"
        as="section"
        onChange={(inView) => setinview(inView && "projects")}
        threshold={0.5}
      >
        <h1 className="font-bold text-2xl">📁 Projects</h1>
        <br />
        <div className="flex flex-col md:flex-row items-baseline">
          <ProjectCard title="ONCE" link="https://discord.lionceu.live/">
            ONCE is a powerful multi-purpose Discord bot.
          </ProjectCard>
          <ProjectCard title="Meme Generator" link="https://meme.lionceu.live/">
            #Meme generator
          </ProjectCard>
        </div>
      </InView>
      <InView
        className="min-h-screen p-6"
        id="social"
        as="section"
        threshold={0.5}
        onChange={(inView) => setinview(inView && "social")}
      >
        <h1 className="font-bold text-2xl">📱 Social Media</h1>
        <br />
        <h3 className="text-xl font-bold text-gray-500 inline-flex mb-8">
          Find me on
          <TextTransition springConfig={presets.gentle}>
            <a href={SocialLinks[index]} className="text-blue-400 ml-3">
              {TEXTS[index]}
            </a>
          </TextTransition>
        </h3>
        <div className="grid gap-8 md:grid-flow-col md:grid-rows-3 md:gap-15">
          <Social
            icon={<GitHubLogoIcon />}
            url="https://github.com/TIMMLOPK"
            isLink
          >
            TIMMLOPK
          </Social>
          <Social icon={<DiscordLogoIcon />} url="https://discord.com" isLink>
            Timmy#2600
          </Social>
          <Social
            icon={<InstagramLogoIcon />}
            url="https://www.instagram.com/tw_wu_as_tim/"
            isLink
          >
            tw_wu_as_tim
          </Social>
        </div>
      </InView>
    </Layout>
  );
};

const TEXTS = ["Github", "Instagram", "Discord"];

const SocialLinks = [
  "https://github.com/TIMMLOPK/",
  "https://www.instagram.com/tw_wu_as_tim/",
  "https://discord.com",
];

export default Home;
