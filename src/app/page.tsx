import Navbar from '@/components/Navbar';
import About from '@/components/HeroNew';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Project from '@/components/ProjectCard';

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Home() {
  return (
    <main className="w-full relative z-10">
      <Navbar />
      <About />
      <Skills />
      <Project />
      <Contact />
      <footer className="pb-10">
        <div className="container-tight">
          <div className="border-t border-black/6 pt-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-brand-gold">
                  Hasan Ekkeri
                </p>
                <p className="mt-3 max-w-lg text-sm leading-6 text-brand-muted">
                  Software engineer portfolio focused on calm interfaces, reliable systems, and high-quality execution.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="rounded-full border border-[#E6E0D8] bg-white/45 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-brand-ink transition-colors duration-200 hover:bg-white"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#about"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E6E0D8] bg-white/60 text-brand-ink transition-colors duration-200 hover:bg-white"
                  aria-label="Back to top"
                >
                  <span className="text-sm">↗</span>
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-black/5 pt-6 text-[10px] uppercase tracking-[0.28em] text-brand-muted md:flex-row md:items-center md:justify-between">
              <span>© {new Date().getFullYear()} Hasan Ekkeri</span>
              <span>Built with Next.js, Tailwind CSS, and Framer Motion</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
