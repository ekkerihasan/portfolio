'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';

const projects = [
  {
    year: '2025',
    title: 'Hospital Management System',
    category: 'Healthcare Operations',
    problem: 'The team needed one place to handle patient records, scheduling, and billing without bouncing between tools.',
    why: 'I wanted the workflow to read in a single pass for staff who use it all day.',
    focus: 'I built the patient flow, scheduling screens, and the data layer around them.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    github: 'https://github.com/ekkerihasan',
    image: '/healthcare.png',
    imageAlt: 'Healthcare management dashboard preview',
  },
  {
    year: '2026',
    title: 'Secure Vault',
    category: 'Security-first Utility',
    problem: 'I wanted a credential tool that felt easier to trust than a notes app or a loose spreadsheet.',
    why: 'It was a practical way to work through encryption, access control, and storage rules.',
    focus: 'I handled the encryption flow, auth boundaries, and persistence logic.',
    stack: ['Python', 'Django', 'AES-256'],
    github: 'https://github.com/ekkerihasan',
    image: '/passmanager.png',
    imageAlt: 'Password manager interface preview',
  },
  {
    year: '2025',
    title: 'Authenticated Quiz Platform',
    category: 'Internal Tooling',
    problem: 'Students needed a quiz flow with role-based access instead of scattered logic across pages.',
    why: 'I wanted one system to handle both the participant flow and the admin side.',
    focus: 'I built the auth flow, scoring logic, and the management screens.',
    stack: ['TypeScript', 'JWT', 'MySQL'],
    github: 'https://github.com/ekkerihasan',
    image: '/quiz.png',
    imageAlt: 'Quiz platform interface preview',
  },
  {
    year: '2025',
    title: 'Flappy AI',
    category: 'Exploratory ML',
    problem: 'I wanted a small environment to test learning loops without setting up a full product.',
    why: 'It was a clean way to see how a model reacts to a simple feedback loop.',
    focus: 'I built the simulation, the experiment loop, and the tuning logic.',
    stack: ['Python', 'NumPy', 'Pygame'],
    github: 'https://github.com/ekkerihasan',
    image: '/flappy.png',
    imageAlt: 'Flappy AI game preview',
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
              className="group overflow-hidden rounded-3xl border border-white/10 bg-brand-ink text-white shadow-[0_18px_48px_rgba(17,17,17,0.16)] backdrop-blur-sm transition-colors duration-200 hover:bg-[#171717]"
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                <div className="order-2 p-6 lg:order-1 lg:p-8 xl:p-10">
                  <div className="max-w-160">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55">
                      <span>{project.year}</span>
                      <span className="h-px w-8 bg-white/15" />
                      <span>{project.category}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white md:text-3xl">
                      {project.title}
                    </h3>
                    <div className="mt-5 grid gap-4 text-[15px] leading-7 text-white/78 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                          The problem
                        </p>
                        <p className="mt-2">{project.problem}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                          Why I built it
                        </p>
                        <p className="mt-2">{project.why}</p>
                      </div>
                    </div>

                    <div className="mt-4 max-w-xl border-l border-white/10 pl-4 text-[15px] leading-7 text-white/72">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                        What I handled
                      </p>
                      <p className="mt-2">{project.focus}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-white/70 transition-transform duration-200 group-hover:translate-x-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-white/12"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]">
                      <span>Open</span>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="mr-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                      Stack
                    </span>
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/72"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="order-1 relative min-h-80 border-b border-white/10 bg-[#0E0E0E] lg:order-2 lg:min-h-full lg:border-b-0 lg:border-l">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_58%)]" />
                  <div className="relative h-full p-4 sm:p-5 lg:p-6 xl:p-7">
                    <div className="relative h-[clamp(18rem,46vw,31rem)] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:p-4 lg:h-full lg:min-h-112">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw"
                        className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}