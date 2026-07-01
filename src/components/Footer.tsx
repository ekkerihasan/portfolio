'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-10">
      <div className="container-tight">
        <div className="border-t border-black/6 pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-brand-gold">
                Hasan Ekkeri
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-brand-muted">
                I build web apps with React, Next.js, Node.js, Python, and Django. I prefer work that stays clear after the first read.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-[#E6E0D8] bg-white/45 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-brand-ink transition-colors duration-200 hover:bg-white"
                >
                  {link.label}
                </a>
              ))}
              <motion.a
                href="#about"
                whileHover={{ y: -2 }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E6E0D8] bg-white/60 text-brand-ink transition-colors duration-200 hover:bg-white"
                aria-label="Back to top"
              >
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-black/5 pt-6 text-[10px] uppercase tracking-[0.28em] text-brand-muted md:flex-row md:items-center md:justify-between">
            <span>© {year} Hasan Ekkeri</span>
            <span>Built with Next.js, Tailwind CSS, and Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}