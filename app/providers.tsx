"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "next-themes";
import Snowfall from 'react-snowfall';


export function Providers({ children }: { children: React.ReactNode }) {
  const snowflake = document.createElement('img');
  snowflake.src = '/snowflake.png';

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Snowfall
        snowflakeCount={50}
        images={[
          snowflake
        ]}
        radius={[5, 20]}
      />
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </ThemeProvider>
  );
}
