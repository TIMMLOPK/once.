import "../styles/globals.css";
import React from "react";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "once.",
  description: "ONCE: A profile website for Timmy",
  openGraph: {
    title: "once.",
    description: "ONCE: A profile website for Timmy",
  },
  twitter: {
    card: "summary_large_image",
    title: "once.",
    description: "ONCE: A profile website for Timmy",
  },
  metadataBase: new URL("https://ionce.me/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
