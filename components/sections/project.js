import ProjectCard from "../../components/project.js";

const Project = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">📁 Projects</h1>
      <br />
      <div className="grid gap-6 md:gap-12 md:grid-cols-3 mt-10 justify-center">
        <ProjectCard title="ONCE" link="https://discord.lionceu.live/">
          ONCE is a powerful multi-purpose Discord bot.
        </ProjectCard>
        <ProjectCard title="Meme Generator" link="https://meme.lionceu.live/">
          Generate memes with your own text.
        </ProjectCard>
        <ProjectCard
          title="npm outdated.rs"
          link="https://github.com/TIMMLOPK/npm-outdated-rs"
        >
          npm outdated checker
        </ProjectCard>
        <ProjectCard title="Profile" link="https://lionceu.live/">
          A profile website
        </ProjectCard>
        <ProjectCard
          title="CSS Website"
          link="https://github.com/TIMMLOPK/once"
        >
          CSS website
        </ProjectCard>
      </div>
    </div>
  );
};

export default Project;
