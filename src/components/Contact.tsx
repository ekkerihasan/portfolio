'use client';

import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hassanekkeri2@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full relative py-20 md:py-32 bg-brand-cream border-t border-black/5 overflow-hidden">
      {/* Background Ambience - Refined Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="container-tight relative z-10 px-6">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-black mb-4 block">
            Connection
          </span>
          <h2 className="text-4xl md:text-7xl font-semibold text-brand-ink tracking-tighter leading-none">
            Let's build <br className="hidden md:block" /> 
            <span className="text-brand-gold italic font-medium">something solid.</span>
          </h2>
        </div>

        {/* Bento Grid - Responsive optimization */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          
          {/* Main Hero Card (Large) - Now more compact on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-brand-ink p-8 md:p-16 flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-all duration-700 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-brand-gold/25 transition-all duration-700" />
            
            <div className="relative z-10">
              <h4 className="text-2xl md:text-5xl font-medium text-brand-cream mb-8 leading-[1.1] tracking-tight max-w-xl">
                I'm currently looking for <span className="text-brand-gold italic">new challenges</span> in backend engineering.
              </h4>
            </div>

            <button 
              onClick={copyEmail}
              className="relative z-10 flex items-center gap-4 px-6 md:px-10 py-4 md:py-5 rounded-full bg-brand-gold hover:bg-white text-brand-ink font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-500 w-full md:w-fit group/btn shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span className="truncate">{copied ? 'Email Copied' : 'hassanekkeri2@gmail.com'}</span>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-40 group-hover/btn:opacity-100 transition-opacity" />}
            </button>
          </motion.div>

          {/* Availability Card - Cleaned up mobile padding */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="md:col-span-6 lg:col-span-4 rounded-[2rem] md:rounded-[3rem] bg-white border border-black/5 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:border-brand-gold/30"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center border border-brand-gold/10">
                <div className="w-2.5 h-2.5 bg-brand-gold rounded-full animate-pulse shadow-[0_0_12px_#C8A97E]" />
              </div>
              <div className="space-y-1">
                <h5 className="text-[10px] uppercase tracking-widest font-black text-brand-gold">Status</h5>
                <p className="text-2xl font-bold text-brand-ink leading-tight">Available for <br/> new projects</p>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-brand-muted mt-8 border-t border-black/5 pt-4">Remote • Global</p>
          </motion.div>

          {/* GitHub Card - Responsive height */}
          <motion.a 
            href="https://github.com/ekkerihasan" 
            target="_blank" 
            className="md:col-span-6 rounded-[2rem] md:rounded-[2.5rem] bg-brand-paper/50 backdrop-blur-sm border border-black/5 p-6 md:p-8 group hover:bg-white transition-all duration-500 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-ink flex items-center justify-center text-white transition-all duration-500 group-hover:bg-brand-gold">
                <Github className="w-6 h-6 md:w-8 md:h-8 group-hover:text-brand-ink transition-colors" />
              </div>
              <div>
                <h5 className="text-lg md:text-xl font-bold text-brand-ink">GitHub</h5>
                <p className="text-xs text-brand-muted font-medium">Source Codes & Architecture</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-brand-ink group-hover:border-brand-ink transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-brand-ink group-hover:text-white transition-colors" />
            </div>
          </motion.a>

          {/* LinkedIn Card */}
          <motion.a 
            href="https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/" 
            target="_blank" 
            className="md:col-span-6 rounded-[2rem] md:rounded-[2.5rem] bg-brand-paper/50 backdrop-blur-sm border border-black/5 p-6 md:p-8 group hover:bg-white transition-all duration-500 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0077b5] flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110">
                <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h5 className="text-lg md:text-xl font-bold text-brand-ink">LinkedIn</h5>
                <p className="text-xs text-brand-muted font-medium">Professional Network</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-brand-ink group-hover:border-brand-ink transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-brand-ink group-hover:text-white transition-colors" />
            </div>
          </motion.a>

        </div>
      </div>
      
      {/* Refined Footer Addition */}
      <footer className="mt-20 md:mt-32 py-10 border-t border-black/5 bg-brand-cream">
        <div className="container-tight px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-brand-muted">
          <span className="hover:text-brand-ink transition-colors">© 2026 HASAN EKKERI</span>
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-brand-gold/30" />
            <span className="text-brand-gold">Architecting the Back-End</span>
          </div>
        </div>
      </footer>
    </section>
  );
}