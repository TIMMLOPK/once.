"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import ToolTip from "./shared/tooltip";
import { cn } from "../utils/cn";
import Link from "next/link";

const NavItem = ({ children, herf, name }) => {
  return (
    <ToolTip text={name} position="top" hideArrow offset={10}>
      <Link href={herf} passHref>
        <button className="flex cursor-pointer items-center justify-center rounded-full border-t border-transparent p-1 text-base transition hover:bg-gray-400/20 dark:hover:border-slate-500 dark:hover:bg-hover">
          {children}
        </button>
      </Link>
    </ToolTip>
  );
};

const Label = [
  { name: "Home", emoji: "🏡", herf: "/" },
  { name: "About", emoji: "👨‍💻", herf: "/me" },
  { name: "Tech", emoji: "🔧", herf: "/uses" },
  { name: "Projects", emoji: "🗂️", herf: "/projects" },
  { name: "Blog", emoji: "📝", herf: "/blog" },
];

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
  const scrolled = useScroll();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <m.nav
      className={cn(
        "rounded-full",
        "bg-white/0 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-[16px] dark:bg-zinc-800/0 dark:ring-white/10",
      )}
      variants={variants}
      initial="closed"
      animate={!scrolled ? "open" : "closed"}
    >
      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-row items-center space-x-6">
          {Label.map((label, index) => (
            <NavItem
              name={label.name}
              key={index}
              herf={label.herf}
              aria-label={`Go to ${label.name}`}
            >
              {label.emoji}
            </NavItem>
          ))}
        </div>
        <div className="border-l border-slate-200 dark:border-slate-600">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "ml-2 flex cursor-pointer items-center justify-center rounded-full border-t border-transparent p-2 text-base text-slate-500",
              "transition hover:bg-gray-400/20 hover:text-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-hover",
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
