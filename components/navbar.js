import Tooltip from "./tooltip";
import { AiOutlineFolder } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { FcContacts, FcSettings } from "react-icons/fc";
import { BsArrowBarRight } from "react-icons/bs";
import { FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

function scrollTo(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
  });
}

const Navbar = ({ show, inView }) => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("about");
  const [showNav, setShowNav] = useState(false);
  const navbar = useRef(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!inView) {
      setActive("about");
    } else {
      setActive(inView);
    }
    if (navbar.current) {
      navbar.current.addEventListener("mouseenter", () => {
        setShowNav(true);
      });
    }
    setShowNav(show);
    return () => {
      if (navbar.current) {
        navbar.current.removeEventListener("mouseenter", () => {
          setShowNav(true);
        });
      }
    };
  }, [show, inView]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`fixed top-1/4 ${
        showNav ? "right-2" : "right-[-30px]"
      } z-10 transition-all duration-200 ease-in-out`}
      ref={navbar}
    >
      <div className="h-[400px] w-10 bg-black text-white rounded-md shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80 p-1">
        <div className="mt-6 flex flex-col items-center">
          <div>
            <Tooltip message="About">
              <button
                onClick={() => {
                  scrollTo("about");
                }}
                defaultValue={active === "about"}
                className={`${
                  active === "about" ? "bg-hoverbg" : "bg-transparent"
                } p-2 rounded-md `}
              >
                <SiAboutdotme />
              </button>
            </Tooltip>
          </div>
          <div className="mt-8">
            <Tooltip message="Language & Skills">
              <button
                onClick={() => {
                  scrollTo("lang");
                }}
                className={`${
                  active === "lang" ? "bg-hoverbg" : "bg-transparent"
                } p-2 rounded-md `}
              >
                <FcSettings />
              </button>
            </Tooltip>
          </div>

          <div className="mt-8">
            <Tooltip message="Projects">
              <button
                onClick={() => {
                  scrollTo("projects");
                }}
                className={`${
                  active === "projects" ? "bg-hoverbg" : "bg-transparent"
                } p-2 rounded-md `}
              >
                <AiOutlineFolder />
              </button>
            </Tooltip>
          </div>

          <div className="mt-8">
            <Tooltip message="Social">
              <button
                onClick={() => {
                  scrollTo("social");
                }}
                className={`${
                  active === "social" ? "bg-hoverbg" : "bg-transparent"
                } p-2 rounded-md `}
              >
                <FcContacts />
              </button>
            </Tooltip>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="p-2 rounded-md hover:bg-hoverbg"
            >
              {theme === "dark" ? <FiMoon /> : <FiSun />}
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={() => (showNav ? setShowNav(false) : setShowNav(true))}
              className="p-2 rounded-md hover:bg-hoverbg"
            >
              <BsArrowBarRight />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
