'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import BackgroundPattern from '@/components/BackgroundPattern';
import ResumePreview from '@/components/ResumePreview';
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ekkerihasan', icon: Github },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hasan-ekkeri-0a3a042b9/',
    icon: Linkedin,
  },
  { label: 'Email', href: 'mailto:hassanekkeri2@gmail.com', icon: Mail },
];
export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  return (
    <section
      id="about"
      className="section-padding relative isolate overflow-hidden pt-28 md:pt-36"
    >
      {' '}
      <BackgroundPattern variant="hero" />{' '}
      <div className="container-tight">
        {' '}
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          {' '}
          <div className="max-w-176">
            {' '}
            <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
              {' '}
              <div className="flex items-center gap-4">
                {' '}
                <span className="h-px w-10 bg-rust/60" />{' '}
                <span className="text-meta font-medium uppercase tracking-[0.2em] text-rust">
                  {' '}
                  Hello, I&apos;m{' '}
                </span>{' '}
              </div>{' '}
              <span className="text-meta uppercase tracking-[0.2em] text-stone">
                {' '}
                00 / MMXXVI{' '}
              </span>{' '}
            </div>{' '}
            <h1 className="max-w-[10ch] text-display font-semibold text-basalt md:max-w-none">
              {' '}
              <span className="block">Hasan</span>{' '}
              <span className="block">Ekkeri</span>{' '}
            </h1>{' '}
            <div className="mt-6 max-w-152 md:mt-8">
              {' '}
              <p className="max-w-152 text-body leading-7 text-stone md:leading-9">
                {' '}
                I build web products end to end.{' '}
              </p>{' '}
              <p className="mt-3 max-w-136 text-small leading-7 text-stone md:mt-4">
                {' '}
                Most of my work sits in React, Next.js, Node.js, Python, and
                Django.{' '}
              </p>{' '}
              <p className="mt-3 max-w-136 text-small leading-7 text-stone md:mt-4">
                {' '}
                I care about clear interfaces, predictable behavior, and code
                that still makes sense later.{' '}
              </p>{' '}
            </div>{' '}
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              {' '}
              <a
                href="#projects"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-basalt px-6 text-small text-white transition-colors duration-200 hover:bg-[var(--color-basalt-soft)] sm:w-auto sm:h-12"
              >
                {' '}
                View Projects{' '}
              </a>{' '}
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/5 bg-white/45 px-6 text-small text-basalt transition-colors duration-200 hover:bg-white sm:w-auto sm:h-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                {' '}
                View Resume <FileText size={14} />{' '}
              </button>{' '}
            </div>{' '}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-meta uppercase tracking-[0.2em] text-stone md:mt-10 md:gap-x-8">
              {' '}
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === 'Email' ? undefined : '_blank'}
                  rel={link.label === 'Email' ? undefined : 'noreferrer'}
                  className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-basalt"
                >
                  <link.icon size={14} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-70 lg:max-w-none">
            <div className="relative mx-auto w-full max-w-80 lg:max-w-110">
              <div className="absolute inset-[-6%] hidden rounded-4xl border border-black/5 md:block" />
              <div className="absolute inset-[-12%] hidden rounded-full border border-black/4.5 md:block" />
              <div className="absolute right-3 top-3 z-10 hidden rounded-full border border-black/6 bg-white/70 px-4 py-2 text-small text-basalt backdrop-blur-md md:block">
                <span className="mr-2 text-rust">●</span>
                Open for internships
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-black/4 bg-white/35 shadow-[0_18px_50px_rgba(17,17,17,0.04)] md:rounded-4xl md:shadow-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,64,26,0.10),transparent_45%)]" />
                <Image
                  src="/hasan.png"
                  alt="Hasan Ekkeri"
                  width={960}
                  height={1280}
                  priority
                  sizes="(min-width: 1024px) 28rem, (min-width: 640px) 20rem, 90vw"
                  className="h-75 w-full object-cover object-[50%_18%] sm:h-95 md:h-full md:object-[50%_12%]"
                />
              </div>

              <div className="absolute -left-2 bottom-4 max-w-44 rounded-3xl border border-black/5 bg-white/80 p-3 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-md sm:-left-4 sm:bottom-6 sm:max-w-57.5 sm:p-4 md:-left-8 md:bottom-8">
                <p className="text-small leading-5 text-basalt sm:leading-6">
                  I usually work from the interface down to the API.
                </p>
              </div>

              <div className="absolute -bottom-4 right-3 flex items-center gap-2 rounded-full border border-black/5 bg-white/75 px-3 py-2 text-micro text-stone backdrop-blur-md sm:-bottom-5 sm:right-5 sm:px-4 sm:py-2">
                Open to internship work
                <ArrowRight size={14} className="text-rust" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumePreview open={resumeOpen} onClose={closeResume} />
    </section>
  );
}
