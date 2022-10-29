import { useState, useEffect, useRef } from "react";

export const useSection = () => {
  const [inview, setinview] = useState("about");
  const observer = useRef(null);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setinview(entry.target.id);
        }
      });
    }, options);
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.current.observe(section);
    });
    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);
  return inview;
};
