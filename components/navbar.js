import { AiOutlineFolder } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { FcSettings } from "react-icons/fc";
import { BsArrowBarRight } from "react-icons/bs";
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

function scrollTo(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
  });
}

const NavItem = ({ children, active, id }) => {
  const variants = {
    active: {
      scale: 1.2,
      transition: {
        duration: 0.2,
      },
    },
    inactive: {
      scale: 1,
    },
  };
  const isactive = active === id;
  return (
    <motion.span
      className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
      onClick={() => {
        scrollTo(id);
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      variants={variants}
      initial="inactive"
      animate={isactive ? "active" : "inactive"}
    >
      {children}
    </motion.span>
  );
};


const variants = {
  open: {
    x: 0,
    transition: {
      delay: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    x: 40,
    transition: {
      delay: 0.1,
      ease: "easeInOut",
    },
  },
};
const Navbar = ({ show, inView }) => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("about");
  const [showNav, setShowNav] = useState(false);
  const navbar = useRef(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const navRef = navbar.current;
    if (!inView) {
      setActive("about");
    } else {
      setActive(inView);
    }
    if (navRef) {
      navRef.addEventListener("mouseenter", () => {
        setShowNav(true);
      });
    }
    setShowNav(show);
    return () => {
      if (navRef) {
        navRef.removeEventListener("mouseenter", () => {
          setShowNav(true);
        });
      }
    };
  }, [show, inView]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed top-1/4 right-2 z-10"
      ref={navbar}
      variants={variants}
      initial="closed"
      animate={showNav ? "open" : "closed"}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[340px] bg-black text-white rounded-md shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80 p-1">
        <div className="mt-6 flex flex-col items-center">
          <div>
            <NavItem active={active} id="about">
              <SiAboutdotme />
            </NavItem>
          </div>

          <div className="mt-8">
            <NavItem active={active} id="lang">
              <FcSettings />
            </NavItem>
          </div>

          <div className="mt-8">
            <NavItem active={active} id="projects">
              <AiOutlineFolder />
            </NavItem>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
            >
              {theme === "dark" ? <FiMoon /> : <FiSun />}
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowNav(!showNav)}
              className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-hoverbg"
            >
              <BsArrowBarRight />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
