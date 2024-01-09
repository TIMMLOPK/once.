"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </ThemeProvider>
  );
}
