'use client'

import { LazyMotion, domAnimation } from 'motion/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </ThemeProvider>
  )
}
