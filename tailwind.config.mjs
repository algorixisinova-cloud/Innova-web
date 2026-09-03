/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'innova-dark': '#0a0a0f',
        'innova-blue': '#0066ff',
        'innova-cyan': '#00d4ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
