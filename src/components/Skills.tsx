'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Skill = {
  name: string;
  note: string;
};

type Band = {
  index: string;
  name: string;
  caption: string;
  items: Skill[];
};

const layers: Band[] = [
  {
    index: '01',
    name: 'Interface',
    caption: 'The part people actually touch.',
    items: [
      { name: 'React', note: 'Most of my interface work starts here.' },
      { name: 'Next.js', note: 'Routing, rendering, and portfolio pages.' },
      { name: 'Tailwind CSS', note: 'Keeps styling consistent without noise.' },
    ],
  },
  {
    index: '02',
    name: 'Logic',
    caption: 'Where the rules get decided.',
    items: [
      { name: 'Node.js', note: 'APIs, server logic, and lightweight tooling.' },
      { name: 'Express', note: 'Straightforward request handling.' },
      { name: 'Django', note: 'Useful when the project needs structure.' },
    ],
  },
  {
    index: '03',
    name: 'Data',
    caption: 'What has to outlive the session.',
    items: [
      { name: 'PostgreSQL', note: 'My usual choice for relational data.' },
      { name: 'MySQL', note: 'Used in quiz and auth-style projects.' },
      { name: 'Schema design', note: 'I like to think through the model first.' },
    ],
  },
];

const rails: Band[] = [
  {
    index: '—',
    name: 'Languages',
    caption: 'Run through every layer above.',
    items: [
      { name: 'JavaScript', note: 'Client logic, utilities, and interaction handling.' },
      { name: 'TypeScript', note: 'Used here and in most structured React work.' },
      { name: 'Python', note: 'My default for backend work and scripts.' },
      { name: 'SQL', note: 'For shaping data instead of just reading it.' },
    ],
  },
  {
    index: '—',
    name: 'Tools',
    caption: 'Wrapped around the whole thing.',
    items: [
      { name: 'Git', note: 'Used on every project I keep in shape.' },
      { name: 'VS Code', note: 'Where most of the work happens.' },
      { name: 'Figma', note: 'Helpful for checking layout and spacing.' },
      { name: 'Docker', note: 'When I want the setup to behave the same everywhere.' },
    ],
  },
];

type BandRowProps = {
  band: Band;
  activeKey: string;
  onActivate: (key: string) => void;
};

function BandRow({ band, activeKey, onActivate }: BandRowProps) {
  const activeItem = band.items.find(
    (item) => `${band.name}-${item.name}` === activeKey,
  );

  return (
    <div className="grid gap-5 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10 md:py-10">
      <div className="md:pt-1">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] uppercase tracking-[0.34em] text-brand-gold">
            {band.index}
          </span>
          <h3 className="text-[1.6rem] font-semibold tracking-[-0.045em] text-white md:text-[2rem]">
            {band.name}
          </h3>
        </div>
        <p className="mt-2 text-[13px] leading-6 text-white/55">{band.caption}</p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {band.items.map((item) => {
            const key = `${band.name}-${item.name}`;
            const isActive = key === activeKey;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onActivate(key)}
                onMouseEnter={() => onActivate(key)}
                onFocus={() => onActivate(key)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-4 py-2 text-[13px] tracking-[-0.01em] transition-colors duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold',
                  isActive
                    ? 'border-white bg-white text-brand-ink'
                    : 'border-white/12 bg-white/5 text-white/70 hover:border-white/35 hover:text-white',
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div
          className={cn(
            'grid transition-all duration-300 ease-out',
            activeItem ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <p className="border-l border-brand-gold/45 pl-4 text-[14px] leading-6 text-white/70">
              {activeItem?.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeKey, setActiveKey] = useState('Interface-React');

  return (
    <section
      id="skills"
      className="section-padding relative isolate overflow-hidden bg-brand-ink text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '76px 76px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-120 w-120 rounded-full bg-brand-gold/6 blur-3xl"
      />

      <div className="container-tight relative z-10">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-gold/60" />
            <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-brand-gold">
              Toolbox
            </span>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            The stack, top to bottom.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/60 sm:text-[17px]">
            I keep the stack small and practical. Read it as one system: what the
            user touches, what decides the rules, and what has to still be true
            tomorrow.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {layers.map((band) => (
            <BandRow
              key={band.name}
              band={band}
              activeKey={activeKey}
              onActivate={setActiveKey}
            />
          ))}
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.34em] text-white/40">
          Cuts across every layer
        </p>

        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {rails.map((band) => (
            <BandRow
              key={band.name}
              band={band}
              activeKey={activeKey}
              onActivate={setActiveKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
