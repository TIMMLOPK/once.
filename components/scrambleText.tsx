'use client'

import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const STEP = 45 // ms between scrambles

interface ScrambleTextProps {
  text: string
  duration?: number // ms until every character has settled
}

// Random characters settle into `text` from left to right whenever it changes
export function ScrambleText({ text, duration = 900 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = requestAnimationFrame(() => setDisplay(text))
      return () => cancelAnimationFrame(frame)
    }

    const start = performance.now()
    let lastStep = -1
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const step = Math.floor(elapsed / STEP)
      if (step !== lastStep) {
        lastStep = step
        const settled = Math.floor((elapsed / duration) * text.length)
        setDisplay(
          Array.from(text, (ch, i) =>
            i < settled || ch === ' '
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
        )
      }
      if (elapsed < duration) frame = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, duration])

  return (
    <>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </>
  )
}
