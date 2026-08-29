"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.href);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[min(90vw,1180px)] -translate-x-1/2 pointer-events-none">
      <nav className="pointer-events-auto rounded-3xl border border-black/5 bg-white/75 backdrop-blur-[20px] shadow-[0_16px_40px_rgba(17,17,17,0.06)]">
        <div className="flex h-18 items-center justify-between gap-4 px-4 md:px-6">
          <a href="#about" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-ink text-sm font-semibold text-white">
              HE
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.28em] text-brand-ink">Hasan Ekkeri</span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-brand-muted">Software Engineer</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.28em] text-brand-muted">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className={cn(
                  "transition-colors duration-200 hover:text-brand-ink",
                  activeSection === item.href && "text-brand-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex h-11 items-center rounded-full bg-brand-ink px-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-200 hover:bg-[#2B2B2B]"
            >
              Let&apos;s Talk
            </a>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white text-brand-ink transition-colors duration-200 hover:bg-black/5 md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-black/5 px-4 pb-4 pt-3 md:hidden">
            <div className="grid gap-2 rounded-3xl bg-white/70 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-brand-ink transition-colors duration-200 hover:bg-black/3",
                    activeSection === item.href && "bg-black/3",
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={15} className="text-brand-muted" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-brand-ink px-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}