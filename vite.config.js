import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`         -> static site in dist/ (upload to any host)
// `npm run build:single`  -> one self-contained dist/index.html (assets inlined)
export default defineConfig(({ mode }) => ({
  // Absolute base so deep links like /pulse/<id> load /assets correctly; the
  // single-file build inlines everything, so it can stay relative.
  base: mode === 'single' ? './' : '/',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    assetsInlineLimit: mode === 'single' ? 100000000 : 4096,
    outDir: mode === 'single' ? 'dist-single' : 'dist',
  },
}));
