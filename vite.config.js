import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-quill-new')) return 'editor';
          if (id.includes('dompurify') || id.includes('lucide-react')) return 'utils';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
