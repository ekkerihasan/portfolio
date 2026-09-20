'use client';
import { useState } from 'react';
import { Copy, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';
const EMAIL = 'hassanekkeri2@gmail.com';
const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/ekkerihasan', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/',
    icon: Linkedin,
  },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: Mail },
];
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
      window.setTimeout(() => setFailed(false), 2600);
    }
  };
  return (
    <section
      id="contact"
      className="section-padding relative isolate overflow-hidden pb-24 md:pb-28"
    >
      {' '}
      <BackgroundPattern variant="contact" />{' '}
      <div className="container-tight">
        {' '}
        <div className="relative z-10 max-w-2xl">
          {' '}
          <div className="mb-5 flex items-center gap-4">
            {' '}
            <span className="h-px w-10 bg-rust/60" />{' '}
            <span className="text-meta font-medium uppercase tracking-[0.2em] text-rust">
              {' '}
              Contact{' '}
            </span>{' '}
          </div>{' '}
          <h2 className="text-h2 font-semibold text-basalt">
            {' '}
            If you need someone who can own a feature end to end, email is the
            fastest way to reach me.{' '}
          </h2>{' '}
          <p className="mt-5 max-w-136 text-body leading-7 text-stone">
            {' '}
            I read email first. If the role is a fit, send a note and I&apos;ll
            reply directly.{' '}
          </p>{' '}
        </div>{' '}
        <div className="relative z-10 mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {' '}
          <div className="rounded-3xl border border-black/6 bg-basalt p-7 text-white">
            {' '}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {' '}
              <div className="max-w-lg">
                {' '}
                <p className="text-meta uppercase tracking-[0.2em] text-ember">
                  {' '}
                  Availability{' '}
                </p>{' '}
                <p className="mt-3 text-h3 font-semibold">
                  {' '}
                  Open to internship roles and small product work.{' '}
                </p>{' '}
                <p className="mt-4 max-w-md text-body leading-7 text-white/70">
                  {' '}
                  I work best on React, Next.js, and backend tasks that need to
                  stay simple for the next person who touches them.{' '}
                </p>{' '}
              </div>{' '}
              <button
                onClick={copyEmail}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-small text-basalt transition-colors duration-200 hover:bg-sand"
              >
                {' '}
                {failed ? 'Copy failed' : copied ? 'Copied' : 'Copy email'}{' '}
                <Copy size={14} />{' '}
              </button>{' '}
            </div>{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-3 text-body text-white/80 transition-colors duration-200 hover:text-white"
            >
              {' '}
              <Mail size={16} className="text-ember" /> {EMAIL}{' '}
            </a>{' '}
          </div>{' '}
          <div className="grid gap-5">
            {' '}
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noreferrer'}
                className="group rounded-3xl border border-black/6 bg-white/45 p-6 transition-colors duration-200 hover:bg-white/65"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-basalt text-white transition-colors duration-200 group-hover:bg-[var(--color-basalt-soft)]">
                      <link.icon size={18} />
                    </div>
                    <div>
                      <p className="text-small font-medium text-basalt">
                        {link.label}
                      </p>
                      <p className="text-meta uppercase tracking-[0.2em] text-stone">
                        Direct link
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-stone transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
