"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import useScroll from "../utils/useScroll";
import { usePathname, useRouter } from "next/navigation";
import ToolTip from "./shared/tooltip";
import { cn } from "../utils/cn";

const NavItem = ({ children, id }) => {
  const router = useRouter();
  const pathName = usePathname();
  const scrollTo = useCallback(
    (id: string) => {
      if (pathName !== "/") {
        router.push(`/#${id.toLowerCase()}`);
      }

      const el = document.getElementById(id.toLowerCase());

      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
    },
    [pathName, router],
  );

  return (
    <ToolTip text={id} position="top" hideArrow offset={10}>
      <button
        onClick={() => scrollTo(id)}
        className="flex cursor-pointer items-center justify-center rounded-full border-t border-transparent p-1 text-base transition hover:bg-gray-400/20 dark:hover:border-slate-500 dark:hover:bg-hover"
      >
        {children}
      </button>
    </ToolTip>
  );
};

const Label = [
  { name: "Home", emoji: "🏡" },
  { name: "Tech", emoji: "🔧" },
  { name: "Projects", emoji: "🗂️" },
  { name: "Blog", emoji: "📝" },
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
      <div className="flex flex-row items-center space-x-6">
        {Label.map((label, index) => (
          <NavItem
            id={label.name}
            key={index}
            aria-label={`Go to ${label.name}`}
          >
            {label.emoji}
          </NavItem>
        ))}
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
