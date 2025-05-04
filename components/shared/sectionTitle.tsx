'use client'

import { motion } from 'motion/react'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="relative">
      <h1
        className="font-silkScreen text-2xl font-bold text-zinc-200 dark:text-zinc-800"
        aria-hidden="true"
      >
        {children}
      </h1>
      <motion.h1
        className="absolute inset-0 font-silkScreen text-2xl font-bold text-zinc-800 dark:text-zinc-200"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
      >
        {children}
      </motion.h1>
    </div>
  )
}
