'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CanvasBox } from './canvasBox'

interface CollapsibleProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function Collapsible({
  title,
  children,
  defaultOpen = false
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <CanvasBox>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-zinc-400"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="border-t border-zinc-200 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CanvasBox>
  )
}
