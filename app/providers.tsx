"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </ThemeProvider>
  );
}
