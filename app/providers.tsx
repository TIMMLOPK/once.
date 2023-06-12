"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </SessionProvider>
    </ThemeProvider>
  );
}
