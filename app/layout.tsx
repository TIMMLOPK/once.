import "../styles/globals.css";
import React from "react";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
