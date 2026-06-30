'use client';

import { motion } from 'framer-motion';
import BackgroundPattern from '@/components/BackgroundPattern';

const capabilities = [
  {
    title: 'Frontend systems',
    description:
      'Designing React and Next.js interfaces with strong hierarchy, accessible interactions, and stable performance.',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & data',
    description:
      'Building dependable server logic, API layers, and database structures with security and maintainability in mind.',
    items: ['Node.js', 'Python', 'Django', 'PostgreSQL'],
  },
  {
    title: 'Product delivery',
    description:
      'Shipping polished features with careful motion, clear copy, and a bias toward software that feels calm to use.',
    items: ['Framer Motion', 'UI systems', 'Authentication', 'Responsive design'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative isolate overflow-hidden">
      <BackgroundPattern variant="about" />
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-gold/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-brand-gold">
              What I Build
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-brand-ink">
            Focused engineering for products that need to feel premium.
          </h2>
          <p className="mt-5 max-w-136 text-[16px] leading-7 text-brand-muted">
            I prefer systems that are easy to maintain, simple to understand, and deliberate in every interaction.
          </p>
        </motion.div>

        <div className="relative z-10 mt-14 grid gap-5 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.35 }}
              className="rounded-3xl border border-black/6 bg-white/45 p-7 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold tracking-[-0.04em] text-brand-ink">
                {capability.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-brand-muted">
                {capability.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {capability.items.map((item) => (
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