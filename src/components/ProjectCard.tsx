'use client';

import { useEffect, useRef } from 'react';
import { FiGithub } from 'react-icons/fi';
import Button from './Button';
import './project.css';

const projectsData = [
  {
    title: 'Hospital Management System',
    overview:
      'A full-stack healthcare platform handling patient records, scheduling, billing, and administrative workflows with strong data integrity.',
    goal:
      'Architected a normalized relational database with optimized indexing ensuring ACID compliance and sub-second queries.',
    technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'SQL'],
    githubLink: 'https://github.com/ekkerihasan/RAHAH-HealthCare',
  },
  {
    title: 'Secure Vault (Password Manager)',
    overview:
      'A zero-knowledge credential manager built with strong encryption and secure authentication practices.',
    goal:
      'Implemented AES-256 encryption, PBKDF2 hashing, and JWT authentication for secure access control.',
    technologies: ['Django', 'Python', 'MongoDB', 'JWT'],
    githubLink: 'https://github.com/ekkerihasan',
  },
  {
    title: 'Authenticated Quiz Web App',
    overview:
      'A scalable quiz platform featuring authentication, score tracking, and performance history.',
    goal:
      'Designed stateless JWT authentication and optimized MySQL schema for efficient data retrieval.',
    technologies: ['Node.js', 'TypeScript', 'MySQL', 'JWT'],
    githubLink: 'https://github.com/ekkerihasan/quiz-game',
  },
  {
    title: 'Flappy AI',
    overview:
      'A reinforcement learning experiment where an AI agent learns gameplay using neuroevolution.',
    goal:
      'Built a genetic algorithm-based neural network optimizing jump timing using spatial pipe data.',
    technologies: ['Python', 'Pygame', 'NumPy'],
    githubLink: 'https://github.com/ekkerihasan/flappy_ai',
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-heading">
        <h2>
          Selected <span>Works</span>
        </h2>
      </div>

      <div className="projects-wrapper" ref={scrollRef}>
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            
            <div className="project-number">
              0{index + 1}
            </div>

            <h3 className="project-title">
              {project.title}
            </h3>

            <p className="project-overview">
              {project.overview}
            </p>

            <div className="project-goal">
              <h4>System Objective</h4>
              <p>{project.goal}</p>
            </div>

            <div className="project-tech">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-link">
              <Button href={project.githubLink}>
                Repository <FiGithub size={16} />
              </Button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
