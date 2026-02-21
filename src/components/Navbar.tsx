"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);

  const { scrollY } = useScroll();

  const rawScale = useTransform(scrollY, [0, 60], [1, 0.96]);
  const navScale = useSpring(rawScale, {
    stiffness: 150,
    damping: 20,
  });

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      navItems.forEach((item) => {
        const section = document.getElementById(item.href);
        if (!section) return;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveSection(item.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ===== DESKTOP FLOATING NAV ===== */}
      <div className="fixed top-6 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none">
        <motion.nav
          style={{ scale: navScale }}
          className="pointer-events-auto flex items-center gap-10 
          bg-blue-950/40 backdrop-blur-xl border border-white/10 
          rounded-full px-16 py-3 shadow-xl"
        >
          {/* Logo */}
          <a href="#about">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* Links */}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className={cn(
                "text-xs uppercase tracking-wider transition-colors",
                activeSection === item.href
                  ? "text-blue-400"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* ===== MOBILE FIXED NAVBAR ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 
      bg-blue-950/90 backdrop-blur-xl border-b border-white/10 
      px-5 py-4 flex items-center justify-between">

        {/* Logo Left */}
        <a href="#about" onClick={handleMobileClick}>
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-center gap-[5px]"
        >
          <span
            className={cn(
              "w-6 h-[2px] bg-white transition-all duration-300",
              isOpen && "rotate-45 translate-y-[7px]"
            )}
          />
          <span
            className={cn(
              "w-6 h-[2px] bg-white transition-all duration-300",
              isOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "w-6 h-[2px] bg-white transition-all duration-300",
              isOpen && "-rotate-45 -translate-y-[7px]"
            )}
          />
        </button>
      </div>

      {/* ===== MOBILE DROPDOWN ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[72px] left-0 right-0 z-40 
            bg-blue-950 border-b border-white/10 
            px-6 py-6"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={handleMobileClick}
                  className={cn(
                    "text-sm uppercase tracking-wider transition-colors",
                    activeSection === item.href
                      ? "text-blue-400"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}