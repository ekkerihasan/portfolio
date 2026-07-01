'use client';

import { motion } from 'framer-motion';
type SkillItem = {
  name: string;
  note: string;
};

type SkillGroup = {
  label: string;
  items: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', note: 'Client logic, utilities, and interaction handling.' },
      { name: 'TypeScript', note: 'Used here and in most structured React work.' },
      { name: 'Python', note: 'My default for backend work and scripts.' },
      { name: 'SQL', note: 'For shaping data instead of just reading it.' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', note: 'Most of my interface work starts here.' },
      { name: 'Next.js', note: 'Routing, rendering, and portfolio pages.' },
      { name: 'Tailwind CSS', note: 'Keeps styling consistent without noise.' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', note: 'APIs, server logic, and lightweight tooling.' },
      { name: 'Express', note: 'Straightforward request handling.' },
      { name: 'Django', note: 'Useful when the project needs structure.' },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', note: 'My usual choice for relational data.' },
      { name: 'MySQL', note: 'Used in quiz and auth-style projects.' },
      { name: 'Schema design', note: 'I like to think through the model first.' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', note: 'Used on every project I keep in shape.' },
      { name: 'VS Code', note: 'Where most of the work happens.' },
      { name: 'Figma', note: 'Helpful for checking layout and spacing.' },
      { name: 'Docker', note: 'When I want the setup to behave the same everywhere.' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative isolate overflow-hidden bg-white">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-black/10" />
            <span className="text-[10px] font-medium uppercase tracking-[0.36em] text-black/50">
              Toolbox
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-black">
            Stack I reach for.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-black/62 sm:text-[17px]">
            I keep the stack small and practical. These are the tools I reach for when I need to move from layout to backend to data without switching styles or chasing trends.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut', delay: 0.03 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 border-y border-black/10"
        >
          <div className="grid divide-y divide-black/10 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {skillGroups.map((group) => (
              <section
                key={group.label}
                className="px-0 py-6 first:pt-5 last:pb-5 sm:py-7 lg:px-6 lg:py-7"
              >
                <p className="px-5 text-[10px] font-medium uppercase tracking-[0.36em] text-black/45 lg:px-0">
                  {group.label}
                </p>
                <ul className="mt-5">
                  {group.items.map((item) => (
                    <li key={item.name} className="group border-t border-black/6 first:border-t-0 first:pt-0 last:pb-0">
                      <motion.button
                        type="button"
                        whileHover={{ backgroundColor: '#111111', color: '#FFFFFF' }}
                        whileTap={{ scale: 0.99, backgroundColor: '#111111', color: '#FFFFFF' }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="w-full text-left mx-3 rounded-xl px-3 py-3 transition-colors duration-150 lg:mx-0 lg:px-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-[14px] font-medium tracking-[-0.03em] text-black transition-colors duration-150 group-hover:text-white sm:text-[15px]">
                            {item.name}
                          </span>
                          <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/35 transition-colors duration-150 group-hover:text-white/45">
                            {group.label}
                          </span>
                        </div>
                        <p className="mt-2 max-w-sm overflow-hidden text-[13px] leading-6 text-black/52 opacity-0 max-h-0 transition-all duration-150 ease-out group-hover:max-h-20 group-hover:opacity-100 group-hover:text-white/72 group-focus-visible:max-h-20 group-focus-visible:opacity-100 group-focus-visible:text-white/72 group-active:max-h-20 group-active:opacity-100 group-active:text-white/72">
                          {item.note}
                        </p>
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
