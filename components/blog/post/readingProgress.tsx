'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'motion/react'

export function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scaleX = useSpring(scrollProgress, { stiffness: 400, damping: 40 })

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-zinc-800 dark:bg-zinc-200"
      style={{ scaleX }}
    />
  )
}
