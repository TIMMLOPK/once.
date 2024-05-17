import Layout from "../../components/layout/main";
import { ProjectCard, ProjectsContainer } from "../../components/project";

const projects = [
  {
    title: "ONCE",
    text: "ONCE is a powerful multi-purpose Discord bot.",
    link: "https://discord.ionce.me/",
  },
  {
    title: "Meme Generator",
    text: "Generate an unique meme",
    link: "https://meme.ionce.me/",
    github: "https://github.com/TIMMLOPK/meme-generator",
  },
  {
    title: "npm outdated.rs",
    text: "npm outdated checker",
    github: "https://github.com/TIMMLOPK/npm-outdated-rs",
  },
  {
    title: "ionce.me",
    text: "My personal website",
    link: "https://ionce.me/",
    github: "https://github.com/TIMMLOPK/once.",
  },
  {
    title: "CSS Website",
    text: "CSS website",
    github: "https://github.com/TIMMLOPK/once",
  },
  {
    title: "Discord RPC.rs",
    text: "Discord RPC for Rust",
    github: "https://github.com/TIMMLOPK/discord-RPC",
  },
];

export default function HomePage() {
  return (
    <Layout className="px-5">
      <section className="relative mt-12 min-h-screen md:m-12">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">🗂️ Projects</h1>
          </div>
          <ProjectsContainer>
            {projects.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </ProjectsContainer>
        </div>
      </section>
    </Layout>
  );
}
