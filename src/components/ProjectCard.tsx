'use client';

import Image from 'next/image';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';
import { cn } from '@/lib/utils';

type Project = {
  year: string;
  title: string;
  category: string;
  problem: string;
  why: string;
  focus: string;
  stack: string[];
  github?: string;
  live?: string;
  image: string;
  imageAlt: string;
};

const projects: Project[] = [
  {
    year: '2026',
    title: 'LandWatch',
    category: 'Decision Support Prototype',
    problem: 'Officers could see the current status of a highway land acquisition, but nothing warned them which projects were drifting toward a serious delay until it had already happened.',
    why: 'It started as a Smart India Hackathon problem, and I wanted to see whether a delay warning could be made explainable enough to act on.',
    focus: 'I built the FastAPI service, the XGBoost risk model, and the Leaflet map, with SHAP behind each flag so it gives reasons instead of a bare score.',
    stack: ['Next.js', 'FastAPI', 'XGBoost', 'PostgreSQL'],
    github: 'https://github.com/ekkerihasan/Landwatch',
    image: '/landwatch.png',
    imageAlt: 'LandWatch land acquisition monitoring dashboard',
  },
  {
    year: '2026',
    title: 'VidyutMitra',
    category: 'Vernacular AI Advisor',
    problem: 'A MESCOM electricity bill arrives in English and in jargon, so the people paying it often cannot tell which charge went up, or which Karnataka scheme they already qualify for.',
    why: 'It was our first hackathon build. The fix could not be another dashboard — it had to reach people where they already are, in the language they read, without holding on to their bill.',
    focus: 'I handled the Twilio WhatsApp integration and the frontend design: getting bill photos and replies moving reliably through WhatsApp, and building the face of it.',
    stack: ['Flask', 'Gemini', 'Twilio', 'Supabase'],
    github: 'https://github.com/hackfest-dev/HF26-13',
    live: 'https://vidyut-mitra.wasih.tech/',
    image: '/vidyutmitra.png',
    imageAlt: 'VidyutMitra landing page showing a WhatsApp bill explanation in Kannada',
  },
  {
    year: '2025',
    title: 'Hospital Management System',
    category: 'Healthcare Operations',
    problem: 'The team needed one place to handle patient records, scheduling, and billing without bouncing between tools.',
    why: 'I wanted the workflow to read in a single pass for staff who use it all day.',
    focus: 'I built the patient flow, scheduling screens, and the data layer around them.',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
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
    github: 'https://github.com/ekkerihasan/SecureVault',
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
    github: 'https://github.com/ekkerihasan/quiz-game',
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
    github: 'https://github.com/ekkerihasan/flappy_ai',
    image: '/flappy.png',
    imageAlt: 'Flappy AI game preview',
  },
];

function Spread({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="group border-t border-black/8 pt-16 first:border-t-0 first:pt-0 md:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn('relative', flip ? 'lg:order-2' : 'lg:order-1')}>
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 rounded-[2rem] border border-brand-gold/30 transition-transform duration-500 ease-out',
              'group-hover:translate-x-0 group-hover:translate-y-0',
              flip ? '-translate-x-3 translate-y-3' : 'translate-x-3 translate-y-3',
            )}
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-brand-ink p-3 shadow-[0_28px_70px_rgba(17,17,17,0.14)] sm:p-4">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.4rem] bg-[#0E0E0E]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_60%)]"
              />
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        <div className={cn('relative', flip ? 'lg:order-1' : 'lg:order-2')}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-3 select-none text-[9rem] font-semibold leading-none tracking-[-0.08em] text-brand-ink/6 md:-top-20 md:text-[12rem]"
          >
            {num}
          </span>

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-brand-muted">
              <span className="text-brand-gold">{num}</span>
              <span className="h-px w-8 bg-brand-gold/40" />
              <span>{project.year}</span>
              <span className="h-px w-8 bg-black/10" />
              <span>{project.category}</span>
            </div>

            <h3 className="mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-brand-ink">
              {project.title}
            </h3>

            <p className="mt-5 max-w-xl border-l-2 border-brand-gold/40 pl-5 text-[17px] leading-8 text-brand-ink/80 md:text-[19px]">
              {project.problem}
            </p>

            <div className="mt-7 grid gap-5 border-t border-black/8 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-brand-muted/70">
                  Why I built it
                </p>
                <p className="mt-2 text-[14px] leading-6 text-brand-muted">
                  {project.why}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-brand-muted/70">
                  What I handled
                </p>
                <p className="mt-2 text-[14px] leading-6 text-brand-muted">
                  {project.focus}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-muted"
                >
                  {item}
                </span>
              ))}
            </div>

            {(project.live || project.github) && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-[#2B2B2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    <Globe size={14} />
                    Visit site
                    <ArrowUpRight size={14} className="text-white/60" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-5 py-3 text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold',
                      project.live
                        ? 'border border-black/12 bg-white/60 text-brand-ink hover:bg-white'
                        : 'bg-brand-ink text-white hover:bg-[#2B2B2B]',
                    )}
                  >
                    <Github size={14} />
                    View source
                    {!project.live && <ArrowUpRight size={14} className="text-white/60" />}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectPortal() {
  return (
    <section id="projects" className="section-padding relative isolate overflow-hidden">
      <BackgroundPattern variant="projects" />
      <div className="container-tight">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-gold/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-brand-gold">
              Selected Work
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-brand-ink">
            Projects that show how I think about quality.
          </h2>
        </div>

        <div className="relative z-10 mt-16 md:mt-20">
          {projects.map((project, index) => (
            <Spread key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
