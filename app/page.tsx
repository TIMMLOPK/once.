'use client'

import Layout from '@/components/layout/main'
import { ScrambleText } from '@/components/scrambleText'
import { AboutSection } from '@/components/sections/about'
import { SolarSystem, type Planet } from '@/components/pixel/solarSystem'
import { useActiveSection } from '@/lib/hooks/useActiveSection'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'

const scrollToAbout = () =>
  document.querySelector("[data-section='about']")?.scrollIntoView({
    behavior: 'smooth'
  })

const planets: Planet[] = [
  {
    id: 'about',
    label: 'About',
    href: '/',
    onClick: scrollToAbout,
    orbit: 165,
    radius: 19,
    speed: 0.32,
    phase: 0.6,
    color: { light: '206,92,58', dark: '240,124,86' }
  },
  {
    id: 'works',
    label: 'Works',
    href: '/works',
    orbit: 238,
    radius: 24,
    speed: 0.2,
    phase: 2.8,
    ring: true,
    color: { light: '196,146,56', dark: '232,190,106' }
  },
  {
    id: 'writing',
    label: 'Writing',
    href: '/writing',
    orbit: 310,
    radius: 21,
    speed: 0.13,
    phase: 4.6,
    moon: true,
    color: { light: '52,122,192', dark: '96,165,230' }
  }
]

export default function HomePage() {
  const activeSection = useActiveSection()
  const [isSunHovered, setIsSunHovered] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = ({ x, y }: { x: number; y: number }) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(next)
      return
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    // percentages of the viewport, so browser zoom can't shift the origin
    const cx = (x / innerWidth) * 100
    const cy = (y / innerHeight) * 100
    // circle() % radii are relative to the viewport diagonal / sqrt(2)
    const reference = Math.hypot(innerWidth, innerHeight) / Math.SQRT2
    const farthest = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )
    const radius = (farthest / reference) * 100
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${cx}% ${cy}%)`,
            `circle(${radius}% at ${cx}% ${cy}%)`
          ]
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  return (
    <Layout
      className="mx-auto max-h-dvh overflow-hidden"
      activeSection={activeSection}
    >
      <section className="relative h-dvh w-full" data-section="hero">
        <SolarSystem
          planets={planets}
          sunSrc="/icon.webp"
          onSunHover={setIsSunHovered}
          onSunClick={toggleTheme}
          sunClickLabel="Toggle light and dark mode"
          sunLabel={
            <h1 className="font-atariClassicChunky text-base md:text-lg">
              <ScrambleText
                text={isSunHovered ? 'You found me!' : 'Hi, I am Timmy.'}
              />
            </h1>
          }
          hint={
            <p className="font-silkScreen text-xs text-zinc-400 dark:text-zinc-500">
              pick a planet to explore
            </p>
          }
        />
      </section>
      <AboutSection />
    </Layout>
  )
}
