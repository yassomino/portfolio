import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#06070c',
          raised: '#0b0d16',
        },
        surface: {
          DEFAULT: '#0e1120',
          2: '#141830',
        },
        accent: {
          DEFAULT: '#6366f1',
          violet: '#a855f7',
          cyan: '#22d3ee',
        },
        edge: {
          DEFAULT: 'rgba(148,163,255,0.14)',
          hot: 'rgba(148,163,255,0.32)',
        },
      },
      animation: {
        'scan-sweep': 'scanSweep 7s linear infinite',
        'grid-pan': 'gridPan 18s linear infinite',
        'pulse-glow': 'pulseGlow 3.2s ease-in-out infinite',
        blink: 'blink 1.05s step-end infinite',
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        scanSweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(2000%)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 60px' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        measure: '64ch',
      },
      letterSpacing: {
        meta: '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
