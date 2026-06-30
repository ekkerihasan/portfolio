'use client';

import { type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type BackgroundVariant = 'page' | 'hero' | 'about' | 'projects' | 'contact';

type LayerConfig = {
  size: string;
  offset: string;
  opacity: number;
  blur: string;
  animation: string;
  reverse?: boolean;
  hiddenOnMobile?: boolean;
};

type PatternConfig = {
  wrapper: string;
  baseOpacity: number;
  layers: LayerConfig[];
};

type BackgroundPatternProps = {
  variant?: BackgroundVariant;
  className?: string;
};

const variants: Record<BackgroundVariant, PatternConfig> = {
  page: {
    wrapper: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -translate-y-[4rem]',
    baseOpacity: 0.34,
    layers: [
      {
        size: '34rem',
        offset: 'left-[-12rem] top-[-10rem]',
        opacity: 0.18,
        blur: 'blur-[2px]',
        animation: 'spin 240s linear infinite',
      },
      {
        size: '28rem',
        offset: 'left-20 top-16',
        opacity: 0.2,
        blur: 'blur-[1px]',
        animation: 'spin 180s linear infinite reverse',
      },
      {
        size: '22rem',
        offset: 'left-40 top-32',
        opacity: 0.24,
        blur: 'blur-0',
        animation: 'spin 120s linear infinite',
      },
    ],
  },
  hero: {
    wrapper: 'top-8 right-[-4rem] md:right-[-2rem] lg:right-[-5rem]',
    baseOpacity: 0.3,
    layers: [
      {
        size: '26rem',
        offset: 'left-6 top-4',
        opacity: 0.18,
        blur: 'blur-[2px]',
        animation: 'spin 240s linear infinite',
        hiddenOnMobile: true,
      },
      {
        size: '22rem',
        offset: 'left-14 top-12',
        opacity: 0.2,
        blur: 'blur-[1px]',
        animation: 'spin 180s linear infinite reverse',
        hiddenOnMobile: true,
      },
      {
        size: '18rem',
        offset: 'left-20 top-20',
        opacity: 0.28,
        blur: 'blur-0',
        animation: 'spin 120s linear infinite',
      },
    ],
  },
  about: {
    wrapper: 'left-[-6rem] top-[6rem] md:left-[-4rem] md:top-[8rem]',
    baseOpacity: 0.26,
    layers: [
      {
        size: '24rem',
        offset: 'left-0 top-0',
        opacity: 0.16,
        blur: 'blur-[2px]',
        animation: 'spin 240s linear infinite reverse',
        hiddenOnMobile: true,
      },
      {
        size: '20rem',
        offset: 'left-8 top-8',
        opacity: 0.18,
        blur: 'blur-[1px]',
        animation: 'spin 180s linear infinite',
        hiddenOnMobile: true,
      },
      {
        size: '16rem',
        offset: 'left-14 top-14',
        opacity: 0.24,
        blur: 'blur-0',
        animation: 'spin 120s linear infinite reverse',
      },
    ],
  },
  projects: {
    wrapper: 'left-[-5rem] top-[8rem] md:left-[-2rem] md:top-[10rem]',
    baseOpacity: 0.28,
    layers: [
      {
        size: '28rem',
        offset: 'left-0 top-0',
        opacity: 0.15,
        blur: 'blur-[2px]',
        animation: 'spin 240s linear infinite',
        hiddenOnMobile: true,
      },
      {
        size: '22rem',
        offset: 'left-8 top-10',
        opacity: 0.18,
        blur: 'blur-[1px]',
        animation: 'spin 180s linear infinite reverse',
        hiddenOnMobile: true,
      },
      {
        size: '16rem',
        offset: 'left-16 top-20',
        opacity: 0.22,
        blur: 'blur-0',
        animation: 'spin 120s linear infinite',
      },
    ],
  },
  contact: {
    wrapper: 'right-[-5rem] bottom-[4rem] md:right-[-2rem] md:bottom-[6rem]',
    baseOpacity: 0.24,
    layers: [
      {
        size: '24rem',
        offset: 'left-0 top-0',
        opacity: 0.14,
        blur: 'blur-[2px]',
        animation: 'spin 240s linear infinite reverse',
        hiddenOnMobile: true,
      },
      {
        size: '20rem',
        offset: 'left-10 top-10',
        opacity: 0.18,
        blur: 'blur-[1px]',
        animation: 'spin 180s linear infinite',
        hiddenOnMobile: true,
      },
      {
        size: '14rem',
        offset: 'left-16 top-16',
        opacity: 0.22,
        blur: 'blur-0',
        animation: 'spin 120s linear infinite reverse',
      },
    ],
  },
};

const ringSets = [
  { radius: 64, dash: 'none', opacity: 0.8 },
  { radius: 94, dash: '220 34', opacity: 0.75 },
  { radius: 126, dash: 'none', opacity: 0.5 },
  { radius: 154, dash: '300 40', opacity: 0.55 },
  { radius: 184, dash: 'none', opacity: 0.35 },
  { radius: 214, dash: '360 52', opacity: 0.4 },
  { radius: 244, dash: 'none', opacity: 0.22 },
];

const orbitalPaths = [
  { radius: 108, x: -18, y: 6, opacity: 0.6 },
  { radius: 152, x: 16, y: -10, opacity: 0.45 },
  { radius: 196, x: -8, y: 12, opacity: 0.35 },
  { radius: 230, x: 22, y: -16, opacity: 0.28 },
];

const nodes = [
  { radius: 94, angle: 20, size: 10 },
  { radius: 126, angle: 132, size: 12 },
  { radius: 162, angle: 228, size: 9 },
  { radius: 198, angle: 316, size: 14 },
  { radius: 230, angle: 54, size: 8 },
];

function Layer({ size, offset, opacity, blur, animation, hiddenOnMobile }: LayerConfig) {
  const dimension = size;

  return (
    <div
      className={cn(
        'absolute',
        offset,
        hiddenOnMobile && 'hidden md:block',
        blur,
      )}
      style={{
        width: dimension,
        height: dimension,
        opacity,
        animation,
        willChange: 'transform',
        transformOrigin: '50% 50%',
      } as CSSProperties}
    >
      <svg
        viewBox="0 0 560 560"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <g fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1">
          {ringSets.map((ring, index) => (
            <circle
              key={index}
              cx="280"
              cy="280"
              r={ring.radius}
              strokeDasharray={ring.dash}
              strokeOpacity={ring.opacity}
            />
          ))}

          {orbitalPaths.map((orbit, index) => (
            <ellipse
              key={index}
              cx="280"
              cy="280"
              rx={orbit.radius}
              ry={orbit.radius - 16}
              transform={`translate(${orbit.x} ${orbit.y})`}
              strokeOpacity={orbit.opacity}
            />
          ))}
        </g>

        <g fill="rgba(0,0,0,0.12)">
          {nodes.map((node, index) => {
            const radians = (node.angle * Math.PI) / 180;
            const x = 280 + Math.cos(radians) * node.radius;
            const y = 280 + Math.sin(radians) * node.radius;

            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={node.size / 2}
                opacity={0.65}
                style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.06))' }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default function BackgroundPattern({ variant = 'hero', className }: BackgroundPatternProps) {
  const config = variants[variant];

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.025),transparent_65%)]"
        style={{ opacity: config.baseOpacity }}
      />

      <div className={cn('absolute', config.wrapper)}>
        {config.layers.map((layer, index) => (
          <Layer key={index} {...layer} />
        ))}
      </div>

      {variant === 'page' && (
        <div className="absolute inset-0 opacity-100">
          <div className="absolute -right-32 top-48 hidden h-168 w-2xl rounded-full border border-black/5 md:block" />
          <div className="absolute -left-40 -bottom-48 hidden h-152 w-152 rounded-full border border-black/4 md:block" />
        </div>
      )}
    </div>
  );
}