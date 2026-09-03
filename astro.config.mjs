import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei']
    },
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei']
    }
  }
});
