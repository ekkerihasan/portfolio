'use client';

import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hassanekkeri2@gmail.com');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <section id="contact" className="w-full relative py-32 md:py-48 px-6 md:px-12 lg:px-24 xl:px-32 bg-[#020617] !mb-0 border-t border-slate-900/50 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="max-w-[100rem] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-[0.4em] text-blue-500 uppercase">Contact</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Ready to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">collaborate?</span>
            </h3>
          </div>
          <p className="text-slate-400 max-w-md text-xl md:text-2xl font-light leading-relaxed">
            Let's discuss architecture, backend solutions, or your next big project.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-rows-[auto]">
          
          {/* Main Hero Card (Large, 8 columns) */}
          <div className="md:col-span-12 lg:col-span-8 group relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-700 p-10 md:p-20 flex flex-col justify-end min-h-[450px]">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 mt-auto">
              <h4 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight tracking-tight">
                Currently open to <br/> new opportunities.
              </h4>
              <button 
                onClick={copyEmail}
                className="flex items-center gap-5 px-8 py-5 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white font-bold text-xl group/btn w-fit shadow-xl shadow-blue-600/20"
              >
                <Mail className="w-5 h-5" />
                {copiedUrl ? 'Email Copied!' : 'Say Hello'}
                {copiedUrl ? <Check className="w-5 h-5 ml-2" /> : <Copy className="w-5 h-5 ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />}
              </button>
            </div>
          </div>

          {/* Location/Time Card (4 columns) */}
          <div className="md:col-span-6 lg:col-span-4 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-slate-600 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/20 rounded-bl-full blur-2xl -z-10 group-hover:bg-slate-700/30 transition-colors duration-500" />
            <div className="w-12 h-12 rounded-full bg-slate-950/50 border border-slate-800 flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
            <h5 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Status</h5>
            <p className="text-white text-2xl font-bold">Online & Working</p>
            <p className="text-slate-500 mt-2">Available for freelance & full-time roles.</p>
          </div>

          {/* GitHub Card (6 columns) */}
          <a 
            href="https://github.com/ekkerihasan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:col-span-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 group hover:border-slate-500 hover:bg-slate-800/40 transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#020617] border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-white">
                <Github className="w-7 h-7" />
              </div>
              <h5 className="text-2xl font-bold text-white mb-2">GitHub</h5>
              <p className="text-slate-400">View exact architectures & code.</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-slate-950/50 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-500 shrink-0">
              <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" />
            </div>
          </a>

          {/* LinkedIn Card (6 columns) */}
          <a 
            href="https://www.linkedin.com/in/hassan-ekkeri-0a3a042b9/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:col-span-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 group hover:border-blue-500/50 hover:bg-[#0b1b3d]/40 transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative"
          >
            {/* Subtle blue accent blur built-in */}
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/10 rounded-tl-full blur-3xl -z-10 group-hover:bg-blue-600/20 transition-colors duration-500" />

            <div className="flex flex-col relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#020617] border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:border-blue-500/30">
                <Linkedin className="w-7 h-7 text-blue-400" />
              </div>
              <h5 className="text-2xl font-bold text-white mb-2">LinkedIn</h5>
              <p className="text-slate-400">Connect professionally.</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-slate-950/50 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-500 shrink-0 relative z-10">
              <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
