"use client";

import React, { useState, useEffect, useCallback, ReactNode } from "react";

interface ScrollHandlerProps {
  children: ReactNode;
}

const ScrollHandler: React.FC<ScrollHandlerProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setIsVisible(false);
      } else {
        // if scroll up show the navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  return (
    <div
      className={`${
        isVisible ? "top-0" : "-top-40"
      } fixed w-full z-30 bg-white shadow-sm transition-top duration-300`}
    >
      {children}
    </div>
  );
};

export default ScrollHandler;
