import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'config.json',
            dest: '', // root of dist/
            rename: 'islands.zebar.json'
          }
        ]
      })
    ],
    build: {
      outDir: '../island-dist', // This is the default but explicit now
      emptyOutDir: true, // Clean `dist/` before building
      sourcemap: mode !== 'production',
      minify: mode === 'production'
    },
    define: {
      __DEV__: mode !== 'production'
    }
  }
});