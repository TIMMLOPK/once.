import { Caveat, Silkscreen, Workbench, VT323 } from "next/font/google";
import localfont from "next/font/local";

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: "400",
});

export const AtariClassicChunky = localfont({
  src: "./fonts/AtariClassicChunky.ttf",
  variable: "--font-atari-classic-chunky",
  weight: "400",
  display: "swap",
});

export const workbench = Workbench({
  subsets: ["latin"],
  variable: "--font-workbench",
});

export const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
});
