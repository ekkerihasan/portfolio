'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';

const projects = [
  {
    year: '2025',
    title: 'Hospital Management System',
    category: 'Healthcare Operations',
    description:
      'A platform for organizing patient records, scheduling, and billing flows with a cleaner operational experience.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    year: '2026',
    title: 'Secure Vault',
    category: 'Security-first Utility',
    description:
      'A credential manager built around encryption, access safety, and a disciplined approach to sensitive data.',
    stack: ['Python', 'Django', 'AES-256'],
  },
  {
    year: '2025',
    title: 'Authenticated Quiz Platform',
    category: 'Internal Tooling',
    description:
      'A role-aware quiz system with authentication, leaderboard logic, and a straightforward interface for usage at scale.',
    stack: ['TypeScript', 'JWT', 'MySQL'],
  },
  {
    year: '2025',
    title: 'Flappy AI',
    category: 'Exploratory ML',
    description:
      'An experiment in simulation, learning loops, and iterative tuning, built as a lightweight way to study model behavior.',
    stack: ['Python', 'NumPy', 'Pygame'],
  },
];

export default function ProjectPortal() {
  return (
    <section id="projects" className="section-padding relative isolate overflow-hidden">
      <BackgroundPattern variant="projects" />
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative z-10 max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-gold/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-brand-gold">
              Selected Work
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-brand-ink">
            Projects that show how I think about quality.
          </h2>
        </motion.div>

        <div className="relative z-10 mt-14 grid gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-3xl border border-black/6 bg-white/45 p-6 backdrop-blur-sm transition-colors duration-200 hover:bg-white/65"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-160">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#888888]">
                    <span>{project.year}</span>
                    <span className="h-px w-8 bg-[#E6E0D8]" />
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-brand-ink md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-brand-muted">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#888888] transition-transform duration-200 group-hover:translate-x-1">
                  <span className="text-[10px] uppercase tracking-[0.28em]">Open</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#E6E0D8] bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-brand-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}