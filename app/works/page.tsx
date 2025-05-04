import { AnimatedGroup } from '@/components/motions/animatedGroup'
import Layout from '@/components/layout/main'
import { ProjectCard } from '@/components/project'
import { SectionTitle } from '@/components/shared/sectionTitle'

const works = [
  {
    title: 'ONCE AI',
    text: 'A powerful AI assistant. It can help you with anything.',
    link: 'https://ai.ionce.me/',
    image: '/works/once-ai.png'
  },
  {
    title: 'ONCE - Discord Bot',
    text: 'ONCE is a powerful multi-purpose Discord bot. It has a lot of features, such as logging, fun, utility, and more.',
    link: 'https://discord.ionce.me/',
    image: '/works/once-dcbot.png'
  },
  {
    title: 'Meme Generator',
    text: 'Generate an unique meme. It developed with nextui(A pretty and customizable UI library).',
    link: 'https://meme.ionce.me/',
    github: 'https://github.com/TIMMLOPK/meme-generator',
    image: '/works/meme-generator.png'
  },
  {
    title: 'npm outdated.rs',
    text: 'npm outdated checker',
    github: 'https://github.com/TIMMLOPK/npm-outdated-rs'
  },
  {
    title: 'ionce.me',
    text: 'My personal website developed with nextjs and tailwindcss.',
    link: 'https://ionce.me/',
    github: 'https://github.com/TIMMLOPK/once.'
  },
  {
    title: 'ONCE',
    text: 'Old version of my personal website',
    github: 'https://github.com/TIMMLOPK/once'
  },
  {
    title: 'Discord RPC.rs',
    text: 'Discord RPC for Rust',
    github: 'https://github.com/TIMMLOPK/discord-RPC'
  }
]

export default function WorksPage() {
  const sortedByTitle = works.sort((a, b) => a.title.localeCompare(b.title))
  const sortedWorks = {
    withImage: sortedByTitle.filter(project => project.image),
    withoutImage: sortedByTitle.filter(project => !project.image)
  }
  return (
    <Layout className="mx-4 md:mx-auto">
      <section className="relative mt-12 min-h-screen md:m-12">
        <div className="space-y-10">
          <SectionTitle>Works</SectionTitle>
          <AnimatedGroup
            className="flex flex-col space-y-6"
            preset="scale"
            variants={{
              container: { visible: { transition: { staggerChildren: 0.1 } } }
            }}
          >
            {sortedWorks.withImage.map((project, index) => (
              <ProjectCard
                data={project}
                key={index}
                className="flex flex-col space-x-6 md:flex-row"
              />
            ))}
          </AnimatedGroup>
          <div className="justify-center px-4 md:flex md:px-0">
            <svg
              width="60"
              height="24"
              viewBox="0 0 60 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-zinc-300 dark:stroke-zinc-700"
            >
              <path
                d="M0 12 C10 4 10 20 20 12 C30 4 30 20 40 12 C50 4 50 20 60 12 C70 4 70 20 80 12 60 12"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <AnimatedGroup
            className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3"
            preset="scale"
            variants={{
              container: { visible: { transition: { staggerChildren: 0.1 } } }
            }}
          >
            {sortedWorks.withoutImage.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </AnimatedGroup>
        </div>
      </section>
    </Layout>
  )
}
