import Layout from "../components/layout/main";
import { Line } from "../components/icons/line";
import Home from "../components/sections/home";
import TechStack from "../components/sections/techStack";
import Projects from "../components/sections/projects";
import About from "../components/sections/about";
import Blog from "../components/sections/blog";
import { cn } from "../utils/cn";

const Section = ({
  children,
  className,
  id,
  isLast,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isLast?: boolean;
}) => {
  return (
    <section className={cn("relative m-2 min-h-screen", className)} id={id}>
      {children}
      {!isLast && <Line />}
    </section>
  );
};
export default async function HomePage() {
  return (
    <Layout className="px-5">
      <Section id="home" className="flex items-center">
        <Home />
      </Section>
      <Section id="about" className="px-6 md:flex md:items-center">
        <About />
      </Section>
      <Section id="tech" className="md:flex md:items-center">
        <TechStack />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="blog" isLast>
        <Blog />
      </Section>
    </Layout>
  );
}
