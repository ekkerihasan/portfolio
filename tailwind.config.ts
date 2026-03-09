import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class', // Better for manual control if you add a toggle later
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // High-end pairing: Inter for UI, Instrument Serif for flair
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: {
          /* Refining colors: 
             Cream is now cleaner, Ink is deeper (less grey), 
             Gold is more 'champagne' and less 'yellow'.
          */
          cream: '#FDFCFB', 
          paper: '#F5F2ED',
          ink: '#1A1A1A',     // True premium dark
          muted: '#666666',   // High readability grey
          gold: '#B5986D',    // Sophisticated champagne gold
        },
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'tighter': '-0.04em',
      },
      backgroundImage: {
        'grain': "url('https://grainy-gradients.vercel.app/noise.svg')",
        'subtle-gradient': 'linear-gradient(to bottom, transparent, rgba(181, 152, 109, 0.05))',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
      },
      /* Adding Custom Bezier Curves for Framer Motion / CSS Transitions */
      transitionTimingFunction: {
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
};

export default config;