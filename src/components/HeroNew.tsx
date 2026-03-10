'use client';

import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import Image from 'next/image';

export default function Hero() {
  const handleDownloadResume = () => {
    const resumeUrl = '/hasan-ekkeri-resume.pdf'; 
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Hasan_Ekkeri_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      /* Changed: pt-32 for mobile to sit under navbar, md:pt-0 for desktop centering */
      className="relative flex items-start md:items-center bg-brand-cream pt-32 pb-12 md:py-0 md:min-h-screen overflow-hidden"
    >
      <div className="container-tight w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start space-y-5 md:space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-3 md:space-y-4 w-full">
              {/* Top Label */}
              <div className="flex items-center gap-3">
                <div className="w-8 md:w-10 h-[1px] bg-brand-gold/40" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold">
                  Hasan Ekkeri
                </span>
              </div>

              {/* Headline - Adjusted size for mobile to feel "fuller" */}
              <h1 className="text-[2.75rem] leading-[1.1] md:text-7xl lg:text-8xl font-semibold text-brand-ink tracking-tighter">
                Software <br />
                <span className="text-brand-gold italic font-medium">Developer</span>
              </h1>

              {/* Subtext */}
              <p className="text-[15px] md:text-xl text-brand-muted leading-relaxed max-w-lg">
                I build secure, scalable backend systems and full-stack solutions
                with a focus on database design and information security.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 w-full sm:w-auto">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 sm:flex-none text-center px-6 py-4 bg-brand-ink text-brand-cream rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-ink transition-all shadow-lg"
              >
                View Work
              </button>
              
              <button
                onClick={handleDownloadResume}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border-2 border-brand-ink text-brand-ink rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-brand-ink hover:text-brand-cream transition-all group"
              >
                Resume <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right: The Professional Portrait - HIDDEN ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-5 justify-end"
          >
            <div className="relative w-full aspect-[4/5] max-w-[400px]">
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-brand-gold/20 rounded-[2.5rem] -z-10" />
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/pfp1.png" 
                  alt="Hasan Ekkeri"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}