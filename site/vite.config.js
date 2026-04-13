import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
var __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react()],
    publicDir: resolve(__dirname, '../content'),
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
