"use client";

import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 60], [1, 0.98]);
  const navScale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;

      navItems.forEach((item) => {
        const section = document.getElementById(item.href);
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(item.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Logo = ({ size = "md" }: { size?: "sm" | "md" }) => (
    <a href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group pointer-events-auto">
      <div className={cn(
        "relative flex items-center justify-center bg-brand-ink rounded-xl group-hover:bg-brand-gold transition-all duration-500 shadow-lg",
        size === "sm" ? "w-8 h-8" : "w-10 h-10"
      )}>
        <span className={cn("text-brand-cream font-black select-none tracking-tighter", size === "sm" ? "text-sm" : "text-lg")}>
          HE
        </span>
      </div>
      <div className="flex flex-col">
        <span className={cn("font-black tracking-[0.2em] text-brand-ink uppercase leading-none", size === "sm" ? "text-[9px]" : "text-[11px]")}>
          Hasan
        </span>
        <span className={cn("font-bold tracking-[0.1em] text-brand-gold uppercase", size === "sm" ? "text-[7px]" : "text-[9px]")}>
          Ekkeri
        </span>
      </div>
    </a>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
  style={{ scale: navScale }}
  className={cn(
    "pointer-events-auto flex items-center justify-between w-full max-w-[1100px] mt-4 md:mt-6 px-5 md:px-8 py-2 md:py-3 transition-all duration-500 rounded-full border",
    /* UI FIX: Replaced heavy shadow with a refined border and subtle glow */
    isScrolled || isOpen
      ? "bg-brand-cream/80 backdrop-blur-xl border-brand-gold/20 shadow-[0_8px_32px_rgba(200,169,126,0.08)]" 
      : "bg-transparent border-transparent shadow-none"
  )}
>
  {/* NEW: Inner Glow for that 'Premium Glass' look */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
  
  <Logo size={isScrolled ? "sm" : "md"} />

  {/* Desktop Links - Adjusted spacing for better balance */}
  <div className="hidden md:flex items-center gap-10">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={`#${item.href}`}
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative",
          activeSection === item.href ? "text-brand-gold" : "text-brand-muted hover:text-brand-ink"
        )}
      >
        {item.label}
        {activeSection === item.href && (
          <motion.div layoutId="activeDot" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full" />
        )}
      </a>
    ))}
  </div>

  {/* CTA Button - Subtle elevation change */}
  <a href="#contact" className="hidden md:block text-[9px] uppercase tracking-widest font-black px-6 py-2.5 bg-brand-ink text-brand-cream rounded-full hover:bg-brand-gold hover:text-brand-ink transition-all shadow-sm active:scale-95">
    Connect
  </a>

  {/* Mobile Toggle */}
  <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 flex flex-col gap-1.5 items-end group">
    <span className={cn("h-0.5 bg-brand-ink transition-all duration-300", isOpen ? "w-6 rotate-45 translate-y-2" : "w-6")} />
    <span className={cn("h-0.5 bg-brand-ink transition-all duration-300", isOpen ? "opacity-0" : "w-4")} />
    <span className={cn("h-0.5 bg-brand-ink transition-all duration-300", isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5")} />
  </button>
</motion.nav>
      {/* Dropdown with matching Light Brown/Gold vibe */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-brand-cream border border-brand-gold/20 rounded-[2.5rem] p-8 shadow-2xl shadow-brand-gold/10 pointer-events-auto"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xl font-bold tracking-tight flex justify-between items-center",
                    activeSection === item.href ? "text-brand-gold" : "text-brand-ink"
                  )}
                >
                  {item.label}
                  <div className={cn("w-2 h-2 rounded-full bg-brand-gold transition-opacity", activeSection === item.href ? "opacity-100" : "opacity-0")} />
                </motion.a>
              ))}
              <div className="h-px bg-brand-gold/10 my-2" />
              <a href="#contact" onClick={() => setIsOpen(false)} className="w-full py-4 bg-brand-ink text-brand-cream rounded-2xl text-center font-bold uppercase tracking-widest text-xs">
                Start a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}