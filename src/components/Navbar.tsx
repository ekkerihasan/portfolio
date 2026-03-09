'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// 1. Define types for Nav Items
interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: 'about' },
  { label: 'Skills', href: 'skills' },
  { label: 'Projects', href: 'projects' },
  { label: 'Contact', href: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Type the timer ref (NodeJS.Timeout for browser environment)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 60], [1, 0.98]);
  const navScale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // 3. Type the custom event listener
    const handleProjectView = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      const active = !!customEvent.detail;
      setIsModalOpen(active);
      setIsVisible(!active);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      const scrollPosition = currentScrollY + 150;

      navItems.forEach((item) => {
        const section = document.getElementById(item.href);
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(item.href);
        }
      });

      if (currentScrollY < 100 && !isModalOpen) {
        setIsVisible(true);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        return;
      }

      if (isModalOpen) return;

      setIsVisible(true);

      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

      scrollTimerRef.current = setTimeout(() => {
        setIsOpen((prevOpen) => {
          if (!prevOpen) setIsVisible(false);
          return prevOpen;
        });
      }, 1200);
    };

    // Use the same event name ('toggleNavbar' or 'project-view-active') consistently
    window.addEventListener('toggleNavbar' as any, handleProjectView);
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('toggleNavbar' as any, handleProjectView);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [isModalOpen]);

  // 4. Type the Logo component props
  const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => (
    <a href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group pointer-events-auto">
      <div className={cn(
        'relative flex items-center justify-center bg-brand-ink rounded-xl group-hover:bg-brand-gold transition-all duration-500 shadow-lg',
        size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
      )}>
        <span className={cn('text-brand-cream font-black select-none tracking-tighter', size === 'sm' ? 'text-sm' : 'text-lg')}>
          HE
        </span>
      </div>
      <div className="flex flex-col">
        <span className={cn('font-black tracking-[0.2em] text-brand-ink uppercase leading-none', size === 'sm' ? 'text-[9px]' : 'text-[11px]')}>
          Hasan
        </span>
        <span className={cn('font-bold tracking-[0.1em] text-brand-gold uppercase', size === 'sm' ? 'text-[7px]' : 'text-[9px]')}>
          Ekkeri
        </span>
      </div>
    </a>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            key="desktop-nav"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            style={{ scale: navScale }}
            className={cn(
              'pointer-events-auto flex items-center justify-between w-full max-w-[1100px] mt-4 md:mt-6 px-5 md:px-8 py-2 md:py-3 transition-all duration-500 rounded-full border',
              isScrolled || isOpen
                ? 'bg-brand-cream/80 backdrop-blur-xl border-brand-gold/20 shadow-[0_8px_32px_rgba(200,169,126,0.08)]'
                : 'bg-transparent border-transparent shadow-none'
            )}
          >
            {/* ... Rest of your JSX remains the same ... */}
            <Logo size={isScrolled ? 'sm' : 'md'} />
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative',
                    activeSection === item.href ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-ink'
                  )}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.div layoutId="activeDot" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full" />
                  )}
                </a>
              ))}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 flex flex-col gap-1.5 items-end group">
              <span className={cn('h-0.5 bg-brand-ink transition-all duration-300', isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6')} />
              <span className={cn('h-0.5 bg-brand-ink transition-all duration-300', isOpen ? 'opacity-0' : 'w-4')} />
              <span className={cn('h-0.5 bg-brand-ink transition-all duration-300', isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5')} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}