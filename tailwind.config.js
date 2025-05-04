/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        atariClassicChunky: ['var(--font-atari-classic-chunky)'],
        silkScreen: ['var(--font-silkscreen)'],
        workBench: ['var(--font-workbench)'],
        vt323: ['var(--font-vt323)']
      },
      colors: {
        hover: 'rgba(255, 255, 255, 0.103)'
      },
      dropShadow: {
        logo: '0 0 0.3rem #ffffff70'
      },
      boxShadow: {
        logo: '0px 2px 8px -1px #0000001a',
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
