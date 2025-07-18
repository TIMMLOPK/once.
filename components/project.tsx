'use client'

import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { Tilt } from '@/components/motions/tilt'

interface ProjectCardProps {
  data: {
    title: string
    text: string
    link?: string
    github?: string
    image?: string
  }
  className?: string
}

export const ProjectCard = ({ data, className }: ProjectCardProps) => {
  const { title, link, text, github, image } = data
  return (
    <div className={cn('space-y-4', className)}>
      {image && (
        <Tilt className="m-2">
          <div className="group w-[200px] rounded-lg border p-1 shadow-xl dark:border-zinc-800 dark:shadow-white/20">
            <Image
              src={image}
              alt={title}
              width={400}
              height={100}
              className="rounded-md object-cover dark:brightness-75 dark:group-hover:brightness-100"
            />
          </div>
        </Tilt>
      )}
      <div className="flex-1 flex-col">
        {link ? (
          <Link
            href={link}
            passHref
            className="font-workBench text-2xl font-medium underline decoration-zinc-400"
          >
            {title}
          </Link>
        ) : (
          <h1 className="font-workBench text-2xl font-medium">{title}</h1>
        )}
        <p className="font-vt323 mt-4 max-w-72 text-lg text-zinc-400 md:max-w-full">
          {text}
        </p>
        <div className="mt-6 flex items-center space-x-2">
          {github && (
            <Link
              href={github}
              passHref
              aria-label="Open in new tab"
              className="flex items-center space-x-2 rounded-full bg-black p-1.5 text-white shadow-inner transition dark:shadow-white"
            >
              <BsGithub />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
