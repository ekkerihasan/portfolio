'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";

const footerNavLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter" },
  { icon: Mail, href: "mailto:hasan@example.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative bg-brand-cream pt-24 pb-8 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Refined Divider: Subtle Gold Line with Scanning Animation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] w-full bg-black/5">
        <motion.div 
          className="h-full bg-brand-gold absolute top-0 w-1/4"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-[1100px] z-10 w-full">
        
        {/* Top Row: Brand Status & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          
          {/* Brand/Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_10px_#C8A97E]" />
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">Available for projects</span>
            </div>
            <p className="text-brand-muted max-w-sm text-base leading-relaxed font-medium italic">
              Architecting secure, high-performance digital experiences from database to deployment.
            </p>
            
            {/* Integrated Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-brand-gold transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation & Action */}
          <div className="flex flex-col md:items-end gap-8">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-x-10 gap-y-4 md:justify-end"
            >
              {footerNavLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-brand-muted hover:text-brand-ink transition-colors duration-300 text-[11px] uppercase tracking-[0.2em] font-bold"
                >
                  {link.name}
                </a>
              ))}
            </motion.nav>

            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-black/5 bg-white shadow-sm transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-brand-muted group-hover:text-brand-gold transition-colors duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-t border-black/5 pt-12">
          <p className="text-brand-muted text-[11px] font-bold tracking-widest uppercase">
            © {year} Hasan Ekkeri — Built with passion.
          </p>
          <div className="flex gap-6">
             <span className="text-[10px] text-brand-gold/40 font-bold uppercase tracking-widest">Next.js 15</span>
             <span className="text-[10px] text-brand-gold/40 font-bold uppercase tracking-widest">Tailwind CSS</span>
             <span className="text-[10px] text-brand-gold/40 font-bold uppercase tracking-widest">Framer Motion</span>
          </div>
        </div>
      </div>

      {/* Massive Display Font: Professional Bronze Edition */}
      <div className="w-full relative mt-20 mb-[-1.5vw] flex justify-center items-end overflow-hidden select-none pointer-events-none">
        <motion.h1
          className="font-black leading-[0.7] text-center tracking-tighter"
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 13rem)', 
            color: '#8D734A', 
            opacity: 0.12, 
            maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.12, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          HASAN EKKERI
        </motion.h1>
      </div>
    </footer>
  );
}