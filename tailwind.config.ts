import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  // Disabling class-based dark mode to enforce the premium Cream theme
  darkMode: 'media', 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Switching to a cleaner professional stack
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          cream: '#F8F4EC',
          paper: '#EFE7DA',
          ink: '#2B2B2B',
          muted: '#5C5C5C',
          gold: '#C8A97E',
          bronze: '#A67B5B',
          accent: '#8C6239',
        },
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #C8A97E, #A67B5B)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'medium': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;