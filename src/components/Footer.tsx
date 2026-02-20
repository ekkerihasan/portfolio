'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const footerNavLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative bg-[#020617] pt-24 pb-8 px-6 md:px-12 lg:px-24 xl:px-32 overflow-hidden flex flex-col items-center">
      
      {/* Animated Glowing Divider at the very top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] w-full bg-slate-900">
        <motion.div 
          className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute top-0 w-1/3"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="w-full max-w-[100rem] z-10">
        
        {/* Minimalist Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 mb-24 md:mb-40">
          
          {/* Brand/Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              <span className="text-slate-300 text-sm font-bold uppercase tracking-[0.3em]">Based in India</span>
            </div>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed font-medium">
              Architecting secure, high-performance digital experiences from database to deployment.
            </p>
          </motion.div>

          {/* Clean Horizontal Nav */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-8 gap-y-4"
          >
            {footerNavLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-slate-400 hover:text-white transition-colors duration-300 text-sm uppercase tracking-widest font-semibold"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>

          {/* Floating Action Button for Back to Top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="self-end md:self-auto hidden sm:block"
          >
            <button
              onClick={scrollToTop}
              className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-slate-800 shadow-2xl focus:outline-none overflow-hidden"
              aria-label="Scroll to top"
            >
              {/* Hover sweep background */}
               <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <ArrowUp className="w-6 h-6 text-slate-400 group-hover:text-white relative z-10 transition-colors duration-300 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </div>

        {/* Section Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12 opacity-50" />

        {/* Bottom Copyright Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <p className="text-slate-500 text-sm font-medium tracking-wide">
            © {year} Hasan Ekkeri. Built with passion.
          </p>
          
          {/* Mobile Back to top text toggle */}
          <button onClick={scrollToTop} className="sm:hidden text-blue-500 uppercase text-xs tracking-[0.2em] font-bold pb-2 border-b border-blue-500/30">
            Back to Top
          </button>
        </div>

      </div>

      {/* Massive Display Font (Screen Width Outlined Effect) */}
      <div className="w-full relative flex justify-center -mb-4 sm:-mb-6 md:-mb-10 lg:-mb-16 overflow-hidden select-none z-0 group cursor-default">
        {/* Mobile solid text fallback (easier to read) */}
        <h1 className="md:hidden font-black text-[15vw] leading-none whitespace-nowrap text-slate-900">
          HASAN
        </h1>

        {/* Desktop interactive outline text */}
        <motion.h1
          className="hidden md:block font-black text-[15vw] leading-[0.8] whitespace-nowrap tracking-tighter transition-all duration-700 ease-out text-transparent bg-clip-text"
          style={{ WebkitTextStroke: '2px rgba(59, 130, 246, 0.2)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "50px" }}
          whileHover={{ 
            color: 'rgba(59, 130, 246, 0.1)', 
            WebkitTextStroke: '2px rgba(59, 130, 246, 0.4)',
            textShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
          }}
        >
          HASAN EKKERI
        </motion.h1>
      </div>

    </footer>
  );
}
