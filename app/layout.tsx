"use client";

import "../styles/globals.css";
import React from "react";
import { Providers } from "./providers";
import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "once.",
  description: "ONCE: A profile website for Timmy",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
  ],
  openGraph: {
    title: "once",
    description: "ONCE: A profile website for Timmy",
    images: "https://lionceu.live/card.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "once",
    description: "ONCE: A profile website for Timmy",
    images: "https://lionceu.live/card.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
