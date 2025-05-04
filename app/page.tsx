'use client'

import { AnimatedIcon } from '@/components/animatedIcon'
import Layout from '@/components/layout/main'
import { AnimatedText } from '@/components/animatedText'
import { AboutSection } from '@/components/sections/about'
import { useActiveSection } from '@/lib/hooks/useActiveSection'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

interface LabelWithArrowProps {
  href: string
  children: string
  activeId: string
  id: string
  setLabel: (id: string) => void
}

function LabelWithArrow({
  href,
  children,
  activeId,
  id,
  setLabel
}: LabelWithArrowProps) {
  return (
    <Link
      href={href}
      passHref
      className="inline-flex cursor-pointer rounded-full px-2 py-1 pl-4 text-sm opacity-60"
      onMouseEnter={() => setLabel(id)}
      onClick={() => {
        if (href === '/') {
          document.querySelector("[data-section='about']")?.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }}
      key={id}
    >
      <AnimatePresence>
        {activeId === id && (
          <motion.div
            layoutId="arrow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            className="absolute left-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              className="rotate-180 text-black dark:text-white"
            >
              <path
                fill="currentColor"
                d="M6 4h1v1H6v1H5v1H4v2h1v1h1v1h1v1h2V4H6z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.p
        className={cn(
          'relative inline-block bg-[length:250%_100%,auto] bg-clip-text font-atariClassicChunky text-[15px]',
          'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
          '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
          'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]'
        )}
        initial={{ backgroundPosition: '100% center' }}
        whileHover={{ backgroundPosition: '0% center' }}
        transition={{
          duration: 1,
          ease: 'linear'
        }}
        style={
          {
            '--spread': `${children.length * 2}px`,
            backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`
          } as React.CSSProperties
        }
      >
        {children}
      </motion.p>
    </Link>
  )
}

export default function HomePage() {
  const activeSection = useActiveSection()

  const [label, setLabel] = useState<string>('about')
  const [isIconHovered, setIsIconHovered] = useState(false)
  const [messages, setMessages] = useState<string[]>(['Hi, I am Timmy.'])

  useEffect(() => {
    if (isIconHovered) {
      setMessages(['...', 'You found me!'])
    } else {
      setMessages(['Hi, I am Timmy.'])
    }
  }, [isIconHovered])

  return (
    <Layout
      className="mx-auto max-h-[100dvh] overflow-hidden"
      activeSection={activeSection}
    >
      <section
        className="relative m-2 flex min-h-screen items-center lg:px-5"
        data-section="hero"
      >
        <div className="px-4">
          <AnimatedIcon src="./icon.webp" onHover={setIsIconHovered} aria-label="Animated pixelated icon of Timmy Wu" />
          <div className="mt-10 flex max-w-lg flex-col space-y-10 px-4">
            <h1
              className={cn(
                'flex items-center font-atariClassicChunky text-xl relative gap-4'
              )}
            >
              <AnimatedText messages={messages} />
            </h1>
            <h1 className='sr-only'>
              {messages}
            </h1>
          </div>
          <div className="relative mt-10 flex flex-col space-y-4 px-4">
            <LabelWithArrow
              href="/"
              activeId={label}
              id="about"
              setLabel={setLabel}
            >
              About
            </LabelWithArrow>
            <LabelWithArrow
              href="/works"
              activeId={label}
              id="works"
              setLabel={setLabel}
            >
              Works
            </LabelWithArrow>
            <LabelWithArrow
              href="/blog"
              activeId={label}
              id="blog"
              setLabel={setLabel}
            >
              Blog
            </LabelWithArrow>
          </div>
        </div>
        {/* <button className="absolute bottom-10 left-0 right-0 flex justify-center mb-4" onClick={() => {
          document.querySelector("[data-section='about']")?.scrollIntoView({
            behavior: "smooth",
          });
        }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 8 8"
            className="animate-bounce text-zinc-400"
          >
            <circle cx="1" cy="3" r="0.4" fill="currentColor" />
            <circle cx="7" cy="3" r="0.4" fill="currentColor" />
            <circle cx="2" cy="4" r="0.4" fill="currentColor" />
            <circle cx="6" cy="4" r="0.4" fill="currentColor" />
            <circle cx="3" cy="5" r="0.4" fill="currentColor" />
            <circle cx="5" cy="5" r="0.4" fill="currentColor" />
            <circle cx="4" cy="6" r="0.4" fill="currentColor" />
          </svg>
        </button> */}
      </section>
      <AboutSection />
    </Layout>
  )
}
