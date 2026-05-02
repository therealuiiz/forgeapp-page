import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          black: '#0a0a0a',
          panel: '#111111',
          card: '#161616',
          line: '#282828',
          green: '#22c55e',
          green2: '#16a34a',
          mint: '#4ade80',
          orange: '#f97316',
          red: '#ef4444',
          muted: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 32px rgba(34, 197, 94, 0.22), 0 0 80px rgba(34, 197, 94, 0.08)',
        card: '0 24px 80px rgba(0,0,0,.45)',
      },
      backgroundImage: {
        'grid-forge': 'linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { opacity: '.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-160%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .7s ease-out both',
        pulseGreen: 'pulseGreen 2.8s ease-in-out infinite',
        sweep: 'sweep 5s ease-in-out 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
