import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { caveat } from '@/app/fonts'
import { cn } from '@/lib/cn'
import { CardStack } from '@/components/motions/cardStack'
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa'
import { motion, type Variants } from 'motion/react'

const socials = [
  {
    name: 'Discord',
    handle: 'timmy_y',
    link: 'https://discord.com',
    icon: <FaDiscord className="size-4" />
  },
  {
    name: 'Instagram',
    handle: 'tw_wu_as_tim',
    link: 'https://www.instagram.com/tw_wu_as_tim/',
    icon: <FaInstagram className="size-4" />
  },
  {
    name: 'Twitter',
    handle: 'once_wu',
    link: 'https://twitter.com/once_wu',
    icon: <FaTwitter className="size-4" />
  }
]

interface ImageCardProps {
  src: string | StaticImageData
  alt: string
  text: string
  className?: string
}

export function ImageCard({ src, alt, text, className }: ImageCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border bg-white px-2.5 pt-2.5 pb-4 shadow-lg dark:border-zinc-800 dark:bg-black',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        sizes="200px"
        width={200}
        height={200}
        className="h-[250px] w-[250px] rounded-sm object-cover"
      />
      <p className={`${caveat.className} mt-4 text-center text-xl font-bold`}>
        {text}
      </p>
    </div>
  )
}

const ImageCards = [
  { src: '/images/001.jpg', alt: 'Picture of a shop', text: 'A shop^_^' },
  { src: '/images/002.JPG', alt: 'Blue sky', text: 'Blue sky ☁️' },
  {
    src: '/images/003.JPG',
    alt: 'A very special wall',
    text: 'Really interesting wall'
  }
]

type StatValue = { text: string; href?: string }

const stats: { label: string; values: StatValue[] }[] = [
  { label: 'Class', values: [{ text: 'Developer' }] },
  { label: 'Skills', values: [{ text: 'AI' }, { text: 'Web' }] },
  {
    label: 'Stack',
    values: [{ text: 'React' }, { text: 'Next.js' }, { text: 'Rust' }]
  },
  {
    label: 'Quests',
    values: [
      { text: 'ONCE AI', href: 'https://ai.ionce.me/' },
      {
        text: 'TrustedText',
        href: 'https://github.com/theoncetimes/trustedText'
      }
    ]
  },
  { label: 'Side quest', values: [{ text: 'Photography' }] }
]

const reveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const line: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-black dark:text-white">{children}</span>
}

function Prompt() {
  return (
    <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">
      &gt;{' '}
    </span>
  )
}

function ProfileCard() {
  return (
    <motion.div
      className="overflow-hidden rounded-md border border-zinc-300 bg-white/70 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/70"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="flex items-center justify-between border-b border-zinc-300 px-4 py-2 dark:border-zinc-700">
        <h2 className="font-atariClassicChunky text-xs md:text-sm">
          Player: Timmy
        </h2>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 bg-zinc-300 dark:bg-zinc-600" />
          <span className="size-2 bg-zinc-300 dark:bg-zinc-600" />
          <span className="size-2 bg-black dark:bg-white" />
        </div>
      </div>
      <dl className="space-y-3 px-4 py-4">
        {stats.map(stat => (
          <motion.div
            key={stat.label}
            variants={line}
            className="grid grid-cols-[6.5rem_1fr] items-baseline gap-2"
          >
            <dt className="font-silkScreen text-xs text-zinc-400 uppercase dark:text-zinc-500">
              {stat.label}
            </dt>
            <dd className="font-vt323 flex flex-wrap gap-x-3 gap-y-1 text-xl leading-none">
              {stat.values.map(value =>
                value.href ? (
                  <Link
                    key={value.text}
                    href={value.href}
                    className="underline decoration-zinc-400 decoration-dashed underline-offset-4 hover:decoration-solid"
                  >
                    {value.text}
                  </Link>
                ) : (
                  <span key={value.text}>{value.text}</span>
                )
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  )
}

function Bio() {
  return (
    <motion.div
      className="font-vt323 space-y-3 text-xl leading-snug text-zinc-500 dark:text-zinc-400"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.p variants={line}>
        <Prompt />
        I&apos;m <Highlight>Timmy</Highlight>, a developer who loves building
        things for the <Highlight>web</Highlight> and experimenting with{' '}
        <Highlight>AI</Highlight>.
      </motion.p>
      <motion.p variants={line}>
        <Prompt />
        Lately I&apos;ve been working on <Highlight>ONCE AI</Highlight>, an
        agentic assistant, and <Highlight>TrustedText</Highlight>, which detects
        AI-written text using contrastive learning.
      </motion.p>
      <motion.p variants={line}>
        <Prompt />
        Most of what I build uses <Highlight>React</Highlight> and{' '}
        <Highlight>Next.js</Highlight>, with some <Highlight>Rust</Highlight> on
        the side.
      </motion.p>
      <motion.p variants={line}>
        <Prompt />
        Got a project in mind or want to collaborate? Say hi
        <span
          className="ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] animate-pulse bg-black dark:bg-white"
          aria-hidden="true"
        />
      </motion.p>
    </motion.div>
  )
}

function Socials() {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map(social => (
        <Link
          key={social.name}
          href={social.link}
          aria-label={`${social.name} (${social.handle})`}
          className={cn(
            'font-silkScreen flex items-center gap-2 border border-zinc-300 px-3 py-2 text-xs text-zinc-500',
            'shadow-[3px_3px_0_0] shadow-zinc-300 transition-all',
            'hover:-translate-y-0.5 hover:text-black hover:shadow-[4px_4px_0_0]',
            'active:translate-y-0 active:shadow-[1px_1px_0_0]',
            'dark:border-zinc-700 dark:text-zinc-400 dark:shadow-zinc-700 dark:hover:text-white'
          )}
        >
          {social.icon}
          <span>{social.handle}</span>
        </Link>
      ))}
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      className="relative mx-4 flex min-h-screen items-center justify-center py-24 md:mx-12"
      data-section="about"
    >
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-8">
          <ProfileCard />
          <Bio />
          <Socials />
        </div>
        <div className="relative mx-auto">
          <p className="font-silkScreen mb-6 text-center text-xs text-zinc-400 uppercase dark:text-zinc-500">
            Side quest: photography
          </p>
          <div className="relative h-[350px] w-[300px]">
            <CardStack items={ImageCards} />
          </div>
        </div>
      </div>
    </section>
  )
}
