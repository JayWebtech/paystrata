/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent - Sophisticated teal/cyan
        primary: '#02ff87',
        'primary-light': '#00F5C4',
        'primary-dark': '#00B894',
        'primary-muted': 'rgba(0, 212, 170, 0.15)',
        
        // Secondary accent - Warm gold for highlights
        accent: '#F5A623',
        'accent-light': '#FFB84D',
        
        // Backgrounds - Deep navy/charcoal
        dark: '#0a0e17',
        'dark-lighter': '#0f1520',
        'dark-card': '#131a2a',
        'dark-elevated': '#1a2235',
        
        // Surface colors
        surface: '#1a1f2e',
        'surface-light': '#232b3e',
        'surface-border': 'rgba(255, 255, 255, 0.08)',
        
        // Text colors
        'text-primary': '#ffffff',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        
        // Status colors
        success: '#00D4AA',
        error: '#ef4444',
        warning: '#F5A623',
        
        // Gradient stops
        'gradient-start': '#00D4AA',
        'gradient-end': '#00A8E8',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #00D4AA 0%, #00A8E8 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0e17 0%, #131a2a 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(26, 34, 53, 0.8) 0%, rgba(19, 26, 42, 0.6) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(0, 212, 170, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 168, 232, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(245, 166, 35, 0.04) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 170, 0.3)',
        'glow-sm': '0 0 10px rgba(0, 212, 170, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 212, 170, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
