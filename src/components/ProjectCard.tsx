'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiGithub, FiShield, FiDatabase, FiCpu } from 'react-icons/fi';

const projects = [
  {
    id: 'hms',
    year: '2025',
    title: 'Hospital Management',
    tag: 'Full-stack Healthcare',
    tech: ['Node.js', 'PostgreSQL', 'Express'],
    details: 'A comprehensive healthcare platform designed to digitize patient records and streamline clinical workflows. This project reflects work similar to the GreenHeart-AI assistant developed for Sustainathon.',
    features: ['Real-time Scheduling', 'Secure Patient Records', 'Automated Billing Systems'],
    icon: <FiDatabase />
  },
  {
    id: 'vault',
    year: '2026',
    title: 'Secure Vault',
    tag: 'Information Security',
    tech: ['Python', 'Django', 'AES-256'],
    details: 'A zero-knowledge credential manager implementing PBKDF2 and AES-256 for end-to-end encryption, focusing on system security and modern protocols.',
    features: ['Zero-Knowledge Architecture', 'AES-256 Encryption', 'Automated Key Rotation'],
    icon: <FiShield />
  },
  {
    id: 'quiz',
    year: '2025',
    title: 'Authenticated Quiz',
    tag: 'System Design',
    tech: ['TypeScript', 'MySQL', 'JWT'],
    details: 'A scalable quiz platform featuring MySQL database design and JWT security, optimized for RESTful APIs and relational architecture.',
    features: ['JWT Authentication', 'Leaderboard Logic', 'Role-Based Access'],
    icon: <FiCpu />
  },
  {
    id: 'ai',
    year: '2025',
    title: 'Flappy AI',
    tag: 'Machine Learning',
    tech: ['Python', 'NumPy', 'Pygame'],
    details: 'A reinforcement learning experiment using neuroevolution and computer vision principles, optimized with NumPy for high-performance matrix calculations.',
    features: ['Neural Network Training', 'Genetic Algorithms', 'Real-time Visualization'],
    icon: <FiCpu />
  }
];

export default function ProjectPortal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // LOGIC TO HIDE NAVBAR: Disable body scroll and signal Navbar to hide
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('toggleNavbar', { detail: false }));
    } else {
      // Changed to empty string to properly revert to CSS defaults
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('toggleNavbar', { detail: true }));
    }
    // Cleanup ensures scroll is restored if component unmounts while modal is open
    return () => { document.body.style.overflow = ''; };
  }, [selectedId]);

  return (
    /* Added id="projects" for scrolling and scroll-mt-32 to account for fixed navbar height */
    <section 
      id="projects" 
      className="bg-brand-cream py-32 px-6 md:px-12 min-h-screen scroll-mt-32"
    >
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-24">
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Archive</span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-brand-ink mt-2">Selected Works</h2>
        </header>

        {/* LIST VIEW */}
        <div className="space-y-0 border-t border-black/5">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="group border-b border-black/5 py-10 cursor-pointer flex justify-between items-center transition-all duration-500 hover:bg-black/[0.01]"
            >
              <div className="flex gap-12 items-center">
                <span className="text-[10px] font-mono text-black/30 w-8">{project.year}</span>
                <h3 className="text-2xl md:text-3xl font-medium text-brand-ink group-hover:text-brand-gold transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden md:block text-[10px] uppercase tracking-widest text-black/40 font-bold">{project.tag}</span>
                <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-brand-ink group-hover:text-white transition-all">
                  <FiArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DETAILED OVERLAY - High Z-Index covers everything */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
              />
              
              <motion.div
                layoutId={selectedId}
                className="bg-brand-cream w-full h-full md:h-fit md:max-h-[90vh] md:max-w-6xl md:rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row border border-black/5"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-brand-ink text-white flex items-center justify-center hover:bg-brand-gold transition-colors"
                >
                  <FiX size={20} />
                </button>

                {/* Case Study Visual */}
                <div className="w-full md:w-5/12 bg-brand-gold/5 flex items-center justify-center p-16 border-r border-black/5">
                  <div className="text-9xl text-brand-gold/20">
                    {projects.find(p => p.id === selectedId)?.icon}
                  </div>
                </div>

                {/* Case Study Content */}
                <div className="flex-1 p-10 md:p-20 overflow-y-auto">
                  {projects.filter(p => p.id === selectedId).map(p => (
                    <div key={p.id} className="space-y-12">
                      <header>
                        <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.2em] font-bold">Detail View</span>
                        <h2 className="text-4xl md:text-5xl font-medium text-brand-ink tracking-tighter mt-4">{p.title}</h2>
                        <p className="text-brand-muted mt-6 leading-relaxed">{p.details}</p>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-black/5">
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-brand-ink tracking-widest">Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map(t => <span key={t} className="px-3 py-1 bg-white border border-black/5 text-[9px] font-bold rounded-full">{t}</span>)}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-[10px] uppercase font-bold text-brand-ink tracking-widest">Key Features</h4>
                          <ul className="text-[11px] space-y-2 text-brand-muted font-medium">
                            {p.features.map(f => <li key={f} className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-gold rounded-full"/> {f}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4">
                        <a href="https://github.com/ekkerihasan" target="_blank" className="inline-flex items-center gap-4 bg-brand-ink text-brand-cream px-10 py-5 rounded-full text-xs font-bold hover:bg-brand-gold transition-all shadow-xl">
                          <FiGithub size={18} /> View GitHub
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}