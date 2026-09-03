import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['three', '@react-three/fiber', '@react-three/drei']
    }
  }
});
