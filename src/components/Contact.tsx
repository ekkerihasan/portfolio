'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/ekkerihasan', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/', icon: Linkedin },
  { label: 'Email', href: 'mailto:hassanekkeri2@gmail.com', icon: Mail },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('hassanekkeri2@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="section-padding relative isolate overflow-hidden pb-24 md:pb-28">
      <BackgroundPattern variant="contact" />
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
              Contact
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-brand-ink">
            If you need someone who can own a feature end to end, email is the fastest way to reach me.
          </h2>
          <p className="mt-5 max-w-136 text-[16px] leading-7 text-brand-muted">
            I read email first. If the role is a fit, send a note and I&apos;ll reply directly.
          </p>
        </motion.div>

        <div className="relative z-10 mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl border border-black/6 bg-brand-ink p-7 text-white"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-lg">
                <p className="text-[10px] uppercase tracking-[0.34em] text-brand-gold">
                  Availability
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                  Open to internship roles and small product work.
                </p>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-white/70">
                  I work best on React, Next.js, and backend tasks that need to stay simple for the next person who touches them.
                </p>
              </div>

              <button
                onClick={copyEmail}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[10px] font-medium uppercase tracking-[0.28em] text-brand-ink transition-colors duration-200 hover:bg-brand-paper"
              >
                {copied ? 'Copied' : 'Copy email'}
                <Copy size={14} />
              </button>
            </div>

            <a
              href="mailto:hassanekkeri2@gmail.com"
              className="mt-8 inline-flex items-center gap-3 text-[15px] text-white/80 transition-colors duration-200 hover:text-white"
            >
              <Mail size={16} className="text-brand-gold" />
              hassanekkeri2@gmail.com
            </a>
          </motion.div>

          <div className="grid gap-5">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noreferrer'}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.25 }}
                className="group rounded-3xl border border-black/6 bg-white/45 p-6 transition-colors duration-200 hover:bg-white/65"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-ink text-white transition-colors duration-200 group-hover:bg-[#2B2B2B]">
                      <link.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-ink">{link.label}</p>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-brand-muted">
                        Direct link
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-brand-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}