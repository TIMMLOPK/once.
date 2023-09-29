"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import { cn } from "../utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Label = [
  { name: "Home", herf: "/" },
  { name: "About", herf: "/me" },
  { name: "Projects", herf: "/projects" },
  { name: "Blog", herf: "/blog" },
] as const;

const variants = {
  open: {
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 100,
    },
  },
  closed: {
    y: 45,
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 100,
    },
  },
};

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();
  const scrolled = useScroll();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <m.nav
      className={cn(
        "z-20 rounded-full",
        "bg-white/60 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-[16px] dark:bg-zinc-800/0 dark:ring-white/10",
      )}
      variants={variants}
      initial="open"
      animate={!scrolled ? "open" : "closed"}
    >
      <div className="ml-4 flex items-center space-x-4">
        <ul className="flex items-center space-x-6">
          {Label.map((label, index) => (
            <li
              key={index}
              className={cn(
                "cursor-pointer rounded-full text-sm opacity-60",
                "transition hover:opacity-100",
                pathName === label.herf && "font-bold opacity-100",
              )}
            >
              <Link href={label.herf}>{label.name}</Link>
            </li>
          ))}
        </ul>
        <div className="border-l border-slate-200 dark:border-slate-600">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "ml-2 flex cursor-pointer items-center justify-center rounded-full border-t border-transparent p-2 text-base text-slate-900",
              "darK:hover:bg-hover transition hover:bg-gray-400/20 dark:text-slate-200",
            )}
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </m.nav>
  );
};

export default Navbar;
