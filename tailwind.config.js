/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        'void': '#0a0a12',
        'void-light': '#12121f',

        // Containment (cool tones)
        'contain-high': '#2d5a87',
        'contain-mid': '#1e3a5f',
        'contain-low': '#0f1f35',

        // Correlation glow (warm tones)
        'glow-low': '#8b7355',
        'glow-mid': '#d4a574',
        'glow-high': '#e07020',
        'glow-extreme': '#c04020',

        // Trajectory classification
        'elastic': '#6b7280',
        'plastic': '#d97706',
        'degenerative': '#dc2626',
        'regenerative': '#059669',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
