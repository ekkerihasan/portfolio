'use client';
import { ArrowUp } from 'lucide-react';
const links = [
  { label: 'About', href: '#about' },
  { label: 'Activity', href: '#github' },
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
              <p className="text-meta uppercase tracking-[0.2em] text-rust">
                Hasan Ekkeri
              </p>
              <p className="mt-3 max-w-md text-small leading-6 text-stone">
                I build web apps with React, Next.js, Node.js, Python, and
                Django. I prefer work that stays clear after the first read.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-[rgba(21,23,26,0.12)] bg-white/45 px-4 py-2 text-small text-basalt transition-colors duration-200 hover:bg-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#about"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(21,23,26,0.12)] bg-white/60 text-basalt transition-colors duration-200 hover:bg-white"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-black/5 pt-6 text-meta uppercase tracking-[0.2em] text-stone md:flex-row md:items-center md:justify-between">
            <span>© {year} Hasan Ekkeri</span>
            <span>Built with Next.js and Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
