'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';

const projectsData = [
  {
    title: 'Hospital Management System',
    overview: 'A full-stack healthcare platform handling patient records, scheduling, and billing.',
    goal: 'Architected a normalized relational database with optimized indexing ensuring ACID compliance.',
    technologies: ['Node.js', 'PostgreSQL', 'REST API'],
    githubLink: 'https://github.com/ekkerihasan/RAHAH-HealthCare',
    color: '#FDFCFB' // Cream White
  },
  {
    title: 'Secure Vault',
    overview: 'A zero-knowledge credential manager built with strong encryption practices.',
    goal: 'Implemented AES-256 encryption, PBKDF2 hashing, and JWT for secure access control.',
    technologies: ['Python', 'Django', 'MongoDB'],
    githubLink: 'https://github.com/ekkerihasan',
    color: '#F9F6F0' // Bone White
  },
  {
    title: 'Authenticated Quiz App',
    overview: 'A scalable quiz platform featuring score tracking and performance history.',
    goal: 'Designed stateless JWT authentication and optimized MySQL schema for high-speed retrieval.',
    technologies: ['TypeScript', 'MySQL', 'JWT'],
    githubLink: 'https://github.com/ekkerihasan/quiz-game',
    color: '#F5F1E9' // Light Khaki
  },
  {
    title: 'Flappy AI',
    overview: 'A reinforcement learning experiment where an agent learns gameplay via neuroevolution.',
    goal: 'Built a genetic algorithm-based neural network optimizing jump timing using spatial data.',
    technologies: ['Python', 'NumPy', 'Pygame'],
    githubLink: 'https://github.com/ekkerihasan/flappy_ai',
    color: '#F0EAD6' // Eggshell Gold
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} id="projects" className="relative bg-brand-cream py-20">
      <div className="container-tight mb-20">
        <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4 block">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-6xl font-semibold text-brand-ink tracking-tight">
          Selected <span className="text-brand-gold italic font-medium">Works.</span>
        </h2>
      </div>

      <div className="flex flex-col items-center">
        {projectsData.map((project, i) => {
          const targetScale = 1 - ( (projectsData.length - i) * 0.05);
          return (
            <ProjectCard 
              key={i} 
              i={i} 
              {...project} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({ i, title, overview, goal, technologies, githubLink, color, progress, range, targetScale }: any) {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        style={{ 
          scale, 
          backgroundColor: color,
          top: `calc(-5vh + ${i * 25}px)` 
        }}
        className="relative w-full max-w-[900px] h-[500px] md:h-[600px] rounded-[2.5rem] border border-black/5 shadow-2xl p-8 md:p-12 flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[15rem] font-black leading-none">{i + 1}</h1>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <span className="text-xs font-black tracking-widest text-brand-gold uppercase bg-brand-cream px-4 py-2 rounded-full border border-brand-gold/10">
              Project 0{i + 1}
            </span>
            <a 
              href={githubLink} 
              target="_blank" 
              className="w-12 h-12 rounded-full bg-brand-ink flex items-center justify-center text-brand-cream hover:bg-brand-gold hover:text-brand-ink transition-all duration-500"
            >
              <FiArrowUpRight size={24} />
            </a>
          </div>

          <h3 className="text-3xl md:text-5xl font-semibold text-brand-ink mb-6 tracking-tighter">
            {title}
          </h3>
          
          <p className="text-brand-muted text-lg max-w-xl mb-10 leading-relaxed">
            {overview}
          </p>

          <div className="p-6 bg-brand-ink text-brand-cream rounded-3xl border border-white/10 max-w-2xl">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-2">
              System Objective
            </h4>
            <p className="text-sm font-medium leading-relaxed italic opacity-90">
              "{goal}"
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {technologies.map((tech: string) => (
            <span key={tech} className="px-4 py-2 bg-white/50 border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-ink">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}