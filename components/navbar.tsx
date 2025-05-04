'use client'

import { useTheme } from 'next-themes'
import { motion } from 'motion/react'
import useScroll from '@/lib/hooks/useScroll'
import { cn } from '@/lib/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { IconMoon, IconSun } from '@/components/shared/icons'
import { useAtEdge } from '@/lib/hooks/useAtEdge'
import { AnimatedBackground } from '@/components/motions/animatedBackground'
import { AnimatedIcon } from './animatedIcon'

const Label = [
  {
    name: (
      <AnimatedIcon
        src="/icon.webp"
        width={24}
        height={24}
        className="relative flex size-6 items-center justify-center rounded-full"
        data-id="home"
        dotSize={2}
        spacing={0}
      />
    ),
    herf: '/'
  },
  { name: 'Works', herf: '/works' },
  { name: 'Blog', herf: '/blog' }
] as const

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 100
    }
  },
  closed: {
    y: 45,
    opacity: 1,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 100
    }
  },
  hidden: {
    y: 100
  }
}

function Navbar({ activeSection }: { activeSection?: string }) {
  const { theme, setTheme } = useTheme()
  const [_, startTransition] = useTransition()
  const pathName = usePathname()
  const scrolled = useScroll()
  const { atBottom, atTop } = useAtEdge()

  return (
    <motion.nav
      className={cn(
        'fixed inset-x-0 bottom-5 z-50 m-auto flex w-fit -translate-x-1/2 items-center justify-center rounded-full',
        'bg-white/60 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-[16px] dark:bg-zinc-800/0 dark:ring-white/10'
      )}
      variants={variants}
      initial="hidden"
      animate={
        activeSection === 'hero'
          ? 'hidden'
          : atTop || atBottom
            ? 'open'
            : scrolled
              ? 'closed'
              : 'open'
      }
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      whileDrag="open"
      dragDirectionLock
      style={{ touchAction: 'none' }}
    >
      <div className="relative flex items-center space-x-1">
        <AnimatedBackground
          className="rounded-full bg-zinc-100 dark:bg-zinc-800"
          enableHover
        >
          {Label.map((label, index) => (
            <Link
              key={index}
              href={label.herf}
              data-id={typeof label === 'string' ? label : label.herf}
              className={cn(
                'flex w-16 cursor-pointer items-center justify-center rounded-full p-2 font-silkScreen text-sm opacity-60',
                'transition hover:opacity-100',
                label.herf === '/' && 'mr-2 h-8 w-8 p-1',
                pathName === label.herf && 'font-bold opacity-100'
              )}
              onClick={() => {
                if (activeSection === 'about' && label.herf === '/') {
                  document
                    .querySelector("[data-section='hero']")
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    })
                }
              }}
              passHref
            >
              {label.name}
            </Link>
          ))}
        </AnimatedBackground>
      </div>
      <span className="mx-2 h-4 border-l border-zinc-500 dark:border-zinc-700" />
      <button
        onClick={() =>
          startTransition(() => setTheme(theme === 'dark' ? 'light' : 'dark'))
        }
        aria-label="Toggle theme"
        className={cn(
          'flex cursor-pointer items-center justify-center rounded-full border-t border-transparent p-2 text-base text-zinc-900 dark:text-zinc-100',
          'transition hover:bg-zinc-100 dark:hover:bg-hover dark:hover:bg-zinc-800'
        )}
      >
        {!theme ? <IconSun /> : theme === 'dark' ? <IconMoon /> : <IconSun />}
        <span className="sr-only">Toggle theme</span>
      </button>
    </motion.nav>
  )
}

export default Navbar
